(function() {
    'use strict';
    candidateApp.controller('candidateDocUploadController', candidateDocUploadController);
    candidateDocUploadController.$inject = ['$scope', '$rootScope', '$stateParams', '$location', 'ToastrService', '$mdDialog', '$http', '$timeout', 'CandidateUsersService', 'workflowid', 'docid', 'doctype', 'candidateDocId'];

    function candidateDocUploadController($scope, $rootScope, $stateParams, $location, ToastrService, $mdDialog, $http, $timeout, CandidateUsersService, workflowid, docid, doctype, candidateDocId) {


        $scope.docsList = [];
        $scope.docForm = {};

        $scope.files = [];

        $scope.files = [];
        $scope.isFileEditMode = false;
        //$scope.isCandidate = isCandidate;
        $scope.isSubDoc = doctype == 'subdoc' ? true : false;

        $scope.formData = {
            comments: ''
        };
        var addedAnyDoc = false;

        $scope.LoadFileData = function(files) {
            //$scope.docForm.comments
            var obj = {
                'file': files[0],
                'comments': 'abc'
            }
            $scope.files.push(obj);
        };


        $scope.submit = function() {
            // CandidateUsersService.candidateDocUpload().then(
            //     function (response) {
            //         if (response.data.Error) {
            //             ToastrService.error(response.data.message);
            //         }
            //         else if (response.data.success) {
            //             ToastrService.success(response.data.message);
            //         }
            //     },
            //     function (err) {
            //         ToastrService.error('ERROR: Resending Password failed.');
            //     }
            // );
            $http({
                    url: "http://192.168.1.198:8081/COB/candidatedocupload",
                    method: "POST",
                    headers: { "Content-Type": undefined },
                    transformRequest: function(data) {
                        var formData = new FormData();
                        formData.append("newHireId.newhireid", data.files[i].file);
                        formData.append("newHireWorkflowId.newHireWorkflowId", data.files[i].file);
                        formData.append("documentLibrary.documentId", data.files[i].file);


                        for (var i = 0; i < data.files.length; i++) {
                            formData.append("files[" + i + "]", data.files[i].file);
                            formData.append("comment[" + i + "]", data.files[i].comments);
                        }
                        return formData;

                    },
                    data: { files: $scope.files }
                })
                .success(function(response) {
                    // console.log(response);
                })
                .error(function(err) {
                    // console.log(err);
                });
        };

        $scope.editDoc = function(indx, doc) {
            /*$scope.indx = indx;
            $scope.docForm = angular.copy(doc);
            $scope.file = doc.file;
            $scope.isFileEditMode = true;*/
            $scope.editDocData = doc;
            $scope.file = [];
            $scope.file[0] = { 'name': doc.candidatedocname };
            $scope.isFileEditMode = true;
            $scope.formData.comments = doc.candidatedoccomments;
        }

        $scope.add = function() {

            var obj = {
                'file': $scope.file,
                'comments': $scope.docForm.comments
            }
            $scope.files.push(obj);
            $scope.file = '';
            $scope.docForm.comments = '';
        }


        $scope.update = function() {

            var obj = {
                'file': $scope.file,
                'comments': $scope.docForm.comments
            }
            $scope.files[$scope.indx] = obj;
            $scope.file = '';
            $scope.docForm.comments = '';
        }

        $scope.$watch('file', function() {
            // file size cannot be more than 10MB
            if ($scope.file && $scope.file.length) {
                // console.log($scope.file);
                if ($scope.file[0].size > 10 * 1024 * 1024) {
                    ToastrService.error($rootScope.errorMsgs.MSG151);
                    $scope.file = null;
                    return;
                }

                var fileDropZone = document.getElementById('file-drop-zone');
                fileDropZone.style.backgroundImage = 'none';
                // give focus to doc name element
                // var docName = document.getElementById('doc_name');
                // docName.focus();
            } else {

                var fileDropZone = document.getElementById('file-drop-zone');
                fileDropZone.style.backgroundImage = 'url(../images/drag_drop.png)';
            }
        });

        $scope.removeFile = function(ev) {
            ev.stopPropagation();
            $scope.file = null;
        }

        $scope.remove = function(element, array) {
            var index = array.indexOf(element);
            if (index !== -1) {
                array.splice(index, 1);
            }
        }

        $scope.deleteAttachedFile = function(id) {
            CandidateUsersService.deleteAttachedFile(id).then(
                function(response) {
                    if (response.data.Error) {}
                    if (!response.data.Error) {
                        $scope.hideModal();
                        $scope.getAttachedFiles();
                        // ToastrService.success(response.data.message);
                        addedAnyDoc = true;
                        $scope.docuploadform.$setPristine();
                        $scope.formData = {
                            comments: ' '
                        };
                        $scope.file = [];
                        $scope.isFileEditMode = false;
                    }
                },
                function(err) {
                    ToastrService.error($rootScope.errorMsgs.MSG144);
                }
            ).finally(function() {
                $scope.loading = false;

            });

        }

        $scope.getAttachedFiles = function() {
            CandidateUsersService.getAttachedFiles(workflowid, docid).then(
                function(response) {
                    if (response.data.Error) {}
                    if (!response.data.Error) {
                        $scope.attachedFilesList = response.data.attachedfiles;
                    }
                },
                function(err) {
                    ToastrService.error($rootScope.errorMsgs.MSG143);
                }
            ).finally(function() {
                $scope.loading = false;

            });

        }
        $scope.getAttachedFiles();

        $scope.updateDocument = function() {

            if (!$scope.file || !$scope.file.length) {
                ToastrService.error($rootScope.errorMsgs.MSG149);
                return false;
            }
            if (!$scope.formData.comments.trim()) {
                ToastrService.error($rootScope.errorMsgs.MSG148);
                return false;
            }

            var vfiles = $scope.file;
            if (vfiles) {
                var uploadDocsFrm = document.getElementById('docuploadform');
                var frmData = new FormData(uploadDocsFrm);
                //(vfiles[0].name).split(".")[0]




                //frmData.append('candidatedocstatus ', 0);
                frmData.append('candidatedocid ', $scope.isSubDoc ? candidateDocId : $scope.editDocData.candidatedocid);
                frmData.append('candidatedoccomments ', $scope.formData.comments);
                if (vfiles[0].size) { frmData.append('documentname', vfiles[0]); }
                frmData.append('newHireId.newhireid', $rootScope.CandidateInfo.newhireid);
                frmData.append('newHireWorkflow.newHireWorkflowId', workflowid);
                frmData.append('documentLibrary.documentId', docid);
                //console.log(frmData);

                // upload using api
                $scope.loading = true;
                CandidateUsersService.candidatedocreplace(frmData).then(
                    function(response) {
                        if (response.data.Error) {
                            ToastrService.error(response.data.message);
                        }
                        if (!response.data.Error) {
                            addedAnyDoc = true;
                            // ToastrService.success(response.data.message);
                            if (!$scope.isSubDoc) {
                                $scope.getAttachedFiles();
                                $scope.docuploadform.$setPristine();
                                $scope.formData = {
                                    comments: ' '
                                };
                                $scope.file = [];
                            } else {
                                $mdDialog.hide({ 'reload': addedAnyDoc });
                            }
                        }
                    },
                    function(err) {
                        ToastrService.error($rootScope.errorMsgs.MSG143);
                    }
                ).finally(function() {
                    $scope.loading = false;

                });
            } else {
                ToastrService.warning($rootScope.errorMsgs.MSG150);
            }

        }


        $scope.uploadDocuments = function() {
            if (!$scope.file || !$scope.file.length) {
                ToastrService.error($rootScope.errorMsgs.MSG149);
                return false;
            }
            if (!$scope.formData.comments.trim()) {
                ToastrService.error($rootScope.errorMsgs.MSG148);
                return false;
            }

            var vfiles = $scope.file;
            if (vfiles) {
                var uploadDocsFrm = document.getElementById('docuploadform');
                var frmData = new FormData(uploadDocsFrm);
                //(vfiles[0].name).split(".")[0]
                frmData.append('candidatedoccomments ', $scope.formData.comments);
                frmData.append('documentname', vfiles[0]);
                frmData.append('newHireId.newhireid', $rootScope.CandidateInfo.newhireid);
                frmData.append('newHireWorkflow.newHireWorkflowId', workflowid);
                frmData.append('documentLibrary.documentId', docid);
                //console.log(frmData);

                // upload using api
                $scope.loading = true;
                CandidateUsersService.candidateDocUpload(frmData).then(
                    function(response) {
                        if (response.data.Error) {
                            ToastrService.error(response.data.message);
                        }
                        if (!response.data.Error) {
                            // ToastrService.success(response.data.message);
                            $scope.getAttachedFiles();
                            $scope.docuploadform.$setPristine();
                            $scope.formData = {
                                comments: ''
                            };
                            $scope.file = [];
                            addedAnyDoc = true;
                        }
                    },
                    function(err) {
                        ToastrService.error($rootScope.errorMsgs.MSG143);
                    }
                ).finally(function() {
                    $scope.loading = false;

                });
            } else {
                ToastrService.warning($rootScope.errorMsgs.MSG150);
            }
        }


        $scope.closeDeleteModal = function () {
            $mdDialog.cancel();
        }


        $scope.showStepDeleteConfirm = function (ev, id) {

            $mdDialog.show({
                multiple: true,
                scope: $scope,
                preserveScope: true,
                controller: ['$scope', '$mdDialog', function($scope, $mdDialog){
                    $scope.hideModal = function(){
                        $mdDialog.hide();
                    }
                }],
                template: '<md-dialog aria-label="Delete" style="width:400px;">' +
                          '<div layout="column" layout-align="start end" style="padding:10px;">'+
                          '<ng-md-icon icon="clear" size="14" style="margin:8px 0 -23px 0;cursor:pointer" ng-click="hideModal()">'+
                          '</ng-md-icon>'+
                          '</div>'+
                          '<md-content style="background-color:white">' +
                          '<div layout="column" layout-align="center center"><img src="images/que_icon.png" width="70px" height="70px"/></div>'+
                          '<p align=center style="padding:10px 10px 20px 20px;font-size:13px;" >Are you sure you want to delete this doc?</p>' +
                          '<md-divider></md-divider>'+
                          '<div layout="row" layout-align="end center" style="background-color:rgb(250,250,250);height:60px;padding:10px" flex>' +
                          '<md-button class="md-raised md-primary" ng-click="deleteAttachedFile(' + id + ')" >OK</md-button>' +
                          '<md-button class="md-secondary" ng-click="hideModal()">Cancel</md-button>' +
                          '</div>' +
                          '</md-content>' +
                          '</md-dialog>'
                });
        }


        $scope.hide = function(ev) {
            $mdDialog.hide();
        }

        $scope.cancel = function(ev) {
            $mdDialog.cancel();
        }

        $scope.hideModal = function(answer) {
            $mdDialog.hide(answer);
        }

        $scope.answer = function(ev, answer) {
            $mdDialog.hide({ 'reload': addedAnyDoc });
        }

    }
})();