(function () {
    'use strict';
    hrAdminApp.controller('EmailController', EmailController);
    EmailController.$inject = ['$scope', '$rootScope', '$stateParams', '$location', 'ToastrService', 'EmailService', '$mdDialog', '$filter', '$timeout', 'HireInfoService'];
    function EmailController($scope, $rootScope, $stateParams, $location, ToastrService, EmailService, $mdDialog, $filter, $timeout, HireInfoService) {

        var vm = this;
        vm.hiredInfo = HireInfoService.hireUserData;

        //vm.getEmailLogList = getEmailLogList;
        //vm.doSubmit = doSubmit;
        vm.subject = "";
        $scope.LogList = {};
        $scope.emailLogList = [];
        $scope.submitInfo = "";
        $scope.submitted = false;
        //$scope.formData = {};


        $scope.counter = function (text) {
            var modifiedtext = String(text).replace(/<[^>]+>/gm, '');
            return text ? modifiedtext.length : 0;
        }

        $scope.getEmailLogList = function () {
            $scope.loading = true;
            EmailService.getEmailLogList($rootScope.UserInfo.ID, $stateParams.hireId).then(
                function (response) {
                    $scope.loading = false;
                    $scope.logList = response.data;

                    $scope.emailLogList = [];
                    $scope.emailLogList = $scope.logList.EmailLogs;
                    for (var i = 0; i < $scope.emailLogList.length; i++) {
                        var dateString = $scope.emailLogList[i].SentDate,
                        dateString = dateString.replace(/-/g, '/');
                        // dateTimeParts = dateString.split(' '),
                        // timeParts = dateTimeParts[1].split(':'),
                        // dateParts = dateTimeParts[0].split('-');

                        // $scope.date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1]);

                        // $scope.emailLogList[i].SentDate = $scope.date.getTime();
                        // var newDate = new Date(new Date(dateString).getTime() + new Date(dateString).getTimezoneOffset() * 60 * 1000);
                        // var offset = new Date(dateString).getTimezoneOffset();
                        // var hours = new Date(dateString).getHours() * 60;
                        // var minutes = new Date(dateString).getMinutes();
                        // newDate.setHours((hours + minutes - offset) / 60);
                        var newDate = moment.utc(dateString).local().format();
                        $scope.emailLogList[i].SentDate = newDate;

                    }

                },
                function (err) {
                    $scope.loading = false;
                    ToastrService.error(err.message);
                }
            )
        }
        $scope.getEmailLogList();
        //$scope.test="welcome";


        $scope.doSubmitForm = function (form) {
            //alert(123);

            if (!form.$valid) {
                ToastrService.error($rootScope.errorMsgs.MSG127);
                $scope.submitted = true;
                return false;
            }
            if (vm.htmlToPlaintext($scope.formData.body).length > 1001) {
                ToastrService.error($rootScope.errorMsgs.MSG166);
                return;
            }
            if (vm.htmlToPlaintext($scope.formData.body).trim() == "") {
                ToastrService.error('Please enter the Email body. It can’t be blank.');
                return;
            }

            $scope.formData.body = $scope.formData.body + "<p style='margin:0;padding:0;'>&nbsp;</p>" + "<p style='margin:0;padding:0;'>&nbsp;</p>";
            $scope.formData.body = $scope.formData.body + "<p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>Thanks and Regards,</p><p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>[HR_FirstName] [HR_LastName]</p><p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>[HR_JobTitle]</p><p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>[Organization]</p><p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>Direct:&nbsp; &nbsp;[HR_PhoneNumber]</p><p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>Fax:&nbsp; &nbsp;678-990-0403</p><p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>Email: <a href='hr@askstaffing.com'>hr@askstaffing.com</a></p><p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>Web:&nbsp; &nbsp;<a href='http://www.askstaffing.com/' target='_blank'>www.askstaffing.com</a></p>";
            $scope.formData.body = $scope.formData.body.replace(/<p style="/g, "<p style=\"margin:0;padding:0;");
            $scope.formData.body = $scope.formData.body.replace(/<p>/g, "<p style=\"margin:0;padding:0;\">");
            $scope.formData.body = $scope.formData.body + "<p style=\"margin:0;padding:0;\">[Signature_Logo]</p>";


            var obj = {
                'fromEmailID': $rootScope.UserInfo.Email,
                'toEmailID': vm.hiredInfo.emailid,
                'subject': $scope.formData.subject,
                'body': $scope.formData.body,
                'cc': '',
                'newhireid': {
                    'newhireid': vm.hiredInfo.newhireid
                },
                'categoryid': {
                    'categoryid': 33
                },
                'userid': {
                    'userId': $rootScope.UserInfo.ID
                }

            };
            $scope.loading = true;
            EmailService.doSubmit(obj).then(
                function (response) {
                    $scope.loading = false;
                    $scope.submitted = true;
                    $scope.submitInfo = response.data;
                    if ($scope.submitInfo.Success) {
                        ToastrService.success(response.data.message);
                        $scope.submitted = false;
                        $scope.formData = {};
                        form.$setPristine();
                        form.$setUntouched();

                        $timeout(function () {
                            $scope.getEmailLogList();
                        }, 10000);

                    }
                    if (!$scope.submitInfo.Success) {
                        ToastrService.error(response.data.message);
                    }
                }, function (err) {
                    $scope.loading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG146);
                });



        }
        //doSubmit();

        vm.htmlToPlaintext = function (text) {
            // return text ? String(text).replace(/<[^>]+>/gm, '') : '';
            return text ? String(text).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').replace(/&\w+;/g, '').replace(/^\s*/g, '').replace(/\s*$/g, '') : '';
        }


    };
})();