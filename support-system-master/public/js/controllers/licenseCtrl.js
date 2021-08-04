support.controller("licenseCtrl",['$scope','$http','$window','$location','$routeParams','$filter',function($scope,$http,$window,$location,$routeParams,$filter){
	var orderBy = $filter('orderBy');
	$scope.get_all_licenses = function(){
		$http({
			method: "GET",
			url   : "license/all_licenses",
		}).then(function(response){
			console.log("in license");
			console.log(response);
			$scope.licenses = response.data;
			 $scope.licenses = $scope.licenses.reverse();
			 $scope.sortBy('support_renewal_date');
		},function(err){});
	}
	   $scope.propertyName = 'support_renewal_date';
      $scope.reverse = true;
      $scope.licenses = orderBy($scope.licenses, $scope.propertyName, $scope.reverse);
	 $scope.sortBy = function(propertyName) {
		 console.log($scope.reverse);
		 console.log(propertyName);
		$scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
 		? !$scope.reverse : false;
	 	$scope.propertyName = propertyName;
	 	$scope.licenses = orderBy($scope.licenses, $scope.propertyName, $scope.reverse);
	   };
}]);