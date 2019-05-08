(function () {
    'use strict';
    hrAdminApp.controller('InitiateOnboardingController', InitiateOnboardingController);
    InitiateOnboardingController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$location', 'ToastrService', 'InitiateOnboardingService', '$mdDialog', '$filter', '$timeout', 'HireInfoService', 'NewHiresService', 'WorkflowService', 'DocDropService', '$sce', 'DesignWebformsService', '$window'];
    function InitiateOnboardingController($scope, $rootScope, $state, $stateParams, $location, ToastrService, InitiateOnboardingService, $mdDialog, $filter, $timeout, HireInfoService, NewHiresService, WorkflowService, DocDropService, $sce, DesignWebformsService, $window) {


        var vm = this;
        $scope.Math = $window.Math;
        vm.getOfferLetters = getOfferLetters;
        vm.getWorkFlowList = getWorkFlowList;
        vm.getWorkFlowDetail = getWorkFlowDetail;
        vm.getOfferLetterDetail = getOfferLetterDetail;
        vm.getInitializeOnboardDetail = getInitializeOnboardDetail;
        vm.sendEmailTemplate = sendEmailTemplate;
        var hireUserInfo = HireInfoService.hireUserData;
        $scope.hireUserInfo = HireInfoService.hireUserData;
        var hireUserId = $stateParams.hireId;

        vm.webformStepDesc = "Webforms Settings Description";
        vm.webformStepName = "Webforms Settings";

        vm.bodyEditMode = false;

        $scope.loading = false;

        vm.clientsList = [];

        var clientState = '';
        // var clientCity = hireUserInfo.city;

        // vm.getCities = function (id) {
        //     NewHiresService.getCities(id).then(
        //         function (response) {
        //             vm.cityList = response.data;
        //             var ary = $filter('filter')(vm.cityList, { 'cityCode': hireUserInfo.city })
        //             clientCity = ((ary.length) ? ary[0].cityName : '');

        //             $scope.offerLetterDetail.body = $scope.offerLetterDetail.body.replace(/\[Company_City\]/g, clientCity);;
        //         },
        //         function (err) {
        //             ToastrService.error($rootScope.errorMsgs.MSG132);
        //         }
        //     )
        // }

        function statesList() {
            NewHiresService.getStatesList().then(
                function (response) {
                    vm.statesList = response.data;
                    var ary = $filter('filter')(vm.statesList, { 'stateCode': hireUserInfo.worklocation })
                    clientState = ((ary.length) ? ary[0].stateName : '');
                    // vm.getCities(hireUserInfo.worklocation);
                    // if(!vm.editNewHireId){
                    //     vm.newHire.worklocation = vm.statesList[0].stateCode;
                    //     vm.getCities(vm.statesList[0].stateCode);
                    // }

                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG132);
                }
            )
        }
        //statesList();

        vm.showPreviewDailog = function (ev) {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                locals: { htmlContent: $scope.offerLetterDetail.body },
                templateUrl: $rootScope.rootUrl + '/components/hire_info/preview/preview.html',
                controller: ['$scope', '$mdDialog', 'htmlContent', '$sce', '$rootScope', 'HireInfoService', function ($scope, $mdDialog, htmlContent, $sce, $rootScope, HireInfoService) {
                    $scope.itemType = htmlContent.replace("[Signature_Logo]", "<img src='" + $rootScope.SignImageURL + "' />");
                    var htmData = {
                        'offerbody': angular.copy($scope.itemType)
                    };
                    $scope.pdfpath = '';
                    // $scope.trustAsHtml = function () {
                    //     return $sce.trustAsHtml($scope.itemType);
                    // };
                    $scope.cancel = function () {
                        HireInfoService.deletePdfGenerate().then(
                            function (response) {
                            },
                            function (err) {
                            }
                        );
                        $mdDialog.cancel();
                    }
                    $scope.trustSrc = function (src) {
                        return $sce.trustAsResourceUrl(src);
                    }
                    //$scope.pdfpath = 'http://192.168.1.198:9000/OnBoarding/tempDelete/generatePdf20180905122121.pdf';
                    $scope.getPdfView = function (htmData) {
                        $scope.loading = true;
                        HireInfoService.getPdfGenerateView(htmData).then(
                            function (response) {
                                $scope.loading = false;
                                $scope.pdfpath = $rootScope.offerLetterPreview + response.data.offerletter;
                            },
                            function (err) {
                                $scope.loading = false;
                                ToastrService.error($rootScope.errorMsgs.MSG132);
                            }
                        )
                    }
                    $scope.getPdfView(htmData);
                }],
                targetEvent: ev,
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                escapeToClose: true
            });
        }


        vm.documentUploadEchosign = function () {
            $rootScope.isCandidateAPICalls = true;
            InitiateOnboardingService.documentUploadEchosign($stateParams.hireId).then(
                function (response) {
                },
                function (err) {
                }
            )
        };
        //vm.documentUploadEchosign()

        function checkTheFlagStatus(flag1, flag2) {
            var isThereError = false;
            if (flag1 || flag2) {
                isThereError = true;
                if (flag1 === flag2) {
                    isThereError = false;
                }
            }
            return isThereError;
        }

        function checkTheFlag(flag1, flag2) {
            var isThereError = false;
            if (flag1 === false && flag2 === false) {
                // isThereError = true;
                // if(flag1 === flag2){
                //     isThereError = false;
                // }
                isThereError = 'no-error';
            }

            if (flag1 === false && flag2 === true) {
                isThereError = 'error';
            }

            if (flag1 === true && flag2 === false) {
                isThereError = 'error';
            }

            if (flag1 === true && flag2 === true) {
                isThereError = 'success';
            }
            return isThereError;
        }

        function checkTheBGVFlag(flag1, flag2) {
            var isThereError = true;
            if (flag1 || flag2) {
                isThereError = false;
                if (flag1 === flag2) {
                    isThereError = true;
                }
            }
            return isThereError;
        }
        var date_diff_indays = function (date1, date2) {
            var dt1 = new Date(date1);
            var dt2 = new Date(date2);
            return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
        }

        function sendEmailTemplate() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
            // if (date_diff_indays(today, hireUserInfo.tentstartdate.split(' ')[0]) <= 1) {
            //     ToastrService.error($rootScope.errorMsgs.MSG167);
            //     return;
            // }
            var finalObj = {};
            finalObj.frontendurl = $rootScope.FrontEndURL + 'candidate/reset/';

            finalObj.newhireid = parseInt($stateParams.hireId);
            // finalObj.newhirename = hireUserInfo.firstname + "_" + hireUserInfo.lastname;

            // finalObj.subject =  $scope.initializeOnboardDetail.subject; 

            // var bodyStr = $scope.initializeOnboardDetail.body; 
            // bodyStr = bodyStr.replace(/First_Name/g , hireUserInfo.firstname);
            // bodyStr = bodyStr.replace(/Last_Name/g , hireUserInfo.lastname);
            // bodyStr = bodyStr.replace(/Job_Title/g , hireUserInfo.jobtitile);
            // bodyStr = bodyStr.replace(/\[/g , '');
            // bodyStr = bodyStr.replace(/\]/g , '');            

            // finalObj.emailBody =  bodyStr;     
            if ($scope.offerLetterDetail.body.indexOf("[Signature]") == -1) {
                ToastrService.error($rootScope.errorMsgs.MSG168);
                return;
            }
            if (($scope.offerLetterDetail.body.match(/\[Signature\]/g) || []).length > 1) {
                ToastrService.error($rootScope.errorMsgs.MSG169);
                return;
            }

            // var offerStr = $scope.offerLetterDetail.body;
            // offerStr = offerStr.replace(/\[First_Name\]/g, hireUserInfo.firstname);
            // offerStr = offerStr.replace(/\[Last_Name\]/g, hireUserInfo.lastname);
            // offerStr = offerStr.replace(/\[Job_Title\]/g, hireUserInfo.jobtitile);
            // offerStr = offerStr.replace("[Signature_Logo]", "<img src='" + $rootScope.SignImageURL + "' />");
            // offerStr = offerStr.replace(/\[/g , '');
            // offerStr = offerStr.replace(/\]/g , '');

            finalObj.offerbody = $scope.offerLetterDetail.body;
            finalObj.offerStatus = 2;
            finalObj.workflowId = vm.selectedWorkFlow;
            finalObj.stepIds = [];

            for (var id = 0; id < vm.workFlowDetail.steps.length; id++) {
                var obj = {};
                obj.workflowStepId = vm.workFlowDetail.steps[id].StepId;
                obj.sequencenumber = vm.workFlowDetail.steps[id].sequencenumber;
                obj.stepDesc = vm.workFlowDetail.steps[id].stepDesc;
                obj.workFlowStepsDocs = [];

                var workFlowStepsDocs = vm.workFlowDetail.steps[id].documents;

                obj.workFlowStepsDocs.settings = [];
                var countDocs = 0;
                for (var j = 0; j < workFlowStepsDocs.length; j++) {

                    obj.workFlowStepsDocs.push({ "documentId": workFlowStepsDocs[j].documentId });

                    for (var k = 0; k < workFlowStepsDocs[j].setting.length; k++) {
                        obj.workFlowStepsDocs.settings[countDocs] = workFlowStepsDocs[j].setting[k].settingid;
                        countDocs++;
                    }
                    // obj.workFlowStepsDocs.push
                }
                finalObj.stepIds.push(obj);

            }
            var isAtleastOneHRExist = true;

            var isPayrollFormError = '';
            var isEeoFormError = '';
            var isContractFormError = '';
            var isBgvFormError = '';

            var eeoExist = false;
            var payrollExist = false;
            var contractInfoExist = false;
            var bgvExist = false;


            if (vm.htmlToPlaintext($scope.offerLetterDetail.body).length > 10000) {
                ToastrService.error($rootScope.errorMsgs.MSG126);
                return;
            }

            // if (hireUserInfo.catgid == 1) {
            //     if (!vm.workFlowDetail.ddflag || !vm.workFlowDetail.eeoflag) {
            //         ToastrService.error($rootScope.errorMsgs.MSG170);
            //         return false;
            //     }
            //     if (vm.workFlowDetail.contractorflag) {
            //         ToastrService.error($rootScope.errorMsgs.MSG171);
            //         return false;
            //     }

            // } else {
            //     if (!vm.workFlowDetail.contractorflag) {
            //         ToastrService.error($rootScope.errorMsgs.MSG172);
            //         return false;
            //     }

            //     if (vm.workFlowDetail.ddflag || vm.workFlowDetail.eeoflag) {
            //         ToastrService.error($rootScope.errorMsgs.MSG173);
            //         return false;
            //     }

            // }

            // for (var l = 0; l < finalObj.stepIds.length; l++) {
            //     if (hireUserInfo.catgid == 1) {
            //         if (finalObj.stepIds[l].workFlowStepsDocs.settings.indexOf(12) != -1) {
            //             ToastrService.error($rootScope.errorMsgs.MSG174);
            //             $scope.loading = false;
            //             return;
            //         }
            //         /* payroll section */
            //         if (finalObj.stepIds[l].workFlowStepsDocs.settings.indexOf(10) !== -1) {
            //             payrollExist = true;
            //         }
            //         var payrollerror = checkTheFlag((vm.workFlowDetail.ddflag), payrollExist);
            //         if (payrollerror === 'success') {
            //             isPayrollFormError = 'success';
            //         }
            //         if ((isPayrollFormError != 'success' || isPayrollFormError == '') && payrollerror === 'error') {
            //             isPayrollFormError = 'error';
            //         }

            //         /* eeo section */
            //         if (finalObj.stepIds[l].workFlowStepsDocs.settings.indexOf(11) !== -1) {
            //             eeoExist = true;
            //         }
            //         var eeoerror = checkTheFlag((vm.workFlowDetail.eeoflag), eeoExist);
            //         if (eeoerror === 'success') {
            //             isEeoFormError = 'success';
            //         }
            //         if ((isEeoFormError != 'success' || isEeoFormError == '') && eeoerror === 'error') {
            //             isEeoFormError = 'error';
            //         }
            //     } else {
            //         if ((finalObj.stepIds[l].workFlowStepsDocs.settings.indexOf(10) != -1 || finalObj.stepIds[l].workFlowStepsDocs.settings.indexOf(11) != -1)) {
            //             ToastrService.error($rootScope.errorMsgs.MSG174);
            //             $scope.loading = false;
            //             return;
            //         }

            //         /* contract info section */
            //         if (finalObj.stepIds[l].workFlowStepsDocs.settings.indexOf(12) !== -1) {
            //             contractInfoExist = true;
            //         }
            //         var contracterror = checkTheFlag((vm.workFlowDetail.contractorflag), contractInfoExist);
            //         if (contracterror === 'success') {
            //             isContractFormError = 'success';
            //         }
            //         if ((isContractFormError != 'success' || isContractFormError == '') && contracterror === 'error') {
            //             isContractFormError = 'error';
            //         }
            //     }

            //     /* bgv section */
            //     if (finalObj.stepIds[l].workFlowStepsDocs.settings.indexOf(3) !== -1) {
            //         bgvExist = true;
            //     }
            //     var bgverror = checkTheFlag((vm.workFlowDetail.addressflag || vm.workFlowDetail.referencesflag || vm.workFlowDetail.educationflag || vm.workFlowDetail.employementflag), bgvExist);
            //     if (bgverror === 'success') {
            //         isBgvFormError = 'success';
            //     }
            //     if ((isBgvFormError != 'success' || isBgvFormError == '') && bgverror === 'error') {
            //         isBgvFormError = 'error';
            //     }


            //     // if(finalObj.stepIds[l].workFlowStepsDocs.settings.indexOf(3) !== -1){
            //     //     bgvExist = true;
            //     // }
            //     // if(checkTheBGVFlag((vm.workFlowDetail.addressflag || vm.workFlowDetail.referencesflag || vm.workFlowDetail.educationflag || vm.workFlowDetail.employementflag) , bgvExist)){
            //     //     if(isBgvFormError){
            //     //         isBgvFormError = false;
            //     //     }
            //     // }

            //     // if (hireUserInfo.catgid == 3 && (finalObj.stepIds[l].workFlowStepsDocs.settings.indexOf(10) != -1 || finalObj.stepIds[l].workFlowStepsDocs.settings.indexOf(11) != -1)) {
            //     //     ToastrService.error($rootScope.errorMsgs.MSG174);
            //     //     $scope.loading = false;
            //     //     return;
            //     // }
            //     //vm.workFlowDetail

            //     if (finalObj.stepIds[l].workFlowStepsDocs.settings.indexOf(2) !== -1 || finalObj.stepIds[l].workFlowStepsDocs.settings.indexOf(9) !== -1) {
            //         isAtleastOneHRExist = true;
            //     }
            // }
            if (!isAtleastOneHRExist) {
                $scope.loading = false;
                ToastrService.error($rootScope.errorMsgs.MSG175);
                return false;
            }

            // if (hireUserInfo.catgid == 1) {

            //     if (isEeoFormError === 'error') {
            //         ToastrService.error($rootScope.errorMsgs.MSG176);
            //         return false;
            //     }
            //     if (isPayrollFormError === 'error') {
            //         ToastrService.error($rootScope.errorMsgs.MSG177);
            //         return false;
            //     }
            // } else {
            //     if (isContractFormError === 'error') {
            //         ToastrService.error($rootScope.errorMsgs.MSG178);
            //         return false;
            //     }

            // }
            // if (isBgvFormError === 'error') {
            //     ToastrService.error($rootScope.errorMsgs.MSG179);
            //     return false;
            // }
            $scope.loading = true;
            var offerbodyToAppend = finalObj.offerbody.replace(/"/g, "\'");
            finalObj.offerbody = "<div style='font-family: Verdana;'>" + offerbodyToAppend + "</div>";
            finalObj.webForms = vm.savedWebformsId;

            // return false;

            InitiateOnboardingService.sendDynamicOfferLetter(finalObj).then(
                function (response) {
                    $scope.loading = false;
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                    if (!response.data.Error) {
                        ToastrService.success(response.data.message);
                        vm.documentUploadEchosign();
                        $state.go('NewHires');
                    }
                },
                function (err) {
                    $scope.loading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG146);
                }
            )
        }




        function getOfferLetters() {
            InitiateOnboardingService.getOfferLetters().then(
                function (response) {
                    vm.offerLetters = response.data;
                    vm.slectedOffer = vm.offerLetters[0].templateid;
                    // /vm.slectedOffer = 1007;
                    vm.getOfferLetterDetail();
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }

        function getClientsList() {
            NewHiresService.getClientsList().then(
                function (response) {
                    vm.clientsList = response.data;
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }
        getClientsList();

        function getOfferLetterDetail() {
            if (vm.slectedOffer) {
                InitiateOnboardingService.getOfferLetterBody(vm.slectedOffer, hireUserId).then(
                    function (response) {
                        if (response.data.Success)
                            $scope.offerLetterDetail = response.data;

                        var todayDate = new Date();
                        todayDate = moment(todayDate);
                        todayDate = todayDate.format("dddd, MMMM Do, YYYY");
                        $scope.offerLetterDetail.body = $scope.offerLetterDetail.body.replace(/\[Current_Date\]/g, todayDate);

                        var nextday = new Date();
                        nextday.setDate(nextday.getDate() + 1);
                        nextday = moment(nextday);
                        nextday = nextday.format("dddd, MMMM Do, YYYY");
                        $scope.offerLetterDetail.body = $scope.offerLetterDetail.body.replace(/\[Offer_Response_Date\]/g, nextday);

                        // $timeout(function () {


                        // if (statusData[0].Success) {
                        //     var bodydata = response.data[0].body;


                        //     bodydata = bodydata.replace(/\[First_Name\]/g, hireUserInfo.firstname);
                        //     bodydata = bodydata.replace(/\[Last_Name\]/g, hireUserInfo.lastname);
                        //     bodydata = bodydata.replace(/\[Job_Title\]/g, hireUserInfo.jobtitile);
                        //     // bodydata = bodydata.replace(/\[/g , '');
                        //     // bodydata = bodydata.replace(/\]/g , '');
                        //     var todayDate = new Date();

                        //     var thisyear = todayDate.getFullYear();
                        //     bodydata = bodydata.replace(/\[Current_Year\]/g, thisyear);
                        //     bodydata = bodydata.replace(/\[Next_Year\]/g, (thisyear + 1));

                        //     var nextday = angular.copy(todayDate);
                        //     nextday.setDate(nextday.getDate() + 1);

                        //     todayDate = moment(todayDate);
                        //     todayDate = todayDate.format("dddd, MMMM Do, YYYY");
                        //     bodydata = bodydata.replace(/\[Current_Date\]/g, todayDate);

                        //     nextday = moment(nextday);
                        //     nextday = nextday.format("dddd, MMMM Do, YYYY");
                        // bodydata = bodydata.replace(/\[Offer_Response_Date\]/g, nextday);


                        //     bodydata = bodydata.replace(/\[Pay_Rate\/Hr\]/g, '$' + hireUserInfo.payrate + '/Hr');


                        //     var ary = $filter('filter')(vm.clientsList, { 'clientId': hireUserInfo.clientid })
                        //     var clientname = ((ary.length) ? ary[0].clientName : '');
                        //     bodydata = bodydata.replace(/\[Company\]/g, clientname);
                        //     bodydata = bodydata.replace(/\[Company_State\]/g, hireUserInfo.worklocation);
                        //     bodydata = bodydata.replace(/\[Company_City\]/g, hireUserInfo.city);
                        //     //bodydata = bodydata.replace(/\[Signature\]/g, '');
                        //     bodydata = bodydata.replace(/\[Organization\]/g, 'ASK Staffing Inc.');
                        //     bodydata = bodydata.replace(/\[Contract_Duration\/Months\]/g, hireUserInfo.durationofthecontract + ' months');
                        //     bodydata = bodydata.replace("<img src='" + $rootScope.SignImageURL + "' />", "[Signature_Logo]");



                        //     response.data[0].body = bodydata;
                        //     $scope.offerLetterDetail = response.data[0];
                        //     // vm.getCities(hireUserInfo.worklocation);
                        // }
                        // }, 300);
                    },
                    function (err) {
                        ToastrService.error(err.message);
                    }
                )

            }
        }

        function getInitializeOnboardDetail() {
            InitiateOnboardingService.getOfferLetterDetail(5081).then(
                function (response) {
                    var statusData = response.data.splice(0, 1);

                    if (statusData[0].Success) {
                        //response.data[0].body = htmlToPlaintext( response.data[0].body );
                        //$scope.initializeOnboardDetail = response.data[0];
                        var result = response.data;
                        var bodydata = response.data[0].body;
                        bodydata = bodydata.replace(/\[First_Name\]/g, hireUserInfo.firstname);
                        bodydata = bodydata.replace(/\[Last_Name\]/g, hireUserInfo.lastname);
                        bodydata = bodydata.replace(/\[Job_Title\]/g, hireUserInfo.jobtitile);
                        // bodydata = bodydata.replace(/\[/g , '');
                        // bodydata = bodydata.replace(/\]/g , '');
                        response.data[0].body = bodydata;
                        $scope.initializeOnboardDetail = response.data[0];
                    }
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )

        }

        function getWorkFlowList() {
            InitiateOnboardingService.getWorkFlowList(false).then(
                function (response) {
                    vm.workFlowList = response.data;
                    vm.selectedWorkFlow = vm.workFlowList.length ? vm.workFlowList[0].workflowId : null;
                    //vm.selectedWorkFlow = 61;
                    vm.getWorkFlowDetail();
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }

        function getWorkFlowDetail() {
            if (vm.selectedWorkFlow) {
                WorkflowService.getDynamicWorkflow(vm.selectedWorkFlow).then(
                    function (response) {
                        vm.workFlowDetail = response.data['workflow'][0];
                        vm.savedWebformsId = vm.workFlowDetail.webForms;
                        getDesignWebformsList();
                    },
                    function (err) {
                        ToastrService.error(err.message);
                    }
                )

            }
        }
        $scope.doc_name_short = function (name, count) {
            // IE 11 does not accept function params having values 
            if (!count) count = 17;
            if (name.length > count) {
                name = name.substr(0, count - 1) + "...";
            }
            return name;
        }

        function remove_item_from_array(item, array) {
            var index = array.indexOf(item);
            array[index].disable = true;
            //   array.splice(index, 1);  //remove comment
        }

        function remove_item_from_array_obj(item, array) {
            var index = array.indexOf(item);
            array.splice(index, 1);
        }

        $scope.remove_item_from_array = remove_item_from_array;

        $scope.displayBG = function (elemId, docsCount) {
            // ng-init="displayBG(step.StepId || step.altStepId, step.documents.length)"
            // ng-class="step.documents.length > 0 : {background-repeat : no-repeat; background-position : center center; } : '' " ng-style="'background-image' : step.documents.length > 0 ? vm.docBGDisplayImage : ''"
            if (docsCount == 0) {
                var element = document.getElementById(elemId);

                if (element) {
                    element.style.backgroundRepeat = 'no-repeat';
                    element.style.backgroundPosition = 'center center';
                    element.style.backgroundImage = 'url(..' + rootUrl + '/images/drag_drop_doc.png)';
                }
            }
        }

        function vertical_line_ht(docCount) {
            var min_ht = 60;
            if (3 > docCount < 7) {
                min_ht = min_ht + 25 + 10;
            } else if (7 > docCount < 10) {
                min_ht = min_ht + 2(25 + 10);
            }

            return min_ht.toString() + 'px';
        }

        $scope.get_folder_name = function (folderid) {
            if (!originalFoldersList) {
                var originalFoldersList = vm.documents;
                // console.log(originalFoldersList);
            }

            for (var i = 0; i < originalFoldersList.length; i++) {
                if (originalFoldersList[i].folderid == folderid) {
                    return originalFoldersList[i].foldername;
                }
            }
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

        vm.filterFoldersBy = function () {
            vm.searchby = vm.filterby;
        }

        $scope.get_docs_in_folder = function (folderid) {
            var folders = vm.documents;
            var docs_in_fld = [];
            var count = 0;
            for (var i = 0; i < folders.length; i++) {
                if (folders[i].folderid == folderid) {
                    var tempDocSet = folders[i].documents;
                    var tempDirName = folders[i].foldername;
                    break;
                }
            }
            if (tempDocSet) {
                for (var i = 0; i < tempDocSet.length; i++) {
                    var doc_to_push = {
                        'folderId': folderid,
                        'folderName': tempDirName,
                        'documentId': tempDocSet[i].documentId,
                        'name': tempDocSet[i].documentName,
                        'index': i
                    }
                    docs_in_fld.push(doc_to_push);
                }

            }
            return docs_in_fld;
        }

        $scope.get_docs_in_folder_with_setting = function (folderid) {
            var folders = vm.documents;
            var docs_in_fld = [];
            var count = 0;
            for (var i = 0; i < folders.length; i++) {
                if (folders[i].folderid == folderid) {
                    var tempDocSet = folders[i].documents;
                    var tempDirName = folders[i].foldername;
                    break;
                }
            }
            if (tempDocSet) {
                for (var i = 0; i < tempDocSet.length; i++) {
                    var settingsId = [];
                    var obj = $filter('filter')(vm.documents, { 'folderid': folderid });

                    if (obj.length) {
                        var obj1 = $filter('filter')(obj[0].documents, { 'documentId': tempDocSet[i].documentId });
                        if (obj1.length) {
                            settingsId = obj1[0].settings;
                        }
                    }

                    var doc_to_push = {
                        'folderId': folderid,
                        'folderName': tempDirName,
                        'documentId': tempDocSet[i].documentId,
                        'name': tempDocSet[i].documentName,
                        'index': i,
                        'setting': settingsId
                    }
                    docs_in_fld.push(doc_to_push);
                }

            }
            return docs_in_fld;
        }

        $scope.get_document_name = function (docid, folderid) {
            if (!originalFoldersList) {
                var originalFoldersList = vm.documents;
            }

            for (var i = 0; i < originalFoldersList.length; i++) {
                for (var j = 0; j < originalFoldersList[i].documents.length; j++) {
                    if (originalFoldersList[i].documents[j].documentId == docid.toString()) {
                        return originalFoldersList[i].documents[j].documentName;
                    }
                }
            }
        }

        $scope.get_document_setting_id = function (docid) {
            var originalFoldersList = vm.documents;

            for (var i = 0; i < originalFoldersList.length; i++) {
                for (var j = 0; j < originalFoldersList[i].documents.length; j++) {
                    if (originalFoldersList[i].documents[j].documentId == docid.toString()) {
                        return originalFoldersList[i].documents[j].settings;
                    }
                }
            }
            return [];
        }

        // used when dragging doc / folder on to a step
        vm.addDocToStep = function (stepid, folderid, docid) {
            for (var i = 0; i < $scope.wsteps.length; i++) {
                if ($scope.wsteps[i].StepId == stepid || $scope.wsteps[i].altStepId == stepid) {

                    var settingsId = [];
                    var obj = $filter('filter')(vm.documents, { 'folderid': folderid });

                    if (obj.length) {
                        var obj1 = $filter('filter')(obj[0].documents, { 'documentId': docid });
                        if (obj1.length) {
                            settingsId = obj1[0].settings;
                        }
                    }

                    var doc_to_push = {
                        'folderId': Number(folderid),
                        'folderName': $scope.get_folder_name(folderid),
                        'documentId': Number(docid),
                        'name': $scope.get_document_name(docid, folderid),
                        'stepId': Number(stepid),
                        'index': i,
                        'setting': settingsId   // used for putting back the doc in its place if needed
                    };
                    $scope.wsteps[i].documents.push(doc_to_push);
                    $scope.$apply();

                    // if the workflow new then step also is new
                    if (vm.newWorkflow) {
                        var updatedDocs = [];
                        for (var j = 0; j < $scope.wsteps[i].documents.length; j++) {
                            updatedDocs.push({
                                'folderLibrary': { 'folderId': $scope.wsteps[i].documents[j].folderId },
                                'documentLibrary': { 'documentId': $scope.wsteps[i].documents[j].documentId }
                            });
                        }

                        $scope.wsteps[i].workFlowStepsDocs = updatedDocs;
                    }

                    return true;
                }
            }
            // console.log("Looks like doc is not added to step!");
            return false;
        }

        vm.addFolderToStep = function (stepid, folderid) {
            var docsInFolder = $scope.get_docs_in_folder(folderid);
            // console.log(docsInFolder);
            for (var i = 0; i < $scope.wsteps.length; i++) {
                if ($scope.wsteps[i].StepId == stepid || $scope.wsteps[i].altStepId == stepid) {
                    for (var j = 0; j < docsInFolder.length; j++) {


                        var settingsId = [];
                        var obj = $filter('filter')(vm.documents, { 'folderid': folderid });

                        if (obj.length) {
                            var obj1 = $filter('filter')(obj[0].documents, { 'documentId': Number(docsInFolder[j].documentId) });
                            if (obj1.length) {
                                settingsId = obj1[0].settings;
                            }
                        }


                        var doc_to_push = {
                            'folderId': Number(folderid),
                            'folderName': $scope.get_folder_name(folderid),
                            'documentId': Number(docsInFolder[j].documentId),
                            'name': docsInFolder[j].name,
                            'stepId': Number(stepid),
                            'index': i,
                            'setting': settingsId   // used for putting back the doc in its place if needed
                        };
                        $scope.wsteps[i].documents.push(doc_to_push);
                    }
                    // console.log("Step Documents: ", $scope.wsteps[i].documents);
                    // if the workflow new then step also is new
                    if (vm.newWorkflow) {
                        var updatedDocs = [];
                        for (var j = 0; j < $scope.wsteps[i].documents.length; j++) {
                            updatedDocs.push({
                                'folderLibrary': { 'folderId': $scope.wsteps[i].documents[j].folderId },
                                'documentLibrary': { 'documentId': $scope.wsteps[i].documents[j].documentId }
                            });
                        }

                        $scope.wsteps[i].workFlowStepsDocs = updatedDocs;
                    }

                    return true;
                }
            }
            // console.log("Looks like docs in folder are not added to step!");
            return false;
        }

        function add_kv_foreach_item_in_array(array) {
            for (var i = 0; i < array.length; i++) {
                array[i].location = 'dropzone';
            }
        }

        vm.addDocToDropZone = function (folderid, docid) {
            if (!docid) {
                // add all documents in the folder
                var tempSet = $scope.get_docs_in_folder_with_setting(folderid);
                add_kv_foreach_item_in_array(tempSet);
                $scope.draggedDocs = $scope.draggedDocs.concat(tempSet);
            } else {
                // add only that document
                for (var i = 0; i < $scope.draggedDocs.length; i++) {
                    if ($scope.draggedDocs[i].documentId == docid) {
                        // ToastrService.warning("Document already attached to a step. Cannot reuse.");
                        // put the doc back in the folder list
                        vm.add_doc_or_folder_to_list({
                            'folderId': folderid,
                            'folderName': $scope.get_folder_name(folderid),
                            'documentId': docid,
                            'name': $scope.get_document_name(docid, folderid),
                            'index': get_index_of_folder_in_doclist(folderid)
                        });
                        return;
                    }
                }
                var settingsId = [];
                var obj = $filter('filter')(vm.documents, { 'folderid': folderid });

                if (obj.length) {
                    var obj1 = $filter('filter')(obj[0].documents, { 'documentId': docid });
                    if (obj1.length) {
                        settingsId = obj1[0].settings;
                    }
                }

                $scope.draggedDocs.push({
                    'folderId': folderid,
                    'folderName': $scope.get_folder_name(folderid),
                    'documentId': docid,
                    'name': $scope.get_document_name(docid, folderid),
                    'location': 'dropzone',
                    'index': get_index_of_folder_in_doclist(folderid),
                    'setting': settingsId
                });
            }
            // console.log($scope.draggedDocs);
            return $scope.draggedDocs;
        }

        // check if the document is already in any of the steps in the workflow
        function check_if_doc_is_used_in_workflow(docid) {
            for (var i = 0; i < $scope.wsteps.length; i++) {
                // console.log($scope.wsteps[i]);
                for (var j = 0; j < $scope.wsteps[i].documents.length; j++) {
                    if ($scope.wsteps[i].documents[j].documentId == docid) {
                        return true;
                    }
                }
            }

            for (var j = 0; j < $scope.draggedDocs.length; j++) {
                if ($scope.draggedDocs[j].documentId == docid) {
                    return true;
                }
            }

            return false;
        }

        function get_index_of(stepid) {
            for (var i = 0; i < $scope.wsteps.length; i++) {
                if ($scope.wsteps[i].StepId == stepid ||
                    $scope.wsteps[i].altStepId == stepid) {
                    return $scope.wsteps.indexOf($scope.wsteps[i]);
                }
            }
        }

        function get_index_of_folder_in_doclist(folderid) {
            for (var i = 0; i < originalFoldersList.length; i++) {
                if (originalFoldersList[i].folderid == folderid) {
                    return i;
                }
            }
        }

        function get_step_data(stepid) {
            var steps = $scope.wsteps;
            for (var i = 0; i < steps.length; i++) {
                if (steps[i].StepId == stepid || steps[i].altStepId == stepid) {
                    return steps[i];
                }
            }

        }

        vm.add_doc_or_folder_to_list = function (doc) {
            // incase user removes the document / folder from drop zone
            // get doc details from original folders list
            var folderExists = false;
            var folderid = doc.folderId;
            var fname = doc.folderName;
            var docid = doc.documentId;
            var docname = doc.name;
            // console.log('doc to be added: ', doc);

            // check if folder exists
            if (!vm.documents) vm.documents = [];

            for (var i = 0; i < vm.documents.length; i++) {
                if (vm.documents[i].folderid == folderid) {
                    folderExists = true;
                }
            }

            // if the folder is non-existant then add it
            if (!folderExists) {
                var folderData = {
                    'folderid': folderid.toString(),
                    'foldername': fname,
                    'documents': [{ 'documentId': docid.toString(), 'documentName': docname }],
                    'expanded': true
                };
                if (doc.index) {
                    for (var i = 0; i < vm.documents.length; i++) {
                        if (i == doc.index) {
                            vm.documents.splice(i, 0, folderData);
                            return;
                        }
                    }
                    // if the index greater than i, it would not be found!
                    // always adding folder to top
                    // vm.documents.push(folderData);
                    vm.documents.unshift(folderData);
                } else {
                    vm.documents.unshift(folderData);
                }
                // console.log('Folder added: ', folderData);
                return;
            }
            else {
                // if folder is existing then just add the document
                for (var i = 0; i < vm.documents.length; i++) {
                    // if (vm.documents[i].folderid == folderid) {

                    var obj = $filter('filter')(vm.documents[i].documents, { 'documentId': doc.documentId });
                    if (obj.length) {
                        obj[0].disable = false;
                    }
                    //vm.documents[i].documents.unshift({'documentId': docid.toString(), 'documentName': docname});
                    // return;
                    //  }
                }
            }
        }

        vm.checkAllDocsDisabled = function (folder) {
            var allDisabled = true;
            if (folder.documents) {
                for (var i = 0; i < folder.documents.length; i++) {
                    if (!folder.documents[i].disable) {
                        allDisabled = false;
                    }
                }
                return allDisabled;
            }
        }

        function remove_doc_or_folder_from_list(folderid, docid) {
            for (var i = 0; i < vm.documents.length; i++) {
                if (vm.documents[i].folderid == folderid) {
                    if (!docid) {
                        //remove_item_from_array(vm.documents[i], vm.documents);
                        for (var j = 0; j < vm.documents[i].documents.length; j++) {
                            remove_item_from_array(vm.documents[i].documents[j], vm.documents[i].documents);
                        }
                    } else {
                        for (var j = 0; j < vm.documents[i].documents.length; j++) {
                            if (vm.documents[i].documents[j].documentId == docid) {
                                remove_item_from_array(vm.documents[i].documents[j], vm.documents[i].documents);
                            }
                        }
                    }
                }
            }
            for (var i = 0; i < vm.documents.length; i++) {
                if (vm.documents[i].folderid == folderid) {
                    if (vm.documents[i].documents.length == 0) {
                        remove_item_from_array(vm.documents[i], vm.documents);
                    }
                }
            }
        }

        // if user removes a doc from step add it back to the folder / doc list
        vm.remove_doc_and_add_back = function (doc, docList, stepid) {
            // Issue 294 - Added this condition to ensure that step contains atleast one step
            // workaround for resetting step sequence
            if (docList.length == 1) {
                // ToastrService.error($rootScope.errorMsgs.MSG121);
                // return;
            }
            var fisrt, sec;
            for (var i = 0; i < $scope.wsteps.length; i++) {
                // console.log($scope.wsteps[i]);
                for (var j = 0; j < $scope.wsteps[i].documents.length; j++) {
                    if ($scope.wsteps[i].documents[j].documentId == doc.documentId) {
                        fisrt = i;
                        sec = j;
                    }
                }
            }
            if (fisrt != undefined && sec != undefined) {
                $scope.wsteps[fisrt].documents.splice(sec, 1);

            }
            remove_item_from_array_obj(doc, docList);
            if (docList.length == 0) {
                var dropzone = document.getElementById('small-drop-zone');
                if (dropzone) dropzone.style.backgroundImage = 'url(..' + rootUrl + '/images/drag_drop_doc.png)';
            }

            if (stepid && docList.length == 0) {
                var element = document.getElementById('docs-' + stepid);
                if (element) {
                    element.style.backgroundRepeat = 'no-repeat';
                    element.style.backgroundPosition = 'center center';
                    element.style.backgroundImage = 'url(..' + rootUrl + '/images/drag_drop_doc.png)';
                }
            }
            // add it to the sidenav
            vm.add_doc_or_folder_to_list(doc);
        }

        vm.remove_doc_from_step_and_add_back_to_folder_list = function (doc, stepid) {
            for (var i = 0; i < $scope.wsteps.length; i++) {
                if ($scope.wsteps[i].StepId == stepid || $scope.wsteps[i].altStepId == stepid) {
                    var docList = $scope.wsteps[i].documents;
                    break;
                }
            }

            remove_item_from_array(doc, docList);
            if (docList.length == 0) {
                var dropzone = document.getElementById('small-drop-zone');
                if (dropzone) dropzone.style.backgroundImage = 'url(..' + rootUrl + '/images/drag_drop_doc.png)';
            }
            // add it to the sidenav
            vm.add_doc_or_folder_to_list(doc);
        }

        function handleDropEvent(event) {
            event.preventDefault();
            event.stopPropagation();
            var temp = null;
            var step = event.target.id;
            // console.log('Target Element: ' + step);
            step = step.split('-');
            if (!step[1]) step[1] = step[0];
            var data = event.dataTransfer.getData('Text');
            // console.log('Source Element: ' + data);
            // console.log(event.clientX,event.clientY);
            data = data.split('-');
            vm.loadMouseMove = false;

            // get the document name
            if (step[0] == 'drop' ||
                step[0] == 'step' ||
                step[0] == 'istep' ||
                step[0] == 'docs' ||
                step[0] == 'card' ||
                step[0] == 'doccard' ||
                step[0] == 'snameDiv' ||
                step[0] == 'editsfrm' ||
                step[0] == 'editsn' ||
                step[0] == 'divsd' ||
                step[0] == 'icsd' ||
                step[0] == 'editsd') {
                if (data[0] == 'fld') {
                    // console.log("Adding doc to existing Step.");
                    // update the documents array in an existing step
                    if (!check_if_doc_is_used_in_workflow(data[2])) {
                        // console.log("Doc not used in workflow. Adding.");
                        vm.addDocToStep(step[1], data[1], data[2])
                        // 23-Mar CHANDRA - remove background image after adding doc
                        var dzElem = document.getElementById('docs-' + step[1]);
                        if (dzElem) {
                            dzElem.style.backgroundImage = 'none';
                        }
                        // update the documents list
                        $scope.$apply(function () {
                            //remove_doc_or_folder_from_list(data[1], data[2]);
                            remove_doc_from_all_folders(data[2]);
                        });
                    } else {
                        // console.log("Doc already added in this workflow. Not adding again.");
                        ToastrService.warning("Document already added to this or another step. Cannot reuse.");
                        // console.log($scope.wsteps);
                    }
                    return;
                }
                // else if (data[0] == 'folder' && !$scope.newStepEnabled) {
                //     // ToastrService.error("You cannot place a folder on an existing step!");
                //     // return;
                //     // console.log("Adding docs in folder to an existing Step.");
                //     var tempDraggedSet = $scope.get_docs_in_folder(data[1]);
                //     // check if any docs in the folder are already attached to any step
                //     // if yes, remove them
                //     var newTempDraggedSet = [];
                //     var dupFound = false;
                //     // console.log('Before: ', tempDraggedSet);
                //     for (var i = 0; i < tempDraggedSet.length; i++) {
                //         if (check_if_doc_is_used_in_workflow(tempDraggedSet[i].documentId)) {
                //             dupFound = true;
                //             newTempDraggedSet.push(tempDraggedSet[i]);
                //         }
                //     }
                //     // now remove duplicates
                //     if (dupFound) {
                //         for (var i = 0; i < newTempDraggedSet.length; i++) {
                //             remove_item_from_array(newTempDraggedSet[i], tempDraggedSet);
                //         }
                //     }
                //     // console.log('After: ', tempDraggedSet);
                //     if (!dupFound) {
                //         // add all docs 
                //         vm.addFolderToStep(step[1], data[1]);
                //         // update the folders (and docs) list
                //         remove_doc_or_folder_from_list(data[1], null);
                //     } else {
                //         //ToastrService.warning("One or more documents, of this folder, already used in this workflow. Cannot reuse.");
                //         for (var i = 0; i < tempDraggedSet.length; i++) {
                //             if (!check_if_doc_is_used_in_workflow(tempDraggedSet[i].documentId)) {
                //                 vm.addDocToStep(step[1], Number(data[1]), tempDraggedSet[i].documentId);
                //                 //remove_doc_or_folder_from_list(data[1], tempDraggedSet[i].documentId);

                //                 remove_doc_from_all_folders(tempDraggedSet[i].documentId);
                //             }
                //         }
                //     }

                //     // If for an existing / new step all docs are removed and another folder added
                //     var dzElem = document.getElementById('docs-' + step[1]);
                //     if (dzElem) {
                //         dzElem.style.backgroundImage = 'none';
                //     }

                // }
                // user is trying to drag a folder
                else if (data[0] == 'folder') {
                    // console.log("Adding docs in folder to new Step.");
                    var tempDraggedSet = $scope.get_docs_in_folder(data[1]);
                    // check if any docs in the folder are already attached to any step
                    // if yes, remove them
                    var newTempDraggedSet = [];
                    var dupFound = false;
                    for (var i = 0; i < tempDraggedSet.length; i++) {
                        if (check_if_doc_is_used_in_workflow(tempDraggedSet[i].documentId)) {
                            dupFound = true;
                            newTempDraggedSet.push(tempDraggedSet[i]);
                        }
                    }
                    // now remove duplicates
                    if (dupFound) {
                        for (var i = 0; i < newTempDraggedSet.length; i++) {
                            remove_item_from_array(newTempDraggedSet[i], tempDraggedSet);
                        }
                    }
                    // console.log('After', tempDraggedSet);
                    if (!dupFound) {
                        // add all docs 
                        vm.addFolderToStep(step[1], data[1]);
                        // update the folders (and docs) list
                        remove_doc_or_folder_from_list(data[1], null);
                    } else {
                        //ToastrService.warning("One or more documents, of this folder, already used in this workflow. Cannot reuse.");
                        for (var i = 0; i < tempDraggedSet.length; i++) {
                            if (!check_if_doc_is_used_in_workflow(tempDraggedSet[i].documentId)) {
                                vm.addDocToStep(step[1], Number(data[1]), tempDraggedSet[i].documentId);
                                //remove_doc_or_folder_from_list(data[1], tempDraggedSet[i].documentId);
                                remove_doc_from_all_folders(tempDraggedSet[i].documentId);
                            }
                        }
                    }
                }

                // step reorder / swapping
                if (data[0] == 'id') {
                    // reorder handling
                    var targetStepId = Number(step[1]);
                    var sourceStepId = Number(data[1]);

                    var targetIndex = get_index_of(targetStepId);
                    var sourceIndex = get_index_of(sourceStepId);
                    // console.log("Source Index: ", sourceIndex);
                    // console.log("Target Index: ", targetIndex);
                    var tempS = get_step_data(sourceStepId);
                    // console.log(tempS);
                    var tempT = get_step_data(targetStepId);
                    // console.log(tempT);
                    if (!tempT) {
                        // console.log("Step re-order Failed!!");
                        return;
                    }
                    $scope.wsteps[sourceIndex] = tempT;
                    var sqT = tempT.sequencenumber;

                    $scope.wsteps[targetIndex] = tempS;
                    $scope.wsteps[sourceIndex].sequencenumber = tempS.sequencenumber;
                    $scope.wsteps[targetIndex].sequencenumber = sqT;
                    // console.log($scope.wsteps);

                }
                $scope.$apply();
                return;
            }
            // user is trying to drag a folder
            if (data[0] == 'folder') {
                // console.log("Adding docs in folder to new Step.");
                var tempDraggedSet = $scope.get_docs_in_folder(data[1]);
                // check if any docs in the folder are already attached to any step
                // if yes, remove them
                var newTempDraggedSet = [];
                var dupFound = false;
                for (var i = 0; i < tempDraggedSet.length; i++) {
                    if (check_if_doc_is_used_in_workflow(tempDraggedSet[i].documentId)) {
                        dupFound = true;
                        newTempDraggedSet.push(tempDraggedSet[i]);
                    }
                }
                // now remove duplicates
                if (dupFound) {
                    for (var i = 0; i < newTempDraggedSet.length; i++) {
                        remove_item_from_array(newTempDraggedSet[i], tempDraggedSet);
                    }
                }
                // console.log('After', tempDraggedSet);
                if (!dupFound) {
                    // add all docs 
                    vm.addDocToDropZone(Number(data[1]), null);
                    // update the folders (and docs) list
                    //remove_doc_or_folder_from_list(data[1], null);
                    for (var i = 0; i < tempDraggedSet.length; i++) {
                        //if (!check_if_doc_is_used_in_workflow(tempDraggedSet[i].documentId)) {
                        vm.addDocToDropZone(Number(data[1]), tempDraggedSet[i].documentId);
                        //remove_doc_or_folder_from_list(data[1], tempDraggedSet[i].documentId);
                        remove_doc_from_all_folders(tempDraggedSet[i].documentId);
                        //}
                    }
                } else {
                    ToastrService.warning("One or more documents already used in this workflow. Cannot reuse.");
                    for (var i = 0; i < tempDraggedSet.length; i++) {
                        if (!check_if_doc_is_used_in_workflow(tempDraggedSet[i].documentId)) {
                            vm.addDocToDropZone(Number(data[1]), tempDraggedSet[i].documentId);
                            //remove_doc_or_folder_from_list(data[1], tempDraggedSet[i].documentId);
                            remove_doc_from_all_folders(tempDraggedSet[i].documentId);
                        }
                    }
                    if ($scope.draggedDocs.length == 0) {
                        var dropzone = document.getElementById('small-drop-zone');
                        if (dropzone) dropzone.style.backgroundImage = 'url(..' + rootUrl + '/images/drag_drop_doc.png)';
                    }
                }
            }
            else if (data[0] == 'fld') {
                // adding document to a new step
                //console.log("Adding doc to new Step.");
                // check if the doc is attached to any of the steps
                // if yes, do not allow it to be added again.
                if (!check_if_doc_is_used_in_workflow(data[2])) {
                    vm.addDocToDropZone(Number(data[1]), Number(data[2]));
                    // update the documents list
                    //remove_doc_or_folder_from_list(data[1], data[2]);
                    remove_doc_from_all_folders(data[2]);
                } else {
                    ToastrService.warning("Document already used in this or another step. Cannot reuse.");
                    if ($scope.draggedDocs.length == 0) {
                        var dropzone = document.getElementById('small-drop-zone');
                        if (dropzone) dropzone.style.backgroundImage = 'url(..' + rootUrl + '/images/drag_drop_doc.png)';
                    }
                    return;
                }
            }
            else {
                // var dropzone = document.getElementById('small-drop-zone');
                // if (dropzone) dropzone.style.backgroundImage = 'url(..' + rootUrl + '/images/drag_drop_doc.png)';    
                // console.log('Drag failed!.');
                return;
            }
            // refresh the front-end
            $scope.$apply();
        }

        DocDropService.removeAllListeners();
        DocDropService.addListener(document.body, 'drop', handleDropEvent, false);



        function remove_doc_from_all_folders(docid) {
            for (var i = 0; i < vm.documents.length; i++) {
                if (!docid) {
                    //remove_item_from_array(vm.documents[i], vm.documents);
                    for (var j = 0; j < vm.documents[i].documents.length; j++) {
                        remove_item_from_array(vm.documents[i].documents[j], vm.documents[i].documents);

                    }
                } else {
                    for (var j = 0; j < vm.documents[i].documents.length; j++) {
                        if (vm.documents[i].documents[j].documentId == docid) {
                            remove_item_from_array(vm.documents[i].documents[j], vm.documents[i].documents);
                        }
                    }
                }
            }
            for (var i = 0; i < vm.documents.length; i++) {
                if (vm.documents[i].documents.length == 0) {
                    remove_item_from_array(vm.documents[i], vm.documents);
                }
            }
        }

        function disableExistDocandfolder() {
            for (var i = 0; i < $scope.wsteps.length; i++) {
                for (var j = 0; j < $scope.wsteps[i].documents.length; j++) {
                    for (var k = 0; k < vm.documents.length; k++) {
                        // for (var l = 0; l < vm.documents[k].documents.length; l++) {
                        //     vm.documents[k].documents[l].disable = false;

                        // }
                        var obj = $filter('filter')(vm.documents[k].documents, { 'documentId': $scope.wsteps[i].documents[j].documentId });

                        //obj[0].disable = false;
                        //obj[0].disable = false;
                        if (obj && obj.length) {
                            obj[0].disable = true;
                        }

                    }


                    //$scope.wsteps[i].documents[j].documentId
                }
            }
        }


        var originalFoldersList = null;

        $scope.draggedDocs = [];

        $scope.wsteps = [];
        var rootUrl = $rootScope.rootUrl;
        var editingstep = null;
        // used during creating a new workflow
        function getNewWorkflowFoldersList() {
            WorkflowService.getNewWorkflowFoldersList(false).then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        vm.documentsoriginal = response.data;
                        vm.documentsoriginal.shift();
                        // 30-Mar CHANDRA - This filtering is done because API is having problem doing this
                        for (var i = 0; i < vm.documentsoriginal.length; i++) {
                            var mDt = vm.documentsoriginal[i].modifiedDt.substring(0, 19);
                            mDt = mDt.replace(/-/g, '/');
                            vm.documentsoriginal[i].modifiedDt = new Date(mDt);
                        }
                        vm.documentsoriginal = $filter('orderBy')(vm.documentsoriginal, 'modifiedDt', true);
                        // console.log("New Workflow Folders: ", vm.documents);

                        originalFoldersList = angular.copy(vm.documentsoriginal);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG180);
                }
            )
        }
        getNewWorkflowFoldersList();

        vm.buildNewStep = function () {
            var ary = $filter('filter')(vm.workFlowDetail.steps, { 'StepId': editingstep.StepId });
            //vm.workFlowDetail.steps.
            ary[0].documents = angular.copy($scope.draggedDocs);
            $mdDialog.hide();
        }

        vm.editStep = function (ev, work, stepName) {
            vm.searchby = '';
            vm.filterby = '';
            vm.documents = angular.copy(vm.documentsoriginal);
            $mdDialog.show({
                targetEvent: ev,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                escapeToClose: true,

                scope: $scope,
                preserveScope: true,
                templateUrl: $rootScope.rootUrl + '/components/hire_info/initiate_onboarding/deletestepinitiate.html',
            });
            editingstep = angular.copy(work);
            $scope.draggedDocs = angular.copy(work.documents);
            vm.stpname = work.stepName;
            vm.stpdsc = work.stepDesc;
            $scope.wsteps = angular.copy(vm.workFlowDetail.steps);
            disableExistDocandfolder();
            var dropzone = document.getElementById('small-drop-zone');
            if (dropzone) dropzone.style.backgroundImage = '';

            if ($scope.draggedDocs.length == 0) {
                //var dropzone = document.getElementById('small-drop-zone');
                if (dropzone) dropzone.style.backgroundImage = 'url(..' + rootUrl + '/images/drag_drop_doc.png)';
            }
        }

        vm.showStepDeleteConfirm = function (ev, work, stepName) {
            // if it is the only step in workflow then err out
            if (vm.workFlowDetail.steps.length == 1) {
                ToastrService.error($rootScope.errorMsgs.MSG181);
                return;
            }
            var id = vm.workFlowDetail.steps.indexOf(work);

            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                template: '<md-dialog aria-label="Delete" style="width:400px;">' +
                    '<div layout="column" layout-align="start end" style="padding:10px;">' +
                    '<ng-md-icon icon="clear" size="14" style="margin:8px 0 -23px 0;cursor:pointer" ng-click="vm.closeDeleteModal()">' +
                    '</ng-md-icon>' +
                    '</div>' +
                    '<md-content style="background-color:white">' +
                    '<div layout="column" layout-align="center center"><img src="images/que_icon.png" width="70px" height="70px"/></div>' +
                    '<p align=center style="padding:10px 10px 20px 20px;font-size:13px; word-break: break-all;" >Are you sure you want to delete the Step - ' + stepName + '?</p>' +
                    '<md-divider></md-divider>' +
                    '<div layout="row" layout-align="end center" style="background-color:rgb(250,250,250);height:60px;padding:10px" flex>' +
                    '<md-button class="md-raised md-primary" ng-click="vm.deleteStep(' + id + ')" >OK</md-button>' +
                    '<md-button class="md-secondary" ng-click="vm.closeDeleteModal()">Cancel</md-button>' +
                    '</div>' +
                    '</md-content>' +
                    '</md-dialog>'
            });
        }
        vm.closeDeleteModal = function () {
            $mdDialog.cancel();
        }

        vm.deleteStep = function (indx) {
            vm.workFlowDetail.steps.splice(indx, 1);
            vm.closeDeleteModal();
        }

        // function htmlToPlaintext(text) {
        //     // return text ? String(text).replace(/<[^>]+>/gm, '') : '';
        //     return text ? String(text).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').replace(/&\w+;/g ,'X').replace(/^\s*/g, '').replace(/\s*$/g, '') : '';
        // }

        function init() {
            vm.getOfferLetters();
            vm.getWorkFlowList();
            //vm.getInitializeOnboardDetail();
        }



        vm.htmlToPlaintext = function (text) {
            // return text ? String(text).replace(/<[^>]+>/gm, '') : '';
            return text ? String(text).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').replace(/&\w+;/g, 'X').replace(/^\s*/g, '').replace(/\s*$/g, '') : '';
        }
        if (screen.width == 1024) {
            vm.previewleft = '-15px';
            vm.minwidthforeditstep = '790px';
            vm.minwidthforeditstep = '790px';
            vm.widthforeditstep = '450px';
            vm.minwidthforrightnav = '204px';
            vm.widthfordrop = '400px';
        }

        $scope.browserType = function () {
            if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                vm.marginforngicon = '-4px';
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                vm.marginforngicon = '-4px';
                vm.marginforp = '3px';
                vm.marginformdicon = '-2px';
            }
        }
        $scope.browserType();


        CKEDITOR.on('instanceReady', function () {
            init();

        });

        $scope.trustAsHtml = function (desc) {
            return $sce.trustAsHtml(desc);
        };

        function getDesignWebformsList() {
            DesignWebformsService.getWebformsList().then(
                function (response) {
                    if (response.data) {
                        vm.webformsList = response.data;
                        // if ($stateParams.id) {
                        for (var n = 0; n < vm.webformsList.length; n++) {
                            if (vm.savedWebformsId.indexOf(vm.webformsList[n].webFormId) != -1) {
                                vm.webformsList[n].isChecked = true;
                            }
                            else {
                                vm.webformsList[n].isChecked = false;
                            }
                            if (vm.webformsList[n].subWebForms && vm.webformsList[n].subWebForms.length > 0) {
                                for (var o = 0; o < vm.webformsList[n].subWebForms.length; o++) {
                                    if (vm.savedWebformsId.indexOf(vm.webformsList[n].subWebForms[o].webFormId) != -1) {
                                        vm.webformsList[n].subWebForms[o].isChecked = true;
                                    }
                                }
                            }
                        }
                        // }
                        // else {
                        // for (var i = 0; i < vm.webformsList.length; i++) {
                        //     if (vm.webformsList[i].isCommForm) {
                        //         vm.webformsList[i].isChecked = true;
                        //     }
                        //     else {
                        //         vm.webformsList[i].isChecked = false;
                        //     }
                        //     if (vm.webformsList[i].subWebForms && vm.webformsList[i].subWebForms.length > 0) {
                        //         for (var j = 0; j < vm.webformsList[i].subWebForms.length; j++) {
                        //             vm.webformsList[i].subWebForms.isChecked = false;
                        //         }
                        //     }
                        // }
                        // }
                        vm.masterformsList = angular.copy($filter('filter')(vm.webformsList, { 'isCustWebForm': false, 'isNewHireForm': false }));
                        vm.otherMasterformsList = angular.copy(vm.masterformsList.splice(2));
                        vm.customWebformsList = angular.copy($filter('filter')(vm.webformsList, { 'isCustWebForm': true }));
                        for (var a = 0; a < vm.masterformsList.length; a++) {
                            if (vm.masterformsList[a].subWebForms && vm.masterformsList[a].subWebForms.length > 0) {
                                for (var b = 0; b < vm.masterformsList[a].subWebForms.length; b++) {
                                    if (!vm.masterformsList[a].subWebForms[b].isRestored) {
                                        vm.masterformsList[a].subWebForms.splice(b, 1);
                                    }
                                }
                            }
                            if (!vm.masterformsList[a].isRestored && !vm.masterformsList[a].isCommForm) {
                                vm.masterformsList.splice(a, 1);
                            }
                        }
                        for (var c = 0; c < vm.otherMasterformsList.length; c++) {
                            if (!vm.otherMasterformsList[c].isRestored) {
                                vm.otherMasterformsList.splice(c, 1);
                            }
                        }
                    }
                    else {
                        ToastrService.error('An error occured while retrieving the Webforms Data');
                    }
                },
                function (err) {

                }
            )
        }


    }
})();