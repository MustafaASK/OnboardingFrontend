(function () {
    "use strict";
    hrAdminApp.directive('dynamicWebForm', [function () {
        return {
            restrict: 'E',
            scope: {
                allfields: '=allfields',
                isnewhireform: '=',
                frompage: '@',
                typecommonfields: '='
            },
            templateUrl: 'components/shared/dynamicWebForm.html',
            link: function (scope, element, attributes, ngModel) {
            },
            controller: ['$scope', '$rootScope', 'DynamicWebFormService', '$filter', '$mdDialog', 'DocLibraryService', 'ToastrService', '$stateParams', function ($scope, $rootScope, DynamicWebFormService, $filter, $mdDialog, DocLibraryService, ToastrService, $stateParams) {

                // $scope.formFields = [];
                // $scope.dragElements = angular.copy(DynamicWebFormService.dragFields);
                // var settingsList = angular.copy(DynamicWebFormService.settingsList);
                var webformid = $stateParams.id;
                $scope.commonFields = [];
                $scope.formFields = [];
                var tempdragElements = angular.copy(DynamicWebFormService.dragFields);
                var settingsList = angular.copy(DynamicWebFormService.settingsList);
                var controleSetting = angular.copy(DynamicWebFormService.controlesList);
                var sourceData = [];

                var tempAllFields = [];

                var frompage = $scope.frompage;
                DynamicWebFormService.frompage = frompage;
                $scope.dragElements = [];
                $scope.isPdfWebform = false;
                if (frompage == 'documentPage') {
                    $scope.isPdfWebform = true;

                }

                //$scope.dragElements = $filter('filter')(tempdragElements, { frompage: true });

                function getPageElements() {
                    for (var i = 0; i < tempdragElements.length; i++) {
                        var curObj = tempdragElements[i];
                        if (curObj[frompage]) {
                            $scope.dragElements.push(curObj);
                        }
                    }
                }

                DynamicWebFormService.getCommonApis().then(
                    function (response) {
                        if (response.data) {
                            sourceData = response.data;
                        } else {
                            ToastrService.error('Unable to get source data');
                        }
                    },
                    function (err) {
                        ToastrService.error(response.data.message);
                    }
                )


                $scope.current_field = {};
                var guid = 0;
                var vm = this;

                function randomString(length, chars) {
                    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    var result = '';
                    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
                    return result;
                }

                $scope.changeFieldname = function (value) {
                    $scope.current_field.name = value;
                    $scope.current_field.Settings[0].value = $scope.current_field.name;
                    $scope.current_field.Settings[1].value = $scope.current_field.name;
                    $scope.current_field.Settings[2].value = 'x' + $scope.current_field.name.replace(/\s/g, '_');
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

                function getSettingObj(type) {
                    var ary = $filter('filter')(controleSetting, { 'Type': type }, true);
                    if (ary[0] && !ary[0].Settings) {
                        ary[0].Settings = settingsList[type];
                    }
                    return ary[0].Settings;
                }

                function getJsonCommonFields() {
                    DocLibraryService.getJsonCommonFields($scope.typecommonfields).then(
                        function (response) {
                            $scope.commonFields = response.data;
                            DocLibraryService.jsonCommonDetailsList = angular.copy(response.data);
                            // console.log(vm.commonFields);
                        },
                        function (err) {
                            ToastrService.error($rootScope.errorMsgs.MSG250);
                        }
                    )
                }

                function init() {
                    getPageElements()
                    if ($scope.allfields && $scope.allfields.length) {
                        //convertToWebFormJson($scope.allfields);
                        $scope.formFields = DynamicWebFormService.convertToWebFormJson($scope.allfields);
                    }
                }
                init();

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
                var createNewField = function () {
                    return {
                        'id': ++guid,
                        'name': randomString(10),
                        'Settings': []
                    };
                }

                function getObjSettings(ele) {
                    return settingsList[ele.Type];
                }

                function getCurrentIputTypeList() {
                    var inputtype = $scope.current_field.Type.toLowerCase();
                    var ary = $filter('filter')($scope.formFields, { 'Type': inputtype });
                    var a = 1;
                    var finalNum = 1;
                    var numAry = [];

                    for (var i = 0; i < ary.length; i++) {
                        var b = ary[i].name.split(inputtype)[1];
                        b = b ? parseInt(b) : b;
                        numAry.push(b);
                    }
                    numAry.sort(function (a, b) { return a - b });

                    for (var i = 0; i < numAry.length; i++) {
                        var b = numAry[i];
                        if (a == b) {
                            a = a + 1;
                        } else {
                            finalNum = a;
                            break;
                        }
                    }
                    finalNum = a;
                    return finalNum;
                }

                $scope.addElement = function (ele, idx) {
                    $scope.current_field.Active = false;

                    $scope.current_field = {};

                    var newobj = createNewField();
                    //Merge setting from template object
                    angular.merge($scope.current_field, ele, newobj);
                    $scope.current_field.labelName = 'Label Name' + ($scope.formFields.length + 1);

                    $scope.current_field.Settings = getObjSettings(ele);

                    // var lengthOfCurrentFields = getCurrentIputTypeList();
                    // $scope.current_field.name = $scope.current_field.Type.toLowerCase() + (lengthOfCurrentFields);
                    tempAllFields = angular.copy($scope.formFields);
                    if (typeof idx == 'undefined') {
                        $scope.formFields.push($scope.current_field);
                    } else {
                        $scope.current_field.page = $scope.formFields[idx].page;
                        $scope.formFields.splice(idx, 0, $scope.current_field);
                        $('#fieldSettingTab_lnk').tab('show');
                    }
                    $scope.showSettingsDialog(ele, idx);

                };

                $scope.closeDeleteModal = function () {
                    $mdDialog.hide();
                }

                var deletedidforcontrole = 0;
                $scope.deletedControls = [];
                $scope.removeElement = function (ev, idx, currentformdata) {
                    ev.stopPropagation();
                    deletedidforcontrole = idx;
                    if (currentformdata.isSaved) {
                        var labelName = currentformdata.labelName;
                        var controlName = currentformdata.name;
                        DynamicWebFormService.getStatusCommonFieldDelete(controlName, webformid).then(
                            function (response) {
                                if (response.data.Success) {
                                    $mdDialog.show({
                                        scope: $scope,
                                        preserveScope: true,
                                        locals: {
                                            itemName: labelName,
                                            itemType: 'Control',
                                            item: controlName
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
                                } else {
                                    ToastrService.error('This field is mapped with some other pdf document');
                                }
                            },
                            function (err) {
                                ToastrService.error(response.data.message);
                            }
                        )
                    } else {
                        $scope.formFields.splice(idx, 1);
                    }
                };

                $scope.deleteItem = function (controlName) {
                    $scope.formFields.splice(deletedidforcontrole, 1);
                    $scope.deletedControls.push({ controls: controlName });
                    $scope.closeDeleteModal();
                }

                $scope.showSettingsDialog = function (ev, indx) {
                    indx = (typeof indx != 'undefined') ? indx : ($scope.formFields.length - 1);
                    var setting = angular.copy($scope.formFields[indx]);
                    if (setting.Type == 'devider' || setting.Type == 'emptyspace') {
                        return false;
                    }
                    $mdDialog.show({
                        clickOutsideToClose: false,
                        escapeToClose: false,
                        locals: { settingchanges: setting, allFormFields: $scope.formFields, tempAllFields: tempAllFields, commonfields: $scope.commonFields, isnewhireform: $scope.isnewhireform, sourceData: sourceData },
                        templateUrl: '/components/settings/documents/dynamicWebForms/dynamicWebFormsSetting/dynamicWebFormsSetting.html',

                        //controller: 'WebFormSettingsController',
                        controller: ['$scope', 'settingchanges', 'allFormFields', 'commonfields', 'isnewhireform', 'DynamicWebFormService', 'sourceData', function ($scope, settingchanges, allFormFields, commonfields, isnewhireform, DynamicWebFormService, sourceData) {
                            $scope.current_field_setting = angular.copy(settingchanges);
                            $scope.isDateField = false;
                            $scope.isCommonWebForm = false;
                            $scope.isDefReadOnly = false;
                            $scope.isnewhireform = isnewhireform;
                            $scope.allFormFields = allFormFields;
                            $scope.tempAllFields = tempAllFields;
                            $scope.sourceData = sourceData;
                            $scope.addressTypeSource = angular.copy(DynamicWebFormService.addressTypeSource);
                            $scope.addressDetailsList = angular.copy(DynamicWebFormService.addressDetailsList);
                            $scope.textAndAreaList = [];
                            $scope.addresstype = 'full-address';
                            $scope.lengthForPossbleVlues = true;
                            $scope.clientExist = false;

                            function checkClientsExist(){                     
                                var ary1 = $filter('filter')($scope.allFormFields, { 'Type': 'dropdown' }, true);
                                for(var i=0; i<ary1.length;i++){
                                    var addresstypeAry = $filter('filter')(ary1[i].Settings, { 'Type': 'dropdown_increment' }, true);
                                    if (addresstypeAry && addresstypeAry.length) {
                                        $scope.clientExist = (addresstypeAry[0].sourceTypeValue == 'Database' && addresstypeAry[0].sourceTypeUrl == 'clients' && $scope.current_field_setting.name != ary1[i].name) ? true : false;
                                        if($scope.clientExist){
                                            break;

                                        }
                                    }
                                }
                            }
                            checkClientsExist();
                            var addresstypeAry = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'autocompletetype' }, true);
                            if (addresstypeAry && addresstypeAry.length) {
                                $scope.addresstype = addresstypeAry[0].value ? addresstypeAry[0].value : 'full-address';
                            }

                            $scope.selectAllContent = function ($event) {
                                $event.target.select();
                            };

                            function findWithAttr(array, attr, value) {
                                for (var i = 0; i < array.length; i += 1) {
                                    if (array[i][attr] === value) {
                                        return i;
                                    }
                                }
                                return -1;
                            }

                            function getTextAndAreaFields() {
                                var ary1 = $filter('filter')($scope.allFormFields, { 'Type': 'text' }, true);
                                var ary2 = $filter('filter')($scope.allFormFields, { 'Type': 'textarea' }, true);
                                var ary3 = ary1.concat(ary2);
                                // var ary4 = $filter('filter')(ary3,{'name':$scope.current_field_setting.name}, true);
                                // if(ary4 && ary4.length){

                                // }
                                var indx = findWithAttr(ary3, 'name', $scope.current_field_setting.name);
                                if (indx != -1) {
                                    ary3.splice(indx, 1);
                                }
                                //ary3.findIndex($scope.current_field_setting);
                                return ary3;
                            }

                            $scope.changeAutofillType = function (type) {
                                if ($scope.addresstype != type) {
                                    $scope.addresstype = type;
                                    //var $scope.addressTypeSource[type];

                                    var dep_ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'autocompletedependency' });
                                    if (dep_ary && dep_ary.length) {
                                        //dep_ary[0].dependencyObjsData = [];
                                        // dep_ary[0].dependencyObjsData = (dep_ary[0].dependencyObjsData && dep_ary[0].dependencyObjsData.length) ? dep_ary[0].dependencyObjsData :  angular.copy($scope.addressTypeSource[type]);
                                        dep_ary[0].dependencyObjsData = angular.copy($scope.addressTypeSource[type]);
                                        console.log(dep_ary[0].dependencyObjsData);
                                    }

                                }
                                $scope.textAndAreaList = getTextAndAreaFields();

                            }

                            $scope.changeMaskAndGooglemapsViceversa = function(option){
                                // $filter('filter')($scope.current_field_setting.Settings , {'Type' : '!emptyspace'}, true);
                                // console.log($scope.current_field_setting.Settings[0].value);
                                // General Validations
                                if(option.name == 'Mask Data' && option.value == true){
                                    $scope.isMaskDate = true;
                                }
                                else if(option.name == 'Mask Data' && option.value == false){
                                    $scope.isMaskDate = false;
                                }
                                else if(option.name == 'Enable Google Maps' && option.value == true){
                                    $scope.isGoogleMaps = true;
                                }
                                else if(option.name == 'Enable Google Maps' && option.value == false){
                                    $scope.isGoogleMaps = false;
                                }
                                // debugger;
                            }

                            if ($scope.current_field_setting.Type == 'dropdown') {
                                // DynamicWebFormService.getCommonApis().then(
                                //     function (response) {
                                //         if (response.data) {
                                //             $scope.sourceData = response.data;
                                //         } else {
                                //             ToastrService.error('Unable to get source data');
                                //         }
                                //     },
                                //     function (err) {
                                //         ToastrService.error(response.data.message);
                                //     }
                                // )
                            }

                            //$scope.commonfieldsData = angular.copy(commonfields);
                            $scope.changeFieldSetting = function (value, Settingname) {
                                switch (Settingname) {
                                    case 'Field Label':
                                    case 'Short Label':
                                    case 'Internal name':
                                        $scope.current_field_setting.name = value;
                                        $scope.current_field_setting.Settings[0].value = $scope.current_field_setting.name;
                                        //$scope.current_field_setting.Settings[1].value = $scope.current_field_setting.name;
                                        //$scope.current_field_setting.Settings[2].value = 'x' + $scope.current_field_setting.name.replace(/\s/g, '_');
                                        break;
                                    default:
                                        break;
                                }
                            }
                            var dateobj = new Date();
                            $scope.getDateValue = function (currentobj) {
                                // if(currentobj !== 'currentdate'){
                                //     dateobj = null;
                                // }
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

                            $scope.deleteRadio = function(values,indx){
                                values.splice(indx,1);
                                if(values.length){
                                    $scope.lengthForPossbleVlues = true;
                                } else {
                                    $scope.lengthForPossbleVlues = false;
                                }
                            }

                            $scope.addRadio = function (values, type) {
                                var name = (type == 'dropdown' ? 'Option' : 'Radio')
                                var obj = {
                                    'name': name + (values.length + 1),
                                    'value': name + (values.length + 1),
                                    'showControls': []
                                }
                                values.push(obj);
                                $scope.lengthForPossbleVlues = true;

                            }

                            $scope.changeradiolabel = function (name, set, indx) {
                                set.data[indx].name = name;
                            }

                            function getAllFields() {
                                var ary = $filter('filter')(allFormFields , {'Type' : '!emptyspace'}, true);
                                ary = $filter('filter')(ary , {'Type' : '!devider'}, true);
                                var aryNew = [];
                                for (var i = 0,j = 0; i < ary.length; i++) {
                                    if ($scope.current_field_setting.name != ary[i].name) {
                                        var obj = {
                                            'labelName': ary[i].labelName,
                                            'name': ary[i].name
                                        };
                                        aryNew[j] = obj;
                                        j++;
                                    }
                                }
                                return aryNew;
                            }

                            $scope.setAllInputControls = function () {
                                var otherfieldsary = getAllFields();
                                return otherfieldsary;
                            }

                            function getDateFields() {
                                var ary = $filter('filter')(allFormFields, { 'Type': 'date' });
                                return ary;
                            }

                            function getNumericFields() {
                                var ary = $filter('filter')(allFormFields, { 'Type': 'number' }, true);
                                return ary;
                            }

                            function getNumericWithDecimalsFields() {
                                var ary = $filter('filter')(allFormFields, { 'Type': 'numberwithdecimal' }, true);
                                return ary;
                            }

                            function getTextMaskedFields() {
                                var fields = [];
                                var ary = $filter('filter')(allFormFields, { 'Type': 'text' }, true);
                                for (var i = 0; i < ary.length; i++) {
                                    if ($scope.getFieldMaskSetting('Mask Data', ary[i]).value) {
                                        fields.push(ary[i]);
                                    }

                                }
                                return fields;

                            }
                            $scope.isDependentForMask = false;

                            $scope.changeType = function (inputType) {
                                if (inputType.toLowerCase() == 'date') {
                                    $scope.isDateField = true;
                                    $scope.current_field_setting.Type = 'date';
                                    $scope.current_field_setting.inputType = 'date';
                                    //$scope.current_field_setting.Settings = getSettings($scope.current_field_setting.inputType).Settings;

                                    // var tempVar = $scope.current_field_setting.Settings ? $scope.current_field_setting.Settings : getSettings($scope.current_field_setting.inputType).Settings;
                                    var tempVar = getSettings('date').Settings;
                                    if (tempVar.length) {
                                        tempVar[0] = angular.copy($scope.current_field_setting.Settings[0]);
                                    }

                                    var dep_ary = $filter('filter')(tempVar, { 'Type': 'dependency' });
                                    if (!dep_ary.length) {
                                        var dep_settings = angular.copy(getSettings($scope.current_field_setting.inputType).Settings);
                                        dep_ary = $filter('filter')(dep_settings, { 'Type': 'dependency' });
                                        //tempVar.push(dep_ary[0]);
                                        tempVar.splice((tempVar.length - 1), 0, dep_ary[0]);
                                    }

                                    $scope.current_field_setting.Settings = angular.copy(tempVar);
                                    //$scope.current_field_setting.value = 'Date';
                                    var ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'patterndropdown' });

                                    ary[0].value = 'Date';
                                    var dep_ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'dependency' });
                                    var otherfield_ary = $filter('filter')(dep_ary[0].dependencyObjs, { 'type': 'otherfield' });

                                    var otherfieldsary = getDateFields();

                                    var defauldDateObj = [
                                        { 'name': 'Current Date', 'value': 'currentdate' },
                                        { 'name': '15 years', 'value': 'above15years' },
                                        { 'name': '18 years', 'value': 'above18years' }
                                    ]
                                    otherfield_ary[0].Possiblevalue = defauldDateObj; //[{ 'name': 'Current Date', 'value': 'currentdate' }];
                                    // otherfield_ary[0].Possiblevalue.push({ 'name': 'Current Date + 7 days', 'value': 'weekmorethancurrentdate' });
                                    for (var i = 0; i < otherfieldsary.length; i++) {
                                        if ($scope.current_field_setting.name != otherfieldsary[i].name) {
                                            var obj = {
                                                'name': otherfieldsary[i].labelName,
                                                'value': otherfieldsary[i].name
                                            };
                                            otherfield_ary[0].Possiblevalue.push(obj);

                                        }
                                    }
                                    if (otherfield_ary[0].Possiblevalue.length) {
                                        otherfield_ary[0].value = otherfield_ary[0].Possiblevalue[0].value;
                                    }
                                    //ary[0].value = 'Date';

                                } else {
                                    $scope.isDateField = false;
                                    $scope.isDependentForMask = false;
                                    var otherfieldsary = [];
                                    var otherfieldsary2 = [];

                                    if (inputType.toLowerCase() == 'numeric' || inputType.toLowerCase() == 'number') {
                                        $scope.current_field_setting.Type = 'number';
                                        $scope.current_field_setting.inputType = 'number';
                                        otherfieldsary = getNumericWithDecimalsFields();
                                        otherfieldsary2 = getNumericFields();
                                        otherfieldsary = otherfieldsary.concat(otherfieldsary2);
                                    } else if (inputType.toLowerCase() == 'numericwithdecimal' || inputType.toLowerCase() == 'numberwithdecimal') {
                                        $scope.current_field_setting.Type = 'numberwithdecimal';
                                        $scope.current_field_setting.inputType = 'numberwithdecimal';
                                        otherfieldsary = getNumericWithDecimalsFields();
                                        otherfieldsary2 = getNumericFields();
                                        otherfieldsary = otherfieldsary.concat(otherfieldsary2);
                                    } else if (inputType.toLowerCase() == 'phone-number') {
                                        $scope.current_field_setting.Type = 'phone-number';
                                        $scope.current_field_setting.inputType = 'phone-number';
                                    } else if (inputType.toLowerCase() == 'email') {
                                        $scope.current_field_setting.Type = 'email';
                                        $scope.current_field_setting.inputType = 'email';
                                    } else {
                                        $scope.current_field_setting.Type = 'text';
                                        $scope.current_field_setting.inputType = 'text';
                                        otherfieldsary = getTextMaskedFields();
                                    }
                                    $scope.current_field_setting.Settings = getSettings($scope.current_field_setting.inputType).Settings;
                                    // if (!$scope.current_field_setting.Settings && !$scope.current_field_setting.Settings.length) {
                                    //     // && tempVar.length
                                    //     // var tempVar = getSettings($scope.current_field_setting.inputType).Settings;
                                    //     // tempVar[0] = angular.copy($scope.current_field_setting.Settings[0]);
                                    //     $scope.current_field_setting.Settings = getSettings($scope.current_field_setting.inputType).Settings;
                                    // }

                                    // $scope.current_field_setting.Settings = angular.copy(tempVar);

                                    // var otherfieldsary = getNumericWithDecimalsFields();
                                    // var otherfieldsary2 = getNumericFields();

                                    // otherfieldsary = otherfieldsary.concat(otherfieldsary2);

                                    var ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'patterndropdown' });

                                    if (otherfieldsary && otherfieldsary.length) {
                                        var dep_ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'dependency' }); //dependencyMask
                                        var otherfield_ary = $filter('filter')(dep_ary[0].dependencyObjs, { 'type': 'otherfield' });

                                        $scope.isDependentForMask = true;
                                        otherfield_ary[0].Possiblevalue = [];
                                        for (var i = 0; i < otherfieldsary.length; i++) {
                                            if ($scope.current_field_setting.name != otherfieldsary[i].name) {
                                                var obj = {
                                                    'name': otherfieldsary[i].labelName,
                                                    'value': otherfieldsary[i].name
                                                };
                                                otherfield_ary[0].Possiblevalue.push(obj);

                                            }
                                        }

                                        if (!otherfield_ary[0].value && otherfield_ary[0].Possiblevalue.length) {
                                            otherfield_ary[0].value = otherfield_ary[0].Possiblevalue[0].value;
                                        }

                                        if (otherfield_ary[0].Possiblevalue && otherfield_ary[0].Possiblevalue.length) {
                                            dep_ary[0].isDependent.value = dep_ary[0].isDependent.value ? true : false;
                                        } else {
                                            dep_ary[0].isDependent.value = false;
                                        }
                                        // dep_ary[0].isDependent.value = true;

                                    } else {
                                        var dep_ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'dependency' });
                                        if (dep_ary.length > 0) {
                                            dep_ary[0].isDependent.value = false;
                                        }
                                        $scope.isDependentForMask = false;
                                    }

                                    // otherfield_ary[0].Possiblevalue = [{ 'name': 'Current Date', 'value': 'currentdate' }];
                                    // for (var i = 0; i < otherfieldsary.length; i++) {
                                    //     if ($scope.current_field_setting.name != otherfieldsary[i].name) {
                                    //         var obj = {
                                    //             'name': otherfieldsary[i].labelName,
                                    //             'value': otherfieldsary[i].name
                                    //         };
                                    //         otherfield_ary[0].Possiblevalue.push(obj);

                                    //     }
                                    // }

                                    // if (!otherfield_ary[0].value && otherfield_ary[0].Possiblevalue.length) {
                                    //     otherfield_ary[0].value = otherfield_ary[0].Possiblevalue[0].value;
                                    // }


                                    if (inputType.toLowerCase() == 'text') {
                                        ary[0].value = 'Text';
                                    } else {
                                        ary[0].value = inputType;
                                    }

                                }
                                applyCommonData();
                            }

                            $scope.getDateType = function (inputType) {
                                if (inputType.toLowerCase() == 'date') {
                                    $scope.isDateField = true;
                                    $scope.current_field_setting.Type = 'date';
                                    $scope.current_field_setting.inputType = 'date';
                                    //$scope.current_field_setting.Settings = getSettings($scope.current_field_setting.inputType).Settings;

                                    var tempVar = $scope.current_field_setting.Settings ? $scope.current_field_setting.Settings : getSettings($scope.current_field_setting.inputType).Settings;
                                    //var tempVar = getSettings('date').Settings;
                                    if (tempVar.length) {
                                        tempVar[0] = angular.copy($scope.current_field_setting.Settings[0]);
                                    }

                                    var dep_ary = $filter('filter')(tempVar, { 'Type': 'dependency' });
                                    if (!dep_ary.length) {
                                        var dep_settings = angular.copy(getSettings($scope.current_field_setting.inputType).Settings);
                                        dep_ary = $filter('filter')(dep_settings, { 'Type': 'dependency' });
                                        //tempVar.push(dep_ary[0]);
                                        tempVar.splice((tempVar.length - 1), 0, dep_ary[0]);
                                    }

                                    $scope.current_field_setting.Settings = angular.copy(tempVar);
                                    //$scope.current_field_setting.value = 'Date';
                                    var ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'patterndropdown' });

                                    ary[0].value = 'Date';
                                    var dep_ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'dependency' });
                                    var otherfield_ary = $filter('filter')(dep_ary[0].dependencyObjs, { 'type': 'otherfield' });

                                    var otherfieldsary = getDateFields();
                                    var defauldDateObj = [
                                        { 'name': 'Current Date', 'value': 'currentdate' },
                                        { 'name': '15 years', 'value': 'above15years' },
                                        { 'name': '18 years', 'value': 'above18years' }
                                    ]
                                    otherfield_ary[0].Possiblevalue = defauldDateObj; //[{ 'name': 'Current Date', 'value': 'currentdate' }];
                                    // otherfield_ary[0].Possiblevalue.push({ 'name': 'Current Date + 7 days', 'value': 'weekmorethancurrentdate' });
                                    for (var i = 0; i < otherfieldsary.length; i++) {
                                        if ($scope.current_field_setting.name != otherfieldsary[i].name) {
                                            var obj = {
                                                'name': otherfieldsary[i].labelName,
                                                'value': otherfieldsary[i].name
                                            };
                                            otherfield_ary[0].Possiblevalue.push(obj);

                                        }
                                    }
                                    if (!otherfield_ary[0].value && otherfield_ary[0].Possiblevalue.length) {
                                        otherfield_ary[0].value = otherfield_ary[0].Possiblevalue[0].value;
                                    }
                                    //ary[0].value = 'Date';

                                } else {
                                    $scope.isDateField = false;
                                    $scope.isDependentForMask = false;
                                    var otherfieldsary = [];
                                    var otherfieldsary2 = [];

                                    if (inputType.toLowerCase() == 'numeric' || inputType.toLowerCase() == 'number') {
                                        $scope.current_field_setting.Type = 'number';
                                        $scope.current_field_setting.inputType = 'number';
                                        otherfieldsary = getNumericWithDecimalsFields();
                                        otherfieldsary2 = getNumericFields();
                                        otherfieldsary = otherfieldsary.concat(otherfieldsary2);
                                    } else if (inputType.toLowerCase() == 'numericwithdecimal' || inputType.toLowerCase() == 'numberwithdecimal') {
                                        $scope.current_field_setting.Type = 'numberwithdecimal';
                                        $scope.current_field_setting.inputType = 'numberwithdecimal';
                                        otherfieldsary = getNumericWithDecimalsFields();
                                        otherfieldsary2 = getNumericFields();
                                        otherfieldsary = otherfieldsary.concat(otherfieldsary2);
                                    } else if (inputType.toLowerCase() == 'phone-number') {
                                        $scope.current_field_setting.Type = 'phone-number';
                                        $scope.current_field_setting.inputType = 'phone-number';
                                    } else if (inputType.toLowerCase() == 'email') {
                                        $scope.current_field_setting.Type = 'email';
                                        $scope.current_field_setting.inputType = 'email';
                                    } else {
                                        $scope.current_field_setting.Type = 'text';
                                        $scope.current_field_setting.inputType = 'text';
                                        otherfieldsary = getTextMaskedFields();
                                    }
                                    // if (inputType.toLowerCase() == 'numericwithdecimal' || inputType.toLowerCase() == 'numeric' || inputType.toLowerCase() == 'number') {
                                    //     $scope.current_field_setting.Type = 'number';
                                    //     $scope.current_field_setting.inputType = 'number';
                                    // } else {
                                    //     $scope.current_field_setting.Type = 'text';
                                    //     $scope.current_field_setting.inputType = 'text';
                                    // }
                                    //$scope.current_field_setting.Settings = getSettings($scope.current_field_setting.inputType).Settings;

                                    //$scope.current_field_setting.Settings = getSettings($scope.current_field_setting.inputType).Settings;
                                    // if (!$scope.current_field_setting.Settings && !$scope.current_field_setting.Settings.length) {
                                    //     // && tempVar.length
                                    //     // var tempVar = getSettings($scope.current_field_setting.inputType).Settings;
                                    //     // tempVar[0] = angular.copy($scope.current_field_setting.Settings[0]);
                                    //     $scope.current_field_setting.Settings = getSettings($scope.current_field_setting.inputType).Settings;
                                    // }

                                    var ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'patterndropdown' });

                                    // // ary[0].value = 'Date';
                                    // var otherfieldsary = getNumericWithDecimalsFields();
                                    // var otherfieldsary2 = getNumericFields();

                                    // otherfieldsary = otherfieldsary.concat(otherfieldsary2);

                                    // otherfield_ary[0].Possiblevalue = [{ 'name': 'Current Date', 'value': 'currentdate' }];

                                    var dep_ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'dependency' });
                                    if (otherfieldsary && otherfieldsary.length && dep_ary && dep_ary.length) {
                                        var otherfield_ary = $filter('filter')(dep_ary[0].dependencyObjs, { 'type': 'otherfield' });


                                        $scope.isDependentForMask = true;
                                        otherfield_ary[0].Possiblevalue = [];
                                        for (var i = 0; i < otherfieldsary.length; i++) {
                                            if ($scope.current_field_setting.name != otherfieldsary[i].name) {
                                                var obj = {
                                                    'name': otherfieldsary[i].labelName,
                                                    'value': otherfieldsary[i].name
                                                };
                                                otherfield_ary[0].Possiblevalue.push(obj);

                                            }
                                        }

                                        if (!otherfield_ary[0].value && otherfield_ary[0].Possiblevalue.length) {
                                            otherfield_ary[0].value = otherfield_ary[0].Possiblevalue[0].value;
                                        }

                                        if (otherfield_ary[0].Possiblevalue && otherfield_ary[0].Possiblevalue.length) {
                                            dep_ary[0].isDependent.value = dep_ary[0].isDependent.value ? true : false;
                                        } else {
                                            dep_ary[0].isDependent.value = false;
                                        }
                                        // dep_ary[0].isDependent.value = true;

                                    } else {
                                        var dep_ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'dependency' });
                                        if (dep_ary && dep_ary.length) {
                                            dep_ary[0].isDependent.value = false;
                                        }
                                        $scope.isDependentForMask = false;
                                    }

                                    if (inputType.toLowerCase() == 'text') {
                                        ary[0].value = 'Text';
                                    } else {
                                        ary[0].value = inputType;
                                    }

                                }
                            }

                            function getSettings(type) {
                                var result = {};
                                $.each(controleSetting, function (index, set) {
                                    if (set.Type.toLowerCase() == type.toLowerCase()) {
                                        result = set;
                                        return;
                                    }
                                });
                                result.Settings = settingsList[type];
                                return result;
                            }

                            $scope.getFieldMaskSetting = function (settingname, obj) {
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


                            $scope.getFieldSettingPar = function (settingname) {
                                var result = {};
                                var settings = $scope.current_field_setting.Settings;
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

                            $scope.getFieldSetting = function (settingname) {
                                var result = {};
                                var settings = $scope.current_field_setting.Settings;
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

                            function checkIsDate() {
                                if ($scope.current_field_setting.Type.toLowerCase() == 'date') {
                                    $scope.getDateType('date');
                                }
                                if ($scope.current_field_setting.Type.toLowerCase() == 'text') {
                                    $scope.getDateType('text');
                                }

                            }
                            checkIsDate();

                            function applyCommonData() {
                                var ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'commondropdown' });
                                if (ary.length) {
                                    ary[0].Possiblevalue = angular.copy(commonfields);
                                }
                            }

                            applyCommonData();

                            $scope.setReadOnly = function (possibleValues, mappingid, set) {
                                var ary = $filter('filter')(possibleValues, { 'NewhireFieldid': mappingid }, true);
                                if (ary && ary.length) {
                                    $scope.isDefReadOnly = ary[0].isreadonly;
                                } else {
                                    $scope.isDefReadOnly = false;
                                }
                                var obj = $scope.getFieldSetting('Readonly', set);
                                obj.value = $scope.isDefReadOnly;
                                //$scope.getFieldSetting('Readonly').value = 
                                // for (var i = 0; i < $scope.current_field_setting.Settings.length; i++) {
                                //     if ($scope.current_field_setting.Settings[i].Type == "commondropdown") {
                                //         for (var j = 0; j < $scope.current_field_setting.Settings[i].Possiblevalue.length; j++) {
                                //             if ($scope.current_field_setting.Settings[i].Possiblevalue[j].NewhireFieldid == mappingId) {
                                //                 $scope.isDefReadOnly = $scope.current_field_setting.Settings[i].Possiblevalue[j].isreadonly;
                                //                 break;
                                //             }

                                //         }
                                //     }
                                // }
                            }

                            $scope.setCurrentDateReadonly = function (fieldType, fieldValue, set) {
                                if (fieldType == 'Dependency Validation' && fieldValue == false) {
                                    $scope.isDefReadOnly = false;
                                    $scope.isDisableValidations = false;
                                } else {
                                    if (fieldType == 'Conditions') {
                                        $scope.dateCondValue = fieldValue;
                                    } else if (fieldType == 'Other Fields') {
                                        $scope.dateOtherFieldsValue = fieldValue;
                                    }
                                    if ($scope.dateCondValue == '==' && $scope.dateOtherFieldsValue == 'currentdate') {
                                        $scope.isDefReadOnly = true;
                                        $scope.isDisableValidations = true;
                                    } else {
                                        $scope.isDefReadOnly = false;
                                        $scope.isDisableValidations = false;
                                    }
                                }
                                var obj = $scope.getFieldSetting('Readonly', set);
                                //obj.value = $scope.isDefReadOnly;

                            }


                            $scope.hide = function (ev) {
                                $mdDialog.hide();
                            }

                            $scope.cancel = function (ev) {
                                // $scope.fileThumb = '';
                                $mdDialog.cancel();
                            }
                            $scope.answer = function (ev) {
                                $mdDialog.hide({ 'save': true, 'data': $scope.current_field_setting });
                            }
                            // $scope.labelNameChanged=false; 
                            // $scope.answer = function ( ev, labelNameChanged) {
                            //     debugger;
                            //     if(labelNameChanged == "true" && $scope.current_field_setting.isSaved){
                            //         // http://192.168.1.198:8080/OnBoarding/commonfieldupdate/firstname/6
                            //         DynamicWebFormService.confirmUpdateCommonField($scope.current_field_setting.name, webformid).then(
                            //             function (response) {
                            //                 if (response.data.Success) {

                            //                 }
                            //             },
                            //             function (err){

                            //             }
                            //         )
                            //     }
                            //     else if(!$scope.current_field_setting.isSaved){
                            //         $mdDialog.hide({ 'save': true, 'data': $scope.current_field_setting });
                            //     }
                            //     else{
                            //         $mdDialog.hide();
                            //     }

                            // }
                            // $scope.itemType = itemType;
                            // $scope.itemname = itemname;
                            // $scope.id = id;
                        }]

                        // locals: { docid: id, folderid: 0 },
                        // templateUrl: rootUrl + '/components/settings/documents/dynamicWebForms/dynamicWebFormsSetting/dynamicWebFormsSetting.html',
                        // targetEvent: ev,
                        // parent: angular.element(document.body),
                        // clickOutsideToClose: false,
                        // escapeToClose: true,
                        // controller: ['$scope', '$window', function ($scope, $window ) {

                        // }]
                    })
                        .then(function (data) {
                            //$scope.$apply(function(){
                            $scope.formFields[indx] = data.data;

                            //})
                            // console.log('Uploading New Version of docId: ' + docid);
                        }, function () {
                            // console.log('You cancelled the document upload.');
                        })
                }

                function clearCommonFieldList(list) {
                    for (var i = 0; i < list.length; i++) {
                        var ary = $filter('filter')(list[i].Settings, { 'Type': 'commondropdown' });
                        if (ary.length) {
                            ary[0].Possiblevalue = [];
                        }
                    }
                }

                $scope.$watch('allfields', function (newValue) {
                    if (newValue != undefined) {
                        init();
                    }
                });
                $scope.$watchCollection('formFields', function (newValue, oldVal) {
                    if (newValue != undefined) {
                        //var allList = angular.copy(newValue);
                        clearCommonFieldList(newValue);
                        console.log(newValue);
                        $scope.$parent.finalFormFields = newValue;
                    }
                });
                // $scope.$watch('formFields', function (newValue) {
                //     if (newValue != undefined) {
                //         //var allList = angular.copy(newValue);
                //         clearCommonFieldList(newValue);
                //         console.log(newValue);
                //         $scope.$parent.finalFormFields = newValue;
                //     }
                // });

                $scope.$watch('deletedControls', function (newValue) {
                    if (newValue != undefined) {
                        $scope.$parent.deletedControls = newValue;
                    }
                });

                $scope.$watch('typecommonfields', function (newValue) {
                    if (newValue != undefined) {
                        getJsonCommonFields(newValue);
                    }
                });

            }]
        };
    }]);

}());