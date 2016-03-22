webAppController.SettingsCtrl = function ($scope, CompanyService,  clipboard){

    var _credentials=function(result){

        if(result.error)
            return console.log(result.error);

        if(result.data.secret_token && result.data.access_token){
            $scope.credentials=result.data;
        }
    };

    function getCredentials(){
        CompanyService.developer().get(_credentials,function(){});
    }

    getCredentials();


    $scope.createOrUpdate=function(){
        CompanyService.developer().updateOrCreate(_credentials, function(){});
    }
    
     $scope.clickHandler = function (text) {
            clipboard.copyText(text);
        };

}