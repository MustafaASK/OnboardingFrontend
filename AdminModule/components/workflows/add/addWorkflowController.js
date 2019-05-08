(function () {
    'use strict';
    hrAdminApp.controller('AddWorkflowController', addWorkflowController);
    addWorkflowController.$inject = ['$rootScope', '$scope', '$state', '$filter', '$stateParams', '$mdDialog', '$mdSidenav', 'ToastrService', 'WorkflowService', 'DocDropService', '$sce', 'DesignWebformsService', '$window'];
    function addWorkflowController($rootScope, $scope, $state, $filter, $stateParams, $mdDialog, $mdSidenav, ToastrService, WorkflowService, DocDropService, $sce, DesignWebformsService, $window) {

        var vm = this;
        $scope.Math = $window.Math;
        vm.defaultStepClass = 'workflow-step-card';
        var rootUrl = $rootScope.rootUrl;
        var originalFoldersList = null;
        // hide the add button next to title text
        var addWorkflowBtn = document.getElementById('add-workflow-btn');
        addWorkflowBtn.style.visibility = 'hidden';
        var searchIcon = document.getElementById('search-icon');
        searchIcon.style.visibility = 'hidden';

        vm.showUploadDocsDialog = showUploadDocsDialog;
        vm.editWorkflow = editWorkflow;
        // $scope.wfname = 'New Workflow';
        $scope.wsteps = [];
        vm.newWorkflow = true;
        $scope.tempStepNum = 1;
        vm.folderSearch = false;
        $scope.draggedDocs = [];
        var tmpList = [];
        // used only for deletion of steps
        $scope.deleteStepsPermanently = false;
        $scope.toBeDeletedSteps = [];
        $scope.submitted = false;
        vm.loadCheckboxes = false;

        vm.savedWebformsId = [];

        var tempStepsLoad = [];

        if (screen.width == 1024) {
            vm.defaultStepClass = 'workflow-step-card-default';
            // vm.workflowDefaultStepHeight =  '350px !important';
            vm.divMarginBottom = '-150px';
            vm.divVerticalLine = '310px';

            //checkboxes changes

        }

        // vm.docBGDisplayImage= '..' + rootUrl + '/images/drag_drop_doc.png)' ;

        vm.webformStepDesc = "Webforms Settings Description";
        vm.webformStepName = "Webforms Settings";
        $scope.selected = [];
        $scope.items = [{ label: 'Employment History', param: 'employementflag', value: true },
        { label: 'Address Proofs', param: 'addressflag', value: true },
        { label: 'Education', param: 'educationflag', value: true },
        { label: 'References', param: 'referencesflag', value: true }];

        $scope.isChecked = isChecked;
        $scope.isEmpChecked = isEmpChecked;
        $scope.isAddChecked = isAddChecked;
        $scope.isEduChecked = isEduChecked;
        $scope.isRefChecked = isRefChecked;


        vm.bgvflag = true;
        $scope.workflow = [];
        // $scope.workflow.employementflag = true;
        // $scope.workflow.addressflag = true;
        // $scope.workflow.educationflag = true;
        // $scope.workflow.referencesflag = true;

        if ($stateParams.id) {
            vm.workflowid = $stateParams.id;
            getWorkflowData(vm.workflowid);
            vm.newWorkflow = false;
        }
        else {
            getDesignWebformsList();
        }

        vm.folderSearchBoxDisplay = function () {
            vm.folderSearch = (!vm.folderSearch ? true : false);
            var searchBox = document.getElementById('search-box');
            if (searchBox) {
                window.setTimeout(function () {
                    searchBox.focus();
                }, 0);
            }
        }

        vm.filterFoldersBy = function () {
            vm.searchby = vm.filterby;
        }

        // vm.stepNameSize = (screen.width == 1024 ? '325px' : '55px');
        vm.stepDescWidth = (screen.width == 1024 ? '325px' : '515px');
        $scope.view = false;
        $scope.stepIcon = 'add';

        $scope.checkWebForm = function (settings) {
            var status = false;
            var obj1 = $filter('filter')(settings, { 'settingid': 16 });
            if (obj1.length) {
                status = true;
            }
            return status;
        }

        $scope.doc_name_short = function (name, count) {
            // IE 11 does not accept function params having values 
            if (!count) count = 17;
            if (name.length > count) {
                name = name.substr(0, count - 1) + "...";
            }
            return name;
        }

        function remove_item_from_array(item, array) {
            var index = array.indexOf(item);
            array[index].disable = true;
            //   array.splice(index, 1);  //remove comment
        }

        function remove_item_from_array_obj(item, array) {
            var index = array.indexOf(item);
            array.splice(index, 1);
        }

        $scope.remove_item_from_array = remove_item_from_array;

        $scope.toggle = function () {
            $scope.submitted = false;
            vm.isEditable = false;
            $scope.view = !$scope.view;
            if ($scope.view) $scope.newStepEnabled = true;
            if (!$scope.view) $scope.newStepEnabled = false;
            vm.newStepName = null;
            vm.newStepDesc = null;
            // put back the dragged docs in their respective locations
            if ($scope.draggedDocs.length > 0) {
                for (var i = 0; i < $scope.draggedDocs.length; i++) {
                    vm.add_doc_or_folder_to_list($scope.draggedDocs[i]);
                    // vm.remove_doc_and_add_back($scope.draggedDocs[i], vm.documents);
                }
            }
            // empty dragged docs
            $scope.draggedDocs = [];
            $scope.stepIcon = $scope.view ? 'remove' : 'add';
        }

        // this function is not being used
        $scope.toggleItems = function (item) {
            if (item.documents) {
                if (Array.isArray(item.documents)) {
                    item.expanded = !item.expanded;
                }
            }
        };

        vm.editStepName = function (stepid) {
            var stepNameElem = document.getElementById('editsn-' + stepid);
            stepNameElem.readOnly = false;
            stepNameElem.focus();
            var stepDescElem = document.getElementById('editsprevd-' + stepid);
            stepDescElem.hidden = true;
            var stepDescElem = document.getElementById('editsd-' + stepid);
            stepDescElem.hidden = false;
            var mdContainerHeight = document.getElementById('icsd-' + stepid);
            mdContainerHeight.style.marginTop = '5px';
            var mdCardElem = document.getElementById('step-' + stepid);
            mdCardElem.classList.add("workflow-step-name-edit");
            var verticalLine = document.getElementById('vline-' + stepid);
            verticalLine.classList.add("vertical-line-edit");
            if (screen.width == 1024) {
                mdCardElem.classList.remove("workflow-step-card");
            }
            // vm.stepDescMarginTop = '5px';
            // showElementsByNameAndId('stepDesc', stepid);
        }

        // Check if any steps without documents are present in the workflow


        vm.showStepDeleteConfirm = function (ev, id, stepName) {
            // if it is the only step in workflow then err out
            // if ($scope.wsteps.length == 1 && !vm.newWorkflow) {
            //     ToastrService.error('Workflow needs atleast one step.');
            //     return;
            // }

            // console.log('Step ID: ', id);
            // console.log('Step Name: ', stepName);
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                locals: { itemName: stepName, itemType: 'Step' },
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

        vm.showStepDeletionPrompt = function (ev, id) {
            $scope.submitted = true;
            var stepList = [];
            // check if any steps are present without documents
            // steps without docs will be ignored
            for (var i = 0; i < $scope.wsteps.length; i++) {
                if (vm.htmlToPlaintext($scope.wsteps[i].stepDesc).length > 5000) {
                    ToastrService.error('The step description should not exceed 5000 characters');
                    return;
                }
                if (vm.htmlToPlaintext($scope.wsteps[i].stepDesc).trim() == "") {
                    ToastrService.error('Please enter the Step Description. It can’t be blank.');
                    return;
                }
                if ($scope.wsteps[i].documents.length == 0) {
                    stepList.push({
                        'StepId': $scope.wsteps[i].altStepId,
                        'stepName': $scope.wsteps[i].stepName,
                        'stepDesc': $scope.wsteps[i].stepDesc
                    })
                }

            }

            // if (stepList.length == 0) {
            vm.saveWorkflow();
            // } else {
            //     $mdDialog.show({
            //         scope: $scope,
            //         preserveScope: true,
            //         template: '<md-dialog aria-label="Delete" style="width:400px;">' +
            //             '<div layout="column" layout-align="start end" style="padding:10px;">' +
            //             '<ng-md-icon icon="clear" size="14" style="margin-top:8px;cursor:pointer" ng-click="vm.closeDeleteModal()">' +
            //             '</ng-md-icon>' +
            //             '</div>' +
            //             '<md-content style="background-color:white">' +
            //             '<div layout="column" layout-align="center center"><img src="images/que_icon.png" width="70px" height="70px"/></div>' +
            //             '<p align=center style="padding:10px 10px 20px 20px;font-size:13px;" >Step(s) without documents are void. These step(s) will be deleted.</p>' +
            //             '<md-divider></md-divider>' +
            //             '<div layout="row" layout-align="end center" style="background-color:rgb(250,250,250);height:60px;padding:10px" flex>' +
            //             '<md-button class="md-raised md-primary" ng-click="vm.saveWorkflow()" >OK</md-button>' +
            //             '<md-button class="md-secondary" ng-click="vm.closeDeleteModal()">Cancel</md-button>' +
            //             '</div>' +
            //             '</md-content>' +
            //             '</md-dialog>'
            //     });
            // }
        }

        $scope.closeDeleteModal = function () {
            $mdDialog.cancel();
        }

        vm.closeDeleteModal = $scope.closeDeleteModal;

        $scope.deleteItem = function (stepid) {
            var deletedStepSeqNumber = 0;
            var stepCount = $scope.wsteps.length;
            // check if the step is a new one before making the api request
            // delete the step locally
            for (var i = 0; i < $scope.wsteps.length; i++) {

                if ($scope.wsteps[i].StepId == stepid || $scope.wsteps[i].altStepId == stepid) {
                    // console.log($scope.wsteps[i]);
                    if ($scope.wsteps[i].newStep == 1) {
                        //    console.log("Deleted step locally.");
                        // add document(s) back to the sidenav
                        for (var j = 0; j < $scope.wsteps[i].documents.length; j++) {
                            vm.add_doc_or_folder_to_list($scope.wsteps[i].documents[j]);
                        }
                        // TODO - reset step sequence numbers
                        resetSeq($scope.wsteps[i].sequencenumber, stepCount);
                        // remove step locally
                        remove_item_from_array_obj($scope.wsteps[i], $scope.wsteps);
                        $scope.closeDeleteModal();

                        return;
                    } else {
                        // add document(s) back to the sidenav
                        if (!$scope.deleteStepsPermanently) {
                            var tempStep = $scope.wsteps[i];
                            // add document(s) back to the sidenav
                            for (var j = 0; j < tempStep.documents.length; j++) {
                                vm.add_doc_or_folder_to_list(tempStep.documents[j]);
                            }
                            remove_item_from_array_obj(tempStep, $scope.wsteps);
                            deletedStepSeqNumber = tempStep.sequencenumber;
                            // TODO - reset step sequence numbers
                            resetSeq(deletedStepSeqNumber, stepCount);
                            // close the dialog
                            $scope.closeDeleteModal();
                        }
                        // delete step visually but do not send the delete request yet.
                        // it should be done on workflow save only!
                        $scope.toBeDeletedSteps.push(stepid);
                        // console.log($scope.toBeDeletedSteps);
                        // console.log($scope.toBeDeletedSteps);
                        // send the delete request to api
                        if ($scope.deleteStepsPermanently) {
                            WorkflowService.delWorkflowStep(stepid).then(
                                function (response) {
                                    // // add document(s) back to the sidenav
                                    // for (var j = 0; j < tempStep.documents.length; j++) {
                                    //     vm.add_doc_or_folder_to_list(tempStep.documents[j]);
                                    // }
                                    // remove_item_from_array(tempStep, $scope.wsteps);
                                    // // close the dialog
                                    // $scope.closeDeleteModal();  
                                    if (response.data.Success) {
                                        ToastrService.success(response.data.message);
                                        // $state.go($state.current.name, {}, {reload: true});
                                    }
                                    else {
                                        ToastrService.error(response.data.message);
                                    }
                                    return deletedStepSeqNumber;
                                },
                                function (err) {
                                    ToastrService.error(err.message);
                                }
                            )
                        }
                    }
                }
            }
        }

        // incomplete function - To be updated for save
        // copied from Documents controller
        function showUploadDocsDialog(ev, id) {
            $mdDialog.show({
                locals: { docid: id },
                controller: 'UploadDocumentsController',
                controllerAs: 'vm',
                templateUrl: rootUrl + '/components/settings/documents/upload/uploadDocuments.html',
                targetEvent: ev,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                escapeToClose: true
            })
                .then(function () {
                    vm.status = 'Document Uploaded';
                }, function () {
                    vm.status = 'You cancelled the new document upload.';
                })
        }

        function getWorkflowData(workflowid) {
            $scope.loading = true;
            WorkflowService.getDynamicWorkflow(workflowid).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        vm.workflow = response.data.workflow[0];
                        // console.log(vm.workflow);
                        vm.steps = vm.workflow.steps;
                        vm.savedWebformsId = vm.workflow.webForms;
                        tempStepsLoad = angular.copy(vm.steps);
                        $scope.wsteps = vm.workflow.steps;
                        $scope.wfname = vm.workflow.workflowName;
                        // $scope.workflow.commondetailsflag = vm.workflow.commondetailsflag;
                        // $scope.workflow.employementflag = vm.workflow.employementflag;
                        // $scope.workflow.addressflag = vm.workflow.addressflag;
                        // $scope.workflow.educationflag = vm.workflow.educationflag;
                        // $scope.workflow.referencesflag = vm.workflow.referencesflag;
                        // $scope.workflow.ddflag = vm.workflow.ddflag;
                        // $scope.workflow.contractorflag = vm.workflow.contractorflag;
                        // $scope.workflow.eeoflag = vm.workflow.eeoflag;
                        // if ($scope.workflow.employementflag && $scope.workflow.addressflag && $scope.workflow.educationflag && $scope.workflow.referencesflag) {
                        //     vm.bgvflag = true;
                        // }
                        // else {
                        //     vm.bgvflag = false;
                        // }
                        // add stepid to the documents within step
                        for (var i = 0; i < $scope.wsteps.length; i++) {
                            for (var j = 0; j < $scope.wsteps[i].documents.length; j++) {
                                $scope.wsteps[i].isEditable = $scope.wsteps[i].isstepeditble;
                                $scope.wsteps[i].documents[j].stepId = $scope.wsteps[i].StepId;
                            }
                        }
                        if ($stateParams.id) {
                            getNewWorkflowFoldersList();
                            getDesignWebformsList();
                        }
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG241);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }

        function get_docsFromDropZone(stepnum) {
            var docs = $scope.draggedDocs;
            // Issue 294 - Added this condition to ensure that step contains atleast one step
            // workaround for resetting step sequence            
            if (docs.length == 0) {
                // ToastrService.error($rootScope.errorMsgs.MSG121);
                // return;
            }

            var temp = null;
            var wStepDocs = [];
            var wStepDocsWithName = [];

            for (var i = 0; i < docs.length; i++) {
                wStepDocs.push({
                    'folderLibrary': { 'folderId': docs[i].folderId },
                    'documentLibrary': { 'documentId': docs[i].documentId }
                });


                var settingsId = [];
                var obj = $filter('filter')(vm.documents, { 'folderid': docs[i].folderId });

                if (obj.length) {
                    var obj1 = $filter('filter')(obj[0].documents, { 'documentId': docs[i].documentId });
                    if (obj1.length) {
                        settingsId = obj1[0].settings;
                    }
                }

                wStepDocsWithName.push({
                    'folderId': docs[i].folderId,
                    'folderName': docs[i].folderName,
                    'documentId': docs[i].documentId,
                    'name': docs[i].name,
                    'index': docs[i].index,
                    'location': 'step',
                    'stepId': stepnum,
                    'altStepId': stepnum,
                    'setting': settingsId
                });
            }
            wStepDocs.push(wStepDocsWithName);
            return wStepDocs;
        }

        function getDocsFromDropZone(stepnum) {
            var dropZone = document.getElementById('doc-add-zone');
            var docs = dropZone.getElementsByTagName('md-list-item');
            var temp = null;
            var wStepDocs = [];
            var wStepDocsWithName = [];
            var stepDocsArray = null;

            for (var i = 0; i < docs.length; i++) {
                temp = docs[i].id;
                if (temp.substring(0, 3) == 'fld') {
                    stepDocsArray = temp.split('-');
                    wStepDocs.push({
                        'folderLibrary': { 'folderId': stepDocsArray[1] },
                        'documentLibrary': { 'documentId': stepDocsArray[2] }
                    });
                    // display the doc name as chip
                    // get the element with p tag
                    var docElem = document.getElementById(docs[i].id);
                    var pElems = docElem.getElementsByTagName('p');
                    // there will only be one element with p tag
                    wStepDocsWithName.push({
                        'folderId': stepDocsArray[1],
                        'documentId': stepDocsArray[2],
                        'name': pElems[0].textContent,
                        'altStepId': stepnum
                    });
                } else {
                    // whole folder has been dragged and dropped
                    wStepDocsWithName = $scope.draggedDocs;
                }
            }
            wStepDocs.push(wStepDocsWithName);
            // filter array to remove duplicates
            var filterDocIds = wStepDocs.filter(function (item, pos) {
                return wStepDocs.indexOf(item) == pos;
            });
            return filterDocIds;
        }

        function showElementsByNameAndId(name, stepid) {
            var elements = document.getElementsByName(name);

            for (var i = 0; i < elements.length; i++) {
                var eid = elements[i].id.split('-')[1];
                if (eid == stepid) {
                    elements[i].style.visibility = 'visible';
                }
            }
        }

        function hideElementsByNameAndId(name, stepid) {
            var elements = document.getElementsByName(name);

            for (var i = 0; i < elements.length; i++) {
                var eid = elements[i].id.split('-')[1];
                if (eid == stepid) {
                    elements[i].style.visibility = 'hidden';
                }
            }
        }

        vm.buildNewStep = function () {
            $scope.submitted = true;
            // var newStepNum = $scope.tempStepNum++;
            var newStepNum = $scope.wsteps.length + 1;
            var newStep = true;
            if (!vm.newStepName || vm.newStepName.trim() == '') {
                ToastrService.error($rootScope.errorMsgs.MSG242);
                return;
            }

            if (!vm.newStepDesc || vm.newStepDesc.trim() == '') {
                ToastrService.error($rootScope.errorMsgs.MSG243);
                return;
            }
            if (vm.htmlToPlaintext(vm.newStepDesc).length > 5000) {
                ToastrService.error('The step description should not exceed 5000 characters');
                return;
            }
            if (vm.htmlToPlaintext(vm.newStepDesc).trim() == "") {
                ToastrService.error('Please enter the Step Description. It can’t be blank.');
                return;
            }

            var workflowstepsdocs = get_docsFromDropZone(newStepNum);
            var workflowdocs = workflowstepsdocs.pop();
            // if (workflowdocs.length == 0) {
            //     ToastrService.error('Step needs to have atleast one document.');
            //     return;                
            // }

            if (vm.newWorkflow) {
                var step = {
                    'StepId': newStepNum,
                    'isEditable': vm.isEditable,
                    'stepName': vm.newStepName.trim(),
                    'stepDesc': vm.newStepDesc.trim(),
                    'sequencenumber': newStepNum,
                    'workFlowStepsDocs': workflowstepsdocs,
                    'documents': workflowdocs,   // this is required for chip display
                    'newStep': (!newStep ? 0 : 1),
                    'altStepId': newStepNum  // deleting new step will be easier
                };

            } else {
                var step = {
                    'stepName': vm.newStepName.trim(),
                    'isEditable': vm.isEditable,
                    'stepDesc': vm.newStepDesc.trim(),
                    'sequencenumber': newStepNum,
                    'workFlowStepsDocs': workflowstepsdocs,
                    'documents': workflowdocs,   // this is required for chip display
                    'newStep': (!newStep ? 0 : 1),
                    'altStepId': newStepNum // deleting new step will be easier
                };
            }
            $scope.wsteps.push(step);
            // document.getElementById('vline-' + newStepNum) = vertical_line_ht(workflowdocs.length);

            vm.newStepName = null;
            vm.newStepDesc = null;
            vm.newStep = false;
            $scope.draggedDocs = [];
            // removeChildren('doc-add-zone');
            $scope.toggle();
        }

        $scope.displayBG = function (elemId, docsCount) {
            // ng-init="displayBG(step.StepId || step.altStepId, step.documents.length)"
            // ng-class="step.documents.length > 0 : {background-repeat : no-repeat; background-position : center center; } : '' " ng-style="'background-image' : step.documents.length > 0 ? vm.docBGDisplayImage : ''"
            if (docsCount == 0) {
                var element = document.getElementById(elemId);

                if (element) {
                    element.style.backgroundRepeat = 'no-repeat';
                    element.style.backgroundPosition = 'center center';
                    element.style.backgroundImage = 'url(..' + rootUrl + '/images/drag_drop_doc.png)';
                }
            }
        }

        function vertical_line_ht(docCount) {
            var min_ht = 60;
            if (3 > docCount < 7) {
                min_ht = min_ht + 25 + 10;
            } else if (7 > docCount < 10) {
                min_ht = min_ht + 2(25 + 10);
            }

            return min_ht.toString() + 'px';
        }

        $scope.get_folder_name = function (folderid) {
            if (!originalFoldersList) {
                var originalFoldersList = vm.documents;
                // console.log(originalFoldersList);
            }

            for (var i = 0; i < originalFoldersList.length; i++) {
                if (originalFoldersList[i].folderid == folderid) {
                    return originalFoldersList[i].foldername;
                }
            }
        }

        $scope.get_docs_in_folder = function (folderid) {
            var folders = vm.documents;
            var docs_in_fld = [];
            var count = 0;
            for (var i = 0; i < folders.length; i++) {
                if (folders[i].folderid == folderid) {
                    var tempDocSet = folders[i].documents;
                    var tempDirName = folders[i].foldername;
                    break;
                }
            }
            if (tempDocSet) {
                for (var i = 0; i < tempDocSet.length; i++) {
                    var doc_to_push = {
                        'folderId': folderid,
                        'folderName': tempDirName,
                        'documentId': tempDocSet[i].documentId,
                        'name': tempDocSet[i].documentName,
                        'index': i
                    }
                    docs_in_fld.push(doc_to_push);
                }

            }
            return docs_in_fld;
        }

        $scope.get_document_name = function (docid, folderid) {
            if (!originalFoldersList) {
                var originalFoldersList = vm.documents;
            }

            for (var i = 0; i < originalFoldersList.length; i++) {
                for (var j = 0; j < originalFoldersList[i].documents.length; j++) {
                    if (originalFoldersList[i].documents[j].documentId == docid.toString()) {
                        return originalFoldersList[i].documents[j].documentName;
                    }
                }
            }
        }

        $scope.get_document_setting_id = function (docid) {
            var originalFoldersList = vm.documents;

            for (var i = 0; i < originalFoldersList.length; i++) {
                for (var j = 0; j < originalFoldersList[i].documents.length; j++) {
                    if (originalFoldersList[i].documents[j].documentId == docid.toString()) {
                        return originalFoldersList[i].documents[j].settings;
                    }
                }
            }
            return [];
        }

        // used when dragging doc / folder on to a step
        vm.addDocToStep = function (stepid, folderid, docid) {
            for (var i = 0; i < $scope.wsteps.length; i++) {
                if ($scope.wsteps[i].StepId == stepid || $scope.wsteps[i].altStepId == stepid) {

                    var settingsId = [];
                    var obj = $filter('filter')(vm.documents, { 'folderid': folderid });

                    if (obj.length) {
                        var obj1 = $filter('filter')(obj[0].documents, { 'documentId': docid });
                        if (obj1.length) {
                            settingsId = obj1[0].settings;
                        }
                    }

                    var doc_to_push = {
                        'folderId': Number(folderid),
                        'folderName': $scope.get_folder_name(folderid),
                        'documentId': Number(docid),
                        'name': $scope.get_document_name(docid, folderid),
                        'stepId': Number(stepid),
                        'index': i,
                        'setting': settingsId   // used for putting back the doc in its place if needed
                    };
                    $scope.wsteps[i].documents.push(doc_to_push);
                    $scope.$apply();

                    // if the workflow new then step also is new
                    if (vm.newWorkflow) {
                        var updatedDocs = [];
                        for (var j = 0; j < $scope.wsteps[i].documents.length; j++) {
                            updatedDocs.push({
                                'folderLibrary': { 'folderId': $scope.wsteps[i].documents[j].folderId },
                                'documentLibrary': { 'documentId': $scope.wsteps[i].documents[j].documentId }
                            });
                        }

                        $scope.wsteps[i].workFlowStepsDocs = updatedDocs;
                    }

                    return true;
                }
            }
            // console.log("Looks like doc is not added to step!");
            return false;
        }

        vm.addFolderToStep = function (stepid, folderid) {
            var docsInFolder = $scope.get_docs_in_folder(folderid);
            // console.log(docsInFolder);
            for (var i = 0; i < $scope.wsteps.length; i++) {
                if ($scope.wsteps[i].StepId == stepid || $scope.wsteps[i].altStepId == stepid) {
                    for (var j = 0; j < docsInFolder.length; j++) {


                        var settingsId = [];
                        var obj = $filter('filter')(vm.documents, { 'folderid': folderid });

                        if (obj.length) {
                            var obj1 = $filter('filter')(obj[0].documents, { 'documentId': Number(docsInFolder[j].documentId) });
                            if (obj1.length) {
                                settingsId = obj1[0].settings;
                            }
                        }


                        var doc_to_push = {
                            'folderId': Number(folderid),
                            'folderName': $scope.get_folder_name(folderid),
                            'documentId': Number(docsInFolder[j].documentId),
                            'name': docsInFolder[j].name,
                            'stepId': Number(stepid),
                            'index': i,
                            'setting': settingsId   // used for putting back the doc in its place if needed
                        };
                        $scope.wsteps[i].documents.push(doc_to_push);
                    }
                    // console.log("Step Documents: ", $scope.wsteps[i].documents);
                    // if the workflow new then step also is new
                    if (vm.newWorkflow) {
                        var updatedDocs = [];
                        for (var j = 0; j < $scope.wsteps[i].documents.length; j++) {
                            updatedDocs.push({
                                'folderLibrary': { 'folderId': $scope.wsteps[i].documents[j].folderId },
                                'documentLibrary': { 'documentId': $scope.wsteps[i].documents[j].documentId }
                            });
                        }

                        $scope.wsteps[i].workFlowStepsDocs = updatedDocs;
                    }

                    return true;
                }
            }
            // console.log("Looks like docs in folder are not added to step!");
            return false;
        }

        function add_kv_foreach_item_in_array(array) {
            for (var i = 0; i < array.length; i++) {
                array[i].location = 'dropzone';
            }
        }

        vm.addDocToDropZone = function (folderid, docid) {
            if (!docid) {
                // add all documents in the folder
                var tempSet = $scope.get_docs_in_folder(folderid);
                add_kv_foreach_item_in_array(tempSet);
                $scope.draggedDocs = $scope.draggedDocs.concat(tempSet);
            } else {
                // add only that document
                for (var i = 0; i < $scope.draggedDocs.length; i++) {
                    if ($scope.draggedDocs[i].documentId == docid) {
                        // ToastrService.warning("Document already attached to a step. Cannot reuse.");
                        // put the doc back in the folder list
                        vm.add_doc_or_folder_to_list({
                            'folderId': folderid,
                            'folderName': $scope.get_folder_name(folderid),
                            'documentId': docid,
                            'name': $scope.get_document_name(docid, folderid),
                            'index': get_index_of_folder_in_doclist(folderid)
                        });
                        return;
                    }
                }
                var settingsId = [];
                var obj = $filter('filter')(vm.documents, { 'folderid': folderid });

                if (obj.length) {
                    var obj1 = $filter('filter')(obj[0].documents, { 'documentId': docid });
                    if (obj1.length) {
                        settingsId = obj1[0].settings;
                    }
                }

                var isDynamicDoc = $filter('filter')(settingsId, { 'settingid': 16 }, true);

                $scope.draggedDocs.push({
                    'folderId': folderid,
                    'folderName': $scope.get_folder_name(folderid),
                    'documentId': docid,
                    'name': $scope.get_document_name(docid, folderid),
                    'location': 'dropzone',
                    'index': get_index_of_folder_in_doclist(folderid),
                    'setting': settingsId,
                    'isDynamicDoc' : isDynamicDoc.length > 0 ? true : false
                });
            }
            // console.log($scope.draggedDocs);
            return $scope.draggedDocs;
        }

        // check if the document is already in any of the steps in the workflow
        function check_if_doc_is_used_in_workflow(docid) {
            for (var i = 0; i < $scope.wsteps.length; i++) {
                // console.log($scope.wsteps[i]);
                for (var j = 0; j < $scope.wsteps[i].documents.length; j++) {
                    if ($scope.wsteps[i].documents[j].documentId == docid) {
                        return true;
                    }
                }
            }

            for (var j = 0; j < $scope.draggedDocs.length; j++) {
                if ($scope.draggedDocs[j].documentId == docid) {
                    return true;
                }
            }

            return false;
        }

        function get_index_of(stepid) {
            for (var i = 0; i < $scope.wsteps.length; i++) {
                if ($scope.wsteps[i].StepId == stepid ||
                    $scope.wsteps[i].altStepId == stepid) {
                    return $scope.wsteps.indexOf($scope.wsteps[i]);
                }
            }
        }

        function get_index_of_folder_in_doclist(folderid) {
            for (var i = 0; i < originalFoldersList.length; i++) {
                if (originalFoldersList[i].folderid == folderid) {
                    return i;
                }
            }
        }

        function get_step_data(stepid) {
            var steps = $scope.wsteps;
            for (var i = 0; i < steps.length; i++) {
                if (steps[i].StepId == stepid || steps[i].altStepId == stepid) {
                    return steps[i];
                }
            }

        }

        vm.add_doc_or_folder_to_list = function (doc) {
            // incase user removes the document / folder from drop zone
            // get doc details from original folders list
            var folderExists = false;
            var folderid = doc.folderId;
            var fname = doc.folderName;
            var docid = doc.documentId;
            var docname = doc.name;
            // console.log('doc to be added: ', doc);

            // check if folder exists
            if (!vm.documents) vm.documents = [];

            for (var i = 0; i < vm.documents.length; i++) {
                if (vm.documents[i].folderid == folderid) {
                    folderExists = true;
                }
            }

            // if the folder is non-existant then add it
            if (!folderExists) {
                var folderData = {
                    'folderid': folderid.toString(),
                    'foldername': fname,
                    'documents': [{ 'documentId': docid.toString(), 'documentName': docname }],
                    'expanded': true
                };
                if (doc.index) {
                    for (var i = 0; i < vm.documents.length; i++) {
                        if (i == doc.index) {
                            vm.documents.splice(i, 0, folderData);
                            return;
                        }
                    }
                    // if the index greater than i, it would not be found!
                    // always adding folder to top
                    // vm.documents.push(folderData);
                    vm.documents.unshift(folderData);
                } else {
                    vm.documents.unshift(folderData);
                }
                // console.log('Folder added: ', folderData);
                return;
            }
            else {
                // if folder is existing then just add the document
                for (var i = 0; i < vm.documents.length; i++) {
                    // if (vm.documents[i].folderid == folderid) {

                    var obj = $filter('filter')(vm.documents[i].documents, { 'documentId': doc.documentId });
                    if (obj.length) {
                        obj[0].disable = false;
                    }
                    //vm.documents[i].documents.unshift({'documentId': docid.toString(), 'documentName': docname});
                    // return;
                    //  }
                }
            }
        }

        vm.checkAllDocsDisabled = function (folder) {
            var allDisabled = true;
            if (folder.documents) {
                for (var i = 0; i < folder.documents.length; i++) {
                    if (!folder.documents[i].disable) {
                        allDisabled = false;
                    }
                }
                return allDisabled;

            }
        }

        function remove_doc_or_folder_from_list(folderid, docid) {
            for (var i = 0; i < vm.documents.length; i++) {
                if (vm.documents[i].folderid == folderid) {
                    if (!docid) {
                        //remove_item_from_array(vm.documents[i], vm.documents);
                        for (var j = 0; j < vm.documents[i].documents.length; j++) {
                            remove_item_from_array(vm.documents[i].documents[j], vm.documents[i].documents);

                        }
                    } else {
                        for (var j = 0; j < vm.documents[i].documents.length; j++) {
                            if (vm.documents[i].documents[j].documentId == docid) {
                                remove_item_from_array(vm.documents[i].documents[j], vm.documents[i].documents);
                            }
                        }
                    }
                }
            }
            for (var i = 0; i < vm.documents.length; i++) {
                if (vm.documents[i].folderid == folderid) {
                    if (vm.documents[i].documents.length == 0) {
                        remove_item_from_array(vm.documents[i], vm.documents);
                    }
                }
            }
        }


        function remove_item_from_array_obj_new(item, array) {
            var index = array.documents.indexOf(item);
            array.documents.splice(index, 1);

        }
        vm.remove_doc_and_add_back_new = function (doc, step, stepid) {
            // Issue 294 - Added this condition to ensure that step contains atleast one step
            // workaround for resetting step sequence
            if (step.documents.length == 1) {
                // ToastrService.error($rootScope.errorMsgs.MSG121);
                // return;
            }

            remove_item_from_array_obj_new(doc, step);
            if (step.documents.length == 0) {
                var dropzone = document.getElementById('small-drop-zone');
                if (dropzone) dropzone.style.backgroundImage = 'url(..' + rootUrl + '/images/drag_drop_doc.png)';
            }

            if (stepid && step.documents.length == 0) {
                var element = document.getElementById('docs-' + stepid);
                if (element) {
                    element.style.backgroundRepeat = 'no-repeat';
                    element.style.backgroundPosition = 'center center';
                    element.style.backgroundImage = 'url(..' + rootUrl + '/images/drag_drop_doc.png)';
                }
            }
            // add it to the sidenav
            vm.add_doc_or_folder_to_list(doc);
        }

        // if user removes a doc from step add it back to the folder / doc list
        vm.remove_doc_and_add_back = function (doc, docList, stepid) {
            // Issue 294 - Added this condition to ensure that step contains atleast one step
            // workaround for resetting step sequence
            if (docList.length == 1) {
                // ToastrService.error($rootScope.errorMsgs.MSG121);
                // return;
            }

            remove_item_from_array_obj(doc, docList);
            if (docList.length == 0) {
                var dropzone = document.getElementById('small-drop-zone');
                if (dropzone) dropzone.style.backgroundImage = 'url(..' + rootUrl + '/images/drag_drop_doc.png)';
            }

            if (stepid && docList.length == 0) {
                var element = document.getElementById('docs-' + stepid);
                if (element) {
                    element.style.backgroundRepeat = 'no-repeat';
                    element.style.backgroundPosition = 'center center';
                    element.style.backgroundImage = 'url(..' + rootUrl + '/images/drag_drop_doc.png)';
                }
            }
            // add it to the sidenav
            vm.add_doc_or_folder_to_list(doc);
        }

        vm.remove_doc_from_step_and_add_back_to_folder_list = function (doc, stepid) {
            for (var i = 0; i < $scope.wsteps.length; i++) {
                if ($scope.wsteps[i].StepId == stepid || $scope.wsteps[i].altStepId == stepid) {
                    var docList = $scope.wsteps[i].documents;
                    break;
                }
            }

            remove_item_from_array(doc, docList);
            if (docList.length == 0) {
                var dropzone = document.getElementById('small-drop-zone');
                if (dropzone) dropzone.style.backgroundImage = 'url(..' + rootUrl + '/images/drag_drop_doc.png)';
            }
            // add it to the sidenav
            vm.add_doc_or_folder_to_list(doc);
        }

        function handleDropEvent(event) {
            event.preventDefault();
            event.stopPropagation();
            var temp = null;
            var step = event.target.id;
            // console.log('Target Element: ' + step);
            step = step.split('-');
            if (!step[1]) step[1] = step[0];
            var data = event.dataTransfer.getData('Text');
            // console.log('Source Element: ' + data);
            // console.log(event.clientX,event.clientY);
            data = data.split('-');
            vm.loadMouseMove = false;

            // get the document name
            if (step[0] == 'drop' ||
                step[0] == 'step' ||
                step[0] == 'istep' ||
                step[0] == 'docs' ||
                step[0] == 'card' ||
                step[0] == 'doccard' ||
                step[0] == 'snameDiv' ||
                step[0] == 'editsfrm' ||
                step[0] == 'editsn' ||
                step[0] == 'divsd' ||
                step[0] == 'icsd' ||
                step[0] == 'editsd') {
                if (data[0] == 'fld') {
                    // console.log("Adding doc to existing Step.");
                    // update the documents array in an existing step
                    if (!check_if_doc_is_used_in_workflow(data[2])) {
                        // console.log("Doc not used in workflow. Adding.");
                        vm.addDocToStep(step[1], data[1], data[2])
                        // 23-Mar CHANDRA - remove background image after adding doc
                        var dzElem = document.getElementById('docs-' + step[1]);
                        if (dzElem) {
                            dzElem.style.backgroundImage = 'none';
                        }
                        // update the documents list
                        $scope.$apply(function () {
                            //remove_doc_or_folder_from_list(data[1], data[2]);
                            remove_doc_from_all_folders(data[2]);
                        });
                    } else {
                        // console.log("Doc already added in this workflow. Not adding again.");
                        ToastrService.warning("Document already added to this or another step. Cannot reuse.");
                        // console.log($scope.wsteps);
                    }
                    return;
                }
                else if (data[0] == 'folder' && !$scope.newStepEnabled) {
                    // ToastrService.error("You cannot place a folder on an existing step!");
                    // return;
                    // console.log("Adding docs in folder to an existing Step.");
                    var tempDraggedSet = $scope.get_docs_in_folder(data[1]);
                    // check if any docs in the folder are already attached to any step
                    // if yes, remove them
                    var newTempDraggedSet = [];
                    var dupFound = false;
                    // console.log('Before: ', tempDraggedSet);
                    for (var i = 0; i < tempDraggedSet.length; i++) {
                        if (check_if_doc_is_used_in_workflow(tempDraggedSet[i].documentId)) {
                            dupFound = true;
                            newTempDraggedSet.push(tempDraggedSet[i]);
                        }
                    }
                    // now remove duplicates
                    if (dupFound) {
                        for (var i = 0; i < newTempDraggedSet.length; i++) {
                            remove_item_from_array(newTempDraggedSet[i], tempDraggedSet);
                        }
                    }
                    // console.log('After: ', tempDraggedSet);
                    if (!dupFound) {
                        // add all docs 
                        vm.addFolderToStep(step[1], data[1]);
                        // update the folders (and docs) list
                        //remove_doc_or_folder_from_list(data[1], null);
                        for (var i = 0; i < tempDraggedSet.length; i++) {
                            //if (!check_if_doc_is_used_in_workflow(tempDraggedSet[i].documentId)) {
                            //vm.addDocToDropZone(Number(data[1]), tempDraggedSet[i].documentId);
                            //remove_doc_or_folder_from_list(data[1], tempDraggedSet[i].documentId);
                            remove_doc_from_all_folders(tempDraggedSet[i].documentId);
                            //}
                        }
                    } else {
                        //ToastrService.warning("One or more documents, of this folder, already used in this workflow. Cannot reuse.");
                        for (var i = 0; i < tempDraggedSet.length; i++) {
                            if (!check_if_doc_is_used_in_workflow(tempDraggedSet[i].documentId)) {
                                vm.addDocToStep(step[1], Number(data[1]), tempDraggedSet[i].documentId);
                                //remove_doc_or_folder_from_list(data[1], tempDraggedSet[i].documentId);

                                remove_doc_from_all_folders(tempDraggedSet[i].documentId);
                            }
                        }
                    }

                    // If for an existing / new step all docs are removed and another folder added
                    var dzElem = document.getElementById('docs-' + step[1]);
                    if (dzElem) {
                        dzElem.style.backgroundImage = 'none';
                    }

                }
                // user is trying to drag a folder
                else if (data[0] == 'folder' && $scope.newStepEnabled) {
                    // console.log("Adding docs in folder to new Step.");
                    var tempDraggedSet = $scope.get_docs_in_folder(data[1]);
                    // check if any docs in the folder are already attached to any step
                    // if yes, remove them
                    var newTempDraggedSet = [];
                    var dupFound = false;
                    for (var i = 0; i < tempDraggedSet.length; i++) {
                        if (check_if_doc_is_used_in_workflow(tempDraggedSet[i].documentId)) {
                            dupFound = true;
                            newTempDraggedSet.push(tempDraggedSet[i]);
                        }
                    }
                    // now remove duplicates
                    if (dupFound) {
                        for (var i = 0; i < newTempDraggedSet.length; i++) {
                            remove_item_from_array(newTempDraggedSet[i], tempDraggedSet);
                        }
                    }
                    // console.log('After', tempDraggedSet);
                    if (!dupFound) {
                        // add all docs 
                        vm.addFolderToStep(step[1], data[1]);
                        // update the folders (and docs) list
                        //remove_doc_or_folder_from_list(data[1], null);
                        for (var i = 0; i < tempDraggedSet.length; i++) {
                            //if (!check_if_doc_is_used_in_workflow(tempDraggedSet[i].documentId)) {
                            //vm.addDocToDropZone(Number(data[1]), tempDraggedSet[i].documentId);
                            //remove_doc_or_folder_from_list(data[1], tempDraggedSet[i].documentId);
                            remove_doc_from_all_folders(tempDraggedSet[i].documentId);
                            //}
                        }
                    } else {
                        //ToastrService.warning("One or more documents, of this folder, already used in this workflow. Cannot reuse.");
                        for (var i = 0; i < tempDraggedSet.length; i++) {
                            if (!check_if_doc_is_used_in_workflow(tempDraggedSet[i].documentId)) {
                                vm.addDocToStep(step[1], Number(data[1]), tempDraggedSet[i].documentId);
                                //remove_doc_or_folder_from_list(data[1], tempDraggedSet[i].documentId);
                                remove_doc_from_all_folders(tempDraggedSet[i].documentId);
                            }
                        }
                    }
                }

                // step reorder / swapping
                if (data[0] == 'id') {
                    // reorder handling
                    var targetStepId = Number(step[1]);
                    var sourceStepId = Number(data[1]);

                    var targetIndex = get_index_of(targetStepId);
                    var sourceIndex = get_index_of(sourceStepId);
                    // console.log("Source Index: ", sourceIndex);
                    // console.log("Target Index: ", targetIndex);
                    var tempS = get_step_data(sourceStepId);
                    // console.log(tempS);
                    var tempT = get_step_data(targetStepId);
                    // console.log(tempT);
                    if (!tempT) {
                        // console.log("Step re-order Failed!!");
                        return;
                    }
                    $scope.wsteps[sourceIndex] = tempT;
                    var sqT = tempT.sequencenumber;

                    $scope.wsteps[targetIndex] = tempS;
                    $scope.wsteps[sourceIndex].sequencenumber = tempS.sequencenumber;
                    $scope.wsteps[targetIndex].sequencenumber = sqT;
                    // console.log($scope.wsteps);

                }
                $scope.$apply();
                return;
            }
            // user is trying to drag a folder
            if (data[0] == 'folder' && $scope.newStepEnabled) {
                // console.log("Adding docs in folder to new Step.");
                var tempDraggedSet = $scope.get_docs_in_folder(data[1]);
                // check if any docs in the folder are already attached to any step
                // if yes, remove them
                var newTempDraggedSet = [];
                var dupFound = false;
                for (var i = 0; i < tempDraggedSet.length; i++) {
                    if (check_if_doc_is_used_in_workflow(tempDraggedSet[i].documentId)) {
                        dupFound = true;
                        newTempDraggedSet.push(tempDraggedSet[i]);
                    }
                }
                // now remove duplicates
                if (dupFound) {
                    for (var i = 0; i < newTempDraggedSet.length; i++) {
                        remove_item_from_array(newTempDraggedSet[i], tempDraggedSet);
                    }
                }
                // console.log('After', tempDraggedSet);
                if (!dupFound) {
                    // add all docs 
                    vm.addDocToDropZone(Number(data[1]), null);
                    // update the folders (and docs) list
                    //remove_doc_or_folder_from_list(data[1], null);
                    for (var i = 0; i < tempDraggedSet.length; i++) {
                        //if (!check_if_doc_is_used_in_workflow(tempDraggedSet[i].documentId)) {
                        vm.addDocToDropZone(Number(data[1]), tempDraggedSet[i].documentId);
                        //remove_doc_or_folder_from_list(data[1], tempDraggedSet[i].documentId);
                        remove_doc_from_all_folders(tempDraggedSet[i].documentId);
                        //}
                    }
                } else {
                    ToastrService.warning("One or more documents already used in this workflow. Cannot reuse.");
                    for (var i = 0; i < tempDraggedSet.length; i++) {
                        if (!check_if_doc_is_used_in_workflow(tempDraggedSet[i].documentId)) {
                            vm.addDocToDropZone(Number(data[1]), tempDraggedSet[i].documentId);
                            //remove_doc_or_folder_from_list(data[1], tempDraggedSet[i].documentId);
                            remove_doc_from_all_folders(tempDraggedSet[i].documentId);
                        }
                    }
                    if ($scope.draggedDocs.length == 0) {
                        var dropzone = document.getElementById('small-drop-zone');
                        if (dropzone) dropzone.style.backgroundImage = 'url(..' + rootUrl + '/images/drag_drop_doc.png)';
                    }
                }
            }
            else if (data[0] == 'fld' && $scope.newStepEnabled) {
                // adding document to a new step
                // console.log("Adding doc to new Step.");
                // check if the doc is attached to any of the steps
                // if yes, do not allow it to be added again.
                if (!check_if_doc_is_used_in_workflow(data[2])) {
                    vm.addDocToDropZone(Number(data[1]), Number(data[2]));
                    // update the documents list
                    //remove_doc_or_folder_from_list(data[1], data[2]);
                    remove_doc_from_all_folders(data[2]);
                } else {
                    ToastrService.warning("Document already used in this or another step. Cannot reuse.");
                    if ($scope.draggedDocs.length == 0) {
                        var dropzone = document.getElementById('small-drop-zone');
                        if (dropzone) dropzone.style.backgroundImage = 'url(..' + rootUrl + '/images/drag_drop_doc.png)';
                    }
                    return;
                }
            }
            else {
                // var dropzone = document.getElementById('small-drop-zone');
                // if (dropzone) dropzone.style.backgroundImage = 'url(..' + rootUrl + '/images/drag_drop_doc.png)';    
                // console.log('Drag failed!.');
                return;
            }
            // refresh the front-end
            $scope.$apply();
        }

        DocDropService.removeAllListeners();
        DocDropService.addListener(document.body, 'drop', handleDropEvent, false);



        function remove_doc_from_all_folders(docid) {
            for (var i = 0; i < vm.documents.length; i++) {
                if (!docid) {
                    //remove_item_from_array(vm.documents[i], vm.documents);
                    for (var j = 0; j < vm.documents[i].documents.length; j++) {
                        remove_item_from_array(vm.documents[i].documents[j], vm.documents[i].documents);

                    }
                } else {
                    for (var j = 0; j < vm.documents[i].documents.length; j++) {
                        if (vm.documents[i].documents[j].documentId == docid) {
                            remove_item_from_array(vm.documents[i].documents[j], vm.documents[i].documents);
                        }
                    }
                }
            }
            for (var i = 0; i < vm.documents.length; i++) {
                if (vm.documents[i].documents.length == 0) {
                    remove_item_from_array(vm.documents[i], vm.documents);
                }
            }
        }

        vm.buildNewWorkflow = function () {
            var newWsteps = [];
            var updatedDocs = [];
            // we need to strip out the 'documents' key value pair from the steps
            // before making the api request.
            for (var i = 0; i < $scope.wsteps.length; i++) {
                //if ($scope.wsteps[i].documents.length > 0) {
                updatedDocs = [];

                for (var j = 0; j < $scope.wsteps[i].documents.length; j++) {
                    updatedDocs.push({
                        'folderLibrary': { 'folderId': $scope.wsteps[i].documents[j].folderId },
                        'documentLibrary': { 'documentId': $scope.wsteps[i].documents[j].documentId }
                    });
                }
                newWsteps.push({
                    'stepName': $scope.wsteps[i].stepName,
                    'stepDesc': $scope.wsteps[i].stepDesc,
                    'isstepeditble': $scope.wsteps[i].isEditable,
                    'sequencenumber': i + 1,
                    'workFlowStepsDocs': updatedDocs
                });
                // }
            }

            // return {
            //     'workflow': {
            //         'workflowName': $scope.wfname.trim(),
            //         'commondetailsflag': $scope.workflow.commondetailsflag,
            //         'employementflag': $scope.workflow.employementflag,
            //         'addressflag': $scope.workflow.addressflag,
            //         'educationflag': $scope.workflow.educationflag,
            //         'referencesflag': $scope.workflow.referencesflag,
            //         'eeoflag': $scope.workflow.eeoflag,
            //         'ddflag': $scope.workflow.ddflag,
            //         'contractorflag': $scope.workflow.contractorflag
            //     },
            //     'stepsList': newWsteps
            // };
            return {
                'workflow': {
                    'workflowName': $scope.wfname.trim()
                },
                'webForms': vm.savedWebformsId,
                'stepsList': newWsteps
            };
        }

        // reset step sequence numbers after deleting a step
        function resetSeq(delStepSeq, stepCountBefore) {
            if (stepCountBefore > 1) {
                for (var i = 0; i < $scope.wsteps.length; i++) {
                    if (delStepSeq > $scope.wsteps[i].sequencenumber) continue;
                    var oldSeqNo = $scope.wsteps[i].sequencenumber;
                    $scope.wsteps[i].sequencenumber = oldSeqNo - 1;
                }
            }
        }


        function buildStepsData() {
            var stepsData = [];
            var updatedDocs = [];
            var stepCount = $scope.wsteps.length;
            // var seqNumber = 1;
            for (var i = 0; i < $scope.wsteps.length; i++) {
                // steps without any documents will need to be removed
                // if ($scope.wsteps[i].documents.length == 0) {
                //     // send delete step
                //     if ($scope.wsteps[i].StepId) {
                //         var deletedStepSeqNo = $scope.deleteItem($scope.wsteps[i].StepId);
                //         continue;
                //     } else {
                //         var deletedStepSeqNo = $scope.deleteItem($scope.wsteps[i].altStepId);
                //         continue;
                //     }
                // }


                for (var j = 0; j < $scope.wsteps[i].documents.length; j++) {
                    updatedDocs.push({
                        'folderLibrary': { 'folderId': $scope.wsteps[i].documents[j].folderId },
                        'documentLibrary': { 'documentId': $scope.wsteps[i].documents[j].documentId }
                    });
                }

                if ($scope.wsteps[i].stepName) $scope.wsteps[i].stepName = $scope.wsteps[i].stepName.trim();
                if (!$scope.wsteps[i].stepName || $scope.wsteps[i].stepName == '') {
                    ToastrService.error($rootScope.errorMsgs.MSG242);
                    return false;
                }

                if ($scope.wsteps[i].stepDesc) $scope.wsteps[i].stepDesc = $scope.wsteps[i].stepDesc.trim();
                if (!$scope.wsteps[i].stepDesc || $scope.wsteps[i].stepDesc == '') {
                    ToastrService.error($rootScope.errorMsgs.MSG243);
                    return false;
                }

                if (updatedDocs.length > 0) {
                    stepsData.push({
                        'workflowStepId': $scope.wsteps[i].StepId,
                        'isstepeditble': $scope.wsteps[i].isEditable,
                        'stepName': $scope.wsteps[i].stepName,
                        'stepDesc': $scope.wsteps[i].stepDesc,
                        'sequencenumber': $scope.wsteps[i].sequencenumber,
                        'workFlowStepsDocs': updatedDocs
                    });
                    // seqNumber += 1;
                }
                else if (updatedDocs.length == 0) {
                    stepsData.push({
                        'workflowStepId': $scope.wsteps[i].StepId,
                        'isstepeditble': $scope.wsteps[i].isEditable,
                        'stepName': $scope.wsteps[i].stepName,
                        'stepDesc': $scope.wsteps[i].stepDesc,
                        'sequencenumber': $scope.wsteps[i].sequencenumber,
                        'workFlowStepsDocs': []
                    });
                }
                updatedDocs = [];
            }
            return stepsData;
        }

        function editWorkflow() {
            var workflowData = {};
            var objWorkflow = {};
            objWorkflow.workflowId = vm.workflowid;
            objWorkflow.workflowName = $scope.wfname.trim();
            // objWorkflow.commondetailsflag = $scope.workflow.commondetailsflag;
            // objWorkflow.employementflag = $scope.workflow.employementflag;
            // objWorkflow.addressflag = $scope.workflow.addressflag;
            // objWorkflow.educationflag = $scope.workflow.educationflag;
            // objWorkflow.referencesflag = $scope.workflow.referencesflag;
            // objWorkflow.eeoflag = $scope.workflow.eeoflag;
            // objWorkflow.ddflag = $scope.workflow.ddflag;
            // objWorkflow.contractorflag = $scope.workflow.contractorflag;
            workflowData.workflow = objWorkflow;
            workflowData.webForms = vm.savedWebformsId;
            workflowData.stepsList = buildStepsData();
            if (!workflowData.stepsList) return;
            // console.log(workflowData);

            $scope.loading = true;
            for (var i = 0; i < workflowData.stepsList.length; i++) {
                workflowData.stepsList[i].stepDesc = workflowData.stepsList[i].stepDesc.replace(/<p style="/g, "<p style=\"margin:0;padding:0;");
                workflowData.stepsList[i].stepDesc = workflowData.stepsList[i].stepDesc.replace(/<p>/g, "<p style=\"margin:0;padding:0\">");
            }
            WorkflowService.editDynamicWorkflow(workflowData).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        ToastrService.success(response.data.message);
                        $state.go('Workflows');
                    }
                },
                function (err) {
                    // ToastrService.error('ERROR: Could not edit Workflow.');
                    ToastrService.error(err.message);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }

        function addWorkflow() {
            var hrCertify = false;
            for (var i = 0; i < $scope.wsteps.length; i++) {
                for (var j = 0; j < $scope.wsteps[i].documents.length; j++) {
                    for (var k = 0; k < $scope.wsteps[i].documents[j].setting.length; k++) {
                        if ($scope.wsteps[i].documents[j].setting[k].settingid === 2 || $scope.wsteps[i].documents[j].setting[k].settingid === 9) {
                            hrCertify = true;
                        }

                    }
                }
                $scope.wsteps[i].stepDesc = $scope.wsteps[i].stepDesc.replace(/<p style="/g, "<p style=\"margin:0;padding:0;");
                $scope.wsteps[i].stepDesc = $scope.wsteps[i].stepDesc.replace(/<p>/g, "<p style=\"margin:0;padding:0\">");
            }
            if (!hrCertify) {
                ToastrService.error($rootScope.errorMsgs.MSG175);
                return false;
            }
            var objWorkflow = vm.buildNewWorkflow();

            // return false;

            $scope.loading = true;
            WorkflowService.addDynamicWorkflow(objWorkflow).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        ToastrService.success(response.data.message);
                        $state.go('Workflows');
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG244);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }

        vm.saveWorkflow = function () {
            if (!$scope.wfname || $scope.wfname.trim() == '') {
                ToastrService.error($rootScope.errorMsgs.MSG080);
                return;
            }

            if ($scope.wsteps.length == 0) {
                ToastrService.error($rootScope.errorMsgs.MSG118);
                return;
            }

            // check if there are steps without documents
            if ($scope.wsteps.length > 0) {
                var stepsWithNoDocsCount = 0;
                for (var i = 0; i < $scope.wsteps.length; i++) {
                    if ($scope.wsteps[i].documents.length == 0) {
                        stepsWithNoDocsCount++;
                    }
                }
                // if all docs in all steps are removed ...
                if (stepsWithNoDocsCount == $scope.wsteps.length) {
                    ToastrService.warning($rootScope.errorMsgs.MSG118);
                    vm.closeDeleteModal();
                    return;
                }
            }

            if ($scope.newStepEnabled) {
                ToastrService.warning($rootScope.errorMsgs.MSG119);
                return;
            }

            var finalList = vm.masterformsList.concat(vm.otherMasterformsList);
            finalList = finalList.concat(vm.customWebformsList);
            vm.savedWebformsId = [];
            for (var k = 0; k < finalList.length; k++) {
                if (finalList[k].isChecked) {
                    vm.savedWebformsId.push(finalList[k].webFormId);
                }
                if (finalList[k].subWebForms && finalList[k].subWebForms.length > 0) {
                    for (var n = 0; n < finalList[k].subWebForms.length; n++) {
                        if (finalList[k].subWebForms[n].isChecked) {
                            vm.savedWebformsId.push(finalList[k].subWebForms[n].webFormId);
                        }
                    }
                }
            }

            if (!vm.newWorkflow) {
                // delete any steps to be deleted permanently
                var hrCertify = false;
                for (var i = 0; i < $scope.wsteps.length; i++) {
                    for (var j = 0; j < $scope.wsteps[i].documents.length; j++) {
                        for (var k = 0; k < $scope.wsteps[i].documents[j].setting.length; k++) {
                            if ($scope.wsteps[i].documents[j].setting[k].settingid === 2 || $scope.wsteps[i].documents[j].setting[k].settingid === 9) {
                                hrCertify = true;
                            }

                        }
                    }

                }
                if (!hrCertify) {
                    ToastrService.error($rootScope.errorMsgs.MSG175);
                    return false;
                }
                if ($scope.toBeDeletedSteps.length) {
                    for (var i = 0; i < $scope.toBeDeletedSteps.length; i++) {
                        $scope.loading = true;
                        var stepid = $scope.toBeDeletedSteps[i];
                        WorkflowService.delWorkflowStep(stepid).then(
                            function (response) {
                                if (response.data.Error) {
                                    $scope.toBeDeletedSteps = [];
                                    ToastrService.error(response.data.message);
                                    $scope.wsteps = angular.copy(tempStepsLoad);
                                } else {
                                    // ToastrService.success(response.data.message);
                                    editWorkflow();
                                    $scope.deleteStepsPermanently = true;
                                }
                            },
                            function (err) {
                                ToastrService.error(err.message);
                            }
                        ).finally(function () {
                            $scope.loading = false;
                        });
                    }
                } else {
                    editWorkflow();
                }


            } else {
                // for (var i = 0; i < $scope.wsteps.length; i++) {
                //     if ($scope.wsteps[i].documents.length == 0) {
                //         remove_item_from_array($scope.wsteps[i], $scope.wsteps);
                //     }
                // }
            }
            // close mdDialog, if exists?
            vm.closeDeleteModal();

            if (vm.newWorkflow)
                addWorkflow();

        }

        vm.cancelWorkflow = function () {
            $state.go('Workflows', {}, { reload: 'Workflows' });
        }

        // used during editing an existing workflow
        function getWorkflowFoldersList(workflowId) {
            $scope.loading = true;
            WorkflowService.getWorkflowFoldersList(workflowId).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        vm.documents = response.data;
                        vm.documents.shift();
                        // 30-Mar CHANDRA - This filtering is done because API is having problem doing this
                        for (var i = 0; i < vm.documents.length; i++) {
                            var mDt = vm.documents[i].modifiedDt.substring(0, 19);
                            mDt = mDt.replace(/-/g, '/');
                            vm.documents[i].modifiedDt = new Date(mDt);
                        }

                        if (vm.documents.length > 0) {
                            vm.documents = $filter('orderBy')(vm.documents, 'modifiedDt', true);
                        }
                        // console.log(vm.documents);

                        originalFoldersList = angular.copy(vm.documents);
                        // getWorkflowData(vm.workflowid);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG245);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }

        // function disableExistDocandfolder() {
        //     for (var i = 0; i < $scope.wsteps.length; i++) {
        //         for (var j = 0; j < $scope.wsteps[i].documents.length; j++) {
        //             var obj = $filter('filter')(vm.documents, { 'folderid': $scope.wsteps[i].documents[j].folderId });

        //             if (obj.length) {
        //                 obj[0].disable = false;
        //                 var obj1 = $filter('filter')(obj[0].documents, { 'documentId': $scope.wsteps[i].documents[j].documentId });
        //                 console.log(obj1);
        //                 if (obj.length) {
        //                     obj1[0].disable = true;

        //                 }
        //             }


        //             //$scope.wsteps[i].documents[j].documentId
        //         }
        //     }
        // }

        function disableExistDocandfolder() {
            for (var i = 0; i < $scope.wsteps.length; i++) {
                for (var j = 0; j < $scope.wsteps[i].documents.length; j++) {
                    for (var k = 0; k < vm.documents.length; k++) {
                        var obj = $filter('filter')(vm.documents[k].documents, { 'documentId': $scope.wsteps[i].documents[j].documentId });

                        //obj[0].disable = false;
                        if (obj && obj.length) {
                            obj[0].disable = true;
                        }

                    }


                    //$scope.wsteps[i].documents[j].documentId
                }
            }
        }

        // used during creating a new workflow
        function getNewWorkflowFoldersList() {
            $scope.innerloading = true;
            WorkflowService.getNewWorkflowFoldersList(false).then(
                function (response) {
                    $scope.innerloading = false;
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        vm.documents = response.data;
                        vm.documents.shift();
                        // 30-Mar CHANDRA - This filtering is done because API is having problem doing this
                        for (var i = 0; i < vm.documents.length; i++) {
                            var mDt = vm.documents[i].modifiedDt.substring(0, 19);
                            mDt = mDt.replace(/-/g, '/');
                            vm.documents[i].modifiedDt = new Date(mDt);
                        }
                        vm.documents = $filter('orderBy')(vm.documents, 'modifiedDt', true);
                        // console.log("New Workflow Folders: ", vm.documents);

                        originalFoldersList = angular.copy(vm.documents);
                        if ($stateParams.id) {
                            disableExistDocandfolder();
                        }
                    }
                },
                function (err) {
                    $scope.innerloading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG180);
                }
            )
        }

        // if ($stateParams.id) {
        //     getWorkflowFoldersList(vm.workflowid);
        // } else {
        //getNewWorkflowFoldersList();
        //}

        if (!$stateParams.id) {
            getNewWorkflowFoldersList();
        }

        vm.removeDoc = function (elem) {
            var div = elem.parentElement;
            div.parentElement.remove();
        }

        vm.htmlToPlaintext = function (text) {
            // return text ? String(text).replace(/<[^>]+>/gm, '') : '';
            return text ? String(text).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').replace(/&\w+;/g, 'X').replace(/^\s*/g, '').replace(/\s*$/g, '') : '';
        }

        // Browser detecction
        $scope.browserType = function () {
            if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
                vm.browserUsed = 'Opera';
                vm.workflowDocCardClass = 'wf-doc-icon-text-moz';
                vm.stepNameSize = '65';
            }
            else if (navigator.userAgent.indexOf("Chrome") != -1) {
                vm.browserUsed = 'Chrome';
                vm.workflowDocCardClass = 'wf-doc-icon-text';
                vm.stepNameSize = '68';
                if (screen.width != 1024) vm.stepDescWidth = '530px';
                if (screen.width == 1024) vm.stepNameSize = '40';
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                vm.browserUsed = 'Safari';
                vm.workflowDocCardClass = 'wf-doc-icon-text';
                vm.stepNameSize = '65';
                if (screen.width == 1024) vm.stepNameSize = '40';
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                vm.browserUsed = 'Firefox';
                vm.workflowDocCardClass = 'wf-doc-icon-text-moz';
                vm.stepNameSize = '65';
                if (screen.width == 1024) vm.stepNameSize = '40';
            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                vm.browserUsed = 'IE';
                vm.workflowDocCardClass = 'wf-doc-icon-text';
                vm.stepNameSize = '55';
                if (screen.width == 1024) vm.stepNameSize = '32';
            }
            else {
                vm.browserUsed = 'Unknown';
                vm.workflowDocCardClass = 'wf-doc-icon-text';
                vm.stepNameSize = '65';
            }
        }
        $scope.browserType();

        $scope.toggleAll = function () {
            // vm.bgvflag = true;
        };

        $scope.isIndeterminate = function () {
            return ($scope.selected.length !== 0 &&
                $scope.selected.length !== $scope.items.length);
        };

        function isChecked() {
            if (vm.bgvflag) {
                $scope.workflow.employementflag = true;
                $scope.workflow.addressflag = true;
                $scope.workflow.educationflag = true;
                $scope.workflow.referencesflag = true;
            }
            else {
                $scope.workflow.employementflag = false;
                $scope.workflow.addressflag = false;
                $scope.workflow.educationflag = false;
                $scope.workflow.referencesflag = false;
            }
        };

        function isEmpChecked() {
            if (!$scope.workflow.employementflag) {
                vm.bgvflag = false;
            }
            else if ($scope.workflow.employementflag && $scope.workflow.addressflag && $scope.workflow.educationflag && $scope.workflow.referencesflag) {
                vm.bgvflag = true;
            }
        }
        function isAddChecked() {
            if (!$scope.workflow.addressflag) {
                vm.bgvflag = false;
            }
            else if ($scope.workflow.employementflag && $scope.workflow.addressflag && $scope.workflow.educationflag && $scope.workflow.referencesflag) {
                vm.bgvflag = true;
            }
        }
        function isEduChecked() {
            if (!$scope.workflow.educationflag) {
                vm.bgvflag = false;
            }
            else if ($scope.workflow.employementflag && $scope.workflow.addressflag && $scope.workflow.educationflag && $scope.workflow.referencesflag) {
                vm.bgvflag = true;
            }
        }
        function isRefChecked() {
            if (!$scope.workflow.referencesflag) {
                vm.bgvflag = false;
            }
            else if ($scope.workflow.employementflag && $scope.workflow.addressflag && $scope.workflow.educationflag && $scope.workflow.referencesflag) {
                vm.bgvflag = true;
            }
        }

        $scope.toggleCheckbox = function (item, list) {
            // var idx = list.indexOf(item);
            // if (idx > -1) {
            //     list.splice(idx, 1);
            // }
            // else {
            //     list.push(item);
            // }
            for (var i = 0; i < $scope.items.length; i++) {
                if (item.param == $scope.items[i].param) {
                    $scope.items[i].value = $scope.items[i].value ? false : true;
                }
            }

        };

        $scope.exists = function (item, list) {
            // $scope.workflow.commondetailsflag = true;
            // $scope.workflow.employementflag = true;
            // $scope.workflow.addressflag = true;
            // $scope.workflow.educationflag = true;
            // $scope.workflow.referencesflag = true;
            // $scope.workflow.eeoflag = true;
            // $scope.workflow.ddflag = true;
            // $scope.workflow.contractorflag = true;

            return list.indexOf(item) > -1;


        };

        $scope.$watch('vm.bgvflag', function (newValue, oldValue) {
            if (vm.bgvflag) {
                $scope.workflow.employementflag = true;
                $scope.workflow.addressflag = true;
                $scope.workflow.educationflag = true;
                $scope.workflow.referencesflag = true;
            }
        });

        $scope.$watch($scope.workflow.employementflag, $scope.workflow.addressflag, $scope.workflow.educationflag, $scope.workflow.referencesflag, function (newValue, oldValue) {
            if ($scope.workflow.employementflag == false || $scope.workflow.addressflag == false || $scope.workflow.educationflag == false || $scope.workflow.referencesflag == false) {
                vm.bgvflag = false;
            }
        });

        // // $scope.$watch($event.clientY, function (newValue, oldValue) {
        // //     console.log(event.clientY);
        // // });

        // vm.scrollContent = function (event) {
        //     console.log('scroll : ' + event.clientY );
        //     vm.startButtonPosition =  event.clientY;
        //     vm.loadMouseMove = true;

        // }

        // vm.mousemove = function (event) {
        //     if(vm.loadMouseMove)
        //     console.log('mousemove : ' + event.clientY);
        //     vm.currButtonPosition = event.clientY;
        //     if(vm.startButtonPosition >  vm.currButtonPosition + 5 ){
        //         document.getElementById("cardsContent").scrollTop =  document.getElementById("cardsContent").scrollTop + ( vm.startButtonPosition - vm.currButtonPosition);
        //     }
        //     else if(vm.startButtonPosition <  vm.currButtonPosition - 5){
        //         document.getElementById("cardsContent").scrollTop =  document.getElementById("cardsContent").scrollTop + ( vm.currButtonPosition - vm.startButtonPosition);
        //     }
        // }

        $scope.browserType = function () {
            if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
                vm.stepDisplayClass = 'onboard-step-content';
            }
            else if (navigator.userAgent.indexOf("Chrome") != -1) {
                vm.stepDisplayClass = 'onboard-step-content';
                if (navigator.userAgent.indexOf("Chrome/48") != -1) {

                }
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                vm.stepDisplayClass = 'onboard-step-content';
                if (screen.width == 1024) {
                    vm.marginTopForDivCb = '30px';
                    vm.marginBtmForDivCB = '-13px';
                }

            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                vm.stepDisplayClass = 'onboard-step-content';
                if (screen.width == 1024) {
                    vm.marginTopForDivCb = '30px';
                    vm.widthDivCb = '100%';
                    vm.bgvMarginBtm = '-8px';
                    vm.eduMarginLft = '7px';
                    vm.refMarginLft = '60px';
                    vm.eeoMarginLft = '9px';
                }
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                if (navigator.userAgent.indexOf("Version/10") != -1) {
                    vm.stepDisplayClass = 'onboard-step-content-saf-11';
                    vm.sidenavclass = 'workflow-side-nav-saf-11';
                }
                if (navigator.userAgent.indexOf("Version/11") != -1) {
                    vm.stepDisplayClass = 'onboard-step-content-saf-11';
                    vm.sidenavclass = 'workflow-side-nav-saf-11';
                }
            }
            else {
                vm.stepDisplayClass = 'onboard-step-content';
            }
        }
        $scope.browserType();

        $scope.trustAsHtml = function (desc) {
            return $sce.trustAsHtml(desc);
        };

        vm.htmlToPlaintext = function (text) {
            // return text ? String(text).replace(/<[^>]+>/gm, '') : '';
            return text ? String(text).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').replace(/&\w+;/g, '').replace(/^\s*/g, '').replace(/\s*$/g, '') : '';
        }

        vm.previewStep = function (stepDetails) {
            var finalData = angular.copy(stepDetails);
            $mdDialog.show({
                templateUrl: rootUrl + "/components/workflows/add/previewStep/previewStep.html",
                locals: {
                    step: finalData
                },
                controller: ['$scope', '$rootScope', '$sce', 'ToastrService', 'step', function ($scope, $rootScope, $sce, ToastrService, step) {
                    $scope.stepDetails = step;
                    $scope.trustAsHtml = function (desc) {
                        return $sce.trustAsHtml(desc);
                    };
                    $scope.closeDeleteModal = function () {
                        $mdDialog.cancel();
                    }
                }],
                fullscreen: true// Only for -xs, -sm breakpoints.

            })
        }

        CKEDITOR.on('dialogDefinition', function (e) {
            if (e.data.name === 'link') {
                var target = e.data.definition.getContents('target');
                var options = target.get('linkTargetType').items;
                for (var i = options.length - 1; i >= 0; i--) {
                    var label = options[i][0];
                    if (!label.match(/new window/i)) {
                        options.splice(i, 1);
                    }
                }
                var targetField = target.get('linkTargetType');
                targetField['default'] = '_blank';
            }
        });

        function getDesignWebformsList() {
            DesignWebformsService.getWebformsList().then(
                function (response) {
                    if (response.data) {
                        vm.webformsList = response.data;
                        if ($stateParams.id) {
                            for (var n = 0; n < vm.webformsList.length; n++) {
                                if (vm.savedWebformsId.indexOf(vm.webformsList[n].webFormId) != -1) {
                                    vm.webformsList[n].isChecked = true;
                                }
                                else {
                                    vm.webformsList[n].isChecked = false;
                                }
                                if (vm.webformsList[n].subWebForms && vm.webformsList[n].subWebForms.length > 0) {
                                    for (var o = 0; o < vm.webformsList[n].subWebForms.length; o++) {
                                        if (vm.savedWebformsId.indexOf(vm.webformsList[n].subWebForms[o].webFormId) != -1) {
                                            vm.webformsList[n].subWebForms[o].isChecked = true;
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            for (var i = 0; i < vm.webformsList.length; i++) {
                                if (vm.webformsList[i].isCommForm) {
                                    vm.webformsList[i].isChecked = true;
                                }
                                else {
                                    vm.webformsList[i].isChecked = false;
                                }
                                if (vm.webformsList[i].subWebForms && vm.webformsList[i].subWebForms.length > 0) {
                                    for (var j = 0; j < vm.webformsList[i].subWebForms.length; j++) {
                                        vm.webformsList[i].subWebForms.isChecked = false;
                                    }
                                }
                            }
                        }
                        vm.masterformsList = angular.copy($filter('filter')(vm.webformsList, { 'isCustWebForm': false, 'isNewHireForm': false }));
                        vm.otherMasterformsList = angular.copy(vm.masterformsList.splice(2));
                        vm.customWebformsList = angular.copy($filter('filter')(vm.webformsList, { 'isCustWebForm': true }));
                        for (var a = 0; a < vm.masterformsList.length; a++) {
                            if (vm.masterformsList[a].subWebForms && vm.masterformsList[a].subWebForms.length > 0) {
                                for (var b = 0; b < vm.masterformsList[a].subWebForms.length; b++) {
                                    if (!vm.masterformsList[a].subWebForms[b].isRestored) {
                                        // delete vm.masterformsList[a].subWebForms[b];
                                        vm.masterformsList[a].subWebForms.splice(b, 1);
                                    }
                                }
                            }
                            if (!vm.masterformsList[a].isRestored && !vm.masterformsList[a].isCommForm) {
                                // delete vm.masterformsList[a];
                                vm.masterformsList.splice(a, 1);
                                // vm.masterformsList[a].splice(vm.masterformsList[a].indexOf($scope.flump), 1);
                            }
                        }
                        for (var c = 0; c < vm.otherMasterformsList.length; c++) {
                            if (!vm.otherMasterformsList[c].isRestored) {
                                vm.otherMasterformsList.splice(c, 1);
                            }
                        }
                    }
                    else {
                        ToastrService.error('An error occured while retrieving the Webforms Data');
                    }
                },
                function (err) {

                }
            )
        }

        $scope.selectChildCheckboxesOfParent = function(parentChecked){
            // masterWebform.subWebForms[$index*2].isChecked
            for (var j = 0; j < vm.masterformsList.length; j++) {
                if(vm.masterformsList[j].subWebForms){
                    for(var k = 0;k< vm.masterformsList[j].subWebForms.length ; k++){
                        vm.masterformsList[j].subWebForms[k].isChecked = !parentChecked;
                    }
                }
                // vm.webformsList[i].subWebForms.isChecked = false;
            }
        }




    }
})();
