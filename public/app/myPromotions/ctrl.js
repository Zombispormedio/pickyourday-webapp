webAppController.promotionCtrl = function ($rootScope, $scope, CompanyService, SystemService) {
	$scope.error="";
	$scope.promotion = {images:[]};
	$scope.images={};

	this.getPromotions=function () {
		CompanyService.promotion().get({}, function(result){
			if(result.error)
				return console.log(result.error);
			$scope.promotion=result.data;
			
		}, function(){		
				
		});			
	}
	this.getPromotions();
	$scope.goToNewPromotion=function(){
		$rootScope.go("app.newPromotion");
	}
};