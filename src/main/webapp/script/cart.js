var cart = angular.module('cart', ['account']);

cart.factory('CartServices', function($cookies, $http) { 
	
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
				utils.form.error = "La date est déjà prise.";
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
			utils.form.success = "Véhicule ajouté au panier !"
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

cart.controller('CartController', function($scope, $http, $location, $cookies, CartServices) {
	
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

	$scope.totalCart = function() {
		total = 0;
		$scope.cart.forEach(function(item) {
			total += item.totalPrice;
		});
		return total;
	}
	
	$scope.payCart = function() {
		pay_method = $(".btn-pay.active input")[0].id;
		bill_type = $(".btn-bill.active input")[0].id;
		
		$scope.cart.forEach(function(item) {
			$http.post('api/rent/add')
			.then(function successCallback(response) {
				//TODO > enregistrer dans la base
			}, function errorCallback(response) {
				
			});
		});
		
		$('#myModal').modal('hide');
		
	}
	
	$scope.form.error = CartServices.form.error;
	$scope.form.success = CartServices.form.success;

});