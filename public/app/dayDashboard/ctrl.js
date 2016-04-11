webAppController.DayDashboardCtrl = function ($scope, CompanyService) {

	this.getEmployees=function(){
		CompanyService.employees().get({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.employees=result.data;
			console.log($scope.employees);
		}, function(){

		});
	}
	this.getEmployees();

    $scope.showInfo=function(employee){
		
		if(employee.open==true){
			employee.open=false;
		}else{
			$scope.employees.forEach(function(e){
				e.open=false;
			})
			employee.open=true;
		}			
	}

  $scope.getDate=function(){
  	var f = new Date();
	var d= f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
	document.getElementById("date").innerHTML=d;
	window.alert(d);
  }
};
