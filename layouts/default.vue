<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-avatar
        class="ml-16 mr-10"
        color="grey darken-1"
        size="36"
      >
        <v-icon dark>
          mdi-music-clef-treble
        </v-icon>
      </v-avatar>
      <v-tabs
        color="grey darken-1"
        class="ml-19"
      >
        <v-tab
          style="font-size: 18px"
          v-for="link in links"
          :key="link"
        >
          {{ link }}
        </v-tab>
      </v-tabs>
      <v-spacer/>
      <v-btn class="ml-4" icon @click="displayHelpCheck = true">
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
              2. 点击<strong>转换按钮</strong>，进行语音转文本工作。语音分段处理，每段50秒。等待片刻后即完成转换。若有未转换者，可手动点击<strong>重转</strong>。<br>
              3. 转换完成后，文本显示在文本框中，用户可自行<strong>修改</strong>。文本框左侧有语音播放按钮，可<strong>播放</strong>语音对照修改。<br>
              4. 修改完成，可点击<strong>导出</strong>word文档。<br>
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
      <v-spacer/><span>中国传媒大学 文化大数据Lab &copy;{{ new Date().getFullYear() }}版权所有</span><v-spacer/>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: [
      '音转文'
    ],
    displayHelpCheck: false
  })
}
</script>
