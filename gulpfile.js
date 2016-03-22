var gulp = require('gulp');

// Get comments form Poole
gulp.task("comments", function() {
  
  var options = {
    hostname: 'pooleapp.com',
    port: 80,
    path: '/data/7d93a08c-d347-4d93-93c7-8bbf3e745993.json',
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