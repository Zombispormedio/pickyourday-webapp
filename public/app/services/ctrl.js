webAppController.servicesCtrl = function ($scope, CompanyService,  $mdSidenav) {
    
    this.getServices=function(){
		CompanyService.services().get({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.services=result.data;
		}, function(){

		});

	}
	this.getServices();

	$scope.resourcesView = function() {
    	$mdSidenav('right').toggle();
  };
};
