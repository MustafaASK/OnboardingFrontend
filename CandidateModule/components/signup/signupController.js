(function () {
    'use strict';
    candidateApp.controller('CandidateSignupController', CandidateSignupController);
    CandidateSignupController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'ToastrService','$location'];
    function CandidateSignupController($rootScope, $scope, $state, $stateParams, ToastrService,$location) {
        $rootScope.UserInfo = null;
        
        var vm = this;
        vm.ErrorMessage = '';
        $rootScope.CopyrightsFooter = false;
        vm.backgroundImage = $rootScope.BrandingImagesURL;
        vm.logoImage = $rootScope.LogoImagesURL;
        vm.thankyouPage = $rootScope.rootUrl + '/images/Thankyou.jpg';
        vm.linkExpired = $rootScope.rootUrl + '/images/link_expired.jpg';


    }
})();