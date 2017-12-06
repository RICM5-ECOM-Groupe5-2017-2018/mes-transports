agency.filter('shouldShow', function () {
  return function (items, filteredCharacteristic) {
		var filtered = [];

		$.each(items, function(child){

			if(filteredCharacteristic.filterSelectedAgency && filteredCharacteristic.filterSelectedAgency.id!=0)
			{
				if(filteredCharacteristic.filterSelectedAgency!=vehicle.idAgency){
					return true;
				}
			}
			if(filteredCharacteristic.filtredSelectedType && filteredCharacteristic.filtredSelectedType.id!=0)
			{
				if(filteredCharacteristic.filtredSelectedType!=vehicle.idType){
					return true;
				}
			}
			filtered.push(child);
		});

    return filtered;
  };
});


agency.controller("viewVehicules",function($scope,$http,$cookies,$rootScope,$routeParams,$location){

	$scope.currentIdVehicules = $routeParams.idV
	$scope.selectedVehicule;
	$scope.isVehiculeSelected = $scope.currentIdVehicules?true:false;

	$scope.filteredCharacteristic = {
		availableFiltredAgency: listAgency(),
	};


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

		function listAgency(){
			var listAgencyForVehicle = [];

			listAgencyForVehicle.push({"id" :0, "name": "Toutes",});

			$.each($rootScope.listChildAgencies, function(key, child){
				listAgencyForVehicle.push({"id" : child.id, "name": child.name!=""?(child.name+" "+child.city.toUpperCase()):child.address,});
			});

			var mother = $rootScope.MotherAgency;
			listAgencyForVehicle.push({"id" :mother.id, "name": mother.name!=""?(mother.name+" "+mother.city.toUpperCase()):mother.address,});
			return listAgencyForVehicle;
		}


	function loadVehicleRent(){
		$http.get('api/vehicle/rents/'+$scope.selectedVehicule.id).then(
		   function(response){

				 	$scope.allRents = response.data;

					$.each($scope.allRents, function(key, rent){
						rent.endDate = moment(rent.endDate).format("YYYY-MM-DD hh:mm:ss");
						rent.startDate = moment(rent.startDate).format("YYYY-MM-DD hh:mm:ss");
					});
					$scope.filtredRent = $scope.data.beforTreatementCharacteristicsForType = $.extend(true, {}, $scope.allRents);
		    },
		    function(response){}
	    );
	}





});
