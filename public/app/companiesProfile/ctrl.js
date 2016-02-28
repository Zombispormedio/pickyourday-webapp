webAppController.companiesProfileCtrl = function ($scope, CompanyService, SystemService,$mdDialog) {

	$scope.editable=false;	
	$scope.add1=false;	
	$scope.add2=false;	
	$scope.aux={phone:"",emailSecond:""};
	$scope.images={};
	$scope.dateTime=new Date();
	$scope.date=new Date();
    
	this.getProfile=function(){
		CompanyService.profile().get({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.profile=result.data;
		}, function(){

		});
	}
	this.getProfile();

	$scope.edit=function(){
		$scope.editable=true;
	}
	$scope.addPhone=function(){
		$scope.add1=true;	
		if($scope.aux.phone!=""){
			$scope.profile.phone.push($scope.aux.phone);
			$scope.aux.phone="";
		}

	}
	$scope.deletePhone=function(index){
		$scope.profile.phone.splice(index,1);
	}
	$scope.addEmailSecond=function(){
		$scope.add2=true;	
		if($scope.aux.emailSecond!=""){
			$scope.profile.emailSecond.push($scope.aux.emailSecond);
			$scope.aux.emailSecond="";
		}
	}
	$scope.deleteEmailSecond=function(index){
		$scope.profile.emailSecond.splice(index,1);
	}
	$scope.addImages=function(){
		document.getElementById("newFile").click();		
	}
	$scope.$watch("images.data",function(){
		var data=$scope.images.data;     
		if(data){
			SystemService.images().upload({type:"data"}, data, function(res){
				$scope.profile.images.push(res.data);
			})
		}   
	})
	$scope.deleteImage=function(index){
		$scope.profile.images.splice(index,1);
	}
	$scope.saveChanges=function(){
		CompanyService.profile().update({},$scope.profile,function(result){
			if(result.error)
				return console.log(result.error);
			$scope.profile=result.data;
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
};
