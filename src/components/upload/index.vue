<template>
    <div class="uploadContain">

        <input ref="inputRef" class="inputFile" type="file" @change="changeFile" />

        <!-- <div >大文件 <span class="bigFileC">📁</span> 分了{{ chunksCount }}片:</div>
     
        <div class="pieceItem" v-for="index in chunksCount" :key="index">
            <span class="a">{{ index - 1 }}</span>
            <span class="b">📄</span>
        </div> -->

        <!-- <div class="font1">计算此大文件的hash值进度</div> -->
        <div class="r" style="margin: 10px 0;">切片进度为: {{ fileHash }}</div>
        <progress max="100" :value="hashProgress"></progress> {{ hashProgress }}%
        
        <div style="width:500px;" v-show="fileProgress !== 0">
            <div v-show="fileProgress !== 100">上传文件的进度</div>
            <div class="r" v-show="fileProgress == 100">上传成功</div>
            <progress max="100" :value="fileProgress"></progress> {{ fileProgress }}%
        </div>

    </div>

</template>

<script>
import {
  sliceFn,
  checkFileFn,
  sliceFileUploadFn,
  tellBackendMergeFn,
} from "./utils/index.js";

import {
  checkFileFn_fromServer, //发请求，校验文件是否上传过，分三种情况：见：fileStatus
  sliceFileUploadFn_fromServer, //分片上传请求接口
  tellBackendMergeFn_fromServer, //告知后端要去合并前端上传的文件了
} from "@/network/api.js";
// 定义文件上传状态码
const fileStatus = {
  0: "文件不存在（没有上传过）",
  1: "文件已存在（曾经上传过）",
  2: "文件不完整（曾经上传中断过，可继续上传）",
};
export default {
  data() {
    return {
      CHUNK_SIZE: 5 * 1024 * 1024, // 文件分片大小
      hashProgress: 0, // 计算hash值进度
      chunksCount: 0, // 一共分了多少片
      fileHash: "", // 大文件的hash值
      doneFileList: [], // 部分已完成的
      fileProgress: 0, // 上传文件的进度
      worker: null,
      fileName:""
    };
  },
  props: {},
  watch: {},
  components: {},
  created() {
    this.$eventBus.$on('submitCreateServer',config => {
        this.Merge(config);
    })
  },
  mounted() {},

  methods: {
    calFileMd5ByThreadFn(chunks) {
      return new Promise((resolve) => {
        this.worker = new Worker("./work2.js");
        this.worker.postMessage({ chunks });
        this.worker.onmessage = (e) => {
          const { hash, hashProgress } = e.data;
          this.hashProgress = hashProgress;
          if (hash) {
            this.worker.terminate();
            resolve(hash);
          }
        };
      });
    },
    async changeFile(e) {
      let file = this.$refs.inputRef.files[0];
      const chunks = sliceFn(file, this.CHUNK_SIZE);
      this.chunksCount = chunks.length;
      const fileMd5 = await this.calFileMd5ByThreadFn(chunks);
      console.log("计算出的hash值为:", fileMd5);
      this.fileHash = fileMd5;
      this.uploadFileCheck(fileMd5, chunks, file.name);
    },
    /**
     * 第二步，上传文件前的检查
     * */
    async uploadFileCheck(fileMd5, chunks, fileName) {
      const res = await checkFileFn_fromServer(fileMd5);
      // 等于1曾经上传过，不需要再上传了
      // if (res.resultCode == 1) {
      //     this.$notify({
      //         type: "warning",
      //         message: "该文件已经上传过",
      //     });
      //     return;
      // }
      // 等于2表示曾经上传过一部分，现在要继续上传
      if (res.resultCode == 2) {
        this.doneFileList = res.resultData.map((item) => {
          return item * 1;
        });
        console.log(fileStatus[res.resultCode]);
      }
      // 等于0表示没有上传过，直接上传
      if (res.resultCode == 0) {
        console.log(fileStatus[res.resultCode]);
      }

      let formDataList = [];

      // 说明没有上传过，组装一下，直接使用
      if (this.doneFileList.length == 0) {
        formDataList = chunks.map((item, index) => {
          let formData = new FormData();
          formData.append("file", item);
          formData.append("chunks", chunks.length);
          formData.append("chunk", index);
          formData.append("name", fileName);
          formData.append("md5", fileMd5);
          return { formData };
        });
      }
      // 说明曾经上传过，需要过滤一下，曾经上传过的就不用再上传了
      else {
        formDataList = chunks
          .filter((index) => {
            return !this.doneFileList.includes(index);
          })
          .map((item, index) => {
            let formData = new FormData();
            formData.append("file", item);
            formData.append("chunks", chunks.length);
            formData.append("chunk", index);
            formData.append("name", fileName);
            formData.append("md5", fileMd5);
            return { formData };
          });
      }
      this.fileUpload(formDataList, fileName);
    },
    /**
     * 第三步，上传文件
     * */
    async fileUpload(formDataList, fileName) {
      let _this = this;
      // console.log(formDataList)
      formDataList.map(async ({ formData }, index) => {
        // debugger
        const res = await sliceFileUploadFn_fromServer(formData);
        this.fileProgress = Math.ceil(
          (res.resultData / this.chunksCount) * 100
        );
        return res;
      });
      _this.fileName = fileName

      // 注意超出10G以上 这里需要优化  需要另外思路去解决
    },

    //
    async Merge(conf) {
        console.log(conf);
        var _this = this;
        this.fileProgress = 100;
        const res = await tellBackendMergeFn_fromServer(
          this.fileName,
          this.fileHash,
          conf
        );
        if (res.resultCode === 0) {
          console.log("文件并合成功");
          _this.$notify({
            title: "成功",
            message: "文件合并成功，并上传完服务器",
            type: "success",
          });
          _this.$eventBus.$emit("changeCurrentPage_wyh", {
            current: 2,
            statusProcress: "process",
            md5Value: _this.fileHash,
          });
        } else {
          setTimeout(() => {
            _this.$eventBus.$emit("changeCurrentPage_wyh", {
              current: 1,
              statusProcress: "error",
            });
          }, 20);
        }
    },
  },
  beforeDestroy() {
    this.worker && this.worker.terminate();
  },
};
</script>

<style lang="scss" scoped>
.bigFileC {
  font-size: 48px;
}

.pieceItem {
  width: 36px;
  height: 36px;
  display: inline-block;
  position: relative;
}

.a,
.b {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.a {
  z-index: 6;
  font-weight: bold;
  font-size: 13px;
}

.b {
  z-index: 5;
  font-size: 32px;
}

progress {
  width: 60%;
}

.r {
  font-weight: 700;
}

.uploadContain {
  width: 100%;
  height: 100%;
  // border: 1px solid red;

  // background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
  div {
    margin-bottom: 16px;
  }

  .inputFile {
    // height: 50px;
    // font-size: 18px;
  }

  input[type="file" i]::-webkit-file-upload-button {
    border: 1px solid rgb(14, 13, 13);
    border-radius: 4px;
    width: 120px;
    height: 50px;
    line-height: 50px;
  }

  .font1 {
  }
}
</style>
