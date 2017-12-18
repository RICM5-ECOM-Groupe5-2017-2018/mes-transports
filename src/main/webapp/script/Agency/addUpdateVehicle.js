agency.controller("addVehiculeCtrl",function($scope,$http,$cookies,$rootScope,$routeParams,$location,$route){

	//Data bing with the form
	$scope.data = {
	    availableInsurance: [
				{name:'MAIF',value:'link',},
				{name:'AXA',value:'link',},
				{name:'Direct assurance',value:'link',},
				{name:'Matmut',value:'link',},
			],

		selectedInsurance: {name:'MAIF',value:'link',},
		availableTypes : $rootScope.listTypes,
        availableAgency : $rootScope.availableAgency,
		slectedCharacteristic : [],
	};

	//Varaible use to know if it's an update or an add
	$scope.isUpdate = false;

	//If it's an update complete the form with the existing values
	if(!$route.routes[$location.path()]){
		loadUpdateForm()
	}


	/** Function call when vehicle type change in the form
	*/
	$scope.showCharacteristics=function(){
		parseCharacteristics();
	};


	/**Function call when the form is submit*/
	$scope.sendFormVehicules=function(){
		if($scope.isUpdate)
		{
			$scope.vehicle.id = $scope.selectedVehicule.details.id;
		}
		else{
			$scope.vehicle.id = null;
		}
		$scope.vehicle.status = 1;

		$scope.vehicle.insurance = $scope.data.selectedInsurance.name;
		$scope.vehicle.idAgency = $scope.data.selectedAgency.id;
		$scope.vehicle.type = $scope.data.selectedTypeVehicule.id;

		$scope.vehicle.characteristicList = [];

		 $.each( $scope.data.beforTreatementCharacteristicsForType , function(key , value){
			 var newChar = {
					 valueCharacteristic : $scope.data.slectedCharacteristic[value.id],
					 idCharacteristic : value
			 };
			 $scope.vehicle.characteristicList.push(newChar);
		 });

		 if($scope.isUpdate){sendUpdateVehicle();}
		 else{sendNewVehicle();}
	};

	/**Fonction which completing the form with existing values when it's an update*/
	function loadUpdateForm(){
		$scope.isUpdate = true;
		$scope.currentIdVehicules = $routeParams.idVupdate;

		$scope.selectedVehicule = $rootScope.listeVehicules.find(function(element) {
			   return element.id == $scope.currentIdVehicules;
		});

		$scope.vehicle={};
		$scope.vehicle.brand = $scope.selectedVehicule.details.brand;
		$scope.vehicle.price = $scope.selectedVehicule.details.price;
		$scope.data.selectedAgency =  $scope.data.availableAgency.find(function(element) {
			   return element.id == $scope.selectedVehicule.details.idAgency;
		});

		$scope.data.selectedInsurance = $scope.data.availableInsurance.find(function(element) {
			   return element.name == $scope.selectedVehicule.details.insurance;
		});

		$scope.data.selectedTypeVehicule = $scope.data.availableTypes[$scope.selectedVehicule.details.type];

		$.each($scope.selectedVehicule.details.characteristicList, function(key , characteristic){

			$scope.data.slectedCharacteristic[characteristic.idCharacteristic.id] = characteristic.valueCharacteristic;
		});

		parseCharacteristics();

	}

	/**Load characteristics for a vehicle type*/
	function parseCharacteristics(){
        var config = {headers: {'Authorization': 'Bearer ' + $rootScope.token,}};
		$http.get('api/vehicle/list/'+$scope.data.selectedTypeVehicule.id,config).then(
		   function(response){
		   	   //load value data
			   if($scope.selectedVehicule && $scope.selectedVehicule.details.type==$scope.data.selectedTypeVehicule.id){
				   $.each($scope.selectedVehicule.details.characteristicList, function(key , characteristic){
						$scope.data.slectedCharacteristic[characteristic.idCharacteristic.id] = characteristic.valueCharacteristic;
				   });
			   }
			   else{$scope.data.slectedCharacteristic=[];}

			   //copy
			   $scope.data.beforTreatementCharacteristicsForType = $.extend(true, {}, response.data.sort(function (a, b) {return a.rank - b.rank;}));

			   //Form pattern
			   $.each(response.data, function(key , characteristic){

				   //required or not
				   if(!characteristic.optional){
					   characteristic.labelSee=characteristic.label+"*";
				   }
				   else{
					   characteristic.labelSee=characteristic.label;
				   }

				   //supprimer les espaces dans la chaine
                   characteristic.labelConcac='Characteristic'+characteristic.id;

				   //type+pattern
				   switch (characteristic.typeData) {
				   		case "str":
				   			characteristic.typeWait ="Texte";
				   			characteristic.pattern ="";
				   			break;
				   		case "int":
				   			characteristic.pattern =/^[0-9]+[0-9]*$/;
				   			characteristic.typeWait ="Nombre entier";
				   			break;
				   		case "float":
				   			characteristic.pattern = /^[0-9]+((\.|\,)[0-9]{1,2})?$/;
				   			characteristic.typeWait ="Nombre entier ou décimale";
				   			break;
				   		default:
				   			break;
				   }

				   //size
				   characteristic.max ="255";
			   });

			   $scope.data.characteristicsForType = response.data.sort(function (a, b) {return a.rank - b.rank;});
		    },
		    function(response){}
	    );
	}


	/**Clear the form after the submit*/
	function endUpdateAdd(id)
	{
        $rootScope.loadUpdateOrCreateVehicle(id);

		$scope.vehicle={};
		$scope.registerForm.$setPristine();
        $scope.data.selectedInsurance={};
        $scope.data.characteristicList=[];
        $scope.data.characteristicsForType=[];
        $scope.data.selectedTypeVehicule={};
        $scope.data.selectedAgency={}
	}

    /**Function which redirect the user on the new vehicle page*/
    $scope.changeLocationWhenEnding=function(){
        $location.path('/agency/view/vehicule/'+$scope.currentIdVehicules);
    };

    /**Function which redirect the user on the previous page*/
    $scope.goback=function () {
        $location.path('/agency/view/vehicule/'+$scope.currentIdVehicules);
    };

    /**Function that create a vehicle*/
	function sendNewVehicle()
	{
		if($rootScope.user && $rootScope.user.isAgency)
		{
			var promises = [];
			var config = {headers: {'Authorization': 'Bearer ' + $rootScope.user.token,}};

			$http.post('api/vehicle/create/', $scope.vehicle, config).then(function successCallback(response){

                	$scope.currentIdVehicules = response.data.id;
					$.each( $scope.vehicle.characteristicList, function(key , value){
							promises.push(new Promise(function(resolve, reject)
							{
								if($rootScope.user && $rootScope.user.isAgency)
								{
									var config = {headers: {'Authorization': 'Bearer ' + $rootScope.user.token,} };
									$http.post('api/vehicle/addCharac/'+$scope.currentIdVehicules+'/'+value.idCharacteristic.id, {valueCharacteristic : value.valueCharacteristic}, config)
									.then(function successCallback(response) {resolve("success");},
											function errorCallback(data, status, headers) {reject("failed");});
								}
							}));
					});
					Promise.all(promises).then(function(values)
					{
						endUpdateAdd($scope.currentIdVehicules);
                        $('#modalEndAdd').modal('show');
					});
				}, function errorCallback(data, status, headers) {});
		}
	}

	/**Function that update vehicle. If the vehicle change type all the old characteristics are erased*/
	function sendUpdateVehicle()
	{
		if($rootScope.user && $rootScope.user.isAgency)
		{
			var promises = [];
			var config = {headers: {'Authorization': 'Bearer ' + $rootScope.user.token,}};

			$http.put('api/vehicle/edit/', $scope.vehicle, config)
			.then(function successCallback(response) {
                		$scope.currentIdVehicules = response.data.id;

						if($scope.selectedVehicule.details.type==$scope.data.selectedTypeVehicule.id){

							$.each( $scope.vehicle.characteristicList, function(key , value){
									promises.push(new Promise(function(resolve, reject){
										if($rootScope.user && $rootScope.user.isAgency){
											var config = {headers: {'Authorization': 'Bearer ' + $rootScope.user.token,}};
											$http.put('api/vehicle/editCharac/'+$scope.currentIdVehicules+'/'+value.idCharacteristic.id, {valueCharacteristic : value.valueCharacteristic}, config)
											.then(function successCallback(response) {
												resolve("success");
											}, function errorCallback(data, status, headers) {
												reject('failed');
											});
										}
									}));
							});

						}
						else{

							$.each( $scope.vehicle.characteristicList, function(key , value){
									promises.push(new Promise(function(resolve, reject){
										if($rootScope.user && $rootScope.user.isAgency){
											var config = {headers: {'Authorization': 'Bearer ' + $rootScope.user.token,}};
											$http.post('api/vehicle/addCharac/'+$scope.currentIdVehicules+'/'+value.idCharacteristic.id, {valueCharacteristic : value.valueCharacteristic}, config)
											.then(function successCallback(response) {
												resolve("success");
											}, function errorCallback(data, status, headers) {
												reject('failed');
											});
										}
									}));
							});

						}

						Promise.all(promises).then(function(values)
						{
							endUpdateAdd($scope.currentIdVehicules);
                            $('#modalEndUpdate').modal('show');
						});

			}, function errorCallback(data, status, headers) {});
		}
	}
});
