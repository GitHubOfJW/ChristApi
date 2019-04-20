module.exports = {
  sessionConfig:{
    key: 'koa:sess',   //cookie key (default is koa:sess)
    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
  },
  dbConfig:{
    host:'localhost', // 位置
    dialect:'mysql', // 数据库 mysql 
    port:'3306',
    dbName:'christ', // 数据库名称
    username:'root', // 数据库账号
    password:'zhu45683968', // 密码
    pool:{
      max:10,
      min:5,
      idle:1000
    },
  }
}