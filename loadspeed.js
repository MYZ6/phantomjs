var page = require('webpage').create(),
  system = require('system'),
  t, address;

if (system.args.length === 1) {
  console.log('Usage: loadspeed.js <some URL>');
  phantom.exit();
}

page.settings.resourceTimeout = 30000; //in milliseconds
page.onResourceRequested = function (req) {
    // console.log('requested: ' + JSON.stringify(req, undefined, 4));
};

page.onResourceReceived = function (res) {
    // console.log('received: ' + JSON.stringify(res, undefined, 4));
};

t = Date.now();
address = system.args[1];


phantom.outputEncoding = "gbk";
// page.customHeaders = {
//   "Accept-Language": "en"
// };
page.open(address, function (status) {
  if (status !== 'success') {
    console.log('FAIL to load the address');
  } else {
    t = Date.now() - t;
    console.log('Loading ' + system.args[1]);
    console.log('Loading time ' + t + ' msec');

    t = Date.now();
    var title = page.evaluate(function () {
      return document.title;
    });
    console.log('Page title is ' + JSON.stringify(title));

    t = Date.now() - t;
    console.log('Processing time ' + t + ' msec');
  }
  phantom.exit();
});