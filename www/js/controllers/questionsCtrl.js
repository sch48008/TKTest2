angular.module('starter.controllers')
    .controller('QuestionsCtrl', ['$scope', '$stateParams', 'testInfo', 'TKAnswersService', '$state', '$ionicHistory', 'TKResultsButtonService',
        function($scope, $stateParams, testInfo, TKAnswersService, $state, $ionicHistory, TKResultsButtonService) {


            $scope.qNumber = $stateParams.questionID;

            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // Notice that the code block below runs every time the controller is loaded.
            // So every time we answer a question by clicking A or B it goes to the next page and runs this code again.
            // This code takes the "pair" of questions retrieved in the "resolve" portion of the state table
            // and assigns one as "questionA" and one as "questionB".
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////
            testInfo.forEach(function(infoDict) {
                if (infoDict.Answer_ID === "A")
                    $scope.questionA = infoDict;
                if (infoDict.Answer_ID === "B")
                    $scope.questionB = infoDict;
            });


            // When the user selects one of the questions (choices).
            $scope.buttonClicked = function(option) {
                var category = $scope["question" + option].Style;

                // This increments the total tally for that personality style
                TKAnswersService.saveAnswer(category);

                // OK we've reached the end of the questions so its time to crunch the numbers and reveal your true personality!
                if ($scope.qNumber == 30) {
                    performRequest();
                }
                else { // otherwise just go to the next question
                    var nextqNumber = Number($scope.qNumber) + 1;
                    $state.go('question', {
                        questionID: nextqNumber
                    });
                }
            };

            // When the user hits the "back" button
            $scope.goBack = function() {
                if ($scope.qNumber > 1)
                    TKAnswersService.eraseLastAnswer();
                $ionicHistory.goBack();
            };


            // This method processes the answers, saves the test, and goes to the results page.
            function performRequest() {

                // simply returns and copies the "answerCategories" object.
                var answersDict = angular.copy(TKAnswersService.getAnswers());

                // add a date stamp to the results
                var date = new Date();
                answersDict["createDate"] = date.toUTCString();

                // save the test
                TKAnswersService.saveTest(answersDict);

                // This sets a flag to show or not show the menu button
                TKResultsButtonService.setShouldShowMenuButton(true);

                // This affects the "back" functionality for the next page to be visited.
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });

                // go to the lobby page
                $state.go('lobby');
            }
        }
    ]);