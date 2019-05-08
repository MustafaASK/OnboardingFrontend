(function () {
    'use strict';
    hrAdminApp.factory('activitiesService', activitiesService);
    activitiesService.$inject = ['$rootScope', '$http'];
    function activitiesService($rootScope, $http) {
        var objactivitiesService = {};
        objactivitiesService.getActivityLogList = getActivityLogList;


        return objactivitiesService;

        function getActivityLogList(newHireId, timezone) {
            return $http.get($rootScope.APIURL + 'activitylog' + '/' + newHireId + '/' +timezone, {
                headers: {"ask-auth-token": localStorage.getItem('ask-auth-token')}
          });
        }
    }
})();