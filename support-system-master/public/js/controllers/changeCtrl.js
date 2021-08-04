support.controller("changeCtrl",function($scope,$http,$window,$location){
    $scope.password_hide=false;
    $scope.user_id="";
    $scope.password="";
    $scope.message=null;

    //function to authenticate user before changing password
    $scope.validate=function(){
        $scope.user={
           // "user_id"   :  $scope.user_id,
            "password"  :  $scope.password,
            "new_password" :$scope.new_password
        };
       if($scope.new_password!=$scope.new_password2){ $scope.new_password="";
        $scope.new_password2="";
        $scope.message="did not match";
        console.log($scope.user);
    }
    else{
        $http({
            "method"    :  "POST",
            "url"       :'/user/change_pswd',
            "data"      : $scope.user
        }).then(function(response){
            $scope.message = response.data;
        });
     }
    }     
});