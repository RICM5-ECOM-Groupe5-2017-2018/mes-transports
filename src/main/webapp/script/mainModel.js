var app = angular.module("main",['routes','account','menu']);


app.run(function($rootScope,$location) {
	
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		
		  if(next.$$route.originalPath == '/' && $rootScope.user) 
		  {
			  if($rootScope.user.isAgency)
			  {
				  $location.path('/agency');
			  }
			  else{$location.path('/');}
		  } 
		  else{
			  $location.path(next.$$route.originalPath);}
	});
	
});
