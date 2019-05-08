(function() {
    'use strict';
    hrAdminApp.factory('DynamicWebFormService', DynamicWebFormService);
    DynamicWebFormService.$inject = ['$filter', '$rootScope', '$http'];

    function DynamicWebFormService($filter, $rootScope, $http) {


        var getStatusCommonFieldDeleteUrl = $rootScope.APIURL + 'commonfielddelete/';
        var deleteCommonFieldUrl = $rootScope.APIURL + 'confirmfielddelete/';
        var commonapisurl = $rootScope.APIURL + 'commonapis';
        var objDynamicWebFormService = {};

        var addressDetailsList = {
            'full-address': {
                'name': 'Full Address',
                'type': 'full-address',
                'value': ''
            },
            'address': {
                'name': 'Address',
                'type': 'address',
                'value': ''
            },
            'state': {
                'name': 'State',
                'type': 'state',
                'value': ''
            },
            'city': {
                'name': 'City',
                'type': 'city',
                'value': ''
            },
            'country': {
                'name': 'Country',
                'type': 'country',
                'value': ''
            },
            'zip': {
                'name': 'Zip',
                'type': 'zip',
                'value': ''
            }
        }

        // var addressTypeSource = {
        //     'full-address': [],
        //     'address': [{'city':[]}, {'state':[]}, {'country':[]}, {'zip':[]}],
        //     'city': [{'state':[]}, {'country':[]}],
        //     'state': [{'country':[]}],
        //     'country': [],
        //     'zip': []
        // }

        var addressTypeSource = {
            'full-address': [],
            'address': [{
                'name': 'City',
                'type': 'city',
                'value': ''
            }, {
                'name': 'State',
                'type': 'state',
                'value': ''
            }, {
                'name': 'Country',
                'type': 'country',
                'value': ''
            }, {
                'name': 'Zip',
                'type': 'zip',
                'value': ''
            }],
            'city': [{
                'name': 'State',
                'type': 'state',
                'value': ''
            }, {
                'name': 'Country',
                'type': 'country',
                'value': ''
            }],
            'state': [{
                'name': 'Country',
                'type': 'country',
                'value': ''
            }],
            'country': []
        }

        var controlesList = [{
                'name': 'Single Text',
                'Type': 'text',
                'inputType': 'text',
                'value': '',
                'changedValue': '',
                'mappingId': 0,
                'labelName': '',
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Email',
                'Type': 'email',
                'inputType': 'email',
                'value': '',
                'mappingId': 0,
                'labelName': '',
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Single Text',
                'Type': 'phone-number',
                'inputType': 'phone-number',
                'value': '',
                'mappingId': 0,
                'labelName': '',
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Single Text',
                'Type': 'number',
                'inputType': 'number',
                'value': '',
                'mappingId': 0,
                'labelName': '',
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Single Text',
                'Type': 'numberwithdecimal',
                'inputType': 'numberwithdecimal',
                'value': '',
                'mappingId': 0,
                'labelName': '',
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Date',
                'Type': 'date',
                'inputType': 'date',
                'value': null,
                'mappingId': 0,
                'labelName': '',
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Single Selection',
                'Type': 'dropdown',
                'inputType': 'dropdown',
                'value': '',
                'mappingId': 0,
                'labelName': '',
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'TextArea',
                'Type': 'textarea',
                'inputType': 'textarea',
                'value': '',
                'mappingId': 0,
                'labelName': '',
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Radio Text',
                'Type': 'radio',
                'inputType': 'radio',
                'value': '',
                'mappingId': 0,
                'labelName': '',
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Button',
                'Type': 'button',
                'inputType': 'button',
                'input': true,
                'inputType': 'header',
                'labelName': '',
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Checkbox Text',
                'Type': 'checkbox',
                'inputType': 'checkbox',
                'value': '',
                'mappingId': 0,
                'labelName': '',
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Divider',
                'Type': 'devider',
                'inputType': 'devider',
                'input': true,
                'inputType': 'devider',
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Empty Space',
                'Type': 'emptyspace',
                'inputType': 'emptyspace',
                'input': true,
                'inputType': 'emptyspace',
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Heading name',
                'Type': 'header',
                'inputType': 'header',
                'input': true,
                'inputType': 'header',
                'labelName': '',
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            }
        ];

        var settingsList = {
            'text': [{
                    'name': 'Label Name',
                    'value': 'Label Name',
                    'Type': 'labelText',
                    'width': 50
                },
                {
                    'name': 'Field Type',
                    'value': 'Text',
                    'Type': 'patterndropdown',
                    'width': 50,
                    'Possiblevalue': [
                        'Text',
                        'Numeric',
                        'NumericwithDecimal',
                        'AlphaNumeric',
                        'Phone-Number',
                        'Email',
                        'Date'
                    ]
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commonfieldlabel'
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commondropdown',
                    'width': 50,
                    'Possiblevalue': [

                    ]
                },
                {
                    'name': 'Validations',
                    'value': '',
                    'Type': 'label'
                },
                {
                    'name': 'Min Length',
                    'value': '1',
                    'Type': 'number',
                    'width': 50
                },
                {
                    'name': 'Max Length',
                    'value': '50',
                    'Type': 'number',
                    'width': 50,
                    'length': 200
                },
                {
                    'name': 'Width',
                    'value': '100',
                    'Type': 'widthdropdown',
                    'width': 50,
                    'Possiblevalue': [
                        '100',
                        '80',
                        '75',
                        '66',
                        '60',
                        '50',
                        '40',
                        '33',
                        '25',
                        '20'
                    ]
                },
                {
                    'name': 'General Validations',
                    'Type': 'checkBoxZone',
                    'Options': [{
                            'name': 'Required',
                            'value': false
                        },
                        {
                            'name': 'Readonly',
                            'value': false
                        },
                        {
                            'name': 'Mask Data',
                            'value': false
                        },
                        {
                            'name': 'Enable Google Maps',
                            'value': false
                        }
                    ],
                    'width': 100
                },
                {
                    'name': 'Dependency Validation',
                    'value': '',
                    'Type': 'dependencyMask',
                    'width': 100,
                    'isDependent': {
                        'name': '',
                        'value': true
                    },
                    'dependencyObjs': [{
                            'name': 'Conditions',
                            'type': 'conditions',
                            'value': '==',
                            'Possiblevalue': [{
                                'name': 'Equals(=)',
                                'value': '=='
                            }]
                        },
                        {
                            'name': 'Other Fields',
                            'type': 'otherfield',
                            'value': '',
                            'Possiblevalue': [

                            ]
                        }
                    ]
                },
                {
                    'name': 'Google Maps',
                    'value': '',
                    'Type': 'maplabel'
                },
                {
                    'name': 'Country Type',
                    'Type': 'gmapradio',
                    'value': 'USA',
                    'Options': [{
                            'name': 'All over world',
                            'value': 'world'
                        },
                        {
                            'name': 'USA',
                            'value': 'USA'
                        }
                    ],
                    'width': 100
                },
                {
                    'name': 'Autocomplete the field with',
                    'value': '',
                    'Type': 'autocompletetype',
                    'Options': [],
                    'width': 100
                },
                {
                    'name': 'Autofill other fields',
                    'value': '',
                    'Type': 'autocompletedependency',
                    'width': 100,
                    'isDependent': {
                        'name': '',
                        'value': true
                    },
                    'dependencyObjsSource': [],
                    'dependencyObjsData': [],
                }
            ],
            'email': [{
                    'name': 'Label Name',
                    'value': 'Label Name',
                    'Type': 'labelText',
                    'width': 50
                },
                {
                    'name': 'Field Type',
                    'value': 'Text',
                    'Type': 'patterndropdown',
                    'width': 50,
                    'Possiblevalue': [
                        'Text',
                        'Numeric',
                        'NumericwithDecimal',
                        'AlphaNumeric',
                        'Phone-Number',
                        'Email',
                        'Date'
                    ]
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commonfieldlabel'
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commondropdown',
                    'width': 50,
                    'Possiblevalue': [

                    ]
                },
                {
                    'name': 'Validations',
                    'value': '',
                    'Type': 'label'
                },
                {
                    'name': 'Min Length',
                    'value': '1',
                    'Type': 'number',
                    'width': 50
                },
                {
                    'name': 'Max Length',
                    'value': '70',
                    'Type': 'number',
                    'width': 50,
                    'length': 70
                },
                {
                    'name': 'Width',
                    'value': '100',
                    'Type': 'widthdropdown',
                    'width': 50,
                    'Possiblevalue': [
                        '100',
                        '80',
                        '75',
                        '66',
                        '60',
                        '50',
                        '40',
                        '33',
                        '25',
                        '20'
                    ]
                },
                {
                    'name': 'General Validations',
                    'Type': 'checkBoxZone',
                    'Options': [{
                            'name': 'Required',
                            'value': false
                        },
                        {
                            'name': 'Readonly',
                            'value': false
                        }
                    ],
                    'width': 100
                }
            ],
            'phone-number': [{
                    'name': 'Label Name',
                    'value': 'Label Name',
                    'Type': 'labelText',
                    'width': 50
                },
                {
                    'name': 'Field Type',
                    'value': 'Phone-Number',
                    'Type': 'patterndropdown',
                    'width': 50,
                    'Possiblevalue': [
                        'Text',
                        'Numeric',
                        'NumericwithDecimal',
                        'AlphaNumeric',
                        'Phone-Number',
                        'Email',
                        'Date'
                    ]
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commonfieldlabel'
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commondropdown',
                    'width': 50,
                    'Possiblevalue': [

                    ]
                },
                {
                    'name': 'Validations',
                    'value': '',
                    'Type': 'label'
                },
                {
                    'name': 'Min Length',
                    'value': '1',
                    'Type': 'number',
                    'width': 50
                },
                {
                    'name': 'Max Length',
                    'value': '50',
                    'Type': 'number',
                    'width': 50,
                    'length': 50
                },
                {
                    'name': 'Width',
                    'value': '100',
                    'Type': 'widthdropdown',
                    'width': 50,
                    'Possiblevalue': [
                        '100',
                        '80',
                        '75',
                        '66',
                        '60',
                        '50',
                        '40',
                        '33',
                        '25',
                        '20'
                    ]
                },
                {
                    'name': 'General Validations',
                    'Type': 'checkBoxZone',
                    'Options': [{
                            'name': 'Required',
                            'value': false
                        },
                        {
                            'name': 'Readonly',
                            'value': false
                        }
                    ],
                    'width': 100
                }
            ],
            'number': [{
                    'name': 'Label Name',
                    'value': 'Label Name',
                    'Type': 'labelText',
                    'width': 50
                },
                {
                    'name': 'Field Type',
                    'value': 'Numeric',
                    'Type': 'patterndropdown',
                    'width': 50,
                    'Possiblevalue': [
                        'Text',
                        'Numeric',
                        'NumericwithDecimal',
                        'AlphaNumeric',
                        'Phone-Number',
                        'Email',
                        'Date'
                    ]
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commonfieldlabel'
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commondropdown',
                    'width': 50,
                    'Possiblevalue': [

                    ]
                },
                {
                    'name': 'Validations',
                    'value': '',
                    'Type': 'label'
                },
                {
                    'name': 'Min',
                    'value': '1',
                    'Type': 'number',
                    'width': 50
                },
                {
                    'name': 'Max',
                    'value': '50',
                    'Type': 'number',
                    'width': 50
                },
                {
                    'name': 'Width',
                    'value': '100',
                    'Type': 'widthdropdown',
                    'width': 50,
                    'Possiblevalue': [
                        '100',
                        '80',
                        '75',
                        '66',
                        '60',
                        '50',
                        '40',
                        '33',
                        '25',
                        '20'
                    ]
                }, {
                    'name': 'Dependency Validation',
                    'value': '',
                    'Type': 'dependency',
                    'width': 100,
                    'isDependent': {
                        'name': '',
                        'value': true
                    },
                    'dependencyObjs': [{
                            'name': 'Conditions',
                            'type': 'conditions',
                            'value': '<',
                            'Possiblevalue': [{
                                    'name': 'Less than(<)',
                                    'value': '<',

                                },
                                {
                                    'name': 'Less than or equals(<=)',
                                    'value': '<=',

                                },
                                {
                                    'name': 'Greater than(>)',
                                    'value': '>',

                                },
                                {
                                    'name': 'Greater than or equals(>=)',
                                    'value': '>=',

                                },
                                {
                                    'name': 'Equals(=)',
                                    'value': '==',

                                }
                            ]
                        },
                        {
                            'name': 'Other Fields',
                            'type': 'otherfield',
                            'value': '',
                            'Possiblevalue': [

                            ]
                        }
                    ]
                },
                {
                    'name': 'General Validations',
                    'Type': 'checkBoxZone',
                    'Options': [{
                            'name': 'Required',
                            'value': false
                        },
                        {
                            'name': 'Readonly',
                            'value': false
                        },
                        {
                            'name': 'Mask Data',
                            'value': false
                        }
                    ],
                    'width': 100
                }
            ],
            'numberwithdecimal': [{
                    'name': 'Label Name',
                    'value': 'Label Name',
                    'Type': 'labelText',
                    'width': 50
                },
                {
                    'name': 'Field Type',
                    'value': 'Numeric',
                    'Type': 'patterndropdown',
                    'width': 50,
                    'Possiblevalue': [
                        'Text',
                        'Numeric',
                        'NumericwithDecimal',
                        'AlphaNumeric',
                        'Phone-Number',
                        'Email',
                        'Date'
                    ]
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commonfieldlabel'
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commondropdown',
                    'width': 50,
                    'Possiblevalue': [

                    ]
                },
                {
                    'name': 'Validations',
                    'value': '',
                    'Type': 'label'
                },
                {
                    'name': 'Min',
                    'value': '1',
                    'Type': 'number',
                    'width': 50
                },
                {
                    'name': 'Max',
                    'value': '50',
                    'Type': 'number',
                    'width': 50
                },
                {
                    'name': 'Width',
                    'value': '100',
                    'Type': 'widthdropdown',
                    'width': 50,
                    'Possiblevalue': [
                        '100',
                        '80',
                        '75',
                        '66',
                        '60',
                        '50',
                        '40',
                        '33',
                        '25',
                        '20'
                    ]
                }, {
                    'name': 'Dependency Validation',
                    'value': '',
                    'Type': 'dependency',
                    'width': 100,
                    'isDependent': {
                        'name': '',
                        'value': true
                    },
                    'dependencyObjs': [{
                            'name': 'Conditions',
                            'type': 'conditions',
                            'value': '<',
                            'Possiblevalue': [{
                                    'name': 'Less than(<)',
                                    'value': '<',

                                },
                                {
                                    'name': 'Less than or equals(<=)',
                                    'value': '<=',

                                },
                                {
                                    'name': 'Greater than(>)',
                                    'value': '>',

                                },
                                {
                                    'name': 'Greater than or equals(>=)',
                                    'value': '>=',

                                },
                                {
                                    'name': 'Equals(=)',
                                    'value': '==',

                                }
                            ]
                        },
                        {
                            'name': 'Other Fields',
                            'type': 'otherfield',
                            'value': '',
                            'Possiblevalue': [

                            ]
                        }
                    ]
                },
                {
                    'name': 'General Validations',
                    'Type': 'checkBoxZone',
                    'Options': [{
                            'name': 'Required',
                            'value': false
                        },
                        {
                            'name': 'Readonly',
                            'value': false
                        },
                        {
                            'name': 'Mask Data',
                            'value': false
                        }
                    ],
                    'width': 100
                }
            ],
            'date': [{
                    'name': 'Label Name',
                    'value': 'Label Name',
                    'Type': 'labelText',
                    'width': 50
                },
                {
                    'name': 'Field Type',
                    'value': 'Date',
                    'Type': 'patterndropdown',
                    'width': 50,
                    'Possiblevalue': [
                        'Text',
                        'Numeric',
                        'NumericwithDecimal',
                        'AlphaNumeric',
                        'Phone-Number',
                        'Email',
                        'Date'
                    ]
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commonfieldlabel'
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commondropdown',
                    'width': 50,
                    'Possiblevalue': [

                    ]
                },
                {
                    'name': 'Validations',
                    'value': '',
                    'Type': 'label'
                },
                {
                    'name': 'Min Length',
                    'value': '1',
                    'Type': 'number',
                    'disabled': true,
                    'width': 50
                },
                {
                    'name': 'Max Length',
                    'value': '50',
                    'Type': 'number',
                    'disabled': true,
                    'width': 50
                },
                {
                    'name': 'Width',
                    'value': '100',
                    'Type': 'widthdropdown',
                    'Possiblevalue': [
                        '100',
                        '80',
                        '75',
                        '66',
                        '60',
                        '50',
                        '40',
                        '33',
                        '25',
                        '20'
                    ],
                    'width': 50
                },
                {
                    'name': 'Dependency Validation',
                    'value': '',
                    'Type': 'dependency',
                    'width': 100,
                    'isDependent': {
                        'name': '',
                        'value': true
                    },
                    'dependencyObjs': [{
                            'name': 'Conditions',
                            'type': 'conditions',
                            'value': '<',
                            'Possiblevalue': [{
                                    'name': 'Less than(<)',
                                    'value': '<',

                                },
                                {
                                    'name': 'Less than or equals(<=)',
                                    'value': '<=',

                                },
                                {
                                    'name': 'Greater than(>)',
                                    'value': '>',

                                },
                                {
                                    'name': 'Greater than or equals(>=)',
                                    'value': '>=',

                                },
                                {
                                    'name': 'Equals(=)',
                                    'value': '==',

                                }
                            ]
                        },
                        {
                            'name': 'Other Fields',
                            'type': 'otherfield',
                            'value': '',
                            'Possiblevalue': [

                            ]
                        }
                    ]
                },
                {
                    'name': 'General Validations',
                    'Type': 'checkBoxZone',
                    'Options': [{
                            'name': 'Required',
                            'value': false
                        },
                        {
                            'name': 'Readonly',
                            'value': false
                        },

                    ],
                    'width': 100
                }
            ],
            'dropdown': [{
                    'name': 'Label Name',
                    'value': 'Label Name',
                    'Type': 'labelText',
                    'width': 50
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commonfieldlabel'
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commondropdown',
                    'width': 50,
                    'Possiblevalue': [

                    ]
                },
                {
                    'name': 'Validations',
                    'value': '',
                    'Type': 'label'
                },
                {
                    'name': 'Width',
                    'value': '25',
                    'Type': 'widthdropdown',
                    'Possiblevalue': [
                        '100',
                        '80',
                        '75',
                        '66',
                        '60',
                        '50',
                        '40',
                        '33',
                        '25',
                        '20'
                    ],
                    'width': 50
                },
                {
                    'name': 'Radio Choice',
                    'Type': 'dropdown_increment',
                    'sourceTypeValue': 'Custom List',
                    'sourceType': [{
                            'name': 'Custom List'
                        },
                        {
                            'name': 'Database'
                        }
                    ],
                    'Possiblevalue': [{
                            'name': 'Option1',
                            'value': 'Option1',
                            'showControls' : []
                        },
                        {
                            'name': 'Option2',
                            'value': 'Option2',
                            'showControls' : []
                        }
                    ],
                    'width': 100
                },
                {
                    'name': '',
                    'Type': 'checkBoxZone',
                    'Options': [{
                            'name': 'Select first option as default',
                            'value': false
                        }

                    ],
                    'width': 100
                },
                {
                    'name': 'General Validations',
                    'Type': 'checkBoxZone',
                    'Options': [{
                            'name': 'Required',
                            'value': false
                        },
                        {
                            'name': 'Readonly',
                            'value': false
                        },

                    ],
                    'width': 100
                }
            ],
            'textarea': [{
                    'name': 'Label Name',
                    'value': 'Label Name',
                    'Type': 'labelText',
                    'width': 50
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commonfieldlabel'
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commondropdown',
                    'width': 50,
                    'Possiblevalue': [

                    ]
                },
                {
                    'name': 'Validations',
                    'value': '',
                    'Type': 'label'
                },
                {
                    'name': 'Min Length',
                    'value': '1',
                    'Type': 'number',
                    'width': 50
                },
                {
                    'name': 'Max Length',
                    'value': '200',
                    'Type': 'number',
                    'width': 50,
                    'length': 2000
                },
                {
                    'name': 'Width',
                    'value': '100'
                        // 'Type': 'widthdropdown',
                        // 'Possiblevalue': [
                        //     '100',
                        //     '80',
                        //     '75',
                        //     '66',
                        //     '60',
                        //     '50',
                        //     '40',
                        //     '33',
                        //     '25',
                        //     '20'
                        // ],
                        // 'width': 50
                },
                {
                    'name': 'Field Type',
                    'value': 'String',
                    'Type': 'dropdown',
                    'width': 50,
                    'Possiblevalue': [
                        'String',
                        'Numeric',
                        'NumericwithDecimal',
                        'AlphaNumeric',
                        'Phone-Number',
                        'Email'
                    ]
                },
                {
                    'name': 'General Validations',
                    'Type': 'checkBoxZone',
                    'Options': [{
                            'name': 'Required',
                            'value': false
                        },
                        {
                            'name': 'Readonly',
                            'value': false
                        },
                        {
                            'name': 'Mask Data',
                            'value': false
                        },
                        {
                            'name': 'Enable Google Maps',
                            'value': false
                        }
                    ],
                    'width': 100
                },
                {
                    'name': 'Google Maps',
                    'value': '',
                    'Type': 'maplabel'
                },
                {
                    'name': 'Country Type',
                    'Type': 'gmapradio',
                    'value': 'USA',
                    'Options': [{
                            'name': 'All over world',
                            'value': 'world'
                        },
                        {
                            'name': 'USA',
                            'value': 'USA'
                        }
                    ],
                    'width': 100
                },
                {
                    'name': 'Autocomplete the field with',
                    'value': '',
                    'Type': 'autocompletetype',
                    'Options': [],
                    'width': 100
                },
                {
                    'name': 'Autofill other fields',
                    'value': '',
                    'Type': 'autocompletedependency',
                    'width': 100,
                    'isDependent': {
                        'name': '',
                        'value': true
                    },
                    'dependencyObjsSource': [],
                    'dependencyObjsData': [],
                }
            ],
            'radio': [{
                    'name': 'Label Name',
                    'value': 'Label Name',
                    'Type': 'labelText',
                    'width': 50
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commonfieldlabel'
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commondropdown',
                    'width': 50,
                    'Possiblevalue': [

                    ]
                },
                {
                    'name': 'Validations',
                    'value': '',
                    'Type': 'label'
                },
                {
                    'name': 'Width',
                    'value': '100',
                    'Type': 'widthdropdown',
                    'Possiblevalue': [
                        '100',
                        '80',
                        '75',
                        '66',
                        '60',
                        '50',
                        '40',
                        '33',
                        '25',
                        '20'
                    ],
                    'width': 50
                },
                {
                    'name': 'Radio Choice',
                    'Type': 'radio_increment',
                    'Possiblevalue': [{
                            'name': 'Radio1',
                            'value': 'Radio1',
                            'showControls' : []
                        },
                        {
                            'name': 'Radio2',
                            'value': 'Radio2',
                            'showControls' : []
                        }
                    ],
                    'width': 100
                },
                {
                    'name': 'Radio Align Options',
                    'Type': 'radioBoxZone',
                    'value': 'Align Vertical',
                    'Options': [{
                            'name': 'Align Horizontal'
                        },
                        {
                            'name': 'Align Vertical'
                        }
                    ],
                    'width': 100
                },
                {
                    'name': 'General Validations',
                    'Type': 'checkBoxZone',
                    'Options': [{
                            'name': 'Required',
                            'value': false
                        },
                        {
                            'name': 'Readonly',
                            'value': false
                        },

                    ],
                    'width': 100
                }
            ],
            'button': [{
                    'name': 'Button Text',
                    'value': '',
                    'Type': 'button',
                    'width': 100
                },
                {
                    'name': 'Validations',
                    'value': '',
                    'Type': 'label'
                },
                {
                    'name': 'Width',
                    'value': '100',
                    'Type': 'widthdropdown',
                    'Possiblevalue': [
                        '100',
                        '80',
                        '75',
                        '66',
                        '60',
                        '50',
                        '40',
                        '33',
                        '25',
                        '20'
                    ],
                    'width': 50
                }
            ],
            'checkbox': [{
                    'name': 'Label Name',
                    'value': 'Label Name',
                    'Type': 'labelText',
                    'width': 50
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commonfieldlabel'
                },
                {
                    'name': 'Assign Common Field',
                    'value': '',
                    'Type': 'commondropdown',
                    'width': 50,
                    'Possiblevalue': [

                    ]
                },
                {
                    'name': 'Validations',
                    'value': '',
                    'Type': 'label'
                },
                {
                    'name': 'Width',
                    'value': '100',
                    'Type': 'widthdropdown',
                    'Possiblevalue': [
                        '100',
                        '80',
                        '75',
                        '66',
                        '60',
                        '50',
                        '40',
                        '33',
                        '25',
                        '20'
                    ],
                    'width': 50
                },
                {
                    'name': 'Show Controls',
                    'Type': 'showcontrols',
                    'width': 100,
                    'isDependent': {
                        'name': 'Show Controls',
                        'value': true
                    },
                    'showControls': []
                }
            ],
            'devider': [{
                'name': 'Width',
                'value': '1',
                'Type': 'devider',
                'Possiblevalue': [
                    '100',
                    '80',
                    '75',
                    '66',
                    '60',
                    '50',
                    '40',
                    '33',
                    '25',
                    '20'
                ],
                'width': 100
            }],
            'emptyspace': [{
                'name': 'Width',
                'value': '1',
                'Type': 'emptyspace',
                'Possiblevalue': [
                    '100',
                    '80',
                    '75',
                    '66',
                    '60',
                    '50',
                    '40',
                    '33',
                    '25',
                    '20'
                ],
                'width': 100
            }],
            'header': [{
                    'name': 'Heading name',
                    'value': 'Heading name',
                    'Type': 'headervalue',
                    'width': 100
                },
                {
                    'name': 'Font Size',
                    'value': 23,
                    'Type': 'font-size',
                    'width': 50
                },
                {
                    'name': 'Font-Family',
                    'value': 'Segoe UI',
                    'Type': 'font-family',
                    'Possiblevalue': [
                        'Arial',
                        'Comic Sans MS',
                        'Courier New',
                        'Georgia',
                        'Lucida Sans Unicode',
                        'Tahoma',
                        'Times New Roman',
                        'Trebuchet MS',
                        'Segoe UI',
                        'Verdana'
                    ],
                    'width': 50
                },
                {
                    'name': 'Width',
                    'value': '100',
                    'Type': 'heading',
                    'Possiblevalue': [
                        '100',
                        '80',
                        '75',
                        '66',
                        '60',
                        '50',
                        '40',
                        '33',
                        '25',
                        '20'
                    ],
                    'width': 500
                }
            ],
            'attachment': [{
                    'name': 'Label Name',
                    'value': 'Attachment (Maximum of Three Files with total of 30MB)',
                    'Type': 'labelText',
                    'width': 75
                },
                {
                    'name': 'Width',
                    'value': '100'
                },
                {
                    'name': 'General Validations',
                    'Type': 'checkBoxZone',
                    'Options': [{
                        'name': 'Required',
                        'value': false
                    }],
                    'width': 100
                }
            ]
        };

        var dragFields = [{
                'name': 'Text',
                'Type': 'text',
                'inputType': 'text',
                'input': true,
                'value': '',
                'changedValue': '',
                'mappingId': 0,
                'labelName': 'Label Name',
                'documentPage': false,
                'commonDetailPage': true,
                'newHirePage': true,
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Date',
                'Type': 'date',
                'inputType': 'date',
                'input': true,
                'value': '',
                'mappingId': 0,
                'labelName': 'Label Name',
                'documentPage': false,
                'commonDetailPage': true,
                'newHirePage': true,
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'TextArea',
                'Type': 'textarea',
                'inputType': 'textarea',
                'input': true,
                'value': '',
                'mappingId': 0,
                'labelName': 'Label Name',
                'documentPage': false,
                'commonDetailPage': true,
                'newHirePage': true,
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Radio Button',
                'Type': 'radio',
                'inputType': 'Radio button',
                'input': true,
                'value': '',
                'mappingId': 0,
                'labelName': 'Label Name',
                'documentPage': false,
                'commonDetailPage': true,
                'newHirePage': true,
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Checkbox',
                'Type': 'checkbox',
                'inputType': 'Check box',
                'input': true,
                'value': '',
                'mappingId': 0,
                'labelName': 'Label Name',
                'documentPage': false,
                'commonDetailPage': true,
                'newHirePage': true,
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Combo box',
                'Type': 'dropdown',
                'inputType': 'dropdown',
                'input': true,
                'value': '',
                'mappingId': 0,
                'labelName': 'Label Name',
                'documentPage': false,
                'commonDetailPage': true,
                'newHirePage': true,
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'File Attachment',
                'Type': 'attachment',
                'inputType': 'attachment',
                'input': true,
                'value': '',
                'mappingId': 0,
                'attachedFiles': [],
                'labelName': 'Attachment (Maximum of Three Files with total of 30MB)',
                'documentPage': false,
                'commonDetailPage': true,
                'newHirePage': true,
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Divider',
                'Type': 'devider',
                'inputType': 'devider',
                'input': true,
                'inputType': 'devider',
                'documentPage': true,
                'commonDetailPage': true,
                'newHirePage': true,
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Empty Space',
                'Type': 'emptyspace',
                'input': true,
                'inputType': 'emptyspace',
                'documentPage': true,
                'commonDetailPage': true,
                'newHirePage': true,
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            },
            {
                'name': 'Heading name',
                'Type': 'header',
                'inputType': 'header',
                'input': true,
                'documentPage': true,
                'commonDetailPage': true,
                'newHirePage': true,
                'isSaved': false,
                'isMaster': false,
                'isUpdated': false
            }
        ];

        objDynamicWebFormService.controlesList = controlesList;
        objDynamicWebFormService.settingsList = settingsList;
        objDynamicWebFormService.dragFields = dragFields;
        objDynamicWebFormService.getStatusCommonFieldDelete = getStatusCommonFieldDelete;
        objDynamicWebFormService.deleteCommonField = deleteCommonField;
        objDynamicWebFormService.getCommonApis = getCommonApis;
        objDynamicWebFormService.convertToWebFormJson = convertToWebFormJson;
        objDynamicWebFormService.addressTypeSource = addressTypeSource;
        objDynamicWebFormService.addressDetailsList = addressDetailsList;
        objDynamicWebFormService.updateRadioValues = updateRadioValues;

        return objDynamicWebFormService;

        function updateRadioValues(makingObj, type, obj) {
            if(obj.data && obj.data.values && obj.data.values.length){
                $.each(makingObj.Settings, function (index, set) {
                    if (set.Type == type && (obj.data.values && obj.data.values.length)) {
                        for (var i = 0; i < obj.data.values.length; i++) {
                            if (!obj.data.values[i].name) {
                                obj.data.values[i].name = obj.data.values[i].value;
                                obj.data.values[i].showControls = [];
                            }
                        }
                        set.Possiblevalue = obj.data.values;
                        return;
                    }
                });
            }
            

        }

        function convertToWebFormJson(tempComponents) {
            var formFields = [];
            var components = $filter('orderBy')(tempComponents, ['page', 'tab']);
            var components = '';
            if (DynamicWebFormService.frompage == 'documentPage') {
                components = $filter('orderBy')(tempComponents, ['page', 'tab']);

            } else {
                components = angular.copy(tempComponents);
            }
            for (var i = 0; i < components.length; i++) {
                var obj = components[i];
                var makingObj = {};
                makingObj.isMaster = obj.isMaster ? true : false;
                makingObj.isUpdated = obj.isUpdated ? true : false;
                //   makingObj.page = obj.page;      
                //   makingObj.tab = obj.tab;
                if (obj.input) {
                    switch (obj.inputType.toLowerCase()) {
                        case 'textarea':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'textarea';
                            makingObj.inputType = 'textarea';
                            makingObj.page = obj.page;
                            makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.changedValue = obj.changedValue ? obj.changedValue : '';
                            makingObj.input = true;
                            makingObj.isSaved = obj.isSaved ? obj.isSaved : false;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('textarea'));
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                            formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'text':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'text';
                            makingObj.inputType = 'text';
                            makingObj.page = obj.page;
                            makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.input = true;
                            makingObj.isSaved = obj.isSaved ? obj.isSaved : false;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('text'));
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                            formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'attachment':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'attachment';
                            makingObj.inputType = 'attachment';
                            makingObj.page = obj.page;
                            makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.input = true;
                            makingObj.isSaved = obj.isSaved ? obj.isSaved : false;
                            makingObj.attachedFiles = (obj.attachedFiles && obj.attachedFiles.length) ? obj.attachedFiles : [];

                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('attachment'));
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                            formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'email':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'email';
                            makingObj.inputType = 'email';
                            makingObj.page = obj.page;
                            makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.input = true;
                            makingObj.isSaved = obj.isSaved ? obj.isSaved : false;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('email'));
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                            formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'number':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'number';
                            makingObj.inputType = 'number';
                            makingObj.page = obj.page;
                            makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.input = true;
                            makingObj.isSaved = obj.isSaved ? obj.isSaved : false;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('number'));
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                            formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'numberwithdecimal':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'numberwithdecimal';
                            makingObj.inputType = 'numberwithdecimal';
                            makingObj.page = obj.page;
                            makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.input = true;
                            makingObj.isSaved = obj.isSaved ? obj.isSaved : false;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('numberwithdecimal'));
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                            formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'phone-number':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'phone-number';
                            makingObj.inputType = 'phone-number';
                            makingObj.page = obj.page;
                            makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.input = true;
                            makingObj.isSaved = obj.isSaved ? obj.isSaved : false;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('phone-number'));
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                            formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'date':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'date';
                            makingObj.inputType = 'date';
                            makingObj.page = obj.page;
                            makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                            makingObj.value = obj.value ? obj.value : null;
                            makingObj.input = true;
                            makingObj.isSaved = obj.isSaved ? obj.isSaved : false;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('date'));
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                            formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'dropdown':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'dropdown';
                            makingObj.inputType = 'dropdown';
                            makingObj.page = obj.page;
                            makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.input = true;
                            makingObj.isSaved = obj.isSaved ? obj.isSaved : false;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('dropdown'));
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                            formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'push button':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'button';
                            makingObj.inputType = 'Push button';
                            makingObj.input = true;
                            makingObj.isSaved = obj.isSaved ? obj.isSaved : false;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('button'));
                            formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'check box':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'checkbox';
                            makingObj.inputType = 'Check box';
                            makingObj.page = obj.page;
                            makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.input = true;
                            makingObj.isSaved = obj.isSaved ? obj.isSaved : false;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('checkbox'));
                            makingObj.Options = obj.values;
                            makingObj.values = obj.values;
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                            formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'radio button':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'radio';
                            makingObj.inputType = 'Radio button';
                            makingObj.page = obj.page;
                            makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.input = true;
                            makingObj.isSaved = obj.isSaved ? obj.isSaved : false;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('radio'));
                            objDynamicWebFormService.updateRadioValues(makingObj, 'radio_increment', obj);
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                            formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'header':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'header';
                            makingObj.inputType = 'header';
                            makingObj.page = obj.page ? obj.page : null;
                            //makingObj.mappingId = obj.mappingId ? obj.mappingId : 0;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.input = true;
                            makingObj.isSaved = obj.isSaved ? obj.isSaved : false;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('header'));
                            makingObj.labelName = (obj.labelName ? obj.labelName : obj.name);
                            formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'devider':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'devider';
                            makingObj.inputType = 'devider';
                            makingObj.input = true;
                            makingObj.isSaved = obj.isSaved ? obj.isSaved : false;
                            makingObj.page = obj.page ? obj.page : null;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('devider'));
                            formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'emptyspace':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'emptyspace';
                            makingObj.inputType = 'emptyspace';
                            makingObj.input = true;
                            makingObj.isSaved = obj.isSaved ? obj.isSaved : false;
                            makingObj.page = obj.page ? obj.page : null;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('emptyspace'));
                            formFields.push(makingObj);
                            makingObj = {};
                            break;
                        default:
                            // code block


                    }
                }
            }
            return formFields;
        }

        function getSettingObj(type) {
            var ary = $filter('filter')(controlesList, { 'Type': type }, true);
            if (ary[0] && !ary[0].Settings) {
                ary[0].Settings = settingsList[type];
            }
            return ary[0].Settings;
        }

        function getStatusCommonFieldDelete(fieldid, webformid) {
            return $http.get(getStatusCommonFieldDeleteUrl + fieldid + '/' + webformid);
        }

        function getCommonApis() {
            return $http.get(commonapisurl);
        }

        function deleteCommonField(fieldid, webformid) {
            // return $http.delete(deleteCommonFieldUrl + fieldid + '/' + webformid);
            return $http({
                method: 'DELETE',
                url: deleteCommonFieldUrl + fieldid + "/" + webformid,
                data: null,
                headers: { 'Content-type': 'application/json' }
            });
        }
    }
})();