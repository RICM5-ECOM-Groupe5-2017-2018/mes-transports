angular.module('MainModel').controller("Resgistration",function($scope,$http){
	
	$scope.userAgency =false;

    $scope.sendForm = function(){
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
    
    function sendRequest(param){

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        
        $http.get('api/agency/create/'+param,config)
        .success(function (data, status, headers, config) {
        	$scope.currentRecord={};
        	$scope.agency.$setPristine();
        	alert("L'agence est créée");
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<br />status: " + status +
                "<br />headers: " + header +
                "<br />config: " + config;
        });
    }
	//email : /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
});