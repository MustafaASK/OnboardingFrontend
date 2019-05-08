(function () {
    'use strict';
    hrAdminApp.controller('activitiesController', activitiesController);
    activitiesController.$inject = ['$scope', '$stateParams', '$location', 'ToastrService', 'activitiesService', '$mdDialog', '$filter', '$timeout', 'HireInfoService'];
    function activitiesController($scope, $stateParams, $location, ToastrService, activitiesService, $mdDialog, $filter, $timeout, HireInfoService) {

        var vm = this;
        vm.getActivityLogList = getActivityLogList;

        $scope.activityDetails = {};

        function getActivityLogList() {
            var tmz = moment.tz(moment.tz.guess()).format('Z');
            var offsetDiff = tmz.charAt(0);
            tmz = offsetDiff + moment.tz(moment.tz.guess()).utcOffset();
            activitiesService.getActivityLogList($stateParams.hireId, tmz).then(
                function (response) {
                    $scope.activityDetails = response.data.ActivityLog;
                    // for (var i = 0; i < $scope.activityDetails.length; i++) {
                    //     $scope.activityDetails[i].timestamp = $scope.activityDetails[i].timestamp.replace(/-/g, '/');
                    //     $scope.activityDetails[i].timestamp = new Date($scope.activityDetails[i].timestamp);
                    //     var newDate = new Date($scope.activityDetails[i].timestamp.getTime() + $scope.activityDetails[i].timestamp.getTimezoneOffset() * 60 * 1000);
                    //     var offset = $scope.activityDetails[i].timestamp.getTimezoneOffset();
                    //     var hours = $scope.activityDetails[i].timestamp.getHours() * 60;
                    //     var minutes = $scope.activityDetails[i].timestamp.getMinutes();
                    //     newDate.setHours((hours + minutes - offset) / 60);
                    //     $scope.activityDetails[i].dateVal = newDate;
                    //     // $scope.activityDetails[i].dateVal = moment($scope.activityDetails[i].timestamp).utc().format("DD MMM YYYY");
                    //     // $scope.activityDetails[i].timeVal = moment($scope.activityDetails[i].timestamp).utc().format("HH:mm");
                    // }

                    // for (var i = 0; i < $scope.activityDetails.length; i++) {
                    //     $scope.activityDetails[i].timestamp = $scope.activityDetails[i].timestamp.replace(/-/g, '/');
                    //     $scope.activityDetails[i].timestamp = $scope.activityDetails[i].timestamp.replace(' ', 'T');
                    //     $scope.activityDetails[i].timestamp = $scope.activityDetails[i].timestamp + 'Z'
                    //     var localTime = moment($scope.activityDetails[i].timestamp).toDate();
                    //     console.log(localTime);
                    // }

                    for (var i = 0; i < $scope.activityDetails.length; i++) {
                        $scope.activityDetails[i].timestamp = $scope.activityDetails[i].timestamp.replace(/-/g, '/');
                        $scope.activityDetails[i].timestamp1 = $scope.activityDetails[i].timestamp1.replace(/-/g, '/');
                        var newDate = moment.utc($scope.activityDetails[i].timestamp1).local().format();
                        $scope.activityDetails[i].timestamp1 = newDate;
                    }

                }, function (err) {
                    ToastrService.error(err.message);
                })

        }
        // getActivityLogList();

    };

})();