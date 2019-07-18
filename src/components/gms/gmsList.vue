<template>
  <div class="content-box">
    <div class="gmslist-box">
      <div class="select-header">
        <div class="start">
          <div class="chose-date">
            <span>门诊日期：</span>
            <el-date-picker
              :editable="false"
              v-model="chosedDate"
              type="date"
              :clearable="false"
              placeholder="请选择时间"
              @change="changeDate"
              value-format="yyyy-MM-dd"
            >></el-date-picker>
          </div>
          <span class="vertical-line">|</span>
          <div class="watch-video">
            <span>视频状态：</span>
            <el-select
              v-model="videoValue"
              class="control-width-1"
              placeholder="请选择"
              @change="changeVideo"
            >
              <el-option label="全部" value></el-option>
              <el-option label="等待上传" value="0"></el-option>
              <el-option label="已上传" value="1"></el-option>
              <el-option label="审核不过" value="2"></el-option>
            </el-select>
          </div>
          <span class="vertical-line">|</span>
          <div class="report-status">
            <span>报告状态：</span>
            <el-select
              v-model="reportValue"
              class="control-width-2"
              placeholder="请选择"
              @change="changeReport"
            >
              <el-option label="全部" value></el-option>
              <el-option label="已出报告" value="1"></el-option>
              <el-option label="未出报告" value="0"></el-option>
            </el-select>
          </div>
        </div>
        <div class="end">
          <div class="search">
            <el-input placeholder="请输入宝宝姓名或者登记号" v-model="searchValue">
              <el-button slot="append" @click="search">搜索</el-button>
            </el-input>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="watch-patient-wrapper">
          <el-dialog
            title
            :visible.sync="informationVisible"
            width="80%"
            :before-close="handleClose"
            class="dialog-position"
            top="5vh"
            :close-on-press-escape="false"
          >
            <patientInformation :sheet_id="sheet_id" @close-dialog="closeDialog" :manual="manual"></patientInformation>
          </el-dialog>
        </div>
        <div class="watch-report-wrapper">
          <el-dialog
            title
            :visible.sync="reportVisible"
            width="75%"
            :before-close="handleClose"
            class="dialog-position"
            top="5vh"
            :close-on-press-escape="false"
          >
            <report
              :report-status="reportStatus"
              :sheet_id="sheet_id"
              :manual="manual"
              @close-dialog="closeDialog"
              @cancel="cancel"
            ></report>
          </el-dialog>
        </div>
        <div class="upload-video-wrapper">
          <el-dialog
            title
            :visible.sync="uploadVideoVisible"
            width="32%"
            :before-close="handleClose"
            class="upload-video"
            :close-on-press-escape="false"
          >
            <uploadVideo :sheet_id="sheet_id" @close-dialog="closeDialog"></uploadVideo>
          </el-dialog>
        </div>
        <div class="watch-video-wrapper">
          <el-dialog
            title
            :visible.sync="watchVideoVisible"
            width="65%"
            :before-close="handleClose"
            class="watch-video dialog-position"
            top="5vh"
            :close-on-press-escape="false"
          >
            <watchVideo
              :sheet_id="sheet_id"
              :media_message="media_message"
              @close-dialog="closeDialog"
            ></watchVideo>
          </el-dialog>
        </div>
        <ul v-if="gmslists.length !== 0">
          <li>
            <span>登记号</span>
            <span>患者信息</span>
            <span>预产期</span>
            <span>视频操作</span>
            <span>视频状态</span>
            <span>GMS报告</span>
          </li>
          <li v-for="(list,index) in gmslists" :key="index">
            <span class="number">{{list.registid}}</span>
            <span>
              <span class="baby-name">{{list.baby_name}}</span>
              <span>
                <el-button
                  type="text"
                  @click="onWatchInformation(list.sheet_id)"
                  class="edit"
                >查看/编辑完整信息</el-button>
              </span>
            </span>
            <span>{{list.weeks}}周+{{list.days}}天</span>
            <!-- <span class="upload-status" v-if="list.video_status == 0 && list.upload_flag == 1">等待上传</span> -->
            <span
              class="can-click"
              @click="onUploadVideoVisible(list.sheet_id)"
              v-if="list.video_status == 0 || list.video_status == 2"
            >上传视频</span>
            <span class="upload-status" v-else-if="list.video_status == 1">已上传</span>
            <!-- <span class="upload-status" v-else-if="list.video_status == 2">等待上传</span> -->
            <span class="upload-status" v-else-if="list.video_status == 3">已通过</span>
            <!-- <span class="remain-family" v-if="list.upload_flag == 0">提醒家长(先不用)</span>
            <span class="remain-family-has" v-else-if="list.upload_flag == 1">已提醒</span>-->
            <span
              class="can-click"
              @click="onWatchVideoVisible(list.media_url,list.sheet_id,list.taken_time,list.taken_age,list.media_id)"
              v-if="list.video_status == 1 || list.video_status == 3"
            >查看视频</span>
            <span class="remain-family-has" v-else>-</span>
            <span
              @click="onReportVisible('create',list.sheet_id)"
              class="can-click"
              v-if="list.status == 0 && list.video_status != 0"
            >创建报告</span>
            <span
              @click="onReportVisible('edit',list.sheet_id)"
              class="can-click"
              v-else-if="list.status == 1"
            >查看报告</span>
            <span class="remain-family-has" v-else>-</span>
          </li>
        </ul>
        <ul v-else>
          <li>
            <span>登记号</span>
            <span>患者信息</span>
            <span>预产期</span>
            <span>视频操作</span>
            <span>视频状态</span>
            <span>GMS报告</span>
          </li>
          <li class="noDate">
            <span>无数据</span>
          </li>
        </ul>
      </div>
      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="10"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import patientInformation from "./patientInformation";
import report from "./report";
import uploadVideo from "./uploadVideo";
import watchVideo from "./watchVideo";
import { unixToDate } from "../../common/timeChange";
import { getStorageInfo } from "../../common/getStorageInfo";
export default {
  name: "gmsList",
  components: {
    patientInformation,
    report,
    uploadVideo,
    watchVideo
  },
  data() {
    return {
      gmslists: [],
      sheet_id: 0, //点击弹出对话框传入的检查单号 给子组件
      reportStatus: "", //创建报告与查看报告传值 给子组件
      media_message: "", //观看视频的链接，传递给子组件,

      informationVisible: false, //病人信息可见
      reportVisible: false, //报告可见
      uploadVideoVisible: false, //上传可见
      watchVideoVisible: false, //观看视频可见
      chosedDate: unixToDate(new Date().getTime() / 1000), //门诊日期
      videoValue: "", //视频状态选择
      reportValue: "", //报告状态选择
      searchValue: "", //搜索框内容,
      manual: null //常用选项映射
    };
  },
  computed: {
    filterLists() {}
  },
  methods: {
    changeDate(date) {
      // console.log(date);
      // console.log(typeof this.chosedDate);
      let data = {
        date: date,
        video_status: this.videoValue,
        status: this.reportValue
      };
      this.initDate(data);
    },
    handleClose(done) {
      done()
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    closeDialog(dialog) {
      if (dialog !== "") {
        this[dialog] = false;
      }
      let data = {
        date: this.chosedDate,
        video_status: this.videoValue,
        status: this.reportValue
      };
      this.initDate(data);
    },
    cancel(dialog) {
      this[dialog] = false;
    },
    onReportVisible(status, sheet_id) {
      this.sheet_id = sheet_id;
      this.reportStatus = status;
      this.reportVisible = true;
    },
    onUploadVideoVisible(sheet_id) {
      this.sheet_id = sheet_id;
      this.uploadVideoVisible = true;
    },
    onWatchInformation(sheet_id) {
      this.sheet_id = sheet_id;
      this.informationVisible = true;
    },
    onWatchVideoVisible(media_url, sheet_id, taken_time, taken_age, media_id) {
      this.watchVideoVisible = true;
      this.sheet_id = sheet_id;
      this.media_message = {
        media_url,
        taken_time,
        taken_age,
        media_id
      };
    },
    changeVideo(value) {
      let data = {
        date: this.chosedDate,
        video_status: value,
        status: this.reportValue
      };

      this.initDate(data);
    },
    changeReport(value) {
      let data = {
        date: this.chosedDate,
        status: value,
        video_status: this.videoValue
      };

      this.initDate(data);
    },
    search() {
      if (this.searchValue) {
        let data = {
          date: this.chosedDate,
          video_status: this.videoValue,
          status: this.reportValue,
          key: this.searchValue
        };
        this.initDate(data);
        this.searchValue = "";
      }
    },
    initDate(data) {
      this.$axios({
        method: "post",
        url: "/gms/doctor/gms-report/list",
        headers: {
          userid: getStorageInfo().userid,
          token: getStorageInfo().token
        },
        data: data
      }).then(res => {
        if (res.data.result == "0") {
          this.gmslists = res.data.data.list;
          // console.log(this.gmslists, "result");
        }
      });
    },
    getManual() {
      this.$axios({
        method: "post",
        url: "/gms/doctor/check/manual",
        headers: {
          userid: getStorageInfo().userid,
          token: getStorageInfo().token
        }
      }).then(res => {
        if (res.data.result == "0") {
          this.manual = res.data.data;
        }
      });
    }
  },
  created() {
    let data = { date: this.chosedDate };
    this.initDate(data);
    this.getManual();
  }
};
</script>
<style lang="less" >
// 覆盖 element-ui 样式
@bgcolor: #37b3e2;
.gmslist-box {
  .select-header {
    ::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #37b3e2;
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #37b3e2;
    }
    .el-date-editor.el-input {
      width: 140px;
    }
    .el-input__inner {
      border: 1.01px solid #37b3e2;
      color: #37b3e2;
      height: 27px;
    }
    .el-input__icon {
      line-height: 27px;
      color: #37b3e2;
    }
    .el-button--primary {
      background-color: #37b3e2;
      border-color: #37b3e2;
    }
    .watch-video,
    .report-status {
      .el-input {
        width: 110px;
      }
    }
    .search {
      .el-input__inner {
        min-width: 180px;
      }
      .el-input-group__append {
        background: rgba(55, 179, 226, 1);
        border-radius: 0px 3px 3px 0px;
        border: 1px solid rgba(55, 179, 226, 1);
        color: #ffffff;
      }
    }
  }
  .list {
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog {
      min-width: 1050px;
    }
    .upload-video {
      .el-dialog {
        min-width: 600px;
      }
    }
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #37b3e2;
  }
  .el-pagination.is-background .el-pager li {
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5.009px;
    border: 1.01px solid rgba(217, 217, 217, 1);
  }
  .el-pagination.is-background .btn-next {
    background-color: rgba(255, 255, 255, 1);
    border: 1.01px solid rgba(217, 217, 217, 1);
    border-radius: 5.009px;
  }
  .el-pagination.is-background .btn-prev {
    background-color: rgba(255, 255, 255, 1);
    border: 1.01px solid rgba(217, 217, 217, 1);
    border-radius: 5.009px;
  }
}
</style>

<style lang="less" scoped>
div,
span,
ul,
li {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(70, 70, 70, 1);
}
.content-box {
  min-width: 1000px;
}
.gmslist-box {
  min-height: 100%;
  background: rgba(250, 251, 252, 1);
  margin: 0 auto;
  padding: 36px 53px 15px 33px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.select-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 9px 13px 20px;
  background: rgba(196, 230, 242, 0.4);
  border-radius: 7.009px 7.009px 0px 0px;
  border: 1px solid rgba(159, 175, 203, 0.4);
  border-bottom: none;
  // height: 30px;
  .start {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
.vertical-line {
  margin: 0 15px;
}
.list {
  flex-grow: 1;
  overflow-x: auto;
}
.list ul li {
  border: 1px solid rgba(159, 175, 203, 0.4);
  border-top: none;
  background: rgba(255, 255, 255, 1);
  display: flex;
  padding: 17px 20px 17px 42px;
  justify-content: space-between;
  &.noDate {
    display: flex;
    justify-content: center;
    > span {
      color: rgba(70, 70, 70, 0.4);
    }
  }
  > span {
    width: 15%;
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    height: 17px;
    line-height: 17px;
    &:nth-child(2) {
      width: 25%;
    }
    &.can-click {
      color: rgba(55, 179, 226, 1);
      text-decoration: underline;
      cursor: pointer;
    }
    &.remain-family {
      color: #464646;
      text-decoration: underline;
      cursor: pointer;
    }
    &.remain-family-has {
      color: #aaaaaa;
    }
    &.upload-status {
      color: #aaaaaa;
    }
    .baby-name {
      width: 40%;
      text-align: right;
      display: inline-block;
      padding-right: 10px;
      font-size: 14px;
    }
    .edit {
      color: rgba(170, 170, 170, 1);
      text-decoration: underline;
      padding: 0;
      width: 60%;
      text-align: left;
      font-size: 12px;
    }
  }
  &:first-child {
    span {
      color: rgba(70, 70, 70, 0.4);
    }
  }
}
.page {
  text-align: center;
  margin-bottom: 20px;
}
</style>



