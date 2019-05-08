(function () {
    'use strict';
    hrAdminApp.controller('SignupController', signupController);
    signupController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'ToastrService', 'UsersService','$location'];
    function signupController($rootScope, $scope, $state, $stateParams, ToastrService, UsersService,$location) {
        $rootScope.UserInfo = null;
        
        var vm = this;
        vm.ErrorMessage = '';
        $scope.submitted = false;
        $rootScope.CopyrightsFooter = false;
        // $scope.options = { "getType": "country", "watchEnter": false};
        vm.backgroundImage = $rootScope.BrandingImagesURL;
        vm.logoImage = $rootScope.LogoImagesURL;
        vm.thankyouPage = $rootScope.rootUrl + '/images/Thankyou.jpg';
        vm.linkExpired = $rootScope.rootUrl + '/images/link_expired.jpg';

        vm.Signup={};
        // vm.CompanySizes = [
        //     {Value:100, Title:'1 - 100'},
        //     {Value:1000, Title:'101 - 1000'},
        //     {Value:5000, Title:'1001 - 5000'},
        //     {Value:10000, Title:'>5000'}
        // ];
        
        vm.submit = submit;
        vm.gotoLogin =function(){
            $location.path('/');
        }

        function submit() {
            vm.ErrorMessage = '';
            $scope.submitted = true;

            if (!vm.Signup.firstName || 
                !vm.Signup.lastName || 
                !vm.Signup.email || 
                !vm.Signup.phone ||
                !vm.Signup.companyName) {
                return;
            }
            
            $scope.loading = true;
            UsersService.signup(vm.Signup).then(
                function (response) {
                    if (response.data.Error) {
                        vm.ErrorMessage = response.data.message;
                        ToastrService.error(response.data.message);
                    }
                    else if (response.data.Success) {
                        $scope.submitted = false;
                        ToastrService.success(response.data.message);
                        $state.go('ThankYou');
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG158);
                }
            ).finally( function() {
                $scope.loading = false;
            });
        }
    
        // vm.allCountries = [
        //   {
        //     code: 'USA',
        //     name: 'United States of America'
        //   }, {
        //     code: 'UK',
        //     name: 'United Kingdom'
        //   }, {
        //     code: 'UAE',
        //     name: 'United Arab Emirates'
        //   }, {
        //     code: 'India',
        //     name: 'India'
        //   }, {
        //     code: 'Germany',
        //     name: 'Germany'
        //   }
        // ];   
        
        function getCountries() {
            UsersService.getCountries().then(
                function (response) {
                    vm.allCountries = response.data.Countries;
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG239);
                }
            )
        }
        // getCountries();

        function getCompanySize() {
            UsersService.getCompanySize().then(
                function (response) {
                    vm.CompanySizes = response.data.CompnaySize;
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG240);
                }
            )
        }
        getCompanySize();

    }
})();