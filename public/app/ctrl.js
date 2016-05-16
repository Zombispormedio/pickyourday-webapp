webAppController.AppCtrl = function ($rootScope,$scope, $mdSidenav,CompanyService, OauthService) {

  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };

  $scope.closeLeftMenu = function(){
     $mdSidenav('left').close();
  }
  $scope.logout = function () {  

	OauthService. logout().Session(function(){
		 deleteLocal("user");
        $rootScope.go("login");   
	}, function(){});
          
    };

   $scope.resourcesView = function() {
    $mdSidenav('right').toggle();
  };

  this.getProfile=function(){
      
      $rootScope.getProfile(function(data){
          $scope.profile=data;
            $scope.profile.first_word="Q";
            if($scope.profile.premium == true){
        document.getElementById("logoPremium").style.display='block';
      }
      });
      
  }
  this.getProfile();
};
