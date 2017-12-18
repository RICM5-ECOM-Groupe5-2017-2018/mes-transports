/**
 * 
 */
var search = angular.module('search', []);

search.controller('SearchController', ['$scope', '$http', function SearchController($scope, $http) {

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
	
	$scope.vehicleTypes = [];
	$scope.vehicleCharas = [];
	
	$scope.getVehicleType = function(id) {
		return $scope.vehicleTypes.find(function(type) {
			return type.id == id;
		})
	}
	
	$scope.form.search.price_min = 0;
	$scope.form.search.price_max = 700;
	$(".slide_chara").slider();
	
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
		$scope.vehicleCharas = response.data.sort(function(a, b){ return a.rank >= b.rank; });
	}, function errorCallback(response) {
		// TODO
	});
	
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
		$scope.updateSearch();
	});
	
	$scope.updateFilter = function() {
		$scope.searchFiltered = [];
		$scope.searchRes.forEach( function(vehicle) {
			
			if(
					($scope.form.search.vehicleType == "" || vehicle.type == $scope.form.search.vehicleType)
					&& ($scope.form.search.keyword == "" || vehicle.brand.toLowerCase().indexOf($scope.form.search.keyword.toLowerCase()) !== -1)
					&& ($scope.form.search.price_min <= vehicle.price && $scope.form.search.price_max >= vehicle.price)
			) {
				$scope.searchFiltered.push(vehicle);
			}
			
		});
	}

	/**
	 * Function that updates the vehicle list according to the current chosen dates
	 */
	$scope.updateSearch = function() {
		
		$http.get('api/vehicle/search/' 
				+ moment($scope.form.search.start).format('YYYY-MM-DD HH:mm') + '/' 
				+ moment($scope.form.search.end).format('YYYY-MM-DD HH:mm'))
		.then(function successCallback(response) {
			$scope.searchRes = response.data;
			$scope.updateFilter();
			
		}, function errorCallback(response) {
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
		
		$scope.updateFilter();
		
	}
	
	var slider_price = new Slider("#search_price");
	slider_price.on("slide", function(slideEvt) {
		$scope.form.search.price_min = slider_price.getValue()[0];
		$scope.form.search.price_max = slider_price.getValue()[1];
		$scope.updateFilter();
	});
	
	$scope.updateSearch(); // Call to display the vehicles when the page is loaded

}]);