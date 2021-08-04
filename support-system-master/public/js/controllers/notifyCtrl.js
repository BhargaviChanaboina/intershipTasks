support.controller("notifyCtrl",function($scope,$http){
    $http({
        method : "GET",
        url    : "/notify/all"
    }).then(function(response){
        $scope.info = response.data;
        console.log($scope.info);
    },function(err){});
});