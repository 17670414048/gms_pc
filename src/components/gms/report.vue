<template>
  <div class="report">
    <div class="title-wrapper">
      <h1 class="hospital">深圳市宝安区妇幼保健院</h1>
      <h3 class="title">全身运动（GMs）质量评估报告单</h3>
    </div>
    <div class="content-wrapper">
      <div class="infomation report-padding">
        <div class="row-1">
          <el-row :gutter="24">
            <el-col :span="4">
              <div class>姓名：{{name}}</div>
            </el-col>
            <el-col :span="4">
              <div class>性别：{{gender}}</div>
            </el-col>
            <el-col :span="6">
              <div class>出生日期：{{birthdate | gen_timeToDate}}</div>
            </el-col>
            <el-col :span="5">
              <div class>周龄：{{week_age}}</div>
            </el-col>
            <el-col :span="5" class="gms-number">
              <div class>GMS编号：{{code}}</div>
            </el-col>
          </el-row>
        </div>
        <div class="row-2">
          <el-row :gutter="24">
            <el-col :span="19">
              <div class>出生孕周：{{pregnantweeks}}周+{{pregnantdays}}天</div>
            </el-col>
            <el-col :span="5" class="gms-number">
              <div class>评估时间：{{gen_timeshow | gen_timeToDate}}</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="line"></div>
      <div class="result report-padding-content">
        <div class="result-title">评估结果：</div>
        <div class="result-select">
          <el-select v-model="resultSelect" placeholder="请选择">
            <el-option
              v-for="(value, name, index) in manual.results"
              :key="index"
              :label="value.name"
              :value="name"
            ></el-option>
          </el-select>
        </div>
        <div class="result-content">{{resultDescription}}</div>
      </div>
      <div class="advice-again report-padding-content">
        <div class="result-title">复诊建议</div>
        <div class="advice-1">1. 门诊随诊</div>
        <div class="advice-2">
          <span>2. 下次评估日期：</span>
          <el-date-picker
            v-model="next_time"
            type="date"
            placeholder="选择日期"
            value-format="timestamp"
          ></el-date-picker>
        </div>
      </div>
      <div class="advice-early report-padding-content">
        <div class="result-title">早期干预建议：</div>
        <div class="advice-content">儿童心理行为康复科门诊定期随诊。多次GMs评估，获得运动发育轨迹能够更好的预测远期脑发育情况。</div>
        <div class="advice-select-input">
          <el-select v-model="InterventionAdvice" placeholder="请选择">
            <el-tooltip
              placement="top"
              effect="light"
              transition
              v-for="(value,index) in manual.suggest"
              :key="index"
            >
              <div slot="content">
                {{value.substr(0,70)}}
                <br>
                {{value.substr(70)}}
              </div>
              <el-option :label="value.substr(0,50) + '.....'" :value="value"></el-option>
            </el-tooltip>
          </el-select>
          <el-input
            class="suggest-content"
            type="textarea"
            autosize
            placeholder="请选择内容"
            resize="none"
            v-model="InterventionAdvice"
          ></el-input>
        </div>
      </div>
      <div class="attention report-padding-content">
        <div class="result-title">注意事项：</div>
        <div class="attention-content">复评请到儿童心理行为康复科。请选择孩子状态良好、身体健康时前来，若当日不能来真，请于随访日期后一周内完成随访。预约电话27863999-8407。开诊时间周一至周五上午8：00~12：00，下午2：00~5：00。</div>
      </div>
    </div>
    <div class="submit report-padding-content">
      <span class="cancle" @click="cancel">取消</span>
      <el-button type="primary" @click="completeReport">{{reportStatusShow}}</el-button>
    </div>
  </div>
</template>
<script>
import { unixToDate } from "../../common/timeChange.js";
import { getStorageInfo } from "../../common/getStorageInfo";
import { Promise } from "q";
import { timingSafeEqual } from "crypto";

export default {
  name: "report",
  props: {
    reportStatus: {
      type: String,
      required: true
    },
    sheet_id: {
      required: true
    },
    manual: {
      required: true
    }
  },
  data() {
    return {
      resultSelect: "",
      InterventionAdvice: "", 
      name: "",
      gender: "",
      birthdate: "",
      week_age: "",
      code: "",
      pregnantweeks: "",
      pregnantdays: "",
      gen_time: 0,
      next_time: "" //下次评估时间
    };
  },
  filters: {
    gen_timeToDate(unixTime) {
      return unixToDate(unixTime);
    }
  },
  computed: {
    reportStatusShow() {
      if (this.reportStatus == "create") {
        return "创建报告";
      } else if (this.reportStatus == "edit") {
        return "保存编辑";
      }
    },
    resultDescription() {
      if (this.manual && this.resultSelect) {
        // console.log(this.resultSelect);
        return this.manual.results[this.resultSelect]["desc"];
      }
    },
    ifHoverShow() {
      return !Boolean(this.InterventionAdvice);
    },
    gen_timeshow() {
      if (this.reportStatus == "edit") {
        return this.gen_time;
      } else if (this.reportStatus == "create") {
        return new Date().getTime() / 1000;
      }
    }
  },
  methods: {
    cancel() {
      this.$emit("cancel", "reportVisible");
      // this.resultSelect = "";
      // this.InterventionAdvice = "";
    },
    requestAxios({ url, data = {} }) {
      return new Promise((reslove, reject) => {
        this.$axios({
          method: "post",
          url,
          headers: {
            userid: getStorageInfo().userid,
            token: getStorageInfo().token
          },
          data
        }).then(res => {
          if (res.data.result == "0") {
            reslove(res.data);
          } else {
            reject(res.data);
          }
        });
      });
    },
    getReportDetails() {
      let manual = this.manual.results;
      this.requestAxios({
        url: "/gms/doctor/gms-report/detail",
        data: { sheet_id: this.sheet_id }
      }).then(res => {
        let information = res.data;
        this.name = information.baby_name;
        this.gender = information.gender;
        this.birthdate = information.birthdate;
        this.week_age = information.week_age;
        this.code = information.code;
        this.pregnantweeks = information.pregnantweeks;
        this.pregnantdays = information.pregnantdays;
        this.gen_time = information.gen_time;
        this.next_time =
          Number(information.next_time) * 1000 || new Date().getTime();
        for (const key in manual) {
          const element = manual[key];
          if (element.name === information.result) {
            this.resultSelect = key;
            break;
          }
        }
        this.InterventionAdvice = information.suggest;
      });
    },
    completeReport() {
      let url;
      let message;
      if (this.reportStatus == "edit") {
        url = "/gms/doctor/gms-report/update";
        message = "更新";
      } else if (this.reportStatus == "create") {
        url = "/gms/doctor/gms-report/create";
        message = "创建";
      }
      if (
        this.resultSelect === "" ||
        this.next_time === null ||
        this.InterventionAdvice === ""
      ) {
        this.$message("请将信息填写完整");
      } else {
        this.requestAxios({
          url,
          data: {
            sheet_id: this.sheet_id,
            result_code: this.resultSelect,
            next_time: parseInt(this.next_time / 1000),
            suggest: this.InterventionAdvice
          }
        })
          .then(res => {
            this.$emit("close-dialog", "reportVisible");
            this.$message.success(`${message}成功`);
          })
          .catch(res => {
            this.$message.error(res.message);
          });
      }
    }
  },
  watch: {
    sheet_id: function() {
      this.getReportDetails();
    }
  },
  created() {
    this.getReportDetails();
  }
};
</script>
<style lang="less">
.gmslist-box {
  .list {
    .watch-report-wrapper {
      .el-input__inner {
        border: 1px solid rgba(159, 175, 203, 0.3);
        color: rgba(70, 70, 70, 1);
      }
      .el-dialog__body {
        padding-bottom: 30px;
        color: #606266;
        font-size: 14px;
        word-break: break-all;
      }
      .el-select {
        width: 100%;
      }
      .el-textarea__inner {
        padding-left: 15px;
        padding-right: 40px;
      }
      .advice-select-input {
        .el-input__suffix {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 10;
        }
      }
      .el-input__inner {
        height: 27px;
        line-height: 27px;
      }
      .el-input__icon {
        height: 27px;
        line-height: 27px;
      }
      .el-date-editor.el-input {
        width: 135px;
      }
      .el-button {
        padding: 0;
        width: 175px;
        height: 30px;
        background: rgba(55, 179, 226, 1);
        border-radius: 5px;
        border: 1px solid rgba(55, 179, 226, 1);
      }
    }
  }
}
</style>

<style lang="less" scoped>
div,
span {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(70, 70, 70, 1);
  line-height: 17px;
}
// .report {
//   min-width: 1200px;
// }
.title-wrapper {
  padding-top: 43px;
}
.report-padding {
  padding: 0 10px 0px 83px;
}
.report-padding-content {
  padding: 0 87px;
  margin-top: 30px;
}
.hospital {
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  line-height: 42px;
}
.title {
  font-size: 23px;
  font-weight: 600;
  text-align: center;
  line-height: 33px;
}
.row-1 {
  margin-bottom: 20px;
}
.content-wrapper {
  margin-top: 30px;
}
.line {
  margin: 30px 0;
  height: 1px;
  border: 1px solid rgba(159, 175, 203, 0.4);
}
.result-title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 11px;
  margin-top: 37px;
}
.result {
  .result-content {
    margin-top: 11px;
  }
}
  .attention {
    margin-top: 70px;
  }
.advice-select-input {
  position: relative;
}
.advice-content {
  margin-bottom: 5px;
}
.advice-again {
  .advice-1 {
    margin-bottom: 5px;
  }
}
.suggest-content {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.submit {
  text-align: right;
  margin-top: 50px;
  .cancle {
    display: inline-block;
    text-decoration: underline;
    color: rgba(170, 170, 170, 1);
    margin-right: 55px;
    cursor: pointer;
  }
}
</style>



