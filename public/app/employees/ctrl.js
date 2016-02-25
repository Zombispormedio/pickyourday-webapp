webAppController.employeesCtrl = function ($rootScope, $scope, CompanyService) {
	
	this.getEmployees=function(){
		CompanyService.employees().get({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.employees=result.data;
		}, function(){

		});
	}
	this.getEmployees();


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