support.controller("settingCtrl",function($scope,$http,$window,$location,$routeParams){
	$http({
		method : "GET",
		url    : "/setting/all"
	}).then(function(response){
		$scope.settings = response.data;
		console.log($scope.settings);
	},function(err){});
	$scope.update = function(){
	    $http({
			method : "POST",
			url    : "/setting/update",
			data   : $scope.settings
		}).then(function(response){
			$scope.message = "Settings Saved";
		},function(err){
			$scope.message = "Error Occured";
		});
	}
});