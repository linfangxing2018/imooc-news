'use strict';
// 获取数据库的引用
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// let list = await db.collection('article').field({
	// 	// true 值返回这个字段，false 表示不返回
	// 	content:false
	// }).get()
	

	
	//返回数据给客户端
	return {
		code: 200,
		masg: '数据请求成功',
		data: list.data
	}
};
