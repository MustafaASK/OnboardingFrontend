(function () {
    'use strict';
    hrAdminApp.factory('EmailTemplateService', emailTemplateService);
    emailTemplateService.$inject = ['$rootScope', '$http'];

    function emailTemplateService($rootScope, $http) {
        
        var emailTemplatesListUrl = $rootScope.APIURL + 'emailtemplateslist';
        // http://111.93.6.103:999/OnBoarding/emailtemplateview/1002
        var viewEmailTemplateUrl = $rootScope.APIURL + 'emailtemplateview';
        // http://111.93.6.103:999/OnBoarding/emailtemplatedelete/2
        var delEmailTemplateUrl = $rootScope.APIURL + 'emailtemplatedelete';
        // http://111.93.6.103:999/OnBoarding/editemailtemplates
        var editEmailTemplateUrl = $rootScope.APIURL + 'editemailtemplates';
        var addEmailTemplateUrl = $rootScope.APIURL + 'addemailtemplates';
        var templateCategoryListUrl = $rootScope.APIURL + 'templatecategorylist';
        var templatecategoryfilteredlistUrl = $rootScope.APIURL + 'templatecategoryfilteredlist';
        var validemailtempnameURL = $rootScope.APIURL + 'validemailtempname';
        var emailBatchListUrl = $rootScope.APIURL + 'masterbatchcriteriaslist';
        var getPlaceholdersListUrl = $rootScope.APIURL + 'placeholderlist';

        var objEmailTemplateService = {};
        objEmailTemplateService.getEmailTemplateList = getEmailTemplateList;
        objEmailTemplateService.deleteEmailTemplate = deleteEmailTemplate;
        objEmailTemplateService.viewEmailTemplateData = viewEmailTemplateData;
        objEmailTemplateService.editEmailTemplateData = editEmailTemplateData;
        objEmailTemplateService.addEmailTemplate = addEmailTemplate;
        objEmailTemplateService.getTemplateCategoryList = getTemplateCategoryList;
        objEmailTemplateService.getTemplateCategoryFilteredList = getTemplateCategoryFilteredList;
        objEmailTemplateService.getValidEmailTempName = getValidEmailTempName;
        objEmailTemplateService.getMasterBatchList = getMasterBatchList;
        objEmailTemplateService.getPlaceholdersList = getPlaceholdersList;
        return objEmailTemplateService;

        function getMasterBatchList(templateIdExist){
            return $http.get(emailBatchListUrl+(templateIdExist? '/edit':'/add'));
        }

        function getEmailTemplateList(isMainApi) {
            return $http.get(emailTemplatesListUrl + '/' + isMainApi);
        }

        function getTemplateCategoryList() {
            return $http.get(templateCategoryListUrl);
        }

        function getTemplateCategoryFilteredList() {
            return $http.get(templatecategoryfilteredlistUrl);
        }

        function viewEmailTemplateData(emailTemplateId) {
            return $http.get(viewEmailTemplateUrl + "/" + emailTemplateId.toString());
        }

        function addEmailTemplate(objTemplate){
            return $http({
                method: 'POST',
                url: addEmailTemplateUrl,
                data: objTemplate,
                headers: {'Content-type': undefined},
                transformRequest: angular.identity
            });
        }

        function editEmailTemplateData(objTemplateData) {
            // form data to be sent
            // return $http.post(editEmailTemplateUrl, objTemplateData);
            return $http({
                method: 'POST',
                url: editEmailTemplateUrl,
                data: objTemplateData,
                headers: {'Content-type': undefined},
                transformRequest: angular.identity
            });
        }

        function deleteEmailTemplate(emailTemplateId) {
            return $http({
                method: 'DELETE',
                url: delEmailTemplateUrl + "/" + emailTemplateId,
                data: null,
                headers: {'Content-type': 'application/json'}
            });
        }

        function getValidEmailTempName(objTempName) {
            // return $http({
            //     method: 'POST',
            //     url: validemailtempnameURL,
            //     data: objTempName,
            //     headers: {'Content-Type': 'application/json'},
            //     transformRequest: angular.identity
            // });
            return $http.post(validemailtempnameURL, objTempName);
        }

        function getPlaceholdersList() {
            return $http.get(getPlaceholdersListUrl);
        }
    }
})();
