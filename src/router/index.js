import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


/* 其它模块 */
import Login from '@/components/login'
/* 首页模块 */
import HOME from '@/components/home/home'
import HOME_DETAIL from '@/components/home/detail'
/* 购物车模块 */
import SHOP_CAR from '@/components/shopCar/shopCar'
import SHOP_CAR_DETAIL from '@/components/shopCar/shopDetail'
import SHOP_CAR_SUBMIT from '@/components/shopCar/shopSubmit'



/* 其它模块 */
const otherRouter = [
  {
    path: '/login',
    name: 'login',
    title: '登录',
    component: Login,
    meta: {
      pid:1, //层级关系 1是最高级 2是一级  逐步递增
      keepAlive: false, // 此组件需要被缓存
    }
  }
];
/* 首页模块 */
const homeRouter = [
  {
    path: '/home',
    name: 'home',
    title: '首页',
    component: HOME,
    meta: {
      pid:2, //层级关系 1是最高级 2是一级  逐步递增
      keepAlive: true, // 此组件需要被缓存
      isBack: false, // 用于判断是否是返回或者同级页面的进入
      iH:0, // 滚动高度
      prevPage: '/home/detail'
    }
  },
  {
    path: '/home/detail',
    name: 'detail',
    title: '首页详情',
    component: HOME_DETAIL,
    meta: {
      keepAlive: false, // 此组件需要被缓存
    }
  }
];
/* 购物车模块 */
const shopCarRouter = [
  {
    path: '/shopCar',
    name: 'shopCar',
    title: '购物车列表',
    component: SHOP_CAR,
    meta: {
      pid:2, //层级关系 1是最高级 2是一级  逐步递增
      keepAlive: true, // 此组件需要被缓存
      isBack: false, // 用于判断是否是返回或者同级页面的进入
      iH:0, // 滚动高度
      prevPage: '/shopCar/shopDetail'
    }
  },
  {
    path: '/shopCar/shopDetail',
    name: 'shopDetail',
    title: '购物车商品详情',
    component: SHOP_CAR_DETAIL,
    meta: {
      keepAlive: true, // 此组件需要被缓存
      prevPage: '/shopCar/shopSubmit',
      isBack: false, // 用于判断是否是返回或者同级页面的进入
      iH:0, // 滚动高度
    }
  },
  {
    path: '/shopCar/shopSubmit',
    name: 'shopSubmit',
    title: '购物车商品提交',
    component: SHOP_CAR_SUBMIT,
    meta: {
      keepAlive: false, // 此组件需要被缓存
    }
  }
];



export default new Router({
  // mode: 'history', //切换路径模式，变成history模式
  scrollBehavior: () => ({ y: 0 }), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
  routes: [
    ...otherRouter,
    ...homeRouter,
    ...shopCarRouter,
  ]
})

