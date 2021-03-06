/* ConferoApp.js
 * version : 4.0.1
 * authors : Rylan Cottrell, Reid Holmes
 * license : GNU GPL
 */

angular
    .module('confero.app')
    .directive('paperItem', paperItem);

paperItem.$inject = ['Paper'];

function paperItem(Paper) {
    "use strict";

    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: 'paperItemView.html',
        scope: {
            paper: "=",
            conferenceId: "=conference",
            key: "=key"
        },
        controller: function($scope) {
            var setupData = function() {
                $scope.paperData.KeyEncoded = encodeURIComponent($scope.paperData.Key);
            };
            if(!$scope.paper && $scope.key) {
                var paperPromise = Paper.get($scope.conferenceId, $scope.key);
                paperPromise.then(function(data) {
                    $scope.paperData = data;
                    setupData();
                });
            } else {
                $scope.paperData = $scope.paper;
                setupData();
            }
        }
    };
}