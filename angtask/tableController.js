var app=angular.module("tableapp",[]);
app.controller("tableCtrl",function($scope){
    $scope.hide=true;
    $scope.record=[{'name':'bhargavi','sub1':40,'sub2':50,'sub3':80, 'total':170},{'name':'Neeraj','sub1':40,'sub2':50,'sub3':50,'total':140}];
    $scope.func=function(p,e)
    {
        $scope.record[p].total=Number($scope.record[p].sub1)+Number($scope.record[p].sub2)+Number($scope.record[p].sub3);
        if(e.value<0||e.value>100)
        e.style.background="yellow";
        else if(e.value<35)
        e.style.background="red";
        else e.style.background="white";
    }
    $scope.showhide=function(){
        $scope.hide=false;
    }
    $scope.addStudent=function(){
        $scope.record.push({
          'name' : $scope.n,
          'sub1' :$scope.m1,
          'sub2' :$scope.m2,
          'sub3' :$scope.m3,
          'total' :Number($scope.m1)+Number($scope.m2)+Number($scope.m3)
        });
        $scope.hide=true;
    }
});