(function () {
    'use strict';
    hrAdminApp.factory('FoldersService', foldersService);
    foldersService.$inject = ['$rootScope', '$http'];

    function foldersService($rootScope, $http) {

        var foldersListUrl = $rootScope.APIURL + 'viewFoldersList';
        var addFolderLibUrl = $rootScope.APIURL + 'addFolderLibrary';
        var editFolderLibUrl = $rootScope.APIURL + 'editFolderLibrary';
        var viewFolderUrl = $rootScope.APIURL + 'viewFolder';
        var delFolderUrl = $rootScope.APIURL + 'deletefolder';
        // CHANDRA (30/1/2018) - changed from viewDocumentLibraryList
        var allDocsLibraryList = $rootScope.APIURL + 'getdocumentmappinglist';
        // CHANDRA (8/2/2018) - changed back to viewDocumentLibraryList
        var docLibraryListUrl = $rootScope.APIURL + 'viewDocumentsNotInFoldersList';
        // http://111.93.6.103:999/OnBoarding/viewDocumentsNotInFoldersList

        // sharing the documents between controllers
        var docList = [];
        var objFoldersService = {};
        objFoldersService.getFoldersList = getFoldersList;
        objFoldersService.getDocLibraryList = getDocLibraryList;
        objFoldersService.getDocsNotInFolderList = getDocsNotInFolderList;
        objFoldersService.addFolderLibrary = addFolderLibrary;
        objFoldersService.editFolderLibrary = editFolderLibrary;
        objFoldersService.deleteFolder = deleteFolder;
        objFoldersService.viewFolderData = viewFolderData;

        objFoldersService.getDocList = function () {
            return docList;
        }

        objFoldersService.setDocList = function (value) {
            docList = value;
        }
        
        return objFoldersService;
        
        function getFoldersList(isMainApi) {
            return $http.get(foldersListUrl + '/' +isMainApi);
        }

        function getDocLibraryList() {
            return $http.get(allDocsLibraryList);
        }

        function getDocsNotInFolderList(folderid) {
            return $http.get(docLibraryListUrl + "/" + folderid.toString());
        }

        function addFolderLibrary(objFolder){
            return $http.post(addFolderLibUrl, objFolder);
        }

        function editFolderLibrary(objFolder){
            return $http.post(editFolderLibUrl, objFolder);
        }

        function viewFolderData(folderid) {
            return $http.get(viewFolderUrl + "/" + folderid.toString());
        }

        function deleteFolder(folderid) {
            return $http({
                method: 'DELETE',
                url: delFolderUrl + "/" + folderid,
                data: null,
                headers: {'Content-type': 'application/json'}
            });
        }

    }
})();
