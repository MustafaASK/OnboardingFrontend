(function () {
    'use strict';
    hrAdminApp.factory('ScheduleService', ScheduleService);
    ScheduleService.$inject = ['$rootScope', '$http'];
    function ScheduleService($rootScope, $http) {
        var objScheduleService = {};
        objScheduleService.doSubmit = doSubmit;

        return objScheduleService;


        function doSubmit(mailDetails) {
            return $http({
                method: 'POST',
                url: $rootScope.APIURL + 'scheduler',
                data: JSON.stringify(mailDetails),
                headers: {
                    'ask-auth-token': localStorage.getItem('ask-auth-token'),
                'Content-type': 'application/json'
                },
                transformRequest: angular.identity
            });
        }



    }
})();