(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{317:function(t,e,n){var content=n(325);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(74).default)("0c4014f2",content,!0,{sourceMap:!1})},324:function(t,e,n){"use strict";n(317)},325:function(t,e,n){var r=n(73)(!1);r.push([t.i,".main[data-v-5d17c304]{padding:2px 3rem 2rem;min-height:600px}.fade-enter-active[data-v-5d17c304],.fade-leave-active[data-v-5d17c304]{transition:opacity .5s}.fade-enter[data-v-5d17c304],.fade-leave-to[data-v-5d17c304]{opacity:0}.card-bottom[data-v-5d17c304]{bottom:0;background:rgba(66,66,66,.671)}.card-bottom[data-v-5d17c304],.card-top[data-v-5d17c304]{position:absolute;left:0;right:0;margin-bottom:0;padding:1rem 1.5rem}.card-top[data-v-5d17c304]{top:0}.setting-container[data-v-5d17c304]{padding:1.5rem;width:100%;position:relative;display:flex;flex-direction:column;border:2px solid #f5f5f5;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;color:rgba(0,0,0,.7);background:#fff}.card-image-group[data-v-5d17c304]{min-height:120px;border-top-left-radius:.25rem;border-top-right-radius:.25rem;overflow:hidden}.card-image-group:first-child img[data-v-5d17c304]{border-top-left-radius:0;border-top-right-radius:0}",""]),t.exports=r},327:function(t,e,n){"use strict";n.r(e);n(29),n(20),n(53),n(34),n(54);var r=n(1),o=n(14),l=(n(33),n(28),n(55),n(61));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m=Object(l.a)("local"),f=m.mapState,v=m.mapActions,h=(m.mapMutations,{head:function(){return{title:this.$t("local.title"),meta:[{hid:"description",name:"description",content:this.$t("local.meta.description")},{hid:"keywords",name:"keywords",content:this.$t("common.meta.keywords")},{hid:"author",name:"author",content:this.$t("common.studioName")}]}},props:{settingUrl:"",editorRouterName:{type:String,default:"editor-id"},groupEditorRouterName:{type:String,default:"group-id"}},data:function(){return{hoverWp:void 0,showSetupPlayerModal:!1,showOptionModal:!1,currentOption:void 0,currentOptionWP:void 0,switchingIntervalMinTime:void 0,switchingInterval:void 0,isOptionBusy:!1,stickBottomBar:!0,setting:JSON.parse(JSON.stringify(this.$store.state.local.setting)),categoryOptions:["all","wallpaper","group"],filterWpType:"all"}},computed:d({isWallpaperEmpty:function(){return!(this.isLoading||this.wallpapers&&0!=this.wallpapers.length)},settingLoaded:function(){return this.setting&&this.setting.wallpaper.screenOptions&&this.setting.wallpaper.screenOptions.length>0},filteredWallpapers:function(){switch(this.filterWpType){case"group":return this.wallpapers.filter((function(t){return"group"===t.info.type}));case"wallpaper":return this.wallpapers.filter((function(t){return"group"!=t.info.type}))}return this.wallpapers}},f(["wallpapers","serverHost","isLoading","isPlaying"])),mounted:function(){var t=new Date;t.setHours(0),t.setMinutes(1),this.switchingIntervalMinTime=t,window.addEventListener("scroll",this.handleScroll)},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)},fetch:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.refresh({handleClientApiException:t.handleClientApiException});case 2:if(t.wallpapers){e.next=4;break}return e.abrupt("return");case 4:if(t.settingLoaded){e.next=8;break}return e.next=7,t.loadSetting({handleClientApiException:function(){}});case 7:t.setting=JSON.parse(JSON.stringify(t.$store.state.local.setting));case 8:case"end":return e.stop()}}),e)})))()},fetchOnServer:!1,methods:d(d({},v(["refresh","setWallpaperOption","loadWallpaperOption","loadSetting","saveSetting","showWallpaper","closeWallpaper","deleteWallpaper","exploreWallpaper"])),{},{handleClientApiException:function(t){this.$local.handleClientApiException(this,t)},audioSelected:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log(t),n.next=3,e.saveSetting({setting:e.setting,handleClientApiException:e.handleClientApiException});case 3:n.sent;case 4:case"end":return n.stop()}}),n)})))()},handleScroll:function(t){var e=this.$el.querySelector("#bottomBar").clientHeight,n=this.$el.querySelector("#bottomDiv").getBoundingClientRect(),r=n.top+(this.stickBottomBar?e:0);this.stickBottomBar=r>=(window.innerHeight||document.documentElement.clientHeight)||n.bottom<=0},onWPClick:function(t){this.onShowWallpaper(t)},onShowWallpaper:function(t,e){this.showWallpaper({wallpaper:t,screen:e,handleClientApiException:this.handleClientApiException,toast:this.$buefy.toast})},onEditWPClick:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r=e.localePath({name:"group"===t.info.type?e.groupEditorRouterName:e.editorRouterName,params:{id:t.info.localID}}),console.log("edit",r),e.$router.push(r);case 3:case"end":return n.stop()}}),n)})))()},onOpenWPDirClick:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.exploreWallpaper({wallpaper:t,handleClientApiException:e.handleClientApiException});case 2:case"end":return n.stop()}}),n)})))()},onDeleteWPClick:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e.$buefy.dialog.confirm({title:e.$t("local.deletingWallpaper"),message:e.$t("local.deletingWallpaperConfirmMessage",{delete:e.$t("common.delete").toLowerCase(),name:t.info.title}),confirmText:e.$t("common.delete"),cancelText:e.$t("common.cancel"),type:"is-danger",hasIcon:!0,onConfirm:function(){var n=Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.deleteWallpaper({wallpaper:t,handleClientApiException:e.handleClientApiException,toast:e.$buefy.toast});case 2:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}()});case 1:case"end":return n.stop()}}),n)})))()},onConfigWPClick:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.showOptionModal=!0,e.currentOptionWP=t,e.isOptionBusy=!0,n.prev=3,n.next=6,e.loadWallpaperOption({wallpaper:t});case 6:(r=new Date).setHours(0),r.setMinutes(10),t&&t.option.switchingInterval&&(r.setHours(t.option.switchingInterval.hours),r.setMinutes(t.option.switchingInterval.minutes)),e.switchingInterval=r,n.next=16;break;case 13:n.prev=13,n.t0=n.catch(3),e.handleClientApiException(n.t0);case 16:e.currentOption=Object.assign({},t.option),e.isOptionBusy=!1;case 18:case"end":return n.stop()}}),n,null,[[3,13]])})))()},onStopPClick:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.closeWallpaper({handleClientApiException:t.handleClientApiException});case 2:case"end":return e.stop()}}),e)})))()},onOptionSaveClick:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.isOptionBusy=!0,e.prev=1,t.switchingInterval||"group"!==t.currentOptionWP.info.type||(t.switchingInterval=t.switchingIntervalMinTime),n="".concat(t.switchingInterval.getHours(),":").concat(t.switchingInterval.getMinutes(),":00"),t.currentOption.switchingIntervalString=n,e.next=7,t.setWallpaperOption({wallpaper:t.currentOptionWP,option:t.currentOption,handleClientApiException:t.handleClientApiException});case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),t.handleClientApiException(e.t0);case 12:t.isOptionBusy=!1,t.showOptionModal=!1;case 14:case"end":return e.stop()}}),e,null,[[1,9]])})))()}})}),w=(n(324),n(19)),component=Object(w.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[n("b-navbar",{staticClass:"mt-3 mb-3 pr-5 pl-6",scopedSlots:t._u([{key:"start",fn:function(){},proxy:!0},{key:"end",fn:function(){return[n("b-navbar-dropdown",{attrs:{label:t.$t("common."+t.filterWpType),hoverable:""},model:{value:t.filterWpType,callback:function(e){t.filterWpType=e},expression:"filterWpType"}},[n("b-navbar-item",{attrs:{value:"all",active:"all"===t.filterWpType},on:{click:function(e){t.filterWpType="all"}}},[t._v("\n          "+t._s(t.$t("common.all"))+"\n        ")]),t._v(" "),n("b-navbar-item",{attrs:{active:"group"===t.filterWpType},on:{click:function(e){t.filterWpType="group"}}},[t._v("\n          "+t._s(t.$t("common.group"))+"\n        ")]),t._v(" "),n("b-navbar-item",{attrs:{active:"wallpaper"===t.filterWpType},on:{click:function(e){t.filterWpType="wallpaper"}}},[t._v("\n          "+t._s(t.$t("common.wallpaper"))+"\n        ")])],1)]},proxy:!0}])}),t._v(" "),n("div",{staticClass:"main container is-fluid"},[n("div",{staticClass:"columns is-multiline"},[t._l(t.filteredWallpapers,(function(e,r){return n("div",{key:r,staticClass:"column is-one-quarter",on:{mouseenter:function(n){t.hoverWp=e},mouseleave:function(e){t.hoverWp=!1}}},[n("div",{staticClass:"card"},[n("div",{class:{"card-image":!0,"card-image-group":"group"===e.info.type}},["group"!=e.info.type?n("figure",{staticClass:"image is-4by3",on:{click:function(n){return t.onWPClick(e)}}},[n("img",{staticClass:"wp-cover",attrs:{src:t.serverHost+"assets/image/?localpath="+e.runningData.dir+"//"+e.info.preview,alt:e.info.title}})]):"group"===e.info.type?n("figure",{on:{click:function(n){return t.onWPClick(e)}}},[e.info.groupItems?n("div",{staticClass:"columns is-gapless is-multiline is-mobile"},t._l(e.info.groupItemWallpaperModels.slice(0,4),(function(r,o){return n("div",{key:o,staticClass:"column is-half"},[n("figure",{staticClass:"image is-4by3"},[n("img",{attrs:{src:t.serverHost+"assets/image/?localpath="+r.runningData.dir+"//"+r.info.preview,alt:e.info.title}})])])})),0):t._e()]):t._e(),t._v(" "),t.setting.wallpaper.screenOptions&&t.setting.wallpaper.screenOptions.length>1?n("transition",{attrs:{name:"fade"}},[t.hoverWp===e?n("nav",{staticClass:"card-top level",on:{click:function(n){return t.onWPClick(e)}}},[n("div",{staticClass:"level-left"},t._l(t.setting.wallpaper.screenOptions,(function(r){return n("b-tooltip",{key:r.screen,staticClass:"level-item",attrs:{label:r.remark||r.screen,position:"is-bottom"}},[n("div",{on:{click:function(n){return n.stopPropagation(),t.showWallpaper({wallpaper:e,handleClientApiException:t.handleClientApiException,screen:r.screen})}}},[n("b-icon",{attrs:{type:"is-white",icon:"desktop",pack:"fas"}})],1)])})),1)]):t._e()]):t._e(),t._v(" "),n("transition",{attrs:{name:"fade"}},[t.hoverWp===e?n("nav",{staticClass:"card-bottom level"},[n("div",{staticClass:"level-left"},[n("b-tooltip",{staticClass:"level-item",attrs:{label:t.$t("common.settings"),position:"is-right"}},[n("div",{on:{click:function(n){return t.onConfigWPClick(e)}}},[n("b-icon",{attrs:{type:"is-white",icon:"cog",pack:"fas"}})],1)])],1),t._v(" "),n("div",{staticClass:"level-right"},[n("b-tooltip",{staticClass:"level-item",attrs:{label:t.$t("common.delete"),position:"is-left"}},[n("div",{on:{click:function(n){return t.onDeleteWPClick(e)}}},[n("b-icon",{attrs:{type:"is-white",icon:"trash-alt",pack:"fas"}})],1)]),t._v(" "),n("b-tooltip",{staticClass:"level-item",attrs:{label:t.$t("common.edit"),position:"is-left"}},[n("div",{on:{click:function(n){return t.onEditWPClick(e)}}},[n("b-icon",{attrs:{pack:"fas",icon:"edit",type:"is-white"}})],1)]),t._v(" "),n("b-tooltip",{staticClass:"level-item",attrs:{label:t.$t("local.openFileDir"),position:"is-left"}},[n("div",{on:{click:function(n){return t.onOpenWPDirClick(e)}}},[n("b-icon",{attrs:{pack:"fas",icon:"folder-open",type:"is-white"}})],1)])],1)]):t._e()]),t._v(" "),n("b-loading",{attrs:{"is-full-page":!1},model:{value:e.isBusy,callback:function(n){t.$set(e,"isBusy",n)},expression:"item.isBusy"}})],1),t._v(" "),n("div",{staticClass:"card-content columns"},[n("div",{staticClass:"column is-12"},[t._v("\n              "+t._s(e.info.title)+"\n            ")])])]),t._v(" "),n("client-only",[t.isWallpaperEmpty?n("Empty",{attrs:{pack:"fas",icon:"folder-open"}},[t._v("\n            "+t._s(t.$t("local.noWallpapers"))+"\n          ")]):t._e()],1)],1)})),t._v(" "),n("client-only",[n("b-loading",{attrs:{closable:!1},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}})],1),t._v(" "),n("b-modal",{model:{value:t.showOptionModal,callback:function(e){t.showOptionModal=e},expression:"showOptionModal"}},[t.currentOptionWP?n("div",{staticClass:"setting-container"},[n("section",[n("h2",{staticClass:"title is-4"},["group"===t.currentOptionWP.info.type?[t._v("\n                "+t._s(t.$t("common.wallpaperGroup"))+"\n              ")]:[t._v("\n                "+t._s(t.$t("common.videoWP"))+"\n              ")]],2),t._v(" "),t.currentOption?n("div",{staticClass:"setting-container"},["group"===t.currentOptionWP.info.type?[n("b-field",{attrs:{label:t.$t("dashboard.client.editor.switchingInterval")}},[n("b-timepicker",{attrs:{rounded:"",placeholder:"HH:mm",locale:"de-DE","min-time":t.switchingIntervalMinTime,icon:"clock",editable:"","enable-seconds":!1,"hour-format":"24"},model:{value:t.switchingInterval,callback:function(e){t.switchingInterval=e},expression:"switchingInterval"}})],1)]:[n("b-field",{attrs:{label:t.currentOption.hardwareDecoding?t.$t("common.wallpaperOptions.enableHwdec"):t.$t("common.wallpaperOptions.disableHwdec")}},[t.currentOption?n("b-switch",{attrs:{"left-label":!0},model:{value:t.currentOption.hardwareDecoding,callback:function(e){t.$set(t.currentOption,"hardwareDecoding",e)},expression:"currentOption.hardwareDecoding"}}):t._e()],1)]],2):t._e(),t._v(" "),n("b-loading",{attrs:{"is-full-page":!1},model:{value:t.isOptionBusy,callback:function(e){t.isOptionBusy=e},expression:"isOptionBusy"}}),t._v(" "),n("hr",{staticClass:"is-medium"})],1),t._v(" "),n("b-field",[n("p",{staticClass:"control"},[n("button",{staticClass:"button is-primary",on:{click:t.onOptionSaveClick}},[t._v("\n                "+t._s(t.$t("common.save"))+"\n              ")])])])],1):t._e()])],2)]),t._v(" "),n("b-navbar",{staticClass:"is-spaced has-shadow",attrs:{id:"bottomBar","fixed-bottom":t.stickBottomBar}},[n("template",{slot:"brand"},[n("b-navbar-item",{attrs:{tag:"div"}},[n("b-button",{attrs:{tag:"nuxt-link",to:t.localePath(t.settingUrl||"/setting"),"icon-pack":"fas","icon-left":"cog",type:"is-primary is-light"}},[t._v(t._s(t.$t("common.settings"))+"\n        ")]),t._v(" "),n("b-dropdown",{staticStyle:{"margin-left":"0.5rem"},attrs:{"aria-role":"list",position:"is-top-right",disabled:!t.settingLoaded},on:{input:t.audioSelected},scopedSlots:t._u([{key:"trigger",fn:function(){return[n("b-button",{attrs:{type:"is-primary is-light","icon-pack":"fas","icon-left":"disabled"==t.setting.wallpaper.audioScreen?"volume-mute":"volume-up"}})]},proxy:!0}]),model:{value:t.setting.wallpaper.audioScreen,callback:function(e){t.$set(t.setting.wallpaper,"audioScreen",e)},expression:"setting.wallpaper.audioScreen"}},[t._v(" "),n("b-dropdown-item",{attrs:{value:"disabled","aria-role":"listitem"}},[n("div",{staticClass:"media"},[n("div",{staticClass:"media-content"},[n("h3",[t._v(t._s(t.$t("common.disable")))])])])]),t._v(" "),t._l(t.setting.wallpaper.screenOptions,(function(e){return n("b-dropdown-item",{key:e.screen,attrs:{"aria-role":"listitem",value:e.screen}},[n("div",{staticClass:"media"},[n("div",{staticClass:"media-content"},[n("h3",[t._v(t._s(e.remark||e.screen))]),t._v(" "),n("small")])])])}))],2),t._v(" "),t.isPlaying?n("b-button",{staticStyle:{"margin-left":"0.5rem"},attrs:{"icon-pack":"fas","icon-left":"ban",type:"is-primary is-light"},on:{click:t.onStopPClick}},[t._v(t._s(t.$t("common.stop"))+"\n        ")]):t._e()],1)],1),t._v(" "),n("template",{slot:"end"},[n("b-navbar-item",{attrs:{tag:"div"}},[n("div",{staticClass:"buttons"},[n("b-button",{attrs:{type:"is-primary is-light","icon-pack":"fas","icon-left":"sync-alt",loading:t.isLoading},on:{click:function(e){return t.refresh({handleClientApiException:t.handleClientApiException})}}},[t._v(t._s(t.$t("common.refresh")))]),t._v(" "),n("b-button",{attrs:{tag:"nuxt-link",to:t.localePath({name:t.editorRouterName}),"icon-pack":"fas","icon-left":"file-image",type:"is-primary is-light"}},[t._v("\n            "+t._s(t.$t("dashboard.menus.createWallpaper"))+"\n          ")]),t._v(" "),n("b-button",{attrs:{tag:"nuxt-link",to:t.localePath({name:t.groupEditorRouterName}),"icon-pack":"fas","icon-left":"layer-group",type:"is-primary is-light"}},[t._v("\n            "+t._s(t.$t("dashboard.menus.createGroup"))+"\n          ")])],1)])],1)],2),t._v(" "),n("div",{attrs:{id:"bottomDiv"}})],1)}),[],!1,null,"5d17c304",null);e.default=component.exports}}]);