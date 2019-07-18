<template>
  <div class="content-box">
    <div class="content">
      <div class="table-border">
        <div class="table-head">
          <div class="handle-box">
            <label>开单门诊：</label>
            <el-select
              v-model="select_patients"
              popper-class="select-popper"
              class="handle-select mr10"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in tag1"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; 开单时间：</label>
            <el-date-picker
              :picker-options="pickerOptions"
              format="yyyy-MM-dd"
              v-model="select_times"
              type="date"
              popper-class="select-popper"
              placeholder="选择日期"
              class="handle-select"
              :clearable="false"
            ></el-date-picker>
          </div>
          <router-link to="/appointList">
            <el-button type="button">登记预约</el-button>
          </router-link>
        </div>
        <el-table
          ref="filterTable"
          :data="tableData"
          style="width: 100%;text-align:center;border-radius:6px;color:#464646;"
          class="table"
          cell-class-name="cell"
          header-cell-class-name="header-row"
          empty-text="无数据"
          width="100%"
        >
          <el-table-column prop="registid" label="登记号" min-width="100"></el-table-column>
          <el-table-column prop="baby_name" label="姓名" min-width="90"></el-table-column>
          <el-table-column prop="gender_text" label="性别" min-width="50"></el-table-column>
          <el-table-column prop="birthday" label="出生日期" min-width="120"></el-table-column>
          <el-table-column prop="doctor" label="开单医生" min-width="90"></el-table-column>
          <el-table-column prop="department" label="开单门诊" min-width="120"></el-table-column>
          <el-table-column prop="created" label="报到时间" min-width="160"></el-table-column>

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
              >发送消息</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="tableData.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getStorageInfo } from "./../../common/getStorageInfo.js";
import { unixToDate } from "./../../common/timeChange.js";
export default {
  name: "challengeList",
  data() {
    return {
      tableData: [],
      cur_page: 1,
      select_patients: "",
      select_times: unixToDate(new Date().getTime() / 1000),
      tag1: [{ value: "", label: "全部门诊" }], //门诊
      //日历中的全部选项
      pickerOptions: {
        shortcuts: [
          {
            text: "全部开单日期",
            onClick(picker) {
              picker.$emit("pick", unixToDate(new Date().getTime() / 1000));
            }
          }
        ]
      }
    };
  },
  created() {
    this.getMenu();
    this.getData();
  },
  watch: {
    select_patients(val) {
      this.select_patients = val;
      this.getData();
    },
    select_times(val) {
      this.select_times = unixToDate(new Date(val).getTime() / 1000);
      this.getData();
    }
  },
  methods: {
    getMenu() {
      this.$axios
        .post(
          "/gms/doctor/check/manual",
          {},
          {
            headers: {
              userid: getStorageInfo().userid,
              token: getStorageInfo().token
            }
          }
        )
        .then(res => {
          if (res.data.result) {
            this.$message(res.data.message);
          } else {
            //  this.tag1 = res.data.data.deptids;

            for (var key in res.data.data.deptids) {
              var t = {};
              t["value"] = key;
              t["label"] = res.data.data.deptids[key];
              this.tag1.push(t);
            }
          }
        });
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      // if (process.env.NODE_ENV === 'development') {
      //     this.url = '/ms/table/list';
      // };

      this.$axios
        .post(
          "/gms/doctor/check/list",
          {
            date: this.select_times,
            deptid: this.select_patients
          },
          {
            headers: {
              userid: getStorageInfo().userid,
              source: getStorageInfo().source,
              token: getStorageInfo().token,
              system: getStorageInfo().system
            }
          }
        )
        .then(res => {
          if (res.data.result) {
            this.$message(res.data.message);
          } else {
            this.tableData = res.data.data.list;
            for (var i = 0; i < this.tableData.length; i++) {
              this.tableData[i]["gender_text"] =
                this.tableData[i].gender == 1 ? "男" : "女";
              this.tableData[i]["birthday"] = unixToDate(
                this.tableData[i].birthdate,false,'/'
              );
              this.tableData[i]["created"] = (this.tableData[i].created_at)?(unixToDate(
                this.tableData[i].created_at,
                true,'/'
              )):'未报到';
            }
          }
        });
    },
    handleEdit(index, row) {
      this.$message("暂未开放");
    }
  }
};
</script>
<style lang="less">
.content-box {
  .table-border {
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    border: 1px solid rgba(159, 175, 203, 0.4);
    margin-bottom: 20px;
    .cell {
      text-align: center;
      font-weight: 500;
      line-height: 36px;
    }
    th > .cell {
      line-height: 38px;
    }
    .header-cell {
      color: rgba(70, 70, 70, 0.4);
    }
    .handle-box {
      margin-bottom: 20px;
    }
    .handle-box label {
      font-size: 14px;
      font-weight: 400;
      color: #464646;
      line-height: 15px;
    }
    .handle-select {
      max-width: 180px;
    }
    .handle-input {
      width: 300px;
      display: inline-block;
    }
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

    .table-head button {
      float: right;
      height: 26px;
      background: rgba(55, 179, 226, 1);
      border-radius: 3px;
      border: 1px solid rgba(55, 179, 226, 1);
      margin: 10px auto;
      padding: 0px 15px;
    }
    .table-head button > span {
      font-size: 11px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 17px;
    }
    .el-button--text {
      color: #37b3e2;
    }
    .el-table thead {
      color: rgba(70, 70, 70, 0.4);
    }
    .el-table th > .cell.highlight {
      color: #00b5e7;
    }
    .el-table td,
    .el-table th {
      padding: 6px 0;
    }
  }
}

/* 下拉选项样式 */
.el-popper[x-placement^="bottom"].select-popper {
  margin-top: 0px;
}
.el-table .el-input__inner {
  border: 0;
}
.select-popper .el-select-dropdown__item.hover,
.select-popper .el-select-dropdown__item:hover {
  background-color: #fff;
  color: #00b5e7;
}
.select-popper .el-select-dropdown__item {
  text-align: center;
  padding: 0;
  margin: 0 20px;
  color: #464646;
}
.select-popper .el-select-dropdown__item.selected {
  color: #464646;
  background: #edf7fb;
  font-weight: 600;
}
.handle-box .el-button:focus,
.handle-box .el-button:hover {
  color: #fff;
  border-color: #c6e2ff;
  background-color: #37b3e2;
}

/* 日期 */
// .handle-box .el-date-editor.el-input,
// .handle-box .el-date-editor.el-input__inner {
//   width: 140px;
// }

/* 下拉选择样式 */
.handle-box .handle-select .el-input__inner {
  height: 30px;
  line-height: 30px;
  border-color: #37b3e2;
  color: #37b3e2;
}
.handle-box .el-select .el-input__icon {
  height: auto;
  color: #37b3e2;
}
.handle-box .handle-select input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #37b3e2;
}

.handle-box .handle-select input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #37b3e2;
}

.handle-box .handle-select input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #37b3e2;
}

.handle-box .handle-select input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #37b3e2;
}
.handle-box .handle-select .el-input__icon {
  color: #37b3e2;
  text-align: center;
}

/* 分页样式 */
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  padding: 0 4px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  border: 1px solid rgba(217, 217, 217, 1);
  color: #000;
}
/* 日历 */
.el-picker-panel [slot="sidebar"],
.el-picker-panel__sidebar {
  position: absolute;
  top: auto;
  bottom: -30px;
  width: 100%;
  border-top: 1px solid rgba(159, 175, 203, 0.4);
  text-align: center;
  padding-bottom: 6px;
}
.el-date-picker.has-sidebar {
  width: 328px;
}
.el-picker-panel [slot="sidebar"] + .el-picker-panel__body,
.el-picker-panel__sidebar + .el-picker-panel__body {
  margin-left: 0px;
}
.el-picker-panel__shortcut {
  text-align: center;
  text-decoration: underline;
  color: rgba(55, 179, 226, 1);
}
</style>


