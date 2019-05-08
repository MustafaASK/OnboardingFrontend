(function () {
    'use strict';
    hrAdminApp.controller('CommentsController', CommentsController);
    CommentsController.$inject = [ '$scope','$stateParams', '$location', 'ToastrService','HireInfoService', '$mdDialog', '$filter', '$timeout','docData', 'commentType', 'commentLevel','newHireWorkFlowId','emailId','$rootScope'];
    function CommentsController( $scope,$stateParams, $location, ToastrService,HireInfoService, $mdDialog, $filter, $timeout, docData, commentType, commentLevel,newHireWorkFlowId,emailId,$rootScope) {
     
        var vm = this;

        vm.commentType = commentType;
        vm.commentLevel = commentLevel;
        vm.docData = docData;
        vm.emailId = emailId;

        var statusObj = {
            pending :2,
            completed :3,
            rejected :4,
            view :1,
            approve : 2,
            reject : 3,
            replace:4
        }

        vm.saveComments = function(){
            // var obj = {
            //         "newHireWorkFlowDocsId" : vm.docData.stepdocumentid,
            //         "newhiredocumentid" : vm.docData.documentid,
            //         "documentFillStatus":statusObj[commentType],
            //         "documentfilecomments" : vm.comments
            //     };
            var obj = {
                    "newHireWorkFlowDocsId" : vm.docData.stepdocumentid,
                    "newhiredocumentid" : vm.docData.documentid ,
                    "documentFillStatus":statusObj[commentType],
                    "documentSignStatus":1,
                    "newHireWorkFlowId":newHireWorkFlowId,
                    "documentfilecomments" : vm.comments,      
                    "frontendurl" : $rootScope.FrontEndURLForCandidateLogin + '?' + vm.emailId 
                }

            HireInfoService.saveComments(obj).then(
                function (response) {
                    if(response.data.Success){
                        ToastrService.success(response.data.message);
                        $mdDialog.hide({success:true, cmtType:statusObj[commentType]});
                    } else {
                        ToastrService.error(response.data.message);
                    }
                },function (err) {
                     ToastrService.error($rootScope.errorMsgs.MSG146);
                });
        }
        
        var obj = [
            {
                status:1,
                data:'view'
            },
            {
                status:2,
                data:'approve'
            },
            {
                status:3,
                data:'reject'
            },
            {
                status:4,
                data:'replace'
            }
        ]
        vm.saveStepComments = function(){
            
            var obj = {
                    "newHireWorkFlowId" : vm.docData.newHireWorkFlowId,
                    "workFlowStepStatus" :statusObj[commentType] ,
                    "stepcomments":vm.comments 
                 } ;
                HireInfoService.saveStepComments(obj).then(
                    function (response) {
                        if(response.data.Success){
                            ToastrService.success(response.data.message);
                            $mdDialog.hide({success:true, cmtType:statusObj[commentType]});
                        } else {
                            ToastrService.error(response.data.message);
                        }
                    },function (err) {
                     ToastrService.error($rootScope.errorMsgs.MSG146);
                });
        }
        
        vm.hide = function(ev) {
            $mdDialog.hide();
        }

        vm.cancel = function(ev) {
            $scope.fileThumb = '';
            $mdDialog.cancel();
        }

        vm.answer = function(ev, answer) {
            $mdDialog.hide(answer);
        }

        vm.capitalize = function(type){
            if(type == 'reject'){
                return 'Reject';
            }
            else if(type == 'replace'){
                return 'Replace';
            }
            else if(type == 'approve'){
                return 'Approve';
            }
        }

    }
})();