var hrAdminApp;
(function () {
    'use strict';
    hrAdminApp = angular.module('OnBoarding', [
        'ngSanitize',
        'ui.router',
        'ngMaterial',
        'ngMdIcons',
        'ngMessages',
        'ngPDFViewer',
        'ngFileUpload',
        //'md.time.picker',
        'ui.mask',
        'cl.paging',
        'ui.calendar',
        'ngIdle',
        'mdColorPicker',
        // 'ngQuill',
        'chart.js',
        'focus-if',
        'ngAnimate',
        'ngAria',
       // 'moment'
        'ngMaterialDatePicker',
        'ng.ckeditor',
        'ui.sortable',
        'dndLists'
        
    ]);
    // 'material.components.eventCalendar',        

}());