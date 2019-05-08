var accent_fold = (function() {
    var accent_map = {
        'à': 'a',
        'á': 'a',
        'â': 'a',
        'ã': 'a',
        'ä': 'a',
        'å': 'a', // a
        'ç': 'c', // c
        'è': 'e',
        'é': 'e',
        'ê': 'e',
        'ë': 'e', // e
        'ì': 'i',
        'í': 'i',
        'î': 'i',
        'ï': 'i', // i
        'ñ': 'n', // n
        'ò': 'o',
        'ó': 'o',
        'ô': 'o',
        'õ': 'o',
        'ö': 'o',
        'ø': 'o', // o
        'ß': 's', // s
        'ù': 'u',
        'ú': 'u',
        'û': 'u',
        'ü': 'u', // u
        'ÿ': 'y' // y
    };

    return function accent_fold(s) {
        if (!s) { return ''; }
        var ret = '';
        for (var i = 0; i < s.length; i++) {
            ret += accent_map[s.charAt(i)] || s.charAt(i);
        }
        return ret;
    };
}());
(function() {
    'use strict';

    /**
     * A directive for adding google places autocomplete to a text box
     * google places autocomplete info: https://developers.google.com/maps/documentation/javascript/places
     *
     * Usage:
     *
     * + ng-model - autocomplete textbox value
     *
     * + details - more detailed autocomplete result, includes address parts, latlng, etc. (Optional)
     *
     * + options - configuration for the autocomplete (Optional)
     *
     *       + types: type,        String, values can be 'geocode', 'establishment', '(regions)', or '(cities)'
     *       + bounds: bounds,     Google maps LatLngBounds Object, biases results to bounds, but may return results outside these bounds
     *       + country: country    String, ISO 3166-1 Alpha-2 compatible country code. examples; 'ca', 'us', 'gb'
     *       + watchEnter:         Boolean, true; on Enter select top autocomplete result. false(default); enter ends autocomplete
     *
     * example:
     *
     *    options = {
     *        types: '(cities)',
     *        country: 'ca'
     *    }
     **/

    // angular.module("OnBoarding").directive('ngAutocomplete', ['$timeout', function($timeout) {
    //     return {
    //         require: 'ngModel',
    //         replace: true,
    //         scope: {
    //             ngModel: '=',
    //             options: '=?',
    //             details: '=?',
    //             othermodels: '&'
    //         },

    //         link: function(scope, element, attrs, controller) {

    //             //options for autocomplete
    //             element.on('keypress', function(e) {
    //                 // prevent form submission on pressing Enter as there could be more inputs to fill out
    //                 if (e.which == 13) {
    //                     e.preventDefault();
    //                 }
    //             });
    //             var opts
    //             var watchEnter = false
    //                 //convert options provided to opts
    //             var initOpts = function() {

    //                 opts = {}
    //                 if (scope.options) {

    //                     element.removeAttr('placeholder');
    //                     if ((navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf("rv") != -1)) {
    //                         element[0].placeholder = '';
    //                     }

    //                     if (scope.options.watchEnter !== true) {
    //                         watchEnter = false
    //                     } else {
    //                         watchEnter = true
    //                     }

    //                     if (scope.options.types) {
    //                         opts.types = []
    //                         opts.types.push(scope.options.types)
    //                         scope.gPlace.setTypes(opts.types)
    //                     } else {
    //                         scope.gPlace.setTypes([])
    //                     }

    //                     if (scope.options.bounds) {
    //                         opts.bounds = scope.options.bounds
    //                         scope.gPlace.setBounds(opts.bounds)
    //                     } else {
    //                         scope.gPlace.setBounds(null)
    //                     }

    //                     if (scope.options.country) {
    //                         opts.componentRestrictions = {
    //                             country: scope.options.country
    //                         }
    //                         scope.gPlace.setComponentRestrictions(opts.componentRestrictions)
    //                     } else {
    //                         scope.gPlace.setComponentRestrictions(null)
    //                     }
    //                 }
    //             }

    //             if (scope.gPlace == undefined) {
    //                 scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
    //             }
    //             google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
    //                 var result = scope.gPlace.getPlace();
    //                 if (result !== undefined) {
    //                     if (result.address_components !== undefined) {
    //                         $timeout(function() {
    //                             //scope.$parent.autocomplete = '123';
    //                             var cityfield = false;
    //                             var statefield = false;
    //                             var countryfield = false;
    //                             var val = '';
    //                             console.log(result.address_components); //formatted_address  //fulladdress
    //                             if (scope.options.getType == 'fulladdress') {
    //                                 var whole_address = result.formatted_address;
    //                                 whole_address = accent_fold(whole_address);
    //                                 scope.ngModel = whole_address;
    //                                 controller.$render();
    //                             } else {
    //                                 for (var i = 0; i < result.address_components.length; i++) {
    //                                     var addressType = result.address_components[i].types[0];
    //                                     if (scope.options.getType == 'state') {
    //                                         if (!statefield && (addressType == 'administrative_area_level_1' || addressType == 'country')) {
    //                                             val = result.address_components[i]['long_name'];
    //                                             val = accent_fold(val);
    //                                             scope.ngModel = val;
    //                                             controller.$render();
    //                                             statefield = true;
    //                                             //break;
    //                                         }
    //                                         if (addressType == 'country') {
    //                                             val = result.address_components[i]['long_name'];
    //                                             val = accent_fold(val);
    //                                             scope.othermodels({ 'countryParam': val });
    //                                             controller.$render();
    //                                         }
    //                                     } else if (scope.options.getType == 'country') {
    //                                         if (addressType == 'country') {
    //                                             val = result.address_components[i]['long_name'];
    //                                             val = accent_fold(val);
    //                                             scope.ngModel = val;
    //                                             controller.$render();
    //                                         }
    //                                     } else if (scope.options.getType == 'address') {
    //                                         if (addressType == 'neighborhood' || addressType == 'premise' || addressType == 'street_number' || addressType == 'route' || addressType == 'sublocality_level_3' || addressType == 'sublocality_level_2' || addressType == 'sublocality_level_1') {
    //                                             var streetval = result.address_components[i]['long_name'];
    //                                             streetval = accent_fold(streetval);
    //                                             if (streetval) {
    //                                                 val = val ? val + ', ' + streetval : streetval;
    //                                             }
    //                                             scope.ngModel = val;
    //                                             controller.$render();
    //                                         }
    //                                         if ((addressType == 'locality' || addressType == 'political' || addressType == 'administrative_area_level_3')) {
    //                                             val = result.address_components[i]['long_name'];
    //                                             val = accent_fold(val);
    //                                             scope.othermodels({ 'cityParam': val });
    //                                             controller.$render();
    //                                             //added #659
    //                                         }
    //                                         if (addressType == 'administrative_area_level_1') {
    //                                             val = result.address_components[i]['long_name'];
    //                                             val = accent_fold(val);
    //                                             //console.log(scope.othermodels());
    //                                             scope.othermodels({ 'stateParam': val });
    //                                             controller.$render();
    //                                         }
    //                                         if (addressType == 'country') {
    //                                             val = result.address_components[i]['long_name'];
    //                                             val = accent_fold(val);
    //                                             scope.othermodels({ 'countryParam': val });
    //                                             controller.$render();
    //                                         }
    //                                         if (addressType == 'postal_code') {
    //                                             val = result.address_components[i]['long_name'];
    //                                             val = accent_fold(val);
    //                                             scope.othermodels({ 'zipParam': val });
    //                                             controller.$render();
    //                                         }
    //                                     } else {
    //                                         // added political & administrative area level 3 for #659
    //                                         if (!cityfield && (addressType == 'locality' || addressType == 'political' || addressType == 'administrative_area_level_3')) {
    //                                             val = result.address_components[i]['long_name'];
    //                                             val = accent_fold(val);
    //                                             scope.ngModel = val;
    //                                             controller.$render();
    //                                             cityfield = true;
    //                                             //added #659
    //                                         }
    //                                         if (addressType == 'administrative_area_level_1') {
    //                                             val = result.address_components[i]['long_name'];
    //                                             val = accent_fold(val);
    //                                             //console.log(scope.othermodels());
    //                                             scope.othermodels({ 'stateParam': val });
    //                                             controller.$render();
    //                                         }
    //                                         if (addressType == 'country') {
    //                                             val = result.address_components[i]['long_name'];
    //                                             val = accent_fold(val);
    //                                             scope.othermodels({ 'countryParam': val });
    //                                             controller.$render();
    //                                         }
    //                                         //break;
    //                                     }
    //                                 }
    //                             }
    //                             // console.log(result);
    //                             //       var whole_address = result.formatted_address;
    //                             //   var split_whole_address = whole_address.split(',');
    //                             //   //alert(split_whole_address);
    //                             //   var whole_address_length = split_whole_address.length;

    //                             //           //scope.$parent.autocomplete = split_whole_address[0];
    //                             //           scope.ngModel = split_whole_address[0];
    //                         }, 0);

    //                     } else {
    //                         if (watchEnter) {
    //                             getPlace(result)
    //                         }
    //                     }
    //                 }
    //             })

    //             //function to get retrieve the autocompletes first result using the AutocompleteService 
    //             var getPlace = function(result) {
    //                 var autocompleteService = new google.maps.places.AutocompleteService();
    //                 if (result.name.length > 0) {
    //                     autocompleteService.getPlacePredictions({
    //                             input: result.name,
    //                             offset: result.name.length
    //                         },
    //                         function listentoresult(list, status) {
    //                             if (list == null || list.length == 0) {

    //                                 scope.$apply(function() {
    //                                     scope.details = null;
    //                                 });

    //                             } else {
    //                                 var placesService = new google.maps.places.PlacesService(element[0]);
    //                                 placesService.getDetails({ 'reference': list[0].reference },
    //                                     function detailsresult(detailsResult, placesServiceStatus) {

    //                                         if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
    //                                             scope.$apply(function() {

    //                                                 controller.$setViewValue(detailsResult.formatted_address);
    //                                                 element.val(detailsResult.formatted_address);


    //                                                 //on focusout the value reverts, need to set it again.
    //                                                 var watchFocusOut = element.on('focusout', function(event) {
    //                                                     element.val(detailsResult.formatted_address);
    //                                                     element.unbind('focusout')
    //                                                 })

    //                                             });
    //                                         }
    //                                     }
    //                                 );
    //                             }
    //                         });
    //                 }
    //             }

    //             controller.$render = function() {
    //                 var location = controller.$viewValue;
    //                 element.val(location);
    //             };

    //             //watch options provided to directive
    //             scope.watchOptions = function() {
    //                 return scope.options
    //             };
    //             scope.$watch(scope.watchOptions, function() {
    //                 initOpts()
    //             }, true);

    //         }
    //     };
    // }]);
    angular.module("OnBoarding").directive('ngAutocomplete', ['$timeout', '$filter', function($timeout, $filter) {
        return {
            require: 'ngModel',
            replace: true,
            scope: {
                ngModel: '=',
                currentfield: '=',
                allfields: '=',
                options: '=?',
                details: '=?',
                staticmapping : '='
            },

            link: function(scope, element, attrs, controller) {

                //options for autocomplete
                element.on('keypress', function(e) {
                    // prevent form submission on pressing Enter as there could be more inputs to fill out
                    if (e.which == 13) {
                        e.preventDefault();
                    }
                });
                var opts
                var watchEnter = false
                    //convert options provided to opts
                var initOpts = function() {

                    opts = {};
                    if(scope.staticmapping && scope.staticmapping != ''){
                        scope.options = { "getType": scope.staticmapping, "watchEnter": false };
                    } else {
                        var displayAddrTypeSet = getFieldMaskSetting('Autocomplete the field with', scope.currentfield);
                        var displayAddrType = displayAddrTypeSet.value;
                        displayAddrType == (displayAddrType == 'full-address') ? 'fulladdress' : displayAddrType;
                        
                        scope.options = { "getType": displayAddrType, "watchEnter": false };
                        
                        var getCountrySet = getFieldMaskSetting('Country Type', scope.currentfield);
                        var getCountryType = getCountrySet.value;
                        if(getCountryType.toLowerCase() == 'usa'){
                            scope.options.country = 'us'
                        }
                    }
                        
                    if (scope.options) {

                        element.removeAttr('placeholder');
                        if ((navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf("rv") != -1)) {
                            element[0].placeholder = '';
                        }

                        if (scope.options.watchEnter !== true) {
                            watchEnter = false
                        } else {
                            watchEnter = true
                        }

                        if (scope.options.types) {
                            opts.types = []
                            opts.types.push(scope.options.types)
                            scope.gPlace.setTypes(opts.types)
                        } else {
                            scope.gPlace.setTypes([])
                        }

                        if (scope.options.bounds) {
                            opts.bounds = scope.options.bounds
                            scope.gPlace.setBounds(opts.bounds)
                        } else {
                            scope.gPlace.setBounds(null)
                        }

                        if (scope.options.country) {
                            opts.componentRestrictions = {
                                country: scope.options.country
                            }
                            scope.gPlace.setComponentRestrictions(opts.componentRestrictions)
                        } else {
                            scope.gPlace.setComponentRestrictions(null)
                        }
                    }
                }

                if (scope.gPlace == undefined) {
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
                }
                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                    var result = scope.gPlace.getPlace();
                    // result = { "address_components": [{ "long_name": "1212", "short_name": "1212", "types": ["street_number"] }, { "long_name": "Santa Fe", "short_name": "Sta Fe", "types": ["route"] }, { "long_name": "Centro", "short_name": "Centro", "types": ["neighborhood", "political"] }, { "long_name": "Rosario", "short_name": "Rosario", "types": ["locality", "political"] }, { "long_name": "Rosario", "short_name": "Rosario", "types": ["administrative_area_level_2", "political"] }, { "long_name": "Santa Fe", "short_name": "Santa Fe", "types": ["administrative_area_level_1", "political"] }, { "long_name": "Argentina", "short_name": "AR", "types": ["country", "political"] }, { "long_name": "S2000", "short_name": "S2000", "types": ["postal_code"] }], "adr_address": "<span class=\"street-address\">Sta Fe 1212</span>, <span class=\"postal-code\">S2000</span> <span class=\"locality\">Rosario</span>, <span class=\"region\">Santa Fe</span>, <span class=\"country-name\">Argentina</span>", "formatted_address": "Sta Fe 1212, S2000 Rosario, Santa Fe, Argentina", "geometry": { "location": { "lat": -32.9447033, "lng": -60.6394037 }, "viewport": { "south": -32.9461092302915, "west": -60.64076838029149, "north": -32.9434112697085, "east": -60.63807041970847 } }, "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png", "id": "39ea0fe03f10e0a6f6191ba6019e798e5afb6d7f", "name": "Sta Fe 1212", "place_id": "ChIJp_CTIhirt5URQA_cG8AtSbM", "plus_code": { "compound_code": "3946+46 Rosario, Santa Fe Province, Argentina", "global_code": "47VX3946+46" }, "reference": "ChIJp_CTIhirt5URQA_cG8AtSbM", "scope": "GOOGLE", "types": ["street_address"], "url": "https://maps.google.com/?q=Sta+Fe+1212,+S2000+Rosario,+Santa+Fe,+Argentina&ftid=0x95b7ab182293f0a7:0xb3492dc01bdc0f40", "utc_offset": -180, "vicinity": "Rosario", "html_attributions": [] };
                    if (result !== undefined) {
                        if (result.address_components !== undefined) {
                            $timeout(function() {
                                //scope.$parent.autocomplete = '123';
                                var cityfield = false;
                                var statefield = false;
                                var countryfield = false;
                                var val = '';
                                console.log(result.address_components); //formatted_address  //fulladdress
                                if(scope.staticmapping && scope.staticmapping != ''){
                                    var addrType = scope.staticmapping;
                                    for (var i = 0; i < result.address_components.length; i++) {
                                        var addressType = result.address_components[i].types[0];
                                        if (addrType == 'state') {
                                            if (!statefield && (addressType == 'administrative_area_level_1' || addressType == 'country')) {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                scope.ngModel = val;
                                                controller.$render();
                                                statefield = true;
                                                //break;
                                            }
                                            if (addressType == 'country') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                scope.othermodels({ 'countryParam': val });
                                                controller.$render();
                                            }
                                        } else if (addrType == 'country') {
                                            if (addressType == 'country') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                scope.ngModel = val;
                                                controller.$render();
                                            }
                                        } else if (addrType == 'address') {
                                            if (addressType == 'neighborhood' || addressType == 'premise' || addressType == 'street_number' || addressType == 'route' || addressType == 'sublocality_level_3' || addressType == 'sublocality_level_2' || addressType == 'sublocality_level_1') {
                                                var streetval = result.address_components[i]['long_name'];
                                                streetval = accent_fold(streetval);
                                                if (streetval) {
                                                    val = val ? val + ', ' + streetval : streetval;
                                                }
                                                scope.ngModel = val;
                                                controller.$render();
                                            }
                                            if ((addressType == 'locality' || addressType == 'political' || addressType == 'administrative_area_level_3')) {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                //scope.othermodels({ 'cityParam': val });
                                                controller.$render();
                                                //added #659
                                                
                                                if (resSet.isDependent.value) {
                                                var ary = $filter('filter')(resSet.dependencyObjsData, { 'type': 'city' }, true);
                                                if (ary && ary.length) {                                                    
                                                    var ary1 = $filter('filter')(scope.allfields, { 'name': ary[0].value }, true);
                                                    if(ary1.length){
                                                    ary1[0].value=val;
                                                    }
                                                }
                                                
                                                }
                                            }
                                            if (addressType == 'administrative_area_level_1') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                //console.log(scope.othermodels());
                                                //scope.othermodels({ 'stateParam': val });
                                                controller.$render();
                                                
                                                if (resSet.isDependent.value) {
                                                var ary = $filter('filter')(resSet.dependencyObjsData, { 'type': 'state' }, true);
                                                if (ary && ary.length) {                                                    
                                                    var ary1 = $filter('filter')(scope.allfields, { 'name': ary[0].value }, true);
                                                    if(ary1.length){
                                                    ary1[0].value=val;
                                                    }
                                                }
                                                
                                                }
                                            }
                                            if (addressType == 'country') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                //scope.othermodels({ 'countryParam': val });
                                                controller.$render();
                                                
                                                if (resSet.isDependent.value) {
                                                var ary = $filter('filter')(resSet.dependencyObjsData, { 'type': 'country' }, true);
                                                if (ary && ary.length) {                                                    
                                                    var ary1 = $filter('filter')(scope.allfields, { 'name': ary[0].value }, true);
                                                    if(ary1.length){
                                                    ary1[0].value=val;
                                                    }
                                                }
                                                
                                                }
                                            }
                                            if (addressType == 'postal_code') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                //scope.othermodels({ 'zipParam': val });
                                                controller.$render();
                                                
                                                if (resSet.isDependent.value) {
                                                var ary = $filter('filter')(resSet.dependencyObjsData, { 'type': 'zip' }, true);
                                                if (ary && ary.length) {                                                    
                                                    var ary1 = $filter('filter')(scope.allfields, { 'name': ary[0].value }, true);
                                                    if(ary1.length){
                                                    ary1[0].value=val;
                                                    }
                                                }
                                                
                                                }
                                            }
                                        } else {
                                            // added political & administrative area level 3 for #659
                                            if (!cityfield && (addressType == 'locality' || addressType == 'political' || addressType == 'administrative_area_level_3')) {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                scope.ngModel = val;
                                                controller.$render();
                                                cityfield = true;
                                                //added #659
                                            }
                                            if (addressType == 'administrative_area_level_1') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                //console.log(scope.othermodels());
                                                //scope.othermodels({ 'stateParam': val });
                                                controller.$render();
                                                
                                                if (resSet.isDependent.value) {
                                                var ary = $filter('filter')(resSet.dependencyObjsData, { 'type': 'state' }, true);
                                                if (ary && ary.length) {                                                    
                                                    var ary1 = $filter('filter')(scope.allfields, { 'name': ary[0].value }, true);
                                                    if(ary1.length){
                                                    ary1[0].value=val;
                                                    }
                                                }
                                                
                                                }
                                            }
                                            if (addressType == 'country') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                //scope.othermodels({ 'countryParam': val });
                                                controller.$render();
                                                
                                                if (resSet.isDependent.value) {
                                                var ary = $filter('filter')(resSet.dependencyObjsData, { 'type': 'country' }, true);
                                                if (ary && ary.length) {                                                    
                                                    var ary1 = $filter('filter')(scope.allfields, { 'name': ary[0].value }, true);
                                                    if(ary1.length){
                                                    ary1[0].value=val;
                                                    }
                                                }
                                                
                                                }
                                            }
                                            //break;
                                        }
                                    }
                                } 
                                else{

                                
                                    

                                    for (var i = 0; i < result.address_components.length; i++) {
                                        var addressType = result.address_components[i].types[0];
                                        if (addrType == 'state') {
                                            if (!statefield && (addressType == 'administrative_area_level_1' || addressType == 'country')) {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                scope.ngModel = val;
                                                controller.$render();
                                                statefield = true;
                                                //break;
                                            }
                                            if (addressType == 'country') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                scope.othermodels({ 'countryParam': val });
                                                controller.$render();
                                            }
                                        } else if (addrType == 'country') {
                                            if (addressType == 'country') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                scope.ngModel = val;
                                                controller.$render();
                                            }
                                        } else if (addrType == 'address') {
                                            if (addressType == 'neighborhood' || addressType == 'premise' || addressType == 'street_number' || addressType == 'route' || addressType == 'sublocality_level_3' || addressType == 'sublocality_level_2' || addressType == 'sublocality_level_1') {
                                                var streetval = result.address_components[i]['long_name'];
                                                streetval = accent_fold(streetval);
                                                if (streetval) {
                                                    val = val ? val + ', ' + streetval : streetval;
                                                }
                                                scope.ngModel = val;
                                                controller.$render();
                                            }
                                            if ((addressType == 'locality' || addressType == 'political' || addressType == 'administrative_area_level_3')) {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                //scope.othermodels({ 'cityParam': val });
                                                controller.$render();
                                                //added #659
                                                
                                                if (resSet.isDependent.value) {
                                                var ary = $filter('filter')(resSet.dependencyObjsData, { 'type': 'city' }, true);
                                                if (ary && ary.length) {                                                    
                                                    var ary1 = $filter('filter')(scope.allfields, { 'name': ary[0].value }, true);
                                                    if(ary1.length){
                                                    ary1[0].value=val;
                                                    }
                                                }
                                                
                                                }
                                            }
                                            if (addressType == 'administrative_area_level_1') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                //console.log(scope.othermodels());
                                                //scope.othermodels({ 'stateParam': val });
                                                controller.$render();
                                                
                                                if (resSet.isDependent.value) {
                                                var ary = $filter('filter')(resSet.dependencyObjsData, { 'type': 'state' }, true);
                                                if (ary && ary.length) {                                                    
                                                    var ary1 = $filter('filter')(scope.allfields, { 'name': ary[0].value }, true);
                                                    if(ary1.length){
                                                    ary1[0].value=val;
                                                    }
                                                }
                                                
                                                }
                                            }
                                            if (addressType == 'country') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                //scope.othermodels({ 'countryParam': val });
                                                controller.$render();
                                                
                                                if (resSet.isDependent.value) {
                                                var ary = $filter('filter')(resSet.dependencyObjsData, { 'type': 'country' }, true);
                                                if (ary && ary.length) {                                                    
                                                    var ary1 = $filter('filter')(scope.allfields, { 'name': ary[0].value }, true);
                                                    if(ary1.length){
                                                    ary1[0].value=val;
                                                    }
                                                }
                                                
                                                }
                                            }
                                            if (addressType == 'postal_code') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                //scope.othermodels({ 'zipParam': val });
                                                controller.$render();
                                                
                                                if (resSet.isDependent.value) {
                                                var ary = $filter('filter')(resSet.dependencyObjsData, { 'type': 'zip' }, true);
                                                if (ary && ary.length) {                                                    
                                                    var ary1 = $filter('filter')(scope.allfields, { 'name': ary[0].value }, true);
                                                    if(ary1.length){
                                                    ary1[0].value=val;
                                                    }
                                                }
                                                
                                                }
                                            }
                                        } else {
                                            // added political & administrative area level 3 for #659
                                            if (!cityfield && (addressType == 'locality' || addressType == 'political' || addressType == 'administrative_area_level_3')) {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                scope.ngModel = val;
                                                controller.$render();
                                                cityfield = true;
                                                //added #659
                                            }
                                            if (addressType == 'administrative_area_level_1') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                //console.log(scope.othermodels());
                                                //scope.othermodels({ 'stateParam': val });
                                                controller.$render();
                                                
                                            }
                                            if (addressType == 'country') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                //scope.othermodels({ 'countryParam': val });
                                                controller.$render();
                                                
                                                
                                            }
                                            //break;
                                        }
                                    }
                                    
                                }
                                return;

                                if (resSet.isDependent.value) {
                                    //dependencyObjsData
                                }
                                // var ary = $filter('filter')(scope.currentfield.Settings, { 'Type': 'General Validations' }, true);
                                // if (ary && ary.length) {
                                //     $.each(ary[0].Options, function (index, set) {
                                //         if (set.name == settingname) {
                                //             result = set;
                                //             return;
                                //         }
                                //     });
                                // }

                                if (scope.options.getType == 'fulladdress') {
                                    var whole_address = result.formatted_address;
                                    whole_address = accent_fold(whole_address);
                                    scope.ngModel = whole_address;
                                    controller.$render();
                                } else {
                                    for (var i = 0; i < result.address_components.length; i++) {
                                        var addressType = result.address_components[i].types[0];
                                        if (scope.options.getType == 'state') {
                                            if (!statefield && (addressType == 'administrative_area_level_1' || addressType == 'country')) {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                scope.ngModel = val;
                                                controller.$render();
                                                statefield = true;
                                                //break;
                                            }
                                            if (addressType == 'country') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                scope.othermodels({ 'countryParam': val });
                                                controller.$render();
                                            }
                                        } else if (scope.options.getType == 'country') {
                                            if (addressType == 'country') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                scope.ngModel = val;
                                                controller.$render();
                                            }
                                        } else if (scope.options.getType == 'address') {
                                            if (addressType == 'neighborhood' || addressType == 'premise' || addressType == 'street_number' || addressType == 'route' || addressType == 'sublocality_level_3' || addressType == 'sublocality_level_2' || addressType == 'sublocality_level_1') {
                                                var streetval = result.address_components[i]['long_name'];
                                                streetval = accent_fold(streetval);
                                                if (streetval) {
                                                    val = val ? val + ', ' + streetval : streetval;
                                                }
                                                scope.ngModel = val;
                                                controller.$render();
                                            }
                                            if ((addressType == 'locality' || addressType == 'political' || addressType == 'administrative_area_level_3')) {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                scope.othermodels({ 'cityParam': val });
                                                controller.$render();
                                                //added #659
                                            }
                                            if (addressType == 'administrative_area_level_1') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                //console.log(scope.othermodels());
                                                scope.othermodels({ 'stateParam': val });
                                                controller.$render();
                                            }
                                            if (addressType == 'country') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                scope.othermodels({ 'countryParam': val });
                                                controller.$render();
                                            }
                                            if (addressType == 'postal_code') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                scope.othermodels({ 'zipParam': val });
                                                controller.$render();
                                            }
                                        } else {
                                            // added political & administrative area level 3 for #659
                                            if (!cityfield && (addressType == 'locality' || addressType == 'political' || addressType == 'administrative_area_level_3')) {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                scope.ngModel = val;
                                                controller.$render();
                                                cityfield = true;
                                                //added #659
                                            }
                                            if (addressType == 'administrative_area_level_1') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                //console.log(scope.othermodels());
                                                scope.othermodels({ 'stateParam': val });
                                                controller.$render();
                                            }
                                            if (addressType == 'country') {
                                                val = result.address_components[i]['long_name'];
                                                val = accent_fold(val);
                                                scope.othermodels({ 'countryParam': val });
                                                controller.$render();
                                            }
                                            //break;
                                        }
                                    }
                                }
                                // console.log(result);
                                //       var whole_address = result.formatted_address;
                                //   var split_whole_address = whole_address.split(',');
                                //   //alert(split_whole_address);
                                //   var whole_address_length = split_whole_address.length;

                                //           //scope.$parent.autocomplete = split_whole_address[0];
                                //           scope.ngModel = split_whole_address[0];
                            }, 0);

                        } else {
                            if (watchEnter) {
                                getPlace(result)
                            }
                        }
                    }
                })

                function getFieldMaskSetting(settingname, obj) {
                    var result = {};
                    var settings = obj.Settings;
                    $.each(settings, function(index, set) {
                        if (set.name == settingname) {
                            result = set;
                            return;
                        }
                    });
                    if (!Object.keys(result).length) {
                        //Continue to search settings in the checkbox zone General Validations

                        var ary = $filter('filter')(settings, { 'name': 'General Validations' }, true);
                        if (ary && ary.length) {
                            $.each(ary[0].Options, function(index, set) {
                                if (set.name == settingname) {
                                    result = set;
                                    return;
                                }
                            });
                        }
                    }
                    return result;

                }
                //function to get retrieve the autocompletes first result using the AutocompleteService 
                var getPlace = function(result) {
                    var autocompleteService = new google.maps.places.AutocompleteService();
                    if (result.name.length > 0) {
                        autocompleteService.getPlacePredictions({
                                input: result.name,
                                offset: result.name.length
                            },
                            function listentoresult(list, status) {
                                if (list == null || list.length == 0) {

                                    scope.$apply(function() {
                                        scope.details = null;
                                    });

                                } else {
                                    var placesService = new google.maps.places.PlacesService(element[0]);
                                    placesService.getDetails({ 'reference': list[0].reference },
                                        function detailsresult(detailsResult, placesServiceStatus) {

                                            if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
                                                scope.$apply(function() {

                                                    controller.$setViewValue(detailsResult.formatted_address);
                                                    element.val(detailsResult.formatted_address);


                                                    //on focusout the value reverts, need to set it again.
                                                    var watchFocusOut = element.on('focusout', function(event) {
                                                        element.val(detailsResult.formatted_address);
                                                        element.unbind('focusout')
                                                    })

                                                });
                                            }
                                        }
                                    );
                                }
                            });
                    }
                }

                controller.$render = function() {
                    var location = controller.$viewValue;
                    element.val(location);
                };

                //watch options provided to directive
                scope.watchOptions = function() {
                    return scope.options
                };
                scope.$watch(scope.watchOptions, function() {
                    initOpts()
                }, true);

            }
        };
    }]);
}());