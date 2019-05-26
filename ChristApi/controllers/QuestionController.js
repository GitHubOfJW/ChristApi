module.exports = class QuestionController {
  
  // 常见问题
  static async list (ctx, next) {

    const questions = [{
      question: '为什么播放的时候听不到声音？',
      answer: '如果点击某首歌曲播放时听不到声音，可能是声音太小，可以通过点击设备的音量键加大音量。'
    }, {
      question: '歌曲播放的时候可以看歌词么？',
      answer: '正在播放的歌曲会在页面的顶部显示，点击顶部的歌曲条，会跳到歌词页面查看歌词。部分音频可能没有歌词，还请谅解'
    }, {
      question: '可以跳到指定的歌曲么？',
      answer: '专辑页面提供根据歌曲序号选歌的功能，通过滑动选择歌曲'
    }]

    ctx.body = {
      code: 20000,
      data: {
        items: questions,
        total: questions.length
      }
    }
  }
}