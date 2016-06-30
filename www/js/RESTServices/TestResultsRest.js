angular.module('RESTServices')
.service ('TestResultsRest', ['$http', function($http){
    
    var TestResultsRest = this;
    var url = 'https://strongloop-backend-2-bitflipper86.c9users.io/api/TestResults';
    
    
    TestResultsRest.save = function(test) {
        
        return $http({
            
            url: url,
            method: 'POST',
            data: test
            
        });
        
    };
    
    TestResultsRest.getAll = function() {
        
        return $http({
            
            url: url,
            method: 'GET'
            
        });
        
    };    
    
}])