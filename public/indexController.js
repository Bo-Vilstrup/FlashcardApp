/**
 * Created by bo on 12/11/16.
 */
'use strict';

//angular.module('myApp.view1', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
angular.module('app.indexModule' ,['ngRoute', 'ngStorage'])
    .controller('indexController', function ($http, $scope, $localStorage, $location) {


        // function changeUser(userProfile) {
        //     angular.extend(currentUser, userProfile);
        // }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserProfileFromToken() {
            var token = $localStorage.token;
            var userProfile = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                userProfile = JSON.parse(urlBase64Decode(encoded));
            }

            return userProfile;
        }

        // var currentUser = getUserProfileFromToken();
        $scope.isAuthenticated = false;
        $scope.indexController = {};
        $scope.indexController.username = "";
        $scope.indexController.userName = "";
        $scope.indexController.password = "";

            $scope.login = function () {
            $http({
                method: 'post',
                url: '/signin',
                data: {
                    "userName": $scope.indexController.userName,
                    "password": $scope.indexController.password
                }
            }).then(function successCallback(response) {
                $localStorage.token = response.data.token;
                $scope.indexController.username = getUserProfileFromToken().sub;
                $scope.isAuthenticated = true;

            }, function errorCallback(response) {
                // do something if an error
            });
        }; // End of login
        
        $scope.logout = function () {
            delete $localStorage.token;
            //changeUser({});
            $scope.indexController.username = "";
            $scope.isAuthenticated = false;
            $location.path("/");
        }; // End of logout


        //This sets the login data from session store if user pressed F5 (You are still logged in)
        var init = function () {
            var token = $localStorage.token;
            if (token) {
                $scope.isAuthenticated = true;
                var userProfile = getUserProfileFromToken();
                $scope.indexController.username = userProfile.sub;
            }
        }(/*this executes the init() function*/);

    }); // End of Controller