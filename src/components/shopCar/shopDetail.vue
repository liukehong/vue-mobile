
<template>
    <div class="container_100">
        <div style="height: 200px; background: red;"></div>
        <div class="mescroll" id="mescroll" ref="scrollBox">
            <ul id="dataList">
                <li class="item" v-for="item in showList">
                    {{ item.storeName }}
                </li>   
            </ul>
        </div>
    </div>
</template>
<script>
    import MeScroll from 'mescroll'
    import '../../../static/sass/mescroll.css'
    export default {
        components:{
        },
        data () {
            return {
                isFirstEnter: false, // 是否第一次进入，默认false 
                mescroll: null,
                showList: [], // 数据容器
            }
        },
        methods: {
            fnInit () {
                let vm = this;
                // 如果是第一次进入的话，则需要初始化mescroll
                if(!!vm.isFirstEnter){
                    vm.fnMescrollInit();
                }else{
                    vm.showList = [];
                    vm.mescroll.resetUpScroll();
                }
            },

            /* =============================mescroll start======================== */
            fnMescrollInit: function () {
                let vm = this;
                vm.mescroll = null;
                vm.mescroll = new MeScroll('mescroll',{
                    down: {
                        offset: 40,
                        callback: vm.downCallback,
                        // htmlContent: "<p class='downwarp-progress'></p><p class='downwarp-tip'>下拉刷新</p>"
                    },
                    up: {
                        callback: vm.upCallback , //上拉加载的回调
					    isBounce: false, //如果您的项目是在iOS的微信,QQ,Safari等浏览器访问的,建议配置此项
                        page: { size: 10 }, //可配置每页8条数据,默认10
                        empty: { //配置列表无任何数据的提示
                            warpId: "dataList",
                            tip: "空空如也~~"
                        },
                        /* loadFull: {
                            use: true,
                            delay: 500
                        } */
                    }
                })
            },
            /* 下拉的回调函数 */
            downCallback: function () {
                let vm = this;
                vm.mescroll.resetUpScroll();
                setTimeout(()=>{
                    vm.mescroll.endSuccess(); //无参
                },500)
            },
            /* 上拉的回调函数 */
            upCallback: function (page) {
                let vm = this;
                setTimeout(function(){
                    vm.mescroll.endSuccess(5);
                },500)
                /* 获取数据 */
                let ajaxData = {
                    'pageNo': page.num,
                    'pageSize': page.size,
                    'isBrand': false,
                    'isPlatform': false
                }
                vm.$api.storeFrontFindByPage(ajaxData)
                .then(( res ) => {
                    let oData = JSON.parse(res).data;
                    setTimeout(function(){
                        if (page.num == 1) {
                            vm.showList = oData.list;
                        }else {
                            oData.list.forEach((item,i) => {
                                vm.showList.push(item);
                            })
                        }
                        vm.mescroll.endBySize(oData.list.length,oData.total);
                    },500)
                }).catch(( err ) => {
                    vm.mescroll.endErr();
                })
            }
            /* =============================mescroll end======================== */
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
            let _num = _div.scrollTop||0;
            from.meta.iH = _num;
            next();
        }
    }
</script>
<style lang="scss" scoped>
#mescroll {
    position: absolute;
    top: 200px;
    bottom: 0px;
    overflow-y: auto;
    width: 100%;
}
.item{
    width: 100%;
    height: 50px; 
    line-height: 50px;
    border-bottom: 1px solid #ccc;
}
</style>
