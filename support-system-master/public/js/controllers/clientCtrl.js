support.controller("clientCtrl",function($scope,$http,$window,$location,$routeParams,$filter){
	let orderBy = $filter('orderBy');
	$scope.client = {};
	$scope.c = [];
	$scope.comment = {};
	console.log($scope.test);
	$scope.add_client = function(){
		let client = new FormData;
		for(key in $scope.client){
			client.append(key,$scope.client[key]);
		}
		let file = $('#file')[0].files[0];
		client.append('image',file);
		$http.post('/client/add', client,{
			transformRequest : angular.identity,
			headers:{
				'Content-Type' : undefined
			}

		}).then(function(response){
			console.log(response);
			$scope.message="Client added successfully...Redirecting to Client's page";
			setTimeout(()=>{ $window.location.href = '/#!/client?id='+response.data._id;},200);
		},function(err){
			$scope.message="Something went wrong";
		});
	}
	$scope.get_all_clients = function(){
		$http({
			method:"GET",
			url   :"client/clients"
		}).then(function(response){
			$scope.all_clients = response.data.map((client)=>{
				let status = "pending";
				if(client.license_array.length>0){
					let active_count = 0;
					if(client.license_array[0].license_status !== "blocked")
						active_count++;
					let date = client.license_array[0].support_renewal_date;
					let expiry_product  = client.license_array[0].product;
					for(let i=1;i<client.license_array.length;i++){
						if(date>client.license_array[i].support_renewal_date)
							date = client.license_array[i].support_renewal_date;
						    expiry_product  = client.license_array[i].product;
						    if(client.license_array[i].license_status !== "blocked")
						    active_count++;
					}
				    if(active_count>0) status = "active";
				    else status= "blocked";
					client.expiry_date = date;
					client.expiry_product= expiry_product;
				}
				client.status = status;
				return client;
			});
			$scope.clients=$scope.all_clients;

			console.log($scope.clients);
		},function(err){
			$scope.message="Something went wrong";
		});
	}

	$scope.filter_status = function(){
		
		//$scope.clients=$filter('client_status')($scope.all_clients);
	}
	$scope.propertyName = 'support_renewal_date';
	$scope.reverse = true;
	console.log($scope.clients);
	$scope.clients = orderBy($scope.clients, $scope.propertyName, $scope.reverse);
   $scope.sortBy = function(propertyName) {
	   console.log($scope.reverse);
	  $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
	   ? !$scope.reverse : false;
	   $scope.propertyName = propertyName;
	   $scope.clients = orderBy($scope.clients, $scope.propertyName, $scope.reverse);
	 };
	$scope.update_comment = function(new_comment){
	    $http({
			method:"POST",
			url   :"client/update_comment",
			data  : new_comment
		}).then(function(response){
			$scope.get_all_clients();
		},function(err){
			$scope.message="Something went wrong";
		});
	}
	$scope.set_comment_text = function(id,text){
		$scope.comment.comment = text;
		$scope.comment.id   = id; 
	}
});

support.filter('client_status', function(){
return function(clients,status){

	console.log("selected...."+status);
	
   
    return clients;
};
});