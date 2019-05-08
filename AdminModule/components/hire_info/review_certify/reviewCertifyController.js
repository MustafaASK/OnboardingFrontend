(function () {
    'use strict';
    hrAdminApp.controller('ReviewCertifyController', ReviewCertifyController);
    ReviewCertifyController.$inject = ['$scope', '$rootScope', '$stateParams', '$location', 'ToastrService', 'InitiateOnboardingService', '$mdDialog', '$filter', '$timeout', 'ReviewCertifyService', 'HireInfoService', '$sce'];

    function ReviewCertifyController($scope, $rootScope, $stateParams, $location, ToastrService, InitiateOnboardingService, $mdDialog, $filter, $timeout, ReviewCertifyService, HireInfoService, $sce) {


        var vm = this;
        var rootUrl = $rootScope.rootUrl;
        //var newHireEmailId = $scope.$parent.vm.hiredInfo.emailid;

        vm.newHireId = $stateParams.hireId;
        // vm.hireEmailId = $stateParams.hireEmailId;

        vm.showUploadDocsDialog = showUploadDocsDialog;
        // vm.showDeleteConfirm = showDeleteConfirm;
        // vm.closeDeleteModal = closeDeleteModal;
        vm.doc_name_short = doc_name_short;
        vm.addCanvasToCard = addCanvasToCard;
        vm.docSettingsDisabled = true;
        vm.previewDocument = previewDocument;
        vm.docSearch = false;
        $scope.disableAll = false;
        vm.docStatuses = [{ "status": 1, "data": "view" }, { "status": 2, "data": "approve" }, { "status": 3, "data": "Reject with Update" }, { "status": 4, "data": "Reject with Replace" }];
        vm.stepStatuses = [{ "status": 2, "data": "pending" }, { "status": 3, "data": "completed" }, { "status": 4, "data": "rejected" }];


        $scope.thumbnail_height = '2in';
        $scope.thumbnail_width = '2.2in';


        $scope.sizes = [
            "pending",
            "completed",
            "rejected"
        ];
        $scope.size = 3;
        vm.selectedStep = {
            "status": 2,
            "data": "pending"
        };



        // Preview PDF canvas size
        vm.pdf_height = '2.25in';
        vm.pdf_width = '2in';

        vm.last_modified = '';
        vm.docs = {
            steps: []
        };

        vm.currentPage = 0;
        $scope.docsPerPage = 9;
        $scope.itemsPerRow = 3;

        function loadPages() {
            // console.log('Current page is : ' + vm.paging.current);
            // TODO : Load current page Data here
            vm.currentPage = vm.paging.current;
        }

        vm.getLayoutClass = function (indx, event) {
            //console.log(this.$parent.addClass('5656565'));
            var cls = '';
            if (indx == 0 || ((indx + 1) % 3 == 0)) {
                cls = 'layout-row';

            }
            return cls;
            //{'layout-row': $index == '0' || (($index + 1) % 3 == '0')}
        }

        vm.filterFunction = function (step) {
            /* return true if included false if excluded */
            // if(vm.userSignedAtleastOnedoc){
            //     return true
            // }
            // return false;
            var flag = true;
            for (var i = 0; i < step.stepdocumentids.length; i++) {
                // (step.stepdocumentids[i].settingId.indexOf(7) !== -1) && 
                if ((step.stepdocumentids[i].documentSignStatus !== 5) || (step.stepdocumentids[i].documentSignStatus !== 0 && step.stepdocumentids[i].documentfilestatus !== 3)) {
                    flag = false;
                }
            }
            return flag;
        };
        vm.checkAllDocsCompleted = function (step) {
            var completed = true;
            for (var i = 0; i < step.stepdocumentids.length; i++) {
                // if(step.stepdocumentids[i].documentSignStatus !== 5 && (step.stepdocumentids[i].documentfilestatus !== 3 && step.stepdocumentids[i].documentfilestatus !== 4)){
                // if(step.stepdocumentids[i].documentSignStatus !== 5  || step.stepdocumentids[i].documentfilestatus == 1){
                if (step.stepdocumentids[i].documentfilestatus !== 2 && step.stepdocumentids[i].documentfilestatus !== 3 && step.stepdocumentids[i].documentfilestatus !== 4 && step.stepdocumentids[i].documentfilestatus !== 5) {
                    completed = false;
                }
            }
            return completed;

        }

        function getSecuredDetails() {
            ReviewCertifyService.getSecuredDetails($stateParams.hireId).then(
                function (response) {
                    vm.securedDetails = response.data;
                    vm.securedDetails.DOB = vm.securedDetails.DOB.substring(0, 10);
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG182);
                }
            );
        }
        //getSecuredDetails();


        function completeNewHire() {
            var allcompleted = true;
            for (var i = 0; i < vm.docs.steps.length; i++) {
                var docslist = vm.docs.steps[i].stepdocumentids;
                for (var j = 0; j < docslist.length; j++) {
                    if ((docslist[j].settingId === '' || docslist[j].settingId.indexOf(2) !== -1 || docslist[j].settingId.indexOf(9) !== -1) && docslist[j].documentfilestatus !== 2) {
                        allcompleted = false;
                    }
                }
            }
            if (allcompleted) {
                ReviewCertifyService.completeNewHire($stateParams.hireId).then(
                    function (response) {
                        $scope.$parent.vm.hiredInfo.statusid = 10;
                        $scope.$parent.vm.statusName = 'Completed';
                    },
                    function (err) {
                        ToastrService.error($rootScope.errorMsgs.MSG182);
                    }
                );
            }
        }

        function getReviews() {
            $scope.loading = true;
            ReviewCertifyService.getReviews($stateParams.hireId).then(
                function (response) {
                    $scope.loading = false;
                    var reviewData = response.data;
                    //vm.docs = {"newhireid":15606,"workflowId":45,"stepIds":[{"workflowStepId":2060,"stepname":"a2","workflowstepstatus":1,"sequencenumber":0,"workFlowStepsDocs":[{"workflowStepDocId":3559,"documentid":1025,"documentname":"test","settingId":2}]},{"workflowStepId":49,"stepname":"seditn","workflowstepstatus":1,"sequencenumber":0,"workFlowStepsDocs":[{"workflowStepDocId":3561,"documentid":3,"documentname":"adobereaderaudio1"},{"workflowStepDocId":3562,"documentid":2029,"documentname":"test - Copy3","settingId":1}]},{"workflowStepId":2059,"stepname":"a1","workflowstepstatus":1,"sequencenumber":0,"workFlowStepsDocs":[{"workflowStepDocId":3560,"documentid":26,"documentname":"mahammad","settingId":1}]},{"workflowStepId":3146,"stepname":"step 454","workflowstepstatus":1,"sequencenumber":0,"workFlowStepsDocs":[{"workflowStepDocId":3558,"documentid":2087,"documentname":"shaik","settingId":1}]},{"workflowStepId":4144,"stepname":"devi2","workflowstepstatus":1,"sequencenumber":0,"workFlowStepsDocs":[{"workflowStepDocId":4457,"documentid":2027,"documentname":"mahesh","settingId":1},{"workflowStepDocId":4458,"documentid":26,"documentname":"mahammad","settingId":1}]},{"workflowStepId":4144,"stepname":"devi2","workflowstepstatus":1,"sequencenumber":0,"workFlowStepsDocs":[]},{"workflowStepId":4144,"stepname":"devi2","workflowstepstatus":1,"sequencenumber":0,"workFlowStepsDocs":[]},{"workflowStepId":4144,"stepname":"devi2","workflowstepstatus":1,"sequencenumber":0,"workFlowStepsDocs":[]},{"workflowStepId":4144,"stepname":"devi2","workflowstepstatus":1,"sequencenumber":0,"workFlowStepsDocs":[]},{"workflowStepId":4144,"stepname":"devi2","workflowstepstatus":1,"sequencenumber":0,"workFlowStepsDocs":[]},{"workflowStepId":4144,"stepname":"devi2","workflowstepstatus":1,"sequencenumber":0,"workFlowStepsDocs":[]},{"workflowStepId":4144,"stepname":"devi2","workflowstepstatus":1,"sequencenumber":0,"workFlowStepsDocs":[]},{"workflowStepId":2059,"stepname":"a1","workflowstepstatus":1,"sequencenumber":0,"workFlowStepsDocs":[]},{"workflowStepId":49,"stepname":"seditn","workflowstepstatus":1,"sequencenumber":0,"workFlowStepsDocs":[]},{"workflowStepId":3146,"stepname":"step 454","workflowstepstatus":1,"sequencenumber":0,"workFlowStepsDocs":[]},{"workflowStepId":2059,"stepname":"a1","workflowstepstatus":1,"sequencenumber":0,"workFlowStepsDocs":[]},{"workflowStepId":3146,"stepname":"step 454","workflowstepstatus":1,"sequencenumber":0,"workFlowStepsDocs":[]}]};
                    //vm.docs = {"newHireWorkFlowDocs":[{"newHireWorkFlowDocsId":1031,"newHireWorkFlowId":32,"workflowid":45,"workflowstepid":2060,"stepname":"a2","workflowstepstatus":1,"workflowstepcomment":"","newHireWorkFlowDocs":[{"newhiredocumentid":1025,"newhiredocumentname":"test","docsettings":[{"settingId":2},{"settingId":1}],"documentfilestatus":2,"documentfilecomments":""}]},{"newHireWorkFlowDocsId":1032,"newHireWorkFlowId":33,"workflowid":45,"workflowstepid":49,"stepname":"seditn","workflowstepstatus":1,"workflowstepcomment":"","newHireWorkFlowDocs":[{"newhiredocumentid":2029,"newhiredocumentname":"test - Copy3","docsettings":[{"settingId":1}],"documentfilestatus":1,"documentfilecomments":""}]},{"newHireWorkFlowDocsId":1033,"newHireWorkFlowId":33,"workflowid":45,"workflowstepid":49,"stepname":"seditn","workflowstepstatus":1,"workflowstepcomment":"","newHireWorkFlowDocs":[{"newhiredocumentid":3,"newhiredocumentname":"adobereaderaudio1","docsettings":[],"documentfilestatus":1,"documentfilecomments":""}]},{"newHireWorkFlowDocsId":1037,"newHireWorkFlowId":36,"workflowid":3088,"workflowstepid":4144,"stepname":"devi2","workflowstepstatus":1,"workflowstepcomment":"","newHireWorkFlowDocs":[{"newhiredocumentid":26,"newhiredocumentname":"mahammad","docsettings":[{"settingId":2},{"settingId":3},{"settingId":1}],"documentfilestatus":1,"documentfilecomments":""}]},{"newHireWorkFlowDocsId":1041,"newHireWorkFlowId":38,"workflowid":3088,"workflowstepid":4144,"stepname":"devi2","workflowstepstatus":1,"workflowstepcomment":"","newHireWorkFlowDocs":[{"newhiredocumentid":2027,"newhiredocumentname":"mahesh","docsettings":[{"settingId":2},{"settingId":1}],"documentfilestatus":1,"documentfilecomments":""}]},{"newHireWorkFlowDocsId":1052,"newHireWorkFlowId":44,"workflowid":45,"workflowstepid":2059,"stepname":"a1","workflowstepstatus":1,"workflowstepcomment":"","newHireWorkFlowDocs":[]},{"newHireWorkFlowDocsId":1055,"newHireWorkFlowId":46,"workflowid":45,"workflowstepid":3146,"stepname":"step 454","workflowstepstatus":1,"workflowstepcomment":"","newHireWorkFlowDocs":[{"newhiredocumentid":2087,"newhiredocumentname":"shaik","docsettings":[{"settingId":2},{"settingId":3},{"settingId":1}],"documentfilestatus":1,"documentfilecomments":""}]}],"offerid":1022,"newHireId":15606};
                    vm.userSignedAtleastOnedoc = false;
                    vm.noDocsStepExist = false;
                    for (var i = 0; i < reviewData.steps.length; i++) {
                        if (!reviewData.steps[i].stepdocumentids.length) {
                            vm.noDocsStepExist = true;
                        }
                        for (var j = 0; j < reviewData.steps[i].stepdocumentids.length; j++) {
                            // (step.stepdocumentids[i].settingId.indexOf(7) !== -1) && 
                            // if (reviewData.steps[i].stepdocumentids[j].documentfilestatus == 2 || reviewData.steps[i].stepdocumentids[j].documentfilestatus == 3 || reviewData.steps[i].stepdocumentids[j].documentfilestatus == 4 || reviewData.steps[i].stepdocumentids[j].documentfilestatus == 5) {
                            //     vm.userSignedAtleastOnedoc = true;
                            // }
                            if (!vm.userSignedAtleastOnedoc) {
                                vm.userSignedAtleastOnedoc = vm.checkAllDocsCompleted(reviewData.steps[i]);

                            }
                            // if(reviewData.steps[i].stepdocumentids[j].settingId.indexOf(9) !== -1 && reviewData.steps[i].stepdocumentids[j].documentSignStatus === 5 && !reviewData.steps[i].stepdocumentids[j].candidateattachfiles.length){
                            //     //val1.documentSignStatus = 1;
                            //     reviewData.steps[i].stepdocumentids[j].documentfilestatus = 1;
                            // }
                        }
                    }

                    vm.docs = reviewData;
                    vm.paging = {
                        total: Math.ceil(vm.docs.length / $scope.docsPerPage),
                        current: 1,
                        onPageChanged: loadPages,
                    };

                    if (vm.docs.length < $scope.itemsPerRow) {
                        $scope.layoutAlign = "start start";
                    } else if ((vm.docs.length % $scope.itemsPerRow) == 0) {
                        $scope.layoutAlign = "space-around start";
                    } else if ((vm.docs.length % $scope.itemsPerRow) != 0) {
                        $scope.layoutAlign = "start start";
                    }
                },
                function (err) {
                    $scope.loading = false;
                    ToastrService.error(err.message);
                }
            );



        }
        // get the documents using the service
        getReviews();

        $scope.openAttachedDocs = function (ev, step, doc) {
            var isCandidate = false;
            $mdDialog.show({
                templateUrl: 'components/hire_info/attachDocsReview/attachDocsReview.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: { docData: doc, stepInfo: step, AnyOneRejected: $scope.disableAll },
                controller: 'attachDocsReview'
            })
                .then(function (answer) {
                    if (answer && answer.reload) {
                        getReviews();
                    }
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        }

        vm.approveit = function (ev, docData, type, commentLevel, stepid) {
            $scope.loading = true;

            var obj = {
                "newHireWorkFlowDocsId": docData.stepdocumentid,
                "newhiredocumentid": docData.documentid,
                "documentFillStatus": 2,
                "documentSignStatus": 5,
                "documentfilecomments": ''
            };

            HireInfoService.saveComments(obj).then(
                function (response) {
                    $scope.loading = false;
                    if (response.data.Success) {
                        //ToastrService.success(response.data.message);
                        var pos = vm.docs.steps.map(function (e) { return e.newHireWorkFlowId; }).indexOf(stepid);

                        var docPos = vm.docs.steps[pos].stepdocumentids.map(function (e) {
                            return e.stepdocumentid;
                        }).indexOf(docData.stepdocumentid);
                        vm.docs.steps[pos].stepdocumentids[docPos].documentfilestatus = 2;

                        $timeout(function () {
                            completeNewHire();
                        }, 1000);


                    } else {
                        ToastrService.error(response.data.message);
                    }
                },
                function (err) {
                    $scope.loading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG146);
                });
        }


        function showUploadDocsDialog(ev, docData, type, commentLevel, stepid) {

            if (commentLevel === 'step' && type == 'completed') {
                for (var i = 0; i < docData.stepdocumentids.length; i++) {
                    if ((typeof docData.stepdocumentids[i].settingId == 'object') && (docData.stepdocumentids[i].settingId.indexOf(2) !== -1 || docData.stepdocumentids[i].settingId.indexOf(9) !== -1)) {
                        if (docData.stepdocumentids[i].documentfilestatus == 0 || docData.stepdocumentids[i].documentfilestatus == 1 || docData.stepdocumentids[i].documentfilestatus == 3 || docData.stepdocumentids[i].documentfilestatus == 4) {
                            ToastrService.error($rootScope.errorMsgs.MSG183);
                            return false;
                        }
                    }

                }
            }
            // return;

            // if (commentLevel === 'doc' && type == 'approve') {
            //     for (var i = 0; i < docData.candidateattachfiles.length; i++) {
            //             if (docData.candidateattachfiles[i].candidatedocstatus == 0 ||docData.candidateattachfiles[i].candidatedocstatus == 1 || docData.candidateattachfiles[i].candidatedocstatus == 3 || docData.candidateattachfiles[i].candidatedocstatus == 4) {
            //                 ToastrService.error('Please approve all sub documents before approve this document');
            //                 return false;
            //             }

            //     }
            // }
            $mdDialog.show({
                locals: { docData: docData, commentType: type, commentLevel: commentLevel, newHireWorkFlowId: stepid, emailId: $scope.$parent.vm.hiredInfo.emailId },
                controller: 'CommentsController',
                controllerAs: 'vm',
                templateUrl: rootUrl + '/components/hire_info/comments/comments.html',
                targetEvent: ev,
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                escapeToClose: true
            })
                .then(function (res) {
                    if (res.success) {
                        var pos = vm.docs.steps.map(function (e) { return e.newHireWorkFlowId; }).indexOf(stepid);
                        if (commentLevel == 'step') {
                            //var pos = vm.docs.steps.map(function(e) { return e.newHireWorkFlowId; }).indexOf(docData.newHireWorkFlowId);
                            vm.docs.steps[pos].workflowstepstatus = res.cmtType;
                            if (res.cmtType == 3) {
                                $timeout(function () {
                                    completeNewHire();
                                }, 1000);
                                // completeNewHire();
                            }
                        }
                        if (commentLevel == 'doc') {
                            var docPos = vm.docs.steps[pos].stepdocumentids.map(function (e) {
                                return e.stepdocumentid;
                            }).indexOf(docData.stepdocumentid);
                            vm.docs.steps[pos].stepdocumentids[docPos].documentfilestatus = res.cmtType;
                            if (res.cmtType == 3) {
                                $scope.disableAll = true;
                            }
                        }
                    }
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

        function addCanvasToCard(indx, parentindex, stepdocid, docid, isReadonly, stepwfid) {
            // get existing placeholder for the canvas
            // append canvas to it as zero element
            // var canvas = document.getElementById('canvas' + docid.toString());
            // canvas.style.width = $scope.thumbnail_width;
            // canvas.style.height = $scope.thumbnail_height;
            // var ctx = canvas.getContext('2d');
            // var docUrl = $rootScope.DocsURL + '3151.pdf';
            // getDoc(docUrl, canvas, ctx);

            (function (indxx, parentindexx, stepdocidx, docidx, isReadonlyx, stepwfidx) {
                $timeout(function () {
                    var canvas = document.getElementById('canvas' + stepdocidx);
                    canvas.style.width = $scope.thumbnail_width;
                    canvas.style.height = $scope.thumbnail_height;
                    var ctx = canvas.getContext('2d');
                    //var docUrl = $rootScope.DocsURL + docidx + '.pdf';
                    //console.log($rootScope.EchoDocsURL +vm.newHireId+'_'+ docidx + '.pdf');
                    var docUrl = '';
                    if (!isReadonlyx) {
                        docUrl = $rootScope.DocsURL + docidx + '.pdf';
                        // console.log('docUrl');
                        // console.log(docUrl);
                    } else {
                        //{{EchoDocsURL}}{{vm.newHireId}}/{{step.newHireWorkFlowId}}/{{doc.documentid}}.pdf
                        docUrl = $rootScope.EchoDocsURL + vm.newHireId + '/' + stepwfidx + '/' + docidx + '.pdf';
                    }
                    //var docUrl = 'http://192.168.1.198:9000/OnBoarding/Docs/6313.pdf';
                    //var docUrl = 'http://192.168.1.198:9000/OnBoarding/Echosign/19761_6313.pdf';
                    getDoc(docUrl, canvas, ctx);
                }, 1000);
            })(indx, parentindex, stepdocid, docid, isReadonly, stepwfid);

            // $timeout(function () {
            //     var canvas = document.getElementById('canvas' + docid.toString());
            //     canvas.style.width = $scope.thumbnail_width;
            //     canvas.style.height = $scope.thumbnail_height;
            //     var ctx = canvas.getContext('2d');
            //     for (var i = 0; i < vm.docs.length; i++) {
            //         if (vm.docs[i].docid == docid) {
            //             var docUrl = $rootScope.DocsURL + docid.toString() + '.pdf';
            //             break;
            //         }
            //     }
            //     getDoc(docUrl, canvas, ctx);
            // });
        }

        function doc_name_short(docName, count) {
            if (!docName) return;
            if (!count) count = 15;
            if (docName.length > count) {
                docName = docName.substr(0, count - 1) + '...';
            }
            return docName;
        }

        $scope.getDocUrl = function (docid) {
            for (var i = 0; i < vm.docs.length; i++) {
                if (vm.docs[i].docid == docid) {
                    return vm.docs[i].url;
                }
            }
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
        }

        vm.certifyFinalIt = function () {
            var obj = {
                "newhireid": $stateParams.hireId,
                "offerId": "1010",
                "offerStatus": 24,
                "newHireWorkFlowDocs": [{
                    "documentId": 9,
                    "documentfilecomments": "comments11"
                },
                {
                    "documentId": 4,
                    "documentfilecomments": "comments12"
                }
                ]
            };
            ReviewCertifyService.certifyFinalIt(obj).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                    if (!response.data.Error) {
                        //ToastrService.success(response.data.message);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG146);
                }
            )
        }

        vm.getStepStatus = function () {
            ReviewCertifyService.getStepStatus().then(
                function (response) {
                    //vm.stepStatuses = response.data;
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }
        vm.getDocStatus = function () {
            ReviewCertifyService.getDocStatus().then(
                function (response) {
                    //vm.docStatuses = response.data;
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }
        //vm.getStepStatus();
        //vm.getDocStatus();
        $scope.getSelectedColor = function (id) {
            if (vm.stepStatuses.length) {
                var fobj = vm.stepStatuses.find(function (obj) {
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

        $scope.checkStepDocStatusRejected = function (step) {
            var rejected = false;
            if (step.workflowstepstatus == 4) {
                rejected = true;
                return rejected;
            }
            for (var i = 0; i < step.stepdocumentids.length; i++) {
                if (step.stepdocumentids[i].documentfilestatus == 3) {
                    rejected = true;
                    return rejected;
                }
                var candidateattachfilelist = step.stepdocumentids[i].candidateattachfiles;
                for (var j = 0; j < candidateattachfilelist.length; j++) {
                    if (candidateattachfilelist[j].candidatedocstatus == 3) {
                        rejected = true;
                        return rejected;
                    }
                }
            }
            return rejected;

        }

        $scope.$watch(function ($scope) {
            $scope.disableAll = false;
            return vm.docs.steps.map(function (obj) {
                if (obj.workflowstepstatus === 4) {
                    $scope.disableAll = true;
                    return;
                }
                obj.stepdocumentids.map(function (docObj) {
                    if (docObj.documentfilestatus === 3) {
                        $scope.disableAll = true;
                        return;
                    }
                    docObj.candidateattachfiles.map(function (subdocobj) {
                        if (subdocobj.candidatedocstatus === 3) {
                            $scope.disableAll = true;
                            return;
                        }
                    });
                });
                return obj.workflowstepstatus;
            });
        }, function (newVal) { }, true);

        $scope.browserType = function () {
            // if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
            //     vm.heightofreviewtemp = $(document).height() - 100;
            //         vm.heightforreviewCertify = vm.heightofreviewtemp * 0.83 + 'px' ;
            // }
            if (navigator.userAgent.indexOf("Chrome") != -1) {
                vm.heightofreviewtemp = $(document).height() - 100;
                vm.heightforreviewCertify = vm.heightofreviewtemp * 0.97 + 'px';
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                vm.heightofreviewtemp = $(document).height() - 100;
                vm.heightforreviewCertify = vm.heightofreviewtemp * 0.97 + 'px';
                if (navigator.userAgent.indexOf("Version/10") != -1) {
                    vm.heightofreviewtemp = $(document).height() - 100;
                    vm.heightforreviewCertify = vm.heightofreviewtemp * 0.97 + 'px';

                }
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                vm.heightofreviewtemp = $(document).height() - 100;
                vm.heightforreviewCertify = vm.heightofreviewtemp * 0.97 + 'px';
            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                vm.heightofreviewtemp = $(document).height() - 100;
                vm.heightforreviewCertify = vm.heightofreviewtemp * 0.97 + 'px';
            }
            else {
                vm.heightofreviewtemp = $(document).height() - 100;
                vm.heightforreviewCertify = vm.heightofreviewtemp * 0.97 + 'px';
            }
        }
        $scope.browserType();

        $scope.trustAsHtml = function (desc) {
            return $sce.trustAsHtml(desc);
        };

    }
})();