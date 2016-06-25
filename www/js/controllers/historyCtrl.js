angular.module('starter.controllers')
.controller('HistoryCtrl', ['$scope', '$window', '$state', 'tests', 'TKAnswersService', 'TKResultsButtonService',
function($scope, $window, $state, tests, TKAnswersService, TKResultsButtonService) {
    
    $scope.tests = tests === undefined ? [] : tests;
    
    $scope.goToResult = function(test)
    {
        var answers = {
            "competing": test.competing,
            "collaborating": test.collaborating,
            "compromising": test.compromising,
            "avoiding": test.avoiding,
            "accommodating": test.accommodating
        };
        
        // Here we replace the "answerCategories" object which is stored in the TKAnswersService service.
        // Note that this object must be stored in a service that is injected into two different controllers (ResultsCtrl and HistoryCtrl).
        // Services are where we store data that must be accesed by more than one controller.
        TKAnswersService.setAnswers(answers);
        
        // This sets a flag to show or not show the menu button
        TKResultsButtonService.setShouldShowMenuButton(false);
        
        // Finally we go the "results" state which will display the results chart just as if we had just completed a test.
        $state.go('results');
    };    
    
    
}]);

// rjs note:  In the controller constructor it appears we are injecting an array? ("tests" is defined as an array in the route table.)