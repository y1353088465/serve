var http = require("http");
var url = require('url');
var fs = require('fs');


function onRequest(request, response){
  if(request.url ==="/favicon.ico")
  return false;
  var params = url.parse(request.url, true).query;

  console.log("收到客户端"+request.method+"请求");
  response.writeHead(200,{"Content-type":"text/html;charset=UTF-8"})
  //response.writeHead(200,{"Content-Type":'application/json','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});//可以解决跨域的请求
  //response.writeHead(200,{"Content-Type":'application/json','charset':'utf-8','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
  resFn(response)
  
}


function resFn(response){
    let data = fs.readFileSync('index.html',"utf-8");

    response.end(data);

    // fs.readFile("./index.html",(err,data)=>{
    //     if (err){
    //         console.log(err);
    //     }else{
    //         response.end(data);
    //     }
    // });
}

http.createServer(onRequest).listen(8080);
console.log("Server has started.port on 1100");
