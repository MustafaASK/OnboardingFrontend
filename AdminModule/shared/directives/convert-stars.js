(function() {
    "use strict";
    hrAdminApp.directive('convertStars', ['$parse', function($parse) {
        return {
            require: "ngModel",
            scope: {
                bindedModel: "=ngModel",
                newmodel: "@newmodel"
            },
            link: function(scope, element, attributes, ngModel) {
                //   console.log(scope.bindedModel);
                //scope.$parent.$parent[scope.newmodel] = '';
                var tempVal = '';
                var finalssnval = '';
                var letters = /^[0-9a-zA-Z]+$/;

                if (attributes.defaultval && attributes.defaultval.trim()) {
                    finalssnval = angular.copy(attributes.defaultval);
                    scope.$parent.$parent[scope.newmodel] = finalssnval;
                    tempVal = '';
                    for (var i = 0; i < attributes.defaultval.length; i++) {
                        tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                    }
                    scope.bindedModel = tempVal;
                } else {
                    scope.bindedModel = '';
                }
                element.on('paste', function(e) {
                    e.preventDefault();
                });
                element.on('keypress', function(e) {
                    //console.log(ngModel.$modelValue);
                    var typedtext = String.fromCharCode(e.charCode); //e.key;
                    //if(!scope.bindedModel){ scope.bindedModel = '';}
                    //if(typedtext && typedtext.length == 0){finalssnval = '';}
                    setTimeout(function() {
                        scope.$apply(function() {
                            var keyCode = e.charCode;
                            var pressedkeyletter = String.fromCharCode(e.charCode);
                            if (keyCode !== 46 && keyCode !== 8 && keyCode !== 32 && keyCode !== 13 && pressedkeyletter.match(letters)) {
                                if (parseInt(attributes.maxlength) && finalssnval.length < parseInt(attributes.maxlength)) {
                                    var pressedkey = String.fromCharCode(e.charCode); //e.key; //String.fromCharCode(e.charCode);
                                    finalssnval = finalssnval + pressedkey;
                                    scope.$parent.$parent[scope.newmodel] = finalssnval;
                                    tempVal = '';
                                    for (var i = 0; i < finalssnval.length; i++) {
                                        tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                    }
                                    scope.bindedModel = tempVal;

                                }
                            } else if (keyCode === 32) {
                                scope.bindedModel = scope.bindedModel.trim();
                            } else {
                                tempVal = '';
                                for (var i = 0; i < finalssnval.length; i++) {
                                    tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                }
                                scope.bindedModel = tempVal;
                            }
                        });
                    }, 200);
                    String.prototype.removeWord = function(searchWord) {
                        var str = this;
                        var n = str.search(searchWord);
                        while (str.search(searchWord) > -1) {
                            n = str.search(searchWord);
                            str = str.substring(0, n) + str.substring(n + searchWord.length, str.length);
                        }
                        return str;
                    }
                });

                element.on('keydown', function(evt) {
                    evt.stopPropagation();
                    evt = evt || window.event;
                    var keyCode = evt.keyCode;
                    if (keyCode == 9) {
                        return false;
                    }
                    var deleteKey = (keyCode == 46),
                        backspaceKey = (keyCode == 8);
                    var sel, deletedText, val;
                    sel = getInputSelection(this);
                    if (deleteKey || backspaceKey || sel.length) {
                        if (sel.length) {
                            //deletedText = finalssnval.slice(sel.start, sel.end);
                            //finalssnval = finalssnval.removeWord(deletedText);
                            finalssnval = truncateSelection(finalssnval, sel);
                        } else {
                            finalssnval = truncate(finalssnval, sel.start - 1);
                        }
                        scope.$parent.$parent[scope.newmodel] = finalssnval;

                    }

                });


                function truncate(input, index) {
                    var str = "";
                    var arr = input.split("");
                    for (var i = 0; i < input.length; i++) {
                        if (i != index) str += arr[i];
                    }
                    return str;
                }

                function truncateSelection(input, sel) {
                    var str = "";
                    var arr = input.split("");
                    for (var i = 0; i < input.length; i++) {
                        if (i < sel.start || i > sel.end - 1) {
                            str += arr[i];
                        }
                    }
                    return str;
                }

                function getInputSelection(input) {
                    var start = 0,
                        end = 0;
                    input.focus();
                    if (typeof input.selectionStart == "number" &&
                        typeof input.selectionEnd == "number") {

                        start = input.selectionStart;
                        end = input.selectionEnd;
                    } else if (document.selection && document.selection.createRange) {
                        var range = document.selection.createRange();
                        if (range) {
                            var inputRange = input.createTextRange();
                            var workingRange = inputRange.duplicate();
                            var bookmark = range.getBookmark();
                            inputRange.moveToBookmark(bookmark);
                            workingRange.setEndPoint("EndToEnd", inputRange);
                            end = workingRange.text.length;
                            workingRange.setEndPoint("EndToStart", inputRange);
                            start = workingRange.text.length;
                        }
                    }
                    return {
                        start: start,
                        end: end,
                        length: end - start
                    };
                }

            },
            controller: function($scope, $timeout) {

            }
        };
    }]);
    hrAdminApp.directive('convertStarsWithHiphen', ['$parse', function($parse) {
        return {
            require: "ngModel",
            scope: {
                bindedModel: "=ngModel",
                newmodel: "@newmodel"
            },
            link: function(scope, element, attributes, ngModel) {
                //   console.log(scope.bindedModel);
                //scope.$parent.$parent[scope.newmodel] = '';
                var tempVal = '';
                var finalssnval = '';
                var letters = /^[0-9a-zA-Z-]+$/;

                if (attributes.defaultval && attributes.defaultval.trim()) {
                    finalssnval = angular.copy(attributes.defaultval);
                    scope.$parent.$parent[scope.newmodel] = finalssnval;
                    tempVal = '';
                    for (var i = 0; i < attributes.defaultval.length; i++) {
                        tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                    }
                    scope.bindedModel = tempVal;
                } else {
                    scope.bindedModel = '';
                }
                element.on('paste', function(e) {
                    e.preventDefault();
                });
                element.on('keypress', function(e) {
                    //console.log(ngModel.$modelValue);
                    var typedtext = String.fromCharCode(e.charCode); //e.key;
                    //if(!scope.bindedModel){ scope.bindedModel = '';}
                    //if(typedtext && typedtext.length == 0){finalssnval = '';}
                    setTimeout(function() {
                        scope.$apply(function() {
                            var keyCode = e.charCode;
                            var pressedkeyletter = String.fromCharCode(e.charCode);
                            if (keyCode !== 46 && keyCode !== 8 && keyCode !== 32 && keyCode !== 13 && pressedkeyletter.match(letters)) {
                                if (parseInt(attributes.maxlength) && finalssnval.length < parseInt(attributes.maxlength)) {
                                    var pressedkey = String.fromCharCode(e.charCode); //e.key; //String.fromCharCode(e.charCode);
                                    finalssnval = finalssnval + pressedkey;
                                    scope.$parent.$parent[scope.newmodel] = finalssnval;
                                    tempVal = '';
                                    for (var i = 0; i < finalssnval.length; i++) {
                                        tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                    }
                                    scope.bindedModel = tempVal;

                                }
                            } else if (keyCode === 32) {
                                scope.bindedModel = scope.bindedModel.trim();
                            } else {
                                tempVal = '';
                                for (var i = 0; i < finalssnval.length; i++) {
                                    tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                }
                                scope.bindedModel = tempVal;
                            }
                        });
                    }, 200);
                    String.prototype.removeWord = function(searchWord) {
                        var str = this;
                        var n = str.search(searchWord);
                        while (str.search(searchWord) > -1) {
                            n = str.search(searchWord);
                            str = str.substring(0, n) + str.substring(n + searchWord.length, str.length);
                        }
                        return str;
                    }
                });

                element.on('keydown', function(evt) {
                    evt.stopPropagation();
                    evt = evt || window.event;
                    var keyCode = evt.keyCode;
                    if (keyCode == 9) {
                        return false;
                    }
                    var deleteKey = (keyCode == 46),
                        backspaceKey = (keyCode == 8);
                    var sel, deletedText, val;
                    sel = getInputSelection(this);
                    if (deleteKey || backspaceKey || sel.length) {
                        if (sel.length) {
                            //deletedText = finalssnval.slice(sel.start, sel.end);
                            //finalssnval = finalssnval.removeWord(deletedText);
                            finalssnval = truncateSelection(finalssnval, sel);
                        } else {
                            finalssnval = truncate(finalssnval, sel.start - 1);
                        }
                        scope.$parent.$parent[scope.newmodel] = finalssnval;

                    }

                });


                function truncate(input, index) {
                    var str = "";
                    var arr = input.split("");
                    for (var i = 0; i < input.length; i++) {
                        if (i != index) str += arr[i];
                    }
                    return str;
                }

                function truncateSelection(input, sel) {
                    var str = "";
                    var arr = input.split("");
                    for (var i = 0; i < input.length; i++) {
                        if (i < sel.start || i > sel.end - 1) {
                            str += arr[i];
                        }
                    }
                    return str;
                }

                function getInputSelection(input) {
                    var start = 0,
                        end = 0;
                    input.focus();
                    if (typeof input.selectionStart == "number" &&
                        typeof input.selectionEnd == "number") {

                        start = input.selectionStart;
                        end = input.selectionEnd;
                    } else if (document.selection && document.selection.createRange) {
                        var range = document.selection.createRange();
                        if (range) {
                            var inputRange = input.createTextRange();
                            var workingRange = inputRange.duplicate();
                            var bookmark = range.getBookmark();
                            inputRange.moveToBookmark(bookmark);
                            workingRange.setEndPoint("EndToEnd", inputRange);
                            end = workingRange.text.length;
                            workingRange.setEndPoint("EndToStart", inputRange);
                            start = workingRange.text.length;
                        }
                    }
                    return {
                        start: start,
                        end: end,
                        length: end - start
                    };
                }

            },
            controller: function($scope, $timeout) {

            }
        };
    }]);
    hrAdminApp.directive('convertStarsAtleastNumber', ['$parse', function($parse) {
        return {
            require: "ngModel",
            scope: {
                bindedModel: "=ngModel",
                newmodel: "@newmodel"
            },
            link: function(scope, element, attributes, ngModel) {
                //   console.log(scope.bindedModel);
                //scope.$parent.$parent[scope.newmodel] = '';
                var tempVal = '';
                var finalssnval = '';
                var letters = /^[0-9a-zA-Z]+$/;

                ngModel.$validators.atleastOneDigit = function(modelValue) {
                    var patt = /^(?=.*[0-9])([a-zA-Z0-9]+)$/;
                    return (modelValue ? (finalssnval.match(patt) ? true : false) : true);
                };

                if (attributes.defaultval && attributes.defaultval.trim()) {
                    finalssnval = angular.copy(attributes.defaultval);
                    scope.$parent.$parent[scope.newmodel] = finalssnval;
                    tempVal = '';
                    for (var i = 0; i < attributes.defaultval.length; i++) {
                        tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                    }
                    scope.bindedModel = tempVal;
                } else {
                    scope.bindedModel = '';
                }
                element.on('paste', function(e) {
                    e.preventDefault();
                });
                element.on('keypress', function(e) {
                    //console.log(ngModel.$modelValue);
                    var typedtext = String.fromCharCode(e.charCode); //e.key;
                    //if(!scope.bindedModel){ scope.bindedModel = '';}
                    //if(typedtext && typedtext.length == 0){finalssnval = '';}
                    setTimeout(function() {
                        scope.$apply(function() {
                            var keyCode = e.charCode;
                            var pressedkeyletter = String.fromCharCode(e.charCode);
                            if (keyCode !== 46 && keyCode !== 8 && keyCode !== 32 && keyCode !== 13 && pressedkeyletter.match(letters)) {
                                if (parseInt(attributes.maxlength) && finalssnval.length < parseInt(attributes.maxlength)) {
                                    var pressedkey = String.fromCharCode(e.charCode); //e.key; //String.fromCharCode(e.charCode);
                                    finalssnval = finalssnval + pressedkey;
                                    scope.$parent.$parent[scope.newmodel] = finalssnval;
                                    tempVal = '';
                                    for (var i = 0; i < finalssnval.length; i++) {
                                        tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                    }
                                    scope.bindedModel = tempVal;

                                }
                            } else if (keyCode === 32) {
                                scope.bindedModel = scope.bindedModel.trim();
                            } else {
                                tempVal = '';
                                for (var i = 0; i < finalssnval.length; i++) {
                                    tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                }
                                scope.bindedModel = tempVal;
                            }
                        });
                    }, 200);
                    String.prototype.removeWord = function(searchWord) {
                        var str = this;
                        var n = str.search(searchWord);
                        while (str.search(searchWord) > -1) {
                            n = str.search(searchWord);
                            str = str.substring(0, n) + str.substring(n + searchWord.length, str.length);
                        }
                        return str;
                    }
                });

                element.on('keydown', function(evt) {
                    evt.stopPropagation();
                    evt = evt || window.event;
                    var keyCode = evt.keyCode;
                    if (keyCode == 9) {
                        return false;
                    }
                    var deleteKey = (keyCode == 46),
                        backspaceKey = (keyCode == 8);
                    var sel, deletedText, val;
                    sel = getInputSelection(this);
                    if (deleteKey || backspaceKey || sel.length) {
                        if (sel.length) {
                            //deletedText = finalssnval.slice(sel.start, sel.end);
                            //finalssnval = finalssnval.removeWord(deletedText);
                            finalssnval = truncateSelection(finalssnval, sel);
                        } else {
                            finalssnval = truncate(finalssnval, sel.start - 1);
                        }
                        scope.$parent.$parent[scope.newmodel] = finalssnval;

                    }

                });


                function truncate(input, index) {
                    var str = "";
                    var arr = input.split("");
                    for (var i = 0; i < input.length; i++) {
                        if (i != index) str += arr[i];
                    }
                    return str;
                }

                function truncateSelection(input, sel) {
                    var str = "";
                    var arr = input.split("");
                    for (var i = 0; i < input.length; i++) {
                        if (i < sel.start || i > sel.end - 1) {
                            str += arr[i];
                        }
                    }
                    return str;
                }

                function getInputSelection(input) {
                    var start = 0,
                        end = 0;
                    input.focus();
                    if (typeof input.selectionStart == "number" &&
                        typeof input.selectionEnd == "number") {

                        start = input.selectionStart;
                        end = input.selectionEnd;
                    } else if (document.selection && document.selection.createRange) {
                        var range = document.selection.createRange();
                        if (range) {
                            var inputRange = input.createTextRange();
                            var workingRange = inputRange.duplicate();
                            var bookmark = range.getBookmark();
                            inputRange.moveToBookmark(bookmark);
                            workingRange.setEndPoint("EndToEnd", inputRange);
                            end = workingRange.text.length;
                            workingRange.setEndPoint("EndToStart", inputRange);
                            start = workingRange.text.length;
                        }
                    }
                    return {
                        start: start,
                        end: end,
                        length: end - start
                    };
                }

            },
            controller: function($scope, $timeout) {

            }
        };
    }]);
    hrAdminApp.directive('convertStarsOnlyNumbers', ['$parse', function($parse) {
        return {
            require: "ngModel",
            scope: {
                bindedModel: "=ngModel",
                newmodel: "@newmodel"
            },
            link: function(scope, element, attributes, ngModel) {
                //   console.log(scope.bindedModel);
                //scope.$parent.$parent[scope.newmodel] = '';
                var tempVal = '';
                var finalssnval = '';
                var letters = /^[0-9]+$/;

                //   ngModel.$validators.atleastOneDigit = function(modelValue) {
                //     var patt = /^(?=.*[0-9])([a-zA-Z0-9]+)$/;
                //     return (finalssnval.match(patt) ? true: false);
                //   };

                if (attributes.defaultval && attributes.defaultval.trim()) {
                    finalssnval = angular.copy(attributes.defaultval);
                    scope.$parent.$parent[scope.newmodel] = finalssnval;
                    tempVal = '';
                    for (var i = 0; i < attributes.defaultval.length; i++) {
                        tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                    }
                    scope.bindedModel = tempVal;
                } else {
                    scope.bindedModel = '';
                }
                element.on('paste', function(e) {
                    e.preventDefault();
                });
                element.on('keypress', function(e) {
                    //console.log(ngModel.$modelValue);
                    var typedtext = String.fromCharCode(e.charCode); //e.key;
                    //if(!scope.bindedModel){ scope.bindedModel = '';}
                    //if(typedtext && typedtext.length == 0){finalssnval = '';}
                    setTimeout(function() {
                        scope.$apply(function() {
                            var keyCode = e.charCode;
                            var pressedkeyletter = String.fromCharCode(e.charCode);
                            if (keyCode !== 46 && keyCode !== 8 && keyCode !== 32 && keyCode !== 13 && pressedkeyletter.match(letters)) {
                                if (parseInt(attributes.maxlength) && finalssnval.length < parseInt(attributes.maxlength)) {
                                    var pressedkey = String.fromCharCode(e.charCode); //e.key; //String.fromCharCode(e.charCode);
                                    finalssnval = finalssnval + pressedkey;
                                    scope.$parent.$parent[scope.newmodel] = finalssnval;
                                    tempVal = '';
                                    for (var i = 0; i < finalssnval.length; i++) {
                                        tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                    }
                                    scope.bindedModel = tempVal;

                                }
                            } else if (keyCode === 32) {
                                scope.bindedModel = scope.bindedModel.trim();
                            } else {
                                tempVal = '';
                                for (var i = 0; i < finalssnval.length; i++) {
                                    tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                }
                                scope.bindedModel = tempVal;
                            }
                        });
                    }, 200);
                    String.prototype.removeWord = function(searchWord) {
                        var str = this;
                        var n = str.search(searchWord);
                        while (str.search(searchWord) > -1) {
                            n = str.search(searchWord);
                            str = str.substring(0, n) + str.substring(n + searchWord.length, str.length);
                        }
                        return str;
                    }
                });

                element.on('keydown', function(evt) {
                    evt.stopPropagation();
                    evt = evt || window.event;
                    var keyCode = evt.keyCode;
                    if (keyCode == 9) {
                        return false;
                    }
                    var deleteKey = (keyCode == 46),
                        backspaceKey = (keyCode == 8);
                    var sel, deletedText, val;
                    sel = getInputSelection(this);
                    if (deleteKey || backspaceKey || sel.length) {
                        if (sel.length) {
                            //deletedText = finalssnval.slice(sel.start, sel.end);
                            //finalssnval = finalssnval.removeWord(deletedText);
                            finalssnval = truncateSelection(finalssnval, sel);
                        } else {
                            finalssnval = truncate(finalssnval, sel.start - 1);
                        }
                        scope.$parent.$parent[scope.newmodel] = finalssnval;

                    }

                });


                function truncate(input, index) {
                    var str = "";
                    var arr = input.split("");
                    for (var i = 0; i < input.length; i++) {
                        if (i != index) str += arr[i];
                    }
                    return str;
                }

                function truncateSelection(input, sel) {
                    var str = "";
                    var arr = input.split("");
                    for (var i = 0; i < input.length; i++) {
                        if (i < sel.start || i > sel.end - 1) {
                            str += arr[i];
                        }
                    }
                    return str;
                }

                function getInputSelection(input) {
                    var start = 0,
                        end = 0;
                    input.focus();
                    if (typeof input.selectionStart == "number" &&
                        typeof input.selectionEnd == "number") {

                        start = input.selectionStart;
                        end = input.selectionEnd;
                    } else if (document.selection && document.selection.createRange) {
                        var range = document.selection.createRange();
                        if (range) {
                            var inputRange = input.createTextRange();
                            var workingRange = inputRange.duplicate();
                            var bookmark = range.getBookmark();
                            inputRange.moveToBookmark(bookmark);
                            workingRange.setEndPoint("EndToEnd", inputRange);
                            end = workingRange.text.length;
                            workingRange.setEndPoint("EndToStart", inputRange);
                            start = workingRange.text.length;
                        }
                    }
                    return {
                        start: start,
                        end: end,
                        length: end - start
                    };
                }

            },
            controller: function($scope, $timeout) {

            }
        };
    }]);
    hrAdminApp.directive('convertStarsCompareOnlyNumbers', ['$parse', function($parse) {
        return {
            require: "ngModel",
            scope: {
                bindedModel: "=ngModel",
                otherModelValue: "=convertStarsCompareOnlyNumbers",
                newmodel: "@newmodel"
            },
            link: function(scope, element, attributes, ngModel) {
                //   console.log(scope.bindedModel);
                //scope.$parent.$parent[scope.newmodel] = '';
                var tempVal = '';
                var finalssnval = '';
                //   var letters = /^(?=.*[0-9])([0-9a-zA-Z]+)$/;
                //var letters = /^([a-zA-Z+]+[0-9+]+[&@!#+]+)$/;
                var letters = /^[0-9]+$/;
                ngModel.$validators.convertStarsCompare = function(modelValue) {
                    return finalssnval == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });

                if (attributes.defaultval && attributes.defaultval.trim()) {
                    finalssnval = angular.copy(attributes.defaultval);
                    scope.$parent.$parent[scope.newmodel] = finalssnval;
                    tempVal = '';
                    for (var i = 0; i < attributes.defaultval.length; i++) {
                        tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                    }
                    scope.bindedModel = tempVal;
                } else {
                    scope.bindedModel = '';
                }
                element.on('paste', function(e) {
                    e.preventDefault();
                });
                element.on('keypress', function(e) {
                    //console.log(ngModel.$modelValue);
                    var typedtext = String.fromCharCode(e.charCode); //e.key;
                    //if(!scope.bindedModel){ scope.bindedModel = '';}
                    //if(typedtext && typedtext.length == 0){finalssnval = '';}
                    setTimeout(function() {
                        scope.$apply(function() {
                            var keyCode = e.charCode;
                            var pressedkeyletter = String.fromCharCode(e.charCode);
                            if (keyCode !== 46 && keyCode !== 8 && keyCode !== 32 && keyCode !== 13 && pressedkeyletter.match(letters)) {
                                if (parseInt(attributes.maxlength) && finalssnval.length < parseInt(attributes.maxlength)) {
                                    var pressedkey = String.fromCharCode(e.charCode); //e.key; //String.fromCharCode(e.charCode);
                                    finalssnval = finalssnval + pressedkey;
                                    scope.$parent.$parent[scope.newmodel] = finalssnval;
                                    tempVal = '';
                                    for (var i = 0; i < finalssnval.length; i++) {
                                        tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                    }
                                    scope.bindedModel = tempVal;

                                }
                            } else if (keyCode === 32) {
                                scope.bindedModel = scope.bindedModel.trim();
                            } else {
                                tempVal = '';
                                for (var i = 0; i < finalssnval.length; i++) {
                                    tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                }
                                scope.bindedModel = tempVal;
                            }
                        });
                    }, 200);
                    String.prototype.removeWord = function(searchWord) {
                        var str = this;
                        var n = str.search(searchWord);
                        while (str.search(searchWord) > -1) {
                            n = str.search(searchWord);
                            str = str.substring(0, n) + str.substring(n + searchWord.length, str.length);
                        }
                        return str;
                    }
                });

                element.on('keydown', function(evt) {
                    evt.stopPropagation();
                    evt = evt || window.event;
                    var keyCode = evt.keyCode;
                    if (keyCode == 9) {
                        return false;
                    }
                    var deleteKey = (keyCode == 46),
                        backspaceKey = (keyCode == 8);
                    var sel, deletedText, val;
                    sel = getInputSelection(this);
                    if (deleteKey || backspaceKey || sel.length) {
                        if (sel.length) {
                            //deletedText = finalssnval.slice(sel.start, sel.end);
                            //finalssnval = finalssnval.removeWord(deletedText);
                            finalssnval = truncateSelection(finalssnval, sel);
                        } else {
                            finalssnval = truncate(finalssnval, sel.start - 1);
                        }
                        scope.$parent.$parent[scope.newmodel] = finalssnval;

                    }

                });


                function truncate(input, index) {
                    var str = "";
                    var arr = input.split("");
                    for (var i = 0; i < input.length; i++) {
                        if (i != index) str += arr[i];
                    }
                    return str;
                }

                function truncateSelection(input, sel) {
                    var str = "";
                    var arr = input.split("");
                    for (var i = 0; i < input.length; i++) {
                        if (i < sel.start || i > sel.end - 1) {
                            str += arr[i];
                        }
                    }
                    return str;
                }

                function getInputSelection(input) {
                    var start = 0,
                        end = 0;
                    input.focus();
                    if (typeof input.selectionStart == "number" &&
                        typeof input.selectionEnd == "number") {

                        start = input.selectionStart;
                        end = input.selectionEnd;
                    } else if (document.selection && document.selection.createRange) {
                        var range = document.selection.createRange();
                        if (range) {
                            var inputRange = input.createTextRange();
                            var workingRange = inputRange.duplicate();
                            var bookmark = range.getBookmark();
                            inputRange.moveToBookmark(bookmark);
                            workingRange.setEndPoint("EndToEnd", inputRange);
                            end = workingRange.text.length;
                            workingRange.setEndPoint("EndToStart", inputRange);
                            start = workingRange.text.length;
                        }
                    }
                    return {
                        start: start,
                        end: end,
                        length: end - start
                    };
                }

            },
            controller: function($scope, $timeout) {

            }
        };
    }]);
    hrAdminApp.directive('convertStarsCompare', ['$parse', function($parse) {
        return {
            require: "ngModel",
            scope: {
                bindedModel: "=ngModel",
                otherModelValue: "=convertStarsCompare",
                newmodel: "@newmodel"
            },
            link: function(scope, element, attributes, ngModel) {
                //   console.log(scope.bindedModel);
                //scope.$parent.$parent[scope.newmodel] = '';
                var tempVal = '';
                var finalssnval = '';
                //   var letters = /^(?=.*[0-9])([0-9a-zA-Z]+)$/;
                //var letters = /^([a-zA-Z+]+[0-9+]+[&@!#+]+)$/;
                var letters = /^[0-9a-zA-Z]+$/;
                ngModel.$validators.convertStarsCompare = function(modelValue) {
                    return finalssnval == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });

                if (attributes.defaultval && attributes.defaultval.trim()) {
                    finalssnval = angular.copy(attributes.defaultval);
                    scope.$parent.$parent[scope.newmodel] = finalssnval;
                    tempVal = '';
                    for (var i = 0; i < attributes.defaultval.length; i++) {
                        tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                    }
                    scope.bindedModel = tempVal;
                } else {
                    scope.bindedModel = '';
                }
                element.on('paste', function(e) {
                    e.preventDefault();
                });
                element.on('keypress', function(e) {
                    //console.log(ngModel.$modelValue);
                    var typedtext = String.fromCharCode(e.charCode); //e.key;
                    //if(!scope.bindedModel){ scope.bindedModel = '';}
                    //if(typedtext && typedtext.length == 0){finalssnval = '';}
                    setTimeout(function() {
                        scope.$apply(function() {
                            var keyCode = e.charCode;
                            var pressedkeyletter = String.fromCharCode(e.charCode);
                            if (keyCode !== 46 && keyCode !== 8 && keyCode !== 32 && keyCode !== 13 && pressedkeyletter.match(letters)) {
                                if (parseInt(attributes.maxlength) && finalssnval.length < parseInt(attributes.maxlength)) {
                                    var pressedkey = String.fromCharCode(e.charCode); //e.key; //String.fromCharCode(e.charCode);
                                    finalssnval = finalssnval + pressedkey;
                                    scope.$parent.$parent[scope.newmodel] = finalssnval;
                                    tempVal = '';
                                    for (var i = 0; i < finalssnval.length; i++) {
                                        tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                    }
                                    scope.bindedModel = tempVal;

                                }
                            } else if (keyCode === 32) {
                                scope.bindedModel = scope.bindedModel.trim();
                            } else {
                                tempVal = '';
                                for (var i = 0; i < finalssnval.length; i++) {
                                    tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                }
                                scope.bindedModel = tempVal;
                            }
                        });
                    }, 200);
                    String.prototype.removeWord = function(searchWord) {
                        var str = this;
                        var n = str.search(searchWord);
                        while (str.search(searchWord) > -1) {
                            n = str.search(searchWord);
                            str = str.substring(0, n) + str.substring(n + searchWord.length, str.length);
                        }
                        return str;
                    }
                });

                element.on('keydown', function(evt) {
                    evt.stopPropagation();
                    evt = evt || window.event;
                    var keyCode = evt.keyCode;
                    if (keyCode == 9) {
                        return false;
                    }
                    var deleteKey = (keyCode == 46),
                        backspaceKey = (keyCode == 8);
                    var sel, deletedText, val;
                    sel = getInputSelection(this);
                    if (deleteKey || backspaceKey || sel.length) {
                        if (sel.length) {
                            //deletedText = finalssnval.slice(sel.start, sel.end);
                            //finalssnval = finalssnval.removeWord(deletedText);
                            finalssnval = truncateSelection(finalssnval, sel);
                        } else {
                            finalssnval = truncate(finalssnval, sel.start - 1);
                        }
                        scope.$parent.$parent[scope.newmodel] = finalssnval;

                    }

                });


                function truncate(input, index) {
                    var str = "";
                    var arr = input.split("");
                    for (var i = 0; i < input.length; i++) {
                        if (i != index) str += arr[i];
                    }
                    return str;
                }

                function truncateSelection(input, sel) {
                    var str = "";
                    var arr = input.split("");
                    for (var i = 0; i < input.length; i++) {
                        if (i < sel.start || i > sel.end - 1) {
                            str += arr[i];
                        }
                    }
                    return str;
                }

                function getInputSelection(input) {
                    var start = 0,
                        end = 0;
                    input.focus();
                    if (typeof input.selectionStart == "number" &&
                        typeof input.selectionEnd == "number") {

                        start = input.selectionStart;
                        end = input.selectionEnd;
                    } else if (document.selection && document.selection.createRange) {
                        var range = document.selection.createRange();
                        if (range) {
                            var inputRange = input.createTextRange();
                            var workingRange = inputRange.duplicate();
                            var bookmark = range.getBookmark();
                            inputRange.moveToBookmark(bookmark);
                            workingRange.setEndPoint("EndToEnd", inputRange);
                            end = workingRange.text.length;
                            workingRange.setEndPoint("EndToStart", inputRange);
                            start = workingRange.text.length;
                        }
                    }
                    return {
                        start: start,
                        end: end,
                        length: end - start
                    };
                }

            },
            controller: function($scope, $timeout) {

            }
        };
    }]);
    var othermodelnum = 1;
    hrAdminApp.directive('convertStarsDynamic', ['$parse','$filter', function($parse, $filter) {
        return {
            require: "ngModel",
            scope: {
                bindedModel: "=ngModel",
                newmodel: "=newmodel",
                isEnable: "@convertStarsDynamic",
                patternmodel: "@patternmodel",
                currentfield:"=",
                allfields:"="
            },
            link: function(scope, element, attributes, ngModel) {
                //   console.log(scope.bindedModel);
                //scope.$parent.$parent[scope.newmodel] = '';
                //{{getFieldSettingPar('Mask Data',field).value}}
                scope.isEnable = (scope.isEnable == 'true' ? true : false);
                var pattern = '';
                switch(scope.patternmodel) {
                    case 'alphanumeric':
                      pattern = /^[0-9a-zA-Z]+$/;
                      break;
                    case 'numeric':
                     pattern = /^[0-9]+$/;
                      break;
                    case 'numericwithdecimal':
                     pattern = /^\d+$|^\d+\.\d{0,2}$/;
                      break;
                    case 'text':
                     pattern = /^[a-zA-Z`~!@#$%^&*()_+-=[\]\;',.\/{}|:"<>?\s]+$/;
                      break;
                    default:
                     pattern = '';
                  }
                if(!scope.isEnable && pattern){
                    ngModel.$validators.invalidPattern = function (modelValue, viewValue) {
                        if (ngModel.$isEmpty(modelValue)) // if empty, correct value
                        {
                            return true;
                        }
                        return modelValue.match(pattern);
                    };
                }
                if (!scope.isEnable) {
                    return false;
                }
                console.log(scope.currentfield);
                console.log(scope.allfields);
                var tempVal = '';
                var finalssnval = '';

                var letters = pattern ? pattern : /^[a-zA-Z`~!@#$%^&*()_+-=[\]\;',.\/{}|:"<>?\s]+$/ ;
                // if(!scope.currentfield){
                //     return
                // }
                var dep_ary = $filter('filter')(scope.currentfield.Settings, { 'Type': 'dependencyMask' });
                if(dep_ary && dep_ary.length && dep_ary[0].isDependent && dep_ary[0].isDependent.value){
                    // var dep_other_ary = $filter('filter')(dep_ary[0].dependencyObjs, { 'type': 'otherfield' });
                    // if(dep_other_ary && dep_other_ary.length){
                    //     //console.log(dep_other_ary[0].Possiblevalue[0].value)
                    //     var allCtrlsAry = $filter('filter')(scope.allfields, { 'name':dep_other_ary[0].Possiblevalue[0].value });
                    //     console.log(allCtrlsAry);
                    //     if(allCtrlsAry && allCtrlsAry.length){
                    //         othermodelnum = othermodelnum + 1;
                    //         scope['othermodelval'+othermodelnum] = allCtrlsAry[0].changedValue;
                            ngModel.$validators.convertStarsDynamic = function(modelValue) {
                                scope.allfields = scope.allfields ? scope.allfields : '';
                                return finalssnval == scope.allfields;
                            };


                            scope.$watch(function($scope) {
                                return (scope.allfields) ? scope.allfields : '' ;
                            }, function (newVal) {
                                ngModel.$validate();
                            }, true);
                            // scope.$watch("scope.allfields", function() {
                            //     ngModel.$validate();
                            // }, true);
                        //}
                    //}
                    
                }
                // scope.currentfield.Settings 
                // ngModel.$validators.convertStarsDynamic = function(modelValue) {
                //     return finalssnval == scope.otherModelValue;
                // };

                // scope.$watch("otherModelValue", function() {
                //     ngModel.$validate();
                // });


                if (scope.newmodel && scope.newmodel.trim()) {
                    finalssnval = angular.copy(scope.newmodel);
                    // scope.$parent.$parent[scope.newmodel] = finalssnval;
                    scope.newmodel = finalssnval;
                    tempVal = '';
                    for (var i = 0; i < scope.newmodel.length; i++) {
                        tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                    }
                    scope.bindedModel = tempVal;
                } else {
                    scope.bindedModel = '';
                }
                element.on('paste', function(e) {
                    e.preventDefault();
                });
                element.on('keypress', function(e) {
                    //console.log(ngModel.$modelValue);
                    var typedtext = String.fromCharCode(e.charCode); //e.key;
                    //if(!scope.bindedModel){ scope.bindedModel = '';}
                    //if(typedtext && typedtext.length == 0){finalssnval = '';}
                    setTimeout(function() {
                        scope.$apply(function() {
                            var keyCode = e.charCode;
                            var pressedkeyletter = String.fromCharCode(e.charCode);
                            var numericwithdecimalTemp = '';
                            var matched = false;
                            if(scope.patternmodel == 'numericwithdecimal' || scope.patternmodel == 'numeric'){
                                numericwithdecimalTemp = numericwithdecimalTemp+finalssnval+pressedkeyletter;
                                matched = numericwithdecimalTemp.match(letters);
                            } else {
                                matched = pressedkeyletter.match(letters) && keyCode !== 46;
                            }
                            if (keyCode !== 8 && keyCode !== 32 && keyCode !== 13 && matched) {
                                if(scope.patternmodel == 'numericwithdecimal' || scope.patternmodel == 'numeric'){
                                    var pressedkey = String.fromCharCode(e.charCode);
                                    if (parseInt(attributes.maxlength) && parseInt(finalssnval + pressedkey) <= parseInt(attributes.maxlength)) {
                                        // var pressedkey = String.fromCharCode(e.charCode); //e.key; //String.fromCharCode(e.charCode);
                                        finalssnval = finalssnval + pressedkey;
                                        // scope.$parent.$parent[scope.newmodel] = finalssnval;
                                        scope.newmodel = finalssnval;
                                        tempVal = '';
                                        for (var i = 0; i < finalssnval.length; i++) {
                                            tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                        }
                                        scope.bindedModel = tempVal;
    
                                    } else {
                                        
                                        tempVal = '';
                                        for (var i = 0; i < finalssnval.length; i++) {
                                            tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                        }
                                        scope.bindedModel = tempVal;
                                    }
                                } else {
                                    if (parseInt(attributes.maxlength) && finalssnval.length < parseInt(attributes.maxlength)) {
                                        var pressedkey = String.fromCharCode(e.charCode); //e.key; //String.fromCharCode(e.charCode);
                                        finalssnval = finalssnval + pressedkey;
                                        // scope.$parent.$parent[scope.newmodel] = finalssnval;
                                        scope.newmodel = finalssnval;
                                        tempVal = '';
                                        for (var i = 0; i < finalssnval.length; i++) {
                                            tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                        }
                                        scope.bindedModel = tempVal;
    
                                    } else {
                                        
                                        tempVal = '';
                                        for (var i = 0; i < finalssnval.length; i++) {
                                            tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                        }
                                        scope.bindedModel = tempVal;
                                    }
                                }
                                // if (parseInt(attributes.maxlength) && finalssnval.length < parseInt(attributes.maxlength)) {
                                //     var pressedkey = String.fromCharCode(e.charCode); //e.key; //String.fromCharCode(e.charCode);
                                //     finalssnval = finalssnval + pressedkey;
                                //     // scope.$parent.$parent[scope.newmodel] = finalssnval;
                                //     scope.newmodel = finalssnval;
                                //     tempVal = '';
                                //     for (var i = 0; i < finalssnval.length; i++) {
                                //         tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                //     }
                                //     scope.bindedModel = tempVal;

                                // }
                            } else if (keyCode === 32) {
                                scope.bindedModel = scope.bindedModel.trim();
                            } else {
                                if (parseInt(attributes.maxlength) && finalssnval.length < parseInt(attributes.maxlength)) {
                                    // var pressedkey = String.fromCharCode(e.charCode); //e.key; //String.fromCharCode(e.charCode);
                                    // finalssnval = finalssnval + pressedkey;
                                    // // scope.$parent.$parent[scope.newmodel] = finalssnval;
                                    // scope.newmodel = finalssnval;
                                    tempVal = '';
                                    for (var i = 0; i < finalssnval.length; i++) {
                                        tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                    }
                                    scope.bindedModel = tempVal;

                                }
                                // tempVal = '';
                                // for (var i = 0; i < finalssnval.length; i++) {
                                //     tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                                // }
                                // scope.bindedModel = tempVal;
                            }
                        });
                    }, 200);
                    String.prototype.removeWord = function(searchWord) {
                        var str = this;
                        var n = str.search(searchWord);
                        while (str.search(searchWord) > -1) {
                            n = str.search(searchWord);
                            str = str.substring(0, n) + str.substring(n + searchWord.length, str.length);
                        }
                        return str;
                    }
                });

                element.on('keydown', function(evt) {
                    evt.stopPropagation();
                    evt = evt || window.event;
                    var keyCode = evt.keyCode;
                    if (keyCode == 9) {
                        return false;
                    }
                    var deleteKey = (keyCode == 46),
                        backspaceKey = (keyCode == 8);
                    var sel, deletedText, val;
                    sel = getInputSelection(this);
                    if (deleteKey || backspaceKey || sel.length) {
                        if (sel.length) {
                            //deletedText = finalssnval.slice(sel.start, sel.end);
                            //finalssnval = finalssnval.removeWord(deletedText);
                            finalssnval = truncateSelection(finalssnval, sel);
                        } else {
                            finalssnval = truncate(finalssnval, sel.start - 1);
                        }
                        //scope.$parent.$parent[scope.newmodel] = finalssnval;
                        scope.newmodel = finalssnval;
                        var tempVal = '';
                        for (var i = 0; i < scope.newmodel.length; i++) {
                            tempVal += '*'; //OR ANY OTHER CHARACTER OF YOUR CHOICE
                        }
                        scope.bindedModel = tempVal;
                        scope.$parent.$parent[scope.newmodel] = finalssnval;

                    }

                });

                function getFieldMaskSetting(settingname, obj) {
                    var result = {};
                    var settings = obj.Settings;
                    $.each(settings, function (index, set) {
                        if (set.name == settingname) {
                            result = set;
                            return;
                        }
                    });
                    if (!Object.keys(result).length) {
                        //Continue to search settings in the checkbox zone General Validations

                        var ary = $filter('filter')(settings, { 'name': 'General Validations' }, true);
                        if (ary && ary.length) {
                            $.each(ary[0].Options, function (index, set) {
                                if (set.name == settingname) {
                                    result = set;
                                    return;
                                }
                            });
                        }
                    }
                    return result;

                }


                function getFieldSettingPar(settingname) {
                    var result = {};
                    var settings = $scope.current_field_setting.Settings;
                    $.each(settings, function (index, set) {
                        if (set.name == settingname) {
                            result = set;
                            return;
                        }
                    });
                    if (!Object.keys(result).length) {
                        //Continue to search settings in the checkbox zone General Validations

                        var ary = $filter('filter')(settings, { 'name': 'General Validations' }, true);
                        if (ary && ary.length) {
                            $.each(ary[0].Options, function (index, set) {
                                if (set.name == settingname) {
                                    result = set;
                                    return;
                                }
                            });
                        }
                    }
                    return result;

                }

                function truncate(input, index) {
                    var str = "";
                    var arr = input.split("");
                    for (var i = 0; i < input.length; i++) {
                        if (i != index) str += arr[i];
                    }
                    return str;
                }

                function truncateSelection(input, sel) {
                    var str = "";
                    var arr = input.split("");
                    for (var i = 0; i < input.length; i++) {
                        if (i < sel.start || i > sel.end - 1) {
                            str += arr[i];
                        }
                    }
                    return str;
                }

                function getInputSelection(input) {
                    var start = 0,
                        end = 0;
                    input.focus();
                    if (typeof input.selectionStart == "number" &&
                        typeof input.selectionEnd == "number") {

                        start = input.selectionStart;
                        end = input.selectionEnd;
                    } else if (document.selection && document.selection.createRange) {
                        var range = document.selection.createRange();
                        if (range) {
                            var inputRange = input.createTextRange();
                            var workingRange = inputRange.duplicate();
                            var bookmark = range.getBookmark();
                            inputRange.moveToBookmark(bookmark);
                            workingRange.setEndPoint("EndToEnd", inputRange);
                            end = workingRange.text.length;
                            workingRange.setEndPoint("EndToStart", inputRange);
                            start = workingRange.text.length;
                        }
                    }
                    return {
                        start: start,
                        end: end,
                        length: end - start
                    };
                }

            },
            controller: function($scope, $timeout) {

            }
        };
    }]);
    hrAdminApp.directive('dynamicValidation', ['$parse', function($parse) {
        return {
            require: "ngModel",
            scope: {
                bindedModel: "=ngModel",
                newmodel: "@newmodel",
                isEnable: "@convertStarsDynamic",
                patternmodel: "@patternmodel"
            },
            link: function(scope, element, attributes, ngModel) {
                //   console.log(scope.bindedModel);
                //scope.$parent.$parent[scope.newmodel] = '';
                //{{getFieldSettingPar('Mask Data',field).value}}
                scope.isEnable = (scope.isEnable == 'true' ? true : false);
                if (scope.isEnable) {
                    return false;
                }
                var tempVal = '';
                var finalssnval = '';

                var letters = (scope.patternmodel == 'alphanumeric' ? (/^[0-9a-zA-Z]+$/) : (/^[0-9]+$/));

                ngModel.$validators.invalidPattern = function (modelValue, viewValue) {
                    if (ngModel.$isEmpty(modelValue)) // if empty, correct value
                    {
                        return true;
                    }
                    var patt = /^[0-9a-zA-Z]+$/;
                    return modelValue.match(patt);
                };

            }
        };
    }]);
    hrAdminApp.directive('dynamicDateValidation', ['$parse', function($parse) {
        return {
            require: "ngModel",
            link: function(scope, element, attributes, ngModel) {

                //scope.$parent.$parent.field.value='05/05/2019';
                // scope.$parent.$parent.$parent.$parent.formFields

                // ngModel.$validators.convertStarsDynamic = function(modelValue) {
                //     return finalssnval == scope.allfields;
                // };

                var ifType = getFieldSettingPar('Dependency Validation',scope.$parent.$parent.field).dependencyObjs[0].value;

                scope.$watch(attributes.ngModel, function (v) {
                    //console.log('value changed, new value is: ' + v);
                });

                // scope.$watchCollection(scope.$parent.$parent.$parent.$parent.formFields, function (newVal, oldVal) {
                //     console.log(newVal);
                //  });

                scope.$watch(function(scope) {
                    return (scope.$parent.$parent.$parent.$parent.formFields)
                     ? (scope.$parent.$parent.$parent.$parent.formFields)
                      : '' ;
                    //return function(){
                        //var maxdate = null;
                        // return scope.$parent.$parent.field.maxdate = '06/06/2019';
                        //return scope.$parent.$parent.field.maxdate = getDateValue(getFieldSettingPar('Dependency Validation',scope.$parent.$parent.field).dependencyObjs[1].value, -1);
                        
                    //};
                }, function (newVal) {
                    var otherfieldVall = getFieldSettingPar('Dependency Validation',scope.$parent.$parent.field).dependencyObjs[1].value;
                    if(otherfieldVall == 'above15years' ||  otherfieldVall == 'above18years'){ 
                        // var ddd = new Date();                       
                        // scope.$parent.$parent.field.mindate = null;
                        // scope.$parent.$parent.field.maxdate = scope.$parent.$parent.field.maxdate ? scope.$parent.$parent.field.maxdate : getDateValue(otherfieldVall, 0);
                        
                        switch(ifType){
                            case '<':
                                scope.$parent.$parent.field.mindate = scope.$parent.$parent.field.mindate ? scope.$parent.$parent.field.mindate : getDateValue(otherfieldVall, +1);
                                scope.$parent.$parent.field.maxdate = scope.$parent.$parent.field.maxdate ? scope.$parent.$parent.field.maxdate : getDateValue('currentdate', 0);
                                break; 
                            case '<=':
                            scope.$parent.$parent.field.mindate = scope.$parent.$parent.field.mindate ? scope.$parent.$parent.field.mindate : getDateValue(otherfieldVall, 0);
                            scope.$parent.$parent.field.maxdate = scope.$parent.$parent.field.maxdate ? scope.$parent.$parent.field.maxdate : getDateValue('currentdate', 0);
                                break; 
                            case '>':
                            scope.$parent.$parent.field.mindate = null;
                            scope.$parent.$parent.field.maxdate = scope.$parent.$parent.field.maxdate ? scope.$parent.$parent.field.maxdate : getDateValue(otherfieldVall, -1);
                                break; 
                            case '>=':
                            scope.$parent.$parent.field.mindate = null;
                            scope.$parent.$parent.field.maxdate = scope.$parent.$parent.field.maxdate ? scope.$parent.$parent.field.maxdate : getDateValue(otherfieldVall, 0);
                                break; 
                            case '==':
                                scope.$parent.$parent.field.maxdate = scope.$parent.$parent.field.maxdate ? scope.$parent.$parent.field.maxdate : getDateValue(otherfieldVall, 0);
                                scope.$parent.$parent.field.mindate = scope.$parent.$parent.field.mindate ? scope.$parent.$parent.field.mindate : getDateValue(otherfieldVall, 0);
                                break;    
                        }
                    } 
                    else if(otherfieldVall == 'currentdate'){
                        switch(ifType){
                            case '<':
                                scope.$parent.$parent.field.mindate = null;
                                scope.$parent.$parent.field.maxdate = scope.$parent.$parent.field.maxdate ? scope.$parent.$parent.field.maxdate : getDateValue(otherfieldVall, -1);
                                break; 
                            case '<=':
                                scope.$parent.$parent.field.mindate = null;
                                scope.$parent.$parent.field.maxdate = scope.$parent.$parent.field.maxdate ? scope.$parent.$parent.field.maxdate : getDateValue(otherfieldVall, 0);
                                break; 
                            case '>':
                                scope.$parent.$parent.field.maxdate = null;
                                scope.$parent.$parent.field.mindate = scope.$parent.$parent.field.mindate ? scope.$parent.$parent.field.mindate : getDateValue(otherfieldVall, +1);
                                break; 
                            case '>=':
                                scope.$parent.$parent.field.maxdate = null;
                                scope.$parent.$parent.field.mindate = scope.$parent.$parent.field.mindate ? scope.$parent.$parent.field.mindate : getDateValue(otherfieldVall, 0);
                                break; 
                            case '==':
                                scope.$parent.$parent.field.maxdate = scope.$parent.$parent.field.maxdate ? scope.$parent.$parent.field.maxdate : getDateValue(otherfieldVall, 0);
                                scope.$parent.$parent.field.mindate = scope.$parent.$parent.field.mindate ? scope.$parent.$parent.field.mindate : getDateValue(otherfieldVall, 0);
                                break;    
                        }
                    } 
                    else {
                        switch(ifType){
                            case '<':
                                scope.$parent.$parent.field.mindate = null;
                                scope.$parent.$parent.field.maxdate = getDateValue(otherfieldVall, -1);
                                break; 
                            case '<=':
                                scope.$parent.$parent.field.mindate = null;
                                scope.$parent.$parent.field.maxdate = getDateValue(otherfieldVall, 0);
                                break; 
                            case '>':
                                scope.$parent.$parent.field.maxdate = null;
                                scope.$parent.$parent.field.mindate = getDateValue(otherfieldVall, +1);
                                break; 
                            case '>=':
                                scope.$parent.$parent.field.maxdate = null;
                                scope.$parent.$parent.field.mindate = getDateValue(otherfieldVall, 0);
                                break; 
                            case '==':
                                scope.$parent.$parent.field.maxdate = getDateValue(otherfieldVall, 0);
                                scope.$parent.$parent.field.mindate = getDateValue(otherfieldVall, 0);
                                break; 
    
                        }
                    }
                    
                    //'06/06/2019';
                    //ngModel.$validate();
                }, true);

                
                function getDateValue(currentobj, offsetdays) {
                    // if(currentobj !== 'currentdate'){
                    //     dateobj = null;
                    // }
                    var dateobj = null;
                    if (currentobj == 'currentdate' || currentobj == 'Current Date') {
                        dateobj = new Date();
                    }
                    else if(currentobj == 'above18years'){
                        dateobj = new Date();
                        dateobj.setFullYear((dateobj.getFullYear()) - 18)
                    }
                    else if(currentobj == 'above15years'){
                        dateobj = new Date();
                        dateobj.setFullYear((dateobj.getFullYear()) - 15);
                    }
                    else {
                        var formfields = scope.$parent.$parent.$parent.$parent.formFields;
                        for (var i = 0; i < formfields.length; i++) {
                            if (formfields[i].name == currentobj && formfields[i].value)
                                dateobj = formfields[i].value;
                            dateobj = new Date(dateobj);
                        }
                    }
                    if (offsetdays != 0 && dateobj) {
                        dateobj.setDate(dateobj.getDate() + offsetdays);
                    }
                    return dateobj;
                }

                function getFieldSettingPar(settingname) {
                    var result = {};
                    if(scope.$parent.$parent.field){
                        var settings = scope.$parent.$parent.field.Settings;
                        $.each(settings, function (index, set) {
                            if (set.name == settingname) {
                                result = set;
                                return;
                            }
                        });
                        if (!Object.keys(result).length) {
                            //Continue to search settings in the checkbox zone General Validations
    
                            var ary = $filter('filter')(settings, { 'name': 'General Validations' }, true);
                            if (ary && ary.length) {
                                $.each(ary[0].Options, function (index, set) {
                                    if (set.name == settingname) {
                                        result = set;
                                        return;
                                    }
                                });
                            }
                        }
                    }
                    return result;

                }

                //   console.log(scope.bindedModel);
                //scope.$parent.$parent[scope.newmodel] = '';
                //{{getFieldSettingPar('Mask Data',field).value}}
                // scope.isEnable = (scope.isEnable == 'true' ? true : false);
                // if (scope.isEnable) {
                //     return false;
                // }
                // var tempVal = '';
                // var finalssnval = '';

                // var letters = (scope.patternmodel == 'alphanumeric' ? (/^[0-9a-zA-Z]+$/) : (/^[0-9]+$/));

                // ngModel.$validators.invalidPattern = function (modelValue, viewValue) {
                //     if (ngModel.$isEmpty(modelValue)) // if empty, correct value
                //     {
                //         return true;
                //     }
                //     var patt = /^[0-9a-zA-Z]+$/;
                //     return modelValue.match(patt);
                // };

            }
        };
    }]);

}());