const LoadingCompoent = require("./Loading.vue")
const loading = {
    install:function(Vue){
        Vue.component('loading',LoadingCompoent)
    }
}
module.exports = loading