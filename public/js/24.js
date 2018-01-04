var app = angular.module('myToDoList', ['ngAnimate']);

app.controller('myCtrl', function ($scope) {
    $scope.items = ['Get inbox to zero', 'Clean the room', 'Submit the essay', 'Get a hair cut'];
    $scope.deleteArray = [true, false, false, true];

    $scope.errorMessage = '';
    $scope.addItem = function () {
        if (!$scope.addMe) {
            return;
        }
        if ($scope.items.indexOf($scope.addMe) == -1) {
            $scope.items.push($scope.addMe);
            $scope.deleteArray.push(false);
            $scope.errorMessage = '';
        } else {
            $scope.errorMessage = "The item is already in your list.";
        }
    }

    $scope.removeItem = function (index) {
        $scope.items.splice(index, 1);
    }

    $scope.addEffect = function (index) {
        $scope.deleteArray[index] = !$scope.deleteArray[index];
    }
})
