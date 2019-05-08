(function() {
    'use strict';
    candidateApp.controller('ContractorInfoController', contractorInfoController);
    contractorInfoController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$location', 'ToastrService', 'CandidateUsersService', 'ContractorInfoService', '$mdDialog', '$filter', '$timeout', 'PayrollPackageService'];

    function contractorInfoController($scope, $rootScope, $state, $stateParams, $location, ToastrService, CandidateUsersService, ContractorInfoService, $mdDialog, $filter, $timeout, PayrollPackageService) {


        var vm = this;
        vm.ContractorInfo = {};
        vm.ContractorInfo.gender = 1;
        vm.saveContractorInfo = saveContractorInfo;
        $scope.$parent.currentNavItem = 3;
        vm.disablePrevious = false;
        vm.disableSkip = false;
        $scope.myDate = new Date();
        vm.ContractorInfo.employername = $rootScope.CandidateInfo.subvendorname;
        $scope.maxDate = new Date(
            $scope.myDate.getFullYear() - 15,
            $scope.myDate.getMonth(),
            $scope.myDate.getDate()
        );
        $scope.$parent.vm.disableTabCommonDetails = true;

        vm.checkCandidateSign = $scope.$parent.vm.disableContractorInfo;
        var submitRejectedForm = false;
        
        vm.submitAndSign = function(contractorInfoForm){
            submitRejectedForm = true;
            vm.saveContractorInfo(contractorInfoForm);
        }
        
        if (localStorage.getItem("contractoredit")) {
            vm.disablePrevious = true;
            vm.disableSkip = true;
        }
        $scope.updateState = function(stateParam){
            if(stateParam) { 
                vm.ContractorInfo.state = stateParam;
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
        
        $scope.updateCityStateCountryZip = function(cityParam, stateParam, zipParam){
            if(cityParam) { 
                vm.ContractorInfo.city = cityParam; 
            }  
            if(stateParam) { 
                vm.ContractorInfo.state = stateParam; 
            }   
            // if(countryParam) { 
            //     vm.ContractorInfo.country = countryParam; 
            // }   
            if(zipParam) { 
                vm.ContractorInfo.zipcode = zipParam; 
            }           
        }
        
        /* autocomplete part start*/
        $scope.options = {"getType":"state","watchEnter":true,"country":"us"};
        $scope.options1 = {"getType":"city","watchEnter":true,"types":"(cities)","country":"us"};
        $scope.addrOptionsUS = {"getType":"address","watchEnter":false,"country":"us"};
        /* autocomplete part end */

        // vm.getCities = function() {
        //     CandidateUsersService.getCities().then(
        //         function(response) {
        //             vm.cityList = response.data;
        //             vm.ContractorInfo.city = vm.cityList[0].cityCode;
        //         },
        //         function(err) {
        //             ToastrService.error($rootScope.errorMsgs.MSG138);
        //         }
        //     )
        // }

        function statesList() {
            CandidateUsersService.getStatesList().then(
                function(response) {
                    vm.statesList = response.data;
                    vm.ContractorInfo.state = vm.statesList[0].stateCode;
                    // vm.getCities();
                },
                function(err) {
                    ToastrService.error($rootScope.errorMsgs.MSG132);
                }
            )
        }
        //statesList();

        function changeDateFormat(dt) {
            var completionDate = new Date(dt);
            var compYear = completionDate.getFullYear();
            var compMonth = completionDate.getMonth() + 1;
            if (compMonth < 10) compMonth = '0' + compMonth.toString();
            var compDate = completionDate.getDate();
            if (compDate < 10) compDate = '0' + compDate.toString();
            return compYear + '-' + compMonth + '-' + compDate + ' 00:00:00';
        }

        function getContractorInfo() {
            ContractorInfoService.viewContractorInfo($rootScope.CandidateInfo.newhireid).then(
                function(response) {
                    if (response.data.Success) {
                        vm.ContractorInfo = response.data;
                        delete vm.ContractorInfo.Success;
                    }
                    getCommonDetails();
                },
                function(err) {
                    ToastrService.error($rootScope.errorMsgs.MSG139);
                }
            )
        }
        getContractorInfo();

        function getCommonDetails() {
            PayrollPackageService.getCommonDetails($rootScope.CandidateInfo.newhireid).then(
                function(response) {
                    if (response.data) {
                        vm.commonDetails = response.data;
                        vm.ContractorInfo.firstname = vm.commonDetails.firstname;
                        vm.ContractorInfo.middlename = vm.commonDetails.middlename;
                        vm.ContractorInfo.lastname = vm.commonDetails.lastname;
                        vm.ContractorInfo.gender = vm.commonDetails.gender;
                        vm.ContractorInfo.brtDate = vm.commonDetails.dob;
                        vm.ContractorInfo.address = vm.commonDetails.address;
                        vm.ContractorInfo.apartmentsuitenumber = vm.commonDetails.apartmentsuitenumber;
                        vm.ContractorInfo.state = vm.commonDetails.state;
                        vm.ContractorInfo.city = vm.commonDetails.city;
                        vm.ContractorInfo.zipcode = vm.commonDetails.zipcode;
                        vm.ContractorInfo.email = vm.commonDetails.email;
                        vm.ContractorInfo.mobileno = vm.commonDetails.phone;
                        vm.ContractorInfo.homeno = vm.commonDetails.homeno;
                        vm.ContractorInfo.hrDate = $scope.convertDateFormat($rootScope.CandidateInfo.tentstartdate.substring(0,10));
                        vm.hrStDate = $scope.convertDateFormat(vm.ContractorInfo.hrDate);
                        // if ($rootScope.CandidateInfo.tentstartdate) {
                        //     $scope.udf9d = $filter('date')($rootScope.CandidateInfo.tentstartdate, 'MM/dd/yyyy');
                        //     $scope.udf9d = $scope.udf9d.substring(0, 10);
                        //     vm.ContractorInfo.hrDate = $scope.udf9d.replace(/-/g, '/');
                        // }
                        vm.ContractorInfo.hrEndDate = $scope.convertDateFormat($rootScope.CandidateInfo.tentenddate.substring(0,10));
                        vm.ContractorInfo.emergencycontactname = vm.commonDetails.emergencycontactname;
                        vm.ContractorInfo.relationship = vm.commonDetails.relationship;
                        vm.ContractorInfo.emergencycontactno = vm.commonDetails.emergencycontactno;
                        vm.ContractorInfo.employername =vm.ContractorInfo.employername;
                        // delete vm.ContractorInfo.Success;
                        if (vm.ContractorInfo.brtDate) {
                            $scope.dob = vm.ContractorInfo.brtDate.substring(0, 10);
                            $scope.dob = $scope.dob.replace(/-/g, '/');
                            vm.ContractorInfo.brtDate = new Date($scope.dob);
                            
                        }
                    }
                },
                function(err) {
                    ToastrService.error($rootScope.errorMsgs.MSG139);
                }
            )
        }

        function saveContractorInfo(contractorInfoForm) {
            $scope.submitted = true;
            if (!contractorInfoForm) {
                ToastrService.error($rootScope.errorMsgs.MSG128);
                return;
            }
            vm.ContractorInfo.newHireId = { 'newhireid': $rootScope.CandidateInfo.newhireid };
            vm.ContractorInfo.brtDate = $filter('date')(vm.ContractorInfo.brtDate, "yyyy-MM-dd HH:mm:ss");
            vm.ContractorInfo.hrDate = $filter('date')(vm.ContractorInfo.hrDate, "yyyy-MM-dd HH:mm:ss");
            vm.ContractorInfo.hrEndDate = $filter('date')(vm.ContractorInfo.hrEndDate, "yyyy-MM-dd HH:mm:ss");
            //vm.ContractorInfo.strHireDate = $filter('date')(vm.ContractorInfo.strHireDate, "yyyy-MM-dd HH:mm:ss");
            //vm.ContractorInfo.brtDate = vm.ContractorInfo.brtDate.toString();
            //vm.ContractorInfo.strHireDate = vm.ContractorInfo.strHireDate.toString();
            // vm.ContractorInfo.brtDate =  changeDateFormat(vm.ContractorInfo.brtDate);
            vm.ContractorInfo.hrDate =  changeDateFormat(vm.ContractorInfo.hrDate);
            vm.ContractorInfo.hrEndDate =  changeDateFormat(vm.ContractorInfo.hrEndDate);
            // if (vm.ContractorInfo.brtDate) {
            //     $scope.dob = vm.ContractorInfo.brtDate.substring(0, 10);
            //     $scope.dob = $scope.dob.replace(/-/g, '/');
            //     vm.ContractorInfo.brtDate = new Date($scope.dob);
                
            // }
            
            $scope.loading = true;
            if (vm.ContractorInfo.contractorinfoid) {
                vm.ContractorInfo.gender = vm.ContractorInfo.gender == 2 ? 2 : 1;
                vm.ContractorInfo.newHireId = {"newhireid": $rootScope.CandidateInfo.newhireid };
                
                ContractorInfoService.editContractorInfo(vm.ContractorInfo).then(
                    function(response) {
                        $scope.loading = false;
                        // ToastrService.success(response.data.message);
                        $rootScope.CandidateInfo.bgvContractorflag = true;
                        $scope.submitted= false;
                        localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));
                        vm.navigateNext();
                    },
                    function(err) {
                        $scope.loading = false;
                        ToastrService.error($rootScope.errorMsgs.MSG268);
                    }
                )
            } else {
                vm.ContractorInfo.gender = vm.ContractorInfo.gender == 2 ? 2 : 1;
                ContractorInfoService.addContractorInfo(vm.ContractorInfo).then(
                    function (response) {
                        $scope.loading = false;
                        $rootScope.CandidateInfo.bgvContractorflag = true;
                        $scope.submitted= false;
                        localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));
                        // ToastrService.success(response.data.message);
                        vm.navigateNext();
                    },
                    function(err) {
                        $scope.loading = false;
                        ToastrService.error($rootScope.errorMsgs.MSG267);
                    }
                )
            }
        }

        vm.navigatePrevious = function() {
            //$scope.$emit('location', 'prev');
            if ($rootScope.CandidateInfo.Ddflag && $rootScope.CandidateInfo.catgid == 1) {
                $state.go('candidateinfo.payrollpackage');
            } else if ($rootScope.CandidateInfo.AddressFlag || $rootScope.CandidateInfo.Educationflag || $rootScope.CandidateInfo.Employementflag || $rootScope.CandidateInfo.Referencesflag) {
                $state.go('candidateinfo.bgvforms');
            } else {
                $state.go('candidateinfo.commondetails');
            }
        }

        vm.navigateNext = function() {
            //$scope.$emit('location', 'next');
            if (($rootScope.CandidateInfo.AddressFlag && vm.addressList.length == 0) || ($rootScope.CandidateInfo.Referencesflag && vm.referencsList.length == 0) || ($rootScope.CandidateInfo.Educationflag && vm.educationList.length == 0) || ($rootScope.CandidateInfo.Employementflag && vm.employementList.length == 0)) {
                ToastrService.error($rootScope.errorMsgs.MSG270);
                return;
            }
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
                // if (localStorage.getItem("contractoredit")) {
                //     localStorage.setItem("fromcontractor", true);
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
                    if ($rootScope.CandidateInfo.Eeoflag && $rootScope.CandidateInfo.catgid == 1) {
                        $state.go('candidateinfo.eeo');
                    } else {
                        //$state.go('dashboard');
                        if ( ($rootScope.CandidateInfo.AddressFlag  === $rootScope.CandidateInfo.bgvAddressflag) && ($rootScope.CandidateInfo.bgvEmployementflag === $rootScope.CandidateInfo.Employementflag) && ($rootScope.CandidateInfo.bgvEducationflag === $rootScope.CandidateInfo.Educationflag) && ($rootScope.CandidateInfo.Referencesflag === $rootScope.CandidateInfo.bgvReferencesflag) && ($rootScope.CandidateInfo.Contractorflag  === $rootScope.CandidateInfo.bgvContractorflag)) {
                            $rootScope.$emit('DashpoardPageUpdated', true);
                            $state.go('dashboard', {}, { reload: 'dashboard' });
                        } else {
                            $state.go('introduction');
                            //ToastrService.error('Please submit all process forms');
                        }
                    }
                }
            }

        }
        $scope.convertDateFormat = function(dateValue ){
            return $filter('date')(new Date(dateValue),'MM/dd/yyyy');
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