(function () {
    'use strict';
    hrAdminApp.factory('EmailService', EmailService);
    EmailService.$inject = ['$rootScope', '$http'];
    function EmailService($rootScope, $http) {
     
        var objEmailService = {};
        objEmailService.getEmailLogList = getEmailLogList;
        objEmailService.doSubmit = doSubmit;


   
        return objEmailService;

        function getEmailLogList(userid, newhireid) {
            return $http.get($rootScope.APIURL + 'emailloglist/'+userid+'/'+newhireid);
        }


     



        function doSubmit(mailDetails) {
            return $http({
                method: 'POST',
                url: $rootScope.APIURL + 'sendemailnewhire',
                data: JSON.stringify(mailDetails),
                headers: {'Content-type': 'application/json'},
                transformRequest: angular.identity
            });
        }


















    }
})();