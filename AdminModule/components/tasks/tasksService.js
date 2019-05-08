(function () {
    'use strict';
    hrAdminApp.factory('TasksService', tasksService);
    tasksService.$inject = ['$rootScope', '$http'];

    function tasksService($rootScope, $http) {

        var viewTaskUrl = $rootScope.APIURL + 'viewtasks';
        var listTasksUrl = $rootScope.APIURL + 'taskslist';
        var addTasksUrl = $rootScope.APIURL + 'addtasks';
        var editTasksUrl = $rootScope.APIURL + 'edittasks';
        var taskStatusUrl = $rootScope.APIURL + 'tasksstatus';
        var taskDeleteUrl = $rootScope.APIURL + 'tasksdelete';
        var hrUserslistUrl = $rootScope.APIURL + 'list';
        // events for the calendar
        var eventsUrl = $rootScope.APIURL + 'events';

        var objTasksService = {};
        objTasksService.getTaskList = getTaskList;
        objTasksService.addTask = addNewTask;
        objTasksService.editTask = editTask;
        objTasksService.getTaskData = getTaskData;
        objTasksService.getHrUserList = getHrUserList;
        objTasksService.getTaskStatusList = getTaskStatusList;
        objTasksService.deleteTask = deleteTask;
        objTasksService.getEvents = getEvents;
        return objTasksService;

        function getTaskList(isMainApi) {
            return $http.get(listTasksUrl + '/' + isMainApi);
        }

        function getTaskData(taskid) {
            return $http.get(viewTaskUrl + "/" + taskid.toString());
        }

        function addNewTask(objNewTask) {
            return $http.post(addTasksUrl, objNewTask);
        }

        function editTask(objTask) {
            return $http.post(editTasksUrl, objTask);
        }

        function getHrUserList(isMainApi) {
            return $http.get(hrUserslistUrl + '/' + isMainApi);
        }

        function getTaskStatusList() {
            return $http.get(taskStatusUrl);
        }

        function deleteTask(taskid) {
            return $http({
                method: 'DELETE',
                url: taskDeleteUrl + "/" + taskid,
                data: null,
                headers: {'Content-type': 'application/json'}
            });
        }

        function getEvents() {
            return $http.get(eventsUrl);
        }

    }
})();
