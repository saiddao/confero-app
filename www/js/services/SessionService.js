angular.module('confero.SessionService', ['confero.ConferoDataService']).factory('Session', ['ConferenceCache', '$q',
    function(ConferenceCache, $q) {
        "use strict";
        return {
            get: function(confId, sessionKey) {
                var deferred = $q.defer();
                ConferenceCache.get(confId).then(function(conf) {
                    deferred.resolve(conf.getSessionByKey(confId, sessionKey));
                }, function(rejection) {
                    console.log(rejection);
                });
                return deferred.promise;
            },
            SessionByPaperKey: function(confId, paperKey) {
                var deferred = $q.defer();
                ConferenceCache.get(confId).then(function(conf) {
                    deferred.resolve(conf.getSessionByPaperKey(confId, paperKey));
                }, function(rejection) {
                    console.log(rejection);
                });
                return deferred.promise;
            }
        };
    }
]);