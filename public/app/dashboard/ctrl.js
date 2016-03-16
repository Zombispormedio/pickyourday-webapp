webAppController.DashboardCtrl = function ($scope, CompanyService) {
	
    this.getTimeline = function (){
	  	CompanyService.timeline().get({rangeDays:1},function(result){
	  		
	      if(result.error)
	        return console.log(result.error);
	      $scope.timeline=result.data;
	      console.log($scope.timeline);
	    }, function(){

	    });
  	}	
  	this.getTimeline();  	
};