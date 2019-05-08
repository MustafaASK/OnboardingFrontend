(function () {
    'use strict';
    hrAdminApp.controller('PreviewIntroPageController', previewIntroPageController);
    previewIntroPageController.$inject = ['$rootScope', '$state','$mdDialog', '$stateParams','$sce', 'ToastrService','bindHtml', 'header', 'heading' , 'article', 'articleFile', 'headingEnable','articleEnable'];
    function previewIntroPageController($rootScope, $state,$mdDialog, $stateParams,$sce, ToastrService, bindHtml , header, heading,article,articleFile,headingEnable , articleEnable) {

        var vm = this;  
        vm.htmlPreview = $sce.trustAsHtml(bindHtml);
        vm.header =  header;
        vm.heading = heading;
        vm.article = article;
        vm.articleVideo = articleFile;
        vm.previewClose = previewClose;
        vm.headingEnable = headingEnable;
        vm.articleEnable = articleEnable;

        vm.trustAsHtml = function () {
            return $sce.trustAsHtml(vm.heading);
        };
        vm.trustAsHtmlForArticle = function () {
            return $sce.trustAsHtml(vm.article);
        };

        function previewClose($event) {
            $mdDialog.cancel();
        }
    }
})();