support.controller("serviceCtrl",function($scope,$http,$window,$location,$routeParams){
		$scope.get_all_services = function(){
			$http({
				method : "GET",
				url    : "/service/all"
			}).then(function(response){
				$scope.services = response.data;
			},function(err){});
		}

		$scope.add_service = function(){
			$http({
				method : "POST",
				url    : "/service/add",
				data   : {"service":$scope.service}
			}).then(function(response){
				$scope.get_all_services();
			},function(err){});
		}
		$scope.get_service = function(id){
			$http({
				method : "GET",
				url    : "/service/one",
				params : {"id":id}
			}).then(function(response){
				$scope.update_service = response.data;
				console.log($scope.update_service);
			},function(err){});
		}
		$scope.update_service_please = function(){
			$http({
				method : "POST",
				url    : "/service/update",
				data   : {"service":$scope.update_service}
			}).then(function(response){
				$scope.get_all_services();
			},function(err){});
		}

});