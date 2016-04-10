webAppController.OwnPickCtrl = function ($rootScope, $scope, CompanyService){
	this.getServices=function(){
		CompanyService.services().get({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.services=result.data;
		}, function(){

		});

	}
	this.getServices();

	this.getEmployees=function(){
		CompanyService.employees().get({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.employees=result.data;
		}, function(){
	
		});
	}
	this.getEmployees();
	
	/*$scope.msg="";
    $scope.selectedDate = null;
    $scope.firstDayOfWeek = 0;
    $scope.setDirection = function(direction) {
      $scope.direction = direction;
    };
    $scope.dayClick = function(date) {
      $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
    };
    $scope.prevMonth = function(data) {
      $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    };
    $scope.nextMonth = function(data) {
      $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
    };

    $scope.setDayContent = function(date) {
      // You would inject any HTML you wanted for
      // that particular date here.
        return "<p></p>";
    };*/
	
}