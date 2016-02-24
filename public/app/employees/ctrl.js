webAppController.resourcesCtrl = function ($rootScope, $scope, CompanyService) {
	this.getServices=function(){
		CompanyService.services().get({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.services=result.data;
		}, function(){
	
		});
	}
	this.getServices();
};