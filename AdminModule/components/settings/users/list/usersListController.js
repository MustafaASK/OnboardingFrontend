(function () {
    'use strict';
    hrAdminApp.controller('UsersListController', usersListController);
    usersListController.$inject = ['$rootScope', '$scope', '$state', '$filter', '$stateParams', '$mdDialog', 'ToastrService', 'HrUsersService'];
    function usersListController($rootScope, $scope, $state, $filter, $stateParams, $mdDialog, ToastrService, HrUsersService) {

        var vm = this;
        //vm.deleteHrUser = deleteHrUser;
        vm.getClientNames = getClientNamesFromArray;
        vm.getClientNamesShort = getClientNamesFromArrayInShort;
        // vm.showDeleteConfirm = showDeleteConfirm;
        // vm.closeDeleteModal = closeDeleteModal;
        
        $scope.$parent.currentNavItem = 1;
        vm.usersSearch = false;
        vm.filterby = '';
        vm.filterKey = '';
        vm.currentPage = 0;
        $scope.usersPerPage = 20;
        $scope.itemsPerRow = 4;
        $scope.noClients = '<<no clients>>';
        
        $scope.reverse = false;
        $scope.filteredItems = [];
        $scope.groupedItems = [];
        $scope.itemsPerPage = 20;
        $scope.pagedItems = [];
        $scope.currentPage = 0;

        $scope.loading = true;
        if (screen.width == 1024) {
            $scope.itemsPerRow = 3;
            $scope.usersPerPage = 18;
            $scope.itemsPerPage = 18;
        }   


        
                var searchMatch = function (haystack, needle) {
                    if (!needle) {
                        return true;
                    }
                    if(typeof haystack === 'string'){
                        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        
                    }
                    return true;
                };
        
                // init the filtered items
                $scope.sorttype='modifiedDt';
                $scope.search = function () {
                    $scope.filteredItems = $filter('filter')(vm.hrUsers.users, function (item) {
                        //for(var attr in item) {
                            if (searchMatch(item['emailId'], vm.query) || searchMatch(item['firstname'], vm.query) || searchMatch(item['lastname'], vm.query))
                                return true;
                        //}
                        return false;
                    });
                    // take care of the sorting order
                    $scope.pagination($scope.filteredItems);
                    $scope.currentPage = 0;
                    vm.paging.current = 1;
                    // Commented on 02-Nov-2k18 as it has just if condition with no statements to evaluate.
                    // if(vm.query){
                    //     //$scope.filteredItems = $filter('orderBy')($scope.filteredItems, '-emailId', true);
                    //     //$scope.sorttype='foldername';
        
                    // }else {            
                    //     //$scope.filteredItems = $filter('orderBy')($scope.filteredItems, 'modifydt', true);
                    //     //$scope.sorttype='modifiedDt';
                    // }
                    
                    // now group by pages
                    $scope.groupToPages();
                };
                
                // calculate page in place
                $scope.groupToPages = function () {
                    $scope.pagedItems = [];
                    
                    for (var i = 0; i < $scope.filteredItems.length; i++) {
                        if (i % $scope.itemsPerPage === 0) {
                            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
                        } else {
                            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                        }
                    }
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
                
                

        vm.usersSearchBoxDisplay = function () {
            vm.usersSearch = (vm.usersSearch ? false : true);
            var searchBox = document.getElementById('search-box');
            if (searchBox) {
                window.setTimeout(function () {
                    searchBox.focus();
                }, 0);
            }

        }

        vm.filters = [
            { key: 'nickname', value: 'Nickname' },
            { key: 'firstname', value: 'First Name' },
            { key: 'lastname', value: 'Last Name' },
            { key: 'client', value: 'Client' },
            { key: 'createddate', value: 'Created Date' },
            { key: 'modifieddate', value: 'Modified Date' }
        ]

        // display profile pic in users
        vm.get_profile_pic = function (file) {
            return $rootScope.ProfilePicURL + file;
        }

        vm.get_pic_or_nickname = function (userid) {
            for (var i = 0; i < vm.hrUsers.users.length; i++) {
                if (vm.hrUsers.users[i].userId == userid) {
                    if (!vm.hrUsers.users[i].profilepic) {
                        return vm.hrUsers.users[i].nickname.toUpperCase();
                    } else {
                        var profilepic = document.getElementById('div-' + userid);
                        profilepic.style.backgroundPosition = "center center"
                        profilepic.style.backgroundRepeat = 'no-repeat';
                        profilepic.style.backgroundSize = 'cover';
                        profilepic.style.backgroundImage = "url(" + $rootScope.ProfilePicURL + vm.hrUsers.users[i].profilepic + ")";
                    }
                }
            }
        }

        function loadPages() {
            // console.log('Current page is : ' + vm.paging.current);
            // TODO : Load current page Data here
            vm.currentPage = vm.paging.current;
            $scope.currentPage = vm.paging.current;
        }

        function getHrUsersList() {
            HrUsersService.hrUsers(true).then(
                function (response) {
                    $scope.loading = false;
                    vm.hrUsers = response.data;

                    //$scope.pagination(vm.hrUsers.users);

                    
                    // Issue #202 - 22-Mar CHANDRA - doing the orderBy here because of 
                    // complication in API
                    //vm.hrUsers.users = $filter('orderBy')(vm.hrUsers.users, 'modifieddate', true);
                    
                    $scope.search();

                    // vm.paging = {
                    //     total: Math.ceil(vm.hrUsers.users.length / $scope.usersPerPage),
                    //     current: 1,
                    //     onPageChanged: loadPages,
                    // };
                    // if (vm.hrUsers.users.length < $scope.itemsPerRow) {
                    //     $scope.layoutAlign = "start start";
                    // } else if ((vm.hrUsers.users.length % $scope.itemsPerRow) == 0) {
                    //     $scope.layoutAlign = "space-around start";
                    // } else if ((vm.hrUsers.users.length % $scope.itemsPerRow) != 0) {
                    //     $scope.layoutAlign = "start start";
                    // }
                },
                function (err) {
                    $scope.loading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG162);
                }
            )
        }

        $scope.pagination = function(itemList) {
            if (!itemList) return false;

            vm.paging = {
                total: Math.ceil(itemList.length / $scope.usersPerPage),
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
            return Math.ceil(count / $scope.usersPerPage);
        }
        
        vm.searchUsersBy = function () {
            vm.searchby = vm.filterby;
            var filteredUsers = $filter('filter')(vm.hrUsers.users, {emailId : vm.searchby});
            $scope.pagination(filteredUsers);
        }

        function getClientsData() {
            HrUsersService.clients().then(
                function (response) {
                    vm.hrClientsData = response.data;
                    getHrUsersList();
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG161);
                }
            )
        }
        getClientsData();

        // Convert client Id to client name
        // input -> "[1,2]"
        function getClientNamesFromArray(strArray) {
            var clientNames = '';
            if(strArray){
                var clientIdArray = JSON.parse(strArray);
                for (var i = 0; i < clientIdArray.length; i++) {
                    var clientName = getClientNameFromId(clientIdArray[i], vm.hrClientsData);
                    if (clientName) {
                        if (clientNames)
                            clientNames += ', ';
                        clientNames += clientName;
                    } 
                }
            }
            return clientNames;
        }

        function getClientNamesFromArrayInShort(strArray) {
            var clientIdArray = JSON.parse(strArray);
            var clientNames = '';

            for (var i = 0; i < clientIdArray.length; i++) {
                var clientName = getClientNameFromId(clientIdArray[i], vm.hrClientsData);
                if (clientName) {
                    if (clientNames)
                        clientNames += ', ';
                    clientNames += clientName;
                }
            }
            if (clientNames.length > 16) {
                return clientNames.slice(0, 16) + " ...";
            } else {
                if (!clientNames)
                    return 'Clients Not Assigned';
                else
                    return clientNames;
            }
        }

        // function to return client name when client id is given
        function getClientNameFromId(clientid, clientsData) {
           // console.log(clientsData);
            for (var i = 0; i < clientsData.length; i++) {
                if (clientsData[i].clientId == clientid) {
                    return clientsData[i].clientName;
                }
            }
            return false;
        }

        function getPermissionsMasterList() {
            HrUsersService.permissionsMasterList().then(
                function (response) {
                    vm.permissionsMasterList = response.data;
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG222);
                }
            )
        }
        getPermissionsMasterList();

        vm.showDeleteConfirm=function(ev, id, itemName) {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                locals: { itemName: itemName, itemType: 'User' },
                templateUrl: $rootScope.rootUrl + '/components/common/deleteDialog.html',
                controller:  ['$scope', 'itemType', 'itemName', function ($scope, itemType, itemName) {
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

        $scope.deleteItem = function (userid) {
            $scope.loading = true;
            HrUsersService.deleteHrUser(userid).then(
                function (response) {
                    $scope.loading = false;
                    ToastrService.success(response.data.message);
                    getHrUsersList();
                    $scope.closeDeleteModal();
                },
                function (err) {
                    $scope.loading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG226);
                }
            )
        }


    }
})();