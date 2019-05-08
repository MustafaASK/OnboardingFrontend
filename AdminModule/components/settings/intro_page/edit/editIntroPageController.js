(function () {
    'use strict';
    hrAdminApp.controller('EditIntroPageController', editIntroPageController);
    editIntroPageController.$inject = ['$rootScope', '$mdDialog', '$state', '$scope', '$q', '$stateParams', 'ToastrService', 'IntroPageService','$sce'];
    function editIntroPageController($rootScope, $mdDialog, $state, $scope, $q, $stateParams, ToastrService, IntroPageService,$sce) {

        var vm = this;
        var rootUrl = $rootScope.rootUrl;
        if(!$rootScope.UserInfo.isAdmin){
            $scope.$parent.currentNavItem = 3;
        } else {
            $scope.$parent.currentNavItem = 5;
        }

        vm.bannerUrl = $rootScope.ImagesURL + 'hero_image.png';
        // vm.logoUrlAlt = 'images/img_resourse_temp/ASKstaffing.jpg';
        vm.articleUrl = $rootScope.ImagesURL + 'article_image.png';
        vm.openEditModal = openEditModal;
        vm.previewIntroPage = previewIntroPage;
        vm.getSelectedClientDetails = getSelectedClientDetails;
        vm.updatePage = updatePage;
        vm.clientIntroPage = {};
        vm.files = {};
        vm.marginForLogo = '-232px';
        vm.articleHeadingWidth = "650px";
        vm.defHeadTitle = '< Enter Heading Title >';
        vm.defHeadText = '< Enter Heading Title and Description >';
        vm.defArticleTitle = '< Enter Article Title >';
        vm.defArticleText = '< Enter Article Title and Description >';

        if (screen.width == 1024) {
            vm.articleHeadingWidth = "325px";
        }

        if ($stateParams.id) {
            vm.introId = $stateParams.id;
            vm.clientName = decodeURIComponent($stateParams.clientName);
            vm.clientId = $stateParams.clientId;
        } else {

            vm.isHeadingEditEnabled = true;
            vm.isBannerEditEnabled = true;
            vm.isArticleEditEnabled = true;
        }

        $scope.$watch('vm.logoImage', function (newValue, oldValue) {
            if (vm.logoImage)
                vm.marginForLogo = '-115px';
            else
                vm.marginForLogo = '-232px';
        });
        $scope.$watch('vm.files.logoURL', function (newValue, oldValue) {
            if (vm.files.logoURL)
                vm.marginForLogo = '-115px';
            else
                vm.marginForLogo = '-232px';
        });

        function previewIntroPage() {
            if (!vm.clientId) {
                ToastrService.error("Please select Client Name. It can't be blank.");
                return;
            }
            // if (!vm.files.logoURL && !vm.logoImage) {
            //     ToastrService.error("Please upload Logo.");
            //     return;
            // }
            if (!vm.files.heroURL && !vm.heroImageUrl) {
                ToastrService.error("Please upload a Hero Image");
                return;
            }
            var htmlPreview = '';
            if (vm.heroImageUrl || vm.files.heroURL) {
                htmlPreview += '<div style="padding-left:10px;padding-right:10px">';
                htmlPreview += $("<div />").append($("#editHeaderSection").clone()).html();
                htmlPreview += '</div>';
            }
            if (vm.clientIntroPage.headflag && (vm.clientIntroPage.headTitle || vm.clientIntroPage.headText)) {
                htmlPreview += '<div style="padding-left:10px;padding-right:10px;font-family:verdana;font-size:12px;">';
                htmlPreview += $("<div />").append($("#editHeadingSection").clone()).html();
                htmlPreview += '</div>';
            }
            if (vm.clientIntroPage.articleflag && (vm.clientIntroPage.articleText || vm.clientIntroPage.articleTitle || (vm.articleVideoUrl || vm.files.articleURL))) {
                htmlPreview += '<div style="padding-left:10px;padding-right:10px;font-family:verdana;font-size:12px;">';
                htmlPreview += $("<div />").append($("#editArticleSection").clone()).html();
                htmlPreview += '</div>';
            }
            //vm.headerEnabled
            //var htmlInnerHtmlPreview=document.getElementById('editIntroPage').innerHTML;
            $mdDialog.show({
                controller: 'PreviewIntroPageController',
                controllerAs: 'vm',
                templateUrl: rootUrl + "/components/settings/intro_page/preview/previewIntroPage.html",
                parent: angular.element(document.body),
                //targetEvent: ev,
                clickOutsideToClose: false,
                locals: {
                    bindHtml: htmlPreview,
                    header : vm.heroImageUrl ? vm.heroImageUrl : vm.files.heroURL,
                    heading : vm.clientIntroPage.headText,
                    article : vm.clientIntroPage.articleText,
                    articleFile : vm.articleVideoUrl ? vm.articleVideoUrl : vm.files.articleURL,
                    headingEnable : vm.clientIntroPage.headflag,
                    articleEnable :vm.clientIntroPage.articleflag
                },
                fullscreen: true// Only for -xs, -sm breakpoints.

            })
        };

        function getClientsListForIntroPage() {
            IntroPageService.getClientsListForIntroPage().then(
                function (response) {
                    vm.clientsListWOIntroPage = response.data;
                    if (vm.clientId) {
                        // var objClient = {};
                        // objClient.clientId = vm.clientId;
                        // objClient.clientName = vm.clientName;
                        // objClient.IntroId = $stateParams.id;
                        // vm.clientsListWOIntroPage.push(objClient);
                        getSelectedClientDetails(vm.clientId);
                    }
                },
                function (err) {
                    ToastrService.error('An error occured while retrieving Clients List');
                }
            )
        }
        getClientsListForIntroPage();

        function getSelectedClientDetails(clientId) {

            for (var i = 0; i < vm.clientsListWOIntroPage.length; i++) {
                if (vm.clientsListWOIntroPage[i].clientId == clientId) {
                    vm.selectedClientId = vm.clientsListWOIntroPage[i].clientId;
                    vm.selectedClientName = vm.clientsListWOIntroPage[i].clientName;

                    if (vm.clientsListWOIntroPage[i].IntroId) {
                        vm.selectedClientIntroId = vm.clientsListWOIntroPage[i].IntroId;
                        vm.introId = vm.selectedClientIntroId;
                    }
                    else
                        vm.selectedClientIntroId = null;
                }
            }
            if (vm.selectedClientIntroId && !$stateParams.id) {
                if (clientId == vm.recentIntroPage) {
                    vm.getClientIntroPage(vm.selectedClientIntroId);
                    vm.logoImage = null;
                    vm.LogoImage = null;
                    vm.files.logoURL = null;
                    vm.heroImageUrl = null;
                    vm.files.heroURL = null;
                    vm.articleVideoUrl = null;
                    vm.files.articleURL = null;
                }
                else {
                    validateAddIntroPage();
                }
                // getClientIntroPage();
            }
            else if (vm.selectedClientIntroId) {
                vm.getClientIntroPage(vm.selectedClientIntroId);
            }
            else {
                // vm.clientIntroPage.headTitle = "";
                // vm.clientIntroPage.headText = "";
                // vm.clientIntroPage.articleTitle = "";
                // vm.clientIntroPage.articleText = "";
                // vm.clientIntroPage.setAsDefault = false;
                // vm.defHeadTitle = 'Heading 1';
                // vm.defHeadText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget';
                // vm.defArticleTitle = 'Article 1';
                // vm.defArticleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien';
                // vm.isHeadingEditEnabled = false;
                // // vm.isLogoEditEnabled = true;
                // vm.isBannerEditEnabled = false;
                // vm.isArticleEditEnabled = false;
                // vm.clientIntroPage.herourlflag = false;
                // vm.clientIntroPage.headflag = false;
                // vm.clientIntroPage.articleflag = false;
                // vm.logoImage = null;
                // vm.files.logoURL = null;
                // vm.heroImageUrl = null;
                // vm.files.heroURL = null;
                // vm.articleVideoUrl = null;
                // vm.files.articleURL = null;
                if ($stateParams.id) {
                    vm.clearIntroPage();
                }
                // console.log('HH');
            }
        }


        //OLD FUNCTIONALITY

        // function getClientsListWOIntroPage() {
        //     IntroPageService.getClientsListWOIntroPage().then(
        //         function (response) {
        //             vm.clientsListWOIntroPage = response.data;

        //             if (vm.clientId) {
        //                 var objClient = {};
        //                 objClient.clientId = vm.clientId;
        //                 objClient.clientName = vm.clientName;
        //                 objClient.status = false;

        //                 vm.clientsListWOIntroPage.push(objClient);
        //             }
        //         },
        //         function (err) {
        //             ToastrService.error('An error occured while retrieving Clients List');
        //         }
        //     )
        // }
        // if (!vm.introId)
        //     getClientsListWOIntroPage();

        function openEditModal(isLogoEdit, isBannerEdit, isHeadingEdit, isArticleEdit) {

            $mdDialog.show({
                controller: 'EditModalIntroPageController',
                controllerAs: 'vm',
                templateUrl: rootUrl + "/components/settings/intro_page/edit/edit_modal/editModalIntroPage.html",
                parent: angular.element(document.body),
                //targetEvent: ev,
                clickOutsideToClose: false,
                locals: {
                    isLogo: isLogoEdit,
                    isBanner: isBannerEdit,
                    isHeading: isHeadingEdit,
                    isArticle: isArticleEdit,
                    objIntroData: vm.clientIntroPage,
                    objFiles: vm.files
                },
                fullscreen: true// Only for -xs, -sm breakpoints.

            }).then(function (objIntroData) {
                if(objIntroData.IntroData.headText){
                    objIntroData.IntroData.headText = objIntroData.IntroData.headText.replace(/<p style="/g,"<p style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;");
                    objIntroData.IntroData.headText = objIntroData.IntroData.headText.replace(/<p>/g,"<p style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;\">");
                    objIntroData.IntroData.headText = objIntroData.IntroData.headText.replace(/<ul style="/g,"<ul style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;");
                    objIntroData.IntroData.headText = objIntroData.IntroData.headText.replace(/<ul>/g,"<ul style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;\">");
                    objIntroData.IntroData.headText = objIntroData.IntroData.headText.replace(/<ol style="/g,"<ol style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;");
                    objIntroData.IntroData.headText = objIntroData.IntroData.headText.replace(/<ol>/g,"<ol style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;\">");
                }
                if(objIntroData.IntroData.articleText){
                    objIntroData.IntroData.articleText = objIntroData.IntroData.articleText.replace(/<p style="/g,"<p style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;");
                    objIntroData.IntroData.articleText = objIntroData.IntroData.articleText.replace(/<p>/g,"<p style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;\">");
                    objIntroData.IntroData.articleText = objIntroData.IntroData.articleText.replace(/<ul style="/g,"<ul style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;");
                    objIntroData.IntroData.articleText = objIntroData.IntroData.articleText.replace(/<ul>/g,"<ul style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;\">");
                    objIntroData.IntroData.articleText = objIntroData.IntroData.articleText.replace(/<ol style="/g,"<ol style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;");
                    objIntroData.IntroData.articleText = objIntroData.IntroData.articleText.replace(/<ol>/g,"<ol style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;\">");
                }
                vm.clientIntroPage = objIntroData.IntroData;
                vm.files = objIntroData.FilesData;

                if (vm.files.articleURL && vm.files.articleURL.file)
                    vm.articleVideoUrl = window.URL.createObjectURL(vm.files.articleURL.file);
                if (vm.files.heroURL && vm.files.heroURL.file)
                    vm.heroImageUrl = window.URL.createObjectURL(vm.files.heroURL.file);
                if (vm.files.logoURL && vm.files.logoURL.file)
                    vm.logoImageUrl = window.URL.createObjectURL(vm.files.logoURL.file);

                // vm.isLogoEditEnabled = vm.IntroPageData.logourlflag;
                vm.isBannerEditEnabled = objIntroData.IntroData.herourlflag;
                vm.isHeadingEditEnabled = objIntroData.IntroData.headflag;
                vm.isArticleEditEnabled = objIntroData.IntroData.articleflag;

            }, function () {
                if (isArticleEdit) {
                    if (!vm.files.articleURL)
                        vm.files.articleURL = null;
                }
                else if (isLogoEdit) {
                    vm.files.logoURL = null;
                    // vm.logoImageUrl = null;
                    // vm.logoUrlAlt = 'images/img_resourse_temp/ASKstaffing.jpg';
                }
                else if (isBannerEdit) {
                    if (!vm.files.heroURL)
                        vm.files.heroURL = null;
                }
            });
        };

        function updatePage() {
            if (!vm.clientId) {
                ToastrService.error("Please select Client Name. It can't be blank.");
                return;
            }
            if (!vm.files.heroURL && !vm.heroImageUrl) {
                ToastrService.error("Please upload a Hero Image");
                return;
            }
            
            var objIntroPage = new FormData();
            objIntroPage.append("clients", vm.clientId);
            if (vm.introId)
                objIntroPage.append("introId", vm.introId);
            objIntroPage.append("createdBy", 1);
            objIntroPage.append("setAsDefault", vm.clientIntroPage.setAsDefault ? vm.clientIntroPage.setAsDefault : false);
            objIntroPage.append("headTitle", vm.clientIntroPage.headTitle ? vm.clientIntroPage.headTitle : '');
            objIntroPage.append("headText", vm.clientIntroPage.headText ? vm.clientIntroPage.headText : '');
            objIntroPage.append("articleTitle", vm.clientIntroPage.articleTitle ? vm.clientIntroPage.articleTitle : '');
            objIntroPage.append("articleText", vm.clientIntroPage.articleText ? vm.clientIntroPage.articleText : '');
            objIntroPage.append("logourlflag", vm.clientIntroPage.logourlflag ? '1' : '0');
            objIntroPage.append("herourlflag", vm.clientIntroPage.herourlflag && (vm.files.heroURL || (vm.clientIntroPage.heroURL && vm.heroImageUrl)) ? '1' : '0');
            objIntroPage.append("headflag", vm.clientIntroPage.headflag && (vm.clientIntroPage.headTitle || vm.clientIntroPage.headText) ? '1' : '0');
            objIntroPage.append("articleflag", vm.clientIntroPage.articleflag && (vm.clientIntroPage.articleTitle || vm.clientIntroPage.articleText || (vm.files.articleURL || (vm.clientIntroPage.articleURL && vm.articleVideoUrl))) ? '1' : '0');
            if (vm.LogoImage) {
                objIntroPage.append("logoUrl", vm.LogoImage.file);
                objIntroPage.append("logoUrlPath", '');
            }
            else {
                objIntroPage.append("logoUrlPath", vm.clientIntroPage.logoURL);
            }
            if (vm.files.heroURL && vm.files.heroURL.file) {
                objIntroPage.append("heroUrl", vm.files.heroURL.file);
                objIntroPage.append("heroUrlPath", '');
            }
            else if (vm.files.heroURL) {
                objIntroPage.append("heroUrlPath", vm.clientIntroPage.heroURL);
            }
            else {
                objIntroPage.append("heroUrl", null);
                objIntroPage.append("heroUrlPath", '');
            }
            if (vm.files.articleURL && vm.files.articleURL.file) {
                objIntroPage.append("articalUrl", vm.files.articleURL.file);
                objIntroPage.append("articalUrlPath", '');
            }
            else if (vm.files.articleURL) {
                objIntroPage.append("articalUrlPath", vm.clientIntroPage.articleURL);
            }
            else {
                objIntroPage.append("articalUrl", null);
                objIntroPage.append("articalUrlPath", '');
            }

            if (vm.selectedClientIntroId) {
                $scope.loading = true;
                IntroPageService.editClientIntroPage(objIntroPage).then(
                    function (response) {
                        ToastrService.success('Detail Notification has been sent to all the associated HR Users, and HR Admin');
                        if (!response.data.Error) {
                            //$state.go('IntroPage');
                        }

                        var object = {};
                        objIntroPage.forEach(function (value, key) {
                            object[key] = value;
                        });
                        var json = JSON.parse(JSON.stringify(object));
                        vm.recentIntroPage = JSON.parse(json.clients);

                        // console.log(json);
                        getClientsListForIntroPage();
                    },
                    function (err) {
                        ToastrService.error('An error occurred while updating Intro Page');
                    }
                ).finally(function () {
                    $scope.loading = false;
                });
            }
            else {
                $scope.loading = true;
                IntroPageService.addClientIntroPage(objIntroPage).then(
                    function (response) {
                        ToastrService.success('Detail Notification has been sent to all the associated HR Users, and HR Admin');
                        if (!response.data.Error) {
                            //$state.go('IntroPage');
                        }

                        var object = {};
                        objIntroPage.forEach(function (value, key) {
                            object[key] = value;
                        });
                        var json = JSON.parse(JSON.stringify(object));
                        vm.recentIntroPage = JSON.parse(json.clients);

                        // console.log(json);
                        getClientsListForIntroPage();
                    },
                    function (err) {
                        ToastrService.error('An error occurred while adding Intro Page');
                    }
                ).finally(function () {
                    $scope.loading = false;
                });
            }
        }

        vm.getClientIntroPage = function () {
            vm.clearIntroPage();
            IntroPageService.getClientIntroPage(vm.selectedClientIntroId).then(
                function (response) {
                    vm.clientId = response.data.clientIntroduction[0].clientId;
                    vm.clientIntroPage = response.data.clientIntroduction[0];

                    if (vm.clientIntroPage.articleURL)
                        vm.files.articleURL = $rootScope.UploadsURL + vm.clientIntroPage.articleURL;
                    else
                        vm.files.articleURL = null;

                    if (vm.clientIntroPage.heroURL)
                        vm.files.heroURL = $rootScope.UploadsURL + vm.clientIntroPage.heroURL;
                    else
                        vm.files.heroURL = null;

                    //  if (vm.clientIntroPage.heroURL)
                    //     vm.heroImag;eUrl = $rootScope.UploadsURL + vm.clientIntroPage.heroURL;
                    // else
                    //     vm.heroImageUrl = null

                    if (vm.clientIntroPage.logoURL)
                        vm.files.logoURL = $rootScope.UploadsURL + vm.clientIntroPage.logoURL;
                    else
                        vm.files.logoURL = null;
                    //getClientsListWOIntroPage();
                },
                function (err) {
                    ToastrService.error('An error occured while retrieving Clients List');
                }

            )
            vm.closeDeleteModal();
        }

        function validateAddIntroPage() {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                template: '<md-dialog aria-label="Delete" style="width:400px;">' +
                    '<div layout="column" layout-align="start end" style="padding:10px;">' +
                    '<ng-md-icon icon="clear" size="14" style="margin-top:8px;cursor:pointer" ng-click="vm.closeDeleteModal()">' +
                    '</ng-md-icon>' +
                    '</div>' +
                    '<md-content style="background-color:white">' +
                    '<div layout="column" layout-align="center center"><img src="images/alert_icon.png"/></div>' +
                    '<p align=center style="padding:10px 10px 20px 20px;font-size:13px;" >This Client already has an Introduction Page. Do you want to edit?</p>' +
                    '<md-divider></md-divider>' +
                    '<div layout="row" layout-align="end center" style="background-color:rgb(250,250,250);height:60px;padding:10px" flex>' +
                    '<md-button class="md-raised md-primary" ng-click="vm.getClientIntroPage()">OK</md-button>' +
                    '<md-button class="md-secondary" ng-click="vm.closeDeleteModal()">Cancel</md-button>' +
                    '</div>' +
                    '</md-content>' +
                    '</md-dialog>'
            }
            );

        }

        vm.closeDeleteModal = function () {
            vm.clientId = null;
            $mdDialog.hide();
        }

        $scope.$watch('vm.LogoImage', function () {
            // file size cannot be more than 500kB
            if (vm.LogoImage) {
                // console.log($scope.file);
                if (vm.LogoImage.file.size > 0.5 * 1024 * 1024) {
                    ToastrService.error("File size cannot be more than 500kB");
                    vm.LogoImage = null;
                    vm.logoImage = null;
                    return;
                }
            }
        });

        vm.deleteUploadedBanner = function () {
            if (vm.files.heroURL) {
                vm.files.heroURL = null;
                vm.heroImageUrl = null;
            }
            else
                vm.heroImageUrl = null;
        }

        vm.deleteUploadedVideo = function () {
            if (vm.files.articleURL) {
                vm.files.articleURL = null;
                vm.articleVideoUrl = null;
            }
            else
                vm.articleVideoUrl = null;
        }

        vm.clearIntroPage = function () {
            vm.clientIntroPage.headTitle = "";
            vm.clientIntroPage.headText = "";
            vm.clientIntroPage.articleTitle = "";
            vm.clientIntroPage.articleText = "";
            vm.clientIntroPage.setAsDefault = false;
            vm.defHeadTitle = '< Enter Heading Title >';
            vm.defHeadText = '< Enter Heading Description >';
            vm.defArticleTitle = '< Enter Article Title >';
            vm.defArticleText = '< Enter Article Description >';
            vm.isHeadingEditEnabled = false;
            // vm.isLogoEditEnabled = true;
            vm.isBannerEditEnabled = false;
            vm.isArticleEditEnabled = false;
            vm.clientIntroPage.herourlflag = false;
            vm.clientIntroPage.headflag = false;
            vm.clientIntroPage.articleflag = false;
            vm.logoImage = null;
            vm.files.logoURL = null;
            vm.heroImageUrl = null;
            vm.files.heroURL = null;
            vm.articleVideoUrl = null;
            vm.files.articleURL = null;
        }

        $scope.browserType = function () {
            if (navigator.userAgent.indexOf("Safari") != -1) {
                vm.browserUsed = 'Safari';
                var uaArray = navigator.userAgent.split('/');
                for (var i = 0; i < uaArray.length; i++) {
                    if (uaArray[i].indexOf('Safari') != -1) {
                        var ver = uaArray[i].split(' ')[0];
                        // console.log("Safari Browser Version: ", ver);
                        if (ver < "11") vm.heroImgPaddingBottom = "300px";
                        break;
                    }
                }
            }
        }

        $scope.browserType();

        $scope.trustAsHtml = function () {
            return $sce.trustAsHtml(vm.clientIntroPage.headText);
        };
        $scope.trustAsHtmlForArticle = function () {
            return $sce.trustAsHtml(vm.clientIntroPage.articleText);
        };



    }
})();