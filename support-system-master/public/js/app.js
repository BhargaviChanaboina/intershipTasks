var support=angular.module("support",['ngRoute','appRoutes']);
support.controller("supportCtrl", function($scope, $rootScope,$location,$http){
		$rootScope.loc=$location.url();
		if(!document.cookie || !document.cookie.token)
		    $rootScope.enableAction=false;
			//window.location.href = "/";
	else{
			$rootScope.enableAction=true;
		}

		function get_count(){
			$http({
				method : "GET",
				url    : "notify/notification_count"
			}).then(function(res){
				$scope.notification_count = res.data.count;
				console.log(res.data.count);
			},function(err){})
		}
		get_count();

});

support.run(function($rootScope,$location){
	$rootScope.$on("$locationChangeStart",function(event,next,current){
	$rootScope.loc=$location.url();
	});
});