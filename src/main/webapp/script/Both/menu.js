var menu = angular.module('menu', ['ngCookies','agency']);

//Controler which send the menu to load
menu.controller("menuCtrl", ['$scope','$rootScope','$cookies', function menuCtrl($scope,$rootScope,$cookies) {

	$scope.currentSideMenu = 'view/menu/sideMenuEmpty.html'; 
	$scope.currentTopMenu = 'view/menu/header.html';

	$scope.loadTopMenu=function()
	{
		var user = $cookies.getObject("user");
		if(user==undefined){
			$scope.currentTopMenu = 'view/menu/header.html'
		}
		else{
			if(user.isAgency){
                $scope.currentTopMenu = user.isAgency?'view/menu/headerAgency.html':'view/menu/headerUser.html';
			}
			else{$scope.currentTopMenu = 'view/menu/headerUser.html';}
		}

	}
	
	$scope.loadSideMenu=function()
	{
		var user = $cookies.getObject("user");
		if(user==undefined){
			$scope.currentSideMenu = 'view/menu/sideMenuEmpty.html';
		}
		else{
		$scope.currentSideMenu = user.isAgency?'view/menu/SideMenuAgency.html':'view/menu/sideMenuEmpty.html';}	
	}
	
	$scope.getTopMenu=function()
	{
		$scope.loadTopMenu();
		return $scope.currentTopMenu;
		
	}
	
	$scope.getSideMenu=function()
	{
		$scope.loadSideMenu();
		return $scope.currentSideMenu;
	}
}]);

//Controller for the top menu
menu.controller("topController", function ($scope,$rootScope) {
	$scope.connect = $rootScope.user!=undefined;
	$scope.logo = {
			id : "logo_mt",
			alt : "logo-MesTransports",
			src : "Images/mt.png"
	};

});