
// router/modules/home.js
const login = [
	{
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
      path: '/pages/login/login',
      name: 'login',
        meta: {
	        title: '登录',
	    },
    },
    {
	    path: '/pages/register/register',
        name: 'register',
        meta: {
	        title: '注册',
	    },
	},
	{
	    path: '/pages/forget/forget',
	    name: 'forget',
	    meta: {
	        title: '忘记密码',
	    },
	},
	
]
export default login