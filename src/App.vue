<template>
  <div id="app">
    
      <router-view />
   
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  computed: {

  },
  mounted() {
    // const imgurl = [
    //   'bqsea_type/red/0-0.png', //坦克
    //   'bqsea_type/red/1-0.png', //战车
    //   'bqsea_type/red/2-0.png', //步兵
    //   'bqsea_type/red/7-0.png', //飞弹
    //   'bqsea_type/blue/0-0.png',
    //   'bqsea_type/blue/1-0.png',
    //   'bqsea_type/blue/2-0.png',
    //   'bqsea_type/blue/7-0.png',
    // ]
    // imgurl.forEach(item => {
    //   var img = new Image();
    //   img.src = require(`@/assets/${item}`);
    //   img.onload = function(){
    //     window.my_config.imgEL[item] = img;
    //   }
    //   console.log(window.my_config.imgEL);
    // })
  },
  methods: {
    
  },
  created() {
  },
  beforeDestroy() {
  }
}
</script>
<style >
/* html {
    filter: grayscale(100%);
} */
#app {
  /* -webkit-user-select: none;

  -moz-user-select: none;

  -ms-user-select: none; */
  font-family:  "Microsoft YaHei","Arial", "黑体", "宋体", sans-serif;

  /* user-select: none; */
  width: 100vw;
  height: 100vh;

}

* {
  box-sizing: border-box;
}

ul,
li {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
}

.el-tooltip__popper {
  max-width: 20%;
}

.el-tooltip__popper,
.el-tooltip__popper.is-dark {
  background: rgb(48, 65, 86) !important;
  color: #fff !important;
  line-height: 24px;
}
</style>
