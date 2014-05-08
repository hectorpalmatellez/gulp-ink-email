// Plugins
var     gulp = require( 'gulp' ),
       gutil = require( 'gulp-util' ),
      rename = require( 'gulp-rename' ),
        path = require( 'path' ),
     connect = require( 'connect' ),
          lr = require( 'tiny-lr' ),
  livereload = require( 'gulp-livereload' ),
      server = lr(),
     embedlr = require( "gulp-embedlr" ),
      jshint = require( "gulp-jshint" ),
     stylish = require( 'jshint-stylish' );
      uglify = require( 'gulp-uglify' ),
        sass = require( 'gulp-sass' ),
      prefix = require( 'gulp-autoprefixer' ),
      svgmin = require( 'gulp-svgmin' ),
    imagemin = require( 'gulp-imagemin' ),
       clean = require( 'gulp-clean' ),
 runSequence = require( 'run-sequence' );

// source and distribution folders 
var  src = 'src/';
var dist = path.resolve( 'dist/' );

// localhost port
var LocalPort = 4000;

// start local server
gulp.task( 'server', function() {
  connect.createServer(
      connect.static( dist )
  ).listen( LocalPort );

  console.log( "\nlocal server runing at http://localhost:" + LocalPort + "/\n" );
});

// add liveReload script
gulp.task( 'embedlr', function() {
  gulp.src( src + "*.html" )
    .pipe( embedlr() )
    .pipe( gulp.dest( dist ) )
    .pipe( livereload( server ) );
});

// JShint
gulp.task( 'lint', function() {
  gulp.src( src + 'js/*.js' )
    .pipe( jshint() )
    .pipe( jshint.reporter( stylish ) );
});

// minify JS
gulp.task( 'minifyJS', function() {
  gulp.src( src + 'js/**/*.js' )
    .pipe( uglify() )
    .pipe( rename( { ext: '.min.js' } ) )
    .pipe( gulp.dest( dist + '/js' ) )
    .pipe( livereload( server ) );
});

// JSON
gulp.task( 'json', function() {
  gulp.src( src + 'data/**/*.json' )
    .pipe( gulp.dest( dist + '/data' ) )
    .pipe( livereload( server ) );
});

// complie sass & add vendor prefixes
gulp.task( 'css', function() {
  gulp.src( src + 'sass/*.scss' )
    .pipe( sass({
      outputStyle: [ 'compressed' ],
      errLogToConsole: true
    }))
    .pipe( prefix() )
    .pipe( gulp.dest( dist + '/css' ) )
    .pipe( livereload( server ) );
});

// minify SVG
gulp.task( 'minifySvg', function() {
  gulp.src( src + 'img/*.svg' )
    .pipe( svgmin() )
    .pipe( gulp.dest( dist + '/img' ) )
    .pipe( livereload( server ) );
});

// minify raster images
gulp.task( 'minifyImg', function() {
  gulp.src( [ src + 'img/*.png', src + 'img/*.gif', src + 'img/*.jpg' ] )
    .pipe( imagemin() )
    .pipe( gulp.dest( dist + '/img' ) )
    .pipe( livereload( server ) );
});

// clean /dist for build task
gulp.task( 'clean', function() {
  return gulp.src( dist, { read: false } )
    .pipe( clean() );
}); 

// build all assets
gulp.task( 'build', function() {
  return gulp.run( 'embedlr','lint', 'minifyJS', 'json', 'css', 'minifySvg', 'minifyImg' );
});

// watch & liveReload
gulp.task( 'watch', function() {
  server.listen( 35729, function ( err ) {
    if ( err ) return console.log( err );

    gulp.watch( src + '*.html', function() {
      gulp.run( 'embedlr' );
    });    

    gulp.watch( [ src + 'js/*.js', './gulpfile.js' ], function() {
      gulp.run( 'lint', 'minifyJS' );
    });

    gulp.watch( src + 'data/*.json', function() {
      gulp.run( 'json' );
    });

    gulp.watch( src + 'sass/*.scss', function() {
      gulp.run( 'css' );
    });

    gulp.watch( [ src + 'img/*.png', src + 'img/*.gif', src + 'img/*.jpg' ], function() {
      gulp.run( 'minifyImg' );
    });  

    gulp.watch( src + 'img/*.svg', function() {
      gulp.run( 'minifySvg', 'minifyImg' );
    });
  });
});

// default task
gulp.task( 'default', function(callback){
  runSequence( 'clean', 'build', ['server', 'watch'], callback );
});