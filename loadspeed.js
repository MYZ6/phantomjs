var page = require('webpage').create(),
  system = require('system'),
  t, address;

if (system.args.length === 1) {
  console.log('Usage: loadspeed.js <some URL>');
  phantom.exit();
}

page.settings.resourceTimeout = 30000; //in milliseconds
page.customHeaders = {
  "Accept-Language": "en"
};

var includeArr = ['https://www.youtube.com/watch?v=', 'spf-vflPOYbbj/spf.js25'];

page.onResourceRequested = function (req) {
  // console.log('requested: ' + JSON.stringify(req, undefined, 4));
  var include = false;
  for (var i = 0; i < includeArr.length; i++) {
    var url = includeArr[i];

    if (req.url.indexOf(url) > -1) {
      include = true;
      break;
    }
  }
  if (!include) {
    console.log(req.url);
    req.abort();
  }
};

page.onResourceReceived = function (res) {
  // console.log('received: ' + JSON.stringify(res, undefined, 4));
};

page.onConsoleMessage = function (msg) {
  console.log(msg);
};

t = Date.now();
address = system.args[1];


phantom.outputEncoding = "gbk";
// page.customHeaders = {
//   "Accept-Language": "en"
// };
var finished = [false, false];
page.open(address, function (status) {
  if (status !== 'success') {
    console.log('FAIL to load the address');
  } else {
    t = Date.now() - t;
    console.log('Loading ' + system.args[1]);
    console.log('Loading time ' + t + ' msec');

    t = Date.now();
    var title = page.evaluate(function () {
      console.log(yt.config_.TTS_URL.length);
      return document.title;
    });
    console.log('Page title is ' + JSON.stringify(title));

    t = Date.now() - t;
    console.log('Processing time ' + t + ' msec');
  }
  finished[0] = true;

  phantom.exit();
});

// var address2 = 'https://www.youtube.com/watch?v=QEzlsjAqADA';
// page.open(address2, function (status) {
//   if (status !== 'success') {
//     console.log('FAIL to load the address');
//   } else {
//     t = Date.now() - t;
//     console.log('Loading ' + address2);
//     console.log('Loading time ' + t + ' msec');

//     t = Date.now();
//     var title = page.evaluate(function () {
//       console.log(yt.config_.TTS_URL.length);
//       return document.title;
//     });
//     console.log('Page title is ' + JSON.stringify(title));

//     t = Date.now() - t;
//     console.log('Processing time ' + t + ' msec');
//     try {
//       console.log(yt.config_.TTS_URL.length);
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   finished[1] = true;
// });
var interval = setInterval(function () {
  if (finished[0] && finished[1]) {
    phantom.exit();
  } else {
    console.log(finished);
  }
}, 3000);