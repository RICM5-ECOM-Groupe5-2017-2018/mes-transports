/**
 * 
 */
var search = angular.module('search', []);

search.controller('SearchController', ['$scope', '$http', function SearchController($scope, $http) {
	
	$scope.start = new Date();
	$scope.end = new Date($scope.start.getFullYear(), $scope.start.getMonth(), $scope.start.getDate()+7);
	
	
	$('input[name="daterange"]').daterangepicker({
		"startDate": $scope.start,
	    "endDate": $scope.end,
	    timePicker: true,
        timePickerIncrement: 30,
        "showWeekNumbers": true,
        locale: {
            format: 'DD/MM/YYYY h:mm'
        }
	}, function(start, end, label) {
	    //console.log("New date range selected: " + start.format('YYYY-MM-DD') + " to " + end.format('YYYY-MM-DD') + " (predefined range: " + label + ")");
		$http.get('api/vehicle/search/' + start.format('YYYY-MM-DD hh:mm') + '/' + end.format('YYYY-MM-DD hh:mm'))
		.then(function successCallback(response) {
			console.log(response);
			$scope.searchRes = response.data;
		}, function errorCallback(response) {
			console.log(response);
		});
	});
	
	$scope.searchRes = {};

}]);