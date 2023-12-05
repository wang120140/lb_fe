<template>
  <div class="detailInfo">
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
      <div class="close" @click="close">
        <i class="el-icon-close"></i>
      </div>
    </div>

    <!-- <div class="timeFilter"> -->
    <div class="timeFilter" style="display:none">
      <el-date-picker
        size="mini"
        v-model="queryTime"
        type="datetime"
        placeholder="请输入时间查询"
        @change="changeTime"
      ></el-date-picker>
    </div>

    <div class="tabsBox">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="历史轨迹追溯" name="1">
          <div class="eventLine">
            <el-timeline>
              <template v-for="(item, index) in details">
                <el-timeline-item
                  size="large"
                  :color="
                    item.threatLevel == 1
                      ? '#ff0000'
                      : item.threatLevel == 2
                      ? '#ff8000'
                      : item.threatLevel == 3
                      ? '#ffff00'
                      : '#ffffff'
                  "
                >
                  <template
                    v-if="
                      checkRecord.hasOwnProperty(entityId) &&
                      checkRecord[entityId].hasOwnProperty(item.mid)
                    "
                  >
                    <div
                      class="eventItem"
                      :class="{
                        isActiveEventItem: checkRecord[entityId][item.mid],
                      }"
                    >
                      <div class="checkbox">
                        <el-checkbox
                          v-model="checkRecord[entityId][item.mid]"
                          @change="changeBoxClick(item.mid)"
                        ></el-checkbox>
                      </div>
                      <div class="time">{{ item.positionTime }}</div>
                      <div class="position">
                        地理位置：{{ item.position.desc }}
                      </div>
                      <div class="description">
                        异常描述：{{ item.exceptionInfo }}
                      </div>
                      <div class="description">
                        行为意图：{{ item.behaviorIntention }}
                      </div>
                    </div>
                  </template>
                </el-timeline-item>
              </template>
            </el-timeline>
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史动向对比" name="2">
          <div class="trend">
            <el-timeline>
              <template v-for="item in trend">
                <el-timeline-item
                  size="large"
                  :color="
                    item.threatLevel == 1
                      ? '#ff0000'
                      : item.threatLevel == 2
                      ? '#ff8000'
                      : item.threatLevel == 3
                      ? '#ffff00'
                      : '#ffffff'
                  "
                >
                  <div class="eventItem">
                    <div class="time">{{ item.positionTime }}</div>
                    <div class="position">
                      地理位置：{{ item.position.desc }}
                    </div>
                    <div>X向:XXXXXXXXXXXXXx</div>
                  </div>
                </el-timeline-item>
              </template>
            </el-timeline>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
let timer = null;
import { showHistyry } from "@/network/api.js";
export default {
  props: {
    entityList: {
      type: Array,
    },
    mainTargetData: {
      type: Array,
    },
  },
  data() {
    return {
      queryTime: "",

      isCheck: true,
      entityId: "",
      details: [],
      trend: [],
      checkRecord: {},
      selectOption: [],
      activeName: "1",
      a: true,
      b: true,
    };
  },
  methods: {
    transformTime(time) {
      return new Date(time).toLocaleString();
    },
    transformLongitude(longitude) {
      let str = "";
      if (longitude > 0) {
        str = "东经";
      } else {
        str = "西经";
      }
      return str + longitude.toFixed(3);
    },
    transformLatitude(latitude) {
      let str = "";
      if (latitude > 0) {
        str = "北纬";
      } else {
        str = "南纬";
      }
      return str + latitude.toFixed(3);
    },
    close() {
      this.$eventBus.$emit("closeHistoryBox");
    },
    changeBoxClick(mid) {
      // console.log(mid);
      this.$eventBus.$emit("changeChecked", {
        mid: mid,
        status: this.checkRecord[this.entityId][mid],
      });
    },
    validation(mid) {
      this.$eventBus.$emit("validation", mid);
    },
    changeTime(time) {
      console.log(time, "change");

      let data = `entityId=${this.entityId}&startTime=${time
        .toLocaleString()
        .replace(/\//g, "-")}`;
      showHistyry(data).then((res) => {
        if (!this.checkRecord[this.entityId]) {
          this.$set(this.checkRecord, this.entityId, {});
          res.data.modelOutPutHistoryList.forEach((item) => {
            if (!this.checkRecord[this.entityId][item.mid]) {
              this.$set(this.checkRecord[this.entityId], item.mid, false);
            }
          });
        }

        this.details = res.data.modelOutPutHistoryList;
        this.trend = res.data.modelOutPutCompareList;
        this.$nextTick(() => {
          // this.modelname = res.data.modelOutPutHistoryList[0].entity.entityName;
        });
      });
    },
  },
  mounted() {
    this.$eventBus.$on("changeHistoryEntityId", (data) => {
      this.entityId = data;
      this.showDetailInfo = true;
    });
    this.$eventBus.$on("changeDetailInfoId", (data) => {
      this.entityId = data;
    });
    this.$eventBus.$on("closeInfo", () => {
      this.showDetailInfo = false;
      this.entityId = "";
    });

    this.$eventBus.$on('delModelId',delId => {
      console.log('debugger 事件触发');
      if(this.entityId == delId){
        this.$eventBus.$emit("closeHistoryBox");
      }
    })
  },
  watch: {
    entityId: {
      handler: function (newValue, oldValue) {

        
        let data = `entityId=${newValue}`;
        showHistyry(data).then((res) => {
            console.log('更新详细');
            if (!this.checkRecord[newValue]) {
              this.$set(this.checkRecord, newValue, {});
              res.data.modelOutPutHistoryList.forEach((item) => {
                if (!this.checkRecord[newValue][item.mid]) {
                  this.$set(this.checkRecord[newValue], item.mid, false);
                }
              });
            }

            this.details = res.data.modelOutPutHistoryList;
            this.trend = res.data.modelOutPutCompareList;
            this.$nextTick(() => {
              this.modelname =
                res.data.modelOutPutHistoryList[0].entity.entityName;
            });
          });
        // console.log(data);
        this.queryTime = "";
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
        timer = setInterval(() => {
          showHistyry(data).then((res) => {
            console.log('更新详细');
            if (!this.checkRecord[newValue]) {
              this.$set(this.checkRecord, newValue, {});
              res.data.modelOutPutHistoryList.forEach((item) => {
                if (!this.checkRecord[newValue][item.mid]) {
                  this.$set(this.checkRecord[newValue], item.mid, false);
                }
              });
            }

            this.details = res.data.modelOutPutHistoryList;
            this.trend = res.data.modelOutPutCompareList;
            this.$nextTick(() => {
              this.modelname =
                res.data.modelOutPutHistoryList[0].entity.entityName;
            });
          });
        }, 2000);

        // if (timer) {
        //   clearInterval(timer);
        //   timer = null;
        // }

        // timer = setInterval(() => {
        //   showHistyry(data).then((res) => {
        //     if (!this.checkRecord[newValue]) {
        //       this.$set(this.checkRecord, newValue, {});
        //       res.data.modelOutPutHistoryList.forEach((item) => {
        //         if (!this.checkRecord[newValue][item.mid]) {
        //           this.$set(this.checkRecord[newValue], item.mid, false);
        //         }
        //       });
        //     } else {
        //       res.data.modelOutPutHistoryList.forEach((item) => {
        //         if (!this.checkRecord[newValue][item.mid]) {
        //           this.$set(this.checkRecord[newValue], item.mid, false);
        //         }
        //       });
        //     }

        //     this.details = res.data.modelOutPutHistoryList;
        //     this.$nextTick(() => {
        //       this.modelname = res.data.modelOutPutHistoryList[0].entity.entityName;
        //     });
        //   });
        // }, 1000);

        this.$eventBus.$emit("changeEntityId", newValue);
      },
    },
    checkRecord: {
      handler: function (newValue, oldValue) {
        // console.log(newValue);
        this.$eventBus.$emit("changeTrajectory", newValue);
      },
      deep: true,
    },
  },
  beforeDestroy() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  },
};
</script>

<style lang="scss" scoped>
.detailInfo {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #272b32;
  padding: 20px;
  padding-top: 0;

  .buttons {
    width: 320px;
    position: fixed;
    bottom: 10px;
    left: 0;
    text-align: center;
  }
  ::v-deep(.el-timeline-item__wrapper) {
    // padding-bottom: 30px;
  }
  .lastBox {
    ::v-deep(.el-timeline-item__wrapper) {
      padding-bottom: 0px;
    }
  }
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
      background-color: transparent;
      font-size: 16px;
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

  .timeFilter {
    ::v-deep(.el-date-editor.el-input) {
      width: 100%;
      height: 32px;
    }
    ::v-deep(.el-input__inner) {
      background-color: transparent;
      border: 1px solid #35393f;
      color: #7a8797;
      font-size: 14px;
    }

    ::v-deep(.el-input__prefix, .el-input__suffix) {
      color: #7a8797;
    }
  }

  .tabsBox {
    width: 100%;
    height: calc(100% - 70px);
    margin-top: 10px;

    ::v-deep(.el-tabs--card > .el-tabs__header) {
      border-bottom: 1px solid transparent;
    }

    ::v-deep(.el-tabs__nav-scroll) {
      width: 100%;
      border-bottom: 1px solid #35393f;
      border-radius: 5px;
    }

    ::v-deep(.el-tabs__nav) {
      width: 100% !important;
      border: 1px solid #35393f;
    }
    ::v-deep(.el-tabs__item) {
      width: 50%;
      line-height: 28px;
      height: 28px;
      text-align: center;
      color: #7a8797;
      font-size: 16px;
      border: 1px solid transparent;
    }
    ::v-deep(.el-tabs__item.is-active) {
      color: #3c8bf4;
      border: 1px solid #3967e4;
      border-radius: 5px;
    }
    ::v-deep(.el-tabs__header) {
      margin: 0;
    }
  }

  .eventLine {
    position: relative;
    width: 100%;
    height: 569px;
    overflow: hidden;
    padding: 16px;
    padding-left: 25px;
    overflow-y: auto;

    .checkbox {
      position: absolute;
      top: 10px;
      left: -50px;
      transform: scale(1);
    }

    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 5px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      background-color: #7a8797;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
      background: #0c213500;
    }
    .eventItem {
      position: relative;
      padding: 10px;
      padding-bottom: 0;
      line-height: 30px;
      font-size: 16px;
      color: #d3d3d3;
      .description {
        width: 100%;
      }
      .time {
        color: #a4a5a8;
        font-size: 16px;
      }
    }

    ::v-deep(.el-timeline-item__node--large) {
      top: 15px;
    }

    ::v-deep(.el-timeline-item__tail) {
      top: 25px;
    }

    ::v-deep(.el-timeline-item) {
      padding-bottom: 0;
    }

    ::v-deep(.el-collapse-item__header) {
      border: 0;
      border: 1px solid #c9c9c9;
      margin-top: 5px;
      text-indent: 2em;
      font-size: 16px;
      position: relative;
    }

    ::v-deep(.el-collapse-item__arrow) {
      position: absolute;
      transition: transform 0.3s;
      font-weight: 300;
      left: 10px;
      text-indent: 0;
    }

    ::v-deep(.el-collapse-item__wrap) {
      border: 0;
    }

    ::v-deep(.el-collapse) {
      border: 0;
    }
  }
  .trend {
    position: relative;
    width: 100%;
    height: 569px;
    overflow: hidden;
    padding: 16px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 5px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      background-color: #7a8797;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
      background: #0c213500;
    }

    .eventItem {
      position: relative;
      padding: 10px;
      padding-bottom: 0;
      line-height: 30px;
      font-size: 16px;
      color: #d3d3d3;
      .description {
        width: 100%;
      }
      .time {
        color: #a4a5a8;
        font-size: 16px;
      }
    }
    ::v-deep(.el-timeline-item__node--large) {
      top: 15px;
    }

    ::v-deep(.el-timeline-item__tail) {
      top: 25px;
    }

    ::v-deep(.el-timeline-item) {
      padding-bottom: 0;
    }

    ::v-deep(.el-collapse-item__header) {
      border: 0;
      border: 1px solid #c9c9c9;
      margin-top: 5px;
      text-indent: 2em;
      font-size: 16px;
      position: relative;
    }

    ::v-deep(.el-collapse-item__arrow) {
      position: absolute;
      transition: transform 0.3s;
      font-weight: 300;
      left: 10px;
      text-indent: 0;
    }

    ::v-deep(.el-collapse-item__wrap) {
      border: 0;
    }

    ::v-deep(.el-collapse) {
      border: 0;
    }
  }
}
</style>