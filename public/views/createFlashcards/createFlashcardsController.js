/**
 * Created by bo on 12/18/16.
 */
'use strict';

//angular.module('myApp.view1', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
angular.module('app.createFlashcardsModule', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/createFlashcards', {

            templateUrl: 'views/createFlashcards/createFlashcards.html',
            controller: 'createFlashcardsController',
            controllerAs: 'ctrl'
        });
    }])

    .controller('createFlashcardsController', function ($http, $scope) {




    }); // End of Controller