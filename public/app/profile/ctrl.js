webAppController.ProfileCtrl = function ($rootScope, $scope, CompanyService, SystemService,$mdDialog, NgMap) {

    $scope.editable=false;	
    $scope.loading = true;

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


    var getLocation = function (cb){
        navigator.geolocation.getCurrentPosition(function(position){
            $scope.$apply(function () {
                cb(position);
            });
        });
    }

    $scope.getProfile=function(){
        $rootScope.getProfile(function(data){
            $scope.profile=data;
                     
            $scope.profile.location=$scope.profile.location || {};

            if($scope.profile.location.geolocation == void 0){
                $scope.profile.location.geolocation = {};
                getLocation(function(position){
                    $scope.profile.location.geolocation.latitude = position.coords.latitude;
                    $scope.profile.location.geolocation.longitude = position.coords.longitude;
                });            
            }

            if($scope.profile.state == "active"){
                document.getElementById("state").className="fa fa-check";
                document.getElementById("state").title = 'Activada';
                document.getElementById("request").style.display='none';

            }else if($scope.profile.state == "demo"){
                document.getElementById("state").className="fa fa-eye";
                document.getElementById("state").title = 'Modo demo';
                document.getElementById("request").style.display='block';
                document.getElementById("request").className="requestButton menuIcon fa fa-paper-plane";

            }else if($scope.profile.state == "pending"){
                document.getElementById("state").className="fa fa-clock-o";
                document.getElementById("state").title = 'Pendiente de confirmación';
                document.getElementById("request").style.display='none';

            }else if($scope.profile.state == "refused"){
                document.getElementById("state").className="fa fa-ban";
                document.getElementById("state").title = 'Cancelada';
                document.getElementById("request").style.display='none';
            }

            if($scope.profile.premium == true || $scope.profile.state =="demo"){
               var p = document.getElementsByClassName("premium");
               for(var i=0;i<p.length;i++){
                    p[i].style.display='none';
               }  

            }
        var premiumDate = $scope.profile.dateExpire;
        var d = premiumDate.split("T");
        $scope.dateExpire = d[0];
        if($scope.profile.premium == true)
            document.getElementById("timePremium").style.display = 'block';
        
        $scope.loading = false;
        var p = document.getElementsByClassName("profileForm");
           for(var i=0;i<p.length;i++){
                p[i].style.display='block';
           } 
        });

       
    }
    $scope.getProfile();

    $scope.sendRequest = function (){
        
        $scope.profile.state = "pending";
        $scope.saveChanges();
        console.log($scope.profile);
    }

    $scope.edit=function(){
        $scope.editable=true;
    }

    $scope.cancel = function(){
        $scope.getProfile();
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
            
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('')
                .textContent('¡Datos guardados correctamente!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
            $scope.editable=false;
            $scope.getProfile();
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
        $scope.loading2 = true;
        CompanyService.premium().set({premium:$scope.typePremium},function(result){
            if(result.error)
                return console.log(result.error);
            $scope.premium = result.data;
            console.log($scope.premium)
            $scope.loading2 = false;
            window.location= $scope.premium;
        }, function(){

        });
    }
};
