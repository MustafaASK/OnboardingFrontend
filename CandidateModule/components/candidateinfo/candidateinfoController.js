(function () {
    'use strict';
    candidateApp.controller('CandidateInfoController', candidateInfoController);
    candidateInfoController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'ToastrService', 'CandidateUsersService', '$filter', '$mdDialog'];

    function candidateInfoController($rootScope, $scope, $state, $stateParams, ToastrService, CandidateUsersService, $filter, $mdDialog) {

        var vm = this;
        $scope.candidateInfo = $rootScope.CandidateInfo;
        $scope.isDisabledControl = false;
        var submitRejectedForm = false;
        $scope.selectedIndexTab = 0;
        $scope.loading = false;
        var selected = null,
            previous = null;


        // for(var i=0; i<$scope.candidateInfo.newhireworkflowwebforms.length; i++){
        //     if(!$scope.candidateInfo.newhireworkflowwebforms[i].isSaved){
        //         $scope.selectedIndexTab = i;
        //         break;
        //     }
        // }

        $scope.changeField = function (field) {
            if (field.mappingId && field.mappingId != 0) {
                field.isUpdated = true;
            }
        }

        vm.navigatePrevious = function () {
            $scope.selectedIndexTab = $scope.selectedIndexTab - 1;
        }

        vm.navigateNext = function () {
            if (submitRejectedForm) {
                submitRejectedForm = false;
                var allSaved = true;
                for (var i = 0; i < $scope.candidateInfo.newhireworkflowwebforms.length; i++) {
                    if ($scope.candidateInfo.newhireworkflowwebforms[i].subwebforms && $scope.candidateInfo.newhireworkflowwebforms[i].subwebforms.length) {

                        for (var j = 0; j < $scope.candidateInfo.newhireworkflowwebforms[i].subwebforms.length; j++) {
                            if (!$scope.candidateInfo.newhireworkflowwebforms[i].subwebforms[j].isSaved) {
                                allSaved = false;
                                break;
                            }
                        }
                    } else {
                        if (!$scope.candidateInfo.newhireworkflowwebforms[i].isSaved) {
                            allSaved = false;
                            break;
                        }
                    }
                }
                if (allSaved) {
                    $rootScope.$emit('DashpoardPageUpdated', true);
                    $state.go('dashboard', {}, { reload: 'dashboard' });
                } else {
                    ToastrService.error($rootScope.errorMsgs.MSG270);
                }
            } else {
                $scope.selectedIndexTab = $scope.selectedIndexTab + 1;
            }
        }

        function getWebFormDetail(webformid, indx) {
            var webformid = webformid;
            $scope.loading = true;
            CandidateUsersService.getWebFormDetail($rootScope.CandidateInfo.newhireid, webformid).then(
                function (response) {
                    if (response.data) {
                        $scope.loading = false;
                        if ($scope.subWebForms.length) {
                            $scope.subWebFormsData[indx] = response.data.jsonData ? response.data.jsonData.components : [];
                            $scope.noOfInstancesSaved[indx] = response.data.noOfInstancesSaved ? response.data.noOfInstancesSaved : 0;
                        } else {
                            $scope.formFields = response.data.jsonData ? response.data.jsonData.components : [];
                        }

                    }
                },
                function (err) {
                    $scope.loading = false;
                }
            ).finally(function () {

            });
        }

        $scope.getSubWebFormData = function (index, webform) {
            $scope.subWebFormsData[index] = [];
            $scope.noOfInstancesSaved[index] = 0;
            getWebFormDetail(webform.WebFormId, index);
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
            } else if (currentobj == 'weekmorethancurrentdate' || currentobj == 'Current Date + 7 days') {
                dateobj = new Date();
                dateobj.setDate(dateobj.getDate() + 7);
            } else {
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
                                if (controlsNotToBeCleared.indexOf(controlName) == -1) {
                                    controlsNotToBeCleared.push(controlName);
                                }
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
                            if (controlsNotToBeCleared.indexOf(controlName) == -1) {
                                controlsNotToBeCleared.push(controlName);
                            }
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

        function gotoNextPage() {
            if ($scope.selectedIndexTab < ($scope.candidateInfo.newhireworkflowwebforms.length) - 1) {
                vm.navigateNext();
            } else {
                var allSaved = true;
                for (var i = 0; i < $scope.candidateInfo.newhireworkflowwebforms.length; i++) {
                    if ($scope.candidateInfo.newhireworkflowwebforms[i].subwebforms && $scope.candidateInfo.newhireworkflowwebforms[i].subwebforms.length) {

                        for (var j = 0; j < $scope.candidateInfo.newhireworkflowwebforms[i].subwebforms.length; j++) {
                            if (!$scope.candidateInfo.newhireworkflowwebforms[i].subwebforms[j].isSaved) {
                                allSaved = false;
                                break;
                            }
                        }
                    } else {
                        if (!$scope.candidateInfo.newhireworkflowwebforms[i].isSaved) {
                            allSaved = false;
                            break;
                        }
                    }
                }
                if (allSaved) {
                    $state.go('dashboard', {}, { reload: 'dashboard' });
                } else {
                    ToastrService.error($rootScope.errorMsgs.MSG270);
                }
            }
        }

        vm.deleteIt = function () {

            for (var i = 0; i < $scope.webFormList.length; i++) {
                for (var j = 0; j < $scope.webFormList[i].length; j++) {
                    if ($scope.savedIndex <= i) {
                        $scope.webFormList[i][j].value = ($scope.webFormList[i + 1] && $scope.webFormList[i + 1][j] && $scope.webFormList[i + 1][j].value) ? $scope.webFormList[i + 1][j].value : '';

                    }
                }
            }
            var webformname = '';
            for (var j = 0; j < $scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].subwebforms.length; j++) {
                if ($scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].subwebforms[j].WebFormId == $scope.editedWebFormId) {
                    webformname = $scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].subwebforms[j].WebFormName;
                    break;
                }
            }
            var objNewHire = {
                "newhireid": $scope.candidateInfo.newhireid,
                "webFormName": webformname,
                "webFormId": $scope.editedWebFormId,
                "noOfInstancesSaved": ($scope.noOfInstancesSaved[$scope.outerIndex] - 1),
                "jsonData": {
                    "components": $scope.webFormList
                }
            };

            //  $scope.noOfInstancesSaved[$scope.savedIndex-1] =$scope.noOfInstancesSaved - 1; 
            // console.log(objNewHire);
            // return false;

            CandidateUsersService.saveWebForm(objNewHire).then(
                function (response) {
                    if (response.data.Success) {
                        vm.closeModal();
                        $scope.noOfInstancesSaved[$scope.outerIndex - 1] = $scope.noOfInstancesSaved - 1;
                        if (!($scope.noOfInstancesSaved[$scope.outerIndex - 1])) {
                            for (var j = 0; j < $scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].subwebforms.length; j++) {
                                if ($scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].subwebforms[j].WebFormId == $scope.editedWebFormId) {
                                    $scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].subwebforms[j].isSaved = false;
                                    break;
                                }
                            }
                        }

                        localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));

                        getWebFormDetail($scope.editedWebFormId, ($scope.outerIndex));
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

        vm.deleteObj = function (formdata, indx, webformid, outerIndex) {
            $scope.savedIndex = indx;
            $scope.outerIndex = outerIndex;
            $scope.editedWebFormId = webformid;
            $scope.webFormList = angular.copy(formdata);
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                template: '<md-dialog aria-label="Delete" style="width:400px;">' +
                    '<div layout="column" layout-align="start end" style="padding:10px;">' +
                    '<ng-md-icon icon="clear" size="14" style="margin:8px 0 -23px 0;cursor:pointer" ng-click="vm.closeModal()">' +
                    '</ng-md-icon>' +
                    '</div>' +
                    '<md-content style="background-color:white">' +
                    '<div layout="column" layout-align="center center"><img src="images/que_icon.png" width="70px" height="70px"/></div>' +
                    '<p align=center style="padding:10px 10px 20px 20px;font-size:13px;" >Are you sure you want to delete?</p>' +
                    '<md-divider></md-divider>' +
                    '<div layout="row" layout-align="end center" style="background-color:rgb(250,250,250);height:60px;padding:10px" flex>' +
                    '<md-button class="md-raised md-primary" ng-click="vm.deleteIt()" >OK</md-button>' +
                    '<md-button class="md-secondary" ng-click="vm.closeModal()">Cancel</md-button>' +
                    '</div>' +
                    '</md-content>' +
                    '</md-dialog>'
            });
        }

        vm.saveWebForm = function (form, webformid) {
            if ($scope.hasWebForms) {
                var allSaved = true;
                for (var j = 0; j < $scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].subwebforms.length; j++) {
                    if (!$scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].subwebforms[j].isSaved) {
                        allSaved = false;
                        break;
                    }
                }
                if (allSaved) {
                    if (($scope.candidateInfo.newhireworkflowwebforms.length - 1) < $scope.selectedIndexTab) {
                        $state.go('dashboard', {}, { reload: 'dashboard' });
                    } else {
                        vm.navigateNext();
                    }
                } else {
                    ToastrService.error($rootScope.errorMsgs.MSG270);
                }
                return false;
            }
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
            var webformname = '';
            for (var j = 0; j < $scope.candidateInfo.newhireworkflowwebforms.length; j++) { //[$scope.selectedIndexTab]
                if ($scope.candidateInfo.newhireworkflowwebforms[j].WebFormId == webformid) {
                    webformname = $scope.candidateInfo.newhireworkflowwebforms[j].WebFormName;
                    break;
                }
            }

            // for (var i = 0; i < controlsNotToBeCleared.length; i++) {
            //     for (var j = 0; j < allFormFields.length; j++) {
            //         if(allFormFields[j].name == controlsNotToBeCleared[i]){
            //             allFormFields[j].value = '';
            //             allFormFields[j].isUpdated = false;
            //         }
            //     }
            // }

            // for (var j = 0; j < allFormFields.length; j++) {
            //     if (controlsNotToBeCleared.indexOf(allFormFields[j].name) == -1) {
            //         allFormFields[j].value = '';
            //         allFormFields[j].isUpdated = false;
            //     }
            // }
            for (var j = 0; j < allFormFields.length; j++) {
                if (allFormFields[j].isShow == false) {
                    allFormFields[j].value = '';
                    allFormFields[j].isUpdated = false;
                }
            }


            var objNewHire = {
                "newhireid": $scope.candidateInfo.newhireid,
                "webFormId": webformid,
                "webFormName": webformname,
                "noOfInstancesSaved": 0,
                "jsonData": {
                    "components": allFormFields
                }
            };
            $scope.loading = true;

            // console.log(objNewHire);
            // return false;

            CandidateUsersService.saveWebForm(objNewHire).then(
                function (response) {
                    $scope.loading = false;
                    if (response.data.Success) {
                        $scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].isSaved = true;
                        localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));
                        gotoNextPage();
                        ToastrService.success(response.data.message);
                        // if($scope.selectedIndexTab < ($scope.candidateInfo.newhireworkflowwebforms.length) - 1){
                        //     $scope.selectedIndexTab = $scope.selectedIndexTab+1;  
                        //     ToastrService.success(response.data.message);                          
                        // }  else {
                        //     var allSaved = true;
                        //     for(var i=0; i<$scope.candidateInfo.newhireworkflowwebforms.length; i++){
                        //         if(!$scope.candidateInfo.newhireworkflowwebforms[i].isSaved){
                        //             allSaved = false;
                        //         }
                        //     }
                        //     if(allSaved){
                        //         ToastrService.success(response.data.message);
                        //         $state.go('dashboard', {}, { reload: 'dashboard' });
                        //     } else {
                        //         ToastrService.error($rootScope.errorMsgs.MSG270);
                        //     }
                        // }
                    } else {
                        ToastrService.error(response.data.message);
                    }
                },
                function (err) {
                    $scope.loading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG191);
                }
            )


        }

        vm.submitAndSign = function (form, webformid) {
            submitRejectedForm = true;
            vm.saveWebForm(form, webformid);
        }

        vm.closeModal = function () {
            $mdDialog.cancel();
        }

        $scope.savedIndex = -1;
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
            for (var i = 0; i < controlsNotToBeCleared.length; i++) {
                for (var j = 0; j < allFormFields.length; j++) {
                    if (allFormFields[j].name == controlsNotToBeCleared[i]) {
                        allFormFields[j].value = '';
                        allFormFields[j].isUpdated = false;
                    }
                }
            }
            $scope.webFormList[$scope.savedIndex] = allFormFields;
            var webformname = '';
            for (var j = 0; j < $scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].subwebforms.length; j++) {
                if ($scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].subwebforms[j].WebFormId == $scope.editedWebFormId) {
                    webformname = $scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].subwebforms[j].WebFormName;
                    break;
                }
            }
            var objNewHire = {
                "newhireid": $scope.candidateInfo.newhireid,
                "webFormId": $scope.editedWebFormId,
                "webFormName": webformname,
                "noOfInstancesSaved": ($scope.formaddOrEdit == 'add' ? ($scope.savedIndex + 1) : $scope.noOfInstancesSaved[$scope.outerIndex]),
                "jsonData": {
                    "components": $scope.webFormList
                }
            };

            // console.log(objNewHire);
            // return false;

            CandidateUsersService.saveWebForm(objNewHire).then(
                function (response) {
                    if (response.data.Success) {
                        vm.closeModal();
                        //$scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].isSaved = true; 
                        if ($scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].subwebforms && $scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].subwebforms.length) {
                            for (var j = 0; j < $scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].subwebforms.length; j++) {
                                if ($scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].subwebforms[j].WebFormId == $scope.editedWebFormId) {
                                    $scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].subwebforms[j].isSaved = true;
                                    break;
                                }
                            }
                        }

                        localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));
                        if ($scope.formaddOrEdit == 'add') {
                            $scope.noOfInstancesSaved[$scope.savedIndex - 1] = $scope.noOfInstancesSaved[$scope.savedIndex - 1] + 1;
                            getWebFormDetail($scope.editedWebFormId, ($scope.outerIndex));
                        } else {
                            getWebFormDetail($scope.editedWebFormId, ($scope.outerIndex));

                        }
                        //getWebFormDetail($scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].WebFormId, -1);
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
        $scope.formaddOrEdit = 'add';

        vm.openAddForm = function (formdata, indx, webformid, outerIndex, webname) {
            $scope.formaddOrEdit = 'add';
            $scope.title = webname;
            $scope.submitted = false;
            $scope.savedIndex = indx;
            $scope.outerIndex = outerIndex;
            $scope.editedWebFormId = webformid;
            $scope.webFormList = angular.copy(formdata);
            $scope.formFields = angular.copy(formdata[indx]);
            $mdDialog.show({
                templateUrl: 'components/candidateinfo/subWebFrom.html',
                clickOutsideToClose: true,
                multiple: true,
                scope: $scope,
                preserveScope: true,
                locals: {},
                controller: ['$scope', '$rootScope', 'ToastrService', 'CandidateUsersService', function ($scope, $rootScope, ToastrService, CandidateUsersService) {

                }]
            })
                .then(function (answer) {
                    if (answer && answer.success) {

                    }
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
            //vm.openEmpForm(formdata, indx, webformid);
        }

        vm.openEmpForm = function (formdata, indx, webformid, outerIndex, webname) {
            $scope.formaddOrEdit = 'edit';
            $scope.title = webname;
            $scope.submitted = false;
            $scope.savedIndex = indx;
            $scope.outerIndex = outerIndex;
            $scope.editedWebFormId = webformid;
            $scope.webFormList = angular.copy(formdata);
            $scope.formFields = angular.copy(formdata[indx]);
            $mdDialog.show({
                templateUrl: 'components/candidateinfo/subWebFrom.html',
                clickOutsideToClose: true,
                multiple: true,
                scope: $scope,
                preserveScope: true,
                locals: {},
                controller: ['$scope', '$rootScope', 'ToastrService', 'CandidateUsersService', function ($scope, $rootScope, ToastrService, CandidateUsersService) {

                }]
            })
                .then(function (answer) {
                    if (answer && answer.success) {

                    }
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        }



        $scope.$watch('selectedIndexTab', function (current, old) {
            $scope.submitted = false;
            previous = selected;
            $scope.isDisabledControl = false;
            selected = $scope.candidateInfo.newhireworkflowwebforms[current];
            if (old + 1 && (old !== current)) {
                console.log('Goodbye ' + previous.WebFormName + '!');
            }
            if (current + 1) {
                $scope.formFields = [];
                $scope.subWebFormsData = [];
                $scope.noOfInstancesSaved = [];
                var forms = $scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab];
                $scope.subWebForms = (forms.subwebforms && forms.subwebforms.length) ? forms.subwebforms : [];
                if ($scope.subWebForms.length) {
                    $scope.hasWebForms = true;
                } else {
                    $scope.hasWebForms = false;
                    getWebFormDetail($scope.candidateInfo.newhireworkflowwebforms[$scope.selectedIndexTab].WebFormId, -1);
                }
                console.log('Hello ' + selected.WebFormName + '!');
            }
        });

        vm.checkCandidateSign = false;
        if (localStorage.getItem("docedit")) {
            vm.checkCandidateSign = true;

        }
    }
})();