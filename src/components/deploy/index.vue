<template>
  <div class="deployContain" id="deployContain">
    <div v-show="!dialogFormVisible">
      <div class="topContain1">
        <div></div>
        <div class="stepContain">
          <a-steps
            :current="current"
            :initial="0"
            :status="statusProcress"
            :key="stepKey"
          >
            <a-step
              title="创建任务"
              description="创建微调任务，并选择指令数据集"
            >
              <a-icon
                v-if="allIcon[0].status == 'process'"
                slot="icon"
                type="loading"
              />
              <a-icon
                v-if="allIcon[0].status == 'finish'"
                slot="icon"
                type="check-circle"
                theme="twoTone"
                two-tone-color="#1946b9"
              />
              <a-icon
                v-if="allIcon[0].status == 'error'"
                slot="icon"
                type="close-circle"
                theme="twoTone"
                two-tone-color="#f10404"
              />
            </a-step>
            <a-step title="指令集准备" description="上传指令集或在线编写指令">
              <a-icon
                v-if="allIcon[1].status == 'process'"
                slot="icon"
                type="loading"
              />
              <a-icon
                v-if="allIcon[1].status == 'finish'"
                slot="icon"
                type="check-circle"
                theme="twoTone"
                two-tone-color="#1946b9"
              />
              <a-icon
                v-if="allIcon[1].status == 'error'"
                slot="icon"
                type="close-circle"
                theme="twoTone"
                two-tone-color="#f10404"
              />
            </a-step>
            <a-step
              title="大模型微调"
              description="基于已准备指令集对大模型微调"
            >
              <a-icon
                v-if="allIcon[2].status == 'process'"
                slot="icon"
                type="loading"
              />
              <a-icon
                v-if="allIcon[2].status == 'finish'"
                slot="icon"
                type="check-circle"
                theme="twoTone"
                two-tone-color="#1946b9"
              />
              <a-icon
                v-if="allIcon[2].status == 'error'"
                slot="icon"
                type="close-circle"
                theme="twoTone"
                two-tone-color="#f10404"
              />
            </a-step>
            <a-step title="部署上线" description="将微调后的模型部署为服务">
              <a-icon
                v-if="allIcon[3].status == 'process'"
                slot="icon"
                type="loading"
              />
              <a-icon
                v-if="allIcon[3].status == 'finish'"
                slot="icon"
                type="check-circle"
                theme="twoTone"
                two-tone-color="#1946b9"
              />
              <a-icon
                v-if="allIcon[3].status == 'error'"
                slot="icon"
                type="close-circle"
                theme="twoTone"
                two-tone-color="#f10404"
              />
            </a-step>
          </a-steps>
        </div>
        <div class="btnContian">
          <div class="btn" @click="addTask">新建任务</div>
          <div class="btn btnNone">立即部署</div>
          <div class="btn btnNone">立即部署</div>
          <div class="btn" @click="buShuEvent">立即部署</div>
        </div>
      </div>
      <div class="bodyContian1">
        <div class="ImgContain">
          <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="日志" name="first"></el-tab-pane>

                </el-tabs> -->

          <div class="top01">
            <div class="top01_1">日志</div>
            <div class="btnDown" @click="downLog">下载日志</div>
          </div>

          <div
            class="logContain1"
            v-html="TEXT1"
            id="logContain1"
            ref="logContain1"
          ></div>
        </div>
      </div>
    </div>
    <!-- <el-dialog title="上传数据集" :visible.sync="dialogFormVisible">
            <uploadPage style="margin-left: 40px ;"></uploadPage>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog> -->
    <div class="addForm" v-if="dialogFormVisible">
      <div class="baseInfo">
        <el-form
          ref="form"
          :model="formData"
          label-position="left"
          label-width="270px"
        >
          <el-form-item label="文件" required>
            <uploadPage ref="uploadRef"></uploadPage>
          </el-form-item>
          <el-form-item label="训练类型" required>
            <el-select
              style="width: 500px"
              v-model="formData.train_type"
              placeholder=""
            >
              <el-option label="sft" value="sft"> </el-option>
              <el-option label="pt" value="pt"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所选机器IP" required>
            <el-select
              style="width: 500px"
              v-model="formData.ip_list"
              multiple
              placeholder=""
              filterable
              allow-create
            >
              <el-option label="172.18.110.5" value="172.18.110.5"> </el-option>
              <el-option label="172.18.110.6" value="172.18.110.6"> </el-option>
              <el-option label="172.18.110.7" value="172.18.110.7"> </el-option>
              <el-option label="172.18.110.8" value="172.18.110.8"> </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="训练数据的路径" required>
            <el-input
              style="width: 500px"
              v-model="formData.data_file"
            ></el-input> -->
          <!-- </el-form-item> -->
          <el-form-item label="训练并合并后的模型保存路径" required>
            <el-input
              style="width: 500px"
              v-model="formData.model_file_path"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="训练中的log路径" required>
            <el-input
              style="width: 500px"
              v-model="formData.log_file_path"
            ></el-input>
          </el-form-item> -->

          <el-form-item>
            <el-button size="small" @click="dialogFormVisible = false"
              >取 消</el-button
            >
            <el-button size="small" type="primary" @click="submit"
              >确 定</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-dialog title="" :visible.sync="deployForm" width="800px">
      <div>
        <el-form
          ref="form"
          :model="deployFormData"
          label-position="left"
          label-width="270px"
        >
          <el-form-item label="所选机器IP" required>
            <el-select
              style="width: 100%"
              v-model="deployFormData.ip_list"
              multiple
              placeholder=""
              filterable
              allow-create
            >
              <el-option label="172.18.110.5" value="172.18.110.5"> </el-option>
              <el-option label="172.18.110.6" value="172.18.110.6"> </el-option>
              <el-option label="172.18.110.7" value="172.18.110.7"> </el-option>
              <el-option label="172.18.110.8" value="172.18.110.8"> </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="训练并合并后的模型保存路径" required>
            <el-input
              style="width: 100%"
              v-model="deployFormData.model_file_path"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="deployForm = false">取 消</el-button>
        <el-button type="primary" @click="deploySubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import uploadPage from "../upload/index.vue";
import { shellDown_fromServer } from "@/network/api.js";
export default {
  name: "deploy",
  data() {
    return {
      statusProcress: "wait", // wait / process / finish / error / success
      stateAll: {
        0: "process",
        1: "finish",
        2: "error",
      },
      current: 0,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      activeNum: 1,
      activeName: "first",
      TEXT1: "",
      allIcon: [
        {
          status: "wait", // process / finish / error
        },
        {
          status: "wait", // process / finish / error
        },
        {
          status: "wait", // process / finish / error
        },
        {
          status: "wait", // process / finish / error
        },
        {
          status: "",
        },
      ],
      md5Value: "",
      isBuShu: false,
      stepKey: 0,
      oneSend: true,
      formData: {
        train_type: "sft",
        ip_list: ["172.18.110.5", "172.18.110.6"],
        // data_file: "/data/zm/data/data_high_quality_12w_p2.jsonl",
        model_file_path: "/data/spb/mindformers/research/taichu_merge",
        // log_file_path: "/data/spb/mindformers/research/output/log",
      },
      deployForm: false,
      deployFormData: {
        ip_list: ["172.18.110.5", "172.18.110.6"],
        model_file_path: "/data/spb/mindformers/research/taichu_merge",
      },
    };
  },
  props: {},
  watch: {
    dialogFormVisible: {
      handler: function (newValue, oldValue) {
        if (!newValue) {
          if (this.current < 2 && this.statusProcress != "error") {
            this.current = 0;
            this.allIcon = this.allIcon.map((item) => {
              item.status = "wait";
              return item;
            });
            this.allIcon[0].status = "wait";
          }
        }
      },
    },
    current: {
      handler: function (newValue) {
        let _this = this;
        if (newValue == 2) {
          let _pram = {
            process: 3,
            fileMd5: _this.md5Value,
            conf: JSON.stringify(this.formData),
          };
          console.log("向后台发送参数", _pram);
          _this.$client.ws.send(JSON.stringify(_pram));
        }
        if (newValue == 3) {
          let _pram = {
            process: 4,
            fileMd5: _this.md5Value,
            conf: JSON.stringify(this.formData),
          };

          // _this.isBuShu && _this.$client.ws.send(JSON.stringify(_pram))
        }
      },
    },
    TEXT1: {
      handler() {
        let conDom = this.$refs.logContain1;
        conDom.scrollTo(0, conDom.scrollHeight + 100);
      },
    },
  },
  components: {
    uploadPage,
  },
  created() {},
  mounted() {
    let _this = this;
    this.$eventBus.$on("changeCurrentPage_wyh", (pram) => {
      _this.current = pram.current;
      _this.statusProcress = pram.statusProcress;
      _this.md5Value = pram.md5Value;
      _this.allIcon = this.allIcon.map((item, index) => {
        if (index < pram.current) {
          item.status = "finish";
        } else if (index == pram.current) {
          item.status = "process";
        } else {
          item.status = "wait";
        }
        return item;
      });
      _this.dialogFormVisible = false;
    });
    _this.$client.ws.addEventListener("message", (msg) => {
      // if (_this.current < 2) return
      console.log(msg);
      console.log("后台传的信息");
      if (_this.isJSON(msg.data)) {
        console.log("自检数据信息");

        let _a = JSON.parse(msg.data);
        console.log(_a);
        if (_a.hasOwnProperty("code")) {
          switch (_a.code) {
            case 0: // 经行中
              // _this.$set(_this.allIcon, _this.current, { state: 'process' })
              break;
            case 1: // 成功
              if (_a.process == 3 || _a.process == 4) {
                debugger;
                _this.current = _a.process;
                _this.$nextTick(() => {
                  _this.allIcon[_this.current - 1].status = "finish";
                  _this.allIcon[_this.current] &&
                    (_this.allIcon[_this.current].status = "wait");
                  _this.stepKey++;
                  if (_a.process == 4) _this.statusProcress = "success";
                  if (_a.process == 3) _this.statusProcress = "wait";
                });
              }

              break;
            case 2: // 失败
              //_this.statusProcress = ''
              if (_a.process == 3 || _a.process == 4) {
                _this.allIcon[_this.current].status = "error";
                _this.stepKey++;
              }

              break;
          }
        }
      } else {
        // _this.text1 = `${_this.text1}+${_this.text1}`
        _this.TEXT1 = _this.TEXT1 + msg.data + "<br>";
      }
    });

    _this.$eventBus.$on("openWs", (pram) => {
      if (pram.isOpen && _this.oneSend) {
        let _pram = {
          process: 2,
          conf: JSON.stringify(this.formData),
        };
        _this.oneSend = false;
        console.log("向后台发送参数", _pram);
        _this.$client.ws.send(JSON.stringify(_pram));
      }
    });
    setTimeout(() => {
    
    }, 5000);
    if (_this.oneSend && _this.$client.status == 'conn') {
      let _pram = {
        process: 2,
        conf: JSON.stringify(this.formData),
      };
      _this.oneSend = false;
      console.log("向后台发送参数", _pram);
      _this.$client.ws.send(JSON.stringify(_pram));
    }
  },

  methods: {
    isJSON(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    },
    downLog() {
      shellDown_fromServer().then((res) => {
        console.log(res);
        const blob = new Blob([res], {
          type: "application/json, text/plain,",
        });
        const a = document.createElement("a");
        const URL = window.URL || window.webkitURL;
        const herf = URL.createObjectURL(blob);
        a.href = herf;
        a.download = "日志.text";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(herf);
      });
    },
    addTask() {
      this.statusProcress = "process";
      this.dialogFormVisible = true;
      this.current = 1;
      this.allIcon[0].status = "finish";
      this.allIcon[1].status = "process";
    },
    buShuEvent() {
      if (this.current < 2) {
        this.$notify({
          title: "提示",
          message: "请按照顺序操作",
          type: "error",
        });
      } else {
        this.deployForm = true;
      }
    },
    handleClick() {
      console.log("点击事件.......");
    },
    // 读取文件
    fileUpload_onselect(pram) {
      let _this = this;
      let url;
      // if (pram) {
      //     url = pram.objectPath
      // } else {
      //     url = this.list_data[this.list_index].objectPath
      // }

      url = _this.activeData_single.Output.url[0];

      if (!url) return; // 加验证信息
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.send();
      xhr.onloadend = function () {
        if (xhr.status == 200) {
          console.log(xhr.response);
          if (xhr.response && xhr.response != "") {
            _this.activeData_single.Output.outputValue = xhr.response
              ? xhr.response
              : "";
          } else {
            try {
              _this.$Notice.warning({
                title: "文件提示",
                desc: "这个文件是空文件没有具体信息",
              });
            } catch (error) {}
          }
          _this.activeData_all = [];
          _this.activeData_all.push(
            JSON.parse(JSON.stringify(_this.activeData_single))
          );
        } else {
          console.log("========文件加载失败============");
        }
      };
    },
    //提交表单
    submit() {
      if (this.$refs.uploadRef.fileProgress == 100) {
        this.$eventBus.$emit(
          "submitCreateServer",
          JSON.stringify(this.formData)
        );
        this.dialogFormVisible = false;
      } else {
        this.$message.error("文件未上传完成或未上传文件");
      }
    },
    deploySubmit() {
      this.deployForm = false;
      let conf = JSON.stringify(this.deployFormData);
      this.current = 3;
      this.statusProcress = "process";
      this.allIcon[3].status = "process";
      let _pram = {
        process: 4,
        fileMd5: this.md5Value,
        conf,
      };
      console.log("向后台发送参数", _pram);
      this.$client.ws.send(JSON.stringify(_pram));
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.deployContain {
  width: 100%;
  height: 100%;
  background-color: rgb(241, 241, 241);
  position: absolute;
  overflow-y: auto;

  .addForm {
    width: 90%;
    margin-left: 5%;
    .baseInfo {
      width: 100%;
      background-color: #fff;
      margin-top: 50px;
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
  }
}

.topContain1 {
  height: 150px;
  width: 100%;
  position: relative;
  // background-color: #d3d4d5;

  .stepContain {
    position: absolute;
    width: 80%;
    height: 100px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .btnContian {
    position: absolute;
    width: 80%;
    height: 100px;
    top: calc(50% + 90px);
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    .btnNone {
      opacity: 0;
      display: none;
    }
    .btn {
      width: 100px;
      height: 40px;
      border: 1px solid #000;
      text-align: center;
      line-height: 40px;
      border-radius: 6px;
      cursor: pointer;
      color: #fff;
      background-color: #3c68c7;

      &:hover {
        color: rgb(9, 224, 224);
      }
    }
  }
}

.bodyContian1 {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 90%;
  height: calc(100% - 210px);
  overflow: hidden;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
}

.ImgContain {
  // width: 100%;
  // height: 90%;
  // background-image: url("../../assets/4.png");
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
  position: relative;
  height: 100%;

  .top01 {
    position: relative;
    border-bottom: 1px solid rgb(5, 5, 5);
    height: 50px;
  }

  .btnDown {
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
    height: 40px;
    border: 1px solid #000;
    text-align: center;
    line-height: 40px;
    border-radius: 6px;
    cursor: pointer;
    z-index: 10000;
    color: #fff;
    background-color: #3c68c7;

    &:hover {
      color: rgb(9, 224, 224);
    }
  }
}

::v-deep(.el-tabs__item) {
  font-size: 18px;
}

.logContain1 {
  width: 90%;
  height: calc(100% - 50px);
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 10px;
  line-height: 36px;
  font-size: 20px;
  background: #ffffff;
  color: rgb(0, 0, 0);
  overflow: auto;
  border-radius: 6px;
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

// ::v-deep(.is-wait){
//     color: rgb(13, 14, 14) !important;
// }
// ::v-deep(.is-process){
//     color: #f10404 !important;
// }

// 等待中.....
::v-deep(
    .ant-steps-item-wait
      > .ant-steps-item-container
      > .ant-steps-item-content
      > .ant-steps-item-title::after
  ) {
  background-color: #d1cbcb;
}

::v-deep(
    .ant-steps-item-wait
      > .ant-steps-item-container
      > .ant-steps-item-content
      > .ant-steps-item-description
  ),
::v-deep(
    .ant-steps-item-wait
      > .ant-steps-item-container
      > .ant-steps-item-content
      > .ant-steps-item-title
  ) {
  color: #161515;
}

:v-deep(.ant-steps-item-wait .ant-steps-item-icon) {
  border-color: rgba(0, 0, 0, 0.25);
}

// 进行中....
::v-deep(
    .ant-steps-item-process
      > .ant-steps-item-container
      > .ant-steps-item-content
      > .ant-steps-item-title::after
  ) {
  background-color: #161515;
}

::v-deep(
    .ant-steps-item-process
      > .ant-steps-item-container
      > .ant-steps-item-content
      > .ant-steps-item-description
  )
  ::v-deep(
    .ant-steps-item-process
      > .ant-steps-item-container
      > .ant-steps-item-content
      > .ant-steps-item-title
  ) {
  color: #161515;
}

// 已完成 ....
::v-deep(
    .ant-steps-item-finish
      > .ant-steps-item-container
      > .ant-steps-item-content
      > .ant-steps-item-title::after
  ) {
  background-color: #1946b9;
}

::v-deep(
    .ant-steps-item-finish
      > .ant-steps-item-container
      > .ant-steps-item-content
      > .ant-steps-item-description
  ),
::v-deep(
    .ant-steps-item-finish
      > .ant-steps-item-container
      > .ant-steps-item-content
      > .ant-steps-item-title
  ) {
  color: #1946b9;
}

::v-deep(.ant-steps-icon) {
  color: rgba(0, 0, 0) !important;
}

::v-deep(
    .ant-steps-horizontal:not(.ant-steps-label-vertical)
      .ant-steps-item-description
  ) {
  max-width: 220px;
  white-space: normal;
}

::v-deep(.ant-steps-item-icon, .ant-steps-item-content:hover) {
  color: #1946b9 !important;
}

#deployContain ::v-deep(.ant-steps-item-process .ant-steps-item-icon) {
  background: #ffffff;
  border-color: #949799;
}

#deployContain
  ::v-deep(
    .ant-steps-item-custom.ant-steps-item-process
      .ant-steps-item-icon
      > .ant-steps-icon
  ) {
  color: rgba(185, 186, 187, 0.932);
  opacity: 1;
  height: -1px;
  display: inline-block;
}
</style>
