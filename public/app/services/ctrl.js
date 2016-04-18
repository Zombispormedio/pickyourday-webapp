webAppController.ServicesCtrl = function ($rootScope,$scope, CompanyService,  $mdSidenav, $mdDialog, $mdComponentRegistry) {

    var self=this;
    var servicesByCategoryArray=[];
    $scope.serviceSelected = {};

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
        CompanyService.services().get({},function(result){
            if(result.error)
                return console.log(result.error);
            $scope.services=result.data;
            $scope.getServicesByCategory();
            console.log($scope.services);
        }, function(){

        });
    }
    

    $scope.getServicesByCategory = function(){
        CompanyService.servicesByCategory().list({category: $scope.profile.category._id},function(result){
          if(result.error)
            return console.log(result.error);
          $scope.servicesByCategory=result.data;
          
          servicesByCategoryArray = $scope.servicesByCategory;
          console.log(servicesByCategoryArray);
;        }, function(){

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

    
    /*New Service*/
    this.createService = function(service){
        CompanyService.service().create(service, function(result){
            if(result.error)
                return console.log(result.error);
            console.log(result)
            $scope.service=result.data;
            $scope.showCreateAlert();            
        }, function(){});
    }

    $scope.showCreateAlert = function(){
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('')
            .textContent('¡Servicio creado correctamente!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        )
        .then(function() {          
           window.location.reload();
        }, function() {
            $scope.status = 'You cancelled the dialog.';
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
            console.log($scope.service);
        };
        $scope.update = function(idService){
            console.log(idService);
            var serviceSelected = _.find(servicesByCategoryArray, function(item){
                return item._id == idService;
            })
            service.price = serviceSelected.price;
            service.duration = serviceSelected.duration;
            service.id_name = serviceSelected._id;
            service.name = serviceSelected.name;
        };        
    }

    /*Modify service*/
    this.modifyService = function(service){
        console.log(service._id);
        CompanyService.services().update({id:service._id},service,function(result){
            if(result.error)
                return console.log(result.error);
            console.log(result)
            $scope.service=result.data;
            $scope.showEditAlert();
        }, function(){

        });
    }

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

    $scope.showEditAlert = function() {
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('')
                .textContent('¡Servicio modificado correctamente!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
        };
    
    /*Delete*/      
    $scope.delete=function(index){
        CompanyService.services().delete({id:$scope.services[index]._id}, function(result){
            if(result.error)
                return console.log(result.error);
            $scope.services.splice(index,1);
            $scope.showDeleteAlert();            
        }, function(){    

        });
    }

    $scope.showDeleteAlert = function() {
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