var agency = angular.module("agency",['ngCookies']);

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
			    function(response)
			    {
			    	
			    }
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
			    function(response)
			    {
			    	
			    }
		    );
		}		
	};
	
	$rootScope.loadOneChildAgency=function(id)
	{
		var config = {headers: {'Authorization': 'Bearer ' + $rootScope.token,}};
		
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

agency.controller("agencyMainPageCtrl",function($scope,$http,$cookies,$rootScope,$routeParams,$location){
	
	$scope.setIDParam=function(id)
	{
		$routeParams.idA = id;
	}
	
	$scope.changeLocationToUpdatePage=function(){
		$location.path('/agency/update/'+$rootScope.MotherAgency.id);
	};
	
});


agency.controller("graphics",function($scope,$http,$cookies,$rootScope){
	

	
	
}); 

agency.controller("childRegistration",function($scope,$http,$cookies,$route, $routeParams,$location,$rootScope){

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
		
		
		var config = {headers: {'Authorization': 'Bearer ' + $rootScope.token,}};
		
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
			   
			   //console.log($scope.data.selectedType);
			   
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
    	if($rootScope.user && $rootScope.user.isAgency)
    	{
    		var dataToSend = {
    				"id":null,
    				"type":$scope.data.selectedType.id,
    				"address":$scope.data.addressp1+" "+$scope.data.addressp2+" "+$scope.agency.city.toUpperCase(),
    				"idMotherAgency":$rootScope.user.idAgency,
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
    		
    		var config = {headers: {'Authorization': 'Bearer ' + $rootScope.user.token,}};
    		
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
    	if($rootScope.user && $rootScope.user.isAgency)
    	{
    		var config = {headers: {'Authorization': 'Bearer ' + $rootScope.user.token,}};
    		
    		$http.put('api/agency/edit/', $scope.agency, config)
    		.then(function successCallback(response) {
    			$scope.agency={};
	        	$scope.registerForm.$setPristine();
	    		
	        	alert("L'agence est modifier");
	        	
	        	if($scope.idUpdatedAgency==$rootScope.user.idAgency)
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
	//console.log($rootScope.agencyByCity);
	
	$scope.changeLocationToUpdatePage=function(){
		$location.path('/agency/update/'+$scope.currentIdAgency);
	};
	
	//$scope.idMenu = '#'+$rootScope.listChildAgencies[$scope.currentIdAgency].city+'-'+$rootScope.listChildAgencies[$scope.currentIdAgency].name;
	
	
});

agency.controller("agencyVehicleManagement",function($scope,$http,$cookies,$rootScope,$routeParams,$location){
	
	
	$rootScope.listTypes;
	$rootScope.listeVehicules;
	$rootScope.listCharacteristic;
	
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
					response.data.forEach(function(child,index) {	
						if(!$rootScope.listTypes){$rootScope.listTypes={};}
						$rootScope.listTypes[child.id] = child;
					});
					
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
		$rootScope.loadVehicles();
	}
	else if($rootScope.listCharacteristic==undefined){
		$rootScope.loadCarateristics();
	}
	
});


agency.controller("viewVehicules",function($scope,$http,$cookies,$rootScope,$routeParams,$location){
	
	$scope.currentIdVehicules = $routeParams.idV
	$scope.selectedVehicule;
	$scope.isVehiculeSelected = $scope.currentIdVehicules?true:false;
	
	if($scope.currentIdVehicules){
		$scope.selectedVehicule = $rootScope.listeVehicules.find(function(element) {
			   return element.id == $scope.currentIdVehicules;
		 });
		//console.log($scope.selectedVehicule);
	}
	else{
		
	}
	
	$scope.changeAddNewVehicules=function(){
		$location.path('/agency/add/vehicule');
	};
	
	$scope.changeUpdateVehicules=function(){
		console.log("Update");
		if($scope.selectedVehicule){
			console.log("blop");
			$location.path('/agency/update/vehicule/'+$scope.selectedVehicule.id);}
	}
	
	$scope.onChange = function() {
        $location.path('agency/view/vehicule/' + $scope.selectedVehicule.id);
    }
	

});

agency.controller("addVehiculeCtrl",function($scope,$http,$cookies,$rootScope,$routeParams,$location,$route){
	
	$scope.data = {
	    availableInsurance: [
			{name:'MAIF',value:'link',},
			{name:'AXA',value:'link',},
			{name:'Direct assurance',value:'link',},
			{name:'Matmut',value:'link',},
		],
		
		selectedInsurance: {name:'MAIF',value:'link',},
		
		availableTypes : $rootScope.listTypes,
		
		availableAgency : listAgency(),
		
		slectedCharacteristic : [],

	};
	
	//console.log($scope.data);
	
	$scope.isUpdate = false;
	
	if(!$route.routes[$location.path()]){
		
		loadUpdateForm()
	}
	
	function listAgency(){
		var listAgencyForVehicle = [];
		$.each($rootScope.listChildAgencies, function(key, child){
			listAgencyForVehicle.push({"id" : child.id, "name": child.name!=""?(child.name+" "+child.city.toUpperCase()):child.address,});
		});
		
		var mother = $rootScope.MotherAgency;
		listAgencyForVehicle.push({"id" :mother.id, "name": mother.name!=""?(mother.name+" "+mother.city.toUpperCase()):mother.address,});
		return listAgencyForVehicle;		
	}
	
	$scope.showCharacteristics=function(){
		
		parseCharacteristics();
	}
	
	
	$scope.sendFormVehicules=function(){
		
		
		console.log($scope.data.beforTreatementCharacteristicsForType);
		console.log($scope.data.characteristicsForType);
		if($scope.isUpdate)
		{
			$scope.vehicle.id = $scope.selectedVehicule.details.id;
		}
		else{
			$scope.vehicle.id = null;
		}
		$scope.vehicle.status = null;
		
		$scope.vehicle.insurance = $scope.data.selectedInsurance.name;
		$scope.vehicle.idAgency = $scope.data.selectedAgency.id;
		$scope.vehicle.type = $scope.data.selectedTypeVehicule.id;
		
		
		$scope.vehicle.characteristicList = [];
		console.log($scope.data.slectedCharacteristic);
		
		 $.each( $scope.data.beforTreatementCharacteristicsForType , function(key , value){
			 var newChar = {
					 valueCharacteristic : $scope.data.slectedCharacteristic[value.label],
					 idCharacteristic : value
			 }
			 $scope.vehicle.characteristicList.push(newChar);
		 });
		 
		 
		 console.log($scope.vehicle);
		 
		 if($scope.isUpdate)
		 {sendUpdateVehicle();}
		 else{sendNewVehicle();}
	}
	
	function loadUpdateForm(){
		$scope.isUpdate = true;
		$scope.currentIdVehicules = $routeParams.idVupdate
		
		$scope.selectedVehicule = $rootScope.listeVehicules.find(function(element) {
			   return element.id == $scope.currentIdVehicules;
		 });
		
		console.log($scope.selectedVehicule);
		console.log($scope.data);
		
		$scope.vehicle={};
		$scope.vehicle.brand = $scope.selectedVehicule.details.brand;
		$scope.vehicle.price = $scope.selectedVehicule.details.price;
		$scope.data.selectedAgency =  $scope.data.availableAgency.find(function(element) {
			   return element.id == $scope.selectedVehicule.details.idAgency;
		 });
			
		$scope.data.selectedInsurance = $scope.data.availableInsurance.find(function(element) {
			   return element.name == $scope.selectedVehicule.details.insurance;
		 });
		
		console.log($scope.data.availableTypes);
		
		$scope.data.selectedTypeVehicule = $scope.data.availableTypes[$scope.selectedVehicule.details.type];
		
		$.each($scope.selectedVehicule.details.characteristicList, function(key , characteristic){
			$scope.data.slectedCharacteristic[characteristic.idCharacteristic.label] = characteristic.valueCharacteristic;
		});
		
		parseCharacteristics();
		console.log($scope.data);
		
	}
	

	function parseCharacteristics(){
		console.log($scope.data.selectedTypeVehicule);
		$http.get('api/vehicle/list/'+$scope.data.selectedTypeVehicule.id).then(
		   function(response){
			   
			   
			   if($scope.selectedVehicule && $scope.selectedVehicule.details.type==$scope.data.selectedTypeVehicule.id){
				   console.log("update");
				   $.each($scope.selectedVehicule.details.characteristicList, function(key , characteristic){
						$scope.data.slectedCharacteristic[characteristic.idCharacteristic.label] = characteristic.valueCharacteristic;
					});  
			   }
			   else{
				   console.log("new");
				   $scope.data.slectedCharacteristic=[];}
			   
			   
			   $scope.data.beforTreatementCharacteristicsForType = $.extend(true, {}, response.data.sort(function (a, b) {return a.rank - b.rank;}));
	
			   $.each(response.data, function(key , characteristic){
				   
				   //required or not
				   if(!characteristic.optional){
					   characteristic.labelSee=characteristic.label+"*";
				   }
				   else{
					   characteristic.labelSee=characteristic.label;
				   }
				   
				   //type+patern
				   switch (characteristic.unit) {
				   		case "str":
				   			characteristic.type ="text";
				   			characteristic.typeWait ="Texte";
				   			characteristic.pattern ="";
				   			break;
				   		case "int":
				   			characteristic.type ="number";
				   			characteristic.pattern ="/^[0-9]+[0-9]*$/";
				   			characteristic.typeWait ="Nombre entier";
				   			break;
				   		case "float":
				   			characteristic.type ="number";
				   			characteristic.pattern ="/^[0-9]+(\.[0-9]{1,2})?$/";
				   			characteristic.typeWait ="Décimale";
				   			break;
				   		default:
				   			break;
				   }
				   
				   //size
				   characteristic.max ="255";
			   });
			   
			   $scope.data.characteristicsForType = response.data.sort(function (a, b) {return a.rank - b.rank;});;
	
		    },
		    function(response)
		    {
		    	
		    }
	    );
	}

	function sendNewVehicle(){
		if($rootScope.user && $rootScope.user.isAgency)
		{
			var config = {headers: {'Authorization': 'Bearer ' + $rootScope.user.token,}};
			
			$http.post('api/vehicle/create/', $scope.vehicle, config)
			.then(function successCallback(response) {
				$scope.vehicle={};
	        	$scope.registerForm.$setPristine();
	        	$rootScope.loadUpdateOrCreateVehicle(response.data.id);
	        	
	        	alert("Le vehicule a été créé");
	        	$location.path('/agency/view/vehicule');
			}, function errorCallback(data, status, headers) {
			
			});
		}		
	}
	
	function sendUpdateVehicle(){
		if($rootScope.user && $rootScope.user.isAgency)
		{
			var config = {headers: {'Authorization': 'Bearer ' + $rootScope.user.token,}};
			
			$http.put('api/vehicle/edit/', $scope.vehicle, config)
			.then(function successCallback(response) {
				$scope.vehicle={};
	        	$scope.registerForm.$setPristine();
	        	$rootScope.loadUpdateOrCreateVehicle(response.data.id);
	        	
	        	alert("Le vehicule a été modifié");
	        	$location.path('/agency/view/vehicule/'+response.data.id);
			}, function errorCallback(data, status, headers) {
			
			});
		}
	}
	
});

