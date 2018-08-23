
/*===================================== 前进刷新，后退缓存 ==================================*/
export const fnNextAndPrev = function (that,callBack) {
    let vm = that;
    if(!!vm.isFirstEnter){
        callBack()
    }else{
        if(!!!vm.$route.meta.isBack){
            // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
            callBack();
        }
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    vm.$route.meta.isBack=false
    // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
    vm.isFirstEnter=false;
}
/*===================================== 获取滚动条高度 ==================================*/
export const fnChangeScroll = function (div) {
    let vm = this;
    let num = vm.$route.meta.iH || 0;
    vm.$nextTick(() => {
        div.scrollTop = num;
    })
}
const BASE_UTIL = {
    fnNextAndPrev,
    fnChangeScroll,
};
export default BASE_UTIL;
