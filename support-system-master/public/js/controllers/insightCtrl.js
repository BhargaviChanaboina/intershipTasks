support.controller("insightCtrl",function($scope,$rootScope,$http){
    
    function pie(){
        $http({
            method : "GET",
            url    : "/license/try"
        }).then(function(response){
            console.log(response);
            let arr = [];
            arr.push(["License","Count"])
            let pieValues = [];
            pieValues = response.data;
            console.log(pieValues);
            pieValues.forEach(element => {
                let temp = [];
                temp.push(element._id.toUpperCase());
                temp.push(element.count);
                arr.push(temp);
            });
            console.log(arr);
            google.charts.load("current", {packages:["corechart"]});
            google.charts.setOnLoadCallback(drawChart);
            
            function drawChart() {
                var data = google.visualization.arrayToDataTable(arr);
                var options = {
                title: 'OVERALL LICENSE DISTRIBUTION',
                is3D: true,
                };
                var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
                chart.draw(data, options);
            }
        },function(err){});
    }
    pie();

    $scope.graph_by_product = function(){
        $http({
            method : "GET",
            url    : "/license/graph_by_license",
            params : {"product":$scope.product}
        }).then(function(response){
            console.log(response);
            let arr = [];
            arr.push(["Client","Count"])
            let pieValues = [];
            pieValues = response.data;
            console.log(pieValues);
            pieValues.forEach(element => {
                let temp = [];
                temp.push(element.client_id.client_name.toUpperCase());
                temp.push(element.no_of_licenses);
                arr.push(temp);
            });
            console.log(arr);
            google.charts.load("current", {packages:["corechart"]});
            google.charts.setOnLoadCallback(drawChart);
            
            function drawChart() {
                var data = google.visualization.arrayToDataTable(arr);
                var options = {
                title: $scope.product+' DISTRIBUTION',
                is3D: true,
                };
                var chart = new google.visualization.PieChart(document.getElementById('piechart'));
                chart.draw(data, options);
            }
        },function(err){});
    }  
    $scope.get_services = function(){
        $http({
            method: "GET",
            url   : "service/all",
        }).then(function(response){
            console.log(response);
            $scope.services = response.data;
            $scope.product = $scope.services[1].service_handle;
            $scope.graph_by_product();
        },function(err){});
    }


    $scope.draw_bar = function(){
       let dataTable = [];
       $http({
            method: "GET",
            url   : "client/clients",
        }).then(function(response){
            let client_names = response.data;
            let bar_clients = ['Client Name'];
            client_names.forEach((e)=>bar_clients.push(e.client_name));
            dataTable.push(bar_clients);
            console.log(bar_clients);
            $http({
                    method: "GET",
                    url   : "service/all_active",
                }).then(function(response1){
                    let license_names = response1.data;
                    license_names.forEach(function(ele){
                        let bar_licenses = [ele.service_handle];
                        client_names.forEach(function(c){
                            let count=0;
                            c.license_array.forEach(function(l){
                                if(l.product==ele.service_handle){
                                    count=l.no_of_licenses;
                                }
                            });
                            bar_licenses.push(count);
                        });
                        dataTable.push(bar_licenses);

                    });
                    console.log(dataTable);
                    google.charts.load("current", {packages:["corechart"]});
                    google.charts.setOnLoadCallback(drawChart);
                    function drawChart() {
                              var data = google.visualization.arrayToDataTable(dataTable);

                              var options = {
                                width: 1100,
                                height: 400,
                                legend: { position: 'top', maxLines: 3 },
                                bar: { groupWidth: '75%' },
                                isStacked: true,
                              };
                        var chart = new google.visualization.ColumnChart(document.getElementById('barchart'));
                        chart.draw(data, options);
                    }
            
                },function(err){});
        },function(err){});
    }
    $scope.draw_bar();
}); 