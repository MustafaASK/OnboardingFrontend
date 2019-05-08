(function () {
    'use strict';
    hrAdminApp.controller('LoginController', loginController);
    loginController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$mdDialog', '$timeout', '$http', 'ToastrService', 'UsersService', 'BrandingService','$interval'];
    function loginController($rootScope, $scope, $state, $stateParams, $mdDialog, $timeout, $http, ToastrService, UsersService, BrandingService,$interval) {
        $rootScope.UserInfo = null;
        localStorage.clear();

        var vm = this;
        vm.backgroundImage = $rootScope.BrandingImagesURL;
        vm.logoImage = $rootScope.LogoImagesURL;
        vm.Login = {};
        vm.submit = submit;
        $rootScope.CopyrightsFooter = false;
        $scope.forcelogin = false;
        $scope.submitted = false;
     
              
                
                 vm.activated = $scope.loading ;
                vm.activated = true;
                vm.determinateValue = 80;
          
                // Iterate every 100ms, non-stop and increment
                // the Determinate loader.
                $interval(function() {
          
                  vm.determinateValue += 1;
                  if (vm.determinateValue > 100) {
                      vm.determinateValue = 80;
                  }
          
                }, 100);
              

        // document.getElementById('copyrights-footer').style.display = "none";
        // $timeout(function () {
        //     var pColorClass = {'background-color': '#2283bb'};
        //     var pbtns = document.getElementsByClassName('md-primary');
        //     if (pbtns) pbtns.classList.add(pColorClass);    
        // }, 5000);

        // function getBrandingLogo() {
        //     BrandingService.getBrandingDetails().then(
        //         function (response) {
        //             vm.logosrc = response.data.Branding.logoimg;
        //             vm.bgsrc = response.data.Branding.bgimg;
        //             vm.logoImage = $rootScope.BrandingImagesURL + vm.logosrc;
        //             vm.backgroundImage = $rootScope.BrandingImageURL + vm.bgsrc;
        //         }

        //     )
        // }
        // getBrandingLogo();  

        function submit() {
            // $rootScope.UserInfo = {};
            // $rootScope.Token = '123456';
            // localStorage.setItem("userInfo", JSON.stringify($rootScope.UserInfo));
            // localStorage.setItem("ask-auth-token", $rootScope.Token);
            // $state.go('Dashboard');
            $scope.submitted = true;
            if (!vm.Login.emailId || !vm.Login.password) {
                // ToastrService.error("Required values are not provided.");
                return;
            }

            $scope.loading = true;
            UsersService.login(vm.Login.emailId, vm.Login.password).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }

                    if (response.data.Status == 401) {
                        forceSessionKill();
                    }

                    if (response.data.Success) {
                        $rootScope.UserInfo = response.data;
                        // if(response.data.profilepic == 'null' || response.data.profilepic == null ||  response.data.profilepic == ''){
                        //     $rootScope.UserInfo.profilepic = "images/profile.png"
                        // }
                        $scope.submitted = false;
                        $rootScope.CopyrightsFooter = true;
                        $rootScope.Token = response.headers('ask-auth-token');
                        localStorage.setItem("userInfo", JSON.stringify($rootScope.UserInfo));
                        localStorage.setItem("ask-auth-token", $rootScope.Token);
                        localStorage.setItem("CopyrightsFooter", $rootScope.CopyrightsFooter);
                        $rootScope.isAccountManager = false;
                        
                        if($rootScope.UserInfo.AccountManagerFlag){
                            //$rootScope.isAccountManager = $rootScope.UserInfo.isAccountManager;
                            $rootScope.isAccountManager = true;
                            $state.go('AddNewHire');
                        } else {
                            $state.go('Dashboard', {}, { reload: 'Dashboard' });
                            $rootScope.$emit('LoginSuccess', true );

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

        $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            event.preventDefault();
        });

        function forceSessionKill() {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                template: '<md-dialog aria-label="Delete" style="width:400px;">' +
                '<div layout="column" layout-align="start end" style="padding:10px;">' +
                '<ng-md-icon icon="clear" size="14" tab-index="3" style="margin-top:8px;cursor:pointer" ng-click="closeDialog()">' +
                '</ng-md-icon>' +
                '</div>' +
                '<md-content style="background-color:white">' +
                '<div layout="column" layout-align="center center"><img src="images/alert_icon.png"/></div>' +
                '<p align=center style="padding:10px 10px 20px 20px;font-size:13px;" >An active session is associated with this login. Do you want to force login?</p>' +
                '<md-divider></md-divider>' +
                '<div layout="row" layout-align="end center" style="background-color:rgb(250,250,250);height:60px;padding:10px" flex>' +
                '<md-button class="md-raised md-primary" tab-index="1" ng-click="vm.forcelogin()" md-autofocus>YES</md-button>' +
                '<md-button class="md-secondary" tab-index="2" ng-click="closeDialog()" >NO</md-button>' +
                '</div>' +
                '</md-content>' +
                '</md-dialog>'
            }
            );
        }

        $scope.closeDialog = function () {
            $mdDialog.cancel();
        }

        vm.forcelogin = function () {
            if (!vm.Login.emailId || !vm.Login.password) {
                // ToastrService.error("Required values are not provided.");
                return;
            }

            $scope.loading = true;
            UsersService.forcelogin(vm.Login.emailId, vm.Login.password).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }

                    if (response.data.Success) {
                        $rootScope.UserInfo = response.data;
                        $rootScope.CopyrightsFooter = true;
                        $rootScope.Token = response.headers('ask-auth-token');
                        localStorage.setItem("userInfo", JSON.stringify($rootScope.UserInfo));
                        localStorage.setItem("ask-auth-token", $rootScope.Token);
                        localStorage.setItem("CopyrightsFooter", $rootScope.CopyrightsFooter);
                        $rootScope.isAccountManager = false;
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
                    ToastrService.error($rootScope.errorMsgs.MSG238);
                }
            ).finally(function () {
                $scope.loading = false;
            });

        }

        // function getErrorMessages(jsonFile) {
        //     $http.get(jsonFile)
        //         .then(
        //             function (response) {
        //                 $rootScope.errors = response.data;
        //                 console.log($rootScope.errors);
        //             },
        //             function (err) {
        //                 ToastrService.error("ERROR: Could not read the error messages file.");
        //             }
        //         )
        // }
        // getErrorMessages('shared/messages.json');

        // $rootScope.get_msg_by_key = function (key) {
        //     if ($rootScope.errors) {
        //         for (var i = 0; i < $rootScope.errors.length; i++) {
        //             if ($rootScope.errors[i].id == key) {
        //                 return $rootScope.errors[i].message;
        //             }
        //         }    
        //     }
        // }
    }
})();