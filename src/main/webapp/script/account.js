/**
 * 
 */

var account = angular.module('account', ['ngCookies','menu']);

account.controller('AccountController', ['$scope', '$http', '$cookies','$location','$rootScope','$route', function AccountController($scope, $http, $cookies,$location,$rootScope,$route) {

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
			response.data.isAgency = response.data.idAgency!=null;
			$cookies.putObject("user", response.data);
			$cookies.put("token", response.data.token);
			$scope.user = $cookies.getObject("user");
			$rootScope.user = $scope.user;
			
			console.log($scope.user);
			
			$scope.loadTopMenu();
			$scope.loadSideMenu();
			$location.path('/');
			
			
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
		$rootScope.user = undefined;
		
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
		
		if($scope.form.signin.mail != $scope.form.signin.mail2) {
			$scope.form.error.mail = "Mails should be the same";
		}
		
		if($scope.form.signin.password != $scope.form.signin.password2) {
			$scope.form.error.password = "Passwords should be the same";
		}
		
		if($scope.form.error.mail || $scope.form.error.password) {
			return null;
		}
		
		var data = {
			'login' : $scope.form.signin.login,
			//'userName' : $scope.form.signin.login,
			'password' : $scope.form.signin.password,
			'mailAddress' : $scope.form.signin.mail,
			'phoneNum' : $scope.form.signin.phone,
			'role' : "user",
			'firstname' : $scope.form.signin.firstname,
			'lastname' : $scope.form.signin.lastname
		};
		
		
		$http.post('api/user/create/', data)
		.then(function successCallback(response) {
			console.log("user created");
		}, function errorCallback(data, status, headers) {
			console.log("user can't be created");
			console.log(data);
			/*
			$scope.ResponseDetails = "Data : " + data + 
			"<hr/>Status " + status + 
			"<hr/>Headers " + headers + 
			"<hr/>Config : " + config;
			*/
		});
		
	}
	
}]);
