/**
 * 
 */
var module = angular.module('vehicle', ['ngRoute']);

module.controller('VehicleDetailsController', function($scope, $http, $routeParams) {
	
	$scope.vehicle = {};	
	
	$http.get(
		'api/vehicle/view?id=' + $routeParams.id
	).then(function successCallback(response){
		$scope.vehicle = response.data;
	}, function errorCallback(response) {
		console.log(reponse);
	});
	
	
});