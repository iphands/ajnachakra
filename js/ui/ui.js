/*global window, angular, require*/

(function () {
    angular.module("ajnachakra", []).controller("UiController", function ($scope) {
        $scope.fudge = 8;
        $scope.skip = 3;
        require(['detector'], function (detector) {
            $scope.$watch(function () {
                if ($scope.fudge >= 1 && $scope.fudge <= 80) {
                    detector.settings.fudge = $scope.fudge / 100.0;
                }

                if ($scope.skip > 0) {
                    detector.settings.skip = $scope.skip;
                }
            });
        });
    });
}());
