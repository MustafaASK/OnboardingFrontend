candidateApp.filter('breakFilter', function () {
    return function (text) {
        if (text !== undefined){ 
            return text.replace(/\n/g, '<br />');
         } else {
             return text;
         }
    };
});