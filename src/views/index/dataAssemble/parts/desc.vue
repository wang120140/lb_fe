<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/dataAssemble' }"
        >数据集</el-breadcrumb-item
      >
      <el-breadcrumb-item>查看数据集</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="baseInfo">
      <div class="title">基本信息</div>
      <el-form
        ref="form"
        :model="formData"
        label-position="left"
        label-width="270px"
      >
        <el-form-item label="数据集名称">
          <span class="text"> 预置1724-回流数据-20231018-FySz</span>
        </el-form-item>
        <el-form-item label="数据类型">
          <span class="text"> 文本</span>
        </el-form-item>
        <el-form-item label="标注模式">
          <span class="text">
            文本问答 平台默认格式 
            <el-link type="primary">下载示例</el-link>
            </span
          ></el-form-item
        >
      </el-form>
    </div>

    <div class="dataSource">
      <div class="title">数据来源</div>
      <el-form
        ref="form"
        :model="formData"
        label-position="left"
        label-width="270px"
      >
        <el-form-item label="标注状态" >
          <span class="text">已标注</span>
        </el-form-item>
        <el-form-item label="选择导入方式" size="small" >
          <span class="text">本地上传</span>
        </el-form-item>
        <el-form-item label="本地上传" size="small" >
          <span class="text">- 上传文件</span>
        </el-form-item>
      </el-form>
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
        type: "",
        model: "",
        subModel: "1",
      },
      formData2: {
        status: "已标注",
        name: "",
        isZip: "1",
      },
    };
  },
  methods: {
    callback(){
      this.$router.push({
        name:"dataAssemble"
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.baseInfo,
.dataSource {
  width: 100%;
  background-color: #fff;
  margin-top: 20px;
  padding: 40px 80px;
  .title {
    font-weight: 700;
    color: #1f1f1f;
    font-size: 16px;
    height: 40px;
  }
  .nameRule {
    height: 18px;
    font-size: 14px;
    line-height: 18px;
    color: #00000073;
  }
  .explain {
    margin-left: 10px;
    color: #00000073;
  }

  ::v-deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner) {
    background-color: #1946b9;
    border-color: #1946b9;
    box-shadow: -1px 0 0 0 #1946b9;
    &:hover {
      color: #fff;
    }
  }
  ::v-deep(.el-radio-button__inner:hover) {
    color: #1946b9;
  }
}
.bottomBar {
  position: absolute;
  width: 100%;
  height: 53px;
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