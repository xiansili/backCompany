
<template>
  <div class="wrapper">
    <!-- 部门操作 -->
    <el-dialog :visible.sync="isShown">
      <div>
        <el-input style="width: 70%" v-model="depDate" size="mini" placeholder="输入要添加的部门" />
        <el-button type="success" size="mini" @click="depAdd">点击添加</el-button>
        <el-table :data="departList" style="width: 100%">
          <el-table-column label="部门名" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.departName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="depEditOpen(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="depDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="isEdit">
      <div>
        <el-input style="width: 70%" v-model="depUpdata" size="mini" placeholder="输入修改的部门" />
        <el-button type="success" size="mini" @click="depEdit">点击修改</el-button>
      </div>
    </el-dialog>
    <!-- 左边侧栏 -->
    <el-container>
      <el-aside width="20%">
        <div class="wrapper-headimg">
          <img src="@/assets/imgs/nezha.jpg" alt />
          <span class="wrapper-headimg-name">{{loginname}}</span>
        </div>
        <div class="wrapper-nav">
          <el-menu
            default-active="4"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>部门信息</span>
              </template>
              <el-menu-item
                v-for="(item,index) in departList"
                :key="index"
                @click="getDepartInfo(item.departName)"
              >{{item.departName}}</el-menu-item>
              <el-menu-item @click="changeStatus">部门操作</el-menu-item>
            </el-submenu>

            <el-menu-item index="2" @click="empSelect">
              <i class="el-icon-menu"></i>
              <span slot="title">员工信息</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">考勤表</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">查看留言</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>

      <!-- 头部和中间 -->
      <el-container>
        <el-header height="80px">{{headername}}</el-header>
        <el-main>
          <!-- 部门表格 -->
          <Dep v-show="isdep" :departinfo="departTable" @getdepartant="getdepartant" />
          <!-- 员工信息表格 -->
          <Emp v-show="isemp" :info="infoList" @empSelect="empSelect" />
          <!-- 考勤表 -->
          <!-- 留言表 -->
          <Massage v-show="ismassage" />
          <Welcome v-show="iswelcome" />
        </el-main>
        <el-footer height="30px">后台人事管理系统</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import URL from "../../service.config";
import Dep from "./table/Dep";
import Emp from "./table/Emp";
import Massage from "./table/Massage";
import Welcome from "./table/Welcome";

export default {
  components: {
    Dep,
    Emp,
    Massage,
    Welcome
  },

  data() {
    return {
      // tableData: [
      //   {
      //     date: "2016-05-02",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄"
      //   },
      //   {
      //     date: "2016-05-04",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1517 弄"
      //   },
      //   {
      //     date: "2016-05-01",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1519 弄"
      //   },
      //   {
      //     date: "2016-05-03",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1516 弄"
      //   }
      // ],
      //要添加的部门
      depDate: "",
      //要修改的部门
      depUpdata: "",
      isEdit: false,
      isShown: false,
      loginname: "123",
      headername: "",
      isdep: false,
      isemp: false,
      ismassage: false,
      iswelcome: true,
      departList: [],
      infoList: [],
      departTable: [],
      //修改的信息
      depIndex: "",
      derRow: ""
    };
  },
  created() {
    //获取部门
    axios({
      method: "get",
      url: URL.getdep
    })
      .then(res => {
        console.log(res.data[1])
        if (res.status == 200) {
           //之前代码
          // let data = res.data.data;
          // for (let i = 0, len = data.length; i < len; i++) {
          //   this.departList.push(data[i]);
          // }
          let data = res.data;
          for (let i = 0, len = data.length; i < len; i++) {
            this.departList.push(data[i]);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
     //获取部门
    getdepartant() {
      axios({
        method: "get",
        url: URL.getdep
      })
        .then(res => {
          if (res.status == 200) {
            let data = res.data.data;
            // for (let i = 0, len = data.length; i < len; i++) {
            //   this.depart.push(data[i]);
            // }
            this.departList = data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //打开部门修改弹框
    depEditOpen(index, row) {
      this.isEdit = true;
      this.depIndex = index;
      this.derRow = row;
    },
    //部门修改
    depEdit() {
      let update =URL.updatedep + "?original=" + this.derRow.departName + "&updata=" + this.depUpdata;
      console.log(update)
      axios({
        method: "get",
        url: update
      })
        .then(res => {
          if (res.status == 200) {
            console.log("修改成功");
          } else {
            console.log("修改成功");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //部门删除
    depDelete(index, row) {
      let depUrl = URL.deldepartment + "?departname=" + row.departName;
      console.log(depUrl);
      axios({
        method: "get",
        url: depUrl
      })
        .then(res => {
          if (res.data == 200) {
            console.log("刪除成功");
             this.getdepartant(); 
          } else if (res.data == 110) {
            console.log("部门门不能为空");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //部门添加
    depAdd() {
      let depUrl = URL.adddep + "?departname=" + this.depDate;
      axios({
        method: "get",
        url: depUrl
      })
        .then(res => {
          if (res.data == 200) {
           this.isShown = false;
           this.getdepartant(); 
          } else if (res.data == 110) {
            console.log("部门门不能为空");
          } else {
            console.log("添加错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //部门弹框
    changeStatus: function() {
      if (this.isShown) {
        this.isShown = false;
      } else {
        this.isShown = true;
      }
    },
    //获取部门具体信息
    getDepartInfo(departName) {
      // if (this.departTable !='' ) {
      //   this.departTable = "123";
      // }
       this.iswelcome = false;
      this.headername = departName + "表";
      let getDepartInfo = URL.getDepartInfo + "?departname=" + departName;
      axios
        .get(getDepartInfo)
        .then(res => {
          if (res.status == 200) {
            let data = res.data.data;
            this.departTable = data;
            // for (let i = 0, len = data.length; i < len; i++) {
            //   this.departTable.push(data[i]);
            // }
          }
        })
        .catch(err => {});
      console.log(departName);
      this.isdep = true;
      this.isemp = this.iswelcome = false;
    },
    handleOpen(key, keyPath) {
      this.iswelcome = false;
      this.isemp = false;
      this.isdep = true;
      this.headername = "部门表";
    },

    //获取员工信息
    empSelect() {
      this.iswelcome = false;
      this.headername = "员工信息表";
      this.isemp = true;
      this.isdep = false;
      axios({
        method: "get",
        url: URL.getinfo
      })
        .then(res => {
          if (res.status == 200) {
            let data = res.data.data;
            this.infoList = data;
            // for (let i = 0, len = data.length; i < len; i++) {
            //   this.infoList.push(data[i]);
            // }
          }
        })
        .catch(err => {});
    }
  }
};
</script>


<style lang="scss" scoped>
.add {
  background: #000;
}
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &-headimg {
    height: 80px;
    background: #545c64;
    & img {
      height: 50px;
      width: 50px;
      margin: 10px;
      margin-left: 50px;
      float: left;
      background: #e9eef3;
      border-radius: 50%;
      border: 3px solid #e6a23c;
    }
    &-name {
      float: left;
      margin-left: 20px;
      height: 80px;
      line-height: 80px;
      color: #e6a23c;
    }
  }
  &-nav {
    margin-top: -60px;
  }
}

.el-menu-vertical-demo {
  width: 100%;
}
.el-menu {
  margin-top: 60px;
}
.el-container {
  width: 100%;
  height: 100%;
}

.el-header {
  background: #545c64;
  color: #fff;
  font-size: 40px;
  text-align: center;
  line-height: 80px;
  width: 100%;
}
.el-footer {
  background: #545c64;
  color: #fff;
  text-align: center;
  line-height: 30px;
  width: 100%;
}
.el-aside {
  background: #545c64;
  // background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  width: 300px;
  overflow: hidden;
}
.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
  // margin-bottom: 50px;
  padding: 0;
  overflow: hidden;
}
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

