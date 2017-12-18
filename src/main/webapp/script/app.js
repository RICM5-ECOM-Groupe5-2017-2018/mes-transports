
var app = angular.module("app",['routes','account','menu','agency', 'vehicle', 'search', 'cart', 'history']);


app.run(function($rootScope,$location,$route,$window) {

    $route.reload();

	$rootScope.$on("$locationChangeStart", function(event, nextUrl, currentUrl) {
		
		$rootScope.setError(undefined);
		$rootScope.setSuccess(undefined);

		if($rootScope.user)
		{
			var route = nextUrl;
			if($route.routes[$location.path()]){route = ($route.routes[$location.path()]).originalPath;}

			if(route == '/')
			{
				  if($rootScope.user.isAgency)
				  {
					  $location.path('/agency');
				  }
				  else{$location.path('/');}
			}
			else if(route=='') {
				$window.location.href=currentUrl;
			}
			else if (($rootScope.user.isAgency && !nextUrl.includes("agency"))||(!$rootScope.user.isAgency && nextUrl.includes("agency"))){

				event.preventDefault();
				//$window.location.href=currentUrl;
			}
		}
		else{
			if(nextUrl.includes("agency")){
				event.preventDefault();
			}
		}

	});

});

app.controller('AppController', function($scope, $rootScope, $cookies, CartServices) {

	$rootScope.user = $cookies.getObject("user");

	$scope.form = [];
	if(!$scope.success) {
		$rootScope.success = undefined;
		$rootScope.error = undefined;
	}
	
	$rootScope.setError = function(msg) {
		$scope.error = msg;
	}
	
	$rootScope.setSuccess = function(msg) {
		$scope.success = msg;
	}

	$rootScope.cart = CartServices.cart;
	$scope.updateCart = CartServices.updateCart;

	$scope.refreshAlerts = function() {
		$scope.success = undefined;
		$scope.error = undefined;
	}

});
