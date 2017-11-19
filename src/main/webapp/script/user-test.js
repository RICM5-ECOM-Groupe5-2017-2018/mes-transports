/**
 * 
 */
var app = angular.module('user', ['ngResource', 'ngGrid', 'ui.bootstrap']);

app.controller('userTestController', function UserTestController($scope, $http) {
  $scope.user = {name : "Gilles"};
  $http.get('api/user/view/1').then(function(response) {
      $scope.info = response;
  });
  
	$scope.loginForm = {};
	$scope.loginForm.login = "login";
	$scope.loginForm.password = "password";
  
  $scope.connect = function UserConnect() {
		console.log("oui");
		$http({
		  method: 'GET',
		  url: 'api/user/authenticate/' + $scope.loginForm.login + '/' + $scope.loginForm.password
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
			console.log(response);
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	}
  
  
});
  
  /*
  $http({
	  method: 'GET',
	  url: '/api/user/view/1'
	}).then(function successCallback(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	  }, function errorCallback(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
	  */
