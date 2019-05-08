(function () {
    'use strict';
    hrAdminApp.controller('EmailTemplateListController', emailTemplateListController);
    emailTemplateListController.$inject = ['$rootScope', '$state', '$stateParams', '$scope', '$filter', '$mdDialog', 'ToastrService', 'EmailTemplateService'];
    function emailTemplateListController($rootScope, $state, $stateParams, $scope, $filter, $mdDialog, ToastrService, EmailTemplateService) {

        var vm = this;
        $scope.emailTemplatesPerPage = 20;
        $scope.itemsPerRow = 4;
        vm.showDeleteConfirm = showDeleteConfirm;
        vm.templateSearch = false;
        $scope.cardWidth = '2.5in';
        if (!$rootScope.UserInfo.isAdmin) {
            $scope.$parent.currentNavItem = 2;
        } else {
            $scope.$parent.currentNavItem = 4;
        }

        if (screen.width == 1024) {
            $scope.cardWidth = '2.4in';
            $scope.itemsPerRow = 3;
            $scope.emailTemplatesPerPage = 18;
        }



        $scope.reverse = false;
        $scope.filteredItems = [];
        $scope.groupedItems = [];
        $scope.itemsPerPage = 20;
        $scope.pagedItems = [];
        $scope.currentPage = 0;
        $scope.loading = true;


        var searchMatch = function (haystack, needle) {
            if (!needle) {
                return true;
            }
            if (typeof haystack === 'string') {
                return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;

            }
            return true;
        };

        // init the filtered items
        $scope.sorttype = 'modifiedDt';
        $scope.search = function () {
            vm.query = vm.searchquery;
            $scope.filteredItems = $filter('filter')(vm.emailTemplatesList, function (item) {
                //for(var attr in item) {
                if (searchMatch(item['templatename'], vm.query))
                    return true;
                //}
                return false;
            });
            // take care of the sorting order
            $scope.pagination($scope.filteredItems);
            $scope.currentPage = 0;
            vm.paging.current = 1;
            if (vm.query) {
                $scope.filteredItems = $filter('orderBy')($scope.filteredItems, '-templatename', true);
                //$scope.sorttype='foldername';

            } else {
                $scope.filteredItems = $filter('orderBy')($scope.filteredItems, 'modifydt', true);
                //$scope.sorttype='modifiedDt';
            }

            // now group by pages
            $scope.groupToPages();
        };

        // calculate page in place
        $scope.groupToPages = function () {
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }
            // update_sidenav_card($scope.pagedItems[$scope.currentPage][0].docid);
        };

        $scope.range = function (start, end) {
            var ret = [];
            if (!end) {
                end = start;
                start = 0;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }
            return ret;
        };

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;
            }
        };

        $scope.setPage = function () {
            $scope.currentPage = this.n;
        };


        vm.emailTemplatesSearchBoxDisplay = function () {
            vm.templateSearch = (!vm.templateSearch ? true : false);
            var searchBox = document.getElementById('search-box');
            if (searchBox) {
                window.setTimeout(function () {
                    searchBox.focus();
                }, 0);
            }
        }

        vm.filterEmailTemplatesBy = function () {
            vm.searchby = vm.filterby;
            var filteredList = $filter('filter')(vm.emailTemplatesList, { templatename: vm.searchby });
            $scope.pagination(filteredList);
        }

        function loadPages() {
            // console.log('Current page is : ' + vm.paging.current);
            // TODO : Load current page Data here
            vm.currentPage = vm.paging.current;
            $scope.currentPage = vm.paging.current;
        }


        function getEmailTemplatesList() {
            $scope.loading = true;
            EmailTemplateService.getEmailTemplateList(true).then(
                function (response) {
                    $scope.loading = false;
                    if (response.data.Error) {
                        // console.log(response.data.message);
                        vm.emailTemplatesList = [];
                        // ToastrService.error(response.data.message)
                    } else {
                        vm.emailTemplatesList = response.data;
                        if (!vm.emailTemplatesList) {
                            vm.emailTemplatesList = [];
                            // ToastrService.warning('WARNING: No email templates are found.');
                            return;
                        }
                        // console.log(vm.emailTemplatesList);
                        for (var i = 0; i < vm.emailTemplatesList.length; i++) {
                            var transformModifyDt = vm.emailTemplatesList[i].modifydt.substring(0, 16);
                            transformModifyDt = transformModifyDt.replace(/-/g, '/');
                            vm.emailTemplatesList[i].modifyDate = new Date(transformModifyDt);
                            // var newDate = new Date(vm.emailTemplatesList[i].modifyDate.getTime() + vm.emailTemplatesList[i].modifyDate.getTimezoneOffset() * 60 * 1000);
                            // var offset = vm.emailTemplatesList[i].modifyDate.getTimezoneOffset();
                            // var hours = vm.emailTemplatesList[i].modifyDate.getHours() * 60;
                            // var minutes = vm.emailTemplatesList[i].modifyDate.getMinutes();
                            // newDate.setHours((hours + minutes - offset) / 60);
                            var newDate = moment.utc(transformModifyDt).local().format();
                            vm.emailTemplatesList[i].modifyDateFormat = newDate;
                        }

                        //$scope.pagination(vm.emailTemplatesList);
                        $scope.search();

                        // vm.paging = {
                        //     total: Math.ceil(vm.emailTemplatesList.length / $scope.emailTemplatesPerPage),
                        //     current: 1,
                        //     onPageChanged: loadPages,
                        // };

                        // if (vm.emailTemplatesList.length < $scope.itemsPerRow) {
                        //     $scope.layoutAlign = "start start";
                        // } else if ((vm.emailTemplatesList.length % $scope.itemsPerRow) == 0) {
                        //     $scope.layoutAlign = "space-around start";
                        // } else if ((vm.emailTemplatesList.length % $scope.itemsPerRow) != 0) {
                        //     $scope.layoutAlign = "start start";
                        // }

                    }
                },
                function (err) {
                    $scope.loading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG214);
                }
            )
        }
        getEmailTemplatesList();

        $scope.pagination = function (itemList) {
            if (!itemList) return false;

            vm.paging = {
                total: Math.ceil(itemList.length / $scope.emailTemplatesPerPage),
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
            return Math.ceil(count / $scope.emailTemplatesPerPage);
        }


        $scope.dateTruncate = function (dateStr) {
            // var temp = $filter('date')(new Date(dateStr.split('-').join('/')), "MM/dd/yyyy ' ' h:mm a");
            // return temp;
            var createdTime = '';
            // var dateString = dateStr.split('-').join('/');
            var dateObj = new Date(dateStr);
            var momentObj = moment(dateObj, "MM/DD/YYYY hh:mm A");
            createdTime = momentObj.format("MM/DD/YYYY hh:mm A");
            return createdTime;
        }

        $scope.template_name_truncate = function (templateName) {
            if (templateName.length > 16) {
                return templateName.slice(0, 15) + " ...";
            }
            return templateName;
        }


        function showDeleteConfirm(ev, id, templateName) {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                locals: { itemName: templateName, itemType: 'Template' },
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
            // $mdDialog.show({
            //     scope: $scope,
            //     preserveScope: true,
            //     template: '<md-dialog aria-label="Delete" style="width:400px;">' +
            //               '<div layout="column" layout-align="start end" style="padding:10px;">'+
            //               '<ng-md-icon icon="clear" size="14" style="margin-top:8px;cursor:pointer" ng-click="vm.closeDeleteModal()">'+
            //               '</ng-md-icon>'+
            //               '</div>'+
            //               '<md-content style="background-color:white">' +
            //               '<div layout="column" layout-align="center center"><img src="images/que_icon.png"/></div>'+
            //               '<p align=center style="padding:10px 10px 20px 20px;font-size:13px;" >Are you sure you want to delete the email template - ' + templateName + '?</p>' +
            //               '<md-divider></md-divider>'+
            //               '<div layout="row" layout-align="end center" style="background-color:rgb(250,250,250);height:60px;padding:10px" flex>' +
            //               '<md-button class="md-raised md-primary" ng-click="vm.deleteTemplate(' + id + ')" >OK</md-button>' +
            //               '<md-button class="md-secondary" ng-click="vm.closeDeleteModal()">Cancel</md-button>' +
            //               '</div>' +
            //               '</md-content>' +
            //               '</md-dialog>'
            // });
        }

        $scope.closeDeleteModal = function () {
            $mdDialog.hide();
        }

        $scope.deleteItem = function (templateid) {
            EmailTemplateService.deleteEmailTemplate(templateid).then(
                function (response) {
                    ToastrService.success(response.data.message);
                    getEmailTemplatesList();
                    $scope.closeDeleteModal();
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG215);
                }
            )
        }
    }
})();