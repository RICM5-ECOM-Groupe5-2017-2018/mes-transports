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

			availableTypes: [
				{id:'AgenceN',name:'Agence de Location'},
			],
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

    		$scope.agency.address = $scope.data.addressp1+" "+$scope.data.addressp2+" "+$scope.agency.city.toUpperCase();
    		$scope.agency.city = $scope.agency.city.toUpperCase()
    		$scope.agency.type = $scope.data.selectedType.id;

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

                $scope.agency = response.data

                //Fill address input
                var adressWithoutCity = ($scope.agency.address.slice(0,$scope.agency.address.lastIndexOf($scope.agency.city))).trim();
                $scope.data.addressp1 = adressWithoutCity.slice(0, adressWithoutCity.length-6)
                $scope.data.addressp2 =  adressWithoutCity.slice(-5);

                //Fill bank input
                $scope.data.selectedBank = $scope.data.availableBanks.find(function(element) {
                    return element.name == $scope.agency.bankName;
                });

                //Fill type input
                $scope.data.selectedType = $scope.data.availableTypes.find(function(element) {
                    return element.id == $scope.agency.type;
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
    		var dataToSend = {
    				"id":null,
    				"type":$scope.data.selectedType.id,
    				"address":$scope.data.addressp1+" "+$scope.data.addressp2+" "+$scope.agency.city.toUpperCase(),
    				"idMotherAgency":$rootScope.user.idAgency,
    				"phoneNum":$scope.agency.phoneNum,
    				"city":$scope.agency.city.toUpperCase(),
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
	        	alert("L'agence est créée");
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

	        	alert("L'agence est modifier");

	        	if($scope.idUpdatedAgency==$rootScope.user.idAgency)
	        	{
	        		$location.path('/agency');
	        		$rootScope.loadOneChildAgency($scope.idUpdatedAgency);
	        	}
	        	else
	        	{
	        		$rootScope.loadOneChildAgency($scope.idUpdatedAgency);
	        		$location.path('/agency/view/chagency/'+$scope.idUpdatedAgency);
	        	}

    		}, function errorCallback(data, status, headers) {});
    	}
    }

});
