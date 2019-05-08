(function() {
    'use strict';
    hrAdminApp.factory('CandidateUsersService', CandidateUsersService);
    CandidateUsersService.$inject = ['$rootScope', '$http'];

    function CandidateUsersService($rootScope, $http) {

        var rootUrl = $rootScope.CandidateAPIURL + 'Users';
        var frontEndURL = $rootScope.FrontEndURL;
        var getStatesListUrl = $rootScope.CandidateAPIURL + 'stateslist';

        var objCandidateUsersService = {};

        objCandidateUsersService.login = login;
        objCandidateUsersService.forcelogin = forcelogin;
        objCandidateUsersService.forgotPassword = forgotPassword;
        objCandidateUsersService.signup = signup;
        objCandidateUsersService.resetPassword = resetPassword;
        objCandidateUsersService.getClientIntro = getClientIntro;
        objCandidateUsersService.getOfferLetter = getOfferLetter;
        objCandidateUsersService.getStatesList = getStatesList;
        objCandidateUsersService.getHireInfo = getHireInfo;
        objCandidateUsersService.getCities = getCities;
        objCandidateUsersService.saveCommonDetails = saveCommonDetails;
        objCandidateUsersService.updateCommonDetails = updateCommonDetails;
        objCandidateUsersService.getReview = getReview;
        objCandidateUsersService.openUploadEchoSign = openUploadEchoSign;
        objCandidateUsersService.getresetPassword = getresetPassword;
        objCandidateUsersService.candidateDocUpload = candidateDocUpload;
        objCandidateUsersService.getAttachedFiles = getAttachedFiles;
        objCandidateUsersService.deleteAttachedFile = deleteAttachedFile;
        objCandidateUsersService.candidatedocreplace = candidatedocreplace;
        objCandidateUsersService.rejectOfferLetter = rejectOfferLetter;
        objCandidateUsersService.completeIt = completeIt;
        objCandidateUsersService.saveBgvDetails = saveBgvDetails;
        objCandidateUsersService.updateBgvDetails = updateBgvDetails;
        objCandidateUsersService.getRefernces = getRefernces;
        objCandidateUsersService.getEmploymentList = getEmploymentList;
        objCandidateUsersService.deleteBgvDetails = deleteBgvDetails;
        objCandidateUsersService.getAddressList = getAddressList;
        objCandidateUsersService.getEducationList = getEducationList;
        objCandidateUsersService.delechosignagreement = delechosignagreement;



        return objCandidateUsersService;

    
        
        function delechosignagreement(id) {
            return $http.delete($rootScope.CandidateAPIURL + 'delechosignagreement/' + id);

        }

        function saveBgvDetails(obj, url) {
            return $http({
                method: 'POST',
                url: $rootScope.CandidateAPIURL + url,
                data: JSON.stringify(obj),
                headers: { 'content-type': 'application/json' },
                transformRequest: angular.identity
            });
        } 
        
        function deleteBgvDetails(id, url) {
            return $http.delete($rootScope.CandidateAPIURL + url +'/' + id);

        }

        function updateBgvDetails(obj, url) {
            return $http({
                method: 'POST',
                url: $rootScope.CandidateAPIURL + url,
                data: JSON.stringify(obj),
                headers: { 'content-type': 'application/json' },
                transformRequest: angular.identity
            });
        } 
        
        function getAddressList(id) {
            return $http.get($rootScope.CandidateAPIURL + 'allAddress/' + id);
        }
        function getRefernces(id) {
            return $http.get($rootScope.CandidateAPIURL + 'allReferenceDetails/' + id);
        }
        
        function getEmploymentList(id) {
            return $http.get($rootScope.CandidateAPIURL + 'allEmployementDetails/' + id);
        }
        
        function getEducationList(id) {
            return $http.get($rootScope.CandidateAPIURL + 'allEducationDetails/' + id);
        }

        function candidatedocreplace(objDoc) {
            return $http({
                method: 'POST',
                url: $rootScope.CandidateAPIURL + 'candidatedocreplace',
                data: objDoc,
                headers: { 'Content-type': undefined },
                transformRequest: angular.identity
            });
        }
        
        function rejectOfferLetter(id) {
            // return $http.get($rootScope.CandidateAPIURL + 'offerletterreject/' + id);
            var obj = {
                "offerId":id,
                "comments":"not interested"
            }
            
            return $http({
                method: 'POST',
                url: $rootScope.CandidateAPIURL + 'offerletterreject',
                data: JSON.stringify(obj),
                headers: { 'content-type': 'application/json' },
                transformRequest: angular.identity
            });

        }         

        function completeIt(obj) {
            return $http({
                method: 'POST',
                url: $rootScope.CandidateAPIURL + 'certify',
                data: JSON.stringify(obj),
                headers: { 'content-type': 'application/json' },
                transformRequest: angular.identity
            });
        }       

        function candidateDocUpload(objDoc) {
            return $http({
                method: 'POST',
                url: $rootScope.CandidateAPIURL + 'candidatedocupload/',
                data: objDoc,
                headers: { 'Content-type': undefined },
                transformRequest: angular.identity
            });
        }

        function getAttachedFiles(workid, docid) {
            return $http.get($rootScope.CandidateAPIURL + 'candidatedoclist/' + docid + '/' + workid);

        }

        function getAttachedFiles(workid, docid) {
            return $http.get($rootScope.CandidateAPIURL + 'candidatedoclist/' + docid + '/' + workid);

        }

        function deleteAttachedFile(docid) {
            return $http.delete($rootScope.CandidateAPIURL + 'deletecandidatedoc/' + docid);

        }


        function getCities(id) {
            return $http.get($rootScope.CandidateAPIURL + 'citieslist');
        }

        function getresetPassword(token) {
            return $http.get($rootScope.CandidateAPIURL + 'getresetPassword/' + token);
        }

        function getReview(id) {
            return $http.get($rootScope.CandidateAPIURL + 'review/' + id);
        }

        function openUploadEchoSign(hireId, stepid, docid) {
            return $http.get($rootScope.CandidateAPIURL + 'stepsUploadEchosign/' + hireId + '/' + stepid + '/'+ docid);
        }

        function getStatesList() {
            return $http.get(getStatesListUrl);
        }

        function forcelogin(email, password) {
            return $http.post($rootScope.CandidateAPIURL + 'forcelogin', { emailId: email, password: password }, { headers: { 'Content-type': 'application/json' } });
        }

        function login(email, password) {
            return $http.post($rootScope.CandidateAPIURL + 'login', { emailid: email, password: password }, { headers: { 'content-type': 'application/json' } });
        }


        function saveCommonDetails(data) {
            return $http.post($rootScope.CandidateAPIURL + 'profiledetails',
                data, { headers: { 'content-type': 'application/json' } });
        }

        function updateCommonDetails(data) {
            return $http.post($rootScope.CandidateAPIURL + 'editprofiledetails',
                data, { headers: { 'content-type': 'application/json' } });
        }

        // function forgotPassword(email, frontend = frontEndURL) {
        //     return $http.get($rootScope.CandidateAPIURL + 'forgetPassword/' + email, frontend);
        // }

        function forgotPassword(obj) {
            //if (!frontend) frontend = frontEndURL;
            return $http.post($rootScope.CandidateAPIURL + 'forgot', obj , { headers: { 'Content-type': 'application/json' } });
        }

        function signup(obj) {
            return $http.post($rootScope.CandidateAPIURL + 'signup', obj);
        }

        // function resetPassword(token, email, pwd) {
        //     return $http.post($rootScope.CandidateAPIURL + 'resetPassword/' + token, { emailId: email, password: pwd });
        // }

        function getClientIntro(id) {
            return $http.get($rootScope.CandidateAPIURL + 'clientintro/' + id);
        }

        function getOfferLetter(id) {
            return $http.get($rootScope.CandidateAPIURL + 'offerletter/' + id);
        }

        function getHireInfo(id) {
            return $http.get($rootScope.CandidateAPIURL + 'viewCandidateDetailsList/' + id);
        }

        function resetPassword(details) {
            return $http({
                method: 'POST',
                url: $rootScope.CandidateAPIURL + 'reset',
                data: JSON.stringify(details),
                headers: {
                    'Content-type': 'application/json'
                }
            });
        }

    }
})();