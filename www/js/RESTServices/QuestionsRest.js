angular.module('RESTServices')
.service ('QuestionsRest', ['$http', function($http){
    
    var QuestionsRest = this;
    var url = 'https://strongloop-backend-2-bitflipper86.c9users.io/api/Questions';
    
    QuestionsRest.save = function(test) {
        
        return $http({
            
            url: url,
            method: 'POST',
            data: ''
            
        });
        
    };
    
    QuestionsRest.getAll = function() {
        
        return $http({
            
            url: url,
            method: 'GET'
            
        });
        
    };    
    
}])