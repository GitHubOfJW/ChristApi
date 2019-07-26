const { questions } = require('../configs/meta')
module.exports = class QuestionController {
  
  // 常见问题
  static async list (ctx, next) {
    ctx.body = {
      code: 20000,
      data: {
        items: questions,
        total: questions.length
      }
    }
  }
}