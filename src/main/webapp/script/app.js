
var app = angular.module("app",['routes','account','menu','agency', 'vehicle', 'search', 'cart', 'history']);


//var app = angular.module("main",['routes','menu','account','agencyVehiculesView','agency']);


app.run(function($rootScope,$location,$route,$window) {

	$rootScope.$on("$locationChangeStart", function(event, nextUrl, currentUrl) {

		if($rootScope.user)
		{
			console.log("connect")
			var route = nextUrl;
			if($route.routes[$location.path()]){route = ($route.routes[$location.path()]).originalPath;}

			if(route == '/')
			{
				console.log("redirection user et agency");
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

app.controller('AppController', function($scope, $cookies, CartServices) {

	$scope.user = $cookies.getObject("user");
	
	$scope.form = {};
	$scope.form.success = undefined;
	$scope.form.error = undefined;
	
	$scope.cart = CartServices.cart;
	$scope.updateCart = CartServices.updateCart;

});
