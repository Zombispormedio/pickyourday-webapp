var webAppController = {};
var webAppFactory = {};
var webAppFilter = {};
var webAppDirective = {};

var app = angular.module('pickyourday-webapp', ['ui.router', "ngResource", 'ngMaterial', 'ngMaterialDatePicker'])
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

                $rootScope.go("app.dashboard");
            }
        },
        templateUrl: 'app/login/main.html',
        controller: 'LoginCtrl'      

    })
        .state("app", {
        url: '',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        templateUrl: 'app/main.html',
        controller: 'AppCtrl'
    })
        .state("app.dashboard", {
        url: '/dashboard',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/dashboard/main.html',
                controller: 'DashboardCtrl'
            }
        }  
    })
        .state("app.dayDashboard", {
        url: '/dayDashboard',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/dayDashboard/main.html',
                controller: 'DayDashboardCtrl'
            }
        }
    })
        .state("app.companiesProfile", {
        url: '/companiesProfile',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/companiesProfile/main.html',
                controller: 'companiesProfileCtrl'
            }
        }
    })
        .state("app.services", {
        url: '/services',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/services/main.html',
                controller: 'servicesCtrl'
            }
        }
       
    })
    .state("app.promotion", {
            url: '/promotion',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/promotion/main.html',
                controller: 'promotionCtrl'
            }
        }      
    });



    $urlRouterProvider.otherwise("/login");
    $httpProvider.interceptors.push('AuthInterceptor');

})

.run(function ($rootScope, $state) {

    $rootScope.go = function (state, params) {
        $state.go(state, params);
    };
});
