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
        <ul class="box" ref="scrollBox">
            <div style="height: 1000px;">我是首页内容</div>
            <x-button>submit</x-button>
        </ul>
        <Footer></Footer>
    </div>
</template>
<script>
    import Footer from '../common/footer.vue'
    import { XButton } from 'vux'
    export default {
        components:{
            Footer,
            XButton
        },
        data () {
            return {
                isFirstEnter: false, // 是否第一次进入，默认false 
                test: '请求数据'
            }
        },  
        methods: {
            fnInit () {
                let vm = this;
                console.log(vm.test);
            },
            getList () {
                let vm = this;
                let ajaxData = {
                    'pageNo': 1,
                    'pageSize': 10,
                    'isBrand': false,
                    'isPlatform': false
                }
                vm.$api.storeFrontFindByPage(ajaxData)
                .then((res) => {
                    console.log(JSON.parse(res));
                })
            },
            getDetail () {
                let vm = this;
                let ajaxData = {
                    'productId': 548,
                    'storeId': 800
                }
                vm.$api.productDetail(ajaxData)
                .then((res) => {
                    console.log(JSON.parse(res));
                })
            },
            producOnSale () {
                let vm = this;
                let ajaxData = {
                    'id': 548,
                }
                vm.$api.producOnSale(ajaxData)
                .then((res) => {
                    console.log(JSON.parse(res));
                })
            },
            productDeleteById () {
                let vm = this;
                let ajaxData = {
                    id: 550
                }
                vm.$api.productDeleteById(ajaxData)
                .then((res) => {
                    console.log(JSON.parse(res));
                })
            }
        },
        activated : function () {
            let vm = this;
            // 设置滚动条的高度
            vm._u.fnChangeScroll.call(vm,vm.$refs.scrollBox);
            vm._u.fnNextAndPrev(vm,vm.fnInit);
        },

        /*================缓存页面必须添加的内容=============*/
        created() {
            let vm = this;
            vm.isFirstEnter = true;
            // 只有第一次进入或者刷新页面后才会执行此钩子函数
            // 使用keep-alive后（2+次）进入不会再执行此钩子函数
        },
        // 路由跳转前
        beforeRouteLeave (to,from,next) {
            let vm = this;
            let _div = vm.$refs.scrollBox;
            let _num = _div.scrollTop;
            from.meta.iH = _num;
            next();
        }
    }
</script>
