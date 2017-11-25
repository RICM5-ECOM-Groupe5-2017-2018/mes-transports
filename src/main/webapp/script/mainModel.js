var app = angular.module("MainModel",['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
            templateUrl : 'html/mainPage.html'
        })

        .when('/inscription', {
            templateUrl : 'html/registrationPage.html'
        })
        
        .when('/connexion', {
            templateUrl : 'html/connexionPage.html'
        })
        
        .when('/inscription/sousAgence', {
            templateUrl : 'html/agenciesPage.html',
            controller  : 'Resgistration'
        })
        
        .when('/ajouter/vehicule', {
            templateUrl : 'html/vehiculesPage.html',
            controller  : 'vehiculeRegisterForm'
        });
});

app.controller("topController", function ($scope) {
	$scope.logo = {
			id : "logo_mt",
			alt : "logo-MesTransports",
			src : "Images/mt.png"
	};
	
	$scope.expand = function(){
		console.log("click");
		 $('#menu-top').collapse() 
	};
	
	$('#nav-top').click(function () {
		console.log("click");
        
    });
});

app.controller("NavController", function ($scope) {
	$scope.agencyCity = "parcLv1"
	
	$('#nav-side').click(function () {
        $('#menu-side').toggleClass('slide-in');
    });
    
    $scope.collapse = function(){
		$('#'+ $scope.agencyCity).toggleClass('collapse');
	};
	
	
	$('.side-menu-container li').click(function (event) {
		$(this).siblings('li').removeClass('active');
        $(this).addClass('active');
	});
});


