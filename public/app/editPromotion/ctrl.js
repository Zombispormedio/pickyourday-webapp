webAppController.editPromotionCtrl = function ($rootScope, $scope, CompanyService, SystemService,$mdDialog,$stateParams) {
	$scope.error="";
	$scope.promotion = {images:[]};
	$scope.images={};
	$scope.loading = true;

	this.getPromotion = function () {
		CompanyService.promotion().get($stateParams, function(result){
			if(result.error)
				return console.log(result.error);
			$scope.loading = false;
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
           	window.location.reload();
        }, function(){

        });
    }
	$scope.addImages=function(){
		document.getElementById("newFile").click();		
	}
	$scope.$watch("images.data",function(){
		var data=$scope.images.data; 
		$scope.loading = true;  
		if(data){
			SystemService.images().upload({type:"data"}, data, function(res){
				$scope.promotion.images.push(res.data);
			})
			$scope.loading = false;
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
			console.log($scope.services);
		}, function(){

		});
	}	
	this.getServices();
};