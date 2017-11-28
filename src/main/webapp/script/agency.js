var agency = angular.module("agency",['ngCookies']);

agency.controller("agencyMainPageCtrl",function($scope,$http,$cookies,$rootScope){
	
	$scope.listeAgencies;
	$scope.listeVehicules;
	loadChildAgencies();

	function loadChildAgencies()
	{
		var user = $cookies.getObject("user");
		var token = $cookies.get("token");
		console.log(token);
		if(user)
		{
			var req = {
			 method: 'POST',
			 url: 'api/agency/list',
			 headers: 
			 {
				 'Authorization': 'Bearer ' + token,
				 'Content-Type' : 'application/json'
				},
			 data: angular.toJson({ id:user.idAgency}),
			}
			$http(req).then(

				function(response){
					$rootScope.listChildAgenciesDetails = response.data;
					$rootScope.listChildAgenciesDetails.forEach(function(child,index) {
						
						if(!$rootScope.listChildAgencies){$rootScope.listChildAgencies={};}
						$rootScope.listChildAgencies[child.id] = index;
					});
					
					//createSubAgencyMenu($scope.listChildAgenciesDetails); 
					console.log(response.data);
					console.log($rootScope.listChildAgenciesDetails);
					console.log($rootScope.listChildAgencies);
			    },
			    function(response)
			    {
			    	$scope.ResponseDetails = "Data: " + response.data +
	                "<br />status: " + response.status +
	                "<br />headers: " + response.headers +
	                "<br />config: " + response.config;
			    }
	    	
	    	);
		}
			
	};

	
	function loadAgency()
	{
		var user = $cookies.getObject("user");
		var token = $cookies.get("token");
		if(user)
		{
			console.log(user.token);
			console.log(token);
			var req = {
			 method: 'POST',
			 url: 'api/agency/view',
			 headers: {'Authorization': 'Bearer ' + user.token},
			 data: 
			 { 
				 id:user.idAgency,
			 }
			}
			$http(req).then(

				function(response){
					
					$scope.motherAgency = response.data;
					console.log(response.data);
			    },
			    function(response)
			    {
			    	$scope.ResponseDetails = "Data: " + response.data +
	                "<br />status: " + response.status +
	                "<br />headers: " + response.headers +
	                "<br />config: " + response.config;
			    }
	    	
	    	);
		}
			
	};
	
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
			    	$scope.ResponseDetails = "Data: " + response.data +
	                "<br />status: " + response.status +
	                "<br />headers: " + response.headers +
	                "<br />config: " + response.config;
			    }
	    	
	    	);
		}
			
	};
	
	

	
}); 

agency.controller("agencyChilMenu",function($scope,$http,$cookies,$rootScope){
	
});

agency.controller("graphics",function($scope,$http,$cookies,$rootScope){
	

	
	
}); 