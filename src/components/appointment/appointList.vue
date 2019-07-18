<template>
  <div class="content-box">
    <div class="content">
      <div class="yuyue">
        <div class="container">
          <div class="form-box">
            <el-form
              class="yuyue-form"
              ref="form"
              :model="form"
              :label-position="labelPosition"
              label-width="80px"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="母亲身份证号" prop="motherId">
                    <el-input placeholder="请输入内容" v-model="form.motherId">
                      <template slot="append">
                        <el-button type="primary" class="getButton" @click="getInfo">获取信息</el-button>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="患者姓名" prop="babyName">
                    <el-input placeholder="请输入" v-model="form.babyName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出生日期" prop="birthday">
                    <el-date-picker
                      style="width: 100%;"
                      placeholder="请输入"
                      v-model="form.birthday"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      popper-class="chusheng"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择">
                      <el-option key="0" label="女" value="0"></el-option>
                      <el-option key="1" label="男" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="预产期" prop="pagentDate">
                    <el-date-picker
                      type="date"
                      placeholder="请选择"
                      v-model="form.pagentDate"
                      style="width: 100%;"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      popper-class="yuchang"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出生孕周" prop="pagentWeek">
                    <!-- <el-input placeholder="请输入" v-model="form.name"></el-input> -->
                    <div class="weeks">
                      <el-input
                        v-model="form.pagentWeek"
                        placeholder="请输入内容"
                        class="week"
                        type="text"
                      ></el-input>
                      <el-input
                        v-model="form.pagentDay"
                        placeholder="请输入内容"
                        class="week day"
                        type="text"
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出生体重" prop="weight">
                    <el-input type="text" placeholder="请输入内容" v-model="form.weight">
                      <i slot="suffix" class="el-input__icon" style="margin-right:10px;">g</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="分娩方式：" prop="pagentStyle">
                    <el-select v-model="form.pagentStyle" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in type"
                        :key="index"
                        :label="item"
                        :value="item"
                      ></el-option>
                      <!-- <el-option key="1" label="顺产" value="1"></el-option>
                      <el-option key="2" label="刨宫产" value="2"></el-option>
                      <el-option key="3" label="臀助产" value="3"></el-option>
                      <el-option key="4" label="非产房生产" value="4"></el-option>-->
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系电话：" prop="phone">
                    <el-input placeholder="请输入" v-model="form.phone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否正在住院：" prop="isHospital">
                    <el-select v-model="form.isHospital" placeholder="请选择">
                      <el-option key="1" label="是" value="1"></el-option>
                      <el-option key="0" label="否" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8" v-if="form.isHospital == 1">
                  <el-form-item label="住院病区：" prop="hospitalArea">
                    <el-input placeholder="请输入" v-model="form.hospitalArea"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.isHospital == 1" prop="hospitalNumber">
                  <el-form-item label="床位号：">
                    <el-input placeholder="请输入" v-model="form.hospitalNumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开单医生：" prop="doctor">
                    <el-input placeholder="请输入" v-model="form.doctor"></el-input>
                    <!-- <el-select v-model="doctor" placeholder="请选择">
                      <el-option label="李医生" value="1"></el-option>
                      <el-option label="张医生" value="2"></el-option>
                      <el-option label="冯医生" value="3"></el-option>
                      <el-option label="许医生" value="4"></el-option>
                    </el-select>-->
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="测评项目：">
                    <el-input placeholder="请输入测评项目" v-model="program" id="p" readonly="readonly">
                      <!-- <template slot="append">
                        <el-button
                          type="primary"
                          class="getButton"
                          @click="handleInputConfirm(program,tags1,1)"
                        >新增</el-button>
                      </template>-->
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="24">
                  <div class="yuyue-tag" v-if="tags1.length > 0">
                    <el-tag
                      :key="tag"
                      v-for="tag in tags1"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag,tags1)"
                    >{{tag}}</el-tag>
                  </div>
                </el-col>
              </el-row>-->
              <el-row>
                <el-col :span="8">
                  <el-form-item label="门诊诊断：">
                    <el-input placeholder="请输入诊断" v-model="diagnose" id="d">
                      <template slot="append">
                        <el-button
                          type="primary"
                          class="getButton"
                          @click="handleInputConfirm(diagnose,form.tags2,2)"
                        >新增</el-button>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="yuyue-tag" v-if="form.tags2.length > 0">
                    <el-tag
                      :key="tag"
                      v-for="tag in form.tags2"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag,form.tags2)"
                    >{{tag}}</el-tag>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="高危因素：">
                    <el-input placeholder="请输入高危因素" v-model="factor" id="f">
                      <template slot="append">
                        <el-button
                          type="primary"
                          class="getButton"
                          @click="handleInputConfirm(factor,form.tags3,3)"
                        >新增</el-button>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="yuyue-tag" v-if="form.tags3.length > 0">
                    <el-tag
                      :key="tag"
                      v-for="tag in form.tags3"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag,form.tags3)"
                    >{{tag}}</el-tag>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="bottom-btn">
                    <a
                      style="margin:0 30px;color:#37B3E2;text-decoration: underline;"
                      @click="reset()"
                    >重置</a>
                    <el-button
                      type="primary"
                      @click="onSubmit"
                      style="background:#37B3E2;padding:8px 16px;"
                    >表单提交</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title
      :visible.sync="infoVisible"
      width="70%"
      :before-close="closeDialog"
      class="report"
      custom-class="dialogClass"
    >
      <baby-list :baby="babyList" @selectBaby="selectBaby"></baby-list>
    </el-dialog>
  </div>
</template>
<script>
import { getStorageInfo } from "./../../common/getStorageInfo.js";
import { unixToDate } from "./../../common/timeChange.js";
import babyList from "./babyList";
export default {
  name: "appointList",
  components: {
    "baby-list": babyList
  },
  created() {
    this.getMenu();
  },
  data: function() {
    return {
      labelPosition: "top", //将label放在输入框上方
      infoVisible: false, //是否弹出多个宝宝信息里表
      baby_id: "",
      form: {
        motherId: "", //母亲身份证号
        babyName: "", //患者姓名
        birthday: "", //出生日期
        sex: "0", //性别
        pagentDate: "", //预产期
        pagentWeek: 0, //出生孕周
        pagentDay: 0, //
        weight: 0, //出生体重
        pagentStyle: "顺产", //分娩方式
        phone: "", //联系电话
        isHospital: "1", //是否正在住院
        hospitalArea: "", //住院病区
        hospitalNumber: "", //床位号

        doctor: "", //开单医生
        tags2: [], //门诊诊断tag
        tags3: [] //高危因素tag
      },
      program: "GMS", //测评项目
      diagnose: "", //门诊诊断
      factor: "", //高危因素
      // tags1: [], //测评项目tag
      type: [], //分娩方式
      babyList: []
    };
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
            this.type = res.data.data.delivers;
          }
        });
    },
    //母亲身份证获取信息
    getInfo() {
      this.$axios
        .post(
          "/gms/doctor/baby/get-by-moid",
          { moid: this.form.motherId },
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
            this.babyList = res.data.data.list;
            for(var i=0;i<this.babyList.length;i++){
                   this.babyList[i].sex = this.babyList[i].gender==0?'女':'男';
                   this.babyList[i].week_day= this.babyList[i].pregnantweeks+'周+'+this.babyList[i].pregnantdays+'天';
            }
            var data = res.data.data.list[0];
            if (this.babyList.length >= 2) {
              this.infoVisible = true;
            } else if(this.babyList.length<=0){
              confirm('身份证号为：'+this.form.motherId+'的妈妈暂时没有宝宝信息,请添加');
            }else{
              this.baby_id = data.id;
              this.form.babyName = data.name;
              this.form.birthday = data.birth_str;
              this.form.sex = data.gender.toString();
              this.form.pagentDate = unixToDate(data.predicted_birthdate);
              this.form.pagentWeek = data.pregnantweeks;
              this.form.pagentDay = data.pregnantdays;
              this.form.weight = data.birth_weight;
              this.form.pagentStyle = this.type[data.deliver_type];
              this.form.phone = data.mobile;
              // this.factor = data.risks;
              if (data.risks != "") {
                this.tags3 = data.risks.split(",");
              }
            }
          }
        });
    },
    reset() {
      if (confirm("填写数据将被清空，是否确认重置数据")) {
        this.form.tags2 = [];
        this.form.tags3 = [];
        this.form.pagentDay = "";
        this.$refs.form.resetFields();
      }
    },
    onSubmit() {
      if (
        this.form.motherId == "" ||
        this.baby_id == "" ||
        this.form.babyName == "" ||
        this.form.pagentWeek == "" ||
        this.form.pagentDay == "" ||
        this.form.weight == "" ||
        this.form.phone == "" ||
        this.form.doctor == "" 
      ) {
        this.$message("请将信息填写完整");
        return;
      }
      if(this.form.isHospital==1){
        if(this.form.hospitalArea == '' || this.form.hospitalNumber == ""){
           this.$message("请将病区和床位填写完整");
           return;
        }
      }
      var birth = new Date(this.form.birthday).getTime() / 1000;
      var pagnant = new Date(this.form.pagentDate).getTime() / 1000;
      var types = this.type.indexOf(this.form.pagentStyle);
      this.$axios
        .post(
          "/gms/doctor/check/new-regist",
          {
            moidcard: this.form.motherId,
            baby_id: this.baby_id,
            baby_name: this.form.babyName,
            birthdate: birth,
            gender: this.form.sex,
            predicted_birthdate: pagnant,
            pregnantweeks: this.form.pagentWeek,
            pregnantdays: this.form.pagentDay,
            birth_weight: this.form.weight,
            deliver_type: types,
            mobile: this.form.phone,
            hospitalization: this.form.isHospital,
            hospital_zone: this.form.hospitalArea,
            hospital_bed: this.form.hospitalNumber,
            risks: this.form.tags3.toString(),
            doctor: this.form.doctor,
            diag: this.form.tags2.toString(),
            project: this.program
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
            this.$message.error(res.data.message);
          } else {
            console.log(res.data.data);
            this.$router.push("/challengeList");
          }
        });
    },
    handleClose(tag, tags) {
      tags.splice(tags.indexOf(tag), 1);
    },
    closeDialog() {
      this.infoVisible = false;
    },
    selectBaby(index) {
      console.log(index);
      var data = this.babyList[index];
      this.baby_id = data.id;
      this.form.babyName = data.name;
      this.form.birthday = data.birth_str;
      this.form.sex = data.gender.toString();
      this.form.pagentDate = unixToDate(data.predicted_birthdate);
      this.form.pagentWeek = data.pregnantweeks;
      this.form.pagentDay = data.pregnantdays;
      this.form.weight = data.birth_weight;
      this.form.pagentStyle = this.type[data.deliver_type];
      this.form.phone = data.mobile;
      // this.factor = data.risks;
      if (data.risks != "") {
        this.form.tags3 = data.risks;
      }
      this.closeDialog();
    },
    handleInputConfirm(model, tags, flag) {
      if (model) {
        tags.push(model);
      }
      console.log(model);
      if (flag == 1) {
        this.program = "";
      }
      if (flag == 3) {
        this.factor = "";
      }
      if (flag == 2) {
        this.diagnose = "";
      }
    }
  }
};
</script>
<style lang='less'>
.yuyue {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 3px 0px rgba(103, 113, 147, 0.3);
  border-radius: 5px;
  border: 1px solid rgba(159, 175, 203, 0.4);
  min-width: 950px;
  padding: 10px 20px;
  .el-input-group__append {
    background: rgba(55, 179, 226, 1);
    border-radius: 0px 3px 3px 0px;
    border: 1px solid rgba(55, 179, 226, 1);
    font-size: 11px;
    color: rgba(255, 255, 255, 1);
  }

  .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .el-form-item__label {
    height: 28px;

    padding: 0;
    font-size: 12px;
    font-weight: 400;
    color: rgba(70, 70, 70, 1);
    line-height: 28px;
  }
  .el-form-item {
    margin-bottom: 0px;
    width: 90%;
  }
  .el-select {
    display: block;
  }
  .yuyue-tag {
    margin: 10px auto;
  }
  .yuyue-tag .el-tag {
    margin-right: 10px;
    background: #fff;
    color: #464646;
    border: 1px solid #9fafcb;
    height: 28px;
    line-height: 26px;
  }
  .yuyue-tag .el-tag:hover {
    border-color: #37b3e2;
  }
  .yuyue-tag .el-tag .el-icon-close {
    color: #aaaaaa;
  }
  .yuyue-tag .el-tag .el-icon-close:hover {
    background-color: #37b3e2;
    color: #fff;
  }
  .bottom-btn {
    text-align: center;
    margin: 20px auto;
  }
  .form-box .el-row .el-col {
    margin-top: 6px;
  }
  .weeks {
    display: flex;
    justify-content: flex-start;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    height: 38px;
    line-height: 38px;
  }
  .week {
    position: relative;
  }
  .week input {
    border: 0;
  }
  .week::after {
    content: "周 |";
    position: absolute;
    top: 0;
    right: 0px;
    color: #dcdfe6;
  }
  .week.day::after {
    content: "天";
    position: absolute;
    top: 0;
    right: 4px;
    color: #dcdfe6;
  }
  .yuyue-form .el-input__inner {
    height: 35px;
    line-height: 35px;
  }
}
.el-popper[x-placement^="bottom"] {
  margin-top: 0px;
}
.dialogClass {
        left:100px;
  .el-dialog__body,
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn {
    position: absolute;
    top: 10px;
  }
  .el-icon-close:before {
    content: "关闭";
    font-size: 10px;
    color: #37b3e2;
    text-decoration: underline;
  }
}
//  .el-popper[x-placement^=bottom].chusheng {
//     margin-top: 12px;
// }
.el-popper[x-placement^="bottom"].yuchang {
  margin-top: 32px;
}
</style>


