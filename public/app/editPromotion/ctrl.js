webAppController.editPromotionCtrl = function ($rootScope, $scope, CompanyService, SystemService,$mdDialog,$stateParams) {
	$scope.error="";
	$scope.promotion = {images:[]};
	$scope.images={};

	this.getPromotion = function () {
		CompanyService.promotion().get($stateParams, function(result){
			if(result.error)
				return console.log(result.error);
			$scope.promotion=result.data;			
		}, function(){		
				
		});			
	}
	this.getPromotion(); 

	$scope.saveChanges=function(promotion){
        CompanyService.promotion().update({id:promotion._id},promotion,function(result){
            if(result.error)
                return console.log(result.error);
            $scope.promotion=result.data;
           	//$rootScope.sucessToast("Los datos se han guardado correctamente");
           	$scope.showAlert(); 
           	$rootScope.go("app.promotions");  
        }, function(){

        });
    }
	$scope.addImages=function(){
		document.getElementById("newFile").click();		
	}
	$scope.$watch("images.data",function(){
		var data=$scope.images.data; 
		console.log(data);    
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
	$scope.showEditAlert = function(){
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('')
            .textContent('¡Promoción modificada correctamente!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        )
        .then(function() {          
           window.location.reload();
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    }
};