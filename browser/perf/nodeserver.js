const express = require('express');
const https = require('https');
const fs = require('fs');
var path = require('path');
const app = express();

var download = function (url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function () {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function (err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

app.use(express.static('.'));
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/jspon.js', (req, res) => res.sendFile(path.resolve('../jspon.js')), function (err) {
  if (err) {
    console.log(err);
  }
});
app.get('/mock.js', (req, res) => res.sendFile(path.resolve('../tests/mock.js')), function (err) {
  if (err) {
    console.log(err);
  }
});
// app.get('/circular-json.js', (req, res) => res.sendFile(path.resolve('circular-json.js')), function (err) {
//   if (err) {
//     console.log(err);
//   }
// });
// app.get('/cycle.js', (req, res) => res.sendFile(path.resolve('cycle.js')), function (err) {
//   if (err) {
//     console.log(err);
//   }
// });

download('https://raw.githubusercontent.com/douglascrockford/JSON-js/master/cycle.js', "cycle.js");
download('https://raw.githubusercontent.com/WebReflection/circular-json/master/build/circular-json.js', "circular-json.js");

app.listen(3000, () => console.log('Example app listening on port 3000!'));
