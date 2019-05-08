(function () {
    'use strict';
    hrAdminApp.controller('AddDesignWebformController', addDesignWebformController);
    addDesignWebformController.$inject = ['$rootScope', '$scope', '$state', '$filter', '$stateParams', '$mdDialog', 'ToastrService', 'DesignWebformsService', 'DynamicWebFormService'];

    function addDesignWebformController($rootScope, $scope, $state, $filter, $stateParams, $mdDialog, ToastrService, DesignWebformsService, DynamicWebFormService) {
        // var vm = this;
        // var rootUrl = $rootScope.rootUrl;

        // var guid = 1;
        // var docid = 15152;
        // $scope.source = $stateParams.source;
        // if ($scope.source == 'documents') $scope.source = 'Settings.Documents';

        // $scope.formFields = [];
        // $scope.current_field = {};
        // $scope.commonFields = [];

        // $scope.toggleLayout = true;

        // var dragElements = angular.copy(DynamicWebFormService.dragFields);
        // $scope.dragElements = $filter('filter')(dragElements, { 'commonDetailPage': true });



        // function commondynamicwebformview() {
        //     $scope.loading = true;
        //     DocLibraryService.commondynamicwebformview().then(
        //         function(response) {
        //             $scope.loading = false;
        //             if (response.data.Error) {
        //                 ToastrService.error(response.data.message);
        //             } else {
        //                 $scope.formFields = response.data.components ? response.data.components : [];
        //                 //convertToWebFormJson(tempComponents);
        //             }
        //         },
        //         function(err) {
        //             $scope.loading = false;
        //             ToastrService.error($rootScope.errorMsgs.MSG201);
        //         }
        //     )
        // }
        // commondynamicwebformview();

        // //var controleSetting = [{'name':"Single Text",'Type':"text",'Settings':[{'name':'Field Label','value':'Single Text','Type':'text'},{'name':'Validations','value':'','Type':'label'},{'name':'Min Length','value':'1','Type':'text'},{'name':'Max Length','value':'50','Type':'text'},{'name':'TabIndex','value':'','Type':'text'},{'name':'Mask','value':'','Type':'text'},{'name':'Pattern','value':'','Type':'text'},{'name':'Width','value':'1','Type':'dropdown','Possiblevalue':['1','2','3','4','5']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'SSN','value':false},{'name':'Display Stars','value':false},{'name':'Enable Google Maps','value':false}]}]},{'name':"Date",'Type':"date",'Settings':[{'name':'Field Label','value':'Field Label','Type':'text'},{'name':'TabIndex','value':'','Type':'text'},{'name':'Width','value':'1','Type':'dropdown','Possiblevalue':['1','2','3','4','5']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false}]}]},{'name':"Single Selection","Type":"dropdown",'Settings':[{'name':'Field Label','value':'Single Selection','Type':'text'},{'name':'TabIndex','value':'','Type':'text'},{'name':'Choice','Type':'dropdown_increment','Possiblevalue':[{'name':'Option 1','value':'Option1'},{'name':'Option 2','value':'Option2'}]},{'name':'Width','value':'1','Type':'dropdown','Possiblevalue':['1','2','3','4','5']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false}]}]},{'name':"TextArea","Type":"textarea",'Settings':[{'name':'Field Label','value':'','Type':'text'},{'name':'Validations','value':'','Type':'label'},{'name':'Min Length','value':'1','Type':'text'},{'name':'Max Length','value':'50','Type':'text'},{'name':'TabIndex','value':'','Type':'text'},{'name':'Width','value':'1','Type':'dropdown','Possiblevalue':['1','2','3','4','5']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Enable Google Maps','value':false}]}]},{'name':"Divider","Type":"devider",'Settings':[{'name':'Width','value':'1','Type':'devider','Possiblevalue':['1','2','3','4','5']}]},{'name':"Heading name","Type":"header",'Settings':[{'name':'Heading name','value':'Heading name','Type':'headervalue'},{'name':'Font Size','value':23,'Type':'font-size'},{'name':'Width','value':'1','Type':'heading','Possiblevalue':['1','2','3','4','5']}]},{'name':"Button","Type":"button",'Settings':[{'name':'Button Text','value':'Button','Type':'button'},{'name':'TabIndex','value':'','Type':'text'},{'name':'Width','value':'1','Type':'dropdown','Possiblevalue':['1','2','3','4','5']}]},{'name':"Checkbox Text","Type":"checkbox",'Settings':[{'name':'Field Label','value':'Checkbox Text','Type':'text'},{'name':'TabIndex','value':'','Type':'text'},{'name':'Width','value':'1','Type':'dropdown','Possiblevalue':['1','2','3','4','5']}],'Options':[{'name':'Checkbox1','value':'Checkbox1'},{'name':'Checkbox2','value':'Checkbox2'}]},{'name':"Radio Text","Type":"radio",'Settings':[{'name':'Field Label','value':'Radio Text','Type':'text'},{'name':'TabIndex','value':'','Type':'text'},{'name':'Width','value':'1','Type':'dropdown','Possiblevalue':['1','2','3','4','5']},{'name':'Radio Choice','Type':'radio_increment','Possiblevalue':[{'name':'Radio1','value':'Radio1'},{'name':'Radio2','value':'Radio2'}]},{'name':'Radio Align Options','Type':'radioBoxZone','value':'Align Vertical','Options':[{'name':'Align Horizontal'},{'name':'Align Vertical'}]},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false}]}],'Options':[{'name':'Radio1','value':'Radio1'},{'name':'Radio2','value':'Radio2'}]}];


        // // var controleSetting = [{'name':'Single Text','Type':'text','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Field Type','value':'Text','Type':'patterndropdown','width':50,'Possiblevalue':['Text','Numeric','NumericwithDecimal','AlphaNumeric','Phone-Number','Email','Date']},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'Min Length','value':'1','Type':'number','width':50},{'name':'Max Length','value':'50','Type':'number','width':50,'length':50},{'name':'TabIndex','value':'','Type':'number','width':50},{'name':'Width','value':'100','Type':'widthdropdown','width':50,'Possiblevalue':['100','50','33','25','20']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false},{'name':'Mask Data','value':false},{'name':'Enable Google Maps','value':false}],'width':100}]},{'name':'Email','Type':'email','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Field Type','value':'Text','Type':'patterndropdown','width':50,'Possiblevalue':['Text','Numeric','NumericwithDecimal','AlphaNumeric','Phone-Number','Email','Date']},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'Min Length','value':'1','Type':'number','width':50},{'name':'Max Length','value':'50','Type':'number','width':50,'length':50},{'name':'TabIndex','value':'','Type':'number','width':50},{'name':'Width','value':'100','Type':'widthdropdown','width':50,'Possiblevalue':['100','50','33','25','20']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false}],'width':100}]},{'name':'Single Text','Type':'phone-number','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Field Type','value':'Phone-Number','Type':'patterndropdown','width':50,'Possiblevalue':['Text','Numeric','NumericwithDecimal','AlphaNumeric','Phone-Number','Email','Date']},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'Min Length','value':'1','Type':'number','width':50},{'name':'Max Length','value':'50','Type':'number','width':50,'length':50},{'name':'TabIndex','value':'','Type':'number','width':50},{'name':'Width','value':'100','Type':'widthdropdown','width':50,'Possiblevalue':['100','50','33','25','20']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false}],'width':100}]},{'name':'Single Text','Type':'number','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Field Type','value':'Numeric','Type':'patterndropdown','width':50,'Possiblevalue':['Text','Numeric','NumericwithDecimal','AlphaNumeric','Phone-Number','Email','Date']},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'Min','value':'1','Type':'number','width':50},{'name':'Max','value':'50','Type':'number','width':50},{'name':'TabIndex','value':'','Type':'number','width':50},{'name':'Width','value':'100','Type':'widthdropdown','width':50,'Possiblevalue':['100','50','33','25','20']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false},{'name':'Mask Data','value':false}],'width':100}]},{'name':'Date','Type':'date','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Field Type','value':'Date','Type':'patterndropdown','width':50,'Possiblevalue':['Text','Numeric','NumericwithDecimal','AlphaNumeric','Phone-Number','Email','Date']},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'Min Length','value':'1','Type':'number','disabled':true,'width':50},{'name':'Max Length','value':'50','Type':'number','disabled':true,'width':50},{'name':'TabIndex','value':'','Type':'number','width':50},{'name':'Width','value':'100','Type':'widthdropdown','Possiblevalue':['100','50','33','25','20'],'width':50},{'name':'Dependency Validation','value':'','Type':'dependency','width':100,'isDependent':{'name':'','value':true},'dependencyObjs':[{'name':'Conditions','type':'conditions','value':'<','Possiblevalue':[{'name':'Less than(<)','value':'<',},{'name':'Less than or equals(<=)','value':'<=',},{'name':'Greater than(>)','value':'>',},{'name':'Greater than or equals(>=)','value':'>=',},{'name':'Equals(=)','value':'==',}]},{'name':'Other Fields','type':'otherfield','value':'','Possiblevalue':[]}]},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false},],'width':100}]},{'name':'Single Selection','Type':'dropdown','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'TabIndex','value':'','Type':'text','width':50},{'name':'Choice','Type':'dropdown_increment','Possiblevalue':[{'name':'Option 1','value':'Option1'},{'name':'Option 2','value':'Option2'}],'width':100},{'name':'Width','value':'100','Type':'widthdropdown','Possiblevalue':['100','50','33','25','20'],'width':50},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false}],'width':100}]},{'name':'TextArea','Type':'textarea','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'Min Length','value':'1','Type':'number','width':50},{'name':'Max Length','value':'200','Type':'number','width':50,'length':2000},{'name':'TabIndex','value':'','Type':'number','width':50},{'name':'Width','value':'100','Type':'widthdropdown','Possiblevalue':['100','50','33','25','20'],'width':50},{'name':'Field Type','value':'String','Type':'dropdown','width':50,'Possiblevalue':['String','Numeric','NumericwithDecimal','AlphaNumeric','Phone-Number','Email']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false},{'name':'Mask Data','value':false},{'name':'Enable Google Maps','value':false}],'width':100}]},{'name':'Radio Text','Type':'radio','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'TabIndex','value':'','Type':'text','width':50},{'name':'Width','value':'100','Type':'widthdropdown','Possiblevalue':['100','50','33','25','20'],'width':50},{'name':'Radio Choice','Type':'radio_increment','Possiblevalue':[{'name':'Radio1','value':'Radio1'},{'name':'Radio2','value':'Radio2'}],'width':100},{'name':'Radio Align Options','Type':'radioBoxZone','value':'Align Vertical','Options':[{'name':'Align Horizontal'},{'name':'Align Vertical'}],'width':100},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false},],'width':100}],'data':[{'name':'Radio1','value':'Radio1'},{'name':'Radio2','value':'Radio2'}]},{'name':'Button','Type':'button','input':true,'inputType':'header','Settings':[{'name':'Button Text','value':'','Type':'button','width':100},{'name':'Validations','value':'','Type':'label'},{'name':'TabIndex','value':'','Type':'text','width':50},{'name':'Width','value':'100','Type':'widthdropdown','Possiblevalue':['100','50','33','25','20'],'width':50}]},{'name':'Checkbox Text','Type':'checkbox','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'TabIndex','value':'','Type':'text','width':50},{'name':'Width','value':'100','Type':'widthdropdown','Possiblevalue':['100','50','33','25','20'],'width':50}],'Options':[{'name':'Checkbox1','value':'Checkbox1'},{'name':'Checkbox2','value':'Checkbox2'}]},{'name':'Divider','Type':'devider','input':true,'inputType':'devider','Settings':[{'name':'Width','value':'1','Type':'devider','Possiblevalue':['100','50','33','25','20'],'width':100}]},{'name':'Empty Space','Type':'emptyspace','input':true,'inputType':'emptyspace','Settings':[{'name':'Width','value':'1','Type':'emptyspace','Possiblevalue':['100','50','33','25','20'],'width':100}]},{'name':'Heading name','Type':'header','input':true,'inputType':'header','Settings':[{'name':'Heading name','value':'Heading name','Type':'headervalue','width':100},{'name':'Font Size','value':23,'Type':'font-size','width':50},{'name':'Font-Family','value':'Segoe UI','Type':'font-family','Possiblevalue':['Arial','Comic Sans MS','Courier New','Georgia','Lucida Sans Unicode','Tahoma','Times New Roman','Trebuchet MS','Segoe UI','Verdana'],'width':50},{'name':'Width','value':'100','Type':'heading','Possiblevalue':['100','50','33','25','20'],'width':50}]}];

        // // $scope.dragElements = [{'name':'Text','Type':'text','inputType':'text','input':true,'value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'Label Name','Type':'text','width':50},{'name':'Field Type','value':'Text','Type':'patterndropdown','width':50,'Possiblevalue':['Text','Numeric','NumericwithDecimal','AlphaNumeric','Phone-Number','Email','Date']},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'Min Length','value':'1','Type':'number','width':50},{'name':'Max Length','value':'50','Type':'number','width':50,'length':50},{'name':'TabIndex','value':'','Type':'number','width':50},{'name':'Width','value':'100','Type':'widthdropdown','width':50,'Possiblevalue':['100','50','33','25','20']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false},{'name':'Mask Data','value':false},{'name':'Enable Google Maps','value':false}],'width':100}]},{'name':'Date','Type':'date','inputType':'date','input':true,'value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'Label Name','Type':'text','width':50},{'name':'Field Type','value':'Date','Type':'patterndropdown','width':50,'Possiblevalue':['Text','Numeric','NumericwithDecimal','AlphaNumeric','Phone-Number','Email','Date']},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'Min Length','value':'1','Type':'number','disabled':true,'width':50},{'name':'Max Length','value':'50','Type':'number','disabled':true,'width':50},{'name':'TabIndex','value':'','Type':'number','width':50},{'name':'Width','value':'100','Type':'widthdropdown','Possiblevalue':['100','50','33','25','20'],'width':50},{'name':'Dependency Validation','value':'','Type':'dependency','width':100,'isDependent':{'name':'','value':true},'dependencyObjs':[{'name':'Conditions','type':'conditions','value':'<','Possiblevalue':[{'name':'Less than(<)','value':'<',},{'name':'Less than or equals(<=)','value':'<=',},{'name':'Greater than(>)','value':'>',},{'name':'Greater than or equals(>=)','value':'>=',},{'name':'Equals(=)','value':'==',}]},{'name':'Other Fields','type':'otherfield','value':'','Possiblevalue':[]}]},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false},],'width':100}]},{'name':'TextArea','Type':'textarea','inputType':'textarea','input':true,'value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'Label Name','Type':'text','width':50},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'Min Length','value':'1','Type':'number','width':50},{'name':'Max Length','value':'200','Type':'number','width':50,'length':2000},{'name':'TabIndex','value':'','Type':'number','width':50},{'name':'Width','value':'100','Type':'widthdropdown','Possiblevalue':['100','50','33','25','20'],'width':50},{'name':'Field Type','value':'String','Type':'dropdown','width':50,'Possiblevalue':['String','Numeric','NumericwithDecimal','AlphaNumeric','Phone-Number','Email']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false},{'name':'Mask Data','value':false},{'name':'Enable Google Maps','value':false}],'width':100}]},{'name':'Radio Button','Type':'radio','inputType':'Radio button','input':true,'value':'','mappingId':0,'Settings':[{'name':'Radio Text','value':'Radio Text','Type':'text','width':50},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'TabIndex','value':'','Type':'text','width':50},{'name':'Width','value':'100','Type':'widthdropdown','Possiblevalue':['100','50','33','25','20'],'width':50},{'name':'Radio Choice','Type':'radio_increment','Possiblevalue':[{'name':'Radio1','value':'Radio1'},{'name':'Radio2','value':'Radio2'}],'width':100},{'name':'Radio Align Options','Type':'radioBoxZone','value':'Align Vertical','Options':[{'name':'Align Horizontal'},{'name':'Align Vertical'}],'width':100},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false},],'width':100}],'data':[{'name':'Radio1','value':'Radio1'},{'name':'Radio2','value':'Radio2'}]},{'name':'Checkbox','Type':'checkbox','inputType':'Check box','input':true,'value':'','mappingId':0,'Settings':[{'name':'Checkbox Text Name','value':'Checkbox Text Name','Type':'text','width':50},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'TabIndex','value':'','Type':'text','width':50},{'name':'Width','value':'100','Type':'widthdropdown','Possiblevalue':['100','50','33','25','20'],'width':50}],'Options':[{'name':'Checkbox1','value':'Checkbox1'},{'name':'Checkbox2','value':'Checkbox2'}]},{'name':'Divider','Type':'devider','inputType':'devider','input':true,'inputType':'devider','Settings':[{'name':'Width','value':'1','Type':'devider','Possiblevalue':['100','50','33','25','20'],'width':100}]},{'name':'Empty Space','Type':'emptyspace','input':true,'inputType':'emptyspace','Settings':[{'name':'Width','value':'1','Type':'emptyspace','Possiblevalue':['100','50','33','25','20'],'width':100}]},{'name':'Heading name','Type':'header','inputType':'header','input':true,'inputType':'header','Settings':[{'name':'Heading name','value':'Heading name','Type':'headervalue','width':100},{'name':'Font Size','value':23,'Type':'font-size','width':50},{'name':'Font-Family','value':'Segoe UI','Type':'font-family','Possiblevalue':['Arial','Comic Sans MS','Courier New','Georgia','Lucida Sans Unicode','Tahoma','Times          New Roman','Trebuchet MS','Segoe UI','Verdana'],'width':50},{'name':'Width','value':'100','Type':'heading','Possiblevalue':['100','50','33','25','20'],'width':50}]}];

        // // function getSettingObj(type) {
        // //     var ary = $filter('filter')(controleSetting, { 'Type': type });
        // //     return ary[0].Settings;
        // // }

        // //   function updateObj(makingObj,type,obj){
        // //     $.each(makingObj.Settings, function(index, set) {
        // //         if (set.Type == type) {
        // //             set.Possiblevalue = obj.data.values;
        // //             return;
        // //         }
        // //     });

        // //   }

        // vm.postFieldMapping = function() {
        //     var objMapping = {};
        //     var docMapping = [];

        //     // if (vm.docFields.length == 0) {
        //     //     ToastrService.message("This document has no document fields to map to common fields and save!");
        //     //     return;
        //     // }

        //     for (var i = 0; i < $scope.formFields.length; i++) {

        //         //var ary = $filter('filter')($scope.formFields[i].Settings, { 'Type': 'commondropdown' });
        //         var ary = $scope.formFields[i];

        //         // if (ary && ary.length && ary[0].value && ary[0].value != 'None')
        //         // docMapping.push({
        //         //     'docFieldName': $scope.formFields[i].name,
        //         //     'commonFieldId': ary[0].value,
        //         //     'page': $scope.formFields[i].page
        //         // });

        //         if (ary.mappingId && ary.mappingId != '' && ary.mappingId != 'None')
        //             docMapping.push({
        //                 'docFieldName': $scope.formFields[i].name,
        //                 'commonFieldId': ary.mappingId,
        //                 'page': $scope.formFields[i].page
        //             });
        //     }

        //     if (docMapping.length == 0) {
        //         return;
        //     }
        //     // console.log(docMapping);

        //     objMapping.documentId = docid;
        //     objMapping.documentMapping = docMapping;
        //     // console.log(objMapping);
        //     DocLibraryService.postMappingDetails(objMapping, 'update').then(
        //         function(response) {
        //             if (response.data.Error) {} else {}
        //         },
        //         function(err) {
        //             ToastrService.error($rootScope.errorMsgs.MSG216);
        //         }
        //     )
        // }

        // vm.commondynamicwebform = function() {
        //     // submit new / modified folder details.
        //     //var js = changeJsonForAPI();
        //     var finalObj = {
        //             'components': angular.copy($scope.formFields)
        //         }
        //         //return false;
        //     $scope.loading = true;

        //     DocLibraryService.commondynamicwebform(finalObj, docid).then(
        //         function(response) {
        //             $scope.loading = false;
        //             if (response.data.Error) {
        //                 ToastrService.error(response.data.message);
        //             }
        //             if (!response.data.Error) {
        //                 ToastrService.success(response.data.message);
        //                 //$state.go('Dashboard', {}, { reload: 'Dashboard' });
        //                 //$state.go('Settings.Documents');
        //             }
        //         },
        //         function(err) {
        //             ToastrService.error($rootScope.errorMsgs.MSG218);
        //         }
        //     )
        // }

        // function updateObj(makingObj, type, obj) {
        //     $.each(makingObj.Settings, function(index, set) {
        //         if (set.Type == type && (obj.data.values && obj.data.values.length)) {
        //             for (var i = 0; i < obj.data.values.length; i++) {
        //                 if (!obj.data.values[i].name) {
        //                     obj.data.values[i].name = obj.data.values[i].value;
        //                 }
        //             }
        //             set.Possiblevalue = obj.data.values;
        //             return;
        //         }
        //     });

        // }


        // //  function getFieldObj(settingname, obj) {
        // //     var result = {};
        // //     var settings = obj.Settings;
        // //     $.each(makingObj.Settings, function(index, set) {
        // //         if (set.Type == type) {
        // //             set.Possiblevalue = obj.values;
        // //             return;
        // //         }
        // //     });
        // //     return result;

        // // }
        // // var formfieldstemp = '';
        // // function convertToWebFormJson(tempComponents) {
        // //     var components = $filter('orderBy')(tempComponents, ['page', 'tab']);
        // //     for (var i = 0; i < components.length; i++) {
        // //         var obj = components[i];
        // //         var makingObj = {};
        // //         //   makingObj.page = obj.page;      
        // //         //   makingObj.tab = obj.tab;
        // //         if (obj.input) {
        // //             switch (obj.inputType.toLowerCase()) {
        // //                 case 'textarea':
        // //                     // code block
        // //                     makingObj.name = obj.name;
        // //                     makingObj.Type = 'textarea';
        // //                     makingObj.inputType = 'textarea';
        // //                     makingObj.page = obj.page;
        // //                     makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
        // //                     makingObj.value = obj.value ? obj.value : '';
        // //                     makingObj.input = true;
        // //                     makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('textarea'));
        // //                     makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
        // //                     $scope.formFields.push(makingObj);
        // //                     makingObj = {};
        // //                     break;
        // //                 case 'text':
        // //                     // code block
        // //                     makingObj.name = obj.name;
        // //                     makingObj.Type = 'text';
        // //                     makingObj.inputType = 'text';
        // //                     makingObj.page = obj.page;
        // //                     makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
        // //                     makingObj.value = obj.value ? obj.value : '';
        // //                     makingObj.input = true;
        // //                     makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('text'));
        // //                     makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
        // //                     $scope.formFields.push(makingObj);
        // //                     makingObj = {};
        // //                     break;
        // //                 case 'email':
        // //                     // code block
        // //                     makingObj.name = obj.name;
        // //                     makingObj.Type = 'email';
        // //                     makingObj.inputType = 'email';
        // //                     makingObj.page = obj.page;
        // //                     makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
        // //                     makingObj.value = obj.value ? obj.value : '';
        // //                     makingObj.input = true;
        // //                     makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('email'));
        // //                     makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
        // //                     $scope.formFields.push(makingObj);
        // //                     makingObj = {};
        // //                     break;
        // //                 case 'number':
        // //                     // code block
        // //                     makingObj.name = obj.name;
        // //                     makingObj.Type = 'number';
        // //                     makingObj.inputType = 'number';
        // //                     makingObj.page = obj.page;
        // //                     makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
        // //                     makingObj.value = obj.value ? obj.value : '';
        // //                     makingObj.input = true;
        // //                     makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('number'));
        // //                     makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
        // //                     $scope.formFields.push(makingObj);
        // //                     makingObj = {};
        // //                     break;
        // //                 case 'phone-number':
        // //                     // code block
        // //                     makingObj.name = obj.name;
        // //                     makingObj.Type = 'phone-number';
        // //                     makingObj.inputType = 'phone-number';
        // //                     makingObj.page = obj.page;
        // //                     makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
        // //                     makingObj.value = obj.value ? obj.value : '';
        // //                     makingObj.input = true;
        // //                     makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('phone-number'));
        // //                     makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
        // //                     $scope.formFields.push(makingObj);
        // //                     makingObj = {};
        // //                     break;
        // //                 case 'date':
        // //                     // code block
        // //                     makingObj.name = obj.name;
        // //                     makingObj.Type = 'date';
        // //                     makingObj.inputType = 'date';
        // //                     makingObj.page = obj.page;
        // //                     makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
        // //                     makingObj.value = obj.value ? obj.value : '';
        // //                     makingObj.input = true;
        // //                     console.log(getSettingObj('date'));
        // //                     makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('date'));
        // //                     makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
        // //                     $scope.formFields.push(makingObj);
        // //                     makingObj = {};
        // //                     break;
        // //                 case 'combo box':
        // //                     // code block
        // //                     makingObj.name = obj.name;
        // //                     makingObj.Type = 'dropdown';
        // //                     makingObj.inputType = 'Combo box';
        // //                     makingObj.page = obj.page;
        // //                     makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
        // //                     makingObj.value = obj.value ? obj.value : '';
        // //                     makingObj.input = true;
        // //                     makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('dropdown'));
        // //                     makingObj.values = obj.values;
        // //                     updateObj(makingObj, 'dropdown_increment', obj);
        // //                     makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
        // //                     $scope.formFields.push(makingObj);
        // //                     makingObj = {};
        // //                     break;
        // //                 case 'push button':
        // //                     // code block
        // //                     makingObj.name = obj.name;
        // //                     makingObj.Type = 'button';
        // //                     makingObj.inputType = 'Push button';
        // //                     makingObj.input = true;
        // //                     makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('button'));
        // //                     $scope.formFields.push(makingObj);
        // //                     makingObj = {};
        // //                     break;
        // //                 case 'check box':
        // //                     // code block
        // //                     makingObj.name = obj.name;
        // //                     makingObj.Type = 'checkbox';
        // //                     makingObj.inputType = 'Check box';
        // //                     makingObj.page = obj.page;
        // //                     makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
        // //                     makingObj.value = obj.value ? obj.value : '';
        // //                     makingObj.input = true;
        // //                     makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('checkbox'));
        // //                     makingObj.Options = obj.values;
        // //                     makingObj.values = obj.values;
        // //                     makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
        // //                     $scope.formFields.push(makingObj);
        // //                     makingObj = {};
        // //                     break;
        // //                 case 'radio button':
        // //                     // code block
        // //                     makingObj.name = obj.name;
        // //                     makingObj.Type = 'radio';
        // //                     makingObj.inputType = 'Radio button';
        // //                     makingObj.page = obj.page;
        // //                     makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
        // //                     makingObj.value = obj.value ? obj.value : '';
        // //                     makingObj.input = true;
        // //                     makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('radio'));
        // //                     updateObj(makingObj, 'radio_increment', obj);
        // //                     //makingObj.Options = obj.data.values;
        // //                     makingObj.data = {
        // //                         values: obj.data.values
        // //                     };
        // //                     makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
        // //                     $scope.formFields.push(makingObj);
        // //                     makingObj = {};
        // //                     break;
        // //                 case 'header':
        // //                     // code block
        // //                     makingObj.name = obj.name;
        // //                     makingObj.Type = 'header';
        // //                     makingObj.inputType = 'header';
        // //                     makingObj.page = obj.page ? obj.page : null;
        // //                     makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
        // //                     makingObj.value = obj.value ? obj.value : '';
        // //                     makingObj.input = true;
        // //                     makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('header'));
        // //                     $scope.formFields.push(makingObj);
        // //                     makingObj = {};
        // //                     break;
        // //                 case 'devider':
        // //                     // code block
        // //                     makingObj.name = obj.name;
        // //                     makingObj.Type = 'devider';
        // //                     makingObj.inputType = 'devider';
        // //                     makingObj.input = true;
        // //                     makingObj.page = obj.page ? obj.page : null;
        // //                     makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('devider'));
        // //                     $scope.formFields.push(makingObj);
        // //                     makingObj = {};
        // //                     break;
        // //                 case 'emptyspace':
        // //                     // code block
        // //                     makingObj.name = obj.name;
        // //                     makingObj.Type = 'emptyspace';
        // //                     makingObj.inputType = 'emptyspace';
        // //                     makingObj.input = true;
        // //                     makingObj.page = obj.page ? obj.page : null;
        // //                     makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('emptyspace'));
        // //                     $scope.formFields.push(makingObj);
        // //                     makingObj = {};
        // //                     break;
        // //                 default:
        // //                     // code block


        // //             }
        // //         }
        // //     }
        // //     formfieldstemp = angular.copy($scope.formFields);
        // // }

        // // function getSettingObj(type) {
        // //     var ary = $filter('filter')(controleSetting, { 'Type': type });
        // //     return ary[0].Settings;
        // // }




        // $scope.changeFieldSettingPar = function(value, Settingname, obj) {
        //     switch (Settingname) {
        //         case 'Field Label':
        //         case 'Short Label':
        //         case 'Internal name':
        //             obj.name = value;
        //             obj.Settings[0].value = obj.name;
        //             //$scope.current_field_setting.Settings[1].value = $scope.current_field_setting.name;
        //             //$scope.current_field_setting.Settings[2].value = 'x' + $scope.current_field_setting.name.replace(/\s/g, '_');
        //             break;
        //         default:
        //             break;
        //     }
        // }


        // $scope.getFieldSettingPar = function(settingname, obj) {
        //     var result = {};
        //     var settings = obj.Settings;
        //     $.each(settings, function(index, set) {
        //         if (set.name == settingname) {
        //             result = set;
        //             return;
        //         }
        //     });
        //     if (!Object.keys(result).length) {
        //         //Continue to search settings in the checkbox zone
        //         $.each(settings[settings.length - 1].Options, function(index, set) {
        //             if (set.name == settingname) {
        //                 result = set;
        //                 return;
        //             }
        //         });
        //     }
        //     return result;

        // }
        // $scope.getFieldRadioPar = function(settingname, obj) {
        //     var result = {};
        //     var settings = obj.Settings;
        //     $.each(settings, function(index, set) {
        //         if (set.name == settingname) {
        //             result = set;
        //             return;
        //         }
        //     });
        //     if (!Object.keys(result).length) {
        //         //Continue to search settings in the checkbox zone
        //         $.each(settings[settings.length - 1].Options, function(index, set) {
        //             if (set.name == settingname) {
        //                 result = set;
        //                 return;
        //             }
        //         });
        //     }
        //     return result;

        // }

        // $scope.goback = function() {
        //     //$state.go('Settings.Documents');
        //     $scope.formFields = angular.copy(formfieldstemp);
        // }

        // // vm.showSettingsDialog = function(ev, indx) {
        // //     //indx = indx ? indx : 0;
        // //      indx = (typeof indx != 'undefined') ? indx : ($scope.formFields.length - 1);
        // //     var setting = angular.copy($scope.formFields[indx]);
        // //     if (setting.Type == 'devider' || setting.Type == 'emptyspace') {
        // //         return false;
        // //     }
        // //     $mdDialog.show({
        // //             clickOutsideToClose: false,
        // //             escapeToClose: false,
        // //             locals: { settingchanges: setting, allFormFields: $scope.formFields, commonfields: $scope.commonFields },
        // //             templateUrl: rootUrl + '/components/settings/documents/dynamicWebForms/dynamicWebFormsSetting/dynamicWebFormsSetting.html',

        // //             //controller: 'WebFormSettingsController',
        // //             controller: ['$scope', 'settingchanges', 'allFormFields', 'commonfields', function($scope, settingchanges, allFormFields, commonfields) {
        // //                 $scope.current_field_setting = angular.copy(settingchanges);
        // //                 $scope.isDateField = false;
        // //                 $scope.isCommonWebForm = true;

        // //                 //$scope.commonfieldsData = angular.copy(commonfields);
        // //                 $scope.changeFieldSetting = function(value, Settingname) {
        // //                     switch (Settingname) {
        // //                         case 'Field Label':
        // //                         case 'Short Label':
        // //                         case 'Internal name':
        // //                             $scope.current_field_setting.name = value;
        // //                             $scope.current_field_setting.Settings[0].value = $scope.current_field_setting.name;
        // //                             //$scope.current_field_setting.Settings[1].value = $scope.current_field_setting.name;
        // //                             //$scope.current_field_setting.Settings[2].value = 'x' + $scope.current_field_setting.name.replace(/\s/g, '_');
        // //                             break;
        // //                         default:
        // //                             break;
        // //                     }
        // //                 }

        // //                 $scope.addRadio = function(values){
        // //                     var obj = {
        // //                         'name': 'Radio'+(values.length+1),
        // //                         'value': 'Radio'+(values.length+1)
        // //                       }
        // //                       values.push(obj);

        // //                 }

        // //                 $scope.changeradiolabel = function(name, set, indx) {
        // //                     set.data[indx].name = name;
        // //                 }

        // //                 function getDateFields() {
        // //                     var ary = $filter('filter')(allFormFields, { 'Type': 'date' });
        // //                     return ary;
        // //                 }

        // //                 $scope.setReadOnly = function (mappingId) {
        // //                     for (var i = 0; i < $scope.current_field_setting.Settings.length; i++) {
        // //                         if ($scope.current_field_setting.Settings[i].Type == "commondropdown") {
        // //                             for (var j = 0; j < $scope.current_field_setting.Settings[i].Possiblevalue.length; j++) {
        // //                                 if ($scope.current_field_setting.Settings[i].Possiblevalue[j].NewhireFieldid == mappingId) {
        // //                                     $scope.isDefReadOnly = $scope.current_field_setting.Settings[i].Possiblevalue[j].isreadonly;
        // //                                     break;
        // //                                 }
        // //                             }
        // //                         }
        // //                     }
        // //                 }

        // //                 $scope.setCurrentDateReadonly = function (fieldType , fieldValue) {
        // //                     if(fieldType == 'Dependency Validation' && fieldValue == false){
        // //                         $scope.isDefReadOnly = false;
        // //                         $scope.isDisableValidations = false;
        // //                     }
        // //                     else{
        // //                         if(fieldType == 'Conditions'){
        // //                             $scope.dateCondValue = fieldValue;
        // //                         }
        // //                         else if(fieldType == 'Other Fields'){
        // //                             $scope.dateOtherFieldsValue = fieldValue;
        // //                         }
        // //                         if($scope.dateCondValue == '==' && $scope.dateOtherFieldsValue == 'currentdate'){
        // //                             $scope.isDefReadOnly = true;
        // //                             $scope.isDisableValidations = true;
        // //                         }
        // //                         else{
        // //                             $scope.isDefReadOnly = false;
        // //                             $scope.isDisableValidations = false;
        // //                         }
        // //                     }
        // //                 }

        // //                 $scope.changeType = function(inputType) {
        // //                     if (inputType.toLowerCase() == 'date') {
        // //                         $scope.isDateField = true;
        // //                         $scope.current_field_setting.Type = 'date';
        // //                         $scope.current_field_setting.inputType = 'date';
        // //                         //$scope.current_field_setting.Settings = getSettings($scope.current_field_setting.inputType).Settings;

        // //                         // var tempVar = $scope.current_field_setting.Settings ? $scope.current_field_setting.Settings : getSettings($scope.current_field_setting.inputType).Settings;
        // //                         var tempVar = getSettings('date').Settings;
        // //                         if (tempVar.length) {
        // //                             tempVar[0] = angular.copy($scope.current_field_setting.Settings[0]);
        // //                         }

        // //                         var dep_ary = $filter('filter')(tempVar, { 'Type': 'dependency' });
        // //                         if (!dep_ary.length) {
        // //                             var dep_settings = angular.copy(getSettings($scope.current_field_setting.inputType).Settings);
        // //                             dep_ary = $filter('filter')(dep_settings, { 'Type': 'dependency' });
        // //                             //tempVar.push(dep_ary[0]);
        // //                             tempVar.splice((tempVar.length - 1), 0, dep_ary[0]);
        // //                         }

        // //                         $scope.current_field_setting.Settings = angular.copy(tempVar);
        // //                         //$scope.current_field_setting.value = 'Date';
        // //                         var ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'patterndropdown' });

        // //                         ary[0].value = 'Date';
        // //                         var dep_ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'dependency' });
        // //                         var otherfield_ary = $filter('filter')(dep_ary[0].dependencyObjs, { 'type': 'otherfield' });

        // //                         var otherfieldsary = getDateFields();
        // //                         otherfield_ary[0].Possiblevalue = [{ 'name': 'Current Date', 'value': 'currentdate' }];
        // //                         for (var i = 0; i < otherfieldsary.length; i++) {
        // //                             if ($scope.current_field_setting.name != otherfieldsary[i].name) {
        // //                                 var obj = {
        // //                                     'name': otherfieldsary[i].name,
        // //                                     'value': otherfieldsary[i].name
        // //                                 };
        // //                                 otherfield_ary[0].Possiblevalue.push(obj);

        // //                             }
        // //                         }
        // //                         if (otherfield_ary[0].Possiblevalue.length) {
        // //                             otherfield_ary[0].value = otherfield_ary[0].Possiblevalue[0].value;
        // //                         }
        // //                         //ary[0].value = 'Date';

        // //                     } else {
        // //                         $scope.isDateField = false;
        // //                         if (inputType.toLowerCase() == 'numericwithdecimal' || inputType.toLowerCase() == 'numeric' || inputType.toLowerCase() == 'number') {
        // //                             $scope.current_field_setting.Type = 'number';
        // //                             $scope.current_field_setting.inputType = 'number';
        // //                         } else if (inputType.toLowerCase() == 'phone-number') {
        // //                             $scope.current_field_setting.Type = 'phone-number';
        // //                             $scope.current_field_setting.inputType = 'phone-number';
        // //                         } else if (inputType.toLowerCase() == 'email') {
        // //                             $scope.current_field_setting.Type = 'email';
        // //                             $scope.current_field_setting.inputType = 'email';
        // //                         } else {
        // //                             $scope.current_field_setting.Type = 'text';
        // //                             $scope.current_field_setting.inputType = 'text';
        // //                         }
        // //                         //$scope.current_field_setting.Settings = getSettings($scope.current_field_setting.inputType).Settings;
        // //                         var tempVar = getSettings($scope.current_field_setting.inputType).Settings;
        // //                         if (tempVar.length) {
        // //                             tempVar[0] = angular.copy($scope.current_field_setting.Settings[0]);
        // //                         }

        // //                         $scope.current_field_setting.Settings = angular.copy(tempVar);

        // //                         var ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'patterndropdown' });

        // //                         if (inputType.toLowerCase() == 'text') {
        // //                             ary[0].value = 'Text';
        // //                         } else {
        // //                             ary[0].value = inputType;
        // //                         }

        // //                     }
        // //                     applyCommonData();
        // //                 }

        // //                 $scope.getDateType = function(inputType) {
        // //                     if (inputType.toLowerCase() == 'date') {
        // //                         $scope.isDateField = true;
        // //                         $scope.current_field_setting.Type = 'date';
        // //                         $scope.current_field_setting.inputType = 'date';
        // //                         //$scope.current_field_setting.Settings = getSettings($scope.current_field_setting.inputType).Settings;

        // //                         var tempVar = $scope.current_field_setting.Settings ? $scope.current_field_setting.Settings : getSettings($scope.current_field_setting.inputType).Settings;
        // //                         //var tempVar = getSettings('date').Settings;
        // //                         if (tempVar.length) {
        // //                             tempVar[0] = angular.copy($scope.current_field_setting.Settings[0]);
        // //                         }

        // //                         var dep_ary = $filter('filter')(tempVar, { 'Type': 'dependency' });
        // //                         if (!dep_ary.length) {
        // //                             var dep_settings = angular.copy(getSettings($scope.current_field_setting.inputType).Settings);
        // //                             dep_ary = $filter('filter')(dep_settings, { 'Type': 'dependency' });
        // //                             //tempVar.push(dep_ary[0]);
        // //                             tempVar.splice((tempVar.length - 1), 0, dep_ary[0]);
        // //                         }

        // //                         $scope.current_field_setting.Settings = angular.copy(tempVar);
        // //                         //$scope.current_field_setting.value = 'Date';
        // //                         var ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'patterndropdown' });

        // //                         ary[0].value = 'Date';
        // //                         var dep_ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'dependency' });
        // //                         var otherfield_ary = $filter('filter')(dep_ary[0].dependencyObjs, { 'type': 'otherfield' });

        // //                         var otherfieldsary = getDateFields();
        // //                         otherfield_ary[0].Possiblevalue = [{ 'name': 'Current Date', 'value': 'currentdate' }];
        // //                         for (var i = 0; i < otherfieldsary.length; i++) {
        // //                             if ($scope.current_field_setting.name != otherfieldsary[i].name) {
        // //                                 var obj = {
        // //                                     'name': otherfieldsary[i].name,
        // //                                     'value': otherfieldsary[i].name
        // //                                 };
        // //                                 otherfield_ary[0].Possiblevalue.push(obj);

        // //                             }
        // //                         }
        // //                         if (!otherfield_ary[0].value && otherfield_ary[0].Possiblevalue.length) {
        // //                             otherfield_ary[0].value = otherfield_ary[0].Possiblevalue[0].value;
        // //                         }
        // //                         //ary[0].value = 'Date';

        // //                     } else {
        // //                         $scope.isDateField = false;
        // //                         if (inputType.toLowerCase() == 'numericwithdecimal' || inputType.toLowerCase() == 'numeric' || inputType.toLowerCase() == 'number') {
        // //                             $scope.current_field_setting.Type = 'number';
        // //                             $scope.current_field_setting.inputType = 'number';
        // //                         } else if (inputType.toLowerCase() == 'phone-number') {
        // //                             $scope.current_field_setting.Type = 'phone-number';
        // //                             $scope.current_field_setting.inputType = 'phone-number';
        // //                         } else if (inputType.toLowerCase() == 'email') {
        // //                             $scope.current_field_setting.Type = 'email';
        // //                             $scope.current_field_setting.inputType = 'email';
        // //                         } else {
        // //                             $scope.current_field_setting.Type = 'text';
        // //                             $scope.current_field_setting.inputType = 'text';
        // //                         }
        // //                         // if (inputType.toLowerCase() == 'numericwithdecimal' || inputType.toLowerCase() == 'numeric' || inputType.toLowerCase() == 'number') {
        // //                         //     $scope.current_field_setting.Type = 'number';
        // //                         //     $scope.current_field_setting.inputType = 'number';
        // //                         // } else {
        // //                         //     $scope.current_field_setting.Type = 'text';
        // //                         //     $scope.current_field_setting.inputType = 'text';
        // //                         // }
        // //                         //$scope.current_field_setting.Settings = getSettings($scope.current_field_setting.inputType).Settings;
        // //                         var tempVar = getSettings($scope.current_field_setting.inputType).Settings;
        // //                         if (tempVar.length) {
        // //                             tempVar[0] = angular.copy($scope.current_field_setting.Settings[0]);
        // //                         }

        // //                         $scope.current_field_setting.Settings = angular.copy(tempVar);

        // //                         var ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'patterndropdown' });

        // //                         if (inputType.toLowerCase() == 'text') {
        // //                             ary[0].value = 'Text';
        // //                         } else {
        // //                             ary[0].value = inputType;
        // //                         }

        // //                     }
        // //                 }

        // //                 function getSettings(type) {
        // //                     var result = {};
        // //                     $.each(controleSetting, function(index, set) {
        // //                         if (set.Type.toLowerCase() == type.toLowerCase()) {
        // //                             result = set;
        // //                             return;
        // //                         }
        // //                     });
        // //                     return result;
        // //                 }


        // //                 $scope.getFieldSetting = function(settingname) {
        // //                     var result = {};
        // //                     var settings = $scope.current_field_setting.Settings;
        // //                     $.each(settings, function(index, set) {
        // //                         if (set.name == settingname) {
        // //                             result = set;
        // //                             return;
        // //                         }
        // //                     });
        // //                     if (!Object.keys(result).length) {
        // //                         //Continue to search settings in the checkbox zone
        // //                         $.each(settings[settings.length - 1].Options, function(index, set) {
        // //                             if (set.name == settingname) {
        // //                                 result = set;
        // //                                 return;
        // //                             }
        // //                         });
        // //                     }
        // //                     return result;

        // //                 }

        // //                 function checkIsDate() {
        // //                     if ($scope.current_field_setting.Type.toLowerCase() == 'date') {
        // //                         $scope.getDateType('date');
        // //                     }

        // //                 }
        // //                 checkIsDate();

        // //                 function applyCommonData() {
        // //                     var ary = $filter('filter')($scope.current_field_setting.Settings, { 'Type': 'commondropdown' });
        // //                     if (ary.length) {
        // //                         ary[0].Possiblevalue = angular.copy(commonfields);
        // //                     }
        // //                 }

        // //                 applyCommonData();

        // //                 $scope.hide = function(ev) {
        // //                     $mdDialog.hide();
        // //                 }

        // //                 $scope.cancel = function(ev) {
        // //                     // $scope.fileThumb = '';
        // //                     $mdDialog.cancel();
        // //                 }

        // //                 $scope.answer = function(ev) {
        // //                         $mdDialog.hide({ 'save': true, 'data': $scope.current_field_setting });
        // //                     }
        // //                     // $scope.itemType = itemType;
        // //                     // $scope.itemname = itemname;
        // //                     // $scope.id = id;
        // //             }]

        // //             // locals: { docid: id, folderid: 0 },
        // //             // templateUrl: rootUrl + '/components/settings/documents/dynamicWebForms/dynamicWebFormsSetting/dynamicWebFormsSetting.html',
        // //             // targetEvent: ev,
        // //             // parent: angular.element(document.body),
        // //             // clickOutsideToClose: false,
        // //             // escapeToClose: true,
        // //             // controller: ['$scope', '$window', function ($scope, $window ) {

        // //             // }]
        // //         })
        // //         .then(function(data) {
        // //             $scope.formFields[indx] = data.data;
        // //             // console.log('Uploading New Version of docId: ' + docid);
        // //         }, function() {
        // //             // console.log('You cancelled the document upload.');
        // //         })
        // // }

        // //$scope.dragElements = [{'name':"Single Text",'Type':"text",'Settings':[{'name':'Field Label','value':'Single Text','Type':'text'},{'name':'Validations','value':'','Type':'label'},{'name':'Min Length','value':'1','Type':'text'},{'name':'Max Length','value':'50','Type':'text'},{'name':'TabIndex','value':'','Type':'text'},{'name':'Mask','value':'','Type':'text'},{'name':'Pattern','value':'','Type':'text'},{'name':'Width','value':'1','Type':'dropdown','Possiblevalue':['1','2','3','4','5']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'SSN','value':false},{'name':'Display Stars','value':false},{'name':'Enable Google Maps','value':false}]}]},{'name':"Date",'Type':"date",'Settings':[{'name':'Field Label','value':'Field Label','Type':'text'},{'name':'TabIndex','value':'','Type':'text'},{'name':'Width','value':'1','Type':'dropdown','Possiblevalue':['1','2','3','4','5']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false}]}]},{'name':"Single Selection","Type":"dropdown",'Settings':[{'name':'Field Label','value':'Single Selection','Type':'text'},{'name':'TabIndex','value':'','Type':'text'},{'name':'Choice','Type':'dropdown_increment','Possiblevalue':[{'name':'Option 1','value':'Option1'},{'name':'Option 2','value':'Option2'}]},{'name':'Width','value':'1','Type':'dropdown','Possiblevalue':['1','2','3','4','5']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false}]}]},{'name':"TextArea","Type":"textarea",'Settings':[{'name':'Field Label','value':'','Type':'text'},{'name':'Validations','value':'','Type':'label'},{'name':'Min Length','value':'1','Type':'text'},{'name':'Max Length','value':'50','Type':'text'},{'name':'TabIndex','value':'','Type':'text'},{'name':'Width','value':'1','Type':'dropdown','Possiblevalue':['1','2','3','4','5']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Enable Google Maps','value':false}]}]},{'name':"Radio Text","Type":"radio",'Settings':[{'name':'Field Label','value':'Radio Text','Type':'text'},{'name':'TabIndex','value':'','Type':'text'},{'name':'Width','value':'1','Type':'dropdown','Possiblevalue':['1','2','3','4','5']},{'name':'Radio Choice','Type':'radio_increment','Possiblevalue':[{'name':'Radio1','value':'Radio1'},{'name':'Radio2','value':'Radio2'}]},{'name':'Radio Align Options','Type':'radioBoxZone','value':'Align Vertical','Options':[{'name':'Align Horizontal'},{'name':'Align Vertical'}]},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false}]}],'Options':[{'name':'Radio1','value':'Radio1'},{'name':'Radio2','value':'Radio2'}]},{'name':"Button","Type":"button","input":true,"inputType":"header",'Settings':[{'name':'Button Text','value':'Button','Type':'button'},{'name':'TabIndex','value':'','Type':'text'},{'name':'Width','value':'1','Type':'dropdown','Possiblevalue':['1','2','3','4','5']}]},{'name':"Checkbox Text","Type":"checkbox",'Settings':[{'name':'Field Label','value':'Checkbox Text','Type':'text'},{'name':'TabIndex','value':'','Type':'text'},{'name':'Width','value':'1','Type':'dropdown','Possiblevalue':['1','2','3','4','5']}],'Options':[{'name':'Checkbox1','value':'Checkbox1'},{'name':'Checkbox2','value':'Checkbox2'}]},{'name':"Divider","Type":"devider","input":true,"inputType":"devider",'Settings':[{'name':'Width','value':'1','Type':'devider','Possiblevalue':['1','2','3','4','5']}]},{'name':"Heading name","Type":"header","input":true,"inputType":"header",'Settings':[{'name':'Heading name','value':'Heading name','Type':'headervalue'},{'name':'Font Size','value':23,'Type':'font-size'},{'name':'Width','value':'1','Type':'heading','Possiblevalue':['1','2','3','4','5']}]}];


        // // var createNewField = function() {
        // //     return {
        // //         'id': ++guid,
        // //         'name': '',
        // //         'Settings': [],
        // //         'Active': true,
        // //         'ChangeFieldSetting': function(value, Settingname) {
        // //             switch (Settingname) {
        // //                 case 'Field Label':
        // //                 case 'Short Label':
        // //                 case 'Internal name':
        // //                     $scope.current_field.name = value;
        // //                     $scope.current_field.Settings[0].value = $scope.current_field.name;
        // //                     //$scope.current_field.Settings[1].value = $scope.current_field.name;
        // //                     //$scope.current_field.Settings[2].value = 'x' + $scope.current_field.name.replace(/\s/g, '_');
        // //                     break;
        // //                 default:
        // //                     break;
        // //             }
        // //         },
        // //         'GetFieldSetting': function(settingname) {
        // //             var result = {};
        // //             var settings = this.Settings;
        // //             $.each(settings, function(index, set) {
        // //                 if (set.name == settingname) {
        // //                     result = set;
        // //                     return;
        // //                 }
        // //             });
        // //             if (!Object.keys(result).length) {
        // //                 //Continue to search settings in the checkbox zone
        // //                 $.each(settings[settings.length - 1].Options, function(index, set) {
        // //                     if (set.name == settingname) {
        // //                         result = set;
        // //                         return;
        // //                     }
        // //                 });
        // //             }
        // //             return result;

        // //         }
        // //     };
        // // }

        // // $scope.changeFieldname = function(value) {
        // //     $scope.current_field.name = value;
        // //     $scope.current_field.Settings[0].value = $scope.current_field.name;
        // //     $scope.current_field.Settings[1].value = $scope.current_field.name;
        // //     $scope.current_field.Settings[2].value = 'x' + $scope.current_field.name.replace(/\s/g, '_');
        // // }

        // // $scope.removeElement = function(ev, idx) {
        // //     ev.stopPropagation();
        // //     if ($scope.formFields[idx].Active) {
        // //         $('#addFieldTab_lnk').tab('show');
        // //         $scope.current_field = {};

        // //     }
        // //     $scope.formFields.splice(idx, 1);
        // // };

        // // $scope.addElement = function(ele, idx) {
        // //     $scope.current_field.Active = false;

        // //     $scope.current_field = createNewField();
        // //     //Merge setting from template object
        // //     angular.merge($scope.current_field, ele);

        // //     if (typeof idx == 'undefined') {
        // //         $scope.formFields.push($scope.current_field);
        // //     } else {
        // //         $scope.current_field.page = $scope.formFields[idx].page;
        // //         $scope.formFields.splice(idx, 0, $scope.current_field);
        // //         $('#fieldSettingTab_lnk').tab('show');
        // //     }
        // //     vm.showSettingsDialog(ele, idx);

        // // };

        // // $scope.activeField = function(f) {
        // //     $scope.current_field.Active = false;
        // //     $scope.current_field = f;
        // //     f.Active = true;
        // //     $('#fieldSettingTab_lnk').tab('show');
        // // };

        // $scope.formbuilderSortableOpts = {
        //     'ui-floating': true
        // };

        // vm.hide = function(ev) {
        //     $mdDialog.hide();
        // }

        // vm.cancel = function(ev) {
        //     // $scope.fileThumb = '';
        //     $mdDialog.cancel();
        // }

        // vm.answer = function(ev, answer) {
        //     $mdDialog.hide(answer);
        // }

        var vm = this;
        vm.maxNumOfRecordsSubWebForms = $rootScope.maxNumOfRecordsSubWebForms;
        $scope.toggleLayout = true;
        vm.typecommonfields = 1;
        var typeOfPage = 'newHirePage';

        var dragElements = angular.copy(DynamicWebFormService.dragFields);

        if ($stateParams.id) {
            vm.webformId = $stateParams.id;
            switch (vm.webformId) {
                case "4":
                case "5":
                case "6":
                case "27":
                case "29":
                case "30":
                case "31":
                    vm.typecommonfields = 2;
                    $scope.dragElements = $filter('filter')(dragElements, { 'commonDetailPage': true });
                    break;
                case "1":
                    vm.typecommonfields = 1;
                    $scope.dragElements = $filter('filter')(dragElements, { 'newHirePage': true });
                    break;
                case "2":
                    vm.typecommonfields = 1;
                    $scope.dragElements = $filter('filter')(dragElements, { 'commonDetailPage': true });
                    break;
                default:
                    vm.typecommonfields = 3;
                    $scope.dragElements = $filter('filter')(dragElements, { 'commonDetailPage': true });
            }

        } else {
            vm.typecommonfields = 3;
            $scope.dragElements = $filter('filter')(dragElements, { 'commonDetailPage': true });
        }

        function init() {
            if (vm.webformId) {
                getDesignWebformComponents(vm.webformId);
            }
        }
        init();

        function getDesignWebformComponents() {
            DesignWebformsService.getWebformDetails(vm.webformId).then(
                function (response) {
                    if (response.data) {
                        vm.webformDetails = angular.copy(response.data);
                        if (vm.webformDetails.parentId) {
                            vm.webformDetails.masterJsonData.components = DynamicWebFormService.convertToWebFormJson(response.data.masterJsonData.components);
                        }
                        if (response.data.jsonData.components.length > 0 && !vm.webformDetails.parentId) {
                            vm.webformDetails.jsonData.components = DynamicWebFormService.convertToWebFormJson(response.data.jsonData.components);
                        }
                        vm.webformDetails.noOfRecords = vm.webformDetails.noOfRecords == 0 ? null : vm.webformDetails.noOfRecords;
                        vm.masterNoOfRecords = vm.webformDetails.noOfRecords ? vm.webformDetails.noOfRecords : null;

                        var controlNameMaster;
                        var controlNameMasterArray = [];
                        for (var i = 0; i < vm.webformDetails.jsonData.components.length; i++) {
                            for (var j = 0; j < vm.webformDetails.jsonData.components[i].length; j++) {
                                if (vm.webformDetails.jsonData.components[i][j].isSaved) {
                                    controlNameMasterArray = vm.webformDetails.jsonData.components[i][j].name.split('_');
                                    controlNameMaster = controlNameMasterArray[0];
                                    for (var k = 0; k < vm.webformDetails.masterJsonData.components.length; k++) {
                                        if (controlNameMaster == vm.webformDetails.masterJsonData.components[k].name) {
                                            vm.webformDetails.masterJsonData.components[k].isSaved = true;
                                        }
                                    }
                                }
                            }
                        }

                    }
                    else {
                        ToastrService.error('An error occured while retrieving the Webform Components');
                    }
                },
                function (err) {

                }
            )
        }

        vm.saveDesignWebformComponents = function (isFormValid) {
            if (!isFormValid) {
                ToastrService.error('Please fill all the mandatory fields.');
                return;
            }
            if (!$scope.finalFormFields.length) {
                ToastrService.error('Please save the webform with atleast one control.');
                return;
            }
            if (!vm.webformId) {
                vm.webformDetails.isNewHireForm = false;
                vm.webformDetails.isCommForm = false;
                vm.webformDetails.isRestored = true;
                vm.webformDetails.isCustWebForm = true;
            }
            var finalObj = {
                'components': angular.copy($scope.finalFormFields)
            }
            vm.webformDetails.jsonData = finalObj;
            if (vm.webformDetails.parentId) {
                if (!vm.webformDetails.noOfRecords) {
                    ToastrService.error('Please enter number of ' + vm.webformDetails.webFormName + ' between 1-10 ');
                    return;
                }
                vm.webformDetails.jsonData = { 'components': $scope.convertMasterToInstances(angular.copy(finalObj)) };
                vm.webformDetails.masterJsonData = angular.copy(finalObj);
            }
            if ($scope.deletedControls) {
                if (vm.webformDetails.parentId) {
                    var instanceDeletedControls = [];
                    for (var d = 0; d < $scope.deletedControls.length; d++) {
                        for (var n = 0; n < vm.webformDetails.noOfRecords; n++) {
                            instanceDeletedControls.push({ controls: $scope.deletedControls[d].controls + '_' + (n + 1) });
                        }
                    }
                    vm.webformDetails.deleteControls = instanceDeletedControls;
                }
                else {
                    vm.webformDetails.deleteControls = $scope.deletedControls;
                }
            }
            if(vm.subWebformDeleteFields && vm.subWebformDeleteFields.length){
                var instanceDeletedControls = [];
                for (var a = 0; a < vm.subWebformDeleteFields.length; a++) {
                    instanceDeletedControls.push({ controls: vm.subWebformDeleteFields[a]});
                }
                vm.webformDetails.deleteControls = instanceDeletedControls;
            }
            // return false;
            DesignWebformsService.saveWebformDetails(vm.webformDetails).then(
                function (response) {
                    if (response.data.Success) {
                        ToastrService.success(response.data.message);
                        if (vm.webformDetails.parentId || vm.webformDetails.isCommForm) {
                            vm.postFieldMapping();
                        }
                        else {
                            $state.go('Settings.DesignWebforms');
                        }
                    }
                    else {
                        ToastrService.error('An error occured while saving the Webform Components');
                    }
                },
                function (err) {

                }
            )
        }

        $scope.convertMasterToInstances = function (masterJson) {
            var instancearray = [];
            for (var i = 0; i < vm.webformDetails.noOfRecords; i++) {
                instancearray[i] = angular.copy(masterJson.components);
                for (var j = 0; j < instancearray[i].length; j++) {
                    instancearray[i][j].labelName = instancearray[i][j].labelName + '_' + (i + 1);
                    instancearray[i][j].name = instancearray[i][j].name + '_' + (i + 1);
                }
            }
            return instancearray;
        }

        $scope.changeAliasName = function () {
            var matches = vm.webformDetails.webFormName.match(/\b(\w)/g); // ['J','S','O','N']
            if (matches.length <= 10) {
                vm.webformDetails.aliasName = matches.join('');
            }
        }


        vm.postFieldMapping = function () {
            var objMapping = {};
            var webFormMapping = [];
            for (var i = 0; i < $scope.finalFormFields.length; i++) {
                var ary = $scope.finalFormFields[i];
                if (ary.mappingId && ary.mappingId != '' && ary.mappingId != 'None') {
                    webFormMapping.push({
                        'webFieldName': $scope.finalFormFields[i].name,
                        'newHireFieldId': ary.mappingId
                        // 'webFormId': getWebFormId(ary.mappingId),
                        // 'page': $scope.finalFormFields[i].page
                    });
                }
            }
            if (webFormMapping.length == 0) {
                $state.go('Settings.DesignWebforms');
            }
            objMapping.webFormId = vm.webformDetails.webFormId;
            objMapping.webFormMapping = webFormMapping;
            // return;
            DesignWebformsService.saveWebformMapping(objMapping).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        $state.go('Settings.DesignWebforms');
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG216);
                }
            )
        }

        $scope.validateNoOfRecords = function () {
            vm.subWebformDeleteFields = [];
            if (vm.masterNoOfRecords != vm.webformDetails.noOfRecords && vm.masterNoOfRecords > vm.webformDetails.noOfRecords && vm.webformId) {
                console.log(vm.webformDetails.masterJsonData.components);
                for(var i=0;i < vm.webformDetails.masterJsonData.components.length;i++){
                    if( vm.webformDetails.masterJsonData.components[i].isSaved == true){
                        for(var j = vm.masterNoOfRecords ; j > vm.webformDetails.noOfRecords; j--){
                            vm.subWebformDeleteFields.push(vm.webformDetails.masterJsonData.components[i].name + '_' + j);
                        }
                    }
                }
                var objSubwebformsInstancesDelete = {};
                objSubwebformsInstancesDelete.webFormId = vm.webformId;
                objSubwebformsInstancesDelete.subWebformDeleteFields = vm.subWebformDeleteFields;
                DesignWebformsService.subWebformDeleteFields(objSubwebformsInstancesDelete).then(
                    function (response) {
                        if (response.data.Success) {
                            
                        }
                        else {
                            ToastrService.error(response.data.message);
                            vm.webformDetails.noOfRecords = vm.masterNoOfRecords;
                        }
                    },
                    function (err) {
                        ToastrService.error('An error occured while retrieving the validation to decrease webforms count.');
                    }
                )
            }
        }


    }
})();