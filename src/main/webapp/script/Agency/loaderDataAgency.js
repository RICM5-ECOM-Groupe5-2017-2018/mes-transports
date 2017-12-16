var agency = angular.module("agency",['ngCookies']);


//Permet de charger les données relative à l'agence
agency.controller("agencyMainCtrl",function($http,$cookies,$rootScope, $scope,$location,$route,$routeParams){


	$rootScope.listChildAgencies;
	$rootScope.MotherAgency;
	$rootScope.agencyByCity;
    $rootScope.isChild = true;
	$rootScope.isMother = $rootScope.MotherAgency?$rootScope.MotherAgency.idMotherAgency==null:true;
	$rootScope.user = $cookies.getObject("user");
	$rootScope.token = $cookies.get("token");

	$rootScope.$route = $route;
	$rootScope.currentAgencyView = $routeParams.idA;
	$rootScope.currentAgencyUpdate = $routeParams.idupdate;
	$rootScope.availableAgency;

    $scope.isMotherAgency = false;


    /**Create an array where agency are group by city*/
    $rootScope.reloadSubAgencyMenu=function()
    {
        if($rootScope.isMother){
            $rootScope.agencyByCity={};
            if($rootScope.listChildAgencies){
                $.each($rootScope.listChildAgencies, function(key, child){
                	if(child){
                        var city = child.city.toUpperCase();
                        if(!$rootScope.agencyByCity[city]){$rootScope.agencyByCity[city]=[];}
                        $rootScope.agencyByCity[city].push({"id" : child.id, "name": child.name!=""?child.name:child.address});
					}
                });
            }
        }
    };

	/**Function which load the list of child agency*/
	$rootScope.loadChildAgencies=function()
	{
		if($rootScope.user)
		{
			var config = {headers: {'Authorization': 'Bearer ' + $rootScope.token,}};

			$http.get('api/agency/list/'+$rootScope.user.idAgency,config).then(
			   function(response){

						response.data.forEach(function(child,index) {
							if(!$rootScope.listChildAgencies){$rootScope.listChildAgencies={};}
							$rootScope.listChildAgencies[child.id] = child;
						});

                   		$rootScope.reloadSubAgencyMenu();
                   		listAgency();
				},
				function(response){ }
		    );
		}
	};

	/**Function which load the main agency*/
	$rootScope.loadMainAgency=function()
	{

		if($rootScope.user)
		{

			var config = {headers: {'Authorization': 'Bearer ' + $rootScope.token,}};

			$http.get('api/agency/view/'+$rootScope.user.idAgency,config).then(
			   function(response){
						$rootScope.MotherAgency = response.data;
						$rootScope.loadChildAgencies();
						$rootScope.isMother = $rootScope.MotherAgency.idMotherAgency==null;
			    },
			    function(response){}
		  );
		}
	};

	/**Function which load one agency depending of the id parameter*/
	$rootScope.loadOneChildAgency=function(id)
	{
		var config = {headers: {'Authorization': 'Bearer ' + $rootScope.token,}};

		$http.get('api/agency/view/'+id,config).then(
		   function(response){
			   if(response.data.id==$rootScope.MotherAgency.id){
				   $rootScope.MotherAgency = response.data;
			   }
			   else{
				   $rootScope.listChildAgencies[response.data.id] = response.data;
                   $rootScope.reloadSubAgencyMenu();
			   }
               listAgency();
		    },
		    function(response){}
	    );
	};

    /**Create an object containing all the agency(child and main)*/
    function listAgency(){
        $rootScope.availableAgency = [];

        $rootScope.availableAgency.push({"id" :0, "name": "Toutes",});

        if($rootScope.listChildAgencies && $rootScope.MotherAgency){
            $.each($rootScope.listChildAgencies, function(key, child){
                $rootScope.availableAgency.push({"id" : child.id, "name": child.name!=""?(child.name+" "+child.city.toUpperCase()):child.address,});
            });

            var mother = $rootScope.MotherAgency;
            $rootScope.availableAgency.push({"id" :mother.id, "name": mother.name!=""?(mother.name+" "+mother.city.toUpperCase()):mother.address,});
        }
        return $rootScope.availableAgency;
    }

	//Load data if they aren't
	if(!$rootScope.MotherAgency || !$rootScope.listChildAgencies){
		$rootScope.loadMainAgency();
	}
	else if(!$rootScope.agencyByCity){
        $rootScope.reloadSubAgencyMenu();

	}
    console.log($rootScope.isMother);
});


agency.controller("agencyVehicleManagement",function($scope,$http,$cookies,$rootScope,$routeParams,$location){


	$rootScope.listTypes;
	$rootScope.listeVehicules;
	$rootScope.listCharacteristic;
    $rootScope.filtredVehicules

	/**Function which load agency(main and child) vehicle*/
	$rootScope.loadVehicles=function()
	{
		if($rootScope.user)
		{
			var req = {
			 method: 'GET',
			 url: 'api/agency/vehicle/'+$rootScope.user.idAgency,
			 headers: {'Authorization': 'Bearer ' + $rootScope.user.token},
			}
			$http(req).then(

				function(response){
					$rootScope.listeVehicules=[];
					response.data.forEach(function(child,index) {
						var agencyName = ($rootScope.MotherAgency.id == child.idAgency)?$rootScope.MotherAgency.name:$rootScope.listChildAgencies[child.idAgency].name
						$rootScope.listeVehicules.push({
							id : child.id,
							name: child.brand,
							details : child,
							});
					});
                    $rootScope.filtredVehicules = $rootScope.listeVehicules;
			    },
			    function(response)
			    {

			    }
	    	);
		}
	};

	/**Load all available characteristics*/
	$rootScope.loadCarateristics=function()
	{
		if($rootScope.user)
		{
			var req = {
			 method: 'GET',
			 url: 'api/vehicle/list',
			 headers: {'Authorization': 'Bearer ' + $rootScope.user.token},
			}
			$http(req).then(

				function(response){
					response.data.forEach(function(child,index) {
						if(!$rootScope.listCharacteristic){$rootScope.listCharacteristic={};}
						$rootScope.listCharacteristic[child.id] = child;
					});
			    },
			    function(response)
			    {

			    }
	    	);
		}
	};

	/**Load all available vehicle type and vehicle if there aren't load*/
	$rootScope.loadTypes=function(loadVehiculesToo)
	{
		if($rootScope.user)
		{
			var req = {
			 method: 'GET',
			 url: 'api/vehicle/type',
			 headers: {'Authorization': 'Bearer ' + $rootScope.user.token},
			}
			$http(req).then(

				function(response){
					$rootScope.availableFilredTypes = [];
					response.data.forEach(function(child,index) {
						if(!$rootScope.listTypes){$rootScope.listTypes={};}
						$rootScope.listTypes[child.id] = child;
						$rootScope.availableFilredTypes.push(child)
					});

					$rootScope.availableFilredTypes.push({id : 0, label : "Tous types"});
					if(loadVehiculesToo){$rootScope.loadVehicles();}

			    },
			    function(response)
			    {

			    }
	    	);
		}
	};

	/**Load one vehicule depending on the id*/
	$rootScope.loadUpdateOrCreateVehicle=function(id)
	{
		var config = {headers: {'Authorization': 'Bearer ' + $rootScope.token,}};

		$http.get('api/vehicle/view/'+id,config).then(
		   function(response){

			   var vehicle = response.data;

			   var agencyName = ($rootScope.MotherAgency.id == vehicle.idAgency)?$rootScope.MotherAgency.name:$rootScope.listChildAgencies[vehicle.idAgency].name
			   var newVehicules = {
									id : vehicle.id,
									name: agencyName +"-"+vehicle.brand+"-"+$rootScope.listTypes[vehicle.type].label,
									details : vehicle,
								  }

			   var index= $rootScope.listeVehicules.findIndex(function(element) {
				   return element.id == newVehicules.id;
			   });
			   if(index!=-1){$rootScope.listeVehicules.splice(index,1);}
			   $rootScope.listeVehicules.push(newVehicules);
		    },
		    function(response)
		    {

		    }
	    );

	};

	//Load data if there aren't
	if($rootScope.listTypes==undefined && $rootScope.listeVehicules==undefined)
	{
		$rootScope.loadTypes(true);
	}
	else if($rootScope.listTypes==undefined){
		$rootScope.loadTypes(false);
	}
	else if($rootScope.listeVehicules==undefined){
		$rootScope.loadVehicles();
	}
	else if($rootScope.listCharacteristic==undefined){
		$rootScope.loadCarateristics();
	}

});
