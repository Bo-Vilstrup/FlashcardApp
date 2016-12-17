/**
 * Created by bo on 12/11/16.
 */
'use strict';

//angular.module('myApp.view1', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
angular.module('app.homeModule', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {

            templateUrl: 'views/home/home.html',
            controller: 'homeController',
            controllerAs: 'ctrl'
        });
    }])

    .controller('homeController', function ($http, $scope) {


       

    }); // End of Controller
