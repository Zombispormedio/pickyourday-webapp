webAppController.LoginCtrl = function ($rootScope, $scope, OauthService ) {
document.body.classList.add("backgroundLogin");
    $scope.error="";
    $scope.user = {};
    $scope.login = function () {
        OauthService.login().Session($scope.user, function(res){
            if (!res.error) {
                saveLocal("user", res.data);
                $rootScope.go("app");
            } else {
                $rootScope.error(res.error);
            }
        }, function(){
            
        });

    };


};
