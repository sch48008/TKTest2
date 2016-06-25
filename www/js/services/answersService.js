angular.module('TKTestAnswers', [])
    .service('TKAnswersService', ['$window', function($window) {
        var service = this;
        var answerCategories = {
            "competing": 0,
            "collaborating": 0,
            "compromising": 0,
            "avoiding": 0,
            "accommodating": 0
        };
        var categoriesStack = [];

        // return the "answerCategories" object
        service.getAnswers = function() {
            return answerCategories;
        };

        // increment the tally
        service.saveAnswer = function(answerCategory) {
            answerCategories[answerCategory.toLowerCase()]++;
            categoriesStack.push(answerCategory);
        };


        // Sets all answerCategories properties back to zero (re-initializes the tally object for the next user).
        service.resetAnswers = function() {
            for (var property in answerCategories) {
                if (answerCategories.hasOwnProperty(property)) {
                    answerCategories[property] = 0;
                }
            }
        };

        // used when the user presses the back button
        service.eraseLastAnswer = function() {
            answerCategories[categoriesStack.pop().toLowerCase()]--;
        };

        // Every time we finish a test we save the set of answers to an array in $window.localStorage as a record of past tests.
        service.saveTest = function(test) {
            var tempTests = $window.localStorage.tests === undefined ? [] : JSON.parse($window.localStorage.tests);
            tempTests.push(test);
            $window.localStorage.tests = JSON.stringify(tempTests);
        };

        service.getTests = function() {
            return JSON.parse($window.localStorage.tests);
        };

        service.setAnswers = function(answers) {
            answerCategories = answers;
        };


    }]);
