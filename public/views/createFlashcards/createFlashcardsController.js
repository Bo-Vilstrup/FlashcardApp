/**
 * Created by bo on 12/18/16.
 */
'use strict';
angular.module('app.createFlashcardsModule', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/createFlashcards', {

            templateUrl: 'views/createFlashcards/createFlashcards.html',
            controller: 'createFlashcardsController',
            controllerAs: 'ctrl'
        });
    }])

    .controller('createFlashcardsController', function ($http, $scope) {


        function arrayRotate(arr, reverse){
            if(reverse)
                arr.unshift(arr.pop());
            else
                arr.push(arr.shift());
            return arr
        }
        
        var RandomRotate = function (array) {
            var randomNumber = Math.round(Math.random() * 33); // number between 0..4

            while(0 < --randomNumber) {
                arrayRotate(array, true);
            }
            return array;
        };
        

        $scope.submit = function () {

            var answers = [
                {
                    "answer": $scope.correctAnswer,
                    "isCorrect": true
                },
                {
                    "answer": $scope.wrongAnswer1,
                    "isCorrect": false
                },
                {
                    "answer": $scope.wrongAnswer2,
                    "isCorrect": false
                },
                {
                    "answer": $scope.wrongAnswer3,
                    "isCorrect": false
                }
            ];
            
            var RotatedAnswers = RandomRotate(answers);

            var flashcard = {
                "category": $scope.category,
                "question": $scope.question,
                "answers" : RotatedAnswers
            };
            
            var req = {
                method: 'POST',
                url: '/api/card',
                headers: {'Content-Type': 'application/json'},
                data: flashcard
            };
            
            $http(req).then(function successCallback(response) {

                // $scope.category = "";
                // $scope.question = "";

                $scope.correctAnswer = "";
                $scope.wrongAnswer1 = "";
                $scope.wrongAnswer2 = "";
                $scope.wrongAnswer3 = "";

            }, function errorCallback(response) {
               

            }); // End of get()
        }; // End of submit
    }); // End of Controller


