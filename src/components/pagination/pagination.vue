<template>
  <div class="box">
    <div class="total">
      {{`第${(currentPage - 1)*size+1}-${currentPage * size}条 / 共${total}条数据`}}
    </div>
    <el-pagination
      class="patination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="100"
      background
      layout=" prev, pager, next,sizes, jumper"
      :total="400"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: 0,
    currentPage: 1,
    size:20
  },
  methods: {
    handleSizeChange(){

    },
    handleCurrentChange(){
        
    }
  }
};
</script>

<style lang='scss' scoped>
.box {
  width: 100%;
  height: 52px;
  display: flex;
  .total {
    flex: 1;
    line-height: 52px;
  }
  ::v-deep(.el-pagination){
    padding-top: 10px;
  }
  ::v-deep(.el-pagination.is-background .el-pager li:not(.disabled).active){
    background-color: transparent;
    color: #2B55BE;
    border: 1px solid #2B55BE;
  }
}
</style>