support.controller("resetCtrl",function($scope,$http,$window,$location,$routeParams){
	$scope.reset = function(){
		console.log($scope.user_id);
		$http({
			method : "POST",
			url    : "user/reset_password_setup",
			data   : {"user_id":$scope.user_id}
		}).then(function(response){
			$scope.message = response.data;
			setTimeout(()=>{ $window.location.href = '/';},2000);
		},function(err){
			$scope.message = "No User exists with this user_id";
		});
	}
});