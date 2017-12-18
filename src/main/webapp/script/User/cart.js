var cart = angular.module('cart', ['account']);

cart.factory('CartServices', function($rootScope, $cookies, $http) { 
	
	var utils = {};
	utils.form = {};
	utils.form.error = undefined;
	utils.form.success = undefined;
	
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
				$rootScope.setError("La date est déjà prise.");
				$('#myModal').modal('hide');
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
			utils.cart.push(newRent);
			$cookies.putObject("cart", utils.cart);
			$rootScope.setSuccess("Véhicule ajouté au panier !");
			$('#myModal').modal('hide');
		}
	}
	
	utils.updateCart = function(user) {
		if(user) {
			utils.cart.forEach(function(rent) {
				if(rent.idUser <= 0) {
					rent.idUser = user.id;
				}
			});
		}
	}
	
	return utils;
	
});

cart.controller('CartController', function($scope, $rootScope, $http, $location, $cookies, CartServices) {
	
	$rootScope.cart = CartServices.cart;
	$scope.displayCart = $scope.cart;
	$scope.canPay = ($rootScope.cart.length > 0) && $rootScope.user;
	$scope.cantPay = ($rootScope.cart.length > 0) && !$rootScope.user;
	
	$scope.displayCart.forEach(function(item) {
		$http.get('api/vehicle/view/' + item.idVehicle)
		.then(function successCallback(response) {
			item.vehicle = response.data;
			item.startDate = new Date(item.startDate);
			item.endDate = new Date(item.endDate);		
		}, function errorCallback(response) {
		});
	});
	
	$scope.addToCart = CartServices.addToCart;
	
	$scope.removeItemFromCart = function(item) {
		var index = $scope.cart.indexOf(item);
		$scope.cart.splice(index, 1);
		$cookies.putObject("cart", $scope.cart);
	}
	
	function computeTotalCart() {
		total = 0;
		if($scope.cart) {
			$scope.cart.forEach(function(item) {
				total += item.totalPrice;
			});
		}
		return total;
	}
	
	
	$scope.totalCart = computeTotalCart();
	
	$scope.payCart = function() {
		pay_method = $(".btn-pay.active input")[0].id;
		bill_type = $(".btn-bill.active input")[0].id;
		
		if($scope.cart.length == 0) {
			$scope.setError("La panier est vide.");
		} else {			
			var cart_to_proceed = $scope.cart;
			
			cart_to_proceed.forEach(function(item) {
				item.vehicle = undefined;
			});

			$http.post('api/cart/validate', $scope.cart)
			.then(function successCallback(response) {
				$('#myModal').modal('hide');
				$cookies.remove("cart");
				$rootScope.cart = [];
				$scope.displayCart = [];
				$scope.totalCart = 0;
				$scope.canPay = false;
				$scope.setSuccess("Panier validé !");
			}, function errorCallback(response) {
			});			
		}
		
	}
	
	$scope.form.error = CartServices.form.error;
	$scope.form.success = CartServices.form.success;

});