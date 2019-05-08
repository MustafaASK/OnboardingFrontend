(function() {
    'use strict';
    hrAdminApp.controller('attachDocsReview', attachDocsReview);
    attachDocsReview.$inject = ['$scope', '$rootScope', '$stateParams', '$location', 'ToastrService', '$mdDialog', '$http', '$timeout', 'HireInfoService', 'docData', 'stepInfo', 'AnyOneRejected'];

    function attachDocsReview($scope, $rootScope, $stateParams, $location, ToastrService, $mdDialog, $http, $timeout, HireInfoService, docData, stepInfo, AnyOneRejected) {


        $scope.docsList = [];
        $scope.docForm = {};
        $scope.docStatuses = [{ "status": 1, "data": "pending" }, { "status": 2, "data": "approved" }, { "status": 3, "data": "rejected" }, { "status": 4, "data": "replace" }];
        $scope.stepStatuses = [{ "status": 2, "data": "pending" }, { "status": 3, "data": "completed" }, { "status": 4, "data": "rejected" }];
        $scope.docData = angular.copy(docData.candidateattachfiles);
        $scope.docId = docData.documentid;
        $scope.CandidateDocsURL = $rootScope.CandidateDocsURL;
        $scope.allAreApproved = true;

        function allAreApproved(){
            for (var i = 0; i < $scope.docData.length; i++) {
                if($scope.docData[i].candidatedocstatus != 2){
                    $scope.allAreApproved = false;
                }
            }

        }
        if(!AnyOneRejected){
            allAreApproved();
        } else {            
            $scope.allAreApproved = AnyOneRejected;
        }
        
       



        $scope.getSelectedColor = function(id) {
            if ($scope.docStatuses.length) {
                var fobj = $scope.docStatuses.find(function(obj) {
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

        

        function docStatusUpdate(){
            
            var obj = {
                    "newHireWorkFlowDocsId" : docData.stepdocumentid,
                    "newhiredocumentid" : docData.documentid,
                    "documentFillStatus":1
                };

            HireInfoService.saveComments(obj).then(
                function (response) {
                    if(response.data.Success){
                        //ToastrService.success(response.data.message);
                        $mdDialog.hide({ 'reload': true });
                    } else {
                        ToastrService.error(response.data.message);
                    }
                },function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG146);
                });
        }


        $scope.changeStatus = function(indx, status) {
            $scope.docData[indx].candidatedocstatus = status
        }


        $scope.submit = function(isValid) {

            if (!isValid) {
                ToastrService.error($rootScope.errorMsgs.MSG165);
                return false;
            }
            var finalAry = [];
            var allApproved = true;
            for (var i = 0; i < $scope.docData.length; i++) {
                var obj = {
                    candidatedocid: $scope.docData[i].candidatedocid,
                    candidatedocstatus: $scope.docData[i].candidatedocstatus,
                    hrcomments: $scope.docData[i].hrcomments
                };
                if(obj.candidatedocstatus != 2){
                    allApproved = false;
                }
                finalAry.push(obj);
            }
            $scope.loading = true;
            HireInfoService.candidateDocUpdate(finalAry).then(
                function(response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                    if (!response.data.Error) {
                        if(allApproved){
                            docStatusUpdate();
                        } else  {
                            $mdDialog.hide({ 'reload': true });
                        }
                        ToastrService.success(response.data.message);
                        // $mdDialog.hide({ 'reload': true });
                    }
                },
                function(err) {
                    ToastrService.error($rootScope.errorMsgs.MSG143);
                }
            ).finally(function() {
                $scope.loading = false;

            });

        }

        $scope.hide = function(ev) {
            $mdDialog.hide();
        }

        $scope.cancel = function(ev) {
            $mdDialog.cancel();
        }

        $scope.answer = function(ev, answer) {
            $mdDialog.hide(answer);
        }

    }
})();