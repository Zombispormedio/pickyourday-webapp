webAppController.newPromotionCtrl = function ($rootScope, $scope, CompanyService, SystemService,$mdDialog) {
	$scope.error="";
	$scope.promotion = {images:[]};
	$scope.images={};

	$scope.create = function () {
		CompanyService.promotion().create({}, $scope.promotion, function(result){
			if(result.error)
				return console.log(result.error);
			$scope.promotion=result.data;
			console.log($scope.promotion);
			$rootScope.go("app.promotions");
			
		}, function(){		
				
		});			
	}

	$scope.showCreateAlert = function(){
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('')
            .textContent('Promoción creada correctamente!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        )
        .then(function() {          
           $rootScope.go("app.promotions");
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    }
	$scope.addImages=function(){
		document.getElementById("newFile").click();		
	}
	$scope.$watch("images.data",function(){
		var data=$scope.images.data; 
		if(data){
			SystemService.images().upload({type:"data"}, data, function(res){
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
	this.getServices();
	
};