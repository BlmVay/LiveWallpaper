(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{325:function(t,e,n){"use strict";n.r(e);var o=n(1),r=(n(30),n(10),{data:function(){return{isBusy:!1,enableCustomUrl:!1,downloadUrl:this.defaultUrl,stoping:!1,innerShow:this.show}},props:["show","defaultUrl","progress","completed","successed"],watch:{innerShow:function(t,e){this.$emit("update:show",t)},show:function(t,e){this.innerShow=t},defaultUrl:function(t,e){console.log(t,e),t&&!this.downloadUrl&&(this.downloadUrl=t)}},computed:{downloading:function(){return this.progress>0||this.progress<100}},methods:{start:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.isBusy){e.next=2;break}return e.abrupt("return");case 2:return t.isBusy=!0,n=new Promise((function(e){return t.$emit("start",t.downloadUrl,e)})),e.next=6,n;case 6:e.sent,t.isBusy=!1;case 8:case"end":return e.stop()}}),e)})))()},stop:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.stoping=!0,n=new Promise((function(e){return t.$emit("stop",e)})),e.next=4,n;case 4:t.stoping=!1;case 5:case"end":return e.stop()}}),e)})))()}}}),c=n(27),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-modal",{model:{value:t.innerShow,callback:function(e){t.innerShow=e},expression:"innerShow"}},[n("div",{staticClass:"card"},[n("header",{staticClass:"card-header"},[n("p",{staticClass:"card-header-title"},[t._t("header")],2),t._v(" "),n("b-switch",{attrs:{disabled:t.isBusy},model:{value:t.enableCustomUrl,callback:function(e){t.enableCustomUrl=e},expression:"enableCustomUrl"}},[t._v(t._s(t.$t("local.customUrlTip")))])],1),t._v(" "),n("div",{staticClass:"card-content"},[n("div",{staticClass:"content"},[t.enableCustomUrl?n("div",{staticClass:"columns subtitle"},[n("div",{staticClass:"column is-11"},[n("b-input",{attrs:{disabled:t.isBusy,placeholder:t.$t("local.customUrlPlaceholder"),"icon-pack":"fas","icon-right":"undo","icon-right-clickable":""},on:{"icon-right-click":function(e){t.downloadUrl=t.defaultUrl}},model:{value:t.downloadUrl,callback:function(e){t.downloadUrl=e},expression:"downloadUrl"}})],1),t._v(" "),n("div",{staticClass:"column"},[t._t("help")],2),t._v(" "),n("div",{staticClass:"column"})]):t._e(),t._v(" "),n("b-progress",{attrs:{value:t.progress,"show-value":"",type:t.completed?"is-success":"is-info"}},[t._t("text")],2)],1)]),t._v(" "),n("footer",{staticClass:"card-footer"},[n("div",{staticClass:"card-footer-item"}),t._v(" "),n("div",{staticClass:"card-footer-item"}),t._v(" "),t.successed?n("b-button",{staticClass:"card-footer-item",attrs:{type:"is-success"},on:{click:function(e){t.innerShow=!1}}},[t._v(t._s(t.$t("common.close")))]):t.isBusy?t.isBusy||t.downloading?n("b-button",{staticClass:"card-footer-item",attrs:{loading:t.stoping,disabled:t.stoping,type:"is-danger"},on:{click:t.stop}},[t._v(t._s(t.$t("common.stop"))+"\n      ")]):t._e():n("b-button",{staticClass:"card-footer-item",attrs:{type:"is-info"},on:{click:t.start}},[t._v("\n        "+t._s(t.$t("common.start"))+"\n      ")])],1)])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Header:n(166).default,Footer:n(98).default})}}]);