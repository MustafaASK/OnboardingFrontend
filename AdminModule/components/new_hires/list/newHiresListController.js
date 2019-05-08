(function () {
    'use strict';
    hrAdminApp.controller('NewHiresController', newHiresController);
    newHiresController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$mdDialog', 'ToastrService', 'NewHiresService', '$filter', 'ReportsService','DesignWebformsService'];

    function newHiresController($rootScope, $scope, $state, $stateParams, $mdDialog, ToastrService, NewHiresService, $filter, ReportsService, DesignWebformsService) {

        var vm = this;
        vm.newHiresSearch = false;
        vm.stopOnboardingText = 'Stop Onboarding - ';
        // vm.headerHeight='15%';
        vm.filterby = '';
        vm.filterKey = '';
        vm.currentPage = 0;
        $scope.newHiresPerPage = 20;
        $scope.itemsPerRow = 4;
        vm.headerHeight = '90px';
        vm.searchCategory = 'fullName';

        vm.rolesData = {};
        vm.sendOfferData = {};
        vm.newHires = [];
        $scope.loading = true;

        // NewHiresService.updateNewHireStatus().then(
        //     function (response) {
        //         ToastrService.success('status updated successfully');
        //     },
        //     function (err) {
        //         ToastrService.error('ERROR: Could not get New Hires status list.');
        //     }
        // )

        if (!$rootScope.UserInfo.isAdmin) {
            var roles = $rootScope.UserInfo.roles;
            if (roles.length) {
                var rolesData = $filter('filter')(roles, {
                    role: "NewHire"
                });
                if (rolesData.length) {
                    vm.rolesData = rolesData[0];
                }
                var sendOfferData = $filter('filter')(roles, {
                    role: "Send Offer Letter"
                });
                if (sendOfferData.length) {
                    vm.sendOfferData = sendOfferData[0];
                }
                var stopOnboardData = $filter('filter')(roles, {
                    role: "Stop Onboarding"
                });
                if (stopOnboardData.length) {
                    vm.stopOnboardData = stopOnboardData[0];
                }


            }
        }

        vm.gotoinitialize = function (newhire) {
            if (newhire.status == 1) {
                $state.go('hire-info.initiate-onboarding', {
                    hireId: newhire.newhireid
                });
            } else {
                $state.go('hire-info.review-certify', {
                    hireId: newhire.newhireid
                });
            }
        }

        vm.headerHeight = '90px';
        //vm.contentHeight = '480px';
        vm.contentHeight = {
            height: 480 + 'px'
        };

        if (screen.width == 1024) {
            $scope.itemsPerRow = 3;
            $scope.newHiresPerPage = 18;
        }

        vm.newHiresSearchBoxDisplay = function () {
            vm.newHiresSearch = (vm.newHiresSearch ? false : true);
            // vm.headerHeight = (vm.newHiresSearch ? '120px' : '90px');
            // vm.contentHeight = (vm.newHiresSearch ? { height: 440 + 'px' } : { height: 480 + 'px' });
            var searchBox = document.getElementById('search-box');
            if (searchBox) {
                window.setTimeout(function () {
                    searchBox.focus();
                }, 0);
            }

        }

        vm.filters = [{
            key: 'firstname',
            value: 'First Name'
        },
        {
            key: 'lastname',
            value: 'Last Name'
        },
        {
            key: 'createddt',
            value: 'Created Date'
        },
        {
            key: 'modifydt',
            value: 'Modified Date'
        }
        ];

        function newHiresStatus() {
            NewHiresService.getNewHiresStatus().then(
                function (response) {
                    vm.newHiresStatusList = response.data;

                    getNewHiresList();

                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG185);
                }
            )
        }
        newHiresStatus();



        function getNewHiresList() {
            $scope.loading = true;
            NewHiresService.getNewHiresList(true).then(
                function (response) {
                    $scope.loading = false;
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        vm.newHires = response.data;
                        if (vm.newHires.length > 1)
                            vm.newHires = vm.newHires.splice(-1 * (vm.newHires.length - 1));
                        else
                            vm.newHires = [];

                        for (var i = 0; i < vm.newHires.length; i++) {
                            var modifyTime = '';
                            var dateString = vm.newHires[i].modifydt.substring(0, 16);
                            dateString = dateString.replace(/-/g, '/');
                            var dateObj = new Date(dateString);
                            // var momentObj = moment(dateObj);
                            // modifyTime = momentObj.format("MM/DD/YYYY  hh:mm A");
                            //createdTime=$filter('date')(new Date(vm.newHires[i].createddt.split('-').join('/')), "MM/dd/yyyy ' ' h:mm a");
                            //createdTime=moment(vm.newHires[i].createddt).format('MM dd YYYY, h:mm:ss a');
                            vm.newHires[i].modifyDate = dateObj;
                            // var newDate = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60 * 1000);
                            // var offset = dateObj.getTimezoneOffset();
                            // var hours = dateObj.getHours() * 60;
                            // var minutes = dateObj.getMinutes();
                            // newDate.setHours((hours + minutes - offset) / 60);
                            var newDate = moment.utc(dateString).local().format();
                            vm.newHires[i].modifyDateFormat = newDate;
                            vm.newHires[i].fullName = vm.newHires[i].firstname + ' ' + vm.newHires[i].lastname;
                        }

                        $scope.pagination(vm.newHires);

                        // vm.newHires[i].createdDate = createdTime;
                        // Math.round(Math.abs((new Date(fromDate).getTime() - new Date(toDate).getTime())/(24*60*60*1000)));
                    }

                    assignNewHiresStatus();
                },
                function (err) {
                    $scope.loading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG159);
                }
            )
        }
        // getNewHiresList();
        $scope.pagination = function (itemList) {
            if (!itemList) return false;

            vm.paging = {
                total: Math.ceil(itemList.length / $scope.newHiresPerPage),
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
            // console.log("Number of records: ", count);
            return Math.ceil(count / $scope.newHiresPerPage);
        }

        $scope.getClassByStatus = function (newHires) {
            if (newHires.status == 1) return 'newhire';
            if (newHires.status == 2) return 'initiated';
            if (newHires.status == 3) return 'accepted';
            if (newHires.status == 4) return 'rejected';
            if (newHires.status == 5) return 'noresponse';
            if (newHires.status == 6) return 'pending';
            if (newHires.status == 7) return 'review';
            if (newHires.status == 8) return 'inprogress';
            if (newHires.status == 9) return 'hrrejected';
            if (newHires.status == 10) return 'completed';

        }
        // vm.newHiresStatusList = [
        //     { 'status': 1, 'status': 'Initiated', 'value': 'initiated' },
        //     { 'status': 2, 'status': 'New Hire', 'value': 'newhire' },
        //     { 'status': 3, 'status': 'In progress', 'value': 'inprogress' },
        //     { 'status': 4, 'status': 'Completed', 'value': 'completed' }
        // ];

        vm.searchNewHiresBy = function () {
            if (vm.searchCategory == 'fullName') {
                vm.searchbyName = vm.filterby;
                vm.searchbyClient = '';
                vm.searchbyStatus = '';
                vm.searchbyJobTitle = '';
            } else if (vm.searchCategory == 'clientname') {
                vm.searchbyClient = vm.filterby;
                vm.searchbyName = '';
                vm.searchbyStatus = '';
                vm.searchbyJobTitle = '';
            } else if (vm.searchCategory == 'status') {
                vm.searchbyStatus = vm.filterby;
                vm.searchbyName = '';
                vm.searchbyClient = '';
                vm.searchbyJobTitle = '';
            } else if (vm.searchCategory == 'jobtitle') {
                vm.searchbyJobTitle = vm.filterby;
                vm.searchbyStatus = '';
                vm.searchbyName = '';
                vm.searchbyClient = '';
            }

            // vm.searchitem = vm.searchCategory;
        }

        function loadPages() {
            // console.log('Current page is : ' + vm.paging.current);
            // TODO : Load current page Data here
            vm.currentPage = vm.paging.current;
        }

        function assignNewHiresStatus() {
            for (var i = 0; i < vm.newHires.length; i++) {
                for (var j = 0; j < vm.newHiresStatusList.length; j++) {
                    if (vm.newHires[i].status == vm.newHiresStatusList[j].statusid) {
                        vm.newHires[i].statusName = vm.newHiresStatusList[j].statusname;
                    }
                }
            }

        }

        vm.downloadExcel = function (ev, newHire) {
            NewHiresService.getNewHireJson(newHire.newhireid).then(
                function (response) {
                    var tempComponents = response.data.masterJsonData ? response.data.masterJsonData.components : (response.data.jsonData.components ? response.data.jsonData.components : []);
                  
                    //$scope.formFields = tempComponents;
                    var makingData = [];
                    
                    for (var i=0;i<tempComponents.length; i++) {
                        if(tempComponents[i].Type != 'devider' && tempComponents[i].Type != 'attachment' && tempComponents[i].Type != 'header' && tempComponents[i].Type != 'emptyspace'){
                            var obj = { 'LABEL NAME': tempComponents[i].labelName, 'VALUE': tempComponents[i].value };
                            makingData.push(obj);
                        }
                        
                    }
                    var ws = XLSX.utils.json_to_sheet(makingData);
                    //console.log(ws);
                        // ws['A1'].v = {
                        //     "font": {
                        //         "bold": true
                        //     },
                        //     alignment: {
                        //         wrapText: '1', // any truthy value here
                        //     }
                        // };
                        // ws['B1'].v = {
                        //     "font": {
                        //         "bold": true
                        //     },
                        //     alignment: {
                        //         wrapText: '1', // any truthy value here
                        //     }
                        // };
                        // ws['A1'].s = {
                        //     alignment: {
                        //         wrapText: '1', // any truthy value here
                        //     },
                        // };
                        /* add to workbook */
                        var wb = XLSX.utils.book_new();
                        XLSX.utils.book_append_sheet(wb, ws, "NewHires");

                        /* write workbook and force a download */
                        XLSX.writeFile(wb, newHire.fullName + ".xlsx");

                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
            // NewHiresService.getNewHiresExcelReport(newHire.newhireid).then(
            //     function (response) {
            //         if (response.data) {
            //             var makingData = [];
            //             var exceldata;
            //             exceldata = response.data;
            //             //if (exceldata && exceldata.length) {
            //             // var headerData = '';
            //             // angular.forEach(exceldata, function (value, key) {
            //             //     if (value) {
            //             //         makingData = makingData.concat(value);
            //             //         if (!headerData) {
            //             //             headerData = Object.keys(value)
            //             //         }
            //             //     }

            //             // });
            //             for (var key in exceldata) {
            //                 var obj = { 'LABEL NAME': key, 'VALUE': exceldata[key] };
            //                 makingData.push(obj);
            //             }
            //             // var cell = {v: data[R][C], s: { alignment: {textRotation: 90 }, font: {sz: 14, bold: true, color: "#FF00FF" }} };

            //             /* generate a worksheet */
            //             var ws = XLSX.utils.json_to_sheet(makingData);
            //             // ws['A1'].s = {
            //             //     "font": {
            //             //         "bold": true
            //             //     }
            //             // };
            //             // ws['A1'].s = {
            //             //     alignment: {
            //             //         wrapText: '1', // any truthy value here
            //             //     },
            //             // };

            //             /* add to workbook */
            //             var wb = XLSX.utils.book_new();
            //             XLSX.utils.book_append_sheet(wb, ws, "NewHires");

            //             /* write workbook and force a download */
            //             XLSX.writeFile(wb, newHire.fullName + ".xlsx");

            //             //vm.JSONToCSVConvertor(makingData, 'Vehicle Report', true);
            //             //exportCSVFile(headerData, makingData, 'Candidates_Reports'); 
            //             //}
            //         } else {
            //             ToastrService.error(response.data.message);
            //         }
            //     },
            //     function (err) {
            //         ToastrService.error(err.message);
            //     }
            // )
        }

        vm.stopOnboarding = function (ev, newhireid, newhirefullname) {
            $mdDialog.show({
                locals: {
                    newhireid: newhireid,
                    newhirefullname: newhirefullname
                },
                templateUrl: $rootScope.rootUrl + '/components/new_hires/stop_onboarding/stop_onboarding.html',
                controller: ['$scope', '$window', 'newhireid', 'newhirefullname', function ($scope, $window, newhireid, newhirefullname) {
                    var vm = this;
                    $scope.newhirefullname = newhirefullname;
                    $scope.submitted = false;
                    $scope.reason = '';
                    $scope.otherreasons = '';
                    $scope.comments = '';
                    $scope.attachedFiles = [];
                    $scope.file = null;
                    $scope.totalFileSize = 0;
                    $scope.errorMsgs = $rootScope.errorMsgs;

                    $scope.newHires_short_name = function (newhirefullname) {
                        if (newhirefullname.length > 30) {
                            newhirefullname = newhirefullname.substr(0, 29) + "...";
                        }
                        return newhirefullname;
                    }

                    $scope.closeDeleteModal = function () {
                        $mdDialog.cancel();
                    }
                    $scope.htmlToPlaintext = function (text) {
                        return text ? String(text).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').replace(/&\w+;/g, '').replace(/^\s*/g, '').replace(/\s*$/g, '') : '';
                    }

                    $scope.changeReason = function (reason) {
                        if (reason != 'Other') {
                            $scope.stopOnboardingForm.otherreason.$setUntouched();
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

                    $scope.cnfmstopOnboarding = function (isFrmValid) {
                        $scope.submitted = true;


                        if (!isFrmValid || !($scope.htmlToPlaintext($scope.comments).length)) {
                            ToastrService.error('Please fill all the mandatory fields');
                            return;
                        }
                        if ($scope.htmlToPlaintext($scope.comments).length > 2000) {
                            ToastrService.error($rootScope.errorMsgs.MSG272);
                            return;
                        }
                        if ($scope.reason == 'Other') {
                            if (!$scope.otherreasons) {
                                ToastrService.error('Please enter the other reason. It can’t be blank.');
                                return;
                            }
                        }
                        var parsedBody = parseTbody($scope.comments);
                        if (!parsedBody || parsedBody == '') {
                            ToastrService.error('Please enter a valid Comments for Rejection. It can’t be blank.');
                            return;
                        }

                        // return;
                        $scope.loading = true;
                        var objStopOnboard = new FormData();
                        objStopOnboard.append("newhireid", newhireid);
                        objStopOnboard.append("newhirestatus", '9');
                        objStopOnboard.append("reason", $scope.reason == 'Other' ? $scope.otherreasons.trim() : $scope.reason);

                        $scope.comments = $scope.comments.replace(/<p style="/g, "<p style=\"margin:0;padding:0;");
                        $scope.comments = $scope.comments.replace(/<p>/g, "<p style=\"margin:0;padding:0;\">");
                        $scope.comments = "<div style='font-family: Verdana;font-size:12px;'>" +
                            "<p style='margin:0;padding:0;'>Dear HR Team,</p>" + "<p style='margin:0;padding:0;'>&nbsp;</p>" + "<p style='margin:0;padding:0;'>Below are the details for Stop Onboarding,</p>" + "<p style='margin:0;padding:0;'>&nbsp;</p>" + $scope.comments + "<p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>&nbsp;</p><p style='margin:0;padding:0;margin-left:0px; margin-right:0px'>&nbsp;</p>" +
                            "<p style='margin:0;padding:0;'>Thanks</p><p style='margin:0;padding:0;'>Onboarding Team</p><p style='margin:0;padding:0;'>ASK Staffing, Inc.</p>" + "</div>";
                        objStopOnboard.append("body", $scope.comments);

                        if ($scope.attachedFiles.length > 0) {
                            for (var i = 0; i < $scope.attachedFiles.length; i++) {
                                objStopOnboard.append('attachment', $scope.attachedFiles[i]);
                            }
                        } else {
                            objStopOnboard.append('attachment', '');
                        }
                        // objStopOnboard.append("attachment", $scope.attachedFiles);


                        NewHiresService.stopOnboarding(objStopOnboard).then(
                            function (response) {
                                if (response.data.Success) {
                                    $scope.closeDeleteModal();
                                    getNewHiresList();
                                    ToastrService.success(response.data.message);
                                    // ToastrService.success(response.data.message);
                                    // $state.go('NewHires');
                                } else {
                                    ToastrService.error(response.data.message);
                                }
                            },
                            function (err) {
                                ToastrService.error('Unable to Stop Onboarding for the NewHire.');
                                return;
                            }
                        )

                    }

                    $scope.deleteAttachedFile = function (index, filesize) {
                        $scope.attachedFiles.splice(index, 1);
                        $scope.totalFileSize -= filesize;
                    }

                    NewHiresService.getReasonsForRejections().then(
                        function (response) {
                            $scope.reasonsForRejection = response.data;
                        },
                        function (err) {
                            ToastrService.error("Unable to get data of Reasons for Rejections");
                            return;
                        }
                    )

                    $scope.viewFile = function (attachfile) {
                        if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                            window.navigator.msSaveOrOpenBlob(new Blob([attachfile], { type: attachfile.type }), attachfile.name);
                        } else {
                            $window.open((window.URL || window.webkitURL).createObjectURL(attachfile), '_blank');
                        }
                        // $window.open((window.URL || window.webkitURL).createObjectURL(attachfile), '_blank');
                        // window.navigator.msSaveBlob(new Blob([attachfile], {type:attachfile.type}), attachfile.name);
                        // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        //     // var fileName = escapeHtml(attachfile.name);
                        //     window.navigator.msSaveOrOpenBlob(attachfile, attachfile.name);
                        // } else {
                        //     $window.open(window.URL.createObjectURL(attachfile), '_blank');
                        // }

                    }

                    $scope.$watch('file', function () {
                        if ($scope.file && $scope.file.length) {
                            for (var i = 0; i < $scope.file.length; i++) {
                                if ($scope.totalFileSize + Math.round(($scope.file[i].size / (1024 * 1024)) * 100) / 100 <= 10.00) {
                                    if ($scope.attachedFiles.length == 0) {
                                        $scope.attachedFiles[i] = $scope.file[i];
                                        $scope.attachedFiles[i].rndmId = '_' + Math.random().toString(36).substr(2, 9);
                                        $scope.totalFileSize += Math.round(($scope.file[i].size / (1024 * 1024)) * 100) / 100;
                                    } else if ($scope.attachedFiles.length > 0 && $scope.attachedFiles.length < 3) {
                                        var count = $scope.attachedFiles.length;
                                        $scope.attachedFiles[count] = $scope.file[i];
                                        $scope.attachedFiles[count].rndmId = '_' + Math.random().toString(36).substr(2, 9);
                                        $scope.totalFileSize += Math.round(($scope.file[i].size / (1024 * 1024)) * 100) / 100;
                                    } else if ($scope.attachedFiles.length >= 3) {
                                        ToastrService.error("Maximum of three files can be attached.");
                                        return;
                                    }
                                } else {
                                    ToastrService.error("Maximum file size should be 10MB.");
                                    return;
                                }
                            }
                        } else {

                            // var fileDropZone = document.getElementById('file-drop-zone');
                            // if (fileDropZone) fileDropZone.style.backgroundImage = 'url(..' + rooturl + '/images/drag_drop.png)';
                        }
                    });


                }],
                targetEvent: ev,
                clickOutsideToClose: false,
                escapeToClose: true
            });
        }

        vm.viewNewHire = function (ev, newid) {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                locals: {},
                templateUrl: $rootScope.rootUrl + '/components/settings/documents/dynamicWebForms/dynamicWebFormsSetting/dynamicWebFormsPreview.html',
                controller: ['$scope','$window', function ($scope, $window) {
                    vm.newHire = {};
                    vm.editNewHireId = newid;
                    $scope.isDisabledControl = true;

                    vm.citizenships = [{
                        id: '1',
                        value: 'US Citizen'
                    },
                    {
                        id: '2',
                        value: 'Green Card'
                    },
                    {
                        id: '3',
                        value: 'GC EAD'
                    },
                    {
                        id: '4',
                        value: 'H1B'
                    },
                    {
                        id: '5',
                        value: 'Others'
                    }
                    ];
                    vm.exempt = [{
                        exemptId: '1',
                        exemptName: 'Exempt'
                    },
                    {
                        exemptId: '0',
                        exemptName: 'Non Exempt'
                    }
                    ];

                    vm.cityList = [];
                    vm.sourceProfile = {};
                    vm.statesList = [];
                    vm.clientsList = [];
                    vm.jobCategories = [];
                    vm.categoryList = [];

                    vm.hireCategory = '';
                    vm.jobCategory = '';
                    vm.source = '';
                    vm.clientName = '';
                    vm.clientCity = '';
                    vm.clientState = '';
                    vm.tentStartDate = '';
                    vm.tentEndDate = '';
                    vm.udfd1 = '';
                    vm.udfd2 = '';
                    
                    $scope.viewSavedFile = function (doc) {
                        if (doc) {
                            $window.open($rootScope.NewHireDocsURL + doc.id + '.' + doc.type, '_blank');
                        }
            
                    }

                    $scope.getFieldSettingForDefault = function (settingname, obj) {
                        var result = {};
                        var settings = obj.Settings;
                        $.each(settings, function (index, set) {
                            if (set.name == settingname) {
                                result = set;
                                return;
                            }
                        });
                        if (!Object.keys(result).length) {
                            //Continue to search settings in the checkbox zone
                            // $.each(settings[settings.length - 1].Options, function (index, set) {
                            //     if (set.name == settingname) {
                            //         result = set;
                            //         return;
                            //     }
                            // });
                            var ary = $filter('filter')(settings, { 'Type': 'checkBoxZone' }, true);
                            if (ary && ary.length) {
                                $.each(ary[0].Options, function (index, set) {
                                    if (set.name == settingname) {
                                        result = set;
                                        return;
                                    }
                                });
                            }
                        }
                        return result;

                    }

                    $scope.getFieldSettingPar = function (settingname, obj) {
                        var result = {};
                        var settings = obj.Settings;
                        $.each(settings, function (index, set) {
                            if (set.name == settingname) {
                                result = set;
                                return;
                            }
                        });
                        if (!Object.keys(result).length) {
                            //Continue to search settings in the checkbox zone
                            // $.each(settings[settings.length - 1].Options, function (index, set) {
                            //     if (set.name == settingname) {
                            //         result = set;
                            //         return;
                            //     }
                            // });
                            var ary = $filter('filter')(settings, { 'name': 'General Validations' }, true);
                            if (ary && ary.length) {
                                $.each(ary[0].Options, function (index, set) {
                                    if (set.name == settingname) {
                                        result = set;
                                        return;
                                    }
                                });
                            }
                        }
                        return result;

                    }

                    $scope.getFieldRadioPar = function (settingname, obj) {
                        var result = {};
                        var settings = obj.Settings;
                        $.each(settings, function (index, set) {
                            if (set.name == settingname) {
                                result = set;
                                return;
                            }
                        });
                        if (!Object.keys(result).length) {
                            //Continue to search settings in the checkbox zone
                            $.each(settings[settings.length - 1].Options, function (index, set) {
                                if (set.name == settingname) {
                                    result = set;
                                    return;
                                }
                            });
                        }
                        return result;

                    }
                    $scope.submitted = false;
                    $scope.validateForm = function () {
                        $scope.submitted = true;

                    }


                    $scope.getDateValue = function (currentobj, offsetdays) {
                        // if(currentobj !== 'currentdate'){
                        //     dateobj = null;
                        // }
                        var dateobj;
                        if (currentobj == 'currentdate' || currentobj == 'Current Date') {
                            dateobj = new Date();
                        }
                        else if(currentobj == 'weekmorethancurrentdate' || currentobj == 'Current Date + 7 days'){
                            dateobj = new Date();
                            dateobj.setDate(dateobj.getDate() + 7);
                        }
                        else {
                            for (var i = 0; i < $scope.formFields.length; i++) {
                                if ($scope.formFields[i].name == currentobj && $scope.formFields[i].value)
                                    dateobj = $scope.formFields[i].value;
                                dateobj = new Date(dateobj);
                            }
                        }
                        if (offsetdays != 0 && dateobj) {
                            dateobj.setDate(dateobj.getDate() + offsetdays);
                        }
                        return dateobj;
                    }

                    $scope.getNumberValue = function (currentobj) {
                        var numObj;
                        for (var i = 0; i < $scope.formFields.length; i++) {
                            if ($scope.formFields[i].name == currentobj && $scope.formFields[i].value){
                                numObj = $scope.formFields[i].value;
                            }
                        }
                        return numObj;
                    }
                    
                    function viewNewHire() {
                        NewHiresService.getNewHireJson(vm.editNewHireId).then(
                            function (response) {
                                var tempComponents = response.data.masterJsonData ? response.data.masterJsonData.components : (response.data.jsonData.components ? response.data.jsonData.components : []);
                                //$scope.formFields = angular.copy(tempComponents);
                                $scope.formFields = tempComponents;
                                vm.newHire = response.data;
                                
                                vm.newHire.hiringtype = true;
                                // console.log(vm.newHire);
                                $scope.originalEmail = vm.newHire.emailid;
                            },
                            function (err) {
                                ToastrService.error(err.message);
                            }
                        )
                    }
                    viewNewHire();

                    var controlsNotToBeCleared = [];
                    $scope.isControlShow = function (controlName) {
                        var showControl = true;
                        var ary = $filter('filter')($scope.formFields, { 'Type': 'radio' }, true);
                        var aryDrop = $filter('filter')($scope.formFields, { 'Type': 'dropdown' }, true);
                        ary = ary.concat(aryDrop);
                        if (ary.length) {
                            for (var a = 0; a < ary.length; a++) {
                                var radioChoice = $filter('filter')(ary[a].Settings, { 'name': "Radio Choice" }, true);
                                for (var i = 0; i < radioChoice[0].Possiblevalue.length; i++) {
                                    if (radioChoice[0].Possiblevalue[i].showControls.indexOf(controlName) != -1) {
                                        if (ary[a].value == radioChoice[0].Possiblevalue[i].value) {
                                            showControl = true;
                                            if (controlsNotToBeCleared.indexOf(controlName) == -1) {
                                                controlsNotToBeCleared.push(controlName);
                                            }
                                            break;
                                        }
                                        else {
                                            showControl = false;
            
                                        }
                                    }
                                }
                            }
                        }
            
                        var showControlChk = true;
                        var aryChk = $filter('filter')($scope.formFields, { 'Type': 'checkbox' }, true);
                        if (aryChk.length) {
                            for (var a = 0; a < aryChk.length; a++) {
                                var checkboxChoice = $filter('filter')(aryChk[a].Settings, { 'name': "Show Controls" }, true);
                                if (checkboxChoice[0].showControls.indexOf(controlName) != -1) {
                                    if (aryChk[a].value) {
                                        showControlChk = true;
                                        if (controlsNotToBeCleared.indexOf(controlName) == -1) {
                                            controlsNotToBeCleared.push(controlName);
                                        }
                                        break;
                                    }
                                    else {
                                        showControlChk = false;
            
                                    }
                                }
            
                            }
                        }
                        return showControl && showControlChk;
                    }
            
                    $scope.clearHiddenControlValue = function (controlName) {
                        var control = $filter('filter')($scope.formFields, { 'name': controlName }, true);
                        var controlSetting = $filter('filter')(control[0].Settings, { 'name': "Radio Choice" }, true);
                        for (var i = 0; i < controlSetting[0].Possiblevalue.length; i++) {
                            if(control[0].value !=  controlSetting[0].Possiblevalue[i].value){
                                for(var j=0;j<controlSetting[0].Possiblevalue[i].showControls.length;j++){
                                    var controlToClear = $filter('filter')($scope.formFields, { 'name': controlSetting[0].Possiblevalue[i].showControls[j] }, true);
                                    controlToClear[0].value = "";
                                }
                            }
                        }
                    }
            
                    $scope.clearHiddenControlValueCheckbox = function (controlName,controlValue) {
                        var control = $filter('filter')($scope.formFields, { 'name': controlName }, true);
                        var controlSetting = $filter('filter')(control[0].Settings, { 'name': "Show Controls" }, true);
                        if(!controlValue){
                            for(var j = 0;j < controlSetting[0].showControls.length;j++){
                                var controlToClear = $filter('filter')($scope.formFields, { 'name': controlSetting[0].showControls[j] }, true);
                                controlToClear[0].value = "";
                            } 
                        }
                        return;
                    }


                    // function getSourceProfile() {
                    //     NewHiresService.getSourceProfile().then(
                    //         function (response) {
                    //             vm.sourceProfile = response.data;
                    //             var ary = $filter('filter')(vm.sourceProfile.SourceProfiles, {
                    //                 'sourceid': vm.newHire.sourceid
                    //             })
                    //             if (ary && ary.length) {
                    //                 vm.source = ary[0].sourcename;
                    //             }
                    //         },
                    //         function (err) {
                    //             ToastrService.error(err.message);
                    //         }
                    //     )
                    // }

                    // function statesList() {
                    //     NewHiresService.getStatesList().then(
                    //         function (response) {
                    //             vm.statesList = response.data;
                    //             var ary = $filter('filter')(vm.statesList, {
                    //                 'stateCode': vm.newHire.worklocation
                    //             })
                    //             if (ary && ary.length) {
                    //                 vm.clientState = ary[0].stateName;
                    //             }
                    //             // vm.getCities(vm.hireInfo.state);
                    //             // if (!vm.editNewHireId) {
                    //             //     vm.newHire.worklocation = vm.statesList[0].stateCode;
                    //             //     vm.getCities('add');
                    //             // }
                    //         },
                    //         function (err) {
                    //             ToastrService.error($rootScope.errorMsgs.MSG132);
                    //         }
                    //     )
                    // }

                    // function getClientsList() {
                    //     NewHiresService.getClientsList().then(
                    //         function (response) {
                    //             vm.clientsList = response.data;
                    //             var ary = $filter('filter')(vm.clientsList, {
                    //                 'clientId': vm.newHire.clientid
                    //             })
                    //             if (ary && ary.length) {
                    //                 vm.clientName = ary[0].clientName;
                    //             }
                    //         },
                    //         function (err) {
                    //             ToastrService.error(err.message);
                    //         }
                    //     )
                    // }

                    // function getCategoryList() {
                    //     NewHiresService.getCategoryList().then(
                    //         function (response) {
                    //             vm.categoryList = response.data.Category;
                    //         },
                    //         function (err) {
                    //             ToastrService.error(err.message);
                    //         }
                    //     )
                    // }
                    // getCategoryList();

                    $scope.checkDocExtension = function (docName) {
                        var docExt = docName.split('.');
                        return docExt[docExt.length - 1];
                    }

                    // function getJobHireCategory() {
                    //     NewHiresService.getJobHireCategory().then(
                    //         function (response) {
                    //             vm.jobCategories = response.data;
                    //             var ary = $filter('filter')(vm.jobCategories, {
                    //                 'jobcategoryid': vm.newHire.jobcategoryid
                    //             })
                    //             if (ary && ary.length) {
                    //                 vm.jobCategory = ary[0].jobcategoryname;
                    //             }
                    //         },
                    //         function (err) {
                    //             ToastrService.error(err.message);
                    //         }
                    //     )
                    // }

                }],
                targetEvent: ev,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                escapeToClose: true
            });

        }

        vm.showDeleteConfirm = function (ev, id, itemName) {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                locals: {
                    itemName: itemName,
                    itemType: 'NewHire'
                },
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
            //     '<div layout="column" layout-align="start end">' +
            //     '<ng-md-icon icon="clear" size="14" style="margin-top:8px;cursor:pointer" ng-click="vm.closeDeleteModal()">' +
            //     '</ng-md-icon>' +
            //     '</div>' +
            //     '<md-content style="background-color:white">' +
            //     '<div layout="column" layout-align="center center"><img src="images/que_icon.png"/></div>' +
            //     '<p align=center style="padding:10px 10px 20px 20px;font-size:13px;" >Are you sure you want to delete the New Hire - ' + newHireName + '?</p>' +
            //     '<md-divider></md-divider>' +
            //     '<div layout="row" layout-align="end center" style="background-color:rgb(250,250,250);height:60px;padding:10px" flex>' +
            //     '<md-button class="md-raised md-primary" ng-click="vm.deleteNewHire(' + id + ')" >OK</md-button>' +
            //     '<md-button class="md-secondary" ng-click="vm.closeDeleteModal()">Cancel</md-button>' +
            //     '</div>' +
            //     '</md-content>' +
            //     '</md-dialog>'
            // });
        }

        $scope.closeDeleteModal = function () {
            $mdDialog.hide();
        }

        $scope.deleteItem = function (id) {
            NewHiresService.deleteNewHire(id).then(
                function (response) {
                    $scope.closeDeleteModal();
                    getNewHiresList();
                    ToastrService.success(response.data.message);
                },
                function (err) {
                    ToastrService.error(response.data.message);
                }
            )
        }

        vm.editNewHire = function (newhireid) {
            $state.go('EditNewHire', {
                id: newhireid
            });
        }

        function getSourceProfile() {
            DesignWebformsService.getSourceProfile().then(
                function (response) {
                    $scope.sourceProfile = response.data.SourceProfiles;
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }
        getSourceProfile();

        function getClientsList() {
            DesignWebformsService.getClientsList().then(
                function (response) {
                    $scope.clientsList = response.data;
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }
        getClientsList();

        function getJobHireCategory() {
            DesignWebformsService.getJobHireCategory().then(
                function (response) {
                    $scope.jobCategoryList = response.data;
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }
        getJobHireCategory();

        $scope.newHires_short_name = function (name) {
            if (name.length > 15) {
                name = name.substr(0, 14) + "...";
            }
            return name;
        }
        $scope.browserType = function () {
            if (navigator.userAgent.indexOf("Safari") != -1) {
                if (navigator.userAgent.indexOf("10") != -1) {
                    vm.contentHeight = {
                        height: 520 + 'px'
                    };
                }
                if (navigator.userAgent.indexOf("11") != -1) {
                    vm.contentHeight = {
                        height: '80%'
                    };

                }
            } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                vm.ieMarginTopForAdvSrch = '-45px';
                vm.ieMarginTopForAdvSrchText = '-6px';
            }
        }
        $scope.browserType();

    }
})();