var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var connect = require('gulp-connect-multi');
var rev = require('gulp-rev');

var revRewrite = require('gulp-rev-rewrite');
var revDelete = require('gulp-rev-delete-original');

var clean = require('gulp-clean');
var revReplace = require('gulp-rev-replace');

var devServer = connect(),
    coverageServer = connect();

gulp.task('connect', devServer.server({
    root: ['AdminModule'],
    port: 1337,
    livereload: true,
    open: {
        file: '',
        browser: 'chrome' // if not working OS X browser: 'Google Chrome'
    }
}));

gulp.task('coverage', coverageServer.server({
    root: ['CandidateModule'],
    port: 1338,
    livereload: true,
    open: {
        file: '',
        browser: 'chrome' // if not working OS X browser: 'Google Chrome'
    }
}));

gulp.task('html', function () {
    gulp.src('./AdminModule/*.html')
        .pipe(devServer.reload());
});
gulp.task('ffjs', function () {
    gulp.src('AdminModule/**/*.js')
        .pipe(devServer.reload());

});

gulp.task('stylus', function () {
    gulp.src('./app/stylus/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./app/css'))
        .pipe(devServer.reload());
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app',
            routes: {
                '/node_modules': 'node_modules'
            }
        },
        notify: false,
        ghostMode: false
    })
});



gulp.task('candidatewatch', function () {
    gulp.watch(['CandidateModule/*.html', '!CandidateModule/node_modules/*.html'], ['html']);
    gulp.watch(['CandidateModule/**/*.js', '!CandidateModule/node_modules/**/*.js'], ['js']);
    gulp.watch(['CandidateModule/scss/*.scss'], ['candidatesass']);
});

gulp.task('adminwatch', function () {
    gulp.watch(['AdminModule/components/*.html'], ['html']);
    gulp.watch(['AdminModule/components/*.js'], devServer.reload());
    gulp.watch(['AdminModule/scss/*.scss'], ['adminsass']);
    gulp.watch(['CandidateModule/scss/*.scss'], ['candidatesass']);
});

gulp.task('watch', function () {
    gulp.watch(['./app/*.html'], ['html']);
    gulp.watch('app/**/*.js', ['js']);
});

gulp.task('candidatesass', function () {
    return gulp.src('CandidateModule/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('CandidateModule/css'))
});

gulp.task('candidateuseref', function () {
    return gulp.src(['CandidateModule/**/*.html', 'CandidateModule/branding-image.js', 'CandidateModule/env-colors.js'])
        .pipe(useref({ searchPath: '' }))
        .pipe(gulpIf(['*.js', '*.min.js'], uglify()))
        //.pipe(gulpIf('CandidateModule/*.js', uglify({mangle:  true })))
        .pipe(gulpIf('CandidateModule/*.css', cssnano()))
        .pipe(gulp.dest('CandidateModule/dist/'))
});

gulp.task('candidateimages', function () {
    return gulp.src('CandidateModule/images/**/*.+(png|jpg|jpeg|gif|svg|pdf)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('CandidateModule/dist/images'))
});

gulp.task('candidatefonts', function () {
    return gulp.src('CandidateModule/fonts/**/*')
        .pipe(gulp.dest('CandidateModule/dist/fonts'))
});


gulp.task('candidatebrandingcss', function () {
    return gulp.src('CandidateModule/css/branding/branding.css')
        .pipe(gulp.dest('CandidateModule/dist/css'))
});

gulp.task('clean:candidatedist', function () {
    return del.sync('CandidateModule/dist');
});


   //,'coverage''stylus','adminwatch',
  gulp.task('default', ['connect','coverage','adminwatch', 'adminsass','candidatesass' ]);
  gulp.task('admin', ['connect','adminwatch', 'adminsass' ]);



// Starts 
var concat = require('gulp-concat');



gulp.task('styles', function () {
    gulp.src('/styles/*.scss')
        .pipe(sass({
            includePaths: ['/styles/partials'],
            outputStyle: 'expanded'
        }))
        .pipe(gulp.dest('/styles'));

    gulp.src(['/bower_components/normalize-css/normalize.css', '/styles/*.css'])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('/dist/styles'));
});


gulp.task('cleancandidatescripts', function () {
    return gulp.src('CandidateModule/dist/js/*.js', { read: false })
        .pipe(clean());
});

gulp.task('cleanadminscripts', function () {
    return gulp.src('AdminModule/dist/js/*.js', { read: false })
        .pipe(clean());
});

gulp.task('adminsass', function () {
    return gulp.src('AdminModule/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('AdminModule/css'))
});

gulp.task('adminuseref', function () {
    return gulp.src(['AdminModule/**/*.html', 'AdminModule/branding-image.js', 'AdminModule/env-colors.js', 'AdminModule/shared/directives/ckeditor-full/**'])
        .pipe(useref({ searchPath: '' }))
        .pipe(gulpIf(['*.js', '*.min.js'], uglify()))
        //.pipe(gulpIf('AdminModule/*.js', uglify({mangle:  true })))
        .pipe(gulpIf('AdminModule/*.css', cssnano()))
        .pipe(gulp.dest('AdminModule/dist/'))
});

gulp.task('adminimages', function () {
    return gulp.src('AdminModule/images/**/*.+(png|jpg|jpeg|gif|svg|pdf)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('AdminModule/dist/images'))
});

gulp.task('adminfonts', function () {
    return gulp.src('AdminModule/fonts/**/*')
        .pipe(gulp.dest('AdminModule/dist/fonts'))
});


gulp.task('adminbrandingcss', function () {
    return gulp.src('AdminModule/css/branding/branding.css')
        .pipe(gulp.dest('AdminModule/dist/css'))
});

gulp.task('clean:admindist', function () {
    return del.sync('AdminModule/dist');
});

gulp.task('candidatescripts', function () {

    gulp.src(['CandidateModule/node_modules/angular/angular.min.js',
        'CandidateModule/node_modules/jquery/dist/jquery.min.js',
        'CandidateModule/node_modules/angular-messages/angular-messages.min.js',
        'CandidateModule/node_modules/angular-animate/angular-animate.min.js',
        'CandidateModule/node_modules/angular-aria/angular-aria.min.js',
        'CandidateModule/node_modules/angular-sanitize/angular-sanitize.min.js',
        'CandidateModule/node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
        'CandidateModule/node_modules/angular-material/angular-material.min.js',
        'CandidateModule/node_modules/angular-material-icons/angular-material-icons.min.js',
        'CandidateModule/env.js',
        'CandidateModule/app.js',
        'CandidateModule/app.setup.js',
        'CandidateModule/shared/interceptors/httpInterceptor.js'
    ])
        .pipe(concat('script.js'))
        //.pipe(uglify())
        .pipe(uglify({ mangle: true }))
        .pipe(gulp.dest('CandidateModule/dist/js'));

    gulp.src(['CandidateModule/node_modules/pdfjs-dist/build/pdf.combined.js'
    ])
        .pipe(concat('script-pdf-combined.js'))
        .pipe(uglify())
        .pipe(gulp.dest('CandidateModule/dist/js'));

    gulp.src(['CandidateModule/node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js',
        'CandidateModule/node_modules/ng-file-upload/dist/ng-file-upload.min.js',
        'CandidateModule/node_modules/moment/min/moment.min.js'
    ])
        .pipe(concat('script-plugin.js'))
        //.pipe(uglify())
        .pipe(uglify({ mangle: true }))
        .pipe(gulp.dest('CandidateModule/dist/js'));

    gulp.src([
        'CandidateModule/components/introPageService.js',
        'CandidateModule/components/usersService.js',
        'CandidateModule/components/navigation/navigationService.js',
        'CandidateModule/shared/services/toastrService.js',
        'CandidateModule/components/navigation/navigationController.js',
        'CandidateModule/components/login/loginController.js',
        'CandidateModule/components/signup/signupController.js',
        'CandidateModule/components/offer-letter/offerLetterController.js',
        'CandidateModule/components/forgot-password/forgotPasswordController.js',
        'CandidateModule/components/candidateinfo/commondetails/commonDetailsController.js',
        'CandidateModule/components/candidateinfo/commondetails/commonDetailsService.js',
        'CandidateModule/components/dashboard/candidateDashboardController.js',
        'CandidateModule/components/docUpload/candidateDocUploadController.js',
        'CandidateModule/components/docUpload/candidateDocUploadController.js',
        'CandidateModule/components/candidateinfo/candidateinfoController.js',
        'CandidateModule/components/candidateinfo/contractorinfo/contractorinfoController.js',
        'CandidateModule/components/candidateinfo/eeo/eeoController.js',
        'CandidateModule/components/candidateinfo/payrollpackage/payrollpackageController.js',
        'CandidateModule/components/candidateinfo/bgvforms/bgvformsController.js',
        'CandidateModule/components/candidateinfo/eeo/eeoService.js',
        'CandidateModule/components/candidateinfo/contractorinfo/contractorinfoService.js',
        'CandidateModule/components/candidateinfo/payrollpackage/payrollpackageService.js',
        'CandidateModule/components/offer-letter-warning/offerLetterWarningController.js',
        'CandidateModule/components/handSignDocUpload/handSignDocUploadController.js',
        'CandidateModule/components/introduction/DashboardIntroController.js'
    ])
        .pipe(concat('script-candidate.js'))
        //.pipe(uglify())
        .pipe(uglify({ mangle: true }))
        .pipe(gulp.dest('CandidateModule/dist/js'));

    gulp.src([
        'CandidateModule/shared/directives/focusIf.min.js',
        'CandidateModule/shared/directives/loader.js',
        'CandidateModule/shared/directives/drag-drop.js',
        'CandidateModule/shared/directives/fileModel.js',
        'CandidateModule/shared/directives/imageUpload.js',
        'CandidateModule/shared/directives/autofocus.js',
        'CandidateModule/shared/directives/ng-pdfviewer.js',
        'CandidateModule/shared/directives/angular-ui-mask.js',
        'CandidateModule/shared/directives/chooseFile.js',
        'CandidateModule/shared/directives/place-autocomplete.js',
        'CandidateModule/shared/directives/password-compare.js',
        'CandidateModule/shared/directives/convert-stars.js',
        'CandidateModule/shared/filters/breakTextToHtml.js'
    ])
        .pipe(concat('script-common.js'))
        .pipe(uglify({ mangle: true }))
        .pipe(gulp.dest('CandidateModule/dist/js'));
});

gulp.task('adminscripts', function () {

    gulp.src(['AdminModule/node_modules/angular/angular.min.js',
        'AdminModule/node_modules/jquery/dist/jquery.min.js',
        'AdminModule/node_modules/angular-messages/angular-messages.min.js',
        'AdminModule/node_modules/angular-animate/angular-animate.min.js',
        'AdminModule/node_modules/angular-aria/angular-aria.min.js',
        'AdminModule/node_modules/angular-sanitize/angular-sanitize.min.js',
        'AdminModule/node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
        'AdminModule/node_modules/angular-material/angular-material.min.js',
        'AdminModule/node_modules/angular-material-icons/angular-material-icons.min.js',
        'AdminModule/env.js',
        'AdminModule/app.js',
        'AdminModule/app.setup.js'
    ])
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('AdminModule/dist/js'));


    gulp.src(['AdminModule/node_modules/pdfjs-dist/build/pdf.combined.js'
    ])
        .pipe(concat('script-pdf-combined.js'))
        .pipe(uglify())
        .pipe(gulp.dest('AdminModule/dist/js'));

    gulp.src([
        'AdminModule/node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js',
        'AdminModule/node_modules/ng-file-upload/dist/ng-file-upload.min.js',
        'AdminModule/node_modules/angular-material-time-picker/dist/md-time-picker.js',
        'AdminModule/node_modules/moment/min/moment.min.js',
        'AdminModule/node_modules/moment-timezone/builds/moment-timezone.min.js',
        'AdminModule/node_modules/moment-timezone/builds/moment-timezone-with-data.min.js',
        'AdminModule/shared/services/calendar.js',
        'AdminModule/node_modules/fullcalendar/dist/fullcalendar.min.js',
        'AdminModule/node_modules/fullcalendar/dist/gcal.min.js',
        'AdminModule/node_modules/ng-material-datetimepicker/dist/angular-material-datetimepicker.min.js',
        'AdminModule/node_modules/ng-idle/angular-idle.min.js',
        'AdminModule/node_modules/chart.js/dist/Chart.min.js',
        'AdminModule/node_modules/angular-chart.js/dist/angular-chart.min.js',
        'AdminModule/shared/directives/ckeditor-full/ckeditor.js',
        'AdminModule/shared/directives/ng-ckeditor/dist/ng-ckeditor.min.js',
        'AdminModule/node_modules/xlsx/dist/shim.min.js',
        'AdminModule/node_modules/xlsx/dist/xlsx.full.min.js'
    ])
        //.pipe(concat('script-plugin.js'))
        .pipe(uglify())
        .pipe(gulp.dest('AdminModule/dist/js'));

    gulp.src([
        'AdminModule/components/navigation/navigationController.js',
        'AdminModule/components/users/login/loginController.js',
        'AdminModule/components/users/signup/signupController.js',
        'AdminModule/components/users/forgot-password/forgotPasswordController.js',
        'AdminModule/components/dashboard/dashboardService.js',
        'AdminModule/components/dashboard/dashboardController.js',
        'AdminModule/components/settings/settingsController.js',
        'AdminModule/components/settings/intro_page/introPageService.js',
        'AdminModule/components/settings/intro_page/introPageController.js',
        'AdminModule/components/settings/intro_page/edit/editIntroPageController.js',
        'AdminModule/components/settings/intro_page/edit/edit_modal/editModalIntroPageController.js',
        'AdminModule/components/settings/general_settings/generalSettingsController.js',
        'AdminModule/components/settings/general_settings/generalSettingsService.js',
        'AdminModule/components/settings/documents/documentsService.js',
        'AdminModule/components/settings/documents/list/docsController.js',
        'AdminModule/components/settings/documents/upload/uploadDocumentsController.js',
        'AdminModule/components/settings/documents/mappingFields/mappingFieldsController.js',
        'AdminModule/components/settings/intro_page/preview/previewIntroPageController.js',
        'AdminModule/components/new_hires/list/newHiresListController.js',
        'AdminModule/components/new_hires/add/addNewHireController.js',
        'AdminModule/components/new_hires/email/sendEmailController.js',
        'AdminModule/components/new_hires/newHiresService.js',
        'AdminModule/components/settings/branding/brandingController.js',
        'AdminModule/components/settings/email_templates/emailTempService.js',
        'AdminModule/components/settings/email_templates/list/emailTemplateListController.js',
        'AdminModule/components/settings/email_templates/edit/editEmailTemplateController.js',
        'AdminModule/shared/directives/decimalPlaces.js',
        'AdminModule/components/myaccount/myAccountController.js',
        'AdminModule/components/myaccount/myAccountService.js',
        'AdminModule/components/hire_info/hireInfoController.js',
        'AdminModule/components/hire_info/hireInfoService.js',
        'AdminModule/components/hire_info/initiate_onboarding/initiateOnboardingService.js',
        'AdminModule/components/hire_info/initiate_onboarding/initiateOnboardingController.js',
        'AdminModule/components/hire_info/review_certify/reviewCertifyService.js',
        'AdminModule/components/hire_info/review_certify/reviewCertifyController.js',
        'AdminModule/components/hire_info/attachDocsReview/attachDocsReviewController.js',
        'AdminModule/components/hire_info/comments/commentsController.js',
        'AdminModule/components/hire_info/emails/emailController.js',
        'AdminModule/components/hire_info/emails/emailService.js',
        'AdminModule/components/hire_info/activities/activitiesController.js',
        'AdminModule/components/hire_info/activities/activitiesService.js',
        'AdminModule/components/hire_info/schedule/scheduleController.js',
        'AdminModule/components/hire_info/schedule/scheduleService.js',
        'AdminModule/components/settings/users/hrUsersService.js',
        'AdminModule/components/settings/folders/foldersService.js',
        'AdminModule/components/workflows/workflowService.js',
        'AdminModule/components/workflows/add/docDropService.js',
        'AdminModule/components/settings/users/edit/editUserController.js',
        'AdminModule/components/settings/users/list/usersListController.js',
        'AdminModule/components/settings/folders/list/foldersListController.js',
        'AdminModule/components/settings/folders/edit/editFolderController.js',
        'AdminModule/components/workflows/list/workflowsController.js',
        'AdminModule/components/workflows/add/addWorkflowController.js',
        'AdminModule/components/tasks/tasksService.js',
        'AdminModule/components/tasks/tasksController.js',
        'AdminModule/components/tasks/mytasks/mytasksController.js',
        'AdminModule/components/tasks/calendar/taskCalendarController.js',
        'AdminModule/components/reports/reportsService.js',
        'AdminModule/components/reports/reportsController.js',
        'AdminModule/components/reports/static/staticController.js',
        'AdminModule/components/reports/dynamic/dynamicController.js',
        'AdminModule/components/settings/documents/documentAssociation/documentAssociationController.js'

    ])
        .pipe(concat('script-admin.js'))
        .pipe(uglify())
        .pipe(gulp.dest('AdminModule/dist/js'));


    gulp.src([
        'AdminModule/shared/interceptors/httpInterceptor.js',
        'AdminModule/shared/directives/angular-material-paging.js',
        'AdminModule/shared/directives/focusIf.min.js',
        'AdminModule/shared/directives/loader.js',
        'AdminModule/shared/directives/drag-drop.js',
        'AdminModule/shared/directives/fileModel.js',
        'AdminModule/shared/directives/imageUpload.js',
        'AdminModule/shared/directives/autofocus.js',
        'AdminModule/shared/directives/ng-pdfviewer.js',
        'AdminModule/shared/directives/angular-ui-mask.js',
        'AdminModule/shared/directives/chooseFile.js',
        'AdminModule/shared/directives/place-autocomplete.js',
        'AdminModule/shared/directives/md-color-picker/tinycolor.js',
        'AdminModule/shared/directives/md-color-picker/mdColorPicker.js',
        'AdminModule/shared/directives/password-compare.js',
        'AdminModule/shared/directives/convert-stars.js',
        'AdminModule/shared/services/toastrService.js',
        'AdminModule/shared/filters/breakTextToHtml.js',
        'AdminModule/components/candidateusersService.js',
        'AdminModule/components/navigation/navigationService.js',
        'AdminModule/components/users/usersService.js',
        'AdminModule/components/settings/branding/brandingService.js'
    ])
        .pipe(concat('script-common.js'))
        .pipe(uglify())
        .pipe(gulp.dest('AdminModule/dist/js'))
    // .pipe(rev())
    // .pipe(gulp.dest('AdminModule/dist/js'))  // write rev'd assets to build dir
    // .pipe(rev.manifest())
    //.pipe(gulp.dest('AdminModule/dist/js'));
});


gulp.task('revision', () => {
    return gulp.src('AdminModule/dist/js/*.js')
        .pipe(rev())
        .pipe(revDelete()) // Remove the unrevved files
        .pipe(gulp.dest('AdminModule/dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('AdminModule/dist/js'));
});
//,['revision']
gulp.task('revAdminRewriteJS', function () {
    return gulp.src('AdminModule/dist/js/*.js')
        .pipe(rev())
        .pipe(revDelete())
        .pipe(gulp.dest('AdminModule/dist/js'))  // write rev'd assets to build dir    
        .pipe(rev.manifest())
        .pipe(gulp.dest('AdminModule/dist/js'));
});


gulp.task("revAdminreplaceJS", function () {
    var manifestjson = gulp.src('AdminModule/dist/js/rev-manifest.json');

    return gulp.src("AdminModule/dist/index.html")
        .pipe(revReplace({ manifest: manifestjson }))
        .pipe(gulp.dest("AdminModule/dist"))
        .pipe(revDelete());
});
gulp.task('revAdminRewriteCSS', function () {
    return gulp.src('AdminModule/dist/css/*.css')
        .pipe(rev())
        .pipe(revDelete())
        .pipe(gulp.dest('AdminModule/dist/css'))  // write rev'd assets to build dir    
        .pipe(rev.manifest())
        .pipe(gulp.dest('AdminModule/dist/css'));
});


gulp.task("revAdminreplaceCSS", function () {
    var manifestjson = gulp.src('AdminModule/dist/css/rev-manifest.json');

    return gulp.src("AdminModule/dist/index.html")
        .pipe(revReplace({ manifest: manifestjson }))
        .pipe(gulp.dest("AdminModule/dist"))
        .pipe(revDelete());
});

gulp.task('revCandidateRewriteJS', function () {
    return gulp.src('CandidateModule/dist/js/*.js')
        .pipe(rev())
        .pipe(revDelete())
        .pipe(gulp.dest('CandidateModule/dist/js'))  // write rev'd assets to build dir    
        .pipe(rev.manifest())
        .pipe(gulp.dest('CandidateModule/dist/js'));
});


gulp.task("revCandidatereplaceJS", function () {
    var manifestjson = gulp.src('CandidateModule/dist/js/rev-manifest.json');

    return gulp.src("CandidateModule/dist/index.html")
        .pipe(revReplace({ manifest: manifestjson }))
        .pipe(gulp.dest("CandidateModule/dist"))
        .pipe(revDelete());
});

gulp.task('revCandidateRewriteCSS', function () {
    return gulp.src('CandidateModule/dist/css/*.css')
        .pipe(rev())
        .pipe(revDelete())
        .pipe(gulp.dest('CandidateModule/dist/css'))  // write rev'd assets to build dir    
        .pipe(rev.manifest())
        .pipe(gulp.dest('CandidateModule/dist/css'));
});


gulp.task("revCandidatereplaceCSS", function () {
    var manifestjson = gulp.src('CandidateModule/dist/css/rev-manifest.json');

    return gulp.src("CandidateModule/dist/index.html")
        .pipe(revReplace({ manifest: manifestjson }))
        .pipe(gulp.dest("CandidateModule/dist"))
        .pipe(revDelete());
});

gulp.task('candidate-build', function (callback) {
    runSequence('clean:candidatedist',
        ['candidatesass', 'candidateuseref', 'candidateimages', 'candidatefonts', 'candidatebrandingcss'],
        ['cleancandidatescripts'],
        ['candidatescripts'],
        callback
    )
});
gulp.task('admin-build', function (callback) {
    runSequence('clean:admindist',
        ['adminsass', 'adminuseref', 'adminimages', 'adminfonts', 'adminbrandingcss'],
        ['cleanadminscripts'],
        ['adminscripts'],
        callback
    )
});

gulp.task('remove-admin-cache', function (callback) {
    runSequence(
        'revAdminRewriteJS',
        'revAdminreplaceJS',
        'revAdminRewriteCSS',
        'revAdminreplaceCSS',
        callback
    )
});

gulp.task('remove-candidate-cache', function (callback) {
    runSequence(
        'revCandidateRewriteJS',
        'revCandidatereplaceJS',
        'revCandidateRewriteCSS',
        'revCandidatereplaceCSS',
        callback
    )
});

gulp.task('remove-cache', function (callback) {
    runSequence(
        ['remove-admin-cache', 'remove-candidate-cache'],
        callback
    )
});

gulp.task('build', function (callback) {
    runSequence(
        ['admin-build', 'candidate-build'],
        callback
    )
});
gulp.task('build-bp', function (callback) {
    runSequence('clean:candidatedist',
        ['candidatesass', 'candidateuseref', 'candidateimages', 'candidatefonts', 'candidatebrandingcss'],
        callback
    )
});
