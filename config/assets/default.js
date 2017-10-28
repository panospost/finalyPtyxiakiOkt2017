'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
		'//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
		'public/lib/angular-material/modules/css/angular-material-layout.css',
		"https://fonts.googleapis.com/css?family=Anonymous+Pro",
		
		'https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.0.5/angular-material.css',
		'https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.0.5/angular-material.layouts.css',
		'https://cdn.rawgit.com/angular-ui/bower-ui-grid/master/ui-grid.min.css',
	//	'/bower_components/angular-ui-grid/ui-grid.min.css',
		
		'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'
		
      ],
      js: [
			
			
  
  
  
			
			'public/lib/lodash/dist/lodash.underscore.js',
    //     '//cdnjs.cloudflare.com/ajax/libs/lodash.js/0.10.0/lodash.min.js',
	    'public/lib/jquery/dist/jquery.js',
		'public/lib/jquery/dist/jquery-ui.js',
		'https://code.jquery.com/ui/1.10.4/jquery-ui.min.js',
        'public/lib/angular/angular.js',
	//   "http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js",
	   "http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js",
		//'http://maps.google.com/maps/api/js?libraries=places?key="AIzaSyAim6gmsOzHaCKHR6OHOW7b0LgN0OJhb9o"',	
"https://maps.googleapis.com/maps/api/js?key=AIzaSyDGDg3pPRMpYIUsBspk007zQqinsVhNsUs&libraries=places",		//tokeygiageocoder
//"http://maps.google.com/maps/api/js?libraries=places",//gia searchbox
		'public/lib/angular-ui-sortable/sortable.js',
		// 'public/lib/angular-aria/angular-aria.js',
		"http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js",//xreiazetai
        'public/lib/angular-resource/angular-resource.js',
       //'public/lib/angular-animate/angular-animate.js',
	 //  "http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js",
	   "http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js",
	//	'public/lib/angular-material/angular-material.js',
		'public/lib/angular-material/angular-material-layouts.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-file-upload/angular-file-upload.js',
		'public/lib/angular-simple-logger/dist/angular-simple-logger.js',
		'https://cdn.rawgit.com/angular-ui/bower-ui-grid/master/ui-grid.min.js',//xreiazetai
		//'https://cdn.rawgit.com/angular-ui/bower-ui-grid/master/ui-grid.min.js',//xreiazetai
//		'/node_modules/angular-ui-grid/ui-grid.js',
	//	'bower_components/angular-ui-grid/index.js',
		'"http://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular-touch.js"',
        'public/lib/angular-google-maps/dist/angular-google-maps.js',
	
		 "http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.14.1.min.js",//xreiazetai
	//	 "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js",
		 'public/lib/pdfmake/build/pdfmake.js',
		 'public/lib/pdfmake/build/vfs_fonts.js',
		 'public/lib/angular-recaptcha/release/angular-recaptcha.js',
		 'public/lib/ngstorage/ngStorage.js'
		
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css',
	  
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gruntConfig: 'gruntfile.js',
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: 'modules/*/server/config/*.js',
    policies: 'modules/*/server/policies/*.js',
    views: 'modules/*/server/views/*.html'
  }
};
