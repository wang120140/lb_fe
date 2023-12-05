<template>
  <div>
    <div class="baseInfo">
      <el-form
        ref="form"
        :model="formData"
        label-position="left"
        label-width="270px"
      >
        <div class="tableTitle">基本信息</div>
        <el-form-item label="任务名称" required>
          <el-input
            size="small"
            v-model="formData.name"
            clearable
            placeholder="请输入任务名称"
          ></el-input>
          <div class="nameRule">
            请输入不超过20个字符，仅支持中英文、数字、下划线“_”、短横“-”，只能以中英文、数字开头
          </div>
        </el-form-item>

        <el-form-item label="任务类型" required>
          <el-select
            v-model="formData.type"
            size="small"
            style="width: 100%"
            placeholder="请选择计算框架"
          >
            <el-option label="文本问答" value="1"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="formData.type == 1">
          <img src="@/assets/文本问答.png" width="180" alt="" />
        </el-form-item>

        <el-form-item label="基础模型" required>
          <el-radio-group v-model="formData.baseModel" size="small">
            <el-radio label="预置大模型"></el-radio>
            <el-radio label="历史任务"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="formData.baseModel == '预置大模型'"
          label="预置大模型"
          required
        >
          <el-select v-model="mirror" size="small" style="width: 100%">
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="formData.baseModel == '历史任务'"
          label="历史任务"
          required
        >
          <el-select v-model="mirror" size="small" style="width: 100%">
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="more">
      <el-form
        ref="form"
        :model="formData"
        label-position="left"
        label-width="270px"
      >
        <div class="tableTitle">更多配置</div>
        <el-form-item label="配置项1" required>
          <el-input
            size="small"
            v-model="formData2.value1"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="配置项2" required>
          <el-input
            size="small"
            v-model="formData2.value2"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="配置项3" required>
          <el-input
            size="small"
            v-model="formData2.value3"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="配置项4" required>
          <el-input
            size="small"
            v-model="formData2.value4"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="配置项5" required>
          <el-input
            size="small"
            v-model="formData2.value5"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="配置项6" required>
          <el-input
            size="small"
            v-model="formData2.value6"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="nextStep"
            >创建并进入下一步</el-button
          >
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
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
        mirror: "",
        baseModel: "预置大模型",
      },
      formData2: {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
      },
    };
  },
  methods: {
    nextStep(){
        this.$emit('nextStep')
    },
    cancel(){
        this.$emit('cancel')
    }
  }
};
</script>

<style lang="scss" scoped>
.baseInfo,
.more {
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 20px;
  padding: 40px 80px;
  .tableTitle {
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
</style>