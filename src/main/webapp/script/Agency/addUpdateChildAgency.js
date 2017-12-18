//Controller use for adding or update an agency
agency.controller("childRegistration",function($scope,$http,$cookies,$route, $routeParams,$location,$rootScope){

	//Data binding with the form
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

			availableTypes: {id:'location',name:'Agence de Location'},
		};

	//Variable to know if it's an update or a adding
	$scope.isUpdate = false;

	//If it's an update complete the form with the value of the updated child agency
	if(!$route.routes[$location.path()]){
        completeFormWhenUpdating();
	}

	/**Function call when the form is submit*/
    $scope.sendFormAgency = function(){

    	if($scope.isUpdate)
    	{
    		$scope.agency.bankLink =$scope.data.selectedBank.value;
    		$scope.agency.bankName = $scope.data.selectedBank.name;
			var city = $scope.agency.city.toUpperCase();
            city = city.replace(/ /g, '-');
			console.log(city);
    		$scope.agency.address = $scope.data.addressp1+" "+$scope.data.addressp2+" "+city;
    		$scope.agency.city = city;
    		$scope.agency.type = $scope.data.availableTypes.id;

    		sendUpdate();
    	}
    	else{
    		sendNew();
    	}

    }

    /**Function call for completing the form when the agency is updated*/
    function completeFormWhenUpdating(){
        $scope.isUpdate = true;
        $scope.idUpdatedAgency = $routeParams.idupdate;

        var config = {headers: {'Authorization': 'Bearer ' + $rootScope.token,}};
        $http.get('api/agency/view/'+$scope.idUpdatedAgency,config).then(
            function(response){

                $scope.agency = response.data;

                //Fill address input
                var adressWithoutCity = ($scope.agency.address.slice(0,$scope.agency.address.lastIndexOf($scope.agency.city))).trim();
                $scope.data.addressp1 = adressWithoutCity.slice(0, adressWithoutCity.length-6)
                $scope.data.addressp2 =  adressWithoutCity.slice(-5);

                //Fill bank input
                $scope.data.selectedBank = $scope.data.availableBanks.find(function(element) {
                    return element.name == $scope.agency.bankName;
                });
			},
            function(response){}
        );
	}

	/**Function that send a new agency request*/
    function sendNew()
    {
    	if($rootScope.user && $rootScope.user.isAgency)
    	{
            var city = $scope.agency.city.toUpperCase();
            city = city.replace(/ /g, '-');
            console.log(city);
    		var dataToSend = {
    				"id":null,
    				"type":$scope.data.availableTypes.id,
    				"address":$scope.data.addressp1+" "+$scope.data.addressp2+" "+city,
    				"idMotherAgency":$rootScope.user.idAgency,
    				"phoneNum":$scope.agency.phoneNum,
    				"city":city,
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
	        	$scope.reponse = response.data;
                $('#modalEndAdd').modal('show');

    		}, function errorCallback(data, status, headers) {});

    	}
    }

    /**Function that send a update agency request*/
    function sendUpdate()
	{
    	if($rootScope.user && $rootScope.user.isAgency)
    	{
    		var config = {headers: {'Authorization': 'Bearer ' + $rootScope.user.token,}};
    		$http.put('api/agency/edit/', $scope.agency, config)
    		.then(function successCallback(response) {
    			$scope.agency={};
	        	$scope.registerForm.$setPristine();
                $rootScope.loadOneChildAgency($scope.idUpdatedAgency);
                $scope.reponse = response.data;
                $('#modalEndUpdate').modal('show');

    		}, function errorCallback(data, status, headers) {});
    	}
    }

    /**Function which redirect the user on the new agency page*/
    $scope.changeLocationWhenEnding=function(){
    	if($scope.reponse.id==$rootScope.user.idAgency){
            $location.path('/agency');
		}
		else{
            $location.path('/agency/view/chagency/'+$scope.reponse.id);
		}
	}

	/**Function which redirect the user on the previous page*/
	$scope.goback=function () {
		$location.path('/agency/view/chagency/'+$scope.idUpdatedAgency);
    }

});
