webAppController.OwnPickCtrl = function ($rootScope, $scope, CompanyService,$mdDialog){
	
	$scope.client={};
	$scope.employees = [];
	$scope.loading = true;
	$scope.loading2 = true;
	$scope.actualHour= -1;

	this.getServices=function(){
		CompanyService.services().get({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.loading = false;
			$scope.services=result.data;
		}, function(){

		});

	}
	this.getServices();

	$scope.getEmployees=function(serviceId){
		CompanyService.resourcesByServices().list({service:serviceId},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.loading2 = false;
			$scope.resourcesByServices=result.data[0];
			for(var i=0;i<$scope.resourcesByServices.length;i++){
				if($scope.resourcesByServices[i].asigned == true)
					$scope.employees.push($scope.resourcesByServices[i]);
			}

			console.log($scope.employees);
		}, function(){
	
		});
	}

	var serviceSelected = "";
	var idServiceSelected = -1;
	var idResourceSelected = -1;
	var resourceSelected = "";
	var nullService=false;
	var dateSelected = "";

	$scope.getTimeline = function (service, employee, date){
		serviceSelected = service;
		idServiceSelected = service._id;
		resourceSelected = employee;
		$scope.loading = true;
		if(service!=null){
			if(employee!=null){
				idResourceSelected = employee.id;
				CompanyService.timeline().get({service:idServiceSelected, resource:idResourceSelected,rangeDays:1,date:date},function(result){			  		
			  		if(result.error)
				    	return console.log(result.error);
				    $scope.loading = false;
				    $scope.timeline=result.data;
					console.log(result.data);
				    $scope.calcSpaces(result.data[0].metadata.schedule[0].open, result.data[0].metadata.schedule[0].close);	
				    if(nullService==true)
				    	$("#selectService").children().css("border-bottom-color", "rgba(0, 0, 0, 0.12)");	      
			    	}, function(){ });
			}else{
				CompanyService.timeline().get({service:idServiceSelected,rangeDays:1,date:date},function(result){
			  		if(result.error)
				    	return console.log(result.error);
				    $scope.loading = false;
				    $scope.timeline=result.data;
					console.log(result.data);
				    $scope.calcSpaces(result.data[0].metadata.schedule[0].open, result.data[0].metadata.schedule[0].close);	
				    
				    if(nullService==true)
				    	$("#selectService").children().css("border-bottom-color", "rgba(0, 0, 0, 0.12)");	      
		    	}, function(){ });
			}
		  	
		}else{
			nullService=true;
			$("#selectService").children().css("border-bottom-color", "red");
		}
  	}	

  	$scope.isObject= function(r){
  		return typeof(r);
  	}

	$scope.spaces = [];

  	$scope.calcSpaces = function(o, c){

  		var open = new Date(o);
  		var close = new Date(c);

  		open.setHours(open.getHours());

  		var openH = open.getHours();
  		var openM = open.getMinutes();
  		var closeH = close.getHours();
  		var closeM = close.getMinutes();

  		var dActual = new Date();
      	$scope.actualHour = Math.round((((dActual.getHours()*60)+ dActual.getMinutes()) - ((openH*60)+ openM))/5); 

  		var spaces = Math.floor(((closeH*60+closeM) - (openH*60+openM))/30);

  		var aux = [];

  		for(var i=0; i<=spaces; i++){
  			if(i>0)
  				open.setMinutes(open.getMinutes() + 30);

  		  if(i<=spaces-1)
  				aux.push(open.toTimeString().replace(/.*(\d{2}:\d{2})(:\d{2}).*/, "$1"));
  			else
  				$scope.lastHour = open.toTimeString().replace(/.*(\d{2}:\d{2})(:\d{2}).*/, "$1");
  		}
  		$scope.spaces = aux;
  	}	
  	
  	$scope.showDialog = function(ev, date, employee) {
  		resourceSelected = employee;
  		idResourceSelected = employee.id;
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: 'app/ownpick/newPick.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true
	    })
        .then(function(client) {
      		$scope.createPick(date,client);
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
		$scope.answer = function(client) {
			$mdDialog.hide($scope.client);
		};
	}
	
	
	$scope.createPick = function (datePick,client){
		var nameCli=client.name;
		var phoneCli=client.phone;
		dateSelected = datePick;

		CompanyService.pick().create({service: idServiceSelected,initDate:dateSelected,nameCli,phoneCli,resource:idResourceSelected},function(result){
			if(result.error){
				return console.log(result.error);
			}else{
				$scope.showAlert();
				console.log(serviceSelected);
				console.log(resourceSelected);
				console.log(dateSelected);
				$scope.getTimeline(serviceSelected,resourceSelected,dateSelected);
			}
			
		}, function(){

		});
  	}

  	$scope.showAlert = function() {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('')
            .textContent('¡Pick creado correctamente!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
         )
        .then(function() {  
        	     
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    };
    $scope.showErrorAlert = function() {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('')
            .textContent('¡Ups, algo fue mal! El pick no se ha podido crear')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
         )
        .then(function() {     
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    };
}