agency.controller("childAgencyView",function($scope,$http,$cookies,$rootScope,$routeParams,$location){

	$scope.currentIdAgency = $routeParams.idA

	$scope.changeLocationToUpdatePage=function(){
		$location.path('/agency/update/'+$scope.currentIdAgency);
	};

	//$scope.idMenu = '#'+$rootScope.listChildAgencies[$scope.currentIdAgency].city+'-'+$rootScope.listChildAgencies[$scope.currentIdAgency].name;


});
