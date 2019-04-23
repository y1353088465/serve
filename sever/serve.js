var http = require("http");
var url = require('url');
var db = require("./db/mongod")
var jwt = require('jsonwebtoken')

function onRequest(request, response){
  if(request.url!=="/favicon.ico")
  var params = url.parse(request.url, true).query;

  console.log("收到客户端"+request.method+"请求");

  //response.writeHead(200,{"Content-Type":'application/json','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});//可以解决跨域的请求
  response.writeHead(200,{"Content-Type":'application/json','charset':'utf-8','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});

  if(request.url === "/index"){
    // str=fs.readFileSync('data.json');
    db.find_all("goods","login_in",function(a){
      console.log(a)
      resFn(response,a)
    })

  }else if((request.url.split("?"))[0] == "/login_in"){
    let obj = {
      phone:params.phone
    };
    console.log(obj)
    let arr = [];
    arr.push(obj)
    db.find_some("wwx","login_in",obj,function(a){
      console.log(a.length)
      if(a.length == 0){
        db.add_data("wwx","login_in",arr,function(b){
          resFn(response,{data:b,status:true})
          console.log(b)
        })
      }else{
        resFn(response,{data:"此昵称已被占用",status:false})
      }
    })
  }else if((request.url.split("?"))[0] == "/register"){
    console.log(request.url)
    let obj = {
      phone:Number(params.phone),
      token:create_token({phone:params.phone})
    };
    let arr = [];
    arr.push(obj)
    db.add_data("goods","login_in",arr,function(a){

      resFn(response,a)

    })
  }else if((request.url.split("?"))[0] == "/search"){
    let obj = {
      "carCode":params.carCode
    };

    db.find_some("goods","carCode",obj,function(a){

      resFn(response,a)
    })
  }else if(request.url === "/post"){
    var post = '';
    request.on('data', function(chunk){
      post += chunk;
      resFn(response,true)
    });
    console.log("走到了POST接口")
  }
}

http.createServer(onRequest).listen(1100);

console.log("Server has started.port on 1100");


function create_token (obj){
  const token = jwt.sign(
    obj,
    'mryang', //随便一点内容，加密的密文，私钥对应着公钥
    {
        expiresIn: 60 * 9000000000000//到期时间
    }
    )
return token
}


function resFn(response,data){
  let str = {
    data:data,
    code:"success",
    msg:"成功"
  };
  console.log(str)
  response.write(JSON.stringify(str));
  response.end();
}