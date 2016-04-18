webAppController.StatsCtrl = function ($scope, $interval){
  
    
    
     var JustPosition = generate(function() {
        return { position: RandPosition() };
    });


    function Data_1() {
        $scope.data_1 = JustPosition();
    }

    Data_1();

    $interval(Data_1, 1000);

    $scope.config_1 = {
        streaming: true
    };
}