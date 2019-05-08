(function () {
    'use strict';
    hrAdminApp.factory('NewHiresService', newHiresService);
    newHiresService.$inject = ['$rootScope', '$http'];

    function newHiresService($rootScope, $http) {

        var newHiresListURL = $rootScope.APIURL + 'newhirelist';
        var viewNewHireURL = $rootScope.APIURL + 'newhireview';  // /14583
        var addNewHireURL = $rootScope.APIURL + 'addnewhire';
        var editNewHireURL = $rootScope.APIURL + 'editnewhire';
        var deleteNewHireURL = $rootScope.APIURL + 'deletenewhire'; // /14583
        var getCategoryListURL = $rootScope.APIURL + 'categorylist';
        var getSourceProfileURL = $rootScope.APIURL + 'sourceprofileslist';
        var getNewHiresStatusURL = $rootScope.APIURL + 'newhirestatus';
        var getClientslistUrl = $rootScope.APIURL + 'clientslist';
        var getStatesListUrl = $rootScope.APIURL + 'stateslist';
        var validateNewHireEmailUrl = $rootScope.APIURL + 'validnewhireemailid';
        var getJobHireCategoryUrl = $rootScope.APIURL + 'jobcategory';
        var getNewHiresExcelReportUrl = $rootScope.APIURL + 'newhirexlssheet';
        var getReasonsForRejectionsUrl = $rootScope.APIURL + 'stoponboardingreasons';
        var stopOnboardingUrl = $rootScope.APIURL + 'stoponboardingnewhire';
        var deleteNewHireDocumentUrl = $rootScope.APIURL + 'deletenewhireattachment';
        var saveNewHireJsonUrl = $rootScope.APIURL + 'savenewhire';
        var editNewHireJsonURL = $rootScope.APIURL + 'updatenewhire';
        var getNewHireJsonURL = $rootScope.APIURL + 'getNewHireView';
        
        // For Temporary change in status
        var updateNewHireStatusUpdateUrl = $rootScope.APIURL + 'newhirestatusupdate/' + 20840 + '/10';


        var objNewHiresService = {};
        objNewHiresService.getClientsList = getClientsList;
        objNewHiresService.getNewHiresList = getNewHiresList;
        objNewHiresService.viewNewHire = viewNewHire;
        objNewHiresService.addNewHire = addNewHire;
        objNewHiresService.editNewHire = editNewHire;
        objNewHiresService.deleteNewHire = deleteNewHire;
        objNewHiresService.getCategoryList = getCategoryList;
        objNewHiresService.getSourceProfile = getSourceProfile;
        objNewHiresService.getNewHiresStatus = getNewHiresStatus;
        objNewHiresService.getStatesList = getStatesList;
        objNewHiresService.validateNewHireEmail = validateNewHireEmail;
        objNewHiresService.getJobHireCategory = getJobHireCategory;
        objNewHiresService.getNewHiresExcelReport = getNewHiresExcelReport;
        objNewHiresService.getReasonsForRejections = getReasonsForRejections;
        objNewHiresService.stopOnboarding = stopOnboarding;
        objNewHiresService.deleteNewHireDocument = deleteNewHireDocument;
        objNewHiresService.saveNewHireJson = saveNewHireJson;
        objNewHiresService.editNewHireJson = editNewHireJson;
        objNewHiresService.getNewHireJson = getNewHireJson;

        // For Temporary change in status
        objNewHiresService.getCities = getCities;

        return objNewHiresService;

        function getClientsList() {
            return $http.get(getClientslistUrl);
        }

        function getCities(id) {
            return $http.get($rootScope.APIURL + 'citieslist');
        }
        function getStatesList() {
            return $http.get(getStatesListUrl);
        }

        function getNewHiresList(isMainApi) {
            return $http.get(newHiresListURL + '/' + isMainApi);
        }
        function viewNewHire(hireid) {
            return $http.get(viewNewHireURL + '/' + hireid.toString());
        }
        function getNewHireJson(hireid) {
            return $http.get(getNewHireJsonURL + '/' + hireid.toString());
        }
        function saveNewHireJson(objNewHire) {
            return $http({
                url: saveNewHireJsonUrl,
                method: 'POST',
                data: objNewHire,
                //assign content-type as undefined, the browser
                //will assign the correct boundary for us
                headers: { 'Content-Type': undefined },
                //prevents serializing payload.  don't do it.
                transformRequest: angular.identity
                //prevents serializing payload.  don't do it.
            });
        }
        function editNewHireJson(objNewHire) {
            return $http({
                url: editNewHireJsonURL,
                method: 'POST',
                data: objNewHire,
                //assign content-type as undefined, the browser
                //will assign the correct boundary for us
                headers: { 'Content-Type': undefined },
                //prevents serializing payload.  don't do it.
                transformRequest: angular.identity
            });
        }
        function addNewHire(objNewHire) {
            return $http({
                url: addNewHireURL,
                method: 'POST',
                data: objNewHire,
                //assign content-type as undefined, the browser
                //will assign the correct boundary for us
                headers: { 'Content-Type': undefined },
                //prevents serializing payload.  don't do it.
                transformRequest: angular.identity
            });
        }
        function editNewHire(objNewHire) {
            return $http({
                url: editNewHireURL,
                method: 'POST',
                data: objNewHire,
                //assign content-type as undefined, the browser
                //will assign the correct boundary for us
                headers: { 'Content-Type': undefined },
                //prevents serializing payload.  don't do it.
                transformRequest: angular.identity
            });
        }
        function deleteNewHire(newhireid) {
            return $http.delete(deleteNewHireURL + '/' + newhireid.toString());
        }
        function getCategoryList() {
            return $http.get(getCategoryListURL);
        }
        function getSourceProfile() {
            return $http.get(getSourceProfileURL);
        }
        function getNewHiresStatus() {
            return $http.get(getNewHiresStatusURL);
        }
        function validateNewHireEmail(objEmailId) {
            return $http.post(validateNewHireEmailUrl, objEmailId);
        }

        function updateNewHireStatus() {
            return $http.get(updateNewHireStatusUpdateUrl);
        }

        function getJobHireCategory() {
            return $http.get(getJobHireCategoryUrl);
        }

        function getNewHiresExcelReport(newHireId) {
            return $http.get(getNewHiresExcelReportUrl + '/' + newHireId.toString());
        }
        function getReasonsForRejections() {
            return $http.get(getReasonsForRejectionsUrl);
        }
        function stopOnboarding(objStopOnboard) {
            return $http({
                url: stopOnboardingUrl,
                method: 'POST',
                data: objStopOnboard,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            });
        }

        function deleteNewHireDocument(newhireDocId) {
            return $http.delete(deleteNewHireDocumentUrl + '/' + newhireDocId.toString());
        }



    }
})();
