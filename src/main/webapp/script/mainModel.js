var app = angular.module("MainModel",[]);

app.controller("PageController",function($scope){
	
	$scope.currentPage = "html/mainPage.html";
	
	$scope.getPage=function(){

		return $scope.currentPage; 
	};
	
	$scope.changePage=function(page){

		$scope.currentPage = page ; 
	};
	
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


