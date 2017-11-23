/**
 * 
 */

var account = angular.module('account', ['ngCookies']);

account.controller('AccountController', function AccountController($scope, $http, $cookies) {
	
	if($cookies.user) {
		$scope.user = JSON.parse($cookies.user);
		if(Date.now() > $scope.user.tokenExpiration) {
			/* Disconnect the user when the token has expired */
			$cookies.user = undefined;
			$cookies.token = undefined;
			$scope.user = undefined;
		}
	}
	
	$scope.connect = function UserConnect() {
		
		if($cookies.user != undefined) {
			return "Already connected";
		}
		
		$http.get(
			'api/user/authenticate/' + $scope.form.connect.login + '/' + $scope.form.connect.password
		).then(function successCallback(response) {
			console.log(response.data);
			$cookies.user = JSON.stringify(response.data);
			$cookies.token = response.data.token;
			$scope.user = $cookies.user;
		}, function errorCallback(response) {
			console.log(response);
			//TODO message d'erreur
		});
	}
	
	$scope.logout = function UserLogout() {
		
		if($cookies.token == undefined) {
			return "Not connected";
		}
		
		$http.get(
			'api/user/logout',
			{
				headers: {'Authorization': 'Bearer ' + $cookies.token}
			}
		).then(function sucessCallback(response) {
			$cookies.user = undefined;
			$cookies.token = undefined;
			$scope.user = undefined;
		}, function errorCallback(response) {
			//TODO message d'erreur
		});
	}
	
	$scope.signin = function UserSignin() {
		
		if($cookies.user != undefined) {
			return "Already connected";
		}
		
	}
	
});