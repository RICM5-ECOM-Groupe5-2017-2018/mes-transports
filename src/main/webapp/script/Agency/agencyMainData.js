var agency = angular.module("agency",['ngCookies']);


//Permet de charger les données relative à l'agence
agency.controller("agencyMainCtrl",function($http,$cookies,$rootScope,$scope,$location,$route,$routeParams){

	$rootScope.listChildAgencies;
	$rootScope.MotherAgency;
	$rootScope.agencyByCity;
	$rootScope.isMother = false;
	$rootScope.user = $cookies.getObject("user");
	$rootScope.token = $cookies.get("token");

	$rootScope.$route = $route;
	$rootScope.currentAgencyView = $routeParams.idA;
	$rootScope.currentAgencyUpdate = $routeParams.idupdate;

	$rootScope.getClass = function (path) {
		  return ($location.path().substr(0, path.length) === path) ? 'active' : '';
	}

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

						reloadSubAgencyMenu();
			    },
			    function(response){ }
		    );
		}
	};

	$rootScope.loadMainAgency=function()
	{

		if($rootScope.user)
		{
			var config = {headers: {'Authorization': 'Bearer ' + $rootScope.token,}};

			$http.get('api/agency/view/'+$rootScope.user.idAgency,config).then(
			   function(response){
						$rootScope.MotherAgency = response.data;
						$rootScope.loadChildAgencies();
			    },
			    function(response){}
		  );
		}
	};

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
				   reloadSubAgencyMenu();
			   }
		    },
		    function(response){}
	    );

	};

	function reloadSubAgencyMenu()
	{
		if($rootScope.MotherAgency.idAgency==undefined){
			$scope.isMother = true;
			$rootScope.agencyByCity={};
			$.each($rootScope.listChildAgencies, function(key, child){
				var city = child.city.toUpperCase();
				if(!$rootScope.agencyByCity[city]){$rootScope.agencyByCity[city]=[];}
				$rootScope.agencyByCity[city].push({"id" : child.id, "name": child.name!=""?child.name:child.address});
			});
		}
	}

	if(!$rootScope.MotherAgency || !$rootScope.listChildAgencies){
		$rootScope.loadMainAgency();
	}
	else if(!$rootScope.agencyByCity){
		reloadSubAgencyMenu();
	}
});


agency.controller("agencyVehicleManagement",function($scope,$http,$cookies,$rootScope,$routeParams,$location){


	$rootScope.listTypes;
	$rootScope.listeVehicules;
	$rootScope.listCharacteristic;
    $rootScope.filtredVehicules

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
							name: agencyName +"-"+child.brand+"-"+$rootScope.listTypes[child.type].label,
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

	if($rootScope.listTypes==undefined && $rootScope.listeVehicules==undefined)
	{
		$rootScope.loadTypes(true);
	}
	else if($rootScope.listTypes==undefined){
		$rootScope.loadTypes(false);
	}
	else if($rootScope.listeVehicules==undefined){
		console.log("load véhicules")
		$rootScope.loadVehicles();
	}
	else if($rootScope.listCharacteristic==undefined){
		$rootScope.loadCarateristics();
	}

});
