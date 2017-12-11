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
			if(item.id == rent.idVehicle && (new Date(startDate).getTime() <= new Date(rent.endDate).getTime() || new Date(endDate).getTime() >= new Date(rent.startDate).getTime())) {
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
			newRent.totalPrice = item.price * Math.ceil((endDate.getTime() - startDate.getTime())/(1000*60*60*24));
			newRent.locationIn = "";
			newRent.locationOut = "";
			utils.cart.push(newRent);
			if(user) {
				$http.post('api/cart/add', newRent)
				.then(function successCallback(response) {
					console.log(response);
				}, function errorCallback(response) {
					console.log(response);
				});
			}
		}
		console.log(utils.cart);
		$cookies.putObject("cart", utils.cart);
	}
	
	utils.updateCart = function(user) {
		if(user) {
			utils.cart.forEach(function(rent) {
				if(rent.idUser <= 0) {
					rent.idUser = user.id;
					$http.post('api/cart/add', rent)
					.then(function successCallback(response) {
						console.log(response);
					}, function errorCallback(response) {
						console.log(response);
					});
				}
			});
		}
	}
	
	return utils;
	
});

cart.controller('CartController', function($scope, $http, CartServices) {
	
	$scope.addToCart = CartServices.addToCart;
	
});