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

    this.getProfile=function(){
    CompanyService.profile().get({},function(result){
      if(result.error)
        return console.log(result.error);
      $scope.profile=result.data;
    }, function(){

    });
  }
  this.getProfile();

  $scope.getDate=function(){
  	var f = new Date();
	var d= f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
	document.getElementById("date").innerHTML=d;
	window.alert(d);
  }  	
};
