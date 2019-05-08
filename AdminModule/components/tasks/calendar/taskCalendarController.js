(function () {
    'use strict';
    hrAdminApp.controller('TaskCalendarController', taskCalendarController);
    taskCalendarController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', '$compile', '$mdDialog', '$filter', 'ToastrService', 'TasksService'];
    function taskCalendarController($rootScope, $scope, $state, $stateParams, $timeout, $compile, $mdDialog, $filter, ToastrService, TasksService) {

        var vm = this;
        $scope.selected = null;
        $scope.events = [];
        $scope.eventSources = [];
        vm.rolesData = {};

        if (!$rootScope.UserInfo.isAdmin) {
            var roles = $rootScope.UserInfo.roles;
            if (roles.length) {
                var rolesData = $filter('filter')(roles, { role: "Tasks" });
                if (rolesData.length) {
                    vm.rolesData = rolesData[0];
                }


            }
        }

        /* Render Tooltip */
        $scope.eventRender = function (event, element, view) {
            element.attr({
                'tooltip': event.title,
                'tooltip-append-to-body': true
            });
            $compile(element)($scope);
        };

        $scope.uiConfig = {
            calendar: {
                height: 500,
                editable: false,
                theme: 'standard',
                header: {
                    left: 'month agendaWeek agendaDay prev',
                    center: 'title',
                    right: 'next,today'
                }
                //   ,
                //   eventClick: $scope.alertEventOnClick,
                //   eventResize: $scope.alertOnResize,
                //   eventRender: $scope.eventRender
            }
        };

        //   /* alert on eventClick */
        // $scope.alertOnEventClick = function(date, jsEvent, view){
        //     $scope.alertMessage = (date.title + ' was clicked ');
        // };          
        // /* alert on Resize */
        // $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view){
        //     $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        // };
        // /* Render Tooltip */
        // $scope.eventRender = function( event, element, view ) { 
        //     element.attr({'tooltip': event.title,
        //                   'tooltip-append-to-body': true});
        //     $compile(element)($scope);
        // };        

        // $scope.eventsExt = [
        //     {
        //         title: 'Batch #3 code complete',
        //         start: new Date(2018, 1, 6, 1, 30),
        //         end: new Date(2018, 1, 8, 1, 30),
        //         allDay: true
        //     }                                    
        // ];


        function getEvents() {
            $scope.loading = true;
            TasksService.getEvents().then(
                function (response) {
                    vm.events = response.data.event;
                    $scope.events = buildEventsForCalendar(vm.events);
                    $scope.eventSources.push({
                        events: $scope.events
                    });
                    // console.log($scope.eventSources);

                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG227);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }
        getEvents();

        function getTasks() {
            $scope.loading = true;
            TasksService.getTaskList(false).then(
                function (response) {
                    vm.tasks = response.data;
                    buildTasksForCalendar(vm.tasks);
                    $scope.eventSources.push({
                        color: '#ff0000',
                        events: vm.openTasksList
                    });
                    $scope.eventSources.push({
                        color: '#00c292',
                        events: vm.closedTasksList
                    });
                    $scope.eventSources.push({
                        color: '#49a3d7',
                        events: vm.futureTasksList
                    });
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG154);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }
        if ($rootScope.UserInfo.isAdmin || vm.rolesData.viewflag) {
            getTasks();

        }

        function buildEventsForCalendar(events) {
            var eventsList = [];
            if (events) {
                for (var i = 0; i < events.length; i++) {
                    var allday = false;

                    var sDate = new Date(events[i].startDateTime.replace(/-/g, '/'));
                    var snewDate = new Date(sDate.getTime() + sDate.getTimezoneOffset() * 60 * 1000);
                    var soffset = sDate.getTimezoneOffset();
                    var shours = sDate.getHours() * 60;
                    var sminutes = sDate.getMinutes();
                    snewDate.setHours((shours + sminutes - soffset) / 60);
                    sDate = snewDate;
                    var sYear = sDate.getFullYear();
                    var sMonth = sDate.getMonth();
                    var sDay = sDate.getDate();
                    var sHours = sDate.getHours();
                    var sMins = sDate.getMinutes();

                    var eDate = new Date(events[i].endDateTime.replace(/-/g, '/'));
                    var enewDate = new Date(eDate.getTime() + eDate.getTimezoneOffset() * 60 * 1000);
                    var eoffset = eDate.getTimezoneOffset();
                    var ehours = eDate.getHours() * 60;
                    var eminutes = eDate.getMinutes();
                    enewDate.setHours((ehours + eminutes - eoffset) / 60);
                    eDate = enewDate;
                    var eYear = eDate.getFullYear();
                    var eMonth = eDate.getMonth();
                    var eDay = eDate.getDate();
                    var eHours = eDate.getHours();
                    var eMins = eDate.getMinutes();

                    allday = ((eHours - sHours) == 9 ? true : false);
                    allday = (eDay > sDay ? true : false);

                    eventsList.push({
                        title: events[i].subject,
                        start: new Date(sYear, sMonth, sDay, sHours, sMins),
                        end: new Date(eYear, eMonth, eDay, eHours, eMins),
                        allDay: false
                    });
                }
            }
            return eventsList;
        }

        function buildTasksForCalendar(tasks) {
            vm.openTasksList = [];
            vm.closedTasksList = [];
            vm.futureTasksList = [];
            if (tasks) {

                for (var i = 0; i < tasks.length; i++) {
                    var allday = false;
                    var sDate = new Date(tasks[i].createddt.substring(0, 10).replace(/-/g, '/'));
                    // var tsnewDate = new Date(sDate.getTime() + sDate.getTimezoneOffset() * 60 * 1000);
                    // var tsoffset = sDate.getTimezoneOffset();
                    // var tshours = sDate.getHours() * 60;
                    // var tsminutes = sDate.getMinutes();
                    // tsnewDate.setHours((tshours + tsminutes - tsoffset) / 60);
                    // sDate = tsnewDate;
                    var eDate = new Date(tasks[i].completiondate.substring(0, 10).replace(/-/g, '/'));
                    // var tenewDate = new Date(eDate.getTime() + eDate.getTimezoneOffset() * 60 * 1000);
                    // var teoffset = eDate.getTimezoneOffset();
                    // var tehours = eDate.getHours() * 60;
                    // var teminutes = eDate.getMinutes();
                    // tenewDate.setHours((tehours + teminutes - teoffset) / 60);
                    // eDate = tenewDate;
                    var eYear = eDate.getFullYear();
                    var eMonth = eDate.getMonth();
                    var eDay = eDate.getDate();

                    // tasks that have not crossed completion date or are closed
                    // need not be shown
                    var currentDate = new Date();
                    if (tasks[i].taskstatus == 3) {
                        vm.closedTasksList.push({
                            title: tasks[i].taskname,
                            start: eDate,
                            allDay: true
                        });
                        continue;
                    }
                    var currentDay = currentDate.getDate();
                    var currentMonth = currentDate.getMonth();
                    var currentYear = currentDate.getFullYear();

                    var sYear = sDate.getFullYear();
                    var sMonth = sDate.getMonth();
                    var sDay = sDate.getDate();

                    // for current date task not be calculated as overdue ref #649 github
                    // if (eDate >= currentDate) {
                    if (eMonth > currentMonth && eYear >= currentYear) {
                        if (tasks[i].taskstatus != 3) {
                            vm.futureTasksList.push({
                                title: tasks[i].taskname,
                                start: eDate,
                                allDay: true
                            });
                            continue;
                        }
                    }
                    else if (eMonth == currentMonth && eYear == currentYear) {
                        if (eDay >= currentDay) {
                            if (tasks[i].taskstatus != 3) {
                                vm.futureTasksList.push({
                                    title: tasks[i].taskname,
                                    start: eDate,
                                    allDay: true
                                });
                                continue;
                            }
                        }
                    }

                    vm.openTasksList.push({
                        title: tasks[i].taskname,
                        start: eDate,
                        allDay: true
                    });
                }
            }
            // return tasksList;
        }

    }
})();
