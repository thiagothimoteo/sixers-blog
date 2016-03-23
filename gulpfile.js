var gulp = require('gulp');
var yaml = require('json2yaml');
var http = require('http');
var fs = require('fs');
var gravatar = require('gravatar');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();

// Get comments form Poole
gulp.task("comments", function() {
  
  var options = {
    hostname: 'pooleapp.com',
    port: 80,
    path: '/data/293bba1a-0eb1-4908-ac5d-1c8b5f33f311.json',
    method: 'GET'
  };

  http.get(options, function(res) {
    var body = '';
    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function() {
      var comments = JSON.parse(body);

      // add gravatar image links if available
      for (var i = 0; i < comments.sessions.length; i++) {
        comments.sessions[i].avatar = gravatar.url(comments.sessions[i].email, {s: '50', r: 'pg', d: '404'});
      }

      // convert the json to yaml and save it for jekyll to use.
      var ymlText = yaml.stringify(comments);
      fs.writeFile('./src/_data/comments.yml', ymlText, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("Comments data saved.");
        }
      });

    });
  }).on('error', function(e) {
    console.log("Got error: ", e);
  });

});

gulp.task('compress', function(){
  return gulp.src('src/js/main.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('src/js'));
});

 gulp.task('build', shell.task(['jekyll build --watch']));

gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: '_site',
    }  
  });
  gulp.watch('_site/**/*.*').on('change', browserSync.reload);
  gulp.watch('src/_data/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['build','serve', 'compress','comments']);