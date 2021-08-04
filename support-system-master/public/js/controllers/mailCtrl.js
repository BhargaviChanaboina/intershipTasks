support.controller("mailCtrl",function($scope,$http,$window,$location,$routeParams,$filter){

	$scope.insertAtCursor = function( ) {
		myValue = '{{'+$scope.place_holder+'}}';
		myField =document.myForm.note;
		if (document.selection) {
			myField.focus();
			sel = document.selection.createRange();
			sel.text = myValue;
		}
		else if (myField.selectionStart || myField.selectionStart == '0') {
			var startPos = myField.selectionStart;
			var endPos = myField.selectionEnd;
			myField.value = myField.value.substring(0, startPos)

			+ myValue 

			+ myField.value.substring(endPos, myField.value.length);
		} else {
			myField.value += myValue;
		}

	}
	$scope.place_holder = "";
	$scope.mail_template = {};
	$scope.mail_template.content ="";
	function get_keys(){
		$http({
			method : "GET",
			url    : "/license/get_keys"
		}).then(function(response){
			$scope.suggestions = response.data;
			
		},function(err){});
    }
    get_keys();
	$scope.add_placeholder = function(){
		$scope.mail_template.content = $scope.mail_template.content+" {{"+$scope.place_holder+"}} ";
	}
	$scope.get_mail_templates = function(){

	$http({
			method : "GET",
			url    : "/mail_template/all"
		}).then(function(response){
			$scope.mail_templates = response.data;
			console.log($scope.mail_templates);
		},function(err){});
	} 

	$scope.add_mail_template = function(){
		$http({
			method : "POST",
			url    : "mail_template/add",
			data   : $scope.mail_template
		}).then(function(response){
			console.log("Added");
			setTimeout(()=>{ window.location.href = '/#!/mail_settings';},200);
		},function(err){});
	}
	$scope.get_one_template = function(){
	
		$http({
			method : "GET",
			url    : "mail_template/mail_template",
			params : {"id":$routeParams.id}
		}).then(function(response){
			$scope.mail_template = response.data;
			console.log($scope.mail_template);
		},function(err){});
	}
	
	$scope.update_template = function(){
		$http({
			method : "POST",
			url    : "mail_template/update",
			data   : $scope.mail_template
		}).then(function(response){
			console.log("Updated");
			setTimeout(()=>{ window.location.href = '/#!/mail_settings';},200);
		},function(err){});
	}
});