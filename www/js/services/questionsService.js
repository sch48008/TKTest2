angular.module('TKTestQuestions', [])
    .service('TKTestQuestionService', ['$http', function($http) {
        
        var service = this;
        var questions = [];

        // revise this
        service.all = function () {
        $http.get('files/questions.json')
        .then(function(response){
            if(response.status == 200)
            {
                questions = response.data;
            }
        });
    };
        



        // I'm not understanding this method.  Where is the "questions" array declared?
        service.getQuestion = function(questionID) {
            
            
            var results = [];

            questions.forEach(function(question) {

                console.log(question);

                //Search for questions with the specified question ID
                if (question.Question_Number == questionID)
                    results.push(question);
            });
            return results;
        };
    }]);