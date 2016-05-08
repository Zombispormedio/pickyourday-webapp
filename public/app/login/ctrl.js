webAppController.LoginCtrl = function ($rootScope, $scope, OauthService, ConfigService) {

    $scope.error="";
    $scope.user = {email:"", };

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
                return $rootScope.warningToast(err);
            }
            saveLocal("user", user);
            $rootScope.go("app.dashboard");
        });
    };

    $scope.register = function(){

    }

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
