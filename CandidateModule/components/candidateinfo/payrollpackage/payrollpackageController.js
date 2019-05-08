(function () {
    'use strict';
    candidateApp.controller('PayrollPackageController', payrollPackageController);
    payrollPackageController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$location', 'ToastrService', 'CandidateUsersService', 'PayrollPackageService', '$mdDialog', '$filter', '$timeout'];

    function payrollPackageController($scope, $rootScope, $state, $stateParams, $location, ToastrService, CandidateUsersService, PayrollPackageService, $mdDialog, $filter, $timeout) {
        var vm = this;

        /* autocomplete part start*/
        $scope.options = {"getType":"state","watchEnter":true,"country":"us"};
        $scope.options1 = {"getType":"city","watchEnter":true,"types":"(cities)","country":"us"};
        $scope.addrOptionsUS = {"getType":"address","watchEnter":false,"country":"us"};

        /* autocomplete part end */
        vm.checkCandidateSign = $scope.$parent.vm.disablePayroll;
        var submitRejectedForm = false;
        $scope.$parent.vm.disableTabCommonDetails = true;
        
        $scope.bgvFlag = $rootScope.CandidateInfo.AddressFlag || $rootScope.CandidateInfo.Educationflag || $rootScope.CandidateInfo.Employementflag || $rootScope.CandidateInfo.Referencesflag;
        if ($scope.bgvFlag)
            $scope.$parent.currentNavItem = 2;
        else
            $scope.$parent.currentNavItem = 1;
        $scope.submitted = false;
        vm.savePayrollPackage = savePayrollPackage;
        vm.payrollPackage = {};
        vm.disablePrevious = false;
        vm.disableSkip = false;
        //vm.payrollPackage.payoption = "0";

        //vm.payrollPackage.accounttwotype = "0";
        //vm.payrollPackage.accountonetype = "0";

        if (localStorage.getItem("payrolledit")) {
            vm.disablePrevious = true;
            vm.disableSkip = true;
        }

        $scope.updateState = function(stateParam){
            if(stateParam) { 
                vm.payrollPackage.state1 = stateParam;
            }
        }
        
        vm.submitAndSign = function(payrollForm, depositForm, account1, account2){
            submitRejectedForm = true;
            vm.savePayrollPackage(payrollForm, depositForm, account1, account2);
        }

        $scope.updateCityStateCountryZip1 = function(cityParam, stateParam, zipParam){
            if(cityParam) { 
                vm.payrollPackage.city1 = cityParam; 
            }  
            if(stateParam) { 
                vm.payrollPackage.state1 = stateParam; 
            }   
            // if(countryParam) { 
            //     vm.payrollPackage.country = countryParam; 
            // }   
            if(zipParam) { 
                vm.payrollPackage.zipcode1 = zipParam; 
            }           
        }
        
        $scope.updateCityStateCountryZip2 = function(cityParam, stateParam, zipParam){
            if(cityParam) { 
                vm.payrollPackage.city2 = cityParam; 
            }  
            if(stateParam) { 
                vm.payrollPackage.state2 = stateParam; 
            }   
            // if(countryParam) { 
            //     vm.payrollPackage.country = countryParam; 
            // }   
            if(zipParam) { 
                vm.payrollPackage.zipcode2 = zipParam; 
            }           
        }

        $scope.updateState2 = function(stateParam){
            if(stateParam) { 
                vm.payrollPackage.state2 = stateParam;
            }
        }

        // vm.getCities = function (id) {
        //     CandidateUsersService.getCities(id).then(
        //         function (response) {
        //             vm.cityList = response.data;
        //             if (!vm.payrollPackage.payrollid) {
        //                 vm.payrollPackage.city1 = vm.cityList[0].cityCode;
        //                 vm.payrollPackage.city2 = vm.cityList[0].cityCode;
        //             }
        //         },
        //         function (err) {
        //             ToastrService.error($rootScope.errorMsgs.MSG138);
        //         }
        //     )
        // }

        // vm.getCities2 = function (id) {
        //     CandidateUsersService.getCities(id).then(
        //         function (response) {
        //             vm.cityList2 = response.data;
        //         vm.payrollPackage.city2 = vm.cityList2[0].cityCode;
        //         },
        //         function (err) {
        //             ToastrService.error($rootScope.errorMsgs.MSG138);
        //         }
        //     )
        // }

        function statesList() {
            CandidateUsersService.getStatesList().then(
                function (response) {
                    vm.statesList = response.data;
                    if (!vm.payrollPackage.payrollid) {
                        vm.payrollPackage.state1 = vm.statesList[0].stateCode;
                        vm.payrollPackage.state2 = vm.statesList[0].stateCode;
                    }
                    // vm.getCities();
                    //vm.getCities2();
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG132);
                }
            )
        }

        function getPayrollPackage() {
            PayrollPackageService.viewPayrollPackage($rootScope.CandidateInfo.newhireid).then(
                function (response) {
                    if (response.data.Success) {
                        vm.payrollPackage = response.data;
                        vm.payrollPackage.payamountpercent1 = vm.payrollPackage.payamountpercent1;
                        vm.payrollPackage.payamountpercent2 = vm.payrollPackage.payamountpercent2;
                        vm.confrmaccountnumber1 = vm.payrollPackage.accountone;
                        vm.cnfrmroutingnumber1 = vm.payrollPackage.routingone;
                        vm.confrmaccountnumber2 = vm.payrollPackage.accounttwo;
                        vm.cnfrmroutingnumber2 = vm.payrollPackage.routingtwo;
                        if (vm.payrollPackage.city1 == "") {
                            vm.payrollPackage.city1 = "";
                            vm.payrollPackage.state1 = "";
                            vm.payrollPackage.accountonetype = null;
                        }
                        if (vm.payrollPackage.city2 == "") {
                            vm.payrollPackage.city2 = "";
                            vm.payrollPackage.state2 = "";
                            vm.payrollPackage.accounttwotype = null;
                        }
                        if (vm.payrollPackage.payrollid) {
                            vm.confrmaccountnumber1 = vm.confrmaccountnumber1 ? vm.confrmaccountnumber1 : ' ';
                            $scope.tempaccountnumber1 = angular.copy(vm.confrmaccountnumber1);
                            $scope.tempconfrmaccountnumber1 = angular.copy(vm.confrmaccountnumber1);

                            vm.confrmaccountnumber2 = vm.confrmaccountnumber2 ? vm.confrmaccountnumber2 : ' ';

                            $scope.tempaccountnumber2 = angular.copy(vm.confrmaccountnumber2);
                            $scope.tempconfrmaccountnumber2 = angular.copy(vm.confrmaccountnumber2);

                            vm.cnfrmroutingnumber1 = vm.cnfrmroutingnumber1 ? vm.cnfrmroutingnumber1 : ' ';

                            $scope.temprouting1 = angular.copy(vm.cnfrmroutingnumber1);
                            $scope.tempconfrmrouting1 = angular.copy(vm.cnfrmroutingnumber1);

                            vm.cnfrmroutingnumber2 = vm.cnfrmroutingnumber2 ? vm.cnfrmroutingnumber2 : ' ';

                            $scope.temprouting2 = angular.copy(vm.cnfrmroutingnumber2);
                            $scope.tempconfrmrouting2 = angular.copy(vm.cnfrmroutingnumber2);
                        } else {
                            $scope.tempaccountnumber1 = ' ';
                            $scope.tempconfrmaccountnumber1 = ' ';
                            vm.payrollPackage.payamountpercent1 = '';

                            $scope.tempaccountnumber2 = ' ';
                            $scope.tempconfrmaccountnumber2 = ' ';
                            vm.payrollPackage.payamountpercent2 = '';

                            $scope.temprouting1 = ' ';
                            $scope.tempconfrmrouting1 = ' ';
                            vm.payrollPackage.routingone = ' ';

                            $scope.temprouting2 = ' ';
                            $scope.tempconfrmrouting2 = ' ';
                            vm.payrollPackage.routingtwo = ' ';

                        }
                        //statesList();
                    } else {
                        $scope.tempaccountnumber1 = ' ';
                        $scope.tempconfrmaccountnumber1 = ' ';
                        vm.payrollPackage.payamountpercent1 = '';

                        $scope.tempaccountnumber2 = ' ';
                        $scope.tempconfrmaccountnumber2 = ' ';
                        vm.payrollPackage.payamountpercent2 = '';

                        $scope.temprouting1 = ' ';
                        $scope.tempconfrmrouting1 = ' ';
                        vm.payrollPackage.routingone = ' ';

                        $scope.temprouting2 = ' ';
                        $scope.tempconfrmrouting2 = ' ';
                        vm.payrollPackage.routingtwo = ' ';
                        //statesList();
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG266);
                }
            )
        }
        getPayrollPackage();

        // if(vm.payrollPackage.city1){
        //     vm.payrollPackage.city1 = vm.cityList[0].cityCode;
        //     vm.payrollPackage.state1 = vm.statesList[0].stateCode;
        // }
        function getCommonDetails() {
            PayrollPackageService.getCommonDetails($rootScope.CandidateInfo.newhireid).then(
                function (response) {
                    if (response.data) {
                        vm.commonDetails = response.data;
                        $scope.fullNameUpdated = vm.commonDetails.firstname + ' ' + (vm.commonDetails.middlename == 'NaN' ? '' : vm.commonDetails.middlename + ' ') + vm.commonDetails.lastname;
                        // delete vm.ContractorInfo.Success;
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG266);
                }
            )
        }
        getCommonDetails();

        function savePayrollPackage(payrollForm, depositForm, account1, account2) {
            $scope.submitted = true;
            if (vm.payrollPackage.payoption == 1 && (!payrollForm || !depositForm || !account1)) {
                ToastrService.error($rootScope.errorMsgs.MSG128);
                return;
            }
            if (vm.payrollPackage.payoption == 1) {
                if (($scope.orignaccountnumber2 || $scope.orignrouting2) && !account2) {
                    ToastrService.error($rootScope.errorMsgs.MSG128);
                    return;
                }
            }

            // if (vm.payrollPackage.payoption == 1 && !payrollForm) {
            //     ToastrService.error($rootScope.errorMsgs.MSG128);
            //     return;
            // }
            if (!payrollForm) {
                ToastrService.error($rootScope.errorMsgs.MSG128);
                return;
            }
            // if (account1) {
            //     if (vm.payrollPackage.accountonetype == 2) {
            //         ToastrService.error($rootScope.errorMsgs.MSG253);
            //         return;
            //     }
            // }
            // if (account2) {
            //     if (vm.payrollPackage.accounttwotype == 2) {
            //         ToastrService.error($rootScope.errorMsgs.MSG254);
            //         return;
            //     }
            // }
            
            vm.payrollPackage.newHireId = { 'newhireid': $rootScope.CandidateInfo.newhireid };
            if (vm.payrollPackage.payrollid) {
                vm.payrollPackage.payoption = vm.payrollPackage.payoption == 1 ? 1 : 2;
                if (vm.payrollPackage.payoption == 2) {
                    objForPayroll();
                } else {
                    vm.payrollPackage.accountone = $scope.orignaccountnumber1;
                    vm.payrollPackage.routingone = $scope.orignrouting1;
                    vm.payrollPackage.accounttwo = $scope.orignaccountnumber2;
                    vm.payrollPackage.routingtwo = $scope.orignrouting2;
                }
                vm.payrollPackage.fullname = $scope.fullNameUpdated;
                $scope.loading = true;
                PayrollPackageService.editPayrollPackage(vm.payrollPackage).then(
                    function (response) {
                        $scope.loading = false;
                        // ToastrService.success(response.data.message);
                        $rootScope.CandidateInfo.bgvPayrollflag = true;
                        localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));
                        vm.navigateNext();
                    },
                    function (err) {
                        $scope.loading = false;
                        ToastrService.error($rootScope.errorMsgs.MSG265);
                    }
                )
            } else {
                vm.payrollPackage.payoption = vm.payrollPackage.payoption == 1 ? 1 : 2;
                if (vm.payrollPackage.payoption == 2) {
                    objForPayroll();
                } else {
                    vm.payrollPackage.accountone = $scope.orignaccountnumber1;
                    vm.payrollPackage.routingone = $scope.orignrouting1;
                    vm.payrollPackage.accounttwo = $scope.orignaccountnumber2;
                    vm.payrollPackage.routingtwo = $scope.orignrouting2;
                }
                vm.payrollPackage.fullname = $scope.fullNameUpdated;
                $scope.loading = true;
                PayrollPackageService.addPayrollPackage(vm.payrollPackage).then(
                    function (response) {
                        $scope.loading = false;
                        $rootScope.CandidateInfo.bgvPayrollflag = true;
                        localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));
                        // ToastrService.success(response.data.message);
                        $rootScope.CandidateInfo.bgvPayrollflag = true;
                        vm.navigateNext();
                    },
                    function (err) {
                        $scope.loading = false;
                        ToastrService.error($rootScope.errorMsgs.MSG264);
                    }
                )
            }
            if (!account1) {
                vm.payrollPackage.routingone = "";
                vm.payrollPackage.accountone = "";
                vm.payrollPackage.jointholdername = "";
                vm.payrollPackage.institutionname1 = "";
                vm.payrollPackage.phone1 = "";
                vm.payrollPackage.payamountpercent1 = "";
                vm.payrollPackage.address1 = "";
                vm.payrollPackage.apartmentsuitenumber1 = "";
                vm.payrollPackage.city1 = "";
                vm.payrollPackage.state1 = "";
                vm.payrollPackage.zipcode1 = "";
                vm.payrollPackage.accountonetype = "0";
            }
            if (!account2) {
                vm.payrollPackage.routingtwo = "";
                vm.payrollPackage.accounttwo = "";
                vm.payrollPackage.institutionname2 = "";
                vm.payrollPackage.phone2 = "";
                vm.payrollPackage.payamountpercent2 = "";
                vm.payrollPackage.address2 = "";
                vm.payrollPackage.apartmentsuitenumber2 = "";
                vm.payrollPackage.city2 = "";
                vm.payrollPackage.state2 = "";
                vm.payrollPackage.zipcode2 = "";
                vm.payrollPackage.accounttwotype = "0";
            }
        }

        vm.navigatePrevious = function () {
            if ($rootScope.CandidateInfo.AddressFlag || $rootScope.CandidateInfo.Educationflag || $rootScope.CandidateInfo.Employementflag || $rootScope.CandidateInfo.Referencesflag) {
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
        
        vm.navigateNext = function () {
            if ($rootScope.dashboardEnabled) {
                $scope.$parent.delechosignagreement();
            }
            if(submitRejectedForm){ 
                submitRejectedForm = false;
                if (($rootScope.CandidateInfo.AddressFlag && vm.addressList.length == 0) || ($rootScope.CandidateInfo.Referencesflag && vm.referencsList.length == 0) || ($rootScope.CandidateInfo.Educationflag && vm.educationList.length == 0) || ($rootScope.CandidateInfo.Employementflag && vm.employementList.length == 0)) {
                    ToastrService.error($rootScope.errorMsgs.MSG270);
                    return;
                }
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
                if (localStorage.getItem("payrolledit")) {
                    // localStorage.setItem("frompayroll", true);
                    // $rootScope.$emit('DashpoardPageUpdated', true);
                    // $state.go('dashboard');
                    $state.go('candidateinfo.eeo');
                } else {
                    if ($rootScope.CandidateInfo.Contractorflag && $rootScope.CandidateInfo.catgid != 1) {
                        $state.go('candidateinfo.contractorinfo');
                    } else if ($rootScope.CandidateInfo.Eeoflag && $rootScope.CandidateInfo.catgid == 1) {
                        $state.go('candidateinfo.eeo');
                    } else {
                        //$state.go('dashboard');
                        //if($rootScope.CandidateInfo.catgid == 1){
                        if (($rootScope.CandidateInfo.AddressFlag === $rootScope.CandidateInfo.bgvAddressflag) && ($rootScope.CandidateInfo.bgvEmployementflag === $rootScope.CandidateInfo.Employementflag) && ($rootScope.CandidateInfo.bgvEducationflag === $rootScope.CandidateInfo.Educationflag) && ($rootScope.CandidateInfo.Referencesflag === $rootScope.CandidateInfo.bgvReferencesflag) && ($rootScope.CandidateInfo.Ddflag === $rootScope.CandidateInfo.bgvPayrollflag) && ($rootScope.CandidateInfo.Eeoflag === $rootScope.CandidateInfo.bgvEeoflag)) {
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
           

        }

        function objForPayroll() {
            // vm.payrollPackage
            vm.payrollPackage.routingone = "";
            vm.payrollPackage.accountone = "";
            vm.payrollPackage.routingtwo = "";
            vm.payrollPackage.accounttwo = "";
            vm.payrollPackage.jointholdername = "";
            vm.payrollPackage.institutionname1 = "";
            vm.payrollPackage.institutionname2 = "";
            vm.payrollPackage.phone1 = "";
            vm.payrollPackage.phone2 = "";
            vm.payrollPackage.payamountpercent1 = "";
            vm.payrollPackage.payamountpercent2 = "";
            vm.payrollPackage.address1 = "";
            vm.payrollPackage.apartmentsuitenumber1 = "";
            vm.payrollPackage.city1 = "";
            vm.payrollPackage.state1 = "";            
            // vm.payrollPackage.city1 = vm.cityList[0].cityCode;
            // vm.payrollPackage.state1 = vm.statesList[0].stateCode;
            vm.payrollPackage.zipcode1 = "";
            vm.payrollPackage.address2 = "";
            vm.payrollPackage.apartmentsuitenumber2 = "";
            // vm.payrollPackage.city2 = vm.cityList[0].cityCode;
            // vm.payrollPackage.state2 = vm.statesList[0].stateCode;
            vm.payrollPackage.city2 = "";
            vm.payrollPackage.state2 = "";
            vm.payrollPackage.zipcode2 = "";
            vm.payrollPackage.accountonetype = "0";
            vm.payrollPackage.accounttwotype = "0";
        }

        $scope.browserType = function () {
            if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
                vm.authFormHeight = 'auto';
                vm.heightforCommonDetails = '90%';
                vm.heightforCommonDetailsFooter = '10%';
            }
            else if (navigator.userAgent.indexOf("Chrome") != -1) {
                vm.authFormHeight = 'auto';
                vm.heightforCommonDetails = '90%';
                vm.heightforCommonDetailsFooter = '10%';
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                vm.authFormHeight = 'auto';
                vm.heightforCommonDetails = '90%';
                vm.heightforCommonDetailsFooter = '10%';
                if (navigator.userAgent.indexOf("Version/10") != -1) {
                    vm.heightForWebForms = $(document).height() - 90;
                    vm.heightforCommonDetails = vm.heightForWebForms * 0.9 + 'px';
                    vm.heightforCommonDetailsFooter = vm.heightForWebForms * 0.1 + 'px';
                }
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                vm.authFormHeight = 'auto';
                vm.heightforCommonDetails = '90%';
                vm.heightforCommonDetailsFooter = '10%';
            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                vm.authFormHeight = '140%';
                vm.heightforCommonDetails = '90%';
                vm.heightforCommonDetailsFooter = '10%';
            }
            else {

            }
        }
        $scope.browserType();


    }
})();