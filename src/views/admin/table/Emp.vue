<template>
  <div>
    <el-dialog :visible.sync="isShown">
      <div>
        <el-input style="width: 70%" v-model="namedata" :disabled="true" size="mini" placeholder="输入修改的用户名" />
        <el-input style="width: 70%" v-model="numberdata" :disabled="true" size="mini" placeholder="输入修改的员工号" />
        <el-input style="width: 70%" v-model="moneydata" size="mini" placeholder="输入修改的薪资" />
        <el-button type="success" size="mini" @click="handleEdit">点击修改</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="info"
      :header-cell-style="styleObj"
      border
      size="medium"
      style="width: 100%;"
      max-height="650"
    >
      <el-table-column fixed="left" prop="empNumber" label="员工号" width="120"></el-table-column>
      <el-table-column prop="empinfoName" label="姓名" width="120"></el-table-column>
      <el-table-column prop="empDepmentName" label="部门" width="120"></el-table-column>
      <el-table-column prop="empinfoTel" label="电话" width="120"></el-table-column>
      <el-table-column prop="empAge" label="年龄" width="120"></el-table-column>
      <el-table-column prop="empSex" label="性别" width="120"></el-table-column>
      <el-table-column prop="empAddress" label="地址" width="170"></el-table-column>
      <el-table-column prop="empMoney" label="月薪" width="120"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="openhandleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import URL from "../../../service.config";
export default {
  props: ["info"],
  data() {
    return {
      namedata: "",
      numberdata: "",
      moneydata: "",
      isShown: false,
      //表头样式
      tempList: [],
      // tableData: [
      //   {
      //     empNumber: "2016-05-02",
      //     empinfoName: "王小虎",
      //     empDepmentName: "上海市普陀区金沙江路 1518 弄"
      //   },
      //   {
      //     empNumber: "2016-05-02",
      //     empinfoName: "王小虎",
      //     empDepmentName: "上海市普陀区金沙江路 1518 弄"
      //   },
      //   {
      //     empNumber: "2016-05-02",
      //     empinfoName: "王小虎",
      //     empDepmentName: "上海市普陀区金沙江路 1518 弄"
      //   },
      //   {
      //     empNumber: "2016-05-02",
      //     empinfoName: "王小虎",
      //     empDepmentName: "上海市普陀区金沙江路 1518 弄"
      //   }
      // ],
      styleObj: {
        lineHeight: 30 + "px",
        width:100 + 'px'
      },
    };
  },
  // updated() {

  // },

  methods: {
    //修改员工信息弹框
    changeStatus: function() {
      if (this.isShown) {
        this.isShown = false;
      } else {
        this.isShown = true;
      }
    },
    //打开修改员工信息
    openhandleEdit(index, row) {
      this.isShown = true;
      this.namedata =  row.empinfoName;
      this.numberdata =  row.empNumber;
      this.moneydata = row.empMoney;
    },
    //修改员工信息
    handleEdit() {
      let update =
        URL.updetainfo +
        "?number=" +
        this.numberdata +
        "&name=" +
        this.namedata +
        "&money=" +
        this.moneydata;
      axios({
        method: "get",
        url: update
      })
        .then(res => {
          if (res.status == 200) {
            console.log("修改成功");
             this.$emit('empSelect');
            this.isShown = false;
          } else {
            console.log("修改失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //删除员工信息
    handleDelete(index, row) {
      axios({
        method: "get",
        url: URL.delempinfo + "?number=" + row.empNumber
      })
        .then(res => {
          if (res.status == 200) {
            console.log("刪除成功");
             this.$emit('empSelect');
          } else {
            console.log("刪除失敗");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes dialog-fade-in {
  0% {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -100%, 0);
    opacity: 0;
  }
}
</style>