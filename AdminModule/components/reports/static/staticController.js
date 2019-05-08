(function () {
    'use strict';
    hrAdminApp.controller('StaticController', StaticController);
    StaticController.$inject = [ '$scope','$rootScope','$stateParams', '$location', 'ToastrService', 'ReportsService'];
    function StaticController( $scope,$rootScope, $stateParams, $location, ToastrService, ReportsService) {
   
        var vm = this;
        $scope.$parent.currentNavItem = 0;
       
        //$scope.labels = ['Novermber', 'December', 'January'];
        $scope.labels = [];
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
    
        // $scope.data = [
        //   [65, 59, 90],
        //   [28, 48, 100],
        //   [28, 48, 100]
        // ];
        $scope.data = [];

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
        //$scope.series = ['Selected', 'Rejected', 'InProgress'];
        
        // $scope.colors = [
        //     {
        //         borderColor: "#4db671",
        //         backgroundColor: "#4db671",
        //         fill: true
        //     },
        //     {
        //         borderColor: "#e6605f",
        //         backgroundColor: "#e6605f",
        //         fill: true
        //     },
        //     {
        //         borderColor: "#e4b158",
        //         backgroundColor: "#e4b158",
        //         fill: true
        //     }
        //   ];
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
        


          function getStaticList() {
            ReportsService.getStaticList().then(
                function (response) {
                  if(response.data.Success){
                      var staticList = response.data.OnBoarding;
                      var newhire = [];
                      var rejected = [];
                      var accepted = [];
                      var completed = [];
                      var initiated = [];
                      for(var i=0; i<staticList.length; i++){
                        $scope.labels.push(staticList[i].Month);
                        
                        newhire.push(staticList[i]['NewHire'] ? staticList[i]['NewHire'] : 0 );
                        initiated.push(staticList[i]['Initiated'] ? staticList[i]['Initiated'] : 0 );
                        accepted.push(staticList[i]['Accepted'] ? staticList[i]['Accepted'] : 0 );
                        completed.push(staticList[i]['Completed']  ? staticList[i]['Completed']  : 0 );
                        rejected.push(staticList[i]['Rejected'] ? staticList[i]['Rejected'] : 0 );



                      }
                      $scope.data.push(newhire);
                      $scope.data.push(initiated);
                      $scope.data.push(accepted);
                      $scope.data.push(completed);
                      $scope.data.push(rejected);

                  } else {
                    ToastrService.error(response.data.message);
                  }
                },
                function (err) {
                    ToastrService.error(err.message);
                }
            )
        }
        getStaticList();      
      

      vm.getExcelDownload = function(){
           

          
          ReportsService.getStaticExcelReport().then(
            function (response) {
              if(response.data.Success){
                var makingData = [];
                var exceldata;
                  exceldata = response.data.OnBoarding;
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
                  
                  //vm.JSONToCSVConvertor(makingData, 'Vehicle Report', true);
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