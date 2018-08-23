<template>
    <ul class="footer">
        <router-link to="/home" tag='li' active-class="active" exact>
            首页
        </router-link>
        <router-link to="/shopCar" tag='li' active-class="active">
            购物车
        </router-link>
    </ul>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    mounted: function () {

    },
    activated: function () {

    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
.footer{
    position: absolute;
    bottom: 0px; left: 0px;
    height: p2r(50px);
    li{
        float: left;
    }
}
.active{
    color:#f5d493!important;
}
</style>
