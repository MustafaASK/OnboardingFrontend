(function () {
    'use strict';
    candidateApp.controller('CandidateLoginController', CandidateLoginController);
    CandidateLoginController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$mdDialog', '$timeout', '$http', 'ToastrService', 'CandidateUsersService',  '$interval', '$document'];
    function CandidateLoginController($rootScope, $scope, $state, $stateParams, $mdDialog, $timeout, $http, ToastrService, CandidateUsersService,  $interval, $document) {
        $rootScope.CandidateInfo = null;
        var vm = this;
        vm.Login = {};
        var emailToken = localStorage.getItem('emailFromToken');
        localStorage.clear();
        var location = window.location;

        if (emailToken) {
            vm.Login.emailId = emailToken.split(":")[0];
        }
        else if(location.hash.indexOf('?') != -1) {
            vm.Login.emailId = location.hash.split("?")[1];
        }

        

        vm.heightForCandidate = $(document).height() + 'px';
        vm.heightForCandidateIntro = $(document).height() - 40 + 'px';
        vm.backgroundImage = $rootScope.BrandingImagesURL;
        vm.logoImage = $rootScope.LogoImagesURL;

        $rootScope.CopyrightsFooter = false;
        $scope.forcelogin = false;
        localStorage.setItem('atleastOneDocCompleted', false);


        vm.activated = $scope.loading;
        vm.activated = true;
        vm.determinateValue = 100;

        // Iterate every 100ms, non-stop and increment
        // the Determinate loader.
        $interval(function () {

            vm.determinateValue += 1;
            if (vm.determinateValue > 100) {
                vm.determinateValue = 100;
            }

        }, 100);



        vm.submit = function () {
            if (!vm.Login.emailId || !vm.Login.password) {
                ToastrService.error($rootScope.errorMsgs.MSG155);
                return false;
            }

            $scope.loading = true;
            CandidateUsersService.login(vm.Login.emailId, vm.Login.password).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                    if (response.data.Expired) {
                        $state.go('linkExpired');
                    }
                    /*    if (response.data.Status == 401) {
                            forceSessionKill();
                        }                     //today*/

                    if (response.data.Success) {
                        $rootScope.CandidateInfo = response.data;
                        $rootScope.CopyrightsFooter = true;
                        //  $rootScope.Token = response.headers('ask-auth-token');//today
                        localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));
                        //  localStorage.setItem("ask-auth-token", $rootScope.Token);//today
                        localStorage.setItem("CopyrightsFooter", $rootScope.CopyrightsFooter);
                        // $state.go('introduction');
                        if ($rootScope.CandidateInfo.statusid == 3 && !$rootScope.CandidateInfo.commonfields) {
                            $state.go('candidateinfo');
                        }
                        else if (!$rootScope.CandidateInfo.commonfields && !$rootScope.CandidateInfo.bgvAddressflag && !$rootScope.CandidateInfo.bgvEmployementflag && !$rootScope.CandidateInfo.bgvEducationflag && !$rootScope.CandidateInfo.bgvReferencesflag && !$rootScope.CandidateInfo.bgvPayrollflag && !$rootScope.CandidateInfo.bgvContractorflag && !$rootScope.CandidateInfo.bgvEeoflag) {
                            $state.go('introduction');
                        }
                        else if (!$rootScope.CandidateInfo.commonfields) {
                            //$state.go('dashboard');
                            $state.go('candidateinfo');
                        }
                        // else if ((!$rootScope.CandidateInfo.bgvAddressflag && $rootScope.CandidateInfo.AddressFlag) || (!$rootScope.CandidateInfo.bgvEmployementflag && $rootScope.CandidateInfo.Employementflag) || (!$rootScope.CandidateInfo.bgvEducationflag && $rootScope.CandidateInfo.Educationflag) || (!$rootScope.CandidateInfo.bgvReferencesflag && $rootScope.CandidateInfo.Referencesflag)) {
                        //     $state.go('candidateinfo.bgvforms');
                        // }
                        // else if ((!$rootScope.CandidateInfo.bgvPayrollflag && $rootScope.CandidateInfo.Ddflag) && $rootScope.CandidateInfo.catgid == 1) {
                        //     $state.go('candidateinfo.payrollpackage');
                        // }
                        // else if ((!$rootScope.CandidateInfo.bgvContractorflag && $rootScope.CandidateInfo.Contractorflag) && $rootScope.CandidateInfo.catgid != 1) {
                        //     $state.go('candidateinfo.contractorinfo');
                        // }
                        // else if ((!$rootScope.CandidateInfo.bgvEeoflag && $rootScope.CandidateInfo.Eeoflag) && $rootScope.CandidateInfo.catgid == 1) {
                        //     $state.go('candidateinfo.eeo');
                        // }
                        else {
                            $state.go('dashboard', {}, { reload: 'dashboard' });

                        }
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG156);
                }
            ).finally(function () {
                $scope.loading = false;
            });

        }

        //today















    }
})();