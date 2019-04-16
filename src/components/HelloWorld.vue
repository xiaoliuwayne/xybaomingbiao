<template>
  <el-container>
    <el-header class="headset box2"><span style="width: 100%">{{title}}</span>
    </el-header>
    <span style="float: right;border: white 1px solid;margin-right: 40px;padding-top: 10px" >
    <router-link :to="{name:'Login', params: {'a_id': a_id}}" style="color:  #4f93ff;min-width: 90px;float: right">
    管理员登录
    </router-link>
    </span>
    <el-main>
      <div>
        <!--<img style="width: 100%" :src="description">-->
        <p>{{description}}</p>
        <p>日程安排如下：</p>
        <div v-for="(value,index) in act_contents" class="act">
          <p style="font-weight: bold">第{{index+1}}站：{{value.time_start}} - {{value.time_end}}
          {{value.charger}}{{value.company}}
          </p>
          <p>地址：{{value.addr}}</p>
          <p>GPS导航：{{value.gps}}</p>
          <p>公交站：{{value.bus_station}}</p>
        </div>
        <p style="color: #4f93ff">活动联系人：{{act_contact}}</p>
      </div>

      <p>带<span class="red-star">*</span>号为必填，报名项目选填</p>
      <span ><span class="red-star" >*</span>姓名</span><el-input  class="input-box"  v-model="name" placeholder="姓名"></el-input>
      <span><span class="red-star" >*</span>联系电话</span><el-input  class="input-box" v-model="phone"  placeholder="联系电话"></el-input>
      <span ><span class="red-star" >*</span>上车/驾车出发地点</span><el-input  class="input-box" v-model="departure" placeholder="上车/驾车出发地点"></el-input>
      <div>自驾车可载校友数</div>
        <el-select class="input-box" style="width: 100%" v-model="value" placeholder="请选择" @change=changeValue>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

      <div class="input-box">
        参与活动：
        <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
        <!--<div style="margin: 15px 0;"></div>-->
        <!--<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
          <!--<el-checkbox  border  v-for="city in cities" :label="city" :key="city">{{city}}-->
          <!--</el-checkbox>-->
        <!--</el-checkbox-group>-->
        <el-checkbox-group v-model="checkList" v-if="is_all==='yes'">
          <el-checkbox v-for="charger in chargers" :label="charger" disabled></el-checkbox>
        </el-checkbox-group>
        <el-checkbox-group v-model="checkList" v-else>
          <el-checkbox v-for="charger in chargers" :label="charger" ></el-checkbox>
        </el-checkbox-group>
      </div>
      <el-button style=" width: 100%" class="input-box" type="primary" plain  @click="submit()">立即报名</el-button>
      <!--<el-button style=" width: 100%;margin: 0px" type="primary" plain disabled>查看报名</el-button>-->
      <el-button style=" width: 100%;margin: 0px" type="primary" plain @click="toPeopleList()"  :disabled="flag">查看报名</el-button>
    </el-main>
  </el-container>
</template>

<script>
  var cityOptions = [];
export default {

  // name: 'HelloWorld',
  data () {
    return {
      title: '江理深圳校友会2019新春团拜',
      description: require('../assets/desc.jpg'),
      a_id:'',
      act_contact:'',
      act_start:'',
      act_end:'',
      is_all:'',
      act_contents:[],
      name:'',
      phone:'',
      departure:'',
      passenger:'',
      flag: true,
      checkList:[],
      chargers:[],
      chooseActId:[],

      options: [{
        value: '00',
        label: '无'
      }, {
        value: '01',
        label: '1'
      }, {
        value: '02',
        label: '2'
      }, {
        value: '03',
        label: '3'
      }, {
        value: '04',
        label: '4'
      }],
      value: '00',
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true
    }
  },
  created(){
    this.init();
  },
  methods: {
    // 获取最新的活动内容
    init(){
      let url = BaseUrl+'/actdetail';
      this.$http.get(url).then((res) => {
          // console.log('res',res);
          this.title = res.body.act_title;
          this.description = res.body.act_desc;
          this.a_id = res.body.a_id;
          this.act_contact = res.body.act_contact;
          this.act_start = res.body.act_start;
          this.act_end = res.body.act_end;
          this.is_all = res.body.is_all;
          this.act_contents = res.body.act_contents;
          this.act_contents.forEach(row => {
          this.chargers.push(row.charger)
          });
          this.checkList = this.chargers;
        })
    },

    changeValue(value) {
      // console.log(value);
      let obj = {};
      obj = this.options.find((item)=>{
        return item.value === value;
      });
      this.passenger  = obj.label;
      // console.log(obj.label);
    },
    submit(){
      //报名内容的cont_id
      this.act_contents.forEach(row => {
        if(this.checkList.indexOf(row.charger)!=-1){
          this.chooseActId.push(row.cont_id);
        }
      });
      // console.log('this.chooseActId',this.chooseActId)
      if(!this.passenger){
        this.passenger = '无';
        // console.log('passenger',this.passenger);
      }
      let url = BaseUrl+'/insetdata';
      // console.log('url',url);
      this.$http.post(url, {'name':this.name,'telphone':this.phone,'departure':this.departure,
        'c_ids':this.chooseActId,'passenger':this.passenger,'a_id':this.a_id}).then((res) => {
        // console.log('res',res);
        if(res.body.code==='1'){
          this.$notify({
            title: '成功',
            message: res.body.msg+' 。可以查看报名！',
            type: 'success'
          });
          this.flag = false;
          this.name = '';
          this.phone = '';
          this.departure = '';
          this.passenger = '';
        }
        if(res.body.code==='0'){
          this.$notify.info({
            title: '提示',
            message: res.body.msg,
          });
        }
      });
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    toPeopleList(){
      this.$router.push({name:'PeopleList',params:{'aid':this.a_id}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.red-star{
  color: red;
}
.input-box{
  margin-bottom: 15px;
}
.act{
  margin: 20px 0;
}
.act p{
  margin: 5px 0;
}
</style>
