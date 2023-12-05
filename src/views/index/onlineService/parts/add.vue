<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/onlineService' }"
        >推理中心</el-breadcrumb-item
      >
      <el-breadcrumb-item>创建服务</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="baseInfo">
      <el-form
        ref="form"
        :model="formData"
        label-position="left"
        label-width="270px"
      >
        <el-form-item label="服务名称" required>
          <el-input
            size="small"
            v-model="formData.name"
            clearable
            placeholder="请输入模型名称"
            style="width:800px"
          ></el-input>
          <div class="nameRule">
            请输入不超过20个字符，仅支持中英文、数字、下划线“_”、短横“_”，只能以中英文、数字开头
          </div>
        </el-form-item>
        <el-form-item label="模型描述">
          <el-input
            type="textarea"
            v-model="formData.desc"
            maxlength="100"
            show-word-limit
            placeholder="请输入内容"
            style="width:800px"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="baseInfo">
      <el-form
        ref="form"
        :model="formData"
        label-position="left"
        label-width="270px"
      >
        <el-form-item label="服务探活" >
          <el-input
            size="small"
            v-model="formData.work"
            clearable
            placeholder="8080:/ping"
            style="width:300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="自动停止">
            <el-checkbox v-model="formData.stop"></el-checkbox>
            <template v-if="formData.stop">
                <el-radio v-model="formData.stopTimee" label="1">1小时</el-radio>
                <el-radio v-model="formData.stopTimee" label="2">2小时</el-radio>
            </template>
        </el-form-item>
        <el-form-item label="服务限流">
            <el-checkbox v-model="formData.limit"></el-checkbox>
            <template v-if="formData.limit">
                <span style="display:inline-block;width:30px;height:100%"></span>
                每
                <el-input-number size="mini" style="width:100px" v-model="formData.date" controls-position="right"  :min="1" ></el-input-number>
                秒
                <el-input-number size="mini" style="width:100px" v-model="formData.num" controls-position="right"  :min="1" ></el-input-number>
                次请求
            </template>
        </el-form-item>
      </el-form>
    </div>
    <div class="baseInfo">
      <el-form
        ref="form"
        :model="formData3"
        label-position="left"
        label-width="270px"
      >
        <el-form-item label="模型" required>
          <el-select
            v-model="model"
            size="small"
            style="width: 100%"
            placeholder="请选择模型"
          >
          </el-select>
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