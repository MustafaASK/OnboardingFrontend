(function () {
    'use strict';
    hrAdminApp.controller('DesignWebformsController', designWebformsController);
    designWebformsController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'ToastrService', 'DesignWebformsService', '$mdDialog', '$filter'];
    function designWebformsController($rootScope, $scope, $state, $stateParams, ToastrService, DesignWebformsService, $mdDialog, $filter) {

        var vm = this;

        vm.sourceProfile = [];
        vm.clientsList = [];
        vm.jobCategoryList = [];

        function init() {
            getDesignWebformsList();
        }
        init();

        function getDesignWebformsList() {
            DesignWebformsService.getWebformsList().then(
                function (response) {
                    if (response.data) {
                        vm.webformsList = response.data;
                        vm.customWebformsList = $filter('filter')(vm.webformsList, { 'isCustWebForm': true });
                    }
                    else {
                        ToastrService.error('An error occured while retrieving the Webforms Data');
                    }
                },
                function (err) {

                }
            )
        }

        vm.editDesignWebform = function (webformId) {
            $state.go('Settings.EditDesignWebform', {
                id: webformId
            });
        }

        vm.previewWebForm = function (ev, webformid, type) {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                locals: { webformid: webformid, clientsList: vm.clientsList, jobCategoryList: vm.jobCategoryList, sourceProfile: vm.sourceProfile },
                templateUrl: $rootScope.rootUrl + '/components/settings/documents/dynamicWebForms/dynamicWebFormsSetting/dynamicWebFormsPreview.html',
                controller: ['$scope', 'webformid', 'DesignWebformsService', '$filter', '$timeout', 'DynamicWebFormService', 'clientsList', 'sourceProfile', 'jobCategoryList', function ($scope, webformid, DesignWebformsService, $filter, $timeout, DynamicWebFormService, clientsList, sourceProfile, jobCategoryList) {
                    $scope.formFields = [];
                    $scope.addressOptions = { "getType": "address", "watchEnter": false, "country": "us" };
                    $scope.isDisabledControl = false;

                    $scope.clientsList = clientsList;
                    $scope.sourceProfile = sourceProfile;
                    $scope.jobCategoryList = jobCategoryList;

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

                    function getJsonDocumentLibrary() {
                        $scope.loading = true;
                        DesignWebformsService.getWebformDetails(webformid).then(
                            function (response) {
                                if (response.data) {
                                    //vm.webformDetails = response.data;
                                    var tempComponents = response.data.masterJsonData ? response.data.masterJsonData.components : (response.data.jsonData.components ? response.data.jsonData.components : []);
                                    //$scope.formFields = angular.copy(tempComponents);
                                    $scope.formFields = DynamicWebFormService.convertToWebFormJson(tempComponents);
                                }
                                else {
                                    ToastrService.error('An error occured while retrieving the Webform Components');
                                }
                            },
                            function (err) {

                            }
                        )
                    }
                    getJsonDocumentLibrary();
                    function convertToWebFormJson(tempComponents) {
                        var components = $filter('orderBy')(tempComponents, ['page', 'tab']);
                        for (var i = 0; i < components.length; i++) {
                            var obj = components[i];
                            var makingObj = {};
                            //   makingObj.page = obj.page;      
                            //   makingObj.tab = obj.tab;
                            if (obj.input) {
                                switch (obj.inputType.toLowerCase()) {
                                    case 'textarea':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'textarea';
                                        makingObj.inputType = 'textarea';
                                        makingObj.input = true;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('textarea'));
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                                        makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'attachment':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'attachment';
                                        makingObj.inputType = 'attachment';
                                        makingObj.input = true;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('textarea'));
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                                        makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'text':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'text';
                                        makingObj.inputType = 'text';
                                        makingObj.input = true;
                                        if (obj.Settings) {
                                            makingObj.Settings = obj.Settings;
                                            // makingObj.Settings[0].value = obj.name;
                                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                                        } else {
                                            makingObj.Settings = angular.copy(getSettingObj('text'));
                                            makingObj.Settings[0].value = obj.name;
                                            //makingObj.Settings[0].value =  ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value );
                                        }
                                        //makingObj.Settings = obj.Settings ? obj.Settings  : angular.copy(getSettingObj('text'));
                                        //makingObj.Settings[0].value =  ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value );
                                        makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'number':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'number';
                                        makingObj.inputType = 'number';
                                        makingObj.page = obj.page;
                                        makingObj.input = true;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('number'));
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                                        makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'email':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'email';
                                        makingObj.inputType = 'email';
                                        makingObj.page = obj.page;
                                        makingObj.input = true;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('email'));
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                                        makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'phone-number':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'phone-number';
                                        makingObj.inputType = 'phone-number';
                                        makingObj.page = obj.page;
                                        makingObj.input = true;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('phone-number'));
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                                        makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'date':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'date';
                                        makingObj.inputType = 'date';
                                        makingObj.page = obj.page;
                                        makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                                        makingObj.value = obj.value ? obj.value : null;
                                        makingObj.input = true;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('date'));
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                                        makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'dropdown':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'dropdown';
                                        makingObj.inputType = 'dropdown';
                                        makingObj.page = obj.page;
                                        makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                                        makingObj.value = obj.value ? obj.value : '';
                                        makingObj.input = true;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('dropdown'));
                                        // updateObj(makingObj, 'radio_increment', obj);
                                        // //makingObj.Options = obj.data.values;
                                        // makingObj.data = {
                                        //     values: obj.data.values
                                        // };
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                                        makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'push button':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'button';
                                        makingObj.inputType = 'Push button';
                                        makingObj.input = true;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('button'));
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'check box':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'checkbox';
                                        makingObj.inputType = 'Check box';
                                        makingObj.input = true;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('checkbox'));
                                        makingObj.Options = obj.values;
                                        makingObj.values = obj.values;
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                                        makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'radio button':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'radio';
                                        makingObj.inputType = 'Radio button';
                                        makingObj.input = true;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('radio'));
                                        updateObj(makingObj, 'radio_increment', obj);
                                        //makingObj.Options = obj.data.values;
                                        makingObj.data = {
                                            values: obj.data.values
                                        };
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                                        makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'header':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'header';
                                        makingObj.inputType = 'header';
                                        makingObj.input = true;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('header'));
                                        makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'emptyspace':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'emptyspace';
                                        makingObj.inputType = 'emptyspace';
                                        makingObj.input = true;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('emptyspace'));
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'devider':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'devider';
                                        makingObj.inputType = 'devider';
                                        makingObj.input = true;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('devider'));
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    default:
                                    // code block


                                }
                            }
                        }
                        $timeout(function () {
                            for (var i = 0; i < $scope.formFields.length; i++) {

                                if ($scope.formFields[i].inputType == 'textarea' && !$scope.getFieldSettingPar('Readonly', $scope.formFields[i]).value) {
                                    var elem = document.getElementById('textarea_' + i);
                                    // console.log("textarea"+$scope.getFieldSettingPar('Readonly',$scope.formFields[i]).value);
                                    elem.focus();
                                    break;
                                }
                                else if ($scope.formFields[i].inputType == 'text' && !$scope.getFieldSettingPar('Readonly', $scope.formFields[i]).value) {
                                    var elem = document.getElementById('text_' + i);
                                    // console.log("text"+$scope.getFieldSettingPar('Readonly',$scope.formFields[i]).value);
                                    elem.focus();
                                    break;
                                }
                            }

                        }, 1000);

                    }
                    function getSettingObj(type) {
                        var ary = $filter('filter')(controleSetting, { 'Type': type });
                        return ary[0].Settings;
                    }

                    function updateObj(makingObj, type, obj) {
                        $.each(makingObj.Settings, function (index, set) {
                            if (set.Type == type && (obj.data.values && obj.data.values.length)) {
                                for (var i = 0; i < obj.data.values.length; i++) {
                                    if (!obj.data.values[i].name) {
                                        obj.data.values[i].name = obj.data.values[i].value;
                                    }
                                }
                                set.Possiblevalue = obj.data.values;
                                return;
                            }
                        });

                    }
                    $scope.closeDeleteModal = function () {
                        $mdDialog.hide();
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
                    $scope.submitted = false;
                    $scope.validateForm = function () {
                        $scope.submitted = true;

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



                    //$scope.formFields = angular.copy(doc);
                    // $scope.itemType = itemType;
                    // $scope.itemName = itemName;
                    // $scope.id = id;
                }],
                targetEvent: ev,
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                escapeToClose: true
            });
        }


        vm.showDeleteConfirm = function (ev, webformDetails) {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                locals: {
                    itemName: webformDetails.webFormName,
                    itemType: 'Webform',
                    item: webformDetails
                },
                templateUrl: $rootScope.rootUrl + '/components/common/deleteDialog.html',
                controller: ['$scope', 'itemType', 'itemName', 'item', function ($scope, itemType, itemName, item) {
                    $scope.itemType = itemType;
                    $scope.itemName = itemName;
                    $scope.id = item;
                }],
                targetEvent: ev,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                escapeToClose: true
            });
        }

        $scope.closeDeleteModal = function () {
            $mdDialog.hide();
        }

        $scope.deleteItem = function (item) {
            DesignWebformsService.deleteWebform(item.webFormId, item.isCustWebForm ? 'delete' : 'hidden').then(
                function (response) {
                    if (response.data.Success) {
                        $scope.closeDeleteModal();
                        getDesignWebformsList();
                        ToastrService.success(response.data.message);
                    } else {
                        $scope.closeDeleteModal();
                        ToastrService.error(response.data.message);
                    }
                },
                function (err) {
                    ToastrService.error(response.data.message);
                }
            )
        }

        vm.restoreWebform = function (webformId) {
            DesignWebformsService.restoreWebform(webformId).then(
                function (response) {
                    if (response.data.Success) {
                        getDesignWebformsList();
                        ToastrService.success(response.data.message);
                    }
                },
                function (err) {
                    ToastrService.error(response.data.message);
                }
            )
        }

        function getSourceProfile() {
            DesignWebformsService.getSourceProfile().then(
                function (response) {
                    vm.sourceProfile = response.data.SourceProfiles;
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }
        getSourceProfile();

        function getClientsList() {
            DesignWebformsService.getClientsList().then(
                function (response) {
                    vm.clientsList = response.data;
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }
        getClientsList();

        function getJobHireCategory() {
            DesignWebformsService.getJobHireCategory().then(
                function (response) {
                    vm.jobCategoryList = response.data;
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }
        getJobHireCategory();


        // Check whether control to be shown or not
        // $scope.checkShowControl = function(controlName){
        //     return true;
        // }

        // function to get settings of object
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

        $scope.clearHiddenControlValue = function (controlName) {
            var control = $filter('filter')($scope.formFields, { 'name': controlName }, true);
            var controlSetting = $filter('filter')(control[0].Settings, { 'name': "Radio Choice" }, true);
            for (var i = 0; i < controlSetting[0].Possiblevalue.length; i++) {
                if(control[0].value !=  controlSetting[0].Possiblevalue[i].value){
                    for(var j=0;j<controlSetting[0].Possiblevalue[i].showControls.length;j++){
                        var controlToClear = $filter('filter')($scope.formFields, { 'name': controlSetting[0].Possiblevalue[i].showControls[j] }, true);
                        controlToClear[0].value = "";
                    }
                }
            }
        }

        $scope.clearHiddenControlValueCheckbox = function (controlName,controlValue) {
            var control = $filter('filter')($scope.formFields, { 'name': controlName }, true);
            var controlSetting = $filter('filter')(control[0].Settings, { 'name': "Show Controls" }, true);
            if(!controlValue){
                for(var j = 0;j < controlSetting[0].showControls.length;j++){
                    var controlToClear = $filter('filter')($scope.formFields, { 'name': controlSetting[0].showControls[j] }, true);
                    controlToClear[0].value = "";
                } 
            }
            return;
        }



    }
})();