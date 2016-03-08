webAppController.PromotionCtrl = function ($rootScope, $scope, CompanyService, SystemService,$mdDialog) {
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
	$scope.edit=function(index){
		$rootScope.go("app.editPromotion", {id:$scope.promotions[index]._id});
	}
	$scope.delete=function(index){
		CompanyService.promotion().delete({id:$scope.promotions[index]._id}, function(result){
			if(result.error)
				return console.log(result.error);
			//$scope.promotions.splice(index,1);
			$scope.showAlert();
			$rootScope.go("app.promotions");
		}, function(){		
				
		});
	}
	$scope.showAlert = function() {
    $mdDialog.show(
      	$mdDialog.alert()
	        .parent(angular.element(document.querySelector('#popupContainer')))
	        .clickOutsideToClose(true)
	        .title('')
	        .textContent('¡Promoción eliminada correctamente!')
	        .ariaLabel('Alert Dialog Demo')
	        .ok('OK')
	    );
  	};
};