(function () {
    'use strict';
    candidateApp.controller('commonDetailsController', commonDetailsController);
    commonDetailsController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$location', 'ToastrService', 'CandidateUsersService', '$mdDialog', '$filter', '$timeout', 'CommondetailsService'];
    function commonDetailsController($scope, $rootScope, $state, $stateParams, $location, ToastrService, CandidateUsersService, $mdDialog, $filter, $timeout, CommondetailsService) {
        var vm = this;
        var rootUrl = $rootScope.rootUrl;
        var newhireid = $rootScope.CandidateInfo.newhireid;
        var controleSetting = [{ 'name': 'Single Text', 'Type': 'text', 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Field Type', 'value': 'Text', 'Type': 'patterndropdown', 'width': 50, 'Possiblevalue': ['Text', 'Numeric', 'NumericwithDecimal', 'AlphaNumeric', 'Phone-Number', 'Email', 'Date'] }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'Min Length', 'value': '1', 'Type': 'number', 'width': 50 }, { 'name': 'Max Length', 'value': '50', 'Type': 'number', 'width': 50, 'length': 50 }, { 'name': 'TabIndex', 'value': '', 'Type': 'number', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'width': 50, 'Possiblevalue': ['100', '50', '33', '25', '20'] }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false }, { 'name': 'Mask Data', 'value': false }, { 'name': 'Enable Google Maps', 'value': false }], 'width': 100 }] }, { 'name': 'Email', 'Type': 'email', 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Field Type', 'value': 'Text', 'Type': 'patterndropdown', 'width': 50, 'Possiblevalue': ['Text', 'Numeric', 'NumericwithDecimal', 'AlphaNumeric', 'Phone-Number', 'Email', 'Date'] }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'Min Length', 'value': '1', 'Type': 'number', 'width': 50 }, { 'name': 'Max Length', 'value': '50', 'Type': 'number', 'width': 50, 'length': 50 }, { 'name': 'TabIndex', 'value': '', 'Type': 'number', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'width': 50, 'Possiblevalue': ['100', '50', '33', '25', '20'] }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false }], 'width': 100 }] }, { 'name': 'Single Text', 'Type': 'phone-number', 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Field Type', 'value': 'Phone-Number', 'Type': 'patterndropdown', 'width': 50, 'Possiblevalue': ['Text', 'Numeric', 'NumericwithDecimal', 'AlphaNumeric', 'Phone-Number', 'Email', 'Date'] }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'Min Length', 'value': '1', 'Type': 'number', 'width': 50 }, { 'name': 'Max Length', 'value': '50', 'Type': 'number', 'width': 50, 'length': 50 }, { 'name': 'TabIndex', 'value': '', 'Type': 'number', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'width': 50, 'Possiblevalue': ['100', '50', '33', '25', '20'] }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false }], 'width': 100 }] }, { 'name': 'Single Text', 'Type': 'number', 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Field Type', 'value': 'Numeric', 'Type': 'patterndropdown', 'width': 50, 'Possiblevalue': ['Text', 'Numeric', 'NumericwithDecimal', 'AlphaNumeric', 'Phone-Number', 'Email', 'Date'] }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'Min', 'value': '1', 'Type': 'number', 'width': 50 }, { 'name': 'Max', 'value': '50', 'Type': 'number', 'width': 50 }, { 'name': 'TabIndex', 'value': '', 'Type': 'number', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'width': 50, 'Possiblevalue': ['100', '50', '33', '25', '20'] }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false }, { 'name': 'Mask Data', 'value': false }], 'width': 100 }] }, { 'name': 'Date', 'Type': 'date', 'value': null, 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Field Type', 'value': 'Date', 'Type': 'patterndropdown', 'width': 50, 'Possiblevalue': ['Text', 'Numeric', 'NumericwithDecimal', 'AlphaNumeric', 'Phone-Number', 'Email', 'Date'] }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'Min Length', 'value': '1', 'Type': 'number', 'disabled': true, 'width': 50 }, { 'name': 'Max Length', 'value': '50', 'Type': 'number', 'disabled': true, 'width': 50 }, { 'name': 'TabIndex', 'value': '', 'Type': 'number', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }, { 'name': 'Dependency Validation', 'value': '', 'Type': 'dependency', 'width': 100, 'isDependent': { 'name': '', 'value': true }, 'dependencyObjs': [{ 'name': 'Conditions', 'type': 'conditions', 'value': '<', 'Possiblevalue': [{ 'name': 'Less than(<)', 'value': '<', }, { 'name': 'Less than or equals(<=)', 'value': '<=', }, { 'name': 'Greater than(>)', 'value': '>', }, { 'name': 'Greater than or equals(>=)', 'value': '>=', }, { 'name': 'Equals(==)', 'value': '==', }] }, { 'name': 'Other Fields', 'type': 'otherfield', 'value': '', 'Possiblevalue': [] }] }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false },], 'width': 100 }] }, { 'name': 'Single Selection', 'Type': 'dropdown', 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'TabIndex', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Choice', 'Type': 'dropdown_increment', 'Possiblevalue': [{ 'name': 'Option 1', 'value': 'Option1' }, { 'name': 'Option 2', 'value': 'Option2' }], 'width': 100 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }], 'width': 100 }] }, { 'name': 'TextArea', 'Type': 'textarea', 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'Min Length', 'value': '1', 'Type': 'number', 'width': 50 }, { 'name': 'Max Length', 'value': '200', 'Type': 'number', 'width': 50, 'length': 2000 }, { 'name': 'TabIndex', 'value': '', 'Type': 'number', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }, { 'name': 'Field Type', 'value': 'String', 'Type': 'dropdown', 'width': 50, 'Possiblevalue': ['String', 'Numeric', 'NumericwithDecimal', 'AlphaNumeric', 'Phone-Number', 'Email'] }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false }, { 'name': 'Mask Data', 'value': false }, { 'name': 'Enable Google Maps', 'value': false }], 'width': 100 }] }, { 'name': 'Radio Text', 'Type': 'radio', 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'TabIndex', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }, { 'name': 'Radio Choice', 'Type': 'radio_increment', 'Possiblevalue': [{ 'name': 'Radio1', 'value': 'Radio1' }, { 'name': 'Radio2', 'value': 'Radio2' }], 'width': 100 }, { 'name': 'Radio Align Options', 'Type': 'radioBoxZone', 'value': 'Align Vertical', 'Options': [{ 'name': 'Align Horizontal' }, { 'name': 'Align Vertical' }], 'width': 100 }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false },], 'width': 100 }], 'data': [{ 'name': 'Radio1', 'value': 'Radio1' }, { 'name': 'Radio2', 'value': 'Radio2' }] }, { 'name': 'Button', 'Type': 'button', 'input': true, 'inputType': 'header', 'Settings': [{ 'name': 'Button Text', 'value': '', 'Type': 'button', 'width': 100 }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'TabIndex', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }] }, { 'name': 'Checkbox Text', 'Type': 'checkbox', 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'TabIndex', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }], 'Options': [{ 'name': 'Checkbox1', 'value': 'Checkbox1' }, { 'name': 'Checkbox2', 'value': 'Checkbox2' }] }, { 'name': 'Divider', 'Type': 'devider', 'input': true, 'inputType': 'devider', 'Settings': [{ 'name': 'Width', 'value': '1', 'Type': 'devider', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 100 }] }, { 'name': 'Empty Space', 'Type': 'emptyspace', 'input': true, 'inputType': 'emptyspace', 'Settings': [{ 'name': 'Width', 'value': '1', 'Type': 'emptyspace', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 100 }] }, { 'name': 'Heading name', 'Type': 'header', 'input': true, 'inputType': 'header', 'Settings': [{ 'name': 'Heading name', 'value': 'Heading name', 'Type': 'headervalue', 'width': 100 }, { 'name': 'Font Size', 'value': 23, 'Type': 'font-size', 'width': 50 }, { 'name': 'Font-Family', 'value': 'Segoe UI', 'Type': 'font-family', 'Possiblevalue': ['Arial', 'Comic Sans MS', 'Courier New', 'Georgia', 'Lucida Sans Unicode', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Segoe UI', 'Verdana'], 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'heading', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }] }];

        $scope.dragElements = [{ 'name': 'Text', 'Type': 'text', 'inputType': 'text', 'input': true, 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': 'Label Name', 'Type': 'text', 'width': 50 }, { 'name': 'Field Type', 'value': 'Text', 'Type': 'patterndropdown', 'width': 50, 'Possiblevalue': ['Text', 'Numeric', 'NumericwithDecimal', 'AlphaNumeric', 'Phone-Number', 'Email', 'Date'] }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'Min Length', 'value': '1', 'Type': 'number', 'width': 50 }, { 'name': 'Max Length', 'value': '50', 'Type': 'number', 'width': 50, 'length': 50 }, { 'name': 'TabIndex', 'value': '', 'Type': 'number', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'width': 50, 'Possiblevalue': ['100', '50', '33', '25', '20'] }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false }, { 'name': 'Mask Data', 'value': false }, { 'name': 'Enable Google Maps', 'value': false }], 'width': 100 }] }, { 'name': 'Date', 'Type': 'date', 'inputType': 'date', 'input': true, 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': 'Label Name', 'Type': 'text', 'width': 50 }, { 'name': 'Field Type', 'value': 'Date', 'Type': 'patterndropdown', 'width': 50, 'Possiblevalue': ['Text', 'Numeric', 'NumericwithDecimal', 'AlphaNumeric', 'Phone-Number', 'Email', 'Date'] }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'Min Length', 'value': '1', 'Type': 'number', 'disabled': true, 'width': 50 }, { 'name': 'Max Length', 'value': '50', 'Type': 'number', 'disabled': true, 'width': 50 }, { 'name': 'TabIndex', 'value': '', 'Type': 'number', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }, { 'name': 'Dependency Validation', 'value': '', 'Type': 'dependency', 'width': 100, 'isDependent': { 'name': '', 'value': true }, 'dependencyObjs': [{ 'name': 'Conditions', 'type': 'conditions', 'value': '<', 'Possiblevalue': [{ 'name': 'Less than(<)', 'value': '<', }, { 'name': 'Less than or equals(<=)', 'value': '<=', }, { 'name': 'Greater than(>)', 'value': '>', }, { 'name': 'Greater than or equals(>=)', 'value': '>=', }, { 'name': 'Equals(==)', 'value': '==', }] }, { 'name': 'Other Fields', 'type': 'otherfield', 'value': '', 'Possiblevalue': [] }] }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false },], 'width': 100 }] }, { 'name': 'TextArea', 'Type': 'textarea', 'inputType': 'textarea', 'input': true, 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Label Name', 'value': 'Label Name', 'Type': 'text', 'width': 50 }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'Min Length', 'value': '1', 'Type': 'number', 'width': 50 }, { 'name': 'Max Length', 'value': '200', 'Type': 'number', 'width': 50, 'length': 2000 }, { 'name': 'TabIndex', 'value': '', 'Type': 'number', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }, { 'name': 'Field Type', 'value': 'String', 'Type': 'dropdown', 'width': 50, 'Possiblevalue': ['String', 'Numeric', 'NumericwithDecimal', 'AlphaNumeric', 'Phone-Number', 'Email'] }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false }, { 'name': 'Mask Data', 'value': false }, { 'name': 'Enable Google Maps', 'value': false }], 'width': 100 }] }, { 'name': 'Radio Button', 'Type': 'radio', 'inputType': 'Radio button', 'input': true, 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Radio Text', 'value': 'Radio Text', 'Type': 'text', 'width': 50 }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'TabIndex', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }, { 'name': 'Radio Choice', 'Type': 'radio_increment', 'Possiblevalue': [{ 'name': 'Radio1', 'value': 'Radio1' }, { 'name': 'Radio2', 'value': 'Radio2' }], 'width': 100 }, { 'name': 'Radio Align Options', 'Type': 'radioBoxZone', 'value': 'Align Vertical', 'Options': [{ 'name': 'Align Horizontal' }, { 'name': 'Align Vertical' }], 'width': 100 }, { 'name': 'General Validations', 'Type': 'checkBoxZone', 'Options': [{ 'name': 'Required', 'value': false }, { 'name': 'Readonly', 'value': false },], 'width': 100 }], 'data': [{ 'name': 'Radio1', 'value': 'Radio1' }, { 'name': 'Radio2', 'value': 'Radio2' }] }, { 'name': 'Checkbox', 'Type': 'checkbox', 'inputType': 'Check box', 'input': true, 'value': '', 'mappingId': 0, 'Settings': [{ 'name': 'Checkbox Text Name', 'value': 'Checkbox Text Name', 'Type': 'text', 'width': 50 }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'label' }, { 'name': 'Assign Common Field', 'value': '', 'Type': 'commondropdown', 'width': 50, 'Possiblevalue': [] }, { 'name': 'Validations', 'value': '', 'Type': 'label' }, { 'name': 'TabIndex', 'value': '', 'Type': 'text', 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'widthdropdown', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }], 'Options': [{ 'name': 'Checkbox1', 'value': 'Checkbox1' }, { 'name': 'Checkbox2', 'value': 'Checkbox2' }] }, { 'name': 'Divider', 'Type': 'devider', 'inputType': 'devider', 'input': true, 'inputType': 'devider', 'Settings': [{ 'name': 'Width', 'value': '1', 'Type': 'devider', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 100 }] }, { 'name': 'Empty Space', 'Type': 'emptyspace', 'input': true, 'inputType': 'emptyspace', 'Settings': [{ 'name': 'Width', 'value': '1', 'Type': 'emptyspace', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 100 }] }, { 'name': 'Heading name', 'Type': 'header', 'inputType': 'header', 'input': true, 'inputType': 'header', 'Settings': [{ 'name': 'Heading name', 'value': 'Heading name', 'Type': 'headervalue', 'width': 100 }, { 'name': 'Font Size', 'value': 23, 'Type': 'font-size', 'width': 50 }, { 'name': 'Font-Family', 'value': 'Segoe UI', 'Type': 'font-family', 'Possiblevalue': ['Arial', 'Comic Sans MS', 'Courier New', 'Georgia', 'Lucida Sans Unicode', 'Tahoma', 'Times          New Roman', 'Trebuchet MS', 'Segoe UI', 'Verdana'], 'width': 50 }, { 'name': 'Width', 'value': '100', 'Type': 'heading', 'Possiblevalue': ['100', '50', '33', '25', '20'], 'width': 50 }] }];

        $scope.formFields = [];
        $scope.addressOptions = { "getType": "fulladdress", "watchEnter": false };
        // , "country": "us"

        function getJsonDocumentLibrary() {
            $scope.loading = true;
            CandidateUsersService.getJsonCommonDetail(newhireid).then(
                function (response) {
                    $scope.loading = false;
                    if (response.data.Error) {
                        ToastrService.error(response.data.message);
                    } else {
                        var tempComponents = response.data.components ? response.data.components : [];
                        //$scope.formFields = angular.copy(tempComponents);
                        convertToWebFormJson(tempComponents);
                    }
                },
                function (err) {
                    $scope.loading = false;
                    ToastrService.error($rootScope.errorMsgs.MSG201);
                }
            )
        }
        getJsonDocumentLibrary();
        function convertToWebFormJson(tempComponents) {
            var components = $filter('orderBy')(tempComponents, ['page', 'tab']);
            for (var i = 0; i < components.length; i++) {
                var obj = components[i];
                var makingObj = {};
                makingObj.isUpdated = false;
                //   makingObj.page = obj.page;      
                //   makingObj.tab = obj.tab;
                if (obj.input) {
                    switch (obj.inputType.toLowerCase()) {
                        case 'textarea':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'textarea';
                            makingObj.inputType = 'textarea';
                            makingObj.input = true;
                            makingObj.mappingId = obj.mappingId;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.changedValue = obj.changedValue ? obj.changedValue : '';
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('textarea'));
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            $scope.formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'text':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'text';
                            makingObj.inputType = 'text';
                            makingObj.input = true;
                            makingObj.mappingId = obj.mappingId;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.changedValue = obj.changedValue ? obj.changedValue : '';
                            if (obj.Settings) {
                                makingObj.Settings = obj.Settings;
                                // makingObj.Settings[0].value = obj.name;
                                makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            } else {
                                makingObj.Settings = angular.copy(getSettingObj('text'));
                                makingObj.Settings[0].value = obj.name;
                                //makingObj.Settings[0].value =  ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value );
                            }
                            //makingObj.Settings = obj.Settings ? obj.Settings  : angular.copy(getSettingObj('text'));
                            //makingObj.Settings[0].value =  ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value );
                            $scope.formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'number':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'number';
                            makingObj.inputType = 'number';
                            makingObj.page = obj.page;
                            makingObj.input = true;
                            makingObj.mappingId = obj.mappingId;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.changedValue = obj.changedValue ? obj.changedValue : '';
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('number'));
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            $scope.formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'email':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'email';
                            makingObj.inputType = 'email';
                            makingObj.page = obj.page;
                            makingObj.input = true;
                            makingObj.mappingId = obj.mappingId;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.changedValue = obj.changedValue ? obj.changedValue : '';
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('email'));
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            $scope.formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'phone-number':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'phone-number';
                            makingObj.inputType = 'phone-number';
                            makingObj.page = obj.page;
                            makingObj.input = true;
                            makingObj.mappingId = obj.mappingId;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.changedValue = obj.changedValue ? obj.changedValue : '';
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('phone-number'));
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            $scope.formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'date':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'date';
                            makingObj.inputType = 'date';
                            makingObj.input = true;
                            makingObj.mappingId = obj.mappingId;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.changedValue = obj.changedValue ? obj.changedValue : '';
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('date'));
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            $scope.formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'combo box':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'dropdown';
                            makingObj.inputType = 'Combo box';
                            makingObj.input = true;
                            makingObj.mappingId = obj.mappingId;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('dropdown'));
                            makingObj.values = obj.values;
                            updateObj(makingObj, 'dropdown_increment', obj);
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            $scope.formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'push button':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'button';
                            makingObj.inputType = 'Push button';
                            makingObj.input = true;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('button'));
                            $scope.formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'check box':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'checkbox';
                            makingObj.inputType = 'Check box';
                            makingObj.input = true;
                            makingObj.mappingId = obj.mappingId;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('checkbox'));
                            makingObj.Options = obj.values;
                            makingObj.values = obj.values;
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            $scope.formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'radio button':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'radio';
                            makingObj.inputType = 'Radio button';
                            makingObj.input = true;
                            makingObj.mappingId = obj.mappingId;
                            makingObj.value = obj.value ? obj.value : '';
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('radio'));
                            updateObj(makingObj, 'radio_increment', obj);
                            //makingObj.Options = obj.data.values;
                            makingObj.data = {
                                values: obj.data.values
                            };
                            makingObj.Settings[0].value = ((makingObj.Settings[0].value == '' || makingObj.Settings[0].value == obj.name) ? obj.name : makingObj.Settings[0].value);
                            $scope.formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'header':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'header';
                            makingObj.inputType = 'header';
                            makingObj.input = true;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('header'));
                            $scope.formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'emptyspace':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'emptyspace';
                            makingObj.inputType = 'emptyspace';
                            makingObj.input = true;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('emptyspace'));
                            $scope.formFields.push(makingObj);
                            makingObj = {};
                            break;
                        case 'devider':
                            // code block
                            makingObj.name = obj.name;
                            makingObj.Type = 'devider';
                            makingObj.inputType = 'devider';
                            makingObj.input = true;
                            makingObj.Settings = obj.Settings ? obj.Settings : angular.copy(getSettingObj('devider'));
                            $scope.formFields.push(makingObj);
                            makingObj = {};
                            break;
                        default:
                        // code block


                    }
                }
            }
            $timeout(function () {
                for (var i = 0; i < $scope.formFields.length; i++) {

                    if ($scope.formFields[i].inputType == 'textarea' && !$scope.getFieldSettingPar('Readonly', $scope.formFields[i]).value) {
                        var elem = document.getElementById('textarea_' + i);
                        // console.log("textarea"+$scope.getFieldSettingPar('Readonly',$scope.formFields[i]).value);
                        elem.focus();
                        break;
                    }
                    else if ($scope.formFields[i].inputType == 'text' && !$scope.getFieldSettingPar('Readonly', $scope.formFields[i]).value) {
                        var elem = document.getElementById('text_' + i);
                        // console.log("text"+$scope.getFieldSettingPar('Readonly',$scope.formFields[i]).value);
                        elem.focus();
                        break;
                    }
                }

            }, 1000);

        }
        function getSettingObj(type) {
            var ary = $filter('filter')(controleSetting, { 'Type': type });
            return ary[0].Settings;
        }

        function updateObj(makingObj, type, obj) {
            $.each(makingObj.Settings, function (index, set) {
                if (set.Type == type && (obj.data.values && obj.data.values.length)) {
                    for (var i = 0; i < obj.data.values.length; i++) {
                        if (!obj.data.values[i].name) {
                            obj.data.values[i].name = obj.data.values[i].value;
                        }
                    }
                    set.Possiblevalue = obj.data.values;
                    return;
                }
            });

        }

        $scope.getFieldSettingPar = function (settingname, obj) {
            var result = {};
            var settings = obj.Settings;
            $.each(settings, function (index, set) {
                if (set.name == settingname) {
                    result = set;
                    return;
                }
            });
            if (!Object.keys(result).length) {
                //Continue to search settings in the checkbox zone
                $.each(settings[settings.length - 1].Options, function (index, set) {
                    if (set.name == settingname) {
                        result = set;
                        return;
                    }
                });
            }
            return result;

        }
        $scope.getFieldRadioPar = function (settingname, obj) {
            var result = {};
            var settings = obj.Settings;
            $.each(settings, function (index, set) {
                if (set.name == settingname) {
                    result = set;
                    return;
                }
            });
            if (!Object.keys(result).length) {
                //Continue to search settings in the checkbox zone
                $.each(settings[settings.length - 1].Options, function (index, set) {
                    if (set.name == settingname) {
                        result = set;
                        return;
                    }
                });
            }
            return result;

        }
        $scope.submitted = false;
        $scope.validateForm = function () {
            $scope.submitted = true;

        }

        var dateobj = new Date();
        $scope.getDateValue = function (currentobj, offsetdays) {
            // if(currentobj !== 'currentdate'){
            //     dateobj = null;
            // }
            var dateobj;
            if (currentobj == 'currentdate' || currentobj == 'Current Date') {
                dateobj = new Date();
            }
            else {
                for (var i = 0; i < $scope.formFields.length; i++) {
                    if ($scope.formFields[i].name == currentobj && $scope.formFields[i].value)
                        dateobj = $scope.formFields[i].value;
                    dateobj = new Date(dateobj);
                }
            }
            if (offsetdays != 0 && dateobj) {
                dateobj.setDate(dateobj.getDate() + offsetdays);
            }
            return dateobj;
        }

        vm.saveCommonDetails = function (detailsFormValid) {
            $scope.submitted = true;
            if (detailsFormValid) {
                var dataObj = { components: $scope.formFields }
                CandidateUsersService.updateDynWebFormCommonDetails($rootScope.CandidateInfo.newhireid, dataObj).then(
                    function (response) {
                        if (response.data.Success) {
                            $state.go('dashboard');
                        }
                        if (response.data.Error) {
                            ToastrService.error(response.data.message);
                        }
                    },
                    function (err) {
                        ToastrService.error($rootScope.errorMsgs.MSG130);
                    }
                ).finally(function () {
                    $scope.loading = false;
                });
            }
            else {
                ToastrService.error('Please fill all the mandatory fields');
            }
            // return;

        }


    }
})();