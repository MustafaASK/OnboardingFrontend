(function () {
    'use strict';
    hrAdminApp.controller('EditUserController', editUserController);
    editUserController.$inject = ['$rootScope', '$state', '$mdDialog', '$stateParams', 'ToastrService', 'HrUsersService', '$scope'];
    function editUserController($rootScope, $state, $mdDialog, $stateParams, ToastrService, HrUsersService, $scope) {

        var vm = this;
        vm.addNewHrUser = addNewHrUser;
        vm.editHrUserData = updateHrUserData;
        vm.validateEmailId = validateEmailId;
        vm.reactivateHrUser = reactivateHrUser;
        vm.closeReactivateModal = closeReactivateModal;
        vm.isReactivation = false;
        vm.chkboxClass_IE = '';
        vm.tabOrder = 1;
        $scope.isEdit = false;
        $scope.submitted = false;
        $scope.pageTitle = 'Add HR User';
        vm.hruserid = null;
        $scope.$parent.currentNavItem = 1;

        if ($stateParams.id) {
            vm.hruserid = $stateParams.id;
            $scope.isEdit = true;
            $scope.pageTitle = 'Edit HR User';
            getHrUserData(vm.hruserid);
        } else {
            getPermissionsMasterList();
        }


        function getClientsList() {
            HrUsersService.clients().then(
                function (response) {
                    vm.clients = response.data;
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }
        getClientsList();

        function getPermissionsMasterList() {
            HrUsersService.permissionsMasterList().then(
                function (response) {
                    vm.permissionsMasterList = response.data;
                    if ($scope.isEdit) {
                        var userPermissions = vm.hrUserData.permissions;
                        for (var i = 0; i < vm.permissionsMasterList.length; i++) {
                            for (var j = 0; j < userPermissions.length; j++) {
                                if (vm.permissionsMasterList[i].permissionid == userPermissions[j].permissionid) {
                                    vm.permissionsMasterList[i].viewFlag = userPermissions[j].ViewFlag;
                                    vm.permissionsMasterList[i].addFlag = userPermissions[j].AddFlag;
                                    vm.permissionsMasterList[i].editFlag = userPermissions[j].editFlag;
                                    vm.permissionsMasterList[i].deleteFlag = userPermissions[j].deleteFlag;
                                    break;
                                }
                            }
                        }
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG222);
                }
            )
        }

        function getHrUserData(userid) {
            HrUsersService.getHrUserData(userid).then(
                function (response) {
                    vm.hrUserData = response.data;
                    // console.log(vm.hrUserData);
                    $scope.originalEmail = vm.hrUserData.emailId;
                    if (vm.hrUserData.clients) {
                        vm.hrUserData.clientIds = vm.hrUserData.clients.slice(1, -1);
                        vm.hrUserData.clientIds = vm.hrUserData.clientIds.split(', ');
                    } else {
                        vm.hrUserData.clientIds = [];
                    }
                    // get permissions master list and bind the data at the same time
                    getPermissionsMasterList();
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG223);
                }
            )
        }

        function validateEmailId() {
            var objEmailId = {};
            // Issue 169: Do not validate email in edit mode
            if ($scope.isEdit && $scope.originalEmail == vm.hrUserData.emailId) return;

            if (vm.hrUserData)
                objEmailId.emailId = vm.hrUserData.emailId;
            else
                return;

            HrUsersService.validateHrUser(objEmailId).then(
                function (response) {
                    // Issue #263 - reactivation of email should not be allowed in edit mode
                    if (response.data.Error &&
                        response.data.userId &&
                        $scope.isEdit) {
                        ToastrService.error($rootScope.errorMsgs.MSG117);
                        return;
                    }
                    // Reactivation of deactivated user to be allowed when new user is being added
                    if (response.data.Error &&
                        response.data.userId &&
                        !$scope.isEdit) {
                        confirmUserChange(response.data.userId);
                        return;
                    }

                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                },
                function (err) {
                    if (err.status == '401') {
                        ToastrService.error($rootScope.errorMsgs.MSG117);
                    } else {
                        ToastrService.error($rootScope.errorMsgs.MSG194);
                    }
                }
            )
        }

        function confirmUserChange(userId) {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                template: '<md-dialog aria-label="Delete" style="width:400px;">' +
                    '<div layout="column" layout-align="start end" style="padding:10px;">' +
                    '<ng-md-icon icon="clear" size="14" style="margin-top:8px;cursor:pointer" ng-click="vm.closeReactivateModal()">' +
                    '</ng-md-icon>' +
                    '</div>' +
                    '<md-content style="background-color:white">' +
                    '<div layout="column" layout-align="center center"><img src="images/alert_icon.png"/></div>' +
                    '<p align=center style="padding:10px 10px 20px 20px;font-size:13px;" >Are you sure you want to Re-activate the HR user?</p>' +
                    '<md-divider></md-divider>' +
                    '<div layout="row" layout-align="end center" style="background-color:rgb(250,250,250);height:60px;padding:10px" flex>' +
                    '<md-button class="md-raised md-primary" ng-click="vm.reactivateHrUser(' + userId + ')" >OK</md-button>' +
                    '<md-button class="md-secondary" ng-click="vm.closeReactivateModal()">Cancel</md-button>' +
                    '</div>' +
                    '</md-content>' +
                    '</md-dialog>'
            }
            );
        }

        function addNewHrUser() {
            var objUser = {};
            if (!vm.hrUserData || vm.hrUserData.emailId == null ||
                vm.hrUserData.firstName == null ||
                vm.hrUserData.lastName == null ||
                vm.hrUserData.phoneNo == null || vm.hrUserData.jobtitle == null) {
                ToastrService.error($rootScope.errorMsgs.MSG234);
                return;
            }
            if (vm.hrUserData.jobtitle.trim() == "") {
                ToastrService.error($rootScope.errorMsgs.MSG234);
                return;
            }

            objUser.emailId = vm.hrUserData.emailId;
            objUser.firstName = vm.hrUserData.firstName;
            objUser.lastName = vm.hrUserData.lastName;
            objUser.phoneNo = vm.hrUserData.phoneNo;
            objUser.jobtitle = vm.hrUserData.jobtitle;
            objUser.frontendurl = $rootScope.FrontEndURL + 'getresetPassword/';
            // Convert array to string
            if (!vm.hrUserData.clientIds)
                vm.hrUserData.clientIds = "";

            objUser.clients = vm.hrUserData.clientIds.toString();

            objUser.userProfile = vm.permissionsMasterList;
            $scope.loading = true;
            if (vm.isReactivation) {
                var objUser = {};
                objUser.userId = vm.hrUserData.userId;
                objUser.emailId = vm.hrUserData.emailId;
                objUser.firstName = vm.hrUserData.firstName;
                objUser.lastName = vm.hrUserData.lastName;
                objUser.phoneNo = vm.hrUserData.phoneNo;
                objUser.jobtitle = vm.hrUserData.jobtitle;
                // Convert array to string
                objUser.clients = vm.hrUserData.clientIds.toString();
                objUser.userProfile = vm.permissionsMasterList;
                if (!vm.isReactivation) {
                    objUser.frontendurl = $rootScope.FrontEndURL;
                }
                else {
                    objUser.frontendurl = $rootScope.FrontEndURL + 'getresetPassword/';
                }

                HrUsersService.editHrUser(objUser, vm.isReactivation).then(
                    function (response) {
                        if (response.data.Error) {
                            vm.hrUserData.emailId = "";
                            // ToastrService.success('This E-mail ID is already used by an existing HR user. Please enter a New E-mail ID.');
                            ToastrService.error(response.data.message);
                        }
                        if (!response.data.Error) {
                            $state.go('Settings.ManageUsers');
                            // ToastrService.success('Detail Notification has been sent to HR User, and HR Admin.');
                            ToastrService.success(response.data.message);
                        }
                    },
                    function (err) {
                        ToastrService.error($rootScope.errorMsgs.MSG208);
                    }
                )
            }
            else {

                HrUsersService.addHrUser(objUser).then(
                    function (response) {
                        if (response.data.Error) {
                            vm.hrUserData.emailId = "";
                            // ToastrService.error('This updated E-mail ID is already used by other HR user. Please enter a New E-mail ID.');
                            ToastrService.error(response.data.message);
                        }
                        if (!response.data.Error) {
                            $state.go('Settings.ManageUsers');
                            // ToastrService.success('Detail Notification has been sent to HR User, and HR Admin.');
                            ToastrService.success(response.data.message);
                        }
                    },
                    function (err) {
                        ToastrService.error($rootScope.errorMsgs.MSG208);
                    }
                ).finally(function () {
                    $scope.loading = false;
                });
            }
        }

        function updateHrUserData() {
            var objUser = {};
            if (vm.hrUserData.emailId == null ||
                vm.hrUserData.firstName == null ||
                vm.hrUserData.lastName == null ||
                vm.hrUserData.phoneNo == null || vm.hrUserData.jobtitle == null) {
                ToastrService.error($rootScope.errorMsgs.MSG224);
                return;
            }

            objUser.userId = vm.hruserid;
            objUser.emailId = vm.hrUserData.emailId;
            objUser.firstName = vm.hrUserData.firstName;
            objUser.lastName = vm.hrUserData.lastName;
            objUser.phoneNo = vm.hrUserData.phoneNo;
            objUser.jobtitle = vm.hrUserData.jobtitle;
            // Convert array to string
            // Feb 7 - TODO - Allow empty string for clients
            if (!vm.hrUserData.clientIds)
                objUser.clients = "";
            else
                objUser.clients = vm.hrUserData.clientIds.toString();
            objUser.userProfile = vm.permissionsMasterList;
            if (!vm.isReactivation) {
                objUser.frontendurl = $rootScope.FrontEndURL;
            }
            else {
                objUser.frontendurl = $rootScope.FrontEndURL + 'getresetPassword/';
            }

            // console.log(objUser);

            // userProfile array contains redundant 'status' and 'hashKey' keys along with others
            // need to remove those!
            $scope.loading = true;
            HrUsersService.editHrUser(objUser, vm.isReactivation).then(
                function (response) {
                    if (response.data.Error) {
                        vm.emailId = "";
                        // ToastrService.error('This E-mail ID is already used by an existing HR user. Please enter a New E-mail ID.');
                        ToastrService.error(response.data.message);
                    }
                    if (!response.data.Error) {
                        $state.go('Settings.ManageUsers');
                        // ToastrService.success('Detail Notification has been sent to HR User, and HR Admin.');
                        ToastrService.success(response.data.message);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG225);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }

        vm.saveHrUser = function (valid) {
            $scope.submitted = true;
            if (!valid) {
                ToastrService.error($rootScope.errorMsgs.MSG128);
                return false;
            }
            if ($stateParams.id) {
                updateHrUserData();
            } else {
                addNewHrUser();
            }
        }

        function reactivateHrUser(userId) {
            vm.isReactivation = 'true';
            vm.hrUserData.userId = userId;
            $mdDialog.hide();
            var fnameId = document.getElementById('usrfname');
            window.setTimeout(function () {
                fnameId.focus();
            }, 0);
        }

        function closeReactivateModal() {
            vm.hrUserData.emailId = "";
            $mdDialog.hide();

        }

        // Browser detecction
        $scope.browserType = function () {
            if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
                vm.browserUsed = 'Opera';
                vm.chkboxClass_IE = '';
            }
            else if (navigator.userAgent.indexOf("Chrome") != -1) {
                vm.browserUsed = 'Chrome';
                vm.chkboxClass_IE = '';
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                vm.browserUsed = 'Safari';
                vm.chkboxClass_IE = '';
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                vm.browserUsed = 'Firefox';
                vm.chkboxClass_IE = '';
            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                vm.browserUsed = 'IE';
                vm.chkboxClass_IE = 'chxBox-checked-IE11';
            }
            else {
                vm.browserUsed = 'Unknown';
                vm.chkboxClass_IE = '';
            }
        }
        $scope.browserType();

        vm.viewChecked = function (permissions) {
            if ((permissions.editFlag || permissions.deleteFlag) && (permissions.permissionid === 6 || permissions.permissionid === 2 || permissions.permissionid === 4 || permissions.permissionid === 5 || permissions.permissionid === 3)) {
                permissions.viewFlag = true;
            }
        }

        vm.editDeleteCheck = function (permissions) {
            if (!permissions.viewFlag && (permissions.permissionid === 6 || permissions.permissionid === 2 || permissions.permissionid === 4 || permissions.permissionid === 5 || permissions.permissionid === 3)) {
                permissions.editFlag = false;
                permissions.deleteFlag = false;
            }
        }

    }
})();
