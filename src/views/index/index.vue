<template>
  <div class="mainBox">
    <div class="headler">
      <div class="img"></div>
      <!-- <div class="xuntip0" :class="{ 'isActive': allActive[0] }" @click="skip(0)">
        基础平台
      </div> -->
      <!-- <div class="xuntip1" :class="{ 'isActive': allActive[1] }" @click="skip(1)">
        整体分布
      </div>
      <div class="xuntip2" :class="{ 'isActive': allActive[2] }" @click="skip(2)">
        配置信息
      </div> -->
    </div>
    <div class="bottom">

      <div class="content" v-if="allActive[0]">
        
        <div class="left">
          <div class="menuT t">
            <el-menu default-active="2-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
              @select="handleSelect" :collapse="isCollapse" :router="true">
              <!-- <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">首页</span>
                </template>
                <!-- <el-menu-item index="1-1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">数据信息</span>
                </el-menu-item>
              </el-submenu> -->
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-coin"></i>
                  <span slot="title">信息中心</span>
                </template>
                <el-menu-item index="/index/dataAssemble">
                  <i class="el-icon-s-order"></i>
                  <span slot="title">信息集</span>
                </el-menu-item>
             

              </el-submenu>
              <!-- <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">模型中心</span>
                </template>
                <el-menu-item index="/index/modelManage">
                  <i class="el-icon-menu"></i>
                  <span slot="title">模型管理</span>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">推理中心</span>
                </template>
                <el-menu-item index="/index/onlineService">
                  <i class="el-icon-menu"></i>
                  <span slot="title">在线服务</span>
                </el-menu-item> -->
               

              </el-submenu>
            </el-menu>
          </div>

          <div class="menuB  t">
            <i :class="[isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold']"
              style="font-size: 24px; position: absolute; bottom: 10px; left: 10px;"
              @click="isCollapse = !isCollapse"></i>
          </div>
        </div>

        <div class="rigthContent">
         
            <router-view />
          
        </div>
      </div>

    </div>
    <div>

    </div>
  </div>
</template>
  
<script>
import { Base } from '../base/index'
export default {
  mixins: [Base],
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // switch (key) {
      //   case '1-1':
      //     this.$router.push({
      //       name: "dataMsg",
      //     });
      //     break;
      //   case '2-1':
      //     this.$router.push({
      //       name:"dataAssemble"
      //     })
      //     break;
      //   case '4-1':
      //     this.$router.push({
      //       name:"modelManage"
      //     })
      //     break;
      //   case '5-1':
      //     this.$router.push({
      //       name:"onlineService"
      //     })
      //     break;
      // }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
  
<style lang="scss" scoped>
@import '../base//index.scss';

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.menuT {
  height: calc(100% - 52px);
  overflow-y: auto;
}

.menuB {
  height: 52px;
  border-top: 1px solid rgb(242, 243, 255);
  background: linear-gradient(to right, rgb(242, 243, 255), rgba(255, 255, 255, 0.65));
}

.content {
  display: flex;
  width: 100%;
  overflow-y: auto;
}

.t {}

.rigthContent {
  border-left: 1px solid rgb(189, 187, 187);
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
  overflow-y: auto;
  position: relative;
}
</style>