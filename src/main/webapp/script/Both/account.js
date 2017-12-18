var account = angular.module('account', ['ngCookies','menu']);

account.run( function($rootScope, $location) {

    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {

    	if ( $rootScope.user ) {
        if ( next.templateUrl == "view/users/login.html" || next.templateUrl == "view/users/signup.html") {
        	$location.path( "/search" );
        }
      }         
    });
 });

/**
 * Account controller :
 * - signup / login / logout
 * - update user infos
 */
account.controller('AccountController',
    ['$scope', '$http', '$cookies','$location','$rootScope',
        function AccountController($scope, $http, $cookies,$location,$rootScope) {

            /* load a logged in user infos from it's related cookie */
            $rootScope.user = $cookies.getObject("user");
            $scope.form.update = $scope.user;
            if($scope.cart) {
                $scope.updateCart($scope.user);
            }

            // checks if user token is still valid
            if($scope.user) {
                if(Date.now() > $scope.user.tokenExpiration) {
                    /* Disconnect the user when the token has expired */
                    $cookies.remove("user");
                    $cookies.remove("token");
                    $scope.user = undefined;
                }
            }

            /**
             * Login function
             */
            $scope.connect = function UserConnect() {

                $scope.refreshAlerts();

                // if user is already connected, reject him
                if($cookies.getObject("user")) {
                    $scope.setError("Déjà connecté");
                    $location.path('/');
                }

                // Call to the API to verify user's ids and requests it's informations
                $http.get(
                    'api/user/authenticate/' + $scope.form.connect.login + '/' + $scope.form.connect.password
                ).then(function successCallback(response) {
                    response.data.isAgency = response.data.idAgency!=null;
                    $cookies.putObject("user", response.data);
                    $cookies.put("token", response.data.token);

                    $scope.user = $cookies.getObject("user");
                    $rootScope.user = $scope.user;

                    // update cart status by setting user as owner of the cart items
                    if($scope.cart) {
                        $scope.updateCart($scope.user);
                    }
                    // redirect user to the main page
                    $scope.loadTopMenu();
                    $scope.loadSideMenu();
                    $location.path('/');


                }, function errorCallback(response) {

                    $scope.setError("Connexion impossible : informations invalides.");
                });
            }

            /**
             * Logout function
             */
            $scope.logout = function UserLogout() {

                if(!$cookies.get("token")) {
                    return "Not connected";
                }

                // Call the API to consider the user as disconnected and update it's token status
                $http.get(
                    'api/user/logout',
                    {
                        headers: {'Authorization': 'Bearer ' + $cookies.get("token")}
                    }
                ).then(function sucessCallback(response) {
                    //TODO check
                }, function errorCallback(response) {
                    //TODO have a callback, but delete anthentication cookies anyway
                });

                // Updates the cookies informations to disconnect the user definitely
                $cookies.remove("user");
                $cookies.remove("token");
                $scope.user = undefined;
                $rootScope.user = undefined;

                // redirects the user to the main page
                $scope.loadTopMenu();
                $scope.loadSideMenu();
                $location.path('/');
                $location.path('/');
            }

            /**
             * Signup function
             */
            $scope.signup = function UserSignup() {

                $scope.refreshAlerts();
                $scope.form.error = {};

                // verifies if user is not already logged in
                if($cookies.getObject("user")) {
                    return "Already connected";
                }

                // check mail confirmation
                if($scope.form.signup.mailAddress != $scope.form.signup.mailAddress2) {
                    $scope.form.error.mail = "Mails should be the same";
                    $scope.setError("Les deux mails ne correspondent pas");
                }

                // check password confirmation
                if($scope.form.signup.password != $scope.form.signup.password2) {
                    $scope.form.error.password = "Passwords should be the same";
                    $scope.setError("Les deux mots de passe ne correspondent pas");
                }

                if($scope.form.error.mail || $scope.form.error.password) {
                    return null;
                }

                // prepares the user object used for the http request
                var data = $scope.form.signup;
                data.role = "user";
                data.mailAddress2 = undefined;
                data.password2 = undefined;

                // call to the API, creates the user in the database
                $http.post('api/user/create/', data)
                    .then(function successCallback(response) {
                        $scope.setSuccess("Utilisateur enregistré correctement. Connectez-vous.");
                    }, function errorCallback(data, status, headers) {
                        $scope.setError("Impossible de créer l'utilisateur. (erreur)");
                    });

            }

            /**
             * User informations update function
             */
            $scope.updateInfo = function UserUpdateInfo() {

                $scope.refreshAlerts();
                var data = $scope.form.update;
                data.isAgency = undefined;

                /* sending new user informations to the API */
                $http.put('api/user/edit', data, {
                    headers: {'Authorization': 'Bearer ' + $cookies.get("token")}
                })
                    .then(function successCallback(response) {
                        $scope.user = response.data;
                        $scope.setSuccess("Les informations ont bien été modifiées.");
                        $cookies.putObject("user", $scope.user);
                    }, function errorCallback(response) {
                        $scope.setError("Erreur durant la mise à jour des informations");
                    });

            }

            /**
             * User password update
             */
            $scope.updatePwd = function() {

                $scope.refreshAlerts();

                if($scope.form.update.new_password != $scope.form.update.new_password2) {
                    $scope.update.error.password = "Les mot de passe ne correspondent pas.";
                } else {
                    var data = {};
                    data.idUser = $scope.user.id;
                    data.oldPass = $scope.form.update.old_password;
                    data.newPass = $scope.form.update.new_password;

                    $http.put('api/user/editpassword', {data}, {
                        headers: {
                            'Authorization': 'Bearer ' + $cookies.get("token"),
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                        .then(function successCallback(response) {
                        }, function errorCallback(response) {
                        });

                }

            }

            /**
             * User account deletion
             */
            $scope.deleteAccount = function() {
                $http.delete('api/user/disable/' + $scope.user.id, {}, {
                    headers: {'Authorization': 'Bearer ' + $cookies.get("token")}
                })
                    .then(function successCallback(response) {
                        $scope.logout();
                        $scope.setSuccess("Compte supprimé avec succès.");
                    }, function errorCallback(response) {
                        $scope.setError("Erreur dans la suppression du compte.");
                    });
            }

        }]);
