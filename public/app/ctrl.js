webAppController.AppCtrl = function ($rootScope,$scope, $mdSidenav) {

  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };

  $scope.logout = function () {        
        deleteLocal("user");
        $rootScope.go("login");      
    };

   $scope.resourcesView = function() {
    $mdSidenav('right').toggle();
  };
};
