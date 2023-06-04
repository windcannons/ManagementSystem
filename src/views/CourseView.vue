<template>
  <!--课程管理-->
    <div class="Course">
        <!--搜索导航-->
        <div class="Course-nav">
            <!--搜索-->
            <div class="nav-seek">
                <input type="search"
                       placeholder="请输入课程名称"
                       v-model="Search.itm_remarks">
                <el-row class="mb-4">
                    <el-button
                            type="info"
                            @click="SearchVisible = true">
                        <img src="../../public/course/seek-1.png"
                             alt="">
                        <p>
                            搜索</p>
                    </el-button>
                </el-row>
            </div>
            <!--选项-->
            <div class="nav-option">
                <el-row class="mb-4">
                    <el-button
                            type="primary"
                            @click="dialogVisible = true"
                    >
                        <img src="../../public/course/option-1.png"
                             alt="">
                        <p>
                            添加</p>
                    </el-button>
                    <el-button
                            type="danger">
                        <img src="../../public/course/option-5.png"
                             alt="">
                        <p>
                            批量删除</p>
                    </el-button>
                </el-row>
            </div>
            <!--添加框-->
            <el-dialog
                    v-model="dialogVisible"
                    title="添加"
                    width="30%"
                    :before-close="handleClose"
            >
                <div class="seek-Add_to">
                    <form action=""
                          method="post">
                        <div class="Add_to-id">
                            <span>课程名称</span>
                            <input type="text"
                                   name=""
                                   v-model="classInfo.itm_title">

                        </div>
                        <div class="Add_to-id">
                            <span>课程描述</span>
                            <input type="text"
                                   name=""
                                   v-model="classInfo.itm_remarks">
                        </div>
                    </form>
                </div>
                <template
                        #footer>
              <span class="dialog-footer">
                <el-button
                        @click="dialogVisible = false"
                >
                    取消
                </el-button>
                <el-button
                        type="primary"
                        @click="addClass"
                >
                      <span>确认</span>
                </el-button>
              </span>
                </template>
            </el-dialog>
        </div>
        <!--表格-->
        <div class="Course-tabulation">
            <table>
                <tr>
                    <th>
                        <input type="checkbox">
                    </th>
                    <th>
                        编号
                    </th>
                    <th>
                        课程编码
                    </th>
                    <th>
                        课程名称
                    </th>
                    <th>
                        课程描述
                    </th>
                    <th>
                        创建人
                    </th>
                    <th>
                        创建时间
                    </th>
                    <th>
                        状态
                    </th>
                    <th>
                        操作
                    </th>
                </tr>
                <tr v-for="(item,index) in oneList"
                    :key="index">
                    <td>
                        <input type="checkbox">
                    </td>
                    <td>
                        {{
                        item.itm_id
                        }}
                    </td>
                    <td>
                        <div class="ss">
                            {{
                            item.itm_uuid
                            }}
                        </div>
                    </td>
                    <td>
                        {{
                        item.itm_remarks
                        }}
                    </td>
                    <td>
                        {{
                        item.itm_title
                        }}
                    </td>
                    <td>
                        {{
                        item.itmUserName
                        }}
                    </td>
                    <td>
                        {{
                        item.itm_create_time
                        }}
                    </td>
                    <td>
                        <div class="tabulation-two">
                            <el-switch
                                    v-model="item.itm_status"
                                    class="ml-2"
                                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                            />
                            <p>
                                发布</p>
                        </div>
                    </td>
                    <td>
                        <div class="operateBtn">
                            <el-tag
                                    class="operateBtn-one operateBtnCome"
                                    effect="dark"
                                    @click="editVisible = true">
                                编辑
                            </el-tag>
                            <el-tag
                                    class="operateBtn-one operateBtnCome"
                                    effect="dark"
                                    type="success"
                                    @click="Delete"
                            >
                                删除
                            </el-tag>
                            <el-tag
                                    class="operateBtn-one operateBtnCome"
                                    effect="dark"
                                    type="info"
                                    @click="curriculumVisible = true"
                            >
                                手动报名
                            </el-tag>
                            <RouterLink
                                    to='/CourseView/Jobdetails'
                                    class="operateBtn-one">
                                <el-tag
                                        effect="dark"
                                        type="warning"
                                >
                                    作业详情
                                </el-tag>
                            </RouterLink>
                            <!--<el-tag-->
                            <!--        class="operateBtn-one"-->
                            <!--        effect="dark"-->
                            <!--        type="danger"-->
                            <!--&gt;-->
                            <!--    查看成绩-->
                            <!--</el-tag>-->
                            <el-tag
                                    class="operateBtn-one operateBtnCome"
                                    effect="dark"
                                    type="danger"
                                    @click="Comete"
                            >
                                结束课程
                            </el-tag>
                        </div>
                    </td>
                </tr>
            </table>
            <!--编辑-->
            <div class="Form-Manual">
                <el-dialog
                        v-model="editVisible"
                        title="编辑"
                        width="30%"
                        :before-close="editClose"
                >
                    <!--课程名称-->
                    <div class="showinfo">
                        <div class="infotext showinfoLi">
                            <div class="le">
                                <span>*</span>课程名称：
                            </div>
                            <div class="ri">
                                <input type="text">
                            </div>
                        </div>
                        <div class="infotext showinfoLi">
                            <div class="le">
                                <span>*</span>课程描述：
                            </div>
                            <div class="ri">
                                <input type="text">
                            </div>
                        </div>
                        <div class="infoState showinfoLi">
                            <div class="le">
                                状态：
                            </div>
                            <div class="ri">
                                <div>
                                    <input
                                            type="radio"
                                            name=""
                                            id="">
                                    发布
                                </div>
                                <div>
                                    <input
                                            type="radio"
                                            name=""
                                            id="">
                                    暂不发布
                                </div>
                            </div>
                        </div>
                        <div class="showinfo-button">
                            <button>
                                提交
                            </button>
                            <button>
                                取消
                            </button>
                        </div>
                    </div>

                </el-dialog>
            </div>
            <!--手动报名-->
            <div class="Form-Manual">
                <el-dialog
                        v-model="curriculumVisible"
                        title="课程报名"
                        width="30%"
                        :before-close="curriculumClose"
                >
                    <div class="Form-Add_to">
                        <div class="Add_to-id">
                            <span>学生学号</span><input
                                type="text">
                        </div>
                    </div>
                    <template
                            #footer>
                     <span class="dialog-footer">
                         <el-button
                                 @click="curriculumVisible= false">
                         取消</el-button>
                         <el-button
                                 type="primary"
                                 @click="curriculumVisible = false">
                             提交
                        </el-button>
                      </span>
                    </template>
                </el-dialog>
            </div>

        </div>
        <!--分页-->
        <div class="Course-page">
            <el-pagination
                    v-model:current-page="currentPage4"
                    v-model:page-size="pageSize4"
                    :page-sizes="[2,4,6,8,10]"
                    :disabled="disabled"
                    :background="background"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleSizeChange"
            />
        </div>
    </div>
  <!--路由-->
    <RouterView></RouterView>
</template>

<script
    setup>
import {
    RouterLink,
    RouterView
} from "vue-router";
import {
    onMounted,
    reactive,
    ref,
} from "vue";
import {
    ElMessage,
    ElMessageBox
} from 'element-plus'
// 操作
import {
    add,
    course
} from "@/axios/api";

let name = ref("CourseView")

// 搜索导航-
let Search = reactive({
    itm_remarks: ""
})
// const  SearchVisible = ref(false)
// function change() {
//     SearchVisible.value = false
//     course().then(res => {
//         console.log(res.data.data.itm_remarks)
//         // res.data.data.itm_remarks
//     })
// }
// // 添加课程
let classInfo = reactive({
    itm_title: "",
    itm_remarks: "",
    itm_id: "0"
})

function addClass() {
    dialogVisible.value = false
    add(classInfo).then(res => {
        // console.log(res)
        res.data.message
    })
}

// // 添加按钮
const dialogVisible = ref(false)

const handleClose = (done) => {
    ElMessageBox.confirm('是否取消添加', '警告', {
        type: 'info',
        cancelButtonText: '取消',
        confirmButtonText: '确认'
    }).then(() => {
        done()
    }).catch(() => {

    })
}
// 批量删除
// let Bulkdeletion = reactive([])
// axios
// deleteids().then(res => {
//     // console.log(res)
// })


// 表格
// axios
// 遍历数据
let oneList = reactive([])
let total = ref("0")
onMounted(() => {
    course().then(res => {
        console.log(res)
        total.value = res.data.total
        res.data.data.forEach(item => {
            oneList.push(item)
        })
    })
})

// 编辑
const editVisible = ref(false)
const editClose = (done) => {
    ElMessageBox.confirm('是否取消编辑', '警告', {
        type: 'info',
        cancelButtonText: '取消',
        confirmButtonText: '确认',
    }).then(() => {
        done()
    }).catch(() => {

    })
}

// 分页
const currentPage4 = ref(1)
const pageSize4 = ref(10)
const background = ref(true)
const disabled = ref(false)

const handleSizeChange = () => {
    course(currentPage4.value, pageSize4.value).then(res => {
        oneList.splice(0, oneList.length)
        res.data.data.forEach(item => {
            oneList.push(item)
        })
    })
}

// 删除课程
// deletes().then(res => {
//     // console.log(res)
// })


let Delete = (index) => {
    // console.log("sss")
    // oneList.splice(index, 1)
    // 删除提示
    ElMessageBox.confirm(
        '是否删除?',
        '删除提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        })
        .then(() => {
            oneList.splice(index, 1)
            ElMessage({
                type: 'success',
                message: '删除完成',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '删除取消',
            })
        })
}


// 手动报名
// manualenroll().then(res => {
//     console.log(res)
// })
const curriculumVisible = ref(false)
const curriculumClose = (done) => {
    ElMessageBox.confirm('是否取消报名', '警告', {
        type: 'info',
        cancelButtonText: '取消',
        confirmButtonText: '确认',
    }).then(() => {
        done()
    }).catch(() => {

    })
}


// 结束课程
let Comete = () => {
    console.log("sss")
    // oneList.splice(index, 1)
    // 结束课程提示
    ElMessageBox.confirm(
        '是否结束该课程?',
        '结束课程',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        })
        .then(() => {
            ElMessage({
                type: 'success',
                message: '已经结束该课程',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '结束课程取消',
            })
        })
}

</script>

<style
    scoped
    lang="less">
.Course {
  padding: 15px;
  background: #ffffff;
  position: relative;
  height: 100%;
  width: 100%;
  //border-radius: 15px;
}

//<!--搜索导航-->
.Course-nav {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .nav-seek {
    width: 25%;
    //background: salmon;
    display: flex;
    align-items: center;

    p {
      margin-left: 5px;
    }

    input {
      width: 200px;
      padding: 8px 0 8px 6px;
      border-radius: 5px;
      border: 1px solid #999;
    }

    button {
      padding: 8px 20px;
      background: #4e8cee;
      color: #fff;
      margin: 0 15px;
      border-radius: 10px;

      img {
        width: 15px;
        height: 15px;
      }
    }
  }

  .nav-option {
    width: 50%;
    height: 30px;
    display: flex;
    justify-content: right;
    align-items: center;
    user-select: none;

    p {
      margin-left: 5px;
    }

    img {
      width: 18px;
      height: 18px;
    }
  }

  //添加
  .seek-Add_to {

    form {
      text-align: center;
      display: flex;
      flex-wrap: wrap;

      .Add_to-id {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        line-height: 180%;

        input {
          width: 80%;
          padding: 5px 0;
          padding-left: 20px;
          border: 1px solid rgba(0, 0, 0, 0.2);

        }
      }
    }
  }

}

//<!--表格-->
.Course-tabulation {
  margin: 20px 0;
  color: #68696d;

  table {
    width: 100%;
    text-align: left;
    border-spacing: 0;
    border-collapse: collapse;

    tr {
      height: 40px;

      th, td {
        height: 100%;
        border: 1px solid #ebeef5;
        padding-left: 10px;

        .operateBtn {
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;

          .operateBtn-one {
            margin-right: 3%;
          }

        }

        .ss {
          width: 100px;
          height: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

        }

        .tabulation-two {
          width: 100%;
          height: 100%;
          display: flex;
          line-height: 265%;

          p {
            margin-left: 4px;
          }
        }
      }

      th:nth-child(1) {
        width: 4%;
      }

      th:nth-child(2) {
        width: 4%;
      }

      th:nth-child(3) {
        width: 10%;
      }

      th:nth-child(4) {
        width: 8%;
      }

      th:nth-child(5) {
        width: 8%;
      }

      th:nth-child(6) {
        width: 8%;
      }

      th:nth-child(7) {
        width: 14%;
      }

      th:nth-child(8) {
        width: 7%;
      }
    }
  }

  //操作
  .Form-Add_to {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    //手动报名
    .Add_to-id {
      width: 100%;
      display: flex;
      justify-content: space-between;

      margin-bottom: 10px;
      line-height: 180%;

      input {
        width: 80%;
        padding: 5px 0;
        padding-left: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);

      }
    }
  }

  //编辑
  .showinfo {
    padding: 0 15px;
    //<!--课程名称-->
    .showinfoLi {
      width: 100%;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      //发布状态
      .le {
        flex: 1.5;
        text-align: right;
        font-size: 18px;
        color: #7d7e82;
      }

      .ri {
        flex: 5;
      }
    }

    //<!--课程名称-->
    .infotext {
      width: 100%;
      //发布状态
      .le {
        font-size: 15px;

        span {
          color: #f56d6d;
          margin-right: 3px;
        }
      }

      .ri {
        //background: #4de826;
        width: 100%;

        input {
          width: 95%;
          min-height: 10px;
          border: 1px solid #eceef2;
          border-radius: 5px;
          padding: 10px;

        }
      }
    }

    .infoState {
      //发布状态
      .ri {
        display: flex;
        align-items: center;

        div {
          height: 45px;
          border: 1px solid #eee;
          text-align: center;
          line-height: 45px;
          padding: 0 20px;
          border-radius: 5px;
          font-size: 15px;
          font-weight: 500;

          &:nth-child(2) {
            margin-left: 30px;
          }

          input {
            margin-right: 5px;
          }
        }

        .checkInfo {
          color: #44a0ff;
          border: 1px solid #44a0ff;
        }
      }
    }

    //提交/取消
    .showinfo-button {
      width: 100%;
      display: flex;
      justify-content: center;

      button {
        height: 45px;
        border: 1px solid #eee;
        text-align: center;
        line-height: 45px;
        padding: 0 20px;
        border-radius: 5px;
        background: #409eff;
        color: floralwhite;
        margin-right: 8%;
      }
    }
  }

}

//<!-分页-->
.Course-page {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 50px;
  left: 0;
}


</style>
