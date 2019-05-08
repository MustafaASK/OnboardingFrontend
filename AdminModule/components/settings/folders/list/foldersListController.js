(function () {
    'use strict';
    hrAdminApp.controller('FoldersListController', foldersListController);
    foldersListController.$inject = ['$rootScope', '$scope', '$state', '$filter', '$stateParams', '$mdDialog', 'ToastrService', 'FoldersService'];
    function foldersListController($rootScope, $scope, $state, $filter, $stateParams, $mdDialog, ToastrService, FoldersService) {

        var vm = this;
        
        vm.browserUsed = 'Chrome';
        vm.showDeleteConfirm = showDeleteConfirm;
        vm.currentPage = 0;
        $scope.foldersPerPage = 20;
        $scope.itemsPerRow = 4;
        vm.folderSearch = false;
        vm.docSearch = false;
        if(!$rootScope.UserInfo.isAdmin){
            $scope.$parent.currentNavItem = 1;
        } else {
            $scope.$parent.currentNavItem = 3;
        }

        $scope.reverse = false;
        $scope.filteredItems = [];
        $scope.groupedItems = [];
        $scope.itemsPerPage = 20;
        $scope.pagedItems = [];
        $scope.currentPage = 0;   
        $scope.loading = true;

        
        vm.rolesData = {};
        
        if(!$rootScope.UserInfo.isAdmin){
            var roles = $rootScope.UserInfo.roles;
            if(roles.length){
                var rolesData = $filter('filter')(roles, {role:"Folders"});
                if(rolesData.length){
                    vm.rolesData = rolesData[0];
                }

                
            }
        }

        if (screen.width == 1024) {
            $scope.itemsPerRow = 3;
            $scope.foldersPerPage = 18;
        } 

        vm.folderSearchBoxDisplay = function () {
            vm.folderSearch = (!vm.folderSearch ? true : false);
            var searchBox = document.getElementById('search-box');
            if (searchBox) {
                window.setTimeout(function () {
                    searchBox.focus();
                }, 0);
            }            
        }

        $scope.short_folder_name = function(folderName) {
            if (folderName.length > 11) {
                return folderName.substring(0,10) + '...';
            }
            return folderName;
        }

        vm.filterFoldersBy = function () {
            vm.searchby = vm.filterby;
            var filteredList = $filter('filter')(vm.foldersList,{foldername : vm.searchby});
            // console.log("Filtered count: ", filteredList.length);
            $scope.pagination(filteredList);
        }

        function loadPages() {
            // console.log('Current page is : ' + vm.paging.current);
            // TODO : Load current page Data here
            vm.currentPage = vm.paging.current;
            $scope.currentPage = vm.paging.current;
        } 

        function getFoldersList() {
            $scope.loading = true;
            FoldersService.getFoldersList(true).then(
                function (response) {
                    $scope.loading = false;
                    if (response.data.Error) {
                        ToastrService.error(response.data.message)
                    } else {
                        vm.foldersList = response.data;
                        if (!vm.foldersList) {
                            // ToastrService.warning('WARNING: No folders are found.');
                            return;
                        }
                        vm.foldersList.shift();
                        // Issue #202 - 22-Mar CHANDRA - doing the orderBy here because of 
                        // complication in API
                        vm.foldersList = $filter('orderBy')(vm.foldersList, 'modifiedDt', true);
                        // console.log(vm.foldersList);
                        $scope.search();
                    }
                },
                function (err) {
                    $scope.loading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG219);
                }
            )
        }
        // Uncomment the below line to use $http service to get the folders data
        getFoldersList();

        $scope.pagination = function(itemList) {
            if (!itemList) return false;
            
            vm.paging = {
                total: Math.ceil(itemList.length / $scope.foldersPerPage),
                current: 1,
                onPageChanged: loadPages
            };

            
        $scope.currentPage = 0;
        $scope.layoutAlign = "start start";
            // if (itemList.length < $scope.itemsPerRow) {
            //     $scope.layoutAlign = "start start";
            // } else if ((itemList.length % $scope.itemsPerRow) == 0) {
            //     $scope.layoutAlign = "space-around start";
            // } else if ((itemList.length % $scope.itemsPerRow) != 0) {
            //     $scope.layoutAlign = "start start";
            // }
            return vm.paging.total;
        }

        $scope.totalPages = function (count) {
            return Math.ceil(count / $scope.foldersPerPage);
        }

        function showDeleteConfirm(ev, id, folderName) {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                locals: {itemName: folderName, itemType: 'Folder'},
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

        $scope.closeDeleteModal = function (){
            $mdDialog.hide();
        }
        
        $scope.deleteItem = function (folderid) {
            FoldersService.deleteFolder(folderid).then(
                function (response) {
                    ToastrService.success(response.data.message);
                    getFoldersList();
                    $scope.closeDeleteModal();
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG199);
                }
            )
        }

        // Browser detecction
        $scope.browserType = function () { 
            if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
                vm.browserUsed = 'Opera';
                vm.folderDocsTxtClass = 'folderDocsTxt';
            }
            else if(navigator.userAgent.indexOf("Chrome") != -1 ) {
                vm.browserUsed = 'Chrome';
                vm.folderDocsTxtClass = 'folderDocsTxt';
            }
            else if(navigator.userAgent.indexOf("Safari") != -1) {
                vm.browserUsed = 'Safari';
                vm.folderDocsTxtClass = 'folderDocsTxt';
                $scope.foldersPerPage = 20;
                $scope.layoutAlign = 'start start';
            }
            else if(navigator.userAgent.indexOf("Firefox") != -1 ) {
                vm.browserUsed = 'Firefox';
                vm.folderDocsTxtClass = 'folderDocsTxt-FF';
            }
            else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) { //IF IE > 10
                vm.browserUsed = 'IE'; 
                vm.folderDocsTxtClass = 'folderDocsTxt-IE';
            }  
            else {
                vm.browserUsed = 'Unknown';
                vm.folderDocsTxtClass = 'folderDocsTxt';
            }
        }
        $scope.browserType();
        
        $scope.one_or_more = function (count) {
            return (count == 1 ? 'Document' : 'Documents');
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
        $scope.filteredItems = $filter('filter')(vm.foldersList, function (item) {
            //for(var attr in item) {
                if (searchMatch(item['foldername'], vm.query))
                    return true;
            //}
            return false;
        });
        // take care of the sorting order
        $scope.pagination($scope.filteredItems);
        $scope.currentPage = 0;
        vm.paging.current = 1;
        if(vm.query){
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, '-foldername', true);
            //$scope.sorttype='foldername';

        }else {            
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, 'modifiedDt', true);
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

    // functions have been describe process the data for display
    //$scope.search();

    // change sorting order


    }
})();