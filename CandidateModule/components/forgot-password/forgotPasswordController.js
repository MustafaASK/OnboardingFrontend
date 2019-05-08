(function () {
    'use strict';
    candidateApp.controller('CandidateForgotPasswordController', CandidateForgotPasswordController);
    CandidateForgotPasswordController.$inject = ['$rootScope', '$state', '$stateParams', '$scope', 'ToastrService', 'CandidateUsersService','$location'];
    function CandidateForgotPasswordController($rootScope, $state, $stateParams, $scope, ToastrService, CandidateUsersService,$location) {
        $rootScope.CandidateInfo = null;

        var vm = this;
        vm.ErrorMessage = '';
        vm.ForgotPassword = {};
        $rootScope.CopyrightsFooter = false;
        vm.backgroundImage = $rootScope.BrandingImagesURL;
        vm.logoImage = $rootScope.LogoImagesURL;
        vm.heightForCandidate = $(document).height() + 'px';
       
        localStorage.setItem('atleastOneDocCompleted', false);
        if ($stateParams.token) {
            vm.token = $stateParams.token;
            vm.emailId = $stateParams.token.split(":")[0];
            //vm.emailId = $stateParams.token;

            vm.tokenAry = vm.token.split(":");
            // if(vm.tokenAry.length >= 2){
                
            //     CandidateUsersService.getresetPassword(vm.token).then(
            //         function (response) {
            //             if (response.data.Error) {
            //                 //ToastrService.error(response.data.message);
            //                 $state.go('login');
            //                 // vm.ErrorMessage = response.data.message;
            //             }
            //             else if (response.data.success) {
            //                 //ToastrService.success(response.data.message);
            //                 //$state.go('login');
            //             }
            //         },
            //         function (err) {
            //             ToastrService.error($rootScope.errorMsgs.MSG152);
            //         }
            //     );
            // }
        }
        
        vm.confirmPwdValidation = function (newPwd, confirmPwd) {
            if (newPwd != confirmPwd) {
                ToastrService.warning($rootScope.errorMsgs.MSG153);
                return false;
            }
            return true;
        }
        vm.resetPassword = function(){
            if(vm.newPassword != vm.confirmPassword){
                ToastrService.warning($rootScope.errorMsgs.MSG153);
                return false;
            }
            var finalobj = {
                'emailid':vm.emailId,
                'password':vm.newPassword
            }
            CandidateUsersService.resetPassword(finalobj).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                        // vm.ErrorMessage = response.data.message;
                    }
                    else if (response.data.Success) {
                         $rootScope.CandidateInfo = response.data;
                        $rootScope.CopyrightsFooter = true;
                        $rootScope.Token = response.headers('ask-auth-token');
                        localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));
                        localStorage.setItem("ask-auth-token", $rootScope.Token);//comment
                        localStorage.setItem("CopyrightsFooter", $rootScope.CopyrightsFooter);
                        //ToastrService.success(response.data.message);
                        if($rootScope.CandidateInfo.commonfields){
                            $state.go('dashboard');
                        }
                        else if($rootScope.CandidateInfo.statusid == 3){
                            $state.go('candidateinfo.commondetails');
                        }
                        else {
                             $state.go('introduction', {}, { reload: 'introduction' });
                    
                        }
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG152);
                }
            ).finally( function() {
                $scope.loading = false;
            });
        }
        

        vm.forgotPwd = function() {
            vm.ErrorMessage = '';

            if (!vm.ForgotPassword.Email) return;
            $scope.loading = true;
            var finalobj = {
                'emailid':vm.ForgotPassword.Email,
                'frontendurl':$rootScope.FrontEndURLForCandidate
            }
            CandidateUsersService.forgotPassword(finalobj).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                        // vm.ErrorMessage = response.data.message;
                    }
                    else if(response.data.Expired){
                        $state.go('linkExpired');
                    }
                    else if (response.data.success) {
                        ToastrService.success(response.data.message);
                        vm.ForgotPassword = {};
                        $state.go('login', {}, {reload: 'login'});
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG152);
                }
            ).finally( function() {
                $scope.loading = false;
            });
        }
    }
})();



/*

*/