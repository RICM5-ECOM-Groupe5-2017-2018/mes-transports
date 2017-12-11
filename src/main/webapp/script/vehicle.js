/**
 * 
 */
var module = angular.module('vehicle', ['ngRoute']);

module.controller('VehicleDetailsController', function($scope, $http, $routeParams, CartServices) {
	
	$scope.vehicle = {};	
	
	$http.get(
		'api/vehicle/view/' + $routeParams.id
	).then(function successCallback(response){
		$scope.vehicle = response.data;
	}, function errorCallback(response) {
		console.log(response);
	});
	
	$scope.addToCart = CartServices.addToCart;
	
	
});