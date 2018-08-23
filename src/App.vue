<template>
  <div class="container_100">
    <keep-alive>
      <router-view v-if="!!$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件，比如 首页、列表页 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!!!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 支付页面、登录页面、注册页面 -->
    </router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'slider',
    }
  }
}
</script>
</template>
