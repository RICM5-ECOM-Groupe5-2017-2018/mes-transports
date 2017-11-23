/**
 * 
 */

var account = angular.module('account', ['ngCookies']);

account.controller('AccountController', ['$scope', '$http', '$cookies', function AccountController($scope, $http, $cookies) {
	
	$scope.user = $cookies.getObject("user");
	
	if($scope.user) {
		if(Date.now() > $scope.user.tokenExpiration) {
			/* Disconnect the user when the token has expired */
			$cookies.remove("user");
			$cookies.remove("token");
			$scope.user = undefined;
		}
	}
	
	$scope.connect = function UserConnect() {
		
		if($cookies.getObject("user")) {
			return "Already connected";
		}
		
		$http.get(
			'api/user/authenticate/' + $scope.form.connect.login + '/' + $scope.form.connect.password
		).then(function successCallback(response) {
			console.log(response.data);
			$cookies.putObject("user", response.data);
			$cookies.put("token", response.data.token);
			$scope.user = $cookies.getObject("user");
		}, function errorCallback(response) {
			console.log(response);
			//TODO message d'erreur
		});
	}
	
	$scope.logout = function UserLogout() {
		
		if(!$cookies.get("token")) {
			return "Not connected";
		}
		
		$http.get(
			'api/user/logout',
			{
				headers: {'Authorization': 'Bearer ' + $cookies.get("token")}
			}
		).then(function sucessCallback(response) {
			//TODO check
		}, function errorCallback(response) {
			//TODO have a callback, but delete anthentication cookies anyway
		});
		
		$cookies.remove("user");
		$cookies.remove("token");
		$scope.user = undefined;
	}
	
	$scope.signin = function UserSignin() {
		
		if($cookies.getObject("user")) {
			return "Already connected";
		}
		
	}
	
}]);