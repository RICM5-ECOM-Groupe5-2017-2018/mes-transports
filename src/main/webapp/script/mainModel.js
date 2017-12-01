var app = angular.module("main",['routes','menu','account','agencyVehiculesView','agency']);


app.run(function($rootScope,$location) {
	
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		
		if($rootScope.user)
		{
			
			if(next && next.$$route.originalPath == '/') 
			{	 
				  if($rootScope.user.isAgency)
				  {
					  $location.path('/agency');
				  }
				  else{$location.path('/');}
			}
		}
		  
	});
	
});
