angular.module('starter.controllers')
    .controller('LobbyCtrl', ['$scope', 'TKTestQuestionService', 'TKAnswersService', '$state',
        function($scope, TKTestQuestionService, TKAnswersService, $state) {
            
            // get the questions
            TKTestQuestionService.all();

            $scope.goToTest = function() {
                
                TKAnswersService.resetAnswers();
                
                $state.go('question', {
                    questionID: 29
                });
            };
            
            
            
        }
    ]);