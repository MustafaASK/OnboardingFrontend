(function () {
    'use strict';
    hrAdminApp.controller('UploadDocumentsController', uploadDocumentsController);
    uploadDocumentsController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$mdDialog', '$timeout', 'Upload', 'docid', 'folderid', 'ToastrService', 'DocLibraryService'];
    function uploadDocumentsController($rootScope, $scope, $state, $stateParams, $mdDialog, $timeout, Upload, docid, folderid, ToastrService, DocLibraryService) {

        var vm = this;
        vm.documentId = null;
        $scope.file = null;
        $scope.submitted = false;
        var rooturl = $rootScope.rootUrl;
        // vm.settings = ['HR Certification', 'Candidate Sign-off', 'External Agency Verification'];
        // vm.rules = ['Candidate Response Hrs', 'Drug Test Attendance SLA Hrs'];

        vm.hrc = 2;
        vm.eav = 3;

        vm.cancelUploadDocs = cancelUploadDocs;

        // check if user is uploading a new version or a new document
        vm.documentId = (!docid ? 0 : docid);
        vm.folderId = (!folderid ? 0 : folderid);

        function cancelUploadDocs() {
            $mdDialog.cancel();
        }

        $scope.doc_name_short = function (name) {
            if (name.length > 17) {
                name = name.substr(0, 16) + "...";
            }
            return name;
        }

        $scope.$watch('file', function () {
            // file size cannot be more than 10MB
            if ($scope.file) {
                var fileName = $scope.file[0].name.split('.');
                var fileNameLength = 0;
                for(var i=0;i < fileName.length; i++){
                    fileNameLength += fileName[i].length;
                }
                if (fileNameLength > 100) {
                    // var fileName = $scope.file[0].name.split;
                    // if (fileName[0].length > 50) {
                        ToastrService.error('The Uploaded document name should not be more than 100 characters.');
                        $scope.file = null;
                        return;
                    // }
                }
                if ($scope.file[0].size > 10 * 1024 * 1024) {
                    ToastrService.error($rootScope.errorMsgs.MSG151);
                    $scope.file = null;
                    return;
                }

                var fileDropZone = document.getElementById('file-drop-zone');
                fileDropZone.style.backgroundImage = 'none';
                // give focus to doc name element
                var docName = document.getElementById('doc_name');
                docName.focus();
            }
        });

        vm.clearFile = function () {
            $scope.file = null;
            var fileDropZone = document.getElementById('file-drop-zone');
            fileDropZone.style.backgroundImage = 'url(..' + rooturl + '/images/drag_drop.png)';
        }

        vm.remove = function (element, array) {
            var index = array.indexOf(element);
            if (index !== -1) {
                array.splice(index, 1);
            }
        }

        function getDocLibraryList() {
            DocLibraryService.getDocLibraryList().then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message)
                    } else {
                        vm.docs = response.data.documents;
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG201);
                }
            )
        }

        vm.removeAllVal = function () {
            if (vm.rOnly) {
                vm.hrc = 0;
                vm.cso = 0;
                vm.eav = 0;
            }
            else if(vm.handSign){
                vm.hrc = 2;
                vm.cso = 0;
                vm.eav = 0;
            }
            else {
                vm.hrc = 2;
                vm.eav = 3;
            }
        }

        vm.selectCso = function () {
            if (!vm.rOnly) {
                vm.cso = 1;
            }
        }

        vm.uploadDocuments = function (mpFlag) {
            $scope.submitted = true;
            if (!$scope.file) {
                ToastrService.error($rootScope.errorMsgs.MSG089);
                return;
            }

            if (!vm.docname || vm.docname.trim() == '') {
                ToastrService.error($rootScope.errorMsgs.MSG111);
                return;
            }

            if (vm.eav == 5 && !vm.cso) {
                ToastrService.error(vm.csoName + ' is requred for ' + vm.drTestAuthName);
                return;
            }

            var vfiles = $scope.file;
            if (vfiles) {
                // for (var i = 0; i < vfiles.length; i++) {
                var uploadDocsFrm = document.getElementById('uploadDocs');
                var frmData = new FormData(uploadDocsFrm);

                frmData.append('docName', vfiles[0]);
                frmData.append('documentName', vm.docname.trim());
                // Issue 245 - CHANDRA 2-APR - Updated setting Id for hrc to 2 and cso to 1
                if (vm.rOnly) { frmData.append('settingId', vm.rOnlyId); }
                if (vm.hrc) frmData.append('settingId', vm.hrc);
                if (vm.cso) frmData.append('settingId', vm.cso);
                if (vm.eav) frmData.append('settingId', vm.eav);
                if (vm.crh) frmData.append('ruleId', vm.crhId);
                if (vm.dta) frmData.append('ruleId', vm.dtaId);
                if (vm.dynamicWebForm) frmData.append('settingId', vm.dynamicWebFormId);
                if (vm.handSign) frmData.append('settingId', vm.handSignId);                 

                if (!vm.hrc && !vm.cso && !vm.eav && !vm.rOnly) frmData.append('settingId', '');
                if (!vm.crh && !vm.dta) frmData.append('ruleId', '');

                frmData.append('oldDocumentId', vm.documentId);
                // upload using api
                $scope.loading = true;
                DocLibraryService.addDocLibrary(frmData).then(
                    function (response) {
                        if (response.data.Error) {
                            ToastrService.error(response.data.message);
                        }
                        if (!response.data.Error) {
                            ToastrService.success(response.data.message);
                            // console.log(response.data);
                            var newDocId = response.data.documentId;
                            $mdDialog.cancel();

                            if (vm.dynamicWebForm) {
                                $state.go('Settings.DynamicWebForm', {
                                    'id': newDocId
                                });
                            } else {
                                if (mpFlag) {
                                    $state.go('Settings.MapFields', {
                                        'id': newDocId,
                                        'source': $state.current.name,
                                        'sourceid': vm.folderId
                                    });
                                } else {
                                    if ($state.current.name == 'Settings.Documents' ||
                                        $state.current.name == 'Settings.AddFolder' ||
                                        $state.current.name == 'Settings.EditFolder') {
                                        $state.go($state.current.name, {}, { reload: $state.current.name });
                                    }
                                }

                            }

                        }
                    },
                    function (err) {
                        ToastrService.error($rootScope.errorMsgs.MSG143);
                    }
                ).finally(function () {
                    $scope.loading = false;
                    // if (mpFlag == 'true') {
                    //     $state.go('MapFields', {id: $scope.newDocId, 
                    //                             source: $state.current.name, 
                    //                             sourceid: vm.folderId});
                    // }

                });
                // }
            } else {
                ToastrService.warning("Nothing to submit.");
            }
        }

        // view document settings master api call
        function getSettingsMasterData(docid) {
            DocLibraryService.getSettingsMaster().then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
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
                                    vm.eeoFormId = 11;
                                    vm.eeoFormName = vm.docSettingsMaster[i].name;
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

        // Browser detecction
        $scope.browserType = function () {
            if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
                vm.browserUsed = 'Opera';
                vm.workflowDocCardClass = 'wf-doc-icon-text-moz';
                vm.marginDisplayName = '-10px 0 -50px 0';
            }
            else if (navigator.userAgent.indexOf("Chrome") != -1) {
                vm.browserUsed = 'Chrome';
                vm.workflowDocCardClass = 'wf-doc-icon-text';
                vm.marginDisplayName = '-10px 0 -50px 0';
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                vm.browserUsed = 'Safari';
                vm.workflowDocCardClass = 'wf-doc-icon-text';
                vm.marginDisplayName = '-10px 0 -50px 0';
                if (navigator.userAgent.indexOf("Version/10") != -1) {
                    vm.heightofDialog = '620px';
                    vm.heightofDialogContent = '510px';
                    // vm.heightofDialogFooter = '60px' ;
                }
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                vm.browserUsed = 'Firefox';
                vm.workflowDocCardClass = 'wf-doc-icon-text-moz';
                vm.marginDisplayName = '-10px 0 -50px 0';
            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                vm.browserUsed = 'IE';
                vm.workflowDocCardClass = 'wf-doc-icon-text-moz';
                vm.marginDisplayName = '-20px 0 5px 0';
            }
            else {
                vm.browserUsed = 'Unknown';
                vm.workflowDocCardClass = 'wf-doc-icon-text';
            }
        }
        $scope.browserType();
    }
})();