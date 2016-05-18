webAppController.StatsCtrl =function($rootScope, $scope){
    
    
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    
    
};