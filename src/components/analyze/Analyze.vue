<template>
  <div class="box">
    <div class="title">
      <div class="icon"></div>
      <div class="text">统计分析</div>
    </div>
    <div class="filter">
      <div class="filterItem">
        <div class="label">时间范围</div>
        <el-date-picker
          size="mini"
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <div class="filterItem">
        <div class="label">兵力类型</div>
        <el-radio-group size="mini" v-model="checkboxGroup2">
          <el-radio-button
            v-for="i in classification"
            :label="i.code"
            :key="i.code"
            >{{ i.descript }}</el-radio-button
          >
        </el-radio-group>
      </div>
      <div class="filterItem">
        <div class="label">威胁等级</div>
        <!-- <el-radio-group size="mini" v-model="checkboxGroup1">
          <el-radio-button v-for="i in lavel" :label="i.code" :key="i.code">{{
            i.descript
          }}</el-radio-button>
        </el-radio-group> -->
        <div class="level">
          <div
            class="colorBox"
            v-for="item in lavel"
            :class="{
              a: item.code == 1,
              b: item.code == 2,
              c: item.code == 3,
              d: item.code == 4,
              isActive: item.code == checkboxGroup1,
            }"
            @click="checkboxGroup1 = item.code"
          >
            <div class="check">
              <i class="el-icon-check"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="filterItem">
        <div class="label">出现位置</div>
        <el-radio-group size="mini" v-model="checkboxGroup3">
          <el-radio-button v-for="i in place" :label="i?.code" :key="i?.code">{{
            i?.descript
          }}</el-radio-button>
        </el-radio-group>
      </div> -->
      <!-- <div class="seacherBtn">
        <el-button type="primary" icon="el-icon-search" @click="query"
          >筛选</el-button
        >
      </div> -->
    </div>
    <div class="view" ref="myCharts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

import {
  getCode,
  findPosition,
  targetFrequencyStatistics,
} from "@/network/api.js";
import { computed } from "vue";

var myCharts;
export default {
  data() {
    return {
      option: {
        title: {
          text: "",
          left: "center",
          textStyle: {
            fontSize: 20,
            color: "#ffffff",
          },
        },
        xAxis: {
          type: "category",
          show: true,
          name: "时间",
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.521)",
            },
          },
          nameTextStyle: {
            fontSize: 20,
          },
        },
        yAxis: {
          type: "value",
          show: true,
          name: "频次",
          axisTick: {
            inside: true,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.521)",
            },
          },
          splitLine: {
            show: true,
          },

          scale: true,
          nameTextStyle: {
            fontSize: 20,
          },
        },
        series: [
          {
            data: [],
            type: "line",
            smooth: true,
            color: "#eaa30d",
          },
        ],
      },
      value1: [],
      checkboxGroup1: "",
      lavel: [],
      checkboxGroup2: "",
      classification: [],
      checkboxGroup3: "3000",
      place: [],
    };
  },
  mounted() {
    this.initEcharts();
    getCode("03")
      .then((res) => {
        //区域option
        this.place = res.data.map((item) => {
          let _r = {};
          _r.descript = item.descript;
          _r.code = item.code;
          _r;
          return _r;
        });
      })
      .catch((err) => {
        console.log("接口请求失败", err);
      });

    getCode("04").then((res) => {
      //威胁等级option
      this.lavel = res.data.map((item) => {
        let _r = {};
        _r.descript = item.descript;
        _r.code = item.code;
        return _r;
      });

      this.checkboxGroup1 = this.lavel[0].code;
    });

    getCode("01").then((res) => {
      //类型
      this.classification = res.data.map((item) => {
        let _r = {};
        _r.descript = item.descript;
        _r.code = item.code;
        return _r;
      });
      this.checkboxGroup2 - this.classification[0].code;
      getCode("02").then((res) => {
        let tem = res.data.map((item) => {
          let _r = {};
          _r.descript = item.descript;
          _r.code = item.code;
          return _r;
        });
        this.classification.push(...tem);
      });
    });
  },
  methods: {
    initEcharts() {
      var chartDom = this.$refs.myCharts;
      myCharts = echarts.init(chartDom);
      var option = this.option;
      option && myCharts.setOption(option);
    },
    query() {
      var that = this;
      if (
        that.checkboxGroup1 !== "" &&
        that.checkboxGroup2 !== "" &&
        that.value1.length == 2
      ) {
        //调用查询接口
        that.checkboxGroup3;
        let queryJSON = `endTime=${that.value1[1].toLocaleString().replace(/\//g,'-')}&entityType=${
          that.checkboxGroup2
        }&startTime=${that.value1[0].toLocaleString().replace(/\//g,'-')}&threatLevel=${
          that.checkboxGroup1
        }&step=2`;

        targetFrequencyStatistics(queryJSON)
          .then((res) => {
            console.log(res);
            // {2023-08-10 09:43:15: 1}
            let data = res.data;
            let temp = [];
            Object.keys(data).forEach((item) => {
              temp.push([item.replace(" 00:00:00", ""), data[item]]);
            });

            let option = myCharts.getOption();
            console.log(option);
            option.title[0].text = `${that.value1[0]
              .toLocaleString()
              .replace(" 00:00:00", "").replace(/\//g,'-')}至${that.value1[1]
              .toLocaleString()
              .replace(" 00:00:00", "").replace(/\//g,'-')}期间 ${
              that.lavel.find((item) => item.code == that.checkboxGroup1)
                .descript
            }等级的 ${
              that.classification.find(
                (item) => item.code == that.checkboxGroup2
              ).descript
            } 出现的频次统计`;
            option.series[0].data = temp;

            option && myCharts.setOption(option);
          })
          .catch((err) => {
            console.log("请求失败", err);
          });
      } else {
      }
    },
  },
  watch: {
    pramChange: {
      immediate: false,
      deep: true,
      handler(newVal, oldVal) {
        this.query();
      },
    },
  },
  computed: {
    pramChange() {
      return {
        time: this.value1, // 时间
        checkboxGroup2: this.checkboxGroup2, // 兵力类型
        checkboxGroup1: this.checkboxGroup1, // 威胁等级
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: #1c1f28;
  padding: 0 5%;

  .title {
    width: 90%;
    height: 50px;
    line-height: 50px;
    color: #fff;
    position: absolute;
    .icon {
      position: absolute;
      left: 0;
      top: 10px;
      width: 30px;
      height: 30px;
      background: url("~@/assets/homeIcon/统计.png");
    }
    .text {
      height: 100%;
      position: absolute;
      left: 35px;
    }
  }

  .filter {
    width: 90%;
    height: 150px;
    position: absolute;
    top: 50px;
    color: #9ea2a7;
    padding: 20px 30px;
    background-color: #282b33;
    .filterItem {
      margin-bottom: 17px;
      width: 100%;
      overflow: hidden;
      position: relative;
      .label {
        display: inline-block;
        width: 100px;
        font-size: 16px;
        letter-spacing: 2px;
      }

      ::v-deep(.el-radio-button__inner) {
        background: #00000000;
        border: 0;
        font-size: 16px;
        color: #fff;
      }

      ::v-deep(.is-active .el-radio-button__inner) {
        background: #3e8af4;
        border-radius: 16px;
      }

      ::v-deep(
          .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled)
        ) {
        box-shadow: 0 0 0 transparent;
      }

      ::v-deep(.el-input__inner) {
        background: #00000000;
        border: 0;
      }
      ::v-deep(.el-range-separator) {
        color: #fff;
        font-size: 16px;
      }
      ::v-deep(.el-range-input) {
        margin-left: 8px;
        background: transparent;
        color: #fff;
        font-size: 16px;
        border: 1px solid #9ea2a7;
        height: 28px;
      }
      .level {
        height: 100%;
        position: absolute;
        top: 0;
        left: 107px;
        float: left;
      }
    }
    .seacherBtn {
      position: absolute;
      top: 140px;
      right: 240px;
    }

    .colorBox {
      height: 100%;
      width: 30px;
      background-color: #fff;
      margin-right: 20px;
      float: left;
      border-radius: 2px;
      cursor: pointer;
      .check {
        text-align: center;
        color: #fff;
        font-size: 16px;
        display: none;
      }
    }
    .a {
      background-color: #f92832;
    }
    .b {
      background-color: #ee9f00;
    }
    .c {
      background-color: #efd900;
      .check {
        text-align: center;
        color: #000;
      }
    }
    .d {
      background-color: #fff;
      .check {
        text-align: center;
        color: #000;
      }
    }
    .isActive {
      .check {
        display: block;
      }
    }
  }
  .view {
    position: absolute;
    width: 90%;
    height: calc(100% - 50px - 140px - 80px);
    bottom: 40px;
    padding-top: 20px;
    background-color: #282b33;
  }
}
</style>