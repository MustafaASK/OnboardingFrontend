(function() {
    "use strict";
    function randomString(length) {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }
    hrAdminApp.directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, { file: element[0].files[0] });
                    });
                });

                scope.$watch(attrs.fileModel, function(file) {
                    if (!file)
                        element.val(file);
                });
            }
        };
    }]);
    hrAdminApp.directive('fileUploadValidation',['$parse','ToastrService', function($parse,ToastrService) {
        return {
            restrict: 'A',
            require: '^ngModel',
            link: function(scope, element, attrs,ngModel) {
                var model = $parse(attrs.fileUploadValidation);
                var modelSetter = model.assign;
                var interests = scope.$eval(attrs.fileUploadValidation);

                var docsObjs = {};
                var jsonUpdateobj = [];

                // element.bind('change', function() {
                //     scope.$apply(function() {
                //         modelSetter(scope, { file: '22' });
                //     });
                // });

                scope.$watch(attrs.ngModel, function(file) {
                    if (file && file.length){
                        //element.val(file);
                        // modelSetter(scope,  '11' );
                        console.log(file);
                        // if(!interests){
                        //     interests = []
                        // }
                        var fileSize = 0;
                        var isExist = false;

                        for(var i=0;i<file.length;i++){
                            if(!file[i].size){ isExist = true; }
                            fileSize = fileSize + (file[i].size ? file[i].size : 0);
                            // interests.push(jsonUpdateobj[i]);
                            // scope.$parent.$parent.$parent.$parent.attachedFilesObject[fileid] = file;
                        }
                        for(var i=0;i<interests.length;i++){
                            fileSize = fileSize + interests[i].size;
                        }
                        /* For check more than 30 MB 31457280 */
                        if(fileSize < 3145728 && !isExist){
                            // interests.push(fileobj);//interests.concat(jsonUpdateobj); 
                            for(var i=0;i<file.length;i++){
                                var fileobj = {};
                                var fileid = randomString(10);
                                var nametype = file[i].name.split(".");
                                fileobj.id = fileid;
                                fileobj.name = file[i].name;
                                fileobj.type = nametype[nametype.length - 1];
                                fileobj.size = file[i].size;
                                fileobj.description = '';
                                interests.push(fileobj);
                                //docsObjs[fileid] = file;
                                scope.$parent.$parent.$parent.$parent.attachedFilesObject[fileid] = file[i];
                            }
                            // for(var i=0;i<jsonUpdateobj.length;i++){
                            //     interests.push(jsonUpdateobj[i]);
                            //     scope.$parent.$parent.$parent.$parent.attachedFilesObject[fileid] = file;
                            // }
                        } if(fileSize > 3145728) {
                            // ngModel.$validators.fileUploadValidation = false;
                            fileSize = 0;
                            //jsonUpdateobj = [];
                            //docsObjs = {};
                            ToastrService.error('File size should be less than 30 MB');
                        }
                        // ngModel.$validators.fileUploadValidation = false;
                        

                        //interests[randomString(10)] = file[0].name;
                        // interests.push('99');
                        //scope.$parent.$parent.$parent.$parent.attachedFilesObject[1] = file;
                    }
                });
            }
            // link: function(scope, el, attr, ctrl) {
            //     var model = $parse(attr.ngModel);
            //     el.bind('change', function(e) {
            //         var file = ((e.srcElement || e.target).files[0]);
            //         console.log(file);

                    
            //     });
            //     scope.$watch(attr.ngModel, function(newValue, oldValue) {
            //         console.log(newValue);
            //         if (newValue && newValue.length){
            //             //model = newValue ;
            //             el.val(newValue);
            //         }
            //     });
            // }
        }
    }]);

}());