agency.controller("viewVehicules",function($scope,$http,$cookies,$rootScope,$routeParams,$location){


	$scope.currentIdVehicules = $routeParams.idV;
	$scope.selectedVehicule;
	$scope.isVehiculeSelected = $scope.currentIdVehicules?true:false;

	/**Data use for the filtred list*/
	$scope.filteredCharacteristic = {
        filterSelectedAgency : {"id" :0, "name": "Toutes",},
        filtredSelectedType : {id : 0, label : "Tous"},
	};

	/**Get data from the selected vehicle*/
    if($scope.currentIdVehicules){

    	if($rootScope.listeVehicules)
		{
            $scope.selectedVehicule = $rootScope.listeVehicules.find(function(element) {
                return element.id == $scope.currentIdVehicules;
            });
            loadVehicleRent();
		}
		else{$location.path('agency/view/vehicule/');}
	}

	/**Change location to add vehicle view*/
	$scope.changeAddNewVehicules=function(){$location.path('/agency/add/vehicule');};

    /**Change location to update vehicle view*/
	$scope.changeUpdateVehicules=function(){
		if($scope.selectedVehicule){
			$location.path('/agency/update/vehicule/'+$scope.selectedVehicule.id);}
	};

    /**Change location to vehicle view depending on the id*/
	$scope.onChange = function(id) {
        $scope.selectedVehicule = $rootScope.listeVehicules.find(function(element) {
            return element.id == id;
        });
        $location.path('agency/view/vehicule/' + id);
    };

	/**Load rent of the slected vehicle*/
	function loadVehicleRent(){
        var config = {headers: {'Authorization': 'Bearer ' + $rootScope.token,}};
		$http.get('api/vehicle/rents/'+$scope.selectedVehicule.id,config).then(
		   function(response){

				 	$scope.allRents = response.data;

					$.each($scope.allRents, function(key, rent){
						rent.endDate = moment(rent.endDate).format("DD-MM-YYYY HH:mm");
						rent.startDate = moment(rent.startDate).format("DD-MM-YYYY HH:mm");
					});
					$scope.filtredRent = $.extend(true, {}, $scope.allRents);
		    },
		    function(response){}
	    );
	}

	/**Filter the vehicle list*/
	$scope.updateFilter=function(){
		$rootScope.filtredVehicules = [];

		if($rootScope.listeVehicules){
            $.each($rootScope.listeVehicules, function(key, v){

                if($scope.filteredCharacteristic.filterSelectedAgency && $scope.filteredCharacteristic.filterSelectedAgency.id!=0)
                {
                    if($scope.filteredCharacteristic.filterSelectedAgency.id!=v.details.idAgency){
                        return;
                    }
                }
                if($scope.filteredCharacteristic.filtredSelectedType && $scope.filteredCharacteristic.filtredSelectedType.id!=0)
                {
                    if($scope.filteredCharacteristic.filtredSelectedType.id!=v.details.type){
                        return;
                    }
                }
                $rootScope.filtredVehicules.push(v);
            });
		}
	};

    /**Function which erased the selected vehicle*/
	$scope.eraseVehicle = function(){

        $http.delete('api/vehicle/delete/'+$scope.selectedVehicule.id).then(
            function(response){
                $rootScope.listeVehicules = $rootScope.listeVehicules.filter(function(vehicle) {
                    return vehicle.id != $scope.selectedVehicule.id;
                });
                $scope.selectedVehicule = {};
                $scope.updateFilter();
                $location.path('/agency/view/vehicule/');
            },
            function(response){}
        );

	}


	/**Update the filtred vehicle list when view is load*/
    $scope.updateFilter();


});
