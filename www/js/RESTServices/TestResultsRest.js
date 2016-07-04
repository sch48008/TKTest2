angular.module('RESTServices')
.service ('TestResultsRest', ['$http', function($http){
    
    var TestResultsRest = this;
    var url = 'https://strongloop-backend-2-bitflipper86.c9users.io/api/TestResults';
    
    // Save test results
    TestResultsRest.save = function(test) {
        
        return $http({
            
            url: url,
            method: 'POST',
            data: test
            
        });
        
    };
    
    
    // Get all tests by user
    TestResultsRest.getAllTestsByUser = function(userID, token) {
        
        var filter = "?filter[where][userID]=" + userID;
        
        return $http({
            
            url: url + filter,
            method: 'GET',
            params: {access_token: token}
            
        });
        
    };
    
    
        // From February cohort...
        // // This retrieves all of the result sets for a particular user
        // service.getResultsByUser = function(userID, token) {
        //     return $http.get(getUrl() + "?filter[where][userID]=" + userID, {
        //         params: {
        //             access_token: token
        //         }
        //     });
        // };    
    
}])