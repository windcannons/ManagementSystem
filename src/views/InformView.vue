<template>
  <!--通知管理-->
    <div class="InformView">
        <div class="top">
            <el-button
                    text
                    @click="changeShowInfo(true)">
                <button>
                    <img src="../../public/InforView/add.png"
                         alt="">
                    <span>发布</span>
                </button>
            </el-button>
        </div>
        <div class="main">
            <table>
                <tr>
                    <th>
                        编号
                    </th>
                    <th>
                        通知内容
                    </th>
                    <th>
                        发布时间
                    </th>
                    <th>
                        发布人
                    </th>
                    <th>
                        发布状态
                    </th>
                    <th>
                        操作
                    </th>
                </tr>
                <tr v-for="(item,index) in infos"
                    :key="index">
                    <td>
                        {{
                        item.nicId
                        }}
                    </td>
                    <td>
                        {{
                        item.nicTitle
                        }}
                    </td>
                    <td>
                        {{
                        item.nicCreateTime
                        }}
                    </td>
                    <td>
                        {{
                        item.nicUserName
                        }}
                    </td>
                    <td>
                        <div>
                            <el-switch
                                    @change="changenicStatus(item.nicStatus,item.nicTitle,item.nicId)"
                                    v-model="item.nicStatus"
                                    class="ml-2"
                                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                            />
                            <span>发布</span>
                        </div>
                    </td>
                    <td>
                        <el-button
                                round
                                @click="changeShowInfo(false,item.nicId,item.nicTitle)">
                            编辑
                        </el-button>
                        <el-button
                                type="danger"
                                round
                                @click="showdel(item.nicId)">
                            删除
                        </el-button>
                    </td>
                </tr>
            </table>
        </div>
        <!--删除的弹窗-->
        <el-dialog
                class="SignOut"
                v-model="dialogVisible"
                title="退出登录"
                width="30%"
                center
                :before-close="handleClose"
        >
            <span style="font-size: 18px">是否删除通知</span>
            <template
                    #footer>
                    <span class="dialog-footer">
                    <el-button
                            @click="CancelOut">取消</el-button>
                    <el-button
                            type="danger"
                            @click="delInfo">
                        确定
                    </el-button>
                    </span>
            </template>
        </el-dialog>
        <el-dialog
                class="SignOut"
                v-model="showinfo"
                :title="operator?'发布通知':'编辑通知'"
                width="30%"
                center
                :before-close="handleClose"
        >
            <div class="showinfo">
                <div class="infotext showinfoLi">
                    <div class="le">
                        <span>*</span>通知内容：
                    </div>
                    <div class="ri">
                        <textarea
                                v-model="upInfoText"></textarea>
                    </div>
                </div>
                <div class="infoState showinfoLi">
                    <div class="le">
                        状态：
                    </div>
                    <div class="ri">
                        <div :class="publish?'checkInfo':''"
                             @click="publish = true">
                            <input
                                    type="radio"
                                    name=""
                                    :checked="publish"
                                    id="">
                            发布
                        </div>
                        <div :class="publish?'':'checkInfo'"
                             @click="publish = false">
                            <input
                                    type="radio"
                                    name=""
                                    :checked="!publish"
                                    id="">
                            暂不发布
                        </div>
                    </div>
                </div>
            </div>
            <template
                    #footer>
                    <span class="dialog-footer">
                    <el-button
                            type="primary"
                            @click="IsUpInfo">提交</el-button>
                    <el-button
                            @click="NoUpInfo">
                        取消
                    </el-button>
                    </span>
            </template>
        </el-dialog>
        <div class="fotPagin">
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
</template>

<script
    setup>
//element组件
import {
    ElMessageBox,
    ElNotification
} from 'element-plus'
import {
    ref,
    reactive,
    onMounted,
} from 'vue'
import {
    delnotice,
    notice,
    addOrUpdate
} from "@/axios/api"
// 通知列表
let infos = reactive([])
// 发布按钮弹窗
let showinfo = ref(false)
let publish = ref(true)
// 发布内容
let upInfoText = ref("")
// 是否为发布通知
let operator = ref(true)
let infoid = ref("")

function changeShowInfo(judge, nicId, text) {
    showinfo.value = true
    operator.value = judge
    infoid.value = nicId
    upInfoText.value = text
}

const IsUpInfo = () => {
    addOrUpdate({
        nicStatus: publish.value,
        nicTitle: upInfoText.value,
        nicId: infoid.value,
    }).then(res => {
        if (res.data.code === 200) {
            showinfo.value = false
            upInfoText.value = ""
            ElNotification({
                title: '成功',
                message: res.data.message,
                type: 'success',
            })
            getinfo()
        }
    })
}

function NoUpInfo() {
    showinfo.value = false
}

// 获取通知分页


onMounted(() => {
    getinfo()
})

let total = ref(0)

function getinfo() {
    notice().then(res => {
        total.value = res.data.total
        infos.splice(0, infos.length)
        res.data.data.forEach(item => {
            infos.push(item)
        })
    })
}


// 表单开关
function changenicStatus(nicStatus, nicTitle, nicId) {
    addOrUpdate({
        nicStatus: nicStatus,
        nicTitle: nicTitle,
        nicId: nicId,
    }).then(res => {
        if (res.data.code === 200) {
            ElNotification({
                title: '成功',
                message: res.data.message,
                type: 'success',
            })
            getinfo()
        }
    })
}


// 删除通知
const dialogVisible = ref(false)
let infoId = ref("")

function showdel(Id) {
    dialogVisible.value = true
    infoId.value = Id
}

const handleClose = (done) => {
    ElMessageBox.confirm('是否取消删除', '警告', {
        type: 'info',
        cancelButtonText: '取消',
        confirmButtonText: '确认',
    }).then(() => {
        done()
    }).catch(() => {

    })
}

function CancelOut() {
    dialogVisible.value = false
}

function delInfo() {
    delnotice(infoId.value).then(res => {
        if (res.data.code === 200) {
            dialogVisible.value = false
            getinfo()
            ElNotification({
                title: '成功',
                message: res.data.message,
                type: 'success',
            })
        }
    })
}

// 分页
const currentPage4 = ref(1)
const pageSize4 = ref(10)
const background = ref(true)
const disabled = ref(false)

const handleSizeChange = () => {
    notice(currentPage4.value,pageSize4.value).then(res => {
        infos.splice(0, infos.length)
        res.data.data.forEach(item => {
            infos.push(item)
        })
    })
}

</script>

<style
    scoped
    lang="less">
.InformView {
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  //头部发布按钮
  .top {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;

    button {
      width: 100px;
      height: 40px;
      background-color: #67c23a;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 20px;
        height: 20px;
        margin-right: 6px;
      }

      span {
        font-size: 16px;
        color: #fff;

      }
    }
  }

  //    表单
  .main {
    width: 100%;
    flex: 1;

    table {
      width: 100%;
      border-spacing: 0;
      border-collapse: collapse;
      table-layout: fixed;


      tr {
        height: 50px;

        &:hover {
          background-color: #f5f7fa;
        }

        td, th {
          border: 1px solid #ccc;

          &:nth-child(1) {
            width: 4%;
          }

          &:nth-child(2) {
            width: 17%;
            padding-right: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          &:nth-child(3) {
            width: 20%;
          }

          &:nth-child(4) {
            width: 20%;
          }

          &:nth-child(5) {
            width: 20%;
          }

          &:nth-child(6) {
            width: 19%;
          }
        }

        th {
          color: #a89d99;
          font-size: 15px;
        }

        td {
          font-size: 14px;
          color: #787a7d;
          padding-left: 15px;

          div {
            height: 100%;
            display: flex;
            align-items: center;

            .ml-2 {

              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}

//发布消息弹窗
.showinfo {
  padding: 0 15px;

  .showinfoLi {
    width: 100%;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-around;

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

  .infotext {
    .le {
      span {
        color: #f56d6d;
        margin-right: 3px;
      }
    }

    .ri {
      textarea {
        max-width: 100%;
        min-height: 70px;
        border: 1px solid #eceef2;
        border-radius: 5px;
        padding: 10px;
      }
    }
  }

  .infoState {
    .ri {
      display: flex;
      align-items: center;

      div {
        height: 54px;
        border: 1px solid #eee;
        text-align: center;
        line-height: 54px;
        padding: 0 20px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 800;

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
}
.fotPagin{
  margin-bottom: 50px;
}
</style>
