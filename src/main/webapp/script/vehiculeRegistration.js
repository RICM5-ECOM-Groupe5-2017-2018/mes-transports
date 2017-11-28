
var agencyVehiculesView = angular.module("agencyVehiculesView",['ngCookies']);


agencyVehiculesView.controller("addVehiculeForm",function($scope,$http,$cookies){

    $scope.sendFormVehicules = function(){
    	
    	var user = $cookies.getObject("user");
    	if(user)
    	{
    		var req = {
   			 method: 'POST',
   			 url: 'api/vehicle/create/',
   			 headers: {'Authorization': 'Bearer ' + user.token},
   			 data: 
   			 { 
   				 brand: $scope.vehicule.brand, 
   				 price: $scope.vehicule.price,
   				 insurance:$scope.vehicule.assurance,
   				 idAgency:user.id ,
   				 idType:$scope.vehicule.type,
   			 }
   			}
       		sendRequest(req);
    	}
    };
    
    function sendRequest(param){

    	$http(req).then(

			function(data, status, headers, config){
				$scope.vehicule={};
	        	$scope.registerForm.$setPristine();
	        	alert("Le véhicule est créé");
		    },
		    function(data, status, headers, config)
		    {
		    	$scope.ResponseDetails = "Data: " + data +
                "<br />status: " + status +
                "<br />headers: " + header +
                "<br />config: " + config;
		    }
    	
    	);
    };
    
agencyVehiculesView.controller("viewVehicule",function($scope,$http,$cookies){
	

	
	
}); 


agencyVehiculesView.controller("eraseVehiculeForm",function($scope,$http,$cookies){
	
	
}); 

    
});