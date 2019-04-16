<template>
  <el-container>
    <el-header style="text-align: center">{{title}}</el-header>
    <el-main>
      <h3>编辑活动：</h3>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动描述" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="活动日期" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择开始日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            <el-date-picker type="date" placeholder="选择结束日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
       </el-form-item>
        <el-form-item label="咨询联系" prop="contact">
          <el-input v-model="ruleForm.contact" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="活动内容" prop="isAll">
          <el-radio-group v-model="ruleForm.isAll">
            <el-radio label="no">可选参加</el-radio>
            <el-radio label="yes">全部参加</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
          <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
        <!--</el-form-item>-->
      </el-form>
      <h3>编辑活动内容：</h3>
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item
          v-for="(act, index) in dynamicValidateForm.activates"
          :label="'活动内容' + index"
          :key="act.key"
          :rules="{
      required: true, message: '内容不能为空', trigger: 'blur'
    }"
        >
          <el-time-picker placeholder="选择开始时间" v-model="act.start_time" style="width: 100%;"></el-time-picker>
          <el-time-picker placeholder="选择结束时间" v-model="act.end_time" style="width: 100%;"></el-time-picker>
          <el-input v-model="act.charger" placeholder="内容负责人"></el-input>
          <el-input v-model="act.company" placeholder="公司"></el-input>
          <el-input v-model="act.address" placeholder="地址"></el-input>
          <el-input v-model="act.gps" placeholder="gps导航点"></el-input>
          <el-input v-model="act.bus_station" placeholder="交通指引"></el-input>
          <el-button @click.prevent="removeDomain(act)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <!--<el-button type="primary" @click="submitForm('ruleForm','dynamicValidateForm')">提交</el-button>-->
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="addDomain">新增活动内容</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        title: '创建新活动',
        ruleForm: {
          name: '江理深圳校友会2019新春团拜',
          contact: '虞娟:13510677587（电话/微信同号）；钟海18576636822(电话/微信同号) 报名活动后加联系人进入活动群。',
          date1: '2019-04-15',
          date2: '2019-04-15',
          isAll: 'yes',
          desc: '江西理工大学深圳校友联谊会的兄弟姐妹们，继春节前首批校友企业走访圆满成功，2019新春团拜第二场再次启程！\n' +
            '兹定于2019年3月10日(周日)进行校友企业走访，由王殿龙（会长）、杨志朝、潘玉东、胡水平四位会长承办，名额有限，满额截止。'
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          contact: [
            { required: true, message: '请输入活动联系人', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选日期', trigger: 'change' }
          ],
          isAll: [
            { required: true, message: '请选择是否全部参加活动', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动描述', trigger: 'blur' }
          ]
        },
        dynamicValidateForm: {
          activates: [{
            start_time: '',
            end_time: '',
            charger: '',
            company: '',
            address: '',
            gps: '',
            bus_station: ''
          }]
        }
      };
    },
    methods: {
      submitForm(actForm, contForm) {
        console.log('111=ruleForm>', this.ruleForm);
        console.log('222=dynamicValidateForm>', this.dynamicValidateForm);
        // this.$refs[actForm].validate((valid) => {
        //   if (valid) {
        //     console.log('actForm=>', actForm);
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
        // this.$refs[contForm].validate((valid) => {
        //   if (valid) {
        //     console.log('contForm=>', contForm);
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.activates.indexOf(item);
        if (index !== -1) {
          this.dynamicValidateForm.activates.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.activates.push({
          start_time: '',
          end_time: '',
          charger: '',
          company: '',
          address: '',
          gps: '',
          bus_station: '',
          key: Date.now()
        });
      }
    }
  }
</script>

<style scoped>

</style>
