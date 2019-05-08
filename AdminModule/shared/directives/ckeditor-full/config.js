/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.contentsCss = '/CKEditor/samples/toolbarconfigurator/font.css';
	// config.font_names = 'Lucida Handwriting/Lucida Handwriting;' + config.font_names;
	// config.font_names = 'Free Style Script/Freestyle Script;' + config.font_names;
	config.font_names = config.font_names +';'+ 'Brush Script MT/Brush Script MT;';
	config.font_defaultLabel = 'Verdana';
	config.fontSize_defaultLabel = '12'; 
};