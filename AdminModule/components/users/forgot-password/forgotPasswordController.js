(function () {
    'use strict';
    hrAdminApp.controller('ForgotPasswordController', forgotPasswordController);
    forgotPasswordController.$inject = ['$rootScope', '$state', '$stateParams', '$scope', 'ToastrService', 'UsersService', '$location'];
    function forgotPasswordController($rootScope, $state, $stateParams, $scope, ToastrService, UsersService, $location) {
        $rootScope.UserInfo = null;

        var vm = this;
        vm.ErrorMessage = '';
        vm.ForgotPassword = {};
        $rootScope.CopyrightsFooter = false;
        vm.backgroundImage = $rootScope.BrandingImagesURL;
        vm.logoImage = $rootScope.LogoImagesURL;

        vm.submit = submit;
        vm.resetPassword = resetPassword;
        $scope.submitted=false;

        if ($stateParams.token) {
            vm.token = $stateParams.token;
            vm.emailId = vm.token.split(":")[0];
        }

        vm.confirmPwdValidation = function (newPwd, confirmPwd) {
            if (newPwd != confirmPwd) {
                ToastrService.warning("Confirm Password should match with the new Password given.");
                return false;
            }
            return true;
        }

        vm.gotoLogin =function(){
            $location.path('/');
        }

        function submit() {
            vm.ErrorMessage = '';
            $scope.submitted = true;
            if (!vm.ForgotPassword.Email) return;
            $scope.loading = true;
            
            var frontendurl = $rootScope.FrontEndURL+'';
            UsersService.forgotPassword(vm.ForgotPassword.Email, frontendurl).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                        // vm.ErrorMessage = response.data.message;
                    }
                    else if (response.data.Success) {
                        $scope.submitted = false;
                        ToastrService.success(response.data.message);
                        vm.ForgotPassword = {};
                        $state.go('Login', {}, {reload: 'Login'});
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG152);
                }
            ).finally( function() {
                $scope.loading = false;
            });
        }

        if ($state.current.name == 'getResetPassword') {
            // send api request to validate the token
            $scope.loading = true;
            UsersService.getResetPassword(vm.token).then (
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                        $state.go('Login', {}, {reload: 'Login'});
                    }
                    else if (response.data.Success) {
                        // ToastrService.success(response.data.message); 
                        // console.log("Reset Password: Token is valid.");
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG236);
                    $state.go('Login', {}, {reload: 'Login'});
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }

        function resetPassword() {
            // check if the passwords match
            $scope.submitted = true;
            if (!vm.newPassword) return;
            if (vm.newPassword != vm.confirmPassword) return;

            $scope.loading = true;
            UsersService.resetPassword(vm.emailId, vm.newPassword).then(
                function (response) {
                    if (response.data.Error) {
                        // vm.ErrorMessage = response.data.message;
                        ToastrService.error(response.data.message);
                    }
                    else if (response.data.Success) {
                        // ToastrService.success(response.data.message);
                        // vm.emailId = null;
                        // vm.newPassword = null;
                        // $state.go('Login', {}, {reload: 'Login'});
                        $scope.submitted = false;
                        $rootScope.UserInfo = response.data;
                        $rootScope.CopyrightsFooter = true;
                        $rootScope.Token = response.headers('ask-auth-token');
                        localStorage.setItem("userInfo", JSON.stringify($rootScope.UserInfo));
                        localStorage.setItem("ask-auth-token", $rootScope.Token);
                        localStorage.setItem("CopyrightsFooter", $rootScope.CopyrightsFooter);
                        // $state.go('Dashboard', {}, { reload: 'Dashboard' });

                        if($rootScope.UserInfo.AccountManagerFlag){
                            //$rootScope.isAccountManager = $rootScope.UserInfo.isAccountManager;
                            $rootScope.isAccountManager = true;
                            $state.go('AddNewHire');
                        } else {
                            $state.go('Dashboard', {}, { reload: 'Dashboard' });

                        }
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG237);
                }
            ).finally( function() {
                $scope.loading = false;
            });
        }

    }
})();