<script
    setup>
//echarts

import * as echarts
    from "echarts";

provide("echarts", echarts);

import {
    RouterLink,
    RouterView,
    useRoute
} from 'vue-router'
// 引入element 相关组件
import {
    ArrowDown
} from '@element-plus/icons-vue'

import {
    ref,
    onMounted,
    reactive,
    provide,
    watch,
    getCurrentInstance
} from 'vue'

// 引入全屏组件
import screenfull
    from "screenfull"
import router
    from "@/router";
import {
    ElMessageBox,
    ElNotification
} from "element-plus";

// 页面名称
let SystemName = ["教学管理系统", "Instructional Management System"]

// 左侧导航栏内容
let nav = [
    {
        name: "首页",
        enName: "Home",
        img: "../public/APP/home1.png",
        isimg: "../public/APP/home.png",
        to: "/"
    },
    {
        name: "通知管理",
        enName: "Notice",
        img: "../public/APP/info1.png",
        isimg: "../public/APP/info.png",
        to: "/InformView"
    },
    {
        name: "用户管理",
        enName: "User",
        img: "../public/APP/user1.png",
        isimg: "../public/APP/user.png",
        to: "/UserView"
    },
    {
        name: "课程管理",
        enName: "Course",
        img: "../public/APP/class1.png",
        isimg: "../public/APP/class.png",
        to: "/CourseView"
    },
    {
        name: "成绩管理",
        enName: "Grades",
        img: "../public/APP/grade1.png",
        isimg: "../public/APP/grade.png",
        to: "/GradeView"
    }]
let checkNavNun = ref(0)

// 导航栏的选择
function changeNav(index) {
    checkNavNun.value = index
}

let userInfos = reactive(JSON.parse(window.localStorage.getItem("admin")) || {})
const vm = getCurrentInstance().proxy
// 监听$route对象的变化
watch(() => vm.$route, (to, from) => {
    if (from.path === "/LoginView") {
        let useinfo = JSON.parse(window.localStorage.getItem("admin"))
        for (let k in useinfo) {
            userInfos[k] = useinfo[k]
        }
        if (window.localStorage.getItem("token")) {
            ElNotification({
                title: 'Success',
                message: '登录成功',
                type: 'success',
            })
        }
    }
})

onMounted(() => {
    if (!window.localStorage.getItem("token")) {
        router.replace({path: '/LoginView'})
    }
    let path = location.pathname
    if (path === '') {
        checkNavNun.value = 0
    }
    if (path === '/InformView') {
        checkNavNun.value = 1
    }
    if (path === '/UserView') {
        checkNavNun.value = 2
    }
    if (path === '/CourseView') {
        checkNavNun.value = 3
    }
    if (path === '/GradeView') {
        checkNavNun.value = 4
    }
})

// 设置导航栏的移动
let showNav = ref(true)

function setNav() {
    showNav.value = !showNav.value
}

// 头部文字
let title = reactive(['教师端', 'Teacher'])


// 设置语言的切换
let NowLang = ref(true)
let upLang = ref("中文")
let chengLang = ref("英文")

function ChangeLang(lang) {
    NowLang.value = lang === "中文";
    [upLang.value, chengLang.value] = [chengLang.value, upLang.value]
}

// 设置全屏与否
let isMaxScreen = ref(false)
let screenimg = reactive(["../public/APP/maxScreen.png", "../public/APP/minScreen.png"])

function changeScreen() {
    isMaxScreen.value = !isMaxScreen.value
    screenfull.toggle()
}


// 退出登录
const dialogVisible = ref(false)

const handleClose = (done) => {
    ElMessageBox.confirm('是否取消退出', '警告', {
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

function SignOut() {
    dialogVisible.value = false
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("admin")
    router.replace({path: '/LoginView'})
}
</script>

<template>
    <div class="boss">
        <!--    左侧导航栏-->
        <div class="leBox"
             :class="showNav?'':'minNav'">
            <div class="lenav">
                <div class="top">
                    <img
                        src="../public/APP/logo.png"
                        alt="">
                    <span v-show="NowLang">
                        {{
                            SystemName[0]
                        }}
                    </span>
                    <span v-show="!NowLang"
                          class="enSystem">
                        {{
                            SystemName[1]
                        }}
                    </span>
                </div>
                <ul>
                    <template
                        v-for="(item,index) in nav"
                        :key="index">
                        <RouterLink
                            :to="item.to">
                            <li :class="checkNavNun === index?'checkNav':''"
                                @click="changeNav(index)">
                                <img
                                    :src="item.img"
                                    v-show="checkNavNun !== index"
                                    alt="">
                                <img
                                    :src="item.isimg"
                                    v-show="checkNavNun=== index"
                                    alt="">
                                <span v-show="NowLang">
                                    {{
                                        item.name
                                    }}
                                </span>
                                <span v-show="!NowLang">
                                    {{
                                        item.enName
                                    }}
                                </span>
                            </li>
                        </RouterLink>
                    </template>
                </ul>
            </div>
        </div>
        <!--        右侧内容-->
        <div class="riBox">
            <!--        头部-->
            <div class="riTop">
                <!-- 设置导航栏的缩放-->
                <div class="leSetNav"
                     @click="setNav">
                    <img
                        :class="showNav?'':'isSetNav'"
                        src="../public/APP/setNav.png"
                        alt="">
                </div>
                <div class="title">
                    <span v-show="NowLang">{{
                            title[0]
                        }}</span>
                    <span v-show="!NowLang">{{
                            title[1]
                        }}</span>
                </div>
                <div class="riinfo">
                    <!-- 设置语言-->
                    <div class="lang">
                        <img v-show="NowLang"
                             src="../public/APP/chImg.jpg"
                             alt="">
                        <img v-show="!NowLang"
                             src="https://img1.baidu.com/it/u=1608439503,245312181&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333"
                             alt="">
                        <div class="change">
                            <el-dropdown
                                @command="ChangeLang(chengLang)">
                                <span class="el-dropdown-link">
                                  {{
                                        upLang
                                    }}
                                  <el-icon
                                      class="el-icon--right">
                                    <arrow-down/>
                                  </el-icon>
                                </span>
                                <template
                                    #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item
                                            command="英文">
                                            {{
                                                chengLang
                                            }}
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </div>
                    <!-- 设置全屏-->
                    <div class="setshow"
                         @click="changeScreen">
                        <img
                            :src="isMaxScreen?screenimg[1]:screenimg[0]"
                            alt="">
                    </div>
                    <!-- 用户信息-->
                    <div class="userinfo"
                         v-if="userInfos">
                        <div class="name">
                            {{
                                userInfos.username
                            }}
                        </div>
                        <div class="type">
                            {{
                                userInfos.name
                            }}
                        </div>
                    </div>
                    <!--  用户头像-->
                    <div class="userimg"
                         v-if="userInfos">
                        <el-dropdown
                            aria-expanded="true">
                            <img aria-expanded="true"
                                 :src="userInfos.userFace"
                                 alt="">
                            <template
                                #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item
                                        command="退出登录">
                                        <el-button
                                            text
                                            @click="dialogVisible = true">
                                            退出登录
                                        </el-button>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
            </div>
            <!--退出登录的弹窗-->
            <el-dialog
                class="SignOut"
                v-model="dialogVisible"
                title="退出登录"
                width="30%"
                center
                :before-close="handleClose"
            >
                <span style="font-size: 18px">是否退出登录</span>
                <template
                    #footer>
                    <span class="dialog-footer">
                    <el-button
                        @click="CancelOut">取消</el-button>
                    <el-button
                        type="danger"
                        @click="SignOut">
                        确定
                    </el-button>
                    </span>
                </template>
            </el-dialog>
            <!--        主体-->
            <div class="RiMain">
                <RouterView></RouterView>
            </div>

        </div>
    </div>
</template>

<style
    scoped
    lang="less">
.boss {
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 25px;
    overflow: hidden;
}

//导航栏盒子
.leBox {
    transition: .4s;
    width: 290px !important;
    height: 100vh;
    padding-right: 25px;

    .lenav {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 0 20px 20px 0;
        line-height: 50px;
        font-size: 18px;

        .top {
            width: 100%;
            height: 80px;
            padding: 15px 0 15px 25px;
            font-size: 20px;
            font-weight: 800;
            display: flex;
            align-items: center;

            img {
                width: 40px;
                height: 40px;
                margin-right: 8px;
            }

            span {
                white-space: nowrap
            }

            .enSystem {
                flex: 1;
                white-space: normal;
                line-height: 23px;
                font-size: 16px;
                overflow: hidden;
            }
        }

        ul {
            width: 100%;

            a:hover {
                color: #000;
            }

            li {
                height: 70px;
                padding-left: 30px;
                border-radius: 0 15px 15px 0;
                cursor: pointer;
                display: flex;
                align-items: center;
                user-select: none;
                margin: 5px 0;

                &:not(.checkNav):hover {
                    background-color: #dedcdc;
                }

                img {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }

                span {
                    white-space: nowrap
                }
            }
        }

        //添加被选中类
        .checkNav {
            background-color: #4e8cee;
            color: #fff;
        }
    }
}

//缩放后的迷你导航栏
.minNav {
    width: 100px !important;

    .lenav {
        .top {
            padding-left: 20px;

            span {
                display: none;
            }
        }

        ul {
            li {
                span {
                    display: none;
                }
            }
        }
    }
}

//右侧盒子
.riBox {
    flex: 1;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    //  右侧头部
    .riTop {
        width: 100%;
        height: 60px;
        background-color: #fff;
        border-radius: 15px;
        margin-bottom: 25px;
        display: flex;
        align-items: center;
        padding: 0 15px;

        .leSetNav {
            width: 30px;
            height: 30px;
            cursor: pointer;

            img {
                width: 30px;
                height: 30px;
            }
        }

        .isSetNav {
            transform: rotate(180deg);
        }

        //  头部标题文字
        .title {
            flex: 1;
            font-size: 22px;
            font-weight: 800;
            text-align: center;
        }

        //  右侧信息内容

        .riinfo {
            width: 360px;
            display: flex;
            align-items: center;
            justify-content: space-around;

            //  语言
            .lang {
                width: 130px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                img {
                    width: 40px;
                    height: 26px;
                }

                .change {
                    .el-dropdown {
                        display: block !important;
                        border: 3px solid transparent;
                        padding: 5px;

                        span {
                            outline: none;
                        }
                    }

                    .example-showcase {
                        border: none !important;

                        .el-dropdown-link {
                            border: none !important;
                            cursor: pointer;
                            color: var(--el-color-primary);
                            display: flex;
                            align-items: center;
                        }
                    }
                }
            }

            //全屏
            .setshow {
                width: 35px;
                height: 35px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            //用户信息
            .userinfo {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                text-align: right;

                .name {
                    font-size: 16px;
                    font-weight: 800;
                }

                .type {
                    font-size: 13px;
                }
            }

            //用户头像
            .userimg {
                width: 40px;
                height: 40px;
                margin-left: 10px;

                img {
                    width: 100%;
                    height: 40px;
                    border-radius: 25px;
                    outline: none;
                }

                .el-dropdown-menu__item {
                    justify-content: center;
                }
            }
        }
    }

    //右侧主体
    .RiMain {
        width: 100%;
        flex: 1;
        background-color: #fff;
        border-radius: 15px;
        transition: .4s;
    }
}
</style>
