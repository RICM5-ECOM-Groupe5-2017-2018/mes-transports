var historique = angular.module('history', []);

historique.controller('HistoryController', function($scope, $http, $location) {
	
	$scope.history = {};
	var qr_code = new QRCode("qrcode");
	
	$http.get('api/user/transactions/' + $scope.user.id)
	.then(function successController(response) {
		$scope.history = response.data;
	}, function errorController(response) {
	});
	
	$scope.displayQrCode = function(txt) {
		qr_code.makeCode($location.$$absUrl + txt);
	}
	
});