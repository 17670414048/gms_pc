<template>
  <div class="upload-video-wrapper">
    <div class="user-info">
      <div class="start">
        <span class="name">{{babyInfo.baby_name}}&nbsp;</span>
        <span class="register-number">({{babyInfo.registid}})</span>
      </div>
      <div class="brith-date">{{unixToDate((new Date().getTime())/ 1000)}}</div>
    </div>
    <div class="hr-color"></div>
    <div class="user-details">
      <el-row class="row-1">
        <el-col :span="12">
          <div class>出生日期：{{unixToDate(babyInfo.birthdate)}}</div>
        </el-col>
        <el-col :span="12">
          <div class>出生孕周：{{babyInfo.pregnantweeks}}+{{babyInfo.pregnantdays}}</div>
        </el-col>
      </el-row>
      <el-row class="row-2">
        <el-col :span="12">
          <div class>预产期：{{unixToDate(babyInfo.predicted_birthdate)}}</div>
        </el-col>
        <el-col :span="12">
          <div class>年龄：{{babyInfo.week_age}}</div>
        </el-col>
      </el-row>
    </div>
    <div class="hr-color"></div>
    <div class="upload-area">
      <div class="filming-time">
        <el-row>
          <el-col :span="3">
            <div class>拍摄时间：</div>
          </el-col>
          <el-col :span="21">
            <div class>
              <el-date-picker
                v-model="videoTime"
                type="date"
                placeholder="请选择随访时间"
                value-format="timestamp"
              ></el-date-picker>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="upload">
        <el-row>
          <el-col :span="3">
            <div class="uploadName">上传视频：</div>
          </el-col>
          <el-col :span="21">
            <div id="demo">
              <el-upload
                action
                ref="upload"
                :http-request="handleUpload"
                :show-file-list="false"
                :file-list="fileList"
                :before-upload="beforeUploadVideo"
                :limit="1"
                :on-exceed="handleExceed"
                accept="video/*"
              >
                <el-button type="primary">
                  <i class="el-icon-upload2"></i>
                  上传文件
                </el-button>
                <div slot="tip" class="el-upload__tip">支持扩展名：.mp4 .avi…</div>
              </el-upload>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="3" :span="21" class="upload-progress">
            <div class="upload-list">
              <div class="upload-item" v-for="(item,index) in fileList" :key="index">
                <el-col :span="1" class="el-icon-show">
                  <i class="el-icon-paperclip"></i>
                </el-col>
                <el-col :span="23">
                  <div class="progress-wrap">
                    <div class="upload-item-title">
                      <div>{{ item.name }}</div>
                      <i
                        class="el-icon-close"
                        @click="handleDeleteFile(index)"
                        v-if="item.progress == 100"
                      ></i>
                    </div>
                    <el-progress
                      :percentage="item.progress"
                      :status="item.upload_status"
                      :stroke-width="16"
                      :text-inside="true"
                    ></el-progress>
                  </div>
                </el-col>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="hr-color last"></div>
    <div class="submit">
      <span class="cancel" @click="cancelUpload">取消</span>
      <el-button type="primary" @click="saveUpload">保存</el-button>
    </div>
  </div>
</template>
<script>
import { getStorageInfo } from "../../common/getStorageInfo";
import { unixToDate } from "../../common/timeChange";
import "../../statics/utils/cos-js-sdk-v5.min.js";
export default {
  name: "",
  props: {
    sheet_id: {
      required: true
    }
  },
  data() {
    return {
      fileList: [], //上传文件列表
      videoTime: new Date().getTime(),
      cos: null, // 腾讯云sdk cos对象的实例
      media_id: "", // 视频id
      canSave: false,
      babyInfo: {
        baby_name: "",
        registid: "",
        birthdate: "",
        pregnantweeks: "",
        pregnantdays: "",
        predicted_birthdate: "",
        week_age: ""
      },
      //上传成功保存需要的数据
      uploadDate: {
        bucket: "",
        region: "",
        path: "",
        filename: "",
        registid: "",
        taken_time: ""
      }
    };
  },
  methods: {
    unixToDate(unix) {
      return unixToDate(unix);
    },
    cancelUpload() {
      this.$emit("close-dialog", "uploadVideoVisible");
    },
    saveUpload() {
      if (this.canSave) {
        this.$axios({
          method: "post",
          url: "/gms/doctor/gms-report/uploaded",
          headers: {
            userid: getStorageInfo().userid,
            token: getStorageInfo().token
          },
          data: this.uploadDate
        }).then(res => {
          if (res.data.result === 0) {
            this.$emit("close-dialog", "uploadVideoVisible");
            this.$message.success("保存成功");
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        this.$message("请先上传视频");
      }
    },
    //获取用户信息
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
    },
    //文件限制每次上传一个
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //上传前检查视频格式
    beforeUploadVideo(file) {
      if (!/^video/.test(file.type)) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
    },
    //清空上传列表，不会删除上传的文件,清除后无法保存，需要重新上传
    handleDeleteFile(index) {
      this.$confirm("您确定取消上传该文件吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.fileList.splice(index, 1);
          this.canSave = false
        })
        .catch(() => {
          console.log("已取消清除");
        });
    },
    //覆写el-upload上传行为
    handleUpload(param) {
      let self = this;
      let file = param.file;
      console.log(param);
      if (!file) return;
      this.fileList.push({
        name: file.name,
        progress: 0,
        upload_status: "text"
      });
      var current_index = this.fileList.length - 1;
      this.$axios({
        method: "post",
        url: "/gms/doctor/gms-report/get-sts",
        headers: {
          userid: getStorageInfo().userid,
          token: getStorageInfo().token
        },
        data: {
          sheet_id: this.sheet_id
        }
      }).then(res => {
        if (res.data.result) {
          this.$message.error(res.data.message);
          // this.fileList.splice(current_index, 1);
        } else {
          let result = res.data.data;
          // 获取临时密匙
          this.cos = new COS({
            getAuthorization: function(options, callback) {
              callback({
                TmpSecretId: result.credentials.tmpSecretId,
                TmpSecretKey: result.credentials.tmpSecretKey,
                XCosSecurityToken: result.credentials.sessionToken,
                ExpiredTime: result.expiredTime
              });
            }
          });
          let bucket = result.bucket;
          let region = result.region;
          let path = result.path;
          let requestId = result.requestId;
          //上传数据对象
          this.cos.putObject(
            {
              Bucket: bucket,
              Region: region,
              Key: path + file.name,
              Body: file,
              onProgress: function(progressData) {
                console.log(progressData);
                self.fileList[current_index].progress = parseInt(
                  progressData.percent * 100
                );
              }
            },
            //上传成功或者失败的回调函数
            function(err, data) {
              console.log(err || data);
              if (err) {
                self.$message.error({
                  message: err.error.Message
                });
                self.fileList[current_index].upload_status = "exception";
              } else {
                self.fileList[current_index].upload_status = "success";
                self.$message.success({
                  message: "上传成功"
                });
                //上传成功后使用，点击保存的接口需要的数据
                self.canSave = true;
                self.uploadDate = {
                  bucket: bucket,
                  region: region,
                  path: path,
                  filename: file.name,
                  requestid: requestId,
                  sheet_id: self.sheet_id,
                  taken_time: parseInt(self.videoTime / 1000)
                };
              }
            }
          );
        }
      });
    }
  },
  created() {
    this.getBabyInfo();
    this.$bus.$on("re-upload",()=>{
      this.fileList = [],
      this.canSave = false
    })
  },
  watch: {
    sheet_id: function(newValue, oldValue) {
      this.getBabyInfo();
    }
  }
};
</script>
<style lang="less">
.gmslist-box {
  .list {
    .upload-video-wrapper {
      .el-dialog__body {
        padding: 28px 20px 17px 20px;
      }
      .upload {
        .el-button--primary {
          color: rgba(70, 70, 70, 1);
          background: rgba(255, 255, 255, 1);
          font-size: 12px;
          border: 1px solid rgba(159, 175, 203, 0.3);
        }

        .el-button {
          border-radius: 3px;
          padding: 0;
          width: 88px;
          height: 27px;
        }
        .el-upload-list__item:first-child {
          margin-top: 5px;
        }
        .el-upload-list__item-name {
          padding-left: 0;
        }
        .el-upload__tip {
          margin-bottom: 7px;
          color: rgba(0, 0, 0, 0.45);
        }
        .el-progress-bar {
          padding-right: 10px;
          margin-right: 0px;
        }
      }
      .submit {
        .el-button--primary {
          color: #fff;
          background-color: #37b3e2;
          border-color: #37b3e2;
        }
        .el-button {
          padding: 0;
          width: 67px;
          height: 30px;
        }
      }
      .el-input__inner {
        height: 27px;
        line-height: 27px;
        width: 160px;
      }
      .el-input__icon {
        height: 27px;
        line-height: 27px;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.upload-video-wrapper {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(70, 70, 70, 1);
  padding: 0 5px;
  line-height: 17px;
  .hr-color {
    border-bottom: 1px solid rgba(159, 175, 203, 0.4);
    &.last {
      margin: 0 -22px;
    }
  }
  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 17px;
    margin-top: 8px;
    .start {
      font-size: 17px;
      .name {
        color: #464646;
      }
      .register-number {
        color: #aaaaaa;
      }
    }
    .brith-date {
      color: #aaaaaa;
    }
  }
  .user-details {
    margin: 17px 0;
    .row-1 {
      margin-bottom: 15px;
    }
  }
  .upload-area {
    margin: 17px 0 22px;
    .filming-time {
      padding-bottom: 8px;
      .el-col {
        height: 27px;
        line-height: 27px;
      }
    }
    .uploadName {
      height: 27px;
      line-height: 27px;
    }
    .upload-item-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
    }
    .el-icon-close {
      margin-right: 15px;
      font-size: 14px;
      cursor: pointer;
    }
    .el-icon-show {
      display: flex;
      justify-content: center;
      align-items: center;
      .el-icon-paperclip {
        font-size: 20px;
        padding-top: 5px;
      }
    }
    .progress-wrap {
      margin-left: 6px;
    }
  }
  .submit {
    text-align: right;
    margin-top: 17px;
    .cancel {
      display: inline-block;
      margin-right: 25px;
      color: rgba(170, 170, 170, 1);
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
