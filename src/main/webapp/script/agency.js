var agency = angular.module("agency",['ngCookies']);

agency.controller("agencyMainCtrl",function($rootScope,$scope,$location,$route,$routeParams){

	$rootScope.listChildAgencies;
	$rootScope.MotherAgency;
	$rootScope.agencyByCity;
	$rootScope.isMother = false;
	
	$rootScope.$route = $route;
	$rootScope.currentAgencyView = $routeParams.idA;
	$rootScope.currentAgencyUpdate = $routeParams.idupdate;
	
	$rootScope.getClass = function (path) {
		  return ($location.path().substr(0, path.length) === path) ? 'active' : '';
	}
	
}); 

agency.controller("agencyMainPageCtrl",function($scope,$http,$cookies,$rootScope,$routeParams,$location){
	
	loadMainAgency();
	
	function loadMainAgency()
	{
		var user = $cookies.getObject("user");
		var token = $cookies.get("token");
		if(user)
		{
			var config = {headers: {'Authorization': 'Bearer ' + token,}};
			
			$http.get('api/agency/view/'+user.idAgency,config).then(
			   function(response){
					$rootScope.MotherAgency = response.data;
					//console.log($rootScope.MotherAgency);	
					loadChildAgencies();
			    },
			    function(response)
			    {
			    	
			    }
		    );
		}		
	};
	
	function loadChildAgencies()
	{
		var user = $cookies.getObject("user");
		var token = $cookies.get("token");
		if(user)
		{
			var config = {headers: {'Authorization': 'Bearer ' + token,}};
			
			$http.get('api/agency/list/'+user.idAgency,config).then(
			   function(response){
				   
					response.data.forEach(function(child,index) {	
						if(!$rootScope.listChildAgencies){$rootScope.listChildAgencies={};}
						$rootScope.listChildAgencies[child.id] = child;
					});
					
					//console.log($rootScope.listChildAgencies);
					reloadSubAgencyMenu(); 
			    },
			    function(response)
			    {
			    	
			    }
		    );
		}
			
	};
	
	
	$rootScope.loadOneChildAgency=function(id)
	{
		var token = $cookies.get("token");
		var config = {headers: {'Authorization': 'Bearer ' + token,}};
		
		$http.get('api/agency/view/'+id,config).then(
		   function(response){
			   if(response.data.id==$rootScope.MotherAgency.id)
			   {
				   $rootScope.MotherAgency = response.data;
			   }
			   else{
				   $rootScope.listChildAgencies[response.data.id] = response.data;
				   reloadSubAgencyMenu()
			   }
			   
		    },
		    function(response)
		    {
		    	
		    }
	    );
			
	};
	
	function reloadSubAgencyMenu()
	{
		if($rootScope.MotherAgency.idAgency==undefined)
		{
			$scope.isMother = true;
			console.log($rootScope.listChildAgencies);
			$rootScope.agencyByCity={};
			$.each($rootScope.listChildAgencies, function(key, child){
				var city = child.city.toUpperCase();
				if(!$rootScope.agencyByCity[city]){$rootScope.agencyByCity[city]=[];}
				$rootScope.agencyByCity[city].push({"id" : child.id, "name": child.name!=""?child.name:child.address});
			});
		}
	}
	
	$scope.setIDParam=function(id)
	{
		console.log("setParam");
		$routeParams.idA = id;
	}
	
	$scope.changeLocationToUpdatePage=function(){
		$location.path('/agency/update/'+$rootScope.MotherAgency.id);
	};
	
});


agency.controller("graphics",function($scope,$http,$cookies,$rootScope){
	

	
	
}); 

agency.controller("childRegistration",function($scope,$http,$cookies,$route, $routeParams,$location,$rootScope){

	var token = $cookies.get("token");
	var user = $cookies.getObject("user");
	$scope.data = {
		    availableBanks: [
				{id:'0',name:'CIC',value:'link',},
				{id:'1',name:'LCL',value:'link',},
				{id:'2',name:'La caisse d\'épargne',value:'link',},
				{id:'3',name:'Crédit mutuel',value:'link',},
				{id:'4',name:'La banque populaire',value:'link',},
				{id:'5',name:'Crédit agricole',value:'link',},
				{id:'6',name:'BNP',value:'link',},
				{id:'7',name:'Société générale',value:'link',},
				{id:'8',name:'La banque postale',value:'link',},
			],
			
			availableTypes: [
				{id:'AgenceN',name:'Agence de Location'},
			],
		};
	
	$scope.isUpdate = false;
	
	if(!$route.routes[$location.path()]){
		$scope.isUpdate = true;
		$scope.idUpdatedAgency = $routeParams.idupdate;
		
		
		var config = {headers: {'Authorization': 'Bearer ' + token,}};
		
		$http.get('api/agency/view/'+$scope.idUpdatedAgency,config).then(
		   function(response){
			   
			   $scope.agency = response.data
			   
			   //Fill address input
			   var adressWithoutCity = ($scope.agency.address.slice(0,$scope.agency.address.lastIndexOf($scope.agency.city))).trim();
			   $scope.data.addressp1 = adressWithoutCity.slice(0, adressWithoutCity.length-6)
			   $scope.data.addressp2 =  adressWithoutCity.slice(-5);
			   
			   //Fill bank input
			   $scope.data.selectedBank = $scope.data.availableBanks.find(function(element) {
									   return element.name == $scope.agency.bankName;
									 }); 
			   $scope.data.selectedType = $scope.data.availableTypes.find(function(element) {
				   return element.id == $scope.agency.type;
				 }); 
			   
			   console.log($scope.data.selectedType);
			   
		    },
		    function(response)
		    {
		    	
		    }
	    );
		
	}
	
	
    $scope.sendFormAgency = function(){
    	
    	if($scope.isUpdate)
    	{
    		$scope.agency.bankLink =$scope.data.selectedBank.value;
    		$scope.agency.bankName = $scope.data.selectedBank.name;
    		
    		$scope.agency.address = $scope.data.addressp1+" "+$scope.data.addressp2+" "+$scope.agency.city.toUpperCase();
    		$scope.agency.city = $scope.agency.city.toUpperCase()
    		$scope.agency.type = $scope.data.selectedType.id;
    		
    		sendUpdate();
    	}
    	else{
    		sendNew();
    	}
    	
    }
    
    function sendNew()
    {
    	if(user && user.isAgency)
    	{
    		var dataToSend = {
    				"id":null,
    				"type":$scope.data.selectedType.id,
    				"address":$scope.data.addressp1+" "+$scope.data.addressp2+" "+$scope.agency.city.toUpperCase(),
    				"idMotherAgency":user.idAgency,
    				"phoneNum":$scope.agency.phoneNum,
    				"city":$scope.agency.city.toUpperCase(),
    				"name":$scope.agency.name,
    				"bankLink":$scope.data.selectedBank.value,
    				"bankName":$scope.data.selectedBank.name,
    				"rib":$scope.agency.rib,
    				"status":null,
    				"transactionList":null,
    		};
    		
    		$scope.data.selectedBank = undefined;
    		$scope.data.addressp1 = undefined;
    		$scope.data.addressp2 = undefined;
    		$scope.data.selectedType = undefined;
    		
    		var config = {headers: {'Authorization': 'Bearer ' + user.token,}};
    		
    		$http.post('api/agency/create/', dataToSend, config)
    		.then(function successCallback(response) {
    			$scope.agency={};
	        	$scope.registerForm.$setPristine();
	        	$rootScope.loadOneChildAgency(response.data.id);
	        	alert("L'agence est créée");
    		}, function errorCallback(data, status, headers) {
    		
    		});
    		
    	}
    }
    
    function sendUpdate(){
    	if(user && user.isAgency)
    	{
    		var config = {headers: {'Authorization': 'Bearer ' + user.token,}};
    		
    		$http.put('api/agency/edit/', $scope.agency, config)
    		.then(function successCallback(response) {
    			$scope.agency={};
	        	$scope.registerForm.$setPristine();
	    		
	        	alert("L'agence est modifier");
	        	
	        	if($scope.idUpdatedAgency==user.idAgency)
	        	{
	        		$location.path('/agency');
	        		$rootScope.loadOneChildAgency($scope.idUpdatedAgency);
	        	}
	        	else
	        	{
	        		$rootScope.loadOneChildAgency($scope.idUpdatedAgency);
	        		$location.path('/agency/view/chagency/'+$scope.idUpdatedAgency);
	        	}
	        	
    		}, function errorCallback(data, status, headers) {
    		
    		});
    		
    	}
    }

});

agency.controller("childAgencyView",function($scope,$http,$cookies,$rootScope,$routeParams,$location){

	$scope.currentIdAgency = $routeParams.idA
	console.log($rootScope.agencyByCity);
	
	$scope.changeLocationToUpdatePage=function(){
		$location.path('/agency/update/'+$scope.currentIdAgency);
	};
	
	//$scope.idMenu = '#'+$rootScope.listChildAgencies[$scope.currentIdAgency].city+'-'+$rootScope.listChildAgencies[$scope.currentIdAgency].name;
	
	
});


agency.controller("viewVehicules",function($scope,$http,$cookies,$rootScope,$routeParams,$location){
	
	
	
	$scope.currentIdVehicules = $routeParams.idV
	$scope.selectedVehicule;
	$scope.isVehiculeSelected = $scope.currentIdVehicules?true:false;
	
	if($scope.currentIdVehicules){
		
		$scope.selectedVehicule = $rootScope.listeVehicules.find(function(element) {
			   return element.id == $scope.currentIdVehicules;
		 });
		loadSelectedVehicle($scope.currentIdVehicules);
		//$scope.selectedVehiculeDetails
	}
	else{
		loadTypes(true);
	}
	
	$scope.changeAddNewVehicules=function(){
		$location.path('/agency/add/vehicule');
	};
	
	$scope.onChange = function() {
        $location.path('agency/view/vehicule/' + $scope.selectedVehicule.id);
    }
	
	function loadVehicles()
	{
		var user = $cookies.getObject("user");
		if(user)
		{
			var req = {
			 method: 'GET',
			 url: 'api/agency/vehicle/'+user.idAgency,
			 headers: {'Authorization': 'Bearer ' + user.token},
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
					console.log("Liste vehicule")
					console.log($rootScope.listeVehicules)
			    },
			    function(response)
			    {
			    	
			    }
	    	);
		}
	};
	
	function loadCarateristics()
	{
		var user = $cookies.getObject("user");
		if(user)
		{
			var req = {
			 method: 'GET',
			 url: 'api/vehicle/list',
			 headers: {'Authorization': 'Bearer ' + user.token},
			}
			$http(req).then(

				function(response){
					response.data.forEach(function(child,index) {	
						if(!$rootScope.listCharacteristic){$rootScope.listCharacteristic={};}
						$rootScope.listCharacteristic[child.id] = child;
					});
					console.log("Carac")
					console.log($rootScope.listCharacteristic);
			    },
			    function(response)
			    {
			    	
			    }
	    	);
		}
	};
	
	function loadTypes(loadVehiculesToo)
	{
		var user = $cookies.getObject("user");
		if(user)
		{
			var req = {
			 method: 'GET',
			 url: 'api/vehicle/type',
			 headers: {'Authorization': 'Bearer ' + user.token},
			}
			$http(req).then(

				function(response){
					response.data.forEach(function(child,index) {	
						if(!$rootScope.listTypes){$rootScope.listTypes={};}
						$rootScope.listTypes[child.id] = child;
					});
					
					if(loadVehiculesToo){loadVehicles();}
					
					console.log("Types")
					console.log($rootScope.listTypes);
			    },
			    function(response)
			    {
			    	
			    }
	    	);
		}
	};
	
	function loadSelectedVehicle(id)
	{
		var token = $cookies.get("token");
		var config = {headers: {'Authorization': 'Bearer ' + token,}};
		
		$http.get('api/vehicle/view/details/'+id,config).then(
		   function(response){
			   $scope.selectedVehiculeDetails = response.data;
		    },
		    function(response)
		    {
		    	
		    }
	    );
			
	};
	
	$scope.loadUpdateOrCreateVehicle=function(id)
	{
		var token = $cookies.get("token");
		var config = {headers: {'Authorization': 'Bearer ' + token,}};
		
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
	
	//$scope.idMenu = '#'+$rootScope.listChildAgencies[$scope.currentIdAgency].city+'-'+$rootScope.listChildAgencies[$scope.currentIdAgency].name;
	
	
});


agency.controller("agencySideMenu",function($scope,$http,$cookies,$rootScope){
	
});
