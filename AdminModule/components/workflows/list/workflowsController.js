(function () {
    'use strict';
    hrAdminApp.controller('WorkflowsController', workflowsController);
    workflowsController.$inject = ['$rootScope', '$scope', '$state', '$filter', '$stateParams', '$mdDialog', 'ToastrService', 'WorkflowService', '$document'];
    function workflowsController($rootScope, $scope, $state, $filter, $stateParams, $mdDialog, ToastrService, WorkflowService, $document) {

        var vm = this;

        //vm.goto = navigateTo;
        $scope.plusSign = '+';
        vm.currentPage = 0;
        vm.headerHeight = '90px';
        $scope.cardWidth = '2.7in';
        vm.workflows = [];

        $scope.workFlowsPerPage = 20;
        $scope.itemsPerRow = 4;
        $scope.loading = true;

        vm.rolesData = {};

        if (!$rootScope.UserInfo.isAdmin) {
            var roles = $rootScope.UserInfo.roles;
            if (roles.length) {
                var rolesData = $filter('filter')(roles, { role: "Work Flows" });
                if (rolesData.length) {
                    vm.rolesData = rolesData[0];
                }


            }
        }

        // Fix for Issue 253
        vm.filterby = '';
        WorkflowService.setSearchBy(vm.filterby);

        if (screen.width == 1024) {
            $scope.itemsPerRow = 3;
            $scope.workFlowsPerPage = 18;
            $scope.cardWidth = '2.5in';
        }

        var addWorkflowBtn = document.getElementById('add-workflow-btn');
        var searchIcon = document.getElementById('search-icon');
        if ($rootScope.UserInfo.isAdmin || vm.rolesData.addflag) {

            if (addWorkflowBtn) {
                addWorkflowBtn.style.visibility = 'visible';
            }
        } else {

            if (addWorkflowBtn) {
                addWorkflowBtn.style.visibility = 'hidden';
            }
        }
        if (searchIcon) searchIcon.style.visibility = 'visible';

        vm.workflowSearchBoxDisplay = function () {
            vm.workflowSearch = (!vm.workflowSearch ? true : false);
            vm.headerHeight = (vm.workflowSearch ? '120px' : '90px');
            var searchBox = document.getElementById('search-box');
            if (searchBox) {
                window.setTimeout(function () {
                    searchBox.focus();
                }, 0);
            }
        }

        vm.filterWorkflowsBy = function () {
            WorkflowService.setSearchBy(vm.filterby);
            // var filteredWfs = $filter('filter')(vm.workflows,{workflowName : vm.getSearchFilter()});
            // $scope.pagination(filteredWfs);
        }

        vm.getSearchFilter = function () {
            vm.searchby = WorkflowService.getSearchBy();
            return vm.searchby;
        }

        function loadPages() {
            // console.log('Current page is : ' + vm.paging.current);
            // TODO : Load current page Data here
            vm.currentPage = vm.paging.current;
        }

        vm.getWorkflowList = function (isMainPage) {
            $scope.loading = true;
            WorkflowService.getWorkflowList(isMainPage).then(
                function (response) {
                    $scope.loading = false;
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        vm.workflows = response.data;

                        for (var i = 0; i < vm.workflows.length; i++) {
                            var modifyTime = '';
                            var dateString = vm.workflows[i].modifyDt.substring(0, 16);
                            var dateString = dateString.replace(/-/g, '/');
                            var dateObj = new Date(dateString);
                            // var momentObj = moment(dateObj);
                            // modifyTime = momentObj.format("MM/DD/YYYY hh:mm A");
                            // var newDate = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60 * 1000);
                            // var offset = dateObj.getTimezoneOffset();
                            // var hours = dateObj.getHours() * 60;
                            // var minutes = dateObj.getMinutes();
                            // newDate.setHours((hours + minutes - offset) / 60);
                            var newDate = moment.utc(dateString).local().format();
                            vm.workflows[i].modifyDateFormat = newDate;
                            vm.workflows[i].modifyDate = dateObj;
                        }
                        // console.log(vm.workflows);
                        // apply pagination
                        // 14-Mar CHANDRA - Seperated pagination to a function
                        $scope.pagination(vm.workflows);

                    }
                },
                function (err) {
                    $scope.loading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG246);
                }
            )
        }
        // getWorkflowList();

        $scope.wf_name_short = function (name) {
            if (name.length > 15) {
                name = name.substr(0, 14) + "...";
            }
            return name;
        }

        $scope.pagination = function (itemList) {
            if (!itemList) return false;
            // console.log("Workflows count: ", itemList.length);

            vm.paging = {
                total: Math.ceil(itemList.length / $scope.workFlowsPerPage),
                current: 1,
                onPageChanged: loadPages
            };

            if (itemList.length < $scope.itemsPerRow) {
                $scope.layoutAlign = "start start";
            } else if ((itemList.length % $scope.itemsPerRow) == 0) {
                $scope.layoutAlign = "space-around start";
            } else if ((itemList.length % $scope.itemsPerRow) != 0) {
                $scope.layoutAlign = "start start";
            }

            return vm.paging.total;
        }

        $scope.totalPages = function (count) {
            return Math.ceil(count / $scope.workFlowsPerPage);
        }

        vm.showDeleteConfirm = function (ev, id, workflowName) {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                locals: { itemName: workflowName, itemType: 'Workflow' },
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
        }

        $scope.closeDeleteModal = function () {
            $mdDialog.hide();
        }

        $scope.deleteItem = function (workflowid) {
            WorkflowService.delWorkflow(workflowid).then(
                function (response) {
                    $scope.closeDeleteModal();
                    vm.getWorkflowList();
                    ToastrService.success(response.data.message);
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG247);
                }
            )
        }

        $scope.step_or_steps = function (stepCount) {
            return ((stepCount == 1) ? 'Step' : 'Steps')
        }

        $scope.browserType = function () {
            if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {

            }
            else if (navigator.userAgent.indexOf("Chrome") != -1) {
                if (navigator.userAgent.indexOf("Chrome/48") != -1) {
                    vm.heightPagingForChromeLowVersion = '40px';
                    vm.heightForChromeLowVersion = ($(document).height() - 150) + 'px';
                }
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                if (navigator.userAgent.indexOf("Version/10") != -1) {
                    vm.heightPagingForChromeLowVersion = '40px';
                    vm.heightForChromeLowVersion = ($(document).height() - 150) + 'px';
                }
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {

            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10

            }
            else {

            }
        }
        $scope.browserType();

    }
})();