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
					newRent.vehicle = item;
					utils.cart.push(newRent);
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
					vehicle = rent.vehicle;
					rent.vehicle = undefined;
					$http.post('api/cart/add', rent)
					.then(function successCallback(response) {
						console.log(response);
					}, function errorCallback(response) {
						console.log(response);
						rend.idUser = -1;
					});
					rent.vehicle = vehicle;
				}
			});
		}
	}
	
	return utils;
	
});

cart.controller('CartController', function($scope, $http, CartServices) {
	
	$scope.addToCart = CartServices.addToCart;
	
});