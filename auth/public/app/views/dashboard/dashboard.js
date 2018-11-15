app.controller('dashboard', function($scope, $http) {

    $http({
        method: 'GET',
        url: '/api/getvms'
    }).then(function successCallback(response) {
        $scope.vms = response.data[0]
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

    $scope.statusColor = function(status) {
        switch(status) {
            case "TERMINATED":
                return "red";
            case "RUNNING":
                return "green";
            default:
                return "black";
        }
    }

})

