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
	});
	
	var now = new Date();
	if($scope.form.search == undefined) {		
		$scope.form.search = {};
		$scope.form.search.keyword = "";
		$scope.form.search.vehicleType = "";
		
		$scope.form.search.start = now;
		$scope.form.search.end = new Date($scope.form.search.start.getFullYear(),
											$scope.form.search.start.getMonth(),
											$scope.form.search.start.getDate()+7);
	}

	/* Definition of the date-range picker */
	$('input[name="daterange"]').daterangepicker({
		endDate: $scope.form.search.end,
		startDate: $scope.form.search.start,
		timePicker: true,
		timePicker24Hour: true,
		timePickerIncrement: 30,
		showWeekNumbers: true,
		locale: {
			format: 'DD/MM/YYYY'
		},
        minDate: moment(now).format('DD/MM/YYYY')
	}, function(start, end, label) {
	    $scope.form.search.start = start;
		$scope.form.search.end = end;
	});
	
	$scope.addToCart = CartServices.addToCart;
	
});