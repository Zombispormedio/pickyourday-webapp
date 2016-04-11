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



	$scope.getTimeline = function (service, employee, date){
		console.log(service);
		console.log(employee._id);
		console.log(date)
		if(service!=null && employee!=null && date!=null){
		  	CompanyService.timeline().get({service:service.id_name.name, resource:employee._id,rangeDays:1},function(result){
		  		
		      if(result.error)
		        return console.log(result.error);
		      $scope.timeline=result.data;
			console.log(result.data);
		     $scope.calcSpaces(result.data[0].metadata.open, result.data[0].metadata.close);
		      
		    }, function(){

		    });
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
  		console.log(spaces);
  	}	
}