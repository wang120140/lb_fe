<template>
  <div class="indexBox">
    <div class="topBar">
      <button class="addBtn" @click="toCreate">添加信息</button>
      <div class="filter">
        <el-input v-model="filters.xing_ming" class="filterItem" style="width: 202px" placeholder="名称"
          clearable></el-input>
        <el-input v-model="filters.gong_hao" class="filterItem" style="width: 202px" placeholder="工号"
          clearable></el-input>
        <el-input v-model="filters.wei_xin" class="filterItem" style="width: 202px" placeholder="微信" clearable></el-input>
        <el-input v-model="filters.gong_zhong" class="filterItem" style="width: 202px" placeholder="工种"
          clearable></el-input>
        <el-select v-model="filters.is_my" class="filterItem" placeholder="出处来源" clearable>
        </el-select>
        <div class="refresh" @click="getMessageList">
          <i class="el-icon-search"></i>
        </div>
        <div class="refresh" @click="refresh">
          <i class="el-icon-refresh"></i>
        </div>
      </div>

    </div>
    <el-table :data="tableData" style="width: 100%;margin-bottom:30px">
      <el-table-column prop="xing_ming" label="姓名">
        <template slot-scope="scope">
          <el-link type="primary" @click="toDesc">{{ scope.row.xing_ming }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="gong_hao" label="工号">
      </el-table-column>
      <el-table-column prop="mi_ma" label="密码">
      </el-table-column>
      <el-table-column prop="wei_xin" label="微信">
      </el-table-column>
      <el-table-column prop="gong_zhong" label="工种">
      </el-table-column>
      <el-table-column prop="fen_shu" label="分数">
      </el-table-column>
      <el-table-column prop="mi_is_right" label="密码是否正确">
      </el-table-column>
      <el-table-column prop="is_year" label="是否包年">
      </el-table-column>
      <el-table-column prop="is_my" label="出处">

      </el-table-column>
      <el-table-column label="操作">
        <el-link type="primary" style="margin-right:10px">预览</el-link>
        <el-link type="primary" style="margin-right:10px">修改</el-link>
        <el-link type="primary" style="margin-right:10px">导出</el-link>
        <el-link type="primary">删除</el-link>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination/pagination'

import { getMessageList_fromServer } from '@/network/api_lb.js'
export default {
  components: {
    pagination
  },
  data() {
    return {
      filters: {
        xing_ming: "",
        gong_hao: "",
        wei_xin: "",
        is_my: "",
        gong_zhong: ""

      },
      tableData: [

      ],
      currentPage4: 1,
      pageSize: 10,
      total: 100
    };
  },
  watch:{
    filters:{
      deep:true,
      handler(){
        this.getMessageList()
      }
    }
  },

  mounted() {
    this.getMessageList()
  },
  methods: {
    toCreate() {
      this.$router.push({
        name: 'dataAssembleAdd'
      })
    },
    toDesc() {
      this.$router.push({
        name: 'dataAssembleDesc'
      })
    },
    refresh() {
      Object.keys(this.filters).forEach((item) => {
        this.filters[item] = ''
      })
      this.getMessageList()
    },
    getMessageList() {
      let _post = {
        pageSize: this.pageSize,
        pageNum: this.currentPage4,
        xing_ming: this.filters.xing_ming,
        gong_hao: this.filters.gong_hao,
        wei_xin: this.filters.wei_xin,
        is_my: this.filters.is_my,
        gong_zhong: this.filters.gong_zhong
      }
      let _this = this
      getMessageList_fromServer(_post).then((res) => {
        _this.tableData = res.arr
        _this.total = res.num
      })
    },
    handleSizeChange(pram) {
      this.pageSize = pram
      this.getMessageList()
    },
    handleCurrentChange(pram) {
      console.log(pram)
      this.currentPage4 = pram
      console.log(".....")
      this.getMessageList()
    }
  }

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
    background: linear-gradient(to right, rgba(255, 255, 255, 0.65), rgb(242, 243, 255));
    z-index: 1;
    padding: 0px 24px;
    box-shadow: rgba(25, 70, 185, 0.1) 0px -8px 12px;
    transition: width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  }
}
</style>