(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{376:function(t,e,n){var content=n(480);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("1d79a12b",content,!0,{sourceMap:!1})},479:function(t,e,n){"use strict";var o=n(376);n.n(o).a},480:function(t,e,n){(e=n(16)(!1)).push([t.i,"textarea[data-v-579f54b4]{outline:none;resize:none}.spinner[data-v-579f54b4]{margin:50px auto;width:25px;height:30px;text-align:center;font-size:8px}.spinner>div[data-v-579f54b4]{background-color:#757575;height:100%;width:2px;display:inline-block;-webkit-animation:stretchdelay-data-v-579f54b4 1.2s ease-in-out infinite;animation:stretchdelay-data-v-579f54b4 1.2s ease-in-out infinite}.spinner .rect2[data-v-579f54b4]{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.spinner .rect3[data-v-579f54b4]{-webkit-animation-delay:-1s;animation-delay:-1s}.spinner .rect4[data-v-579f54b4]{-webkit-animation-delay:-.9s;animation-delay:-.9s}.spinner .rect5[data-v-579f54b4]{-webkit-animation-delay:-.8s;animation-delay:-.8s}@-webkit-keyframes stretchdelay-data-v-579f54b4{0%,40%,to{-webkit-transform:scaleY(.4)}20%{-webkit-transform:scaleY(1)}}@keyframes stretchdelay-data-v-579f54b4{0%,40%,to{transform:scaleY(.4);-webkit-transform:scaleY(.4)}20%{transform:scaleY(1);-webkit-transform:scaleY(1)}}",""]),t.exports=e},503:function(t,e,n){"use strict";n.r(e);n(35),n(401),n(28),n(18),n(32),n(69),n(403),n(407),n(408),n(410),n(411),n(412),n(413),n(414),n(415),n(416),n(417),n(418),n(419),n(420),n(422),n(423),n(424),n(425),n(426),n(427),n(428),n(429),n(430),n(431),n(432);var o=n(433),r=n.n(o),c=n(434),l=n(455),d=n.n(l),v=n(477),f=n.n(v),h=n(478),m={data:function(){return{audioFile:null,audioAndText:[],sourcePlay:null,audioCtxPlay:null,transformCheck:!1,exportCheck:!1,typeCheck:!1,token:"24.7c7a79f50db25a9f698ef586ca9891b5.2592000.1604662511.282335-22787298"}},computed:{tab:{get:function(){return this.$store.state.tab},set:function(t){this.$store.commit("setTab",t)}},audioTitle:{get:function(){var title="暂无内容";return this.audioFile&&(title=this.audioFile.name),title}},content:{get:function(){for(var text="",i=0;i<this.audioAndText.length;i++)text+=this.audioAndText[i].text;return text}}},mounted:function(){this.audioCtxPlay=new AudioContext,this.sourcePlay=this.audioCtxPlay.createBufferSource()},methods:{audioFormatCheck:function(t){var e=t.split(".").pop();return!!["m4a","m4r","mp3","wav","flac","ogg","acc","opus"].includes(e)||(this.typeCheck=!0,!1)},expertDoc:function(){for(var t=!0,i=0;i<this.audioAndText;i++)this.audioAndText[i].text&&(t=!1);if(this.audioAndText.length||(t=!1),this.exportCheck=!t,!this.exportCheck){var e=this;f.a.getBinaryContent("/speechToDocx.docx",(function(t,content){if(t)throw t;for(var n=new d.a(content),o=(new c).loadZip(n),text="",r=0;r<e.audioAndText.length;r++)text+=e.audioAndText[r].text;o.setData({title:e.audioFile.name,content:text});try{o.render()}catch(t){var l={message:t.message,name:t.name,stack:t.stack,properties:t.properties};throw console.log(JSON.stringify({error:l})),t}var v=o.getZip().generate({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"});Object(h.saveAs)(v,e.audioFile.name.split(".")[0]+".docx")}))}},transformAudio:function(){this.transformCheck=!this.audioFile,this.transformCheck||this.audioFormatCheck(this.audioFile.name)&&(this.audioAndText=[],this.getFile())},playAudio:function(t){for(var i=0;i<this.audioAndText.length;i++){var e=this.audioAndText[i];e.source_play.play&&(e.source_play.context.suspend(),e.source_play.play=0)}t.play=1,"suspended"!==t.context.state?t.source.start():t.context.resume()},stopAudio:function(t){t.context.suspend(),t.play=0},transformArrayBufferToBase64:function(t){for(var e="",n=new Uint8Array(t),o=n.byteLength,i=0;i<o;i++)e+=String.fromCharCode(n[i]);return window.btoa(e)},postBackend:function(t){t.transform_num&&(t.transform_num=0);var e={format:"wav",rate:16e3,channel:1,cuid:"a6:83:e7:5a:57:64",speech:t.audio,len:t.length,dev_pid:1537,token:"24.7c7a79f50db25a9f698ef586ca9891b5.2592000.1604662511.282335-22787298"};this.$axios.post("https://api.yingshinet.com/audio",e).then((function(e){"200"==e.status?(t.text=e.data.data.result[0],t.transform_num+=1):t.transform_num+=1})).catch((function(e){t.transform_num+=1,console.log(e)}))},postBaiduApi:function(t){t.transform_num&&(t.transform_num=0);var e=JSON.stringify({format:"wav",rate:16e3,channel:1,cuid:"a6:83:e7:5a:57:64",speech:t.audio,len:t.length,dev_pid:1537,token:"24.7c7a79f50db25a9f698ef586ca9891b5.2592000.1604662511.282335-22787298"});this.$axios.post("https://cors-anywhere.herokuapp.com/http://vop.baidu.com/server_api",e,{headers:{"Content-Type":"audio/wav;rate=16000"}}).then((function(e){"200"==e.status?(t.text=e.data.result,t.transform_num+=1):t.transform_num+=1})).catch((function(e){t.transform_num+=1,console.log(e)}))},getFile:function(){var t=new FileReader,e=null,n=null,o=this;t.addEventListener("load",(function(t){e=t.target.result,(new AudioContext).decodeAudioData(e,(function(t){var e=(n=t).numberOfChannels,c=n.sampleRate,l=t.length,d=0,v=50*c;v>l&&(v=l);for(var f=function(){for(var t=v-d,f=(new AudioContext).createBuffer(e,v-d,c),h=new Float32Array(t),m=0;m<e;m++)n.copyFromChannel(h,m,d),f.copyToChannel(h,m,0);var x=new OfflineAudioContext(1,8e5,16e3),y=x.createBufferSource();y.buffer=f,y.connect(x.destination),y.start(),x.startRendering().then((function(t){var e=r()(t),n=o.transformArrayBufferToBase64(e),c=new AudioContext,l=c.createBufferSource();l.buffer=f,l.connect(c.destination),o.audioAndText.push({audio:n,source_play:{context:c,source:l,play:0},text:"",length:e.byteLength,transform_num:0}),o.postBackend(o.audioAndText[o.audioAndText.length-1])})).catch((function(t){console.log("失败: "+t)})),d+=50*c,(v+=50*c)>l&&(v=l)};v<=l&&d<v;)f()}))})),t.readAsArrayBuffer(this.audioFile)}}},x=(n(479),n(88)),y=n(133),k=n.n(y),_=n(170),C=n(168),w=n(79),A=n(501),T=n(505),F=n(360),B=n(504),V=n(169),S=n(357),j=n(57),D=n(358),O=n(502),component=Object(x.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-row",[n("v-col",[1==this.tab?n("v-sheet",{attrs:{"min-height":"80vh",rounded:"lg"}},[n("v-row",{staticClass:"pt-12",attrs:{justify:"center",align:"center"}},[n("v-spacer"),t._v(" "),n("v-col",{staticClass:"title",staticStyle:{"text-align":"center"},attrs:{cols:"6"}},[t._v("\n            "+t._s(t.audioTitle)+"\n          ")]),t._v(" "),n("v-col",{attrs:{cols:"3"}},[n("v-btn",{staticStyle:{height:"32px"},attrs:{rounded:"",color:"grey darken-1",dark:""},on:{click:t.expertDoc}},[t._v("\n              导出\n            ")])],1)],1),t._v(" "),n("v-row",{staticClass:"pt-6",attrs:{justify:"center"}},[n("v-col",{staticClass:"body-1",attrs:{cols:"10"}},[t._v("\n                    "+t._s(t.content)+"\n          ")])],1)],1):n("v-sheet",{attrs:{"min-height":"80vh",rounded:"lg"}},[n("v-row",{staticClass:"pt-12",attrs:{align:"center",justify:"center"}},[n("v-spacer"),t._v(" "),n("v-col",{staticStyle:{"min-width":"230px"},attrs:{cols:"4"}},[n("v-file-input",{attrs:{chips:"","show-size":"","truncate-length":"10",label:"请输入音频文件","prepend-icon":"mdi-music-clef-treble"},model:{value:t.audioFile,callback:function(e){t.audioFile=e},expression:"audioFile"}})],1),t._v(" "),n("v-col",{attrs:{cols:"4"}},[n("v-row",[n("v-col",[n("v-btn",{staticClass:"ml-6",staticStyle:{height:"32px"},attrs:{rounded:"",color:"grey darken-1",dark:""},on:{click:t.transformAudio}},[t._v("\n                  转换\n                ")])],1)],1)],1)],1),t._v(" "),t._l(t.audioAndText,(function(e,o){return n("v-row",{key:o,attrs:{justify:"center",align:"center"}},[n("v-col",{attrs:{cols:"2"}},[n("v-row",{staticClass:"pr-5",attrs:{justify:"end"}},[0==e.source_play.play?n("v-icon",{on:{click:function(n){return t.playAudio(e.source_play)}}},[t._v("\n                mdi-play\n              ")]):n("v-icon",{on:{click:function(n){return t.stopAudio(e.source_play)}}},[t._v("\n                mdi-pause-circle-outline\n              ")])],1)],1),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-textarea",{attrs:{rows:"2","auto-grow":""},model:{value:t.audioAndText[o].text,callback:function(e){t.$set(t.audioAndText[o],"text",e)},expression:"audioAndText[index].text"}})],1),t._v(" "),n("v-col",{attrs:{cols:"2"}},[t.audioAndText[o].transform_num?n("div",[t.audioAndText[o].text?n("v-icon",{attrs:{color:"green"}},[t._v("\n                mdi-check\n              ")]):n("v-icon",{attrs:{color:"red"}},[t._v("\n                mdi-close\n              ")]),t._v(" "),t.audioAndText[o].text?n("span",[t._v("\n                完成\n              ")]):n("v-btn",{attrs:{icon:"",color:"grey darken-1",dark:""},on:{click:function(n){return t.postBackend(e)}}},[n("v-icon",[t._v("\n                  mdi-sync\n                ")])],1)],1):n("div",{staticClass:"spinner"},[n("div",{staticClass:"rect1"}),t._v(" "),n("div",{staticClass:"rect2"}),t._v(" "),n("div",{staticClass:"rect3"}),t._v(" "),n("div",{staticClass:"rect4"}),t._v(" "),n("div",{staticClass:"rect5"})])])],1)}))],2)],1)],1),t._v(" "),n("v-row",{attrs:{justify:"center"}},[n("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:t.transformCheck,callback:function(e){t.transformCheck=e},expression:"transformCheck"}},[n("v-card",[n("v-card-title",{staticClass:"title"},[t._v("\n          请先输入音频文件再转换\n        ")]),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){t.transformCheck=!1}}},[t._v("\n            确定\n          ")])],1)],1)],1)],1),t._v(" "),n("v-row",{attrs:{justify:"center"}},[n("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:t.exportCheck,callback:function(e){t.exportCheck=e},expression:"exportCheck"}},[n("v-card",[n("v-card-title",{staticClass:"title"},[t._v("\n          请先转换完成再导出\n        ")]),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){t.exportCheck=!1}}},[t._v("\n            确定\n          ")])],1)],1)],1)],1),t._v(" "),n("v-row",{attrs:{justify:"center"}},[n("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:t.typeCheck,callback:function(e){t.typeCheck=e},expression:"typeCheck"}},[n("v-card",[n("v-card-title",{staticClass:"title"},[t._v("\n          文件格式不符合要求\n        ")]),t._v(" "),n("v-card-text",[t._v("\n          支持格式：m4a、m4r、mp3、wav、flac、ogg、acc、opus\n        ")]),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){t.typeCheck=!1}}},[t._v("\n            确定\n          ")])],1)],1)],1)],1)],1)}),[],!1,null,"579f54b4",null);e.default=component.exports;k()(component,{VBtn:_.a,VCard:C.a,VCardActions:w.a,VCardText:w.b,VCardTitle:w.c,VCol:A.a,VContainer:T.a,VDialog:F.a,VFileInput:B.a,VIcon:V.a,VRow:S.a,VSheet:j.a,VSpacer:D.a,VTextarea:O.a})}}]);