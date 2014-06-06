/*global window, angular, require*/

(function () {
    angular.module("ajnachakra", []).controller("UiController", function ($scope) {
        $scope.fudge = 0.08;
        $scope.skip = 3;
        require(['detector'], function (detector) {
            $scope.$watch(function () {
                if ($scope.fudge >= 0.01 && $scope.fudge <= 0.8) {
                    detector.settings.fudge = $scope.fudge;
                }

                if ($scope.skip > 0) {
                    detector.settings.skip = $scope.skip;
                }
            });
        });
    });
}());
