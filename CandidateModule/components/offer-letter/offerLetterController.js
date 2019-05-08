(function () {
    'use strict';
    candidateApp.controller('OfferLetterController', OfferLetterController);
    OfferLetterController.$inject = ['$rootScope', '$scope', '$location', 'ToastrService', '$state','$mdDialog','CandidateUsersService','$sce','$timeout'];
    function OfferLetterController($rootScope, $scope, $location, ToastrService, $state,$mdDialog,CandidateUsersService, $sce, $timeout) {

        var vm = this;
        var rootUrl = $rootScope.rootUrl;
        $scope.disableAccept = true;
        $scope.disableReject = false;
        $scope.disableLoadReject = false;
        vm.goToCommonDetail = function(){
            $state.go('candidateinfo');
        }
        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }
        vm.cancel = function(){
            $mdDialog.cancel();

        }
        vm.heightForCandidateIntro = $(document).height() - 40 + 'px';
        // var loader = document.getElementById('loader');
        // if(loader){
        //     loader.style.display = "block"; 
        // }
        
        // $scope.hideLoading = function(){            
        //     loader.style.display = "none"; 
        // }
        // $('#iframOfferDiv').hide();
        // $('#loader').show();
        //screen.width==
        $scope.loading = true;
        $('#iframOffer').on('load', function () {
            $timeout(function(){
                $('#iframOfferDiv').show();
                $scope.loading = false;        
            }, 1000);
        });
        $scope.rejectOfferLetter = function(){

            //$scope.disableReject = true;
            $scope.disableLoadReject = true;
            $mdDialog.hide();
            $scope.loading = true;
            CandidateUsersService.rejectOfferLetter(vm.offerData.offerId).then(
                function (response) {
                    $scope.disableLoadReject = false;
                    $scope.loading = false;
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                    else if (response.data.Success) {                        
                        // ToastrService.success(response.data.message);
                        $scope.disableReject = true;
                        $scope.loading = false;
                        
                        $rootScope.$emit('RejectedOfferLetter', true);
                        $mdDialog.hide();
                        $state.go('login');
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG145);
                    $scope.disableLoadReject = false;
                    $scope.loading = false;
                }
            ).finally( function() {
                $scope.loading = false;
                $scope.disableLoadReject = false;
            });
        }

        //vm.opnRejectComments = function(ev){
            
        vm.opnRejectComments = function(ev){
            // $mdDialog.show({
            //     scope:$scope,
            //     preserveScope: true,
            //     templateUrl: rootUrl + '/components/candidate/comments/comments.html',
            //     targetEvent: ev,
            //     parent: angular.element(document.body),
            //     clickOutsideToClose: true,
            //     escapeToClose: true
            // })
            // .then(function(res) {
            // }, function() {
            //     console.log('You cancelled the document upload.');
            // })


            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                controller: ['$scope', '$mdDialog', function($scope, $mdDialog){
                }],
                template: '<md-dialog aria-label="Delete" style="width:400px;">' +
                          '<div layout="column" layout-align="start end" style="padding:10px;">'+
                          '<ng-md-icon icon="clear" size="14" style="margin:8px 0 -23px 0;cursor:pointer" ng-click="vm.cancel()">'+
                          '</ng-md-icon>'+
                          '</div>'+
                          '<md-content style="background-color:white">' +
                          '<div layout="column" layout-align="center center"><img src="images/que_icon.png" width="70px" height="70px"/></div>'+
                          '<p align=center style="padding:10px 10px 20px 20px;font-size:13px;" >Are you sure you want to reject offer letter?</p>' +
                          '<md-divider></md-divider>'+
                          '<div layout="row" layout-align="end center" style="background-color:rgb(250,250,250);height:60px;padding:10px" flex>' +
                          '<md-button class="md-raised md-primary" ng-click="rejectOfferLetter()" >Confirm</md-button>' +
                          '<md-button class="md-secondary" ng-click="vm.cancel()">Cancel</md-button>' +
                          '</div>' +
                          '</md-content>' +
                          '</md-dialog>'
                });

            

        }

            

        //}
        var count = 1;
        vm.getOfferLetter = function(){
            var id = "19704"; //$rootScope.CandidateInfo.newhireid
            $scope.disableLoadReject = true;
            CandidateUsersService.getOfferLetter($rootScope.CandidateInfo.newhireid).then(
                function (response) {
                    //$scope.loading = false; 
                    $scope.disableLoadReject = false;
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                        // vm.ErrorMessage = response.data.message;
                    }
                    else if (response.data.success) {
                        if(response.data.OfferLetter.offerStatus === 5){
                            vm.goToCommonDetail();
                        }
                        if(response.data.OfferLetter.offerStatus === 3){
                            $scope.disableReject = true;
                            $rootScope.$emit('RejectedOfferLetter', true);
                        }
                        vm.offerData = response.data.OfferLetter;
                        if(vm.offerData && !vm.offerData.redirecturl){
                            ToastrService.error($rootScope.errorMsgs.MSG157);
                            // vm.getOfferLetter();
                            // count++;
                            // $rootScope.CandidateInfo = null;
                            // localStorage.clear();
                            // $state.go('login');
                        }
                    }
                },
                function (err) {
                    $scope.disableLoadReject = false;
                    ToastrService.error($rootScope.errorMsgs.MSG145);
                }
            ).finally( function() {
                //$scope.loading = false; 
                //$scope.loading = false;
                    $scope.disableLoadReject = false;
            });
        }

        vm.getOfferLetter();

        vm.openLetter = function(ev){
            
            $mdDialog.show({
                templateUrl: 'components/candidate/candidateLetter.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false,
                controller: ['$scope', '$mdDialog', function($scope, $mdDialog){

        
                    $scope.hide = function(ev) {
                        $mdDialog.hide();
                    }
            
                    $scope.cancel = function(ev) {
                        $scope.fileThumb = '';
                        $mdDialog.cancel();
                    }
            
                    $scope.answer = function(ev, answer) {
                        $mdDialog.hide(answer);
                    }
                    // function bindEvent(element, eventName, eventHandler) {
                    //     if (element.addEventListener){
                    //         element.addEventListener(eventName, eventHandler, false);
                    //     } else if (element.attachEvent) {
                    //         element.attachEvent('on' + eventName, eventHandler);
                    //     }
                    // }
                    //   //var  results = document.getElementById('results');
                    // // Send a message to the child iframe
                    
                    
                    // // Listen to message from child window
                    // bindEvent(window, 'message', function (e) {
                    //     //results.innerHTML = e.data;
                    //     alert(e.data);
                    // });

                }]
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        }
        
        function bindEvent(element, eventName, eventHandler) {
            if (element.addEventListener){
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
        }
          //var  results = document.getElementById('results');
        // Send a message to the child iframe
        
        
        // Listen to message from child window
        bindEvent(window, 'message', function (e) {
            //results.innerHTML = e.data;
            //alert(e.data);
            document.getElementById('results').innerHTML = '';
            $scope.$apply(function(){
                $scope.disableAccept = false;
                //$scope.disableReject = true;
                $scope.loading = true;
                $rootScope.CandidateInfo.statusid = 3;
                localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));                
                $state.go('candidateinfo');
                // if($scope.disableReject){
                //     $state.go('login');
                // } else {
                //     $state.go('candidateinfo.commondetails');
                // }
            });
        });
    }
})();