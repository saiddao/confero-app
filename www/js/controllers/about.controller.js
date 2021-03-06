/* ConferoApp.js
 * version : 4.0.1
 * authors : Rylan Cottrell, Reid Holmes
 * license : GNU GPL
 */

angular
    .module('confero.app')
    .controller('AboutCtrl', AboutCtrl);

AboutCtrl.$inject = ['$scope', '$state', '$ionicNavBarDelegate'];

function AboutCtrl($scope, $state, $ionicNavBarDelegate) {
    $ionicNavBarDelegate.showBackButton(false);
    $scope.backToEventsList = backToEventsList;
    $scope.openInBroswer = openInBroswer;

    function openInBroswer(url) {
        if(url) {
            window.open(url, '_blank', 'location=no');
        }
    }

    function backToEventsList() {
        $state.go('eventspage');
    }

}