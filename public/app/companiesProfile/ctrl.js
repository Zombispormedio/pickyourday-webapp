webAppController.companiesProfileCtrl = function ($scope, CompanyService) {

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
		var deleteButtons = document.getElementsByClassName("deleteImageIcon");
	
		var i;
		for (i = 0; i<deleteButtons.length; i++) {
			deleteButtons[i].style.display="inline";
		};
		var deletePhones = document.getElementsByClassName("deletePhoneIcon");
	
		var j;
		for (j = 0; j<deletePhones.length; j++) {
			deletePhones[j].style.display="inline";
		};
		document.getElementById("saveProfile").style.display="inline";
		document.getElementById("addPhone").style.display="inline";		
		document.getElementById("addImage").style.display="inline";			
		document.getElementById("editProfile").style.display="none";
		
	}

};
