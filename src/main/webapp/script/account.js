/**
 * 
 */

var account = angular.module('account', []);

account.controller('AccountController', function AccountController($scope, $http) {
	
	$scope.connect = function UserConnect() {
		$http.get(
			'api/user/authenticate/' + $scope.form.connect.login + '/' + $scope.form.connect.password
		).then(function successCallback(response) {
			console.log('Token: '+ response.data);
			//TODO prendre en compte la maj de l'api
		}, function errorCallback(response) {
			console.log(response);
			//TODO message d'erreur
		});
	}
	
});