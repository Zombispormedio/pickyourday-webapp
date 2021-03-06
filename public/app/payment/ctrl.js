webAppController.PaymentCtrl = function (OauthService,$stateParams, CompanyService,$scope, $rootScope){
    var idPayment = $stateParams.paymentId;
    var t = $stateParams.token;
    var idPayer = $stateParams.PayerID;

    $scope.loading = true;

    $scope.doPayment = function(){
    	CompanyService.pay().set({paymentId: idPayment,token:t,PayerID:idPayer},function(result){
			if(result.error){                                
                document.getElementById("paymentError").style.display='flex';
		        $scope.loading=false;
            }else{                
                $scope.loading=false;
               document.getElementById("payment").style.display='flex'; 
               $rootScope.getProfile();	
           }
		});
    }
    $scope.doPayment();
}