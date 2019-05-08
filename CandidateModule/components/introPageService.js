(function () {
    'use strict';
    candidateApp.factory('IntroPageService', introPageService);
    introPageService.$inject = ['$rootScope', '$http'];

    function introPageService($rootScope, $http) {

        var clientsIntroListUrl = $rootScope.APIURL + 'clientIntrolist';
        var addIntroListUrl = $rootScope.APIURL + 'addclientintro';
        var getClientIntroList = $rootScope.APIURL+ 'clientIntroList';
        var editIntroListUrl = $rootScope.APIURL + 'editClientIntro';
        var deleteIntroListUrl = $rootScope.APIURL + 'deleteClientIntro';
        var clientListForIntroPage = $rootScope.APIURL + 'clientslistforintro';
        
        //$rootScope.Token = 'king@ask.com:1510817277789:683452be5e32c6f20c6b0073853732c3'

        var objIntroPageService = {};
        objIntroPageService.getClientsIntroList = getClientsIntroList;
        objIntroPageService.addClientIntroPage = addClientIntroPage;
        objIntroPageService.editClientIntroPage = editClientIntroPage;
        objIntroPageService.getClientIntroPage = getClientIntroPage;
        objIntroPageService.getClientsListForIntroPage = getClientsListForIntroPage;
        objIntroPageService.deleteClientIntroPage = deleteClientIntroPage;
        
        
        return objIntroPageService;
        
        function getClientsIntroList() {
            return $http.get(clientsIntroListUrl);
        }
        
        function addClientIntroPage(obj) {
            //return $http.post(addIntroListUrl,obj);
            return $http({
                url: addIntroListUrl,
                method: 'POST',
                data: obj,
                //assign content-type as undefined, the browser
                //will assign the correct boundary for us
                headers: { 'Content-Type': undefined },
                //prevents serializing payload.  don't do it.
                transformRequest: angular.identity
            });
        }

        function getClientsListForIntroPage(){
            return $http.get(clientListForIntroPage);
        }

        function deleteClientIntroPage(introid){
            return $http({
                method: 'DELETE',
                url: deleteIntroListUrl + "/" + introid,
                data: null,
                headers: { 'Content-type': 'application/json' }
            });
        }

        function getClientIntroPage(clientid){
            return $http.get(getClientIntroList + "/" + clientid);
        }

        function editClientIntroPage(obj){
            return $http({
                url: editIntroListUrl,
                method: 'POST',
                data: obj,
                //assign content-type as undefined, the browser
                //will assign the correct boundary for us
                headers: { 'Content-Type': undefined },
                //prevents serializing payload.  don't do it.
                transformRequest: angular.identity
            });
        }

        

    }
})();
