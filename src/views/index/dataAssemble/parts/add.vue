<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/dataAssemble' }">人员信息</el-breadcrumb-item>
      <el-breadcrumb-item>添加以及查看信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="baseInfo">
      <el-form label-position="right" label-width="100px" :inline="true" :model="formLabelAlign">
        <el-form-item label="姓名">
          <el-input v-model="formLabelAlign.xing_ming"></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="formLabelAlign.gong_hao"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.mi_ma"></el-input>
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="formLabelAlign.wei_xin"></el-input>
        </el-form-item>
        <el-form-item label="工种">
          <el-input v-model="formLabelAlign.gong_zhong"></el-input>
        </el-form-item>
        <el-form-item label="分数">
          <el-input v-model="formLabelAlign.fen_shu"></el-input>
        </el-form-item>
        <el-form-item label="密码是否正确">
          <el-input v-model="formLabelAlign.mi_is_right"></el-input>
        </el-form-item>
        <el-form-item label="是否包年">
          <el-input v-model="formLabelAlign.is_year"></el-input>
        </el-form-item>
        <el-form-item label="出处">
          <el-input v-model="formLabelAlign.is_my"></el-input>
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
import { getUUID } from "@/utils/common.js"
import { updataOrAdd_fromServer } from "@/network/api_lb.js"
export default {
  data() {
    return {
      formLabelAlign: {
        xing_ming: "测试",
        gong_hao: "测试" + getUUID(),
        mi_ma: " ",
        wei_xin: " ",
        gong_zhong: " ",
        fen_shu: " ",
        mi_is_right: " ",
        is_year: " ",
        is_my: " ",
      }
    };
  },
  beforeMount(){
    console.log(this.$route)
    if(Object.keys(this.$route.params).length>1 ){
      this.formLabelAlign = this.$route.params
    }
  },
  mounted(){},
  methods: {
    callback() {
      console.log(this.formLabelAlign)
      console.log("测试信息-----")
      let _this = this
      updataOrAdd_fromServer(this.formLabelAlign).then((res) => {
        console.log(res)
        if (res.code == 200) {
          _this.$notify({
            title: '成功',
            message: '数据成功更新完成',
            type: 'success'
          });
        } else {
          _this.$notify.error({
            title: '错误',
            message: '数据更新失败'
          });
        }


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

  ::v-deep(.el-radio-button__orig-radio:checked+.el-radio-button__inner) {
    background-color: #1946B9;
    border-color: #1946B9;
    box-shadow: -1px 0 0 0 #1946B9;

    &:hover {
      color: #fff;
    }
  }

  ::v-deep(.el-radio-button__inner:hover) {
    color: #1946B9;
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

.el-form-item {
  width: 400px;
}
</style>