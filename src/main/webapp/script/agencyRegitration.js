angular.module('app').controller("Resgistration",function($scope,$http){
	
	$scope.userAgency =false;

    $scope.sendFormAgency = function(){
    	if($scope.userAgency)
    	{
    		
    	}
    	else{
    		var data = "";
    		data+=$scope.agency.type+"/";
    		data+=$scope.agency.street+" "+$scope.agency.postal+" "+$scope.agency.city+"/";
    		data+=$scope.agency.phone;
    		sendRequest(data);
    		
    	}
    	console.log($scope.agency);
    }
    
    function sendRequestAgency(param){

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        
        $http.get('api/agency/create/'+param,config)
        .success(function (data, status, headers, config) {
        	$scope.agency={};
        	$scope.registerForm.$setPristine();
        	alert("L'agence est créée");
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<br />status: " + status +
                "<br />headers: " + header +
                "<br />config: " + config;
        });
    }
});