webAppController.EmployeesCtrl = function ($rootScope, $scope, CompanyService,  $mdDialog) {

	this.getEmployees=function(){
		CompanyService.employees().get({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.employees=result.data;
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

	$scope.showDialog = function(ev) {
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: 'app/employees/newEmployee.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true
	    })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
  	}


	function DialogController($scope, $mdDialog) {
		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};
	}
	this.getServices=function(){
		CompanyService.services().get({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.services=result.data;
			console.log($scope.services);
		}, function(){

		});
	}
	this.getServices();
};