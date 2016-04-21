webAppController.DashboardCtrl = function ($scope, CompanyService) {
	var self = this;
    this.getTimeline = function (){
	  	CompanyService.timeline().get({rangeDays:1},function(result){
	  		
	      if(result.error)
	        return console.log(result.error);
	      $scope.timeline=result.data;
		  console.log(result.data);
	     $scope.calcSpaces(result.data[0].metadata.schedule[0].open, result.data[0].metadata.schedule[0].close);
	      
	    }, function(){

	    });
  	}	
 	this.getTimeline();  

   /*$interval(function(){
      self.getTimeline();
    },10000)*/

  	$scope.spaces = [];

  	$scope.calcSpaces = function(o, c){

  		var open = new Date(o);
  		var close = new Date(c);

      open.setHours(open.getHours());
      
  		var openH = open.getHours();
  		var openM = open.getMinutes();
  		var closeH = close.getHours();
  		var closeM = close.getMinutes();

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
  		console.log(spaces);
  	}

    /*Day dashboard*/

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
  /**************************************/
};