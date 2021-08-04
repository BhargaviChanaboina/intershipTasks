const newapp  = angular.module("app",[]);
newapp.controller( "newCtrl" ,function($scope,$http){
    $scope.output = [];
    $scope.getQuiz = function(){
            $http({
                 method : 'GET',
                 url    : '/quizData'
            }).then(function(response){
                    $scope.info = response.data;
                    console.log(response.data);
                });
    }
    $scope.attempt = {};
    $scope.scoreShow = false;
    $scope.submit = function(){
            let j=0;
            $scope.attempt.name = $scope.ID;
            $scope.score = 0;
            for(questionRecord in $scope.info)
            {
                     if($scope.info[questionRecord].answer == $scope.output[j]) {
                        $scope.score++;
                     }
                     j++;
            }
            j=0;
            $scope.info = "";
            $scope.scoreShow = true;
            $scope.attempt.score = $scope.score;
            console.log($scope.attempt); 
            $http({
                     method : 'POST',
                    url : '/quizResult',
                    data : $scope.attempt
                 }).then(function(response){
                            console.log("result sent");
                    })
 
            }
});