//express_demo.js 文件
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var app = express();
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080,http://127.0.0.1:8081,http://172.23.200.9:8081");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Access-Token");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.post('/', multipartMiddleware,function (req, res) {
  console.log(req.body)
  res.cookie('isLogin', 1, { expires: new Date(Date.now() + 10000 * 60 * 60 * 24 * 7) });
  res.cookie('kkk', 444, { expires: new Date(Date.now() + 10000 * 60 * 60 * 24 * 7) });
  res.cookie('kkk', 444);
  res.send('Hello World');
})
app.get('/kk', multipartMiddleware,function (req, res) {
  console.log(req.body)
  res.cookie('isLogin', 1, { expires: new Date(Date.now() + 10000 * 60 * 60 * 24 * 7) });
  res.cookie('kkk', 444, { expires: new Date(Date.now() + 10000 * 60 * 60 * 24 * 7) });
  // res.send({"kk":"nn"});
  res.send("hello");
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})