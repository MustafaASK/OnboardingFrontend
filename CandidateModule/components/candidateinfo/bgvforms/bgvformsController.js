(function () {
    'use strict';
    candidateApp.controller('bgvFormsController', bgvFormsController);
    bgvFormsController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$location', 'ToastrService', 'CandidateUsersService', '$mdDialog', '$filter', '$timeout'];
    function bgvFormsController($scope, $rootScope, $state, $stateParams, $location, ToastrService, CandidateUsersService, $mdDialog, $filter, $timeout) {


        var vm = this;

        vm.disablePrevious = false;
        vm.disableSkip = false;
        var submitRejectedForm = false;
        $scope.$parent.vm.disableTabCommonDetails = true;
        vm.checkCandidateSign = $scope.$parent.vm.disableBgv;


        vm.submitAndSign = function(valid){
            submitRejectedForm = true;
            vm.navigateNext('next');
        }

        $scope.myDate = new Date();
        $scope.maxDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth(),
            $scope.myDate.getDate()
        );

        $scope.addressFlag = $rootScope.CandidateInfo.AddressFlag;
        $scope.educationFlag = $rootScope.CandidateInfo.Educationflag;
        $scope.referencesFlag = $rootScope.CandidateInfo.Referencesflag;
        $scope.employementFlag = $rootScope.CandidateInfo.Employementflag;

        if (localStorage.getItem("bgvedit")) {
            vm.disablePrevious = true;
            vm.disableSkip = true;
        }
        vm.hireInfo = {
            "newhireid": { "newhireid": $rootScope.CandidateInfo.newhireid },
            "country": "USA",
            "email": $rootScope.CandidateInfo.emailid,
            'sufix': 'Mr',
            'martialstatus': 'S',
            'gender': 'true'
        };

        $timeout(function () {
            $scope.$parent.currentNavItem = 1;
        }, 500);

        function changeDashboardStatus() {

            if ($rootScope.CandidateInfo.catgid == 1) {
                if (($rootScope.CandidateInfo.AddressFlag === $rootScope.CandidateInfo.bgvAddressflag) && ($rootScope.CandidateInfo.bgvEmployementflag === $rootScope.CandidateInfo.Employementflag) && ($rootScope.CandidateInfo.bgvEducationflag === $rootScope.CandidateInfo.Educationflag) && ($rootScope.CandidateInfo.Referencesflag === $rootScope.CandidateInfo.bgvReferencesflag) && ($rootScope.CandidateInfo.Ddflag === $rootScope.CandidateInfo.bgvPayrollflag) && ($rootScope.CandidateInfo.Eeoflag === $rootScope.CandidateInfo.bgvEeoflag)) {
                    $rootScope.$emit('DashpoardPageUpdated', false);
                } else {
                    $rootScope.$emit('DashpoardPageUpdated', true);
                }
            } else {
                if (($rootScope.CandidateInfo.AddressFlag === $rootScope.CandidateInfo.bgvAddressflag) && ($rootScope.CandidateInfo.bgvEmployementflag === $rootScope.CandidateInfo.Employementflag) && ($rootScope.CandidateInfo.bgvEducationflag === $rootScope.CandidateInfo.Educationflag) && ($rootScope.CandidateInfo.Referencesflag === $rootScope.CandidateInfo.bgvReferencesflag) && ($rootScope.CandidateInfo.Contractorflag === $rootScope.CandidateInfo.bgvContractorflag)) {
                    $rootScope.$emit('DashpoardPageUpdated', false);
                    //$state.go('dashboard', {}, { reload: 'dashboard' });
                } else {
                    $rootScope.$emit('DashpoardPageUpdated', true);
                }

            }
        }

        vm.getRefernces = function () {

            CandidateUsersService.getRefernces($rootScope.CandidateInfo.newhireid).then(
                function (response) {
                    if (response.data.Success) {
                        vm.referencsList = response.data.ReferenceDetails;
                        if (vm.referencsList.length) {
                            $rootScope.CandidateInfo.bgvReferencesflag = true;
                        } else {
                            $rootScope.CandidateInfo.bgvReferencesflag = false;
                        }
                        localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));
                        //changeDashboardStatus();
                    }
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG130);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }
        vm.getRefernces();

        vm.getEmploymentList = function () {

            CandidateUsersService.getEmploymentList($rootScope.CandidateInfo.newhireid).then(
                function (response) {
                    if (response.data.Success) {
                        vm.employementList = response.data.EmployementDetails;

                        if (vm.employementList.length) {
                            $rootScope.CandidateInfo.bgvEmployementflag = true;
                        } else {
                            $rootScope.CandidateInfo.bgvEmployementflag = false;
                        }
                        localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));
                        //changeDashboardStatus();
                    }
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG130);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }
        vm.getEmploymentList();

        vm.getAddressList = function () {

            CandidateUsersService.getAddressList($rootScope.CandidateInfo.newhireid).then(
                function (response) {
                    if (response.data.Success) {
                        vm.addressList = response.data.AddressDetails;

                        if (vm.addressList.length) {
                            $rootScope.CandidateInfo.bgvAddressflag = true;
                        } else {
                            $rootScope.CandidateInfo.bgvAddressflag = false;
                        }
                        localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));
                        //changeDashboardStatus();
                    }
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG130);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }
        vm.getAddressList();

        vm.getEducationList = function () {

            CandidateUsersService.getEducationList($rootScope.CandidateInfo.newhireid).then(
                function (response) {
                    if (response.data.Success) {
                        vm.educationList = response.data.EducationDetails;

                        if (vm.educationList.length) {
                            $rootScope.CandidateInfo.bgvEducationflag = true;
                        } else {
                            $rootScope.CandidateInfo.bgvEducationflag = false;
                        }
                        localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));
                        //changeDashboardStatus();
                    }
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG130);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }
        vm.getEducationList();


        vm.closeDeleteModal = function () {
            $mdDialog.cancel();
        }

        vm.deleteIt = function (type, id) {
            var url = ''
            switch (type) {
                case 'emp-history':
                    url = 'deleteEmployementDetails'
                    break;
                case 'education-history':
                    url = 'deleteEducationDetails'
                    break;
                case 'emp-address':
                    url = 'deleteAddress'
                    break;
                case 'emp-reference':
                    url = 'deleteReferenceDetails'
                    break;
            }
            $scope.loading = true;
            CandidateUsersService.deleteBgvDetails(id, url).then(
                function (response) {
                    $scope.result = response.data;
                    if (response.data.Success) {
                        // ToastrService.success(response.data.message);
                        vm.closeDeleteModal();
                        switch (type) {
                            case 'emp-history':
                                vm.getEmploymentList();
                                break;
                            case 'education-history':
                                vm.getEducationList();
                                break;
                            case 'emp-address':
                                vm.getAddressList();
                                break;
                            case 'emp-reference':
                                vm.getRefernces();
                                break;
                        }
                    }
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG131);
                }
            ).finally(function () {
                $scope.loading = false;
            });
        }
        vm.deleteObj = function (type, id) {

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
                    '<p align=center style="padding:10px 10px 20px 20px;font-size:13px;" >Are you sure you want to delete?</p>' +
                    '<md-divider></md-divider>' +
                    '<div layout="row" layout-align="end center" style="background-color:rgb(250,250,250);height:60px;padding:10px" flex>' +
                    '<md-button class="md-raised md-primary" ng-click="vm.deleteIt(' + '\'' + type + '\'' + ',' + id + ')" >OK</md-button>' +
                    '<md-button class="md-secondary" ng-click="vm.closeDeleteModal()">Cancel</md-button>' +
                    '</div>' +
                    '</md-content>' +
                    '</md-dialog>'
            });
        }

        vm.openEmpForm = function (type, obj) {

            $mdDialog.show({
                templateUrl: 'components/candidateinfo/bgvforms/emp-history-form/emp-history-form.html',
                clickOutsideToClose: false,
                multiple: true,
                locals: { type: type, editData: obj },
                controller: ['$scope', '$rootScope', 'ToastrService', 'type', 'editData', 'CandidateUsersService', function ($scope, $rootScope, ToastrService, type, editData, CandidateUsersService) {
                    /* autocomplete part start*/
                    $scope.options = {"getType":"state","watchEnter":true};
                    $scope.options1 = {"getType":"city","watchEnter":true,"types":"(cities)"};
                    $scope.options2 = {"getType":"state","watchEnter":true};
                    $scope.options3 = {"getType":"city","watchEnter":true,"types":"(cities)"};
                    $scope.countryoptions = {"getType":"country"};
                    $scope.prevcountry = {"getType":"country"};
                    $scope.educountry = {"getType":"country"};
                    $scope.addrOptionsUS = {"getType":"address","watchEnter":false};
                    $scope.addrOptionsAll = {"getType":"address","watchEnter":false}; 
                   
                    /* autocomplete part end */
                    $scope.loader = false;
                    $scope.editMode = (editData !== null ? true : false);
                    $scope.myDate = new Date();
                    $scope.maxDateFromDate = new Date(
                        $scope.myDate.getFullYear(),
                        $scope.myDate.getMonth(),
                        $scope.myDate.getDate() - 1
                    );

                    $scope.updateCityStateCountryZip = function(cityParam, stateParam,countryParam, zipParam){
                        if(cityParam) { 
                            $scope.refer.city = cityParam; 
                        }  
                        if(stateParam) { 
                            $scope.refer.state = stateParam; 
                        }   
                        if(countryParam) { 
                            $scope.refer.country = countryParam; 
                        }   
                        if(zipParam) { 
                            $scope.refer.zipcode = zipParam; 
                        }           
                    }
                    $scope.updateStateCountryEmp = function(stateParam, countryParam){
                        if(stateParam) { 
                            $scope.refer.state = stateParam; 
                        }
                        if(countryParam) { 
                            $scope.refer.country = countryParam;
                        }            
                    }
                    $scope.updateStateEmp = function(stateParam){
                        if(stateParam) { 
                            $scope.refer.state = stateParam;
                        }
                    }
                    $scope.validateStart = function(){
                        var dateTimeStart = moment($scope.refer.strtDate);
                        dateTimeStart = dateTimeStart.format("YYYY-MM-DD hh:mm:ss");
                        var dateTimeEnd = moment($scope.refer.enDate);
                        dateTimeEnd = dateTimeEnd.format("YYYY-MM-DD hh:mm:ss");
                        if(dateTimeStart >= dateTimeEnd){
                            $scope.employeeReference.startdate.$setValidity('validationError', false);
                        }
                        else
                        {
                            $scope.employeeReference.startdate.$setValidity('validationError', true);
                            $scope.employeeReference.enddate.$setValidity('validationError', true);
                        }
                    }
                    $scope.validateEnd = function(){
                        var dateTimeStart = moment($scope.refer.strtDate);
                        dateTimeStart = dateTimeStart.format("YYYY-MM-DD hh:mm:ss");
                        var dateTimeEnd = moment($scope.refer.enDate);
                        dateTimeEnd = dateTimeEnd.format("YYYY-MM-DD hh:mm:ss");
                        if(dateTimeStart >= dateTimeEnd){
                            $scope.employeeReference.enddate.$setValidity('validationError', false);
                        }
                        else
                        {
                            $scope.employeeReference.startdate.$setValidity('validationError', true);
                            $scope.employeeReference.enddate.$setValidity('validationError', true);
                        }
                    }
                    $scope.validateEduStart = function(){
                        var dateTimeStart = moment($scope.refer.strtDate);
                        dateTimeStart = dateTimeStart.format("YYYY-MM-DD hh:mm:ss");
                        var dateTimeEnd = moment($scope.refer.enDate);
                        dateTimeEnd = dateTimeEnd.format("YYYY-MM-DD hh:mm:ss");
                        var dateAwarded = moment($scope.refer.completeyear);
                        dateAwarded = dateAwarded.format("YYYY-MM-DD hh:mm:ss");
                        if(dateTimeStart >= dateTimeEnd){
                            $scope.employeeReference.startdate.$setValidity('validationError', false);
                        }
                        else
                        {
                            $scope.employeeReference.startdate.$setValidity('validationError', true);
                            $scope.employeeReference.enDate.$setValidity('validationError', true);
                        }
                        if(dateTimeStart >= dateAwarded){
                            $scope.employeeReference.completeyear.$setValidity('validationError', false);
                        }
                        else{
                            $scope.employeeReference.completeyear.$setValidity('validationError', true);
                        }
                    }

                    $scope.validateEduEnd = function(){
                        var dateTimeStart = moment($scope.refer.strtDate);
                        dateTimeStart = dateTimeStart.format("YYYY-MM-DD hh:mm:ss");
                        var dateTimeEnd = moment($scope.refer.enDate);
                        dateTimeEnd = dateTimeEnd.format("YYYY-MM-DD hh:mm:ss");
                        var dateAwarded = moment($scope.refer.completeyear);
                        dateAwarded = dateAwarded.format("YYYY-MM-DD hh:mm:ss");
                        if(dateTimeStart >= dateTimeEnd){
                            $scope.employeeReference.enDate.$setValidity('validationError', false);
                        }
                        if(dateTimeStart < dateTimeEnd){
                            $scope.employeeReference.startdate.$setValidity('validationError', true);
                            $scope.employeeReference.enDate.$setValidity('validationError', true);
                        }
                        else
                        {
                            $scope.employeeReference.startdate.$setValidity('validationError', false);
                            $scope.employeeReference.enDate.$setValidity('validationError', false);
                        }
                        if(dateTimeStart <= dateAwarded){
                            $scope.employeeReference.completeyear.$setValidity('validationError', true);
                        }
                    }
                    $scope.validateAward = function(){
                        var dateTimeStart = moment($scope.refer.strtDate);
                        dateTimeStart = dateTimeStart.format("YYYY-MM-DD hh:mm:ss");
                        var dateAwarded = moment($scope.refer.completeyear);
                        dateAwarded = dateAwarded.format("YYYY-MM-DD hh:mm:ss");
                        if(dateTimeStart >= dateAwarded){
                            $scope.employeeReference.completeyear.$setValidity('validationError', false);
                        }
                        else
                        {
                            // $scope.employeeReference.enDate.$setValidity('validationError', true);
                            $scope.employeeReference.completeyear.$setValidity('validationError', true);
                        }
                    }
                    $scope.validatePrevStart = function(){
                        var dateTimeStart = moment($scope.refer.strtDate);
                        dateTimeStart = dateTimeStart.format("YYYY-MM-DD hh:mm:ss");
                        var dateTimeEnd = moment($scope.refer.enDate);
                        dateTimeEnd = dateTimeEnd.format("YYYY-MM-DD hh:mm:ss");
                        if(dateTimeStart >= dateTimeEnd){
                            $scope.employeeReference.strtDate.$setValidity('validationError', false);
                        }
                        else
                        {
                            $scope.employeeReference.strtDate.$setValidity('validationError', true);
                            $scope.employeeReference.enDate.$setValidity('validationError', true);
                        }
                    }
                    $scope.validatePrevEnd = function(){
                        var dateTimeStart = moment($scope.refer.strtDate);
                        dateTimeStart = dateTimeStart.format("YYYY-MM-DD hh:mm:ss");
                        var dateTimeEnd = moment($scope.refer.enDate);
                        dateTimeEnd = dateTimeEnd.format("YYYY-MM-DD hh:mm:ss");
                        if(dateTimeStart >= dateTimeEnd){
                            $scope.employeeReference.enDate.$setValidity('validationError', false);
                        }
                        else
                        {
                            $scope.employeeReference.strtDate.$setValidity('validationError', true);
                            $scope.employeeReference.enDate.$setValidity('validationError', true);
                        }
                    }

                    $scope.type = type;
                    $scope.submitted = false;
                    $scope.errorMsgs = $rootScope.errorMsgs;
                    var newhireid = $rootScope.CandidateInfo.newhireid;
                    var url = '';
                    if ($scope.editMode) {
                        $scope.refer = angular.copy(editData);
                        if (type == 'emp-history') {
                            $scope.refer.strtDate = $scope.refer.strtDate.substring(0, 10);
                            $scope.refer.strtDate = $scope.refer.strtDate.replace(/-/g, '/');
                            // refer.strtDate 
                            $scope.refer.enDate = $scope.refer.enDate.substring(0, 10);
                            $scope.refer.enDate = $scope.refer.enDate.replace(/-/g, '/');
                        }
                        else if (type == 'education-history') {
                            $scope.refer.strtDate = $scope.refer.strtDate.substring(0, 10);
                            $scope.refer.strtDate = $scope.refer.strtDate.replace(/-/g, '/');
                            $scope.refer.enDate = $scope.refer.enDate.substring(0, 10);
                            $scope.refer.enDate = $scope.refer.enDate.replace(/-/g, '/');
                            // $scope.refer.gpa = $scope.refer.gpa.toFixed(2);
                            // $scope.refer.gpa = parseFloat($scope.refer.gpa);

                            $scope.refer.completeyear = $scope.refer.completeyear.substring(0, 10);
                            $scope.refer.completeyear = $scope.refer.completeyear.replace(/-/g, '/');
                            // $scope.refer.awardedyear = $scope.refer.awardedyear.substring(0, 10);
                            // $scope.refer.awardedyear = $scope.refer.awardedyear.replace(/-/g, '/');
                        }
                        else if (type == 'emp-address') {
                            $scope.refer.strtDate = $scope.refer.strtDate.substring(0, 10);
                            $scope.refer.strtDate = $scope.refer.strtDate.replace(/-/g, '/');
                            $scope.refer.enDate = $scope.refer.enDate.substring(0, 10);
                            $scope.refer.enDate = $scope.refer.enDate.replace(/-/g, '/');
                        }

                        delete $scope.refer.newHireId;
                    } else {
                        $scope.refer = {
                            "newHireId": { "newhireid": newhireid },
                        };
                    }



                    // $scope.getCities = function () {
                    //     CandidateUsersService.getCities().then(
                    //         function (response) {
                    //             $scope.cityList = response.data;
                    //             if ($scope.editMode) {

                    //             } else {
                    //                 $scope.refer.city = $scope.cityList[0].cityCode;

                    //             }
                    //         },
                    //         function (err) {
                    //             ToastrService.error($rootScope.errorMsgs.MSG132);
                    //         }
                    //     )
                    // }

                    function statesList() {
                        CandidateUsersService.getStatesList().then(
                            function (response) {
                                $scope.statesList = response.data;
                                if ($scope.editMode) {
                                    //$scope.refer.state = 'AK';
                                    // $scope.getCities();
                                } else {
                                    $scope.refer.state = $scope.statesList[0].stateCode;
                                    // $scope.getCities();
                                }

                            },
                            function (err) {
                                ToastrService.error($rootScope.errorMsgs.MSG132);
                            }
                        )
                    }

                    switch (type) {
                        case 'emp-history':
                            $scope.title = 'Employment';
                            //statesList();
                            break;
                        case 'education-history':
                            $scope.title = 'Education';
                            break;
                        case 'emp-address':
                            $scope.title = 'Previous Address';
                            //statesList();
                            break;
                        case 'emp-reference':
                            $scope.title = 'Reference';
                            break;
                    }
                    // employeeHistoryValid,educationDetailsValid,employeeAddressValid,
                    $scope.updateHistory = function (valid) {
                        $scope.submitted = true;
                        if (valid) {
                            ToastrService.error($rootScope.errorMsgs.MSG133);
                            return false;
                        }
                        var finalobj = {};
                        switch (type) {
                            case 'emp-history':
                                url = 'editEmployementDetails';
                                finalobj = angular.copy($scope.refer);

                                var dateTimeStart = moment(finalobj.strtDate);
                                dateTimeStart = dateTimeStart.format("YYYY-MM-DD hh:mm:ss");
                                finalobj.strtDate = dateTimeStart;

                                var dateTimeEnd = moment(finalobj.enDate);
                                dateTimeEnd = dateTimeEnd.format("YYYY-MM-DD hh:mm:ss");
                                finalobj.enDate = dateTimeEnd;
                                if (!finalobj.contact) {
                                    finalobj.contact = '0';
                                }
                                finalobj.contact = parseInt(finalobj.contact);
                                if (!finalobj.isthiscurrentemployee) {
                                    finalobj.isthiscurrentemployee = '0';
                                }
                                finalobj.isthiscurrentemployee = parseInt(finalobj.isthiscurrentemployee);
                                if (finalobj.strtDate > finalobj.enDate) {
                                    ToastrService.error($rootScope.errorMsgs.MSG134);
                                    return false;
                                }
                                break;
                            case 'education-history':
                                url = 'editEducationDetails';
                                finalobj = angular.copy($scope.refer);
                                var dateTimeStart = moment(finalobj.strtDate);
                                dateTimeStart = dateTimeStart.format("YYYY-MM-DD hh:mm:ss");
                                finalobj.strtDate = dateTimeStart;

                                var dateTimeEnd = moment(finalobj.enDate);
                                dateTimeEnd = dateTimeEnd.format("YYYY-MM-DD hh:mm:ss");
                                finalobj.enDate = dateTimeEnd;
                                if (!finalobj.graduated) {
                                    finalobj.graduated = '0';
                                }
                                finalobj.graduated = parseInt(finalobj.graduated);

                                // var awardedyear = moment(finalobj.awardedyear);
                                // awardedyear = awardedyear.format("YYYY-MM-DD hh:mm:ss");
                                // finalobj.awardedyear = awardedyear;

                                var completeyear = moment(finalobj.completeyear);
                                completeyear = completeyear.format("YYYY-MM-DD hh:mm:ss");
                                finalobj.completeyear = completeyear;

                                if (finalobj.strtDate >= finalobj.enDate) {
                                    ToastrService.error($rootScope.errorMsgs.MSG135);
                                    return false;
                                }
                                // Included when completion date is required
                                if (finalobj.strtDate >= finalobj.completeyear) {
                                    // ToastrService.error($rootScope.errorMsgs.MSG136);
                                    ToastrService.error('ERROR: Awarded date cannot be before Start Date.');
                                    return false;
                                }

                                // if(finalobj.enDate > finalobj.awardedyear || finalobj.completeyear > finalobj.awardedyear){
                                //     ToastrService.error('ERROR: Awarded date cannot be before End Date and Completion Date.');
                                //     return false;
                                // }

                                break;
                            case 'emp-address':
                                url = 'editAddress';
                                finalobj = angular.copy($scope.refer);
                                var dateTimeStart = moment(finalobj.strtDate);
                                dateTimeStart = dateTimeStart.format("YYYY-MM-DD hh:mm:ss");
                                finalobj.strtDate = dateTimeStart;

                                var dateTimeEnd = moment(finalobj.enDate);
                                dateTimeEnd = dateTimeEnd.format("YYYY-MM-DD hh:mm:ss");
                                finalobj.enDate = dateTimeEnd;
                                if (finalobj.strtDate >= finalobj.enDate) {
                                    ToastrService.error($rootScope.errorMsgs.MSG135);
                                    return false;
                                }
                                break;
                            case 'emp-reference':
                                url = 'editReferenceDetails';
                                finalobj = angular.copy($scope.refer);
                                break;
                        }
                        $scope.loader = true;
                        finalobj.newHireId = {"newhireid": $rootScope.CandidateInfo.newhireid };
                        CandidateUsersService.updateBgvDetails(finalobj, url).then(
                            function (response) {
                                $scope.loader = false;
                                $scope.result = response.data;
                                if (response.data.Success) {
                                    // ToastrService.success(response.data.message);
                                    $scope.closeModal();
                                    // switch (url) {
                                    //     case 'addEmployementDetails':
                                    //         $rootScope.CandidateInfo.bgvEmployementflag = true;
                                    //     case 'addEducationDetails':
                                    //         $rootScope.CandidateInfo.bgvEducationflag = true;
                                    //     case 'addAddress':
                                    //         $rootScope.CandidateInfo.bgvAddressflag = true;
                                    //     case 'addReferenceDetails':
                                    //         $rootScope.CandidateInfo.bgvReferencesflag = true;
                                    // }
                                    // $rootScope.CandidateInfo.bgv
                                }
                                if (response.data.Error) {
                                    ToastrService.error(response.data.message);
                                }
                            },
                            function (err) {
                                $scope.loader = false;
                                ToastrService.error($rootScope.errorMsgs.MSG131);
                            }
                        ).finally(function () {
                            $scope.loader = false;
                        });
                    }

                    $scope.saveHistory = function (valid) {
                        $scope.submitted = true;
                        if (valid) {
                            ToastrService.error($rootScope.errorMsgs.MSG133);
                            return false;
                        }
                        var finalobj = {};
                        switch (type) {
                            case 'emp-history':
                                url = 'addEmployementDetails';
                                finalobj = angular.copy($scope.refer);
                                var dateTimeStart = moment(finalobj.strtDate);
                                dateTimeStart = dateTimeStart.format("YYYY-MM-DD hh:mm:ss");
                                finalobj.strtDate = dateTimeStart;

                                var dateTimeEnd = moment(finalobj.enDate);
                                dateTimeEnd = dateTimeEnd.format("YYYY-MM-DD hh:mm:ss");
                                finalobj.enDate = dateTimeEnd;
                                if (!finalobj.contact) {
                                    finalobj.contact = '0';
                                }
                                if (typeof finalobj.contact !== 'undefined') { finalobj.contact = parseInt(finalobj.contact) };
                                if (!finalobj.isthiscurrentemployee) {
                                    finalobj.isthiscurrentemployee = '0';
                                }
                                if (typeof finalobj.isthiscurrentemployee !== 'undefined') { finalobj.isthiscurrentemployee = parseInt(finalobj.isthiscurrentemployee) };
                                if (finalobj.strtDate >= finalobj.enDate) {
                                    ToastrService.error($rootScope.errorMsgs.MSG135);
                                    return false;
                                }
                                break;
                            case 'education-history':
                                url = 'addEducationDetails';
                                finalobj = angular.copy($scope.refer);
                                var dateTimeStart = moment(finalobj.strtDate);
                                dateTimeStart = dateTimeStart.format("YYYY-MM-DD hh:mm:ss");
                                finalobj.strtDate = dateTimeStart;

                                var dateTimeEnd = moment(finalobj.enDate);
                                dateTimeEnd = dateTimeEnd.format("YYYY-MM-DD hh:mm:ss");
                                finalobj.enDate = dateTimeEnd;

                                // var awardedyear = moment(finalobj.awardedyear);
                                // awardedyear = awardedyear.format("YYYY-MM-DD hh:mm:ss");
                                // finalobj.awardedyear = awardedyear;

                                var completeyear = moment(finalobj.completeyear);
                                completeyear = completeyear.format("YYYY-MM-DD hh:mm:ss");
                                finalobj.completeyear = completeyear;

                                if (!finalobj.graduated) {
                                    finalobj.graduated = '0';
                                }
                                finalobj.graduated = parseInt(finalobj.graduated);
                                if (finalobj.strtDate >= finalobj.enDate) {
                                    ToastrService.error($rootScope.errorMsgs.MSG135);
                                    return false;
                                }
                                // Included when completion date is required.
                                if (finalobj.strtDate >= finalobj.completeyear) {
                                    //    ToastrService.error($rootScope.errorMsgs.MSG136);
                                    ToastrService.error('ERROR: Awarded date cannot be before Start Date.');
                                    return false;
                                }

                                //  // if(finalobj.enDate > finalobj.awardedyear || finalobj.completeyear > finalobj.awardedyear){
                                //  //     ToastrService.error('ERROR: Awarded date cannot be before End Date and Completion Date.');
                                //  //     return false;
                                //  // }
                                break;
                            case 'emp-address':
                                url = 'addAddress';
                                finalobj = angular.copy($scope.refer);
                                var dateTimeStart = moment(finalobj.strtDate);
                                dateTimeStart = dateTimeStart.format("YYYY-MM-DD hh:mm:ss");
                                finalobj.strtDate = dateTimeStart;

                                var dateTimeEnd = moment(finalobj.enDate);
                                dateTimeEnd = dateTimeEnd.format("YYYY-MM-DD hh:mm:ss");
                                finalobj.enDate = dateTimeEnd;
                                if (finalobj.strtDate >= finalobj.enDate) {
                                    ToastrService.error($rootScope.errorMsgs.MSG135);
                                    return false;
                                }
                                break;
                            case 'emp-reference':
                                url = 'addReferenceDetails';
                                finalobj = angular.copy($scope.refer);
                                break;
                        }
                        $scope.loader = true;
                        CandidateUsersService.saveBgvDetails(finalobj, url).then(
                            function (response) {
                                $scope.loader = false;
                                $scope.result = response.data;
                                if (response.data.Success) {
                                    // ToastrService.success(response.data.message);
                                    // switch (url) {
                                    //     case 'addEmployementDetails':
                                    //         $rootScope.CandidateInfo.bgvEmployementflag = true;
                                    //     case 'addEducationDetails':
                                    //         $rootScope.CandidateInfo.bgvEducationflag = true;
                                    //     case 'addAddress':
                                    //         $rootScope.CandidateInfo.bgvAddressflag = true;
                                    //     case 'addReferenceDetails':
                                    //         $rootScope.CandidateInfo.bgvReferencesflag = true;
                                    // }
                                    // localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));
                                    $scope.closeModal();
                                }
                                if (response.data.Error) {
                                    ToastrService.error(response.data.message);
                                }
                            },
                            function (err) {
                                $scope.loader = false;
                                ToastrService.error($rootScope.errorMsgs.MSG131);
                            }
                        ).finally(function () {
                            $scope.loader = false;
                        });
                    }

                    $scope.hide = function (ev) {
                        $mdDialog.hide();
                    }

                    $scope.cancel = function (ev) {
                        $mdDialog.cancel();
                    }

                    $scope.answer = function (ev, answer) {
                        $mdDialog.hide(answer);
                    }

                    $scope.closeModal = function (ev) {
                        $mdDialog.hide({ 'success': true, 'type': type });
                    }
                }]
            })
                .then(function (answer) {
                    if (answer && answer.success) {

                        switch (answer.type) {
                            case 'emp-history':
                                vm.getEmploymentList();
                                break;
                            case 'education-history':
                                vm.getEducationList();
                                break;
                            case 'emp-address':
                                vm.getAddressList();
                                break;
                            case 'emp-reference':
                                vm.getRefernces();
                                break;
                        }
                    }
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        }

        vm.navigatePrevious = function () {
            //$scope.$emit('location', 'prev');
            $state.go('candidateinfo.commondetails');
        }


        vm.navigateNext = function (skipnext) {
            if (skipnext == 'next') {
                if (($rootScope.CandidateInfo.AddressFlag && vm.addressList.length == 0) || ($rootScope.CandidateInfo.Referencesflag && vm.referencsList.length == 0) || ($rootScope.CandidateInfo.Educationflag && vm.educationList.length == 0) || ($rootScope.CandidateInfo.Employementflag && vm.employementList.length == 0)) {
                    ToastrService.error($rootScope.errorMsgs.MSG270);
                    return;
                }
            }

            //$scope.$emit('location', 'next');
            if ($rootScope.dashboardEnabled) {
                $scope.$parent.delechosignagreement();
            }
            if(submitRejectedForm){
                if (localStorage.getItem("bgvedit")) {
                    localStorage.setItem("frombgv", true);
                } else if(localStorage.getItem("eeoedit")){
                    localStorage.setItem("fromeeo", true);
                } else if(localStorage.getItem("payrolledit")){
                    localStorage.setItem("frompayroll", true);
                } else if(localStorage.getItem("contractoredit")){
                    localStorage.setItem("fromcontractor", true);
                } else if(localStorage.getItem("clientspecificedit")){
                    localStorage.setItem("fromclientspecific", true);
                } else if(localStorage.getItem("w4edit")){
                    localStorage.setItem("fromw4", true);
                } else if(localStorage.getItem("drugedit")){
                    localStorage.setItem("fromdrug", true);
                } 
                $rootScope.$emit('DashpoardPageUpdated', true);
                $state.go('dashboard');

            } else {
                if (localStorage.getItem("bgvedit")) {
                    // localStorage.setItem("frombgv", true);
                    // $rootScope.$emit('DashpoardPageUpdated', true);
                    // $state.go('dashboard');
                    if ($rootScope.CandidateInfo.Ddflag && $rootScope.CandidateInfo.catgid == 1) {
                        $state.go('candidateinfo.payrollpackage');
                    }
                    else if ($rootScope.CandidateInfo.Contractorflag && $rootScope.CandidateInfo.catgid != 1) {
                        $state.go('candidateinfo.contractorinfo');
                    }
                    else if ($rootScope.CandidateInfo.Eeoflag && $rootScope.CandidateInfo.catgid == 1) {
                        $state.go('candidateinfo.eeo');
                    }
                } else {
                    if ($rootScope.CandidateInfo.Ddflag && $rootScope.CandidateInfo.catgid == 1) {
                        $state.go('candidateinfo.payrollpackage');
                    }
                    else if ($rootScope.CandidateInfo.Contractorflag && $rootScope.CandidateInfo.catgid != 1) {
                        $state.go('candidateinfo.contractorinfo');
                    }
                    else if ($rootScope.CandidateInfo.Eeoflag && $rootScope.CandidateInfo.catgid == 1) {
                        $state.go('candidateinfo.eeo');
                    }
                    else {
                        //$state.go('dashboard');
                        if ($rootScope.CandidateInfo.catgid == 1) {
                            if (($rootScope.CandidateInfo.AddressFlag === $rootScope.CandidateInfo.bgvAddressflag) && ($rootScope.CandidateInfo.bgvEmployementflag === $rootScope.CandidateInfo.Employementflag) && ($rootScope.CandidateInfo.bgvEducationflag === $rootScope.CandidateInfo.Educationflag) && ($rootScope.CandidateInfo.Referencesflag === $rootScope.CandidateInfo.bgvReferencesflag) && ($rootScope.CandidateInfo.Ddflag === $rootScope.CandidateInfo.bgvPayrollflag) && ($rootScope.CandidateInfo.Eeoflag === $rootScope.CandidateInfo.bgvEeoflag)) {
                                $state.go('dashboard', {}, { reload: 'dashboard' });
                            } else {
                                $state.go('introduction');
                                //ToastrService.error('Please submit all process forms');
                            }
                        } else {
                            if (($rootScope.CandidateInfo.AddressFlag === $rootScope.CandidateInfo.bgvAddressflag) && ($rootScope.CandidateInfo.bgvEmployementflag === $rootScope.CandidateInfo.Employementflag) && ($rootScope.CandidateInfo.bgvEducationflag === $rootScope.CandidateInfo.Educationflag) && ($rootScope.CandidateInfo.Referencesflag === $rootScope.CandidateInfo.bgvReferencesflag) && ($rootScope.CandidateInfo.Contractorflag === $rootScope.CandidateInfo.bgvContractorflag)) {
                                $rootScope.$emit('DashpoardPageUpdated', true);
                                $state.go('dashboard', {}, { reload: 'dashboard' });
                            } else {
                                $state.go('introduction');
                                //ToastrService.error('Please submit all process forms');
                            }
    
                        }
                    }
                }
            }
            


        }
        $scope.convertDateFormat = function (dateValue) {
            return $filter('date')(new Date(dateValue), 'MM/dd/yyyy');
        }

        $scope.browserType = function () {
            if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
                vm.heightforCommonDetails = '90%';
                vm.heightforCommonDetailsFooter = '10%';
            }
            else if (navigator.userAgent.indexOf("Chrome") != -1) {
                vm.heightforCommonDetails = '90%';
                vm.heightforCommonDetailsFooter = '10%';
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                vm.heightforCommonDetails = '90%';
                vm.heightforCommonDetailsFooter = '10%';
                if (navigator.userAgent.indexOf("Version/10") != -1) {
                    vm.heightForWebForms = $(document).height() - 90;
                    vm.heightforCommonDetails = vm.heightForWebForms * 0.9 + 'px';
                    vm.heightforCommonDetailsFooter = vm.heightForWebForms * 0.1 + 'px';
                }
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                vm.heightforCommonDetails = '90%';
                vm.heightforCommonDetailsFooter = '10%';
            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                vm.heightforCommonDetails = '90%';
                vm.heightforCommonDetailsFooter = '10%';
            }
            else {

            }
        }
        $scope.browserType();

    }
})();