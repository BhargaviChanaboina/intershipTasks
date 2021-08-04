support.controller("resetTokenCtrl",function($scope,$http,$window,$location,$routeParams){
    $scope.isValid = false;
    $scope.user_id ="h";
    $scope.obj={};
	function init(){
		$http({
			method : "GET",
			url    : "user/validate_token",
			params : {"token":$routeParams.id}
		}).then(function(response){
			console.log(response);
			if(response.data.status) $scope.isValid = false;
			else $scope.isValid = true;
		},function(err){}); 
	}
	init();
	$scope.change = function() {
		let id    = $routeParams.id;
		alert($scope.password1);
		if(!id){
			return;
		}
		let data = {
			"token":id,"password":$scope.password1
		}
		$http({
			method : "POST",
			url    : "user/reset",
			data   : {"user":data}
		}).then(function(response){
			$scope.message = "Successfully Changed..You will be redirected to login page!";
			setTimeout(()=>{ $window.location.href = '/';},2000);
		},function(err){}); 
	}
});