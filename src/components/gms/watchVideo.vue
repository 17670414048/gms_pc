<template>
  <div class="watch-video-wrapper">
    <div class="user-info">
      <el-row>
        <el-col :span="20">
          <div class="name">
            {{babyInfo.baby_name}}
            <span class="number">({{babyInfo.registid}})</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="upload-button">
            <el-button :plain="true" @click="renewUploadVideo">重新上传视频</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="hr-color"></div>
    <div class="user-details">
      <div>出生孕周：{{babyInfo.pregnantweeks}}+{{babyInfo.pregnantdays}}</div>
      <div>预产期：{{unixToDate(babyInfo.predicted_birthdate)}}</div>
      <div>拍摄日期：{{unixToDate(media_message.taken_time)}}</div>
      <div>拍摄时年龄：{{media_message.taken_age}}</div>
      <div class="text-right">编号：{{media_message.media_id}}</div>
    </div>
    <div class="video-wrapper">
      <video :src="media_message.media_url" controls="controls" class="video"></video>
    </div>
  </div>
</template>

<script>
import { getStorageInfo } from "../../common/getStorageInfo";
import { unixToDate } from "../../common/timeChange";
export default {
  name: "",
  props: {
    sheet_id: {
      required: true
    },
    media_message: {
      required: true
    }
  },
  data() {
    return {
      loading:true,
      babyInfo: {
        baby_name: "",
        registid: "",
        birthdate: "",
        pregnantweeks: "",
        pregnantdays: "",
        predicted_birthdate: "",
        week_age: ""
      }
    };
  },
  computed: {
    // taken_age(){
    //   let taken_age = this.media_message.taken_age
    //   let arr = taken_age.split(".")
    //   let day = arr[1].slice(0,arr[1].length-1)
    //   return arr[0] + "个月" + day + "天"
    // }
  },
  methods: {
    renewUploadVideo() {
      this.$confirm("该操作会删除视频，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "post",
            url: "/gms/doctor/check/reupload",
            headers: {
              userid: getStorageInfo().userid,
              token: getStorageInfo().token
            },
            data: {
              sheet_id: this.sheet_id
            }
          }).then(res => {
            if (res.data.result == "0") {
              this.$message("视频已删除，已通知家长重新上传视频。");
              this.$emit("close-dialog", "watchVideoVisible");
              this.$bus.$emit("re-upload")
            } else {
              this.$message(res.data.message);
            }
          });
        })
        .catch(() => {});
    },
    unixToDate(unix) {
      return unixToDate(unix);
    },
    getBabyInfo() {
      this.$axios({
        method: "post",
        url: "/gms/doctor/check/detail",
        headers: {
          userid: getStorageInfo().userid,
          token: getStorageInfo().token
        },
        data: {
          id: this.sheet_id
        }
      }).then(res => {
        if (res.data.result == "0") {
          this.babyInfo = res.data.data;
        }
      });
    }
  },
  watch: {
    sheet_id: function(newValue, old) {
      this.getBabyInfo();
    }
  },
  created() {
    this.getBabyInfo();
  }
};
</script>

<style lang="less">
.gmslist-box {
  .list {
    .watch-video-wrapper {
      .el-dialog__header {
        padding: 0;
      }
      .el-dialog__headerbtn {
        top: 9px;
        right: 15px;
        padding: 0;
      }
      .el-button {
        padding: 0;
        width: 100px;
        height: 30px;
        font-size: 12px;
        color: rgba(170, 170, 170, 1);
      }
    }
  }
}
</style>
<style lang="less" scoped>
.watch-video-wrapper {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(70, 70, 70, 1);
  line-height: 17px;
  margin: 0 5px;
  .user-info {
    height: 30px;
    font-size: 17px;
    line-height: 30px;
    margin-bottom: 11px;
    .number {
      color: #aaaaaa;
    }
    .upload-button {
      text-align: right;
      padding-right: 15px;
    }
  }
  .hr-color {
    border-bottom: 1px solid rgba(159, 175, 203, 0.4);
  }
  .user-details {
    display: flex;
    justify-content: space-between;
    margin: 17px 0;
    .text-right {
      padding-right: 25px;
    }
  }
.video-wrapper {
  text-align: center;
}
  .video {
    max-height: 506px;
    min-height: 406px;
  }
}
</style>
