/**
 * 
 */
var app = angular.module('user', ['ngResource', 'ngGrid', 'ui.bootstrap']);

app.controller('userTestController', function UserTestController($scope, $http) {
  
	
	$scope.user = {name : "Gilles"};
  
	$scope.loginForm = {};
	$scope.loginForm.login = "login";
	$scope.loginForm.password = "password";
  
	$scope.connect = function UserConnect() {
		$http({
		  method: 'GET',
		  url: 'api/user/authenticate/' + $scope.loginForm.login + '/' + $scope.loginForm.password
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
			console.log(response);
			$scope.token = response.data;
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}
	
	$scope.testAPI = function UserTestAPI() {
		$http.get(
			'api/user/view/1',
			{
				headers: {'Authorization': 'Bearer ' + $scope.token}
			}
		).then(function successCallback(response) {
			console.log(response);
		});
	}
  
});

/*
$http.get('www.google.com/someapi', {
    headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
});
*/
/*
mainApp.config(function($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: 'home.html',
			controller: 'StudentController'
		})
		.when('/viewStudents', {
			templateUrl: 'viewStudents.html',
			controller: 'StudentController'
		})
		.otherwise({
			redirectTo: '/home'
		});
});
*/