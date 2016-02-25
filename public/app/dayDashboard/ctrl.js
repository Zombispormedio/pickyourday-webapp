webAppController.DayDashboardCtrl = function ($scope, CompanyService) {

	this.getEmployees=function(){
		CompanyService.employees().get({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.employees=result.data;
		}, function(){

		});
	}
	this.getEmployees();
    
};
