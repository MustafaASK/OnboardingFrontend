(function () {
    'use strict';
    candidateApp.controller('CandidateDashboardController', CandidateDashboardController);
    CandidateDashboardController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$location', 'ToastrService', '$mdDialog', '$filter', '$timeout', 'CandidateUsersService', '$sce'];

    function CandidateDashboardController($scope, $rootScope, $state, $stateParams, $location, ToastrService, $mdDialog, $filter, $timeout, CandidateUsersService, $sce) {


        var vm = this;
        var allDosCompletedFormModal = false;        

        $rootScope.dashboardEnabled = true;
        vm.docStatuses = [{ "status": 1, "data": "view" }, { "status": 2, "data": "approve" }, { "status": 3, "data": "reject" }, { "status": 4, "data": "replace" }];
        vm.stepsData = [];
        $scope.loadingLoaderDB = false;

        var rooturl = $rootScope.rootUrl;

        vm.indexlocation = 0;

        $rootScope.$emit('DashpoardPageUpdated', true);
        vm.getReview = function () {
            $scope.loadingLoaderDB = true;
            CandidateUsersService.getReview($rootScope.CandidateInfo.newhireid).then(
                function (response) {
                    $scope.loadingLoaderDB = false;
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        vm.stepsData = response.data.steps;
                        $scope.signedOfferLetterUrl = $rootScope.SignedOfferLetterURL + $rootScope.CandidateInfo.newhireid + '/' + response.data.Offer_LetterId + '/' + response.data.Offer_LetterId + '.pdf';
                        var alldocsdone = true;
                        angular.forEach(vm.stepsData, function (val, key) {
                            angular.forEach(val.stepdocumentids, function (val1, key1) {
                                // if(val1.settingId.indexOf(9) !== -1 && val1.documentSignStatus === 5 && !val1.candidateattachfiles.length){
                                //     //val1.documentSignStatus = 1;
                                //     val1.documentfilestatus = 1;
                                // }
                                if (val1.documentfilestatus == 3 || val1.documentfilestatus == 4 || val1.documentSignStatus === 5) {
                                    $rootScope.atleastOneDocCompleted = true;
                                    localStorage.setItem('atleastOneDocCompleted', true);
                                }
                                // || !val1.candidateattachfiles.length
                                if (val1.settingId.indexOf(9) !== -1 && (val1.documentSignStatus !== 5)) {
                                    alldocsdone = false;
                                }
                                if (val1.settingId.indexOf(2) !== -1 && (val1.documentSignStatus !== 5)) {
                                    alldocsdone = false;
                                }
                                if (val1.settingId.indexOf(7) !== -1 && (val1.documentSignStatus !== 5)) {
                                    alldocsdone = false;
                                }

                            });


                        });
                        if (alldocsdone && allDosCompletedFormModal) {
                            $scope.sendMailCompletedAllDocs();
                            $scope.showSuccessForCompletedAllDocs();
                            allDosCompletedFormModal = false;
                        }
                        
                        if (localStorage.getItem("docedit")) {

                            var stepdataopen = JSON.parse(localStorage.getItem("docedit"));
                            vm.indexlocation = JSON.parse(localStorage.getItem("indexlocation"));
                            localStorage.removeItem('docedit');

                            var singleDoc = angular.copy(stepdataopen);
                            //singleDoc.stepdocumentids = [];
                            //singleDoc.stepdocumentids.push(stepdataopen.stepdocumentids[localStorage.getItem("bgvedit")]);
                            vm.openLetter(null, singleDoc);
                            localStorage.removeItem('indexlocation');
                            localStorage.removeItem('docedit');
                        }
                        // if (localStorage.getItem("bgvedit") && localStorage.getItem("frombgv")) {

                        //     var stepdataopen = JSON.parse(localStorage.getItem("bgvedit"));
                        //     vm.indexlocation = JSON.parse(localStorage.getItem("indexlocation"));
                        //     localStorage.removeItem('bgvedit');

                        //     var singleDoc = angular.copy(stepdataopen);
                        //     //singleDoc.stepdocumentids = [];
                        //     //singleDoc.stepdocumentids.push(stepdataopen.stepdocumentids[localStorage.getItem("bgvedit")]);
                        //     vm.openLetter(null, singleDoc);
                        //     localStorage.removeItem('indexlocation');
                        //     localStorage.removeItem('frombgv');
                        // }
                        // if (localStorage.getItem("contractoredit") && localStorage.getItem("fromcontractor")) {

                        //     var stepdataopen = JSON.parse(localStorage.getItem("contractoredit"));
                        //     vm.indexlocation = JSON.parse(localStorage.getItem("indexlocation"));
                        //     localStorage.removeItem('contractoredit');

                        //     var singleDoc = angular.copy(stepdataopen);
                        //     //singleDoc.stepdocumentids = [];
                        //     //singleDoc.stepdocumentids.push(stepdataopen.stepdocumentids[localStorage.getItem("bgvedit")]);
                        //     vm.openLetter(null, singleDoc);
                        //     localStorage.removeItem('indexlocation');
                        //     localStorage.removeItem('fromcontractor');
                        // }
                        // if (localStorage.getItem("payrolledit") && localStorage.getItem("frompayroll")) {

                        //     var stepdataopen = JSON.parse(localStorage.getItem("payrolledit"));
                        //     vm.indexlocation = JSON.parse(localStorage.getItem("indexlocation"));
                        //     localStorage.removeItem('payrolledit');

                        //     var singleDoc = angular.copy(stepdataopen);
                        //     //singleDoc.stepdocumentids = [];
                        //     //singleDoc.stepdocumentids.push(stepdataopen.stepdocumentids[localStorage.getItem("bgvedit")]);
                        //     vm.openLetter(null, singleDoc);
                        //     localStorage.removeItem('indexlocation');
                        //     localStorage.removeItem('frompayroll');
                        // }
                        // if (localStorage.getItem("eeoedit") && localStorage.getItem("fromeeo")) {

                        //     var stepdataopen = JSON.parse(localStorage.getItem("eeoedit"));
                        //     vm.indexlocation = JSON.parse(localStorage.getItem("indexlocation"));
                        //     localStorage.removeItem('eeoedit');

                        //     var singleDoc = angular.copy(stepdataopen);
                        //     //singleDoc.stepdocumentids = [];
                        //     //singleDoc.stepdocumentids.push(stepdataopen.stepdocumentids[localStorage.getItem("bgvedit")]);
                        //     vm.openLetter(null, singleDoc);
                        //     localStorage.removeItem('indexlocation');
                        //     localStorage.removeItem('fromeeo');
                        // }
                        // if (localStorage.getItem("clientspecificedit") && localStorage.getItem("fromclientspecific")) {

                        //     var stepdataopen = JSON.parse(localStorage.getItem("clientspecificedit"));
                        //     vm.indexlocation = JSON.parse(localStorage.getItem("indexlocation"));
                        //     localStorage.removeItem('clientspecificedit');

                        //     var singleDoc = angular.copy(stepdataopen);
                        //     //singleDoc.stepdocumentids = [];
                        //     //singleDoc.stepdocumentids.push(stepdataopen.stepdocumentids[localStorage.getItem("bgvedit")]);
                        //     vm.openLetter(null, singleDoc);
                        //     localStorage.removeItem('indexlocation');
                        //     localStorage.removeItem('fromclientspecific');
                        // }
                        // if (localStorage.getItem("w4edit") && localStorage.getItem("fromw4")) {

                        //     var stepdataopen = JSON.parse(localStorage.getItem("w4edit"));
                        //     vm.indexlocation = JSON.parse(localStorage.getItem("indexlocation"));
                        //     localStorage.removeItem('w4edit');

                        //     var singleDoc = angular.copy(stepdataopen);
                        //     //singleDoc.stepdocumentids = [];
                        //     //singleDoc.stepdocumentids.push(stepdataopen.stepdocumentids[localStorage.getItem("bgvedit")]);
                        //     vm.openLetter(null, singleDoc);
                        //     localStorage.removeItem('indexlocation');
                        //     localStorage.removeItem('fromw4');
                        // }
                        // if (localStorage.getItem("drugedit") && localStorage.getItem("fromdrug")) {

                        //     var stepdataopen = JSON.parse(localStorage.getItem("drugedit"));
                        //     vm.indexlocation = JSON.parse(localStorage.getItem("indexlocation"));
                        //     localStorage.removeItem('drugedit');

                        //     var singleDoc = angular.copy(stepdataopen);
                        //     //singleDoc.stepdocumentids = [];
                        //     //singleDoc.stepdocumentids.push(stepdataopen.stepdocumentids[localStorage.getItem("bgvedit")]);
                        //     vm.openLetter(null, singleDoc);
                        //     localStorage.removeItem('indexlocation');
                        //     localStorage.removeItem('fromdrug');
                        // }

                    }
                },
                function (err) {
                    $scope.loadingLoaderDB = false;
                    ToastrService.error($rootScope.errorMsgs.MSG145);
                }
            ).finally(function () {
                $scope.loadingLoaderDB = false;
                $scope.loading = false;
            });
        }

        vm.getReview();

        $scope.sendMailCompletedAllDocs = function () {
            CandidateUsersService.sendMailCompletedAllDocs($rootScope.CandidateInfo.newhireid).then(
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

        $scope.checkAllDocsCompleted = function (step) {
            var completed = true;
            for (var i = 0; i < step.stepdocumentids.length; i++) {
                // if((step.stepdocumentids[i].documentfilestatus == 2) || (step.stepdocumentids[i].documentSignStatus !== 5 && (step.stepdocumentids[i].documentfilestatus !== 3 && step.stepdocumentids[i].documentfilestatus !== 4))){

                // && (step.stepdocumentids[i].documentfilestatus !== 3 && step.stepdocumentids[i].documentfilestatus !== 4)
                // || (step.stepdocumentids[i].documentSignStatus == 5 && step.stepdocumentids[i].indexOf(9) !== -1 && step.stepdocumentids[i].candidateattachfiles.length)
                // if(step.stepdocumentids[i].documentSignStatus !== 5 && ( step.stepdocumentids[i].documentfilestatus == 1 || step.stepdocumentids[i].documentfilestatus == 3 || step.stepdocumentids[i].documentfilestatus == 4)){
                if (step.stepdocumentids[i].settingId.indexOf(15) === -1 && step.stepdocumentids[i].documentfilestatus === 1) {
                    completed = false;
                    break;
                }
                // if(step.stepdocumentids[i].settingId.indexOf(15) !== -1){

                // }
            }
            return completed;

        }
        vm.openDocLetter = function (event, step, $index) {

            localStorage.removeItem('bgvedit');
            localStorage.removeItem('eeoedit');
            localStorage.removeItem('payrolledit');
            localStorage.removeItem('contractoredit');
            localStorage.removeItem('clientspecificedit');
            localStorage.removeItem('w4edit');
            localStorage.removeItem('drugedit');
            localStorage.removeItem('indexlocation');
            localStorage.removeItem('docedit');
            var doccopy = '';
            if (step.stepdocumentids[$index].settingId.indexOf(3) !== -1 || step.stepdocumentids[$index].settingId.indexOf(5) !== -1 || step.stepdocumentids[$index].settingId.indexOf(10) !== -1 || step.stepdocumentids[$index].settingId.indexOf(11) !== -1 || step.stepdocumentids[$index].settingId.indexOf(12) !== -1 || step.stepdocumentids[$index].settingId.indexOf(13) !== -1 || step.stepdocumentids[$index].settingId.indexOf(14) !== -1 || step.stepdocumentids[$index].settingId.indexOf(16) !== -1) {
                // localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
                doccopy = angular.copy(step.stepdocumentids[$index]);
                step.stepdocumentids = [];
                step.stepdocumentids.push(doccopy);

                localStorage.setItem("docedit", JSON.stringify(step));
                localStorage.setItem("indexlocation", $index);
                //$state.go('candidateinfo.bgvforms');
                $state.go('candidateinfo');
            } else {
                var singleDoc = angular.copy(step);
                singleDoc.stepdocumentids = [];
                singleDoc.stepdocumentids.push(step.stepdocumentids[$index]);
                vm.openLetter(event, singleDoc);
            }
            // if (step.stepdocumentids[$index].settingId.indexOf(3) !== -1) {
            //     // localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
            //     doccopy = angular.copy(step.stepdocumentids[$index]);
            //     step.stepdocumentids = [];
            //     step.stepdocumentids.push(doccopy);

            //     localStorage.setItem("bgvedit", JSON.stringify(step));
            //     localStorage.setItem("indexlocation", $index);
            //     //$state.go('candidateinfo.bgvforms');
            //     $state.go('candidateinfo.commondetails');
            // }
            // else if (step.stepdocumentids[$index].settingId.indexOf(11) !== -1) {
            //     // localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
            //     doccopy = angular.copy(step.stepdocumentids[$index]);
            //     step.stepdocumentids = [];
            //     step.stepdocumentids.push(doccopy);


            //     localStorage.setItem("eeoedit", JSON.stringify(step));
            //     localStorage.setItem("indexlocation", $index);
            //     // $state.go('candidateinfo.eeo');
            //     $state.go('candidateinfo.commondetails');
            // } else if (step.stepdocumentids[$index].settingId.indexOf(10) !== -1) {
            //     // localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
            //     doccopy = angular.copy(step.stepdocumentids[$index]);
            //     step.stepdocumentids = [];
            //     step.stepdocumentids.push(doccopy);


            //     localStorage.setItem("payrolledit", JSON.stringify(step));
            //     localStorage.setItem("indexlocation", $index);
            //     // $state.go('candidateinfo.payrollpackage');
            //     $state.go('candidateinfo.commondetails');
            // } else if (step.stepdocumentids[$index].settingId.indexOf(12) !== -1) {
            //     // localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
            //     doccopy = angular.copy(step.stepdocumentids[$index]);
            //     step.stepdocumentids = [];
            //     step.stepdocumentids.push(doccopy);


            //     localStorage.setItem("contractoredit", JSON.stringify(step));
            //     localStorage.setItem("indexlocation", $index);
            //     // $state.go('candidateinfo.contractorinfo');
            //     $state.go('candidateinfo.commondetails');
            // } else if (step.stepdocumentids[$index].settingId.indexOf(13) !== -1) {
            //     // localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
            //     doccopy = angular.copy(step.stepdocumentids[$index]);
            //     step.stepdocumentids = [];
            //     step.stepdocumentids.push(doccopy);


            //     localStorage.setItem("clientspecificedit", JSON.stringify(step));
            //     localStorage.setItem("indexlocation", $index);
            //     // $state.go('candidateinfo.contractorinfo');
            //     $state.go('candidateinfo.commondetails');
            // } else if (step.stepdocumentids[$index].settingId.indexOf(14) !== -1) {
            //     // localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
            //     doccopy = angular.copy(step.stepdocumentids[$index]);
            //     step.stepdocumentids = [];
            //     step.stepdocumentids.push(doccopy);


            //     localStorage.setItem("w4edit", JSON.stringify(step));
            //     localStorage.setItem("indexlocation", $index);
            //     // $state.go('candidateinfo.contractorinfo');
            //     $state.go('candidateinfo.commondetails');
            // } else if (step.stepdocumentids[$index].settingId.indexOf(5) !== -1) {
            //     doccopy = angular.copy(step.stepdocumentids[$index]);
            //     step.stepdocumentids = [];
            //     step.stepdocumentids.push(doccopy);


            //     localStorage.setItem("drugedit", JSON.stringify(step));
            //     localStorage.setItem("indexlocation", $index);
            //     $state.go('candidateinfo.commondetails');
            // } else {
            //     var singleDoc = angular.copy(step);
            //     singleDoc.stepdocumentids = [];
            //     singleDoc.stepdocumentids.push(step.stepdocumentids[$index]);
            //     vm.openLetter(event, singleDoc);
            // }

        }

        vm.openPendingDoc = function (event, step, $index) {
            var singleDoc = angular.copy(step);
            singleDoc.stepdocumentids = [];
            singleDoc.stepdocumentids.push(step.stepdocumentids[$index]);
            vm.openLetter(event, singleDoc);

        }
        vm.openSingleLetter = function (ev, step) {
            // if(step.workflowstepstatus == 5 || $scope.disableAll){
            //     return false;
            // }
            var finalSteps = '';
            finalSteps = angular.copy(step);
            finalSteps.stepdocumentids = [];
            for (var i = 0; i < step.stepdocumentids.length; i++) {
                // && (step.stepdocumentids[i].documentfilestatus == 3 || step.stepdocumentids[i].documentfilestatus == 4)
                if (i == vm.indexlocation) {
                    finalSteps.stepdocumentids.push(step.stepdocumentids[i]);
                }
            }
            vm.openLetter(ev, finalSteps);
        }

        vm.openHandSignUpload = function (ev, step, docs, type) {
            //docData: doc, stepInfo: step, AnyOneRejected: $scope.disableAll
            var stepData = angular.copy(step);
            var docData = angular.copy(docs);
            $mdDialog.show({
                templateUrl: 'components/handSignDocUpload/handSignDocUpload.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                locals: { stepData: stepData, docData: docData, openType: type },
                controller: 'MultiUploadDocsController'
            })
                .then(function (answer) {
                    if (answer === 'success') {
                        allDosCompletedFormModal = true;
                        vm.getReview();
                    }
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        }

        vm.openLetter = function (ev, step) {
            // if(step.workflowstepstatus == 5 || $scope.disableAll){
            //     return false;
            // }
            var finalSteps = '';
            finalSteps = angular.copy(step);
            finalSteps.stepdocumentids = [];
            for (var i = 0; i < step.stepdocumentids.length; i++) {
                // && (step.stepdocumentids[i].documentfilestatus == 3 || step.stepdocumentids[i].documentfilestatus == 4)
                // && step.stepdocumentids[i].settingId.indexOf(15) == -1
                if ((step.stepdocumentids[i].documentSignStatus !== 5 || step.stepdocumentids[i].documentfilestatus == 1)) {
                    finalSteps.stepdocumentids.push(step.stepdocumentids[i]);
                }
            }



            $mdDialog.show({
                templateUrl: 'components/candidateLetter.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                locals: { workflowid: step.newHireWorkFlowId, steps: finalSteps },
                controller: ['$scope', '$sce', '$mdDialog', '$rootScope', '$timeout', 'CandidateUsersService', 'workflowid', 'steps', function ($scope, $sce, $mdDialog, $rootScope, $timeout, CandidateUsersService, workflowid, steps) {

                    var vm = this;
                    var isNewFileUploaded = false;
                    $scope.addressOptions = { "getType": "address", "watchEnter": false };
                    $scope.adobeSignExpiredSession = $rootScope.rootUrl + '/images/adobe_sign_expired.jpg'

                    $scope.DocsURL = $rootScope.DocsURL;
                    $scope.disableNextBtns = true;
                    $scope.workflowid = workflowid;
                    $scope.isChecked = false;
                    $scope.enableAccept = true;
                    $scope.disableSubmit = true;
                    $scope.loadingLoader = true;
                    $scope.CandidateDocsURL = $rootScope.CandidateDocsURL;
                    // function getNonCompletedDocs(){
                    //     for(var i=0; i<steps.stepdocumentids.length; i++){
                    //         if(steps.stepdocumentids[i].documentfilestatus != 5 || steps.stepdocumentids[i].documentfilestatus != 2){
                    //             $scope.stepData.push(steps.stepdocumentids[i]);
                    //         }
                    //     }
                    // }
                    // getNonCompletedDocs();

                    /* hand sign */
                    $scope.openType = 'upload';
                    /* close hand sign */

                    $scope.stepData = angular.copy(steps);
                    $scope.record = 0;
                    $scope.hide = function (ev) {
                        $mdDialog.hide();
                    }

                    $scope.cancel = function (ev) {
                        $mdDialog.cancel();
                    }

                    $scope.answer = function (ev, answer) {
                        $mdDialog.hide(answer);
                    }

                    $scope.closeModal = function (ev) {
                        $mdDialog.hide({ 'success': true });
                    }

                    $scope.trustSrc = function (src) {
                        return $sce.trustAsResourceUrl(src);
                    }

                    $scope.goBack = function () {
                        $scope.record = $scope.record - 1;
                        $scope.openUploadEchoSign()
                    }

                    $scope.goNext = function () {
                        $scope.disableSubmit = true;
                        $scope.submitted = false;
                        
                        $scope.redirecturlSigned = '';
                        $scope.isChecked = false;
                        $scope.enableAccept = true;
                        $scope.attachedFilesList = [];


                        if ($scope.stepData.stepdocumentids.length == $scope.record + 1) {
                            $scope.closeModal();
                        } else {
                            $scope.record = $scope.record + 1;
                            if ($scope.stepData.stepdocumentids[$scope.record].settingId.indexOf(16) != -1) {
                                $scope.isWebForm = true;
                                $scope.isDocument = false; 
                                $scope.formFields = [];   
                                $scope.getJsonDocumentWebforms();
                            }
                            else if ($scope.stepData.stepdocumentids[$scope.record].settingId.indexOf(7) != -1) {
                                $scope.isWebForm = false;
                                $scope.isDocument = true;
                                $scope.openUploadEchoSign();
                            }
                            else {
                                $scope.isWebForm = false;
                                $scope.isDocument = true;
                                $scope.openUploadEchoSign();
                                $scope.getAttachedFiles();
                            }
                        }

                    }

                    $scope.checkDocExtension = function (docName) {
                        if (docName) {
                            var docExt = docName.split('.');
                            return docExt[docExt.length - 1];
                        }
                    }

                    $scope.saveWebForm = function () {
                        var allFormFields = angular.copy($scope.formFields);
                        for (var i = 0; i < allFormFields.length; i++) {
                            if (allFormFields[i].inputType == 'date' && allFormFields[i].value) {
                                // var dateFormat = allFormFields[i].value;
                                var momentObj = moment(allFormFields[i].value);
                                momentObj = momentObj.format("MM/DD/YYYY");
                                allFormFields[i].value = momentObj;
                            }
                        }
                        for (var i = 0; i < controlsNotToBeCleared.length; i++) {
                            for (var j = 0; j < allFormFields.length; j++) {
                                if(allFormFields[j].name == controlsNotToBeCleared[i]){
                                    allFormFields[j].value = '';
                                    allFormFields[j].isUpdated = false;
                                }
                            }
                        }
                        var jsonWebFormData = { 'components': allFormFields };
                        CandidateUsersService.saveJsonDocWebForm(jsonWebFormData, $rootScope.CandidateInfo.newhireid, $scope.stepData.newHireWorkFlowId, $scope.stepData.stepdocumentids[$scope.record].documentid).then(
                            function (response) {
                                if (response.data.Error) { }
                                if (!response.data.Error) {
                                    $scope.formFields = [];  
                                    $scope.openUploadEchoSign();
                                    $scope.isWebForm = false;
                                    $scope.isDocument = true;
                                }
                            },
                            function (err) {
                                // ToastrService.error($rootScope.errorMsgs.MSG143);
                            }
                        ).finally(function () {
                            $scope.loading = false;
                        });
                    }

                    $scope.toggleAcceptBtn = function () {
                        // console.log($scope.isChecked);
                        $scope.enableAccept = !$scope.enableAccept;
                    }
                    $scope.getAttachedFiles = function () {
                        CandidateUsersService.getAttachedFiles($scope.stepData.newHireWorkFlowId, $scope.stepData.stepdocumentids[$scope.record].documentid).then(
                            function (response) {
                                if (response.data.Error) { }
                                if (!response.data.Error) {
                                    $scope.attachedFilesList = response.data.attachedfiles;
                                    // && $scope.stepData.stepdocumentids[$scope.record].documentfilestatus !== 4  && $scope.stepData.stepdocumentids[$scope.record].documentfilestatus !== 3
                                    if (isNewFileUploaded && $scope.attachedFilesList.length > 0 && $scope.stepData.stepdocumentids[$scope.record].documentSignStatus == 5) {
                                        $scope.approveAcknowledge('completed');
                                        isNewFileUploaded = false;
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

                    $scope.getAttachedFiles();

                    $scope.uploadDocuments = function () {
                        if (!$scope.file || !$scope.file.length) {
                            ToastrService.error($rootScope.errorMsgs.MSG149);
                            return false;
                        }

                        var vfiles = $scope.file;
                        if (vfiles) {
                            var uploadDocsFrm = document.getElementById('docuploadform');
                            var frmData = new FormData(uploadDocsFrm);
                            //(vfiles[0].name).split(".")[0]
                            frmData.append('candidatedoccomments', '');

                            // frmData.append('documentname', vfiles[0]);
                            if (vfiles.length > 0) {
                                for (var i = 0; i < vfiles.length; i++) {
                                    frmData.append('documentname', vfiles[i]);
                                }
                            }
                            frmData.append('newHireId.newhireid', $rootScope.CandidateInfo.newhireid);
                            frmData.append('newHireWorkflow.newHireWorkflowId', $scope.stepData.newHireWorkFlowId);
                            frmData.append('documentLibrary.documentId', $scope.stepData.stepdocumentids[$scope.record].documentid);
                            //console.log(frmData);

                            // upload using api
                            $scope.loading = true;
                            $scope.loadingLoader = true;
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
                                        // || $scope.stepData.stepdocumentids[$scope.record].documentfilestatus !== 3 
                                        //this is required in below condition
                                        if ($scope.attachedFilesList.length > 0 && $scope.stepData.stepdocumentids[$scope.record].documentSignStatus == 5 && ($scope.stepData.stepdocumentids[$scope.record].documentfilestatus !== 4)) {
                                            $scope.approveAcknowledge('completed');
                                        }
                                    }
                                },
                                function (err) {
                                    ToastrService.error($rootScope.errorMsgs.MSG143);
                                }
                            ).finally(function () {
                                $scope.loading = false;
                                $scope.loadingLoader = false;

                            });
                        } else {
                            ToastrService.warning("Nothing to submit.");
                        }
                    }
                    //$scope.redirecturl = 'http://192.168.1.198:9000/OnBoarding/Echosign/20839/3505/6452.pdf';
                    $scope.approveAcknowledge = function (type) {
                        var id = (type == 'open' ? 1 : 5);
                        $scope.enableAccept = true;
                        $scope.isChecked = false;
                        var obj = {
                            "newHireWorkFlowDocsId": $scope.stepData.stepdocumentids[$scope.record].stepdocumentid,
                            "newhiredocumentid": $scope.stepData.stepdocumentids[$scope.record].documentid,
                            "documentFillStatus": id,
                            "documentSignStatus": id,
                            "documentName": $scope.stepData.stepdocumentids[$scope.record].documentname,
                            "newhireid": $rootScope.CandidateInfo.newhireid,
                            "isreadonly": true
                        };
                        CandidateUsersService.completeIt(obj).then(
                            function (response) {
                                if (response.data.Success) {
                                    //ToastrService.success(response.data.message);   
                                    if ($scope.stepData.stepdocumentids[$scope.record].settingId.indexOf(9) === -1) {
                                        if ($scope.stepData.stepdocumentids.length > $scope.record + 1 && type != 'open') {
                                            if ($scope.disableSubmit) {
                                                $scope.goNext();
                                            }
                                        }
                                        if ($scope.stepData.stepdocumentids.length == $scope.record && type != 'open') {
                                            if ($scope.disableSubmit) {
                                                $scope.closeModal();
                                            }
                                        }
                                        if ($scope.stepData.stepdocumentids[$scope.record].settingId.indexOf(7) !== -1 && $scope.stepData.stepdocumentids.length == $scope.record + 1 && type != 'open') {
                                            if ($scope.disableSubmit) {
                                                $scope.closeModal();
                                            }
                                        }
                                    }

                                } else {
                                    ToastrService.error(response.data.message);
                                }
                            }, function (err) {
                                ToastrService.error($rootScope.errorMsgs.MSG146);
                            });
                    }
                    // ON LOAD NOT REQUIRED 01-Feb-2019
                    // $('#iframOffer').on('load', function () {
                    //     // debugger
                    //     $timeout(function () {
                    //         $scope.loadingLoader = false;
                    //     }, 1000);

                    //     $timeout(function () {
                    //         alert('HIT');
                    //     }, 1000 * 10);
                    // });

                    $scope.openUploadEchoSign = function () {
                        $scope.disableIframes = false;
                        $scope.redirecturl = '';
                        if ($scope.stepData.stepdocumentids[$scope.record].documentSignStatus == 5) {
                            $scope.disableNextBtns = false;
                            $scope.disableSubmit = false;
                            $scope.loadingLoader = false;
                            if ($scope.stepData.stepdocumentids[$scope.record].settingId.indexOf(7) !== -1) {
                                $scope.redirecturl = $rootScope.DocsURL + $scope.stepData.stepdocumentids[$scope.record].documentid + '.pdf';
                            } else {
                                $scope.redirecturl = $rootScope.EchoDocsURL + $rootScope.CandidateInfo.newhireid + '/' + $scope.stepData.newHireWorkFlowId + '/' + $scope.stepData.stepdocumentids[$scope.record].documentid + '.pdf';

                            }
                        } else {
                            if ($scope.stepData.stepdocumentids[$scope.record].settingId.indexOf(7) !== -1) {
                                $scope.disableNextBtns = false;
                                $scope.disableSubmit = false;
                                $scope.loadingLoader = false;
                                $scope.redirecturl = $rootScope.DocsURL + $scope.stepData.stepdocumentids[$scope.record].documentid + '.pdf';
                            } else {
                                $scope.disableNextBtns = true;
                                $scope.redirecturl = '';
                                $scope.loadingLoader = true;
                                CandidateUsersService.openUploadEchoSign($rootScope.CandidateInfo.newhireid, workflowid, $scope.stepData.stepdocumentids[$scope.record].documentid).then(
                                    function (response) {
                                        $scope.disableNextBtns = false;
                                        //$scope.loadingLoader = false
                                        $timeout(function () {
                                            $scope.loadingLoader = false;
                                        }, 3000);
                                        if (response.data.Error) {
                                            ToastrService.error(response.data.message);
                                        } else {
                                            // if(response.data.redirecturl == ''){
                                            //     $scope.openUploadEchoSign();
                                            // } else {
                                            $scope.redirecturl = response.data.redirecturl;
                                            // }
                                            //$scope.redirecturl = 'http://192.168.1.198:9000/OnBoarding/Echosign/20839/3505/6452.pdf';

                                            $('#iframOffer').on('load', function () {

                                                $timeout(function () {
                                                    $scope.disableIframes = true;
                                                }, 1000 * 60 * 25);

                                            });
                                        }
                                    },
                                    function (err) {
                                        $scope.disableNextBtns = false;
                                        ToastrService.error($rootScope.errorMsgs.MSG147);
                                    }
                                ).finally(function () {
                                    $scope.loading = false;
                                });
                            }

                        }

                    };
                    $scope.openUploadEchoSign();




                    $scope.deleteAttachedFile = function (id) {                        
                        $scope.loadingLoader = true;
                        CandidateUsersService.deleteAttachedFile(id).then(
                            function (response) {                            
                                $scope.loadingLoader = false;
                                if (response.data.Error) {        
                                 }
                                if (!response.data.Error) {
                                    $scope.hideModal();
                                    $scope.getAttachedFiles();
                                    // ToastrService.success(response.data.message);
                                    $scope.file = [];
                                    //  || $scope.stepData.stepdocumentids[$scope.record].documentfilestatus !== 3
                                    // this is required below condition
                                    if ($scope.attachedFilesList.length - 1 == 0 && $scope.stepData.stepdocumentids[$scope.record].documentSignStatus !== 5 && ($scope.stepData.stepdocumentids[$scope.record].documentfilestatus !== 4 && $scope.stepData.stepdocumentids[$scope.record].documentfilestatus !== 3)) {
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


                    $scope.goToEditLetter = function (event, step, $index) {
                        if (step.stepdocumentids[$index].settingId.indexOf(3) !== -1) {
                            // localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
                            localStorage.removeItem('bgvedit');
                            localStorage.removeItem('indexlocation');
                            localStorage.setItem("bgvedit", JSON.stringify(step));
                            localStorage.setItem("indexlocation", $index);
                            $state.go('candidateinfo.bgvforms');
                        }
                        else if (step.stepdocumentids[$index].settingId.indexOf(11) !== -1) {
                            // localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
                            localStorage.removeItem('eeoedit');
                            localStorage.removeItem('indexlocation');
                            localStorage.setItem("eeoedit", JSON.stringify(step));
                            localStorage.setItem("indexlocation", $index);
                            $state.go('candidateinfo.eeo');
                        } else if (step.stepdocumentids[$index].settingId.indexOf(10) !== -1) {
                            // localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
                            localStorage.removeItem('payrolledit');
                            localStorage.removeItem('indexlocation');
                            localStorage.setItem("payrolledit", JSON.stringify(step));
                            localStorage.setItem("indexlocation", $index);
                            $state.go('candidateinfo.payrollpackage');
                        } else if (step.stepdocumentids[$index].settingId.indexOf(12) !== -1) {
                            // localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
                            localStorage.removeItem('contractoredit');
                            localStorage.removeItem('indexlocation');
                            localStorage.setItem("contractoredit", JSON.stringify(step));
                            localStorage.setItem("indexlocation", $index);
                            $state.go('candidateinfo.contractorinfo');
                        } else if (step.stepdocumentids[$index].settingId.indexOf(13) !== -1) {
                            // localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
                            localStorage.removeItem('clientspecificedit');
                            localStorage.removeItem('indexlocation');
                            localStorage.setItem("clientspecificedit", JSON.stringify(step));
                            localStorage.setItem("indexlocation", $index);
                            $state.go('candidateinfo.commondetails');
                        }
                        $scope.hide();

                    }


                    $scope.removeFile = function (ev) {
                        ev.stopPropagation();
                        $scope.file = null;
                    }

                    

                    $scope.getFieldSettingPar = function(settingname, obj) {
                        var result = {};
                        var settings = obj.Settings;
                        $.each(settings, function(index, set) {
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
                                $.each(ary[0].Options, function(index, set) {
                                    if (set.name == settingname) {
                                        result = set;
                                        return;
                                    }
                                });
                            }
                        }
                        return result;

                    }


                    $scope.getFieldRadioPar = function(settingname, obj) {
                        var result = {};
                        var settings = obj.Settings;
                        $.each(settings, function(index, set) {
                            if (set.name == settingname) {
                                result = set;
                                return;
                            }
                        });
                        if (!Object.keys(result).length) {
                            //Continue to search settings in the checkbox zone
                            $.each(settings[settings.length - 1].Options, function(index, set) {
                                if (set.name == settingname) {
                                    result = set;
                                    return;
                                }
                            });
                        }
                        return result;

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
                    
                    $scope.uploadDocumentsHand = function () {
                        $scope.loadingLoader = true;
                        if (!$scope.fileupload || !$scope.fileupload.length) {
                            ToastrService.error($rootScope.errorMsgs.MSG149);
                            return false;
                        }

                        var vfiles = $scope.fileupload;
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
                            frmData.append('documentLibrary.documentId', $scope.stepData.stepdocumentids[$scope.record].documentid);
                            //console.log(frmData);

                            // upload using api
                            // console.log(frmData);
                            // return false;

                            CandidateUsersService.candidateDocUpload(frmData).then(
                                function (response) {
                                    if (response.data.Error) {
                                        ToastrService.error(response.data.message);
                                        $scope.loadingLoader = false;
                                    }
                                    if (!response.data.Error) {
                                        // ToastrService.success(response.data.message);
                                        var fileDropZone = document.getElementById('file-drop-zone-hand');
                                        fileDropZone.style.backgroundImage = 'url(..' + rooturl + '/images/drag_drop.png)';
                                        $scope.fileupload = [];
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
                                $scope.loadingLoader = false;

                            });
                        } else {
                            ToastrService.warning("Nothing to submit.");
                        }
                    }

                    $scope.$watch('file', function () {
                        // file size cannot be more than 10MB
                        if ($scope.file && $scope.file.length) {
                            // console.log($scope.file);
                            if ($scope.file[0].size > 10 * 1024 * 1024) {
                                ToastrService.error($rootScope.errorMsgs.MSG151);
                                $scope.file = null;
                                return;
                            }
                            isNewFileUploaded = true;
                            var fileDropZone = document.getElementById('file-drop-zone');
                            fileDropZone.style.backgroundImage = 'none';
                            $scope.uploadDocuments();
                            // give focus to doc name element
                            // var docName = document.getElementById('doc_name');
                            // docName.focus();
                        } else {

                            var fileDropZone = document.getElementById('file-drop-zone');
                            if (fileDropZone) fileDropZone.style.backgroundImage = 'url(..' + rooturl + '/images/drag_drop.png)';
                        }
                    });
                    $scope.$watch('fileupload', function () {
                        // file size cannot be more than 10MB
                        if ($scope.fileupload && $scope.fileupload.length) {
                            // console.log($scope.fileupload);
                            if ($scope.fileupload[0].size > 10 * 1024 * 1024) {
                                ToastrService.error($rootScope.errorMsgs.MSG151);
                                $scope.fileupload = null;
                                return;
                            }
                            isNewFileUploaded = true;
                            var fileDropZone = document.getElementById('file-drop-zone-hand');
                            fileDropZone.style.backgroundImage = 'none';
                            $scope.uploadDocumentsHand();
                            // give focus to doc name element
                            // var docName = document.getElementById('doc_name');
                            // docName.focus();
                        } else {

                            var fileDropZone = document.getElementById('file-drop-zone-hand');
                            if (fileDropZone) fileDropZone.style.backgroundImage = 'url(..' + rooturl + '/images/drag_drop.png)';
                        }
                    });

                    function bindEvent(element, eventName, eventHandler) {
                        if (element.addEventListener) {
                            element.addEventListener(eventName, eventHandler, false);
                        } else if (element.attachEvent) {
                            element.attachEvent('on' + eventName, eventHandler);
                        }
                    }
                    //var  results = document.getElementById('results');
                    // Send a message to the child iframe


                    // Listen to message from child window
                    bindEvent(window, 'message', function (e) {
                        $scope.$apply(function () {
                            // if($scope.stepData.stepdocumentids.length > $scope.record+1){
                            //     if($scope.stepData.stepdocumentids[$scope.record].settingId.indexOf(9) !== -1){
                            //         //doc upload atter sign off, changing adobe url to pdf
                            //         $scope.disableSubmit = false;
                            //         $scope.stepData.stepdocumentids[$scope.record].documentSignStatus = 5;
                            //         $scope.redirecturl = $rootScope.EchoDocsURL + $rootScope.CandidateInfo.newhireid+'/'+$scope.stepData.newHireWorkFlowId+'/'+  $scope.stepData.stepdocumentids[$scope.record].documentid +'.pdf';
                            //         if($scope.attachedFilesList.length){
                            //             $scope.approveAcknowledge('completed');
                            //         }
                            //     } else {
                            //         $scope.disableSubmit = true;
                            //         $scope.stepData.stepdocumentids[$scope.record].documentSignStatus = 5;
                            //         $scope.redirecturl = $rootScope.EchoDocsURL + $rootScope.CandidateInfo.newhireid+'/'+$scope.stepData.newHireWorkFlowId+'/'+  $scope.stepData.stepdocumentids[$scope.record].documentid +'.pdf';
                            //         $scope.approveAcknowledge('completed');
                            //         //$scope.goNext();
                            //         //return;
                            //     }

                            // } else if($scope.stepData.stepdocumentids[$scope.record].settingId == '' || $scope.stepData.stepdocumentids[$scope.record].settingId.indexOf(2) !== -1){
                            //     $scope.approveAcknowledge('completed');                                                   
                            //     $scope.closeModal();  
                            // } else if(($scope.stepData.stepdocumentids.length == $scope.record+1) && $scope.stepData.stepdocumentids[$scope.record].settingId.indexOf(9) !== -1) {
                            //     //$scope.closeModal();
                            //     console.log("last step triggered");
                            //     $scope.disableSubmit = false;
                            //     $scope.stepData.stepdocumentids[$scope.record].documentSignStatus = 5;
                            //     $scope.redirecturl = $rootScope.EchoDocsURL + $rootScope.CandidateInfo.newhireid+'/'+$scope.stepData.newHireWorkFlowId+'/'+  $scope.stepData.stepdocumentids[$scope.record].documentid +'.pdf';
                            //     if($scope.attachedFilesList.length){
                            //         $scope.approveAcknowledge('completed');
                            //     }
                            // }
                            $scope.disableSubmit = false;
                            if ($scope.stepData.stepdocumentids[$scope.record].settingId.indexOf(9) !== -1) {
                                $scope.disableSubmit = false;
                                //$scope.stepData.stepdocumentids[$scope.record].documentSignStatus = 5;
                                $scope.redirecturl = $rootScope.EchoDocsURL + $rootScope.CandidateInfo.newhireid + '/' + $scope.stepData.newHireWorkFlowId + '/' + $scope.stepData.stepdocumentids[$scope.record].documentid + '.pdf';
                                if ($scope.attachedFilesList.length) {
                                    //$scope.approveAcknowledge('completed');
                                    //$scope.goNext();
                                }
                            }
                            else if ($scope.stepData.stepdocumentids[$scope.record].settingId == 7 && $scope.enableAccept) {
                                $scope.approveAcknowledge('completed');
                                $scope.goNext();
                            }
                            else if ($scope.stepData.stepdocumentids[$scope.record].settingId.indexOf(2) !== -1) {
                                $scope.goNext();
                            }


                            if ($scope.stepData.stepdocumentids[$scope.record].settingId.indexOf(9) !== -1 && ($scope.stepData.stepdocumentids.length == $scope.record + 1)) {
                                if ($scope.attachedFilesList.length) {
                                    //$scope.closeModal();
                                }
                            } else {
                                if (($scope.stepData.stepdocumentids.length == $scope.record)) {
                                    //$scope.closeModal();
                                    $scope.goNext();
                                }
                            }
                            // if(($scope.stepData.stepdocumentids.length == $scope.record+1)) {
                            //         //$scope.closeModal();
                            //     $scope.closeModal(); 
                            // }
                        });
                    });

                    // To get json from doc server with http api call --- Start
                    // var request = {
                    //     method: 'get',
                    //     url: $rootScope.DocsURL + 'Json/' + '15138.json',
                    //     dataType: 'json',
                    //     contentType: "application/json"
                    // };

                    // var tempComponents = new Array;

                    // $http(request).then(function (response) {
                    //     $scope.formFields = [];
                    //     tempComponents = response.data.components;
                    //     convertToWebFormJson(tempComponents);
                    // }, function (error) {

                    // });
                    // To get json from doc server with http api call --- End

                    $scope.getJsonDocumentWebforms = function () {
                        CandidateUsersService.getJsonDocWebForm($rootScope.CandidateInfo.newhireid, $scope.stepData.newHireWorkFlowId, $scope.stepData.stepdocumentids[$scope.record].documentid).then(
                            function (response) {
                                if (response.data.Error) {
                                    ToastrService.error('Unable to get data for Webform.');
                                }
                                if (!response.data.Error) {
                                    $scope.disableNextBtns = false;
                                    $scope.formFields = (response.data && response.data.components) ? angular.copy(response.data.components) : [];
                                    // var components = angular.copy(response.data.components);
                                    // convertToWebFormJson(components);
                                }
                            },
                            function (err) {

                            }
                        ).finally(function () {
                            $scope.loading = false;

                        });

                    }
                    if ($scope.stepData.stepdocumentids[$scope.record].settingId.indexOf(16) != -1) {
                        $scope.isWebForm = true;
                        $scope.isDocument = false;    
                        $scope.getJsonDocumentWebforms();
                    }
                    else if ($scope.stepData.stepdocumentids[$scope.record].settingId.indexOf(7) != -1) {
                        $scope.isWebForm = false;
                        $scope.isDocument = true;
                        $scope.openUploadEchoSign();
                    }
                    else {
                        $scope.isWebForm = false;
                        $scope.isDocument = true;
                        $scope.openUploadEchoSign();
                        $scope.getAttachedFiles();
                    }

                    $scope.submitted = false;
                    $scope.validateForm = function (dynWebForm) {
                        $scope.submitted = true;
                        if (dynWebForm)
                            $scope.saveWebForm();
                        else
                            ToastrService.error('Please fill all the mandatory fields');
                    }

                    function convertToWebFormJson(tempComponents) {
                        $scope.formFields = [];
                        var components = $filter('orderBy')(tempComponents, ['page', 'tab']);
                        for (var i = 0; i < components.length; i++) {
                            var obj = components[i];
                            var makingObj = {};
                            makingObj.isUpdated = false;
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
                                        makingObj.input = true;
                                        makingObj.mappingId = obj.mappingId;
                                        makingObj.value = obj.value ? obj.value : '';
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('textarea'));
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'text':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'text';
                                        makingObj.inputType = 'text';
                                        makingObj.page = obj.page;
                                        makingObj.input = true;
                                        makingObj.mappingId = obj.mappingId;
                                        makingObj.value = obj.value ? obj.value : '';
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
                                        makingObj.mappingId = obj.mappingId;
                                        makingObj.value = obj.value ? obj.value : '';
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('number'));
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
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
                                        makingObj.mappingId = obj.mappingId;
                                        makingObj.value = obj.value ? obj.value : '';
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('email'));
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
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
                                        makingObj.mappingId = obj.mappingId;
                                        makingObj.value = obj.value ? obj.value : '';
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('phone-number'));
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'date':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'date';
                                        makingObj.inputType = 'date';
                                        makingObj.page = obj.page;
                                        makingObj.input = true;
                                        makingObj.mappingId = obj.mappingId;
                                        makingObj.value = obj.value ? obj.value : null;
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('date'));
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'combo box':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'dropdown';
                                        makingObj.inputType = 'Combo box';
                                        makingObj.page = obj.page;
                                        makingObj.input = true;
                                        makingObj.mappingId = obj.mappingId;
                                        makingObj.value = obj.value ? obj.value : '';
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('dropdown'));
                                        makingObj.values = obj.values;
                                        // updateObj(makingObj, 'dropdown_increment', obj);
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'push button':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'button';
                                        makingObj.inputType = 'Push button';
                                        makingObj.page = obj.page;
                                        makingObj.input = true;
                                        makingObj.mappingId = obj.mappingId;
                                        makingObj.value = obj.value ? obj.value : '';
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
                                        makingObj.input = true;
                                        makingObj.mappingId = obj.mappingId;
                                        makingObj.value = obj.value ? obj.value : '';
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('checkbox'));
                                        makingObj.Options = obj.values;
                                        makingObj.values = obj.values;
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'radio button':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'radio';
                                        makingObj.inputType = 'Radio button';
                                        makingObj.page = obj.page;
                                        makingObj.input = true;
                                        makingObj.mappingId = obj.mappingId;
                                        makingObj.value = obj.value ? obj.value : '';
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('radio'));
                                        // updateObj(makingObj, 'radio_increment', obj);
                                        //makingObj.Options = obj.data.values;
                                        makingObj.data = {
                                            values: obj.data.values
                                        };
                                        makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'header':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'header';
                                        makingObj.inputType = 'header';
                                        makingObj.page = obj.page;
                                        makingObj.input = true;
                                        makingObj.mappingId = obj.mappingId;
                                        makingObj.value = obj.value ? obj.value : '';
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('header'));
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'emptyspace':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'emptyspace';
                                        makingObj.inputType = 'emptyspace';
                                        makingObj.page = obj.page;
                                        makingObj.input = true;
                                        makingObj.mappingId = obj.mappingId;
                                        makingObj.value = obj.value ? obj.value : '';
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('emptyspace'));
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    case 'devider':
                                        // code block
                                        makingObj.name = obj.name;
                                        makingObj.Type = 'devider';
                                        makingObj.inputType = 'devider';
                                        makingObj.page = obj.page;
                                        makingObj.input = true;
                                        makingObj.mappingId = obj.mappingId;
                                        makingObj.value = obj.value ? obj.value : '';
                                        makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('devider'));
                                        $scope.formFields.push(makingObj);
                                        makingObj = {};
                                        break;
                                    default:
                                    // code block


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
                    }

                    // $scope.getFieldSettingPar = function (settingname, obj) {
                    //     var result = {};
                    //     var settings = obj.Settings;
                    //     $.each(settings, function (index, set) {
                    //         if (set.name == settingname) {
                    //             result = set;
                    //             return;
                    //         }
                    //     });
                    //     if (!Object.keys(result).length) {
                    //         //Continue to search settings in the checkbox zone
                    //         $.each(settings[settings.length - 1].Options, function (index, set) {
                    //             if (set.name == settingname) {
                    //                 result = set;
                    //                 return;
                    //             }
                    //         });
                    //     }
                    //     return result;

                    // }
                    // $scope.getDateValue = function (currentobj, offsetdays) {
                    //     // if(currentobj !== 'currentdate'){
                    //     //     dateobj = null;
                    //     // }
                    //     var dateobj ;
                    //     if (currentobj == 'currentdate' || currentobj == 'Current Date') {
                    //         dateobj = new Date();
                    //     }
                    //     else{
                    //         for(var i=0; i < $scope.formFields.length;i++){
                    //             if($scope.formFields[i].name == currentobj && $scope.formFields[i].value)
                    //             dateobj = $scope.formFields[i].value;
                    //             dateobj = new Date(dateobj);
                    //         }
                    //     }
                    //     if (offsetdays != 0 && dateobj) {
                    //         dateobj.setDate(dateobj.getDate() + offsetdays);
                    //     }
                    //     return dateobj;
                    // }

                    // $scope.getFieldRadioPar = function (settingname, obj) {
                    //     var result = {};
                    //     var settings = obj.Settings;
                    //     $.each(settings, function (index, set) {
                    //         if (set.name == settingname) {
                    //             result = set;
                    //             return;
                    //         }
                    //     });
                    //     if (!Object.keys(result).length) {
                    //         //Continue to search settings in the checkbox zone
                    //         $.each(settings[settings.length - 1].Options, function (index, set) {
                    //             if (set.name == settingname) {
                    //                 result = set;
                    //                 return;
                    //             }
                    //         });
                    //     }
                    //     return result;

                    // }

                }]
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                    if (typeof answer === 'object' && answer.success) {
                        allDosCompletedFormModal = true;
                        // var pos = vm.stepsData.map(function(e) { return e.newHireWorkFlowId; }).indexOf(step.newHireWorkFlowId);
                        // vm.stepsData[pos].workflowstepstatus = 5;

                        vm.getReview();

                    }
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        }



        $scope.showSuccessForCompletedAllDocs = function (ev) {

            $mdDialog.show({
                multiple: true,
                scope: $scope,
                preserveScope: true,
                controller: ['$scope', '$mdDialog', '$location', 'NavigationService', function ($scope, $mdDialog, $location, NavigationService) {
                    $scope.hideModal = function () {
                        $mdDialog.hide();
                    }


                    // '<p align=center style="padding:0px 10px 20px 20px;font-size:13px;" >Note : We suggest you to download all the completed documents before you signout.</p>' +
                    $scope.signOut = function () {
                        // localStorage.removeItem("ReturnUrl");
                        $rootScope.CandidateInfo = null;
                        localStorage.clear();
                        $state.go('login');
                    }
                }],
                template: '<md-dialog aria-label="Delete" style="width:530px;">' +
                    '<div layout="column" layout-align="start end" style="padding:10px;">' +
                    '<ng-md-icon icon="clear" size="14" style="margin:8px 0 -19px 0;cursor:pointer" ng-click="hideModal()">' +
                    '</ng-md-icon>' +
                    '</div>' +
                    '<md-content style="background-color:white">' +
                    '<div layout="column" layout-align="center center"><md-icon md-svg-icon="images/icons/correct icon _01.svg" class="userProfileSvg" style="width:70px; height:70px;"></md-icon></div>' +
                    '<p align=center style="padding:0px 10px 0px 20px;font-size:18px;" >Congratulations!</p>' +
                    '<p align=center style="padding:0px 10px 0px 20px;font-size:13px;" >You have successfully completed all the documents.</p>' +
                    '<p align=center style="padding:0px 10px 0px 20px;font-size:13px;" >Please wait for HR approval for the required documents.</p>' +
                    '<md-divider></md-divider>' +
                    '<div layout="row" layout-align="end center" style="background-color:rgb(250,250,250);height:60px;padding:10px" flex>' +
                    '<md-button class="md-raised md-primary" ng-click="hideModal()" >OK</md-button>' +
                    '<md-button class="md-secondary" ng-click="signOut()">Sign Out</md-button>' +
                    '</div>' +
                    '</md-content>' +
                    '</md-dialog>'
            });
        }
        vm.checkStepReadonly = function (step) {
            var atleastOneHRDocExist = false;
            for (var i = 0; i < step.stepdocumentids.length; i++) {
                if (step.stepdocumentids[i].settingId.indexOf(2) !== -1 || step.stepdocumentids[i].settingId.indexOf(9) !== -1) {
                    atleastOneHRDocExist = true;
                }

            }
            return atleastOneHRDocExist ? 'Start' : 'Acknowledge';
        }

        vm.checkStepCompleted = function (step) {
            var completed = true;
            for (var i = 0; i < step.stepdocumentids.length; i++) {
                var docs = step.stepdocumentids[i];
                // docs.settingId.indexOf(2) !== -1 || 
                // if(((docs.settingId.indexOf(9) !== -1) && docs.settingId.indexOf(9) !== -1)  && !docs.candidateattachfiles.length ){
                //     completed = false;
                // }

            }
            if (completed && step.workflowstepstatus == 2) {
                completed = false;
            }
            return completed;
        }

        vm.uploadMultipleDos = function (ev, step, doc, doctype, candidateDocId) {
            if ($scope.disableAll) {
                return false;
            }

            $mdDialog.show({
                templateUrl: 'components/docUpload/candidateDocUpload.html',
                clickOutsideToClose: false,
                multiple: true,
                controllerAs: 'dialogCtrl12',
                locals: { workflowid: step.newHireWorkFlowId, docid: doc.documentid, doctype: doctype, candidateDocId: candidateDocId },
                controller: 'candidateDocUploadController'
            })
                .then(function (answer) {
                    if (answer && answer.reload) {
                        vm.getReview();

                    }
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        }

        $scope.getSelectedColor = function (id) {
            if (vm.docStatuses.length) {
                var fobj = vm.docStatuses.find(function (obj) {
                    if (obj.status == id) {
                        return obj.data;
                    }
                });
                if (fobj) {
                    return fobj.data;
                }
                return 'pending';
            }
        }

        $scope.$watch(function ($scope) {
            $scope.disableAll = false;
            return vm.stepsData.map(function (obj) {
                if (obj.workflowstepstatus === 4) {
                    $scope.disableAll = true;
                    return;
                }
                obj.stepdocumentids.map(function (docObj) {
                    if (docObj.documentfilestatus === 3) {
                        $scope.disableAll = true;
                        return;
                    }
                    // docObj.candidateattachfiles.map(function(subdocobj) {
                    //     if (subdocobj.candidatedocstatus === 3) {
                    //         $scope.disableAll = true;
                    //         return;
                    //     }
                    // });
                });
                return obj.workflowstepstatus;
            });
        }, function (newVal) { }, true);

        $scope.trustAsHtml = function (desc) {
            return $sce.trustAsHtml(desc);
        };




    }
})();