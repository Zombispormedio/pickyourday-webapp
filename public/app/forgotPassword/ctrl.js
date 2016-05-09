webAppController.PasswordCtrl = function ($rootScope, $scope, OauthService, ConfigService, $http) {

    $scope.reseting = false;
    $scope.fase1={};
    $scope.fase2={};
    $scope.forgot = function(){
        console.log($scope.fase1);
        OauthService.forgotPassword().set($scope.fase1,function(result){
            if(result.error)
                return console.log(result.error);
            $scope.reseting = true;
        }, function(){

        });
    }
    $scope.reset = function(){
        OauthService.resetPassword().reset($scope.fase2,function(result){
            if(result.error)
                return console.log(result.error);
            $scope.resetPassword=result.data;
            console.log($scope.resetPassword);
            $rootScope.go("login");
        }, function(){

        });
    }
};
