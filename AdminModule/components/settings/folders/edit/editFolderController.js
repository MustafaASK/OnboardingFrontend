(function () {
    'use strict';
    hrAdminApp.controller('EditFolderController', editFolderController);
    editFolderController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$filter', '$mdDialog', 'ToastrService', 'FoldersService', 'DocDropService'];
    function editFolderController($rootScope, $scope, $state, $stateParams, $filter, $mdDialog, ToastrService, FoldersService, DocDropService) {

        var vm = this;
        var rootUrl = $rootScope.rootUrl;

        vm.saveFolder = saveFolder;
        vm.cancelEditFolder = cancelEditFolder;
        vm.remove_item_from_array = remove_item_from_array;
        vm.docSearch = false;
        $scope.innerloading = true;
        // vm.docsArray = [], vm.docsInFolder = [];
        $scope.draggedDocs = [];
        $scope.add_or_edit = 'Add Folder';
        $scope.submitted = false;
        vm.searchdocsby = '';
        if (!$rootScope.UserInfo.isAdmin) {
            $scope.$parent.currentNavItem = 1;
        } else {
            $scope.$parent.currentNavItem = 3;
        }

        vm.rolesData = {};

        if (!$rootScope.UserInfo.isAdmin) {
            var roles = $rootScope.UserInfo.roles;
            if (roles.length) {
                var rolesData = $filter('filter')(roles, { role: "Documents" });
                if (rolesData.length) {
                    vm.rolesData = rolesData[0];
                }


            }
        }

        if ($stateParams.id) {
            vm.folderid = $stateParams.id;
            $scope.add_or_edit = 'Edit Folder';
            // vm.foldername = decodeURIComponent($stateParams.name);
            getFolderData(vm.folderid);
        }

        vm.docSearchBoxDisplay = function () {
            vm.docSearch = (!vm.docSearch ? true : false);
            // var searchBox = document.getElementById('search-box');
            // if (searchBox) {
            //     window.setTimeout(function () {
            //         searchBox.focus();
            //     }, 0);
            // }
        }

        vm.filterDocumentsBy = function () {
            vm.searchdocsby = vm.filterdocsby;
            // $scope.filteredDocs = vm.docsData.filter(function (doc) {
            //     return doc.docname.includes(vm.searchdocsby);
            // });
        }

        function disableExistDocandfolder() {
            for (var i = 0; i < $scope.draggedDocs.length; i++) {
                var obj = $filter('filter')($scope.docList, { 'docid': $scope.draggedDocs[i].documentid });
                // console.log(obj);
                if (obj.length) {
                    obj[0].disable = true;
                }
            }


            //$scope.wsteps[i].documents[j].documentId
        }

        // get all documents
        // Documents list for the sidebar
        function getAllDocsLibraryList() {
            $scope.innerloading = true;
            FoldersService.getDocLibraryList().then(
                function (response) {
                    $scope.innerloading = false;
                    if (response.data.Error) {
                        ToastrService.error(response.data.message)
                    } else {
                        vm.docsData = response.data.docList;
                        vm.originalDocsList = vm.docsData;
                        $scope.docList = vm.docsData;
                        // console.log(vm.originalDocsList);

                        if ($stateParams.id) {
                            disableExistDocandfolder();
                        }
                    }
                },
                function (err) {
                    $scope.innerloading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG201);
                }
            )
        }

        function getDocsNotInFolder(folderid) {
            FoldersService.getDocsNotInFolderList(folderid).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message)
                    } else {
                        vm.docsData = response.data.documents;
                        // for (var i = 0; i < vm.docsData.length; i++) {
                        //     vm.docsData[i].docid = vm.docsData[i].documentid;
                        //     vm.docsData[i].docname = vm.docsData[i].documentname;
                        // }
                        vm.originalDocsList = vm.docsData;
                        $scope.docList = vm.docsData;
                        // console.log(vm.originalDocsList);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG201);
                }
            )
        }

        // if ($stateParams.id) 
        //     getDocsNotInFolder($stateParams.id);
        // else
        // getAllDocsLibraryList(); 

        if (!$stateParams.id)
            getAllDocsLibraryList();
        // view folder data api call
        function getFolderData(folderid) {
            FoldersService.viewFolderData(folderid).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        $scope.folderDocsData = response.data.documents;
                        $scope.folderData = response.data.folders;
                        // console.log(response.data);
                        vm.foldername = $scope.folderData[0].foldername;

                        // create the document items in the drop zone
                        if ($scope.folderDocsData.length > 0 && $scope.folderDocsData[0].documentid) {
                            addToDropZone($scope.folderDocsData);
                        }
                        // remove documents that are added to dropzone from
                        // side nav
                        //remove_docs_in_dropzone_from_doclist($scope.folderDocsData);
                        getAllDocsLibraryList();
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG217);
                }
            )

        }

        function addToDropZone(docList) {
            $scope.draggedDocs = docList;
            // for (var i = 0; i < docids.length; i++) {
            //     $scope.draggedDocs.push({'documentid': docids[i], 'documentname': get_docname(docids[i])});
            // }

            // remove the background image
            if (docList.length > 0) {
                var dropZone = document.getElementById('small-drop-zone');
                if (dropZone) dropZone.style.backgroundImage = 'none';
            }
        }

        function saveNewFolder() {
            // submit new / modified folder details
            var objFolder = {};
            objFolder.folderName = vm.foldername.trim();
            objFolder.documentIds = getDocsFromDropZone();

            FoldersService.addFolderLibrary(objFolder).then(
                function (response) {
                    if (response.data.Error) {
                        vm.foldername = "";
                        ToastrService.error(response.data.message);
                    }
                    if (!response.data.Error) {
                        $state.go('Settings.Folders', {}, { reload: 'Settings.Folders' });
                        ToastrService.success(response.data.message);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG218);
                }
            )
        }

        function editFolder() {
            // submit new / modified folder details
            var objFolder = {};
            objFolder.folderId = vm.folderid;
            objFolder.folderName = vm.foldername.trim();
            objFolder.documentIds = getDocsFromDropZone();

            FoldersService.editFolderLibrary(objFolder).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                    if (!response.data.Error) {
                        $state.go('Settings.Folders', {}, { reload: 'Settings.Folders' });
                        ToastrService.success(response.data.message);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG218);
                }
            )
        }

        function saveFolder() {
            $scope.submitted = true;
            vm.foldername = vm.foldername.trim();
            if (!vm.foldername) {
                ToastrService.warning($rootScope.errorMsgs.MSG083);
                return;
            }

            if ($stateParams.id) {
                editFolder();
            } else {
                saveNewFolder();
            }
        }

        function remove_item_from_array(item, array) {
            var index = array.indexOf(item);
            array[index].disable = true;
            //array.splice(index, 1);
        }
        function remove_item_from_array_obj(item, array) {
            var index = array.indexOf(item);
            array.splice(index, 1);
        }

        $scope.doc_name_short = function (name, count) {
            if (!count) count = 17;
            if (name.length > count) {
                name = name.substr(0, count - 1) + "...";
            }
            return name;
        }

        function get_docname(docid) {
            for (var i = 0; i < vm.originalDocsList.length; i++) {
                if (vm.originalDocsList[i].docid == docid) {
                    return vm.originalDocsList[i].docname;
                }
            }
        }
         
        function get_docSettings(docid){
            for(var i=0; i< vm.originalDocsList.length ; i++){
                if (vm.originalDocsList[i].docid == docid) {
                    return vm.originalDocsList[i].settings;
                }
            }
           
        }

        function get_index_of_doc_in_original_list(docid) {
            for (var i = 0; i < vm.originalDocsList.length; i++) {
                if (vm.originalDocsList[i].docid == docid) {
                    return i;
                }
            }
            return 0;
        }

        function remove_docs_in_dropzone_from_doclist(docs_to_remove) {
            // update doc list (to display in side-nav)
            for (var i = 0; i < docs_to_remove.length; i++) {
                if ($scope.docList) {
                    for (var j = 0; j < $scope.docList.length; j++) {
                        if ($scope.docList[j].docid == docs_to_remove[i].documentid) {
                            remove_item_from_array($scope.docList[j], $scope.docList);
                            continue;
                        }
                    }
                }
            }
        }

        // used by the drag and drop directive
        vm.remove_doc_from_one_list_and_add_to_another = function (item) {
            var index = get_index_of_doc_in_original_list(item.documentid);
            // if (!index) index = 0;
            var doc = {
                'docid': item.documentid,
                'docname': item.documentname
            };

            remove_item_from_array_obj(item, $scope.draggedDocs);
            // console.log($scope.draggedDocs);

            if ($scope.draggedDocs.length == 0) {
                var dropzone = document.getElementById('small-drop-zone');
                var rooturl = $rootScope.rootUrl;
                dropzone.style.backgroundImage = 'url(..' + rooturl + '/images/drag_drop_doc.png)';
            }

            // check if docid is already in the doclist
            for (var i = 0; i < $scope.docList.length; i++) {
                if ($scope.docList[i].docid == item.documentid) {
                    $scope.docList[i].disable = false;
                }
            }

            //$scope.docList.splice(index, 0, doc);

            // for (var i = 0; i <= $scope.docList.length; i++) {
            //     if (i == index) {
            //         $scope.docList.splice(i, 0, item);
            //         break;
            //     }
            // }    

        }

        function get_index_of_doc(docid) {
            for (var i = 0; i < $scope.docList.length; i++) {
                if ($scope.docList[i].docid == docid) {
                    return i;
                }
            }
        }

        // check if the document is already in any of the steps in the workflow
        function check_if_doc_is_used_in_workflow(docid) {
            for (var j = 0; j < $scope.draggedDocs.length; j++) {
                if ($scope.draggedDocs[j].documentid == docid) {
                    return true;
                }
            }

            return false;
        }

        document.addEventListener('dragstart', function (event) {
            event.dataTransfer.effectAllowed = 'move';
            var target = document.getElementById('small-drop-zone');
            if (target) target.style.cursor = 'move';
        });

        var handleDropEvent = function (event) {
            event.preventDefault();
            event.stopPropagation();
            // source
            var data = event.dataTransfer.getData('Text');
            // console.log('Source Element: ' + data);
            data = data.split('-');
            var docid = Number(data[1]);

            var dupFound = false;
            if (!docid) {
                return false;
            }
            if (check_if_doc_is_used_in_workflow(docid)) {
                dupFound = true;
            }
            // now remove duplicates
            if (dupFound) {
                return;
            }

            $scope.draggedDocs.push({
                'documentid': docid,
                'documentname': get_docname(docid),
                'index': get_index_of_doc(docid),
                'settings': get_docSettings(docid)
            });
            debugger;
            // target
            var target = event.target.id;
            // documents list is managed by a different controller
            for (var i = 0; i < $scope.docList.length; i++) {
                if ($scope.docList[i].docid == docid) {
                    remove_item_from_array($scope.docList[i], $scope.docList);
                    break;
                }
            }
            $scope.$apply();
        }

        DocDropService.removeAllListeners();
        DocDropService.addListener(document.body, 'drop', handleDropEvent, false);

        function cancelEditFolder() {
            $state.go('Settings.Folders');
        }

        function getDocsFromDropZone() {
            var docIds = [];

            for (var i = 0; i < $scope.draggedDocs.length; i++) {
                docIds.push($scope.draggedDocs[i].documentid);
            }

            return docIds;
        }

        vm.showUploadDocsDialog = function (ev, id) {
            $mdDialog.show({
                locals: { docid: id, folderid: vm.folderid },
                controller: 'UploadDocumentsController',
                controllerAs: 'vm',
                templateUrl: rootUrl + '/components/settings/documents/upload/uploadDocuments.html',
                targetEvent: ev,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                escapeToClose: true
            })
                .then(function () {
                    vm.status = 'Document uploaded.';
                }, function () {
                    // getAllDocsLibraryList();
                    vm.status = 'You cancelled the new document upload.';
                })
        }


        // Browser detecction
        $scope.browserType = function () {
            if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
                vm.browserUsed = 'Opera';
                vm.workflowDocCardClass = 'wf-doc-icon-text-moz';
                vm.folderEditAreaClass = 'edit-folder-area';
            }
            else if (navigator.userAgent.indexOf("Chrome") != -1) {
                vm.browserUsed = 'Chrome';
                vm.workflowDocCardClass = 'wf-doc-icon-text';
                vm.folderEditAreaClass = 'edit-folder-area';
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                vm.browserUsed = 'Safari';
                vm.workflowDocCardClass = 'wf-doc-icon-text';
                vm.folderEditAreaClass = 'edit-folder-area';
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                vm.browserUsed = 'Firefox';
                vm.workflowDocCardClass = 'wf-doc-icon-text-moz';
                vm.folderEditAreaClass = 'edit-folder-area';
            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                vm.browserUsed = 'IE';
                vm.workflowDocCardClass = 'wf-doc-icon-text';
                vm.folderEditAreaClass = 'edit-folder-area-IE';
            }
            else {
                vm.browserUsed = 'Unknown';
                vm.workflowDocCardClass = 'wf-doc-icon-text';
                vm.folderEditAreaClass = 'edit-folder-area';
            }
        }
        $scope.browserType();

    }
})();
