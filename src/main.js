// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import api from './http/index'
import BASE_UTIL from './util/util.js'
Vue.use(api)
Vue.config.productionTip = false
/* eslint-disable no-new */


/* ========================绑定公共方法=================== */
Vue.prototype._u = BASE_UTIL;
/* ==============移除移动端页面点击延迟================ */
// const FastClick = require('fastclick');
// FastClick.attach(document.body);
/* ==============路由前置钩子函数========================== */
router.beforeEach((to, from, next) => {
  // console.log(this.$refs.scrollBox.scrollHeight);
  // 判断是否是子页面返回过来的
  if(from.path == to.meta.prevPage){
    to.meta.isBack = true;
  }else{
    // 不是返回操作
    // 还需要判断是否是同级页面的跳转
    if(!!from.meta.pid&&from.meta.pid == 1){
      to.meta.isBack = true;
    }
    if(!!to.meta.pid&&!!from.meta.pid){
      if(to.meta.pid == from.meta.pid){
        to.meta.isBack = true;
      }
    }
  }
  next();
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
