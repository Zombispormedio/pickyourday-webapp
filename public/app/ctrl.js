webAppController.AppCtrl = function ($rootScope, $scope, CompanyService, $interval) {

    $scope.listPicks=function(){
        CompanyService.picks().list({}, {}, function(res){
            $scope.picks=res.data;
            console.log($scope.picks);
        }, function(){


        });
    };


    $interval(function(){
        $scope.listPicks();

    }, 3000);

 $scope.listPicks();
};
