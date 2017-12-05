
var app = angular.module("app",['routes','account','menu','agency', 'vehicle', 'search', 'cart', 'history']);



app.run(function($rootScope,$location,$route,$window) {
	$rootScope.$on("$routeChangeStart", function(event, nextUrl, currentUrl) {

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
			}
		}
		else{
			if(nextUrl.includes("agency")){
				event.preventDefault();
			}
		}

	});

});


app.controller('AppController', function($scope, $cookies) {

	$scope.user = $cookies.getObject("user");
	$scope.form = {};

});
