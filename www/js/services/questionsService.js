angular.module('TKTestQuestions', [])
    .service('TKTestQuestionService', ['$http', function($http) {
        
        var service = this;
        var questions = [];

        // get all the questions from the json file and place them in the "questions[]" array.
        service.all = function () {
        $http.get('files/questions.json')
        .then(function(response){
            if(response.status == 200)
            {
                questions = response.data;
            }
        });
    };
        


        // Get the two questions that have the right questionID (1,2,3,etc.)
        service.getQuestion = function(questionID) {
            
            var results = [];

            // iterate thru the entire array of 60 questions
            questions.forEach(function(question) {
                
                //Search for questions with the specified question ID
                if (question.Question_Number == questionID)
                    results.push(question);
            });
            
            // This should return an array containing two questions
            return results;
        };
    }]);