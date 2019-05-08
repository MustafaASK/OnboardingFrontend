(function () {
    'use strict';
    hrAdminApp.controller('ScheduleController', ScheduleController);
    ScheduleController.$inject = ['$scope', '$rootScope', '$stateParams', '$location', 'ToastrService', 'ScheduleService', '$mdDialog', '$filter', '$timeout', 'HireInfoService'];

    function ScheduleController($scope, $rootScope, $stateParams, $location, ToastrService, ScheduleService, $mdDialog, $filter, $timeout, HireInfoService) {

        var vm = this;
        $scope.submitted = false;
        vm.schedule = { subject: "" };
        $scope.today = new Date();
        $scope.startDate = $scope.today;
        $scope.endDate = $scope.today;
        $scope.starttime = $scope.today;
        $scope.endtime = $scope.today;
        /* this.myDate = new Date();
        this.isOpen = false;//for date picker
      */
        $scope.isDisable = false;
        $scope.myEndDate = new Date();
        $scope.myDate = new Date();
        $scope.minDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() - 2,
            $scope.myDate.getDate());
        $scope.maxDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() + 2,
            $scope.myDate.getDate());
        $scope.onlyWeekendsPredicate = function (date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        };
        $scope.dateTimeStart = $scope.today;
        //$scope.dateTimeEnd = $scope.today;


        //vm.doSubmit = doSubmit;
        $scope.submitOutput = {};



        $scope.doSubmitForm = function (form) {
            $scope.submitted = true;
            if (!form.$valid) {
                ToastrService.error($rootScope.errorMsgs.MSG127);
                return false;
            }
            if (vm.htmlToPlaintext(vm.schedule.body).length > 1001) {
                ToastrService.error($rootScope.errorMsgs.MSG166);
                return;
            }
            if(vm.htmlToPlaintext(vm.schedule.body).trim() == ""){
                ToastrService.error('Please enter the Meeting Agenda. It can’t be blank.');
                return;
            }

            // var dateTimeStart = moment($scope.dateTimeStart);
            // dateTimeStart = dateTimeStart.format("YYYY-MM-DD HH:mm:ss");
            var dateTimeStart = moment($scope.dateTimeStart).utc().format('YYYY-MM-DD HH:mm:ss');

            // var dateTimeEnd = moment($scope.dateTimeEnd);
            // dateTimeEnd = dateTimeEnd.format("YYYY-MM-DD HH:mm:ss");
            var dateTimeEnd = moment($scope.dateTimeEnd).utc().format('YYYY-MM-DD HH:mm:ss');

            vm.schedule.body = vm.schedule.body.replace(/<p style="/g, "<p style=\"margin:0;padding:0;");
            vm.schedule.body = vm.schedule.body.replace(/<p>/g, "<p style=\"margin:0;padding:0;\">");

            var obj = {
                "newhireid": $stateParams.hireId,
                "agenda": vm.schedule.body,
                "subject": String(vm.subject).replace(/<[^>]+>/gm, ''),
                "startDateTime": dateTimeStart,
                "endDateTime": dateTimeEnd
            };
            $scope.loading = true;

            ScheduleService.doSubmit(obj).then(
                function (response) {
                    if (response.data.Success) {
                        $scope.loading = false;
                        $scope.isDisable = false;
                        //$timeout(function(){
                        ToastrService.success(response.data.message);
                        $scope.dateTimeStart = '';
                        $scope.dateTimeEnd = '';
                        vm.schedule.body = '';
                        vm.subject = '';

                        form.$setPristine();
                        form.$setUntouched();
                        $scope.submitted = false;
                        //},4000);
                    }
                    if (!response.data.Success) {
                        $scope.loading = false;
                        $scope.isDisable = true;
                        //$timeout(function(){
                        $scope.isDisable = false;
                        ToastrService.error(response.data.message);
                        // },4000);
                    }
                },
                function (err) {
                    $scope.loading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG184);
                }
            );
        }
        // doSubmit();

        vm.htmlToPlaintext = function (text) {
            // return text ? String(text).replace(/<[^>]+>/gm, '') : '';
            return text ? String(text).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').replace(/&\w+;/g, '').replace(/^\s*/g, '').replace(/\s*$/g, '') : '';
        }


    };

})();