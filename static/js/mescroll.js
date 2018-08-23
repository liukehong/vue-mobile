/*
 * mescroll -- 精致的下拉刷新和上拉加载js框架  ( a great JS framework for pull-refresh and pull-up-loading )
 * version 1.1.5
 * 2017-08-15
 * https://github.com/mescroll/mescroll.git
 * http://www.mescroll.com
 * author: wenju < mescroll@qq.com > 文举
 */
function MeScroll(a,b){this.scrollDom=document.getElementById(a);this.options=b||{};this.isDownScrolling=false;this.isUpScrolling=false;this.initDownScroll();this.initUpScroll();var c=this;setTimeout(function(){if(c.optDown.auto){if(c.optDown.autoShowLoading){c.triggerDownScroll()}else{c.optDown.callback&&c.optDown.callback(c)}}c.optUp.auto&&c.triggerUpScroll()},30)}MeScroll.prototype.extendDownScroll=function(b){var a=!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);MeScroll.extend(b,{use:true,auto:true,autoShowLoading:false,isLock:false,isBoth:false,offset:80,outOffsetRate:0.2,mustToTop:!a,hardwareClass:"mescroll-hardware",warpClass:"mescroll-downwarp",resetClass:"mescroll-downwarp-reset",htmlContent:'<p class="downwarp-progress"></p><p class="downwarp-tip">下拉刷新 </p>',inited:function(d,c){d.downTipDom=c.getElementsByClassName("downwarp-tip")[0];d.downProgressDom=c.getElementsByClassName("downwarp-progress")[0]},inOffset:function(c){if(c.downTipDom){c.downTipDom.innerHTML="下拉刷新"}if(c.downProgressDom){c.downProgressDom.classList.remove("mescroll-rotate")}},outOffset:function(c){if(c.downTipDom){c.downTipDom.innerHTML="释放更新"}},onMoving:function(d,f,c){if(d.downProgressDom){var e=360*f;d.downProgressDom.style.webkitTransform="rotate("+e+"deg)";d.downProgressDom.style.transform="rotate("+e+"deg)"}},beforeLoading:function(d,c){return false},showLoading:function(c){if(c.downTipDom){c.downTipDom.innerHTML="加载中 ..."}if(c.downProgressDom){c.downProgressDom.classList.add("mescroll-rotate")}},callback:function(c){c.resetUpScroll()}})};MeScroll.prototype.extendUpScroll=function(a){var b=typeof window.orientation=="undefined";MeScroll.extend(a,{use:true,auto:false,isLock:false,isBoth:false,callback:null,page:{num:0,size:10,time:null},noMoreSize:5,offset:100,toTop:{src:null,offset:1000,warpClass:"mescroll-totop",showClass:"mescroll-fade-in",hideClass:"mescroll-fade-out",duration:300},loadFull:{use:false,delay:500},empty:{warpId:null,icon:null,tip:"暂无相关数据~",btntext:"",btnClick:null},clearId:null,clearEmptyId:null,hardwareClass:"mescroll-hardware",warpClass:"mescroll-upwarp",htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',htmlNodata:'<p class="upwarp-nodata">-- END --</p>',inited:function(c,d){},showLoading:function(c,d){d.innerHTML=c.optUp.htmlLoading},showNoMore:function(c,d){d.innerHTML=c.optUp.htmlNodata},onScroll:null,scrollbar:{use:b,barClass:"mescroll-bar"}})};MeScroll.extend=function(b,a){if(!b){return a}for(key in a){if(b[key]==null){b[key]=a[key]}else{if(typeof b[key]=="object"){MeScroll.extend(b[key],a[key])}}}return b};MeScroll.prototype.initDownScroll=function(){var c=this;c.optDown=c.options.down||{};if(c.optDown.use==false){return}c.extendDownScroll(c.optDown);c.downwarp=document.createElement("div");c.downwarp.className=c.optDown.warpClass;c.downwarp.innerHTML='<div class="downwarp-content">'+c.optDown.htmlContent+"</div>";c.scrollDom.insertBefore(c.downwarp,c.scrollDom.firstChild);c.scrollDom.addEventListener("touchstart",b);c.scrollDom.addEventListener("mousedown",b);function b(f){if(c.isScrollTo){f.preventDefault()}c.startTop=c.scrollDom.scrollTop;if(c.optDown.mustToTop){c.startY=f.touches?f.touches[0].pageY:f.clientY}}c.scrollDom.addEventListener("touchmove",a);c.scrollDom.addEventListener("mousemove",a);function a(j){if(c.startTop!=null&&c.scrollDom.scrollTop<=0&&!c.isDownScrolling&&(!c.isUpScrolling||(c.isUpScrolling&&c.optUp.isBoth))&&!c.optDown.isLock){if(c.optDown.mustToTop&&c.startTop>0){return}var f=j.touches?j.touches[0].pageY:j.clientY;if(!c.preY){c.preY=f}var i=f-c.preY;c.preY=f;if(!c.startY&&!c.optDown.mustToTop){c.startY=f}var h=f-c.startY;if(h>0){j.preventDefault();if(!c.downHight){c.downHight=0}if(c.downHight<c.optDown.offset){if(c.movetype!=1){c.movetype=1;c.optDown.inOffset(c);c.downwarp.classList.remove(c.optDown.resetClass);c.scrollDom.classList.add(c.optDown.hardwareClass);c.scrollDom.style.webkitOverflowScrolling="auto";c.isMoveDown=true}c.downHight+=i}else{if(c.movetype!=2){c.movetype=2;c.optDown.outOffset(c);c.downwarp.classList.remove(c.optDown.resetClass);c.scrollDom.classList.add(c.optDown.hardwareClass);c.scrollDom.style.webkitOverflowScrolling="auto";c.isMoveDown=true}if(i>0){c.downHight+=i*c.optDown.outOffsetRate}else{c.downHight+=i}}c.downwarp.style.height=c.downHight+"px";var g=c.downHight/c.optDown.offset;c.optDown.onMoving(c,g,c.downHight)}}}c.scrollDom.addEventListener("touchend",d);c.scrollDom.addEventListener("mouseup",d);c.scrollDom.addEventListener("mouseleave",d);function d(f){if(c.isMoveDown){if(c.downHight>=c.optDown.offset){c.triggerDownScroll()}else{c.downwarp.classList.add(c.optDown.resetClass);c.downHight=0;c.downwarp.style.height=0}c.scrollDom.style.webkitOverflowScrolling="touch";c.scrollDom.classList.remove(c.optDown.hardwareClass);c.movetype=0;c.isMoveDown=false}c.startY=0;c.preY=0;c.startTop=null}setTimeout(function(){c.optDown.inited(c,c.downwarp)},0)};MeScroll.prototype.triggerDownScroll=function(){if(!this.optDown.beforeLoading(this,this.downwarp)){this.showDownScroll();this.optDown.callback&&this.optDown.callback(this)}};MeScroll.prototype.showDownScroll=function(){this.isDownScrolling=true;this.optDown.showLoading(this);this.downHight=this.optDown.offset;this.downwarp.classList.add(this.optDown.resetClass);this.downwarp.style.height=this.optDown.offset+"px"};MeScroll.prototype.endDownScroll=function(){this.downHight=0;this.downwarp.style.height=0;this.isDownScrolling=false};MeScroll.prototype.lockDownScroll=function(a){if(a==null){a=true}this.optDown.isLock=a};MeScroll.prototype.initUpScroll=function(){var a=this;a.optUp=a.options.up||{};if(a.optUp.use==false){return}a.extendUpScroll(a.optUp);if(a.optUp.scrollbar.use){a.scrollDom.classList.add(a.optUp.scrollbar.barClass)}a.upwarp=document.createElement("div");a.upwarp.className=a.optUp.warpClass;a.scrollDom.appendChild(a.upwarp);a.scrollDom.addEventListener("scroll",function(){var c=a.scrollDom.scrollTop;if(!a.isUpScrolling&&(!a.isDownScrolling||(a.isDownScrolling&&a.optDown.isBoth))){if(!a.optUp.isLock){var b=a.scrollDom.scrollHeight-a.scrollDom.clientHeight-c;if(b<=a.optUp.offset){a.triggerUpScroll()}}if(a.optUp.toTop.src){if(c>=a.optUp.toTop.offset){a.showTopBtn()}else{a.hideTopBtn()}}}a.optUp.onScroll&&a.optUp.onScroll(a,c)});setTimeout(function(){a.optUp.inited(a,a.upwarp)},0)};MeScroll.prototype.triggerUpScroll=function(){this.showUpScroll();this.optUp.page.num++;this.optUp.callback&&this.optUp.callback(this.optUp.page,this)};MeScroll.prototype.showUpScroll=function(){this.isUpScrolling=true;this.upwarp.classList.add(this.optUp.hardwareClass);this.upwarp.style.visibility="visible";this.optUp.showLoading(this,this.upwarp)};MeScroll.prototype.showNoMore=function(){this.upwarp.style.visibility="visible";this.optUp.isLock=true;this.optUp.showNoMore(this,this.upwarp)};MeScroll.prototype.hideUpScroll=function(){this.upwarp.style.visibility="hidden";this.upwarp.classList.remove(this.optUp.hardwareClass)};MeScroll.prototype.endUpScroll=function(a){if(a!=null){if(a){this.showNoMore()}else{this.hideUpScroll()}}this.isUpScrolling=false};MeScroll.prototype.resetUpScroll=function(b){if(this.optUp&&this.optUp.use){var a=this.optUp.page;this.prePageNum=a.num;this.prePageTime=a.time;a.num=1;a.time=null;if(!this.isDownScrolling&&b!=false){if(b==null){this.clearDataList();this.showUpScroll()}else{this.showDownScroll()}}this.optUp.callback&&this.optUp.callback(a,this)}};MeScroll.prototype.clearDataList=function(){var b=this.optUp.clearId||this.optUp.clearEmptyId;if(b){var a=document.getElementById(b);if(a){a.innerHTML=""}}};MeScroll.prototype.endSuccess=function(b,d){if(this.isDownScrolling){this.endDownScroll()}if(this.optUp.use){var e=this.optUp.page.num;var a=this.optUp.page.size;if(e==1){this.clearDataList()}var c;if(b!=null){if(b<a){this.optUp.isLock=true;if(b==0&&e==1){c=false;this.showEmpty()}else{var f=(e-1)*a+b;if(f<this.optUp.noMoreSize){c=false}else{c=true}this.removeEmpty()}}else{c=false;this.optUp.isLock=false;this.removeEmpty()}}if(e==1&&d){this.optUp.page.time=d}this.endUpScroll(c);this.loadFull()}};MeScroll.prototype.endErr=function(){if(this.isDownScrolling){var a=this.optUp.page;if(a&&this.prePageNum){a.num=this.prePageNum;a.time=this.prePageTime}this.endDownScroll()}if(this.isUpScrolling){this.optUp.page.num--;this.endUpScroll(false)}};MeScroll.prototype.loadFull=function(){var a=this;if(a.optUp.loadFull.use&&!a.optUp.isLock&&a.scrollDom.scrollHeight<=a.scrollDom.clientHeight){setTimeout(function(){if(a.scrollDom.scrollHeight<=a.scrollDom.clientHeight){a.triggerUpScroll()}},a.optUp.loadFull.delay)}};MeScroll.prototype.lockUpScroll=function(a){if(a==null){a=true}this.optUp.isLock=a};MeScroll.prototype.showEmpty=function(){var b=this;var c=b.optUp.empty;var a=c.warpId||b.optUp.clearEmptyId;if(a==null){return}var f=document.getElementById(a);if(f){b.removeEmpty();var e="";if(c.icon){e+='<img class="empty-icon" src="'+c.icon+'"/>'}if(c.tip){e+='<p class="empty-tip">'+c.tip+"</p>"}if(c.btntext){e+='<p class="empty-btn">'+c.btntext+"</p>"}b.emptyDom=document.createElement("div");b.emptyDom.className="mescroll-empty";b.emptyDom.innerHTML=e;f.appendChild(b.emptyDom);if(c.btnClick){var d=b.emptyDom.getElementsByClassName("empty-btn")[0];d.onclick=function(){c.btnClick()}}}};MeScroll.prototype.removeEmpty=function(){if(this.emptyDom){var a=this.emptyDom.parentNode;if(a){a.removeChild(this.emptyDom)}this.emptyDom=null}};MeScroll.prototype.showTopBtn=function(){if(!this.topBtnShow){this.topBtnShow=true;var a=this;var b=a.optUp.toTop;if(a.toTopBtn==null){a.toTopBtn=document.createElement("img");a.toTopBtn.className=b.warpClass;a.toTopBtn.src=b.src;a.toTopBtn.onclick=function(){a.scrollTo(0,a.optUp.toTop.duration)};document.body.appendChild(a.toTopBtn)}a.toTopBtn.classList.remove(b.hideClass);a.toTopBtn.classList.add(b.showClass)}};MeScroll.prototype.hideTopBtn=function(){if(this.topBtnShow&&this.toTopBtn){this.topBtnShow=false;this.toTopBtn.classList.remove(this.optUp.toTop.showClass);this.toTopBtn.classList.add(this.optUp.toTop.hideClass)}};MeScroll.prototype.scrollTo=function(h,k){k=k||300;var f=20;var e=k/f;var g=this;var a=g.scrollDom.scrollHeight-g.scrollDom.clientHeight;if(h<0){h=0}if(h>a){h=a}var j=g.scrollDom.scrollTop-h;if(j==0){return}var b=j/e;g.isScrollTo=true;var c=0;var d=window.setInterval(function(){if(c<e){if(c==e-1){g.scrollDom.scrollTop=h}else{g.scrollDom.scrollTop-=b}c++}else{g.isScrollTo=false;window.clearInterval(d)}},f)};