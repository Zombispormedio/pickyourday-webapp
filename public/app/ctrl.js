webAppController.AppCtrl = function ($scope, $mdSidenav) {

	$scope.isOpen = false;
	
    $scope.openMenu = function (){
    	 return $mdSidenav('left').isOpen();
    }
};
