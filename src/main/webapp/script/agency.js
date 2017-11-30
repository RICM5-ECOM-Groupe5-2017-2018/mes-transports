var agency = angular.module("agency",['ngCookies']);

agency.controller("agencyMainPageCtrl",function($scope,$http,$cookies,$rootScope){
	
	$rootScope.listChildAgencies;
	$rootScope.MotherAgency;
	$rootScope.agencyByCity={};
	$scope.isMother = false;
	
	$scope.loadMainAgency = loadMainAgency();
	
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
					console.log($rootScope.MotherAgency);	
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
					
					console.log($rootScope.listChildAgencies);
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
	
	function reloadSubAgencyMenu(list)
	{
		if($rootScope.MotherAgency.idAgency==undefined)
		{
			$scope.isMother = true;
			$.each($rootScope.listChildAgencies, function(key, child){
				var city = child.city.toUpperCase();
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
	
	
	
}); 



agency.controller("graphics",function($scope,$http,$cookies,$rootScope){
	

	
	
}); 

agency.controller("childRegistration",function($scope,$http,$cookies){

	$scope.banks = [
			{"name":"CIC","link":"link",},
			{"name":"LCL","link":"link",},
			{"name":"La caisse d\'épargne","link":"link",},
			{"name":"Crédit mutuel","link":"link",},
			{"name":"La banque populaire","link":"link",},
			{"name":"Crédit agricole","link":"link",},
			{"name":"BNP","link":"link",},
			{"name":"Société générale","link":"link",},
			{"name":"La banque postale","link":"link",},
	];
	
	
    $scope.sendFormAgency = function(){
    	var user = $cookies.getObject("user");
    	if(user && user.isAgency)
    	{
    		var data = {
    				"id":null,
    				"type":agency.type,
    				"address":agency.addressp1+" "+agency.addressp2+" "+agency.city,
    				"idMotherAgency":user.idAgency,
    				"phoneNum":agency.phone,
    				"city":agency.city.toUpperCase(),
    				"name":agency.name,
    				"bankLink":$scope.banks[agency.bank],
    				"bankName":agency.bank,
    				"rib":agency.rib,
    				"status":null,
    				"transactionList":null,
    		};
    		var config = {headers: {'Authorization': 'Bearer ' + user.token,}};
    		
    		$http.post('api/agency/create/', data, config)
    		.then(function successCallback(response) {
    			$scope.agency={};
	        	$scope.registerForm.$setPristine();
	        	alert("L'agence est créée");
    		}, function errorCallback(data, status, headers) {
    		
    		});
    		
    	}
    }

});

agency.controller("childAgencyView",function($scope,$http,$cookies,$rootScope,$routeParams){
	
	$scope.currentIdAgency = $routeParams.id
	
	
});
