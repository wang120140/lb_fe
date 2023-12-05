<template>
  <div class="devContain">
    <div class="containForm">
      <el-tabs v-model="activeName">
        <el-tab-pane name="baseConfig">
          <span slot="label" class="label">基本配置</span>
          <el-form
            ref="form"
            :rules="rules"
            :model="sizeForm"
            label-width="140px"
            size="mini"
            style="width: 460px"
          >
            <el-form-item label="数据集存放路径：" prop="trainDataDir">
              <el-input v-model="sizeForm.trainDataDir"></el-input>
            </el-form-item>
            <el-form-item label="脚本存放路径:" prop="shellDir">
              <el-input v-model="sizeForm.shellDir"></el-input>
            </el-form-item>
            <el-form-item label="日志文件名：" prop="logFileName">
              <el-input v-model="sizeForm.logFileName"></el-input>
            </el-form-item>
            <el-form-item label="日志存放路径：" prop="logDir">
              <el-input v-model="sizeForm.logDir"></el-input>
            </el-form-item>
            <el-form-item label="日志条数:" prop="logLines">
              <el-input v-model="sizeForm.logLines"></el-input>
            </el-form-item>
            <el-form-item label="ip地址:" prop="host">
              <el-input v-model="sizeForm.host"></el-input>
            </el-form-item>
            <el-form-item label="端口号:" prop="port">
              <el-input v-model="sizeForm.port"></el-input>
            </el-form-item>
            <el-form-item label="账号:" prop="user">
              <el-input v-model="sizeForm.user"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input v-model="sizeForm.password"></el-input>
            </el-form-item>
            
            <el-form-item label="训练脚本:" prop="fileList1">
              <el-upload
                class="upload-demo"
                ref="upload1"
                action=""
                :on-change="changeFile1"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList1"
                :http-request="uploadFile1"
                :limit="1"
                :auto-upload="false"
              >
                <el-button slot="trigger" type="primary">选取文件</el-button>
                <!-- <el-button style="margin-left: 10px;" type="success" @click="submitUpload(1)">上传到服务器</el-button> -->
              </el-upload>
            </el-form-item>
            <el-form-item label="部署脚本:" prop="fileList2">
              <el-upload
                class="upload-demo"
                ref="upload2"
                action="/"
                :on-preview="handlePreview"
                :on-change="changeFile2"
                :on-remove="handleRemove"
                :file-list="fileList2"
                :http-request="uploadFile2"
                :limit="1"
                :auto-upload="false"
              >
                <el-button slot="trigger" type="primary">选取文件</el-button>
                <!-- <el-button style="margin-left: 10px;" type="success" @click="submitUpload()">上传到服务器</el-button> -->
              </el-upload>
            </el-form-item>

            <el-form-item size="large">
              <el-button type="primary" @click="onSubmit">确定</el-button>
              <el-button @click="quiteBtn">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="dataReflux">
          <span slot="label" class="label">显卡列表</span>
            <div class="topBar">
                <el-button type="primary" size="small">添加显卡</el-button>
            </div>
            <el-table
                :data="graphicsCardList"
                style="width: 100%">
                <el-table-column
                    prop="prop"
                    label="显卡名称">
                </el-table-column>
                <el-table-column
                    prop="prop"
                    label="显卡型号">
                </el-table-column>
                <el-table-column
                    prop="prop"
                    label="当前状态">
                </el-table-column>
                <el-table-column
                    prop="prop"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="prop"
                    label="操作">
                    <el-link type="success">设为空闲</el-link>
                    <el-link type="danger" style="margin-left:10px">删除此显卡</el-link>
                </el-table-column>
            </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import {
  envGetConfig_fromServer, // 获取配置
  envUpdateConfig_fromServer, // 更新配置
  shellUploadShell_fromServer, // 脚本上传
} from "@/network/api.js";
export default {
  data() {
    return {
      activeName: "baseConfig",
      fileList1: [],
      fileList2: [],
      sizeForm: {
        debugShellName: "", // 调试脚本文件名
        deployShellName: "", // 部署脚本文件名
        logDir: "", // 日志存放路径
        logFileName: "", // 日志文件名
        shellDir: "", //脚本存放路径
        trainDataDir: "", //训练集存放路径
        fileList1: [],
        fileList2: [],
        logLines:"",
        host: "",
        port: "",
        user: "",
        password: "",

      },
      rules: {
        trainDataDir: [
          { required: true, message: "请填写数据集存放路径", trigger: "blur" },
        ],
        shellDir: [
          { required: true, message: "请填写脚本存放路径", trigger: "blur" },
        ],
        logFileName: [
          { required: true, message: "请填写日志文件", trigger: "blur" },
        ],
        logDir: [
          { required: true, message: "请填写日志存放路径：", trigger: "blur" },
        ],
        // host: [
        //     { required: true, message: '请填写正确的IP地址：', trigger: 'blur' },
        //     {
        //         pattern: /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
        //         message: '请填写正确的IP地址',
        //         trigger: 'blur'
        //     },
        // ],
        // port: [
        //     { required: true, message: '填写正确的端口号：', trigger: 'blur' },
        //     {
        //         pattern: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
        //         message: '填写正确的端口号',
        //         trigger: 'blur'
        //     },
        // ],
        // user: [
        //     { required: true, message: '请填写日志存放路径：', trigger: 'blur' },
        // ],
        // password: [
        //     { required: true, message: '请填写日志存放路径：', trigger: 'blur' },
        // ],
      },
      graphicsCardList:[
        {}
      ]
    };
  },
  props: {},
  watch: {},
  components: {},
  created() {},
  mounted() {
    let _this = this;

    this.getMessage();
  },

  methods: {
    // 取消上传
    quiteBtn() {
      Object.keys(this.sizeForm).forEach((item) => {
        this.sizeForm[item] = "";
      });
      this.sizeForm.fileList1 = [];
      this.sizeForm.fileList2 = [];
      this.fileList1 = [];
      this.fileList12 = [];
      this.$refs.upload1.clearFiles();
      this.$refs.upload2.clearFiles();
      this.$notify({
        title: "提示",
        message: "表格信息已经重置",
      });
    },
    // 获取信息  初始化信息
    getMessage() {
      let _this = this;
      envGetConfig_fromServer().then((res) => {
        console.log(res);
        console.log("获取信息......");
        if (res.resultCode == 2000) {
          _this.sizeForm = res.resultData;
        }
      });
    },

    // 提交信息
    onSubmit() {
      // 提交文件
      let _this = this;
      this.$refs.form.validate((valid) => {
        if (valid) {
          try {
            this.$refs.upload1.submit();
            this.$refs.upload2.submit();
          } catch (error) {}

          envUpdateConfig_fromServer(
            _this.paramsToFormData(_this.sizeForm)
          ).then((res) => {
            if (res.resultCode == 2000) {
              _this.$notify({
                title: "成功",
                message: res.resultMsg,
                type: "success",
              });
            } else {
              _this.$notify({
                title: "提交失败",
                message: "提交失败" + res.resultMsg,
                type: "error",
              });
            }
          });
        } else {
          _this.$notify({
            title: "提交信息不全",
            message: "提交失败",
            type: "error",
          });
          return false;
        }
      });
    },
    paramsToFormData(obj) {
      const formData = new FormData();
      Object.keys(obj).forEach((key) => {
        if (obj[key] instanceof Array) {
          obj[key].forEach((item) => {
            formData.append(key, item);
          });
          return;
        }
        formData.append(key, obj[key]);
      });
      return formData;
    },

    // 训练脚本上传
    uploadFile1(file1) {
      console.log(file1);
      console.log("训练脚本上传******");
      let _this = this;
      let _pram = new FormData();
      _pram.append("file", file1.file);
      shellUploadShell_fromServer(_pram).then((res) => {
        if (res.resultCode == 2000) {
          _this.$notify({
            title: "成功",
            message: "训练脚本" + res.resultMsg,
            type: "success",
          });
        } else {
          _this.$notify({
            title: "上传失败",
            message: "训练脚本" + res.resultMsg,
            type: "error",
          });
        }
      });
    },
    // 部署脚本上传
    uploadFile2(file2) {
      console.log(file2);
      console.log("部署脚本上传======");
      let _this = this;
      let _pram = new FormData();
      _pram.append("file", file2.file);
      shellUploadShell_fromServer(_pram).then((res) => {
        if (res.resultCode == 2000) {
          _this.$notify({
            title: "成功",
            message: "部署脚本" + res.resultMsg,
            type: "success",
          });
        } else {
          _this.$notify({
            title: "上传失败",
            message: "部署脚本" + res.resultMsg,
            type: "error",
          });
        }
      });
    },
    // 训练脚本
    changeFile1(file) {
      console.log(file);
      console.log("训练脚本信息内容1**********");
      this.sizeForm.debugShellName = file.name;
      this.sizeForm.fileList1 = [];
      this.sizeForm.fileList1.push(file);
    },
    // 部署脚本
    changeFile2(file) {
      console.log(file);
      console.log("部署脚本信息内容2**********");
      this.sizeForm.deployShellName = file.name;
      this.sizeForm.fileList2 = [];
      this.sizeForm.fileList2.push(file);
    },
    // 没有用的
    isJSON(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    },
    submitUpload1() {
      this.$refs.upload1.submit();
    },
    submitUpload2() {
      this.$refs.upload2.submit();
    },

    sendMesssage() {
      this.$client2.ws.send(this.textarea2);
      this.textarea2 = null;
    },
    clearMessage() {
      this.textarea2 = null;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 获取图片base64格式
    getBase64(file, callback) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(file);
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.devContain {
  width: 100%;
  height: 100%;
  background-color: rgb(241, 241, 241);
  position: relative;

  .containForm {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: calc(100% - 80px);
    background-color: rgb(255, 255, 255);
    padding: 40px;
  }
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  background-color: #7f7f7f;
  background-image: -webkit-linear-gradient(
    45deg,
    #7f7f7f,
    #7f7f7f,
    #7f7f7f,
    #7f7f7f 50%,
    #7f7f7f 75%,
    #7f7f7f 75%,
    #7f7f7f
  );
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
  background: #0c213500;
  position: absolute;
}
</style>