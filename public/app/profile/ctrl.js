webAppController.ProfileCtrl = function ($rootScope, $scope, CompanyService, SystemService,$mdDialog, NgMap) {

    $scope.editable=false;	
    
    $scope.days={"Monday":"Lunes", "Tuesday": "Martes", "Wednesday":"Miércoles", "Thursday": "Jueves", "Friday":"Viernes", "Saturday":"Sábado", "Sunday":"Domingo"};

    var submitInitDate=function(){
        var minDate=new Date();
        minDate.setHours(0);
        minDate.setMinutes(0);
        $scope.minDate=minDate;
    }
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
                return console.log(result.error);
            $scope.profile=result.data;
            $rootScope.sucessToast("Los datos se han guardado correctamente");
            $scope.editable=false;
        }, function(){

        });
    }

    $scope.addInterval=function(){
        var week=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


        var init=new Date();
        init.setMonth(0);
        init.setDate(1);

        var end=new Date();
        end.setMonth(11);
        end.setDate(1);
        
        
        var obj={
            initial:init, end:end,
            week:week.map(function(a){return {times: [], day:a};})
        };

        $scope.profile.intervalTable.push(obj);

    }
    
    $scope.addTime=function(interval, index){
        var initHour=new Date();
        initHour.setHours(8);
        initHour.setMinutes(0);
        var endHour=new Date();
        endHour.setHours(17);
        endHour.setMinutes(0);
        
        var t={initial:initHour, end: endHour};
        
        interval.week[index].times.push(t);
    }


};
