webAppController.MessageToastCtrl=function($scope, data){
    $scope.message=data.message;
    $scope.theme=data.theme?"toast-theme-"+data.theme:"";
}