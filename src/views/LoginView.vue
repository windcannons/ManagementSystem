<template>
    <!--登录-->
    <div class="LoginView">
        <div class="from">
            <div class="main">
                <h1>
                    教学管理系统</h1>
                <div class="username inpBox">
                    <div class="imgBox">
                        <img
                            src="../../public/Login/user.png"
                            alt="">
                    </div>
                    <input type="text"
                           name=""
                           id=""
                           v-model="userLogin.name"
                    >
                </div>
                <div class="pass inpBox">
                    <div class="imgBox">
                        <img
                            src="../../public/Login/pass.png"
                            alt="">
                    </div>
                    <input type="text"
                           name=""
                           id=""
                           v-model="userLogin.pass"
                    >
                </div>
                <div class="imgpass inpBox">
                    <div class="imgBox">
                        <img
                            src="../../public/Login/passimg.png"
                            alt="">
                    </div>
                    <input type="text"
                           name=""
                           id=""
                           v-model="userLogin.code"
                    >
                    <div class="PassCode">

                    </div>
                </div>
                <!--    登录按钮-->
                <div class="loginBtn">
                    <el-button
                        type="primary"
                        round
                        class="login"
                        @click="loginBtn">
                        登录
                    </el-button>
                    <el-button
                        type="primary"
                        round
                        class="reset"
                        @click="reset">
                        重置
                    </el-button>
                </div>
            </div>
        </div>
        <!--右侧背景-->
        <div class="bg">
            <img src="../../public/Login/bglogin.svg"
                 alt="">
        </div>
    </div>
</template>
.
<script
    setup>
import {
    adminInfo,
    captcha,
    login
} from "@/axios/api"
import {
    reactive
} from "vue";
import router
    from "@/router";
// 获取验证码
captcha().then(res=>{
    console.log(res)
})

let userLogin = reactive({
    name: "admin",
    pass: "123",
    code: "aa"
})

// 重置
function reset() {
    for (let k in userLogin) {
        userLogin[k] = ""
    }
}

function loginBtn() {
    login({
        username: userLogin.name,
        password: userLogin.pass,
        code: userLogin.code
    }).then(res => {
        window.localStorage.setItem("token", res.data.obj.token)
        if (res.data.code === 200) {
            adminInfo().then(ress => {
                if (ress.status === 200) {
                    window.localStorage.setItem("admin", JSON.stringify(ress.data))
                    router.replace({path: '/'})
                }
            })
        }
    })
}


</script>

<style
    scoped
    lang="less">
.LoginView {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 30px;
    /*表单*/

    .from {
        flex: 0.35;
        height: 600px;
        display: flex;
        align-items: center;
        justify-content: center;

        .main {
            width: 550px;
            height: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;

            h1 {
                font-size: 42px;
                color: #444;
                margin-bottom: 25px;
            }

            .inpBox {
                width: 520px;
                height: 80px;
                border-radius: 40px;
                background-color: #f0f0f0;
                display: flex;
                align-items: center;
                overflow: auto;
                margin: 13px;

                .imgBox {
                    width: 75px;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img {
                        width: 28px;
                        height: 28px;
                    }

                }

                input {
                    flex: 0.85;
                    height: 100%;
                    background-color: #f0f0f0;
                    font-size: 22px;
                    color: #333;
                    font-weight: 800;
                }


                .PassCode {
                    width: 140px;
                    height: 61px;
                    margin-right: 20px;
                    background-color: cornflowerblue;
                }
            }

            //    登录按钮
            .loginBtn {
                width: 80%;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: space-around;

                button {
                    width: 200px;
                    height: 70px;
                    border-radius: 35px;
                    font-size: 20px;
                }
            }
        }
    }

    .bg {
        flex: 0.55;
        height: 68%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
