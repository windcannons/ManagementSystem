<template>
    <div class="HomeView">
        <div class="leBox">
            <div class="swiperBox">
                <el-carousel
                        height="100%"
                        :interval="5000"
                        arrow="always">
                    <el-carousel-item
                            v-for="(item,index) in swiperData"
                            :key="index">
                        <h2 class="swpTitle">
                            通知栏</h2>
                        <ul class="swpMsg">
                            <li>
                                <el-button
                                        type="primary">
                                    通知时间:
                                </el-button>
                                <p>
                                    {{
                                    item.nicCreateTime
                                    }}</p>
                            </li>
                            <li>
                                <el-button
                                        type="primary">
                                    通知人员:
                                </el-button>
                                <p>
                                    {{
                                    item.nicUserName
                                    }}</p>
                            </li>
                            <li>
                                <el-button
                                        type="primary">
                                    通知内容:
                                </el-button>
                                <div>
                                    {{
                                    item.nicTitle
                                    }}
                                </div>
                            </li>
                        </ul>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="fot">
                <div class="fotLe">
                    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
                    <div class="fotTitle">
                        作业占比
                    </div>
                    <div ref="myleChart"
                         id="leChart"></div>
                </div>
                <div class="fotRi">
                    <div class="fotRiTitle">
                        成绩TOP5
                    </div>
                    <div ref="myriChart"
                         id="riChart"></div>
                </div>
            </div>
        </div>
        <div class="riBox">
            <div class="ri">
                <div class="riTitle">
                    学生信息列表
                </div>
                <div class="riMsg">
                    <div>
                        id
                    </div>
                    <div>
                        头像
                    </div>
                    <div>
                        姓名
                    </div>
                    <div>
                        状态
                    </div>
                </div>
                <ul class="riul">
                    <li class="rili"
                        v-for="(item,index) in stData"
                        :key="index">
                        <div>
                            {{
                            item.id
                            }}
                        </div>
                        <div>
                            <img :src="item.userFace"
                                 alt="">
                        </div>
                        <div>
                            {{
                            item.name
                            }}
                        </div>
                        <div>
                            <el-button
                                    type="primary"
                                    v-if="item.enabled">
                                已启动
                            </el-button>
                            <el-button
                                    type="danger"
                                    v-if="!item.enabled">
                                已禁用
                            </el-button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
import * as echarts
    from "echarts"
import {
    notice,
    page
} from "@/axios/api"
import {
    getCurrentInstance,
    onMounted,
    reactive
} from "vue";


onMounted(() => {
    //右侧echarts
    let myEchartsRi = echarts.init(<HTMLElement>getCurrentInstance().proxy.$refs.myriChart)
    myEchartsRi.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['小王', '小李', '小何', '小张', '小帅', '小丑', '小美'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '80%',
                data: [560, 699, 598, 597, 596, 535, 695]
            }
        ]
    });
    // 左侧echarts
    let myEcharts = echarts.init(<HTMLElement>getCurrentInstance().proxy.$refs.myleChart)
    const data = genData(50);
    myEcharts.setOption({
        backgroundColor: 'rgba(255,255,255,0)',
        tooltip: {
            trigger: 'item',
            formatter: "{b}: <br/>{c} ({d}%)"
        },
        color: ['#a6c5f6', '#4e8cee', '#00d2dd', '#80cc45', '#fd5151', '#4f8def', '#f56c6c'],
        legend: { //图例组件，颜色和名字
            x: '70%',
            y: 'center',
            orient: 'vertical',
            itemGap: 12, //图例每项之间的间隔
            itemWidth: 10,
            itemHeight: 10,
            icon: 'rect',
            data: ["语文", "数学", "历史", "地理", "化学"],
            textStyle: {
                color: [],
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12,
            }
        },
        series: [{
            name: '作业数量',
            type: 'pie',
            clockwise: false, //饼图的扇区是否是顺时针排布
            minAngle: 20, //最小的扇区角度（0 ~ 360）
            center: ['35%', '50%'], //饼图的中心（圆心）坐标
            radius: [40, 60], //饼图的半径
            //  avoidLabelOverlap: true, ////是否启用防止标签重叠
            itemStyle: { //图形样式
                normal: {
                    borderColor: 'transparent',
                    borderWidth: 2,
                },
            },
            label: { //标签的位置
                normal: {
                    show: true,
                    position: 'inside', //标签的位置
                    formatter: "{d}%",
                    textStyle: {
                        color: '#fff',
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontWeight: 'bold'
                    }
                }
            },
            data: [{
                name: "语文",
                value: 2
            }, {
                name: "数学",
                value: 3
            }, {
                name: "历史",
                value: 2
            }, {
                name: "地理",
                value: 3
            }, {
                name: "化学",
                value: 2
            }]

        }, {
            name: '',
            type: 'pie',
            clockwise: false,
            silent: true,
            minAngle: 20, //最小的扇区角度（0 ~ 360）
            center: ['35%', '50%'], //饼图的中心（圆心）坐标
            radius: [0, 80], //饼图的半径
            itemStyle: { //图形样式
                normal: {
                    borderColor: '#fff',
                    borderWidth: 5,
                    opacity: 0.21,
                }
            },
            label: { //标签的位置
                normal: {
                    show: false,
                }
            },
            data: [{
                name: "语文",
                value: 2
            }, {
                name: "数学",
                value: 3
            }, {
                name: "历史",
                value: 2
            }, {
                name: "地理",
                value: 3
            }, {
                name: "化学",
                value: 2
            }]
        }]
    })
    // myEcharts.setOption({
    //     title: {
    //         left: 'center'
    //     },
    //     tooltip: {
    //         trigger: 'item',
    //         formatter: '{a} <br/>{b} : {c} ({d}%)'
    //     },
    //     legend: {
    //         type: 'scroll',
    //         orient: 'vertical',
    //         right: 10,
    //         top: 20,
    //         bottom: 20,
    //     },
    //     series: [
    //         {
    //             name: '作业',
    //             type: 'pie',
    //             radius: '55%',
    //             center: ['40%', '50%'],
    //             data: data.seriesData,
    //             emphasis: {
    //                 itemStyle: {
    //                     shadowBlur: 10,
    //                     shadowOffsetX: 0,
    //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
    //                 }
    //             }
    //         }
    //     ]
    // })
})
//axios请求数据
let swiperData = reactive([])
notice().then(res => {
    res.data.data.slice(0, 5).forEach(item => {

        swiperData.push(item)
    })

})
//获取学生列表
let stData = reactive([])
page().then(res => {
    res.data.data.forEach(item => {
        stData.push(item)
    })

})

function genData(count) {
    // prettier-ignore

    const seriesData = [{
        name: "text1",
        value: "1"
    }, {
        name: "text2",
        value: "2"
    }, {
        name: "text3",
        value: "3"
    }, {
        name: "text4",
        value: "1"
    }, {
        name: "text5",
        value: "4"
    }, {
        name: "text6",
        value: "0"
    }];
    return {
        seriesData: seriesData
    };

}
</script>
<style
    scoped
    lang="less">
.HomeView {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #f5f5f5;
  //左侧盒子
  .leBox {
    flex: 7;
    height: 100%;
    //background-color: skyblue;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    //轮播图区域
    .swiperBox {
      width: 100%;
      height: 50%;
      background-color: #fff;
      border-radius: 15px;

      .el-carousel__button {
        background-color: #000;
        width: 100px;
        height: 200px;
      }

      //轮播图样式
      .el-carousel--horizontal {
        height: 100%;
        border-radius: 15px;


        .el-carousel__container {
          height: 100%;
          border-radius: 15px;

          .swpTitle {
            text-align: center;
            margin-top: 10px;
            color: #595959;
          }

          .swpMsg {
            width: 90%;
            justify-content: center;
            align-items: center;
          }

          .swpMsg > li {
            //text-align: center;
            margin-top: 15px;
            margin-left: 70px;
            display: flex;
            //align-items: center;

            p {
              display: flex;
              align-items: center;
              width: 80%;
              height: auto;
              padding-left: 20px;
              font-size: 16px;
              color: #595959;
              font-weight: 800;
              word-wrap: break-word;
              word-break: break-all;
            }

            div {
              width: 80%;
              height: auto;
              padding-left: 20px;
              font-size: 16px;
              color: #595959;
              font-weight: 800;
              word-wrap: break-word;
              word-break: break-all;
              overflow: hidden;
              text-overflow: ellipsis;
              /* 弹性伸缩盒子模型显示 */
              display: -webkit-box;
              /* 限制在一个块元素显示的文本的行数 */
              -webkit-line-clamp: 6;
              /* 设置或探索伸缩盒对象的子元素的排列方式 */
              -webkit-box-orient: vertical;
            }
          }

          //轮播图背景色
          .el-carousel__item h3 {
            color: #475669;
            opacity: 0.75;
            line-height: 300px;
            margin: 0;
            text-align: center;
          }

          .el-carousel__item:nth-child(2n) {
            background-color: #d3dce6;
          }

          .el-carousel__item:nth-child(2n + 1) {
            background-color: #d3dce6;
          }
        }

      }

    }

    //底部区域
    .fot {
      width: 100%;
      height: 45%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .fotLe, .fotRi {
        width: 55%;
        height: 100%;
        border-radius: 15px;
        background-color: #fff;
        padding-top: 10px;


        .fotTitle {
          height: 10%;
          padding-left: 20px;
          font-size: 18px;
          font-weight: 800;
          line-height: 30px;
        }

        #leChart {
          //margin: 0;
          width: 100%;
          height: 90%;

          div {
            width: 100%;
            height: 100%;

            canvas {
              width: 100%;
              height: 100%;
            }
          }
        }

        .fotRiTitle {
          height: 10%;
          padding-left: 20px;
          font-size: 18px;
          line-height: 30px;
          font-weight: 800;
        }

        #riChart {
          width: 100%;
          height: 90%;

          div {
            width: 100%;
            height: 100%;

            canvas {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .fotRi {
        width: 40%;
      }
    }
  }

  //右侧盒子
  .riBox {
    flex: 3;
    padding-left: 50px;
    height: 100%;

    .ri {
      width: 100%;
      height: 100%;
      background-color: #fff;
      padding: 10px 13px;
      border-radius: 25px;

      .riMsg {
        width: 100%;
        display: flex;
        font-size: 14px;
        font-weight: 800;
        color: #4f4f4f;
        justify-content: space-around;

        div {
          width: 25%;
          text-align: center;

        }
      }

      .riTitle {
        width: 100%;
        height: 50px;
        text-align: center;
        color: #4f4f4f;
        line-height: 50px;

        font-size: 20px;
        font-weight: 800;
      }

      .riul {
        width: 100%;
        height: 82%;
        margin-top: 10px;
        overflow: auto;
        background-color: #f3f8ff;
        border-radius: 10px;

        &::-webkit-scrollbar {
          display: none;
        }

        .rili {
          width: 100%;
          height: 35px;
          margin: 15px 0;
          font-size: 14px;
          font-weight: 600;
          color: #283130;
          display: flex;
          justify-content: space-around;
          align-items: center;
          overflow: hidden;

          div {
            width: 25%;
            height: 100%;
            text-align: center;
            line-height: 250%;

            img {
              width: 35px;
              //text-align: center;
              height: 35px;
              border-radius: 35px;
            }
          }
        }
      }
    }
  }
}
</style>
