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
  }],
  // 天干
  tiangan:[
    {
      name:'甲',
      pinyin:"jiǎ",
      xiangfa:"像草木破土而萌，阳在内而被阴包裹。",
      is_yang:true,
      code:'1',
    },
    {
      name:'乙',
      pinyin:"yǐ",
      xiangfa:"草木初生，枝叶柔软屈曲。",
      is_yang:false,
      code:'1',
    },
    {
      name:'丙',
      pinyin:"bǐng",
      xiangfa:"炳也，如赫赫太阳，炎炎火光，万物皆炳燃着，见而光明。",
      is_yang:true,
      code:'1',
    },
    {
      name:'丁',
      pinyin:"dīng",
      xiangfa:"草木成长壮实，好比人的成丁。",
      is_yang:false,
      code:'1',
    },

    {
      name:'戊',
      pinyin:"wù",
      xiangfa:"茂盛也，象征大地草木茂盛繁荣。",
      is_yang:true,
      code:'1',
    },
    {
      name:'己',
      pinyin:"jǐ",
      xiangfa:"起也，纪也，万物抑屈而起，有形可纪。",
      is_yang:false,
      code:'1',
    },
    {
      name:'庚',
      pinyin:"gēng",
      xiangfa:"更也，秋收而待来春。",
      is_yang:true,
      code:'1',
    },
    {
      name:'辛',
      pinyin:"xīn",
      xiangfa:"金味辛，物成而后有味，辛者，新也，万物肃然更改，秀实新成。",
      is_yang:false,
      code:'1',
    },
    {
      name:'壬',
      pinyin:"gēng",
      xiangfa:"妊也，阳气潜伏地中，万物怀妊。",
      is_yang:true,
      code:'1',
    },
    {
      name:'癸',
      pinyin:"guǐ",
      xiangfa:"揆也，万物闭藏，怀妊地下，揆然萌芽。",
      is_yang:false,
      code:'1',
    },
  ],
  // 地支
  dizhi:[
    {
      name:'子',
      pinyin:"zǐ",
      shengxiao:"鼠",
      xiangfa:"孳也，阳气始萌，孳生于下也。",
      is_yang:true,
      code:'1',
    },
    {
      name:'丑',
      pinyin:"chǒu",
      shengxiao:"牛",
      xiangfa:"纽也，寒气自屈曲也。",
      is_yang:false,
      code:'1',
    },
    {
      name:'寅',
      pinyin:"yín",
      shengxiao:"虎",
      xiangfa:"演也，津也，寒土中屈曲的草木，迎着春阳从地面伸展。",
      is_yang:true,
      code:'1',
    },
    {
      name:'卯',
      pinyin:"mǎo",
      shengxiao:"兔",
      xiangfa:"茂也，日照东方，万物滋茂。",
      is_yang:false,
      code:'1',
    },

    {
      name:'辰',
      pinyin:"chén",
      shengxiao:"龙",
      xiangfa:"震也，伸也，万物震起而生，阳气生发已经过半。",
      is_yang:true,
      code:'1',
    },
    {
      name:'巳',
      pinyin:"sì",
      shengxiao:"蛇",
      xiangfa:"巳也，阳气毕布已矣。",
      is_yang:false,
      code:'1',
    },
    {
      name:'午',
      pinyin:"wǔ",
      shengxiao:"马",
      xiangfa:"仵也，万物丰满长大，阴阳交相愕而仵，阳气充盛，阴气开始萌生。",
      is_yang:true,
      code:'1',
    },
    {
      name:'未',
      pinyin:"wèi",
      shengxiao:"羊",
      xiangfa:"眛也，日中则昃，阳向幽也。",
      is_yang:false,
      code:'1',
    },
    {
      name:'申',
      pinyin:"shēn",
      shengxiao:"猴",
      xiangfa:"伸束以成，万物之体皆成也。",
      is_yang:true,
      code:'1',
    },
    {
      name:'酉',
      pinyin:"yǒu",
      shengxiao:"鸡",
      xiangfa:"就也，万物成熟。",
      is_yang:false,
      code:'1',
    },
    {
      name:'戌',
      pinyin:"xū",
      shengxiao:"狗",
      xiangfa:"灭也，万物灭尽。",
      is_yang:true,
      code:'1',
    },
    {
      name:'亥',
      pinyin:"hài",
      shengxiao:"猪",
      xiangfa:"核也，万物收藏，皆坚核也。",
      is_yang:false,
      code:'1',
    },
  ]
}