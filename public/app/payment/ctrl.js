webAppController.PaymentCtrl = function ($stateParams, CompanyService){
    console.log($stateParams);
    var idPayment = $stateParams.paymentId;
    var t = $stateParams.token;
    var idPayer = $stateParams.PayerID;

     var doPayment = function(){
    	CompanyService.pay().set({paymentId: idPayment,token:t,PayerID:idPayer},function(result){
			if(result.error){
				return console.log(result.error);
			}else{
				$scope.pay=result.data;	
				console.log($scope.pay);
			}		
		}, function(){
		});
    }
    doPayment();
}