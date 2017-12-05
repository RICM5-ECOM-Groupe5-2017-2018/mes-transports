agency.controller("agencyMainPageCtrl",function($scope,$http,$cookies,$rootScope,$routeParams,$location){

  $scope.start = new Date();
	$scope.end = new Date($scope.start.getFullYear(),
										$scope.start.getMonth(),$scope.start.getDate()+7);


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

  $scope.updateGaphs = function(){

    new Chartist.Line('#benefitGlobal', {
      labels: [],
      series: [
      ]
    }, {
      fullWidth: true,
      chartPadding: {
        right: 40
      }
    });
  }

  function loadAgenciesProfits(){
    console.log("update");
    var promises = [];
    var rents = {};
    var config = {headers: {'Authorization': 'Bearer ' + $rootScope.token,}};

    promises.push(new Promise(function(resolve, reject){
      $http.get('api/agency/rents/'+$rootScope.MotherAgency.id+'/'
          + moment($scope.start).format('YYYY-MM-DD hh:mm:ss') + '/'
          + moment($scope.end).format('YYYY-MM-DD hh:mm:ss'),config).then(
         function(response){
           rents[$rootScope.MotherAgency.id] = [];
           $.each(response.data, function(key, child){
             child.endDate = moment(child.endDate).format('YYYY-MM-DD hh:mm:ss');
             child.startDate = moment(child.startDate).format('YYYY-MM-DD hh:mm:ss');
           });
           rents[$rootScope.MotherAgency.id].push(response.data);
            resolve("success");
          },
          function(response){console.log("Mother failed");reject("failed");}
      );
    }));

    $.each($rootScope.listChildAgencies, function(key, child){
      promises.push(new Promise(function(resolve, reject){
        $http.get('api/agency/rents/'+child.id+'/'
            + moment($scope.start).format('YYYY-MM-DD hh:mm:ss') + '/'
            + moment($scope.end).format('YYYY-MM-DD hh:mm:ss'),config).then(
    		   function(response){
             rents[child.id]=[];
             $.each(response.data, function(key, child){
               child.endDate = moment(child.endDate).format('YYYY-MM-DD hh:mm:ss');
               child.startDate = moment(child.startDate).format('YYYY-MM-DD hh:mm:ss');
               rents[child.id].push(child);
             });
             resolve("success");
    		    },
    		    function(response){console.log("Child "+child.id+" failed");reject("failed");}
    	    );
      }));
    });

    Promise.all(promises).then(values => {
      console.log(rents);
    });

  }



});
