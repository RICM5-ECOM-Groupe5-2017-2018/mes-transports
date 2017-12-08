agency.controller("agencyMainPageCtrl",function($scope,$http,$cookies,$rootScope,$routeParams,$location){

    $scope.start = new Date();
    $scope.end = new Date($scope.start.getFullYear(),$scope.start.getMonth(),$scope.start.getDate()+7);
    $scope.BenefitByDate={};
    $scope.BenefitByAdgency = {};

	$scope.setIDParam=function(id){
		$routeParams.idA = id;
	}

	$scope.changeLocationToUpdatePage=function(){
		$location.path('/agency/update/'+$rootScope.MotherAgency.id);
	};

    $('input[name="daterange"]').daterangepicker({
        "startDate": $scope.start,
        "endDate": $scope.end,
        timePicker: true,
        timePickerIncrement: 30,
        "showWeekNumbers": true,
        locale: {
            format: 'DD/MM/YYYY h:mm'
        }
    }, function(start, end, label) {
        $scope.start = start;
        $scope.end = end;
        loadAgenciesProfits();
    });

    function updateGaphBenefitByDate(){

      var data = {
          labels: ['1', '2', '3', '4', '5', '6'],
          series: [
              {
                  data: [1, 2, 3, 5, 8, 13]
              }
          ]
      };

       var options = {
          axisX: {
              labelInterpolationFnc: function(value) {
                  return 'Calendar Week ' + value;
              }
          }
      };

      var responsiveOptions = [
          ['screen and (min-width: 641px) and (max-width: 1024px)', {
              showPoint: false,
              axisX: {
                  labelInterpolationFnc: function(value) {
                      return 'Week ' + value;
                  }
              }
          }],
          ['screen and (max-width: 640px)', {
              showLine: false,
              axisX: {
                  labelInterpolationFnc: function(value) {
                      return 'W' + value;
                  }
              }
          }]
      ];

      new Chartist.Line('#benefitGlobal', data, options, responsiveOptions);
    }

    function updateGaphBenefitByAdgency(){

        var data = {
            labels: ['1', '2', '3', '4', '5', '6'],
            series: [
                {
                    data: [1, 2, 3, 5, 8, 13]
                }
            ]
        };

        var options = {
            axisX: {
                labelInterpolationFnc: function(value) {
                    return 'Calendar Week ' + value;
                }
            }
        };

        var responsiveOptions = [
            ['screen and (min-width: 641px) and (max-width: 1024px)', {
                showPoint: false,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return 'Week ' + value;
                    }
                }
            }],
            ['screen and (max-width: 640px)', {
                showLine: false,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return 'W' + value;
                    }
                }
            }]
        ];

        new Chartist.Line('#benefitGlobal', data, options, responsiveOptions);
    }

    function loadAgenciesProfits(){
        console.log("update");
        var promises = [];
        var rents = {};
        var config = {headers: {'Authorization': 'Bearer ' + $rootScope.token,}};

        promises.push(new Promise(function(resolve, reject){
            $http.get('api/agency/transactions/'+$rootScope.MotherAgency.id+'/'
                + moment($scope.start).format('YYYY-MM-DD hh:mm:ss') + '/'
                + moment($scope.end).format('YYYY-MM-DD hh:mm:ss'),config).then(

                function(response)
                {
                   rents[$rootScope.MotherAgency.id] = response.data
                   resolve("success");
                },
                function(response){console.log("Mother failed");reject("failed");}
            );
        }));

        $.each($rootScope.listChildAgencies, function(key, child){
            promises.push(new Promise(function(resolve, reject){
            $http.get('api/agency/transactions/'+child.id+'/'
                + moment($scope.start).format('YYYY-MM-DD hh:mm:ss') + '/'
                + moment($scope.end).format('YYYY-MM-DD hh:mm:ss'),config).then(

                    function(response){
                     rents[child.id]=response.data;

                     resolve("success");
                    },
                    function(response){console.log("Child "+child.id+" failed");reject("failed");}
                );
            }));
        });

        Promise.all(promises).then(values => {
            console.log(rents);
            //formatBenefitByDate(rents);
            formatBenefitByAdgency(rents);
        });

    }


    function formatBenefitByDate(transactions){
        $scope.BenefitByDate = {};

            $.each(transactions, function(key, agency){
                if(agency.length()!=0){

                    $.each(transactions, function(key, transac) {

                      //moment($scope.str_date).format('YYYY-MM-DD')
                      var date = moment(transac.str_date).format('YYYY-MM-DD')
                      if(!$scope.BenefitByDate[date]){$scope.BenefitByDate[date]=0}
                        $scope.BenefitByDate[date]+=transac.amount;

                    });

                }

            });

        console.log($scope.BenefitByDate);
    }

    function formatBenefitByAdgency(transactions){
        console.log("Array");
        $scope.BenefitByAdgency = {};
        $.each(transactions, function(key, agency){

            if(agency.length>0) {
                console.log(agency);
                

                $.each(agency, function (idTransac, transac) {

                    if (!$scope.BenefitByAdgency[key]) {
                        $scope.BenefitByAdgency[key] = 0
                    }
                    $scope.BenefitByAdgency[key] += transac.amount;

                });
            }
        });
      console.log($scope.BenefitByAdgency);

    }

    //$scope.updateGaphs();
    //loadAgenciesProfits();

});