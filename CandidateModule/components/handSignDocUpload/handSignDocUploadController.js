(function () {
    'use strict';
    candidateApp.controller('MultiUploadDocsController', MultiUploadDocsController);
    MultiUploadDocsController.$inject = ['$scope', '$rootScope', '$stateParams', '$location', 'ToastrService', '$mdDialog', '$http', '$timeout', 'stepData', 'docData', 'openType', 'CandidateUsersService'];

    function MultiUploadDocsController($scope, $rootScope, $stateParams, $location, ToastrService, $mdDialog, $http, $timeout, stepData, docData, openType, CandidateUsersService) {

        var vm = this;
        var rooturl = $rootScope.rootUrl;
        var totalFileSize = 0;
        $scope.attachedFilesList = [];
        $scope.openType = openType;
        $scope.CandidateDocsURL = $rootScope.CandidateDocsURL;
        $scope.stepData = stepData;
        $scope.docData = docData;
        $scope.uploadDocuments = function () {
            $scope.loading = true;
            if (!$scope.file || !$scope.file.length) {
                ToastrService.error($rootScope.errorMsgs.MSG149);
                return false;
            }

            var vfiles = $scope.file;
            if (vfiles && vfiles.length) {
                var uploadDocsFrm = document.getElementById('docuploadform');
                var frmData = new FormData(uploadDocsFrm);
                //(vfiles[0].name).split(".")[0]
                for (var i = 0; i < vfiles.length; i++) {
                    frmData.append('documentname', vfiles[i]);
                }
                frmData.append('candidatedoccomments', '');

                frmData.append('newHireId.newhireid', $rootScope.CandidateInfo.newhireid);
                frmData.append('newHireWorkflow.newHireWorkflowId', $scope.stepData.newHireWorkFlowId);
                frmData.append('documentLibrary.documentId', $scope.docData.documentid);
                //console.log(frmData);

                // upload using api
                // console.log(frmData);
                // return false;

                CandidateUsersService.candidateDocUpload(frmData).then(
                    function (response) {
                        if (response.data.Error) {
                            ToastrService.error(response.data.message);
                        }
                        if (!response.data.Error) {
                            // ToastrService.success(response.data.message);
                            var fileDropZone = document.getElementById('file-drop-zone');
                            fileDropZone.style.backgroundImage = 'url(..' + rooturl + '/images/drag_drop.png)';
                            $scope.file = [];
                            $scope.getAttachedFiles();
                            // || $scope.docData.documentfilestatus !== 3 
                            //this is required in below condition
                            // if($scope.attachedFilesList.length > 0 && $scope.docData.documentSignStatus == 5 && ($scope.docData.documentfilestatus !== 4)){
                            //     $scope.approveAcknowledge('completed');
                            // }
                        }
                    },
                    function (err) {
                        ToastrService.error($rootScope.errorMsgs.MSG143);
                    }
                ).finally(function () {
                    $scope.loading = false;

                });
            } else {
                ToastrService.warning("Nothing to submit.");
            }
        }
        $scope.approveAcknowledge = function (type) {
            var id = (type == 'open' ? 1 : 5);
            $scope.enableAccept = true;
            var obj = {
                "newHireWorkFlowDocsId": $scope.docData.stepdocumentid,
                "newhiredocumentid": $scope.docData.documentid,
                "documentFillStatus": id,
                "documentSignStatus": id,
                "documentfilecomments": '',
                "documentName": $scope.docData.documentname,
                "newhireid": $rootScope.CandidateInfo.newhireid,
                "isreadonly" : false
            };

            CandidateUsersService.completeIt(obj).then(
                function (response) {
                    if (response.data.Success) {
                        $scope.answer(type, 'success');
                        if (id == 5) {
                            $scope.sendMail();
                        }

                    } else {
                        ToastrService.error(response.data.message);
                    }
                }, function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG146);
                });
        }
        $scope.sendMail = function () {
            var objHandSignDetails = { "newhireid": $rootScope.CandidateInfo.newhireid, "documentname": $scope.docData.documentname };
            // return;
            CandidateUsersService.sendHandSignMail(objHandSignDetails).then(
                function (response) {
                    if (response.data.Success) {


                    } else {
                        ToastrService.error(response.data.message);
                    }
                }, function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG146);
                }
            );
        }
        $scope.showStepDeleteConfirm = function (ev, id) {

            $mdDialog.show({
                multiple: true,
                scope: $scope,
                preserveScope: true,
                controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {
                    $scope.hideModal = function () {
                        $mdDialog.hide();
                    }
                }],
                template: '<md-dialog aria-label="Delete" style="width:400px;">' +
                    '<div layout="column" layout-align="start end" style="padding:10px;">' +
                    '<ng-md-icon icon="clear" size="14" style="margin:8px 0 -23px 0;cursor:pointer" ng-click="hideModal()">' +
                    '</ng-md-icon>' +
                    '</div>' +
                    '<md-content style="background-color:white">' +
                    '<div layout="column" layout-align="center center"><img src="images/que_icon.png" width="70px" height="70px"/></div>' +
                    '<p align=center style="padding:10px 10px 20px 20px;font-size:13px;" >Are you sure you want to delete this doc?</p>' +
                    '<md-divider></md-divider>' +
                    '<div layout="row" layout-align="end center" style="background-color:rgb(250,250,250);height:60px;padding:10px" flex>' +
                    '<md-button class="md-raised md-primary" ng-click="deleteAttachedFile(' + id + ')" >OK</md-button>' +
                    '<md-button class="md-secondary" ng-click="hideModal()">Cancel</md-button>' +
                    '</div>' +
                    '</md-content>' +
                    '</md-dialog>'
            });
        }
        $scope.deleteAttachedFile = function (id) {
            CandidateUsersService.deleteAttachedFile(id).then(
                function (response) {
                    if (response.data.Error) { }
                    if (!response.data.Error) {
                        $scope.hideModal();
                        $scope.getAttachedFiles();
                        // ToastrService.success(response.data.message);
                        $scope.file = [];
                        //  || $scope.stepData.stepdocumentids[$scope.record].documentfilestatus !== 3
                        // this is required below condition
                        if ($scope.attachedFilesList.length - 1 == 0 && $scope.stepData.stepdocumentids[0].documentSignStatus !== 5 && ($scope.stepData.stepdocumentids[0].documentfilestatus !== 4 && $scope.stepData.stepdocumentids[0].documentfilestatus !== 3)) {
                            $scope.approveAcknowledge('open')
                        }
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG144);
                }
            ).finally(function () {
                $scope.loading = false;

            });

        }
        $scope.getAttachedFiles = function () {
            CandidateUsersService.getAttachedFiles($scope.stepData.newHireWorkFlowId, $scope.docData.documentid).then(
                function (response) {
                    if (response.data.Error) { }
                    if (!response.data.Error) {
                        $scope.attachedFilesList = response.data.attachedfiles;
                        totalFileSize = 0;
                        for (var i = 0; i < $scope.attachedFilesList.length; i++) {
                            totalFileSize = totalFileSize + $scope.attachedFilesList[i].filesize;
                        }
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG143);
                }
            ).finally(function () {
                $scope.loading = false;

            });

        }
        //if($scope.openType == 'view'){
        $scope.getAttachedFiles();
        //}

        //$scope.getAttachedFiles();

        $scope.$watch('file', function () {
            // file size cannot be more than 10MB
            // if ($scope.file) {
            //     var fileName = $scope.file[0].name.split('.');
            //     var fileNameLength = 0;
            //     for(var i=0;i < fileName.length; i++){
            //         fileNameLength += fileName[i].length;
            //     }
            //     if (fileNameLength > 100) {
            //         // var fileName = $scope.file[0].name.split;
            //         // if (fileName[0].length > 50) {
            //             ToastrService.error('The Uploaded document name should not be more than 100 characters.');
            //             $scope.file = null;
            //             return;
            //         // }
            //     }
            //     if ($scope.file[0].size > 10 * 1024 * 1024) {
            //         ToastrService.error($rootScope.errorMsgs.MSG151);
            //         $scope.file = null;
            //         return;
            //     }

            //     var fileDropZone = document.getElementById('file-drop-zone');
            //     fileDropZone.style.backgroundImage = 'none';
            //     // give focus to doc name element
            //     var docName = document.getElementById('doc_name');
            //     docName.focus();
            // }

            if ($scope.file && $scope.file.length) {
                // console.log($scope.file);
                var allsize = totalFileSize;
                for (var i = 0; i < $scope.file.length; i++) {
                    allsize = allsize + ($scope.file[i].size / 1024);
                }
                if (allsize > 20 * 1024) {
                    ToastrService.error($rootScope.errorMsgs.MSG269);
                    $scope.file = null;
                    return;
                }
                //isNewFileUploaded = true;
                var fileDropZone = document.getElementById('file-drop-zone');
                fileDropZone.style.backgroundImage = 'none';
                $scope.uploadDocuments();
                //give focus to doc name element
                // var docName = document.getElementById('doc_name');
                // docName.focus();
            } else {

                var fileDropZone = document.getElementById('file-drop-zone');
                if (fileDropZone) fileDropZone.style.backgroundImage = 'url(..' + rooturl + '/images/drag_drop.png)';
            }
        });

        $scope.removeFile = function () {
            $scope.file = null;
            var fileDropZone = document.getElementById('file-drop-zone');
            fileDropZone.style.backgroundImage = 'url(..' + rooturl + '/images/drag_drop.png)';
        }

        $scope.hide = function (ev) {
            $mdDialog.hide();
        }

        $scope.cancel = function (ev) {
            $mdDialog.cancel();
        }

        $scope.answer = function (ev, answer) {
            $mdDialog.hide(answer);
        }

    }
})();