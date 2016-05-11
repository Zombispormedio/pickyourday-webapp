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

    $scope.getProfile=function(){
        $rootScope.getProfile(function(data){
        $scope.profile=data;

        if($scope.profile.state == "active"){
            document.getElementById("state").className="fa fa-check";
            document.getElementById("state").title = 'Activada';

        }else if($scope.profile.state == "demo"){
            document.getElementById("state").className="fa fa-eye";
            document.getElementById("state").title = 'Modo demo';
            document.getElementById("request").style.display='block';
            document.getElementById("request").className="requestButton menuIcon fa fa-paper-plane";

        }else if($scope.profile.state == "pending"){
            document.getElementById("state").className="fa fa-clock-o";
            document.getElementById("state").title = 'Pendiente de confirmación';

        }else if($scope.profile.state == "refused"){
            document.getElementById("state").className="fa fa-ban";
            document.getElementById("state").title = 'Cancelada';
        }

        });
    }
    $scope.getProfile();

    $scope.sendRequest = function (){
        
        $scope.profile.state = "active";
        $scope.saveChanges();
        window.location.reload();
    }

    $scope.edit=function(){
        $scope.editable=true;
    }

    $scope.cancel = function(){
        window.location.reload();
          $scope.editable=false;
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
            $rootScope.formatProfile(result.data,function(data){
                $scope.profile=data;
            });
            
            $rootScope.sucessToast("Los datos se han guardado correctamente");
            $scope.editable=false;
        }, function(){

        });
    }

    $scope.addSchedule=function(){
        var week=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        var init=new Date();
        init.setMonth(0);
        init.setDate(1);

        var end=new Date();
        end.setMonth(11);
        end.setDate(31);

        var obj={
            initial:init, end:end,
            week:week.map(function(a){return {times: [], day:a};})
        };

        if(!$scope.profile.scheduleActivity)  $scope.profile.scheduleActivity=[];
        $scope.profile.scheduleActivity.push(obj);

    }

    $scope.checkSchedules=function(){
        var empty=true;
        if($scope.profile){
            if(!$scope.profile.scheduleActivity){
                empty=false;
            }else{
                if($scope.profile.scheduleActivity.length===0){
                    empty=false;
                }
            } 
        }else{
            empty=false;
        }
        return empty;
    }

    $scope.checkKeywords=function(){
        var empty=true;
        if($scope.profile){
            if(!$scope.profile.keywords){
                empty=false;
            }else{
                if($scope.profile.keywords.length===0){
                    empty=false;
                }
            } 
        }else{
            empty=false;
        }
        return empty;
    }

    $scope.checkTime=function(daytime){
        var regexHour="(2[0-3]|1[0-9]|0[0-9]|[0-9]):([0-5][0-9])";
        var current=daytime.times.pop();

        var valid=(new RegExp("^"+regexHour+"-"+regexHour+"$")).test(current);
        
        var elems=current.split("-");
        valid=valid&&compareHourString(elems[0], elems[1]);
     
        if(valid){
            var len=daytime.times.length;
            if(len>0){

                var last=daytime.times[len-1].match(new RegExp(regexHour+"$"))[0];  
                var current_d=current.match(new RegExp("^"+regexHour))[0];            
               
                if(compareHourString(last, current_d)){                
                    daytime.times.push(current);
                }
            }else{
                daytime.times.push(current);
            }
        }
    }
    $scope.setPremium = function(){
        console.log($scope.typePremium);
        CompanyService.premium().set({premium:$scope.typePremium},function(result){
            if(result.error)
                return console.log(result.error);
            $scope.premium = result.data;
            console.log($scope.premium)
            window.location= $scope.premium;
        }, function(){

        });
    }
};
