webAppController.LoginCtrl = function ($rootScope, $scope, OauthService ) {

    $scope.error="";
    $scope.user = {};
    $scope.login = function () {
         $rootScope.showMessageToast();
        OauthService.login().Session($scope.user, function(res){
            if (!res.error) {
                saveLocal("user", res.data);
                $rootScope.go("app.dashboard");
            } else {
               
            }
        }, function(){
            
        });

    };


};
