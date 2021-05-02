(function(){var t={2142:function(t,e,n){"use strict";n(7726),n(3473),n(2151),n(1286);var r=n(144),s=n(9960),a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("img",{attrs:{alt:"Vue logo",src:n(8257)}}),r("Home")],1)},o=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("b-overlay",{attrs:{show:t.running,rounded:"sm"}},[n("input",{ref:"uploadFiles",attrs:{type:"file"},on:{change:t.updateFormData}}),t.files?n("button",{attrs:{type:"submit"},on:{click:t.submitFile}},[t._v("Upload")]):t._e(),t.serverError?n("div",[n("h4",[n("br"),t._v("Sorry, request failed.")]),n("h5",[t._v("Server reports: "+t._s(t.serverError))])]):t._e(),t.responseData?n("div",{staticStyle:{margin:"5%"}},[n("p",[n("br"),t._v("Retrieved "+t._s(t.responseData.data.length)+" unique IPs,")]),n("p",[t._v(t._s(t.overallLogEntries())+" log entries")]),t.responseData.data.length?n("b-list-group",[n("b-list-group-item",{staticClass:"d-flex"},[n("span",{staticClass:"ip-header clickable",on:{click:function(e){return t.sortBy("ip")}}},[n("strong",[t._v("IP")])]),n("span",{staticClass:"fqdn-header clickable",on:{click:function(e){return t.sortBy("fqdn")}}},[n("strong",[t._v("Hostname")])]),n("span",{staticClass:"calls-header clickable",on:{click:function(e){return t.sortBy("calls")}}},[n("strong",[t._v("Log entries")])])]),t._l(t.responseData.data,(function(e){return n("b-list-group-item",{key:e.ip,staticClass:"d-flex"},[n("span",{staticClass:"ip-entry"},[t._v(t._s(e.ip))]),n("span",{staticClass:"fqdn-entry"},[t._v(t._s(e.fqdn))]),n("span",{staticClass:"calls-entry"},[t._v(t._s(e.calls))])])}))],2):t._e()],1):t._e()])],1)},u=[],l=(n(4747),n(8309),n(1539),n(5827),n(9653),n(4916),n(4723),n(9669)),c=n.n(l),f=c().create(),p={name:"Home",data:function(){return{http:f,responseData:void 0,serverError:void 0,files:void 0,running:!1}},methods:{updateFormData:function(){var t=this;this.files=[],this.$refs.uploadFiles.files.forEach((function(e){var n=new FormData;n.append(e.name,e,e.name),t.files.push(n)})),this.serverError=void 0},submitFile:function(){var t=this;this.running=!0,this.responseData=void 0,f.post("/ParseLogFile",this.files[0],{baseURL:this.getAPIBaseURL(),headers:{"Content-Type":"multipart/form-data",Accept:"application/json"}}).then((function(e){t.responseData=t.addUnresolvedPlaceholders(e.data),t.serverError=void 0})).catch((function(e){e.response&&e.response.data&&e.response.data.errorMessage?t.serverError=e.response.data.errorMessage:t.serverError=e.message})).finally((function(){t.running=!1}))},getAPIBaseURL:function(){return"https://lisper.ch/assessment-api"},addUnresolvedPlaceholders:function(t){return t.data.forEach((function(t){0===t.fqdn.length&&(t.fqdn="(Unresolved)")})),t},overallLogEntries:function(){return this.responseData?this.responseData.data.reduce((function(t,e){return t+e.calls}),0):0},sortCallbackIPV4Captures:function(t,e){for(var n=function(n){return[Number(parseInt(t[n],10)),Number(parseInt(e[n],10))]},r=1;r<5;r+=1){var s=n(r);if(s[0]<s[1])return-1;if(s[0]>s[1])return 1}return 0},sortByIp:function(){var t=this,e=/^([\d]+)\.([\d]+)\.([\d]+)\.([\d]+)/im;this.responseData.data.sort((function(n,r){var s=n.ip.match(e),a=r.ip.match(e);return null==s&&null==a?0:null==s?-1:null==a?1:t.sortCallbackIPV4Captures(s,a)}))},sortBy:function(t){"ip"===t?this.sortByIp():this.responseData.data=this.responseData.data.sort((function(e,n){return e[t]===n.field?0:n[t]<e[t]?1:-1}))}}},d=p,v=n(5961),h=(0,v.Z)(d,i,u,!1,null,"09b6097d",null),m=h.exports,g={name:"app",components:{Home:m}},b=g,_=(0,v.Z)(b,a,o,!1,null,null,null),y=_.exports;n(3192);r.default.use(s.ZPm),r.default.config.productionTip=!1,new r.default({render:function(t){return t(y)}}).$mount("#app")},8257:function(t,e,n){t.exports=n.p+"img/logo.26bd867d.png"}},e={};function n(r){var s=e[r];if(void 0!==s)return s.exports;var a=e[r]={exports:{}};return t[r](a,a.exports,n),a.exports}n.m=t,function(){var t=[];n.O=function(e,r,s,a){if(!r){var o=1/0;for(l=0;l<t.length;l++){r=t[l][0],s=t[l][1],a=t[l][2];for(var i=!0,u=0;u<r.length;u++)(!1&a||o>=a)&&Object.keys(n.O).every((function(t){return n.O[t](r[u])}))?r.splice(u--,1):(i=!1,a<o&&(o=a));i&&(t.splice(l--,1),e=s())}return e}a=a||0;for(var l=t.length;l>0&&t[l-1][2]>a;l--)t[l]=t[l-1];t[l]=[r,s,a]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){n.p="/triman-assessment/"}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,r){var s,a,o=r[0],i=r[1],u=r[2],l=0;for(s in i)n.o(i,s)&&(n.m[s]=i[s]);for(u&&u(n),e&&e(r);l<o.length;l++)a=o[l],n.o(t,a)&&t[a]&&t[a][0](),t[o[l]]=0;n.O()},r=self["webpackChunktriman_assessment_client"]=self["webpackChunktriman_assessment_client"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(2142)}));r=n.O(r)})();
//# sourceMappingURL=app.1e7a7a23.js.map