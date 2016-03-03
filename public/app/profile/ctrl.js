webAppController.ProfileCtrl = function ($rootScope,$scope, CompanyService, SystemService,$mdDialog, NgMap) {

    $scope.editable=false;	

    $scope.aux={phone:"",emailSecond:""};
    $scope.images={};
    $scope.dateTime=new Date();
    $scope.date=new Date();




    NgMap.getMap().then(function(map) {
        var marker=map.markers[0];


        marker.addListener('dragend', function() {

            var loc=marker.getPosition();

            $scope.$apply(function () {
                $scope.profile.location.geolocation.latitude=loc.lat();
                $scope.profile.location.geolocation.longitude=loc.lng();
            });



        });

    });



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

        if($scope.aux.phone!=""){
            $scope.profile.phone.push($scope.aux.phone);
            $scope.aux.phone="";
        }

    }
    $scope.deletePhone=function(index){
        $scope.profile.phone.splice(index,1);
    }
    $scope.addEmailSecond=function(){

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
                return  $rootScope.errorToast(result.error);
            $scope.profile=result.data;
            $rootScope.sucessToast("Los datos se han guardado correctamente");
            $scope.editable=false;
        }, function(){

        });
    }

};
