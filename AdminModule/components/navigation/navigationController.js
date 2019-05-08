(function () {
    'use strict';
    hrAdminApp.controller('NavigationController', NavigationController);
    NavigationController.$inject = ['$rootScope', '$scope', '$location', 'NavigationService', 'ToastrService', '$state', '$mdPanel','$mdDialog','BrandingService', 'CandidateUsersService'];
    function NavigationController($rootScope, $scope, $location, NavigationService, ToastrService, $state, $mdPanel,$mdDialog,BrandingService, CandidateUsersService) {

        var vm = this;
        //vm.logoImage=$rootScope.LogoImagesURL;
        vm.updatedCandName = null;
        vm.signOut = signOut;
        vm.showMyAccount = showMyAccount;
        vm.disableDashboardButton = false;
        vm.rejectedOffer = false;
        $scope.fileThumb = '';
        if($rootScope.UserInfo){
            $scope.fileThumb = $rootScope.UserInfo.profilepic ? $rootScope.ProfilePicURL + $rootScope.UserInfo.profilepic : 'images/profile.png' ;
        } else {
            $scope.fileThumb = 'images/profile.png';
        }
        
        //$scope.fileThumb = '';
        function getBrandingDetails() {
            NavigationService.getBrandingDetails(false).then(
                function (response) {                  
        
                    if (!$rootScope.isCandidate) {
                        $rootScope.LogoImagesURL= $rootScope.UploadsURL + '/OnBoarding/Branding/logo/' + response.data.Branding.logoimg;
                        $rootScope.bgImagesURL = $rootScope.UploadsURL + '/OnBoarding/Branding/bgimg/' + response.data.Branding.bgimg;
                    }
                    
                },
                function (err) {
                    //ToastrService.err('ERROR: Could not get Branding Details');
                }
            )
        }

        function candiLogoandimagepath() {
            NavigationService.candiLogoandimagepath().then(
                function (response) {                 
                    
                    if ($rootScope.isCandidate) {
                        $rootScope.LogoImagesURL= $rootScope.UploadsURL + '/OnBoarding/Branding/logo/' + response.data.Branding.logoimg;
                    }
                    //$rootScope.LogoImagesURL = $rootScope.UploadsURL + '/OnBoarding/Branding/logo/' + response.data.Branding.logoimg;
                },
                function (err) {
                }
            )
        } 
        
        // if ($rootScope.isCandidate) {
        //     candiLogoandimagepath();
        // } else {
        //     getBrandingDetails();
        // }

        vm.goToCandidateDB = function(){
            $state.go('candidate.dashboard', {}, { reload: 'candidate.dashboard' });
        }

        vm.getHireInfo = function(){
            CandidateUsersService.getHireInfo($rootScope.CandidateInfo.newhireid).then(
                function (response) {
                    if (!response.data.Error) {
                        vm.disableDashboardButton = false;                                         
                    } else {
                        
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG186);
                }
            ).finally( function() {
                $scope.loading = false;
            });
        }

        if($rootScope.isCandidate){
            //vm.getHireInfo()
            if (($rootScope.CandidateInfo.AddressFlag === $rootScope.CandidateInfo.bgvAddressflag) && ($rootScope.CandidateInfo.bgvEmployementflag === $rootScope.CandidateInfo.Employementflag) && ($rootScope.CandidateInfo.bgvEducationflag === $rootScope.CandidateInfo.Educationflag) && ($rootScope.CandidateInfo.Referencesflag === $rootScope.CandidateInfo.bgvReferencesflag) && ($rootScope.CandidateInfo.Ddflag === $rootScope.CandidateInfo.bgvPayrollflag) && ($rootScope.CandidateInfo.Eeoflag === $rootScope.CandidateInfo.bgvEeoflag) && ($rootScope.CandidateInfo.Contractorflag === $rootScope.CandidateInfo.bgvContractorflag)) {
                vm.disableDashboardButton = true;  
                $rootScope.dashboardEnabled = true;
            } else {
                vm.disableDashboardButton = false;  
            }
        }

        // function getBrandingLogo(){
        //     BrandingService.getBrandingDetails().then(
        //         function (response) {
        //             vm.logosrc=response.data.Branding.logoimg;
        //             vm.logoImage=$rootScope.BrandingImagesURL+'logo/'+vm.logosrc;
        //         }

        //     )
        // }
        // getBrandingLogo();

//($rootScope.UserInfo.isAdmin ? 'Settings' : 'Settings.Documents')
        vm.MenuItems = [
            { Title: 'DASHBOARD', State: 'Dashboard', Svg: 'images/icons/dashboard_icon.svg' },
            { Title: 'NEW HIRES', State: 'NewHires', Svg: 'images/icons/newhire_icon.svg' },
            { Title: 'TASKS', State: 'Tasks', Svg: 'images/icons/tasks_icon.svg' },
            { Title: 'WORKFLOWS', State: 'Workflows', Svg: 'images/icons/workflow_icon.svg' },
            { Title: 'SETTINGS', State: 'Settings.GeneralSettings', Svg: 'images/icons/settings_icon.svg' },
            { Title: 'REPORTS', State: 'Reports.Static', Svg: 'images/icons/reports_icon.svg' }
        ];
        
        vm.candidateMenuItems = [
            { Title: 'INTRODUCTION', State: 'candidate.introduction', Svg: 'images/icons/newhire_icon.svg' },
            { Title: 'DASHBOARD', State: 'candidate.dashboard', Svg: 'images/icons/dashboard_icon.svg' },
        ];

        vm.AccountSettings = [
            { Title: 'My Account', State: 'MyAccount' },
            { Title: 'Notifications', State: 'MyAccount' },
            { Title: 'Help', State: 'MyAccount' },
            { Title: 'Sign Out', State: 'MyAccount' }
        ];

        $scope.updateIconClass = function (title) {
            if (title == 'DASHBOARD') {
                return 'navItemSvg80';
            } else {
                return 'navItemSvg';
            }
        }

        //     this.more = {
        //         name: 'more',
        //         items: [
        //             'Account',
        //             'Sign Out'
        //         ]
        //     };

        //     this.menuTemplate = '' +
        //         '<div class="menu-panel" md-whiteframe="4">' +
        //         '  <div class="menu-content">' +
        //         '    <div class="menu-item" ng-repeat="item in ctrl.items">' +
        //         '      <button class="md-button">' +
        //         '        <span>{{item}}</span>' +
        //         '      </button>' +
        //         '    </div>' +
        //         '    <md-divider></md-divider>' +
        //         '    <div class="menu-item">' +
        //         '      <button class="md-button" ng-click="ctrl.closeMenu()">' +
        //         '        <span>Close Menu</span>' +
        //         '      </button>' +
        //         '    </div>' +
        //         '  </div>' +
        //         '</div>';

        //     this.showToolbarMenu = function ($event, menu) {
        //         var template = this.menuTemplate;

        //         var position = $mdPanel.newPanelPosition()
        //             .relativeTo($event.srcElement)
        //             .addPanelPosition(
        //             $mdPanel.xPosition.ALIGN_START,
        //             $mdPanel.yPosition.BELOW
        //             );

        //         var config = {
        //             id: 'toolbar_' + menu.name,
        //             attachTo: angular.element(document.body),
        //             controller: NavigationController,
        //             controllerAs: 'ctrl',
        //             template: template,
        //             position: position,
        //             panelClass: 'menu-panel-container',
        //             locals: {
        //                 items: menu.items
        //             },
        //             openFrom: $event,
        //             focusOnOpen: false,
        //             zIndex: 100,
        //             propagateContainerEvents: true,
        //             groupName: ['toolbar', 'menus']
        //         };

        //         $mdPanel.open(config);
        //     };
        // }
        // function accountSettings() {

        // }

        function signOut() {
            // localStorage.removeItem("ReturnUrl");
            localStorage.removeItem("ask-auth-token");
            $scope.loading = true;
            NavigationService.logout().then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }

                    if (response.data.Success) {
                        ToastrService.success(response.data.message);
                        // $state.go('Login');
                        $location.path('/');
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG187);
                }
            ).finally( function() {
                $scope.loading = false;
            });
        }
        vm.candidateSignOut = function(){
            $rootScope.CandidateInfo = null;
            localStorage.clear();
            $state.go('candidate.login');
        }

        function showMyAccount(ev) {
            $state.go('myAccount');
            /* $mdDialog.show({
                controller: 'MyAccountController',
                controllerAs: 'vm',
                templateUrl: 'components/myAccount/myAccount.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            }); */
        };

        
        $rootScope.$on('LoginSuccess', function(event, status) {   
           
            // vm.MenuItems = [
            //     { Title: 'DASHBOARD', State: 'Dashboard', Svg: 'images/icons/dashboard_icon.svg' },
            //     { Title: 'NEW HIRES', State: 'NewHires', Svg: 'images/icons/newhire_icon.svg' },
            //     { Title: 'TASKS', State: 'Tasks', Svg: 'images/icons/tasks_icon.svg' },
            //     { Title: 'WORKFLOWS', State: 'Workflows', Svg: 'images/icons/workflow_icon.svg' },
            //     { Title: 'SETTINGS', State: ($rootScope.UserInfo.isAdmin ? 'Settings.GeneralSettings' : 'Settings.Documents'), Svg: 'images/icons/settings_icon.svg' },
            //     { Title: 'REPORTS', State: 'Reports.Static', Svg: 'images/icons/reports_icon.svg' }
            // ];
            
        });
        $rootScope.$on('DashpoardPageUpdated', function(event, isupdated) {
            //if(isupdated){
                vm.disableDashboardButton = isupdated;               
            //}
            
        });
        $rootScope.$on('RejectedOfferLetter', function(event, isupdated) {
            if(isupdated){
                vm.rejectedOffer = true;               
            }
            
        });
        $rootScope.$on('ImageUpdated', function(event, data) {
            if(data.proImage){
                $scope.fileThumb = data.proImage;
            }
            $rootScope.UserInfo.FirstName = data.fname;   
            $rootScope.UserInfo.LastName = data.lname;     
            localStorage.setItem("userInfo", JSON.stringify($rootScope.UserInfo));      
        });
        
        
        $rootScope.$on('temp_logo', function(event, logoFile) {
            if(logoFile)
            vm.tempLogo = window.URL.createObjectURL(logoFile) ;
            else
            vm.tempLogo = null;
        });

        $rootScope.$on('updatedCandidateName', function(event, updatedCandName) {
            if(updatedCandName)
            vm.updatedCandName = updatedCandName ;
            else
            vm.updatedCandName = null;
        });
        
        // $rootScope.$on('Branding_Changed', function(event, brandChanged) {
        //     if(brandChanged){
        //         getBrandingDetails();
        //     }
        // });

        // Browser detecction
        $scope.browserType = function () { 
            if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
                vm.browserUsed = 'Opera';
                vm.profileMenuClass = 'userProfileMenu';
            }
            else if(navigator.userAgent.indexOf("Chrome") != -1 ) {
                // console.log(navigator.userAgent);
                if(navigator.userAgent.indexOf("Chrome/48") != -1 ) {
                    vm.sideMenuPaddingTop = "22px";
                }
                else{
                    vm.sideMenuPaddingTop = "0px";
                }
                vm.browserUsed = 'Chrome';
                vm.profileMenuClass = 'userProfileMenu';
            }
            else if(navigator.userAgent.indexOf("Safari") != -1) {
                vm.browserUsed = 'Safari';
                vm.profileMenuClass = 'userProfileMenu-FF';
                var uaArray = navigator.userAgent.split('/');
                for (var i = 0; i < uaArray.length; i++) {
                    if (uaArray[i].indexOf('Safari') != -1) {
                        var ver = uaArray[i].split(' ')[0];
                        // console.log("Safari Browser Version: ", ver);
                        if (ver < "11") vm.sideMenuPaddingTop = "22px";
                        break;
                    }
                }
            }
            else if(navigator.userAgent.indexOf("Firefox") != -1 ) {
                vm.browserUsed = 'Firefox';
                vm.profileMenuClass = 'userProfileMenu-FF';
            }
            else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) { //IF IE > 10
                vm.browserUsed = 'IE'; 
                vm.profileMenuClass = 'userProfileMenu-IE';
            }  
            else {
                vm.browserUsed = 'Unknown';
                vm.profileMenuClass = 'userProfileMenu';
            }
        }
        $scope.browserType();
    }
})();