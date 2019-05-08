(function () {
    'use strict';
    candidateApp.controller('OfferLetterWarningController', offerLetterWarningController);
    offerLetterWarningController.$inject = ['$rootScope', '$state', '$scope', '$mdDialog', '$stateParams', 'ToastrService', 'IntroPageService', '$filter'];
    function offerLetterWarningController($rootScope, $state, $scope, $mdDialog, $stateParams, ToastrService, IntroPageService, $filter) {

        var vm = this;
        vm.CandidateInfo = angular.copy($rootScope.CandidateInfo);
       
    }
})();