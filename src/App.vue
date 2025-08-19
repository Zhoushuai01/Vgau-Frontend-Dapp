<script>
  export default {
    onLaunch: function () {
      console.log('App Launch')
    },
    onShow: function () {
      console.log('App Show')
    },
    onHide: function () {
      console.log('App Hide')
    },
  }
</script>

<style lang="scss">
  @import "uview-plus/index.scss";
  /*每个页面公共css */
  page {
    width: 100%;
    height: 100%;
    background: #F8F8F8;
  }
</style>