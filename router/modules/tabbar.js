// router/modules/home.js
const tabbar = [{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/index/index',
		aliasPath: '/', //对于h5端你必须在首页加上aliasPath并设置为/
		name: 'index',
		meta: {
			title: '首页',
		},
	},
	{
		path: '/pages/pledge/pledge',
		name: 'pledge',
		meta: {
			title: '质押',
		},
	},

	{
		path: '/pages/mining/mining',
		name: 'mall',
		meta: {
			title: '矿机',
		},
	}, 
	{
		path: '/pages/my/my',
		name: 'my',
		meta: {
			title: '我的',
		},
	},
]
export default tabbar
