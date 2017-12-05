/**
 * 
 */
var search = angular.module('search', []);

search.controller('SearchController', ['$scope', '$http', function SearchController($scope, $http) {
	
	var today = new Date();
	
	$('input[name="daterange"]').daterangepicker({
		"startDate": today,
	    "endDate": new Date(today.getFullYear(), today.getMonth(), today.getDate()+7),
	    timePicker: true,
        timePickerIncrement: 30,
        locale: {
            format: 'DD/MM/YYYY h:mm'
        }
	}, function(start, end, label) {
	  console.log("New date range selected: " + start.format('YYYY-MM-DD') + " to " + end.format('YYYY-MM-DD') + " (predefined range: " + label + ")");
	});
	
	$scope.searchRes = {};
		
	$scope.search = function LaunchSearch() {
		$http.get('api/vehicle/search/' + Date.now() + '/' + Date.now() + 100)
		.then(function successCallback(response) {
			console.log(response);
			$scope.searchRes = response.data;
		}, function errorCallback(response) {
			console.log(response);
		});
	}

}]);