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
    .when("/signin", {
    	templateUrl : "view/users/signin.html",
    	controller : "AccountController"
    })
    .when("/account", {
    	templateUrl : "view/users/update.html",
    	controller : "AccountController"
    })
    .when("/cart", {
    	templateUrl : 'view/users/cart.html',
    	controller : 'CartController'
    })
    .when('/agency', {
        templateUrl : 'view/agency/agencyView.html',
    })
    .when('/registration/childAgence', {
    	templateUrl : 'html/agency/agencieyPage.html',
    	controller  : 'Resgistration'
    })
    .when('/add/vehicule', {
        templateUrl : 'html/agency/addNewVehicule.html',
        controller  : 'vehiculeRegisterForm'
    })
	.when('/view/vehicule', {
        templateUrl : 'html/agency/vehiculesViewPage.html',
        controller  : 'vehiculeView'
    })
    .when("/vehicle/view/:id", {
    	templateUrl : 'view/vehicle/details.html',
    	controller : 'VehicleDetailsController'
    })
    .otherwise({
    	redirectTo : '/'
    });
	
});
