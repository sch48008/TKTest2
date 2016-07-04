angular.module('TKTestAnswers', [])
    .service('TKAnswersService', ['$window', 'TestResultsRest', function($window, TestResultsRest) {
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
            
            // set user id
            test.userID = $window.localStorage.userID;
            
            // using back-end now
            TestResultsRest.save(test);
        };
        

        // When the user preses the "My Results" button
        service.getAllTestsByUser = function() {
            
            return TestResultsRest.getAllTestsByUser($window.localStorage['userID'], $window.localStorage['token'])
            .then(function(res){
                if(res.status == 200){
                    return res.data;
                } else {
                    alert("Error occurred.  Error status = " + res.status);
                }
                
            }, function(err) {
                
                console.log(err);
                if(err.status == 404){
                    alert("server address was not found.");
                } else if (err.status == 500){
                    alert("server appears to be offline.");
                }
                return err;
            });
            
        };

        service.setAnswers = function(answers) {
            answerCategories = answers;
        };


    }]);
