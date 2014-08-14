angular.module('confero.app', [
    'ionic', 
    'ngResource',
    'LocalForageModule', 
    'confero.tabs', 
    'confero.ConferoDataObjects', 
    'confero.NavigationService',
    'confero.ConferoDataService', 
    'confero.mainPage', 
    'confero.eventsList',
    'confero.lastListItem',
    'confero.paperItem', 
    'confero.peopleItem', 
    'confero.sessionItem', 
    'confero.EventsService',
    'confero.StarredService',
    'confero.ConferenceService', 
    'confero.SessionService', 
    'confero.PaperService', 
    'confero.PeopleService' ])
.constant('$ionicLoadingConfig', {
  template: '<h1><i class="icon ion-loading-a"></i>Loading...</h1>'
})
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
.config(['$localForageProvider', function($localForageProvider){
    $localForageProvider.config({
        //driver      : 'localStorageWrapper', // if you want to force a driver
        name        : 'Confero', // name of the database and prefix for your data
        version     : 1.0, // version of the database, you shouldn't have to use this
        storeName   : 'conferoData', // name of the table
        description : 'Confero data store'
    });
    $localForageProvider.setNotify(true, true); 
}])
.controller('TabsCrtl', ['$scope', '$state', '$ionicLoading', 
    function($scope, $state, $ionicLoading, $ionicNavBarDelegate) {
        $scope.conferenceId = $state.params.id;
        $scope.ConferenceName = "confero";
        $ionicLoading.show();
        $scope.$on('loadingFinished', function(ngLoadEvent) {
            $ionicLoading.hide();
        });

    }
]);