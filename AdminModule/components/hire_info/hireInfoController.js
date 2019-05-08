(function () {
    'use strict';
    hrAdminApp.controller('HireInfoController', HireInfoController);
    HireInfoController.$inject = ['$scope', '$rootScope', '$stateParams', '$location', 'ToastrService', 'HireInfoService', '$mdDialog', '$filter', '$timeout', 'hirUserInfo'];
    function HireInfoController($scope, $rootScope, $stateParams, $location, ToastrService, HireInfoService, $mdDialog, $filter, $timeout, hirUserInfo) {

        //  $scope.isDisable=false;
        // $scope.isVisible=true;
        var vm = this;
        var currentUrl = $location.path();
        currentUrl = currentUrl.split('/')[3];
        vm.isIntiated = false;
        vm.catName = '';
        
        vm.statusName = '';
        var menu = [
            'initiate-onboarding',
            'emails',
            'review-certify',
            'schedule',
            'activities'
        ];
        // vm.currentNavItem = menu.indexOf(currentUrl);
        // /vm.currentNavItem = currentUrl;
        var hireId = $stateParams.hireId;
        
        // vm.hiredInfo = hirUserInfo.data;
        // vm.worklocation = hirUserInfo.data.worklocation;

        // vm.hiredInfo.payrate = parseFloat(vm.hiredInfo.payrate);
        // vm.hiredInfo.billrate = parseFloat(vm.hiredInfo.billrate);
        // vm.hiredInfo.otrate = parseFloat(vm.hiredInfo.otrate);
        // vm.hiredInfo.otbillrate = parseFloat(vm.hiredInfo.otbillrate);
        // vm.hiredInfo.payrate = Math.round(vm.hiredInfo.payrate * 100) / 100;
        // vm.hiredInfo.billrate = Math.round(vm.hiredInfo.billrate * 100) / 100;
        // vm.hiredInfo.otrate = Math.round(vm.hiredInfo.otrate * 100) / 100;
        // vm.hiredInfo.otbillrate = Math.round(vm.hiredInfo.otbillrate * 100) / 100;
        // HireInfoService.hireUserData = hirUserInfo.data;


        // if (vm.hiredInfo.statusid != 1) {
        //     vm.isIntiated = true;
        // }

        // $scope.getClassByStatus = function () {
        //     if (vm.hiredInfo.statusid == 1) return 'newhire';
        //     if (vm.hiredInfo.statusid == 2) return 'initiated';
        //     if (vm.hiredInfo.statusid == 3) return 'accepted';
        //     if (vm.hiredInfo.statusid == 4) return 'rejected';
        //     if (vm.hiredInfo.statusid == 5) return 'noresponse';
        //     if (vm.hiredInfo.statusid == 6) return 'pending';
        //     if (vm.hiredInfo.statusid == 7) return 'review';
        //     if (vm.hiredInfo.statusid == 8) return 'inprogress';
        //     if (vm.hiredInfo.statusid == 9) return 'hrrejected';
        //     if (vm.hiredInfo.statusid == 10) return 'completed';

        // }

        function getCategoryList() {
            HireInfoService.getCategoryList().then(
                function (response) {
                    if (response.data.Success) {
                        vm.categoryList = response.data.Category;
                        var ary = $filter('filter')(vm.categoryList, { 'catgid': vm.hiredInfo.catgid })
                        if (ary && ary.length) {
                            vm.catName = ary[0].catgname;
                        }

                    }
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }

        // getCategoryList();

        // function statesList() {
        //     HireInfoService.getStatesList().then(
        //         function (response) {
        //             vm.statesList = response.data;
        //             var ary = $filter('filter')(vm.statesList, { 'stateCode': vm.hiredInfo.worklocation })
        //             if (ary && ary.length) {
        //                 vm.worklocation = ary[0].stateName;
        //             }
        //         },
        //         function (err) {
        //             ToastrService.error($rootScope.errorMsgs.MSG132);
        //         }
        //     )
        // }
        // statesList();


        function newHiresStatus() {
            HireInfoService.getNewHiresStatus().then(
                function (response) {
                    vm.newHiresStatusList = response.data;
                    var ary = $filter('filter')(vm.newHiresStatusList, { 'statusid': vm.hiredInfo.statusid })
                    if (ary && ary.length) {
                        vm.statusName = ary[0].statusname;
                    }

                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG185);
                }
            )
        }
        // newHiresStatus();

        vm.getHireInfo = function () {
            HireInfoService.getHireInfo($stateParams.hireId).then(
                function (response) {
                    if (response.data) {
                        vm.hiredInfo = response.data;
                        if (vm.hiredInfo.statusId != 1) {
                            vm.isIntiated = true;
                            $scope.currentNavItem = 2;
                        }
                        else{
                            $scope.currentNavItem = 0;
                        }
                        // vm.hiredInfo.payrate = parseFloat(vm.hiredInfo.payrate);
                        // vm.hiredInfo.billrate = parseFloat(vm.hiredInfo.billrate);
                        // vm.hiredInfo.otrate = parseFloat(vm.hiredInfo.otrate);
                        // vm.hiredInfo.otbillrate = parseFloat(vm.hiredInfo.otbillrate);
                        // // vm.hiredInfo.payrate = Math.round(vm.hiredInfo.payrate * 100) / 100;
                        // // vm.hiredInfo.billrate = Math.round(vm.hiredInfo.billrate * 100) / 100;
                        // // vm.hiredInfo.otrate = Math.round(vm.hiredInfo.otrate * 100) / 100;
                        // // vm.hiredInfo.otbillrate = Math.round(vm.hiredInfo.otbillrate * 100) / 100;
                        // // vm.worklocation = 
                        // HireInfoService.hireUserData = response.data;
                    }
                    /*  if(vm.hiredInfo.statusid >1){
                         $scope.isDisable = true;
                         $scope.isVisible = false;
                     }
                     else{
                         $scope.isDisable = false;
                         $scope.isVisible = true;
 
                     }*/

                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG185);
                }
            )

        }



        function init() {
               vm.getHireInfo();
        }

        init();

        $scope.checkDocExtension = function (docName) {
            var docExt = docName.split('.');
            return docExt[docExt.length - 1];
        }

    }
})();