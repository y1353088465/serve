
var ws = require("nodejs-websocket");
var db = require("../db/mongod")

var server = ws.createServer(function(conn){

        console.log("新链接1")

    conn.on("text", function (str) {
        console.log("收到的信息为:"+str)

        let uses_info = JSON.parse(str)
        let arr = [];
        let obj = {
            name:uses_info.user_name,
            text:uses_info.inp_msg
        }
        console.log(obj)

        arr.push(obj)
        if(JSON.parse(str).inp_msg !== ''){
            db.add_data("wwx","websocket",arr,function(a){})
        }
        server.connections.forEach(function(conn) {
            conn.sendText(JSON.stringify(obj))
        })
    })
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });

}).listen(8001)
