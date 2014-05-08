var     gulp = require( 'gulp' ),
        path = require( 'path' ),
          lr = require( 'tiny-lr' ),
  livereload = require( 'gulp-livereload' ),
      server = lr(),
     connect = require( 'connect' ),
        sass = require( 'gulp-sass' ),
      prefix = require( 'gulp-autoprefixer' ),
    imagemin = require( 'gulp-imagemin' ),
   inlineCss = require( 'gulp-inline-css' ),
       clean = require( 'gulp-clean' );

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

// copy html
gulp.task( 'html', function() {
  gulp.src( src + 'index.html' )
    .pipe( gulp.dest ( dist ) )
    .pipe( livereload( server ) );
});

// complie sass & add vendor prefixes
gulp.task( 'css', function() {
  gulp.src( src + 'sass/*.scss' )
    .pipe( sass({
      outputStyle: [ 'expanded' ],
      errLogToConsole: true
    }))
    .pipe( prefix() )
    .pipe( gulp.dest( src ) )
    .pipe( gulp.dest( dist ) )
    .pipe( livereload( server ) );
});

// minify raster images
gulp.task( 'imgs', function() {
  gulp.src( [ src + 'img/*.png', src + 'img/*.gif', src + 'img/*.jpg' ] )
    .pipe( imagemin() )
    .pipe( gulp.dest( dist + '/img' ) )
    .pipe( livereload( server ) );
});

// inline css
gulp.task( 'inliner', function() {
  return gulp.src( src + 'index.html' )
    .pipe( inlineCss() )
    .pipe( gulp.dest ( dist ) );
});

// delete dist styles.css
gulp.task( 'deleteCss', function() {
  gulp.src( 'styles.css', { read: false })
    .pipe( clean() );
});

// watch & liveReload
gulp.task( 'watch', function() {

  server.listen( 35729, function ( err ) {
    if ( err ) return console.log( err );

    gulp.watch( src + 'index.html', function() {
      gulp.run( 'html' );
    });

    gulp.watch( src + 'sass/*.scss', function() {
      gulp.run( 'css' );
    });

    gulp.watch( [ src + 'img/*.png', src + 'img/*.gif', src + 'img/*.jpg' ], function() {
      gulp.run( 'imgs' );
    });

  });

});

// build assets - only needed once
gulp.task( 'build', function() {
  gulp.run( 'html', 'css', 'imgs' );
});

// production task - run when your ready to deploy
gulp.task( 'prod', function() {
  gulp.run( 'inliner', 'deleteCss' );
});

// development task
gulp.task( 'default', function(callback){
  gulp.run( 'server', 'watch' );
});