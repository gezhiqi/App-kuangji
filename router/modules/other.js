
// router/modules/home.js
const other = [
	{
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
      path: '/pages/pledge/pledge-my',
      name: 'pledgeMy',
        meta: {
	        title: '我的质押',
	    },
    },
	{
	  path: '/pages/mining/mining-my',
	  name: 'miningMy',
	    meta: {
	        title: '我的矿机',
	    },
	},
	{
	  path: '/pages/my/my-buy',
	  name: 'myBuy',
	    meta: {
	        title: '我的矿机',
	    },
	},
	{
	  path: '/pages/my/my-sell',
	  name: 'mySell',
	    meta: {
	        title: '我的矿机',
	    },
	},
	{
	  path: '/pages/my/my-real-name',
	  name: 'realName',
	    meta: {
	        title: '实名认证',
	    },
	},
	{
	  path: '/pages/my/my-payinfo',
	  name: 'payInfo',
	    meta: {
	        title: '收款信息',
	    },
	},
	
]
export default other