webAppController.PromotionCtrl = function ($rootScope, $scope, CompanyService, SystemService) {
	$scope.error="";
	$scope.promotion = {images:[]};
	$scope.images={};

	this.getPromotions=function () {
		CompanyService.promotions().get({}, function(result){
			if(result.error)
				return console.log(result.error);
			$scope.promotions=result.data;
			console.log(result.data);
		}, function(){		
				
		});			
	}
	this.getPromotions();
	$scope.goToNewPromotion=function(){
		$rootScope.go("app.newPromotion");
	}
	$scope.edit=function(){
		$rootScope.go("app.editPromotion");
	}
};