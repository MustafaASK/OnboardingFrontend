(function() {
    'use strict';
    hrAdminApp.factory('InitiateOnboardingService', InitiateOnboardingService);
    InitiateOnboardingService.$inject = ['$rootScope', '$http'];

    function InitiateOnboardingService($rootScope, $http) {

        var objInitiateOnboardingService = {};
        objInitiateOnboardingService.getOfferLetters = getOfferLetters;
        objInitiateOnboardingService.getWorkFlowList = getWorkFlowList;
        objInitiateOnboardingService.getWorkFlowDetail = getWorkFlowDetail;
        objInitiateOnboardingService.getOfferLetterDetail = getOfferLetterDetail;
        objInitiateOnboardingService.sendEmailTemplate = sendEmailTemplate;
        objInitiateOnboardingService.documentUploadEchosign = documentUploadEchosign;
        objInitiateOnboardingService.getCities = getCities;
        objInitiateOnboardingService.getStatesList = getStatesList;
        objInitiateOnboardingService.sendDynamicOfferLetter = sendDynamicOfferLetter;
        objInitiateOnboardingService.getOfferLetterBody = getOfferLetterBody;
        //objInitiateOnboardingService.getEmailLogList = getEmailLogList;

        //http://192.168.1.198:8080/OnBoarding/dynamicsendofferletter
        //http://192.168.1.198:8080/OnBoarding/getSendOfferLetterBody/71/27859



        return objInitiateOnboardingService;
        
        function getCities(id) {
            return $http.get($rootScope.APIURL + 'citieslist/' + id);
        }

        function getStatesList() {
            return $http.get($rootScope.APIURL + 'stateslist');
        }

        function getOfferLetters() {
            return $http.get($rootScope.APIURL + 'emailtempsendofferlist', {
                headers: { "ask-auth-token": localStorage.getItem('ask-auth-token') }
            });
        }

        function documentUploadEchosign(id) {
            //return $http.get($rootScope.CandidateAPIURL + 'documentUploadEchosign/' + id);
            return $http({
                method: 'POST',
                url: $rootScope.CandidateAPIURL + 'documentUploadEchosign',
                data: JSON.stringify({
                    frontendurl:$rootScope.FrontEndURLForCandidate,
                    newhireid:id
                }),
                headers: { 
                    'Content-type': 'application/json'
                 },
                transformRequest: angular.identity
            });
        }

        function getOfferLetterDetail(id) {
            return $http.get($rootScope.APIURL + 'emailtemplateview/' + id, {
                headers: { "ask-auth-token": localStorage.getItem('ask-auth-token') }
            });
        }

        function getWorkFlowList(isMainApi) {
            return $http.get($rootScope.APIURL + 'workflowlist' + '/' + isMainApi, {
                headers: { "ask-auth-token": localStorage.getItem('ask-auth-token') }
            });
        }

        function getWorkFlowDetail(id) {
            return $http.get($rootScope.APIURL + 'getlistbyworkflowid/' + id, {
                headers: { "ask-auth-token": localStorage.getItem('ask-auth-token') }
            });
        }

        function sendEmailTemplate(mailDetails) {
            return $http({
                method: 'POST',
                url: $rootScope.APIURL + 'sendofferletter',
                data: JSON.stringify(mailDetails),
                headers: {
                    'ask-auth-token': localStorage.getItem('ask-auth-token'),
                    'Content-type': 'application/json'
                },
                transformRequest: angular.identity
            });
        }

        function sendDynamicOfferLetter(mailDetails){
            return $http({
                method: 'POST',
                url: $rootScope.APIURL + 'dynamicsendofferletter',
                data: JSON.stringify(mailDetails),
                headers: {
                    'ask-auth-token': localStorage.getItem('ask-auth-token'),
                    'Content-type': 'application/json'
                },
                transformRequest: angular.identity
            });
        }

        function getOfferLetterBody(templateId,newhireId) {
            return $http.get($rootScope.APIURL + 'getSendOfferLetterBody/' + templateId + '/' +newhireId, {
                headers: { "ask-auth-token": localStorage.getItem('ask-auth-token') }
            });
        }

        /*function getEmailLogList() {
            return $http.get($rootScope.APIURL + 'emailloglist', {
                headers: {"ask-auth-token": localStorage.getItem('ask-auth-token')}
          });
        }*/








    }
})();