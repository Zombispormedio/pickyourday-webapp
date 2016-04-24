webAppController.DashboardCtrl = function ($scope, CompanyService) {
  var self = this;
  $scope.actualHour= -1;

    this.getTimeline = function (){
      CompanyService.timeline().get({rangeDays:1},function(result){
        
        if(result.error)
          return console.log(result.error);
        $scope.timeline=result.data;
        console.log(result.data);
        $scope.calcSpaces(result.data[0].metadata.schedule[0].open, result.data[0].metadata.schedule[0].close);
        
      }, function(){

      });
    } 
  this.getTimeline();  

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
      var s1,s2,l1,l2 = "";   
      
      for(var i=0; i<=spaces; i++){
        if(i>0)
          open.setMinutes(open.getMinutes() + 30);

        if(i<=spaces-1){
          aux.push(open.toTimeString().replace(/.*(\d{2}:\d{2})(:\d{2}).*/, "$1"));
          s1 = aux[i];
          s2 = s1.split(":");
        }else{
          $scope.lastHour = open.toTimeString().replace(/.*(\d{2}:\d{2})(:\d{2}).*/, "$1");
          l1 = $scope.lastHour;
          l2 = l1.split(":");
        }
           

      var dActual = new Date();
      var hActual = addZero(dActual.getHours().toString());
      var mActual = addZero(dActual.getMinutes().toString());

      if(s2[0] == hActual || l2[0] == hActual){
        if(mActual == "00")
            $scope.actualHour = i;
        if(mActual == "30")
          $scope.actualHour= i+1;     
      }    
        
    }     
    $scope.spaces = aux;  
  }

  function addZero(i) {
      if (i < 10) {
          i = "0" + i;
      }
      return i;
  }
    /*Day dashboard*/

  this.getEmployees=function(){
    CompanyService.employees().get({},function(result){
      if(result.error)
        return console.log(result.error);
      $scope.employees=result.data;
      console.log($scope.employees);
    }, function(){

    });
  }
  this.getEmployees();

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
  $scope.cancelPick = function(idPick,statePick){
    console.log(idPick);
    console.log(statePick);
    CompanyService.nextPick().change({pick:idPick,state:statePick},function(result){
      if(result.error)
        return console.log(result.error);
      $scope.nextPick=result.data;
    }, function(){

    });
  }

  $scope.nextPick = function(idPick,statePick){
    CompanyService.nextPick().change({pick:idPick,state:statePick},function(result){
      if(result.error)
        return console.log(result.error);
      $scope.nextPick=result.data;
    }, function(){

    });
  }
};