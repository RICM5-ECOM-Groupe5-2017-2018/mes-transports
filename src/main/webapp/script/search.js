/**
 * 
 */
var search = angular.module('search', []);

search.controller('SearchController', ['$scope', '$http', function SearchController($scope, $http) {

	$scope.form.search = {};
	$scope.form.search.keyword = "";
	$scope.form.search.vehicleType = "";
	$scope.form.search.start = new Date();
	$scope.form.search.end = new Date($scope.form.search.start.getFullYear(),
										$scope.form.search.start.getMonth(),
										$scope.form.search.start.getDate()+7);
	
	$scope.vehicleTypes = [];
	$scope.vehicleCharas = [];
	
	/* REST API call getting all the types of vehicles */
	$http.get('api/vehicle/type')
	.then(function successCallback(response) {
		$scope.vehicleTypes = response.data;
	}, function errorCallback(response) {
		// TODO
	});
	
	/* REST API call getting the list of all the vehicle characteristics */
	$http.get('api/vehicle/list') 
	.then(function successCallback(response) {
		$scope.vehicleCharas = response.data.sort(function(a, b){ return a.rank <= b.rank; });
	}, function errorCallback(response) {
		// TODO
	});
	
	/* Definition of the date-range picker */
	$('input[name="daterange"]').daterangepicker({
		"startDate": $scope.form.search.start,
	    "endDate": $scope.form.search.end,
	    timePicker: true,
        timePickerIncrement: 30,
        "showWeekNumbers": true,
        locale: {
            format: 'DD/MM/YYYY h:mm'
        }
	}, function(start, end, label) {
	    $scope.form.search.start = start;
		$scope.form.search.end = end;
		$scope.updateSearch();
	});

	/**
	 * Function that updates the vehicle list according to the current chosen dates
	 */
	$scope.updateSearch = function() {
		
		$http.get('api/vehicle/search/' 
				+ moment($scope.form.search.start).format('YYYY-MM-DD hh:mm') + '/' 
				+ moment($scope.form.search.end).format('YYYY-MM-DD hh:mm'))
		.then(function successCallback(response) {
			$scope.searchRes = response.data;
		}, function errorCallback(response) {
			console.log(response);
		});
		
	};
	
	/**
	 * Function that updates the characteristics list according to the type of vehicle
	 */
	$scope.updateType = function() {
		
		$http.get('api/vehicle/list/' + $scope.form.search.vehicleType) 
		.then(function successCallback(response) {
			$scope.vehicleCharas = response.data.sort(function(a, b){ return a.rank <= b.rank; });
		}, function errorCallback(response) {
			// TODO
		});
		
		$scope.updateSearch();
		
	}
	
	$scope.updateSearch(); // Call to display the vehicles when the page is loaded

}]);