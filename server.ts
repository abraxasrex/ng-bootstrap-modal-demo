
// typescript declarations for built in node variables
declare var __dirname;
declare var process;

// import dependencies
import * as express from 'express';
import * as morgan from 'morgan';

// create app instance
let app = express();

// takes at least one arg, optionally takes a second, which is a path

// use public folder
app.use(express.static(__dirname + '/src'));

// use console logging
app.use(morgan('dev'));

// listen for 'get' verbs on all paths
app.get('*', function(req, res){
  // sending files
  res.sendFile('./src/index.html');
  // send 1. files, 2. data, 3. statuses
  /// res (response) for express is like return but *stricter*
  // in that your request will hang if you don't say something back!
});
// process.env could be a computer, web server .... ?
let port = process.env.PORT || 3000;
app.listen(port);

console.log('Hello world, listening on port: ', port);
