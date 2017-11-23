/**
 * 
 */

var routes = angular.module('routes', ['ngRoute', 'account']);

routes.config(function($routeProvider) {
	
	$routeProvider
	.when("/", {
        templateUrl : "search.html"
    })
    .when("/test", {
    	templateUrl : "login.html",
    	controller : "AccountController"
    });
	
});