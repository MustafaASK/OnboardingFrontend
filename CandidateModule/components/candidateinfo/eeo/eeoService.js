(function () {
    'use strict';
    candidateApp.factory('EEOService', EEOService);
    EEOService.$inject = ['$rootScope', '$http'];
    function EEOService($rootScope, $http) {

        var addEEODetailsUrl = $rootScope.CandidateAPIURL + 'addEEOdetails';
        var viewEEODetailsUrl = $rootScope.CandidateAPIURL + 'viewEEOdetails/';
        var editEEODetailsUrl = $rootScope.CandidateAPIURL + 'editEEOdetails';
        var deleteEEODetailsUrl = $rootScope.CandidateAPIURL + 'deleteEEOdetails/';

        var objEEOService = {};

        objEEOService.addEEODetails = addEEODetails;
        objEEOService.viewEEODetails = viewEEODetails;
        objEEOService.editEEODetails = editEEODetails;
        // objEEOService.deleteEEODetails = deleteEEODetails;


        return objEEOService;

        function addEEODetails(obj) {
            return $http.post(addEEODetailsUrl,obj);
        }

        function viewEEODetails(candidateId) {
            return $http.get(viewEEODetailsUrl + candidateId);
        }

        function editEEODetails(obj){
            return $http.post(editEEODetailsUrl,obj);
        }
    }
})();