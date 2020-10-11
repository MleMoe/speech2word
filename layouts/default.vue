<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-spacer />
      <v-avatar
        color="grey darken-1"
        size="36"
      >
        <v-icon dark>
          mdi-music-clef-treble
        </v-icon>
      </v-avatar>
      <v-spacer />
      <v-tabs
        v-model="tab"
        color="grey darken-1"
        class="ml-12"
      >
        <v-tab
          style="font-size: 18px"
        >
          音转文
        </v-tab>
        <v-tab
          style="font-size: 18px"
        >
          输出
        </v-tab>
      </v-tabs>
      <v-spacer />
      <v-btn icon @click="displayHelpCheck = true">
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="grey lighten-3">
      <nuxt />
      <v-row justify="center">
        <v-dialog
          v-model="displayHelpCheck"
          persistent
          max-width="900"
        >
          <v-card>
            <v-card-title class="title">
              speech2word使用说明
            </v-card-title>
            <v-card-text class="subtitle pa-10" style="font-size: 16px">
              1. 点击<strong>文件输入框</strong>，选择音频文件输入。<br>
              2. 点击<strong>转换按钮</strong>，进行语音转文本工作。语音分段转换，每段50秒。若有未转换者，可手动点击<strong>重转</strong>。<br>
              3. 转换完成后，文本显示在文本框中，用户可自行<strong>修改</strong>。文本框左侧有语音播放按钮，可<strong>播放</strong>语音对照修改。<br>
              4. 修改完成，可点击<strong>导出</strong>word文档。<br>
              <br>
              <strong>由于使用代理，转换需要时间，请稍微等待。</strong>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="green darken-1"
                text
                @click="displayHelpCheck = false"
              >
                确定
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-main>
    <v-footer padless>
      <v-spacer />
      <span>中国传媒大学 文化大数据Lab &copy;{{ new Date().getFullYear() }}版权所有</span>
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: [
      '音转文'
    ],
    displayHelpCheck: false,
    mobileCheck: false
  }),
  computed: {
    tab: {
      get () {
        return this.$store.state.tab
      },
      set (val) {
        this.$store.commit('setTab', val)
      }
    }
  },
  methods: {
    versions () {
      const u = navigator.userAgent
      // const app = navigator.appVersion
      return {
        trident: u.includes('Trident'), // IE内核
        presto: u.includes('Presto'), // opera内核
        webKit: u.includes('AppleWebKit'), // 苹果、谷歌内核
        gecko: u.includes('Gecko') && !u.includes('KHTML'), // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.includes('Android') || u.includes('Adr'), // android终端
        iPhone: u.includes('iPhone'), // 是否为iPhone或者QQHD浏览器
        iPad: u.includes('iPad'), // 是否iPad
        webApp: !u.includes('Safari'), // 是否web应该程序，没有头部与底部
        weixin: u.includes('MicroMessenger'), // 是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) === ' qq' // 是否QQ
      }
    },
    isMobile () {
      const v = this.versions()
      if (v.mobile || v.android || v.ios) {
        this.mobileCheck = true
      }
    }
  }
}
</script>
