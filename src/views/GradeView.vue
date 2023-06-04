<template>
    <!--成绩管理-->
    <div class="main"
         @click="loseInp">
        <div class="top">
            <!--      头部搜索盒子-->
            <div class="topLeft">
                <input id="msg"
                       v-model="queryInput"
                       type="text"
                       placeholder="请输入课程名称">
                <button class="logn"
                        @click="logn">
                    <img
                        src="../../public/Grade/logn%20.png"
                        alt="">
                    <span>搜索</span>
                </button>
                <button class="out"
                        :plain="true"
                        @click="open2">
                    <img
                        src="../../public/Grade/load.png"
                        alt="">
                    导出
                </button>
            </div>

        </div>
        <!--      主体盒子-->
        <div class="nav">
            <table>
                <tr>
                    <th>
                        数据编号
                    </th>
                    <th>
                        课程编号
                    </th>
                    <th>
                        课程编码
                    </th>
                    <th>
                        课程名称
                    </th>
                    <th>
                        学生学号
                    </th>
                    <th>
                        学生姓名
                    </th>
                    <th>
                        作业总数
                    </th>
                    <th>
                        完成总数
                    </th>
                    <th>
                        作业平均分
                    </th>
                    <th>
                        课程总分
                    </th>
                    <th>
                        课程结束时间
                    </th>
                </tr>
                <tr v-for="(item,index) in tableData"
                    :key="index">
                    <td>
                        {{
                            item.stItmId
                        }}
                    </td>
                    <td>
                        {{
                            item.stCompleteCount
                        }}
                    </td>
                    <td>
                        <p>
                            {{
                                item.itmUUid
                            }}
                        </p>
                    </td>
                    <td>
                        {{
                            item.stItmTitle
                        }}
                    </td>
                    <td>
                        {{
                            item.stUsername
                        }}
                    </td>
                    <td>
                        {{
                            item.stName
                        }}
                    </td>
                    <td>
                        {{
                            item.stTkCount
                        }}
                    </td>
                    <td>
                        {{
                            item.stCompleteCount
                        }}
                    </td>
                    <td>
                        {{
                            item.stAverage
                        }}
                    </td>
                    <td>
                        {{
                            item.stTotalScore
                        }}
                    </td>
                    <td>
                        {{
                            item.stEndTime
                        }}
                    </td>

                </tr>
            </table>
        </div>
        <!--      分页        -->
        <div class="fot">
            <div>
                <el-pagination
                    v-model:current-page="currentPage4"
                    v-model:page-size="pageSize4"
                    :page-sizes="[2, 4, 6, 10]"
                    :disabled="disabled"
                    :background="true"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleSizeChange"
                />
            </div>
        </div>
    </div>

</template>

<script
    lang="ts"
    setup>
import {
    Transcript
} from "@/axios/api"
import {
    reactive,
    ref
} from 'vue'
import {
    ElMessage
} from 'element-plus'
//导出点击
const open2 = () => {
    ElMessage({
        message: '文件已经导出》 --D:/教师文件/',
        type: 'success',
    })
}
let queryInput = ref("")

//搜索框点击事件
let tableData = reactive([])
// 一页显示个数
const currentPage4 = ref(1)
const pageSize4 = ref(10)
const background = ref(true)
const disabled = ref(false)

function logn() {
    if (queryInput.value) {
        Transcript(currentPage4.value, pageSize4.value, queryInput.value).then(res => {
            tableData.splice(0, tableData.length)
            res.data.data.forEach(item => {
                tableData.push(item)
            })
        })
    } else {
        ElMessage({
            message: '请先输入内容！！！',
            type: 'error',
        })
    }
}

function loseInp() {
    if (!queryInput.value) {
        Transcript(currentPage4.value, pageSize4.value, queryInput.value).then(res => {
            tableData.splice(0, tableData.length)
            res.data.data.forEach(item => {
                tableData.push(item)
            })
        })
    }
}


const handleSizeChange = () => {
    Transcript(currentPage4.value, pageSize4.value).then(res => {
        tableData.splice(0, tableData.length)
        res.data.data.forEach(item => {
            tableData.push(item)
        })
    })
}
// 切换页面


//axios请求数据
const currentPage = ref(1) //当前页
const total = ref(0) //总数
const pageSize = ref(10) //当前页容量
Transcript(currentPage.value, pageSize.value).then(res => {
    total.value = res.data.total
    res.data.data.forEach(item => {
        tableData.push(item)
    })
})


</script>

<style
    scoped
    lang="less">
.main {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 20px;
    justify-content: center;
    align-items: center;
}

.top {
    width: 100%;
    height: 5vh;
    /*background-color: #4e8cee;*/
    display: flex;
    justify-content: space-between
}

.topLeft {
    width: 40%;
    height: 100%;
    /*background-color: #2c3e50;*/
    display: flex;
    justify-content: flex-start;

    input {
        width: 80%;
        height: 100%;
        border-radius: 4px;
        box-sizing: border-box;
        padding-left: 10px;
        margin-right: 15px;
        border: 1px solid #e0e2e9;
    }
}

.logn {
    width: 25%;
    height: 100%;
    border-radius: 10px;
    box-sizing: border-box;
    text-align: center;
    background-color: #409eff;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        display: block;
        //padding-left: 5px;
        margin-right: 5px;
        width: 14px;
        height: 14px;
    }
}

.out {
    width: 25%;
    height: 100%;
    border-radius: 10px;
    box-sizing: border-box;
    text-align: center;
    background-color: #67c23a;
    color: #fff;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        display: block;
        //padding-left: 5px;
        margin-right: 5px;
        width: 14px;
        height: 14px;
    }
}

img {
    width: 15px;
    color: #fff;
}

.nav {
    width: 100%;
    margin-bottom: 10px;
    margin-top: 10px;

    table {
        width: 100%;
        border-spacing: 0;
        border-collapse: collapse;

        tr {
            height: 50px;

            &:hover {
                background-color: #f5f7fa;
            }

            td, th {
                border: 1px solid #ccc;


                &:nth-child(1) {
                    width: 6.4%;
                }

                &:nth-child(2) {
                    width: 6.1%;
                }

                &:nth-child(3) {
                    width: 23.5% !important;

                    p {
                        width: 260px;
                        padding-right: 15px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }

                &:nth-child(4) {
                    width: 8%;
                }

                &:nth-child(5) {
                    width: 8%;
                }

                &:nth-child(6) {
                    width: 8%;
                }

                &:nth-child(7) {
                    width: 6.5%;
                }

                &:nth-child(8) {
                    width: 8%;
                }

                &:nth-child(9) {
                    width: 8%;
                }

                &:nth-child(10) {
                    width: 7%;
                }

                &:nth-child(11) {
                    width: 10.5%;
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

.fot {
    position: absolute;
    bottom: 50px;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
