var myApp = angular.module('myApp', []);
myApp.controller('myController', function ($scope, $http, $q, $filter) {

    $scope.games = [];
    $scope.colourSummary = [];

    $scope.init = function () {
        getData();
    }

    getData = () =>  {
        var file = 'data/games.json';

        $http.get(file)
        .then(function(response) {
            $scope.games = response.data.games;
            $scope.generatePivot();
        });
    };

    $scope.generatePivot = () => {
        
        $scope.data = $scope.games.map(game => game.players.filter(player => player.winner === true));
        
        $scope.colourSummary = $scope.games
            .flatMap(game => game.players.filter(player => player.winner === true))
            .map(winner => winner.colour)
            ;
        $scope.red = $scope.colourSummary.filter(e => e === 'red').length
        $scope.blue = $scope.colourSummary.filter(e => e === 'blue').length

        var data = [].concat.apply([], $scope.data);

        if ($scope.ui) {
            $("#output").pivotUI(
                data,
                {
                    rows: ["name"],
                    cols: ["score"]
                }
            );
        } else {
            $("#output").pivot(
                data,
                {
                    rows: ["name"],
                    cols: ["score"]
                }
            );
        }

    }

    $scope.formatNumber = function(i) {
        return Math.round(i * 100)/100; 
    }

    $scope.init();
});