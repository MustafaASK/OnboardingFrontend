(function () {
    'use strict';
    hrAdminApp.controller('MyAccountController', MyAccountController);
    MyAccountController.$inject = [ '$scope','$rootScope', '$location', 'ToastrService','MyAccountService', '$mdDialog', '$filter', '$timeout', '$state'];
    function MyAccountController( $scope,$rootScope, $location, ToastrService,MyAccountService, $mdDialog, $filter, $timeout, $state) {


        var vm = this;
        // vm.hide = hide;
        // vm.cancel = cancel;
        // vm.answer = answer;
        vm.getClientsList = getClientsList;
        vm.getPermissionsList = getPermissionsList;
        vm.getUserInfo = getUserInfo;
        vm.getClientName = getClientName;
        vm.getPermissionName = getPermissionName;
        vm.updateHrUser = updateHrUser;
        vm.noChangesError = false;

        vm.changePwdVisibility = false;
        $scope.fileThumb = '';
        $scope.proImage = '';
        $scope.submitted = false;
        

        
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
                ToastrService.error($rootScope.errorMsgs.MSG127);
                return false;
            }
            $scope.submitted = true;
            if(!vm.changePwdVisibility){
                vm.userInfo.password = "";
                vm.userInfo.confirmPassword ="";
            }
            if(vm.userInfo.password != undefined && vm.userInfo.password != ""){
                $mdDialog.show({
                    multiple: true,
                    scope: $scope,
                    preserveScope: true,
                    controller: ['$scope', '$mdDialog', function($scope, $mdDialog){
                        $scope.hideModal = function(){
                            $mdDialog.hide();
                            $scope.submitted = false;
                            return;
                        }
                        $scope.ok = function(){
                            updateHrUserdetails();
                        }
                    }],
                    template: '<md-dialog aria-label="Update Password" style="width:400px;">' +
                                '<div layout="column" layout-align="start end" style="padding:10px;">'+
                                '<ng-md-icon icon="clear" size="14" style="margin:8px 0 -23px 0;cursor:pointer" ng-click="hideModal()">'+
                                '</ng-md-icon>'+
                                '</div>'+
                                '<md-content style="background-color:white">' +
                                '<div layout="column" layout-align="center center"><img src="images/que_icon.png" width="70px" height="70px"/></div>'+
                                '<p align=center style="padding:10px 10px 20px 20px;font-size:13px;" >Are you sure you want to Change your Password?</p>' +
                                '<md-divider></md-divider>'+
                                '<div layout="row" layout-align="end center" style="background-color:rgb(250,250,250);height:60px;padding:10px" flex>' +
                                '<md-button class="md-raised md-primary" ng-click="ok()">OK</md-button>' +
                                '<md-button class="md-secondary" ng-click="hideModal()">Cancel</md-button>' +
                                '</div>' +
                                '</md-content>' +
                                '</md-dialog>'
                    });
            }
            else{
                updateHrUserdetails();
            }
        }

        function updateHrUserdetails(){
            $scope.submitted = true;
            
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
            
            if ($scope.fileThumb && (typeof $scope.fileThumb === 'object')){
                frmData.append('profile', $scope.fileThumb);
            }
            var str = '';
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
            if (vm.userInfo.jobtitle) frmData.append('jobtitle', vm.userInfo.jobtitle);
            
            MyAccountService.updateHrUser(frmData).then(
                function (response) {                    
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                    if (!response.data.Error) {
                        ToastrService.success(response.data.message);
                        vm.getUserInfo();
                        $state.go('Dashboard', {}, { reload: 'Dashboard' });
                        //if($scope.proImage){    
                            //$scope.proImage = '';
                        //}
                        //vm.answer();
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG146);
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
                    
                    var rand = (Math.random() * 1000) + 1;
                    $scope.fileup =  vm.userInfo.profilepic ? vm.userInfo.profilepic + '?lastmod=' + rand : '';
                    $scope.fileThumb = vm.userInfo.profilepic ? $rootScope.ProfilePicURL + vm.userInfo.profilepic + '?lastmod=' + rand : '' ;
                    vm.clients = [];
                    var userClients = vm.userInfo.clients;
                    if(userClients){
                        userClients = userClients.slice(1, userClients.length - 1);
                        vm.clients = userClients.split(',');
                    }
                    var changedData = {
                        fname : vm.userInfo.firstName,
                        lname : vm.userInfo.lastName,
                        proImage:vm.userInfo.profilepic ?  $rootScope.ProfilePicURL + vm.userInfo.profilepic + '?lastmod=' + rand : '' 
                    }
                    $rootScope.UserInfo.profilepic = vm.userInfo.profilepic;
                    localStorage.setItem("userInfo", JSON.stringify($rootScope.UserInfo));                         
                    $rootScope.$emit('ImageUpdated', changedData);
                    
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }        

        
        // function hide(ev) {
        //     $mdDialog.hide();
        // }

        // function cancel(ev) {
        //     $scope.fileThumb = '';
        //     $mdDialog.cancel();
        // }

        // function answer(ev, answer) {
        //     $mdDialog.hide(answer);
        // }

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
                // if(fileImg.type === 'image/jpeg' || fileImg.type === 'image/jpg' || fileImg.type === 'image/png' || fileImg.type === 'image/gif'){
                if(fileImg.type === 'image/jpeg' || fileImg.type === 'image/jpg' || fileImg.type === 'image/gif'){
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
                    $scope.proImage = newval;
                }
            }
        });

    }
})();