webAppController.LoginCtrl = function ($mdDialog,$rootScope, $scope, OauthService, ConfigService, CompanyService) {

    $scope.error="";
    $scope.user = {email:"", };

    $scope.goToForgot = function(){
        $rootScope.go("forgot_password");
    }

    $scope.login = function () {
        async.waterfall([
            function validate(next){
                var isEmail=emptyOrUndefined($scope.user.email);
                var isPassword=emptyOrUndefined($scope.user.password);
                if(isEmail || isPassword){
                    if(isEmail){
                        next("Email Empty");
                    }else{
                        if(isPassword){
                           next("Password Empty");
                        }
                    }
                }else{
                    next();
                }
            },
            function login(next){

                OauthService.login().Session($scope.user, function(res){
                    if(res.error)return next(res.error);

                    next(null, res.data);

                }, ConfigService.ServerNotFound(next));

            }, 
            function checkRole(user, next){
                OauthService.role().check({role:user.role}, function(res){
                    if(res.error)return next(res.error);

                    if(res.data==2){

                        next(null, user);
                    }else{
                        ConfigService.NoRoleAuthorized(next)();
                    }

                }, ConfigService.ServerNotFound(next));
            }
        ], function(err, user){
            if(err){
                return $rootScope.warningToast(err.message);
                
            }
            saveLocal("user", user);
            $rootScope.go("app.dashboard");
        });
    };

    $scope.register = function(){
        CompanyService.register().new($scope.company,function(result){
            if(result.error){
                return console.log(result.error);
                $scope.showErrorRegisterAlert();
            }else{
                $scope.company = {};
               $scope.register=result.data;
                console.log($scope.register);
                $scope.showRegisterAlert(); 
            }
        }, function(){

        });
    }
    $scope.showRegisterAlert = function() {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('')
            .textContent('¡Registro correcto!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
    };
    $scope.showErrorRegisterAlert = function() {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('')
            .textContent('¡Ups, error al registrarse!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
    };

    $scope.getCategories = function(){
        OauthService.categories().list({},function(result){
            if(result.error)
                return console.log(result.error);
            $scope.categories=result.data;
            console.log($scope.categories);
        }, function(){

        });
    }
    $scope.getCategories();
};
