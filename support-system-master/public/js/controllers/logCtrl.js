support.controller("logCtrl",function($scope,$http){
    $http({
        method : "GET",
        url    : "/log/all"
    }).then(function(response){
        $scope.logs = response.data;
        $scope.logs = $scope.logs.reverse();
        $scope.logs = $scope.logs.map((log) => {
                log.time = new Date(log.time).toLocaleString();
               
                return log;
            });
    },function(err){});
});