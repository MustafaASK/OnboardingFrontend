(function() {
    'use strict';
    hrAdminApp.factory('HireInfoService', HireInfoService);
    HireInfoService.$inject = ['$rootScope', '$http'];

    function HireInfoService($rootScope, $http) {
        var getCategoryListURL = $rootScope.APIURL + 'categorylist';
        var getStatesListUrl = $rootScope.APIURL + 'stateslist';
        var getNewHiresStatusURL = $rootScope.APIURL + 'newhirestatus';

        var objHireInfoService = {};
        objHireInfoService.getHireInfo = getHireInfo;
        objHireInfoService.saveComments = saveComments;
        objHireInfoService.saveStepComments = saveStepComments;
        objHireInfoService.candidateDocUpdate = candidateDocUpdate;
        objHireInfoService.getCategoryList = getCategoryList;
        objHireInfoService.getStatesList = getStatesList;
        objHireInfoService.getNewHiresStatus = getNewHiresStatus;
        objHireInfoService.getPdfGenerateView = getPdfGenerateView;
        objHireInfoService.deletePdfGenerate = deletePdfGenerate;
        objHireInfoService.hireUserData = null;
        // getNewHireView/27851

        return objHireInfoService;



        function getCategoryList() {
            return $http.get(getCategoryListURL);
        }

        function getStatesList() {
            return $http.get(getStatesListUrl);
        }
        
        function getNewHiresStatus() {
            return $http.get(getNewHiresStatusURL);
        }

        function deletePdfGenerate() {
            return $http({
                method: 'DELETE',
                url: $rootScope.APIURL + 'deletePdfGenerate',
                headers: {
                    'ask-auth-token': localStorage.getItem('ask-auth-token')
                },
                transformRequest: angular.identity
            });
        }

        function getPdfGenerateView(objDoc) {
            return $http({
                method: 'POST',
                url: $rootScope.APIURL + 'apiPdfGenerate',
                data: JSON.stringify(objDoc),
                headers: {
                    'ask-auth-token': localStorage.getItem('ask-auth-token'),
                    'Content-type': 'application/json'
                },
                transformRequest: angular.identity
            });
        }

        function candidateDocUpdate(objDoc) {
            return $http({
                method: 'POST',
                url: $rootScope.APIURL + 'candidateupdate',
                data: JSON.stringify(objDoc),
                headers: {
                    'ask-auth-token': localStorage.getItem('ask-auth-token'),
                    'Content-type': 'application/json'
                },
                transformRequest: angular.identity
            });
        }

        function getHireInfo(hireId) {
            return $http.get($rootScope.APIURL + 'getNewHireView/' + hireId, {
                headers: { "ask-auth-token": localStorage.getItem('ask-auth-token') }
            });
        }

        function saveComments(obj) {
            return $http({
                method: 'POST',
                url: $rootScope.APIURL + 'certify',
                data: JSON.stringify(obj),
                headers: {
                    'ask-auth-token': localStorage.getItem('ask-auth-token'),
                    'Content-type': 'application/json'
                },
                transformRequest: angular.identity
            });
        }

        function saveStepComments(obj) {
            return $http({
                method: 'POST',
                url: $rootScope.APIURL + 'stepcertify',
                data: JSON.stringify(obj),
                headers: {
                    'ask-auth-token': localStorage.getItem('ask-auth-token'),
                    'Content-type': 'application/json'
                },
                transformRequest: angular.identity
            });
        }
    }
})();