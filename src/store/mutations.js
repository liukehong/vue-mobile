import * as types from './type'
/* ===============================状态值============================ */
const state = {
	footerCode:true,
	shanPingShow:true,
	loading:false,
	bannerShow:true,
	headerShow:true,
	userInfo:"",
	msgModal:false
};
/* =========================改变状态的唯一方法======================= */
const mutations = {
	[types.FOOTER_HIDE](state){
		state.footerCode = false;
	},
	[types.FOOTER_SHOW](state){
		state.footerCode = true;
	},
	[types.SLIDER_HIDE](state){
		state.shanPingShow = false;
	},
	[types.LOADING_SHOW](state){
		state.loading = true;
	},
	[types.LOADING_HIDE](state){
		state.loading = false;
	},
	[types.BANNER_SHOW](state){
		state.bannerShow = true;
	},
	[types.BANNER_HIDE](state){
		state.bannerShow = false;
	},
	[types.HEADER_SHOW](state){
		state.headerShow = true;
	},
	[types.HEADER_HIDE](state){
		state.headerShow = false;
	},
	[types.USER_INFO](state,userInfo){
		console.log(userInfo);
		state.userInfo = userInfo;
	},
	[types.MSG_SHOW](state){
		state.msgModal = true;
	},
	[types.MSG_HIDE](state){
		state.msgModal = false;
	}
}
/* ====================对状态进行处理再输出=========================== */
const getters = {
	footerShow(state){
		return state.footerCode
	},
	shanPingShow(state){
		return state.shanPingShow
	},
	loading(state){
		return state.loading
	},
	bannerShow(state){
		return state.bannerShow
	},
	headerShow(state){
		return state.headerShow
	},
	userInfo(state){
		return state.userInfo
	},
	msgShow(state){
		return state.msgModal
	}
}
export default{
	state,
	mutations,
	getters
}