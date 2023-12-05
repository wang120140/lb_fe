<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/dataAssemble' }">数据集</el-breadcrumb-item>
      <el-breadcrumb-item>创建数据集</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="baseInfo">
      <div class="title">基本信息</div>
      <el-form
        ref="form"
        :model="formData"
        label-position="left"
        label-width="270px"
      >
        <el-form-item label="数据集名称" required>
          <el-input size="mini" v-model="formData.name" clearable style="width:400px"></el-input></el-input>
          <div class="nameRule">
          请输入不超过20个字符,仅支持中英文、数字、下划线“_”、短横“-”，只能以中英文、数字开头</div>
        </el-form-item>
        <el-form-item label="数据类型" required>
          <el-radio-group @change="formData.model = ''" v-model="formData.type" size="small">
            <el-radio-button  label="多模态"></el-radio-button>
            <el-radio-button  label="图像"></el-radio-button>
            <el-radio-button  label="文本"></el-radio-button>
            <el-radio-button  label="语音"></el-radio-button>
            <el-radio-button  label="其他"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标注模式" size="small" required v-if="formData.type != '其他'">
          <el-select v-model="formData.model" placeholder="请选择">
            <el-option v-if="formData.type == '多模态'" label="图文问答" value="1"></el-option>
            <el-option v-if="formData.type == '多模态'" label="图文问答_多轮" value="2"></el-option>
            <el-option v-if="formData.type == '图像'" label="目标检测_多边形" value="3"></el-option>
            <el-option v-if="formData.type == '图像'" label="富文档信息抽取" value="4"></el-option>
            <el-option v-if="formData.type == '文本'" label="实体关系抽取" value="5"></el-option>
            <el-option v-if="formData.type == '文本'" label="文本问答" value="6"></el-option>
          </el-select>
          <el-select style="margin-left:10px" v-model="formData.subModel" placeholder="请输入">
            <el-option  label="平台默认格式" value="1"></el-option>
          </el-select>
          <span class="explain">下载示例</span>
        </el-form-item>
      </el-form>
    </div>

    <div class="dataSource">
      <div class="title">数据来源</div>
      <el-form
        ref="form"
        :model="formData"
        label-position="left"
        label-width="270px"
      >
        <el-form-item label="标注状态" required>
          <el-radio-group  v-model="formData2.status" size="small">
            <el-radio-button  label="已标注" ></el-radio-button>
            <el-radio-button  label="未标注" ></el-radio-button>
          </el-radio-group>
          <div class="nameRule">
          大文件上传可能受到网络波动影响，建议文件大小2GB以内，超大文件请采用其他方式上传（即将上线）</div>
        </el-form-item>
        <el-form-item label="选择导入方式" size="small" required >
          <el-button type="primary" >本地上传</el-button>
        </el-form-item>
        <el-form-item label="本地上传" size="small" required>
          <el-input size="mini" v-model="formData2.name" clearable style="width:220px" disabled></el-input>
          <el-select v-model="formData2.isZip" style="margin-left:10px">
            <el-option
              label="上传压缩包"
              value="1"
            ></el-option>
            <el-option
              label="上传文件"
              value="2"
            >
            </el-option>
          </el-select>
          <el-button style="margin-left:10px" icon="el-icon-upload2">
            上传
          </el-button>
          <div class="nameRule">
            {{`上传文件类型：${formData2.isZip == '1'?'.zip':'.jpg,.jpeg,.png,.bmp'}`}}
          </div>
          <div class="nameRule">
            上传要求
            <el-tooltip class="item" style="width:400px" effect="dark" placement="bottom-end">
              <div slot="content" >
                · 文件名命名规范：不能有中文、+、空格、制表符<br>
                · 请保证数据质量：不能有损坏的图片、文本、zip包等文件<br>
                · 压缩包文件格式：上传压缩包仅支持zip包，暂不支持tar、tar.gz、7z等
              </div>
              <i class="el-icon-question"></i>
            </el-tooltip>
          </div>
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
        type: "",
        model: "",
        subModel: "1",
      },
      formData2: {
        status:"已标注",
        name:'',
        isZip:'1'
      }
    };
  },
  methods: {
    callback(){
      this.$router.push({
        name:"dataAssemble"
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.baseInfo,.dataSource {
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

  ::v-deep(.el-radio-button__orig-radio:checked+.el-radio-button__inner){
    background-color: #1946B9;
    border-color: #1946B9;
    box-shadow: -1px 0 0 0 #1946B9;
    &:hover{
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
  border-top:1px solid #f0f0f0;
    text-align: center;
    line-height: 53px;
}
</style>