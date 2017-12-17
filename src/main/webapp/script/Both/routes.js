/**
 *
 */

var routes = angular.module('routes', ['ngRoute']);

routes.config(function($routeProvider) {

	$routeProvider
	.when("/", {
		templateUrl : "view/users/search.html",
		controller : "SearchController"
    })
    .when("/login", {
    	templateUrl : "view/users/login.html",
    	controller : "AccountController"
    })
    .when("/signup", {
    	templateUrl : "view/users/signup.html",
    	controller : "AccountController"
    })
    .when("/account", {
    	templateUrl : "view/users/update.html",
    	controller : "AccountController"
    })
    .when("/agency/account", {
        templateUrl : "view/users/update.html",
        controller : "AccountController"
    })
    .when("/cart", {
    	templateUrl : 'view/users/cart.html',
    	controller : 'CartController'
    })
    .when('/history', {
    	templateUrl : 'view/users/history.html',
    	controller : 'HistoryController'
    })
    .when('/vehicle/view/:id', {
    	templateUrl : 'view/vehicle/details.html',
    	controller : 'VehicleDetailsController'
    })
	.when('/agency', {
        templateUrl : 'view/agency/agencyView.html',
        activetab : 'main'
    })
	.when('/agency/view/chagency/:idA', {
        templateUrl : 'view/agency/chidAgencyView.html',
        activetab : 'childAgency'
    })
    .when('/agency/add/childAgency', {
        templateUrl : 'view/agency/addNewChildAgency.html',
        controller  : 'childRegistration',
        activetab : 'addchildAgency'
    })
    .when('/agency/update/:idupdate', {
    	templateUrl : 'view/agency/addNewChildAgency.html',
        activetab : 'main'
    })
    .when('/agency/view/vehicule', {
        templateUrl : 'view/agency/viewVehicule.html',
        activetab : 'seeVehicules',
    })
	.when('/agency/view/vehicule/:idV', {
        templateUrl : 'view/agency/viewVehicule.html',
        activetab : 'seeVehicules',
    })
    .when('/agency/add/vehicule', {
        templateUrl : 'view/agency/addNewVehicule.html',
        activetab : 'seeVehicules'
    })
    .when('/agency/update/vehicule/:idVupdate', {
    	templateUrl : 'view/agency/addNewVehicule.html',
        activetab : 'seeVehicules'
    })
    .when('/admin/update/user/',{
    	templateUrl : 'view/admin/ModifyUserInformation.html',
    	controller : 'AdminController'
    })
    .otherwise({
    	redirectTo : '/'
    });


});
