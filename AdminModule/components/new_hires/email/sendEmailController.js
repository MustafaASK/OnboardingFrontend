(function () {
    'use strict';
    hrAdminApp.controller('SendEmailController', sendEmailController);
    sendEmailController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$mdDialog', '$timeout', 'emailTo', 'newHireId', 'ToastrService', 'DashboardService'];
    function sendEmailController($rootScope, $scope, $state, $stateParams, $mdDialog, $timeout, emailTo, newHireId, ToastrService, DashboardService) {

        var vm = this;
        $scope.emailTo = emailTo;
        $scope.newhireid = newHireId;
        $scope.tbody = '';
        $scope.submitted = false;
        // check if user is uploading a new version or a new document

        vm.closeDeleteModal = function () {
            $mdDialog.cancel();
        }

        vm.sendEmailToNewHire = function () {
            $scope.submitted = true;
            var objEmail = {};
            if (!$scope.subject || !$scope.tbody) {
                ToastrService.error($rootScope.errorMsgs.MSG195);
                return;
            }

            if (vm.htmlToPlaintext($scope.tbody).length > 1001) {
                ToastrService.error($rootScope.errorMsgs.MSG166);
                return;
            }
            if (vm.htmlToPlaintext($scope.tbody).trim() == "") {
                ToastrService.error('Please enter the Email body. It can’t be blank.');
                return;
            }

            $scope.tbody = $scope.tbody + "<p style='margin:0;padding:0;'>&nbsp;</p>" + "<p style='margin:0;padding:0;'>&nbsp;</p>";
            $scope.tbody = $scope.tbody + "<p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>Thanks and Regards,</p><p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>[HR_FirstName] [HR_LastName]</p><p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>[HR_JobTitle]</p><p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>[Organization]</p><p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>Direct:&nbsp; &nbsp;[HR_PhoneNumber]</p><p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>Fax:&nbsp; &nbsp;678-990-0403</p><p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>Email: <a href='hr@askstaffing.com'>hr@askstaffing.com</a></p><p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>Web:&nbsp; &nbsp;<a href='http://www.askstaffing.com/' target='_blank'>www.askstaffing.com</a></p>";
            $scope.tbody = $scope.tbody.replace(/<p style="/g, "<p style=\"margin:0;padding:0;");
            $scope.tbody = $scope.tbody.replace(/<p>/g, "<p style=\"margin:0;padding:0;\">");
            $scope.tbody = $scope.tbody + "<p style=\"margin:0;padding:0;\">[Signature_Logo]</p>";

            objEmail.fromEmailID = $rootScope.UserInfo.Email;
            objEmail.toEmailID = $scope.emailTo;
            objEmail.subject = $scope.subject;
            objEmail.body = $scope.tbody;
            objEmail.newhireid = { 'newhireid': $scope.newhireid };
            objEmail.categoryid = { 'categoryid': '15' };
            objEmail.userid = { 'userId': $rootScope.UserInfo.ID };
            objEmail.cc = '';

            $scope.loading = true;
            DashboardService.sendEmailToNewHire(objEmail).then(
                function (response) {
                    ToastrService.success(response.data.message);
                    $mdDialog.cancel();
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG196);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }

        vm.htmlToPlaintext = function (text) {
            // return text ? String(text).replace(/<[^>]+>/gm, '') : '';
            return text ? String(text).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').replace(/&\w+;/g, '').replace(/^\s*/g, '').replace(/\s*$/g, '') : '';
        }

    }
})();