<style lang="scss" scoped>
#shopSubmit_mescroll {
    position: absolute;
    top: 0px;
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
<template>
    <div class="container_100">
        <div class="mescroll" id="shopSubmit_mescroll">
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
                mescroll: null,
                showList: [], // 数据容器
            }
        },
        methods: {
            fnInit () {
                let vm = this;
                vm.fnMescrollInit();
            },
            fnMescrollInit: function () {
                let vm = this;
                vm.mescroll = new MeScroll('shopSubmit_mescroll',{
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
                },1000)
            },
            /* 上拉的回调函数 */
            upCallback: function (page) {
                console.log('我这是上拉');
                console.log(page.num,page.size);
                let vm = this;
                setTimeout(function(){
                    vm.mescroll.endSuccess(5);
                },1000)
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
                    },1000)
                }).catch(( err ) => {
                    console.log(err);
                    vm.mescroll.endErr();
                })
            }
        },
        mounted () {
            this.fnInit();
        }
    }
</script>
