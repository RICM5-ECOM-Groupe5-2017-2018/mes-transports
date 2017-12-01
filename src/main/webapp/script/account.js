/**
 * 
 */

var account = angular.module('account', ['ngCookies','menu']);

account.controller('AccountController', 
	['$scope', '$http', '$cookies','$location', 
	function AccountController($scope, $http, $cookies,$location) {

	$scope.user = $cookies.getObject("user");
	$scope.form.update = $scope.user;
	
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
			response.data.isAgency = response.data.role=="gestionaire";
			$cookies.putObject("user", response.data);
			$cookies.put("token", response.data.token);
			$scope.user = $cookies.getObject("user");
			
			console.log($scope.user);
			
			$location.path('/');
			$scope.loadTopMenu();
			$scope.loadSideMenu();
			
			
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
		
		$scope.loadTopMenu();
		$scope.loadSideMenu();
		$location.path('/');
	}
	
	$scope.signin = function UserSignin() {
		
		$scope.form.error = {};
		
		if($cookies.getObject("user")) {
			console.log("connected");
			return "Already connected";
		}
		
		if($scope.form.signin.mailAddress != $scope.form.signin.mailAddress2) {
			$scope.form.error.mail = "Mails should be the same";
		}
		
		if($scope.form.signin.password != $scope.form.signin.password2) {
			$scope.form.error.password = "Passwords should be the same";
		}
		
		if($scope.form.error.mail || $scope.form.error.password) {
			return null;
		}
		
		var data = $scope.form.signin;
		data.role = "user";
		data.mailAddress2 = undefined;
		data.password2 = undefined;
		
		console.log(data);
		
		$http.post('api/user/create/', data)
		.then(function successCallback(response) {
			console.log("user created");
		}, function errorCallback(data, status, headers) {
			console.log("user can't be created");
			console.log(data);
			$scope.form.error.global = data;
			/*
			$scope.ResponseDetails = "Data : " + data + 
			"<hr/>Status " + status + 
			"<hr/>Headers " + headers + 
			"<hr/>Config : " + config;
			*/
		});
		
	}
	
	$scope.updateInfo = function UserUpdateInfo() {
		console.log($scope.form.update);
		var data = $scope.form.update;
		data.isAgency = undefined;
		
		$http.put('api/user/edit', data, {
			headers: {'Authorization': 'Bearer ' + $cookies.get("token")}
		})
		.then(function successCallback(response) {
			$cookies.putObject("user", response.data);
			console.log(response);
		}, function errorCallback(response) {
			console.log(response);
		});
		
	}
	
}]);
