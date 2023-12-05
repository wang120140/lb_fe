<template>
  <div class="deployBox">
    <div class="img">
      <img src="@/assets/流程.png" height="325px" alt="" />
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane name="taskList">
        <span slot="label" class="label">任务列表</span>
        <div class="taskListBox">
          <div class="topBar">
            <button class="addBtn" @click="toDesc">创建服务</button>

            <el-radio-group
              style="flex: 1; margin-left: 100px"
              size="small"
              v-model="showModel"
            >
              <el-radio-button label="列表模式"></el-radio-button>
              <el-radio-button label="卡片模式"></el-radio-button>
            </el-radio-group>
            <div class="filter">
              <el-select
                v-model="filters.status"
                class="filterItem"
                placeholder="请选择状态"
                clearable
              >
              </el-select>

              <el-input
                v-model="filters.name"
                class="filterItem"
                style="width: 242px"
                placeholder="请输入服务名称"
                clearable
              >
              </el-input>

              <div class="refresh">
                <i class="el-icon-refresh"></i>
              </div>
            </div>
          </div>
          <div class="taskListBar">
            <el-table
              v-show="showModel == '列表模式'"
              :data="taskList"
              style="width: 100%; margin-bottom: 30px"
            >
              <el-table-column
                header-align="center"
                align="center"
                prop="name"
                label="任务名称"
              >
                <template slot-scope="scope">
                  <el-link
                    type="primary"
                    style="margin-right: 10px"
                    @click="toDesc(scope.row, dataset_id)"
                    >{{ scope.row.name }}</el-link
                  >
                </template>
              </el-table-column>
              <el-table-column
                header-align="center"
                align="center"
                prop="create_at"
                label="创建时间"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                align="center"
                prop="created_by"
                label="创建人"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                align="center"
                prop="dataset_status"
                label="当前状态"
              >
              </el-table-column>
              <el-table-column label="操作">
                <el-link type="primary" style="margin-right: 10px"
                  >查看</el-link
                >
                <el-link type="primary" style="margin-right: 10px"
                  >停止</el-link
                >
                <el-link type="primary" style="margin-right: 10px"
                  >删除</el-link
                >
                <el-link type="primary">删除</el-link>
              </el-table-column>
            </el-table>
            <template v-if="showModel == '卡片模式'">
              <el-row :gutter="20">
                <el-col v-for="item in taskList" :key="item.task_id" :span="6">
                  <el-card shadow="hover" style="margin-bottom: 20px">
                    <div class="cardItem">
                      <div class="cardTop">
                        <el-tag type="warning">
                          <i class="el-icon-s-comment"></i>
                          文本问答
                        </el-tag>
                        <i class="el-icon-delete" style="text-align: right"></i>
                      </div>
                      <div class="cardTaskName">
                        {{item.name}}
                      </div>
                      <div class="procedure">
                        
                      </div>
                      <div class="bottomText">
                        <div>
                          <i class="el-icon-timer"></i> {{item.create_at}}
                        </div>
                        <div style="flex: 1;text-align:right">
                          {{item.created_by}}
                        </div>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </template>
          </div>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane name="dataReflux">
        <span slot="label" class="label">数据回流</span>
        
      </el-tab-pane> -->
    </el-tabs>
    <div class="pagination">
      <pagination :total="648" currentPage="1" size="20"></pagination>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/pagination/pagination";
export default {
  components: {
    pagination,
  },
  data() {
    return {
      activeName: "taskList",
      filters: {
        status: "",
        name: "",
      },
      taskList: [
        {
          task_id: 101,
          name: "run1507",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "run1507",
          step: "training",
          dataset_id: 103,
          dataset_ids: [103],
          dataset_status: "succeed",
          label_task_id: -1,
          label_status: 1,
          training_job_id: 364,
          training_status: "Succeeded",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-22 15:08:10",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 100,
          name: "run1034",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "45345-已标注-1694771344",
          step: "label",
          dataset_id: 98,
          dataset_ids: [98],
          dataset_status: "succeed",
          label_task_id: 80,
          label_status: 0,
          training_job_id: 0,
          training_status: "",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-22 10:35:24",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 99,
          name: "run1031",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "run1031",
          step: "dataset",
          dataset_id: 102,
          dataset_ids: [102],
          dataset_status: "succeed",
          label_task_id: 0,
          label_status: 1,
          training_job_id: 0,
          training_status: "",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-22 10:32:50",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 98,
          name: "run0922",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "run0922",
          step: "label",
          dataset_id: 101,
          dataset_ids: [101],
          dataset_status: "succeed",
          label_task_id: 79,
          label_status: 0,
          training_job_id: 0,
          training_status: "",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-22 10:29:53",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 97,
          name: "etrewrwerwer",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "etrewrwerwer",
          step: "training",
          dataset_id: 99,
          dataset_ids: [99],
          dataset_status: "succeed",
          label_task_id: -1,
          label_status: 1,
          training_job_id: 348,
          training_status: "Succeeded",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-18 14:28:22",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 96,
          name: "45345",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "45345",
          step: "label",
          dataset_id: 97,
          dataset_ids: [97, 72, 50, 21, 87, 25, 26],
          dataset_status: "succeed",
          label_task_id: 78,
          label_status: 1,
          training_job_id: 0,
          training_status: "",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-15 17:48:21",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 95,
          name: "323545",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "323545",
          step: "label",
          dataset_id: 96,
          dataset_ids: [96, 69, 72, 21, 87],
          dataset_status: "succeed",
          label_task_id: 77,
          label_status: 0,
          training_job_id: 0,
          training_status: "",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-15 17:46:57",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 94,
          name: "多组合",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "本_文_已_005-已标注-1694597889",
          step: "label",
          dataset_id: 69,
          dataset_ids: [69, 95, 87],
          dataset_status: "succeed",
          label_task_id: 76,
          label_status: 0,
          training_job_id: 0,
          training_status: "",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-15 17:45:41",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 93,
          name: "xsxcasca",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "微调_lu_预置_本_未_002",
          step: "dataset",
          dataset_id: 33,
          dataset_ids: [33, 35, 80, 50, 52, 87, 26, 91],
          dataset_status: "succeed",
          label_task_id: 0,
          label_status: 1,
          training_job_id: 0,
          training_status: "",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-15 17:41:55",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 92,
          name: "987987897",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "987987897",
          step: "training",
          dataset_id: 93,
          dataset_ids: [93],
          dataset_status: "succeed",
          label_task_id: 74,
          label_status: 1,
          training_job_id: 347,
          training_status: "Succeeded",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-15 15:20:24",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 91,
          name: "8989899",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "8989899",
          step: "label",
          dataset_id: 92,
          dataset_ids: [92],
          dataset_status: "succeed",
          label_task_id: 73,
          label_status: 0,
          training_job_id: 0,
          training_status: "",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-15 15:18:39",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 90,
          name: "89898",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "89898",
          step: "label",
          dataset_id: 91,
          dataset_ids: [91],
          dataset_status: "succeed",
          label_task_id: 72,
          label_status: 0,
          training_job_id: 0,
          training_status: "",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-15 15:17:47",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 89,
          name: "8848",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "8848",
          step: "dataset",
          dataset_id: 90,
          dataset_ids: [90],
          dataset_status: "succeed",
          label_task_id: 0,
          label_status: 1,
          training_job_id: 0,
          training_status: "",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-15 15:15:52",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 88,
          name: "122323",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "体验数据集-文本问答",
          step: "label",
          dataset_id: 21,
          dataset_ids: [21],
          dataset_status: "succeed",
          label_task_id: 69,
          label_status: 0,
          training_job_id: 0,
          training_status: "",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-15 15:00:51",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 87,
          name: "沙发发",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "体验数据集-文本问答",
          step: "label",
          dataset_id: 21,
          dataset_ids: [21],
          dataset_status: "succeed",
          label_task_id: 68,
          label_status: 0,
          training_job_id: 0,
          training_status: "",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-15 10:50:02",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 86,
          name: "5345435",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "5345435",
          step: "label",
          dataset_id: 88,
          dataset_ids: [88],
          dataset_status: "succeed",
          label_task_id: 67,
          label_status: 0,
          training_job_id: 0,
          training_status: "",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-15 10:28:48",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "lu_huairou2",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 85,
          name: "PDT",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "体验数据集-文本问答",
          step: "label",
          dataset_id: 21,
          dataset_ids: [21],
          dataset_status: "succeed",
          label_task_id: 66,
          label_status: 0,
          training_job_id: 0,
          training_status: "",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-15 09:41:21",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 84,
          name: "run201245",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "体验数据集-文本问答",
          step: "label",
          dataset_id: 21,
          dataset_ids: [21],
          dataset_status: "succeed",
          label_task_id: 65,
          label_status: 0,
          training_job_id: 0,
          training_status: "",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-14 20:13:51",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 83,
          name: "run2012",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "体验数据集-文本问答-已标注",
          step: "label",
          dataset_id: 23,
          dataset_ids: [23],
          dataset_status: "succeed",
          label_task_id: 12,
          label_status: 1,
          training_job_id: 0,
          training_status: "",
          infer_service_id: 0,
          deploy_status: "",
          auto_stop: {
            enable: false,
          },
          deploy_time: "",
          create_at: "2023-09-14 20:13:23",
          fail_message: "",
          progress: 0,
          config: "",
          model_id: 0,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
        {
          task_id: 82,
          name: "run1819",
          sub_dimension: "multiple_rounds_of_text_question_answer",
          type: "multiple_rounds_of_text_question_answer",
          dataset_name: "体验数据集-文本问答-已标注",
          step: "deploy",
          dataset_id: 23,
          dataset_ids: [23],
          dataset_status: "succeed",
          label_task_id: 12,
          label_status: 1,
          training_job_id: 341,
          training_status: "Succeeded",
          infer_service_id: 31,
          deploy_status: "failed",
          auto_stop: {
            enable: true,
            seconds: 7200,
          },
          deploy_time: "2023-09-15 11:31:06.320530",
          create_at: "2023-09-14 18:21:05",
          fail_message:
            '资源不足，详细错误原因：[PodScheduled]:Unschedulable, all nodes are unavailable: 1 job(service/podgroup-15346613-a667-41a5-b367-53af603a5c8a) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.10> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.10", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-15346613-a667-41a5-b367-53af603a5c8a) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.12> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.12", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-15346613-a667-41a5-b367-53af603a5c8a) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.5> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.5", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "pvrole":"node3", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-15346613-a667-41a5-b367-53af603a5c8a) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.6> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.6", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-15346613-a667-41a5-b367-53af603a5c8a) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.7> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.7", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-15346613-a667-41a5-b367-53af603a5c8a) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.8> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.8", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-15346613-a667-41a5-b367-53af603a5c8a) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.9> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.9", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "pvrole":"node9", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 5 node(s) resource fit failed.\n部署超时,请联系系统管理员。开始部署时刻：2023-09-15 11:31:06.320530, now：2023-09-15 14:16:00.438769\n',
          progress: 75,
          config: "",
          model_id: 79,
          created_by: "admin",
          pretrain_config:
            '{"type": "preset", "id": 4, "display_name": "紫东太初2.0_语言_7B"}',
        },
      ],
      showModel: "列表模式",
    };
  },
  methods: {
    toCreate() {},
    toDesc() {
      this.$router.push({
        name: "deploySteps",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.deployBox {
  background-color: #f5f5f5;
  min-height: 100%;
  overflow-y: auto;
}

.img {
  text-align: center;
  background-color: #fff;
}
.label {
  padding: 0 20px;
  font-size: 14px;
}

::v-deep(.el-tabs__header) {
  margin: 0;
  background-color: #fff;
}
.pagination {
  display: flex;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.65),
    rgb(242, 243, 255)
  );
  width: 100%;
  position: fixed;
  height: 52px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  z-index: 1;
  padding: 0px 24px;
  box-shadow: rgba(25, 70, 185, 0.1) 0px -2px 12px;
  transition: width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
}

.taskListBox {
  width: 100%;
  .topBar {
    width: 100%;
    padding: 8px 24px 8px 10px;
    // background-color: #000000;
    display: flex;
    justify-content: space-between;
    position: relative;
    background-color: #fff;
    .filterItem {
      // margin-right: 10px;
      height: 32px;
      transform: scale(0.9) translateY(-5px);
    }
    .refresh {
      display: inline-block;
      height: 100%;
      width: 32px;
      box-sizing: border-box;
      text-align: center;
      border: 1px solid #e3e5eb;
      transform: translateY(-2px);
      font-size: 20px;
    }
    .addBtn {
      background-color: #1946b9;
      height: 32px;
      width: 90px;
      padding: 4px 15px;
      color: #fff;
      border: 0;
      cursor: pointer;
      transition: background-color ease 0.2s;
      &:hover {
        background-color: #3c68c7;
      }
    }
  }
  .taskListBar {
    background-color: #f5f5f5;
    padding: 20px;

    .cardItem {
      width: 100%;
      background: linear-gradient(180deg, #f1f6fb, #ffffff);
      padding: 20px;
      .cardTop {
        display: flex;
        i{
          flex: 1;
          line-height: 32px;
        }
      }
      .cardTaskName {
        height: 50px;
        line-height: 50px;
      }
      .procedure {
        width: 100%;
        height: 50px;
        background-color: #EBF1FC;
      }
      .bottomText {
        font-size: 12px;
        display: flex;
        margin-top: 5px;
      }
    }

    ::v-deep(.el-card__body) {
      padding: 0;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>