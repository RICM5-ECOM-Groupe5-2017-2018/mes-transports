var app = angular.module("main",['routes','menu','account','agencyVehiculesView','agency']);


app.run(function($rootScope,$location,$route,$window) {
	
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
