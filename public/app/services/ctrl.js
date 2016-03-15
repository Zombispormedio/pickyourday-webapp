webAppController.ServicesCtrl = function ($rootScope,$scope, CompanyService,  $mdSidenav, $mdDialog, $mdComponentRegistry) {

    var self=this;

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
            $scope.getServicesByCategory();
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

    $scope.showDialog = function(ev,services){      
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/services/newService.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
            servicesByCategory: $scope.servicesByCategory,
            service: services||{}
         },                 
        })
        .then(function(service) {          
                self.createService(service);               
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    };

    $scope.showEditDialog = function(ev,services){      
        $mdDialog.show({
            controller: EditDialogController,
            templateUrl: 'app/services/editService.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
            service: services||{}
         },                 
        })
        .then(function(service) {
            self.modifyService(service);
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    };

    function DialogController($scope, $mdDialog,servicesByCategory,service) {        
        $scope.servicesByCategory = servicesByCategory;
        $scope.service = service;

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function() {
            $mdDialog.hide($scope.service);
        };
    }

    function EditDialogController($scope, $mdDialog,service) {        
        $scope.service = service;

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function() {
            $mdDialog.hide($scope.service);
        };
    }

    this.createService = function(service){
        CompanyService.service().create({id:service._id},service, function(result){
            if(result.error)
                return console.log(result.error);
            console.log(result)
            $scope.service=result.data;
        }, function(){

        });
    }
    this.modifyService = function(service){
        console.log(service._id);
        CompanyService.services().update({id:service._id},service,function(result){
            if(result.error)
                return console.log(result.error);
            console.log(result)
            $scope.services=result.data;
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