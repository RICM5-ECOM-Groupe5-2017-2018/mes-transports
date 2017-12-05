/**
 * 
 */
var module = angular.module('vehicle', ['ngRoute']);

module.controller('VehicleDetailsController', function($scope, $http, $routeParams) {
	
	$scope.vehicle = {};	
	
	$http.get(
		'api/vehicle/view/' + $routeParams.id
	).then(function successCallback(response){
		$scope.vehicle = response.data;
		console.log($scope.vehicle);
	}, function errorCallback(response) {
		console.log(response);
	});
	
	
});