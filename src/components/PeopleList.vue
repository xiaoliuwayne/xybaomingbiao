<template>
  <el-container>
    <el-header class="headset box2" >
      <span style="float: left;width: 30px;height: 30px"  class="box2" @click="back()"><i class="el-icon-arrow-left"></i></span>
      {{title}}</el-header>
    <el-main style="width: 100%;height: 100%">
      <el-table
        :data="tableData"
        border
        style="width: 100%;height: 100%">
        <el-table-column
          prop="name"
          label="姓名"
          :width="wid">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          :width="wid">
        </el-table-column>
        <el-table-column
          prop="departure"
          label="上车/出发点"
          :width="wid">
        </el-table-column>
        <el-table-column
          prop="act_content"
          label="参与活动"
          :width="wid">
        </el-table-column>
        <el-table-column
          prop="passengers"
          label="驾车可载人数"
          :width="wid">
        </el-table-column>
        <el-table-column
          prop="time"
          label="报名时间"
          :width="wid">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        title: '报名名单',
        wid: 110,
        tableData:[],
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    created(){
      let aid = this.$route.params.aid;
      let url = BaseUrl+'/getall/'+aid;
      console.log('url',url);
      this.$http.get(url).then( (res) => {
        console.log('respl',res)
        this.tableData = res.body.result
        this.title = this.tableData[0].act_title + this.title
      })
    },
    methods:{
      back(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>
