// 请求接口文件
import axios from './api' // 倒入 api

export const storeFrontFindByPage = data => {
    return axios({
        url: '/store/front/findByPage?pageNo='+data.pageNo+'&pageSize='+data.pageSize,
        method: 'post',
        data
    })
}
export const productDetail = data => {
    return axios({
        url: 'product/detail',
        method: 'post',
        data,
    })
}
export const producOnSale = data => {
    return axios({
        url: 'product/onSale/'+ data.id,
        method: 'get',
    })
}
export const productDeleteById = data => {
    return axios({
        url: 'product/deleteById/'+ data.id,
        method: 'delete',
    })
}

export const selectListByConditions = data => {
    return axios({
        url: '/storeTradeStatistics/selectListByConditions?pageNo='+data.pageNo+'&pageSize='+data.pageSize,
        method: 'post',
        data
    })
}
// 默认全部倒出
// 根绝需要进行  
export default {
    storeFrontFindByPage,
    productDetail,
    producOnSale,
    productDeleteById,
    selectListByConditions
}
