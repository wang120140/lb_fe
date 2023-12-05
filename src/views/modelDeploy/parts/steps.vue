<template>
  <div class="stepBox">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main/deploy' }"
        >大模型微调</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ step }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="stepBar">
      <!-- //进度条 -->
      <el-steps
        :active="activeNum"
        finish-status="success"
        process-status="finish"
      >
        <el-step
          class="stepItem"
          title="创建任务"
          @click.native="
            activeNum = 0;
            step = '创建任务';
          "
          description="创建微调任务,并选择指令数据集"
        ></el-step>
        <el-step
          class="stepItem"
          title="指令集准备"
          @click.native="
            activeNum = 1;
            step = '数据标注';
          "
          description="上传指令集或在线编写指令"
        ></el-step>
        <el-step
          class="stepItem"
          title="大模型微调"
          @click.native="
            activeNum = 2;
            step = '模型训练';
          "
          description="基于已准备的指令集对大模型微调"
        ></el-step>
        <el-step
          class="stepItem"
          title="部署上线"
          @click.native="
            activeNum = 3;
            step = '部署服务';
          "
          description="将微调后的模型部署为服务"
        ></el-step>
      </el-steps>
    </div>

    <div class="stepMain">
      <template v-if="step == '创建任务'">
        <step-add
          @nextStep="
            activeNum = 1;
            step = '数据标注';
          "
          @cancel="callback"
        ></step-add>
      </template>
      <template v-else-if="step !== '创建任务'">
        <deploy :step="step"></deploy>
      </template>
    </div>
  </div>
</template>

<script>
import deploy from "@/components/deploy/index.vue";

import stepAdd from "./stepAdd.vue";

export default {
  components: {
    deploy,
    stepAdd,
  },
  data() {
    return {
      step: "创建任务",
      activeNum: 0,
    };
  },
  methods: {
    callback() {
      this.$router.push({
        name: "deploy",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.stepBox {
  width: 100%;
  min-height: 100%;
  background-color: #f1f1f1;
  padding: 20px;
  .stepBar {
    width: 90%;
    margin-left: 5%;
    margin-top: 30px;
  }
  .stepItem {
    cursor: pointer;
  }
  .stepMain {
    width: 90%;
    margin-left: 5%;
    padding-top: 30px;
  }
}
</style>