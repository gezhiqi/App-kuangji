let ua = navigator.userAgent;
var Browser = {
	wechat: ua.indexOf('MicroMessenger') > -1, // 在微信中打开
	weibo: ua.toLowerCase().indexOf('weibo') > -1, // 在新浪微博客户端打开
	qq: ua.indexOf('QQ/') > -1, // 在QQ、QQ空间中打开
	qqbrowser: ua.indexOf('MQQBrowser') > -1, // 在QQ空间打开
	/**
	 * browser的判断
	 * @return {[type]} [description]
	 */
	getBrowserType() {
		var agent = ua.toLowerCase();
		var browserType = '';
		if (agent.indexOf('msie') > 0) {
			browserType = 'IE';
		}
		if (agent.indexOf('firefox') > 0) {
			browserType = 'firefox';
		}
		if (
			agent.indexOf('chrome') > 0 &&
			agent.indexOf('mb2345browser') < 0 &&
			agent.indexOf('360 aphone browser') < 0
		) {
			browserType = 'chrome';
		}
		if (agent.indexOf('360 aphone browser') > 0 || agent.indexOf('qhbrowser') > 0) {
			browserType = '360';
		}
		if (agent.indexOf('ucbrowser') > 0) {
			browserType = 'UC';
		}
		if (agent.indexOf('micromessenger') > 0) {
			browserType = 'WeChat';
		}
		if (
			(agent.indexOf('mqqbrowser') > 0 || agent.indexOf('qq') > 0) &&
			agent.indexOf('micromessenger') < 0
		) {
			browserType = 'QQ';
		}
		if (agent.indexOf('miuibrowser') > 0) {
			browserType = 'MIUI';
		}
		if (agent.indexOf('mb2345browser') > 0) {
			browserType = '2345';
		}
		if (agent.indexOf('sogoumobilebrowser') > 0) {
			browserType = 'sogou';
		}
		if (agent.indexOf('liebaofast') > 0) {
			browserType = 'liebao';
		}
		if (agent.indexOf('weibo') > 0) {
			browserType = 'weibo';
		}
		if (
			agent.indexOf('safari') > 0 &&
			agent.indexOf('chrome') < 0 &&
			agent.indexOf('ucbrowser') < 0 &&
			agent.indexOf('micromessenger') < 0 &&
			agent.indexOf('mqqbrowser') < 0 &&
			agent.indexOf('miuibrowser') < 0 &&
			agent.indexOf('mb2345browser') < 0 &&
			agent.indexOf('sogoumobilebrowser') < 0 &&
			agent.indexOf('liebaofast') < 0 &&
			agent.indexOf('qhbrowser') < 0 &&
			agent.indexOf('weibo') < 0
		) {
			browserType = 'safari';
		}
		return browserType;
	}
};



export {
	Browser,
};
