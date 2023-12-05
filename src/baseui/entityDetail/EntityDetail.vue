<template>
  <div class="entityDetail">
    <div class="title">
      <el-select v-model="entityId" class="select">
        <el-option
          v-for="item in entityList"
          :key="item.entityId"
          :label="item.entityName"
          :value="item.entityId"
        >
        </el-option>
      </el-select>
      <div class="close" @click="cloase">
        <i class="el-icon-close"></i>
      </div>
    </div>
    <div class="detailBody">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1" title="目标属性">
          <div class="entityAttribute">
            <el-descriptions :column="1">
              <template v-for="item in entityDetail?.entity?.entityInfo?.data">
                <el-descriptions-item v-if="Object.keys(item)[0] !== 'position'" :label="Object.keys(item)[0]">{{
                  Object.values(item)[0]
                }}</el-descriptions-item>
                <el-descriptions-item v-else label="地理位置">
                  {{entityDetail.position.desc}}
                </el-descriptions-item>
              </template>
            </el-descriptions>

            <div class="subTitle" v-show="entityDetail?.entity?.entityInfo?.images?.length !=0 ">图片</div>
            <div class="imgBox" v-show="entityDetail?.entity?.entityInfo?.images?.length !=0 ">
              <template v-for="item in entityDetail?.entity?.entityInfo?.images">
                <el-image
                  style="width: 85px; height: 85px;margin-right:3px"
                  :src="item"
                  fit="['fill', 'contain', 'cover', 'none', 'scale-down']">
              </el-image>
              </template>
            </div>
            <div class="subTitle" v-show="entityDetail?.entity?.entityInfo?.videos?.length !=0 ">视频</div>
            <div class="videoBox" v-if="entityDetail?.entity?.entityInfo?.videos?.length !=0 ">
              <template v-for="item in entityDetail?.entity?.entityInfo?.videos">
                <video width="260" controls  :poster="entityDetail?.entity?.entityInfo?.images[0]">
                  <source :src="item" ></source>
                </video>
              </template>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2" title="目标判读">
          <div class="entityAttribute">
            <el-descriptions :column="1">
              <el-descriptions-item label="异常描述">{{
                entityDetail?.exceptionInfo
              }}</el-descriptions-item>
              <el-descriptions-item label="行为意图">{{
                entityDetail?.behaviorIntention
              }}</el-descriptions-item>
              <el-descriptions-item label="应对建议">{{
                entityDetail?.proposal
              }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3" title="操作">
          <div class="entityAttribute">
            <el-descriptions :column="1">
              <el-descriptions-item label="历史轨迹可视化"><el-switch @change="changeHistoryLine" style="transform: scale(0.9);" v-model="showHistory"></el-switch></el-descriptions-item>
            </el-descriptions>
            <el-descriptions :column="1">
              <el-descriptions-item label="目标判读可视化"><el-switch @change="changeOverlay" style="transform: scale(0.9);" v-model="showOverlay"></el-switch></el-descriptions-item>
            </el-descriptions>
            <el-descriptions :column="1">
              <el-descriptions-item label="轨迹预测可视化"><el-switch @change="changePrediction" style="transform: scale(0.9);" v-model="showPrediction"></el-switch></el-descriptions-item>
            </el-descriptions>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { findEntity, getCode } from "@/network/api.js";
export default {
  props: {
    mainTargetData: {
      type: Array,
    },
    entityList: {
      type: Array,
    },
  },
  data() {
    return {
      entityId: "",
      activeNames: ["1", "2","3"],
      entityDetail: {},
      codeToType: [],
      showHistory:true,
      showOverlay:true,
      showPrediction:true
    };
  },
  mounted() {
    console.log(this.mainTargetData);
    this.$eventBus.$on("changeEntityId", (entityId) => {
      if(entityId == ''){
        this.$eventBus.$emit('closeDetail')
        return
      }
      this.entityId = entityId
      this.entityDetail = this.mainTargetData.find((item) => {
        return item.entityId == entityId;
      });
    });
    this.$eventBus.$on("closeInfo", () => {
      this.showEntityDetail = false;
    });
    getCode("01").then((res) => {
      console.log(res.data);
      this.codeToType = res.data.map((item) => {
        let res = {};
        res.code = item.code;
        res.descript = item.descript;
        return res;
      });
      getCode("02").then((res) => {
        let temp = [];
        temp = res.data.map((item) => {
          let res = {};
          res.code = item.code;
          res.descript = item.descript;
          return res;
        });
        this.codeToType.push(...temp);
      });
    });
    
    this.$eventBus.$on('delModelId',delId => {
      if(this.entityId == delId){
        this.$eventBus.$emit('closeDetail')
      }
    })
  },
  methods: {
    cloase() {
      console.log('点击');
      this.$eventBus.$emit('closeDetail')
    },
    changeHistoryLine(status){
      if(!status){
        //关闭当前实体线
        this.$eventBus.$emit('closeEntityLine',this.entityId)
      }else {
        //显示
        this.$eventBus.$emit('showEntityLine',this.entityId)
      }
    },
    changeOverlay(status){
      if(!status){
        //关闭当前实体线
        this.$eventBus.$emit('cancelOverlay',this.entityId)
      }else {
        //显示
        this.$eventBus.$emit('showOverlay',this.entityId)
      }
    },
    changePrediction(status){
      if(!status){
        //关闭当前显示预测
        this.$eventBus.$emit('cancelPrediction',this.entityId)
      }else{
        //显示
        this.$eventBus.$emit('showPrediction',this.entityId)
      }
    }
    
  },
  watch:{
    entityId:{
      handler:function(newValue,oldValue){
        this.showHistory = true
        this.showOverlay = true
        this.showPrediction = true
        this.$eventBus.$emit('changeEntityId',newValue);
        this.$eventBus.$emit('changeFocusingPos',{
          position:[this.entityDetail.position.longitude,this.entityDetail.position.latitude],
          entityId:newValue
        })
      }
    },
    
  },
  beforeDestroy(){
  }
};
</script>

<style lang="scss" scoped>
.entityDetail {
  position: relative;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #272b32;
  padding: 20px;
  padding-top: 0;
  .title {
    width: 100%;
    height: 50px;
    position: relative;
    border-bottom: #35393f 1px solid;
    margin-bottom: 10px;
    ::v-deep(.el-input__inner) {
      border: 0 !important;
      border-radius: 0;
      color: #3c8bf4;
      font-size: 16px;
      background-color: transparent;
    }
    ::v-deep(.el-select .el-input .el-select__caret) {
      color: #3c8bf4;
    }
    .select {
      position: absolute;
      width: 220px;
      height: 40px;
      margin-top: 10px;
    }
    .close {
      cursor: pointer;
      position: absolute;
      width: 14px;
      height: 14px;
      right: 0px;
      top: 21px;
      font-weight: 700;
      text-align: right;
      line-height: 14px;
      color: #a5a5a5;
      font-size: 16px;
      // background-color: #fff;
    }
  }
  .detailBody {
    width: 100%;
    position: relative;
    // bottom: 10px;
    height: calc(100% - 50px);
    overflow-y: auto;
    // background-color: #fff;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 5px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      background-color: #35393f;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
      background: #0c213500;
    }

    ::v-deep(.el-collapse-item__header) {
      border: 0;
      text-indent: 2em;
      font-size: 16px;
      height: 32px;
      background-color: rgba($color: #fff, $alpha: 0.04);
      color: rgba(255, 255, 255, 0.85);
    }

    ::v-deep(.el-collapse-item__arrow) {
      position: absolute;
      transition: transform 0.3s;
      font-weight: 300;
      left: 10px;
      text-indent: 0;
      font-size: 16px;
    }

    ::v-deep(.el-collapse-item__wrap) {
      border: 0;
      background-color: transparent;
    }

    ::v-deep(.el-collapse-item__content) {
      padding-bottom: 0;
    }

    ::v-deep(.el-collapse) {
      border: 0;
    }
    .entityAttribute {
      width: 100%;
      padding: 10px 5px 0 5px;
      border-bottom: 1px solid #35393f;

      ::v-deep(.el-descriptions-item__label) {
        min-width: 70px;
        font-size: 16px;
      }
      ::v-deep(.el-descriptions-item__content){
        font-size: 16px;
      }
      // background-color: #000;

      ::v-deep(.el-descriptions__body) {
        background-color: transparent;
        color: rgba(255, 255, 255, 0.85);
      }
      ::v-deep(.el-descriptions-item__label.has-colon::after){
        content: '';
      }
    }
    .subTitle {
      height: 30px;
      line-height: 40px;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.85);
    }
    .imgBox {
      width: 100%;
      position: relative;
      border-bottom: 1px solid #35393f;
      padding-top: 10px;
      .img1 {
        margin-right: 10px;
        display: inline-block;
        width: 80px;
        height: 80px;
        background: url("~@/assets/image/运输机2.png");
        background-size: cover;
        background-position: -20px 0;
      }

      .img3 {
        margin-right: 10px;
        display: inline-block;
        width: 80px;
        height: 80px;
        background: url("~@/assets/image/img3.png");
        background-size: cover;
        background-position: -20px 0;
      }

      .img2 {
        position: absolute;
        width: 180px;
        height: 140px;
        top: 10px;
        right: 0px;
        background: url("~@/assets/image/运输机1.png");
        background-size: cover;
        background-position: -40px 0;
      }
      .img4 {
        position: absolute;
        width: 180px;
        height: 140px;
        top: 10px;
        right: 0px;
        background: url("~@/assets/image/img4.png");
        background-size: cover;
        background-position: -40px 0;
      }
    }

    .videoBox {
      position: relative;
      padding: 10px 0;

      .video1 {
        width: 100%;
        height: 150px;
        
        // background-color: #000;
        background: url("~@/assets/image/运输机1.png");
        background-size: cover;
        &::after {
          content: "";
          position: absolute;
          width: 50px;
          height: 50px;
          top: calc(50% - 25px);
          left: calc(50% - 25px);
          background: url("~@/assets/image/play.png");
        }
      }
      .video2 {
        position: absolute;
        width: 100%;
        height: 150px;
        // background-color: #000;
        background: url("~@/assets/image/play2.png");
        background-size: cover;
        &::after {
          content: "";
          position: absolute;
          width: 50px;
          height: 50px;
          top: calc(50% - 25px);
          left: calc(50% - 25px);
          background: url("~@/assets/image/play.png");
        }
      }
    }

    .checkBox {
      margin: 20px 20px 0 20px;
    }


  }
}
</style>