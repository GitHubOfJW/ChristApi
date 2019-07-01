const { domain } = require('../config')
module.exports = {
  miniTopMenu: [{
    imgSrc: domain + '/images/qrcode.png',
    title: '扫码分享',
    type: 'wxacode',
    content: ''
  },{
    imgSrc:  domain + '/images/awared.png',
    title: '打赏声明',
    type: 'prompt',
    content: '本人也是一名基督徒，为了给各位弟兄姊妹提供方便，利用业余时间开发了这款程序，由于本程序也花费了不少精力和一些成本，如果帮到了您，希望您能给点打赏！'
  },{
    imgSrc: domain + '/images/mzsm.png',
    title: '免责声明',
    type: 'prompt',
    content: '本程序中的许多资源都是来自网络，如若侵犯了您的版权，还请通知下线，本程序中的任何资源不做任何商业用途！'
  }]
}