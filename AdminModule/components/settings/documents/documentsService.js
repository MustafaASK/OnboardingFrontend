(function () {
    'use strict';
    hrAdminApp.factory('DocLibraryService', docLibraryService);
    docLibraryService.$inject = ['$rootScope', '$http'];

    function docLibraryService($rootScope, $http) {

        // http://111.93.6.103:999/OnBoarding/viewDocumentLibraryList
        // http://111.93.6.103:999/OnBoarding/documentLibrary    add a document
        // http://111.93.6.103:999/OnBoarding/deleteDocumentLibrary/26
        // http://111.93.6.103:999/OnBoarding/viewDocumentLibrary/26
        // http://111.93.6.103:999/OnBoarding/editDocumentLibrary
        // http://192.168.1.198:8080/OnBoarding/viewFolderNameWorkflow/6453

        var docLibraryList = $rootScope.APIURL + 'viewDocumentLibraryList';
        var commondynamicwebformviewurl = $rootScope.APIURL + 'commondynamicwebformview';
        var getJsonDocumentLibraryUrl = $rootScope.APIURL + 'viewJsonDocumentLibrary';
        var updateJsonDocumentLibraryUrl = $rootScope.APIURL + 'editJsonDocumentLibrary';
        var commondynamicwebformurl = $rootScope.APIURL + 'commondynamicwebform';
        var addDocLib =  $rootScope.APIURL + 'documentLibrary';
        var editDocLib = $rootScope.APIURL + 'editDocumentLibrary';
        var viewDoc = $rootScope.APIURL + 'viewDocumentLibrary';
        var delDoc = $rootScope.APIURL + 'deleteDocumentLibrary';
        var mappingDocDetails = $rootScope.APIURL + 'pdfreading';
        var commonFieldsUrl = $rootScope.APIURL + 'commonfields';
        var jsonCommonFieldsUrl = $rootScope.APIURL + 'webformcommonfields';
        var mappingSubmitUrl = $rootScope.APIURL + 'mappingFields';
        // http://111.93.6.103:999/OnBoarding/loadPdfFile/3086        
        var loadPdfUrl = $rootScope.APIURL + 'loadPdfFile';
        var docMappingDetailsUrl = $rootScope.APIURL + 'viewdocmapping';
        // http://192.168.1.198:8080/OnBoarding/updatemappingFields
        var updateDocMappingUrl = $rootScope.APIURL + 'updatemappingFields';
        // Issue 245 - Settings Master and Rules Master
        var settingsmasterUrl = $rootScope.APIURL + 'settingsmaster';
        var rulesmasterUrl = $rootScope.APIURL + 'rulesmaster';
        var folderAndWfDetailsUrl =$rootScope.APIURL + 'viewFolderNameWorkflow';

        var docList = [];
        var objDocsService = {};
        objDocsService.commonDetailsList = [];
        objDocsService.getDocLibraryList = getDocLibraryList;
        objDocsService.getJsonDocumentLibrary = getJsonDocumentLibrary;
        objDocsService.commondynamicwebformview = commondynamicwebformview;
        objDocsService.commondynamicwebform = commondynamicwebform;
        objDocsService.updateJsonDocumentLibrary = updateJsonDocumentLibrary;
        objDocsService.getDocData = getDocData;
        objDocsService.addDocLibrary = addDocLibrary;
        objDocsService.editDocLibrary = editDocLibrary;
        objDocsService.delDocument = delDocument;
        objDocsService.getMappingDetails = getMappingDetails;
        objDocsService.getCommonFields = getCommonFields;
        objDocsService.getJsonCommonFields = getJsonCommonFields;
        objDocsService.postMappingDetails = postMappingDetails;
        objDocsService.getPdfData = getPdfData;
        objDocsService.getDocMappingDetails = getDocMappingDetails;
        objDocsService.getSettingsMaster = getSettingsMaster;
        objDocsService.getRulesMaster = getRulesMaster;
        objDocsService.getFolderAndWfDetails = getFolderAndWfDetails;

        objDocsService.getDocList = function () {
            return docList;
        }

        objDocsService.setDocList = function (value) {
            docList = value;
        }

        return objDocsService;

        function getDocLibraryList() {
            return $http.get(docLibraryList);
        }  
        
        function getJsonDocumentLibrary(id) {
            return $http.get(getJsonDocumentLibraryUrl+'/'+id);
        }

        function commondynamicwebformview() {
            return $http.get(commondynamicwebformviewurl);
        }
        
        function updateJsonDocumentLibrary(objDoc,id){
            var url = updateJsonDocumentLibraryUrl + '/' + id;
            return $http.post(url, objDoc);
        }

        function commondynamicwebform(objDoc){
            return $http.post(commondynamicwebformurl, objDoc);
        }

        function getDocData(docId) {
            return $http.get(viewDoc + "/" + docId.toString());
        }

        function getPdfData(docId) {
            return $http.get(loadPdfUrl + "/" + docId.toString());
        }

        function addDocLibrary(objDoc){
            return $http({
                method: 'POST',
                url: addDocLib,
                data: objDoc,
                headers: {'Content-type': undefined},
                transformRequest: angular.identity
            });
        }

        function editDocLibrary(objDoc){
            return $http.post(editDocLib, objDoc);
        }

        function delDocument(docId) {
            return $http({
                method: 'DELETE',
                url: delDoc + "/" + docId.toString(),
                data: null,
                headers: {'Content-type': 'application/json'}
            });
        }

        function getCommonFields() {
            return $http.get(commonFieldsUrl);
        }

        function getJsonCommonFields(parentType) {
            return $http.get(jsonCommonFieldsUrl+'/'+parentType);
        }

        function getMappingDetails(docId) {
            return $http.get(mappingDocDetails + "/" + docId.toString());
        }

        function getDocMappingDetails(docId) {
            return $http.get(docMappingDetailsUrl + "/" + docId.toString());
        }

        function postMappingDetails(objMapping, update) {
            if (!update)
                return $http.post(mappingSubmitUrl, objMapping);
            else
                return $http.post(updateDocMappingUrl, objMapping);
        }

        function getSettingsMaster() {
            return $http.get(settingsmasterUrl);
        }

        function getRulesMaster() {
            return $http.get(rulesmasterUrl);
        }

        function getFolderAndWfDetails(docId) {
            return $http.get(folderAndWfDetailsUrl + "/" + docId.toString());
        }
    }
})();
