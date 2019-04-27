const {Rule,Sequelize} = require('../models/permission/Rule')
const validator = require('validator')
const md5 =  require('md5')
const uuidv4 =  require('uuid/v4')

Rule.belongsTo(Rule,{ as:'father', foreignKey: 'parent_id', constraints: false})

module.exports =  class RuleController {
  
  // 获取根分类
  static async ruleCate(ctx, next){
    const data = await Rule.findAndCountAll({
      attributes: {
        exclude: ['path', 'parent_id']
      },
      where: {
        parent_id: 0
      }
    })

    ctx.body = {
      code: 20000,
      message: '成功',
      data: {
        items: data.rows,
        total: data.count
      }
    }
  }

  // 获取列表
  static async list(ctx, next){
    const page = ctx.query.page || 1
    const limit = ctx.query.limit || 20
    const  { name = '', path = '', parent_id = 0, sort = '+sort' } = ctx.query
    const orders = sort.split(',')
    const orderby = []
    for(let sortItem of orders){
       orderby.push([Sequelize.col(sortItem.substring(1)),sortItem.startsWith('+') ? 'ASC':'DESC'])
    }

    const where = {
      is_delete: false,
      name: {
        [Sequelize.Op.like]: `%${ name }%`,
      },
      path: {
        [Sequelize.Op.or]:{
          [Sequelize.Op.like]: `%${ path }%`,
          [Sequelize.Op.eq]: null
        }
        
      },
    }

    if(parent_id > 0){
      where.sort = parent_id
    }

    //  查询
    const data = await Rule.findAndCountAll({
      attributes:{
        exclude: ['is_delete']
      },
      include: [
        {
          model: Rule,
          as: 'father'
        }
      ],
      where:where,
      order:orderby,
      offset: ((page-1) * limit)+0,
      limit: parseInt(limit)
    })

    ctx.body = {
      code: 20000,
      message: '获取成功',
      data: {
        items:data.rows,
        total:data.count
      }
    }
  }

  // 创建管理员
  static async create(ctx, next){
    const  data =  ctx.request.body
    delete data.id
    
    // 创建
    const result = await Rule.create({
      ...data,
      sort:data.parent_id
    })

    // 更新分类
    if(data.parent_id == 0){
      await Rule.update({
        sort: result.id
      },{
        where:{
          id: result.id
        }
      })
    }

    ctx.body = {
      code:20000,
      message: '创建成功',
      data: {
        id: result.id
      }
    }
  }

  // 修改管理员
  static async update(ctx, next){
    const data =  ctx.request.body
    if (data.parent_id != 0){
      const count = await Rule.count({
        where: {
          sort: data.id
        }
      })
      if (count > 1) {
        ctx.body = {
          code: 5000,
          message:'无法修改所属分类，此分类下存在权限'
        }
        return
      }
    }else{
      data.path = null
    }
    delete data.is_delete
    delete data.createAt
    delete data.role_id
    delete data.role_key
    delete data.token
    delete data.avatar
    const id = data.id
    delete data.id

    data.updatedAt = new Date()
    // 修改数据
    await Rule.update({
      ...data,
      sort: data.parent_id
    },{
      where: {
        id:id
      }
    })

    ctx.body = {
      code:20000,
      message:'修改成功'
    }
  }
}