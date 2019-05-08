(function () {
    candidateApp.config([
        '$mdThemingProvider',
        '$stateProvider',
        '$locationProvider',
        '$urlRouterProvider',
        '$mdIconProvider',
        '$mdToastProvider',
        '$mdDateLocaleProvider',

        function (
            $mdThemingProvider,
            $stateProvider,
            $locationProvider,
            $urlRouterProvider,
            $mdIconProvider,
            $mdToastProvider,
            $mdDateLocaleProvider
        ) {
            $mdDateLocaleProvider.formatDate = function (date) {
                return date ? moment(date).format('L') : '';
            };

            /**
             * @param dateString {string} string that can be converted to a Date
             * @returns {Date} JavaScript Date object created from the provided dateString
             */
            $mdDateLocaleProvider.parseDate = function (dateString) {
                var m = moment(dateString, 'L', true);
                return m.isValid() ? m.toDate() : new Date(NaN);
            };

            var env = {};
            var envColors = {};
            // Import variables if present (from env.js)
            if (window) {
                // Object.assign is not supported in IE11 and hence ...
                angular.extend(env, window.__env);
                angular.extend(envColors, window.__envColors);
            }
            // Define AngularJS application
            var ngModule = angular.module('app', []);
            // Register environment in AngularJS as constant
            ngModule.constant('__env', env);
            ngModule.constant('__envColors', envColors);
            // Define AngularJS;
            var rootUrl = env.rootUrl;
            var secondaryColor = envColors.secondaryColor;


            $mdToastProvider.addPreset('tradzProToast', {
                argOption: 'textContent',
                methods: ['textContent', 'content', 'header', 'icon', 'action', 'highlightAction', 'highlightClass', 'theme', 'parent'],
                options: ["$mdToast", "$mdTheming", function ($mdToast, $mdTheming) {
                    return {
                        template: '<md-toast md-theme="{{ toast.theme }}" ng-class="{\'md-capsule\': toast.capsule}">' +
                            '  <div class="md-toast-content" style="border-radius:5px;padding-top:5px;">' +
                            '    <md-icon md-svg-icon="{{ toast.icon }}" style="margin-top:10px;"></md-icon>' +
                            '    <div flex="5"></div>' +
                            '    <span class="md-toast-text" role="alert" aria-relevant="all" aria-atomic="true">' +
                            '      <div class="md-toast-header">{{ toast.header }}</div>' +
                            '      <div>{{ toast.content }}</div>' +
                            '    </span>' +
                            '  </div>' +
                            '</md-toast>',
                        controller: ["$scope", function mdToastCtrl($scope) {
                            var self = this;

                            if (self.highlightAction) {
                                $scope.highlightClasses = [
                                    'md-highlight',
                                    self.highlightClass
                                ]
                            }

                        }],
                        theme: $mdTheming.defaultTheme(),
                        controllerAs: 'toast',
                        bindToController: true,
                        timeDelay: 8000
                    };
                }]
            });


            $mdThemingProvider.definePalette('OnBoardingPrimaryPalette', {
                '50': 'eaeaea',
                '100': 'c1c0c0',
                '200': '979697',
                '300': '6e6d6d',
                '400': '454344',
                '500': secondaryColor,
                '600': '171617',
                '700': '121112',
                '800': 'ff0000',
                '900': '080808',
                'A100': 'd85d5b',
                'A200': '2c2a2b',
                'A400': '222122',
                'A700': '191818',
                'A900': '0f0e0f',
                'font': '1b2c3c',
                'contrastDefaultColor': 'light', // whether, by default, text (contrast)
                // on this palette should be dark or light

                'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                    '200', '300', '400', 'A100'
                ],
                'contrastLightColors': undefined // could also specify this if default was 'dark'
            });

            var neonRedMap = $mdThemingProvider.extendPalette('OnBoardingPrimaryPalette', {
                '400': secondaryColor
            });
            $mdThemingProvider.definePalette('neonRed', neonRedMap);

            // Accent palette is used for the ink bar on tabs
            // Reference - https://github.com/angular/material/issues/7685
            $mdThemingProvider.theme('default').primaryPalette('OnBoardingPrimaryPalette')
                .accentPalette('neonRed', { 'default': '400' });
            $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
            $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();

            $locationProvider.hashPrefix('');
            $stateProvider
                // .state('candidate', {
                //     url: "/candidate",
                //     templateUrl: rootUrl + "/components/html",
                //     data: {
                //         IsPublicState: true
                //     }
                // })
                .state('login', {
                    url: "/login",
                    templateUrl: rootUrl + "/components/login/login.html",
                    controller: 'CandidateLoginController',
                    controllerAs: 'vm',
                    data: {
                        IsPublicState: true
                    }
                })
                .state('forgotpassword', {
                    url: "/forgot-password",
                    templateUrl: rootUrl + "/components/forgot-password/forgotPassword.html",
                    controller: 'CandidateForgotPasswordController',
                    controllerAs: 'vm',
                    data: {
                        IsPublicState: true
                    }
                })
                .state('offerletter', {
                    url: "/acceptancy-letter",
                    templateUrl: rootUrl + "/components/offer-letter/offerLetter.html",
                    controller: 'OfferLetterController',
                    controllerAs: 'vm',
                    data: {
                        IsPublicState: true
                    }
                })
                .state('candidateinfo', {
                    url: "/candidateinfo",
                    templateUrl: rootUrl + "/components/candidateinfo/candidateinfo.html",
                    controller: 'CandidateInfoController',
                    controllerAs: 'vm',
                    data: {
                        IsPublicState: true
                    }
                })

                // .state('candidateinfo', {
                //     url: "/candidateinfo",
                //     templateUrl: rootUrl + "/components/candidateinfo/candidateinfo.html",
                //     controller: 'CandidateInfoController',
                //     controllerAs: 'vm',
                //     data: {
                //         IsPublicState: true
                //     }
                // })
                // .state('candidateinfo.bgvforms', {
                //     url: "/bgvforms",
                //     templateUrl: rootUrl + "/components/candidateinfo/bgvforms/bgvforms.html",
                //     controller: 'commonDetailsController',
                //     controllerAs: 'vm',
                //     controller: 'bgvFormsController',
                //     controllerAs: 'vm',
                //     data: {
                //         IsPublicState: true
                //     }
                // })

                // .state('candidateinfo.commondetails', {
                //     url: "/commondetails",
                //     templateUrl: rootUrl + "/components/candidateinfo/commondetails/commondetails.html",
                //     controller: 'commonDetailsController',
                //     controllerAs: 'vm',
                //     data: {
                //         IsPublicState: true
                //     },
                //     resolve: {
                //         commonDtls: ['$stateParams', '$state', '$rootScope' , 'CommondetailsService', 'ToastrService', function ($stateParams, $state,$rootScope, CommondetailsService, ToastrService) {
                //             CommondetailsService.getOfferLetterStatus($rootScope.CandidateInfo.newhireid).then(
                //                 function (response) {
                //                     // vm.generalSettings = response.data;
                //                     if(response.data.statusid != 3){
                //                         $rootScope.CandidateInfo.statusid = response.data.statusid;
                //                         localStorage.setItem("candidateInfo", JSON.stringify($rootScope.CandidateInfo));    
                //                         $state.go('offerLetterWarning');
                //                     }
                //                 },
                //                 function (err) {
                //                     ToastrService.error("Error occured while retrieving offer letter status.");
                //                 })
                //         }]
                //     }
                // })

                // .state('candidateinfo.contractorinfo', {
                //     url: "/contractorinfo",
                //     templateUrl: rootUrl + "/components/candidateinfo/contractorinfo/contractorinfo.html",
                //     controller: 'ContractorInfoController',
                //     controllerAs: 'vm',
                //     data: {
                //         IsPublicState: true
                //     }
                // })

                // .state('candidateinfo.eeo', {
                //     url: "/eeo",
                //     templateUrl: rootUrl + "/components/candidateinfo/eeo/eeo.html",
                //     controller: 'EEOController',
                //     controllerAs: 'vm',
                //     data: {
                //         IsPublicState: true
                //     }
                // })

                // .state('candidateinfo.payrollpackage', {
                //     url: "/payrollpackage",
                //     templateUrl: rootUrl + "/components/candidateinfo/payrollpackage/payrollpackage.html",
                //     controller: 'PayrollPackageController',
                //     controllerAs: 'vm',
                //     data: {
                //         IsPublicState: true
                //     }
                // })


                .state('reset', {
                    url: "/reset/:token",
                    templateUrl: rootUrl + "/components/forgot-password/resetPassword.html",
                    controller: 'CandidateForgotPasswordController',
                    controllerAs: 'vm',
                    resolve: {
                        resetPswdInfo: ['$stateParams', '$state', 'CandidateUsersService', 'ToastrService', function ($stateParams, $state, CandidateUsersService, ToastrService) {
                            var resetUrlToken = $stateParams.token;
                            CandidateUsersService.getresetPassword($stateParams.token).then(function (response) {
                                if (response.data.Error) {
                                    // debugger
                                    localStorage.setItem('emailFromToken', resetUrlToken);
                                    $state.go('login');
                                }
                                else if (response.data.Expired) {
                                    $state.go('linkExpired');
                                }
                            },
                                function (error) {
                                    // ToastrService.error("Cant reset password");
                                })
                        }]
                    }
                })

                .state('introduction', {
                    url: "/introduction",
                    templateUrl: rootUrl + '/components/introduction/dashboardIntroduction.html',
                    controller: 'DashboardIntroController',
                    controllerAs: 'vm',
                    data: {
                        IsPublicState: true
                    }

                })

                .state('dashboard', {
                    url: "/dashboard",
                    templateUrl: rootUrl + '/components/dashboard/candidateDashboard.html',
                    controller: 'CandidateDashboardController',
                    controllerAs: 'vm',
                    data: {
                        IsPublicState: true
                    }

                })

                .state('offerLetterWarning', {
                    url: "/acceptancy-not-signed",
                    templateUrl: rootUrl + "/components/offer-letter-warning/offerLetterWarning.html",
                    controller: 'OfferLetterWarningController',
                    controllerAs: 'vm',
                    data: {
                        IsPublicState: true
                    }
                })


                .state('linkExpired', {
                    url: "/link-expired",
                    templateUrl: rootUrl + "/components/common/link-expired.html",
                    controller: 'CandidateSignupController',
                    controllerAs: 'vm',
                    data: {
                        IsPublicState: true
                    }
                })

                /* */



            $urlRouterProvider.otherwise(function ($injector, $location) {
                // console.log("Warning: otherwise got kicked!");
                console.log(123);
                var $state = $injector.get("$state");
                var otherurl = $location.$location.$$absUrl;
                if(otherurl.indexOf('candidate/reset/') != -1){
                    otherurl = otherurl.replace('candidate/reset','reset');
                    window.location.href = otherurl;
                } else {
                    $state.go('login');
                }
            });

        }
    ]);

    candidateApp.run(['$rootScope', '$state', '$transitions', '$interval', '$location', '$http', 'ToastrService',  'NavigationService', function ($rootScope, $state, $transitions, $interval, $location, $http, ToastrService, NavigationService) {
        $rootScope.$state = $state;
        $rootScope.isCandidate = true;
        $rootScope.isCandidateAPICalls = true;
        $rootScope.CandidateInfo = null;
        // console.log($state)


        var env = {};
        var envColors = {};
        // Import variables if present (from env.js)
            // Define AngularJS application
            var ngModule = angular.module('app', []);
            // Register environment in AngularJS as constant
            ngModule.constant('__env', env);
            ngModule.constant('__envColors', envColors);
        if (window) {
            angular.extend(env, window.__env);
            angular.extend(envColors, window.__envColors);
        }

        $rootScope.APIURL = env.APIURL;
        $rootScope.CandidateAPIURL = env.CandidateAPIURL;
        $rootScope.UploadsURL = env.UploadsURL;
        $rootScope.DocsURL = env.DocsURL;
        $rootScope.NewHireDocsURL = env.NewHireDocsURL;
        $rootScope.SignImageURL = env.SignImageURL
        $rootScope.EchoDocsURL = env.EchoDocsURL
        $rootScope.CandidateDocsURL = env.CandidateDocsURL;
        $rootScope.ProfilePicURL = env.ProfilePicURL;
        $rootScope.SignedOfferLetterURL = env.SignedOfferLetterURL;
        $rootScope.offerLetterPreview = env.offerLetterPreview;
        $rootScope.ImagesURL = env.ImagesURL;
        $rootScope.LogoURL = env.LogoURL;
        $rootScope.BackgroundURL = env.BackgroundURL;
        //$rootScope.LogoImagesURL = envColors.logoSrc;
        $rootScope.BrandingImagesURL = envColors.backgroundSrc;
        $rootScope.FrontEndURL = env.FrontEndURL;
        $rootScope.FrontEndURLForCandidate = env.FrontEndURLForCandidate;
        $rootScope.FrontEndURLForCandidateLogin = env.FrontEndURLForCandidateLogin;

        
        $rootScope.CopyrightsFooter = localStorage.getItem('CopyrightsFooter');

        $rootScope.errors = env.errors;
        $rootScope.errorMsgs = env.errorMsgs;
        $rootScope.rootUrl = env.rootUrl;


        $rootScope.LogoImagesURL = $rootScope.UploadsURL + '/OnBoarding/Branding/logo/' + brandingImages.logoimg;
        $rootScope.bgImagesURL = $rootScope.UploadsURL + '/OnBoarding/Branding/bgimg/' + brandingImages.bgimg;

        // function candiLogoandimagepath() {
        //     NavigationService.candiLogoandimagepath().then(
        //         function (response) {
        //             $rootScope.LogoImagesURL = $rootScope.UploadsURL + '/OnBoarding/Branding/logo/' + response.data.Branding.logoimg;
        //             $rootScope.bgImagesURL = $rootScope.UploadsURL + '/OnBoarding/Branding/bgimg/' + response.data.Branding.bgimg;
        //         },
        //         function (err) {
        //         }
        //     )
        // }


        // candiLogoandimagepath();


        $rootScope.get_profilepic = function (filename) {
            // console.log($rootScope.UserInfo);
            if ($rootScope.UserInfo) {
                var userid = filename.split('.')[0];
                var iElem = document.getElementById('pic-' + userid);
                iElem.src = iElem.src + '?' + (new Date()).getTime();
                return $rootScope.ProfilePicURL + filename;
            }
            return;
        }

        $transitions.onStart({}, function (transition) {

            var currentState = transition.to().name;
            $rootScope.isCandidate = true;
                $rootScope.CandidateInfo = localStorage.getItem('candidateInfo') ? JSON.parse(localStorage.getItem('candidateInfo')) : null;
                if (localStorage.getItem('atleastOneDocCompleted') == null) {
                    localStorage.setItem('atleastOneDocCompleted', false);
                }
                $rootScope.atleastOneDocCompleted = localStorage.getItem('atleastOneDocCompleted') ? JSON.parse(localStorage.getItem('atleastOneDocCompleted')) : false;
            

                $rootScope.isCandidate = true;
                $rootScope.isCandidateAPICalls = true;
            

            if ($rootScope.isCandidate && $rootScope.CandidateInfo) {
                // console.log("State does not require for  Access granted");
                return true;
            }
            if (currentState == "forgotpassword" || currentState == "reset" || currentState == "linkExpired") {
                return true;
            }

            if ($rootScope.isCandidate && !$rootScope.CandidateInfo && transition.to().name !== 'reset' && transition.to().name !== 'forgotpassword' && transition.to().name !== 'linkExpired') {
                // console.log("ERROR: Token missing! Cannot proceed further.");
                $state.go('login');
            }

            // console.log("Transition Hook: state change started!");
            if ((transition.to().name === 'ResetPassword' ||
                transition.to().name === 'getResetPassword' ||
                transition.to().name === 'ForgotPassword' ||
                transition.to().name === 'Signup' ||
                transition.to().name === 'ThankYou') && !$rootScope.isCandidate) {
                // console.log("State does not require a token. Access granted");
                return true;
            }

        });

    }])
        .config(['$logProvider', function ($logProvider) {
            $logProvider.debugEnabled(true); // turns off the calls to $log.debug, but not the others
        }]);
}());