(function () {
    "use strict";

    candidateApp.factory('httpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$q', '$rootScope', '$log', '$state'];

    candidateApp.config(config);

    config.$inject = ['$httpProvider'];

    function httpInterceptor($q, $rootScope, $log, $state) {
        var numLoadings = 0;

        return {
            request: function (config) {
                if(!$rootScope.isCandidateAPICalls){
                    config.headers['ask-auth-token'] = $rootScope.Token;
                }
                if(!$rootScope.isCandidate && $rootScope.isCandidateAPICalls){
                    $rootScope.isCandidateAPICalls = false;
                }
                // console.log($rootScope.Token);

                // Remove this block after changing the data to be posted from form data to JSON
                // if(config.method == "POST"){
                //     config.headers['Content-Type'] =undefined;
                //     config.transformRequest = angular.identity;
                // }

                if (!config.noLoader) {
                    numLoadings++;
                    $rootScope.$broadcast("loader_show");
                }
                return config || $q.when(config);
            },
            response: function (response) {
                if (!response.config.noLoader) {
                    if ((--numLoadings) === 0) {
                        $rootScope.$broadcast("loader_hide");
                    }
                }
                // Logout the user if token has expired
                var msg = $rootScope.errorMsgs.TOKEN_EXPIRED;
                if (response.data.Status == 401 && response.data.message == msg) {
                    // console.log("Token has Expired. Changing state to Login.");
                    localStorage.removeItem("ask-auth-token");
                    $state.go('Login');
                }

                return response || $q.when(response);
            },
            responseError: function (response) {
                if (!(--numLoadings)) {
                    $rootScope.$broadcast("loader_hide");
                }                
                return $q.reject(response);
            }
        };
    }

    function config($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }

}());