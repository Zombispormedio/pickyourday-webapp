webAppController.newPromotionCtrl = function ($rootScope, $scope, CompanyService, SystemService) {
	$scope.error="";
	$scope.promotion = {images:[]};
	$scope.images={};

	$scope.create = function () {
		CompanyService.promotion().create({}, $scope.promotion, function(result){
			if(result.error)
				return console.log(result.error);
			$scope.promotion=result.data;
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
	        .textContent('¡Los cambios han sido guardados!')
	        .ariaLabel('Alert Dialog Demo')
	        .ok('OK')
	    );
  	};
	$scope.addImages=function(){
		document.getElementById("newFile").click();		
	}
	$scope.$watch("images.data",function(){
		var data=$scope.images.data; 
		console.log(data);    
		if(data){
			SystemService.images().upload({type:"data"}, data, function(res){
				console.log($scope.promotion);
				$scope.promotion.images.push(res.data);

			})
		}   
	})
	$scope.deleteImage=function(index){
		$scope.promotion.images.splice(index,1);
	}
	this.getServices=function(){
		CompanyService.services().get({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.services=result.data;
		}, function(){

		});
	}
	$scope.$watch("promotion.services",function(){
		console.log($scope.promotion.services);
	})
	this.getServices();
};