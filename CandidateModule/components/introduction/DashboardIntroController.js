
(function () {
    'use strict';
    candidateApp.controller('DashboardIntroController', DashboardIntroController);
    DashboardIntroController.$inject = ['$rootScope', '$state', '$stateParams', '$scope', '$filter', '$timeout', '$mdDialog', 'ToastrService','CandidateUsersService','$sce'];
    function DashboardIntroController($rootScope, $state, $stateParams, $scope, $filter, $timeout, $mdDialog, ToastrService, CandidateUsersService,$sce) {

        var vm = this;
        $scope.name="john";

        vm.heightForCandidateIntro = $(document).height() - 40 + 'px';

        $scope.isInContractorEdit= localStorage.getItem("contractoredit");
        $scope.isInEEOEdit= localStorage.getItem("eeoedit");
        $scope.isInBgvEdit= localStorage.getItem("bgvedit");
        $scope.isInPayrollEdit= localStorage.getItem("payrolledit");

        vm.go = function(){
            // if($rootScope.CandidateInfo.statusid == 3){
            //     $state.go('candidateinfo.commondetails');
            // } else {
            //     $state.go('offerletter');
            // }
            
                        // $state.go('introduction');
                        if ($rootScope.CandidateInfo.statusid != 3 && $rootScope.CandidateInfo.statusid != 4 && $rootScope.CandidateInfo.statusid != 9 && $rootScope.CandidateInfo.statusid != 10 ) {
                            $state.go('offerletter');
                        }
                        else if (($rootScope.CandidateInfo.statusid == 3 || $rootScope.CandidateInfo.statusid == 4 || $rootScope.CandidateInfo.statusid == 9 || $rootScope.CandidateInfo.statusid == 10) && !$rootScope.CandidateInfo.commonfields) {
                            $state.go('candidateinfo');
                        }
                        // else if ( (!$rootScope.CandidateInfo.bgvAddressflag && $rootScope.CandidateInfo.AddressFlag) || (!$rootScope.CandidateInfo.bgvEmployementflag && $rootScope.CandidateInfo.Employementflag) || (!$rootScope.CandidateInfo.bgvEducationflag && $rootScope.CandidateInfo.Educationflag) || (!$rootScope.CandidateInfo.bgvReferencesflag  && $rootScope.CandidateInfo.Referencesflag)) {
                        //     $state.go('candidateinfo.bgvforms');
                        // }
                        // else if ((!$rootScope.CandidateInfo.bgvPayrollflag && $rootScope.CandidateInfo.Ddflag) && $rootScope.CandidateInfo.catgid == 1) {
                        //     $state.go('candidateinfo.payrollpackage');
                        // }
                        // else if ((!$rootScope.CandidateInfo.bgvContractorflag && $rootScope.CandidateInfo.Contractorflag)&& $rootScope.CandidateInfo.catgid != 1) {
                        //     $state.go('candidateinfo.contractorinfo');
                        // }
                        // else if ((!$rootScope.CandidateInfo.bgvEeoflag  && $rootScope.CandidateInfo.Eeoflag) && $rootScope.CandidateInfo.catgid == 1) {
                        //     $state.go('candidateinfo.eeo');
                        // }
                        else {
                            //vm.getReview();
                            if($rootScope.atleastOneDocCompleted){
                                $state.go('dashboard', {}, { reload: 'dashboard' });
                            } else {
                                $state.go('candidateinfo');
                            }
                            
                        }
            
        }
        vm.getTasks = function() {
            CandidateUsersService.getClientIntro($rootScope.CandidateInfo.newhireid).then(
                function (response) {
                    if(response.data.Success){
                        vm.clientIntro = response.data.ClientIntroduction[0];
                    } else {
                        
                        // ToastrService.error(response.data.message);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG154);
                }
            )
        }
        vm.getTasks();
        vm.getReview = function() {
            $scope.loading = true;
            CandidateUsersService.getReview($rootScope.CandidateInfo.newhireid).then(
                function(response) {
                    if (response.data.Error) {
                        $scope.loading = false;
                        ToastrService.error(response.data.message);
                    } else {
                        vm.stepsData = response.data.steps;
                        vm.checkAtleastOneDocCompleted();
                    }
                },
                function(err) {
                    $scope.loading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG145);
                }
            ).finally(function() {
                $scope.loading = false;
                $scope.loading = false;
            });
        }
        vm.checkAtleastOneDocCompleted = function(){
            $rootScope.atleastOneDocCompleted = false;

            angular.forEach(vm.stepsData, function(val, key) {
                angular.forEach(val.stepdocumentids, function(val1, key1) {
                    if(val1.documentfilestatus == 3 || val1.documentfilestatus == 4 || val1.documentSignStatus === 5){                        
                        $rootScope.atleastOneDocCompleted = true;
                    }
                    
                });

                
            });
            $scope.loading = false;
            //$state.go('dashboard', {}, { reload: 'dashboard' });

        }

        $scope.trustAsHtml = function () {
            return $sce.trustAsHtml(vm.clientIntro.HeadText);
        };
        $scope.trustAsHtmlForArticle = function () {
            return $sce.trustAsHtml(vm.clientIntro.ArticalText);
        };





    }
})();