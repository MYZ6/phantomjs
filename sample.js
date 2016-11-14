var casper = require('casper').create({
    pageSettings: {
        proxy: 'http://localhost:8580',
        customHeaders: {
            "Accept-Language": "en"
                // 'Accept-Language': 'en-US,en'
                // 'Accept-Encoding': 'identity'
        }
    },
    verbose: true,
    logLevel: 'debug'
});

// http://phantomjs.org/api/phantom/handler/on-error.html
phantom.onError = function (msg, trace) {
    var msgStack = ['PHANTOM ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function (t) {
            msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function+')' : ''));
        });
    }
    console.error(msgStack.join('\n'));
    phantom.exit(1);
};

// http://docs.casperjs.org/en/latest/events-filters.html#remote-message
casper.on("remote.message", function (msg) {
    this.echo("Console: " + msg);
});

// http://docs.casperjs.org/en/latest/events-filters.html#page-error
casper.on("page.error", function (msg, trace) {
    this.echo("Error: " + msg);
    // maybe make it a little fancier with the code from the PhantomJS equivalent
});

// http://docs.casperjs.org/en/latest/events-filters.html#resource-error
casper.on("resource.error", function (resourceError) {
    // this.echo("ResourceError: " + JSON.stringify(resourceError, undefined, 4));
});

// http://docs.casperjs.org/en/latest/events-filters.html#page-initialized
casper.on("page.initialized", function (page) {
    // CasperJS doesn't provide `onResourceTimeout`, so it must be set through 
    // the PhantomJS means. This is only possible when the page is initialized
    page.onResourceTimeout = function (request) {
        console.log('Response Timeout (#' + request.id + '): ' + JSON.stringify(request));
    };
});

var targetUrl = 'https://www.youtube.com/watch?v=wDBb2_I-oC4';
casper.options.onResourceRequested = function (casper, requestData, request) {
    // If any of these strings are found in the requested resource's URL, skip
    // this request. These are not required for running tests.
    //   var skip = [
    //     'googleads.g.doubleclick.net',
    //     'cm.g.doubleclick.net',
    //     'www.googleadservices.com'
    //   ];

    //   skip.forEach(function(needle) {
    var includeArr = ['https://www.youtube.com/watch?v=', 'spf-vflPOYbbj/spf.js'];
    var include = false;
    for (var i = 0; i < includeArr.length; i++) {
        var url = includeArr[i];

        if (requestData.url.indexOf(url) > -1) {
            include = true;
            break;
        }
    }
    if (!include) {
        console.log(requestData.url);
        request.abort();
    }
    //   })
};





casper.log('this is a debug message', 'debug');
// casper.page.customHeaders = {
//     'Accept-Language': 'en-US,en'
// };

phantom.outputEncoding = "gbk";

// page.onConsoleMessage = function (msg) {
//     console.log('Page title is ' + msg);
// };
// casper.start('http://casperjs.org/', function() {
//     this.echo(this.getTitle());
// });
// casper.start('https://www.youtube.com/watch?v=wDBb2_I-oC4', function () {
//     // this.page.customHeaders = {
//     // 	"Accept-Language": "en"
//     // };
//     console.log(89)
//     casper.page.customHeaders = {
//         "Accept-Language": "en"
//     }; // set headers

//     console.log(98)

//     this.echo(this.getTitle());
// });

casper.start().then(function () {
    console.log(89)
    casper.page.customHeaders = {
        // "Accept-Language": "en"
    }; // set headers
    console.log(98)
    this.thenOpen(targetUrl, {
        method: 'get',
        headers: {
            "Accept-Language": "en"
                // 'Accept-Encoding': 'identity'
        }
    });
    casper.run(function () {
        console.log(598)
        this.echo(this.getTitle());
    });

    // this.open('https://www.youtube.com/watch?v=QEzlsjAqADA', {
    //     method: 'get',
    //     headers: {
    //         // 'Accept-Encoding': 'identity'
    //     }
    // });

    // this.thenOpen('https://www.youtube.com/watch?v=QEzlsjAqADA', {
    //     method: 'get',
    //     headers: {
    //         // 'Accept-Encoding': 'identity'
    //     }
    // });
    // casper.run(function () {
    //     console.log(598)
    //     this.echo(this.getTitle());
    // });


    // this.echo(this.getTitle());
    console.log(498)
});
console.log(345)

// casper.thenOpen('http://phantomjs.org', function() {
//     this.echo(this.getTitle());
// });

casper.run();