(function () {
    'use strict';
    hrAdminApp.controller('EditEmailTemplateController', editEmailTemplateController);
    editEmailTemplateController.$inject = ['$rootScope', '$state', '$stateParams', '$scope', '$timeout', '$filter', 'ToastrService', 'EmailTemplateService', '$window', '$element'];
    function editEmailTemplateController($rootScope, $state, $stateParams, $scope, $timeout, $filter, ToastrService, EmailTemplateService, $window, $element) {

        var vm = this;

        for (name in CKEDITOR.instances) {
            CKEDITOR.instances[name].destroy(true);
        }

        $scope.add_or_edit = 'New Email Template';
        $scope.tbody = '';
        $scope.newAttachment = null;
        $scope.attachment = '';
        $scope.submitted = false;
        vm.templateData = {};
        var templateIdExist = $stateParams.id ? true : false;
        if ($rootScope.UserInfo.isAdmin) {
            $scope.$parent.currentNavItem = 4;
        }
        $scope.hr_Signature = "<p style=\"margin:0;padding:0;margin-left:0px; margin-right:0px\">Thanks and Regards,</p><p style=\"margin:0;padding:0;margin-left:0px; margin-right:0px\">[HR_FirstName]&nbsp;[HR_LastName]</p><p style=\"margin:0;padding:0;margin-left:0px; margin-right:0px\">[HR_JobTitle]</p><p style=\"margin:0;padding:0;margin-left:0px; margin-right:0px\">[Organization]</p><p style=\"margin:0;padding:0;margin-left:0px; margin-right:0px\">Direct:&nbsp;[HR_PhoneNumber]</p><p style=\"margin:0;padding:0;margin-left:0px; margin-right:0px\">Fax:&nbsp; &nbsp;678-990-0403</p><p style=\"margin:0;padding:0;margin-left:0px; margin-right:0px\">Email: <a href=\"hr@askstaffing.com\">hr@askstaffing.com</a></p><p style=\"margin:0;padding:0;margin-left:0px; margin-right:0px\">Web:&nbsp; &nbsp;<a href=\"http://www.askstaffing.com/\" target=\"_blank\">www.askstaffing.com</a></p>";

        vm.removedButtonsCkEditor = [];


        function getPlaceHoldersList() {
            EmailTemplateService.getPlaceholdersList().then(
                function(response){
                    vm.placeholdersList = response.data;
                },
                function(err){
                    ToastrService.success('Error occured while retrieving Place Holders.');
                }
            )
        }
        getPlaceHoldersList();
        

        // vm.offerPlaceHolders = [
        //     'First_Name',
        //     'Last_Name',
        //     'Job_Title',
        //     'Company',
        //     'Company_State',
        //     'Company_City',
        //     'Pay_Rate/Hr',
        //     'Contract_Duration/Months',
        //     'Offer_Response_Date',
        //     'Organization',
        //     'Current_Date',
        //     'Signature',
        //     'Signature_Logo',
        //     'Current_Year',
        //     'Next_Year'
        // ];

        // vm.placeholdersList = [
        //     'First_Name',
        //     'Last_Name',
        //     'Company_State',
        //     'Company_City',
        //     'OfferLetter_Signed_Date',
        //     'Company',
        //     'Current_Date',
        //     'DrugtestSLA_Hours',
        //     'Task_Name',
        //     'Task_Desc',
        //     'Task_EndDate',
        //     'Task_CompleteDate',
        //     'Task_CreatedBy',
        //     'Organization',
        //     'Document_Name',
        //     'Step_Name',
        //     'HR_FirstName',
        //     'HR_LastName',
        //     'HR_JobTitle',
        //     'HR_PhoneNumber',
        //     'HR_DocComments',
        //     'Resetpassword_URL',
        //     'Client_Names',
        //     'EmailID',
        //     'Cancellation_Reason',
        //     'Subject',
        //     'StartDate_Time',
        //     'EndDate_Time',
        //     'Agenda',
        //     'Onboarding_URL',
        //     'Candidate_Email',
        //     'Tentative_Joining_Date',
        //     'Client_Name',
        //     'NewHire_CreationDate',
        //     'Onboarding_Date',
        //     'OfferLetterSLA_Hours',
        //     'Phone_Number',
        //     'Company_Size',
        //     'Country',
        //     'Signature_Logo',
        //     'Current_Year',
        //     'Next_Year',
        //     'Notification_Failed_Users',
        //     'Hand_Sign_Doc_Name'
        // ]



        $scope.addPlaceholderText = function (txt) {
            // var element = $element.find('#quilleditor');
            // var yScrollPos = element.pageYOffset;
            // var yScrollPos = window.pageYOffset || document.documentElement.scrollTop ;

            // if (CKEDITOR.instances.body) CKEDITOR.instances.body.destroy();

            var elmnt = document.getElementById("quilleditor");
            var y = elmnt.scrollTop;

            //txt = txt == 'Pay_Rate/Hr' ? '$[Pay_Rate/Hr]' : '[' + txt + ']';
            txt = '[' + txt + ']';
            // var editor = CKEDITOR.instances['editor2'];
            // CKEDITOR.instances['editor2'].insertElement(txt);
            // CKEDITOR.instances[$(this).attr("cke_3")].insertText(txt);
            // vm.getCursorPosition(txt,editor);

            for (name in CKEDITOR.instances) {
                CKEDITOR.instances[name].insertText(txt);
            }
            // vm.quill.focus();
            // var range = vm.quill.getSelection();
            // if (range) {
            //     vm.quill.insertText(range.index, txt);
            // }

            document.getElementById("quilleditor").scrollTop = y;

        }

        $scope.editorCreated = function () {
            // console.log(editor);
            //vm.quill = CKEDITOR.instances['editor2'];
        }

        // ng-quill configuration
        // can be used if toolbar is not created through html
        // $scope.editorModules = {
        //     toolbar: [
        //         ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        //         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        //         // [{ 'align': [] }], // taborder not available for align
        //         // [{ 'font': [] }],
        //         ['link']                         // link and image, video
        //     ]
        // }

        $scope.setFocusInEditor = function () {
            // Allow keypress for space key
            if (window.event.which === 32) vm.quill.focus();
        }

        $scope.counter = function (text) {
            return text.length;
        }

        $scope.$watch('tbody', function () {
            if ($scope.tbody) return $scope.tbody.length;
        });

        function getTemplateCategoryList() {
            EmailTemplateService.getTemplateCategoryList().then(
                function (response) {
                    if (response.data.Error) {
                        vm.categories = [];
                        ToastrService.error(response.data.message)
                    } else {
                        vm.categories = response.data;
                        // console.log(vm.categories);
                        // $scope.categories = $filter('orderBy')(vm.categories, 'categoryname');
                        $scope.categories = vm.categories;
                        if (!$stateParams.id) {
                            vm.templateData.templatecategory = $scope.categories[0].categoryid;
                        }
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG206);
                }
            )
        }

        function getTemplateCategoryFilteredList() {
            EmailTemplateService.getTemplateCategoryFilteredList().then(
                function (response) {
                    if (response.data.Error) {
                        vm.categories = [];
                        ToastrService.error(response.data.message)
                    } else {
                        vm.categories = response.data;
                        // $scope.categories = $filter('orderBy')(vm.categories, 'categoryname');
                        $scope.categories = vm.categories;
                        vm.templateData.templatecategory = $scope.categories[0].categoryid;
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG206);
                }
            )
        }
        if ($stateParams.id) {
            getTemplateCategoryList();
        } else {
            getTemplateCategoryFilteredList();
        }

        function getTemplateData(templateId) {
            EmailTemplateService.viewEmailTemplateData(templateId).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        vm.templateData = response.data;
                        vm.templateData.shift();
                        vm.templateData = vm.templateData[0];
                        // console.log(vm.templateData);
                        $scope.originalTemplateName = angular.copy(vm.templateData.templatename);
                        $timeout(function () {
                            $scope.tbody = vm.templateData.body;
                            if ($scope.tbody.indexOf("<img src='" + $rootScope.SignImageURL + "' />") != -1) {
                                // $scope.tbody = $scope.tbody.replace("<img src='" + $rootScope.SignImageURL + "' />", "[Signature_Logo]");
                            }
                        }, 300);
                        if (vm.templateData.attachment) {
                            // var fileNameArray = vm.templateData.attachment.split('/');
                            // No need to pick the complete path of file and split it
                            // document name key has been added for the document name
                            $scope.attachment = vm.templateData.documentName;
                            $scope.attachmentid = vm.templateData.attachmentid;
                        }
                        // console.log($scope.attachment);
                        // CKEDITOR.instances['editor2'].focus();
                        // CKEDITOR.instances['editor2'].setData($scope.tbody);
                        // $timeout(function() {
                        //     CKEDITOR.instances['editor2'].renderer.updateFull();
                        //  }, 4000);
                        // $timeout(function () {
                        //     $rootScope.$broadcast('update-ace-editor-hack');
                        // }, 3000);

                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG207);
                }
            )
        }

        vm.saveEmailTemplate = function () {
            // console.log($scope.tbody);
            // template name should be unique for offer letters
            $scope.submitted = true;
            if (vm.templateData.templatename &&
                $scope.originalTemplateName != vm.templateData.templatename &&
                vm.templateData.templatecategory === 23) {
                // make an api request and check if the name is unique
                var objEmailTempName = {};
                objEmailTempName.templatename = vm.templateData.templatename;

                $scope.loading = true;
                EmailTemplateService.getValidEmailTempName(objEmailTempName).then(
                    function (response) {
                        if (response.data.Error) {
                            ToastrService.error(response.data.message);
                            // give focus back to the template name field
                            document.getElementById('template-name').focus();
                            return false;
                        }
                        if (!response.data.Error) {
                            // ToastrService.success(response.data.message);
                            continueSaveNewEmailTemplate();
                        }
                    },
                    function (err) {
                        ToastrService.error($rootScope.errorMsgs.MSG208);
                    }
                ).finally(function () {
                    $scope.loading = false;
                });
            } else {
                continueSaveNewEmailTemplate();
            }

            // $state.go('EmailTemplates', {}, {reload: 'EmailTemplates'});
        }

        function continueSaveNewEmailTemplate() {
            if (!vm.templateData.templatename ||
                !vm.templateData.templatecategory ||
                !vm.templateData.subject ||
                vm.templateData.subject.trim() == '' ||
                !$scope.tbody) {
                ToastrService.error($rootScope.errorMsgs.MSG124);
                return;
            }
            if (vm.templateData.templatecategory == 24 && !vm.templateData.criteriaID) {
                ToastrService.error($rootScope.errorMsgs.MSG124);
                return;
            }
            // look for empty email template or just spaces
            var parsedBody = parseTbody($scope.tbody);
            if (!parsedBody || parsedBody == '') {
                ToastrService.error($rootScope.errorMsgs.MSG123);
                return;
            }
            if (parsedBody.indexOf("<img") != -1) {
                ToastrService.error($rootScope.errorMsgs.MSG122);
                return;
            }
            if (vm.htmlToPlaintext($scope.tbody).trim() == "") {
                ToastrService.error('Please enter the Email body. It can’t be blank.');
                return;
            }

            if (!$stateParams.id) {
                saveNewEmailTemplate();
            } else {
                editEmailTemplate(vm.templateId);
            }

        }

        function parseTbody(txt) {
            // quill editor saves the string between <p> and </p>
            var realTxt = txt.substring(3);
            var n = realTxt.lastIndexOf('</p>');
            var parsed = realTxt.substring(0, n);
            // IE11 stores space as &nbsp;
            var parsed = parsed.replace(/&nbsp;/g, '');
            return parsed.trim();
        }

        $scope.$watch('newAttachment', function () {
            // file size cannot be more than 10MB
            if ($scope.newAttachment) {
                // console.log($scope.newAttachment);
                if ($scope.newAttachment.file.size > 1 * 1024 * 1024) {
                    ToastrService.error($rootScope.errorMsgs.MSG209);
                    $scope.newAttachment = null;
                    return;
                }
            }
        });

        function editEmailTemplate(templateid) {
            // console.log(vm.templateData.attachment);
            if (vm.templateData.templatecategory !== 23 && vm.htmlToPlaintext($scope.tbody).length > 2000) {
                ToastrService.error($rootScope.errorMsgs.MSG125);
                return;
            } else if (vm.templateData.templatecategory === 23 && vm.htmlToPlaintext($scope.tbody).length > 10000) {
                ToastrService.error($rootScope.errorMsgs.MSG126);
                return;
            }
            if (vm.templateData.templatecategory === 23 && $scope.tbody.indexOf("[Signature]") == -1) {
                ToastrService.error($rootScope.errorMsgs.MSG210);
                return;
            }
            if (vm.templateData.templatecategory === 23 && ($scope.tbody.match(/\[Signature\]/g) || []).length > 1) {
                ToastrService.error($rootScope.errorMsgs.MSG211);
                return;
            }
            // if ($scope.tbody.indexOf("[Signature_Logo]") != -1) {
            //     $scope.tbody = $scope.tbody.replace("[Signature_Logo]", "<img src='" + $rootScope.SignImageURL + "' />");
            // }
            $scope.tbody = $scope.tbody.replace(/<p style="/g, "<p style=\"margin:0;padding:0;");
            $scope.tbody = $scope.tbody.replace(/<p>/g, "<p style=\"margin:0;padding:0;\">");
            // $scope.tbody = $scope.tbody.replace(/\[HR_Signature\]/g,$scope.hr_Signature);


            // var templateFrm = document.getElementById('templateData');
            var frmData = new FormData();

            frmData.append('templateid', templateid);
            frmData.append('templatename', vm.templateData.templatename);
            frmData.append('templatedesc', vm.templateData.templatedesc ? vm.templateData.templatedesc.trim() : '');
            frmData.append('templatecategory.categoryid', vm.templateData.templatecategory);
            frmData.append('subject', vm.templateData.subject.trim());
            if (vm.templateData.templatecategory == 24 && vm.templateData.criteriaID) {
                frmData.append('criteriaID', vm.templateData.criteriaID);
            } else {
                frmData.append('criteriaID', 0);
            }
            // look for empty email template or just spaces
            var realTbody = parseTbody($scope.tbody);
            if (realTbody.trim() == '') {
                ToastrService.error($rootScope.errorMsgs.MSG123);
                return;
            }

            frmData.append('body', $scope.tbody);
            frmData.append('isactive', 1);

            if ($scope.newAttachment) {
                var attachment = $scope.newAttachment.file;
                frmData.append('attachment', attachment);
            } else if ($scope.attachment) {
                // frmData.append('attachmentid', $scope.attachmentid);
                // frmData.append('attachment', $scope.attachment);
                // CHANDRA - 19/Mar - updated as per the api change
                frmData.append('documentName', $scope.attachment);
            } else {
                frmData.append('attachmentid', $scope.attachmentid);
                frmData.append('attachment', null);
            }

            // upload using api
            $scope.loading = true;
            EmailTemplateService.editEmailTemplateData(frmData).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                    if (!response.data.Error) {
                        ToastrService.success(response.data.message);
                        $state.go('Settings.EmailTemplates', {}, { reload: 'Settings.EmailTemplates' });
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG212);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }

        function saveNewEmailTemplate() {
            // console.log(attachment);
            if (vm.templateData.templatecategory !== 23 && vm.htmlToPlaintext($scope.tbody).length > 2000) {
                ToastrService.error($rootScope.errorMsgs.MSG125);
                return;
            } else if (vm.templateData.templatecategory === 23 && vm.htmlToPlaintext($scope.tbody).length > 10000) {
                ToastrService.error($rootScope.errorMsgs.MSG126);
                return;
            }
            if (vm.templateData.templatecategory === 23 && $scope.tbody.indexOf("[Signature]") == -1) {
                ToastrService.error($rootScope.errorMsgs.MSG210);
                return;
            }
            if (vm.templateData.templatecategory === 23 && ($scope.tbody.match(/\[Signature\]/g) || []).length > 1) {
                ToastrService.error($rootScope.errorMsgs.MSG211);
                return;
            }
            // if ($scope.tbody.indexOf("[Signature_Logo]") != -1) {
            //     $scope.tbody = $scope.tbody.replace("[Signature_Logo]", "<img src='" + $rootScope.SignImageURL + "' />");
            // }
            $scope.tbody = $scope.tbody.replace(/<p style="/g, "<p style=\"margin:0;padding:0;");
            $scope.tbody = $scope.tbody.replace(/<p>/g, "<p style=\"margin:0;padding:0\">");
            // $scope.tbody = $scope.tbody.replace(/\[HR_Signature\]/g,$scope.hr_Signature);

            // var templateFrm = document.getElementById('templateData');
            var frmData = new FormData();

            frmData.append('templatename', vm.templateData.templatename);
            //vm.templateData.templatedesc = vm.templateData.templatedesc.trim();
            frmData.append('templatedesc', vm.templateData.templatedesc ? vm.templateData.templatedesc.trim() : '');
            frmData.append('templatecategory.categoryid', vm.templateData.templatecategory);
            vm.templateData.subject = vm.templateData.subject.trim();
            frmData.append('subject', vm.templateData.subject);
            frmData.append('body', $scope.tbody.trim());
            frmData.append('isactive', 1);
            if (vm.templateData.templatecategory == 24 && vm.templateData.criteriaID) {
                frmData.append('criteriaID', vm.templateData.criteriaID);
            } else {
                frmData.append('criteriaID', 0);
            }

            if ($scope.newAttachment) {
                var attachment = $scope.newAttachment.file;
                frmData.append('attachment', attachment);
            } else {
                frmData.append('attachment', null);
            }

            // upload using api
            $scope.loading = true;
            EmailTemplateService.addEmailTemplate(frmData).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                    if (!response.data.Error) {
                        ToastrService.success(response.data.message);
                        $state.go('Settings.EmailTemplates', {}, { reload: 'Settings.EmailTemplates' });
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG213);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }

        vm.clearAttachment = function () {
            if ($scope.newAttachment) {
                $scope.newAttachment = null;
            }
            // vm.files.attachment = null;
            $scope.attachment = null;
        }


        function getMasterBatchList() {
            EmailTemplateService.getMasterBatchList(templateIdExist).then(
                function (response) {
                    if (response.data.Error) {
                        vm.batchJobsList = [];
                    } else {
                        vm.batchJobsList = response.data.masterbatchcriterias;
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG206);
                }
            )
        }
        getMasterBatchList();

        vm.htmlToPlaintext = function (text) {
            // return text ? String(text).replace(/<[^>]+>/gm, '') : '';
            return text ? String(text).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').replace(/&\w+;/g, '').replace(/^\s*/g, '').replace(/\s*$/g, '') : '';
        }


        $scope.browserType = function () {
            // if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
            //     vm.heightofemailtemp = $(document).height() - 160;
            //         vm.heightforEmailTemplate = vm.heightofemailtemp * 0.83 + 'px' ;
            // }
            if (navigator.userAgent.indexOf("Chrome") != -1) {
                vm.heightofemailtemp = $(document).height() - 160;
                vm.heightforEmailTemplate = vm.heightofemailtemp * 0.83 + 'px';
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                vm.heightofemailtemp = $(document).height() - 160;
                vm.heightforEmailTemplate = vm.heightofemailtemp * 0.83 + 'px';
                if (navigator.userAgent.indexOf("Version/10") != -1) {
                    vm.heightofemailtemp = $(document).height() - 160;
                    vm.heightforEmailTemplate = vm.heightofemailtemp * 0.83 + 'px';

                }
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                vm.heightofemailtemp = $(document).height() - 160;
                vm.heightforEmailTemplate = vm.heightofemailtemp * 0.82 + 'px';
            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                vm.heightofemailtemp = $(document).height() - 160;
                vm.heightforEmailTemplate = vm.heightofemailtemp * 0.81 + 'px';
            }
            else {
                vm.heightofemailtemp = $(document).height() - 160;
                vm.heightforEmailTemplate = vm.heightofemailtemp * 0.83 + 'px';
            }
        }
        $scope.browserType();

        // vm.getCursorPosition = function (txt,editor) {
        //     if (txt) {
        //         var sel, range;
        //         sel = editor.getSelection();
        //         if (sel.getRangeAt && sel.rangeCount) {
        //             console.log(sel.getRangeAt(0))
        //             vm.rango = sel.getRangeAt(0);
        //             vm.rango.insertNode(document.createTextNode(txt));
        //             // vm.variable = '';

        //             return sel.getRangeAt(0);
        //         }
        //     }
        // }

        CKEDITOR.on('instanceReady', function () {
            if ($stateParams.id) {
                $scope.add_or_edit = 'Edit Email Template';
                vm.templateId = $stateParams.id;
                getTemplateData(vm.templateId);
            }

        });
    }
})();