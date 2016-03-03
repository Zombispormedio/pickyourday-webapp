webAppController.AppCtrl = function ($rootScope,$scope, $mdSidenav,CompanyService) {

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

  this.getProfile=function(){
    CompanyService.profile().get({},function(result){
      if(result.error)
        return console.log(result.error);
  
      $scope.profile=result.data;
            $scope.profile.first_word="Q";
    }, function(){

    });
  }
  this.getProfile();
};
