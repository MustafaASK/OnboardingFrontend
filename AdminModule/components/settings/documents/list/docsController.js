(function () {
    'use strict';
    hrAdminApp.controller('DocumentsController', documentsController);
    documentsController.$inject = ['$rootScope', '$scope', '$state', '$filter', '$stateParams', '$mdDialog', '$timeout', 'ToastrService', 'DocLibraryService', '$window'];
    function documentsController($rootScope, $scope, $state, $filter, $stateParams, $mdDialog, $timeout, ToastrService, DocLibraryService, $window) {

        var vm = this;
        var rootUrl = $rootScope.rootUrl;
        $scope.submitted = false;
        var controleSetting = [{ 'name': 'Single Text', 'Type': 'text', 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Field Type', 'value': 'Text', 'Type': 'patterndropdown', 'width': 50, 'Possiblevalue': ['Text', 'Numeric', 'NumericwithDecimal', 'AlphaNumeric', 'Phone-Number', 'Email', 'Date'] }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'Min Length', 'value': '1', 'Type': 'number', 'width': 50 }, { 'name': 'Max Length', 'value': '50', 'Type': 'number', 'width': 50, 'length': 200 }, { 'name': 'TabIndex', 'value': '', 'Type': 'number', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'width': 50, 'Possiblevalue': ['100', '50', '33', '25', '20'] }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false }, { 'name': 'Mask Data', 'value': false }, { 'name': 'Enable Google Maps', 'value': false }], 'width': 100 }] }, { 'name': 'Email', 'Type': 'email', 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Field Type', 'value': 'Text', 'Type': 'patterndropdown', 'width': 50, 'Possiblevalue': ['Text', 'Numeric', 'NumericwithDecimal', 'AlphaNumeric', 'Phone-Number', 'Email', 'Date'] }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'Min Length', 'value': '1', 'Type': 'number', 'width': 50 }, { 'name': 'Max Length', 'value': '50', 'Type': 'number', 'width': 50, 'length': 50 }, { 'name': 'TabIndex', 'value': '', 'Type': 'number', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'width': 50, 'Possiblevalue': ['100', '50', '33', '25', '20'] }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false }], 'width': 100 }] }, { 'name': 'Single Text', 'Type': 'phone-number', 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Field Type', 'value': 'Phone-Number', 'Type': 'patterndropdown', 'width': 50, 'Possiblevalue': ['Text', 'Numeric', 'NumericwithDecimal', 'AlphaNumeric', 'Phone-Number', 'Email', 'Date'] }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'Min Length', 'value': '1', 'Type': 'number', 'width': 50 }, { 'name': 'Max Length', 'value': '50', 'Type': 'number', 'width': 50, 'length': 50 }, { 'name': 'TabIndex', 'value': '', 'Type': 'number', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'width': 50, 'Possiblevalue': ['100', '50', '33', '25', '20'] }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false }], 'width': 100 }] }, { 'name': 'Single Text', 'Type': 'number', 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Field Type', 'value': 'Numeric', 'Type': 'patterndropdown', 'width': 50, 'Possiblevalue': ['Text', 'Numeric', 'NumericwithDecimal', 'AlphaNumeric', 'Phone-Number', 'Email', 'Date'] }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'Min', 'value': '1', 'Type': 'number', 'width': 50 }, { 'name': 'Max', 'value': '50', 'Type': 'number', 'width': 50 }, { 'name': 'TabIndex', 'value': '', 'Type': 'number', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'width': 50, 'Possiblevalue': ['100', '50', '33', '25', '20'] }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false }, { 'name': 'Mask Data', 'value': false }], 'width': 100 }] }, { 'name': 'Date', 'Type': 'date', 'value': null, 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Field Type', 'value': 'Date', 'Type': 'patterndropdown', 'width': 50, 'Possiblevalue': ['Text', 'Numeric', 'NumericwithDecimal', 'AlphaNumeric', 'Phone-Number', 'Email', 'Date'] }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'Min Length', 'value': '1', 'Type': 'number', 'disabled': true, 'width': 50 }, { 'name': 'Max Length', 'value': '50', 'Type': 'number', 'disabled': true, 'width': 50 }, { 'name': 'TabIndex', 'value': '', 'Type': 'number', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }, { 'name': 'Dependency Validation', 'value': '', 'Type': 'dependency', 'width': 100, 'isDependent': { 'name': '', 'value': true }, 'dependencyObjs': [{ 'name': 'Conditions', 'type': 'conditions', 'value': '<', 'Possiblevalue': [{ 'name': 'Less than(<)', 'value': '<', }, { 'name': 'Less than or equals(<=)', 'value': '<=', }, { 'name': 'Greater than(>)', 'value': '>', }, { 'name': 'Greater than or equals(>=)', 'value': '>=', }, { 'name': 'Equals(==)', 'value': '==', }] }, { 'name': 'Other Fields', 'type': 'otherfield', 'value': '', 'Possiblevalue': [] }] }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false },], 'width': 100 }] }, { 'name': 'Single Selection', 'Type': 'dropdown', 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'TabIndex', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Choice', 'Type': 'dropdown_increment', 'Possiblevalue': [{ 'name': 'Option 1', 'value': 'Option1' }, { 'name': 'Option 2', 'value': 'Option2' }], 'width': 100 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }], 'width': 100 }] }, { 'name': 'TextArea', 'Type': 'textarea', 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'Min Length', 'value': '1', 'Type': 'number', 'width': 50 }, { 'name': 'Max Length', 'value': '200', 'Type': 'number', 'width': 50, 'length': 2000 }, { 'name': 'TabIndex', 'value': '', 'Type': 'number', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }, { 'name': 'Field Type', 'value': 'String', 'Type': 'dropdown', 'width': 50, 'Possiblevalue': ['String', 'Numeric', 'NumericwithDecimal', 'AlphaNumeric', 'Phone-Number', 'Email'] }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false }, { 'name': 'Mask Data', 'value': false }, { 'name': 'Enable Google Maps', 'value': false }], 'width': 100 }] }, { 'name': 'Radio Text', 'Type': 'radio', 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'TabIndex', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }, { 'name': 'Radio Choice', 'Type': 'radio_increment', 'Possiblevalue': [{ 'name': 'Radio1', 'value': 'Radio1' }, { 'name': 'Radio2', 'value': 'Radio2' }], 'width': 100 }, { 'name': 'Radio Align Options', 'Type': 'radioBoxZone', 'value': 'Align Vertical', 'Options': [{ 'name': 'Align Horizontal' }, { 'name': 'Align Vertical' }], 'width': 100 }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false },], 'width': 100 }], 'Options': [{ 'name': 'Radio1', 'value': 'Radio1' }, { 'name': 'Radio2', 'value': 'Radio2' }] }, { 'name': 'Button', 'Type': 'button', 'input': true, 'inputType': 'header', 'Settings': [{ 'name': 'Button Text', 'value': '', 'Type': 'button', 'width': 100 }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'TabIndex', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }] }, { 'name': 'Checkbox Text', 'Type': 'checkbox', 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'TabIndex', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }], 'Options': [{ 'name': 'Checkbox1', 'value': 'Checkbox1' }, { 'name': 'Checkbox2', 'value': 'Checkbox2' }] }, { 'name': 'Divider', 'Type': 'devider', 'input': true, 'inputType': 'devider', 'Settings': [{ 'name': 'Width', 'value': '1', 'Type': 'devider', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 100 }] }, { 'name': 'Empty Space', 'Type': 'emptyspace', 'input': true, 'inputType': 'emptyspace', 'Settings': [{ 'name': 'Width', 'value': '1', 'Type': 'emptyspace', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 100 }] }, { 'name': 'Heading name', 'Type': 'header', 'input': true, 'inputType': 'header', 'Settings': [{ 'name': 'Heading name', 'value': 'Heading name', 'Type': 'headervalue', 'width': 100 }, { 'name': 'Font Size', 'value': 23, 'Type': 'font-size', 'width': 50 }, { 'name': 'Font-Family', 'value': 'Segoe UI', 'Type': 'font-family', 'Possiblevalue': ['Arial', 'Comic Sans MS', 'Courier New', 'Georgia', 'Lucida Sans Unicode', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Segoe UI', 'Verdana'], 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'heading', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }] }];
        vm.showUploadDocsDialog = showUploadDocsDialog;
        vm.showFolderAndWfDetails = showFolderAndWfDetails;
        // vm.showDeleteConfirm = showDeleteConfirm;
        // vm.closeDeleteModal = closeDeleteModal;
        vm.doc_name_short = doc_name_short;
        vm.update_sidenav_card = update_sidenav_card;
        vm.addCanvasToCard = addCanvasToCard;
        vm.docSettingsDisabled = true;
        vm.previewDocument = previewDocument;
        vm.docSearch = false;
        if (!$rootScope.UserInfo.isAdmin) {
            $scope.$parent.currentNavItem = 0;
        } else {
            $scope.$parent.currentNavItem = 2;
        }

        vm.rolesData = {};


        $scope.reverse = false;
        $scope.filteredItems = [];
        $scope.groupedItems = [];
        $scope.itemsPerPage = 9;
        $scope.pagedItems = [];
        $scope.currentPage = 0;

        if (screen.width <= 1280) {
            $scope.itemsPerPage = 8;
        }




        var searchMatch = function (haystack, needle) {
            if (!needle) {
                return true;
            }
            if (typeof haystack === 'string') {
                return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;

            }
            return true;
        };

        // init the filtered items
        $scope.sorttype = 'modifiedDt';
        $scope.search = function () {
            $scope.filteredItems = $filter('filter')(vm.docs, function (item) {
                //for(var attr in item) {
                if (searchMatch(item['docname'], vm.query))
                    return true;
                //}
                return false;
            });
            // take care of the sorting order
            $scope.pagination($scope.filteredItems);
            $scope.currentPage = 0;
            vm.paging.current = 1;
            if (vm.query) {
                $scope.filteredItems = $filter('orderBy')($scope.filteredItems, '-docname', true);
                //$scope.sorttype='foldername';

            } else {
                //$scope.filteredItems = $filter('orderBy')($scope.filteredItems, 'modifydt', true);
                //$scope.sorttype='modifiedDt';
            }

            // now group by pages
            $scope.groupToPages();
        };

        // calculate page in place
        $scope.groupToPages = function () {
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }
            update_sidenav_card($scope.pagedItems[$scope.currentPage][0].docid);
        };

        $scope.range = function (start, end) {
            var ret = [];
            if (!end) {
                end = start;
                start = 0;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }
            return ret;
        };

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;
            }
        };

        $scope.setPage = function () {
            $scope.currentPage = this.n;
        };





        if (!$rootScope.UserInfo.isAdmin) {
            var roles = $rootScope.UserInfo.roles;
            if (roles.length) {
                var rolesData = $filter('filter')(roles, { role: "Documents" });
                if (rolesData.length) {
                    vm.rolesData = rolesData[0];
                }


            }
        }

        $scope.thumbnail_height = '2in';
        $scope.thumbnail_width = '2.2in';

        vm.docSearchDisplay = function () {
            vm.docSearch = (!vm.docSearch ? true : false);
            var searchBox = document.getElementById('search-box');
            if (searchBox) {
                window.setTimeout(function () {
                    searchBox.focus();
                }, 0);
            }
        }

        // Preview PDF canvas size
        vm.pdf_height = '2.25in';
        vm.pdf_width = '2in';

        vm.last_modified = '';
        //vm.docs = [];

        vm.currentPage = 0;
        $scope.docsPerPage = 9;
        $scope.itemsPerRow = 3;

        if (screen.width == 1024) {
            $scope.itemsPerRow = 2;
            $scope.docsPerPage = 8;
        }

        function loadPages() {
            // console.log('Current page is : ' + vm.paging.current);
            // Load current page Data here
            vm.currentPage = vm.paging.current;
            $scope.currentPage = vm.paging.current;
        }

        function getDocLibraryList() {
            $scope.loading = true;
            DocLibraryService.getDocLibraryList().then(
                function (response) {
                    $scope.loading = false;
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                        vm.docs = [];
                    } else {
                        vm.docs = response.data.documents;
                        if (vm.docs) {
                            for (var i = 0; i < vm.docs.length; i++) {
                                vm.docs[i].isReadOnly = false;
                                for (var j = 0; j < vm.docs[i].settings.length; j++) {
                                    if (vm.docs[i].settings.indexOf(7) !== -1) {
                                        vm.docs[i].isReadOnly = true;
                                    }
                                }
                            }
                        }

                        // $rootScope.docs = angular.copy(vm.docs);
                        // console.log(vm.docs.length);
                        // DocLibraryService.setDocList(vm.docs);
                        if (!vm.docs) vm.docs = [];

                        if (vm.docs.length > 0) {
                            //$scope.pagination(vm.docs);
                            $scope.search();
                            // Display the first document on the sidenav
                            $scope.firstDocFocus = true;
                            //update_sidenav_card(vm.docs[0].docid);
                        }
                    }
                },
                function (err) {
                    $scope.loading = false;
                    vm.docs = [];
                    ToastrService.error($rootScope.errorMsgs.MSG201);
                }
            )
        }
        // get the documents using the service
        getDocLibraryList();

        $scope.pagination = function (itemList) {
            if (!itemList) return false;

            vm.paging = {
                total: Math.ceil(itemList.length / $scope.docsPerPage),
                current: 1,
                onPageChanged: loadPages
            };

            if (itemList.length < $scope.itemsPerRow) {
                $scope.layoutAlign = "start start";
            } else if ((itemList.length % $scope.itemsPerRow) == 0) {
                $scope.layoutAlign = "space-around start";
            } else if ((itemList.length % $scope.itemsPerRow) != 0) {
                $scope.layoutAlign = "start start";
            }

            return vm.paging.total;
        }

        $scope.totalPages = function (count) {
            return Math.ceil(count / $scope.docsPerPage);
        }

        // TODO - not working
        $scope.giveFocusToFirstDoc = function () {
            // give focus to the first element
            if (vm.docs) {
                var firstDoc = document.getElementById('canvas' + vm.docs[0].docid);
                if (firstDoc) {
                    window.setTimeout(function () {
                        firstDoc.focus();
                    }, 300);
                }
            }
            $scope.firstDocFocus = false;
        }

        vm.dynamicWebForm = false;
        // view document data api call
        function getDocLibData(docid) {

            vm.dynamicWebForm = false;
            DocLibraryService.getDocData(docid).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        // console.log(response.data);
                        vm.docSettings = response.data.settings;
                        vm.docOldSettings = vm.docSettings;
                        vm.docRules = response.data.rules;

                        vm.docName = response.data.documentname;
                        //vm.createdDt = response.data.createddt;
                        vm.createdDt = new Date($scope.convertDateFormat(response.data.createddt.substring(0, 16)));
                        vm.lm = (!response.data.modifydt ? vm.createdDt : response.data.modifydt);
                        vm.lm = new Date($scope.convertDateFormat(vm.lm.substring(0, 16)));
                        vm.foldercount = response.data.foldercount;
                        vm.workflowcount = response.data.workflowcount;

                        // var createdDt_am = Number(vm.createdDt.substring(10, 13));
                        // if (createdDt_am >= 12) {
                        //     if (createdDt_am == 12) {
                        //         createdDt_am = $scope.convertDateFormat(vm.createdDt.substring(0, 11) + (createdDt_am).toString() + vm.createdDt.substring(13, 16)) + ' PM';
                        //     }
                        //     else {
                        //         createdDt_am = $scope.convertDateFormat(vm.createdDt.substring(0, 11) + (createdDt_am - 12).toString() + vm.createdDt.substring(13, 16)) + ' PM';
                        //     }
                        // }
                        // else {
                        //     if (createdDt_am == 0)
                        //         createdDt_am = $scope.convertDateFormat(vm.createdDt.substring(0, 11) + (createdDt_am + 12).toString() + vm.createdDt.substring(13, 16)) + ' AM';
                        //     else
                        //         createdDt_am = $scope.convertDateFormat(vm.createdDt.substring(0, 16)) + ' AM';
                        // }

                        // if (response.data.modifydt) {
                        //     var modifyDt_am = Number(vm.lm.substring(10, 13));
                        //     // if (modifyDt_am >= 12)
                        //     //     modifyDt_am = $scope.convertDateFormat(vm.lm.substring(0, 11) + (modifyDt_am - 12).toString() + vm.lm.substring(13, 16) )+ ' PM';
                        //     // else
                        //     //     modifyDt_am = $scope.convertDateFormat(vm.lm.substring(0, 16)) + ' AM';
                        //     if (modifyDt_am >= 12) {
                        //         if (modifyDt_am == 12) {
                        //             modifyDt_am = $scope.convertDateFormat(vm.lm.substring(0, 11) + (modifyDt_am).toString() + vm.lm.substring(13, 16)) + ' PM';
                        //         }
                        //         else {
                        //             modifyDt_am = $scope.convertDateFormat(vm.lm.substring(0, 11) + (modifyDt_am - 12).toString() + vm.lm.substring(13, 16)) + ' PM';
                        //         }
                        //     }
                        //     else {
                        //         if (modifyDt_am == 0)
                        //             modifyDt_am = $scope.convertDateFormat(vm.lm.substring(0, 11) + (modifyDt_am + 12).toString() + vm.lm.substring(13, 16)) + ' AM';
                        //         else
                        //             modifyDt_am = $scope.convertDateFormat(vm.lm.substring(0, 16)) + ' AM';
                        //     }
                        // }
                        // else {
                        //     modifyDt_am = createdDt_am;
                        // }
                        // var newDate = new Date(vm.lm.getTime() + vm.lm.getTimezoneOffset() * 60 * 1000);
                        // var offset = vm.lm.getTimezoneOffset();
                        // var hours = vm.lm.getHours() * 60;
                        // var minutes = vm.lm.getMinutes();
                        // newDate.setHours((hours + minutes - offset) / 60);
                        var newDate = moment.utc(response.data.modifydt).local().format();
                        vm.lm = newDate;

                        // var newDateCd = new Date(vm.createdDt.getTime() + vm.createdDt.getTimezoneOffset() * 60 * 1000);
                        // var offsetCd = vm.createdDt.getTimezoneOffset();
                        // var hoursCd = vm.createdDt.getHours() * 60;
                        // var minutesCd = vm.createdDt.getMinutes();
                        // newDateCd.setHours((hoursCd + minutesCd - offsetCd) / 60);
                        var newDateCd = moment.utc(response.data.createddt).local().format();
                        vm.createdDt = newDateCd;

                        // vm.lm = modifyDt_am;
                        // vm.createdDt = createdDt_am;


                        // Update the last modified value in sidenav
                        if (vm.docName && document.getElementById('doc_createdDate')) {
                            // document.getElementById('doc_createdDate').textContent = createdDt_am;
                            // document.getElementById('doc_lm').textContent = modifyDt_am;
                            // document.getElementById('doc_fc').textContent = vm.foldercount;
                            // document.getElementById('doc_wfc').textContent = vm.workflowcount;
                            // update the sidenav header
                            // document.getElementById('side-doc-name').textContent = vm.docName;
                        }

                        // settings
                        for (var i = 0; i < vm.docSettings.length; i++) {
                            if (vm.docSettings[i].settingid == vm.hrcId) {
                                vm.docSettings.hrc = vm.hrcId;
                            }
                            if (vm.docSettings[i].settingid == vm.hrcUploadDocId) {
                                vm.docSettings.hrc = vm.hrcUploadDocId;
                            }
                            if (vm.docSettings[i].settingid == vm.csoId) {
                                vm.docSettings.cso = vm.csoId;
                            }
                            if (vm.docSettings[i].settingid == vm.eavId) {
                                vm.docSettings.eav = vm.eavId;
                            }
                            if (vm.docSettings[i].settingid == vm.drTestAuthId) {
                                vm.docSettings.eav = vm.drTestAuthId;
                            }
                            if (vm.docSettings[i].settingid == vm.rOnlyId) {
                                vm.docSettings.rOnly = vm.rOnlyId;
                            }
                            if (vm.docSettings[i].settingid == vm.payrollPackageId) {
                                vm.docSettings.eav = vm.payrollPackageId;
                            }
                            if (vm.docSettings[i].settingid == vm.eeoId) {
                                vm.docSettings.eav = vm.eeoId;
                            }
                            if (vm.docSettings[i].settingid == vm.contractorId) {
                                vm.docSettings.eav = vm.contractorId;
                            }
                            if (vm.docSettings[i].settingid == vm.clientSpecificationId) {
                                vm.docSettings.eav = vm.clientSpecificationId;
                            }
                            if (vm.docSettings[i].settingid == vm.w4FormsId) {
                                vm.docSettings.eav = vm.w4FormsId;
                            }
                            // if (vm.docSettings[i].settingid == vm.handSignId) {
                            //     vm.docSettings.eav = vm.handSignId;
                            // }
                            if (vm.docSettings[i].settingid == vm.dynamicWebFormId) {
                                vm.dynamicWebForm = true;
                            }
                            if (vm.docSettings[i].settingid == vm.handSignId) {
                                vm.handSign = true;
                            }

                        }
                        // rules
                        for (var i = 0; i < vm.docRules.length; i++) {
                            if (vm.docRules[i].ruleid == vm.crhId) {
                                vm.docRules.crh = 1;
                            }
                            if (vm.docRules[i].ruleid == vm.dtaId) {
                                vm.docRules.dta = 1;
                            }
                        }

                        vm.origDocSettings = angular.copy(vm.docSettings);
                        vm.origDocRules = angular.copy(vm.docRules);

                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG202);
                }
            )

        }

        // Not using this function anymore as CORS settings is done
        // on IIS
        function getPDFBase64Data(docid, canvas, ctx) {
            $timeout(function () {
                DocLibraryService.getPdfData(docid).then(
                    function (response) {
                        if (response.data.Error) {
                            ToastrService.error(response.data.message);
                        } else {
                            var docData = response.data.Base64;
                            for (var i = 0; i < vm.docs.length; i++) {
                                if (vm.docs[i].docid == docid) {
                                    vm.docs[i].Base64 = atob(docData);
                                    getDoc(vm.docs[i].Base64, canvas, ctx);
                                    break;
                                }
                            }

                            if (i == 0) {
                                update_sidenav_card(vm.docs[i].docid);
                            }
                            // make base64 data also available!
                            DocLibraryService.setDocList(vm.docs);
                        }
                    },
                    function (err) {
                        ToastrService.error($rootScope.errorMsgs.MSG205);
                    }
                )
            }, 0);
        }

        vm.enableDocSettings = function () {
            vm.docSettingsDisabled = false;
            var docNameElem = document.getElementById('document-name');
            // Runs when the thread becomes idle, with a count 0
            window.setTimeout(function () {
                docNameElem.focus();
            }, 0);
        }

        vm.cancelDocEdit = function () {
            // reset settings
            vm.docSettings = angular.copy(vm.origDocSettings);
            vm.dynamicWebForm = false;
            for (var i = 0; i < vm.docSettings.length; i++) {
                // if (vm.docSettings[i].settingid == 2) {
                //     vm.docSettings.hrc = 1;
                // }
                // if (vm.docSettings[i].settingid == 1) {
                //     vm.docSettings.cso = 1;
                // }
                // if (vm.docSettings[i].settingid == 3) {
                //     vm.docSettings.eav = 1;
                // }


                if (vm.docSettings[i].settingid == vm.hrcId) {
                    vm.docSettings.hrc = vm.hrcId;
                }
                if (vm.docSettings[i].settingid == vm.hrcUploadDocId) {
                    vm.docSettings.hrc = vm.hrcUploadDocId;
                }
                if (vm.docSettings[i].settingid == vm.csoId) {
                    vm.docSettings.cso = vm.csoId;
                }
                if (vm.docSettings[i].settingid == vm.eavId) {
                    vm.docSettings.eav = vm.eavId;
                }
                if (vm.docSettings[i].settingid == vm.drTestAuthId) {
                    vm.docSettings.eav = vm.drTestAuthId;
                }
                if (vm.docSettings[i].settingid == vm.rOnlyId) {
                    vm.docSettings.rOnly = vm.rOnlyId;
                }
                if (vm.docSettings[i].settingid == vm.payrollPackageId) {
                    vm.docSettings.eav = vm.payrollPackageId;
                }
                if (vm.docSettings[i].settingid == vm.eeoId) {
                    vm.docSettings.eav = vm.eeoId;
                }
                if (vm.docSettings[i].settingid == vm.contractorId) {
                    vm.docSettings.eav = vm.contractorId;
                }
                if (vm.docSettings[i].settingid == vm.clientSpecificationId) {
                    vm.docSettings.eav = vm.clientSpecificationId;
                }
                if (vm.docSettings[i].settingid == vm.w4FormsId) {
                    vm.docSettings.eav = vm.w4FormsId;
                }
                // if (vm.docSettings[i].settingid == vm.handSignId) {
                //     vm.docSettings.eav = vm.handSignId;
                // }
                if (vm.docSettings[i].settingid == vm.dynamicWebFormId) {
                    vm.dynamicWebForm = true;
                }
                if (vm.docSettings[i].settingid == vm.handSignId) {
                    vm.handSign = true;
                }

            }
            // rules
            vm.docRules = angular.copy(vm.origDocRules);
            for (var i = 0; i < vm.docRules.length; i++) {
                if (vm.docRules[i].ruleid == 1) {
                    vm.docRules.crh = 1;
                }
                if (vm.docRules[i].ruleid == 2) {
                    vm.docRules.dta = 1;
                }
            }
            vm.docSettingsDisabled = true;
        }

        vm.removeAllVal = function () {
            // if (vm.docSettings.rOnly) {
            //     vm.docSettings.hrc = 0;
            //     vm.docSettings.eav = 0;
            // }
            // else {
            //     vm.docSettings.hrc = 2;
            //     vm.docSettings.eav = 3;
            // }
            if (vm.docSettings.rOnly) {
                vm.docSettings.hrc = 0;
                vm.docSettings.cso = 0;
                vm.docSettings.eav = 0;
            }
            else if (vm.handSign) {
                vm.docSettings.hrc = 9;
                vm.docSettings.cso = 0;
                vm.docSettings.eav = 0;
            }
            else {
                vm.docSettings.hrc = 2;
                vm.docSettings.eav = 3;
            }
        }

        vm.selectCso = function () {
            if (!vm.docSettings.rOnly) {
                vm.docSettings.cso = 1;
            }
        }

        // view document settings master api call
        function getSettingsMasterData(docid) {
            DocLibraryService.getSettingsMaster().then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        // console.log(response.data);
                        vm.docSettingsMaster = response.data;
                        // console.log(vm.docSettingsMaster);
                        for (var i = 0; i < vm.docSettingsMaster.length; i++) {
                            switch (vm.docSettingsMaster[i].settingId) {
                                case 1:
                                    vm.csoId = 1;
                                    vm.csoName = vm.docSettingsMaster[i].name;
                                    break;
                                case 2:
                                    vm.hrcId = 2;
                                    vm.hrcName = vm.docSettingsMaster[i].name;
                                    break;
                                case 3:
                                    vm.eavId = 3;
                                    vm.eavName = vm.docSettingsMaster[i].name;
                                    break;
                                case 7:
                                    vm.rOnlyId = 7;
                                    vm.rOnlyName = vm.docSettingsMaster[i].name;
                                    break;
                                case 5:
                                    vm.drTestAuthId = 5;
                                    vm.drTestAuthName = vm.docSettingsMaster[i].name;
                                    break;
                                case 9:
                                    vm.hrcUploadDocId = 9;
                                    vm.hrcUploadDocName = vm.docSettingsMaster[i].name;
                                    break;
                                case 10:
                                    vm.payrollPackageId = 10;
                                    vm.payrollPackageName = vm.docSettingsMaster[i].name;
                                    break;
                                case 11:
                                    vm.eeoId = 11;
                                    vm.eeoName = vm.docSettingsMaster[i].name;
                                    break;
                                case 12:
                                    vm.contractorId = 12;
                                    vm.contractorName = vm.docSettingsMaster[i].name;
                                    break;
                                case 13:
                                    vm.clientSpecificationId = 13;
                                    vm.clientSpecificationName = vm.docSettingsMaster[i].name;
                                    break;
                                case 14:
                                    vm.w4FormsId = 14;
                                    vm.w4FormsName = vm.docSettingsMaster[i].name;
                                    break;
                                case 15:
                                    vm.handSignId = 15;
                                    vm.handSignName = vm.docSettingsMaster[i].name;
                                    break;
                                case 16:
                                    vm.dynamicWebFormId = 16;
                                    vm.dynamicWebFormName = vm.docSettingsMaster[i].name;
                                    break;
                            }
                        }
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG202);
                }
            )

        }
        getSettingsMasterData();

        // view document rules master api call
        function getRulesMasterData(docid) {
            DocLibraryService.getRulesMaster().then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        vm.docRulesMaster = response.data;
                        // console.log(vm.docRulesMaster);
                        for (var i = 0; i < vm.docRulesMaster.length; i++) {
                            switch (vm.docRulesMaster[i].ruleId) {
                                case 1:
                                    vm.crhId = 1;
                                    vm.crhName = vm.docRulesMaster[i].name;
                                case 2:
                                    vm.dtaId = 2;
                                    vm.dtaName = vm.docRulesMaster[i].name;
                            }
                        }
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG202);
                }
            )

        }
        getRulesMasterData();

        vm.saveEditedDoc = function () {
            $scope.submitted = true;
            // submit edit document settings
            if (vm.docSettings.eav == 5 && !vm.docSettings.cso) {
                ToastrService.error(vm.csoName + ' is requred for ' + vm.drTestAuthName);
                return;
            }
            var objDoc = {};
            objDoc.documentId = vm.docId;
            objDoc.name = vm.docName.trim();
            var settings = [], rules = [];
            if (vm.docSettings.rOnly) {
                settings.push({ 'settingId': vm.rOnlyId });
            }
            if (vm.docSettings.hrc) {
                settings.push({ 'settingId': vm.docSettings.hrc });
            }
            if (vm.docSettings.cso == 1) {
                settings.push({ 'settingId': vm.csoId });
            }
            if (vm.docSettings.eav) {
                settings.push({ 'settingId': vm.docSettings.eav });
            }
            if (vm.dynamicWebForm) {
                settings.push({ 'settingId': vm.dynamicWebFormId });
            }
            if (vm.handSign) {
                settings.push({'settingId': vm.handSignId});
            }

            // if (vm.rOnly){ frmData.append('settingId', vm.rOnlyId); }
            // if (vm.hrc) frmData.append('settingId', vm.hrc);
            // if (vm.cso) frmData.append('settingId', vm.cso);
            // if (vm.eav) frmData.append('settingId', vm.eav);

            if (vm.docRules.crh == 1) {
                rules.push({ 'ruleId': vm.crhId });
            };
            if (vm.docRules.dta == 1) {
                rules.push({ 'ruleId': vm.dtaId });
            };

            objDoc.settings = settings;
            objDoc.rules = rules;

            if (vm.foldercount != 0) {
                if (vm.docOldSettings != objDoc.settings) {
                    var isNonMappedDoc = false;
                    var isMappedDoc = false;
                    for (var i = 0; i < vm.docOldSettings.length; i++) {
                        if (vm.docOldSettings[i].settingid == 7 || vm.docOldSettings[i].settingid == 14) {
                            isNonMappedDoc = true;
                        }
                    }
                    for (var i = 0; i < objDoc.settings.length; i++) {
                        if (objDoc.settings[i].settingId == 7 || objDoc.settings[i].settingId == 14) {
                            isMappedDoc = true;
                        }
                    }

                    if (isNonMappedDoc != isMappedDoc) {
                        ToastrService.error($rootScope.errorMsgs.MSG203);
                        return;
                    }
                    // console.log(vm.docOldSettings);
                    // console.log(objDoc.settings);

                }
            }

            DocLibraryService.editDocLibrary(objDoc).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                    if (!response.data.Error) {
                        ToastrService.success(response.data.message);
                        vm.docSettingsDisabled = true;
                        if (response.data && response.data.documentId) {
                            $state.go('Settings.DynamicWebForm', {
                                'id': response.data.documentId
                            });
                        } else {
                            getDocLibraryList();
                        }
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG204);
                }
            )
            // $state.go('Documents', {}, {reload: 'Documents'});
        }

        function showUploadDocsDialog(ev, id) {
            $mdDialog.show({
                locals: { docid: id, folderid: 0 },
                controller: 'UploadDocumentsController',
                controllerAs: 'vm',
                templateUrl: rootUrl + '/components/settings/documents/upload/uploadDocuments.html',
                targetEvent: ev,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                escapeToClose: true
            })
                .then(function () {
                    // console.log('Uploading New Version of docId: ' + docid);
                }, function () {
                    // console.log('You cancelled the document upload.');
                })
        }

        function previewDocument(docid) {
            var myPdfUrl = $rootScope.DocsURL + docid + '.pdf';
            $window.open(myPdfUrl);
        }

        var pdfDoc = null,
            pageNum = 1,
            pageRendering = false,
            pageNumPending = null,
            scale = 0.8;

        /**
         * Get page info from document, resize canvas accordingly, and render page.
         * @param num Page number.
         */
        function renderPage(pdfDoc, num, canvas, ctx) {
            pageRendering = true;
            // Using promise to fetch the page
            pdfDoc.getPage(num).then(function (page) {
                var viewport = page.getViewport(scale);
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);

                // Wait for rendering to finish
                renderTask.promise.then(function () {
                    pageRendering = false;

                    if (pageNumPending !== null) {
                        // New page rendering is pending
                        // renderPage(pageNumPending);
                        pageNumPending = null;
                    }
                });
            });
        }

        function addCanvasToCard(docid) {
            // get existing placeholder for the canvas
            // append canvas to it as zero element
            $timeout(function () {
                var canvas = document.getElementById('canvas' + docid.toString());
                if (canvas) {
                    canvas.style.width = $scope.thumbnail_width;
                    canvas.style.height = $scope.thumbnail_height;
                    var ctx = canvas.getContext('2d');
                    for (var i = 0; i < vm.docs.length; i++) {
                        if (vm.docs[i].docid == docid) {
                            var docUrl = $rootScope.DocsURL + docid.toString() + '.pdf';
                            break;
                        }
                    }
                    getDoc(docUrl, canvas, ctx);
                }
            });
        }

        function doc_name_short(docName, count) {
            if (!docName) return;
            if (!count) count = 15;
            if (docName.length > count) {
                docName = docName.substr(0, count - 1) + '...';
            }
            return docName;
        }

        function update_sidenav_card(docId) {
            // disable the settings & rules if they are enabled
            if (!vm.docSettingsDisabled) {
                return;
            }

            vm.docSettingsDisabled = true;
            // remove child elements, if any, from the card
            removeChildren('side-card');
            // var docId = Number(canvasId.substr(6));
            for (var i = 0; i < vm.docs.length; i++) {
                if (vm.docs[i].docid == docId) {
                    vm.i = i;
                    break;
                }
            }
            // append document to the canvas on sidenav md-card
            var parent = document.getElementById('side-card');
            if (parent) {
                parent.appendChild(cloneCanvas(docId.toString(), vm.i));
            }
            // get the document data
            getDocLibData(docId);
            vm.docId = docId;
        }

        function clear_sidenav_card() {
            vm.docSettingsDisabled = true;
            // remove child elements, if any, from the card
            removeChildren('side-card');
            vm.docId = 0;
            vm.docName = '';
            vm.createdDt = '';
            vm.lm = '';
            vm.workflowcount = '';
            vm.foldercount = '';
            document.getElementById('doc_createdDate').textContent = vm.createdDt;
            document.getElementById('doc_lm').textContent = vm.lm;
            // document.getElementById('doc_fc').textContent = vm.foldercount;
            // document.getElementById('doc_wfc').textContent = vm.workflowcount;
            // update the sidenav header
            // document.getElementById('side-doc-name').textContent = vm.docName;

        }

        function removeChildren(cardId) {
            var myNode = document.getElementById(cardId);
            if (myNode) {
                var fc = myNode.firstChild;

                while (fc) {
                    myNode.removeChild(fc);
                    fc = myNode.firstChild;
                }
            }
        }

        $scope.getDocUrl = function (docid) {
            for (var i = 0; i < vm.docs.length; i++) {
                if (vm.docs[i].docid == docid) {
                    return vm.docs[i].url;
                }
            }
        }

        function cloneCanvas(oldDocId, i) {
            // var oldCanvas = document.getElementById('canvas' + oldDocId);
            // create a new canvas
            var newCanvas = document.createElement('canvas');
            var context = newCanvas.getContext('2d');
            var docData = '';
            // set dimensions
            newCanvas.style.width = vm.pdf_width;
            // height has been adjusted after removing the footer from sidenav card
            newCanvas.style.height = vm.pdf_height;
            newCanvas.style.margin = '-8px 0 -8px -8px';
            // get the document once again!
            var docUrl = $rootScope.DocsURL + oldDocId + '.pdf';
            // for (var i = 0; i < vm.docs.length; i++) {
            //     if (vm.docs[i].docid == oldDocId) {
            //         docData = vm.docs[i].Base64;
            //         break;
            //     }
            // }
            getDoc(docUrl, newCanvas, context);
            // return the new canvas
            return newCanvas;
        }

        /**
         * Asynchronously downloads PDF.
         */
        function getDoc(docUrl, canvas, ctx) {
            // pdfDoc = null;

            PDFJS.getDocument(docUrl).then(function (pdfDoc_) {
                // pdfDoc = pdfDoc_;
                // Initial/first page rendering
                renderPage(pdfDoc_, pageNum, canvas, ctx);
            });
        }

        vm.showDeleteConfirm = function (ev, id, itemName) {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                locals: { itemName: itemName, itemType: 'Document' },
                templateUrl: $rootScope.rootUrl + '/components/common/deleteDialog.html',
                controller: ['$scope', 'itemType', 'itemName', function ($scope, itemType, itemName) {
                    $scope.itemType = itemType;
                    $scope.itemName = itemName;
                    $scope.id = id;
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

        vm.filterDocumentsBy = function () {
            vm.searchby = vm.filterby;
            // close the search box
            vm.docSearch = true;
            var filteredDocs = $filter('filter')(vm.docs, { docname: vm.searchby });

            if (filteredDocs.length > 0) {
                $scope.pagination(filteredDocs);
                // Display the first document on the sidenav
                $scope.firstDocFocus = true;
                update_sidenav_card(filteredDocs[0].docid);
            } else {
                // clear the preview section
                clear_sidenav_card();
            }
        }

        $scope.deleteItem = function (docid) {
            DocLibraryService.delDocument(docid).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                    else {
                        ToastrService.success(response.data.message);
                        $state.go('Settings.Documents', {}, { reload: 'Settings.Documents' });
                    }
                    $scope.closeDeleteModal();
                },
                function (err) {
                    ToastrService.error($rootScope.lmerrorMsgs.MSG199);
                }
            )
        }

        function showFolderAndWfDetails(ev) {
            DocLibraryService.getFolderAndWfDetails(vm.docId).then(
                function (response) {
                    vm.folderAndWfDetails = response.data;
                    $mdDialog.show({
                        // scope: $scope,
                        // preserveScope: true,
                        locals: { folderAndWfDetails: vm.folderAndWfDetails },
                        controller: 'DocumentsAssociationController',
                        controllerAs: 'vm',
                        templateUrl: $rootScope.rootUrl + '/components/settings/documents/documentAssociation/documentAssociation.html',
                        targetEvent: ev,
                        parent: angular.element(document.body),
                        clickOutsideToClose: false,
                        escapeToClose: true
                    })
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG200);
                }
            )
        }



        // $mdDialog.show({
        //     locals: {docid: id, folderid: vm.folderid},
        //     controller: 'UploadDocumentsController',
        //     controllerAs: 'vm',
        //     templateUrl: rootUrl + '/components/settings/documents/upload/uploadDocuments.html',
        //     targetEvent: ev,
        //     parent: angular.element(document.body),
        //     clickOutsideToClose:false,
        //     escapeToClose:true
        // })
        // .then(function() {
        //     vm.status = 'Document uploaded.';
        // }, function() {
        //     // getAllDocsLibraryList();
        //     vm.status = 'You cancelled the new document upload.';
        // })

        $scope.convertDateFormat = function (dateValue) {
            // var momentObj = moment(dateValue, "MM/DD/YYYY hh:mm A");
            // return $filter('date')(momentObj,'MM/dd/yyyy HH:mm a');
            // return moment(dateValue, "MM/dd/yyyy HH:mm a");
            dateValue = dateValue.replace(/-/g, '/');
            return $filter('date')(new Date(dateValue), 'MM/dd/yyyy HH:mm');
        }


        vm.previewWebForm = function (ev, docid) {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                locals: { docid: docid },
                templateUrl: $rootScope.rootUrl + '/components/settings/documents/dynamicWebForms/dynamicWebFormsSetting/dynamicWebFormsPreview.html',
                controller: ['$scope', 'docid', 'DocLibraryService', 'DynamicWebFormService', function ($scope, docid, DocLibraryService, DynamicWebFormService) {
                    $scope.formFields = [];
                    $scope.addressOptions = { "getType": "address", "watchEnter": false, "country": "us" };
                    $scope.isDisabledControl = false;


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

                    function getJsonDocumentLibrary() {
                        $scope.loading = true;
                        DocLibraryService.getJsonDocumentLibrary(docid).then(
                            function (response) {
                                $scope.loading = false;
                                if (response.data.Error) {
                                    ToastrService.error(response.data.message);
                                } else {
                                    var tempComponents = response.data.components ? response.data.components : [];
                                    //$scope.formFields = angular.copy(tempComponents);
                                    $scope.formFields = DynamicWebFormService.convertToWebFormJson(tempComponents);
                                }
                            },
                            function (err) {
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
                                        makingObj.page = obj.page;
                                        makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                                        makingObj.value = obj.value ? obj.value : '';
                                        makingObj.input = true;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('text'));
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
                                        makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                                        makingObj.value = obj.value ? obj.value : '';
                                        makingObj.input = true;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('email'));
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
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
                                        makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                                        makingObj.value = obj.value ? obj.value : '';
                                        makingObj.input = true;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('number'));
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
                                        makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                                        makingObj.value = obj.value ? obj.value : '';
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
                                        makingObj.page = obj.page;
                                        makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                                        makingObj.value = obj.value ? obj.value : '';
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
                                        makingObj.page = obj.page ? obj.page : null;
                                        makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                                        makingObj.value = obj.value ? obj.value : '';
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
                                        makingObj.page = obj.page ? obj.page : null;
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
                                        makingObj.page = obj.page ? obj.page : null;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('emptyspace'));
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


                    $scope.getDateValue = function(currentobj, offsetdays) {
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
            
                    $scope.getNumberValue = function(currentobj) {
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

        $scope.browserType = function () {
            if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
                vm.browserUsed = 'Opera';

            }
            else if (navigator.userAgent.indexOf("Chrome") != -1) {
                vm.browserUsed = 'Chrome';
                if (navigator.userAgent.indexOf("Chrome/48") != -1) {
                    vm.heightForChromeLowVersion = "400px";
                    vm.heightForSidenavLowVersion = $(document).height() - 250 + 'px';
                }
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                vm.browserUsed = 'Safari';
                if (navigator.userAgent.indexOf("Version/10") != -1) {
                    vm.heightForChromeLowVersion = "455px";
                    vm.heightForSidenavLowVersion = $(document).height() - 250 + 'px';
                }
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                vm.browserUsed = 'Firefox';
            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                vm.browserUsed = 'IE';
            }
            else {
                vm.browserUsed = 'Unknown';
            }
        }
        $scope.browserType();

        $scope.docSettingsCheckForWebForm = function (documnt) {
            return (documnt.settings.indexOf(16) != -1);
        }
        $scope.docSettingsCheck = function (documnt) {
            return !(documnt.isReadOnly || documnt.settings.indexOf(14) != -1 || documnt.settings.indexOf(15) != -1);
        }

    }
})();
