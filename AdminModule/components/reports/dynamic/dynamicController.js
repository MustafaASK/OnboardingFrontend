(function () {
    'use strict';
    hrAdminApp.controller('DynamicController', DynamicController);
    DynamicController.$inject = [ '$scope','$rootScope','$stateParams', '$location', 'ToastrService', 'ReportsService'];
    function DynamicController( $scope,$rootScope, $stateParams, $location, ToastrService, ReportsService) {
   
        var vm = this;
        $scope.$parent.currentNavItem = 1;
        //  $scope.labels = ['Novermber', 'December', 'January'];
        $scope.labels2 = [];
         $scope.type = 'StackedBar';
         $scope.options = {
           scales: {
             xAxes: [{
               stacked: true,
             }],
             yAxes: [{
               stacked: true
             }]
           }
         };
         

        $scope.series = ['New Hire', 'Initiated', 'Accepted', 'Completed', 'Rejected'];        
        
        $scope.colors = [
          {
              fill: true,
              backgroundColor: "#7f75b0",
              borderColor: "#7f75b0"
          },
          {
              borderColor: "#49a3d7",
              backgroundColor: "#49a3d7",
              fill: true
          },
          {
              borderColor: "#88bc48",
              backgroundColor: "#88bc48",
              fill: true
          },
          {
              borderColor: "#00c292",
              backgroundColor: "#00c292",
              fill: true
          },
          {
              borderColor: "#d75a5a",
              backgroundColor: "#d75a5a",
              fill: true
          }
        ];
         $scope.options = {
             scales: {
               xAxes: [{
                 stacked: true,  
                 girdLines: {display: true},
                 barThickness: 100
               }],
               yAxes: [{
                 stacked: true,
                 gridLines: {display: true}
               }]
             },
             legend: {display: true, 
                      position: 'bottom',
                      labels: {boxWidth: 8}
                     }
           };   
       
           vm.dynamic = {};

           $scope.startDate = new Date();
           $scope.minDate = new Date(
            $scope.startDate.getFullYear(),
            $scope.startDate.getMonth(),
            $scope.startDate.getDate() - 92
        );
        vm.dynamic.startDateTime = $scope.minDate;
        
        $scope.maxDate = new Date(
          $scope.startDate.getFullYear(),
          $scope.startDate.getMonth(),
          $scope.startDate.getDate()
      );
      vm.dynamic.endDateTime = $scope.maxDate;


           function getClientsList() {
              ReportsService.getClientsList().then(
                  function (response) {
                    if(response.data.Success){
                      vm.clientsList = response.data.Clients;
                    } else {
                      ToastrService.error(response.data.message);
                    }
                  },
                  function (err) {
                      ToastrService.error(err.message);
                  }
              )
          }
          getClientsList();    
          
          vm.myDatedfg = new Date();

          $scope.labels = [];
          $scope.data = [];
          vm.isClient = false;
          vm.isSubmitted = false;
  
            vm.getDynamicList = function(valid) {
              if(!valid){
                  ToastrService.error($rootScope.errorMsgs.MSG127);
                  return false;
              }
              if(!vm.dynamic.startDateTime || !vm.dynamic.endDateTime){                
                  ToastrService.error($rootScope.errorMsgs.MSG127);
                  return false
              }
              
            var dateTimeStart = moment(vm.dynamic.startDateTime);
            
            var dateTimeStartAry = dateTimeStart.format("YYYY-MM-DD");
            dateTimeStartAry = dateTimeStartAry.split('-');

            dateTimeStart = dateTimeStart.format("YYYY-MM-DD HH:mm:ss");
            
            var dateTimeEnd = moment(vm.dynamic.endDateTime);
            
            var dateTimeEndAry = dateTimeEnd.format("YYYY-MM-DD");
            dateTimeEndAry = dateTimeEndAry.split('-');

             dateTimeEnd = dateTimeEnd.format("YYYY-MM-DD HH:mm:ss");

             var yeardiff = parseInt(dateTimeEndAry[0]) - parseInt(dateTimeStartAry[0]);

             var isvalid = false;
             var monthsdiffer = 0;
             if(yeardiff === 1){
                isvalid = false;
                var startmonth = parseInt(dateTimeStartAry[1]);
                var endmonth = parseInt(dateTimeEndAry[1]);
                monthsdiffer = 13- startmonth + endmonth;
                if(13- startmonth + endmonth <=12){
                  isvalid = true;
                }

             }
             else if(yeardiff === 0){
              var startmonth = parseInt(dateTimeStartAry[1]);
              var endmonth = parseInt(dateTimeEndAry[1]);
              monthsdiffer = endmonth- startmonth ;
                isvalid = true;
             }
             if(!isvalid){
              ToastrService.error($rootScope.errorMsgs.MSG197);
                return false;
             }

             
             $scope.options.scales.xAxes[0].barThickness=100 ;
             if(monthsdiffer>4){
              $scope.options.scales.xAxes[0].barThickness=35 ; 
             }

             $scope.labels = [];
             $scope.data = [];
             vm.isSubmitted = true;
              var finalObj = {
                  "startDateTime" : dateTimeStart,
                  "endDateTime": dateTimeEnd
                }
                
                var url = '';
                if(vm.dynamic.clientId && vm.dynamic.clientId !== '0'){
                  url = 'dynamicreportbyclient';
                  finalObj.clientid = vm.dynamic.clientId;
                } else {
                  url = 'dynamicreport';
                }
              ReportsService.getDynamicList(url, finalObj).then(
                  function (response) {
                    if(response.data.Success){
                      var resultData = [];
                      if(vm.dynamic.clientId && vm.dynamic.clientId !== '0'){
                        resultData = angular.copy(response.data.OnBoardingCust);
                        vm.isClient = true;
                      } else {
                        resultData = angular.copy(response.data.OnBoardingStatus);
                        vm.isClient = false;
                      }

                      var newhire = [];
                      var rejected = [];
                      var accepted = [];
                      var completed = [];
                      var initiated = [];
                      for(var i=0; i<resultData.length; i++){
                        $scope.labels.push(resultData[i].Month);
                        
                        newhire.push(resultData[i]['NewHire'] ? resultData[i]['NewHire'] : 0 );
                        initiated.push(resultData[i]['Initiated'] ? resultData[i]['Initiated'] : 0 );
                        accepted.push(resultData[i]['Accepted'] ? resultData[i]['Accepted'] : 0 );
                        completed.push(resultData[i]['Completed']  ? resultData[i]['Completed']  : 0 );
                        rejected.push(resultData[i]['Rejected'] ? resultData[i]['Rejected'] : 0 );

                      }
                      $scope.data.push(newhire);
                      $scope.data.push(initiated);
                      $scope.data.push(accepted);
                      $scope.data.push(completed);
                      $scope.data.push(rejected);

                        // var onBoardingStatus = response.data.OnBoardingStatus;
                        // var selected = [];
                        // var rejected = [];
                        // var inprogress = [];
                        // for(var i=0; i<onBoardingStatus.length; i++){
                        //   $scope.labels1.push(onBoardingStatus[i].Month);
                          
                        //   selected.push(onBoardingStatus[i]['Initiated'] ? onBoardingStatus[i]['Initiated'] : 0 );
                        //   rejected.push(onBoardingStatus[i]['Rejected']  ? onBoardingStatus[i]['Rejected']  : 0 );
                        //   inprogress.push(onBoardingStatus[i]['Initiated'] ? onBoardingStatus[i]['Initiated'] : 0 );
                        // }
                        // $scope.data1.push(selected);
                        // $scope.data1.push(rejected);
                        // $scope.data1.push(inprogress);

                        // var onBoardingCust = response.data.OnBoardingCust;
                        // selected = [];
                        // rejected = [];
                        // inprogress = [];
                        // for(var i=0; i<onBoardingCust.length; i++){
                        //   $scope.labels2.push(onBoardingCust[i].Month);
                          
                        //   selected.push(onBoardingCust[i]['Initiated'] ? onBoardingCust[i]['Initiated'] : 0 );
                        //   rejected.push(onBoardingCust[i]['Rejected']  ? onBoardingCust[i]['Rejected']  : 0 );
                        //   inprogress.push(onBoardingCust[i]['Initiated'] ? onBoardingCust[i]['Initiated'] : 0 );
                        // }
                        // $scope.data2.push(selected);
                        // $scope.data2.push(rejected);
                        // $scope.data2.push(inprogress);

                    } else {
                      ToastrService.error(response.data.message);
                    }
                  },
                  function (err) {
                      ToastrService.error(err.message);
                  }
              )
          }
          //vm.getDynamicList();

          vm.getExcelDownload = function(){
            
              
            var dateTimeStart = moment(vm.dynamic.startDateTime);
            dateTimeStart = dateTimeStart.format("YYYY-MM-DD HH:mm:ss");
            
            var dateTimeEnd = moment(vm.dynamic.endDateTime);
             dateTimeEnd = dateTimeEnd.format("YYYY-MM-DD HH:mm:ss");

              var finalObj = {
                "startDateTime" : dateTimeStart,
                "endDateTime": dateTimeEnd
              }
              
              var url = '';
              if(vm.dynamic.clientId && vm.dynamic.clientId !== '0'){
                url = 'detaileddynamicreportbycliendid';
                finalObj.clientid = vm.dynamic.clientId;
              } else {
                url = 'detaileddynamicreportmultiple';
              }

              
              ReportsService.getExceldata(url, finalObj).then(
                function (response) {
                  if(response.data.Success){
                    var makingData = [];
                    var exceldata;
                    if(vm.dynamic.clientId && vm.dynamic.clientId !== '0'){
                      exceldata = response.data.OnBoarding;
                    } else {
                      exceldata = response.data.OnBoarding;
                    }
                    if(exceldata && exceldata.length){
                      var headerData = '';
                      angular.forEach(exceldata, function(value, key){
                        if(value.NewHire && value.NewHire.length){
                          makingData = makingData.concat(value.NewHire);
                          if(!headerData){
                            headerData = Object.keys(value.NewHire[0])
                          }
                        }
                      });
                      
                  
                  /* generate a worksheet */
                  var ws = XLSX.utils.json_to_sheet(makingData);
                  
                  /* add to workbook */
                  var wb = XLSX.utils.book_new();
                  XLSX.utils.book_append_sheet(wb, ws, "Presidents");
                  
                  /* write workbook and force a download */
                  XLSX.writeFile(wb, "Candidates_Reports.xlsx");

                      //vm.JSONToCSVConvertor(makingData, 'Vehicle Report', true)
                      //exportCSVFile(headerData, makingData, 'Candidates_Reports');
                    }
                  } else {
                    ToastrService.error(response.data.message);
                  }
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
          }       
        
        
    };
    })();