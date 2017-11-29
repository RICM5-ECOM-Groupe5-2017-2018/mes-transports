var agency = angular.module("agency",['ngCookies']);

agency.controller("agencyMainPageCtrl",function($scope,$http,$cookies,$rootScope){
	
	$rootScope.listChildAgencies;
	$rootScope.MotherAgency;
	
	loadAgency();

	function loadChildAgencies()
	{
		var user = $cookies.getObject("user");
		var token = $cookies.get("token");
		console.log(token);
		if(user)
		{
			var config = {headers: {'Authorization': 'Bearer ' + token,}};
			
			$http.get('api/agency/list/'+user.idAgency,config).then(
			   function(response){
				   
					response.data.forEach(function(child,index) {	
						if(!$rootScope.listChildAgencies){$rootScope.listChildAgencies={};}
						$rootScope.listChildAgencies[child.id] = child;
					});
					
					$rootScope.reloadSubAgencyMenu($scope.listChildAgencies, $rootScope.MotherAgency.id_mother_agency); 
					
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
		console.log(token);
		if(user)
		{
			var config = {headers: {'Authorization': 'Bearer ' + token,}};
			
			$http.get('api/agency/view/'+user.idAgency,config).then(
			   function(response){
					$rootScope.MotherAgency = response.data;
					
					//loadChild
					loadChildAgencies()
					
					console.log($rootScope.MotherAgency);
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

agency.controller("agencyChildMenu",function($scope,$http,$cookies,$rootScope){
	
	$scope.agencyByCity = {};
	
	$scope.isMother = false;
	
	$rootScope.reloadSubAgencyMenu=function(list, idMother)
	{
		if(idMother!=null)
		{
			$scope.isMother = true;
			list.forEach(function(child,index) {
				var city = child.city.toUpperCase();
				if(!$scope.agencyByCity[city]){$scope.agencyByCity[city]=[];}
				$scope.agencyByCity[city].push([child.id, child.name!=""?child.name:child.address]);
			});
		}
	}
	
});

agency.controller("graphics",function($scope,$http,$cookies,$rootScope){
	

	
	
}); 
