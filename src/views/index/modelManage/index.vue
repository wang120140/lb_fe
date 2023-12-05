<template>
  <div class="indexBox">
    <div class="topBar">
      <button class="addBtn" @click="toCreate">导入模型</button>
      <div class="filter">
        <el-input
          v-model="filters.filterName"
          class="filterItem"
          style="width: 202px"
          placeholder="请输入模型ID"
          clearable
        ></el-input>
        <el-input
          v-model="filters.filterName"
          class="filterItem"
          style="width: 202px"
          placeholder="请输入名称"
          clearable
        ></el-input>

        <el-select
          v-model="filters.markSource"
          class="filterItem"
          placeholder="请选择模型来源"
          clearable
        >
        </el-select>
        <el-select
          v-model="filters.dataSource"
          class="filterItem"
          placeholder="请选择模型类型"
          clearable
        >
        </el-select>
        <div class="refresh">
          <i class="el-icon-refresh"></i>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%; margin-bottom: 30px">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="versionsData" style="width: 90%; margin-left: 5%">
            <el-table-column prop="name" label="模型版本" width="width">
              <template slot-scope="scope">
                <span style="color: #45b850">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="model_id" label="版本ID" width="width">
            </el-table-column>
            <el-table-column prop="size" label="模型大小" width="width">
            </el-table-column>
            <el-table-column prop="prop" label="状态" width="width">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status == 'success'" type="success">
                  <i class="el-icon-circle-check"></i>
                  导入成功
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="prop" label="描述" width="width">
            </el-table-column>
            <el-table-column prop="changed_on" label="创建时间" width="width">
            </el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
              <el-link type="primary" style="margin-right: 10px">编辑</el-link>
              <el-link type="primary" style="margin-right: 10px">部署</el-link>
              <el-link type="primary" style="margin-right: 10px">导出</el-link>
              <el-link type="primary">删除</el-link>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="模型名称">
        <template slot-scope="scope">
          <el-link type="primary" @click="toDesc">{{ scope.row.name }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="versions" label="版本数"> </el-table-column>
      <el-table-column prop="type" label="模型类型"> </el-table-column>
      <el-table-column prop="status" label="模型来源">
        自动学习
      </el-table-column>
      <el-table-column prop="framework" label="算法框架"> </el-table-column>
      <el-table-column prop="describe" label="描述"> </el-table-column>
      <el-table-column prop="changed_on" label="创建时间"> </el-table-column>
      <el-table-column label="操作">
        <el-link type="primary" style="margin-right: 10px">导入新版本</el-link>
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
        filterName: "",
        markModel: "",
        markStatus: "",
        markSource: "",
        dataSource: "",
      },
      tableData: [
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-w8nq",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-19 04:28:37",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "10 hours ago",
          source: "auto_learning",
          id: 121,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-BZmG",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-19 03:45:39",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "11 hours ago",
          source: "auto_learning",
          id: 120,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-2V7u",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-19 01:49:39",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "13 hours ago",
          source: "auto_learning",
          id: 119,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-rxWJ",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-18 20:04:37",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "19 hours ago",
          source: "auto_learning",
          id: 118,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-N8zd",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-18 04:22:37",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "a day ago",
          source: "auto_learning",
          id: 117,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-y36A",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-18 03:45:39",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "a day ago",
          source: "auto_learning",
          id: 116,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-44o1",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-17 03:45:38",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "2 days ago",
          source: "auto_learning",
          id: 115,
          versions: 1,
        },
        {
          type: "other",
          name: "推理基础镜像",
          project_id: null,
          readme: "",
          describe: "",
          dimension: "other",
          sub_dimension: null,
          framework: "other",
          changed_on: "2023-10-16 09:14:23",
          scene: "other",
          is_public: 2,
          modified: "3 days ago",
          source: "image",
          id: 114,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-f57H",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-16 04:29:38",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "3 days ago",
          source: "auto_learning",
          id: 113,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-QDLR",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-16 03:45:38",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "3 days ago",
          source: "auto_learning",
          id: 112,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-jiT0",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-15 03:45:38",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "4 days ago",
          source: "auto_learning",
          id: 111,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-iD3j",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-14 03:45:36",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "5 days ago",
          source: "auto_learning",
          id: 110,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-Ouqu",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-13 03:45:37",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "6 days ago",
          source: "auto_learning",
          id: 109,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-r5Jb",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-12 03:45:36",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "7 days ago",
          source: "auto_learning",
          id: 108,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-OXBY",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-11 03:45:37",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "8 days ago",
          source: "auto_learning",
          id: 107,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-UeMO",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-10 03:45:36",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "9 days ago",
          source: "auto_learning",
          id: 106,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-mLaz",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-09 03:45:36",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "10 days ago",
          source: "auto_learning",
          id: 105,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-owlm",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-08 04:29:36",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "11 days ago",
          source: "auto_learning",
          id: 104,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-w9ph",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-08 03:45:36",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "11 days ago",
          source: "auto_learning",
          id: 103,
          versions: 1,
        },
        {
          type: "multiple_rounds_of_text_question_answer",
          name: "自动学习-run1507-YWek",
          project_id: 5,
          readme: "",
          describe: "来自自动学习任务run1507",
          dimension: "other",
          sub_dimension: null,
          framework: "mindspore_serving",
          changed_on: "2023-10-07 03:45:35",
          scene: "other",
          is_public: 2,
          project_url: "public(公共项目组)",
          modified: "12 days ago",
          source: "auto_learning",
          id: 102,
          versions: 1,
        },
      ],
      versionsData: [
        {
          name: "v1",
          serving_framework: "other",
          describe: "",
          source_id: 364,
          apis: '{\n    "url": "/api/v1/infer",\n    "httpMethod": "POST",\n    "httpBodyType": "json",\n    "body": [\n        {\n            "key": "input_text",\n            "valueType": "string",\n            "desc": "输入的文本",\n            "isRequired": "true",\n            "exampleValue": "你好，请你介绍下自己"\n        },\n        {\n            "key": "context",\n            "valueType": "string",\n            "desc": "上下文内容",\n            "isRequired": "false",\n            "exampleValue": ""\n        },\n        {\n            "key": "min_new_tokens",\n            "valueType": "number",\n            "desc": "生成的最小新token数量",\n            "isRequired": "true",\n            "exampleValue": 2\n        },\n        {\n            "key": "max_new_tokens",\n            "valueType": "number",\n            "desc": "生成的最大新token数量",\n            "isRequired": "true",\n            "exampleValue": 512\n        },\n        {\n            "key": "prefix",\n            "valueType": "string",\n            "desc": "输出的前缀",\n            "isRequired": "false",\n            "exampleValue": ""\n        },\n        {\n            "key": "top_p",\n            "valueType": "number",\n            "desc": "生成过程中的token几率阈值",\n            "isRequired": "true",\n            "exampleValue": 0.9\n        },\n        {\n            "key": "temperature",\n            "valueType": "number",\n            "desc": "生成过程中的温度值",\n            "isRequired": "true",\n            "exampleValue": 0.8\n        },\n        {\n            "key": "repetition_penalty",\n            "valueType": "number",\n            "desc": "生成过程中的重复惩罚值",\n            "isRequired": "true",\n            "exampleValue": 1.1\n        }\n    ],\n    "headers": [\n\n    ],\n    "params": [\n\n    ],\n    "responseStructure": [\n        {\n            "key": "full_context",\n            "isRequired": "true",\n            "valueType": "string",\n            "desc": "生成的完整上下文",\n            "exampleValue": ""\n        }\n    ]\n}',
          image:
            "swr.cn-central-221.ovaijisuan.com/wair/nlp-taichu-mindspore-server:1.0.7",
          changed_on: "2023-10-19 04:28:37",
          device_type: "cpu",
          failed_msg: "",
          image_id: null,
          volume_mount: "",
          port: "8080",
          path: '{"model_path": "/mnt/publish-data/admin/jobs/taichu-admin-1695366499322/"}',
          cpu_type: "x86_64",
          status: "success",
          size: "0",
          model_id: 121,
          source: "auto_learning",
          id: 118,
        },
      ],
    };
  },
  methods: {
    toCreate() {
      this.$router.push({
        name: "modelManageAdd",
      });
    },
    // toDesc() {
    //   this.$router.push({
    //     name: "dataAssembleDesc",
    //   });
    // },
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
}
</style>