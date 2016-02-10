var webAppController = {};
var webAppFactory = {};
var webAppFilter = {};
var webAppDirective = {};

var app = angular.module('pickyourday-webapp', ['ui.router', "ngResource", 'ngMaterial'])
.controller(webAppController)
.factory(webAppFactory)
.filter( webAppFilter)
.directive(webAppDirective)

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {


    $stateProvider
        .state("login", {
        url: "/login",
        onEnter: function ($rootScope) {
            if (getJSONLocal("user")) {

                $rootScope.go("app");
            }
        },
        templateUrl: 'app/login/main.html',
        controller: 'LoginCtrl',
       

    })
        .state("app", {
        url: '/',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        templateUrl: 'app/main.html',
        controller: 'AppCtrl',
       
    });


    $urlRouterProvider.otherwise("/login");
    $httpProvider.interceptors.push('AuthInterceptor');

})

.run(function ($rootScope, $state) {

    $rootScope.go = function (state, params) {
        $state.go(state, params);
    };
});
