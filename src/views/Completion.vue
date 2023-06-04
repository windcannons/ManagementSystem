<template>

    <div class="Completion">
        <!--完成情况-->
        <!--搜索导航-->
        <div class="Course-nav">
            <!--搜索-->
            <div class="nav-seek">
                <input type="text" placeholder="请输入课程名称">
                <el-row class="mb-4">
                    <el-button type="info">
                        <img src="../../public/course/seek-1.png" alt="">
                        <p>搜索</p>
                    </el-button>
                </el-row>
            </div>
        </div>
        <!--表格-->
        <div class="Completion-tabulation">
            <table>
                <tr>
                    <th>数据编号</th>
                    <th>作业编码</th>
                    <th>完成学生</th>
                    <th>答题内容</th>
                    <th>得分</th>
                    <th>完成时间</th>
                </tr>
                <tr v-for="item in 8" >
                    <td>
                        38
                    </td>
                    <td>
                        33
                    </td>
                    <td>
                       张三
                    </td>
                    <td>
                       sss
                    </td>
                    <td>
                      10
                    </td>
                    <td>
                        2022-06-21 18:34:58
                    </td>
                </tr>
            </table>
        </div>
        <!--分页-->
        <div class="Job-pagination">
            <el-pagination
                v-model:current-page="currentPage4"
                v-model:page-size="pageSize4"
                :page-sizes="[2,4,6,8,10]"
                :disabled="disabled"
                :background="background"
                layout="total, sizes, prev, pager, next, jumper"
                :total="5"
                @size-change="handleSizeChange"
                @current-change="handleSizeChange"/>
        </div>
    </div>
</template>

<script>
import {ref} from "vue";
import {courseTaskPage} from "@/axios/api";
export default {
    name: "Completion"
}
// 分页
let total = ref(0);

const currentPage4 = ref(1)
const pageSize4 = ref(10)
const background = ref(true)
const disabled = ref(false)

const handleSizeChange = () => {
    courseTaskPage(currentPage4.value, pageSize4.value).then(res => {
        homeworkList.splice(0, homeworkList.length)
        res.data.data.forEach(item => {
            homeworkList.push(item)
        })
    })
}

</script>

<style scoped lang="less">
.Completion{
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  padding: 30px;
  //搜索
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

  //表格
  .Completion-tabulation {
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
  }
}
//分页
.Job-pagination {
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