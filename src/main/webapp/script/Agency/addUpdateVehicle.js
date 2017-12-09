agency.controller("addVehiculeCtrl",function($scope,$http,$cookies,$rootScope,$routeParams,$location,$route){

	//Les données nécéssaire aux formulaire
	$scope.data = {
	    availableInsurance: [
				{name:'MAIF',value:'link',},
				{name:'AXA',value:'link',},
				{name:'Direct assurance',value:'link',},
				{name:'Matmut',value:'link',},
			],

		selectedInsurance: {name:'MAIF',value:'link',},
		availableTypes : $rootScope.listTypes,
		availableAgency : listAgency(),
		slectedCharacteristic : [],
	};

	$scope.isUpdate = false;

	if(!$route.routes[$location.path()]){
		loadUpdateForm()
	}

	/**
	*Permet de charger la liste des noms et id des sous-agences et de l'agence mere
	*/
	function listAgency(){
		var listAgencyForVehicle = [];
		$.each($rootScope.listChildAgencies, function(key, child){
			listAgencyForVehicle.push({"id" : child.id, "name": child.name!=""?(child.name+" "+child.city.toUpperCase()):child.address,});
		});

		var mother = $rootScope.MotherAgency;
		listAgencyForVehicle.push({"id" :mother.id, "name": mother.name!=""?(mother.name+" "+mother.city.toUpperCase()):mother.address,});
		return listAgencyForVehicle;
	}

	/**
	*Fonction appelée quand le type de véhicule change dans le formulaire
	*/
	$scope.showCharacteristics=function(){
		parseCharacteristics();
	}


	$scope.sendFormVehicules=function(){

		if($scope.isUpdate)
		{
			$scope.vehicle.id = $scope.selectedVehicule.details.id;
		}
		else{
			$scope.vehicle.id = null;
		}
		$scope.vehicle.status = null;

		$scope.vehicle.insurance = $scope.data.selectedInsurance.name;
		$scope.vehicle.idAgency = $scope.data.selectedAgency.id;
		$scope.vehicle.type = $scope.data.selectedTypeVehicule.id;


		$scope.vehicle.characteristicList = [];

		 $.each( $scope.data.beforTreatementCharacteristicsForType , function(key , value){
			 var newChar = {
					 valueCharacteristic : $scope.data.slectedCharacteristic[value.label],
					 idCharacteristic : value
			 }
			 $scope.vehicle.characteristicList.push(newChar);
		 });

		 if($scope.isUpdate){sendUpdateVehicle();}
		 else{sendNewVehicle();}
	}

	/*Fonction qui prér-empli le formulaire lors d'un update*/
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
			$scope.data.slectedCharacteristic[characteristic.idCharacteristic.label] = characteristic.valueCharacteristic;
		});

		parseCharacteristics();

	}

	/*Load les charactéristics pour un type de véhicule*/
	function parseCharacteristics(){
        var config = {headers: {'Authorization': 'Bearer ' + $rootScope.token,}};
		$http.get('api/vehicle/list/'+$scope.data.selectedTypeVehicule.id,config).then(
		   function(response){

			   if($scope.selectedVehicule && $scope.selectedVehicule.details.type==$scope.data.selectedTypeVehicule.id){
				   $.each($scope.selectedVehicule.details.characteristicList, function(key , characteristic){
						$scope.data.slectedCharacteristic[characteristic.idCharacteristic.label] = characteristic.valueCharacteristic;
					});
			   }
			   else{$scope.data.slectedCharacteristic=[];}


			   $scope.data.beforTreatementCharacteristicsForType = $.extend(true, {}, response.data.sort(function (a, b) {return a.rank - b.rank;}));

			   $.each(response.data, function(key , characteristic){

				   //required or not
				   if(!characteristic.optional){
					   characteristic.labelSee=characteristic.label+"*";
				   }
				   else{
					   characteristic.labelSee=characteristic.label;
				   }

				   //type+patern
				   switch (characteristic.unit) {
				   		case "str":
				   			characteristic.type ="text";
				   			characteristic.typeWait ="Texte";
				   			characteristic.pattern ="";
				   			break;
				   		case "int":
				   			characteristic.type ="number";
				   			characteristic.pattern ="/^[0-9]+[0-9]*$/";
				   			characteristic.typeWait ="Nombre entier";
				   			break;
				   		case "float":
				   			characteristic.type ="number";
				   			characteristic.pattern ="/^[0-9]+(\.[0-9]{1,2})?$/";
				   			characteristic.typeWait ="Décimale";
				   			break;
				   		default:
				   			break;
				   }

				   //size
				   characteristic.max ="255";
			   });

			   $scope.data.characteristicsForType = response.data.sort(function (a, b) {return a.rank - b.rank;});;

		    },
		    function(response){}
	    );
	}

	function endUpdateAdd(text, url, id)
	{
		$scope.vehicle={};
		$scope.registerForm.$setPristine();
		$rootScope.loadUpdateOrCreateVehicle(id);
		alert(text);
		$location.path(url);
	}

	function sendNewVehicle()
	{
		if($rootScope.user && $rootScope.user.isAgency)
		{
			var promises = [];
			var config = {headers: {'Authorization': 'Bearer ' + $rootScope.user.token,}};

			$http.post('api/vehicle/create/', $scope.vehicle, config).then(function successCallback(response){

					var id = response.data.id
					$.each( $scope.vehicle.characteristicList, function(key , value){
							promises.push(new Promise(function(resolve, reject)
							{
								if($rootScope.user && $rootScope.user.isAgency)
								{
									var config = {headers: {'Authorization': 'Bearer ' + $rootScope.user.token,} };
									$http.post('api/vehicle/addCharac/'+id+'/'+value.idCharacteristic.id, {valueCharacteristic : value.valueCharacteristic}, config)
									.then(function successCallback(response) {resolve("success");},
											function errorCallback(data, status, headers) {reject("failed");});
								}
							}));
					});
					Promise.all(promises).then(values => {endUpdateAdd("Le vehicule a été créé", '/agency/view/vehicule', id);});
				}, function errorCallback(data, status, headers) {});
		}
	}


	function sendUpdateVehicle()
	{
		if($rootScope.user && $rootScope.user.isAgency)
		{
			var promises = [];
			var config = {headers: {'Authorization': 'Bearer ' + $rootScope.user.token,}};

			$http.put('api/vehicle/edit/', $scope.vehicle, config)
			.then(function successCallback(response) {
						var id = response.data.id;

						if($scope.selectedVehicule.details.type==$scope.data.selectedTypeVehicule.id){

							$.each( $scope.vehicle.characteristicList, function(key , value){
									promises.push(new Promise(function(resolve, reject){
										if($rootScope.user && $rootScope.user.isAgency){
											var config = {headers: {'Authorization': 'Bearer ' + $rootScope.user.token,}};
											$http.put('api/vehicle/editCharac/'+id+'/'+value.idCharacteristic.id, {valueCharacteristic : value.valueCharacteristic}, config)
											.then(function successCallback(response) {
												resolve('success');
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
											$http.post('api/vehicle/addCharac/'+id+'/'+value.idCharacteristic.id, {valueCharacteristic : value.valueCharacteristic}, config)
											.then(function successCallback(response) {
												resolve('success');
											}, function errorCallback(data, status, headers) {
												reject('failed');
											});
										}
									}));
							});

						}


						Promise.all(promises).then(values => {
						  endUpdateAdd("Le vehicule a été modifié", '/agency/view/vehicule/'+id, id);
						});

			}, function errorCallback(data, status, headers) {

			});
		}
	}
});
