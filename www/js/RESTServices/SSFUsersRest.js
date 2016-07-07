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

        // login a user
        SSFUsersRest.login = function(loginData) {
            return $http({
                url: url + '/login',
                method: 'POST',
                data: loginData
            });
        };

        // logout - TODO: not yet implemented in controller
        SSFUsersRest.logout = function(token) {
            return $http({
                url: url + "/logout",
                method: "POST",
                headers: {
                    'Authorization': token
                }
            });
        };


    }]);