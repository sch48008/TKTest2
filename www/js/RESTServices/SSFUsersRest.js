angular.module('RESTServices', [])
    .service('SSFUsersRest', ['$http', function($http) {

        var SSFUsersRest = this;
        var url = 'https://strongloop-backend-2-bitflipper86.c9users.io/api/SSFUsers';

        // register a new user
        SSFUsersRest.post = function(newUserData) {
            return $http({
                url: url,
                method: 'POST',
                data: newUserData
            });
        };

        SSFUsersRest.save = function() {

            return $http({

                url: url,
                method: 'POST',
                data: ''

            });

        };

        SSFUsersRest.getAll = function() {

            return $http({

                url: url,
                method: 'GET'

            });

        };

    }])