/// <binding ProjectOpened='default, watch' />
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var del = require('del');

sass.compiler = require('node-sass');

gulp.task('clean-js', function() {
	return del('scripts/bundle.js');
});

gulp.task('clean-css', function() {
	return del('content/main.css');
});

gulp.task('pack-js', function () {    
    return gulp.src(['node_modules/jquery/dist/jquery.min.js',
		'node_modules/jquery.nicescroll/dist/jquery.nicescroll.min.js',
		'node_modules/knockout/build/output/knockout-latest.js',
		'scripts/app/proto.js',
		'scripts/app/app.js',
		'scripts/app/settings.js',
		'scripts/app/enums.js',
		'scripts/app/helpers.js',
		'scripts/app/models/*.js',
		'scripts/app/ko.handlers.js',
		'scripts/app/viewmodels/*.js',
		'scripts/app/components/*.js'
		])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('scripts'));
});

gulp.task('pack-css', function () {    
    return gulp.src('content/sass/main.scss')
		.pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('content'));
});

gulp.task('watch', function () {
    gulp.watch('content/**/*.scss', gulp.series('pack-css'));
	gulp.watch('scripts/app/**/*.js', gulp.series('pack-js'));
});

gulp.task('default', gulp.parallel(
		gulp.series('clean-js', 'pack-js'),
		gulp.series('clean-css', 'pack-css')
	)
);