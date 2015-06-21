var ghost = require('ghost'),
    path = require('path'),
    express = require('express'),
    redirects = express();

redirects.all('/blog/*', function(req, res) {
  var newpath = req.path.replace(/^(\/blog)/,"");
  res.redirect(301, newpath);
});

ghost({
  config: path.join(__dirname, 'config.js')
}).then(function (ghostServer) {
    redirects.use(ghostServer.config.paths.subdir, ghostServer.rootApp);

    ghostServer.start(redirects);
});
