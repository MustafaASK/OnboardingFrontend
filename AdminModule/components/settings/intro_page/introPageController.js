(function () {
    'use strict';
    hrAdminApp.controller('IntroPageController', introPageController);
    introPageController.$inject = ['$rootScope', '$state', '$scope', '$mdDialog', '$stateParams', 'ToastrService', 'IntroPageService', '$filter'];
    function introPageController($rootScope, $state, $scope, $mdDialog, $stateParams, ToastrService, IntroPageService, $filter) {

        var vm = this;
        // vm.showDeleteConfirm = showDeleteConfirm;
        vm.uploadsUrl = $rootScope.UploadsURL;
        // vm.closeDeleteModal = closeDeleteModal;
        //vm.deleteIntroPage = deleteIntroPage;
        vm.currentPage = 0;
        vm.pageSearch = false;
        $scope.introPagesPerPage = 20;
        $scope.itemsPerRow = 4;
        $scope.cardWidth = 2.7 + 'in';
        $scope.loading = true;
        if (!$rootScope.UserInfo.isAdmin) {
            $scope.$parent.currentNavItem = 3;
        } else {
            $scope.$parent.currentNavItem = 5;
        }

        if (screen.width == 1024) {
            $scope.itemsPerRow = 3;
            $scope.introPagesPerPage = 18;
            $scope.cardWidth = 2.4 + 'in';
        }

        vm.searchPagesBy = function () {
            vm.searchby = vm.filterby;
            var filteredList = $filter('filter')(vm.clientsIntroList.clientIntroduction, { clientName: vm.searchby });
            // console.log("Filtered count: ", filteredList.length);
            $scope.pagination(filteredList);

        }

        vm.pageSearchBoxDisplay = function () {
            vm.pageSearch = (!vm.pageSearch ? true : false);
            var searchBox = document.getElementById('search-box');
            if (searchBox) {
                window.setTimeout(function () {
                    searchBox.focus();
                }, 0);
            }
        }

        vm.filters = [
            { key: 'clientName', value: 'Client' },
            { key: 'creationdate', value: 'Creation Date' }
        ]

        function loadPages() {
            // console.log('Current page is : ' + vm.paging.current);
            // TODO : Load current page Data here
            vm.currentPage = vm.paging.current;
        }

        $scope.client_name_truncate = function (clientName) {
            if (clientName.length > 16) {
                return clientName.slice(0, 15) + " ...";
            }
            return clientName;
        }

        function getClientsIntroPagesList() {
            $scope.loading = true;
            IntroPageService.getClientsIntroList().then(
                function (response) {
                    $scope.loading = false;
                    vm.clientsIntroList = response.data;
                    for (var i = 0; i < vm.clientsIntroList.clientIntroduction.length; i++) {
                        var createdTime = '';
                        var dateString = vm.clientsIntroList.clientIntroduction[i].modifyDt.substring(0, 16);
                        dateString = dateString.replace(/-/g, '/');
                        var dateObj = new Date(dateString);
                        // var momentObj = moment(dateObj);
                        // createdTime = momentObj.format("MM/DD/YYYY  hh:mm A");
                        // var newDate = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60 * 1000);
                        // var offset = dateObj.getTimezoneOffset();
                        // var hours = dateObj.getHours() * 60;
                        // var minutes = dateObj.getMinutes();
                        // newDate.setHours((hours + minutes - offset) / 60);
                        var newDate = moment.utc(dateString).local().format();
                        vm.clientsIntroList.clientIntroduction[i].modifyDateFormat = newDate;
                        vm.clientsIntroList.clientIntroduction[i].createdDate = dateObj;
                    }

                    $scope.pagination(vm.clientsIntroList.clientIntroduction);
                    // vm.paging = {
                    //     total: Math.ceil(vm.clientsIntroList.clientIntroduction.length / 20),
                    //     current: 1,
                    //     onPageChanged: loadPages
                    // };
                    // if (vm.clientsIntroList.clientIntroduction.length < $scope.itemsPerRow) {
                    //     $scope.layoutAlign = "start start";
                    // } else if ((vm.clientsIntroList.clientIntroduction.length % $scope.itemsPerRow) == 0) {
                    //     $scope.layoutAlign = "space-around start";
                    // } else if ((vm.clientsIntroList.clientIntroduction.length % $scope.itemsPerRow) != 0) {
                    //     $scope.layoutAlign = "start start";
                    // }
                },
                function (err) {
                    $scope.loading = false;
                    ToastrService.error('An error occurred while retrieving Client Intro Page');
                }
            )
        }
        getClientsIntroPagesList();

        $scope.pagination = function (itemList) {
            if (!itemList) return false;

            vm.paging = {
                total: Math.ceil(itemList.length / $scope.introPagesPerPage),
                current: 1,
                onPageChanged: loadPages
            };

            if (itemList.length < $scope.itemsPerRow) {
                $scope.layoutAlign = "start start";
            } else if ((itemList.length % $scope.itemsPerRow) == 0) {
                // $scope.layoutAlign = "space-around start";
                $scope.layoutAlign = "start center";
            } else if ((itemList.length % $scope.itemsPerRow) != 0) {
                $scope.layoutAlign = "start start";
            }

            return vm.paging.total;
        }

        $scope.totalPages = function (count) {
            return Math.ceil(count / $scope.introPagesPerPage);
        }

        vm.showDeleteConfirm = function (ev, id, itemName) {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                locals: { itemName: itemName, itemType: 'IntroPage' },
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

        $scope.deleteItem = function (id) {
            IntroPageService.deleteClientIntroPage(id).then(
                function (response) {
                    ToastrService.success(response.data.message);
                    getClientsIntroPagesList();
                    $scope.closeDeleteModal();
                },
                function (err) {
                    ToastrService.error('ERROR: Could not delete Intro Page.');
                }
            )
        }

    }
})();