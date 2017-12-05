agency.controller("viewVehicules",function($scope,$http,$cookies,$rootScope,$routeParams,$location){

	$scope.currentIdVehicules = $routeParams.idV
	$scope.selectedVehicule;
	$scope.isVehiculeSelected = $scope.currentIdVehicules?true:false;

	if($scope.currentIdVehicules){
		$scope.selectedVehicule = $rootScope.listeVehicules.find(function(element) {
			   return element.id == $scope.currentIdVehicules;
		 });
		 loadVehicleRent();
	}
	else{

	}

	$scope.changeAddNewVehicules=function(){
		$location.path('/agency/add/vehicule');
	};

	$scope.changeUpdateVehicules=function(){
		if($scope.selectedVehicule){
			$location.path('/agency/update/vehicule/'+$scope.selectedVehicule.id);}
	}

	$scope.onChange = function() {
        $location.path('agency/view/vehicule/' + $scope.selectedVehicule.id);
    }

	function loadVehicleRent(){
		$http.get('api/vehicle/rents/'+$scope.selectedVehicule.id).then(
		   function(response){

				 	$scope.rents = response.data;

					$.each($scope.rents, function(key, rent){
						rent.endDate = moment(rent.endDate).format("YYYY-MM-DD hh:mm:ss");
						rent.startDate = moment(rent.startDate).format("YYYY-MM-DD hh:mm:ss");
					});

		    },
		    function(response){}
	    );
	}


});
