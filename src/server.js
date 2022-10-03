var restify = require('restify');
var errors = require('restify-errors');
// Modulo que contiene los errores que luego el servidor capta

var server = restify.createServer();

server.get('/', function(req, res, next) {
  var err = new errors.InternalServerError('not found');
  return next(err);
});


// Cuando el servidor esta funcionando (on) y se produce una excepcion "InternalServer"
// Entonces se triggerea una funcion que devuelve el error en ente caso formateado. 
server.on('InternalServer', function (req, res, err, cb) {
  err.toString = function() {
    return 'an internal server error occurred!';
  };
  err.toJSON = function() {
    return {
      message: 'an internal server error occurred!',
      code: 'error'
    }
  };
  // Async things
  return cb();
});

server.on('restifyError', function (req, res, err, cb) {
  return cb();
});


server.listen(8080);