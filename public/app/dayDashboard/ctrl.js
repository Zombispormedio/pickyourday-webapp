webAppController.DayDashboardCtrl = function ($scope, CompanyService) {

	this.getResources=function(){
		CompanyService.resources().get({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.resources=result.data;
		}, function(){

		});
	}
	this.getResources();
    
};
