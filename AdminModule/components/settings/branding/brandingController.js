(function () {
    'use strict';
    hrAdminApp.controller('BrandingController', brandingController);
    brandingController.$inject = ['$rootScope', '$window', '$scope', '$state', '$stateParams', 'ToastrService', 'BrandingService'];
    function brandingController($rootScope, $window, $scope, $state, $stateParams, ToastrService, BrandingService) {

        var vm = this;
        var rooturl = $rootScope.rootUrl;
        vm.primarycolor1 = "#273748";
        vm.primarycolor2 = '#d75a5a';
        var bgColor = "linear-gradient(to right, " + vm.primarycolor1 + " 0, " + vm.primarycolor1 + " 100px, " + vm.primarycolor1 + " 100px)";

        $scope.$parent.currentNavItem = 6;

        function getBrandingDetails() {
            BrandingService.getBrandingDetails(true).then(
                function (response) {
                    vm.logoPath = response.data.Branding.logoimg;
                    vm.backgroundPath = response.data.Branding.bgimg;
                    vm.primarycolor1 = response.data.Branding.primarycolor1;
                    vm.primarycolor2 = response.data.Branding.primarycolor2;
                },
                function (err) {
                    ToastrService.error('ERROR: Could not get Branding Details');
                }
            )
        }

        getBrandingDetails();


        vm.applyBranding = function () {
            $rootScope.$emit('temp_logo', $scope.file);
            // apply primary color
            var sideNav = document.getElementById('ob-side-nav');
            bgColor = "linear-gradient(to right, " + vm.primarycolor1 + " 0, " + vm.primarycolor1 + " 100px, " + vm.primarycolor1 + " 100px)";
            sideNav.style.background = bgColor;
            // apply secondary color
            var saveButton = document.getElementById('saveBtn');
            if (saveButton) saveButton.style.backgroundColor = vm.primarycolor2;

            var applyButton = document.getElementById('applyBtn');
            if (applyButton) {
                applyButton.style.backgroundColor = vm.primarycolor2;
            }

            var cancelButton = document.getElementById('cancelBtn');
            window.setTimeout(function () {
                cancelButton.focus();
            }, 0);

            // select tab
            var bar = document.querySelector('md-ink-bar');
            bar.style.backgroundColor = vm.primarycolor2;
            var barTxt = document.getElementsByTagName('md-tab-item');
            var barText = barTxt[6];
            barText.style.color = vm.primarycolor2;
            // let barTxt = document.getElementById('brandingTab');
            // barTxt.style.color = vm.primarycolor2;

        }

        vm.resetBranding = function () {
            $rootScope.$emit('temp_logo', null);
            $state.go('Settings.Branding', {}, { reload: 'Settings.Branding' });
            var sideNav = document.getElementById('ob-side-nav');
            // vm.primarycolor1 = '#273748';
            // vm.primarycolor2 = '#d75a5a';

            bgColor = "linear-gradient(to right, " + vm.primarycolor1 + " 0, " + vm.primarycolor1 + " 100px, " + vm.primarycolor1 + " 100px)";
            sideNav.style.background = bgColor;

            // reset button colors as well
            var saveButton = document.getElementById('saveBtn');
            if (saveButton) saveButton.style.backgroundColor = vm.primarycolor2;

            var applyButton = document.getElementById('applyBtn');
            if (applyButton) applyButton.style.backgroundColor = vm.primarycolor2;

            var bar = document.querySelector('md-ink-bar');
            bar.style.backgroundColor = vm.primarycolor2;
            var barTxt = document.getElementsByTagName('md-tab-item');
            var barText = barTxt[6];
            barText.style.color = vm.primarycolor2;

            // var logoFileName = $scope.file.name;
            // var logoFileArray = logoFileName.split('.');
            // var objBranding = new FormData();
            // objBranding.append('logo', $scope.file);
            // objBranding.append('jsdata', '(function (window) { window.__envColors = window.__envColors || {}; window.__envColors.secondaryColor = \'' + secondaryColorWithoutHash + '\'; window.__envColors.logoSrc = ' + $rootScope.LogoURL+'temp_logo/' + logoFileArray[1] + '\'; window.__envColors.backgroundSrc = ' + $rootScope.BackgroundURL + backgroundFileArray[1] + '\'; }(this));');

            // BrandingService.saveBranding(objBranding).then(
            //     function (response) {
            //         if (response.data.Error) {
            //             ToastrService.error(response.data.message);
            //             getBrandingDetails();
            //         }
            //         if (!response.data.Error) {
            //             $state.go('Branding', {}, { reload: 'Branding' });
            //             ToastrService.success(response.data.message);
            //         }
            //     },
            //     function (err) {
            //         ToastrService.error($rootScope.errorMsgs.MSG198);
            //     }
            // )

        }


        vm.saveBranding = function () {
            var secondaryColorWithoutHash = vm.primarycolor2.replace('#', '');
            var logoFileName;
            var backgroundFileName;
            if ($scope.file) {
                logoFileName = $scope.file.name;
            }
            else {
                logoFileName = vm.logoPath;
            }
            var logoFileArray = logoFileName.split('.');
            if ($scope.backgroundFile) {
                backgroundFileName = $scope.backgroundFile.name;
            }
            else {
                backgroundFileName = vm.backgroundPath;
            }
            var backgroundFileArray = backgroundFileName.split('.');
            var objBranding = new FormData();
            objBranding.append('logo', $scope.file ? $scope.file : null);
            objBranding.append('imgsrc', $scope.backgroundFile ? $scope.backgroundFile : null);
            objBranding.append('navigationBgColor', '');
            objBranding.append('primaryColor1', vm.primarycolor1);
            objBranding.append('primaryColor2', vm.primarycolor2);
            objBranding.append('headingColor', '');
            objBranding.append('bodyTextColor', '');
            objBranding.append('heroImgsrc', '');
            objBranding.append('cssdata', '.onboarding-side-nav {  background: linear-gradient(to right, ' + vm.primarycolor1 + ' 0, ' + vm.primarycolor1 + ' 100px, ' + vm.primarycolor1 + ' 100px);}');
            objBranding.append('jsdata', "(function (window) { window.__envColors = window.__envColors || {}; window.__envColors.secondaryColor = \'" + secondaryColorWithoutHash + "\'; window.__envColors.logoSrc = \'" + $rootScope.LogoURL + logoFileArray[logoFileArray.length-1] + "\'; window.__envColors.backgroundSrc = \'" + $rootScope.BackgroundURL + backgroundFileArray[backgroundFileArray.length-1] + "\'; }(this));");
            objBranding.append('logopath', vm.logoPath);
            objBranding.append('imgsrcpath', vm.backgroundPath);

            $scope.loading = true;
            BrandingService.saveBranding(objBranding).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                        getBrandingDetails();
                    }
                    if (!response.data.Error) {
                        ToastrService.success(response.data.message);

                       // $rootScope.$emit('Branding_Changed', true);
                        setTimeout(function (){
                            $window.location.reload();
                        }, 0);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG198);
                }
            ).finally(function () {
                $scope.loading = false;
            });

        }
        $scope.$watch('file', function () {
            // file size cannot be more than 500kB
            if ($scope.file) {
                // console.log($scope.file);
                if ($scope.file.size > 0.5 * 1024 * 1024) {
                    ToastrService.error($rootScope.errorMsgs.MSG248);
                    $scope.file = null;
                    return;
                }
            }

            if ($scope.file) {
                var fileDropZone = document.getElementById('file-drop-zone-logo');
                fileDropZone.style.backgroundImage = 'none';
                // give focus to doc name element
            }
            else{
                var fileDropZone = document.getElementById('file-drop-zone-logo');
                fileDropZone.style.backgroundImage = 'url(..'+rooturl+'/images/drag_drop_recommended.png)';
            }
        });

        $scope.$watch('backgroundFile', function () {

            // file size cannot be more than 1MB
            if ($scope.backgroundFile) {
                // console.log($scope.file);
                if ($scope.backgroundFile.size > 1 * 1024 * 1024) {
                    ToastrService.error($rootScope.errorMsgs.MSG209);
                    $scope.backgroundFile = null;
                    return;
                }
            }
            if ($scope.backgroundFile) {
                var fileDropZone = document.getElementById('file-drop-zone-background');
                fileDropZone.style.backgroundImage = 'none';
                // give focus to doc name element
            }
            else{
                var fileDropZone = document.getElementById('file-drop-zone-background');
                fileDropZone.style.backgroundImage = 'url(..'+rooturl+'/images/drag_drop.png)';
            }
        });

        vm.clearLogo = function () {
            var dropzone = document.getElementById('file-drop-zone-logo');
            dropzone.style.backgroundImage = 'url(..'+rooturl+'/images/drag_drop_recommended.png)';
        }
        vm.clearBackground = function () {
            var dropzone = document.getElementById('file-drop-zone-background');
            dropzone.style.backgroundImage = 'url(..'+rooturl+'/images/drag_drop.png)';
        }

        // Browser detecction
        $scope.browserType = function () { 
            if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
                vm.browserUsed = 'Opera';
                vm.ImageDocCardClass = 'wf-doc-icon-text';
            }
            else if(navigator.userAgent.indexOf("Chrome") != -1 ) {
                vm.browserUsed = 'Chrome';
                vm.ImageDocCardClass = 'wf-doc-icon-text';
            }
            else if(navigator.userAgent.indexOf("Safari") != -1) {
                vm.browserUsed = 'Safari';
                vm.ImageDocCardClass = 'wf-doc-icon-text';
            }
            else if(navigator.userAgent.indexOf("Firefox") != -1 ) {
                vm.browserUsed = 'Firefox';
                vm.ImageDocCardClass = 'wf-doc-icon-text-moz';
            }
            else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) { //IF IE > 10
                vm.browserUsed = 'IE'; 
                vm.ImageDocCardClass = 'wf-doc-icon-text';
            }  
            else {
                vm.browserUsed = 'Unknown';
                vm.ImageDocCardClass = 'wf-doc-icon-text';
            }
        }
        $scope.browserType();        

    }
})();