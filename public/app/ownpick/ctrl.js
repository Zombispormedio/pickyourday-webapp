webAppController.OwnPickCtrl = function ($rootScope, $scope, CompanyService,$mdDialog){
	
	$scope.client={};

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

	var serviceSelected = "";
	var resourceSelected = "";
	var nullService=false;

	$scope.getTimeline = function (service, employee, date){
		serviceSelected = service._id;
		
		if(service!=null){
			if(employee!=null){
				CompanyService.timeline().get({service:service._id, resource:employee._id,rangeDays:30,date:date},function(result){
			  		
			  		if(result.error)
				    	return console.log(result.error);
				    $scope.timeline=result.data;
					console.log(result.data);
				    $scope.calcSpaces(result.data[0].metadata.schedule[0].open, result.data[0].metadata.schedule[0].close);	
				    if(nullService==true)
				    	$("#selectService").children().css("border-bottom-color", "rgba(0, 0, 0, 0.12)");	      
			    	}, function(){ });
			}else{
				CompanyService.timeline().get({service:service._id,rangeDays:30,date:date},function(result){
			  		if(result.error)
				    	return console.log(result.error);
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

	$scope.spaces = [];

  	$scope.calcSpaces = function(o, c){

  		var open = new Date(o);
  		var close = new Date(c);

  		var openH = open.getHours();
  		var openM = open.getMinutes();
  		var closeH = close.getHours();
  		var closeM = close.getMinutes();

  		var spaces = Math.floor(((closeH*60+closeM) - (openH*60+openM))/30);

  		var aux = [];

  		for(var i=0; i<spaces-1; i++){
  			if(i>0)
  				open.setMinutes(open.getMinutes() + 30);

  		  if(i<spaces-2)
  				aux.push(open.toTimeString().replace(/.*(\d{2}:\d{2})(:\d{2}).*/, "$1"));
  			else
  				$scope.lastHour = open.toTimeString().replace(/.*(\d{2}:\d{2})(:\d{2}).*/, "$1");
  		}
  		$scope.spaces = aux;
  	}	
  	
  	$scope.showDialog = function(ev, r, employee) {
  		resourceSelected = employee.id;
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: 'app/ownpick/newPick.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true
	    })
        .then(function(client) {
      		$scope.createPick(r,client);
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
		CompanyService.pick().create({service: serviceSelected,initDate:datePick,nameCli,phoneCli,resource:resourceSelected},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.showAlert();
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
        );
    };
}