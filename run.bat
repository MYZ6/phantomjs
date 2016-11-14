:: phantomjs loadspeed.js https://www.baidu.com/ --proxy=127.0.0.1:8580
:: phantomjs --proxy=127.0.0.1:8580 loadspeed.js https://www.google.com/
:: phantomjs --proxy=127.0.0.1:8580 loadspeed.js https://www.youtube.com/watch?v=wDBb2_I-oC4
:: phantomjs --proxy=127.0.0.1:8580 --output-encoding=utf8 evaluate.js https://www.youtube.com/watch?v=wDBb2_I-oC4
:: PATH=%PATH%;E:\tools\webtesting\phantomjs-2.1.1-windows\bin;E:\tools\webtesting\casperjs-1.1.3\bin;
phantomjs --output-encoding=utf8 evaluate.js
:: phantomjs --remote-debugger-port=9000 --remote-debugger-autorun=yes loadspeed.js https://www.baidu.com/
:: phantomjs loadspeed.js https://www.baidu.com/
:: phantomjs --output-encoding=gb2312 app.js