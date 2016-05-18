webAppController.StatsCtrl =function($rootScope, $scope){
    
    
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    
    
    $scope.back=function(){
        $rootScope.go("app.dashboard");
    }
};