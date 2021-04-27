<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {

    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: 'live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-nico/assets/',
        tagMode: false,
        debug: false,
        model: {jsonPath: '/live2dw/live2d-widget-model-shizuku/assets/shizuku.model.json'},
        display: {position: 'left', width: 150, height: 300},
        mobile: {show: true},
        log: false
      })
    }, 300)
  }
}
</script>
<style lang="scss">
body, html {
  margin: 0;
}
</style>
