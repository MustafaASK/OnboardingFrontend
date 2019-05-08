(function () {
    'use strict';
    hrAdminApp.controller('MyTasksController', myTasksController);
    myTasksController.$inject = ['$rootScope', '$scope', '$state', '$filter', '$timeout', '$stateParams', '$mdDialog', 'ToastrService', 'TasksService'];
    function myTasksController($rootScope, $scope, $state, $filter, $timeout, $stateParams, $mdDialog, ToastrService, TasksService) {

        var vm = this;
        vm.setSelected = setSelected;
        // vm.idSelectedTask = 1;
        vm.assignedTo = 1;
        vm.newTaskEnabled = false;
        vm.editTaskEnabled = false;
        vm.newTask = {};
        vm.mytasks = [];
        vm.filter = '';
        $scope.currentDate = new Date();
        vm.getTasks = getTasks;
        vm.rolesData = {};
        vm.checkAddFlag = false;
        $scope.submitted = false;

        if (!$rootScope.UserInfo.isAdmin) {
            var roles = $rootScope.UserInfo.roles;
            if (roles.length) {
                var rolesData = $filter('filter')(roles, { role: "Tasks" });
                if (rolesData.length) {
                    vm.rolesData = rolesData[0];
                }


            }
        }

        if ($rootScope.UserInfo.isAdmin || vm.rolesData.viewflag) {
            vm.checkAddFlag = true
        }


        // $scope.itemType = itemType;
        $scope.temp = [];
        for (var i = 0; i < 10; i++) {
            $scope.temp.push({ 'taskid': 0, 'taskname': '', 'taskstatus': 0 });
        }

        if ($stateParams.id) {
            vm.idSelectedTask = $stateParams.id;
            vm.setSelected(vm.idSelectedTask);
        }

        $scope.getClassByStatus = function (task) {
            if (task.taskstatus == 4) return 'pending';
            if (task.taskstatus == 3) return 'completed';
            if (task.taskstatus == 1) return 'initiated';
        }

        vm.get_taskstatus = function (statusid) {
            if (vm.taskStatusList && vm.taskStatusList.length > 0) {
                for (var i = 0; i < vm.taskStatusList.length; i++) {
                    if (vm.taskStatusList[i].taskStatusId == statusid) {
                        return vm.taskStatusList[i].taskstatus;
                    }
                }
            }
        }

        vm.get_taskstatusid = function (status) {
            if (vm.taskStatusList && vm.taskStatusList.length > 0) {
                for (var i = 0; i < vm.taskStatusList.length; i++) {
                    if (vm.taskStatusList[i].taskstatus == status) {
                        return vm.taskStatusList[i].taskStatusId;
                    }
                }
            }
        }
        // getTasksStatusList function is often taking long time
        // to retrieve the status list and is getting timedout!
        vm.taskStatusList = [
            {
                'taskStatusId': 1,
                'taskstatus': 'Open'
            },
            {
                'taskStatusId': 3,
                'taskstatus': 'Close'
            },
            {
                'taskStatusId': 4,
                'taskstatus': 'In Progress'
            },
        ];

        function getTasksStatusList() {
            TasksService.getTaskStatusList().then(
                function (response) {
                    vm.taskStatusList = response.data;
                    // console.log(vm.taskStatusList);
                    vm.filters = [];
                    for (var i = 0; i < vm.taskStatusList.length; i++) {
                        vm.filters[i] = {
                            'key': vm.taskStatusList[i].taskstatus,
                            'value': vm.taskStatusList[i].taskstatus
                        }
                    }
                    vm.filters.unshift({ 'key': '', 'value': 'All Tasks' });
                    // console.log(vm.taskStatusList);
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG228);
                }
            )
        }
        getTasksStatusList();

        function getTaskStatusText(statusid) {
            for (var i = 0; i < vm.taskStatusList.length; i++) {
                if (vm.taskStatusList[i].taskStatusId == statusid) {
                    return vm.taskStatusList[i].taskstatus;
                }
            }
        }

        function getTasks() {
            TasksService.getTaskList(true).then(
                function (response) {
                    vm.mytasks = response.data;
                    // console.log(vm.mytasks);
                    if (vm.mytasks.length == 0) return;

                    add_task_status();
                    if (!$stateParams.id) {
                        vm.taskSelected = vm.mytasks[0];
                        $scope.taskStatus = (vm.taskSelected.taskstatus == 3 ? true : false);
                        $scope.taskName = vm.taskSelected.taskname;
                        // Update other fields
                        $scope.assignedTo = vm.taskSelected.assignedto;
                        vm.myDate = vm.taskSelected.completiondate.substring(0, 10);
                        vm.myDate = vm.myDate.replace(/-/g, '/');
                        $scope.desc = vm.taskSelected.description;
                        setSelected(vm.taskSelected.taskid);
                    }
                    // $state.go('ViewTask', {id: vm.taskSelected.taskid});
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG154);
                }
            )

        }
        getTasks();

        function add_task_status() {
            for (var i = 0; i < vm.mytasks.length; i++) {
                vm.mytasks[i].status = vm.get_taskstatus(vm.mytasks[i].taskstatus);
            }
        }

        function getHrUserList() {
            TasksService.getHrUserList(false).then(
                function (response) {
                    vm.hrUsersList = response.data.users;
                    // console.log(vm.hrUsersList);
                    if (vm.hrUsersList.length > 0) {
                        vm.userNameList = get_userNamesAsList();
                    } else {
                        vm.userNameList = [];
                    }
                    // console.log(vm.userNameList);
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG229);
                }
            )
        }
        getHrUserList();

        $scope.get_createdName = function (taskid) {
            if (vm.mytasks.length == 0) return;
            for (var i = 0; i < vm.mytasks.length; i++) {
                if (vm.mytasks[i].taskid == taskid) {
                    return vm.mytasks[i].createdname;
                }
            }
        }

        $scope.get_userName = function (userid) {
            if (!vm.userNameList) return;
            for (var i = 0; i < vm.userNameList.length; i++) {
                if (vm.userNameList[i].id == userid) {
                    return vm.userNameList[i].name;
                }
            }
        }

        function get_userNamesAsList() {
            var usersNameList = [];
            for (var i = 0; i < vm.hrUsersList.length; i++) {
                usersNameList.push({
                    'id': vm.hrUsersList[i].userId,
                    'name': vm.hrUsersList[i].firstname + ' ' + vm.hrUsersList[i].lastname,
                    'emailid': vm.hrUsersList[i].emailId
                });
            }
            // console.log(usersNameList);
            return usersNameList;
        }

        $scope.dateTruncate = function (dateStr) {
            if (!dateStr) return;
            var createdTime = '';
            // var dateString = dateStr.split('-').join('/');
            var dateObj = new Date(dateStr);
            var momentObj = moment(dateObj);
            createdTime = momentObj.format("lll");
            return createdTime;
        }

        $scope.task_name_short = function (name) {
            // 21/Mar - reduced from 40 to 30 chars because when cap letters are used
            // and width of the char is greater 40 chars would not fit 
            if (name && name.length > 27) {
                name = name.substr(0, 25) + "...";
            }
            return name;
        }

        $scope.shortenTaskName_IE_FF = function (name) {
            if ((vm.browserUsed == 'IE' || vm.browserUsed == 'Firefox') && name.length > 45 && name.indexOf(' ') === -1) {
                if (screen.width == 1024) {
                    return name.substr(0, 13) + "...";
                }
                // check if the name has no spaces and is of length > 47
                return name.substr(0, 43) + "...";
            } else {
                return name;
            }
        }

        function sendNewTask() {
            var objTask = {};
            objTask.taskName = vm.newTask.name;
            objTask.taskDesc = vm.newTask.desc;
            objTask.userId = { 'userId': vm.newTask.assignedTo };
            // 7-Mar - completion date is already in Date format
            var completionDate = new Date(vm.newTask.compDate);
            // var completionDate = vm.newTask.compDate;
            var compYear = completionDate.getFullYear();
            var compMonth = completionDate.getMonth() + 1; // plus 1 because Jan is 0
            if (compMonth < 10) compMonth = '0' + compMonth.toString();
            var compDate = completionDate.getDate();
            if (compDate < 10) compDate = '0' + compDate.toString();
            objTask.completionDate = compYear + '-' + compMonth + '-' + compDate;

            $scope.loading = true;
            TasksService.addTask(objTask).then(
                function (response) {
                    $scope.loading = false;
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                    if (!response.data.Error) {
                        ToastrService.success(response.data.message);
                        $state.go('MyTasks', {}, { reload: 'MyTasks' });
                    }
                },
                function (err) {
                    $scope.loading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG230);
                }
            )
        }

        function checkUserExist() {
            var filteredList = $filter('filter')(vm.userNameList, { id: vm.editTaskInfo.assignedTo });
            if (filteredList && filteredList.length) {
                return true;
            }
            return false;

        }

        $scope.editTask = function (editTaskValid) {
            $scope.submitted = true;
            var objTask = {};
            objTask.taskId = vm.idSelectedTask;
            if (!editTaskValid) {
                ToastrService.error('Please fill all the mandatory fields.');
                return;
            }
            if (vm.editTaskInfo.taskName) vm.editTaskInfo.taskName = vm.editTaskInfo.taskName.trim();
            if (!vm.editTaskInfo.taskName) {
                ToastrService.error($rootScope.errorMsgs.MSG026);
                return;
            }

            if (vm.editTaskInfo.desc) vm.editTaskInfo.desc = vm.editTaskInfo.desc.trim();
            if (!vm.editTaskInfo.desc) {
                ToastrService.error($rootScope.errorMsgs.MSG024);
                return;
            }


            if ($rootScope.UserInfo && $rootScope.UserInfo.isAdmin == true) {
                if (!checkUserExist()) {
                    //vm.editTaskInfo.assignedTo = '';
                    ToastrService.error($rootScope.errorMsgs.MSG231);
                    return;

                }
            }

            if (!$rootScope.UserInfo.isAdmin) {
                vm.editTaskInfo.assignedTo = $rootScope.UserInfo.ID
            }

            objTask.taskName = vm.editTaskInfo.taskName;
            objTask.taskDesc = vm.editTaskInfo.desc;
            objTask.userId = { 'userId': vm.editTaskInfo.assignedTo };
            objTask.taskStatus = vm.taskSelected.taskstatus;
            objTask.isactive = 1;

            var completionDate = new Date(vm.myDate);
            var compYear = completionDate.getFullYear();
            var compMonth = completionDate.getMonth() + 1;
            if (compMonth < 10) compMonth = '0' + compMonth.toString();
            var compDate = completionDate.getDate();
            if (compDate < 10) compDate = '0' + compDate.toString();
            objTask.completionDate = compYear + '-' + compMonth + '-' + compDate;
            // console.log(objTask);

            $scope.loading = true;
            TasksService.editTask(objTask).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                    if (!response.data.Error) {
                        ToastrService.success(response.data.message);
                        vm.editTaskEnabled = false;
                        getTasks();
                        // update the task name in the table as well
                        // var temp = document.getElementById('task-' + vm.idSelectedTask);
                        // temp.textContent = $scope.taskName;
                        // // update task status as well
                        // var tempSBox = document.getElementById('sBox-' + vm.idSelectedTask);
                        // tempSBox.classList = [];
                        // tempSBox.classList.add('taskStatusBox');
                        // tempSBox.classList.add($scope.getClassByStatus(vm.taskSelected));
                        // tempSBox.textContent = vm.get_taskstatus(vm.taskSelected.taskstatus);
                        // // Hide the edit icon if task status is closed
                        // if (vm.taskSelected.taskstatus == 3) {
                        //     $scope.taskStatus = true;
                        //     $scope.hideEditIcon();
                        // }
                        // setSelected(vm.idSelectedTask);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG232);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }

        function get_TaskData(taskid) {
            for (var i = 0; i < vm.mytasks.length; i++) {
                if (vm.mytasks[i].taskid == taskid) {
                    return vm.mytasks[i];
                }
            }
        }

        $scope.hideEditIcon = function () {
            if (!$rootScope.UserInfo.isAdmin) {
                if (vm.mytasks.length == 0) return true;
                if (vm.editTaskEnabled) return true;
                if ($scope.taskStatus) return true;
                if (!vm.rolesData.edit) {
                    return true;
                }
                if (vm.editTaskInfo.createdby !== $rootScope.UserInfo.ID) {
                    return true;
                }

            }
            else {
                if (vm.mytasks.length == 0) return true;
                if (vm.editTaskEnabled) return true;
                if ($scope.taskStatus) return true;
            }
            return false;
        }

        $scope.editTaskStarted = function () {
            vm.editTaskEnabled = true;
            // make the tasks table clickable again when a new task is cancelled

            $scope.taskData = get_TaskData(vm.idSelectedTask);
            // set focus on the task name field
            var temp = document.getElementById('task-name');
            $timeout(function () {
                temp.focus();
            });
        }

        $scope.cancelEditedTask = function () {
            vm.editTaskEnabled = false;
            // make the tasks table clickable again when a new task is cancelled

            // taskstatus, assignedTo, compdate, desc can change
            $scope.taskStatus = vm.taskSelected.taskstatus;
            $scope.taskName = vm.taskSelected.taskname;
            $scope.desc = vm.taskSelected.description;
            vm.myDate = vm.taskSelected.completiondate;
            $scope.assignedTo = vm.taskSelected.assignedto;
            $scope.taskStatus = (vm.taskSelected.taskstatus == 3 ? true : false);


            vm.editTaskInfo.taskName = vm.taskSelected.taskname;
            vm.editTaskInfo.assignedTo = vm.taskSelected.assignedto;
            vm.editTaskInfo.desc = vm.taskSelected.description;

            setSelected(vm.idSelectedTask);
            $scope.hideEditIcon();
        }

        function setSelected(idSelectedTask) {
            if ($rootScope.UserInfo.isAdmin || vm.rolesData.viewflag) {

                if (vm.editTaskEnabled || vm.newTaskEnabled) {
                    return false;
                }

                $timeout(function () {
                    vm.setFocusBGClass(idSelectedTask);
                    get_taskData(idSelectedTask);
                }, 300);

            }

        }

        vm.setFocusBGClass = function (idSelectedTask) {
            vm.idSelectedTask = idSelectedTask;
            var task = document.getElementById('task-' + idSelectedTask);
            if (task) task.className = 'tg-yw5lu';
            var taskStatus = document.getElementById('status-' + idSelectedTask);
            if (taskStatus) taskStatus.className = 'tg-yw6lu';
            var taskDel = document.getElementById('del-' + idSelectedTask);
            if (taskDel) taskDel.className = 'tg-yw6lud';
            var row = document.getElementById('row-' + idSelectedTask);
            // change the color of text upon focus
            if (row) {
                var rowText = document.getElementById('tname-' + idSelectedTask);
                $timeout(function () {
                    row.focus();
                    if (rowText) rowText.style.color = '#d75a5a';
                }, 300);
            }
        }

        vm.setBlurBGClass = function (idSelectedTask) {
            var task = document.getElementById('task-' + idSelectedTask);
            if (task) task.className = 'tg-yw5l';
            var taskStatus = document.getElementById('status-' + idSelectedTask);
            if (taskStatus) taskStatus.className = 'tg-yw6l';
            var taskDel = document.getElementById('del-' + idSelectedTask);
            if (taskDel) taskDel.className = 'tg-yw6l';
            var row = document.getElementById('row-' + idSelectedTask);
            if (row) {
                var rowText = document.getElementById('tname-' + idSelectedTask);
                $timeout(function () {
                    row.blur();
                    if (rowText) rowText.style.color = '#444444';
                })
            }
        }

        function get_taskData(taskid) {
            // 23-Mar CHANDRA - Removed loading to avoid flicker when task it edited
            // $scope.loading = true;
            TasksService.getTaskData(taskid).then(
                function (response) {
                    vm.taskSelected = response.data[0];
                    // console.log(vm.taskSelected);
                    // Update checkbox and its text
                    var chk_box = document.getElementById('taskName');
                    // get the task status actual value
                    vm.editTaskInfo = {};
                    $scope.taskStatus = (vm.taskSelected.taskstatus == 3 ? true : false);
                    $scope.taskName = vm.taskSelected.taskname;
                    if (chk_box)
                        chk_box.innerText = vm.taskSelected.taskname;
                    // Update other fields
                    $scope.assignedTo = vm.taskSelected.assignedto;
                    vm.myDate = vm.taskSelected.completiondate.substring(0, 10);
                    vm.myDate = vm.myDate.replace(/-/g, '/');
                    var transformCreatedDt = vm.taskSelected.createddt.substring(0, 16);
                    transformCreatedDt = transformCreatedDt.replace(/-/g, '/');
                    vm.createdDate = new Date(transformCreatedDt);
                    // var newDate = new Date(vm.createdDate.getTime() + vm.createdDate.getTimezoneOffset() * 60 * 1000);
                    // var offset = vm.createdDate.getTimezoneOffset();
                    // var hours = vm.createdDate.getHours() * 60;
                    // var minutes = vm.createdDate.getMinutes();
                    // newDate.setHours((hours + minutes - offset) / 60);
                    var newDate = moment.utc(transformCreatedDt).local().format();
                    vm.createdDate = newDate;
                    $scope.desc = vm.taskSelected.description;
                    vm.editTaskInfo.taskName = vm.taskSelected.taskname;
                    vm.editTaskInfo.assignedTo = vm.taskSelected.assignedto;
                    vm.editTaskInfo.desc = vm.taskSelected.description;
                    vm.editTaskInfo.createdby = vm.taskSelected.createdby;
                    // Update CreatedBy text
                    // var createdByText = document.getElementById('created_by');
                    // // var newCreatedBy = 'Created by ' + $scope.get_userName(vm.taskSelected.createdby) + ' | ' + vm.taskSelected.createddt;
                    // if (createdByText) {
                    //     var txtNode = document.createTextNode(newCreatedBy);
                    //     createdByText.replaceChild(txtNode, createdByText.childNodes[0]);
                    // }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG233);
                }
            ).finally(function () {
                // $scope.loading = false;
            });

        }

        vm.addNewTask = function () {
            $scope.submitted = false;

            if (vm.rolesData.addflag) {

                vm.checkAddFlag = true;

            }
            vm.newTaskEnabled = true;
            vm.newTask = {};

            var dt = new Date();
            var curr_date = dt.getDate();
            var curr_month = dt.getMonth() + 1; //Months are zero based
            var curr_year = dt.getFullYear();
            vm.newTask.createdDt = curr_month + '/' + curr_date + '/' + curr_year;
            vm.newTask.compDate = vm.newTask.createdDt;

            // make the tasks table non-clickable when a new task is being added

            var newTask = {
                taskid: 9999,
                taskname: vm.newTask.name,
                createdBy: 'Mahesh Babu Bathani',
                createddt: vm.newTask.createdDt,
                taskstatus: 3,
                status: 'Open',
                completiondate: vm.newTask.compDate,
                assignedto: vm.newTask.assignedTo,
                description: vm.newTask.desc
            }
            // vm.mytasks.unshift(newTask);
        }

        $scope.undoNewTask = function () {
            // vm.mytasks.shift();
            vm.newTask = null;
            vm.newTaskEnabled = false;

            if ($rootScope.UserInfo.isAdmin || (vm.rolesData.addflag && !vm.rolesData.viewflag)) {
                vm.checkAddFlag = false
            }
        }

        $scope.saveNewTask = function (newTaskValid) {
            $scope.submitted = true;
            if (!newTaskValid) {
                ToastrService.error('Please fill all the mandatory fields');
                return;
            }
            if (vm.newTask.name) vm.newTask.name = vm.newTask.name.trim();
            if (vm.newTask.desc) vm.newTask.desc = vm.newTask.desc.trim();
            if (!vm.newTask.name || !vm.newTask.desc) {
                ToastrService.error($rootScope.errorMsgs.MSG234);
                return;
            }
            if ($rootScope.UserInfo.isAdmin && !vm.newTask.assignedTo) {
                ToastrService.error($rootScope.errorMsgs.MSG234);
                return;

            }
            if (!$rootScope.UserInfo.isAdmin) {
                vm.newTask.assignedTo = $rootScope.UserInfo.ID
            }


            // if (vm.newTask.compDate) {
            //     vm.newTask.status = 'Completed';
            // }
            vm.newTaskEnabled = false;
            // make the api request            
            sendNewTask();
        }

        vm.showDeleteConfirm = function (ev, id, itemName) {
            // Issue #197 - added 1sec delay as workaround to avoid spinner after dialog display
            // 24-Mar CHANDRA - delay not necessary as spinner is removed in function that gets task data
            // setTimeout(function () {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                locals: { itemName: itemName, itemType: 'Task' },
                templateUrl: $rootScope.rootUrl + '/components/common/deleteDialog.html',
                controller: ['$scope', 'itemType', 'itemName', function ($scope, itemType, itemName) {
                    $scope.itemType = itemType;
                    $scope.itemName = itemName;
                    $scope.id = id;
                }],
                targetEvent: ev,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                escapeToClose: true
            });
            // }, 1000);

        }

        $scope.closeDeleteModal = function () {
            $mdDialog.cancel();
        }

        $scope.deleteItem = function (taskid) {
            var taskCount = vm.mytasks.length;
            $scope.loading = true;
            TasksService.deleteTask(taskid).then(
                function (response) {
                    $scope.loading = false;
                    ToastrService.success(response.data.message);
                    // getFoldersList();
                    if (taskCount > 1)
                        getTasks();
                    else
                        $state.go('MyTasks', {}, { reload: 'MyTasks' });

                    $scope.closeDeleteModal();
                },
                function (err) {
                    $scope.loading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG235);
                }
            )
        }

        $scope.filterChange = function (filterby) {
            getTasks();
            // console.log("filter: ", filterby);
            var statusid = vm.get_taskstatusid(filterby);
            var filteredList = $filter('filter')(vm.mytasks, { taskstatus: statusid });
            // console.log("Filtered task list: ", filteredList);
            vm.setSelected(filteredList[0].taskid);
        }

        // Browser detecction
        $scope.browserType = function () {
            if (navigator.userAgent.indexOf("Chrome") != -1) {
                vm.browserUsed = 'Chrome';
                vm.taskSettingsAreaClass = 'task-settings-area';
                vm.taskStatusRadioClass = 'taskStatusRadio';
                vm.taskStatusLabelClass = 'taskStatusLabel';
                vm.tasksDisplayClass = 'tg-3rw';
                vm.statusElementsPaddingTop = '10px';
                vm.saveCancelBtnsMargin = '0 -10px 10px 0';
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                vm.browserUsed = 'Safari';
                vm.taskSettingsAreaClass = 'task-settings-area';
                vm.taskStatusRadioClass = 'taskStatusRadio';
                vm.taskStatusLabelClass = 'taskStatusLabel';
                vm.taskDivMaxheight = '100%';

                vm.statusElementsPaddingTop = '10px';
                vm.saveCancelBtnsMargin = '0 -10px 10px 0';
                if (navigator.userAgent.indexOf("10.0") != -1) {
                    vm.tasksDisplayClass = 'tg-3rw';
                }
                if (navigator.userAgent.indexOf("11.0") != -1) {
                    vm.tasksDisplayClass = 'tg-3rw-saf-11';
                }
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                vm.browserUsed = 'Firefox';
                vm.taskSettingsAreaClass = 'task-settings-area-FF';
                vm.taskStatusRadioClass = 'taskStatusRadio';
                vm.taskStatusLabelClass = 'taskStatusLabel';
                vm.tasksDisplayClass = 'tg-3rw-FF';
                vm.statusElementsPaddingTop = '0';
                vm.saveCancelBtnsMargin = '0 -10px 10px 0';
            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                vm.browserUsed = 'IE';
                vm.taskSettingsAreaClass = 'task-settings-area-IE';
                vm.taskStatusRadioClass = 'taskStatusRadio-IE';
                vm.taskStatusLabelClass = 'taskStatusLabel-IE';
                vm.tasksDisplayClass = 'tg-3rw';
                vm.statusElementsPaddingTop = '10px';
                vm.saveCancelBtnsMargin = '0 -10px 20px 0';
            }
            else {
                vm.browserUsed = 'Unknown';
                vm.taskSettingsAreaClass = 'task-settings-area';
                vm.taskStatusRadioClass = 'taskStatusRadio';
                vm.taskStatusLabelClass = 'taskStatusLabel';
                vm.tasksDisplayClass = 'tg-3rw';
                vm.statusElementsPaddingTop = '10px';
                vm.saveCancelBtnsMargin = '0 -10px 20px 0';
            }
        }
        $scope.browserType();
        $scope.taskDescRows = (vm.browserUsed == 'Firefox' ? '2' : '3');

    }
})();
