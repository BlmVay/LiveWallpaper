(window.webpackJsonp=window.webpackJsonp||[]).push([[1,6,7,8,13],{325:function(e,t,o){"use strict";o.r(t);var n=o(1),r=(o(30),o(10),{data:function(){return{isBusy:!1,enableCustomUrl:!1,downloadUrl:this.defaultUrl,stoping:!1,innerShow:this.show}},props:["show","defaultUrl","progress","completed","successed"],watch:{innerShow:function(e,t){this.$emit("update:show",e)},show:function(e,t){this.innerShow=e},defaultUrl:function(e,t){console.log(e,t),e&&!this.downloadUrl&&(this.downloadUrl=e)}},computed:{downloading:function(){return this.progress>0||this.progress<100}},methods:{start:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.isBusy){t.next=2;break}return t.abrupt("return");case 2:return e.isBusy=!0,o=new Promise((function(t){return e.$emit("start",e.downloadUrl,t)})),t.next=6,o;case 6:t.sent,e.isBusy=!1;case 8:case"end":return t.stop()}}),t)})))()},stop:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.stoping=!0,o=new Promise((function(t){return e.$emit("stop",t)})),t.next=4,o;case 4:e.stoping=!1;case 5:case"end":return t.stop()}}),t)})))()}}}),l=o(27),component=Object(l.a)(r,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("b-modal",{model:{value:e.innerShow,callback:function(t){e.innerShow=t},expression:"innerShow"}},[o("div",{staticClass:"card"},[o("header",{staticClass:"card-header"},[o("p",{staticClass:"card-header-title"},[e._t("header")],2),e._v(" "),o("b-switch",{attrs:{disabled:e.isBusy},model:{value:e.enableCustomUrl,callback:function(t){e.enableCustomUrl=t},expression:"enableCustomUrl"}},[e._v(e._s(e.$t("local.customUrlTip")))])],1),e._v(" "),o("div",{staticClass:"card-content"},[o("div",{staticClass:"content"},[e.enableCustomUrl?o("div",{staticClass:"columns subtitle"},[o("div",{staticClass:"column is-11"},[o("b-input",{attrs:{disabled:e.isBusy,placeholder:e.$t("local.customUrlPlaceholder"),"icon-pack":"fas","icon-right":"undo","icon-right-clickable":""},on:{"icon-right-click":function(t){e.downloadUrl=e.defaultUrl}},model:{value:e.downloadUrl,callback:function(t){e.downloadUrl=t},expression:"downloadUrl"}})],1),e._v(" "),o("div",{staticClass:"column"},[e._t("help")],2),e._v(" "),o("div",{staticClass:"column"})]):e._e(),e._v(" "),o("b-progress",{attrs:{value:e.progress,"show-value":"",type:e.completed?"is-success":"is-info"}},[e._t("text")],2)],1)]),e._v(" "),o("footer",{staticClass:"card-footer"},[o("div",{staticClass:"card-footer-item"}),e._v(" "),o("div",{staticClass:"card-footer-item"}),e._v(" "),e.successed?o("b-button",{staticClass:"card-footer-item",attrs:{type:"is-success"},on:{click:function(t){e.innerShow=!1}}},[e._v(e._s(e.$t("common.close")))]):e.isBusy?e.isBusy||e.downloading?o("b-button",{staticClass:"card-footer-item",attrs:{loading:e.stoping,disabled:e.stoping,type:"is-danger"},on:{click:e.stop}},[e._v(e._s(e.$t("common.stop"))+"\n      ")]):e._e():o("b-button",{staticClass:"card-footer-item",attrs:{type:"is-info"},on:{click:e.start}},[e._v("\n        "+e._s(e.$t("common.start"))+"\n      ")])],1)])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Header:o(166).default,Footer:o(98).default})},328:function(e,t,o){},329:function(e,t,o){},334:function(e,t,o){"use strict";o.r(t);o(36),o(19),o(35),o(54),o(43),o(55);var n=o(1),r=o(20),l=(o(10),o(30),o(67));function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,o)}return t}var d=Object(l.a)("local"),f=(d.mapState,d.mapGetters),h=(d.mapActions,d.mapMutations,{computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},f(["serverHost"])),data:function(){return{show:!1,progress:0,completed:!1,successed:!1,type:void 0}},methods:{showModal:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.show=!0,!e.$refs.innerModal.isBusy){t.next=3;break}return t.abrupt("return");case 3:e.$refs.innerModal.start();case 4:case"end":return t.stop()}}),t)})))()},startCallback:function(e,t){var o=this,n=!1;this.$local.getApiInstance().setupFFmpeg(e,function(e){this.progress=e.percent,this.completed="completed"===e.typeStr,this.type=e.typeStr,this.completed&&(this.successed=e.successed)}.bind(this)).then((function(e){console.log(e),n=e})).catch((function(e){return o.$local.handleClientApiException(o,e)})).finally((function(){t(n)}))},stopCallback:function(e){var t=this;this.$local.getApiInstance().stopSetupFFmpeg().catch((function(e){return t.$local.handleClientApiException(t,e)})).finally(e)}}}),m=h,v=o(27),component=Object(v.a)(m,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("BaseProgressModal",{ref:"innerModal",attrs:{show:e.show,progress:e.progress,completed:e.completed,successed:e.successed,defaultUrl:e.serverHost+"ffmpeg.7z"},on:{"update:show":function(t){e.show=t},start:e.startCallback,stop:e.stopCallback},scopedSlots:e._u([{key:"header",fn:function(){return[e._v(" "+e._s(e.$t("common.installFFmpeg"))+" ")]},proxy:!0},{key:"help",fn:function(){return[o("a",{staticClass:"button",attrs:{href:"https://github.com/giant-app/LiveWallpaper",target:"_blank"}},[o("b-icon",{attrs:{pack:"fa",icon:"question-circle"}})],1)]},proxy:!0},{key:"text",fn:function(){return["download"===e.type?[e._v("\n      "+e._s(e.$t("local.downloading",{progress:e.progress}))+"\n    ")]:"decompress"===e.type?[e._v(e._s(e.$t("local.unzipping",{progress:e.progress}))+"\n    ")]:e.completed&&e.successed?[e._v(e._s(e.$t("local.downloadComplete"))+"\n    ")]:[e._v(e._s(e.$t("local.waitStart")))]]},proxy:!0}])})}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{BaseProgressModal:o(325).default})},338:function(e,t,o){"use strict";o(328)},339:function(e,t,o){"use strict";o(329)},345:function(e,t,o){"use strict";o.r(t);var n={data:function(){return{file:null,progress:0,innerCoverPath:this.coverPath,tokenSource:void 0,coverUrls:[],isGettingThumbnails:!1}},props:["uploadDir","showSelector","coverPath","videoPath"],watch:{coverPath:function(e,t){this.innerCoverPath=e}},methods:{selectorSelected:function(path){this.innerCoverPath=path,this.$emit("selected",path)},selectorLoadCompeted:function(e){this.innerCoverPath||(this.innerCoverPath=e[0],this.$emit("selected",e[0]))},uploadedCallback:function(e){this.$emit("uploaded",e)}}},r=o(27),component=Object(r.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("b-field",[o("div",{staticClass:"columns",staticStyle:{"min-height":"135px"},attrs:{"is-vcentered":"","is-centered":""}},[o("div",{staticClass:"column is-one-fifth"},[o("CoverUploader",{attrs:{cover:e.innerCoverPath,uploadDir:e.uploadDir},on:{uploaded:e.uploadedCallback}})],1),e._v(" "),o("div",{staticClass:"column"},[e.showSelector?o("CoverSelector",{ref:"selector",attrs:{videoPath:e.videoPath},on:{selected:e.selectorSelected,loadCompeted:e.selectorLoadCompeted}}):e._e()],1)])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{CoverUploader:o(346).default,CoverSelector:o(347).default})},346:function(e,t,o){"use strict";o.r(t);o(10);var n={data:function(){return{file:null,progress:0,uploadedPath:this.cover,isloading:!1}},watch:{file:function(e,t){if(e&&t){for(var o=["lastModified","name","size","type "],n=0,r=0,l=o;r<l.length;r++){var c=l[r];if(e[c]!=t[c])break;n++}if(n==o.length)return}e&&this.upload(e)},cover:function(e,t){this.uploadedPath=e}},props:["url","uploadDir","cover"],methods:{upload:function(e){var t=this;this.isloading=!0,this.progress=0,new Promise((function(o,n){var r={onUploadProgress:t._uploadProgressCallback,resolve:o,reject:n};t.tokenSource=t.$local.getApiInstance().uploadFile(t.$axios,e,t.uploadDir,r)})).then((function(e){t.uploadedPath=e.data,t.$emit("uploaded",e.data)})).catch((function(e){return t.$local.handleClientApiException(t,e)})).finally((function(){t.tokenSource=null,t.isloading=!1}))}}},r=(o(338),o(27)),component=Object(r.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"uploader"},[o("div",{staticClass:"uploader-show"},[e.uploadedPath?o("img",{staticClass:"cover-preview-show",attrs:{src:e.$local.getApiInstance().serverHost+"assets/image/?localpath="+e.uploadedPath,alt:"cover-preview-show"}}):e._e(),e._v(" "),o("div",{staticClass:"tip"},[o("span",{staticClass:"tip-upload"},[o("b-field",{staticClass:"file is-primary"},[o("b-upload",{staticClass:"file-label",attrs:{accept:"image/jpeg, image/jpg, image/png"},model:{value:e.file,callback:function(t){e.file=t},expression:"file"}},[o("span",{staticClass:"file-cta"},[o("span",{staticClass:"file-label"},[e._v(e._s(e.$t("common.uploadCover")))])])])],1)],1)])]),e._v(" "),o("b-loading",{attrs:{"is-full-page":!1},model:{value:e.isloading,callback:function(t){e.isloading=t},expression:"isloading"}})],1)}),[],!1,null,"3481ca37",null);t.default=component.exports},347:function(e,t,o){"use strict";o.r(t);o(10);var n={data:function(){return{selectedItem:null,isloading:!1,coverUrls:[],noFFMPEG:!1,errorMessage:void 0}},props:["videoPath"],watch:{videoPath:function(e,t){this.loadCovers()}},mounted:function(){this.loadCovers()},methods:{regenerate:function(){this.loadCovers()},loadCovers:function(){var e=this;!this.isloading&&this.videoPath&&(this.isloading=!0,this.$local.getApiInstance().getThumbnails(this.videoPath).then((function(t){t.ok?(e.coverUrls=t.data,e.selectedItem=e.coverUrls[0],e.$emit("loadCompeted",e.coverUrls)):"NoFFmpeg"===t.errorString?e.noFFMPEG=!0:e.errorMessage=t.message})).catch((function(t){return e.$local.handleClientApiException(e,t)})).finally((function(){e.isloading=!1})))},clickItem:function(e,t){this.selectedItem=e,this.$emit("selected",e)},showSetupModal:function(){this.$refs.setupModal.showModal()}}},r=(o(339),o(27)),component=Object(r.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"selector"},[o("div",{staticClass:"selector-deg"}),e._v(" "),e.isloading?e._e():o("div",{staticClass:"selector-items"},[e.coverUrls.length>0?e._l(e.coverUrls,(function(t,n){return o("div",{key:t,staticClass:"selector-item",class:{"selector-item-selected":e.selectedItem===t},style:{"background-image":"url("+e.$local.getApiInstance().serverHost+"assets/image/?localpath="+t+")"},on:{click:function(o){return e.clickItem(t,n)}}},[e._v("\n        "+e._s(n)+"\n        "),e.selectedItem===t?o("img",{staticClass:"select_ai_img",attrs:{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAwCAYAAAB9sggoAAAAAXNSR0IArs4c6QAAA19JREFUWAnNmM1rE0EUwN9s0tiWBi0oxIIfKNV4kCpi1YMe1Eu95dKD6D8giODVgxXtzYOi1Yseqg1CQL1qD4IeRYQKponSCO2xYoUUmq/d9b1dN9lkN5ud2dkkD5adnZ1977fvvX07Mwx6IZm1IahunQRNPQI6HAbQ8WB7sB0HhgfocdY1rnR+EjRtCjT9PBo/jRAxL9vhgr1a3g9VdgU9cBV0/ZAXSOu9cMDmfx4HVruFXkkhlNJq1M+1XLD0j2Og1mYR6JIf415j5IBlVrZDqXIXDV3DkEW8DPq9FxxsIZsCFZ6gwYRfo37GiYNl9BiUcvfRQ9f9GOIdIwaWLuyDWvk1JvYJXoN+x/ODLSwfxdC9Q6gxv0ZExvF9yi/zZ0HVP4UNRS8S9f02BKVr73H8kO9nAgz0F0ojfOQp2BHAFtejnUNJiW7kVPeg6A28wagkmF9fqInu5kpvMKpTIZYENyCrr32OmRX9jTWw22d3MPr3bZVzCCP1N8Pzcu6hNH/IPYOiF3B6zJi6qF9kzRJ4vGQf6yyw5nxKytTFboi33ewxmnlC9SuvkjDGN+cYTYe7JDeSo7A+PQ6F1EG4kBh2WG14zFg4QAFzq9HnGC6nY2ZiJ9ye2FVX9qtYgQNvV+rX1Gh4jFYzPYAiiPhAA4OuSWw9uMQKWVo9ZZm79+231ayfTTBajHKu++oafDbaQd1ZWoeHuQ2HFhOMVsghihfUzJLTW4TyHwyX7SGJCBShMKANjlLxb6e9BBFuUSiypUBpE/PLe4PDDeri7mGjBlEtoprUKkGgSFcUfZZEMG55fmYM9o4MGM89mEzA6LYIWPkSFIqURhEK96b4JRZprsP2gmlvW5rp67PArT6vM/7EadOMX2ax9jw61TwzcgMizbxQ9Ax+lbiTJyCP8xuGwU6PikCRTgVDiVuLYkKhIcPtRBSK9CmY/MJgpKAdXBAoEww3YqkRRAhuLvcHVE03DmrzJLqbbQYvsmWROuamTGYfJX9RpkJZuij5+w+MwSYlf/+BAaxiKPU1We6Xp0dZpBzLy1MoQxPTIBp5RqHsLzAGT+Hy+HdKftqj6A9h7AMMJm8SjAKDI5/Ra5XekmH4GJtDqCmYZgaLOXeZz35EsHNdhcOSgPZW0TeLlFMUPrv9f7vzJ3SudQKgAAAAAElFTkSuQmCC",alt:"select_ai_img"}}):e._e()])})):e.noFFMPEG?o("b-message",{attrs:{type:"is-warning"}},[o("div",{staticClass:"columns is-vcentered"},[e._v("\n        "+e._s(e.$t("common.needFFmpeg"))+"\n        "),o("b-button",{attrs:{type:"is-text"},on:{click:e.showSetupModal}},[e._v("\n          "+e._s(e.$t("common.clickToInstall"))+"\n        ")]),e._v(" "),o("b-button",{attrs:{type:"is-text"},on:{click:e.regenerate}},[e._v("\n          "+e._s(e.$t("common.regenerate"))+"\n        ")])],1)]):e.errorMessage?o("div",[o("b-message",{attrs:{type:"is-danger"}},[e._v("\n        "+e._s(e.errorMessage)+"\n      ")])],1):e._e()],2),e._v(" "),o("b-loading",{attrs:{"is-full-page":!1},model:{value:e.isloading,callback:function(t){e.isloading=t},expression:"isloading"}},[o("b-icon",{attrs:{pack:"fas",icon:"sync-alt",size:"is-large","custom-class":"fa-spin"}}),e._v(e._s(e.$t("common.generatingCover"))+"\n  ")],1),e._v(" "),o("SetupFFmpegModal",{ref:"setupModal"})],1)}),[],!1,null,"dec14d56",null);t.default=component.exports;installComponents(component,{SetupFFmpegModal:o(334).default})}}]);