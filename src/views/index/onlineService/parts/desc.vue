<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/onlineService' }"
        >推理中心</el-breadcrumb-item
      >
      <el-breadcrumb-item>服务详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="baseInfo">
      <img src="@/assets/desc.png" class="img" alt="">
    </div>


    <div class="bottomBar">
      <el-button type="primary" size="small" @click="callback">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        desc: "",
        work:'',
        stop:true,
        limit:true,
        stopTimee:1,
        date:1,
        num:1
      },
    };
  },
  methods: {
    callback(){
      this.$router.push({
        name:"onlineService"
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.baseInfo,
.dataSource {
    width: 100%;
//   background-color: #fff;
  margin-top: 20px;
  overflow: hidden;
  .img{
    max-width: 100%;
  }
}
.bottomBar {
  position: absolute;
  width: 100%;
  // background-color: #000;
  bottom: 0;
  right: 0;
  z-index: 1;
  background-color: #fff;
  border-top: 1px solid #f0f0f0;
  text-align: center;
  line-height: 53px;
}
</style>