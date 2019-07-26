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
    content: '本程序纯属为了给信奉基督的弟兄姊妹们提供方便，完全免费，如果帮到了您，希望您能推荐给身边的弟兄姊妹，也可打赏一二，以资鼓励！'
  },{
    imgSrc: domain + '/images/mzsm.png',
    title: '加入我们',
    type: 'prompt',
    content: '加入我们，将耶稣基督的福音传到每一个弟兄姊妹的手中。您可以通过联系客服的形式，加入到我们的集体中！'
  },
  // {
  //   imgSrc: domain + '/images/mzsm.png',
  //   title: '免责声明',
  //   type: 'prompt',
  //   content: '本程序中的部分资源也是来自网络，如若侵犯了您的版权，还请通知下线，本程序中的任何资源不做任何商业用途！'
  // }
  ],
  questions: [{
    question: '为什么播放的时候听不到声音？',
    answer: '如果点击某首歌曲播放时听不到声音，可能是声音太小，可以通过点击设备的音量键加大音量。'
  }, {
    question: '歌曲播放的时候可以看歌词么？',
    answer: '正在播放的歌曲会在页面的顶部显示，点击顶部的歌曲条，会跳到歌词页面查看歌词。部分音频可能没有歌词，还请谅解'
  }, {
    question: '可以跳到指定的歌曲么？',
    answer: '专辑页面提供根据歌曲序号选歌的功能，点击序号选歌，滑动选择歌曲，点击确定后会跳到指定歌曲附近'
  },{
      question: '为什么有的歌曲没有歌词？',
      answer: '动态歌词正在不断的更新完善中，希望各位朋友耐心等待，目前是按照顺序添加，您也可以通过联系客服的形式，让客服提前添加。'
  }]
}