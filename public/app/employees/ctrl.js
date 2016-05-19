webAppController.EmployeesCtrl = function ($rootScope, $scope, CompanyService,  $mdDialog) {
	
	var self=this;
	$scope.loading=true;
	

	this.getEmployees=function(){
		CompanyService.employees().get({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.loading=false;
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

	$scope.showDialog = function(ev, employees,services) {
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: 'app/employees/newEmployee.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	       locals: {
           	services: $scope.services,
           	employee: employees||{}
         },
	    })
        .then(function(employee) {
      		self.createEmployee(employee);
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
  	}

  	$scope.showEditDialog = function(ev, employees) {
	    $mdDialog.show({
	      controller: EditDialogController,
	      templateUrl: 'app/employees/editEmployee.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	       locals: {
           	services: $scope.services,
           	employee: employees||{}
         },
	    })
        .then(function(employee) {
      		self.modifyEmployee(employee);
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });

  	}


	function DialogController($scope, $mdDialog, services,employee) {
		$scope.services = services;
		$scope.employee = employee;

		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.answer = function(employee) {
			$mdDialog.hide($scope.employee);
		};
	}
	function EditDialogController($scope, $mdDialog,employee,services) {
		$scope.employee = employee;
		$scope.services=services;

		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.answer = function(employee) {
			$mdDialog.hide($scope.employee);
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

	this.createEmployee = function(employee){
		CompanyService.employees().create({},employee,function(result){
			if(result.error)
				return console.log(result.error);
			console.log(result)
			$scope.employees=result.data;
			$scope.showCreateAlert();
		}, function(){

		});
	}

	this.modifyEmployee = function(employee){
		console.log(employee)
		CompanyService.employees().update({id:employee._id},employee,function(result){
			if(result.error)
				return console.log(result.error);
			$scope.employees=result.data;
			$scope.showModifyAlert();
		}, function(){

		});
	}
	$scope.delete = function(employee){
		CompanyService.employees().delete({id:employee._id}, function(result){
            if(result.error)
                return console.log(result.error);
            $scope.employees=result.data;
            $scope.showDeleteAlert();
        }, function(){    

        });
	}
	$scope.showDeleteAlert = function() {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('')
            .textContent('¡Empleado eliminado correctamente!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
    };
    $scope.showModifyAlert = function() {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('')
            .textContent('¡Empleado modificado correctamente!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
    };
    
    $scope.showCreateAlert = function() {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('')
            .textContent('¡Empleado creado correctamente!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
    };
};