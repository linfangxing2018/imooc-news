'use strict';
// 获取数据库的引用
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		page = 1,
		pageSize = 10,
		name
	} = event
	// 添加了全部字段
	let matchObj = {}
	if (name !== '全部') {
		matchObj =  {
			classify: name
		}
	}
	//event为客户端上传的参数
	console.log('event : ', event)
	// let list = await db.collection('article').field({
	// 	// true 值返回这个字段，false 表示不返回
	// 	content:false
	// }).get()
	
	// 聚合： 更精细化的去处理数据 求和 、分组、指定那些字段
    let list = await db.collection('article').aggregate()
	.match(matchObj)
	// 要跳过多少数据
	.skip(pageSize * (page - 1))
	.limit(pageSize)
	.end()

	
	//返回数据给客户端
	return {
		code: 200,
		masg: '数据请求成功',
		data: list.data
	}
};
