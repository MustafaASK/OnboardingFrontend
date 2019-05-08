(function () {
    'use strict';
    candidateApp.factory('ContractorInfoService', contractorInfoService);
    contractorInfoService.$inject = ['$rootScope', '$http'];
    function contractorInfoService($rootScope, $http) {

        var addContractorInfoUrl = $rootScope.CandidateAPIURL + 'addContractor';
        var viewContractorInfoUrl = $rootScope.CandidateAPIURL + 'viewContractor/';
        var editContractorInfoUrl = $rootScope.CandidateAPIURL + 'editContractor';
        var deleteContractorInfoUrl = $rootScope.CandidateAPIURL + 'deleteContractor/';

        var objEEOService = {};

        objEEOService.addContractorInfo = addContractorInfo;
        objEEOService.viewContractorInfo = viewContractorInfo;
        objEEOService.editContractorInfo = editContractorInfo;
        // objEEOService.deleteEEODetails = deleteEEODetails;


        return objEEOService;

        function addContractorInfo(obj) {
            return $http.post(addContractorInfoUrl,obj);
        }

        function viewContractorInfo(candidateId) {
            return $http.get(viewContractorInfoUrl + candidateId);
        }

        function editContractorInfo(obj){
            return $http.post(editContractorInfoUrl,obj);
        }
    }
})();