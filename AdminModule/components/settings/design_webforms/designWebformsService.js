(function () {
    'use strict';
    hrAdminApp.factory('DesignWebformsService', designWebformsService);
    designWebformsService.$inject = ['$rootScope', '$http'];

    function designWebformsService($rootScope, $http) {

        var getWebformsListUrl = $rootScope.APIURL + 'getAllWebFormList';
        var getWebformDetailsUrl = $rootScope.APIURL + 'getWebForm/';
        var saveWebformDetailsUrl = $rootScope.APIURL + 'saveWebForm';
        var deleteWebformUrl = $rootScope.APIURL + 'webformdelete/';
        var restoreWebformUrl = $rootScope.APIURL + 'webformrestore/';
        var getSelectBoxDataSourceUrl = $rootScope.APIURL + 'commonapis';
        var getWebformCommonFieldsListUrl = $rootScope.APIURL + 'webformcommonfields/';
        var getSourceProfileURL = $rootScope.APIURL + 'sourceprofiles';
        var getJobHireCategoryUrl = $rootScope.APIURL + 'jobcategory';
        var getClientslistUrl = $rootScope.APIURL + 'clients';
        // http://localhost:9090/OnBoarding/savewebformmapping
        var saveWebformMappingUrl = $rootScope.APIURL + 'savewebformmapping';
        var subWebformDeleteFieldsUrl = $rootScope.APIURL + 'subwebformdeletefields';

        var objDesignWebforms = {};
        objDesignWebforms.getWebformsList = getWebformsList;
        objDesignWebforms.getWebformDetails = getWebformDetails;
        objDesignWebforms.saveWebformDetails = saveWebformDetails;
        objDesignWebforms.deleteWebform = deleteWebform;
        objDesignWebforms.restoreWebform = restoreWebform;
        objDesignWebforms.getSelectBoxDataSource = getSelectBoxDataSource;
        objDesignWebforms.getWebformCommonFieldsList = getWebformCommonFieldsList;
        objDesignWebforms.getClientsList = getClientsList;
        objDesignWebforms.getSourceProfile = getSourceProfile;
        objDesignWebforms.getJobHireCategory = getJobHireCategory;
        objDesignWebforms.saveWebformMapping = saveWebformMapping;
        objDesignWebforms.subWebformDeleteFields = subWebformDeleteFields;

        return objDesignWebforms;

        function getWebformsList() {
            return $http.get(getWebformsListUrl);
        }

        function getWebformDetails(webformId) {
            return $http.get(getWebformDetailsUrl + webformId);
        }

        function saveWebformDetails(objWebform) {
            return $http.post(saveWebformDetailsUrl, objWebform);
        }

        function deleteWebform(webformId , deleteType){
            return $http({
                method: 'DELETE',
                url: deleteWebformUrl  + webformId + "/" + deleteType,
                data: null,
                headers: {'Content-type': 'application/json'}
            });
        }

        function restoreWebform(webformId){
            return $http({
                method: 'POST',
                url: restoreWebformUrl + webformId,
                data: null,
                headers: {'Content-type': 'application/json'}
            });
        }

        function getSelectBoxDataSource(){
            return $http.get(getSelectBoxDataSourceUrl);
        }

        function getWebformCommonFieldsList(parentWebformId){
            return $http.get(getWebformCommonFieldsListUrl + parentWebformId);
        }    

        function getClientsList() {
            return $http.get(getClientslistUrl);
        }

        function getSourceProfile() {
            return $http.get(getSourceProfileURL);
        }

        function getJobHireCategory() {
            return $http.get(getJobHireCategoryUrl);
        }

        function subWebformDeleteFields(objSubWebformsDelete){
            return $http({
                method: 'POST',
                url: subWebformDeleteFieldsUrl ,
                data: objSubWebformsDelete,
                headers: {'Content-type': 'application/json'}
            });
        }  

        function saveWebformMapping(objWebformMappingDetails){
            return $http({
                method: 'POST',
                url: saveWebformMappingUrl ,
                data: objWebformMappingDetails,
                headers: {'Content-type': 'application/json'}
            });
        }   

    }
})();