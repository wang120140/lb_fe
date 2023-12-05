<template>
  <div class="indexBox">
    <div class="topBar">
      <button class="addBtn" @click="toCreate">创建服务</button>
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
    <el-table :data="tableData" style="width: 100%; margin-bottom: 30px">
      <el-table-column prop="name" label="服务名称">
        <template slot-scope="scope">
          <el-link type="primary" @click="toDesc">{{ scope.row.name }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="模型">
        <template slot-scope="scope">
          <el-link type="primary">{{ scope.row.model.name }}</el-link>
          <span class="version">{{
            scope.row.configs[0].model_version_name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="created_on" label="创建时间"> </el-table-column>
      <el-table-column prop="changed_on" label="更新时间"> </el-table-column>
      <el-table-column prop="created_by" label="创建人"> </el-table-column>
      <el-table-column prop="status" label="服务状态">
        <template slot-scope="scope">
          <!-- {{scope.row.status}} -->
          <el-tag v-if="scope.row.status == 'stopped'" type="info">
            <i class="el-icon-video-pause"></i>
            停止
          </el-tag>
          <el-tag v-if="scope.row.status == 'running'" type="">
            <i class="el-icon-loading"></i>
            运行中
          </el-tag>
          <el-tag v-if="scope.row.status == 'failed'" type="danger">
            <i class="el-icon-circle-close"></i>
            失败
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <el-link type="primary" style="margin-right: 10px">更新</el-link>
        <el-link type="primary" style="margin-right: 10px">回滚</el-link>
        <el-link type="primary" style="margin-right: 10px">启动</el-link>
        <el-link type="primary" style="margin-right: 10px">预测</el-link>
        <el-link type="primary" style="margin-right: 10px">停止</el-link>
        <el-link type="primary" style="margin-right: 10px">删除</el-link>
        <el-link type="primary">删除</el-link>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <pagination total="648" currentPage="1" size="20"></pagination>
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
      filters: {
        status: "",
        name: "",
      },
      tableData: [
        {
          id: 34,
          name: "测试",
          describe: "",
          model: {
            name: "推理基础镜像",
            id: 114,
          },
          model_id: 114,
          invocation_times: 0,
          failed_times: 0,
          status: "stopped",
          error_msg: "",
          configs: [
            {
              node_id: 48,
              model_version_id: 111,
              model_version_name: "0.0.1",
              weight: 100,
              envs: null,
              min_replicas: 1,
              specifications: "modelarts.npu.xlarge",
            },
          ],
          advanced: {
            auto_stop: {
              enable: false,
            },
          },
          ratelimit: {
            enable: false,
          },
          deploy_history: {},
          created_by: "admin",
          created_on: "2023-10-16 09:14:45",
          changed_on: "2023-10-16 15:22:31",
        },
        {
          id: 33,
          name: "dsd",
          describe: "",
          model: {
            name: "test_8B_TS",
            id: 83,
          },
          model_id: 83,
          invocation_times: 0,
          failed_times: 0,
          status: "stopped",
          error_msg: "",
          configs: [
            {
              node_id: 46,
              model_version_id: 80,
              model_version_name: "0.0.2",
              weight: 100,
              envs: null,
              min_replicas: 1,
              specifications: "modelarts.cpu.large",
            },
          ],
          advanced: {
            auto_stop: {
              enable: true,
              seconds: 3600,
            },
          },
          ratelimit: {
            enable: false,
          },
          deploy_history: {},
          created_by: "admin",
          created_on: "2023-09-25 15:01:42",
          changed_on: "2023-09-25 15:03:44",
        },
        {
          id: 32,
          name: "test_8B_TS",
          describe: "",
          model: {
            name: "test_8B_TS",
            id: 83,
          },
          model_id: 83,
          invocation_times: 2,
          failed_times: 0,
          status: "running",
          error_msg: "",
          configs: [
            {
              node_id: 45,
              model_version_id: 80,
              model_version_name: "0.0.2",
              weight: 100,
              envs: {
                MODEL_PATH:
                  "/mnt/publish-data/admin/jobs/taichu-admin-1695271007727/out/",
              },
              min_replicas: 1,
              specifications: "modelarts.npu.default",
            },
          ],
          advanced: {
            auto_stop: {
              enable: false,
            },
          },
          ratelimit: {
            enable: false,
          },
          deploy_history: [
            {
              name: "test_8B_TS",
              describe: "",
              configs:
                '[{"model_version_id": 79, "specifications": "modelarts.npu.default", "weight": 100, "min_replicas": 1, "envs": {"MODEL_PATH": "/mnt/publish-data/admin/jobs/taichu-admin-1695271007727/out/"}, "specificationMeta": ["exclusive", "NPU", "modelarts.npu.default"], "model_version_name": "0.0.1"}]',
              ratelimit: '{"enable": false}',
              advanced: '{"auto_stop": {"enable": false}}',
              model_id: 83,
              model: {
                name: "test_8B_TS",
              },
              changed_on: "2023-09-21 20:19:37",
            },
          ],
          created_by: "admin",
          created_on: "2023-09-21 20:17:52",
          changed_on: "2023-09-22 10:57:31",
        },
        {
          id: 31,
          name: "自动学习-run1819-NsS6-v1",
          describe: "",
          model: {
            name: "自动学习-run1819-NsS6",
            id: 79,
          },
          model_id: 79,
          invocation_times: 0,
          failed_times: 0,
          status: "failed",
          error_msg:
            '资源不足，详细错误原因：[PodScheduled]:Unschedulable, all nodes are unavailable: 1 job(service/podgroup-15346613-a667-41a5-b367-53af603a5c8a) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.10> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.10", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-15346613-a667-41a5-b367-53af603a5c8a) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.12> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.12", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-15346613-a667-41a5-b367-53af603a5c8a) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.5> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.5", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "pvrole":"node3", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-15346613-a667-41a5-b367-53af603a5c8a) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.6> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.6", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-15346613-a667-41a5-b367-53af603a5c8a) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.7> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.7", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-15346613-a667-41a5-b367-53af603a5c8a) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.8> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.8", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-15346613-a667-41a5-b367-53af603a5c8a) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.9> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.9", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "pvrole":"node9", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 5 node(s) resource fit failed.\n部署超时,请联系系统管理员。开始部署时刻：2023-09-15 11:31:06.320530, now：2023-09-15 14:16:00.438769\n',
          configs: [
            {
              node_id: 43,
              model_version_id: 75,
              model_version_name: "v1",
              weight: 100,
              envs: {
                MODEL_PATH:
                  "/mnt/publish-data/admin/jobs/taichu-admin-1694686875630/",
              },
              min_replicas: 1,
              specifications: "modelarts.npu.default",
            },
          ],
          advanced: {
            auto_stop: {
              enable: true,
              seconds: 7200,
            },
          },
          ratelimit: null,
          deploy_history: {},
          created_by: "admin",
          created_on: "2023-09-15 11:31:04",
          changed_on: "2023-09-15 14:16:00",
        },
        {
          id: 30,
          name: "自动学习-选择多种数据-rZIi-v1",
          describe: "",
          model: {
            name: "自动学习-选择多种数据-rZIi",
            id: 75,
          },
          model_id: 75,
          invocation_times: 0,
          failed_times: 0,
          status: "failed",
          error_msg:
            '资源不足，详细错误原因：[PodScheduled]:Unschedulable, all nodes are unavailable: 1 job(service/podgroup-a4fb216c-a396-40cf-8d77-4eaeb3ecb141) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.10> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.10", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-a4fb216c-a396-40cf-8d77-4eaeb3ecb141) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.12> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.12", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-a4fb216c-a396-40cf-8d77-4eaeb3ecb141) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.5> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.5", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "pvrole":"node3", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-a4fb216c-a396-40cf-8d77-4eaeb3ecb141) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.6> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.6", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-a4fb216c-a396-40cf-8d77-4eaeb3ecb141) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.7> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.7", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-a4fb216c-a396-40cf-8d77-4eaeb3ecb141) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.8> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.8", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 1 job(service/podgroup-a4fb216c-a396-40cf-8d77-4eaeb3ecb141) selector:map[string]string{"host-arch":"huawei-arm", "org":"public", "service":"true"} not meet node<172.18.110.9> label or selector:map[string]string{"accelerator":"huawei-Ascend910", "approle":"app", "beta.kubernetes.io/arch":"arm64", "beta.kubernetes.io/os":"linux", "cpu":"true", "gpu":"true", "host-arch":"huawei-arm", "kubernetes.io/arch":"arm64", "kubernetes.io/hostname":"172.18.110.9", "kubernetes.io/os":"linux", "masterselector":"dls-master-node", "node-role.kubernetes.io/worker":"true", "notebook":"true", "org":"public", "pvrole":"node9", "role":"backup", "servertype":"Ascend910-8255", "service":"false", "train":"true", "workerselector":"dls-worker-node"}, 5 node(s) resource fit failed.\n',
          configs: [
            {
              node_id: 42,
              model_version_id: 71,
              model_version_name: "v1",
              weight: 100,
              envs: {
                MODEL_PATH:
                  "/mnt/publish-data/admin/jobs/taichu-admin-1694660829533/",
              },
              min_replicas: 2,
              specifications: "modelarts.npu.default",
            },
          ],
          advanced: {
            auto_stop: {
              enable: false,
              seconds: 0,
            },
          },
          ratelimit: null,
          deploy_history: {},
          created_by: "admin",
          created_on: "2023-09-15 09:42:15",
          changed_on: "2023-09-15 09:43:00",
        },
        {
          id: 29,
          name: "LLM知识库代理",
          describe: "",
          model: {
            name: "LLM知识库代理",
            id: 77,
          },
          model_id: 77,
          invocation_times: 32,
          failed_times: 10,
          status: "running",
          error_msg: "",
          configs: [
            {
              node_id: 47,
              model_version_id: 73,
              model_version_name: "0.0.1",
              weight: 100,
              envs: {
                KNOWLEDGE_SEARCH_URL:
                  "http://srv-ins-2-7e629613.service:8080/search",
                INFORMATION_RETRIEVAL_URL:
                  "https://ai-cloud.wair.ac.cn/service_modelview/api/1716/download",
                INFORMATION_RETRIEVAL_AUTH:
                  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjaGFuZ3dhbmxpIn0.5Mj41o70FcKEpXLN9lABGfdayneW8CU3wj6LfDcOUXo",
                LLM_URL: "http://srv-ins-4-633660f6.service:8080/",
              },
              min_replicas: 1,
              specifications: "modelarts.cpu.large",
            },
          ],
          advanced: {
            auto_stop: {
              enable: false,
            },
          },
          ratelimit: {
            enable: false,
          },
          deploy_history: [
            {
              name: "LLM知识库代理",
              describe: "",
              configs:
                '[{"node_id": 40, "model_version_id": 73, "model_version_name": "0.0.1", "weight": 100, "envs": {"KNOWLEDGE_SEARCH_URL": "http://srv-ins-2-7e629613.service:8080/search", "INFORMATION_RETRIEVAL_URL": "https://ai-cloud.wair.ac.cn/service_modelview/api/1716/download", "INFORMATION_RETRIEVAL_AUTH": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjaGFuZ3dhbmxpIn0.5Mj41o70FcKEpXLN9lABGfdayneW8CU3wj6LfDcOUXo", "LLM_URL": "http://srv-ins-20-14659d45.service:8080/"}, "min_replicas": 1, "specifications": "modelarts.cpu.large", "specificationMeta": ["exclusive", "CPU", "modelarts.cpu.large"]}]',
              ratelimit: '{"enable": false}',
              advanced: '{"auto_stop": {"enable": false}}',
              model_id: 77,
              model: {
                name: "LLM知识库代理",
              },
              changed_on: "2023-09-14 15:34:01",
            },
            {
              name: "LLM知识库代理",
              describe: "",
              configs:
                '[{"node_id": 39, "model_version_id": 73, "model_version_name": "0.0.1", "weight": 100, "envs": {"KNOWLEDGE_SEARCH_URL": "http://srv-ins-2-7e629613.service/search", "INFORMATION_RETRIEVAL_URL": "https://ai-cloud.wair.ac.cn/service_modelview/api/1716/download", "INFORMATION_RETRIEVAL_AUTH": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjaGFuZ3dhbmxpIn0.5Mj41o70FcKEpXLN9lABGfdayneW8CU3wj6LfDcOUXo", "LLM_URL": "http://srv-ins-20-14659d45.service/"}, "min_replicas": 1, "specifications": "modelarts.cpu.large", "specificationMeta": ["exclusive", "CPU", "modelarts.cpu.large"]}]',
              ratelimit: '{"enable": false}',
              advanced: '{"auto_stop": {"enable": false}}',
              model_id: 77,
              model: {
                name: "LLM知识库代理",
              },
              changed_on: "2023-09-14 14:40:00",
            },
            {
              name: "LLM知识库代理",
              describe: "",
              configs:
                '[{"node_id": 38, "model_version_id": 73, "model_version_name": "0.0.1", "weight": 100, "envs": {"KNOWLEDGE_SEARCH_URL": "KNOWLEDGE_SEARCH_URL", "INFORMATION_RETRIEVAL_URL": "INFORMATION_RETRIEVAL_URL", "INFORMATION_RETRIEVAL_AUTH": "INFORMATION_RETRIEVAL_AUTH", "LLM_URL": "LLM_URL"}, "min_replicas": 1, "specifications": "modelarts.cpu.large", "specificationMeta": ["exclusive", "CPU", "modelarts.cpu.large"]}]',
              ratelimit: '{"enable": false}',
              advanced: '{"auto_stop": {"enable": false}}',
              model_id: 77,
              model: {
                name: "LLM知识库代理",
              },
              changed_on: "2023-09-14 14:24:15",
            },
            {
              name: "LLM知识库代理",
              describe: "",
              configs:
                '[{"model_version_id": 73, "min_replicas": 1, "weight": 100, "specifications": "modelarts.cpu.large", "specificationMeta": ["exclusive", "CPU", "modelarts.cpu.large"], "model_version_name": "0.0.1"}]',
              ratelimit: '{"enable": false}',
              advanced: '{"auto_stop": {"enable": false}}',
              model_id: 77,
              model: {
                name: "LLM知识库代理",
              },
              changed_on: "2023-09-14 14:22:46",
            },
          ],
          created_by: "admin",
          created_on: "2023-09-14 14:20:37",
          changed_on: "2023-10-16 15:47:37",
        },
        {
          id: 28,
          name: "自动学习-基于历史模型历史数据001-KXiD-v1",
          describe: "",
          model: {
            name: "自动学习-基于历史模型历史数据001-KXiD",
            id: 71,
          },
          model_id: 71,
          invocation_times: 21,
          failed_times: 0,
          status: "stopped",
          error_msg: "",
          configs: [
            {
              node_id: 37,
              model_version_id: 67,
              model_version_name: "v1",
              weight: 100,
              envs: {
                MODEL_PATH:
                  "/mnt/publish-data/admin/jobs/taichu-admin-1694656510241/",
              },
              min_replicas: 2,
              specifications: "modelarts.npu.default",
            },
          ],
          advanced: {
            auto_stop: {
              enable: false,
              seconds: 0,
            },
          },
          ratelimit: null,
          deploy_history: {},
          created_by: "admin",
          created_on: "2023-09-14 10:36:54",
          changed_on: "2023-09-15 14:58:51",
        },
        {
          id: 27,
          name: "自动学习-本_文_已_005-ALW9-v1",
          describe: "",
          model: {
            name: "自动学习-本_文_已_005-ALW9",
            id: 69,
          },
          model_id: 69,
          invocation_times: 3,
          failed_times: 0,
          status: "stopped",
          error_msg: "",
          configs: [
            {
              node_id: 36,
              model_version_id: 65,
              model_version_name: "v1",
              weight: 100,
              envs: {
                MODEL_PATH:
                  "/mnt/publish-data/admin/jobs/taichu-admin-1694597989083/",
              },
              min_replicas: 1,
              specifications: "modelarts.npu.default",
            },
          ],
          advanced: {
            auto_stop: {
              enable: false,
              seconds: 0,
            },
          },
          ratelimit: null,
          deploy_history: {},
          created_by: "admin",
          created_on: "2023-09-14 08:24:00",
          changed_on: "2023-09-14 10:38:37",
        },
        {
          id: 26,
          name: "自动学习-5466456-q19r-v1",
          describe: "",
          model: {
            name: "自动学习-5466456-q19r",
            id: 68,
          },
          model_id: 68,
          invocation_times: 0,
          failed_times: 0,
          status: "failed",
          error_msg: "",
          configs: [
            {
              node_id: 35,
              model_version_id: 64,
              model_version_name: "v1",
              weight: 100,
              envs: {
                MODEL_PATH:
                  "/mnt/publish-data/admin/jobs/taichu-admin-1694586859116/",
              },
              min_replicas: 1,
              specifications: "modelarts.npu.default",
            },
          ],
          advanced: {
            auto_stop: {
              enable: true,
              seconds: 3600,
            },
          },
          ratelimit: null,
          deploy_history: {},
          created_by: "admin",
          created_on: "2023-09-13 15:18:17",
          changed_on: "2023-09-14 09:33:38",
        },
        {
          id: 25,
          name: "自动学习-3434234324-BEQ3-v1",
          describe: "",
          model: {
            name: "自动学习-3434234324-BEQ3",
            id: 67,
          },
          model_id: 67,
          invocation_times: 0,
          failed_times: 0,
          status: "stopped",
          error_msg: "",
          configs: [
            {
              node_id: 34,
              model_version_id: 63,
              model_version_name: "v1",
              weight: 100,
              envs: {
                MODEL_PATH:
                  "/mnt/publish-data/admin/jobs/taichu-admin-1694586109779/",
              },
              min_replicas: 1,
              specifications: "modelarts.npu.default",
            },
          ],
          advanced: {
            auto_stop: {
              enable: false,
              seconds: 0,
            },
          },
          ratelimit: null,
          deploy_history: {},
          created_by: "admin",
          created_on: "2023-09-13 14:35:10",
          changed_on: "2023-09-14 09:33:41",
        },
        {
          id: 24,
          name: "自动学习-上传1450-oU3r-v1",
          describe: "",
          model: {
            name: "自动学习-上传1450-oU3r",
            id: 60,
          },
          model_id: 60,
          invocation_times: 3,
          failed_times: 0,
          status: "stopped",
          error_msg: "",
          configs: [
            {
              node_id: 33,
              model_version_id: 56,
              model_version_name: "v1",
              weight: 100,
              envs: {
                MODEL_PATH:
                  "/mnt/publish-data/admin/jobs/taichu-admin-1693983230492/",
              },
              min_replicas: 1,
              specifications: "modelarts.npu.default",
            },
          ],
          advanced: {
            auto_stop: {
              enable: true,
              seconds: 3600,
            },
          },
          ratelimit: null,
          deploy_history: {},
          created_by: "admin",
          created_on: "2023-09-13 14:22:48",
          changed_on: "2023-09-13 15:32:01",
        },
        {
          id: 23,
          name: "自动学习-示_文_未_001-qCxX-v1",
          describe: "",
          model: {
            name: "自动学习-示_文_未_001-qCxX",
            id: 66,
          },
          model_id: 66,
          invocation_times: 0,
          failed_times: 0,
          status: "stopped",
          error_msg: "",
          configs: [
            {
              node_id: 32,
              model_version_id: 62,
              model_version_name: "v1",
              weight: 100,
              envs: {
                MODEL_PATH:
                  "/mnt/publish-data/admin/jobs/taichu-admin-1694576787099/",
              },
              min_replicas: 1,
              specifications: "modelarts.npu.default",
            },
          ],
          advanced: {
            auto_stop: {
              enable: false,
              seconds: 0,
            },
          },
          ratelimit: null,
          deploy_history: {},
          created_by: "admin",
          created_on: "2023-09-13 11:59:59",
          changed_on: "2023-09-14 15:05:37",
        },
        {
          id: 22,
          name: "test_kubectl",
          describe: "测试kubectl",
          model: {
            name: "kubectl",
            id: 65,
          },
          model_id: 65,
          invocation_times: 0,
          failed_times: 0,
          status: "failed",
          error_msg:
            "资源不足，详细错误原因：[PodScheduled]:Unschedulable, 1/1 tasks in gang unschedulable: pod group is not ready, 1 Pending, 1 minAvailable; Pending: 1 Unschedulable\n",
          configs: [
            {
              node_id: 31,
              model_version_id: 61,
              model_version_name: "0.0.1",
              weight: 100,
              envs: null,
              min_replicas: 1,
              specifications: "modelarts.cpu.large",
            },
          ],
          advanced: {
            auto_stop: {
              enable: false,
            },
          },
          ratelimit: {
            enable: false,
          },
          deploy_history: {},
          created_by: "admin",
          created_on: "2023-09-12 17:08:35",
          changed_on: "2023-09-12 17:09:00",
        },
        {
          id: 21,
          name: "rank-ms18-wkkkkkkk",
          describe: "",
          model: {
            name: "npu-rank-ms18",
            id: 64,
          },
          model_id: 64,
          invocation_times: 1,
          failed_times: 0,
          status: "stopped",
          error_msg: "",
          configs: [
            {
              node_id: 26,
              model_version_id: 60,
              model_version_name: "0.0.1",
              weight: 100,
              envs: null,
              min_replicas: 1,
              specifications: "modelarts.npu.1xlarge",
            },
          ],
          advanced: {
            auto_stop: {
              enable: false,
            },
          },
          ratelimit: {
            enable: false,
          },
          deploy_history: {},
          created_by: "wair_changwanli",
          created_on: "2023-09-11 18:39:43",
          changed_on: "2023-09-14 11:14:36",
        },
        {
          id: 20,
          name: "nlp加密",
          describe: "",
          model: {
            name: "nlp-taichu-mindspore-server-enc",
            id: 62,
          },
          model_id: 62,
          invocation_times: 0,
          failed_times: 0,
          status: "stopped",
          error_msg: "",
          configs: [
            {
              node_id: 29,
              model_version_id: 58,
              model_version_name: "0.0.1",
              weight: 100,
              envs: {
                MODEL_PATH:
                  "/mnt/publish-data/train_data/taichu_7B_mindformers/v8_20230430/checkpoint-2200-enc/checkpoint-2200-enc/",
              },
              min_replicas: 1,
              specifications: "modelarts.npu.3xlarge",
            },
          ],
          advanced: {
            auto_stop: {
              enable: false,
            },
          },
          ratelimit: {
            enable: false,
          },
          deploy_history: [
            {
              name: "nlp加密",
              describe: "",
              configs:
                '[{"node_id": 27, "model_version_id": 58, "model_version_name": "0.0.1", "weight": 100, "envs": {"MODEL_PATH": "/mnt/publish-data/train_data/taichu_7B_mindformers/v8_20230430/checkpoint-2200-enc/checkpoint-2200-enc/"}, "min_replicas": 1, "specifications": "modelarts.cpu.1xlarge", "specificationMeta": ["exclusive", "CPU", "modelarts.cpu.1xlarge"]}]',
              ratelimit: '{"enable": false}',
              advanced: '{"auto_stop": {"enable": false}}',
              model_id: 62,
              model: {
                name: "nlp-taichu-mindspore-server-enc",
              },
              changed_on: "2023-09-12 10:33:43",
            },
            {
              name: "nlp加密",
              describe: "",
              configs:
                '[{"node_id": 25, "model_version_id": 58, "model_version_name": "0.0.1", "weight": 100, "envs": {"MODEL_PATH": "/mnt/publish-data/train_data/taichu_7B_mindformers/v8_20230430/checkpoint-2200-enc/checkpoint-2200-enc/"}, "min_replicas": 1, "specifications": "modelarts.npu.3xlarge", "specificationMeta": ["exclusive", "NPU", "modelarts.npu.3xlarge"]}]',
              ratelimit: '{"enable": false}',
              advanced: '{"auto_stop": {"enable": false}}',
              model_id: 62,
              model: {
                name: "nlp-taichu-mindspore-server-enc",
              },
              changed_on: "2023-09-12 10:28:03",
            },
            {
              name: "nlp加密",
              describe: "",
              configs:
                '[{"model_version_id": 58, "specifications": "modelarts.npu.3xlarge", "min_replicas": 1, "weight": 100, "envs": {"MODEL_PATH": "/mnt/publish-data/train_data/taichu_7B_mindformers/v8_20230430/checkpoint-2200-enc/"}, "specificationMeta": ["exclusive", "NPU", "modelarts.npu.3xlarge"], "model_version_name": "0.0.1"}]',
              ratelimit: '{"enable": false}',
              advanced: '{"auto_stop": {"enable": false}}',
              model_id: 62,
              model: {
                name: "nlp-taichu-mindspore-server-enc",
              },
              changed_on: "2023-09-12 10:26:53",
            },
          ],
          created_by: "admin",
          created_on: "2023-09-08 18:30:08",
          changed_on: "2023-09-21 15:45:14",
        },
        {
          id: 19,
          name: "自动学习-预置1724-idhk-v1",
          describe: "",
          model: {
            name: "自动学习-预置1724-idhk",
            id: 52,
          },
          model_id: 52,
          invocation_times: 789,
          failed_times: 10,
          status: "running",
          error_msg: "",
          configs: [
            {
              node_id: 30,
              model_version_id: 49,
              model_version_name: "v1",
              weight: 100,
              envs: {
                MODEL_PATH:
                  "/mnt/publish-data/admin/jobs/taichu-admin-1693819765736/",
              },
              min_replicas: 2,
              specifications: "modelarts.npu.default",
            },
          ],
          advanced: {
            auto_stop: {
              enable: false,
            },
          },
          ratelimit: {
            enable: false,
          },
          deploy_history: [
            {
              name: "自动学习-预置1724-idhk-v1",
              describe: "",
              configs:
                '[{"node_id": 23, "model_version_id": 49, "model_version_name": "v1", "weight": 100, "envs": {"MODEL_PATH": "/mnt/publish-data/admin/jobs/taichu-admin-1693819765736/"}, "min_replicas": 4, "specifications": "modelarts.npu.default", "specificationMeta": ["exclusive", "NPU", "modelarts.npu.default"]}]',
              ratelimit: '{"enable": false}',
              advanced: '{"auto_stop": {"enable": false}}',
              model_id: 52,
              model: {
                name: "自动学习-预置1724-idhk",
              },
              changed_on: "2023-09-05 20:54:00",
            },
            {
              name: "自动学习-预置1724-idhk-v1",
              describe: "",
              configs:
                '[{"min_replicas": 1, "max_replicas": 1, "resource_memory": "1G", "resource_cpu": 1, "resource_gpu": 0, "specifications": "modelarts.npu.default", "weight": 100, "model_version_id": 49, "envs": {"MODEL_PATH": "/mnt/publish-data/admin/jobs/taichu-admin-1693819765736/"}, "model_version_name": "v1"}]',
              ratelimit: "null",
              advanced: '{"auto_stop": {"enable": false, "seconds": 0}}',
              model_id: 52,
              model: {
                name: "自动学习-预置1724-idhk",
              },
              changed_on: "2023-09-05 11:39:00",
            },
          ],
          created_by: "admin",
          created_on: "2023-09-05 11:23:08",
          changed_on: "2023-10-16 17:14:37",
        },
        {
          id: 18,
          name: "自动学习-预置1828-YxbV-v1",
          describe: "",
          model: {
            name: "自动学习-预置1828-YxbV",
            id: 56,
          },
          model_id: 56,
          invocation_times: 0,
          failed_times: 0,
          status: "stopped",
          error_msg: "",
          configs: [
            {
              node_id: 22,
              model_version_id: 53,
              model_version_name: "v1",
              weight: 100,
              envs: {
                MODEL_PATH:
                  "/mnt/publish-data/admin/jobs/taichu-admin-1693823418030/",
              },
              min_replicas: 1,
              specifications: "modelarts.npu.default",
            },
          ],
          advanced: {
            auto_stop: {
              enable: false,
              seconds: 0,
            },
          },
          ratelimit: null,
          deploy_history: {},
          created_by: "admin",
          created_on: "2023-09-05 11:07:14",
          changed_on: "2023-09-12 10:30:18",
        },
        {
          id: 17,
          name: "自动学习-预置2125-jjvU-v1",
          describe: "",
          model: {
            name: "自动学习-预置2125-jjvU",
            id: 57,
          },
          model_id: 57,
          invocation_times: 0,
          failed_times: 0,
          status: "stopped",
          error_msg: "",
          configs: [
            {
              node_id: 21,
              model_version_id: 54,
              model_version_name: "v1",
              weight: 100,
              envs: {
                MODEL_PATH:
                  "/mnt/publish-data/admin/jobs/taichu-admin-1693838312600/",
              },
              min_replicas: 1,
              specifications: "modelarts.npu.default",
            },
          ],
          advanced: {
            auto_stop: {
              enable: false,
              seconds: 0,
            },
          },
          ratelimit: null,
          deploy_history: {},
          created_by: "admin",
          created_on: "2023-09-05 11:00:04",
          changed_on: "2023-09-12 10:30:21",
        },
        {
          id: 16,
          name: "自动学习-微调_lu_预置_示_已_002-u4Tl-v1",
          describe: "",
          model: {
            name: "自动学习-微调_lu_预置_示_已_002-u4Tl",
            id: 41,
          },
          model_id: 41,
          invocation_times: 0,
          failed_times: 0,
          status: "stopped",
          error_msg: "",
          configs: [
            {
              node_id: 20,
              model_version_id: 41,
              model_version_name: "v1",
              weight: 100,
              envs: {
                MODEL_PATH:
                  "/mnt/publish-data/admin/jobs/taichu-admin-1693802251930/",
              },
              min_replicas: 1,
              specifications: "modelarts.npu.default",
            },
          ],
          advanced: {
            auto_stop: {
              enable: false,
              seconds: 3600,
            },
          },
          ratelimit: null,
          deploy_history: {},
          created_by: "admin",
          created_on: "2023-09-04 16:11:54",
          changed_on: "2023-09-12 10:30:22",
        },
        {
          id: 15,
          name: "自动学习-微调_lu_预置_示_未_001-kMNR-v1",
          describe: "",
          model: {
            name: "自动学习-微调_lu_预置_示_未_001-kMNR",
            id: 37,
          },
          model_id: 37,
          invocation_times: 0,
          failed_times: 0,
          status: "stopped",
          error_msg: "",
          configs: [
            {
              node_id: 19,
              model_version_id: 35,
              model_version_name: "v1",
              weight: 100,
              envs: {
                MODEL_PATH:
                  "/mnt/publish-data/admin/jobs/taichu-admin-1693790867528/",
              },
              min_replicas: 1,
              specifications: "modelarts.npu.default",
            },
          ],
          advanced: {
            auto_stop: {
              enable: false,
              seconds: 7200,
            },
          },
          ratelimit: null,
          deploy_history: {},
          created_by: "admin",
          created_on: "2023-09-04 09:47:38",
          changed_on: "2023-09-12 10:30:25",
        },
      ],
    };
  },
  methods: {
    toCreate() {
      this.$router.push({
        name: "onlineServiceeAdd",
      });
    },
    toDesc() {
      this.$router.push({
        name: "onlineServiceeDesc",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.indexBox {
  .topBar {
    width: 100%;
    padding: 8px 24px 8px 10px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    position: relative;
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
  }
  .addBtn {
    background-color: #1946b9;
    height: 32px;
    padding: 4px 15px;
    color: #fff;
    border: 0;
    cursor: pointer;
    transition: background-color ease 0.2s;
    &:hover {
      background-color: #3c68c7;
    }
  }
  .pagination {
    position: fixed;
    bottom: 0;
    width: calc(100% - 258px);
    background-color: #000;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.65),
      rgb(242, 243, 255)
    );
    z-index: 1;
    padding: 0px 24px;
    box-shadow: rgba(25, 70, 185, 0.1) 0px -8px 12px;
    transition: width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  }

  ::v-deep(.el-icon-loading:before) {
    content: "\e6d0";
  }
  .version {
    margin-left: 10px;
    color: #6DC776;
    font-size: 12px;

  }
}
</style>