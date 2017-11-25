angular.module('MainModel').controller("vehiculeRegisterForm",function($scope,$http){
	
	$scope.userAgency =false;

    $scope.sendFormVehicules = function(){
    	if($scope.userAgency)
    	{
    		
    	}
    	else{
    		var data = "";
    		data+=$scope.vehicule.brand+"/";
    		data+=$scope.vehicule.price+"/";
    		data+=$scope.vehicule.assurance+"/";
    		data+="1/";
    		data+=$scope.vehicule.type;
    		sendRequest(data);
    		
    	}
    	console.log($scope.vehicule);
    };
    
    function sendRequest(param){

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        
        $http.get('api/vehicle/create/'+param,config)
        .success(function (data, status, headers, config) {
        	$scope.agency={};
        	$scope.vehiculeRegisterForm.$setPristine();
        	alert("Le véhicule est créé");
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<br />status: " + status +
                "<br />headers: " + header +
                "<br />config: " + config;
        });
    };
	//email : /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
});