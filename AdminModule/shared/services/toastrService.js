(function () {
    'use strict';
    hrAdminApp.factory('ToastrService', ToastrService);
    ToastrService.$inject = ['$filter', '$mdToast'];
    function ToastrService($filter, $mdToast) {

        var objToastrService = {};
        objToastrService.success = success;
        objToastrService.message = message;
        objToastrService.warning = warning;
        objToastrService.error = error;

        return objToastrService;

        function iconDisplay (action) {
            switch (action) {
                case 'success':
                    return 'images/toast_icons/success_icon.svg';
                case 'warning':
                    return 'images/toast_icons/warning_icon.svg';
                case 'error':
                    return 'images/toast_icons/error_icon.svg';
                case 'message':
                    return 'images/toast_icons/info_icon.svg';
            }
        }


        function showToast(toastClass, header_key, data_key) {

            var pinTo = 'bottom right';
            var data = data_key;
            var header = header_key;
            var icon = iconDisplay(toastClass);

            var toast = $mdToast.tradzProToast().content(data).header(header).toastClass(toastClass).icon(icon).position(pinTo).hideDelay(3000);

            $mdToast.show(toast);
        }

        function success(header_key,data_key) {
            showToast('success', header_key, data_key);
        }

        function message(header_key, data_key) {
            showToast('message', header_key, data_key);
        }

        function warning(header_key, data_key) {
            showToast('warning', header_key, data_key);
        }

        function error(header_key, data_key) {
            showToast('error', header_key, data_key);
        }

    }
})();