angular.module('starter.controllers')
    .controller('ResultsCtrl', ['$scope', 'TKAnswersService', '$ionicHistory', '$state', 'TKResultsButtonService',
        function($scope, TKAnswersService, $ionicHistory, $state, TKResultsButtonService) {
            
            // a boolean used simply to show or hide the menu button
            $scope.shouldShowButton = TKResultsButtonService.getShouldShowMenuButton();

            // back button handler
            $scope.menuButtonTapped = function() {
                $ionicHistory.nextViewOptions({
                    historyRoot: true,
                    disableBack: true
                });
                $state.go('lobby');
            };

            // To be used as labels on our bar chart.
            $scope.labels = ["Competing", "Collaborating", "Compromising", "Avoiding", "Accommodating"];

            // The array of category totals is stored in the TKAnswersService service.  "getAnswers" simply returns the array.
            var answersInfo = TKAnswersService.getAnswers();

            // utility function
            function returnPercentage(value) {
                return (value / 12) * 100;
            }

            // the category totals expressed as a percentage
            $scope.data = [
                [
                    returnPercentage(answersInfo["competing"]),
                    returnPercentage(answersInfo["collaborating"]),
                    returnPercentage(answersInfo["compromising"]),
                    returnPercentage(answersInfo["avoiding"]),
                    returnPercentage(answersInfo["accommodating"])
                ]
            ];

            // chart options
            $scope.options = {
                scaleIntegersOnly: true,
                animation: false,
                responsive: true,
                maintainAspectRatio: false,
                scaleOverride: true,
                scaleSteps: 4,
                scaleStepWidth: 25,
                scaleStartValue: 0,
                scaleLabel: "<%=value%>" + "%",
                tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value.toFixed(0) %>" + "%",
            };

            // chart colors
            $scope.colours = [{
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(15,187,25,1)",
                pointColor: "rgba(15,187,25,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,0.8)"
            }];



        } // end of function($scope, TKAnswersService, $ionicHistory, $state) {...
    ]);
