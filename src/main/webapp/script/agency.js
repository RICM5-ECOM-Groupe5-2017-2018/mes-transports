var agency = angular.module("agency",['ngCookies']);

agency.controller("agencyMainCtrl",function($rootScope,$scope,$location,$route,$routeParams){

	$rootScope.listChildAgencies;
	$rootScope.MotherAgency;
	$rootScope.agencyByCity;
	$rootScope.isMother = false;
	
	$rootScope.$route = $route;
	$rootScope.paramIdAgency = $routeParams.idA;
	
	$rootScope.getClass = function (path) {
		  return ($location.path().substr(0, path.length) === path) ? 'active' : '';
	}
	
}); 

agency.controller("agencyMainPageCtrl",function($scope,$http,$cookies,$rootScope,$routeParams){
	
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
			   $rootScope.listChildAgencies[response.data.id] = response.data;
			   reloadSubAgencyMenu()
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
			$.each($rootScope.listChildAgencies, function(key, child){
				var city = child.city.toUpperCase();
				
				if(!$rootScope.agencyByCity){$rootScope.agencyByCity={};}
				
				if(!$rootScope.agencyByCity[city]){$rootScope.agencyByCity[city]=[];}
				$rootScope.agencyByCity[city].push({"id" : child.id, "name": child.name!=""?child.name:child.address});
			});
		}
	}
	
	function loadVehicules(idAgency, token)
	{
		if(user)
		{
			console.log(token);
			var req = {
			 method: 'POST',
			 url: 'api/agency/vehicle',
			 headers: {'Authorization': 'Bearer ' + token},
			 data: 
			 { 
				 id:user.idAgency,
			 }
			}
			$http(req).then(

				function(response){
					$scope.listeVehicules["\""+idAgency+"\""] = response.data;
					console.log(response.data);
			    },
			    function(response)
			    {
			    	
			    }
	    	);
		}
	};
	
	$scope.setIDParam=function(id)
	{
		console.log("setParam");
		$routeParams.idA = id;
	}
});


agency.controller("graphics",function($scope,$http,$cookies,$rootScope){
	

	
	
}); 

agency.controller("childRegistration",function($scope,$http,$cookies,$route, $routeParams,$location){

	$scope.isUpdate = false;
	if(!$route.routes[$location.path()]){
		$scope.isUpdate = true;
		$scope.idUpdatedAgency = $routeParams.idupdate;
		
		var token = $cookies.get("token");
		var config = {headers: {'Authorization': 'Bearer ' + token,}};
		
		$http.get('api/agency/view/'+$scope.idUpdatedAgency,config).then(
		   function(response){
			   $scope.agency = response.data.type
			   var adressWithoutCity = ($scope.agency.address.slice(0,$scope.agency.address.lastIndexOf($scope.agency.city))).trim();
			   var postal = adressWithoutCity.slice(-5);
			   var adresse = adressWithoutCity.slice(0, adressWithoutCity.length-6);
			   
		    },
		    function(response)
		    {
		    	
		    }
	    );
		
	}
	
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
	    //selectedBank: {id:'0',name:'CIC',value:'link',}
	};
	
	
    $scope.sendFormAgency = function(){
    	var user = $cookies.getObject("user");
    	if($scope.isUpdate)
    	{
    		$scope.agency.bankLink =$scope.agency.selectedBank.value;
    		$scope.agency.bankName = $scope.agency.selectedBank.name;
    		$scope.agency.selectedBank = undefined;
    		
    	}
    	else{
    		sendNew(user);
    	}
    	
    }
    
    function sendNew(user)
    {
    	if(user && user.isAgency)
    	{
    		var dataToSend = {
    				"id":null,
    				"type":$scope.agency.type,
    				"address":$scope.agency.addressp1+" "+$scope.agency.addressp2+" "+$scope.agency.city.toUpperCase(),
    				"idMotherAgency":user.idAgency,
    				"phoneNum":$scope.agency.phoneNum,
    				"city":$scope.agency.city.toUpperCase(),
    				"name":$scope.agency.name,
    				"bankLink":$scope.agency.selectedBank.value,
    				"bankName":$scope.agency.selectedBank.name,
    				"rib":$scope.agency.rib,
    				"status":null,
    				"transactionList":null,
    		};
    		var config = {headers: {'Authorization': 'Bearer ' + user.token,}};
    		
    		$http.post('api/agency/create/', dataToSend, config)
    		.then(function successCallback(response) {
    			$scope.agency={};
	        	$scope.registerForm.$setPristine();
	        	alert("L'agence est créée");
    		}, function errorCallback(data, status, headers) {
    		
    		});
    		
    	}
    }
    
    function sendUpdate(user){
    	
    }

});

agency.controller("childAgencyView",function($scope,$http,$cookies,$rootScope,$routeParams){

	$scope.currentIdAgency = $routeParams.idA
	console.log($rootScope.listChildAgencies);
	console.log($rootScope.agencyByCity);
	//$scope.idMenu = '#'+$rootScope.listChildAgencies[$scope.currentIdAgency].city+'-'+$rootScope.listChildAgencies[$scope.currentIdAgency].name;
	
	
});

agency.controller("agencySideMenu",function($scope,$http,$cookies,$rootScope){
	
});
