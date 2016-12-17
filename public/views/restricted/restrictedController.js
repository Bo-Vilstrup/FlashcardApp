/**
 * Created by bo on 12/13/16.
 */
/**
 * Created by bo on 12/11/16.
 */
'use strict';

angular.module('app.restrictedModule', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/restricted', {

            templateUrl: 'views/restricted/restricted.html',
            controller: 'restrictedController',
            controllerAs: 'ctrl'
        });
    }])

    .controller('restrictedController', function ($http, $scope) {

        var req = {
            method: 'GET',
            url: '/api/users',
            headers: {'Content-Type': 'application/json'}
        };

        $http(req).then(function successCallback(response) {
           $scope.users = response.data;
            
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

        }); // End of get()

        $scope.delete = function (index) {

            var req = {
                method: 'DELETE',
                url: '/api/user/'+$scope.users[index]._id,
                headers: {'Content-Type': 'application/json'}
            };
            
            $http(req).then(function successCallback(response) {
                $scope.users.splice( index, 1 );
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }; // End of Delete()


    }); // End of Controller