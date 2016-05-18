var webAppController = {};
var webAppFactory = {};
var webAppFilter = {};
var webAppDirective = {};

var app = angular.module('pickyourday-webapp', ['ui.router', "ngResource", 'ngMaterial', 'ngMaterialDatePicker','ngLetterAvatar', 'naif.base64', 'ngMap', 'angular-clipboard',  'alexandra'])
.controller(webAppController)
.factory(webAppFactory)
.filter( webAppFilter)
.directive(webAppDirective)

.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider) {


    $stateProvider

        .state("login", {
        url: "/login",
        onEnter: function ($rootScope) {
            if (getJSONLocal("user")) {

                $rootScope.go("app.profile");
            }
        },
        templateUrl: 'app/login/main.html',
        controller: 'LoginCtrl'      

    })
        .state("forgot_password", {
        url: '/forgot_password',
        onEnter: function ($rootScope) {
            if (getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
      
        templateUrl: 'app/forgotPassword/main.html',
        controller: 'PasswordCtrl'
          
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
        abstract:true
        
    })
         
        .state("app.dashboard", {
        url: 'dashboard',
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
        .state("app.profile", {
        url: 'profile',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/profile/main.html',
                controller: 'ProfileCtrl'
            }
        }
    })
        .state("app.services", {
        url: 'services',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/services/main.html',
                controller: 'ServicesCtrl'
            }
        }

    })
        .state("app.promotions", {
        url: 'promotions',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/promotions/main.html',
                controller: 'PromotionCtrl'
            }
        }      
    })   
        .state("app.newPromotion", {
        url: 'newPromotion',
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
        url: 'employees',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/employees/main.html',
                controller: 'EmployeesCtrl'
            }
        }      
    })
        .state("app.help", {
        url: 'help',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/help/main.html',
                controller: 'HelpCtrl'
            }
        }      
    })
        .state("app.ownpick", {
        url: 'ownpick',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/ownpick/main.html',
                controller: 'OwnPickCtrl'
            }
        }      
    })
        .state("app.settings", {
        url: 'settings',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/settings/main.html',
                controller: 'SettingsCtrl'
            }
        }      
    })
        .state("app.payment", {
        url: 'payment?:paymentId&:token&:PayerID',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/payment/main.html',
                controller: 'PaymentCtrl'
            }
        } 
    })
     .state("stats", {
        url: '/stats',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        templateUrl: 'app/stats/main.html',
        controller: 'StatsCtrl',
        abstract:true

    })
        .state("stats.normal", {
        url: '/normal',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/stats/normal/main.html',
                controller: 'NormalCtrl'
            }
        }  
    })
    
    .state("stats.slider", {
        url: '/slider',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/stats/slider/main.html',
                controller: 'SliderCtrl'
            }
        }  
    })
     .state("stats.player", {
        url: '/player',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/stats/player/main.html',
                controller: 'PlayerCtrl'
            }
        }  
    })
    .state("stats.heightmap", {
        url: '/height-map',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'app/stats/height-map/main.html',
                controller: 'HeightMapCtrl'
            }
        }  
    })
       



    $urlRouterProvider.otherwise("/login");
    $httpProvider.interceptors.push('AuthInterceptor');
    
     $mdThemingProvider.theme('stats-theme')
   .backgroundPalette('teal', {
      'default': '500', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    .primaryPalette('lime', {
      'default': '400', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('teal', {
      'default': '500' // use shade 200 for default, and keep all other shades the same
    });

})

.run(function ($rootScope, $state, $mdToast,CompanyService) {

    $rootScope.go = function (state, params) {
        $state.go(state, params);
    };

    $rootScope.showMessageToast=function(message, theme){
        $mdToast.show({
            controller: 'MessageToastCtrl',
            templateUrl: 'app/utils/message-toast/main.html',
            position:"true true false false",
            locals:{data:{message:message, theme:theme}},
            hideDelay: 1000,
        });
    };

    $rootScope.warningToast=function(message){
        if(typeof message==="object")message=JSON.stringify(message);
        $rootScope.showMessageToast(message, "warning");
    };

    $rootScope.errorToast=function(message){
        if(typeof message==="object")message=JSON.stringify(message);
        $rootScope.showMessageToast(message, "error");
    };

    $rootScope.sucessToast=function(message){

        if(typeof message==="object")message=JSON.stringify(message);
        $rootScope.showMessageToast(message, "success");
    };


    $rootScope.getProfile=function(fn){
        CompanyService.profile().get({},function(result){
            if(result.error)
                return console.log(result.error);
            
            $rootScope.formatProfile(result.data, fn);

        }, function(){

        });
    }


    $rootScope.formatProfile=function(data, fn){


        if(data.scheduleActivity){
            data.scheduleActivity.forEach(function(schedule){
                schedule.initial=new Date(schedule.initial);
                schedule.end=new Date(schedule.end);

            });
        }
        fn(data);

    }
    
    $rootScope.isState=function(state){
        return $state.is(state);
    }
});
