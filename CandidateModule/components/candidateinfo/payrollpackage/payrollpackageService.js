(function () {
    'use strict';
    candidateApp.factory('PayrollPackageService', payrollPackageService);
    payrollPackageService.$inject = ['$rootScope', '$http'];
    function payrollPackageService($rootScope, $http) {

        var addPayrollPackageUrl = $rootScope.CandidateAPIURL + 'addPayrollDetails';
        var viewPayrollPackageUrl = $rootScope.CandidateAPIURL + 'viewPayrollDetails/';
        var editPayrollPackageUrl = $rootScope.CandidateAPIURL + 'editPayrollDetails';
        var deletePayrollPackageUrl = $rootScope.CandidateAPIURL + 'deletePayrollDetails/';
        var getCommonDetailsUrl = $rootScope.CandidateAPIURL + 'viewCandidateDetailsList/';

        var objPayrollPackageService = {};

        objPayrollPackageService.addPayrollPackage = addPayrollPackage;
        objPayrollPackageService.viewPayrollPackage = viewPayrollPackage;
        objPayrollPackageService.editPayrollPackage = editPayrollPackage;
        objPayrollPackageService.getCommonDetails = getCommonDetails; 
        // objEEOService.deleteEEODetails = deleteEEODetails;


        return objPayrollPackageService;

        function addPayrollPackage(obj) {
            return $http.post(addPayrollPackageUrl,obj);
        }

        function viewPayrollPackage(candidateId) {
            return $http.get(viewPayrollPackageUrl + candidateId);
        }

        function editPayrollPackage(obj){
            return $http.post(editPayrollPackageUrl,obj);
        }

        function getCommonDetails(candidateId){
            return $http.get(getCommonDetailsUrl + candidateId);
        }
    }
})();