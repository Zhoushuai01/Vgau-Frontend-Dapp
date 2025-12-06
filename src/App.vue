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
    background:black;
    animation: fadeIn 0.5s 
    ease-in-out;
  }
  @keyframes fadeIn {
    from {
        opacity: 0.3;
    }
    to {
        opacity: 1;
    }
}
</style>