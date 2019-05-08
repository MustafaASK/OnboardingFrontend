(function () {
    'use strict';
    hrAdminApp.factory('UsersService', usersService);
    usersService.$inject = ['$rootScope', '$http'];

    function usersService($rootScope, $http) {

        var rootUrl = $rootScope.APIURL + 'Users';
        var frontEndURL = $rootScope.FrontEndURL;

        var objUsersService = {};

        objUsersService.login = login;
        objUsersService.forcelogin = forcelogin;
        objUsersService.forgotPassword = forgotPassword;
        objUsersService.signup = signup;
        objUsersService.resetPassword = resetPassword;
        objUsersService.getResetPassword = getResetPassword;
        objUsersService.getCountries = getCountries;
        objUsersService.getCompanySize = getCompanySize;

        return objUsersService;

        function forcelogin(email, password) {
            return $http.post($rootScope.APIURL + 'forcelogin', 
                { emailId: email, password: password }, 
                { headers: { 'Content-type': 'application/json' } });
        }

        function login(email, password) {
            return $http.post($rootScope.APIURL + 'login', 
                { emailId: email, password: password }, 
                { headers: { 'content-type': 'application/json' } });
        }

        // function forgotPassword(email, frontend = frontEndURL) {
        //     return $http.get($rootScope.APIURL + 'forgetPassword/' + email, frontend);
        // }

        function forgotPassword(email, frontend) {
            if (!frontend) frontend = frontEndURL;
            return $http.post($rootScope.APIURL + 'forgetPassword', 
                {emailId: email, frontendurl: frontend},
                {headers: {'Content-type': 'application/json'} }
            );
        }

        function signup(obj) {
            return $http.post($rootScope.APIURL + 'signup', obj);
        }

        function resetPassword(email, pwd) {
            return $http.post($rootScope.APIURL + 'resetPassword', { emailId: email, password: pwd });
        }

        // http://192.168.1.198:8080/OnBoarding/getresetPassword/mustafa@askstaffing.com:1521460507859:bed962c6b4ece8b6cf8cb946830cc37b

        function getResetPassword(token) {
            return $http.get($rootScope.APIURL + 'getresetPassword/' + token);
        }

        function getCountries() {
            return $http.get($rootScope.APIURL + 'countries');
        }

        function getCompanySize() {
            return $http.get($rootScope.APIURL + 'companysize');
        }

    }
})();