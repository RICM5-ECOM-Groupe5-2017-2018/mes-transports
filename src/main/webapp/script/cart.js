var cart = angular.module('cart', ['account']);

cart.factory('CartServices', function($cookies, $http) { 
	
	var utils = {};
	
	if((tmpCart = $cookies.getObject("cart")) != undefined) {
		utils.cart = tmpCart;
	}
	
	if(utils.cart == undefined) {		
		utils.cart = [];
	}
	
	utils.addToCart = function(item, user, startDate, endDate) {
		var add = true;
		utils.cart.forEach(function(rent) {
			if(item.id == rent.idVehicle
					&&	((
						startDate <= new Date(rent.endDate).getTime()
						&&
						startDate >= new Date(rent.startDate).getTime()
					) || (
						endDate >= new Date(rent.startDate).getTime()
						&&
						endDate <= new Date(rent.endDate).getTime()
					))
			) {
				add = false;
				return add;
			}
		});
		if(add) {				
			newRent = {};
			newRent.idVehicle = item.id;
			if(user) {			
				newRent.idUser = user.id;
			} else {
				newRent.idUser = -1;
			}
			newRent.startDate = startDate;
			newRent.endDate = endDate;
			newRent.totalPrice = item.price * Math.ceil((endDate- startDate)/(1000*60*60*24));
			newRent.locationIn = "";
			newRent.locationOut = "";
			if(user) {
				$http.post('api/cart/add', newRent)
				.then(function successCallback(response) {
					console.log(response);
					utils.cart.push(newRent);
					console.log(utils.cart);
					$cookies.putObject("cart", utils.cart);
				}, function errorCallback(response) {
					console.log(response);
				});
			}
		}
	}
	
	utils.updateCart = function(user) {
		if(user) {
			utils.cart.forEach(function(rent) {
				if(rent.idUser <= 0) {
					rent.idUser = user.id;
					vehicle = rent.vehicle;
					$http.post('api/cart/add', rent)
					.then(function successCallback(response) {
						console.log(response);
					}, function errorCallback(response) {
						console.log(response);
						rend.idUser = -1;
					});
				}
			});
		}
	}
	
	return utils;
	
});

cart.controller('CartController', function($scope, $http, $cookies, CartServices) {
	
	$scope.displayCart = $scope.cart;
	
	$scope.displayCart.forEach(function(item) {
		$http.get('api/vehicle/view/' + item.idVehicle)
		.then(function successCallback(response) {
			item.vehicle = response.data;
		}, function errorCallback(response) {
			console.log(response);
		});
	});
	
	console.log($scope.displayCart);
	
	$scope.addToCart = CartServices.addToCart;
	
	$scope.removeItemFromCart = function(item) {
		var index = $scope.cart.indexOf(item);
		$scope.cart.splice(index, 1);
		$cookies.putObject("cart", $scope.cart);
	}
	
});