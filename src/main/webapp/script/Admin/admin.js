
var admin = angular.module("admin",[])
admin.controller('AdminController', function($scope,$http,$cookies){
	
	$scope.agencies = {};
	$http.get('api/agency/getAllAgencies')
	.then(function successCallback(response){
		$scope.agencies = response.data;
	}, function errorCallback(response){
	});

    $scope.sendAdminUser = function(){
    	
    	var user = $cookies.getObject("user");
    	if(user)
    	{
    		var req = {
   			 method: 'PUT',
   			 url: 'api/user/edit/',
   			 headers: {'Authorization': 'Bearer ' + user.token},
   			 data: 
   			 { 
   				 id: $scope.user.id, 
   				 user_name: $scope.user.nom,
   				 user_first_name: $scope.user.prenom,
   				 role:$scope.user.role,
   				 mail_address:$scope.user.mail,
   				 phone_num: $scope.user.phone,
   				 idAgency: $scope.user.idAgency,
   				 status: $scope.user.status
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
    
});