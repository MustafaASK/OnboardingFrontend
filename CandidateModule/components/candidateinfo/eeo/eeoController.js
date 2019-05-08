(function() {
    'use strict';
    candidateApp.controller('EEOController', EEOController);
    EEOController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$location', 'ToastrService', 'EEOService', '$mdDialog', '$filter', '$timeout', 'PayrollPackageService','CandidateUsersService'];

    function EEOController($scope, $rootScope, $state, $stateParams, $location, ToastrService, EEOService, $mdDialog, $filter, $timeout, PayrollPackageService, CandidateUsersService) {
        var vm = this;

        // var isEEODataAvailable = false;

        vm.EEODetails = {};
        // vm.EEODetails.gender = 0;
        // vm.EEODetails.race = 0;
        vm.disablePrevious = false;
        vm.disableSkip = false;
        vm.saveEEOForm = saveEEOForm;
        $scope.submitted = false;

        $scope.$parent.currentNavItem = 4;
        $scope.$parent.vm.disableTabCommonDetails = true;

        vm.checkCandidateSign = $scope.$parent.vm.disableEeo;
        var submitRejectedForm = false;

        vm.submitAndSign = function(eeoForm){
            submitRejectedForm = true;
            vm.saveEEOForm(eeoForm);
        }

        if (localStorage.getItem("eeoedit")) {
            vm.disablePrevious = true;
            vm.disableSkip = true;
        }

        function getEEODetails() {
            EEOService.viewEEODetails($rootScope.CandidateInfo.newhireid).then(
                function(response) {
                    if (response.data.Success) {
                        vm.EEODetails = response.data;
                        delete vm.EEODetails.Success;
                    }
                },
                function(err) {
                    ToastrService.error($rootScope.errorMsgs.MSG142);
                }
            )
        }
        getEEODetails();

        function getCommonDetails() {
            PayrollPackageService.getCommonDetails($rootScope.CandidateInfo.newhireid).then(
                function(response) {
                    if (response.data) {
                        vm.commonDetails = response.data;
                        $scope.fullnameUpdated = vm.commonDetails.firstname + ' ' + (vm.commonDetails.middlename == 'NaN' ? '' : vm.commonDetails.middlename + ' ') + vm.commonDetails.lastname;
                        vm.EEODetails.gender = vm.commonDetails.gender;
                        if(!vm.EEODetails.jobtitle)
                        {
                            vm.EEODetails.jobtitle = $rootScope.CandidateInfo.jobtitile;
                        }
                        // delete vm.ContractorInfo.Success;
                    }
                },
                function(err) {
                    ToastrService.error($rootScope.errorMsgs.MSG142);
                }
            )
        }
        getCommonDetails();
       

        function saveEEOForm(eeoForm) {
            $scope.submitted = true;
            if (!eeoForm) {
                ToastrService.error($rootScope.errorMsgs.MSG128);
                return;
            }
            if (vm.EEODetails.jobtitle.trim() == '') {
                ToastrService.error('Please enter valid Position Applied For');
                return;
            }
            vm.EEODetails.newHireId = { 'newhireid': $rootScope.CandidateInfo.newhireid };
            $scope.loading = true;
            if (vm.EEODetails.eeoid) {
                vm.EEODetails.gender = vm.EEODetails.gender == 1 ? 1 : 2;
                vm.EEODetails.jobtitle = vm.EEODetails.jobtitle;
                vm.EEODetails.fullname = $scope.fullnameUpdated;
                vm.EEODetails.newHireId = {"newhireid": $rootScope.CandidateInfo.newhireid };
                EEOService.editEEODetails(vm.EEODetails).then(
                    function(response) {
                        $scope.loading = false;
                        // ToastrService.success(response.data.message);
                        $rootScope.CandidateInfo.bgvEeoflag = true;
                        localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));
                        vm.navigateNext();
                    },
                    function(err) {
                        $scope.loading = false;
                        ToastrService.error($rootScope.errorMsgs.MSG140);
                    }
                )
            } else {
                vm.EEODetails.gender = vm.EEODetails.gender == 1 ? 1 : 2;
                vm.EEODetails.jobtitle = vm.EEODetails.jobtitle;
                vm.EEODetails.fullname = $scope.fullnameUpdated;
                EEOService.addEEODetails(vm.EEODetails).then(
                    function(response) {
                        $scope.loading = false;
                        $rootScope.CandidateInfo.bgvEeoflag = true;
                        localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));
                        // ToastrService.success(response.data.message);
                        getCommonDetails();
                        vm.navigateNext();
                    },
                    function(err) {
                        $scope.loading = false;
                        ToastrService.error($rootScope.errorMsgs.MSG141);
                    }
                )
            }
        }

        vm.navigatePrevious = function() {
            if ($rootScope.CandidateInfo.Contractorflag && $rootScope.CandidateInfo.catgid != 1) {
                $state.go('candidateinfo.contractorinfo');
            } else if ($rootScope.CandidateInfo.Ddflag && $rootScope.CandidateInfo.catgid == 1) {
                $state.go('candidateinfo.payrollpackage');
            } else if ($rootScope.CandidateInfo.AddressFlag || $rootScope.CandidateInfo.Educationflag || $rootScope.CandidateInfo.Employementflag || $rootScope.CandidateInfo.Referencesflag) {
                $state.go('candidateinfo.bgvforms');
            } else {
                $state.go('candidateinfo.commondetails');
            }
        }

        vm.referencsList = [];
        vm.employementList = [];
        vm.addressList = [];
        vm.educationList = [];
        vm.getRefernces = function () {
            
            CandidateUsersService.getRefernces($rootScope.CandidateInfo.newhireid).then(
                function (response) {
                    if (response.data.Success) {
                        vm.referencsList = response.data.ReferenceDetails;
                    }
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG130);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }
        vm.getRefernces();
            
        vm.getEmploymentList = function () {

            CandidateUsersService.getEmploymentList($rootScope.CandidateInfo.newhireid).then(
                function (response) {
                    if (response.data.Success) {
                        vm.employementList = response.data.EmployementDetails;            
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG130);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }
        vm.getEmploymentList();

        vm.getAddressList = function () {

            CandidateUsersService.getAddressList($rootScope.CandidateInfo.newhireid).then(
                function (response) {
                    if (response.data.Success) {
                        vm.addressList = response.data.AddressDetails;

                    }
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG130);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }
        vm.getAddressList();

        vm.getEducationList = function () {

            CandidateUsersService.getEducationList($rootScope.CandidateInfo.newhireid).then(
                function (response) {
                    if (response.data.Success) {
                        vm.educationList = response.data.EducationDetails;            
                    }
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG130);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }
        vm.getEducationList();
            
            
        vm.navigateNext = function() {
            //if (skipnext == 'next') {
                if (($rootScope.CandidateInfo.AddressFlag && vm.addressList.length == 0) || ($rootScope.CandidateInfo.Referencesflag && vm.referencsList.length == 0) || ($rootScope.CandidateInfo.Educationflag && vm.educationList.length == 0) || ($rootScope.CandidateInfo.Employementflag && vm.employementList.length == 0)) {
                    ToastrService.error($rootScope.errorMsgs.MSG270);
                    return;
                }
            //}
            if($rootScope.dashboardEnabled){
                $scope.$parent.delechosignagreement();
            }
            if(submitRejectedForm){ 
                submitRejectedForm = false;
                if (localStorage.getItem("bgvedit")) {
                    localStorage.setItem("frombgv", true);
                } else if(localStorage.getItem("eeoedit")){
                    localStorage.setItem("fromeeo", true);
                } else if(localStorage.getItem("payrolledit")){
                    localStorage.setItem("frompayroll", true);
                } else if(localStorage.getItem("contractoredit")){
                    localStorage.setItem("fromcontractor", true);
                } else if(localStorage.getItem("clientspecificedit")){
                    localStorage.setItem("fromclientspecific", true);
                } else if(localStorage.getItem("w4edit")){
                    localStorage.setItem("fromw4", true);
                } else if(localStorage.getItem("drugedit")){
                    localStorage.setItem("fromdrug", true);
                } 
                $rootScope.$emit('DashpoardPageUpdated', true);
                $state.go('dashboard');

            } else {
                // if (localStorage.getItem("eeoedit")) {
                //     localStorage.setItem("fromeeo", true);
                //     $rootScope.$emit('DashpoardPageUpdated', true);
                //     $state.go('dashboard');
                // }
                if (vm.checkCandidateSign) {
                    if (localStorage.getItem("bgvedit")) {
                        localStorage.setItem("frombgv", true);
                    } else if(localStorage.getItem("eeoedit")){
                        localStorage.setItem("fromeeo", true);
                    } else if(localStorage.getItem("payrolledit")){
                        localStorage.setItem("frompayroll", true);
                    } else if(localStorage.getItem("contractoredit")){
                        localStorage.setItem("fromcontractor", true);
                    } else if(localStorage.getItem("clientspecificedit")){
                        localStorage.setItem("fromclientspecific", true);
                    } else if(localStorage.getItem("w4edit")){
                        localStorage.setItem("fromw4", true);
                    } else if(localStorage.getItem("drugedit")){
                        localStorage.setItem("fromdrug", true);
                    } 
                    $rootScope.$emit('DashpoardPageUpdated', true);
                    $state.go('dashboard');
                } else {
                    //$state.go('dashboard');
                    //if($rootScope.CandidateInfo.catgid == 1){
                        if ( ($rootScope.CandidateInfo.AddressFlag  === $rootScope.CandidateInfo.bgvAddressflag) && ($rootScope.CandidateInfo.bgvEmployementflag === $rootScope.CandidateInfo.Employementflag) && ($rootScope.CandidateInfo.bgvEducationflag === $rootScope.CandidateInfo.Educationflag) && ($rootScope.CandidateInfo.Referencesflag === $rootScope.CandidateInfo.bgvReferencesflag) && ($rootScope.CandidateInfo.Ddflag  === $rootScope.CandidateInfo.bgvPayrollflag) && ($rootScope.CandidateInfo.Eeoflag  === $rootScope.CandidateInfo.bgvEeoflag)) {
                            $rootScope.$emit('DashpoardPageUpdated', true);
                            $state.go('dashboard', {}, { reload: 'dashboard' });
                        } else {
                            $state.go('introduction');
                            //ToastrService.error('Please submit all process forms');
                        }
                    // } else {
                    //     if ( ($rootScope.CandidateInfo.AddressFlag  === $rootScope.CandidateInfo.bgvAddressflag) && ($rootScope.CandidateInfo.bgvEmployementflag === $rootScope.CandidateInfo.Employementflag) && ($rootScope.CandidateInfo.bgvEducationflag === $rootScope.CandidateInfo.Educationflag) && ($rootScope.CandidateInfo.Referencesflag === $rootScope.CandidateInfo.bgvReferencesflag) && ($rootScope.CandidateInfo.Contractorflag  === $rootScope.CandidateInfo.bgvContractorflag)) {
                    //         $state.go('dashboard', {}, { reload: 'dashboard' });
                    //     } else {
                    //         ToastrService.error('Please submit all process forms');
                    //     }
    
                    // }
                }

            }
        }

        $scope.browserType = function () {
            if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
                vm.heightforCommonDetails = '90%';
                vm.heightforCommonDetailsFooter = '10%';
            }
            else if (navigator.userAgent.indexOf("Chrome") != -1) {
                vm.heightforCommonDetails = '90%';
                vm.heightforCommonDetailsFooter = '10%';
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                vm.heightforCommonDetails = '90%';
                vm.heightforCommonDetailsFooter = '10%';
                if(navigator.userAgent.indexOf("Version/10") != -1 ) {
                    vm.heightForWebForms = $(document).height() - 90 ;
                    vm.heightforCommonDetails = vm.heightForWebForms * 0.9 + 'px' ;
                    vm.heightforCommonDetailsFooter = vm.heightForWebForms * 0.1 + 'px' ;
                }
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                vm.heightforCommonDetails = '90%';
                vm.heightforCommonDetailsFooter = '10%';
            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                vm.heightforCommonDetails = '90%';
                vm.heightforCommonDetailsFooter = '10%';
            }
            else {
                
            }
        }
        $scope.browserType();

    }
})();