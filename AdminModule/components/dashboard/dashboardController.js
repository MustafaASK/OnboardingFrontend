(function () {
    'use strict';
    hrAdminApp.controller('DashboardController', dashboardController);
    dashboardController.$inject = ['$rootScope', '$state', '$stateParams', '$scope', '$filter', '$timeout', '$mdDialog', 'ToastrService', 'DashboardService'];
    function dashboardController($rootScope, $state, $stateParams, $scope, $filter, $timeout, $mdDialog, ToastrService, DashboardService) {

        var vm = this;
        // Get Tasks List
        function getTasks() {
            $scope.loading = true;
            DashboardService.getTaskList().then(
                function (response) {
                    // vm.mytasks = response.data;
                    vm.tasks = response.data;
                    // vm.tasks = [];
                    // get the first five elements of the list
                    // vm.tasks = vm.mytasks.slice(0, 5);
                    for (var i = 0; i < vm.tasks.length; i++) {
                        var compDate = vm.tasks[i].completiondate.substring(0, 10);
                        compDate = compDate.replace(/-/g, '/');
                        vm.tasks[i].completiondate = new Date(compDate);
                        // var newDate = new Date(vm.tasks[i].completiondate.getTime() + vm.tasks[i].completiondate.getTimezoneOffset() * 60 * 1000);
                        // var offset = vm.tasks[i].completiondate.getTimezoneOffset();
                        // var hours = vm.tasks[i].completiondate.getHours() * 60;
                        // var minutes = vm.tasks[i].completiondate.getMinutes();
                        // newDate.setHours((hours + minutes - offset) / 60);
                        // var newDate = moment.utc(compDate).local().format();
                        vm.tasks[i].completiondateFormat = vm.tasks[i].completiondate;
                    }
                    // console.log(vm.tasks);
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG154);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }
        getTasks();

        $scope.dateTruncate = function (dateStr) {
            // var temp = $filter('date')(new Date(dateStr.split('-').join('/')), "MM/dd/yyyy ' ' h:mm a");
            // return temp;
            var createdTime = '';
            // var dateString = dateStr.split('-').join('/');
            var dateObj = new Date(dateStr);
            var momentObj = moment(dateObj, "MM/DD/YYYY hh:mm A");
            // createdTime = momentObj.format("MM/DD/YYYY hh:mm A");
            createdTime = momentObj.format("dddd, MMM Do, YYYY");
            return createdTime;
        }

        $scope.strTruncate = function (name) {
            // 21/Mar - reduced from 40 to 30 chars because when cap letters are used
            // and width of the char is greater 40 chars would not fit 
            if (name && name.length > 35) {
                name = name.substr(0, 33) + "...";
            }
            return name;
        }

        $scope.dateTruncate_with_time = function (dateStr) {
            // var temp = $filter('date')(new Date(dateStr.split('-').join('/')), "MM/dd/yyyy ' ' h:mm a");
            // return temp;
            var createdTime = '';
            // var dateString = dateStr.split('-').join('/');
            var dateObj = new Date(dateStr);
            var momentObj = moment(dateObj);
            // createdTime = momentObj.format("MM/DD/YYYY hh:mm A");
            createdTime = momentObj.format("llll");
            // createdTime = momentObj.format("lll");
            return createdTime;
        }

        $scope.gotoTask = function (taskid) {
            $state.go('ViewTask', { id: taskid });
        }

        function getNewHiresList() {
            $scope.loading = true;
            DashboardService.getNewHiresList().then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                    else {
                        // vm.newHiresList = response.data;
                        vm.newhires = response.data;
                        // if (vm.newHiresList.length > 1)
                        //     vm.newHiresList = vm.newHiresList.splice(-1 * (vm.newHiresList.length - 1));
                        // else
                        //     vm.newHiresList = [];
                        // // get first five elements of the list
                        // vm.newhires = vm.newHiresList.slice(0, 5);
                        // console.log(vm.newhires);

                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG159);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }
        getNewHiresList();

        function getNewHireStatusList() {
            DashboardService.getNewHireStatusList().then(
                function (response) {
                    vm.newHireStatusList = response.data;
                    // console.log(vm.newHireStatusList);
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG160);
                }
            )
        }
        getNewHireStatusList();

        // get clients list
        // function getClientsList() {
        //     DashboardService.getClientList().then(
        //         function (response) {
        //             vm.hrClients = response.data;
        //             // console.log(vm.hrClients);
        //         },
        //         function (err) {
        //             ToastrService.error($rootScope.errorMsgs.MSG161);
        //         }
        //     )
        // }
        // getClientsList();

        $scope.getClientName = function (clientName) {

            if (screen.width <= 1280) {
                if (clientName.length > 9) {
                    return clientName.substring(0, 7) + "...";
                }
                return clientName;
            } else {
                if (clientName.length > 15) {
                    return clientName.substring(0, 13) + "...";
                }
                return clientName;
            }
        }

        $scope.getClientNameforTitle = function (clientid) {
            if (vm.hrClients && vm.hrClients.length > 0) {
                for (var i = 0; i < vm.hrClients.length; i++) {
                    if (vm.hrClients[i].clientId == clientid) {
                        return vm.hrClients[i].clientName;

                    }
                }
            }
        }

        $scope.date_diff_indays = function (date1) {
            var dt2 = new Date(date1);
            var dt1 = new Date();
            return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
        }

        $scope.getClassByStatus = function (status) {
            if (status == 1) return 'newhire';
            if (status == 2) return 'initiated';
            if (status == 3) return 'accepted';
            if (status == 4) return 'rejected';
            if (status == 5) return 'noresponse';
            if (status == 6) return 'pending';
            if (status == 7) return 'review';
            if (status == 8) return 'inprogress';
            if (status == 9) return 'hrrejected';
            if (status == 10) return 'completed';
        }

        $scope.getClassByTaskStatus = function (task) {
            if (task.taskstatus == 4) return 'pending';
            if (task.taskstatus == 3) return 'completed';
            if (task.taskstatus == 1) return 'initiated';
        }

        $scope.getTaskStatusText = function (status) {
            if (status == 4) return 'In Progress';
            if (status == 3) return 'Close';
            if (status == 1) return 'Open';
        }

        $scope.getStatusText = function (status) {
            if (!vm.newHireStatusList || vm.newHireStatusList.length == 0) return;
            for (var i = 0; i < vm.newHireStatusList.length; i++) {
                if (vm.newHireStatusList[i].statusid == status) {
                    return vm.newHireStatusList[i].statusname;
                }
            }
        }

        // Activities
        $scope.displayingActivities = true;

        $scope.displayActivities = function () {
            $scope.displayingActivities = true;
        }

        $scope.displayEvents = function () {
            $scope.displayingActivities = false;
        }

        function getHrUsersList() {
            DashboardService.getHrUsersList(false).then(
                function (response) {
                    vm.hrUsers = response.data.users;
                    // console.log(vm.hrUsers);  
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG162);
                }
            )

        }

        function getRecentActivities() {
            var tmz = moment.tz(moment.tz.guess()).format('Z');
            var offsetDiff = tmz.charAt(0);
            tmz = offsetDiff + moment.tz(moment.tz.guess()).utcOffset();

            // return;
            DashboardService.getRecentActivities(tmz).then(
                function (response) {
                    vm.recentActivities = response.data.auditlog;
                    if (vm.recentActivities.length > 5) {
                        vm.recentActivities = vm.recentActivities.slice(0, 5);
                    }
                    for (var i = 0; i < vm.recentActivities.length; i++) {
                        var actionDt = vm.recentActivities[i].actiondate.substring(0, 16);
                        actionDt = actionDt.replace(/-/g, '/');
                        vm.recentActivities[i].actiondate = moment.utc(actionDt).local().format();
                    }
                    // var newDate = moment.utc($scope.activityDetails[i].timestamp1).local().format();
                    // console.log(vm.recentActivities);
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG163);
                }
            )
        }
        getRecentActivities();
        getHrUsersList();

        $scope.get_user_firstname = function (userid) {
            if (vm.hrUsers && vm.hrUsers.length > 0) {
                for (var i = 0; i < vm.hrUsers.length; i++) {
                    if (vm.hrUsers[i].userId == userid + 1) {
                        return vm.hrUsers[i].firstname;
                    }
                }
            }
        }

        $scope.truncated_firstName = function (fn) {
            if (fn.length > 15) {
                return fn.substring(0, 13) + '...';
            }
            return fn;
        }

        function getUpcomingEvents() {
            DashboardService.getUpcomingEvents().then(
                function (response) {
                    vm.events = response.data.event;
                    // console.log(vm.events);
                    if (vm.events.length > 5) {
                        vm.events = vm.events.slice(0, 5);
                    }
                    for (var i = 0; i < vm.events.length; i++) {
                        var startDt = vm.events[i].startDateTime.substring(0, 16);
                        startDt = startDt.replace(/-/g, '/');
                        vm.events[i].startDateTime = new Date(startDt);
                        // var newDate = new Date(vm.events[i].startDateTime.getTime() + vm.events[i].startDateTime.getTimezoneOffset() * 60 * 1000);
                        // var offset = vm.events[i].startDateTime.getTimezoneOffset();
                        // var hours = vm.events[i].startDateTime.getHours() * 60;
                        // var minutes =vm.events[i].startDateTime.getMinutes();
                        // newDate.setHours((hours + minutes - offset) / 60);
                        var newDate = moment.utc(startDt).local().format();
                        vm.events[i].startDateTime = newDate;
                    }

                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG163);
                }
            )
        }
        getUpcomingEvents();

        // function getNewHireMasterJson() {
        //     DashboardService.getNewHireMasterJson().then(
        //         function (response) {
        //             vm.masterNewHireJson = response.data.jsonData.components;
        //             // | filter : { Type : '!devider' || Type : '!header' }
        //             vm.masterNewHireJson = $filter('filter')(vm.masterNewHireJson, { 'Type': '!devider' }, true);
        //             vm.masterNewHireJson = $filter('filter')(vm.masterNewHireJson, { 'Type': '!header' }, true);
        //             vm.masterNewHireJson = $filter('filter')(vm.masterNewHireJson, { 'Type': '!emptyspace' }, true);
        //             vm.masterNewHireJson = $filter('filter')(vm.masterNewHireJson, { 'Type': '!attachment' }, true);
        //         },
        //         function (err) {
        //             ToastrService.error($rootScope.errorMsgs.MSG163);
        //         }
        //     )
        // }
        // getNewHireMasterJson();

        function getOnboardings() {
            // $scope.loading = true;
            DashboardService.getOnboardings().then(
                function (response) {
                    vm.onboardings = response.data.OnBoarding;
                    vm.onboards = [];
                    $scope.labels = [];
                    $scope.chartdata = [];
                    $scope.new_hires = [];
                    $scope.initiated = [];
                    // $scope.inprogress = [];
                    // $scope.hold = [];
                    // $scope.readyforreview = [];
                    $scope.accepted = [];
                    $scope.completed = [];
                    $scope.rejected = [];

                    if (!vm.onboardings) return;

                    for (var i = 0; i < 5; i++) {
                        vm.onboards.push(vm.onboardings[i]);
                        $scope.labels.push(vm.onboardings[i].Month);
                        if (vm.onboardings[i].NewHire)
                            $scope.new_hires.push(vm.onboardings[i].NewHire);
                        else
                            $scope.new_hires.push(0);

                        if (vm.onboardings[i].Initiated)
                            $scope.initiated.push(vm.onboardings[i].Initiated);
                        else
                            $scope.initiated.push(0);

                        // if (vm.onboardings[i].InProgress)
                        //     $scope.inprogress.push(vm.onboardings[i].InProgress);
                        // else
                        //     $scope.inprogress.push(0);

                        if (vm.onboardings[i].Accepted)
                            $scope.accepted.push(vm.onboardings[i].Accepted);
                        else
                            $scope.accepted.push(0);

                        if (vm.onboardings[i].Completed)
                            $scope.completed.push(vm.onboardings[i].Completed);
                        else
                            $scope.completed.push(0);

                        //     if (vm.onboardings[i].Hold)
                        //     $scope.hold.push(vm.onboardings[i].Hold);
                        // else
                        //     $scope.hold.push(0);

                        if (vm.onboardings[i].Rejected)
                            $scope.rejected.push(vm.onboardings[i].Rejected);
                        else
                            $scope.rejected.push(0);
                    }

                    // Simulate async data update 
                    // $timeout(function () {
                    $scope.chartdata.push($scope.new_hires);
                    $scope.chartdata.push($scope.initiated);
                    // $scope.chartdata.push($scope.inprogress);
                    $scope.chartdata.push($scope.accepted);
                    $scope.chartdata.push($scope.completed);
                    // $scope.chartdata.push($scope.hold);
                    $scope.chartdata.push($scope.rejected);
                    // }, 1000);

                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG164);
                }
            ).finally(function () {
                // $scope.loading = false;
            });
        }
        getOnboardings();


        // Chart.js related
        // $scope.labels = ["February", "January", "December", "November", "October"];
        $scope.type = 'StackedBar';
        $scope.series = ['New Hire', 'Initiated', 'Accepted', 'Completed', 'Rejected'];
        $scope.onClick = function (points, evt) {
            //   console.log(points, evt);
        };

        // $scope.colors = [
        //     {
        //         fill: true,
        //         backgroundColor: "#7f75b0",
        //         borderColor: "#7f75b0"
        //     },
        //     {
        //         borderColor: "#49a3d7",
        //         backgroundColor: "#49a3d7",
        //         fill: true
        //     },
        //     {
        //         borderColor: "#fec107",
        //         backgroundColor: "#fec107",
        //         fill: true
        //     },
        //     {
        //         borderColor: "#88bc48",
        //         backgroundColor: "#88bc48",
        //         fill: true
        //     },
        //     {
        //         borderColor: "#00c292",
        //         backgroundColor: "#00c292",
        //         fill: true
        //     },
        //     {
        //         borderColor: "#c7b096",
        //         backgroundColor: "#c7b096",
        //         fill: true
        //     },
        //     {
        //         borderColor: "#d75a5a",
        //         backgroundColor: "#d75a5a",
        //         fill: true
        //     }
        //   ];
        $scope.colors = [
            {
                fill: true,
                backgroundColor: "#7f75b0",
                borderColor: "#7f75b0"
            },
            {
                borderColor: "#49a3d7",
                backgroundColor: "#49a3d7",
                fill: true
            },
            {
                borderColor: "#88bc48",
                backgroundColor: "#88bc48",
                fill: true
            },
            {
                borderColor: "#00c292",
                backgroundColor: "#00c292",
                fill: true
            },
            {
                borderColor: "#d75a5a",
                backgroundColor: "#d75a5a",
                fill: true
            }
        ];
        $scope.options = {
            scales: {
                xAxes: [{
                    stacked: true,
                    girdLines: { display: false },
                    barThickness: 35
                }],
                yAxes: [{
                    stacked: true,
                    gridLines: { display: false }
                }]
            },
            legend: {
                display: true,
                position: 'bottom',
                labels: { boxWidth: 8 }
            }
        };

        // send email reminder to new hire
        vm.showEmailReminderDialog = function (ev, emailTo, newHireId) {
            $mdDialog.show({
                locals: { emailTo: emailTo, newHireId: newHireId },
                templateUrl: $rootScope.rootUrl + '/components/new_hires/email/send-email.html',
                controller: 'SendEmailController',
                controllerAs: 'vm',
                targetEvent: ev,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                escapeToClose: true
            });
        }

        vm.closeDeleteModal = function () {
            $mdDialog.cancel();
        }

        // Browser detecction
        $scope.browserType = function () {
            if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
                vm.browserUsed = 'Opera';
                vm.tasksAreaClass = 'dashboard-tasks';
                vm.dueByClass = 'light12px888888';
                vm.newHiresTableHeaderClass = 'tg-qmme';
                vm.trLineHt = 'normal';
                vm.taskMarginTop = '-10px';
            }
            else if (navigator.userAgent.indexOf("Chrome") != -1) {
                vm.browserUsed = 'Chrome';
                vm.tasksAreaClass = 'dashboard-tasks';
                vm.dueByClass = 'light12px888888';
                vm.newHiresTableHeaderClass = 'tg-qmme';
                vm.trLineHt = 'normal';
                vm.taskMarginTop = '10px';
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                vm.browserUsed = 'Safari';
                vm.tasksAreaClass = 'dashboard-tasks';
                vm.dueByClass = 'light12px888888';
                vm.newHiresTableHeaderClass = 'tg-qmme';
                vm.trLineHt = '27px';
                vm.taskMarginTop = '10px';
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                vm.browserUsed = 'Firefox';
                vm.tasksAreaClass = 'dashboard-tasks-FF';
                vm.dueByClass = 'light10px888888';
                vm.newHiresTableHeaderClass = 'tg-qmme-FF';
                vm.trLineHt = '25px';
                vm.taskMarginTop = '10px';
            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                vm.browserUsed = 'IE';
                vm.tasksAreaClass = 'dashboard-tasks';
                vm.dueByClass = 'light12px888888';
                vm.newHiresTableHeaderClass = 'tg-qmme';
                vm.trLineHt = 'normal';
                vm.taskMarginTop = '10px';
            }
            else {
                vm.browserUsed = 'Unknown';
                vm.tasksAreaClass = 'dashboard-tasks';
                vm.dueByClass = 'light12px888888';
                vm.newHiresTableHeaderClass = 'tg-qmme';
                vm.trLineHt = 'normal';
                vm.taskMarginTop = '-10px';
            }
        }
        $scope.browserType();


        //   $http({
        //     method:'GET',
        //     url:'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json',
        //     responseType:'arraybuffer'
        //   }).then(function(data) {
        //     var wb = XLSX.read(data.data, {type:"array"});
        //     var d = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        //     $scope.data = d;
        //   }, function(err) { console.log(err); });
        // var data = [
        //     { name: "Barack Obama", pres: 44 },
        //     { name: "Donald Trump", pres: 45 }
        //   ];

        //   /* generate a worksheet */
        //   var ws = XLSX.utils.json_to_sheet(data);

        //   /* add to workbook */
        //   var wb = XLSX.utils.book_new();
        //   XLSX.utils.book_append_sheet(wb, ws, "Presidents");

        //   /* write workbook and force a download */
        //   XLSX.writeFile(wb, "sheetjs.xlsx");


        $scope.convertDateFormat = function (dateValue) {
            return $filter('date')(new Date(dateValue), 'MM/dd/yyyy');
        }

        $scope.openConfigPopup = function (ev) {
            $mdDialog.show({
                templateUrl: $rootScope.rootUrl + '/components/common/configuration/configuration.html',
                controller: ['$scope', 'DashboardService', function ($scope, DashboardService) {

                    //var configCtrl = this;
                    $scope.hide = function (ev) {
                        $mdDialog.hide();
                    }

                    $scope.cancel = function (ev) {
                        // dialogCtrl.fileThumb = '';
                        $mdDialog.cancel();
                    }

                    // $scope.answer = function (ev, answer) {
                    //     $mdDialog.hide(answer);
                    // }

                    $scope.Text = 'Hai';
                    $scope.allControlsDummy = [
                        {
                            "labelName": 'First Name',
                            "name": "1"
                        },
                        {
                            "labelName": 'Last Name',
                            "name": "2"
                        },
                        {
                            "labelName": 'Email Id',
                            "name": "3"
                        },
                        {
                            "labelName": 'Job Title',
                            "name": "4"
                        },
                        {
                            "labelName": 'Status',
                            "name": "5"
                        },
                        {
                            "labelName": 'Pay Rate',
                            "name": "6"
                        },
                        {
                            "labelName": 'OT Rate',
                            "name": "7"
                        },
                        {
                            "labelName": 'Hire Category',
                            "name": "8"
                        },
                        {
                            "labelName": 'Source',
                            "name": "9"
                        },
                        {
                            "labelName": 'Middle Name',
                            "name": "10"
                        }
                    ];



                    $scope.dragoverCallbackAllControls = function (arrayLength) {
                        if (arrayLength >= 5) {
                            $scope.disable = true;
                        }
                        else {
                            $scope.disable = false;
                        }
                        return arrayLength <= 5; // Disallow dropping in the third row.
                    };

                    $scope.dragoverCallbackSelectedControls = function (arrayLength) {
                        $scope.disable = false;
                        return true; // Disallow dropping in the third row.
                    };

                    $scope.mouseover = function (prevState) {
                        if (prevState)
                            $scope.disable = false;
                    }

                    $scope.mouseleave = function (arrLength) {
                        if (arrLength >= 5) {
                            $scope.disable = true;
                        }
                        else {
                            $scope.disable = false;
                        }
                    }

                    // Model to JSON for demo purpose
                    $scope.$watch('models', function (model) {
                        $scope.modelAsJson = angular.toJson(model, true);
                    }, true);

                    function getNewHireFields() {
                        DashboardService.getNewHireMasterFields().then(
                            function (response) {
                                if (response.data && response.data.length) {
                                    $scope.allControls = angular.copy(response.data);

                                    $scope.models = {
                                        selected: null,
                                        lists: { "InputControls": $scope.allControls, "SelectedControls": [] }
                                    };

                                    getNewHireControlsSavedConfig();




                                }
                                else {

                                }
                            },
                            function (err) {
                                ToastrService.error($rootScope.errorMsgs.MSG159);
                            }
                        ).finally(function () {
                            $scope.loading = false;
                        });
                    }
                    getNewHireFields();

                    $scope.saveNewHireDashboardConfig = function () {
                        $scope.models.lists.SelectedControls;
                        var selectedControls = [];
                        var obj = {};
                        for (var i = 0; i < $scope.models.lists.SelectedControls.length; i++) {
                            selectedControls.push($scope.models.lists.SelectedControls[i].name);
                        }
                        obj.dashboardControls = selectedControls.toString();
                        DashboardService.saveNewHireDashboardConfig(obj).then(
                            function (response) {
                                if (response.data.Success) {
                                    ToastrService.success(response.data.message);
                                    $mdDialog.hide();
                                }
                                else {

                                }
                            },
                            function (err) {
                                ToastrService.error($rootScope.errorMsgs.MSG159);
                            }
                        ).finally(function () {
                            $scope.loading = false;
                        });
                    }

                    function getNewHireControlsSavedConfig() {
                        DashboardService.getNewHireDashboardConfig().then(
                            function (response) {
                                if (response.data.Success) {
                                    $scope.controlsSelected = angular.copy(response.data.dashboardControls);
                                    $scope.controlsSelected = $scope.controlsSelected.split(',');
                                    for (var i = 0; i < $scope.controlsSelected.length; i++) {
                                        for (var j = 0; j < $scope.allControls.length; j++) {
                                            if ($scope.allControls[j].name == $scope.controlsSelected[i]) {
                                                $scope.models.lists.SelectedControls.push($scope.allControls[j]);

                                                break;
                                            }
                                        }
                                    }
                                    for (var k = 0; k < $scope.controlsSelected.length; k++) {
                                        $scope.models.lists.InputControls = $filter('filter')($scope.models.lists.InputControls, { 'name':  '!' + $scope.controlsSelected[k] }, true);
                                    }
                                }
                                else {

                                }
                            },
                            function (err) {
                                ToastrService.error($rootScope.errorMsgs.MSG159);
                            }
                        ).finally(function () {
                            $scope.loading = false;
                        });
                    }





                }],
                targetEvent: ev,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                escapeToClose: true
            });
        }

    }
})();