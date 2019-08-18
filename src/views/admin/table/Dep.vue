<template>
  <div>
    <el-table
      :data="departinfo"
      :header-cell-style="styleObj"
      border
      size='medium' 
      style="width: 100%;"
      max-height="650"
    >
     <el-table-column fixed="left" prop="empNumber" label="员工号" width="180"></el-table-column>
      <el-table-column prop="empinfoName" label="姓名" width="180"></el-table-column>
      <el-table-column prop="empDepmentName" label="部门"></el-table-column>
      <el-table-column prop="empinfoTel" label="电话"></el-table-column>
      <el-table-column prop="empAge" label="年龄"></el-table-column>
      <el-table-column prop="empSex" label="性别"></el-table-column>
      <el-table-column prop="empAddress" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props:["departinfo"],
  
  data() {
    return {
      //表头的高度
      styleObj: {
        // padding:0,
        lineHeight: 30 + "px",
      }
    };
  },
  methods: {
  },

};
</script>

<style lang="scss" scoped>
</style>