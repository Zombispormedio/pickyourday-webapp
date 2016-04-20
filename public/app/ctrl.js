webAppController.AppCtrl = function ($rootScope,$scope, $mdSidenav,CompanyService) {

  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };

  $scope.closeLeftMenu = function(){
     $mdSidenav('left').close();
  }
  $scope.logout = function () {        
        deleteLocal("user");
        $rootScope.go("login");      
    };

   $scope.resourcesView = function() {
    $mdSidenav('right').toggle();
  };

  this.getProfile=function(){
      
      $rootScope.getProfile(function(data){
          $scope.profile=data;
            $scope.profile.first_word="Q";
      });
  }
  this.getProfile();
};
