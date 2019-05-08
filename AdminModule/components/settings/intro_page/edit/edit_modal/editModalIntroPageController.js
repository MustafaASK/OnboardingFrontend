(function () {
    'use strict';
    hrAdminApp.controller('EditModalIntroPageController', editModalIntroPageController);
    editModalIntroPageController.$inject = ['$rootScope', '$scope', '$state', '$mdDialog', '$stateParams', '$timeout', 'ToastrService', 'isLogo', 'isBanner', 'isHeading', 'isArticle', 'objIntroData', 'objFiles'];
    function editModalIntroPageController($rootScope, $scope, $state, $mdDialog, $stateParams, $timeout, ToastrService, isLogo, isBanner, isHeading, isArticle, objIntroData, objFiles) {

        var vm = this;
        // vm.defaultLogoSource = "images/img_resourse_temp/trademark_logo.png";
        // vm.defaultBannerSource = "images/img_resourse_temp/hero_image.png";
        // // vm.defaultArticleSource = "images/img_resourse_temp/mov_bbb.mp4";
        vm.isBanner = isBanner;
        vm.isLogo = isLogo;
        vm.isHeading = isHeading;
        vm.isArticle = isArticle;
        vm.saveEditIntro = saveEditIntro;
        vm.cancelEditIntro = cancelEditIntro;
        vm.IntroPageData = angular.copy(objIntroData);
        vm.files = objFiles;


        if (isLogo) {
            vm.modalHeader = 'Logo';
        }
        else if (isBanner) {
            vm.modalHeader = 'Hero Image';
        }
        else if (isHeading) {
            vm.modalHeader = 'Heading Title and Description';
            vm.heroUrl = vm.files.heroURL;
        }
        else if (isArticle) {
            vm.modalHeader = 'Article Title and Description';
            vm.articleUrl = vm.files.articleURL;
        }

        function saveEditIntro() {
            if (isArticle) {
                if (vm.htmlToPlaintext(vm.IntroPageData.articleText).trim() == "") {
                    ToastrService.error('Please enter the Article Description. It can’t be blank.');
                    return;
                }
                if (vm.articleUrl && vm.articleUrl.file){
                    vm.files.articleURL = vm.articleUrl;
                }
                //vm.IntroPageData.articleTitle = vm.IntroPageData.articleTitle.trim();
                vm.IntroPageData.articleText = vm.IntroPageData.articleText.replace(/<p style="/g, "<p style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;");
                vm.IntroPageData.articleText = vm.IntroPageData.articleText.replace(/<p>/g, "<p style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;\">");
                vm.IntroPageData.articleText = vm.IntroPageData.articleText.replace(/<ul style="/g, "<ul style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;");
                vm.IntroPageData.articleText = vm.IntroPageData.articleText.replace(/<ul>/g, "<ul style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;\">");
                vm.IntroPageData.articleText = vm.IntroPageData.articleText.replace(/<ol style="/g, "<ol style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;");
                vm.IntroPageData.articleText = vm.IntroPageData.articleText.replace(/<ol>/g, "<ol style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;\">");
                vm.IntroPageData.articleText = vm.IntroPageData.articleText.trim();
            }
            else if (isBanner) {
                if (vm.heroUrl.file) {
                    vm.files.heroURL = vm.heroUrl;
                }
                else {
                    vm.cancelEditIntro();
                    return;
                }
            }
            else if (isHeading) {
                if (vm.htmlToPlaintext(vm.IntroPageData.headText).trim() == "") {
                    ToastrService.error('Please enter the Heading Description. It can’t be blank.');
                    return;
                }
                vm.IntroPageData.headText = vm.IntroPageData.headText.replace(/<p style="/g, "<p style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;");
                vm.IntroPageData.headText = vm.IntroPageData.headText.replace(/<p>/g, "<p style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;\">");
                vm.IntroPageData.headText = vm.IntroPageData.headText.replace(/<ul style="/g, "<ul style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;");
                vm.IntroPageData.headText = vm.IntroPageData.headText.replace(/<ul>/g, "<ul style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;\">");
                vm.IntroPageData.headText = vm.IntroPageData.headText.replace(/<ol style="/g, "<ol style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;");
                vm.IntroPageData.headText = vm.IntroPageData.headText.replace(/<ol>/g, "<ol style=\"margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;\">");
                vm.IntroPageData.headText = vm.IntroPageData.headText.trim();
            }
            var objIntroPage = {};
            objIntroPage.IntroData = vm.IntroPageData;
            objIntroPage.FilesData = vm.files;
            $mdDialog.hide(objIntroPage);
        }

        function cancelEditIntro() {
            vm.files = {};
            $mdDialog.cancel();
        }

        $scope.$watch('vm.heroUrl', function () {
            // file size cannot be more than 2MB
            if (vm.heroUrl) {
                // console.log($scope.file);
                if (vm.heroUrl.file.size > 2 * 1024 * 1024) {
                    ToastrService.error("File size cannot be more than 2MB");
                    vm.heroUrl.file = null;
                    return;
                }
            }
        });

        $scope.$watch('vm.articleUrl', function () {
            // file size cannot be more than 10MB
            if (vm.articleUrl) {
                // console.log($scope.file);
                if (vm.articleUrl.file.size > 10 * 1024 * 1024) {
                    ToastrService.error("File size cannot be more than 10MB");
                    vm.articleUrl.file = null;
                    return;
                }
            }
        });

        $scope.browserType = function () {
            if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {

            }
            else if (navigator.userAgent.indexOf("Chrome") != -1) {

            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {

            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                if (navigator.userAgent.indexOf("Firefox/47") != -1) {
                    vm.DisplayModal = "inline-table";
                }
            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
            }
            else {

            }
        }
        $scope.browserType();

        vm.htmlToPlaintext = function (text) {
            // return text ? String(text).replace(/<[^>]+>/gm, '') : '';
            return text ? String(text).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').replace(/&\w+;/g, '').replace(/^\s*/g, '').replace(/\s*$/g, '') : '';
        }
    }
})();