webAppController.promotionCtrl = function ($rootScope, $scope, CompanyService) {
	$scope.error="";
	$scope.promotion = {};
	
	$scope.create = function () {
		CompanyService.promotion().create({}, $scope.promotion, function(result){
				var res = result;
				if (!res.error) {

				} else {
					
				}
		}, function(){
			
				
		});
		
	}
};