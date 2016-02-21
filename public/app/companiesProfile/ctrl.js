webAppController.companiesProfileCtrl = function ($scope, CompanyService) {

	$scope.dateTime=new Date();
	$scope.date=new Date();
    
	this.getProfile=function(){
		CompanyService.profile().get({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.profile=result.data;
		}, function(){

		});
	}
	this.getProfile();
};
