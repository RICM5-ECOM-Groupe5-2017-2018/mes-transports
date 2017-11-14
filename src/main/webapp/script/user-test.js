/**
 * 
 */
var app = angular.module('user', ['ngResource', 'ngGrid', 'ui.bootstrap']);

app.controller('userTestController', function UserTestController($scope) {
  $scope.user = {name : "Gilles"};
});

//Service that provides persons operations
app.factory('personService', function ($resource) {
    return $resource('user');
});