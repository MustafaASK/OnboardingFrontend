(function () {
    'use strict';
    candidateApp.factory('CommondetailsService', CommondetailsService);
    CommondetailsService.$inject = ['$rootScope', '$http'];
    function CommondetailsService($rootScope, $http) {

        var getOfferLetterStatusUrl = $rootScope.CandidateAPIURL + 'offerletterstatus/';
        var objCommondetailsService = {};
        objCommondetailsService.getOfferLetterStatus = getOfferLetterStatus;
        return objCommondetailsService;

        function getOfferLetterStatus(newhireId) {
            return $http.get(getOfferLetterStatusUrl + newhireId);
        }







    }
})();