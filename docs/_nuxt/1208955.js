(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{374:function(t,e,n){var content=n(483);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("51b0564e",content,!0,{sourceMap:!1})},482:function(t,e,n){"use strict";var o=n(374);n.n(o).a},483:function(t,e,n){(e=n(16)(!1)).push([t.i,"textarea[data-v-5debaefd]{outline:none;resize:none}",""]),t.exports=e},506:function(t,e,n){"use strict";n.r(e);n(401),n(28),n(18),n(53),n(403),n(407),n(408),n(410),n(411),n(412),n(413),n(414),n(415),n(416),n(417),n(418),n(419),n(420),n(422),n(423),n(424),n(425),n(426),n(427),n(428),n(429),n(430),n(431),n(432),n(54),n(433);var o=n(437),r=n.n(o),c=n(438),d=n(459),l=n.n(d),f=n(481),v=n.n(f),h={data:function(){return{audioFile:null,audioAndText:[],sourcePlay:null,audioCtxPlay:null,transformCheck:!1,exportCheck:!1,token:"24.7c7a79f50db25a9f698ef586ca9891b5.2592000.1604662511.282335-22787298"}},mounted:function(){this.audioCtxPlay=new AudioContext,this.sourcePlay=this.audioCtxPlay.createBufferSource()},methods:{expertDoc:function(){for(var t=!0,i=0;i<this.audioAndText;i++)this.audioAndText[i].text&&(t=!1);if(this.audioAndText.length||(t=!1),this.exportCheck=!t,!this.exportCheck){var e=this;v.a.getBinaryContent("/speechToDocx.docx",(function(t,content){if(t)throw t;for(var n=new l.a(content),o=(new c).loadZip(n),text="",r=0;r<e.audioAndText.length;r++)text+=e.audioAndText[r].text;o.setData({title:e.audioFile.name,content:text});try{o.render()}catch(t){var d={message:t.message,name:t.name,stack:t.stack,properties:t.properties};throw console.log(JSON.stringify({error:d})),t}var f=o.getZip().generate({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"}),v=document.createElement("a");v.download=e.audioFile.name+".docx",v.style.display="none";var h=URL.createObjectURL(f);v.href=h,document.body.appendChild(v),v.click(),document.body.removeChild(v)}))}},transformAudio:function(){this.transformCheck=!this.audioFile,this.transformCheck||(this.audioAndText=[],this.getFile())},playAudio:function(t){for(var i=0;i<this.audioAndText.length;i++){var e=this.audioAndText[i];e.source_play.play&&(e.source_play.context.suspend(),e.source_play.play=0)}t.play=1,"suspended"!==t.context.state?t.source.start():t.context.resume()},stopAudio:function(t){t.context.suspend(),t.play=0},transformArrayBufferToBase64:function(t){for(var e="",n=new Uint8Array(t),o=n.byteLength,i=0;i<o;i++)e+=String.fromCharCode(n[i]);return window.btoa(e)},postBackend:function(t){var e={format:"wav",rate:16e3,channel:1,cuid:"a6:83:e7:5a:57:64",speech:t.audio,len:t.length,dev_pid:1537,token:"24.7c7a79f50db25a9f698ef586ca9891b5.2592000.1604662511.282335-22787298"};this.$axios.post("http://127.0.0.1:5002/audio",e).then((function(e){"200"==e.status?(t.text=e.data.data.result[0],t.transform_num+=1):t.transform_num+=1})).catch((function(e){t.transform_num+=1,console.log(e)}))},postBaiduApi:function(t){var e=JSON.stringify({format:"wav",rate:16e3,channel:1,cuid:"a6:83:e7:5a:57:64",speech:t.audio,len:t.length,dev_pid:1537,token:"24.7c7a79f50db25a9f698ef586ca9891b5.2592000.1604662511.282335-22787298"});this.$axios.post("https://cors-anywhere.herokuapp.com/http://vop.baidu.com/server_api",e,{headers:{"Content-Type":"audio/wav;rate=16000"}}).then((function(e){"200"==e.status?(t.text=e.data.result,t.transform_num+=1):t.transform_num+=1})).catch((function(e){t.transform_num+=1,console.log(e)}))},getFile:function(){var t=new FileReader,e=null,n=null,o=this;t.addEventListener("load",(function(t){e=t.target.result,(new AudioContext).decodeAudioData(e,(function(t){for(var e=(n=t).numberOfChannels,c=n.sampleRate,d=t.length,l=0,f=50*c,v=function(){for(var t=f-l,v=(new AudioContext).createBuffer(e,f-l,c),h=new Float32Array(t),x=0;x<e;x++)n.copyFromChannel(h,x,l),v.copyToChannel(h,x,0);var m=new OfflineAudioContext(1,8e5,16e3),y=m.createBufferSource();y.buffer=v,y.connect(m.destination),y.start(),m.startRendering().then((function(t){var e=r()(t),n=o.transformArrayBufferToBase64(e),c=new AudioContext,d=c.createBufferSource();d.buffer=v,d.connect(c.destination),o.audioAndText.push({audio:n,source_play:{context:c,source:d,play:0},text:"",length:e.byteLength,transform_num:0}),o.postBaiduApi(o.audioAndText[o.audioAndText.length-1])})).catch((function(t){console.log("失败: "+t)})),l+=50*c,(f+=50*c)>d&&(f=d)};f<=d&&l<f;)v()}))})),t.readAsArrayBuffer(this.audioFile)}}},x=(n(482),n(88)),m=n(132),y=n.n(m),k=n(169),_=n(167),A=n(83),C=n(503),w=n(504),T=n(507),B=n(358),F=n(508),V=n(168),S=n(355),j=n(57),D=n(356),O=n(505),component=Object(x.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-row",[n("v-col",[n("v-sheet",{attrs:{"min-height":"80vh",rounded:"lg"}},[n("v-row",{staticClass:"pt-12",attrs:{align:"center",justify:"center"}},[n("v-spacer"),t._v(" "),n("v-col",{staticStyle:{"min-width":"230px"},attrs:{cols:"4"}},[n("v-file-input",{attrs:{chips:"","show-size":"","truncate-length":"10",label:"请输入音频文件","prepend-icon":"mdi-music-clef-treble"},model:{value:t.audioFile,callback:function(e){t.audioFile=e},expression:"audioFile"}})],1),t._v(" "),n("v-col",{attrs:{cols:"4"}},[n("v-row",[n("v-col",[t.audioFile?n("v-btn",{attrs:{rounded:"",color:"grey darken-1",dark:""},on:{click:t.transformAudio}},[t._v("\n                  转换\n                ")]):n("v-btn",{attrs:{rounded:"",outlined:"",color:"grey darken-1",dark:""},on:{click:t.transformAudio}},[t._v("\n                  转换\n                ")])],1),t._v(" "),n("v-col",[t.audioAndText.length?n("v-btn",{attrs:{rounded:"",color:"grey darken-1",dark:""},on:{click:t.expertDoc}},[t._v("\n                  导出\n                ")]):n("v-btn",{attrs:{rounded:"",outlined:"",color:"grey darken-1",dark:""},on:{click:t.expertDoc}},[t._v("\n                  导出\n                ")])],1)],1)],1)],1),t._v(" "),t._l(t.audioAndText,(function(e,o){return n("v-row",{key:o,attrs:{justify:"center",align:"center"}},[n("v-col",{attrs:{cols:"2"}},[n("v-row",{staticClass:"pr-10",attrs:{justify:"end"}},[0==e.source_play.play?n("v-icon",{on:{click:function(n){return t.playAudio(e.source_play)}}},[t._v("\n                mdi-play\n              ")]):n("v-icon",{on:{click:function(n){return t.stopAudio(e.source_play)}}},[t._v("\n                mdi-pause-circle-outline\n              ")])],1)],1),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-textarea",{attrs:{rows:"2","auto-grow":""},model:{value:t.audioAndText[o].text,callback:function(e){t.$set(t.audioAndText[o],"text",e)},expression:"audioAndText[index].text"}})],1),t._v(" "),n("v-col",{attrs:{cols:"2"}},[t.audioAndText[o].transform_num?n("div",[t.audioAndText[o].text?n("v-icon",{attrs:{color:"green"}},[t._v("\n                mdi-check\n              ")]):n("v-icon",{attrs:{color:"red"}},[t._v("\n                mdi-close\n              ")]),t._v(" "),t.audioAndText[o].text?n("span",[t._v("\n                完成\n              ")]):n("v-chip",{attrs:{rounded:"",color:"grey darken-1",dark:""},on:{click:function(n){return t.postBaiduApi(e)}}},[t._v("\n                重转\n              ")])],1):n("span",[t._v("\n              转换中，请等待\n            ")])])],1)}))],2)],1)],1),t._v(" "),n("v-row",{attrs:{justify:"center"}},[n("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:t.transformCheck,callback:function(e){t.transformCheck=e},expression:"transformCheck"}},[n("v-card",[n("v-card-title",{staticClass:"title"},[t._v("\n          请先输入音频文件再转换\n        ")]),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){t.transformCheck=!1}}},[t._v("\n            确定\n          ")])],1)],1)],1)],1),t._v(" "),n("v-row",{attrs:{justify:"center"}},[n("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:t.exportCheck,callback:function(e){t.exportCheck=e},expression:"exportCheck"}},[n("v-card",[n("v-card-title",{staticClass:"title"},[t._v("\n          请先转换完成再导出\n        ")]),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){t.exportCheck=!1}}},[t._v("\n            确定\n          ")])],1)],1)],1)],1)],1)}),[],!1,null,"5debaefd",null);e.default=component.exports;y()(component,{VBtn:k.a,VCard:_.a,VCardActions:A.a,VCardTitle:A.c,VChip:C.a,VCol:w.a,VContainer:T.a,VDialog:B.a,VFileInput:F.a,VIcon:V.a,VRow:S.a,VSheet:j.a,VSpacer:D.a,VTextarea:O.a})}}]);