/* ConferoApp.js
 * version : 4.0.1
 * authors : Rylan Cottrell, Reid Holmes
 * license : GNU GPL
 */

angular
    .module('confero.app')
    .directive('sessionItem', sessionItem);

sessionItem.$inject = ['Session'];

function sessionItem(Session) {
    "use strict";
    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: 'sessionItemView.html',
        scope: {
            session: "=",
            conferenceId: "=conference",
            key: "=key",
            paperkey: "=paperkey"
        },
        controller: function($scope) {
            var sessionPromise;
            $scope.$watch('sessionData', sessionData);
            $scope.$watch('paperkey', paperkey);
            $scope.$watch('key', key);

            if($scope.session) {
                $scope.sessionData = $scope.session;
            }

            function key(newValue) {
                if($scope.key) {
                    sessionPromise = Session.get($scope.conferenceId, $scope.key);
                    sessionPromise.then(function(data) {
                        $scope.sessionData = data;
                    });
                }
            }

            function paperkey(newValue) {
                if($scope.paperkey) {
                    sessionPromise = Session.SessionByPaperKey($scope.conferenceId, $scope.paperkey);
                    sessionPromise.then(function(data) {
                        $scope.sessionData = data;
                    });
                }
            }

            function sessionData(newValue, oldValue) {
                if(newValue) {
                    $scope.sessionData.KeyEncoded = encodeURIComponent($scope.sessionData.Key);
                    var time = $scope.sessionData.Time ? $scope.sessionData.Time.split('-') : ['00:00', '23:59'];

                    if(time[0].indexOf('m') > -1) { //old standard
                        $scope.sessionData.StartTime = moment($scope.sessionData.Day + ' ' + time[0].trim(), 'MM-DD-YYYY HH:mm a');
                        if(!time[1]) {
                            time[1] = "11:59 pm";
                        }
                        $scope.sessionData.EndTime = moment($scope.sessionData.Day + ' ' + time[1].trim(), 'MM-DD-YYYY HH:mm a');
                    } else { //new standard
                        $scope.sessionData.StartTime = moment($scope.sessionData.Day + ' ' + time[0].trim(), 'YYYY-MM-DD HH:mm');
                        $scope.sessionData.EndTime = moment($scope.sessionData.Day + ' ' + time[1].trim(), 'YYYY-MM-DD HH:mm');
                    }
                    $scope.sessionData.PrettyDate = $scope.sessionData.StartTime.format("dddd MMMM D[th]");
                    $scope.sessionData.PrettyDateTime = $scope.sessionData.StartTime.format("ddd MMMM D[th] HH:mm") + ' - ' + $scope.sessionData.EndTime.format("HH:mm");
                    $scope.sessionData.PrettyDateTimeFull = $scope.sessionData.StartTime.format("dddd MMMM D[th] HH:mm") + ' - ' + $scope.sessionData.EndTime.format("HH:mm");
                    $scope.sessionData.Colour = 'colour' + (simpleHash($scope.sessionData.Location) % 15);
                }
            }
        }
    };
}