webAppController.DashboardCtrl = function ($scope, CompanyService, $mdDialog,$rootScope) {
  var self = this;
  $scope.actualHour= -1;
  $scope.loading=true;
  $scope.loading2=true;

  $scope.getTimeline = function (date, day){  
    $scope.getProfile(function(data){
      $rootScope.profile=data;
      
      if($scope.profile.state!="demo"){
        $scope.loading=true;
        var d = new Date();

        if(date!=null){
          if(day == 'prev'){
            var dPrev = new Date();
            var dayOfMonth = $scope.myDate.getDate();
            dPrev.setDate(dayOfMonth - 1);
            $scope.myDate = dPrev;
          }        
          if(day == 'next'){
            var dNext = new Date();
            var dayOfMonth = $scope.myDate.getDate();
            dNext.setDate(dayOfMonth + 1);
            $scope.myDate = dNext;
          }  

        }else{
          var d = new Date();
          $scope.myDate = d;
        }

        console.log("mydate "+$scope.myDate);
        console.log("d "+d);

        if($scope.myDate.getDate() >= d.getDate() && $scope.myDate.getMonth() >= d.getMonth()){          
          CompanyService.timeline().get({date:$scope.myDate,rangeDays:1},function(result){        
            if(result.error)
              return console.log(result.error);
            $scope.loading=false;

            if($scope.myDate.getDay() == d.getDay()){
              document.getElementById("actualPicks").style.display = 'block';
              $scope.getEmployees();
            }else{
              document.getElementById("actualPicks").style.display = 'none';
            }

            $scope.timeline=result.data;
            $scope.calcSpaces(result.data[0].metadata.schedule[0].open, result.data[0].metadata.schedule[0].close);
              if($scope.timeline.length==0){
                loading = false;
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Dashboard no disponible')
                    .textContent('Asegurate de que tu empresa está configurada correctamente')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Ok!')
                    .targetEvent(ev)
                );
              }
            }, function(){
          });
        }else{
          $scope.myDate = d;
          $scope.showErrorAlert();
        } 
      }else{
        $scope.loading = false;
        $scope.loading2 = false;
        document.getElementById("dashboard").style.display='none';
        
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Dashboard no disponible')
            .textContent('¡Para ver tu dashboard, tu empresa debe estar activada!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
        $rootScope.go("app.profile");
      }
    });
  } 

  $scope.showErrorAlert = function() {
      $mdDialog.show(
          $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Error')
          .textContent('¡Fecha no válida!')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
       )
      .then(function() { 
          $scope.getTimeline();    
      }, function() {
          $scope.status = 'You cancelled the dialog.';
      });
  };
  $scope.getTimeline();
   /*$interval(function(){
      self.getTimeline();
    },10000)*/

    $scope.spaces = [];

    $scope.calcSpaces = function(o, c){

      var open = new Date(o);
      var close = new Date(c);

      open.setHours(open.getHours());
      
      var openH = open.getHours();
      var openM = open.getMinutes();
      var closeH = close.getHours();
      var closeM = close.getMinutes();

      var spaces = Math.floor(((closeH*60+closeM) - (openH*60+openM))/30);

      var aux = []; 

      var dActual = new Date();
      $scope.actualHour = Math.round((((dActual.getHours()*60)+ dActual.getMinutes()) - ((openH*60)+ openM))/5); 
      
      for(var i=0; i<=spaces; i++){
        if(i>0)
          open.setMinutes(open.getMinutes() + 30);

        if(i<=spaces-1){
          aux.push(open.toTimeString().replace(/.*(\d{2}:\d{2})(:\d{2}).*/, "$1"));
        }else{
          $scope.lastHour = open.toTimeString().replace(/.*(\d{2}:\d{2})(:\d{2}).*/, "$1");
        }        
    }     
    $scope.spaces = aux;  
  }
  /*Day dashboard*/

  $scope.getEmployees=function(){
    CompanyService.employees().get({},function(result){
      if(result.error)
        return console.log(result.error);
      var employees = result.data;

      async.reduce(result.data, [],function iteratee(prev, item, callback) {
          searchPick(item._id,function(err, data){
            if(err)
              return callback(err);
            item.pick = data;
            prev.push(item);
            callback(null,prev);
          });
      }, function done(err,result) {
          if(err)
            return console.log(err);

          $scope.loading2 = false;
          $scope.employees = result;
          console.log($scope.employees);
      });
    }, function(){

    });
  }

    $scope.showInfo=function(employee){
    
    if(employee.open==true){
      employee.open=false;
    }else{
      $scope.employees.forEach(function(e){
        e.open=false;
      })
      employee.open=true;
    }     
  } 
  /**************************************/
  var searchPick = function(idResource,callback){
    CompanyService.pick().get({resource:idResource},function(result){
      if(result.error)
        return callback(result.error);
      callback(null, result.data);
    }, function(){

    });
  }
  $scope.cancelPick = function(idPick,date){
    console.log(idPick);
    CompanyService.cancelPick().cancel({id:idPick},function(result){
      if(result.error)
        return console.log(result.error);
      $scope.cancelPick=result.data;
      $scope.myDate = date;
      console.log($scope.myDate);
      $scope.getTimeline($scope.myDate, " ");
    }, function(){

    });
  }

  $scope.nextPick = function(pResource,idPick,statePick){
    CompanyService.nextPick().change({resource: pResource,pick:idPick,state:statePick},function(result){
      if(result.error)
        return console.log(result.error);
      $scope.nextPick=result.data;
      console.log($scope.nextPick);
      $scope.getTimeline();
      $scope.getEmployees();
    }, function(){

    });
  }
  /*****************************************/
};