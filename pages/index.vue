<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet
          v-if="this.tab == 1"
          min-height="80vh"
          rounded="lg"
        >
          <v-row justify="center" align="center" class="pt-12">
            <v-spacer />
            <v-col cols="6" style="text-align: center" class="title">
              {{ audioTitle }}
            </v-col>
            <v-col cols="3">
              <v-btn
                rounded
                color="grey darken-1"
                dark
                style="height:32px"
                @click="expertDoc"
              >
                导出
              </v-btn>
            </v-col>
          </v-row>
          <v-row justify="center" class="pt-6">
            <v-col cols="10" class="body-1">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ content }}
            </v-col>
          </v-row>
        </v-sheet>
        <v-sheet
          v-else
          min-height="80vh"
          rounded="lg"
        >
          <v-row align="center" justify="center" class="pt-12">
            <v-spacer />
            <v-col cols="4" style="min-width: 230px">
              <v-file-input
                v-model="audioFile"
                chips
                show-size
                truncate-length="10"
                label="请输入音频文件"
                prepend-icon="mdi-music-clef-treble"
              />
            </v-col>
            <v-col cols="4">
              <v-row>
                <v-col>
                  <v-btn
                    rounded
                    color="grey darken-1"
                    class="ml-6"
                    dark
                    style="height:32px"
                    @click="transformAudio"
                  >
                    转换
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row v-for="(at, index) in audioAndText" :key="index" justify="center" align="center">
            <v-col cols="2">
              <v-row class="pr-5" justify="end">
                <v-icon v-if="at.source_play.play == 0" @click="playAudio(at.source_play)">
                  mdi-play
                </v-icon>
                <v-icon v-else @click="stopAudio(at.source_play)">
                  mdi-pause-circle-outline
                </v-icon>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-textarea
                v-model="audioAndText[index].text"
                rows="2"
                auto-grow
              />
              <!--              <v-textarea v-model="audioAndText[index].text" ></v-textarea>-->
            </v-col>
            <v-col cols="2">
              <div v-if="!audioAndText[index].transform_num" class="spinner">
                <div class="rect1"></div>
                <div class="rect2"></div>
                <div class="rect3"></div>
                <div class="rect4"></div>
                <div class="rect5"></div>
              </div>
              <div v-else>
                <v-icon v-if="!audioAndText[index].text" color="red">
                  mdi-close
                </v-icon>
                <v-icon v-else color="green">
                  mdi-check
                </v-icon>
                <v-btn
                  v-if="!audioAndText[index].text"
                  icon
                  color="grey darken-1"
                  dark
                  @click="postBackend(at)"
                >
                  <v-icon>
                    mdi-sync
                  </v-icon>
                </v-btn>
                <span v-else>
                  完成
                </span>
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="transformCheck"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="title">
            请先输入音频文件再转换
          </v-card-title>

          <v-card-actions>
            <v-spacer />

            <v-btn
              color="green darken-1"
              text
              @click="transformCheck = false"
            >
              确定
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="exportCheck"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="title">
            请先转换完成再导出
          </v-card-title>

          <v-card-actions>
            <v-spacer />

            <v-btn
              color="green darken-1"
              text
              @click="exportCheck = false"
            >
              确定
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="typeCheck"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="title">
            文件格式不符合要求
          </v-card-title>
          <v-card-text>
            支持格式：m4a、m4r、mp3、wav、flac、ogg、acc、opus
          </v-card-text>

          <v-card-actions>
            <v-spacer />

            <v-btn
              color="green darken-1"
              text
              @click="typeCheck = false"
            >
              确定
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import audioBufferToWav from 'audiobuffer-to-wav'
import * as Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
export default {
  data: () => ({
    audioFile: null,
    audioAndText: [],
    sourcePlay: null,
    audioCtxPlay: null,
    transformCheck: false,
    exportCheck: false,
    typeCheck: false,
    token: '24.7c7a79f50db25a9f698ef586ca9891b5.2592000.1604662511.282335-22787298'
  }),
  computed: {
    tab: {
      get () {
        return this.$store.state.tab
      },
      set (val) {
        this.$store.commit('setTab', val)
      }
    },
    audioTitle: {
      get () {
        let title = '暂无内容'
        if (this.audioFile) {
          title = this.audioFile.name
        }
        return title
      }
    },
    content: {
      get () {
        let text = ''
        for (let i = 0; i < this.audioAndText.length; i++) {
          text += this.audioAndText[i].text
        }
        return text
      }
    }
  },
  mounted () {
    this.audioCtxPlay = new AudioContext()
    // 创建AudioBufferSourceNode对象
    this.sourcePlay = this.audioCtxPlay.createBufferSource()
    // 创建AudioBufferSourceNode对象
    // const source = audioCtx.createBufferSource()
    // this.$axios
    //   .post('/token', {
    //     grant_type: 'client_credentials',
    //     client_id: 'cCUwhUDGXgtH33IXBDRUqdf7',
    //     client_secret: 'GBVjAGEhKID1SMWmmPvRcMzcL4mkGuSY'
    //   })
    //   .then((res) => {
    //     this.token = res
    //     console.log('token: ', this.token)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // 设置APPID/AK/SK
    // const APP_ID = '22787298'
    // const API_KEY = 'cCUwhUDGXgtH33IXBDRUqdf7'
    // const SECRET_KEY = 'GBVjAGEhKID1SMWmmPvRcMzcL4mkGuSY'
    // 新建一个对象，建议只保存一个对象调用服务接口
    // this.client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY)
  },
  methods: {
    audioFormatCheck (name) {
      const fileType = name.split('.').pop()
      const types = ['m4a', 'm4r', 'mp3', 'wav', 'flac', 'ogg', 'acc', 'opus']
      // console.log(types, fileType, name.split('.'), name)
      // console.log(types.includes(fileType))
      if (!types.includes(fileType)) {
        this.typeCheck = true
        return false
      }
      return true
    },
    expertDoc () {
      let flag = true
      for (let i = 0; i < this.audioAndText; i++) {
        if (this.audioAndText[i].text) {
          flag = false
        }
      }
      if (!this.audioAndText.length) {
        flag = false
      }
      this.exportCheck = !flag
      if (this.exportCheck) {
        return
      }
      const that = this
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent('/speechToDocx.docx', function (error, content) {
        // model.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
        // 抛出异常
        if (error) {
          throw error
        }
        // 创建一个PizZip实例，内容为模板的内容
        const zip = new PizZip(content)
        // 创建并加载docxtemplater实例对象
        const doc = new Docxtemplater().loadZip(zip)
        let text = ''
        for (let i = 0; i < that.audioAndText.length; i++) {
          text += that.audioAndText[i].text
        }
        // 设置模板变量的值
        doc.setData({
          title: that.audioFile.name,
          content: text
        })
        try {
          // 用模板变量的值替换所有模板变量
          doc.render()
        } catch (error) {
          // 抛出异常
          const e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          }
          console.log(JSON.stringify({ error: e }))
          throw error
        }

        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        const out = doc.getZip().generate({
          type: 'blob',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        })
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, that.audioFile.name.split('.')[0] + '.docx')
        // const eleLink = document.createElement('a')
        // eleLink.download = that.audioFile.name + '.txt'
        // eleLink.style.display = 'none'
        // const exportBlob = new Blob([that.content])
        // const url = URL.createObjectURL(exportBlob)
        // eleLink.href = url
        // // 受浏览器安全策略的因素，动态创建的元素必须添加到浏览器后才能实施点击
        // document.body.appendChild(eleLink)
        // // 触发点击
        // eleLink.click()
        // // 然后移除
        // document.body.removeChild(eleLink)
      })
    },
    transformAudio () {
      this.transformCheck = !this.audioFile
      if (this.transformCheck) {
        return
      }
      if (!this.audioFormatCheck(this.audioFile.name)) {
        return
      }
      this.audioAndText = []
      this.getFile()
    },
    playAudio (sp) {
      for (let i = 0; i < this.audioAndText.length; i++) {
        const at = this.audioAndText[i]
        // console.log('状态：', at.source_play.play)
        if (at.source_play.play) {
          at.source_play.context.suspend()
          at.source_play.play = 0
        }
      }
      sp.play = 1
      if (sp.context.state === 'suspended') {
        sp.context.resume()
        return
      }
      sp.source.start()
    },
    stopAudio (sp) {
      // sp.source.pause()
      sp.context.suspend()
      sp.play = 0
    },
    transformArrayBufferToBase64 (buffer) {
      let binary = ''
      const bytes = new Uint8Array(buffer)
      for (let len = bytes.byteLength, i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      return window.btoa(binary)
    },
    postBackend (audioAndText) {
      if (audioAndText.transform_num) {
        audioAndText.transform_num = 0
      }
      // const config = {
      //   headers: { 'Content-Type': 'audio/wav;rate=16000' }
      // }
      const payload = {
        format: 'wav',
        rate: 16000,
        channel: 1,
        cuid: 'a6:83:e7:5a:57:64',
        speech: audioAndText.audio,
        len: audioAndText.length,
        dev_pid: 1537,
        token: '24.7c7a79f50db25a9f698ef586ca9891b5.2592000.1604662511.282335-22787298'
      }
      this.$axios
        .post('https://api.yingshinet.com/audio', payload)
        .then((res) => {
          // eslint-disable-next-line eqeqeq
          if (res.status == '200') {
            // console.log('success, ', res)
            audioAndText.text = res.data.data.result[0]
            audioAndText.transform_num += 1
            // if (!res.data.result) {
            //   // console.log(res)
            // }
          } else {
            audioAndText.transform_num += 1
            // console.log(res)
          }
        })
        .catch((err) => {
          audioAndText.transform_num += 1
          console.log(err)
        })
    },
    postBaiduApi (audioAndText) {
      if (audioAndText.transform_num) {
        audioAndText.transform_num = 0
      }
      const config = {
        headers: { 'Content-Type': 'audio/wav;rate=16000' }
      }
      const payload = JSON.stringify({
        format: 'wav',
        rate: 16000,
        channel: 1,
        cuid: 'a6:83:e7:5a:57:64',
        speech: audioAndText.audio,
        len: audioAndText.length,
        dev_pid: 1537,
        token: '24.7c7a79f50db25a9f698ef586ca9891b5.2592000.1604662511.282335-22787298'
      })
      this.$axios
        .post('https://cors-anywhere.herokuapp.com/http://vop.baidu.com/server_api', payload, config)
        .then((res) => {
          // eslint-disable-next-line eqeqeq
          if (res.status == '200') {
            // console.log('success, ', res.data.result)
            audioAndText.text = res.data.result
            audioAndText.transform_num += 1
            // if (!res.data.result) {
            //   // console.log(res)
            // }
          } else {
            audioAndText.transform_num += 1
            // console.log(res)
          }
        })
        .catch((err) => {
          audioAndText.transform_num += 1
          console.log(err)
        })
    },
    getFile () {
      // console.log(this.audioFile)
      const fr = new FileReader()
      let arrBuffer = null
      let audioBuffer = null
      const that = this
      fr.addEventListener('load', (event) => {
        arrBuffer = event.target.result
        // console.log(arrBuffer)
        const audioCtx = new AudioContext()
        // 创建AudioBufferSourceNode对象
        // this.source = audioCtx.createBufferSource()
        audioCtx.decodeAudioData(arrBuffer, function (audioBuf) {
          audioBuffer = audioBuf
          // 声道数量和采样率
          const channels = audioBuffer.numberOfChannels
          const rate = audioBuffer.sampleRate
          const totalLength = audioBuf.length
          // console.log('audioBuffer:', audioBuffer)
          // console.log('channel: ', channels)
          // console.log('rate:', rate, 'hz')
          // console.log('length: ', totalLength)
          let startOffset = 0
          let endOffset = rate * 50
          // 2400000 422848 0 2400000
          if (endOffset > totalLength) {
            endOffset = totalLength
          }
          // console.log(endOffset, totalLength, startOffset, endOffset)
          // console.log(endOffset <= totalLength && startOffset < endOffset)
          while (endOffset <= totalLength && startOffset < endOffset) {
            // 3秒对应的帧数
            const frameCount = endOffset - startOffset
            // 创建同样采用率、同样声道数量，长度是前3秒的空的AudioBuffer
            const audioCtx2 = new AudioContext()
            // console.log(startOffset, endOffset)
            const newAudioBuffer = audioCtx2.createBuffer(channels, endOffset - startOffset, rate)
            // 创建临时的Array存放复制的buffer数据
            const anotherArray = new Float32Array(frameCount)
            // 声道的数据的复制和写入
            const offset = 0
            for (let channel = 0; channel < channels; channel++) {
              audioBuffer.copyFromChannel(anotherArray, channel, startOffset)
              newAudioBuffer.copyToChannel(anotherArray, channel, offset)
            }
            // console.log('切分结束')
            const offlineCtx = new OfflineAudioContext(1, 16000 * 50, 16000)
            const source2 = offlineCtx.createBufferSource()
            source2.buffer = newAudioBuffer
            source2.connect(offlineCtx.destination)
            source2.start()
            // source.loop = true;
            // console.log('转换开始')
            offlineCtx.startRendering().then(function (renderedBuffer) {
              // renderedBuffer;
              // 设置AudioBufferSourceNode对象的buffer为复制的n秒AudioBuffer对象
              const wav = audioBufferToWav(renderedBuffer)
              // console.log('wav: ', wav)
              const sph = that.transformArrayBufferToBase64(wav)
              // console.log('sph: ', sph)
              const audioCtxPlay = new AudioContext()
              // 创建AudioBufferSourceNode对象
              const sourcePlay = audioCtxPlay.createBufferSource()
              sourcePlay.buffer = newAudioBuffer
              // 这里直接结束，实际上可以对结束做一些特效处理
              sourcePlay.connect(audioCtxPlay.destination)
              // 资源开始播放
              // sourcePlay.start()
              that.audioAndText.push({
                audio: sph,
                source_play: {
                  context: audioCtxPlay,
                  source: sourcePlay,
                  play: 0
                },
                text: '',
                length: wav.byteLength,
                transform_num: 0
              })
              // console.log('开始请求api')
              that.postBackend(that.audioAndText[that.audioAndText.length - 1])
              // console.log('wav', wav)
              // source.buffer = renderedBuffer
              // console.log('renderedBuffer: ', renderedBuffer)
              // // 这一句是必须的，表示结束，没有这一句没法播放，没有声音
              // // 这里直接结束，实际上可以对结束做一些特效处理
              // source.connect(audioCtx.destination)
              // // 资源开始播放
              // source.start()
            }).catch(function (err) {
              console.log('失败: ' + err)
              // 注意: 当 OfflineAudioContext 上 startRendering 被立刻调用，Promise 应该被 reject
            })
            startOffset = startOffset + rate * 50
            endOffset = endOffset + rate * 50
            if (endOffset > totalLength) {
              endOffset = totalLength
            }
          }
          // console.log('结束')
        })
      })
      fr.readAsArrayBuffer(this.audioFile)
    }
  }
}
</script>
<style scoped>
textarea{
  outline:none;
  resize:none
}
.spinner {
  margin: 50px auto;
  width: 25px;
  height: 30px;
  text-align: center;
  font-size: 8px;
}
.spinner > div {
  background-color: #757575;
  height: 100%;
  width: 2px;
  display: inline-block;
  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}
.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
@-webkit-keyframes stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
  20% { -webkit-transform: scaleY(1.0) }
}
@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
</style>
