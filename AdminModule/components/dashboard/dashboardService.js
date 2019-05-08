(function () {
    'use strict';
    hrAdminApp.factory('DashboardService', dashboardService);
    dashboardService.$inject = ['$rootScope', '$http'];

    function dashboardService($rootScope, $http) {

        // var listTasksUrl = $rootScope.APIURL + 'taskslist';
        // CHANDRA - Mar 9 - Updated listTasksUrl to viewdashboardtasks
        // Display only top 5 upcoming tasks
        var listTasksUrl = $rootScope.APIURL + 'viewdashboardtasks';
        var newHiresListURL = $rootScope.APIURL + 'dashboardnewhirelist';
        var onboadingsURL = $rootScope.APIURL + 'dashboard';
        var clientslistUrl = $rootScope.APIURL + 'clientslist';
        var recentActivitiesUrl = $rootScope.APIURL + 'auditlog';
        // var upcomingEventsUrl = $rootScope.APIURL + 'events';
        var upcomingEventsUrl = $rootScope.APIURL + 'gettop5events';
        var usersListUrl = $rootScope.APIURL + 'list';
        var sendEmailNewHireUrl = $rootScope.APIURL + 'sendemailnewhire';
        var newHireStatusListUrl = $rootScope.APIURL + 'newhirestatus';
        var newHireMasterFieldsUrl = $rootScope.APIURL + 'masternewhirefields';
        var saveNewHireDashboardConfigUrl = $rootScope.APIURL + 'savedashboardcontrols';
        var getNewHireDashboardConfigUrl = $rootScope.APIURL + 'viewdashboardcontrols';
        
        // http://localhost:9090/OnBoarding/sendemailnewhire
        // http://192.168.1.198:8080/OnBoarding/dashboardnewhirelist
        // http://192.168.1.198:8080/OnBoardingNew/masternewhirefields

        var objDashboardService = {};
        objDashboardService.getTaskList = getTaskList;
        objDashboardService.getNewHiresList = getNewHiresList;
        objDashboardService.getOnboardings = getOnboardings;
        objDashboardService.getClientList = getClientList;
        objDashboardService.getRecentActivities = getRecentActivities;
        objDashboardService.getUpcomingEvents = getUpcomingEvents;
        objDashboardService.getHrUsersList = getHrUsersList;
        objDashboardService.sendEmailToNewHire = sendEmailToNewHire;
        objDashboardService.getNewHireStatusList = getNewHireStatusList;
        objDashboardService.getNewHireMasterFields = getNewHireMasterFields;
        objDashboardService.getNewHireDashboardConfig = getNewHireDashboardConfig;
        objDashboardService.saveNewHireDashboardConfig = saveNewHireDashboardConfig;
        return objDashboardService;

        function getClientList() {
            return $http.get(clientslistUrl);
        }

        function getOnboardings() {
            return $http.get(onboadingsURL);
        }

        function getTaskList() {
            return $http.get(listTasksUrl);
        }

        function getNewHiresList() {
            return $http.get(newHiresListURL);
        }

        function getNewHireStatusList() {
            return $http.get(newHireStatusListUrl);
        }

        function getRecentActivities(timezone) {
            return $http.get(recentActivitiesUrl + '/' + timezone);
        }

        function getHrUsersList(isMainApi) {
            return $http.get(usersListUrl + '/' + isMainApi);
        }

        function getUpcomingEvents() {
            return $http.get(upcomingEventsUrl);
        }

        function sendEmailToNewHire(objEmail) {
            return $http.post(sendEmailNewHireUrl, objEmail );
        }    
        
        function getNewHireMasterFields(){
            return $http.get(newHireMasterFieldsUrl);
        }

        function saveNewHireDashboardConfig(objEmail) {
            return $http.post(saveNewHireDashboardConfigUrl, objEmail );
        } 

        function getNewHireDashboardConfig(){
            return $http.get(getNewHireDashboardConfigUrl);
        }

       
    }
})();

