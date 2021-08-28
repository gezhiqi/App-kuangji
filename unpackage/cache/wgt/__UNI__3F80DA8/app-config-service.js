
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/mining/mining","pages/mining/mining-my","pages/my/my","pages/login/login","pages/register/register","pages/forget/forget","pages/pledge/pledge","pages/pledge/pledge-my","pages/transacte/transacte","pages/my/my-buy","pages/my/my-sell","pages/my/my-real-name","pages/my/my-payinfo","pages/my/my-detail","pages/my/my-invite","pages/index/notice-detail","pages/my/my-newperson","pages/my/my-newperson-detail","pages/index/notice-list","pages/pledge/pledge-rule","pages/transacte/transacte-rule"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#4b5a71","selectedColor":"#3c78fa","backgroundColor":"#150e2d","list":[{"pagePath":"pages/index/index","iconPath":"static/tabbar/index.png","selectedIconPath":"static/tabbar/index-select.png","text":"首页"},{"pagePath":"pages/pledge/pledge","iconPath":"static/tabbar/zhiya.png","selectedIconPath":"static/tabbar/zhiya-select.png","text":"质押"},{"pagePath":"pages/mining/mining","iconPath":"static/tabbar/kuang.png","selectedIconPath":"static/tabbar/kuang-select.png","text":"矿机"},{"pagePath":"pages/transacte/transacte","iconPath":"static/tabbar/jiaoyi.png","selectedIconPath":"static/tabbar/jiaoyi-select.png","text":"交易"},{"pagePath":"pages/my/my","iconPath":"static/tabbar/my.png","selectedIconPath":"static/tabbar/my-select.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"Draw World","compilerVersion":"3.1.22","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/mining/mining","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/mining/mining-my","meta":{},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/forget/forget","meta":{},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/pledge/pledge","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/pledge/pledge-my","meta":{},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/transacte/transacte","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/my/my-buy","meta":{},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/my/my-sell","meta":{},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/my/my-real-name","meta":{},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/my/my-payinfo","meta":{},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/my/my-detail","meta":{},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/my/my-invite","meta":{},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/index/notice-detail","meta":{},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/my/my-newperson","meta":{},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/my/my-newperson-detail","meta":{},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/index/notice-list","meta":{},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":true,"navigationStyle":"custom","titleView":false,"bounce":"none"}},{"path":"/pages/pledge/pledge-rule","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/transacte/transacte-rule","meta":{},"window":{"navigationBarTitleText":"","backgroundColorTop":"#ced3e1","backgroundColorBottom":"#ced3e1","disableScroll":false,"enablePullDownRefresh":false,"navigationStyle":"custom","titleView":false,"bounce":"none"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
