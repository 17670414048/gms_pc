<template>
    <div class="baby-list">
        <div class="table-head">
            <p class="baby-table">宝宝列表</p>
        </div>
         <el-table
          ref="filterTable"
          :data="baby"
          style="width: 100%;text-align:center;border-radius:6px;"
          class="table"
          cell-class-name="cell"
          empty-text="无数据"
          width="100%"
        >
          <el-table-column prop="registid" label="病人ID号" min-width="100"></el-table-column>
          <el-table-column prop="name" label="姓名" min-width="90"></el-table-column>
          <el-table-column prop="sex" label="性别" min-width="60"></el-table-column>
          <el-table-column prop="birth_str" label="出生日期" min-width="120"></el-table-column>
          <el-table-column prop="week_day" label="出生孕周" min-width="100"></el-table-column>
          <el-table-column prop="birth_weight" label="出生体重" min-width="100"></el-table-column>

          <!-- <el-table-column
            prop="program"
            label="全部测评项目"
             min-width="120"
            :filters="tag3"
            :filter-method="filterTag3"
            column-key="program"
            :filter-multiple="false"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <div>{{scope.row.program}}</div>
            </template>
          </el-table-column>-->
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleEdit(scope.$index, scope.row)"
                style="text-decoration:underline;"
              >获取信息</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:'babyList',
    props:['baby'],
    data(){
        return{
          // baby:this.baby
        }
    },
    methods:{
         handleEdit(index, row) {
                this.$emit('selectBaby',index);
            },
    }
    
}
</script>
<style lang="less">
.baby-list{
    .table-head {
  width: 100%;
  height: 46px;
  line-height: 46px;
  background: rgba(196, 230, 242, 0.6);
  border-radius: 4px 4px 0px 0px;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
}
.cell {
  text-align: center;
}
.baby-table{
    color: #37B3E2;
    font-size:14px;
}
}

</style>

