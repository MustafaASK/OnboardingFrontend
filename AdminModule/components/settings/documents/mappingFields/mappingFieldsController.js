(function () {
    'use strict';
    hrAdminApp.controller('MappingFieldsController', mappingFieldsController);
    mappingFieldsController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', '$sce', 'ToastrService', 'DocLibraryService', 'PDFViewerService', '$location', '$anchorScroll', '$filter','DynamicWebFormService'];
    function mappingFieldsController($rootScope, $scope, $state, $stateParams, $timeout, $sce, ToastrService, DocLibraryService, pdf, $location, $anchorScroll, $filter, DynamicWebFormService) {

        var vm = this;
        $scope.pageNum = 1;
        $scope.loadPaginationResults = false;
        var canvas = null, context = null;
        vm.mapping = [];
        $scope.searchTerm = '';
        if(!$rootScope.UserInfo.isAdmin){
            $scope.$parent.currentNavItem = 0;
        } else {
            $scope.$parent.currentNavItem = 2;
        }

        $scope.viewer = pdf.Instance("viewer");

        $scope.doc = $stateParams.id + '.pdf';
        // select the document from drop-down
        $scope.docForMapping = $stateParams.id;
        $scope.source = $stateParams.source;
        if($scope.source == 'Documents') $scope.source = 'Settings.Documents';
        $scope.sourceid = $stateParams.sourceid;
        // console.log('source: ', $scope.source);
        // console.log('sourceid: ', $scope.sourceid);

        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }

        $scope.$watch('docForMapping', function () {
            $scope.doc = $scope.docForMapping + '.pdf';
            $scope.file = $scope.trustSrc($rootScope.DocsURL + $scope.doc);
            get_pdfMappingDetails($scope.docForMapping);
        });

        /* Start code for webform json */
        $scope.formFields = [];
        var controleSetting = [{'name':'Single Text','Type':'text','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Field Type','value':'Text','Type':'patterndropdown','width':50,'Possiblevalue':['Text','Numeric','NumericwithDecimal','AlphaNumeric','Phone-Number','Email','Date']},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'Min Length','value':'1','Type':'number','width':50},{'name':'Max Length','value':'50','Type':'number','width':50,'length':50},{'name':'TabIndex','value':'','Type':'number','width':50},{'name':'Width','value':'100','Type':'widthdropdown','width':50,'Possiblevalue':['100','50','33','25','20']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false},{'name':'Mask Data','value':false},{'name':'Enable Google Maps','value':false}],'width':100}]},{'name':'Email','Type':'email','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Field Type','value':'Text','Type':'patterndropdown','width':50,'Possiblevalue':['Text','Numeric','NumericwithDecimal','AlphaNumeric','Phone-Number','Email','Date']},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'Min Length','value':'1','Type':'number','width':50},{'name':'Max Length','value':'50','Type':'number','width':50,'length':50},{'name':'TabIndex','value':'','Type':'number','width':50},{'name':'Width','value':'100','Type':'widthdropdown','width':50,'Possiblevalue':['100','50','33','25','20']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false}],'width':100}]},{'name':'Single Text','Type':'phone-number','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Field Type','value':'Phone-Number','Type':'patterndropdown','width':50,'Possiblevalue':['Text','Numeric','NumericwithDecimal','AlphaNumeric','Phone-Number','Email','Date']},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'Min Length','value':'1','Type':'number','width':50},{'name':'Max Length','value':'50','Type':'number','width':50,'length':50},{'name':'TabIndex','value':'','Type':'number','width':50},{'name':'Width','value':'100','Type':'widthdropdown','width':50,'Possiblevalue':['100','50','33','25','20']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false}],'width':100}]},{'name':'Single Text','Type':'number','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Field Type','value':'Numeric','Type':'patterndropdown','width':50,'Possiblevalue':['Text','Numeric','NumericwithDecimal','AlphaNumeric','Phone-Number','Email','Date']},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'Min','value':'1','Type':'number','width':50},{'name':'Max','value':'50','Type':'number','width':50},{'name':'TabIndex','value':'','Type':'number','width':50},{'name':'Width','value':'100','Type':'widthdropdown','width':50,'Possiblevalue':['100','50','33','25','20']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false},{'name':'Mask Data','value':false}],'width':100}]},{'name':'Date','Type':'date','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Field Type','value':'Date','Type':'patterndropdown','width':50,'Possiblevalue':['Text','Numeric','NumericwithDecimal','AlphaNumeric','Phone-Number','Email','Date']},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'Min Length','value':'1','Type':'number','disabled':true,'width':50},{'name':'Max Length','value':'50','Type':'number','disabled':true,'width':50},{'name':'TabIndex','value':'','Type':'number','width':50},{'name':'Width','value':'100','Type':'widthdropdown','Possiblevalue':['100','50','33','25','20'],'width':50},{'name':'Dependency Validation','value':'','Type':'dependency','width':100,'isDependent':{'name':'','value':true},'dependencyObjs':[{'name':'Conditions','type':'conditions','value':'<','Possiblevalue':[{'name':'Less than(<)','value':'<',},{'name':'Less than or equals(<=)','value':'<=',},{'name':'Greater than(>)','value':'>',},{'name':'Greater than or equals(>=)','value':'>=',},{'name':'Equals(==)','value':'==',}]},{'name':'Other Fields','type':'otherfield','value':'','Possiblevalue':[]}]},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false},],'width':100}]},{'name':'Single Selection','Type':'dropdown','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'TabIndex','value':'','Type':'text','width':50},{'name':'Choice','Type':'dropdown_increment','Possiblevalue':[{'name':'Option 1','value':'Option1'},{'name':'Option 2','value':'Option2'}],'width':100},{'name':'Width','value':'100','Type':'widthdropdown','Possiblevalue':['100','50','33','25','20'],'width':50},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false}],'width':100}]},{'name':'TextArea','Type':'textarea','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'Min Length','value':'1','Type':'number','width':50},{'name':'Max Length','value':'200','Type':'number','width':50,'length':2000},{'name':'TabIndex','value':'','Type':'number','width':50},{'name':'Width','value':'100','Type':'widthdropdown','Possiblevalue':['100','50','33','25','20'],'width':50},{'name':'Field Type','value':'String','Type':'dropdown','width':50,'Possiblevalue':['String','Numeric','NumericwithDecimal','AlphaNumeric','Phone-Number','Email']},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false},{'name':'Mask Data','value':false},{'name':'Enable Google Maps','value':false}],'width':100}]},{'name':'Radio Text','Type':'radio','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'TabIndex','value':'','Type':'text','width':50},{'name':'Width','value':'100','Type':'widthdropdown','Possiblevalue':['100','50','33','25','20'],'width':50},{'name':'Radio Choice','Type':'radio_increment','Possiblevalue':[{'name':'Radio1','value':'Radio1'},{'name':'Radio2','value':'Radio2'}],'width':100},{'name':'Radio Align Options','Type':'radioBoxZone','value':'Align Vertical','Options':[{'name':'Align Horizontal'},{'name':'Align Vertical'}],'width':100},{'name':'General Validations','Type':'checkBoxZone','Options':[{'name':'Required','value':false},{'name':'Readonly','value':false},],'width':100}],'Options':[{'name':'Radio1','value':'Radio1'},{'name':'Radio2','value':'Radio2'}]},{'name':'Button','Type':'button','input':true,'inputType':'header','Settings':[{'name':'Button Text','value':'','Type':'button','width':100},{'name':'Validations','value':'','Type':'label'},{'name':'TabIndex','value':'','Type':'text','width':50},{'name':'Width','value':'100','Type':'widthdropdown','Possiblevalue':['100','50','33','25','20'],'width':50}]},{'name':'Checkbox Text','Type':'checkbox','value':'','mappingId':0,'Settings':[{'name':'Label Name','value':'','Type':'text','width':50},{'name':'Assign Common Field','value':'','Type':'label'},{'name':'Assign Common Field','value':'','Type':'commondropdown','width':50,'Possiblevalue':[]},{'name':'Validations','value':'','Type':'label'},{'name':'TabIndex','value':'','Type':'text','width':50},{'name':'Width','value':'100','Type':'widthdropdown','Possiblevalue':['100','50','33','25','20'],'width':50}],'Options':[{'name':'Checkbox1','value':'Checkbox1'},{'name':'Checkbox2','value':'Checkbox2'}]},{'name':'Divider','Type':'devider','input':true,'inputType':'devider','Settings':[{'name':'Width','value':'1','Type':'devider','Possiblevalue':['100','50','33','25','20'],'width':100}]},{'name':'Empty Space','Type':'emptyspace','input':true,'inputType':'emptyspace','Settings':[{'name':'Width','value':'1','Type':'emptyspace','Possiblevalue':['100','50','33','25','20'],'width':100}]},{'name':'Heading name','Type':'header','input':true,'inputType':'header','Settings':[{'name':'Heading name','value':'Heading name','Type':'headervalue','width':100},{'name':'Font Size','value':23,'Type':'font-size','width':50},{'name':'Font-Family','value':'Segoe UI','Type':'font-family','Possiblevalue':['Arial','Comic Sans MS','Courier New','Georgia','Lucida Sans Unicode','Tahoma','Times New Roman','Trebuchet MS','Segoe UI','Verdana'],'width':50},{'name':'Width','value':'100','Type':'heading','Possiblevalue':['100','50','33','25','20'],'width':50}]}];;

        var docid = $stateParams.id;
        function getJsonDocumentLibrary() {
            $scope.loading = true;
            DocLibraryService.getJsonDocumentLibrary(docid).then(
                function(response) {
                    $scope.loading = false;
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        var tempComponents = response.data.components ? response.data.components : [];
                        //convertToWebFormJson(tempComponents);
                        $scope.formFields = DynamicWebFormService.convertToWebFormJson(tempComponents);
                    }
                },
                function(err) {
                    $scope.loading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG201);
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
                            makingObj.page = obj.page;
                            makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.input = true;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('textarea'));
                            makingObj.Settings[0].value = obj.name;
                            $scope.formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'text':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'text';
                            makingObj.inputType = 'text';
                            makingObj.page = obj.page;
                            makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.input = true;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('text'));
                            makingObj.Settings[0].value = obj.name;
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
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.input = true;
                            console.log(getSettingObj('date'));
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('date'));
                            makingObj.Settings[0].value = obj.name;
                            $scope.formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'combo box':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'dropdown';
                            makingObj.inputType = 'Combo box';
                            makingObj.page = obj.page;
                            makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.input = true;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('dropdown'));
                            makingObj.values = obj.values;
                            updateObj(makingObj, 'dropdown_increment', obj);
                            makingObj.Settings[0].value = obj.name;
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
                            makingObj.page = obj.page;
                            makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.input = true;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('checkbox'));
                            makingObj.Options = obj.values;
                            makingObj.values = obj.values;
                            makingObj.Settings[0].value = obj.name;
                            $scope.formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'radio button':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'radio';
                            makingObj.inputType = 'Radio button';
                            makingObj.page = obj.page;
                            makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.input = true;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('radio'));
                            updateObj(makingObj, 'radio_increment', obj);
                            //makingObj.Options = obj.data.values;
                            makingObj.data = {
                                values: obj.data.values
                            };
                            makingObj.Settings[0].value = obj.name;
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
                        default:
                            // code block


                    }
                }
            }
        }

        function getSettingObj(type) {
            var ary = $filter('filter')(controleSetting, { 'Type': type });
            return ary[0].Settings;
        }

        

        function updateObj(makingObj, type, obj) {
            $.each(makingObj.Settings, function(index, set) {
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
        
        /* End code for webform json */

        function getPDFBase64Data(docid) {
            $scope.loading = true;
            $timeout(function () {
                DocLibraryService.getPdfData(docid).then(
                    function (response) {
                        if (response.data.Error) {
                            ToastrService.error(response.data.message);
                        } else {
                            // console.log(response.data.Base64);
                            vm.pdfData = response.data.Base64;
                            $scope.pdfData = atob(vm.pdfData);
                        }
                    },
                    function (err) {
                        ToastrService.error($rootScope.errorMsgs.MSG205);
                    }
                ).finally(function () {
                    $scope.loading = false;
                });
            });

        }

        // converts base64 data URI to binary
        function convertDataURIToBinary(dataURI) {
            var BASE64_MARKER = ';base64,';
            var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
            var base64 = dataURI.substring(base64Index);
            var raw = atob(base64);
            var rawLength = raw.length;
            var array = new Uint8Array(new ArrayBuffer(rawLength));

            for (var i = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
            }
            return array;
        }

        function loadPages() {
            // console.log('Current page is : ' + vm.paging.current);
            // TODO : Load current page Data here
            vm.currentPage = $scope.currentPage;
        }

        vm.first = "<<", vm.last = ">>";

        $scope.goFirst = function () {
            $scope.viewer.gotoPage(1);
            $scope.scrollTo("1");
        };

        $scope.goLast = function () {
            $scope.viewer.gotoPage($scope.totalPages);
            $scope.scrollTo($scope.totalPages.toString());
        };

        $scope.nextPage = function (currentPage) {
            $scope.viewer.nextPage();
            currentPage = currentPage + 1;
            $scope.scrollTo(currentPage.toString());

        };

        $scope.prevPage = function (currentPage) {
            $scope.viewer.prevPage();
            currentPage = currentPage - 1;
            $scope.scrollTo(currentPage.toString());
        };

        $scope.pageLoaded = function (curPage, totalPages) {
            $scope.currentPage = curPage;
            $scope.totalPages = totalPages;
            $scope.loadPaginationResults = true;
        };

        // vm.docsForMapping = DocLibraryService.getDocList();

        // get document list to populate the dropdown
        function getDocLibraryList() {
            $scope.loading = true;
            DocLibraryService.getDocLibraryList().then(
                function (response) {
                    $scope.loading = false;
                    if (response.data.Error) {
                        ToastrService.error(response.data.message)
                    } else {
                        vm.docsForMapping = response.data.documents;
                        // vm.docsForMapping = $filter('filter')(vm.docsForMapping, { 'settings': settings.length });
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG201);
                }
            )
        }
        // get the documents using the service
        getDocLibraryList();


        $scope.myFilter = function (item) {
            return item.settings && item.settings.length > 1 && item.settings.indexOf(14) == -1 && item.settings.indexOf(15) == -1 ;
        };

        function get_docname(docid) {
            for (var i = 0; i < vm.docsForMapping.length; i++) {
                if (vm.docsForMapping[i].docid == docid) {
                    return vm.docsForMapping[i].docname;
                }
            }
        }

        function get_pdfMappingDetails(docid) {
            $scope.loading = true;

            DocLibraryService.getMappingDetails(docid).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                        return;
                    } else {
                        vm.docFields = response.data;
                        if (!vm.docFields) vm.docFields = [];
                        for (var i = 0; i < vm.docFields.length; i++) {
                            vm.docFields[i].commonFieldId = null;
                        }

                        // console.log(vm.docFields);    
                        if (vm.docFields.length > 0) {
                            getDocFieldMappingData(docid);
                        }
                        // else {
                        //     ToastrService.message("No fields identified in this document to map.");
                        // }
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG249);
                }
            ).finally(function () {
                $scope.loading = false;
                // $scope.loadPaginationResults = true;
            });
        }
        // get_pdfMappingDetails('3086');

        function getJsonCommonFields() {
            DocLibraryService.getJsonCommonFields().then(
                function(response) {
                    vm.commonFields = response.data;
                    DocLibraryService.jsonCommonDetailsList = angular.copy(response.data);
                    // console.log(vm.commonFields);
                },
                function(err) {
                    ToastrService.error($rootScope.errorMsgs.MSG250);
                }
            )
        }
        if (DocLibraryService.jsonCommonDetailsList && DocLibraryService.jsonCommonDetailsList.length) {
            vm.commonFields = angular.copy(DocLibraryService.jsonCommonDetailsList);
        } else {
            getJsonCommonFields();
        }

        // function getCommonFields() {
        //     DocLibraryService.getCommonFields().then(
        //         function (response) {
        //             vm.commonFields = response.data;
        //             // console.log(vm.commonFields);
        //         },
        //         function (err) {
        //             ToastrService.error($rootScope.errorMsgs.MSG250);
        //         }
        //     )
        // }
        // getCommonFields();

        function getDocFieldMappingData(docid) {
            $scope.loading = true;

            DocLibraryService.getDocMappingDetails(docid).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                        // $state.go('Documents', {}, {reload: 'Documents'});
                    } else {
                        vm.docMappingData = response.data.DocMapping;
                        // console.log('docMapping: ', vm.docMappingData);
                        $scope.docForMapping = vm.docMappingData.documentId;
                        vm.docFieldMapping = vm.docMappingData.Mapping;
                        // apply document field mapping
                        if (vm.docFieldMapping.length > 0) {
                            $scope.updateDocFieldMapping = true;
                            for (var i = 0; i < vm.docFieldMapping.length; i++) {
                                for (var j = 0; vm.docFields.length; j++) {
                                    if (vm.docFields[j].name == vm.docFieldMapping[i].docFieldName &&
                                        vm.docFieldMapping[i].commonFieldId) {
                                        vm.docFields[j].commonFieldId = vm.docFieldMapping[i].commonFieldId;
                                        break;
                                    }
                                }
                            }
                        } else {
                            $scope.updateDocFieldMapping = false;
                        }
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG251);
                }
            ).finally(function () {
                $scope.loading = false;

            });
        }

        function drawRect() {
            // if (context) {
            //     context.clearRect(0, 0, Number(vm.posx) + Number(vm.fillLength), Number(vm.posy) + 20);
            //     console.log('canvas cleaned!');
            // }
            var pdfDiv = document.getElementById('pdfviewerDiv');
            pdfDiv.scrollTop = 0;
            canvas = document.getElementById('pdfcanvas');
            context = canvas.getContext('2d');
            var canvasHt = canvas.height;

            context.fillStyle = '#d75a5a';
            // Scroll to the location to bring the field into visibility
            if ((canvasHt - Number(vm.posy)) > 400) pdfDiv.scrollTop = 400;
            context.fillRect(Number(vm.posx), canvasHt - Number(vm.posy), Number(vm.fillLength), Number(vm.fillHeight));
        }

        vm.gotoFieldPosition = function (dfieldname) {
            for (var i = 0; i < vm.docFields.length; i++) {
                if (vm.docFields[i].name == dfieldname) {
                    // clearRect is removing the pdf content as well; which is not intended!
                    // hence loading page everytime.
                    $scope.pageNum = Number(vm.docFields[i].page);
                    $scope.viewer.gotoPage($scope.pageNum);
                    // set the starting point to draw the rectangle
                    vm.posx = vm.docFields[i].left;
                    vm.posy = vm.docFields[i].top;

                    vm.fillLength = vm.docFields[i].width;
                    vm.fillHeight = vm.docFields[i].height;
                    // console.log("Document Field: ", dfieldname);
                    // console.log("Left: ", vm.posx);
                    // console.log("Top: ", vm.posy);



                    // wait until desired page is displayed
                    setTimeout(drawRect, 1000);
                    break;

                }
            }
        }

        function changeJsonForAPI(docFieldName, commonFieldId) {
            var ary = $filter('filter')($scope.formFields, { 'name': docFieldName });
            if(ary && ary.length){
                var ary1 = $filter('filter')(ary[0].Settings, { 'Type': 'commondropdown' });
                if(ary1 && ary1.length){
                    ary1[0].value = commonFieldId;
                }
            }
        }

        vm.updateJsonDocumentLibrary = function() {
            // submit new / modified folder details.
            //var js = changeJsonForAPI();
            var finalObj = {
                    'components': angular.copy($scope.formFields)
                }
                //return false;
            console.log('form data');
            console.log($scope.formFields);
            DocLibraryService.updateJsonDocumentLibrary(finalObj, docid).then(
                function(response) {
                    $scope.loading = false;
                    if (response.data.Error) {
                    }
                    if (!response.data.Error) {
                    }
                },
                function(err) {
                    ToastrService.error($rootScope.errorMsgs.MSG218);
                }
            )
        }

        vm.postFieldMapping = function () {
            var objMapping = {};
            var docMapping = [];

            if (vm.docFields.length == 0) {
                ToastrService.message("This document has no document fields to map to common fields and save!");
                return;
            }

            for (var i = 0; i < vm.docFields.length; i++) {
                if (vm.docFields[i].commonFieldId &&
                    vm.docFields[i].commonFieldId != 'None'){
                    docMapping.push({
                        'docFieldName': vm.docFields[i].name,
                        'commonFieldId': vm.docFields[i].commonFieldId,
                        'page': vm.docFields[i].page
                    });
                }
                //changeJsonForAPI(vm.docFields[i].name, vm.docFields[i].commonFieldId);
                var ary = $filter('filter')($scope.formFields, { 'name': vm.docFields[i].name }, true);
                if(ary && ary.length){
                    // var ary1 = $filter('filter')(ary[0].Settings, { 'Type': 'commondropdown' });
                    // if(ary1 && ary1.length){
                    //     ary1[0].value = vm.docFields[i].commonFieldId;
                    // }
                    ary[0].mappingId = vm.docFields[i].commonFieldId ? vm.docFields[i].commonFieldId : 0;
                }

            }

            if (docMapping.length == 0) {
                ToastrService.error($rootScope.errorMsgs.MSG252);
                return;
            }
            // console.log(docMapping);

            objMapping.documentId = $scope.docForMapping;
            objMapping.documentMapping = docMapping;
            // console.log(objMapping);
            vm.updateJsonDocumentLibrary();
            DocLibraryService.postMappingDetails(objMapping, $scope.updateDocFieldMapping).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        ToastrService.success(response.data.message);
                        if ($scope.sourceid != 0) {
                            $state.go($scope.source, { id: $scope.sourceid }, { reload: $scope.source });
                        } else {
                            $state.go($scope.source, {}, { reload: $scope.source });
                        }
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG216);
                }
            )
        }

        // $scope.$watch($scope.currentPage, function () {
        //     // $scope.scrollTo(vm.currentPage);
        // });

        $scope.scrollTo = function (scrollLocation) {
            $location.hash(scrollLocation);
            $anchorScroll();
        }

        vm.cancelFieldMapping = function () {
            // console.log($scope.source);
            // console.log($scope.sourceid);
            if ($scope.sourceid != 0) {
                $state.go($scope.source, { id: $scope.sourceid }, { reload: $scope.source });
            } else {
                $state.go($scope.source, {}, { reload: $scope.source });
            }
        }

        // Browser detecction
        $scope.browserType = function () {
            if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
                vm.browserUsed = 'Opera';
                vm.docFieldsBoxHeight = 'auto';
                vm.commonFieldsDropDownMargin = "0 -10px 0 5px";
            }
            else if (navigator.userAgent.indexOf("Chrome") != -1) {
                vm.browserUsed = 'Chrome';
                vm.docFieldsBoxHeight = 'auto';
                vm.commonFieldsDropDownMargin = "0 -10px 0 5px";
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                vm.browserUsed = 'Safari';
                vm.docFieldsBoxHeight = 'auto';
                vm.commonFieldsDropDownMargin = "0 -10px 0 5px";
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                vm.browserUsed = 'Firefox';
                vm.docFieldsBoxHeight = '275px';
                vm.commonFieldsDropDownMargin = "0 -10px 0 5px";
            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                vm.browserUsed = 'IE';
                vm.docFieldsBoxHeight = 'auto';
                vm.commonFieldsDropDownMargin = "0 0 0 5px";
            }
            else {
                vm.browserUsed = 'Unknown';
                vm.docFieldsBoxHeight = 'auto';
                vm.commonFieldsDropDownMargin = "0 -10px 0 5px";
            }
        }
        $scope.browserType();
        vm.docFieldsTableMarginTop = (vm.browserUsed == 'Firefox' ? '-10px' : '0');
    }
})();