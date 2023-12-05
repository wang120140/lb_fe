<template>
  <div class="mainBox">
    <div class="headler">
      <div class="img"></div>
      <div class="xuntip0" :class="{ 'isActive': allActive[0] }" @click="skip(0)">
        基础平台
      </div>
      <div class="xuntip1" :class="{ 'isActive': allActive[1] }" @click="skip(1)">
        整体分布
      </div>
      <div class="xuntip2" :class="{ 'isActive': allActive[2] }" @click="skip(2)">
        配置信息
      </div>


    </div>
    <div class="bottom">

      <div class="content" v-if="!allActive[0]">
        <KeepAlive>
          <router-view />
        </KeepAlive>

      </div>

    </div>
  </div>
</template>

<script>
import { Base } from '../base/index'
export default {
  mixins: [Base],
  data() {
    return {


    };
  },

  methods: {



  },
  mounted() {



  },
  watch: {


  },

  computed: {

  },
  beforeDestroy() {

  }
};
</script>

<style lang="scss" scoped>
  @import '../base//index.scss';
</style>