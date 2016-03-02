var webAppController = {};
var webAppFactory = {};
var webAppFilter = {};
var webAppDirective = {};

var app = angular.module('pickyourday-webapp', ['ui.router', "ngResource", 'ngMaterial', 'ngMaterialDatePicker','ngLetterAvatar', 'naif.base64'])
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
        .state("app.profile", {
        url: '/profile',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/companiesProfile/main.html',
                controller: 'profileCtrl'
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
        .state("app.myPromotions", {
        url: '/myPromotions',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/myPromotions/main.html',
                controller: 'promotionCtrl'
            }
        }      
    })   
        .state("app.newPromotion", {
        url: '/newPromotion',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/newPromotion/main.html',
                controller: 'newPromotionCtrl'
            }
        }      
    })

        .state("app.employees", {
        url: '/employees',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/employees/main.html',
                controller: 'employeesCtrl'
            }
        }      
    });



    $urlRouterProvider.otherwise("/login");
    $httpProvider.interceptors.push('AuthInterceptor');

})

.run(function ($rootScope, $state, $mdToast) {

    $rootScope.go = function (state, params) {
        $state.go(state, params);
    };

    $rootScope.showMessageToast=function(message){
        $mdToast.show({
            controller: 'MessageToastCtrl',
            templateUrl: 'app/utils/message-toast/main.html',
            position:"true true false false",
            locals:{data:{message:"hello"}},
            hideDelay: 600,
        });
    };
});
