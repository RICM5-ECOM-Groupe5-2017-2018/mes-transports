/**
 * 
 */

var routes = angular.module('routes', ['ngRoute', 'account']);

routes.config(function($routeProvider) {
	
	$routeProvider
	.when("/", {
		templateUrl:"view/users/search.html"
    })
    .when("/login", {
    	templateUrl : "view/login.html",
    	controller : "AccountController"
    })
    .when("/signin", {
    	templateUrl : "view/signin.html",
    	controller : "AccountController"
    })
    .when('/agency/add/childAgence', {
        templateUrl : 'view/agency/addNewChildAgency.html',
        controller  : 'childRegistration'
    })
    .when('/agency', {
        templateUrl : 'view/agency/agencyView.html',
    })
    .when('/agency/add/vehicule', {
        templateUrl : 'view/agency/addNewVehicule.html',
        controller  : 'addVehiculeForm'
    })
	.when('agency/view/vehicule', {
        templateUrl : 'view/agency/viewVehicule.html'
    })
	.when('agency/view/chagency/:id', {
        templateUrl : 'view/agency/chidAgencyView.html',
        controller : 'childAgencyView'
    })
	
});
