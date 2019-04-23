var MongoClient = require('mongodb').MongoClient;
var url_db = "mongodb://localhost:27017/";


// 数据库添加数据
function add_data(library_name,aggregate,data,callback){
    MongoClient.connect(url_db, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db(library_name);
        // var myobj =  [
        //     { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
        //     { name: 'Google', url: 'https://www.google.com', type: 'en'},
        //     { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
        //    ];
        var myobj = data;
           //insertMany数据库集合插入多条数据
           dbo.collection(aggregate).insertMany(myobj, function(err, res) {
            if (err) throw err;
            callback(res.ops[0]);
            console.log("插入的文档数量为: " + res.insertedCount);
            db.close();
        });
    });
}

// 数据库某集合所有数据查询
function find_all(library_name,aggregate,callback){
    MongoClient.connect(url_db, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;

          var dbo = db.db(library_name);

          //查所有
          dbo.collection(aggregate). find({}).toArray(function(err, result) { // 返回集合中所有数据

          // 查指定条件
          //var whereStr = {"url":'https://www.google.com'};  // 查询条件
          //dbo.collection("prize").insertOne(whereStr)
          //dbo.collection("site").find(whereStr).toArray(function(err, result) {

          if (err) throw err;
          callback(result)
          db.close();
      });
  });
}

// 指定条件查询
function find_some(library_name,aggregate,claim,callback){
    MongoClient.connect(url_db, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;

          var dbo = db.db(library_name);


          // 查指定条件
          //var whereStr = {"url":'https://www.google.com'};  // 查询条件

          var whereStr = claim;

          dbo.collection(aggregate).find(whereStr).toArray(function(err, result) {

          if (err) throw err;
          callback(result)
          db.close();
      });
  });
}


module.exports = {
    add_data,
    find_all,
    find_some,
}