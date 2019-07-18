<template>
  <div class="patient-infomation">
    <el-form ref="patientForm" :model="form" :label-position="labelPosition" label-width="80px">
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="登记号：">
            <el-input v-model="form.registrationNumber" :disabled="true" class="disabled-color"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="患者姓名：" prop="name">
            <el-input v-model="form.name" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出生日期：" prop="dateOfBirth">
            <el-date-picker
              v-model="form.dateOfBirth"
              type="date"
              placeholder="选择日期"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别：" prop="gender">
            <el-select v-model="form.gender" placeholder="请选择">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="预产期：" prop="expectedDate">
            <el-date-picker
              v-model="form.expectedDate"
              type="date"
              placeholder="选择日期"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出生孕周：" prop="gestationalWeek">
            <el-input
              v-model="form.gestationalWeek"
              placeholder="请输入内容"
              class="Gestationa no-border-right"
              type="number"
            ></el-input>
            <el-input
              v-model="form.gestationalDay"
              placeholder="请输入内容"
              class="Gestationa day no-border-left"
              type="number"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出生体重：" prop="weight">
            <el-input v-model="form.weight" placeholder="请输入内容" class="weight" type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="分娩方式：" prop="deliveryMode">
            <el-select v-model="form.deliveryMode" placeholder="请选择">
              <el-option
                v-for="(value,index) in manual.delivers"
                :key="index"
                :label="value"
                :value="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话：" prop="tellphone">
            <el-input v-model="form.tellphone" placeholder="请输入内容" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否正在住院：" prop="hospitalization">
            <el-select v-model="form.hospitalization" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="8" :class="ifhospitalization">
          <el-form-item label="住院病区：" prop="ward">
            <el-input v-model="form.ward" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :class="ifhospitalization">
          <el-form-item label="床位号：" prop="bedNumber">
            <el-input v-model="form.bedNumber" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开单医生：" prop="doctor">
            <el-input v-model="form.doctor" placeholder="请输入内容" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="测评项目：">
            <el-input v-model="form.evalution" placeholder="请输入内容" :disabled="true">
              <!-- <el-button slot="append" @click="handleConfirm('evalution')">新增</el-button> -->
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- <div class="tag">
          <el-tag
            :key="tag"
            v-for="tag in evalutionTags"
            closable
            :disable-transitions="false"
            @close="handleCloseTag('evalutionTags',tag)"
          >{{tag}}</el-tag>
        </div>-->
      </el-row>
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="门诊诊断：">
            <el-input v-model="diagnous" placeholder="请输入内容">
              <el-button slot="append" @click="handleConfirm('diagnous')">新增</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <div class="tag">
          <el-tag
            :key="tag"
            v-for="tag in form.diagnousTags"
            closable
            :disable-transitions="false"
            @close="handleCloseTag('diagnousTags',tag)"
          >{{tag}}</el-tag>
        </div>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="高危因素：">
            <el-input v-model="highRisk" placeholder="请输入内容">
              <el-button slot="append" @click="handleConfirm('highRisk')">新增</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <div class="tag">
          <el-tag
            :key="tag"
            v-for="tag in form.highRiskTags"
            closable
            :disable-transitions="false"
            @close="handleCloseTag('highRiskTags',tag)"
          >{{tag}}</el-tag>
        </div>
      </el-row>
      <el-row>
        <el-form-item>
          <div class="complete">
            <span class="reset" @click="reset('patientForm')">重置</span>
            <el-button type="primary" class="submit" @click="submit">完成登记</el-button>
          </div>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getStorageInfo } from "../../common/getStorageInfo";
import { Stream } from "stream";
import { scrypt } from 'crypto';
export default {
  name: "patientInfomation",
  props: {
    sheet_id: {
      required: true
    },
    manual: {
      required: true
    }
  },
  data() {
    return {
      form: {
        registrationNumber: "", //登记号
        name: "", //患者姓名
        gender: "", // 性别
        dateOfBirth: null, //出生日期
        expectedDate: 0, // 预产期
        gestationalWeek: "", //出生孕周
        gestationalDay: "", // 出生孕天
        weight: "",
        deliveryMode: "", // 分娩方式
        tellphone: "",
        hospitalization: "", //是否住院
        ward: "", //住院病区
        bedNumber: "", //床号
        doctor: "", //开单医生
        highRiskTags: [], //高危因素
        // evalutionTags: [], //测评项目
        diagnousTags: [] //门诊诊断
      },
      labelPosition: "top",
      highRisk: "", //添加高危因素
      evalution: "", //添加测评项目
      diagnous: "" // 添加门诊诊断
    };
  },
  computed: {
    ifhospitalization() {
      return {
        ifhospitalization: this.form.hospitalization == "0" ? true : false
      };
    }
  },
  methods: {
    handleCloseTag(tags, tag) {
      this.form[tags].splice(this.form[tags].indexOf(tag), 1);
    },
    handleConfirm(style) {
      if (this[style]) {
        let tag = style + "Tags";
        this.form[tag].push(this[style]);
      }
      this[style] = "";
    },
    submit() {
      let canSend = true;
      let ob = this.form
      for (const key in ob) {
        const element = ob[key];
        if (element === "") {
          console.log(key);
          canSend = false;
        }
      }
      if (canSend) {
        this.sendInfo();
      } else {
        this.$message("请将信息填写完整");
      }
    },
    reset(patientForm) {
      this.$confirm("此操作将重置为空值, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs[patientForm].resetFields();
          this.form.gestationalDay = "";
          this.$message({
            type: "success",
            message: "重置成功!"
          });
        })
        .catch(() => {});
    },
    sendInfo() {
      return this.$axios({
        method: "post",
        url: "/gms/doctor/check/save-regist",
        headers: {
          userid: getStorageInfo().userid,
          token: getStorageInfo().token
        },
        data: {
          sheet_id: this.sheet_id,
          moidcard: this.form.moidcard,
          baby_name: this.form.name,
          birthdate: parseInt(this.form.dateOfBirth / 1000) ,
          gender: Number(this.form.gender),
          predicted_birthdate: parseInt(this.form.expectedDate / 1000),
          pregnantweeks: this.form.gestationalWeek,
          pregnantdays: this.form.gestationalDay,
          birth_weight: this.form.weight,
          deliver_type: this.form.deliveryMode,
          mobile: this.form.tellphone,
          hospitalization: Number(this.form.hospitalization),
          hospital_zone: this.form.ward,
          hospital_bed: this.form.bedNumber,
          risks: this.form.highRiskTags.join(",")
        }
      }).then(res => {
        if (res.data.result == 0) {
          this.$message({
            type: "success",
            message: "登记完成!"
          });
          this.$emit("close-dialog", "informationVisible");
        } else {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
      });
    },
    getInfo() {
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
        console.log(res);
        if (res.data.result == "0") {
          let information = res.data.data;
          let form = this.form;
          form.registrationNumber = information.registid;
          form.moidcard = information.moidcard;
          form.name = information.baby_name;
          form.gender = String(information.gender);
          form.dateOfBirth = information.birthdate * 1000;
          form.expectedDate = information.predicted_birthdate * 1000;
          form.gestationalWeek = information.pregnantweeks;
          form.gestationalDay = information.pregnantdays;
          form.weight = information.birth_weight;
          form.deliveryMode = information.deliver_type;
          form.tellphone = information.mobile;
          form.hospitalization = String(information.hospitalization);
          form.ward = information.hospital_zone;
          form.bedNumber = information.hospital_bed;
          form.doctor = information.doctor;
          form.evalution = information.project;
          form.highRiskTags = information.risks.split(",");
          // this.evalutionTags = information.project.split(",");
          form.diagnousTags = information.diag.split(",");
        }
      });
    }
  },
  watch: {
    sheet_id: function(newValue, oldValue) {
      this.getInfo();
      console.log(this.sheet_id);
    }
  },
  created() {
    this.getInfo();
  }
};
</script>
<style lang="less">
.gmslist-box {
  .list {
    .watch-patient-wrapper {
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
      }
      .el-input-group__append,
      .el-input-group__prepend {
        background-color: #37b3e2;
        color: #ffffff;
        border: 1px solid #37b3e2;
      }
      .el-form-item {
        margin-bottom: 17px;
        &:last-child {
          margin-bottom: 8px;
        }
      }
      .el-form-item__label {
        font-size: 12px;
        color: #464646;
        line-height: 22px;
        padding: 0 12px 0 0;
      }
      .el-dialog__header {
        padding: 0;
      }
      .el-date-editor.el-input {
        width: 100%;
      }
      .el-input__icon {
        height: 35px;
        line-height: 35px;
      }
      .el-input__inner {
        border: 1px solid rgba(159, 175, 203, 0.3);
        color: rgba(70, 70, 70, 1);
        height: 35px;
      }
      .no-border-right {
        .el-input__inner {
          border-right: 0px;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
      .no-border-left {
        .el-input__inner {
          border-left: 0px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
      .disabled-color {
        .el-input__inner {
          color: #aaaaaa;
        }
      }
      .el-tag {
        color: #37b3e2;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(159, 175, 203, 0.3);
        border-radius: 6px;
        margin-right: 14px;
        color: rgba(70, 70, 70, 1);
      }
      .el-icon-close {
        color: rgba(70, 70, 70, 1);
      }
      .el-select {
        width: 100%;
      }
      .el-button--primary {
        color: #fff;
        background-color: #37b3e2;
        border-color: #37b3e2;
      }
    }
  }
}
</style>


<style lang="less" scoped>
.patient-infomation {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(70, 70, 70, 1);
  padding: 0 33px;
}
.ifhospitalization {
  display: none;
}
.complete {
  text-align: center;
  .reset {
    margin-right: 55px;
    text-decoration: underline;
    color: #37b3e2;
    cursor: pointer;
  }
}

.Gestationa {
  width: 50%;
  position: relative;
}
.after {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  color: rgba(170, 170, 170, 0.7);
}
.Gestationa::after {
  content: "周 |";
  .after;
  right: 0;
}
.day.Gestationa::after {
  content: "天";
  right: 10px;
}
.weight::after {
  content: "g";
  .after;
  right: 10px;
}
</style>
