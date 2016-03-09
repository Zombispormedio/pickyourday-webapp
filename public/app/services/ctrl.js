webAppController.ServicesCtrl = function ($scope, CompanyService,  $mdSidenav, $mdDialog, $mdComponentRegistry) {

    $scope.isOpen = function() { return $mdSidenav('right').isOpen(); };
  
    
  
    this.getServices=function(){
        CompanyService.services().get({},function(result){
            if(result.error)
                return console.log(result.error);
            $scope.services=result.data;
        }, function(){

        });
    }
    this.getServices();

    /*$scope.getServicesByCategory = function(){
    CompanyService.servicesByCategory().get({category: $scope.profile.category._id},function(result){
      if(result.error)
        return console.log(result.error);
      $scope.servicesByCategory=result.data;
    }, function(){

    });
  }
  $scope.getServicesByCategory();*/

    $scope.getResourcesByServices = function(){
        CompanyService.resourcesByServices().list({service:$scope.selectedService},function(result){
            if(result.error)
                return console.log(result.error);
            $scope.resourcesByServices=result.data[0];

        },function(){

        });
    }

    $scope.resourcesView = function(index) {
            
        $mdSidenav('right').toggle();
        
        $scope.selectedService = $scope.services[index]._id;
        $scope.getResourcesByServices();
    };
    
      $scope.$watch("isOpen()", function(){
           $scope.selectedService=null;
    });



    $scope.toggle = function(resourceByService){

        CompanyService.toggleService().change({},{resource:resourceByService.resource_id,service:$scope.selectedService},function(result){
            if(result.error)
                return console.log(result.error);

        });

    }
    $scope.showTabDialog = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/services/newService.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        })
            .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }

    $scope.delete=function(index){
        CompanyService.services().delete({id:$scope.services[index]._id}, function(result){

            if(result.error)
                return console.log(result.error);
            $scope.promotions.splice(index,1);
            $scope.showAlert();
            $rootScope.go("app.services");
        }, function(){    

        });
    }
    $scope.showAlert = function() {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('')
            .textContent('¡Servicio eliminado correctamente!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
    };
}