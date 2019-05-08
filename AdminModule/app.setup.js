(function () {
    hrAdminApp.config([
        '$mdThemingProvider',
        '$stateProvider',
        '$locationProvider',
        '$urlRouterProvider',
        '$mdIconProvider',
        '$mdToastProvider',
        'KeepaliveProvider',
        'IdleProvider',
        '$mdDateLocaleProvider',

        function (
            $mdThemingProvider,
            $stateProvider,
            $locationProvider,
            $urlRouterProvider,
            $mdIconProvider,
            $mdToastProvider,
            KeepaliveProvider,
            IdleProvider,
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
            // console.log(env);
            var rootUrl = env.rootUrl;
            var secondaryColor = envColors.secondaryColor;

            IdleProvider.idle(env.idleTime);
            // User will timeout at the end of 5 seconds after considered idle. 
            IdleProvider.timeout(5);
            KeepaliveProvider.interval(60);

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
                .state('Login', {
                    url: "/",
                    templateUrl: rootUrl + "/components/users/login/login.html",
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    data: {
                        IsPublicState: true
                    }
                })

                .state('Signup', {
                    url: "/signup",
                    templateUrl: rootUrl + "/components/users/signup/signup.html",
                    controller: 'SignupController',
                    controllerAs: 'vm',
                    data: {
                        IsPublicState: true
                    }
                })
                .state('ThankYou', {
                    url: "/thankyou",
                    templateUrl: rootUrl + "/components/users/signup/thankyou.html",
                    controller: 'SignupController',
                    controllerAs: 'vm',
                    data: {
                        IsPublicState: true
                    }
                })
                .state('ForgotPassword', {
                    url: "/forgot-password",
                    templateUrl: rootUrl + "/components/users/forgot-password/forgotPassword.html",
                    controller: 'ForgotPasswordController',
                    controllerAs: 'vm',
                    data: {
                        IsPublicState: true
                    }
                })
                .state('ResetPassword', {
                    url: "/resetPassword",
                    templateUrl: rootUrl + "/components/users/forgot-password/resetPassword.html",
                    controller: 'ForgotPasswordController',
                    controllerAs: 'vm'
                })
                .state('getResetPassword', {
                    url: "/getresetPassword/:token",
                    templateUrl: rootUrl + "/components/users/forgot-password/resetPassword.html",
                    controller: 'ForgotPasswordController',
                    controllerAs: 'vm'
                })
                .state('Dashboard', {
                    cache: false,
                    url: "/dashboard",
                    templateUrl: rootUrl + "/components/dashboard/dashboard.html",
                    controller: 'DashboardController',
                    controllerAs: 'vm'
                })
                /* .state('commonDetails',{
                     url : "/commonDetails",
                     templateUrl :  rootUrl + '/components/commonDetails/commonDetails.html',
                     controller : 'commonDetailsController',
                     controllerAs: 'vm'

                 })*/


                .state('myAccount', {
                    cache: false,
                    url: "/myAccount",
                    templateUrl: rootUrl + "/components/myaccount/myaccount.html",
                    controller: 'MyAccountController',
                    controllerAs: 'vm'
                })




                .state('Settings', {
                    cache: false,
                    abstract: false,
                    url: "/settings",
                    views: {
                        '': {
                            templateUrl: rootUrl + "/components/settings/settings.html",
                            controller: 'SettingsController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('Settings.GeneralSettings', {
                    cache: false,
                    url: "/general-settings",
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/general_settings/generalSettings.html",
                            controller: 'GeneralSettingsController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('Settings.IntroPage', {
                    cache: false,
                    url: "/intro-pages",
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/intro_page/introPage.html",
                            controller: 'IntroPageController',
                            controllerAs: 'vm'
                        },
                        'NoIntroPages@Settings.IntroPage': {
                            templateUrl: rootUrl + "/components/settings/intro_page/noIntroPages.html"
                        }
                    }
                })
                .state('Settings.EditIntroPage', {
                    cache: false,
                    url: "/intro-pages/edit/:id/:clientName/:clientId",
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/intro_page/edit/editIntroPage.html",
                            controller: 'EditIntroPageController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('Settings.AddIntroPage', {
                    cache: false,
                    url: "/intro-pages/add",
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/intro_page/edit/editIntroPage.html",
                            controller: 'EditIntroPageController',
                            controllerAs: 'vm'
                        }
                    }
                })

                // .state('IntroPage', {
                //     cache: false,
                //     url: "/intro-pages",
                //     parent: 'Settings',
                //     views: {
                //         'SettingsOptions@Settings': {
                //             templateUrl: rootUrl + "/components/settings/intro_page/introPage.html",
                //             controller: 'IntroPageController',
                //             controllerAs: 'vm'
                //         },
                //         'NoIntroPages@IntroPage': {
                //             templateUrl: rootUrl + "/components/settings/intro_page/noIntroPages.html"
                //         }
                //     }
                // })
                // .state('EditIntroPage', {
                //     cache: false,
                //     url: "/intro-pages/edit/:id/:clientName/:clientId",
                //     parent: 'Settings',
                //     views: {
                //         'SettingsOptions@Settings': {
                //             templateUrl: rootUrl + "/components/settings/intro_page/edit/editIntroPage.html",
                //             controller: 'EditIntroPageController',
                //             controllerAs: 'vm'
                //         }
                //     }
                // })
                // .state('AddIntroPage', {
                //     cache: false,
                //     url: "/intro-pages/add",
                //     parent: 'Settings',
                //     views: {
                //         'SettingsOptions@Settings': {
                //             templateUrl: rootUrl + "/components/settings/intro_page/edit/editIntroPage.html",
                //             controller: 'EditIntroPageController',
                //             controllerAs: 'vm'
                //         }
                //     }
                // })
                .state('Settings.ManageUsers', {
                    url: "/users",
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/users/list/usersList.html",
                            controller: 'UsersListController',
                            controllerAs: 'vm'
                        },
                        'NoUsers@Settings.ManageUsers': {
                            templateUrl: rootUrl + "/components/settings/users/list/noUsers.html"
                        }
                    }
                })
                .state('Settings.EditHRUser', {
                    url: "/users/edit/:id",
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/users/edit/editUser.html",
                            controller: 'EditUserController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('Settings.AddHRUser', {
                    cache: false,
                    url: "/users/add",
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/users/edit/editUser.html",
                            controller: 'EditUserController',
                            controllerAs: 'vm'
                        }
                    }
                })
                // .state('ManageUsers', {
                //     url: "/users",
                //     parent: 'Settings',
                //     views: {
                //         'SettingsOptions@Settings': {
                //             templateUrl: rootUrl + "/components/settings/users/list/usersList.html",
                //             controller: 'UsersListController',
                //             controllerAs: 'vm'
                //         },
                //         'NoUsers@ManageUsers': {
                //             templateUrl: rootUrl + "/components/settings/users/list/noUsers.html"
                //         }
                //     }
                // })
                // .state('AddHRUser', {
                //     cache: false,
                //     url: "/users/add",
                //     parent: 'Settings',
                //     views: {
                //         'SettingsOptions@Settings': {
                //             templateUrl: rootUrl + "/components/settings/users/edit/editUser.html",
                //             controller: 'EditUserController',
                //             controllerAs: 'vm'
                //         }
                //     }
                // })
                // .state('EditHRUser', {
                //     url: "/users/edit/:id",
                //     parent: 'Settings',
                //     views: {
                //         'SettingsOptions@Settings': {
                //             templateUrl: rootUrl + "/components/settings/users/edit/editUser.html",
                //             controller: 'EditUserController',
                //             controllerAs: 'vm'
                //         }
                //     }
                // })
                // .state('GeneralSettings', {
                //     url: "/general-settings",
                //     parent: 'Settings',
                //     views: {
                //         'SettingsOptions@Settings': {
                //             templateUrl: rootUrl + "/components/settings/general_settings/generalSettings.html",
                //             controller: 'GeneralSettingsController',
                //             controllerAs: 'vm'
                //         }
                //     }
                // })
                .state('Settings.Branding', {
                    url: "/branding",
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/branding/branding.html",
                            controller: 'BrandingController',
                            controllerAs: 'vm'
                        }
                    }
                })
                // .state('Branding', {
                //     url: "/branding",
                //     parent: 'Settings',
                //     views: {
                //         'SettingsOptions@Settings': {
                //             templateUrl: rootUrl + "/components/settings/branding/branding.html",
                //             controller: 'BrandingController',
                //             controllerAs: 'vm'
                //         }
                //     }
                // })
                .state('Settings.DesignWebforms', {
                    url: "/design-webforms",
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/design_webforms/designWebformsList.html",
                            controller: 'DesignWebformsController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('Settings.AddDesignWebform', {
                    url: "/design-webforms/add",
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/design_webforms/add/addDesignWebform.html",
                            controller: 'AddDesignWebformController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('Settings.EditDesignWebform', {
                    url: "/design-webforms/edit/:id",
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/design_webforms/add/addDesignWebform.html",
                            controller: 'AddDesignWebformController',
                            controllerAs: 'vm'
                        }
                    }
                })
                
                .state('Settings.Documents', {
                    url: "/documents",
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/documents/list/documents.html",
                            controller: 'DocumentsController',
                            controllerAs: 'vm'
                        },
                        'NoDocuments@Settings.Documents': {
                            templateUrl: rootUrl + "/components/settings/documents/list/noDocuments.html"
                        }
                    }
                })
                .state('Settings.MapFields', {
                    url: '/mapfields/:id/:source/:sourceid',
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/documents/mappingFields/mapFields.html",
                            controller: 'MappingFieldsController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('Settings.DynamicWebForm', {
                    url: '/webform/:id',
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/documents/dynamicWebForms/dynamicWebForms.html",
                            controller: 'DynamicWebFormsController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('Settings.Folders', {
                    url: "/folders",
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/folders/list/foldersList.html",
                            controller: 'FoldersListController',
                            controllerAs: 'vm'
                        },
                        'NoFolders@Settings.Folders': {
                            templateUrl: rootUrl + "/components/settings/folders/list/noFolders.html"
                        }
                    }
                })
                .state('Settings.AddFolder', {
                    url: "/folder/add",
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/folders/edit/editFolder.html",
                            controller: 'EditFolderController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('Settings.EditFolder', {
                    url: "/folder/edit/:id",
                    params: { id: '' },
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/folders/edit/editFolder.html",
                            controller: 'EditFolderController',
                            controllerAs: 'vm'
                        }
                    }
                })
                // .state('Documents', {
                //     parent: 'Settings',
                //     url: "/documents",
                //     views: {
                //         'SettingsOptions@Settings': {
                //             templateUrl: rootUrl + "/components/settings/documents/list/documents.html",
                //             controller: 'DocumentsController',
                //             controllerAs: 'vm'
                //         },
                //         'NoDocuments@Documents': {
                //             templateUrl: rootUrl + "/components/settings/documents/list/noDocuments.html"
                //         }
                //     }
                // })
                // .state('MapFields', {
                //     parent: 'Documents',
                //     url: '/mapfields/:id/:source/:sourceid',
                //     views: {
                //         'AllDocsView@Documents': {
                //             templateUrl: rootUrl + "/components/settings/documents/mappingFields/mapFields.html",
                //             controller: 'MappingFieldsController',
                //             controllerAs: 'vm'
                //         }
                //     }
                // })
                // .state('Folders', {
                //     url: "/folders",
                //     parent: 'Settings',
                //     views: {
                //         'SettingsOptions@Settings': {
                //             templateUrl: rootUrl + "/components/settings/folders/list/foldersList.html",
                //             controller: 'FoldersListController',
                //             controllerAs: 'vm'
                //         },
                //         'NoFolders@Folders': {
                //             templateUrl: rootUrl + "/components/settings/folders/list/noFolders.html"
                //         }
                //     }
                // })
                // .state('Folders.add', {
                //     url: "/add",
                //     // parent: 'Folders',
                //     // views: {
                //     //     'FoldersView@Folders': {
                //     //         templateUrl: rootUrl + "/components/settings/folders/edit/editFolder.html",
                //     //         controller: 'EditFolderController',
                //     //         controllerAs: 'vm'
                //     //     }
                //     // }
                //     templateUrl: rootUrl + "/components/settings/folders/edit/editFolder.html",
                //     controller: 'EditFolderController',
                //     controllerAs: 'vm'
                // })
                // .state('Folders.edit', {
                //     url: "/edit/:id",
                //     params: { id: '' },
                //     // parent: 'Folders',
                //     // views: {
                //     //     'FoldersView@Folders': {
                //     //         templateUrl: rootUrl + "/components/settings/folders/edit/editFolder.html",
                //     //         controller: 'EditFolderController',
                //     //         controllerAs: 'vm'
                //     //     }
                //     // }
                //     templateUrl: rootUrl + "/components/settings/folders/edit/editFolder.html",
                //     controller: 'EditFolderController',
                //     controllerAs: 'vm'
                // })
                .state('Tasks', {
                    abstract: false,
                    url: "/tasks",
                    templateUrl: rootUrl + "/components/tasks/tasks.html",
                    controller: 'TasksController',
                    controllerAs: 'vm'
                })
                .state('MyTasks', {
                    parent: 'Tasks',
                    url: '/mytasks',
                    views: {
                        'TaskOptions@Tasks': {
                            templateUrl: rootUrl + "/components/tasks/mytasks/mytasks.html",
                            controller: 'MyTasksController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('ViewTask', {
                    parent: 'MyTasks',
                    url: '/view/:id',
                    views: {
                        'TaskOptions@Tasks': {
                            templateUrl: rootUrl + "/components/tasks/mytasks/mytasks.html",
                            controller: 'MyTasksController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('TaskCalendar', {
                    parent: 'Tasks',
                    url: '/calendar',
                    views: {
                        'TaskOptions@Tasks': {
                            templateUrl: rootUrl + "/components/tasks/calendar/task-calendar.html",
                            controller: 'TaskCalendarController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('Workflows', {
                    url: "/workflows",
                    views: {
                        '': {
                            templateUrl: rootUrl + "/components/workflows/workflows.html",
                            controller: 'WorkflowsController',
                            controllerAs: 'vm'

                        },
                        'WorkflowOptions@Workflows': {
                            templateUrl: rootUrl + "/components/workflows/list/workflowsList.html",
                            controller: 'WorkflowsController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('AddWorkflow', {
                    url: '/add',
                    parent: 'Workflows',
                    views: {
                        'WorkflowOptions@Workflows': {
                            templateUrl: rootUrl + "/components/workflows/add/addWorkflow.html",
                            controller: 'AddWorkflowController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('EditWorkflow', {
                    url: '/workflows/edit/:id',
                    parent: 'Workflows',
                    views: {
                        'WorkflowOptions@Workflows': {
                            templateUrl: rootUrl + "/components/workflows/add/addWorkflow.html",
                            controller: 'AddWorkflowController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('hire-info', {
                    url: "/hire-info/:hireId",
                    templateUrl: rootUrl + "/components/hire_info/hireInfo.html",
                    controller: 'HireInfoController',
                    controllerAs: 'vm',
                    resolve: {
                        hirUserInfo: ['$stateParams', 'HireInfoService', function ($stateParams, HireInfoService) {
                            // return HireInfoService.getHireInfo($stateParams.hireId);
                            return ;
                        }]
                    }
                })
                .state('hire-info.initiate-onboarding', {
                    url: "/initiate-onboarding",
                    templateUrl: rootUrl + "/components/hire_info/initiate_onboarding/initiateOnboarding.html",
                    controller: 'InitiateOnboardingController',
                    controllerAs: 'vm'
                })
                .state('hire-info.emails', {
                    url: "/emails",
                    templateUrl: rootUrl + "/components/hire_info/emails/emails.html",
                    controller: 'EmailController',
                    controllerAs: 'vm'
                })
                .state('hire-info.review-certify', {
                    url: "/review-certify",
                    templateUrl: rootUrl + "/components/hire_info/review_certify/reviewCertify.html",
                    controller: 'ReviewCertifyController',
                    controllerAs: 'vm',
                    resolve: {
                        DocStatusList: ['ReviewCertifyService', function (ReviewCertifyService) {
                            return ReviewCertifyService.getDocStatus();
                        }],
                        StepStatusList: ['ReviewCertifyService', function (ReviewCertifyService) {
                            return ReviewCertifyService.getStepStatus();
                        }]
                    }
                })
                .state('hire-info.schedule', {
                    url: "/schedule",
                    templateUrl: rootUrl + "/components/hire_info/schedule/schedule.html",
                    controller: 'ScheduleController',
                    controllerAs: 'vm'
                })
                .state('hire-info.activities', {
                    url: "/activities",
                    templateUrl: rootUrl + "/components/hire_info/activities/activities.html",
                    controller: 'activitiesController',
                    controllerAs: 'vm'
                })
                // .state('NewHires', {
                //     url: "/new_hires",
                //     templateUrl: rootUrl + "/components/new_hires/newHires.html",
                //     controller: 'NewHiresController',
                //     controllerAs: 'vm'
                // })
                .state('NewHires', {
                    url: "/new_hires",
                    views: {
                        '': {
                            templateUrl: rootUrl + "/components/new_hires/newHires.html",
                            controller: 'NewHiresController',
                            controllerAs: 'vm'

                        },
                        'NewHiresOptions@NewHires': {
                            templateUrl: rootUrl + "/components/new_hires/list/newHiresList.html"
                        }
                    }
                })
                .state('AddNewHire', {
                    url: '/new_hire/create',
                    parent: 'NewHires',
                    views: {
                        'NewHiresOptions@NewHires': {
                            templateUrl: rootUrl + "/components/new_hires/add/addNewHire.html",
                            controller: 'AddNewHireController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        ClientsList: ['DesignWebformsService', function (DesignWebformsService) {
                            return DesignWebformsService.getClientsList();
                        }],
                        SourceProfile: ['DesignWebformsService', function (DesignWebformsService) {
                            return DesignWebformsService.getSourceProfile();
                        }],
                        JobHireCategory: ['DesignWebformsService', function (DesignWebformsService) {
                            return DesignWebformsService.getJobHireCategory();
                        }]
                    }
                })
                .state('EditNewHire', {
                    url: '/new_hire/edit/:id',
                    parent: 'NewHires',
                    views: {
                        'NewHiresOptions@NewHires': {
                            templateUrl: rootUrl + "/components/new_hires/add/addNewHire.html",
                            controller: 'AddNewHireController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        ClientsList: ['DesignWebformsService', function (DesignWebformsService) {
                            return DesignWebformsService.getClientsList();
                        }],
                        SourceProfile: ['DesignWebformsService', function (DesignWebformsService) {
                            return DesignWebformsService.getSourceProfile();
                        }],
                        JobHireCategory: ['DesignWebformsService', function (DesignWebformsService) {
                            return DesignWebformsService.getJobHireCategory();
                        }]
                    }
                })
                .state('Settings.EmailTemplates', {
                    url: "/email_templates",
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/email_templates/list/emailTemplateList.html",
                            controller: 'EmailTemplateListController',
                            controllerAs: 'vm'
                        },
                        'NoTemplates@Settings.EmailTemplates': {
                            templateUrl: rootUrl + "/components/settings/email_templates/list/noTemplates.html"
                        }
                    }
                })
                .state('Settings.AddEmailTemplate', {
                    url: '/email_templates/create',
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/email_templates/edit/editEmailTemplate.html",
                            controller: 'EditEmailTemplateController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('Settings.EditEmailTemplate', {
                    url: '/email_templates/edit/:id',
                    views: {
                        'SettingsOptions@Settings': {
                            templateUrl: rootUrl + "/components/settings/email_templates/edit/editEmailTemplate.html",
                            controller: 'EditEmailTemplateController',
                            controllerAs: 'vm'
                        }
                    }
                })
                // .state('Reports', {
                //     url: "/reports",
                //     templateUrl: rootUrl + "/components/reports/reports.html",
                //     controller: 'ReportsController',
                //     controllerAs: 'vm'
                // })
                .state('Reports', {
                    url: "/reports",
                    templateUrl: rootUrl + "/components/reports/reports.html",
                    controller: 'ReportsController',
                    controllerAs: 'vm'
                })
                .state('Reports.Static', {
                    url: "/static",
                    templateUrl: rootUrl + "/components/reports/static/static.html",
                    controller: 'StaticController',
                    controllerAs: 'vm'
                })
                .state('Reports.Dynamic', {
                    url: "/dynamic",
                    templateUrl: rootUrl + "/components/reports/dynamic/dynamic.html",
                    controller: 'DynamicController',
                    controllerAs: 'vm'
                })


            $urlRouterProvider.otherwise(function ($injector, $location) {
                // console.log("Warning: otherwise got kicked!");
                var $state = $injector.get("$state");
                $state.go('Login');
            });

        }
    ]);

    hrAdminApp.run(['$rootScope', '$state', '$transitions', '$interval', '$location', '$http', 'ToastrService', 'Idle', 'NavigationService', function ($rootScope, $state, $transitions, $interval, $location, $http, ToastrService, Idle, NavigationService) {
        $rootScope.$state = $state;
        $rootScope.isCandidate = false;
        $rootScope.isCandidateAPICalls = false;
        $rootScope.CandidateInfo = null;
        // console.log($state)


        var env = {};
        var envColors = {};
        // Import variables if present (from env.js)
        if (window) {
            angular.extend(env, window.__env);
            angular.extend(envColors, window.__envColors);
        }
        // Define AngularJS application
        var ngModule = angular.module('app', []);
        // Register environment in AngularJS as constant
        ngModule.constant('__env', env);
        ngModule.constant('__envColors', envColors);

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

        $rootScope.UserInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
        $rootScope.Token = localStorage.getItem('ask-auth-token');
        $rootScope.CopyrightsFooter = localStorage.getItem('CopyrightsFooter');
        $rootScope.isAccountManager = false;
        if ($rootScope.UserInfo && $rootScope.UserInfo.AccountManagerFlag) {
            //$rootScope.isAccountManager = $rootScope.UserInfo.isAccountManager;
            $rootScope.isAccountManager = true;
        }

        $rootScope.errors = env.errors;
        $rootScope.errorMsgs = env.errorMsgs;
        $rootScope.rootUrl = env.rootUrl;
        $rootScope.dashboardEnabled = false;
        $rootScope.maxNumOfRecordsSubWebForms = env.maxNumOfRecordsSubWebForms;
        // Not required anymore ... implemented in transition hook onStart
        // if (!$rootScope.Token) {
        //     $location.path('/');
        // }


        // function logoandimagepath() {
        //     NavigationService.logoandimagepath().then(
        //         function (response) {
        //             $rootScope.LogoImagesURL = $rootScope.UploadsURL + '/OnBoarding/Branding/logo/' + response.data.Branding.logoimg;
        //             $rootScope.bgImagesURL = $rootScope.UploadsURL + '/OnBoarding/Branding/bgimg/' + response.data.Branding.bgimg;
        //         },
        //         function (err) {
        //         }
        //     )
        // }

        $rootScope.LogoImagesURL = $rootScope.UploadsURL + '/OnBoardingNew/Branding/logo/' + brandingImages.logoimg;
        $rootScope.bgImagesURL = $rootScope.UploadsURL + '/OnBoardingNew/Branding/bgimg/' + brandingImages.bgimg;

        // function candiLogoandimagepath() {
        //     NavigationService.candiLogoandimagepath().then(
        //         function (response) {
        //             $rootScope.LogoImagesURL = $rootScope.UploadsURL + '/OnBoarding/Branding/logo/' + brandingImages.logoimg;
        //             $rootScope.bgImagesURL = $rootScope.UploadsURL + '/OnBoarding/Branding/bgimg/' + brandingImages.bgimg;
        //         },
        //         function (err) {
        //         }
        //     )
        // }



        // if ($state.$current.name.indexOf('candidate') !== -1) {
        //     candiLogoandimagepath();
        // } else {
        //     logoandimagepath();
        // }

        // Session Management
        $rootScope.$on('IdleTimeout', function () {
            // logout the user
            // $location.path('/');
            NavigationService.logout().then(
                function (response) {
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                        return;
                    }

                    if (response.data.Success) {
                        ToastrService.message($rootScope.errorMsgs.MSG116);
                        $state.go('Login');
                        localStorage.removeItem('ask-auth-token');
                        $rootScope.Token = null;
                    }
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG187);
                }
            )
        });

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



            // console.log("Transition Hook: state change started!");
            if ((transition.to().name === 'ResetPassword' ||
                transition.to().name === 'getResetPassword' ||
                transition.to().name === 'ForgotPassword' ||
                transition.to().name === 'Signup' ||
                transition.to().name === 'ThankYou') && !$rootScope.isCandidate) {
                // console.log("State does not require a token. Access granted");
                return true;
            }
            if (!$rootScope.Token && !$rootScope.isCandidate) {
                // console.log("ERROR: Token missing! Cannot proceed further.");
                $state.go('Login');
                // $location.path('/');
            }

            // Session Management
            if (transition.to().name !== 'Login') {
                Idle.watch();
            }

        });

    }])
        .config(['$logProvider', function ($logProvider) {
            $logProvider.debugEnabled(true); // turns off the calls to $log.debug, but not the others
        }]);
}());