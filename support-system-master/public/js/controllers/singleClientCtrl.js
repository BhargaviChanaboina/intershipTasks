support.controller("singleClientCtrl",function($scope,$http,$filter,$window,$location,$routeParams,$rootScope){
	$scope.newl = {};

//support renewel date should be more than one year of procuremnt by default.
		//this can be modified as per business requirement. for now keeping for 1 year.

		
		$rootScope.setSupportRenewelDate = function(supportProcurmentDate,expiredDate){
			$scope.newl.srd = angular.copy(new Date(supportProcurmentDate));
            $scope.newl.srd.setYear($scope.newl.srd.getFullYear()+1);
       
		}
		
	//to handle edit from notifications page
	if($routeParams.license){
		$http({
			method: "GET",
			url   : "license/single",
			params  : {"id":$routeParams.license}
		}).then(function(response){
          $scope.l_info=response.data;
          if($routeParams.openEditModel){
          	//
          	//$scope.get_services();
          	$scope.license_edit(response.data)
          	$('#license_edit_model').modal('show')
          }
		});
	}
	 function get_notifications(){
		$http({
			method: "GET",
			url   : "notify/single",
			params  : {"id":$routeParams.id}
		}).then(function(response){
		  $scope.notify=response.data;
		  $scope.noNotifications = false;
		  if(response.data.length==0)
		  	$scope.noNotifications = true;
		  console.log($scope.notify);
		}); 
	 }
	 get_notifications();

	 
	
	function get_all_license(){
		$http({
			method: "GET",
			url   : "license/all",
			params: {"id":$routeParams.id}
		}).then(function(response){
			console.log(response);
			$scope.licenses = response.data;
				$scope.nodata = false;
			if(response.data.length==0)
				$scope.nodata = true;
		},function(err){});
	}
	get_all_license();
	$scope.get_services = function(){
		$scope.today = $filter('date')(Date.now(), 'yyyy-MM-dd');
		$scope.newl.lpd=$scope.today;
		$scope.rd = new Date($scope.newl.lpd);
		$scope.rd.setYear($scope.rd.getFullYear()+1);
		$scope.rd= $filter('date')($scope.rd, 'yyyy-MM-dd');
		$http({
			method: "GET",
			url   : "service/all_active",
		}).then(function(response){
			console.log(response);
			$scope.services = response.data;
			$scope.newl = {};
			var date = new Date();
			$scope.newl.lpd = angular.copy(date);
			$scope.newl.srd = angular.copy(date);
			$scope.newl.srd.setYear($scope.newl.srd.getFullYear()+1);
			// $scope.newl.srd = new Date();
			// $scope.newl.srd.setYear();
			// $scope.newl.lpd = new Date().;
		},function(err){});
	}
	$scope.add_license = function(){
		console.log($scope.newl);
		$scope.newl.client_id = $routeParams.id;
		$http({
			method: "POST",
			url   : "license/add",
			data   : {"license":$scope.newl}
		}).then(function(response){
			get_all_license();
			$scope.newl = {};
		},function(err){});
	}
	$scope.is_duplicate_service = function(){
		let service = $scope.newl.product;
		$scope.duplicate_message = "";
		let services = $scope.licenses;
		console.log(services);
		for(let i=0;i<services.length;i++){
			if(services[i].product===service){
				$scope.duplicate_message = "Client is currently using "+service+"..."
				$scope.newl.product="";
				break;
			}
		}

	}



	function get_client_info(){
		console.log("in client info");

		$http({
			method : "GET",
			url    : "client/single_client",
			params :{"id":$routeParams.id}
		}).then(function(response){
			$scope.client_info=response.data;
			$scope.client_info_edit = angular.copy($scope.client_info);
			console.log($scope.client_info);
		});
	}
	get_client_info();

	$scope.client_update=function(){
		$http({
			method : "POST",
			url    : "/client/update",
			data   : $scope.client_info_edit
		}).then(function(response){
			console.log(response);
			get_client_info();
		});
	}

	$scope.license_edit=function(p){
		
		$scope.l_info=angular.copy(p);
		console.log($scope.l_info);
		$scope.l_info.licence_procurement_date= new Date($scope.l_info.licence_procurement_date);
		$scope.l_info.support_renewal_date= new Date($scope.l_info.support_renewal_date);
	
	
	//  let t=$scope.l_info.licence_procurement_date;
	// let t_end=$scope.l_info.support_renewal_date;
	// $scope.l_info.licence_procurement_date=new Date($scope.l_info.licence_procurement_date);
	// $scope.l_info.support_renewal_date=new Date(t_end);
	}
    
	$scope.delete_license=function(){
		$http({
			method  :  "POST",
			url     : 'license/delete_license',
			data    : $scope.l_info
		}).then(function(response){
			console.log(response);
		});
	}


	$scope.license_update=function(){
		console.log($scope.l_info);
		$http({
			method  :"POST",
			url     :'license/update_license',
			data    :$scope.l_info
		}).then(function(response){
			console.log(response);
			get_all_license();
	});


}
});