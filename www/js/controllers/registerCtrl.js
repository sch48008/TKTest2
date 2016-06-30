angular.module('starter.controllers')
    .controller('RegisterCtrl', ['$scope', '$state', 'SSFUsersRest', '$window',
        function($scope, $state, SSFUsersRest, $window) {

            $scope.user = {};

            $scope.signupForm = function(form) {

                if (form.$invalid) {
                    return alert("Please complete the form before proceeding.");
                }
                else {

                    SSFUsersRest.post($scope.user)
                        .then(function(response) {
                            // handle different responses and decide what happens next
                            if (response.status == 200) {
                                $window.localStorage.token = response.data.token;
                                $window.localStorage.userID = response.data.id;
                                $state.go('lobby');
                            }
                            else if (response.status == 422) {
                                alert('Sorry, that email value is already registered.');
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
