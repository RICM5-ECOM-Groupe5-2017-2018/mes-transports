/**
 * 
 */

var routes = angular.module('routes', ['ngRoute', 'account']);

routes.config(function($routeProvider) {
	
	$routeProvider
	.when("/", {
        templateUrl : "search.html"
    })
    .when("/login", {
    	templateUrl : "login.html",
    	controller : "AccountController"
    })
    .when("/signin", {
    	templateUrl : "signin.html",
    	controller : "AccountController"
    });
	
});