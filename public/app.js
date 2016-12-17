/**
 * Created by bo on 12/11/16.
 */
'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ngRoute',
    'app.indexModule',
    'app.homeModule',
    'app.signupModule',
    'app.restrictedModule'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }])
    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    
    
        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = $localStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/signup');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    
    }
    ]);


// .
// config(function ($httpProvider) {
//     $httpProvider.interceptors.push('authInterceptor');
// });