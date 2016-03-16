webAppController.DayDashboardCtrl = function ($scope, CompanyService) {

	this.getEmployees=function(){
		CompanyService.employees().get({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.employees=result.data;
			$scope.getTimeline();
		}, function(){

		});
	}
	this.getEmployees();

    

  $scope.getDate=function(){
  	var f = new Date();
	var d= f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
	document.getElementById("date").innerHTML=d;
	window.alert(d);
  }
};
