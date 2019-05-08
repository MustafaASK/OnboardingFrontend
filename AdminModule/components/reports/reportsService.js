(function() {
    'use strict';
    hrAdminApp.factory('ReportsService', ReportsService);
    ReportsService.$inject = ['$rootScope', '$http'];

    function ReportsService($rootScope, $http) {

        var getClientslistUrl = $rootScope.APIURL + 'clientslistforreports';
        var getStaticlistUrl = $rootScope.APIURL + 'staticreport';
        var getDynamiclistUrl = $rootScope.APIURL + 'dynamicreport';
        var getStaticExcelReportUrl = $rootScope.APIURL + 'detailedstaticreport';
        
        var objReportsService = {};
        objReportsService.getClientsList = getClientsList;
        objReportsService.getStaticList = getStaticList; 
        objReportsService.getDynamicList = getDynamicList;
        objReportsService.getExceldata = getExceldata;
        objReportsService.getStaticExcelReport = getStaticExcelReport;

        return objReportsService;


        function getClientsList() {
            return $http.get(getClientslistUrl);
        }

        function getStaticList() {
            return $http.get(getStaticlistUrl);
        }

        function getStaticExcelReport() {
            return $http.get(getStaticExcelReportUrl);
        }

        function getDynamicList(url, obj) {
                return $http({
                    url: $rootScope.APIURL + url,
                    method: 'POST',
                    data: JSON.stringify(obj),
                    headers: { 'content-type': 'application/json' },
                    transformRequest: angular.identity
                });
        }

        function getExceldata(url, obj) {
                return $http({
                    url: $rootScope.APIURL + url,
                    method: 'POST',
                    data: JSON.stringify(obj),
                    headers: { 'content-type': 'application/json' },
                    transformRequest: angular.identity
                });
        }
    }
})();