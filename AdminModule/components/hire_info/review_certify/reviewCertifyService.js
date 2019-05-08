(function () {
    'use strict';
    hrAdminApp.factory('ReviewCertifyService', ReviewCertifyService);
    ReviewCertifyService.$inject = ['$rootScope', '$http'];

    function ReviewCertifyService($rootScope, $http) {

        var objReviewCertifyService = {};
        objReviewCertifyService.getReviews = getReviews;
        objReviewCertifyService.certifyFinalIt = certifyFinalIt;
        objReviewCertifyService.getStepStatus = getStepStatus;
        objReviewCertifyService.getDocStatus = getDocStatus;
        objReviewCertifyService.completeNewHire = completeNewHire;
        objReviewCertifyService.getSecuredDetails = getSecuredDetails;

        return objReviewCertifyService;

        function getReviews(id) {
            return $http.get($rootScope.APIURL + 'review/' + id, {
                headers: { "ask-auth-token": localStorage.getItem('ask-auth-token') }
            });
        }

        function completeNewHire(id) {
            return $http.get($rootScope.APIURL + 'newhirestatusupdate/' + id + '/10', {
                headers: { "ask-auth-token": localStorage.getItem('ask-auth-token') }
            });
        }

        function getStepStatus() {
            return $http.get($rootScope.APIURL + 'getstepstatus', {
                headers: { "ask-auth-token": localStorage.getItem('ask-auth-token') }
            });
        }

        function getDocStatus() {
            return $http.get($rootScope.APIURL + 'getdocstatus', {
                headers: { "ask-auth-token": localStorage.getItem('ask-auth-token') }
            });
        }

        function getSecuredDetails(id) {
            return $http.get($rootScope.APIURL + 'getNewhireDecodingValues/' + id , {
                headers: { "ask-auth-token": localStorage.getItem('ask-auth-token') }
            });
        }

        function certifyFinalIt(mailDetails) {
            return $http({
                method: 'POST',
                url: $rootScope.APIURL + 'certify',
                data: JSON.stringify(mailDetails),
                headers: {
                    'ask-auth-token': localStorage.getItem('ask-auth-token'),
                    'Content-type': 'application/json'
                },
                transformRequest: angular.identity
            });
        }
    }
})();