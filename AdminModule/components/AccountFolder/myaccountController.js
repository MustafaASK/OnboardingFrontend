/*(function () {
    'use strict';
    hrAdminApp.controller('myAccountController', myAccountController);
    myAccountController.$inject = [ '$scope','$rootScope','$state','$stateParams', '$location', 'ToastrService','CandidateUsersService', '$mdDialog', '$filter', '$timeout'];
    function myAccountController( $scope,$rootScope,$state,$stateParams, $location, ToastrService,CandidateUsersService, $mdDialog, $filter, $timeout) {
        var vm = this;
        vm.hide = hide;
        vm.cancel = cancel;
        vm.answer = answer;
        vm.getClientsList = getClientsList;
        vm.getPermissionsList = getPermissionsList;
        vm.getUserInfo = getUserInfo;
        vm.getClientName = getClientName;
        vm.getPermissionName = getPermissionName;
        vm.updateHrUser = updateHrUser;
        vm.noChangesError = false;

        vm.changePwdVisibility = false;
        $scope.fileThumb = '';

        
    var random = (new Date()).toString();
			
        function search(id, myArray){
            for (var i=0; i < myArray.length; i++) {
                if (myArray[i].clientId == id) {
                    return myArray[i];
                }
            }
        };

        function updateHrUser(valid){
            if(!valid){
                ToastrService.error('Fill all the mandatory fields');
                return false;
            }
            if(!$scope.myAccountForm.$dirty){
                vm.noChangesError = true;
                $timeout(function() {
                    vm.noChangesError = false;
                 }, 4000);
                return false;
            }
            
            var myAccountForm = document.getElementById('myAccountForm');
            var frmData = new FormData();

            frmData.append('userId', vm.userInfo.userId);
            if (vm.userInfo.firstName) frmData.append('firstName', vm.userInfo.firstName);
            if ($scope.fileThumb && (typeof $scope.fileThumb === 'object')) frmData.append('profile', $scope.fileThumb);
            var str = null;
            if ($scope.fileThumb && (typeof $scope.fileThumb === 'string')){
                str = $scope.fileThumb.split('/');
                str = str[str.length - 1];
            } 
            frmData.append('formmodified', $scope.myAccountForm.$dirty);
            
            frmData.append('profilepicpath', str);
            if (vm.userInfo.lastName) frmData.append('lastName', vm.userInfo.lastName);
            if (vm.userInfo.emailId) frmData.append('emailId', vm.userInfo.emailId);
            if (vm.userInfo.phoneNo) frmData.append('phoneNo', vm.userInfo.phoneNo);
            if (vm.userInfo.password) frmData.append('password', vm.userInfo.password);
            
            MyAccountService.updateHrUser(frmData).then(
                function (response) {                    
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                    if (!response.data.Error) {
                        ToastrService.success(response.data.message);
                        vm.answer();
                    }
                },
                function (err) {
                    ToastrService.error('An error occurred while Updating');
                }
            )            
        }
        
        function getClientName(clientId){
            clientId = clientId.trim();
            var resultObject = search(clientId, vm.clientsList);
            return resultObject ? resultObject.clientName : '';
        };
        
        function getPermissionName(permissionid){
            if(permissionid){
                var ary = $filter('filter')(vm.permissionsList, {'permissionid':permissionid}) 
                return ((ary.length) ? ary[0].name : '');
            }
            
        };
        
        function getPermissionsList(){
            MyAccountService.getPermissionsList().then(
                function (response) {
                    vm.permissionsList = response.data;
                    vm.getUserInfo();
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }

        function getClientsList(){
            MyAccountService.getClientsList().then(
                function (response) {
                    vm.clientsList = response.data;
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }
        
        function getUserInfo(){
            MyAccountService.getUserInfo($rootScope.UserInfo.ID).then(
                function (response) {
                    vm.userInfo = response.data;
                    var userClients = vm.userInfo.clients;
                    userClients = userClients.slice(1, userClients.length - 1);
                    vm.clients = userClients.split(',');
                    var rand = (Math.random() * 1000) + 1;
                    $scope.fileup =  vm.userInfo.profilepic + '?lastmod=' + rand;
                    $scope.fileThumb = vm.userInfo.profilepic + '?lastmod=' + rand;
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }        

        
        function hide(ev) {
            $mdDialog.hide();
        }

        function cancel(ev) {
            $scope.fileThumb = '';
            $mdDialog.cancel();
        }

        function answer(ev, answer) {
            $mdDialog.hide(answer);
        }

        function init(){
            vm.getClientsList();
            vm.getPermissionsList();
        }
        init();

        
        $scope.fileup = '';

        $scope.$watch('fileup', function(newval, oldval){
            
            var fileImg = newval;
            if(fileImg && typeof fileImg === 'object'){
                vm.filesizeerror = false;
                vm.filetypeerror = false;
                if(fileImg.type === 'image/jpeg' || fileImg.type === 'image/jpg' || fileImg.type === 'image/png' || fileImg.type === 'image/gif'){
                  var filesize = fileImg.size / 1024;
                  if((fileImg.size / 1024) > 300){
                    vm.filesizeerror = true;
                    $scope.fileup = '';
                  }
                } else {
                  vm.filetypeerror = true;
                  $scope.fileup = '';
                }
                if(!vm.filesizeerror && !vm.filetypeerror && newval){
                    $scope.fileThumb = newval;
                }
            }
        });






    }
})();*/