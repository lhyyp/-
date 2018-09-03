/**
 * Created by chaozhou on 2015/9/18.
 */
var mysql = require('mysql');
var constclass = require('../config/constClass');

var user = constclass.db.user,
    password = constclass.db.password,
    server = constclass.db.server,
    database = constclass.db.database;

/**
 * 默认config对象
 * @type {{user: string, password: string, server: string, database: string, options: {encrypt: boolean}, pool: {min: number, idleTimeoutMillis: number}}}
 */
var config = {
    user: user,
    password: password,
    server: server, // You can use 'localhost\\instance' to connect to named instance
    database: database,
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        useUTC: false
    },
    pool: {
        min: 10,
        max: 100,
        idleTimeoutMillis: 30000
    }
};

var connection = mysql.createConnection(config);
connection.on('error', function (err) {
    console.error(err);
});
connection.connect(function (err) {
    if (err) {
        console.error(err);
    }
});

/**
 * 执行原生Sql
 * @param sql
 * @params 参数对象(可为空，为空表示不加参数)
 * @param callBack(err,recordset)
 */
var querySql = function (sql, params, callBack) {
    var ps = new mysql.PreparedStatement(connection);
    if (params != "") {
        for (var index in params) {
            if (typeof params[index] == "number") {
                ps.input(index, mysql.BigInt);
            } else if (typeof params[index] == "string") {
                ps.input(index, mysql.NVarChar);
            }
        }
    }
    console.log("sql:" + sql);
    ps.prepare(sql, function (err) {
        if (err)
            console.log(err);
        ps.execute(params, function (err, recordset) {
            callBack(err, recordset);
            ps.unprepare(function (err) {
                if (err)
                    console.log(err);
            });
        });
    });

};

/**
 * 带参数查询
 * @param tableName 表名
 * @param topNumber 前topNumber条
 * @param whereSql  whereSql
 * @param params    查询参数对象（可为""，为""表示不加任何参数，如果此项为""，则whereSql必须也为""）
 * @param orderSql  排序Sql（可为""，为""表示不排序）
 * @param callBack
 */
var select = function (Sql, callBack) {
    connection.query(Sql, function (err,data) {
        if (err){
            data={
                status:0,
                msg:err.message
            }
            callBack(data);
        }else{
           callBack(data);
        }
           
     });
};


/**
 * 查询所有
 * @param tableName
 * @param callBack
 */
var selectAll = function (tableName, callBack) {
    var sql = "select * from " + tableName + " ";
    connection.query(sql, function (err,data) {
        if (err){
            console.log(err);
            data={
                status:0,
                msg:err.message
            }
            callBack(data);
        }else{
           callBack(data);
        }
           
     });
};

/**
 * 添加
 * @param addObj    添加对象（必填）
 * @param tableName 表名
 * @param callBack(err,recordset)
 */
var add = function (Sql,callBack) {      //{id:3,userName:'admin'...}        insert into dbo.tags(id,name) values(@id,@name)
   connection.query(Sql, function (err,data) {
        if (err){
            data={
                status:0,
                msg:err.message
            }
            callBack(null,data);
        }else{
           callBack(null,data);
        }
           
     });
    
};

/**
 * 修改
 * @param updateObj     修改内容（必填）
 * @param whereObj      修改对象（必填）
 * @param tableName     表名
 * @param callBack(err,recordset)
 */
var update = function (updateObj, whereObj, tableName, callBack) {
    var ps = new mysql.PreparedStatement(connection);
    var sql = "update " + tableName + " set ";
    if (updateObj != "") {
        for (var index in updateObj) {
            if (typeof updateObj[index] == "number") {
                ps.input(index, mysql.BigInt);
            } else if (typeof updateObj[index] == "string") {
                ps.input(index, mysql.NVarChar);
            } else if (typeof updateObj[index] == "object") {
                ps.input(index, mysql.DateTime);
            }
            sql += index + "=@" + index + ",";
        }
        sql = sql.substr(0, sql.length - 1) + " where ";
    }
    if (whereObj != "") {
        for (var index in whereObj) {
            if (typeof whereObj[index] == "number") {
                ps.input(index, mysql.BigInt);
            } else if (typeof whereObj[index] == "string") {
                ps.input(index, mysql.NVarChar);
            } else if (typeof whereObj[index] == "object") {
                ps.input(index, mysql.DateTime);
            }
            sql += index + "=@" + index + ",";
        }
    }
    sql = sql.substr(0, sql.length - 1);
    var whereStr = JSON.stringify(whereObj);
    var updateStr = JSON.stringify(updateObj);
    whereObj = JSON.parse(updateStr.substr(0, updateStr.length - 1) + "," + whereStr.substr(1, whereStr.length));
    console.log(sql);
    ps.prepare(sql, function (err) {
        if (err)
            console.log(err);
        ps.execute(whereObj, function (err, recordset) {
            callBack(err, recordset);
            ps.unprepare(function (err) {
                if (err)
                    console.log(err);
            });
        });
    });
};

/**
 * 删除
 * @param deleteObj 删除对象
 * @param tableName 表名
 * @param callBack(err,recordset)
 */
var del = function (whereSql, params, tableName, callBack) {
    var ps = new mysql.PreparedStatement(connection);
    var sql = "delete from " + tableName + " ";
    if (params != "") {
        for (var index in params) {
            if (typeof params[index] == "number") {
                ps.input(index, mysql.BigInt);
            } else if (typeof params[index] == "string") {
                ps.input(index, mysql.NVarChar);
            }
        }
    }
    sql += whereSql;
    console.log("sql:" + sql);
    ps.prepare(sql, function (err) {
        if (err)
            console.log(err);
        ps.execute(params, function (err, recordset) {
            callBack(err, recordset);
            ps.unprepare(function (err) {        //回收连接至连接池
                if (err)
                    console.log(err);
            });
        });
    });
};

var doSomething=function(cb){
    var num= Math.random()
    cb(null, num);

}
//exports.initConfig = initConfig;
exports.config = config;
exports.del = del;
exports.select = select;
exports.update = update;
exports.querySql = querySql;
exports.selectAll = selectAll;
exports.add = add;
exports.doSomething = doSomething;