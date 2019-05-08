(function () {
    'use strict';
    hrAdminApp.controller('AddNewHireController', addNewHireController);
    addNewHireController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$window', 'ToastrService', 'NewHiresService', '$filter', '$mdDialog', 'NavigationService', '$location', 'DesignWebformsService', 'DynamicWebFormService', 'ClientsList', 'SourceProfile', 'JobHireCategory'];

    function addNewHireController($rootScope, $scope, $state, $stateParams, $window, ToastrService, NewHiresService, $filter, $mdDialog, NavigationService, $location, DesignWebformsService, DynamicWebFormService, ClientsList, SourceProfile, JobHireCategory) {

        var vm = this;
        //vm.files.attachment =null;
        vm.tabOrder = 1;
        vm.newHireToggleColor = '#ffffff';
        vm.reHireToggleColor = '#d3d3d3';
        vm.newHire = {};
        vm.newHire.hiringtype = true;
        vm.files = {};
        vm.files.attachment = null;
        // vm.logout = logout;
        $scope.myTentDate = new Date();
        $scope.isEdit = false;
        $scope.submitted = false;
        $scope.minstrtDate = new Date(
            $scope.myTentDate.getFullYear(),
            $scope.myTentDate.getMonth(),
            $scope.myTentDate.getDate() + 7
        );
        $scope.totalFileSize = 0;
        $scope.attachedFiles = [];
        $scope.attachedFilesObject = {};
        vm.file = null;
        vm.newHire.tentstartdate = $scope.minstrtDate;
        vm.exempt = [{
            exemptId: 1,
            exemptName: 'Exempt'
        },
        {
            exemptId: 0,
            exemptName: 'Non Exempt'
        }
        ];
        $scope.isDisabledControl = false;

        // vm.othermodels = { state: vm.newHire.worklocation };

        /* autocomplete part start*/
        $scope.options = {
            "getType": "state",
            "watchEnter": false,
            "country": "us"
        };
        $scope.options1 = {
            "getType": "city",
            "watchEnter": false,
            "types": "(cities)",
            "country": "us"
        };
        $scope.clientAddrOptions = {
            "getType": "address",
            "watchEnter": false,
            "country": "us"
        };
        $scope.usaAddressOptions = { "getType": "fulladdress", "watchEnter": false, "country": "us" };
        $scope.candAddrOptions = { "getType": "address", "watchEnter": false, "country": "us" };
        $scope.options3 = { "getType": "city", "watchEnter": true, "country": "us" };
        $scope.options4 = { "getType": "state", "watchEnter": true, "country": "us" };
        $scope.formFields = [];
        $scope.sourceProfile = SourceProfile.data.SourceProfiles;
        $scope.clientsList = ClientsList.data;
        $scope.jobCategoryList = JobHireCategory.data;

        $scope.getFieldSettingPar = function (settingname, obj) {
            var result = {};
            var settings = obj.Settings;
            $.each(settings, function (index, set) {
                if (set.name == settingname) {
                    result = set;
                    return;
                }
            });
            if (!Object.keys(result).length) {
                //Continue to search settings in the checkbox zone
                // $.each(settings[settings.length - 1].Options, function (index, set) {
                //     if (set.name == settingname) {
                //         result = set;
                //         return;
                //     }
                // });
                var ary = $filter('filter')(settings, { 'name': 'General Validations' }, true);
                if (ary && ary.length) {
                    $.each(ary[0].Options, function (index, set) {
                        if (set.name == settingname) {
                            result = set;
                            return;
                        }
                    });
                }
            }
            return result;

        }

        function getJsonDocumentLibrary() {
            $scope.loading = true;
            DesignWebformsService.getWebformDetails(1).then(
                function (response) {
                    if (response.data) {
                        //vm.webformDetails = response.data;
                        var tempComponents = response.data.masterJsonData ? response.data.masterJsonData.components : (response.data.jsonData.components ? response.data.jsonData.components : []);
                        //$scope.formFields = angular.copy(tempComponents);
                        $scope.formFields = DynamicWebFormService.convertToWebFormJson(tempComponents);
                    } else {
                        ToastrService.error('An error occured while retrieving the Webform Components');
                    }
                },
                function (err) {

                }
            )
        }

        $scope.getFieldSettingPar = function (settingname, obj) {
            var result = {};
            var settings = obj.Settings;
            $.each(settings, function (index, set) {
                if (set.name == settingname) {
                    result = set;
                    return;
                }
            });
            if (!Object.keys(result).length) {
                //Continue to search settings in the checkbox zone General Validations

                var ary = $filter('filter')(settings, { 'name': 'General Validations' }, true);
                if (ary && ary.length) {
                    $.each(ary[0].Options, function (index, set) {
                        if (set.name == settingname) {
                            result = set;
                            return;
                        }
                    });
                }
            }
            return result;

        }


        function getFieldSettingPar(settingname) {
            var result = {};
            $.each($scope.formFields, function (index, set) {
                if (set.name == settingname) {
                    result = set;
                    return;
                }
            });
            return result;

        }
        vm.closeAddNewHire = function () {
            $state.go('NewHires');
        }

        $scope.getFieldSettingForDefault = function (settingname, obj) {
            var result = {};
            var settings = obj.Settings;
            $.each(settings, function (index, set) {
                if (set.name == settingname) {
                    result = set;
                    return;
                }
            });
            if (!Object.keys(result).length) {
                //Continue to search settings in the checkbox zone
                // $.each(settings[settings.length - 1].Options, function (index, set) {
                //     if (set.name == settingname) {
                //         result = set;
                //         return;
                //     }
                // });
                var ary = $filter('filter')(settings, { 'Type': 'checkBoxZone' }, true);
                if (ary && ary.length) {
                    $.each(ary[0].Options, function (index, set) {
                        if (set.name == settingname) {
                            result = set;
                            return;
                        }
                    });
                }
            }
            return result;

        }

        $scope.getFieldValue = function (field) {
            field.value = field.value ? field.value : $scope.getFieldSettingPar('Radio Choice', field).Possiblevalue[0].value;
            //field.value = field.value ? field.value : $scope.getFieldSettingPar(field.name, field);
        }

        $scope.submitted = false;
        $scope.validateForm = function (form) {

            $scope.submitted = true;
            if (form.$invalid) {
                ToastrService.error($rootScope.errorMsgs.MSG127);
                return;
            }
            var allFormFields = angular.copy($scope.formFields);
            for (var i = 0; i < allFormFields.length; i++) {
                if (allFormFields[i].inputType == 'date' && allFormFields[i].value) {
                    // var dateFormat = allFormFields[i].value;
                    var momentObj = moment(allFormFields[i].value);
                    momentObj = momentObj.format("MM/DD/YYYY");
                    allFormFields[i].value = momentObj;
                }
            }

            var objNewHire = new FormData();
            if ($stateParams.id) {
                vm.editNewHireId = $stateParams.id;
                objNewHire.append("newhireid", vm.editNewHireId);
            }
            objNewHire.append("hiringtype", vm.newHire.hiringtype);

            objNewHire.append("emailid", getFieldSettingPar('Email Id').value);
            objNewHire.append("firstname", getFieldSettingPar('firstname').value);
            objNewHire.append("middlename", getFieldSettingPar('middlename').value);
            objNewHire.append("lastname", getFieldSettingPar('lastname').value);
            objNewHire.append("catgid", getFieldSettingPar('Hire Category').value);
            var docIdList = []
            for (var attachfile in $scope.attachedFilesObject) {
                docIdList.push(attachfile);
                objNewHire.append("documentname", $scope.attachedFilesObject[attachfile]);
            }
            objNewHire.append("docIds", docIdList);

            // for (var i = 0; i < controlsNotToBeCleared.length; i++) {
            for (var j = 0; j < allFormFields.length; j++) {
                if (allFormFields[j].isShow == false) {
                    allFormFields[j].value = '';
                    allFormFields[j].isUpdated = false;
                }
            }
            // }


            var obj = {
                "components": allFormFields
            }
            objNewHire.append("jsonData", JSON.stringify(obj));

            // return;

            if ($stateParams.id) {
                NewHiresService.editNewHireJson(objNewHire).then(
                    function (response) {
                        if (response.data.Success) {
                            $state.go('NewHires', {}, {
                                reload: 'NewHires'
                            });
                            ToastrService.success(response.data.message);
                        } else {
                            ToastrService.error(response.data.message);
                        }
                    },
                    function (err) {
                        ToastrService.error($rootScope.errorMsgs.MSG191);
                    }
                )
            } else {

                NewHiresService.saveNewHireJson(objNewHire).then(
                    function (response) {
                        if (response.data.Success) {
                            $state.go('NewHires', {}, {
                                reload: 'NewHires'
                            });
                            ToastrService.success(response.data.message);
                        } else {
                            ToastrService.error(response.data.message);
                        }
                    },
                    function (err) {
                        ToastrService.error($rootScope.errorMsgs.MSG191);
                    }
                )
            }

        }

        function viewNewHire() {
            NewHiresService.getNewHireJson(vm.editNewHireId).then(
                function (response) {
                    var tempComponents = response.data.masterJsonData ? response.data.masterJsonData.components : (response.data.jsonData.components ? response.data.jsonData.components : []);
                    //$scope.formFields = angular.copy(tempComponents);
                    $scope.formFields = DynamicWebFormService.convertToWebFormJson(tempComponents);//tempComponents;
                    vm.newHire = response.data;

                    vm.newHire.hiringtype = true;
                    // console.log(vm.newHire);
                    $scope.originalEmail = vm.newHire.emailid;
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }


        $scope.closeDeleteModal = function () {
            $mdDialog.cancel();
        } 

        var allfileslist = [];
        var indxId = null;
        var docidId = null;
        vm.deleteitdoc = function(){
            if ($scope.attachedFilesObject[docidId]) {
                delete $scope.attachedFilesObject[docidId];
            }
            allfileslist.splice(indxId, 1);
            $scope.closeDeleteModal();
        }

        $scope.deleteDoc = function (indx, docid, filesList) {
            // if ($scope.attachedFilesObject[docid]) {
            //     delete $scope.attachedFilesObject[docid];
            // }
            // filesList.splice(indx, 1);
            indxId = indx;
            docidId = docid;
            allfileslist = filesList;
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                template: '<md-dialog aria-label="Delete" style="width:400px;">' +
                '<div layout="column" layout-align="start end">' +
                '<ng-md-icon icon="clear" size="14" style="margin-top:8px;cursor:pointer" ng-click="vm.closeDeleteModal()">' +
                '</ng-md-icon>' +
                '</div>' +
                '<md-content style="background-color:white">' +
                '<div layout="column" layout-align="center center"><img src="images/que_icon.png"/></div>' +
                '<p align=center style="padding:10px 10px 20px 20px;font-size:13px;" >Are you sure you want to delete it?</p>' +
                '<md-divider></md-divider>' +
                '<div layout="row" layout-align="end center" style="background-color:rgb(250,250,250);height:60px;padding:10px" flex>' +
                '<md-button class="md-raised md-primary" ng-click="vm.deleteitdoc()" >OK</md-button>' +
                '<md-button class="md-secondary" ng-click="vm.closeDeleteModal()">Cancel</md-button>' +
                '</div>' +
                '</md-content>' +
                '</md-dialog>'
            });
        }

        $scope.deleteSavedFile = function (newhireDocId, index) {
        }

        // $scope.$watch('vm.file', function() {
        //     if (vm.file && vm.file.length) {
        //         for (var i = 0; i < vm.file.length; i++) {
        //             if (Math.round((vm.file[i].size / (1024 * 1024)) * 100) / 100 <= 10.00) {
        //                 if ((vm.newHire.document ? vm.newHire.document.length : 0) + $scope.attachedFiles.length < 3) {
        //                     if ($scope.attachedFiles.length == 0) {
        //                         $scope.attachedFiles[i] = vm.file[i];
        //                         $scope.attachedFiles[i].rndmId = '_' + Math.random().toString(36).substr(2, 9);
        //                         // $scope.totalFileSize += Math.round((vm.file[i].size / (1024 * 1024)) * 100) / 100;
        //                     } else if ($scope.attachedFiles.length > 0 && $scope.attachedFiles.length < 3) {
        //                         var count = $scope.attachedFiles.length;
        //                         $scope.attachedFiles[count] = vm.file[i];
        //                         $scope.attachedFiles[count].rndmId = '_' + Math.random().toString(36).substr(2, 9);
        //                         // $scope.totalFileSize += Math.round((vm.file[i].size / (1024 * 1024)) * 100) / 100;
        //                     } else if ($scope.attachedFiles.length >= 3) {
        //                         ToastrService.error("Maximum of three files can be attached.");
        //                         return;
        //                     }
        //                 } else {
        //                     ToastrService.error("Maximum of three files can be attached.");
        //                     return;
        //                 }
        //             } else {
        //                 ToastrService.error("Maximum file size should be 10MB.");
        //                 return;
        //             }
        //         }
        //     } else {

        //     }
        // });

        // function getSourceProfile() {
        //     DesignWebformsService.getSourceProfile().then(
        //         function (response) {
        //             vm.sourceProfile = response.data.SourceProfiles;
        //         },
        //         function (err) {
        //             ToastrService.error(err.message);
        //         }
        //     )
        // }
        // getSourceProfile();

        // function getClientsList() {
        //     DesignWebformsService.getClientsList().then(
        //         function (response) {
        //             vm.clientsList = response.data;
        //         },
        //         function (err) {
        //             ToastrService.error(err.message);
        //         }
        //     )
        // }
        // getClientsList();

        // function getJobHireCategory() {
        //     DesignWebformsService.getJobHireCategory().then(
        //         function (response) {
        //             vm.jobCategoryList = response.data;
        //         },
        //         function (err) {
        //             ToastrService.error(err.message);
        //         }
        //     )
        // }
        // getJobHireCategory();

        /* autocomplete part end */

        // $('#payrate').inputmask();

        // $scope.updateState = function (stateParam) {
        //     if (stateParam) {
        //         vm.newHire.worklocation = stateParam;
        //     }
        // }
        // $scope.updateCityStateCountryZip = function (cityParam, stateParam) {
        //     if (cityParam) {
        //         vm.newHire.city = cityParam;
        //     }
        //     if (stateParam) {
        //         vm.newHire.worklocation = stateParam;
        //     }
        // }

        // $scope.minenddate = new Date(
        //     vm.newHire.tentstartdate.getFullYear(),
        //     vm.newHire.tentstartdate.getMonth(),
        //     vm.newHire.tentstartdate.getDate() + 7
        // );
        // // vm.newHire.tentenddate = $scope.minenddate;
        // //vm.newHire.tentenddate = $scope.minstrtDate;
        // // vm.viewAttachment = viewAttachment;
        // // vm.minstrtDate = minstrtDate;
        // // $scope.attachment = '';
        // vm.documentname = '';
        // //vm.isUdfExpanded=false;
        vm.validateEmailId = validateEmailId;

        // // vm.jobCategories =[{'id': 1,'name': 'IT'},{'id': 2,'name': 'Non-IT'}];

        // if (screen.width == 1024) {
        //     vm.datePickerLabel = 'calc(100% - 30px)';
        //     vm.datePickerPadding = '-22px';
        //     vm.datePickerNgMessage = '30px';
        //     vm.datePickerpadright = '7px';
        //     vm.datePickerLabelleft = '30px';
        //     vm.datePickerLabelwidth = 'calc(100% - 30px)';
        //     vm.datePickerdivleft = '-15px';
        // }

        // vm.isAccountManagerSavedNewHire = false;

        // $scope.selectNewhire = function () {
        //     // Allow keypress for return key or spacebar key
        //     if (window.event.which === 13 || window.event.which === 32)
        //         vm.enableNewhire();
        // }


        // $scope.selectRehire = function () {
        //     // Allow keypress for return key or spacebar key
        //     if (window.event.which === 13 || window.event.which === 32)
        //         vm.enableRehire();
        // }

        // vm.tabOrderPlus = function () {
        //     return vm.tabOrder++;
        // }

        if ($stateParams.id) {
            vm.editNewHireId = $stateParams.id;
            $scope.isEdit = true;
            viewNewHire();
        } else {
            getJsonDocumentLibrary();
        }

        vm.enableNewhire = function () {
            vm.newHireToggleColor = '#ffffff';
            vm.reHireToggleColor = '#d3d3d3';
            vm.newHireToggleTextColor = '#d75a5a';
            vm.reHireToggleTextColor = '#555555';
            vm.newHire.hiringtype = true;
        }

        vm.enableRehire = function () {
            vm.newHireToggleColor = '#d3d3d3';
            vm.reHireToggleColor = '#ffffff';
            vm.newHireToggleTextColor = '#555555';
            vm.reHireToggleTextColor = '#d75a5a';
            vm.newHire.hiringtype = false;
        }

        // vm.citizenships = [{
        //     id: '1',
        //     value: 'US Citizen'
        // },
        // {
        //     id: '2',
        //     value: 'Green Card'
        // },
        // {
        //     id: '3',
        //     value: 'GC EAD'
        // },
        // {
        //     id: '4',
        //     value: 'H1B'
        // },
        // {
        //     id: '5',
        //     value: 'Others'
        // }

        // ];

        // // $scope.$watch('vm.newHire.hiringtype', function (newValue, oldValue) {
        // //     if (vm.newHire.hiringtype) {
        // //         vm.newHireToggleColor = '#ffffff';
        // //         vm.reHireToggleColor = '#d3d3d3';
        // //         vm.newHireToggleTextColor = '#d75a5a';
        // //         vm.reHireToggleTextColor = '#555555';
        // //     }
        // //     else {
        // //         vm.newHireToggleColor = '#d3d3d3';
        // //         vm.reHireToggleColor = '#ffffff';
        // //         vm.newHireToggleTextColor = '#555555';
        // //         vm.reHireToggleTextColor = '#d75a5a';
        // //     }
        // // });

        // $scope.$watch('vm.newHire.tentenddate', function (newValue, oldValue) {
        //     $scope.maxstrtDate = new Date(
        //         vm.newHire.tentenddate.getFullYear(),
        //         vm.newHire.tentenddate.getMonth(),
        //         vm.newHire.tentenddate.getDate() - 7
        //     );
        // });

        // function viewNewHire() {
        //     NewHiresService.viewNewHire(vm.editNewHireId).then(
        //         function (response) {
        //             vm.newHire = response.data;
        //             // console.log(vm.newHire);
        //             $scope.originalEmail = vm.newHire.emailid;
        //             vm.newHire.mileageReimbursement = vm.newHire.mileageReimbursement == 1 ? true : false;
        //             // if (vm.newHire.document) {
        //             //     vm.documentname = vm.newHire.document[0].documentname;
        //             //     vm.documentid = vm.newHire.document[0].documentid;
        //             // }
        //             if (vm.newHire.citizenshipid != 5) {
        //                 vm.newHire.citizenship = "";
        //             }

        //             //vm.getCities('edit');

        //             // vm.newHire.payrate = Math.round(vm.newHire.payrate * 100) / 100;
        //             // vm.newHire.billrate = Math.round(vm.newHire.billrate * 100) / 100;
        //             // vm.newHire.payrate = parseFloat(vm.newHire.payrate);
        //             // vm.newHire.billrate = parseFloat(vm.newHire.billrate);
        //             if (vm.newHire.otrate == 0) {
        //                 vm.newHire.otrate = null;
        //             }
        //             // else {
        //             //     vm.newHire.otrate = Math.round(vm.newHire.otrate * 100) / 100;
        //             //     // vm.newHire.otrate = parseFloat(vm.newHire.otrate);
        //             // }
        //             if (vm.newHire.otbillrate == 0) {
        //                 vm.newHire.otbillrate = null;
        //             } else {
        //                 // vm.newHire.otbillrate = Math.round(vm.newHire.otbillrate * 100) / 100;
        //                 // vm.newHire.otbillrate = + parseFloat(vm.newHire.otbillrate).toFixed(2);
        //                 // vm.newHire.otbillrate = 14.00;
        //                 // var numInput = document.getElementById('otBillRateId');
        //                 // numInput.addEventListener('keypress', function () {
        //                 //     this.setAttribute('type', 'text');
        //                 // });
        //                 // numInput.addEventListener('click', function () {
        //                 //     this.setAttribute('type', 'number');
        //                 // });
        //             }
        //             // vm.newHire.perdimrate = Math.round(vm.newHire.perdimrate * 100) / 100;
        //             vm.newHire.durationofthecontract = Math.round(vm.newHire.durationofthecontract * 100) / 100;

        //             // vm.newHire.udf1n = Math.round(vm.newHire.udf1n * 100) / 100;
        //             // vm.newHire.udf2n = Math.round(vm.newHire.udf2n * 100) / 100;
        //             // vm.newHire.udf3n = Math.round(vm.newHire.udf3n * 100) / 100;

        //             if (vm.newHire.udf8d) {
        //                 $scope.udf8d = vm.newHire.udf8d.substring(0, 10);
        //                 $scope.udf8d = $scope.udf8d.replace(/-/g, '/');
        //                 vm.newHire.udf8d = new Date($scope.udf8d);
        //             }

        //             if (vm.newHire.udf9d) {
        //                 $scope.udf9d = vm.newHire.udf9d.substring(0, 10);
        //                 $scope.udf9d = $scope.udf9d.replace(/-/g, '/');
        //                 vm.newHire.udf9d = new Date($scope.udf9d);
        //             }

        //             if (vm.newHire.tentstartdate) {
        //                 $scope.tentstartdate = vm.newHire.tentstartdate.substring(0, 10);
        //                 $scope.tentstartdate = $scope.tentstartdate.replace(/-/g, '/');
        //                 vm.newHire.tentstartdate = new Date($scope.tentstartdate);
        //             }
        //             if (vm.newHire.tentenddate) {
        //                 $scope.tentenddate = vm.newHire.tentenddate.substring(0, 10);
        //                 $scope.tentenddate = $scope.tentenddate.replace(/-/g, '/');
        //                 vm.newHire.tentenddate = new Date($scope.tentenddate);
        //             }
        //             if (vm.newHire.hiringtype) {
        //                 vm.enableNewhire();
        //             } else {
        //                 vm.enableRehire();
        //             }
        //             if (vm.newHire.notes) {
        //                 vm.notesRows = vm.newHire.notes.length / 150;
        //                 vm.notesRows = vm.notesRows + 1;
        //             }
        //             if (vm.newHire.udf4t || vm.newHire.udf5t || vm.newHire.udf6t ||
        //                 vm.newHire.udf7t || vm.newHire.udf1n != 0 || vm.newHire.udf2n != 0 ||
        //                 vm.newHire.udf3n != 0 || vm.newHire.udf8d || vm.newHire.udf9d) {
        //                 vm.isUdfExpanded = true;
        //             } else {
        //                 vm.isUdfExpanded = false;
        //             }
        //         },
        //         function (err) {
        //             ToastrService.error(err.message);
        //         }
        //     )
        // }

        // $scope.validateudf1n = function () {
        //     if (parseFloat(vm.newHire.udf1n) < 0.01) {
        //         $scope.newhirePersonalInfoForm.udf1n.$setValidity('validationError', false);
        //     } else {
        //         $scope.newhirePersonalInfoForm.udf1n.$setValidity('validationError', true);
        //     }
        // }
        // $scope.validateudf2n = function () {
        //     if (parseFloat(vm.newHire.udf2n) < 0.01) {
        //         $scope.newhirePersonalInfoForm.udf2n.$setValidity('validationError', false);
        //     } else {
        //         $scope.newhirePersonalInfoForm.udf2n.$setValidity('validationError', true);
        //     }
        // }
        // $scope.validateudf3n = function () {
        //     if (parseFloat(vm.newHire.udf3n) < 0.01) {
        //         $scope.newhirePersonalInfoForm.udf3n.$setValidity('validationError', false);
        //     } else {
        //         $scope.newhirePersonalInfoForm.udf3n.$setValidity('validationError', true);
        //     }
        // }

        // $scope.validatePerDiemRate = function () {
        //     if (parseFloat(vm.newHire.perdimrate) < 0.01) {
        //         $scope.newhirePersonalInfoForm.perdiemrate.$setValidity('validationError', false);
        //     } else {
        //         $scope.newhirePersonalInfoForm.perdiemrate.$setValidity('validationError', true);
        //     }
        // }

        // $scope.validateOtBillRate = function () {
        //     if (parseFloat(vm.newHire.otbillrate) <= parseFloat(vm.newHire.otrate)) {
        //         $scope.newhirePersonalInfoForm.otbillrate.$setValidity('validationError', false);
        //     } else {
        //         $scope.newhirePersonalInfoForm.otbillrate.$setValidity('validationError', true);
        //     }
        // }
        // $scope.validateOtPayRate = function () {
        //     if (parseFloat(vm.newHire.otrate) <= parseFloat(vm.newHire.payrate)) {
        //         $scope.newhirePersonalInfoForm.otrate.$setValidity('validationError', false);
        //     } else {
        //         $scope.newhirePersonalInfoForm.otrate.$setValidity('validationError', true);
        //     }
        // }
        // $scope.validateDoubleTimeRate = function () {
        //     if (parseFloat(vm.newHire.doubleOTrate) <= parseFloat(vm.newHire.payrate)) {
        //         $scope.newhirePersonalInfoForm.doubleTimeRate.$setValidity('validationError', false);
        //     } else {
        //         $scope.newhirePersonalInfoForm.doubleTimeRate.$setValidity('validationError', true);
        //     }
        // }
        // $scope.validateDoubleTimeBillRate = function () {
        //     if (parseFloat(vm.newHire.doubleOTbillrate) <= parseFloat(vm.newHire.billrate)) {
        //         $scope.newhirePersonalInfoForm.doubleTimeBillRate.$setValidity('validationError', false);
        //     } else {
        //         $scope.newhirePersonalInfoForm.doubleTimeBillRate.$setValidity('validationError', true);
        //     }
        // }
        // $scope.validateBillRate = function () {
        //     if (parseFloat(vm.newHire.billrate) <= parseFloat(vm.newHire.payrate)) {
        //         $scope.newhirePersonalInfoForm.billrate.$setValidity('validationError', false);
        //     } else {
        //         $scope.newhirePersonalInfoForm.billrate.$setValidity('validationError', true);
        //     }
        // }
        // $scope.validatePayRate = function () {
        //     if (parseFloat(vm.newHire.payrate) < 0.01) {
        //         $scope.newhirePersonalInfoForm.payrate.$setValidity('validationError', false);
        //     } else {
        //         $scope.newhirePersonalInfoForm.payrate.$setValidity('validationError', true);
        //     }
        // }

        // function getSourceProfile() {
        //     NewHiresService.getSourceProfile().then(
        //         function (response) {
        //             vm.sourceProfile = response.data;
        //         },
        //         function (err) {
        //             ToastrService.error(err.message);
        //         }
        //     )
        // }
        // getSourceProfile();

        // // vm.getCities = function (from) {
        // //     NewHiresService.getCities().then(
        // //         function (response) {
        // //             vm.cityList = response.data;

        // //             // if (!vm.editNewHireId) {
        // //             //     vm.newHire.city = vm.cityList[0].cityCode;
        // //             // }
        // //             if (from == 'add') {
        // //                 vm.newHire.city = vm.cityList[0].cityCode;
        // //             }
        // //         },
        // //         function (err) {
        // //             ToastrService.error($rootScope.errorMsgs.MSG132);
        // //         }
        // //     )
        // // }

        // function statesList() {
        //     NewHiresService.getStatesList().then(
        //         function (response) {
        //             vm.statesList = response.data;
        //             // vm.getCities(vm.hireInfo.state);
        //             if (!vm.editNewHireId) {
        //                 vm.newHire.worklocation = vm.statesList[0].stateCode;
        //                 //vm.getCities('add');
        //             }
        //         },
        //         function (err) {
        //             ToastrService.error($rootScope.errorMsgs.MSG132);
        //         }
        //     )
        // }
        // //statesList();

        // function getClientsList() {
        //     NewHiresService.getClientsList().then(
        //         function (response) {
        //             vm.clientsList = response.data;
        //         },
        //         function (err) {
        //             ToastrService.error(err.message);
        //         }
        //     )
        // }
        // getClientsList();

        // function getCategoryList() {
        //     NewHiresService.getCategoryList().then(
        //         function (response) {
        //             vm.categoryList = response.data;
        //         },
        //         function (err) {
        //             ToastrService.error(err.message);
        //         }
        //     )
        // }
        // getCategoryList();

        // vm.clearAttachment = function () {
        //     if (vm.files) {
        //         vm.files.attachment = null;
        //     }
        //     vm.documentname = null;
        // }

        $scope.viewSavedFile = function (doc) {
            if (doc) {
                $window.open($rootScope.NewHireDocsURL + doc.id + '.' + doc.type, '_blank');
            }

        }

        // $scope.updateCityStateCountryZipCand = function (cityParam, stateParam, zipParam) {
        //     if (cityParam) {
        //         vm.newHire.newhirecity = cityParam;
        //     }
        //     if (stateParam) {
        //         vm.newHire.newhirestate = stateParam;
        //     }
        //     // if(countryParam) { 
        //     //     vm.hireInfo.worklocation = countryParam; 
        //     // }   
        //     if (zipParam) {
        //         vm.newHire.zipcode = zipParam;
        //     }
        // }

        // vm.saveNewHires = function (form) {
        //     $scope.submitted = true;

        //     if (form.$invalid) {
        //         ToastrService.error($rootScope.errorMsgs.MSG127);
        //         return;
        //     }
        //     // function isInt(n) {
        //     //     return n % 1 === 0;
        //     //  }
        //     if (vm.newHire.durationofthecontract % 1 !== 0) {
        //         ToastrService.error('Please enter the valid Duration of Contract (in Months)');
        //         return;
        //     };
        //     if (vm.newHire.exampt == undefined) {
        //         ToastrService.error('Please select a valid Exempt Type');
        //         return;
        //     };

        //     if (!vm.newHire.emailid || !vm.newHire.firstname || !vm.newHire.lastname || !vm.newHire.phoneno || !vm.newHire.cstreetaddress || !vm.newHire.durationofthecontract || !vm.newHire.tentenddate ||
        //         !vm.newHire.jobtitile || !vm.newHire.worklocation || !vm.newHire.accmngr || !vm.newHire.accemail ||
        //         !vm.newHire.recremail || !vm.newHire.recrname || !vm.newHire.billrate || !vm.newHire.payrate || (vm.newHire.catgid == 2 && !vm.newHire.subvendorname) || (vm.newHire.catgid == 2 && !vm.newHire.subvendorname) || (vm.newHire.catgid == 2 && !vm.newHire.subvendoremail)) {
        //         ToastrService.error($rootScope.errorMsgs.MSG127);
        //         return;
        //     }
        //     if (parseFloat(vm.newHire.billrate) <= parseFloat(vm.newHire.payrate)) {
        //         ToastrService.error($rootScope.errorMsgs.MSG261);
        //         return;
        //     }
        //     if (vm.newHire.otrate || vm.newHire.otbillrate) {
        //         if ((vm.newHire.otrate != null || vm.newHire.otrate != '') && (vm.newHire.otbillrate == null || vm.newHire.otbillrate == '')) {
        //             ToastrService.error($rootScope.errorMsgs.MSG188);
        //             return;
        //         }
        //         if ((vm.newHire.otrate == null || vm.newHire.otrate == '') && (vm.newHire.otbillrate != null || vm.newHire.otbillrate != '')) {
        //             ToastrService.error($rootScope.errorMsgs.MSG189);
        //             return;
        //         }
        //         if (parseFloat(vm.newHire.otrate) <= parseFloat(vm.newHire.payrate)) {
        //             ToastrService.error($rootScope.errorMsgs.MSG262);
        //             return;
        //         }
        //         if (parseFloat(vm.newHire.otbillrate) <= parseFloat(vm.newHire.otrate)) {
        //             ToastrService.error($rootScope.errorMsgs.MSG263);
        //             return;
        //         }

        //     }
        //     //validations required for double time rate and double time bill rate
        //     if (vm.newHire.doubleOTrate || vm.newHire.doubleOTbillrate) {
        //         if ((vm.newHire.doubleOTrate != null || vm.newHire.doubleOTrate != '') && (vm.newHire.doubleOTbillrate == null || vm.newHire.doubleOTbillrate == '')) {
        //             ToastrService.error($rootScope.errorMsgs.MSG274);
        //             return;
        //         }
        //         if ((vm.newHire.doubleOTrate == null || vm.newHire.doubleOTrate == '') && (vm.newHire.doubleOTbillrate != null || vm.newHire.doubleOTbillrate != '')) {
        //             ToastrService.error($rootScope.errorMsgs.MSG275);
        //             return;
        //         }
        //         if (parseFloat(vm.newHire.doubleOTrate) <= parseFloat(vm.newHire.payrate)) {
        //             ToastrService.error($rootScope.errorMsgs.MSG276);
        //             return;
        //         }
        //         if (parseFloat(vm.newHire.doubleOTbillrate) <= parseFloat(vm.newHire.doubleOTrate)) {
        //             ToastrService.error($rootScope.errorMsgs.MSG277);
        //             return;
        //         }

        //     }
        //     if ($scope.attachedFiles && $scope.attachedFiles.length > 0) {
        //         if ($scope.attachedFiles.length == 1 && (!vm.newHire.docDesc1)) {
        //             ToastrService.error('Please enter description for the attached document');
        //             return;
        //         } else if ($scope.attachedFiles.length == 2 && (!vm.newHire.docDesc1 || !vm.newHire.docDesc2)) {
        //             ToastrService.error('Please enter description for the attached documents');
        //             return;
        //         } else if ($scope.attachedFiles.length == 3 && (!vm.newHire.docDesc1 || !vm.newHire.docDesc2 || !vm.newHire.docDesc3)) {
        //             ToastrService.error('Please enter description for the attached documents');
        //             return;
        //         }
        //     }
        //     if (vm.newHire.tentstartdate > vm.newHire.tentenddate) {
        //         ToastrService.error($rootScope.errorMsgs.MSG190);
        //         return;
        //     }
        //     vm.categoryChange(vm.newHire.catgid);

        //     vm.newHire.payrate = parseFloat(vm.newHire.payrate).toFixed(2);
        //     vm.newHire.billrate = parseFloat(vm.newHire.billrate).toFixed(2);
        //     if (vm.newHire.otrate) {
        //         vm.newHire.otrate = parseFloat(vm.newHire.otrate).toFixed(2);
        //     }
        //     if (vm.newHire.otbillrate) {
        //         vm.newHire.otbillrate = parseFloat(vm.newHire.otbillrate).toFixed(2);
        //     }

        //     if (vm.newHire.perdiem == false) {
        //         vm.newHire.perdimrate = '';
        //     }
        //     if (vm.newHire.citizenshipid != 5) {
        //         vm.newHire.citizenship = vm.citizenships[vm.newHire.citizenshipid - 1].value;
        //     }

        //     vm.newHire.jobtitile = vm.newHire.jobtitile.replace(/–/g, '-');
        //     vm.newHire.jobtitile = vm.newHire.jobtitile.replace(/‘/g, '\'');
        //     if (vm.newHire.jobid) {
        //         vm.newHire.jobid = vm.newHire.jobid.replace(/–/g, '-');
        //         vm.newHire.jobid = vm.newHire.jobid.replace(/‘/g, '\'');
        //     }
        //     if (vm.newHire.apartmentsuitenumber) {
        //         vm.newHire.apartmentsuitenumber = vm.newHire.apartmentsuitenumber.replace(/–/g, '-');
        //         vm.newHire.apartmentsuitenumber = vm.newHire.apartmentsuitenumber.replace(/‘/g, '\'');
        //     }

        //     var objNewHire = new FormData();
        //     objNewHire.append("emailid", vm.newHire.emailid);

        //     objNewHire.append("firstname", vm.newHire.firstname.trim());
        //     objNewHire.append("lastname", vm.newHire.lastname.trim());
        //     objNewHire.append("phoneno", vm.newHire.phoneno);
        //     objNewHire.append("jobtitile", vm.newHire.jobtitile.trim());
        //     objNewHire.append("worklocation", vm.newHire.worklocation);
        //     objNewHire.append("city", vm.newHire.city);
        //     if (vm.newHire.notes) {
        //         objNewHire.append("notes", vm.newHire.notes.trim());
        //     }
        //     objNewHire.append("accmngr", vm.newHire.accmngr.trim());
        //     objNewHire.append("accemail", vm.newHire.accemail);
        //     objNewHire.append("recrname", vm.newHire.recrname.trim());
        //     objNewHire.append("recremail", vm.newHire.recremail);
        //     // objNewHire.append("docstatus", true);
        //     objNewHire.append("catgname", vm.newHire.catgname);
        //     objNewHire.append("citizenshipid", vm.newHire.citizenshipid);
        //     objNewHire.append("citizenship", vm.newHire.citizenship);
        //     objNewHire.append("catgid", vm.newHire.catgid);
        //     objNewHire.append("clientid", vm.newHire.clientid);
        //     objNewHire.append("billrate", parseFloat(vm.newHire.billrate).toFixed(2));
        //     objNewHire.append("payrate", parseFloat(vm.newHire.payrate).toFixed(2));
        //     objNewHire.append("jobid", (vm.newHire.jobid ? vm.newHire.jobid : ''));
        //     objNewHire.append("apartmentsuitenumber", (vm.newHire.apartmentsuitenumber ? vm.newHire.apartmentsuitenumber : ''));
        //     var momentObj = moment(vm.newHire.tentstartdate);
        //     var createdTime = momentObj.format("MM/DD/YYYY  hh:mm:ss");
        //     objNewHire.append("tentstartdate", createdTime);
        //     objNewHire.append("sourceid", vm.newHire.sourceid);
        //     objNewHire.append("hiringtype", vm.newHire.hiringtype);
        //     objNewHire.append("perdiem", vm.newHire.perdiem ? vm.newHire.perdiem : false);
        //     objNewHire.append("perdimrate", vm.newHire.perdimrate ? parseFloat(vm.newHire.perdimrate).toFixed(2) : '');
        //     objNewHire.append("otrate", vm.newHire.otrate ? parseFloat(vm.newHire.otrate).toFixed(2) : '');
        //     objNewHire.append("otbillrate", vm.newHire.otbillrate ? parseFloat(vm.newHire.otbillrate).toFixed(2) : '');


        //     //New Fields after feedback
        //     var momentObjEndDate = moment(vm.newHire.tentenddate);
        //     var createdTimeEndDate = momentObjEndDate.format("MM/DD/YYYY  hh:mm:ss");
        //     objNewHire.append("tentenddate", createdTimeEndDate);
        //     objNewHire.append("durationofthecontract", vm.newHire.durationofthecontract);
        //     objNewHire.append("cstreetaddress", vm.newHire.cstreetaddress);
        //     objNewHire.append("middlename", vm.newHire.middlename ? vm.newHire.middlename : '');
        //     objNewHire.append("cityzipcode", '');
        //     objNewHire.append("jobcategoryid", vm.newHire.jobcategoryid);
        //     if (vm.newHire.catgid == 2 || vm.newHire.catgid == 3) {
        //         objNewHire.append("subvendorname", vm.newHire.subvendorname.trim());
        //         if (vm.newHire.catgid != 3) {
        //             objNewHire.append("subvendoremail", vm.newHire.subvendoremail);
        //         }
        //     } else {
        //         objNewHire.append("subvendorname", '');
        //         objNewHire.append("subvendoremail", '');
        //     }
        //     objNewHire.append("udf1n", vm.newHire.udf1n ? parseFloat(vm.newHire.udf1n).toFixed(2) : '');
        //     objNewHire.append("udf2n", vm.newHire.udf2n ? parseFloat(vm.newHire.udf2n).toFixed(2) : '');
        //     objNewHire.append("udf3n", vm.newHire.udf3n ? parseFloat(vm.newHire.udf3n).toFixed(2) : '');
        //     if (vm.newHire.udf4t) {
        //         objNewHire.append("udf4t", vm.newHire.udf4t ? vm.newHire.udf4t.trim() : '');
        //     }
        //     if (vm.newHire.udf5t) {
        //         objNewHire.append("udf5t", vm.newHire.udf5t ? vm.newHire.udf5t.trim() : '');
        //     }
        //     if (vm.newHire.udf6t) {
        //         objNewHire.append("udf6t", vm.newHire.udf6t ? vm.newHire.udf6t.trim() : '');
        //     }
        //     if (vm.newHire.udf7t) {
        //         objNewHire.append("udf7t", vm.newHire.udf7t ? vm.newHire.udf7t.trim() : '');
        //     }
        //     if (vm.newHire.udf8d) {
        //         var momentObj = moment(vm.newHire.udf8d);
        //         var createdudf1Time = momentObj.format("MM/DD/YYYY  hh:mm:ss");
        //         objNewHire.append("udf8d", createdudf1Time ? createdudf1Time : '');
        //     }
        //     if (vm.newHire.udf9d) {
        //         var momentObj = moment(vm.newHire.udf9d);
        //         var createdudf2Time = momentObj.format("MM/DD/YYYY  hh:mm:ss");
        //         objNewHire.append("udf9d", createdudf2Time ? createdudf2Time : '');
        //     }

        //     // if (vm.editNewHireId) {
        //     //     if (vm.newHire.document) {
        //     //         objNewHire.append("documentid", vm.newHire.document[0].documentid);
        //     //         if (!vm.files.attachment && vm.documentname) {
        //     //             objNewHire.append("newhiredocname", vm.newHire.document[0].documentname);
        //     //         }
        //     //         // else if (!vm.documentname) {
        //     //         //     objNewHire.append("documentname", null);
        //     //         // }
        //     //     }
        //     //     // else {
        //     //     //     objNewHire.append("documentid", '');
        //     //     // }
        //     //     objNewHire.append("newhireid", vm.editNewHireId);
        //     // }
        //     // if (vm.files.attachment) {
        //     //     // vm.files.attachment.file.randomId = 1211323;
        //     //     objNewHire.append("documentid", 0);
        //     //     objNewHire.append("documentname", vm.files.attachment.file);
        //     // }

        //     //New Fields with CR 02-Jan-2019
        //     if (vm.editNewHireId) {
        //         objNewHire.append("newhireid", vm.editNewHireId);
        //     }
        //     objNewHire.append("address", vm.newHire.address ? vm.newHire.address : '');
        //     objNewHire.append("newhireaptstn", vm.newHire.newhireaptstn ? vm.newHire.newhireaptstn : '');
        //     objNewHire.append("newhirecity", vm.newHire.newhirecity ? vm.newHire.newhirecity : '');
        //     objNewHire.append("newhirestate", vm.newHire.newhirestate ? vm.newHire.newhirestate : '');
        //     objNewHire.append("zipcode", vm.newHire.zipcode ? vm.newHire.zipcode : '');
        //     objNewHire.append("sourcername", vm.newHire.sourcername ? vm.newHire.sourcername : '');
        //     objNewHire.append("doubleOTrate", vm.newHire.doubleOTrate ? parseFloat(vm.newHire.doubleOTrate).toFixed(2) : '');
        //     objNewHire.append("doubleOTbillrate", vm.newHire.doubleOTbillrate ? parseFloat(vm.newHire.doubleOTbillrate).toFixed(2) : '');
        //     objNewHire.append("mileageReimbursement", vm.newHire.mileageReimbursement ? 1 : 0);
        //     objNewHire.append("exampt", vm.newHire.exampt);
        //     //New Fields with CR 02-Jan-2019 for 3 file attachments
        //     objNewHire.append("file1desc", vm.newHire.docDesc1 ? vm.newHire.docDesc1 : '');
        //     objNewHire.append("file2desc", vm.newHire.docDesc2 ? vm.newHire.docDesc2 : '');
        //     objNewHire.append("file3desc", vm.newHire.docDesc3 ? vm.newHire.docDesc3 : '');

        //     if ($scope.attachedFiles.length > 0) {
        //         for (var i = 0; i < $scope.attachedFiles.length; i++) {
        //             objNewHire.append('documentname', $scope.attachedFiles[i]);
        //         }
        //     }




        //     // return;
        //     if (vm.editNewHireId) {
        //         $scope.loading = true;
        //         NewHiresService.editNewHire(objNewHire).then(
        //             function (response) {
        //                 if (response.data.Success) {
        //                     $state.go('NewHires', {}, {
        //                         reload: 'NewHires'
        //                     });
        //                     ToastrService.success(response.data.message);
        //                 } else {
        //                     ToastrService.error(response.data.message);
        //                 }
        //             },
        //             function (err) {
        //                 ToastrService.error($rootScope.errorMsgs.MSG191);
        //             }
        //         ).finally(function () {
        //             $scope.loading = false;
        //         });
        //     } else {
        //         $scope.loading = true;
        //         NewHiresService.addNewHire(objNewHire).then(
        //             function (response) {
        //                 if (response.data.Success) {

        //                     if ($rootScope.isAccountManager) {
        //                         vm.newHire = {};
        //                         form.$setPristine();
        //                         form.$setUntouched();
        //                         vm.newHire.hiringtype = true;
        //                         vm.newHire.tentstartdate = $scope.minstrtDate;
        //                         // vm.newHire.worklocation = vm.statesList[0].stateCode;
        //                         // vm.newHire.city = vm.cityList[0].cityCode;
        //                         $scope.submitted = false;
        //                         vm.isAccountManagerSavedNewHire = true;
        //                     } else {
        //                         $state.go('NewHires', {}, {
        //                             reload: 'NewHires'
        //                         });
        //                     }
        //                     ToastrService.success(response.data.message);
        //                 } else {
        //                     ToastrService.error(response.data.message);
        //                 }
        //             },
        //             function (err) {
        //                 ToastrService.error($rootScope.errorMsgs.MSG192);
        //             }
        //         ).finally(function () {
        //             $scope.loading = false;
        //         });
        //     }
        // }

        // vm.closeAddNewHire = function(){
        //     $state.go('NewHires');
        // }

        // vm.categoryChange = function (categoryid) {
        //     for (var i = 0; i < vm.categoryList.Category.length; i++) {
        //         if (categoryid == vm.categoryList.Category[i].catgid) {
        //             vm.newHire.catgname = vm.categoryList.Category[i].catgname;
        //         }
        //     }
        // }

        // // $scope.$watch('vm.files.attachment', function () {
        // //     // file size cannot be more than 10MB
        // //     if (vm.files) {
        // //         if (vm.files.attachment) {
        // //             var fileName = vm.files.attachment.file.name.split('.');
        // //             var fileNameLength = 0;
        // //             for(var i=0;i < fileName.length; i++){
        // //                 fileNameLength += fileName[i].length;
        // //             }

        // //             if (fileNameLength > 50) {
        // //                 // var fileName = $scope.file[0].name.split;
        // //                 // if (fileName[0].length > 50) {
        // //                 ToastrService.error('The Uploaded document name should not be more than 50 characters.');
        // //                 vm.files.attachment.file = null;
        // //                 return;
        // //                 // }
        // //             }
        // //             // console.log($scope.file);
        // //             if (vm.files.attachment.file.size > 10 * 1024 * 1024) {
        // //                 ToastrService.error($rootScope.errorMsgs.MSG151);
        // //                 vm.files.attachment.file = null;
        // //                 return;
        // //             }
        // //         }
        // //     }
        // // });

        // $scope.myTentDate = new Date();

        // $scope.minstrtDate = new Date(
        //     $scope.myTentDate.getFullYear(),
        //     $scope.myTentDate.getMonth(),
        //     $scope.myTentDate.getDate() + 7
        // );

        function validateEmailId(field) {
            var objEmailId = {};
            if(!field.isMaster){
                return false;
            }
            // Issue 169: Do not validate email in edit mode
            //if ($scope.isEdit && $scope.originalEmail == vm.newHire.emailid) return;

            objEmailId.emailid = field.value;
            NewHiresService.validateNewHireEmail(objEmailId).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error($rootScope.errorMsgs.MSG193);
                        // vm.newHire.emailid = "";
                        field.value = '';
                        // return;
                    }
                    if (response.data.reHire) {
                        $scope.reHireData = response.data;

                        $mdDialog.show({
                            multiple: true,
                            scope: $scope,
                            preserveScope: true,
                            controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) { }],
                            template: '<md-dialog aria-label="Delete" style="width:400px;">' +
                                '<div layout="column" layout-align="start end" style="padding:10px;">' +
                                '<ng-md-icon icon="clear" size="14" style="margin:8px 0 -23px 0;cursor:pointer" ng-click="hideModal()">' +
                                '</ng-md-icon>' +
                                '</div>' +
                                '<md-content style="background-color:white">' +
                                '<div layout="column" layout-align="center center"><img src="images/que_icon.png" width="70px" height="70px"/></div>' +
                                '<p align=center style="padding:10px 10px 20px 20px;font-size:13px;" >Email Id is already in use. Do you want ReHire this user?</p>' +
                                '<md-divider></md-divider>' +
                                '<div layout="row" layout-align="end center" style="background-color:rgb(250,250,250);height:60px;padding:10px" flex>' +
                                '<md-button class="md-raised md-primary" ng-click="confirmData()" >OK</md-button>' +
                                '<md-button class="md-secondary" ng-click="hideModal()">Cancel</md-button>' +
                                '</div>' +
                                '</md-content>' +
                                '</md-dialog>'
                        });

                        // return;
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG194);
                }
            )
        }

        $scope.confirmData = function () {
            $scope.formFields = angular.copy($scope.reHireData.jsonData.components);
            // vm.newHire.firstname = $scope.reHireData.firstName;
            // vm.newHire.lastname = $scope.reHireData.lastName;
            // vm.newHire.phoneno = $scope.reHireData.phoneNo;
            // vm.newHire.jobtitile = $scope.reHireData.jobTitle;
            vm.newHire.hiringtype = false;
            vm.enableRehire();
            $mdDialog.hide();

        }


        // $scope.hide = function (ev) {
        //     $mdDialog.hide();
        // }

        // $scope.cancel = function (ev) {
        //     $mdDialog.cancel();
        // }

        $scope.hideModal = function (answer) {
            ToastrService.error($rootScope.errorMsgs.MSG193);
            
            var dep_ary = $filter('filter')($scope.formFields, { 'isMaster': true,'Type':'Email' });
            if (dep_ary && dep_ary.length) {
                dep_ary[0].value = '';
            }
            // answer.value = '';
            // vm.newHire.emailid = "";
            $mdDialog.hide(answer);
        }

        // $scope.answer = function (ev, answer) {
        //     $mdDialog.hide({
        //         'reload': addedAnyDoc
        //     });
        // }

        // // function viewAttachment(){
        // //     var attachmentURL = $window.URL.createObjectURL(vm.files.attachment.file) ;
        // //     $window.open(attachmentURL);
        // // }

        $scope.browserType = function () {
            if (navigator.userAgent.indexOf("Safari") != -1) {
                vm.heightforNewHireHeader = '100px';
                vm.heightforNewHireMdContent = '600px';
                vm.heightforNewHireSave = '80px';
                if (navigator.userAgent.indexOf("Version/10") != -1) {
                    vm.heightforNewHireHeader = '100px';
                    vm.heightforNewHireMdContent = '500px';
                    vm.heightforNewHireSave = '80px';
                }
            } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10

                vm.heightforNewHireHeader = '100px';
                vm.heightforNewHireMdContent = '450px';
                vm.heightforNewHireSave = '50px';
            }
        }
        $scope.browserType();

        // function getJobHireCategory() {
        //     NewHiresService.getJobHireCategory().then(
        //         function (response) {
        //             vm.jobCategories = response.data;
        //         },
        //         function (err) {
        //             ToastrService.error(err.message);
        //         }
        //     )
        // }
        // getJobHireCategory();

        // function logout() {
        //     // localStorage.removeItem("ReturnUrl");
        //     localStorage.removeItem("ask-auth-token");
        //     $scope.loading = true;
        //     NavigationService.logout().then(
        //         function (response) {
        //             if (response.data.Error) {
        //                 ToastrService.error(response.data.message);
        //             }

        //             if (response.data.Success) {
        //                 ToastrService.success(response.data.message);
        //                 // $state.go('Login');
        //                 $location.path('/');
        //             }
        //         },
        //         function (err) {
        //             ToastrService.error($rootScope.errorMsgs.MSG187);
        //         }
        //     ).finally(function () {
        //         $scope.loading = false;
        //     });
        // }

        // $scope.checkDocExtension = function (docName) {
        //     if (docName) {
        //         var docExt = docName.split('.');
        //         return docExt[docExt.length - 1];
        //     }
        // }

        // $scope.$watch('vm.file', function () {
        //     if (vm.file && vm.file.length) {
        //         for (var i = 0; i < vm.file.length; i++) {
        //             if (Math.round((vm.file[i].size / (1024 * 1024)) * 100) / 100 <= 10.00) {
        //                 if ((vm.newHire.document ? vm.newHire.document.length : 0) + $scope.attachedFiles.length < 3) {
        //                     if ($scope.attachedFiles.length == 0) {
        //                         $scope.attachedFiles[i] = vm.file[i];
        //                         $scope.attachedFiles[i].rndmId = '_' + Math.random().toString(36).substr(2, 9);
        //                         // $scope.totalFileSize += Math.round((vm.file[i].size / (1024 * 1024)) * 100) / 100;
        //                     } else if ($scope.attachedFiles.length > 0 && $scope.attachedFiles.length < 3) {
        //                         var count = $scope.attachedFiles.length;
        //                         $scope.attachedFiles[count] = vm.file[i];
        //                         $scope.attachedFiles[count].rndmId = '_' + Math.random().toString(36).substr(2, 9);
        //                         // $scope.totalFileSize += Math.round((vm.file[i].size / (1024 * 1024)) * 100) / 100;
        //                     } else if ($scope.attachedFiles.length >= 3) {
        //                         ToastrService.error("Maximum of three files can be attached.");
        //                         return;
        //                     }
        //                 } else {
        //                     ToastrService.error("Maximum of three files can be attached.");
        //                     return;
        //                 }
        //             } else {
        //                 ToastrService.error("Maximum file size should be 10MB.");
        //                 return;
        //             }
        //         }
        //     } else {

        //     }
        // });

        // $scope.deleteAttachedFile = function (fileIndex, filesize) {

        //     if (fileIndex == 0) {
        //         vm.newHire.docDesc1 = vm.newHire.docDesc2;
        //         vm.newHire.docDesc2 = vm.newHire.docDesc3;
        //         vm.newHire.docDesc3 = "";
        //     }
        //     else if (fileIndex == 1) {
        //         vm.newHire.docDesc2 = vm.newHire.docDesc3;
        //         vm.newHire.docDesc3 = "";
        //     }
        //     else if (fileIndex == 2) {
        //         vm.newHire.docDesc3 = "";
        //     }
        //     $scope.attachedFiles.splice(fileIndex, 1);

        //     // $scope.totalFileSize -= filesize;
        // }

        // $scope.viewFile = function (attachfile) {
        //     // $window.open(window.URL.createObjectURL(attachfile), '_blank');

        //     if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
        //         window.navigator.msSaveOrOpenBlob(new Blob([attachfile], { type: attachfile.type }), attachfile.name);
        //     } else {
        //         $window.open((window.URL || window.webkitURL).createObjectURL(attachfile), '_blank');
        //     }
        // }

        // $scope.deleteSavedFile = function (newhireDocId, index) {
        //     NewHiresService.deleteNewHireDocument(newhireDocId).then(
        //         function (response) {
        //             if (response.data.Error) {
        //                 ToastrService.error(response.data.message);
        //             }

        //             if (response.data.Success) {
        //                 ToastrService.success(response.data.message);
        //                 vm.newHire.document.splice(index, 1);
        //                 $mdDialog.hide();

        //             }
        //         },
        //         function (err) {
        //             // ToastrService.error($rootScope.errorMsgs.MSG187);
        //         }
        //     ).finally(function () {
        //         $scope.loading = false;
        //     });
        // }

        // $scope.showStepDeleteConfirm = function (docId, docName, index) {
        //     $mdDialog.show({
        //         multiple: true,
        //         scope: $scope,
        //         preserveScope: true,
        //         controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {
        //             $scope.hideModal = function () {
        //                 $mdDialog.hide();
        //             }
        //         }],
        //         template: '<md-dialog aria-label="Delete" style="width:400px;">' +
        //             '<div layout="column" layout-align="start end" style="padding:10px;">' +
        //             '<ng-md-icon icon="clear" size="14" style="margin:8px 0 -23px 0;cursor:pointer" ng-click="hideModal()">' +
        //             '</ng-md-icon>' +
        //             '</div>' +
        //             '<md-content style="background-color:white">' +
        //             '<div layout="column" layout-align="center center"><img src="images/que_icon.png" width="70px" height="70px"/></div>' +
        //             '<p align=center style="padding:10px 10px 20px 20px;font-size:13px;" >Are you sure you want to delete the doc - ' + docName + ' ?</p>' +
        //             '<md-divider></md-divider>' +
        //             '<div layout="row" layout-align="end center" style="background-color:rgb(250,250,250);height:60px;padding:10px" flex>' +
        //             '<md-button class="md-raised md-primary" ng-click="deleteSavedFile(' + docId + ',' + index + ')" >OK</md-button>' +
        //             '<md-button class="md-secondary" ng-click="hideModal()">Cancel</md-button>' +
        //             '</div>' +
        //             '</md-content>' +
        //             '</md-dialog>'
        //     });
        // }
        // $scope.changeexempt = function () {
        //     if (vm.newHire.exampt == 1) {
        //         vm.newHire.otrate = "";
        //         vm.newHire.otbillrate = "";
        //     }
        // }
        $scope.getFieldRadioPar = function (settingname, obj) {
            var result = {};
            var settings = obj.Settings;
            $.each(settings, function (index, set) {
                if (set.name == settingname) {
                    result = set;
                    return;
                }
            });
            if (!Object.keys(result).length) {
                //Continue to search settings in the checkbox zone
                $.each(settings[settings.length - 1].Options, function (index, set) {
                    if (set.name == settingname) {
                        result = set;
                        return;
                    }
                });
            }
            return result;

        }

        $scope.getDateValue = function (currentobj, offsetdays) {
            // if(currentobj !== 'currentdate'){
            //     dateobj = null;
            // }
            var dateobj;
            if (currentobj == 'currentdate' || currentobj == 'Current Date') {
                dateobj = new Date();
            }
            else if (currentobj == 'weekmorethancurrentdate' || currentobj == 'Current Date + 7 days') {
                dateobj = new Date();
                dateobj.setDate(dateobj.getDate() + 7);
            }
            else {
                for (var i = 0; i < $scope.formFields.length; i++) {
                    if ($scope.formFields[i].name == currentobj && $scope.formFields[i].value)
                        dateobj = $scope.formFields[i].value;
                    dateobj = new Date(dateobj);
                }
            }
            if (offsetdays != 0 && dateobj) {
                dateobj.setDate(dateobj.getDate() + offsetdays);
            }
            return dateobj;
        }

        $scope.getNumberValue = function (currentobj) {
            var numObj;
            for (var i = 0; i < $scope.formFields.length; i++) {
                if ($scope.formFields[i].name == currentobj && $scope.formFields[i].value) {
                    numObj = $scope.formFields[i].value;
                }
            }
            return numObj;
        }
        // $scope.getDateValue = function (currentobj, offsetdays) {
        //     // if(currentobj !== 'currentdate'){
        //     //     dateobj = null;
        //     // }
        //     var dateobj;
        //     if (currentobj == 'currentdate' || currentobj == 'Current Date') {
        //         dateobj = new Date();
        //     }
        //     else if(currentobj == 'weekmorethancurrentdate' || currentobj == 'Current Date + 7 days'){
        //         dateobj = new Date();
        //         dateobj.setDate(dateobj.getDate() + 7);
        //     }
        //     else {
        //         for (var i = 0; i < $scope.formFields.length; i++) {
        //             if ($scope.formFields[i].name == currentobj && $scope.formFields[i].value)
        //                 dateobj = $scope.formFields[i].value;
        //             dateobj = new Date(dateobj);
        //         }
        //     }
        //     if (offsetdays != 0 && dateobj) {
        //         dateobj.setDate(dateobj.getDate() + offsetdays);
        //     }
        //     return dateobj;
        // }

        // $scope.getNumberValue = function (currentobj) {
        //     var numObj;
        //     for (var i = 0; i < $scope.formFields.length; i++) {
        //         if ($scope.formFields[i].name == currentobj && $scope.formFields[i].value){
        //             numObj = $scope.formFields[i].value;
        //         }
        //     }
        //     return numObj;
        // }


        $scope.getDependentModel = function (field) {
            var dep_ary = $filter('filter')(field.Settings, { 'Type': 'dependencyMask' });
            if (dep_ary && dep_ary.length && dep_ary[0].isDependent && dep_ary[0].isDependent.value) {
                var dep_other_ary = $filter('filter')(dep_ary[0].dependencyObjs, { 'type': 'otherfield' });
                if (dep_other_ary && dep_other_ary.length && dep_other_ary[0].value) {
                    var allCtrlsAry = $filter('filter')($scope.formFields, { 'name': dep_other_ary[0].value });

                    if (allCtrlsAry && allCtrlsAry.length) {
                        //allCtrlsAry[0].changedValue =  allCtrlsAry[0].changedValue ? allCtrlsAry[0].changedValue : '';
                        return allCtrlsAry[0].value;
                    }
                }

            }
            //return null;
        }

        $scope.getDependentModelName = function (field) {
            var dep_ary = $filter('filter')(field.Settings, { 'Type': 'dependencyMask' });
            if (dep_ary && dep_ary.length && dep_ary[0].isDependent && dep_ary[0].isDependent.value) {
                var dep_other_ary = $filter('filter')(dep_ary[0].dependencyObjs, { 'type': 'otherfield' });
                if (dep_other_ary && dep_other_ary.length && dep_other_ary[0].value) {
                    var allCtrlsAry = $filter('filter')($scope.formFields, { 'name': dep_other_ary[0].value });

                    if (allCtrlsAry && allCtrlsAry.length) {
                        //allCtrlsAry[0].changedValue =  allCtrlsAry[0].changedValue ? allCtrlsAry[0].changedValue : '';
                        return allCtrlsAry[0].labelName;
                    }
                }

            }
            //return null;
        }

        var controlsNotToBeCleared = [];
        $scope.isControlShow = function (controlName) {
            var showControl = true;
            var ary = $filter('filter')($scope.formFields, { 'Type': 'radio' }, true);
            var aryDrop = $filter('filter')($scope.formFields, { 'Type': 'dropdown' }, true);
            ary = ary.concat(aryDrop);
            if (ary.length) {
                for (var a = 0; a < ary.length; a++) {
                    var radioChoice = $filter('filter')(ary[a].Settings, { 'name': "Radio Choice" }, true);
                    for (var i = 0; i < radioChoice[0].Possiblevalue.length; i++) {
                        if (radioChoice[0].Possiblevalue[i].showControls.indexOf(controlName) != -1) {
                            if (ary[a].value == radioChoice[0].Possiblevalue[i].value) {
                                showControl = true;
                                // if (controlsNotToBeCleared.indexOf(controlName) == -1) {
                                //     controlsNotToBeCleared.push(controlName);
                                // }
                                break;
                            }
                            else {
                                showControl = false;

                            }
                        }
                    }
                }
            }

            var showControlChk = true;
            var aryChk = $filter('filter')($scope.formFields, { 'Type': 'checkbox' }, true);
            if (aryChk.length) {
                for (var a = 0; a < aryChk.length; a++) {
                    var checkboxChoice = $filter('filter')(aryChk[a].Settings, { 'name': "Show Controls" }, true);
                    if (checkboxChoice[0].showControls.indexOf(controlName) != -1) {
                        if (aryChk[a].value) {
                            showControlChk = true;
                            // if (controlsNotToBeCleared.indexOf(controlName) == -1) {
                            //     controlsNotToBeCleared.push(controlName);
                            // }
                            break;
                        }
                        else {
                            showControlChk = false;

                        }
                    }

                }
            }
            return showControl && showControlChk;
        }

        // var controlsToBeCleared = [];
        // var controlsToBeClearedCheckBox = [];
        // var controlsNotToBeClearedCheckBox = [];
        // $scope.clearHiddenControlValue = function (controlName) {
        //     // controlsToBeCleared = [];
        //     // controlsNotToBeCleared = [];
        //     var control = $filter('filter')($scope.formFields, { 'name': controlName }, true);
        //     var controlSetting = $filter('filter')(control[0].Settings, { 'name': "Radio Choice" }, true);
        //     for (var i = 0; i < controlSetting[0].Possiblevalue.length; i++) {
        //         if (control[0].value != controlSetting[0].Possiblevalue[i].value) {
        //             for (var j = 0; j < controlSetting[0].Possiblevalue[i].showControls.length; j++) {
        //                 var controlToClear = $filter('filter')($scope.formFields, { 'name': controlSetting[0].Possiblevalue[i].showControls[j] }, true);
        //                 // controlToClear[0].value = "";
        //                 if (controlsNotToBeCleared.indexOf(controlToClear[0].name) == -1) {
        //                     // controlsToBeCleared.push(controlToClear[0].name);
        //                 }
        //             }
        //         }
        //         else {
        //             for (var j = 0; j < controlSetting[0].Possiblevalue[i].showControls.length; j++) {
        //                 var controlNotToClear = $filter('filter')($scope.formFields, { 'name': controlSetting[0].Possiblevalue[i].showControls[j] }, true);
        //                 // controlsNotToBeCleared.push(controlNotToClear[0].name);
        //             }
        //         }
        //     }
        // }


        // $scope.clearHiddenControlValueCheckbox = function (controlName, controlValue) {
        //     var control = $filter('filter')($scope.formFields, { 'name': controlName }, true);
        //     var controlSetting = $filter('filter')(control[0].Settings, { 'name': "Show Controls" }, true);
        //     if (!controlValue) {
        //         for (var j = 0; j < controlSetting[0].showControls.length; j++) {
        //             var controlToClear = $filter('filter')($scope.formFields, { 'name': controlSetting[0].showControls[j] }, true);
        //             // controlToClear[0].value = "";
        //             controlsToBeClearedCheckBox.push(controlToClear[0].name);
        //         }
        //     }
        //     return;
        // }

    }
})();