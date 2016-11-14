var page = require('webpage').create();

var uagent = 'Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:45.0) Gecko/20100101 Firefox/45.0';
page.settings.userAgent = uagent;
phantom.outputEncoding = "gbk";
page.customHeaders = {
  "Accept-Language": "en"
};
page.onConsoleMessage = function (msg) {
  console.log(msg);
};
page.open('https://www.baidu.com/', function (status) {
  console.log("Status: " + status);
  if (status === "success") {
    // page.render('example.png');
    // page.evaluate(function() {
    console.log(document.title);
    // });
    console.log('你好');
  }
  phantom.exit();
});

console.log('你好2');