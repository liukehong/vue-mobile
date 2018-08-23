<style lang="scss" scoped>
.box{
    position: absolute;
    top: 0px;
    bottom: p2r(50px);
    overflow: auto;
    width: 100%;
}
</style>
<template>
    <div class="container_100">
        <div class="box" ref="scrollBox">
            <div style="height: 1000px;">
                购物车商品列表
            </div>
            <input type="text" value=''/>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
    import Footer from '../common/footer.vue'
    export default {
        components:{
            Footer
        },
        data () {
            return {
                isFirstEnter: false, // 是否第一次进入，默认false 
                test: '请求数据',
            }
        },
        methods: {
            fnInit () {
                let vm = this;
                console.log(vm.test);
            },
        },
        activated : function () {
            let vm = this;
            vm._u.fnChangeScroll.call(vm,vm.$refs.scrollBox);
            vm._u.fnNextAndPrev(vm,vm.fnInit);
        },
        created() {
            let vm = this;
            vm.isFirstEnter = true;
            // 只有第一次进入或者刷新页面后才会执行此钩子函数
            // 使用keep-alive后（2+次）进入不会再执行此钩子函数
        },
        beforeRouteLeave (to,from,next) {
            let vm = this;
            let _div = vm.$refs.scrollBox;
            let _num = _div.scrollTop;
            from.meta.iH = _num;
            next();
        }
    }
</script>
