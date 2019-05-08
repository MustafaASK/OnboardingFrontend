(function () {
    'use strict';
    hrAdminApp.factory('DocDropService', docDropService);
    docDropService.$inject = ['$rootScope'];

    function docDropService($rootScope) {
        
        var doclisteners = {};
            //return {

        doclisteners.i = 0;
        doclisteners.listeners = {};
        doclisteners.addListener = function(element, event, handler, capture) {
                    element.addEventListener(event, handler, capture);
                    doclisteners.listeners[doclisteners.i] = {element: element, 
                                     event: event, 
                                     handler: handler, 
                                     capture: capture};
                    return doclisteners.i;
                };
                doclisteners.removeListener = function(id) {
                    if(id in doclisteners.listeners) {
                        var h = doclisteners.listeners[id];
                        h.element.removeEventListener(h.event, h.handler, h.capture);
                    }
                }
            //};
        doclisteners.removeAllListeners = function () {
            for(var i = 0; i <= doclisteners.i; i++){
                doclisteners.removeListener(doclisteners.i); 
            }
        }
        return doclisteners;

    }


})();
