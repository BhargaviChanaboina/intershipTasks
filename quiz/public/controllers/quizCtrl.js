const app = angular.module( "myapp" , []);
app.controller( "mytable" , function($scope,$http){
    $scope.showHide = true;
    $scope.questions = [];
    console.log( "in controller" );
    $scope.show = function(){
                console.log( "inshow" );
                $scope.showHide = false;
    }
    $scope.add = function(){
                $scope.questions.push({"question": $scope.q , "option1" : $scope.o1 , "option2" : $scope.o2 , "option3" : $scope.o3 , "answer" : $scope.a } )
                $scope.showHide = true;
                console.log($scope.questions);
    }
    $scope.send = function(){
                console.log( "insend" );
                $http({
                    method : 'POST',
                    url    : '/sendQ',
                    data   :  $scope.questions
                }).then(function(response){
                        $scope.questions = [];
                    });
                console.log( "data sent" );
    }
    $scope.search = "";
    $scope.matches = [];
    $scope.searchFunction = function(){    
                            $http({
                                method : 'POST',
                                url    : '/search',
                                data   : { "value" : $scope.search }
                            }).then(function(response){
                                    console.log( "got response" );
                                    console.log($scope.search);
                                    console.log(response.data);
                                    $scope.matches = response.data;
                                });
    }
    $scope.trail = function(){
                  alert("got");
    }
});