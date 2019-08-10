const isProduction = true
if (isProduction) {
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
      host:'101.37.159.71', // 位置
      dialect:'mysql', // 数据库 mysql 
      port:'3306',
      dbName:'christ', // 数据库名称
      username:'christ', // 数据库账号
      password:'kbny7sEJkXpY8JsF', // 密码
      pool:{
        max:10,
        min:5,
        idle:1000
      },
    },
    domain: 'https://api.banbeigeng.com',
    appInfo: {
      appid: 'wx92589ad7fbbc7bf7',
      secret: 'ac5e5b85b574277aa00e7a80754e4835'
    },
    appInfo1: {
      appid: 'wxfa352bce6edffea1',
      secret: '74c4163714ac819167efa3eac248277e'
    }
  }
} else  {
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
    },
    domain: 'http://192.168.2.102:3000',
    appInfo: {
      appid: 'wx92589ad7fbbc7bf7',
      secret: 'ac5e5b85b574277aa00e7a80754e4835'
    },
    appInfo1: {
      appid: 'wxfa352bce6edffea1',
      secret: '74c4163714ac819167efa3eac248277e'
    }
  }
}