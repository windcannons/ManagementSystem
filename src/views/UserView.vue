<template>
  <!--用户管理-->
  <!--  <h1>用户管理</h1>-->
    <div
            class="box"
            @click.stop="showall">
        <!--头部搜索和功能大盒子-->
        <div
                class="top">
            <!--      头部左边搜索盒子-->
            <div
                    class="topLeft">
                <input
                        type="text"
                        placeholder="请输入学生姓名，登录账号，地址"
                        v-model="sousuoValue"
                >
                <button
                        class="btn"
                        @click="sousuo"
                >
                    <img
                            src="../../public/UserView/fdj.png"
                            alt="">
                    搜索
                </button>
            </div>
            <!--      头部右边按钮盒子-->
            <div
                    class="topRight">
                <!--        添加按钮弹出框-->
                <el-button
                        text
                        @click="bianjiChange(0,true)"
                        class="btnRight">
                    <img
                            src="../../public/UserView/jia.png"
                            alt="">&nbsp添加
                </el-button>

                <el-dialog
                        v-model="addValue"
                        :title="operate?'添加':'修改'"
                        width="30%"
                        draggable>
                    <el-form>
                        <el-form-item
                                label="学生姓名："
                                label-width="120px">
                            <el-input
                                    v-model="form.name"
                                    style="width: 240px;"/>
                        </el-form-item>
                        <el-form-item
                                label="登录账号："
                                label-width="120px">
                            <el-input
                                    :readonly="!operate"
                                    v-model="form.username"
                                    style="width: 240px;"/>
                        </el-form-item>
                        <el-form-item
                                label="角色："
                                label-width="120px">
                            <el-radio-group
                                    v-model="form.teacher"
                                    style="width: 240px;">
                                <el-radio
                                        :label="false">
                                    学生
                                </el-radio>
                                <el-radio
                                        :label="true">
                                    老师
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item
                                label="状态："
                                label-width="120px">
                            <el-radio-group
                                    v-model="form.enabled"
                                    style="width: 240px;">
                                <el-radio
                                        :label="true">
                                    启用
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item
                                label="电话："
                                label-width="120px">
                            <el-input
                                    v-model="form.phone"
                                    style="width: 240px;"/>
                        </el-form-item>
                        <el-form-item
                                label="头像地址："
                                label-width="120px">
                            <el-input
                                    v-model="form.userFace"
                                    style="width: 240px;"/>
                        </el-form-item>
                        <el-form-item
                                label="地址："
                                label-width="120px">
                            <el-input
                                    v-model="form.address"
                                    style="width: 240px;"/>
                        </el-form-item>
                    </el-form>
                    <template
                            #footer>
      <span
              class="dialog-footer">
        <el-button
                type="primary"
                @click="handleSubmit">提交</el-button>
        <el-button
                @click="cancelset">取消</el-button>
      </span>
                    </template>
                </el-dialog>
                <button
                        class="btnBig"
                        style="background-color: #fab6b6"
                        @click="batchRemove">
                    <img
                            src="../../public/UserView/plsc.png"
                            alt="">
                    批量删除
                </button>
            </div>
        </div>
        <!--中间表格盒子-->
        <div
                class="center">
            <table
                    class="table">
                <!--        表头-->
                <thead>
                <tr>
                    <th class="col-checkbox">
                        <!--复选-->
                        <input
                                type="checkbox"
                                v-model="allChecked"
                                @change="checkAll"
                        />
                    </th>
                    <th class="col-no">
                        编号
                    </th>
                    <th class="col-avatar"
                        style="text-align: center">
                        头像
                    </th>
                    <th class="col-name">
                        学生姓名
                    </th>
                    <th class="col-account">
                        登录账号
                    </th>
                    <th class="col-role">
                        角色
                    </th>
                    <th class="col-phone">
                        电话
                    </th>
                    <th class="col-address">
                        地址
                    </th>
                    <th class="col-status">
                        状态
                    </th>
                    <th class="col-password">
                        密码
                    </th>
                    <th class="col-operation">
                        操作
                    </th>
                </tr>
                </thead>
                <!--        表身-->
                <tbody>
                <!--尝试返回的一个布尔值-->
                <tr v-for="item in state"
                    :class="{active: item.checked}"
                    :key="item.id">
                    <td class="col-checkbox">
                        <input
                                type="checkbox"
                                v-model="item.checked"
                                @change="checkli"
                        />
                    </td>
                    <td class="col-no">
                        {{
                        item.id
                        }}
                    </td>
                    <td class="col-avatar"
                        style="text-align: center">
                        <img
                                :src="item.userFace">
                    </td>
                    <td class="col-name">
                        {{
                        item.name
                        }}
                    </td>
                    <!--          账号-->
                    <td class="col-account">
                        {{
                        item.username
                        }}
                    </td>
                    <!--          角色-->
                    <td class="col-role">
                        {{
                        item.teacher ? '老师' : '学生'
                        }}
                    </td>
                    <td class="col-phone">
                        {{
                        item.phone
                        }}
                    </td>
                    <!--          地址-->
                    <td class="col-address">
                        {{
                        item.address
                        }}
                    </td>
                    <!--          状态-->
                    <td class="col-status">
                        <el-switch
                                v-model="item.enabled"
                                class="ml-2"
                                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                                @change="enabledInfo(item)"
                        />
                    </td>
                    <td class="col-password">
                        {{
                        item.password
                        }}
                    </td>
                    <td class="col-operation">
                        <!--编辑弹窗-->
                        <el-button
                                text
                                @click="bianjiChange(item,false)"
                                style="background-color: white">
                            编辑
                        </el-button>
                        <el-button
                                @click="delinfo(item.id)"
                                class="delete"
                                style="color: white ;background-color: #f56c6c">
                            删除
                        </el-button>
                    </td>
                </tr>
                </tbody>
            </table>
            <el-dialog
                    v-model="dialogVisible"
                    title="删除"
                    width="30%"
                    :before-close="handleClose"
            >
                <span>是否删除此数据</span>
                <template
                        #footer>
      <span
              class="dialog-footer">
        <el-button
                @click="dialogVisible = false">取消</el-button>
        <el-button
                type="primary"
                @click="remove">
          确认
        </el-button>
      </span>
                </template>
            </el-dialog>
        </div>
        <!--尾部分页盒子-->
        <div
                class="bottom">
            <div
                    class="fotMain">
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
    </div>
</template>


<script>
import {
    reactive,
    toRefs,
    ref,
} from 'vue'
// 下拉组件引入
import {
    ElMessageBox,
    ElNotification
} from 'element-plus'
// 引入用户列表
import {
    page,
    deleteAdmin,
    addAdmin,
    deleteAdmins,
    userInfo
} from "../axios/api";


export default {
    name: "UserView",
    setup() {

        // 状态点击
        let enabledInfo = (item) => {
            let params = {
                id: item.id,
                enabled: item.enabled
            }
            userInfo(params).then(res => {
                if (res.data.code === 200) {
                    page().then(res => {
                        state.splice(0, state.length)
                        res.data.data.forEach(item => {
                            state.push(item)
                        })
                    })
                    ElNotification({
                        title: 'Success',
                        message: '更改状态成功',
                        type: 'success',
                    })
                }
            })
        }


        // 分页样式
        const currentPage4 = ref(1)
        const pageSize4 = ref(10)
        const background = ref(true)
        const disabled = ref(false)

        const handleSizeChange = () => {
            page(currentPage4.value, pageSize4.value, sousuoValue.value).then(res => {
                state.splice(0, state.length)
                res.data.data.forEach(item => {
                    state.push(item)
                })
            })
        }
        // 复选功能
        const selectAll = ref(false)
        let value = ref(false)
        // 添加框的布尔值和双向绑定值加方法
        const addValue = ref(false)
        //判断当前操作位添加还是删除
        let operate = ref(true)
        // 添加表格的存储对象
        let form = reactive({ // 存储表单项的值
            name: '',
            username: '',
            enabled: true,
            teacher: false,
            phone: '',
            userFace: '',
            address: '',
            id:0
        })

        let bianjiChange = (item, operater) => {
            addValue.value = true
            operate.value = operater
            if (item === 0) {
                form.id = 0
            } else {
                for (let k in item) {
                    form[k] = item[k]
                }
            }
        }
        const handleSubmit = () => {
            // 在这里处理表单提交逻辑
            addAdmin(form).then(ress => {
                if (ress.data.code === 200) {
                    addValue.value = false
                    page().then(res => {
                        state.splice(0, state.length)
                        res.data.data.forEach(item => {
                            state.push(item)
                        })
                        ElNotification({
                            title: 'Success',
                            message: ress.data.message,
                            type: 'success',
                        })
                    })
                    for (let k in form) {
                        form[k] = ""
                    }
                    form.enabled = true
                    form.teacher = false
                }else{
                    addValue.value = true
                    ElNotification({
                        title: 'Error',
                        message: ress.data.message,
                        type: 'error',
                    })
                }
            })
        }
        // 模板框的布尔值
        const mubanValue = ref(false)

        function cancelset() {
            addValue.value = false
            for (let k in form) {
                form[k] = ""
            }
            form.enabled = true
            form.teacher = false
        }

        // 导入框布尔值
        const daoruValue = ref(false)
        // 错误记录框布尔值
        const cuowuValue = ref(false)
        // 错误记录表格模拟表
        const tableData = [
            {
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
        ]
        // 用户列表axios获取
        let total = ref(0)

        let state = reactive([])
        page().then(res => {
            total.value = res.data.total
            const data = res.data.data.map(item => {
                return {
                    ...item,
                    checked: false
                }
            })
            state.splice(0, state.length, ...data)
        })
        // 全选
        // 全选暂定属性
        let allChecked = ref(false)
        const checkAll = () => {
            for (let i = 0; i < state.length; i++) {
                state[i].checked = allChecked.value
            }
        }

// 单选的反全选事件
        function checkli() {
            let allche = true
            for (let i = 0; i < state.length; i++) {
                if (!state[i].checked) {
                    allche = false
                }
            }
            allChecked.value = allche
        }


        // 编辑行数据
        const edit = (index) => {
        }

        const dialogVisible = ref(false)
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
        let delId = ref("")

        function delinfo(id) {
            delId.value = id
            dialogVisible.value = true
        }

        // 删除行数据
        const remove = () => {
            dialogVisible.value = false
            deleteAdmin(delId.value).then(res => {
                if (res.data.code === 200) {
                    page().then(res => {
                        state.splice(0, state.length)
                        res.data.data.forEach(item => {
                            state.push(item)
                        })
                    })
                    ElNotification({
                        title: 'Success',
                        message: res.data.message,
                        type: 'success',
                    })
                }
            })
        }

        // 批量删除，并把获取选中数据的id存进数组里
        const batchRemove = () => {
            const checkedIds = Object.keys(state).filter(key => state[key].checked).map(key => state[key].id);
            deleteAdmins(checkedIds).then(res => {
                if (res.data.code === 200) {
                    page().then(res => {
                        state.splice(0, state.length)
                        res.data.data.forEach(item => {
                            state.push(item)
                        })
                    })
                    ElNotification({
                        title: 'Success',
                        message: 'This is a success message',
                        type: 'success',
                    })
                }
            })
        }
        // 搜索
        const sousuoValue = ref('');
        const sousuo = () => {
            page(currentPage4.value, pageSize4.value, sousuoValue.value).then(res => {
                if (res.status === 200) {
                    state.splice(0, state.length)
                    total.value = res.data.total
                    res.data.data.forEach(item => {
                        state.push(item)
                    })
                }
            })
        };

        return {
            ...toRefs(state),
            selectAll,
            checkAll,
            state,
            allChecked,
            // checkItem,
            edit,
            remove,
            batchRemove,
            value,
            addValue,
            mubanValue,
            daoruValue,
            cuowuValue,
            tableData,
            dialogVisible,
            handleClose,
            delinfo,
            delId,
            form,
            handleSubmit,
            checkli,
            background,
            disabled,
            currentPage4,
            pageSize4,
            handleSizeChange,
            total,
            enabledInfo,
            bianjiChange,
            sousuo,
            sousuoValue,
            operate,
            cancelset
        }
    }
}
</script>

<style
    scoped
    lang="less">
.box {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 15px;
  position: relative;
}

.top {
  width: 100%;
  height: 5vh;
  /*background-color: #4e8cee;*/
  display: flex;
  justify-content: space-between
}

.topLeft {
  width: 30%;
  height: 100%;
  /*background-color: #2c3e50;*/
  display: flex;
  justify-content: flex-start
}

input {
  width: 65%;
  height: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  padding-left: 10px;
  margin-right: 15px;
  border: 1px solid #e0e2e9;
}

.btn {
  width: 25%;
  height: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  text-align: center;
  background-color: #4e8cee;
  color: white;
}

img {
  width: 15px;
}

.topRight {
  width: 45%;
  height: 100%;
  /*background-color: #2c3e50;*/
  display: flex;
  justify-content: flex-end
}

//右边三个小按钮样式
.btnRight {
  width: 15%;
  height: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  text-align: center;
  background-color: #4e8cee;
  color: white;
  margin-left: 15px;
  font-size: 13px;
}

.el-button.is-text:not(.is-disabled):focus, .el-button.is-text:not(.is-disabled):hover {
  background-color: #4e8cee
  //background-color: transparent;
}

//导入框弹出样式按钮和文字外的盒子
.flex-align {
  display: flex;
  flex-direction: column-reverse;
  align-items: center
}

.el-button--primary {
  background-color: #409EFF;
  color: #fff;
}

//右边两个大按钮样式
.btnBig {
  width: 22%;
  height: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  text-align: center;
  background-color: #4e8cee;
  color: white;
  margin-left: 15px;
  font-size: 13px;
}

//错误记录弹出框样式
.header-cell {
  border: 1px solid #ebeef5;
}

.el-pagination {
  justify-content: space-between;
}

/*中间*/
.center {
  width: 100%;
  height: auto;
  /*background-color: #4e8cee;*/
  margin-top: 15px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #eceff6;
}

.table th,
.table td {
  border: 1px solid #eceff6;
  padding: 8px;
  text-align: left;
}

.active {
  background-color: #eee;
}

.col-checkbox {
  width: 8%;
}

.col-no {
  width: 5%;
}

.col-avatar {
  width: 10%;
}

.col-avatar > img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.col-name {
  width: 10%;
}

.col-account {
  width: 10%;
}

.col-role {
  width: 8%
}

.col-status {
  width: 8%
}

.col-address {
  width: 10%;
}

.col-phone {
  width: 10%;
}

.col-operation > button {
  width: 50px;
  height: 25px;
  text-align: center;
  margin-left: 10px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #e5e7ed;
  font-size: 10px;
}

/*尾部*/
.bottom {
  width: 100%;
  position: absolute;
  bottom: 30px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

//下拉组件样式
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
