webAppController.ServicesCtrl = function ($rootScope,$scope, CompanyService,  $mdSidenav, $mdDialog, $mdComponentRegistry) {

    $scope.isOpen = function() { return $mdSidenav('right').isOpen(); };
    
    $scope.getProfile=function(){
        CompanyService.profile().get({},function(result){
            if(result.error)
                return console.log(result.error);
            $scope.profile=result.data;
            $scope.getServices();
        }, function(){

        });
    }
    $scope.getProfile();

    $scope.getServices=function(){
        console.log($scope.profile.category._id);
        CompanyService.services().get({},function(result){
            if(result.error)
                return console.log(result.error);
            $scope.services=result.data;
            
        }, function(){

        });
    }
    

    $scope.getServicesByCategory = function(){
        CompanyService.servicesByCategory().list({category: $scope.profile.category._id},function(result){
          if(result.error)
            return console.log(result.error);
          $scope.servicesByCategory=result.data;
          console.log($scope.servicesByCategory);

        }, function(){

        });
    }

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
    
    $scope.$watch("isClose()", function(){
           $scope.selectedService=null;
    });

    $scope.toggle = function(resourceByService){
     
        CompanyService.toggleService().change({},{resource:resourceByService.resource_id,service:$scope.selectedService},function(result){
            if(result.error)
                return console.log(result.error);

        });
    }

    $scope.showTabDialog = function(ev,update) {
        $scope.getServicesByCategory();
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/services/newService.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
            services: $scope.services
         },
        })
        .then(function(answer) {
            if(!update)$scope.createService();
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    };

    function DialogController($scope, $mdDialog,servicesByCategory) {
        $scope.servicesByCategory = servicesByCategory;
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function() {
            $mdDialog.hide();
        };
    }
    this.createService = function(){
        CompanyService.service().create({},function(result){
            if(result.error)
                return console.log(result.error);
            console.log(result)
            $scope.service=result.data;
        }, function(){

        });
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