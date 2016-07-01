angular.module('starter.controllers')
    .controller('LoginCtrl', ['$scope', '$state', 'SSFUsersRest', '$window',
        function($scope, $state, SSFUsersRest, $window) {

            $scope.user = {};

            $scope.loginUser = function(form) {

                if (form.$invalid) {
                    return alert("Please provide a valid email and password.");
                }
                else {

                    SSFUsersRest.login($scope.user)
                        .then(function(response) {
                            // handle different responses and decide what happens next
                            if (response.status == 200) {
                                $window.localStorage.token = response.data.id;
                                $window.localStorage.userID = response.data.userId;
                                $state.go('lobby');
                            }
                            else if (response.status == 404) {
                                alert('Sorry, could not connect to server.');
                            }
                        }, function(error) {
                            alert('Error occurred. Error message is: ' + error.message);
                        });
                }

            };
        }
    ]);
