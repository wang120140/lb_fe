<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/modelManage' }">模型管理</el-breadcrumb-item>
      <el-breadcrumb-item>导入模型</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="baseInfo">
      <el-form
        ref="form"
        :model="formData"
        label-position="left"
        label-width="270px"
      >
        <el-form-item label="名称" required>
          <el-input size="small" v-model="formData.name" clearable  placeholder="请输入模型名称"></el-input></el-input>
        </el-form-item>
        <el-form-item label="版本" required>
          <el-input size="small" v-model="formData.versions" clearable  placeholder="请输入模型名称"></el-input></el-input>
        </el-form-item>
        <el-form-item label="模型类型" required>
          <el-input size="small" v-model="formData.versions" clearable  placeholder="请输入模型名称"></el-input></el-input>
        </el-form-item>
        <el-form-item label="计算框架" required>
          <el-select v-model="model" size="small" style="width:100%" placeholder="请选择计算框架">
            <el-option
                label="PyTorch"
                value="1">
            </el-option>
            <el-option
                label="MindSpore"
                value="2">
            </el-option>
            <el-option
                label="其他"
                value="3">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="模型描述">
        <el-input type="textarea" v-model="formData.desc" maxlength="100" show-word-limit placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="模型来源" required>
          <el-radio-group v-model="formData.source" size="small">
            <el-radio-button  label="训练任务"></el-radio-button>
            <el-radio-button  label="自定义镜像"></el-radio-button>
            <el-radio-button  label="本地上传"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择镜像" required>
          <el-select v-model="model" size="small" style="width:100%" placeholder="请选择镜像">
          
          </el-select>
          <div class="nameRule">
            端口号默认为8080，该端口用于接收外部实时请求
          </div>
        </el-form-item>
        <el-form-item label="redme文件">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
           <div class="nameRule">
            建议readme文档中包含模型概述，模型介绍，训练说明，模型效果等内容，大小不超过100MB，点击下载;  <el-link type="primary">参考示例</el-link>
          </div>
        </el-form-item>
      </el-form>
    </div>

   
    <div class="bottomBar">
      <el-button type="primary" size="small" @click="callback">提交</el-button>
      <el-button type="primary" size="small">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        versions: "0.0.1",
        model: "",
        computed: "",
        desc: "",
        source: "训练任务",
      },
    };
  },
  methods: {
    callback(){
      this.$router.push({
        name:'modelManage'
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