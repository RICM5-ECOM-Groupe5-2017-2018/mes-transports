var app = angular.module("main",['routes','menu','account','agencyVehiculesView','agency']);


app.run(function($rootScope,$location,$route) {
	
	$rootScope.$on("$locationChangeStart", function(event, nextUrl, currentUrl) {
			
		if($rootScope.user)
		{	
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
		}
		  
	});
	
});
