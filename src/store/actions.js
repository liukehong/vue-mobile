import * as types from './type'

export default{
	/* 底部条 */
	hideFooter:({commit})=>{
		commit(types.FOOTER_HIDE);
	},
	showFooter:({commit})=>{
		commit(types.FOOTER_SHOW);
	},
	/* 闪屏页 */
	hideSlider:({commit})=>{
		commit(types.SLIDER_HIDE);
	},
	/* loading */
	showLoading:({commit})=>{
		commit(types.LOADING_SHOW);
	},
	hideLoading:({commit})=>{
		commit(types.LOADING_HIDE);
	},
	/* banner */
	showBanner:({commit})=>{
		commit(types.BANNER_SHOW);
	},
	hideBanner:({commit})=>{
		commit(types.BANNER_HIDE);
	},
	/* header */
	showHeader:({commit})=>{
		commit(types.HEADER_SHOW);
	},
	hideHeader:({commit})=>{
		commit(types.HEADER_HIDE);
	},
	/* 用户信息 */
	userInfo:({commit},data)=>{
		commit(types.USER_INFO,data.userInfo);
	},
	/* msg提示框 */
	msgHide:({commit})=>{
		commit(types.MSG_HIDE);
	},
	msgShow:({commit})=>{
		commit(types.MSG_SHOW);
	}
}