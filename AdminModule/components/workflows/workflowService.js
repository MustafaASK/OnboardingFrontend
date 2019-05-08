(function () {
    'use strict';
    hrAdminApp.factory('WorkflowService', workflowService);
    workflowService.$inject = ['$rootScope', '$http'];

    function workflowService($rootScope, $http) {

        var searchBy = '';
        var workflowListURL = $rootScope.APIURL + 'workflowlist';
        var addWorkflowURL =  $rootScope.APIURL + 'addworkflowwithdocs';
        var editWorkflowURL = $rootScope.APIURL + 'editworkflowwithdocs';
        var viewWorkflowURL = $rootScope.APIURL + 'getlistbyworkflowid';
        var viewFoldersListURL = $rootScope.APIURL + 'viewWorkFlowFoldersList';
        var delWorkflowURL = $rootScope.APIURL + 'deleteworkflow';
        var delWorkflowStepURL = $rootScope.APIURL + 'deletestep';
        var addWorkflowFoldersListURL = $rootScope.APIURL + 'viewFoldersList';
        var addDynamicWorkflowURL = $rootScope.APIURL + 'adddynamicworkflow';
        var editDynamicWorkflowURL = $rootScope.APIURL + 'editdynamicworkflow';
        var getDynamicWorkflowURL = $rootScope.APIURL + 'getdynamicworkflowid/';

        var objWFService = {};
        objWFService.getWorkflowList = getWorkflowList;
        objWFService.getWorkflowData = getWorkflowData;
        objWFService.getWorkflowFoldersList = getWorkflowFoldersList;
        objWFService.delWorkflow = delWorkflow;
        objWFService.addWorkflow = addWorkflow;
        objWFService.editWorkflow = editWorkflow;
        objWFService.delWorkflowStep = delWorkflowStep;
        objWFService.getNewWorkflowFoldersList = getNewWorkflowFoldersList;
        objWFService.addDynamicWorkflow = addDynamicWorkflow;
        objWFService.editDynamicWorkflow = editDynamicWorkflow;
        objWFService.getDynamicWorkflow = getDynamicWorkflow;

        objWFService.getSearchBy = function () {
            return searchBy;
        }

        objWFService.setSearchBy = function (value) {
            searchBy = value;
        }        
        return objWFService;

        function getWorkflowList(isMainApi) {
            return $http.get(workflowListURL + '/' + isMainApi);
        }

        function getWorkflowData(workflowId) {
            return $http.get(viewWorkflowURL + "/" + workflowId.toString());
        }

        // used during editing a workflow
        function getWorkflowFoldersList(workflowId) {
            return $http.get(viewFoldersListURL + "/" + workflowId.toString());
        }

        // used during adding a new workfflow
        function getNewWorkflowFoldersList(isMainApi) {
            return $http.get(addWorkflowFoldersListURL + '/' + isMainApi);
        }

        function addWorkflow(objWF){
            return $http({
                method: 'POST',
                url: addWorkflowURL,
                data: objWF
            });
        }

        function editWorkflow(objWF){
            return $http.post(editWorkflowURL, objWF);
        }

        function delWorkflow(workflowId) {
            return $http.delete(delWorkflowURL + '/' + workflowId.toString());
        }

        function delWorkflowStep(stepId) {
            return $http.delete(delWorkflowStepURL + '/' + stepId.toString());
        }

        function addDynamicWorkflow(objWF){
            return $http({
                method: 'POST',
                url: addDynamicWorkflowURL,
                data: objWF
            });
        }

        function editDynamicWorkflow(objWF){
            return $http.post(editDynamicWorkflowURL, objWF);
        }

        function getDynamicWorkflow(workflowId) {
            return $http.get(getDynamicWorkflowURL + "/" + workflowId.toString());
        }
    }
})();
