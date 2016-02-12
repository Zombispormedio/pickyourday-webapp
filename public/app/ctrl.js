webAppController.AppCtrl = function ($scope, $mdSidenav) {

  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };
};
