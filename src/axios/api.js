// 对请求接口进行封装

// 引入封装好的axios实例
import requests
    from './axios.js';

// 通知管理 start
let notice = (params = {}) => {
    return requests.get('/notice/page', params)
}
let addOrUpdate = (params = {}) => {
    return requests.post(`/notice/addOrUpdate`, params)
}
let delnotice = (id) => {
    return requests.post('/notice/delete?nicId=' + id)
}


// 通知管理 end
// 登录start

let adminInfo = (params = {}) => {
    return requests.get('/admin/info', params)
}
let captcha = (params = {}) => {
    return requests.get('/captcha', params)
}
// 登录end

// 成绩管理start

let Transcript = (page = 1, size = 10, text = "") => {
    return requests.get(`/course/studentTranscript?currentPage=${page}&size=${size}&itmId=${text}`)
}

// 成绩管理end
// 获取学生列表start
// 获取学生列表end
// 登录start
// 登录end
// 获取用户分页start（用户管理）
let page = (currentPage = 1, size = 1000, text = '') => {
    return requests.get(`/page?currentPage=${currentPage}&size=${size}&text=${text}`)
}
let userInfo = (params = {}) => {
    return requests.post(`/admin-info`, params)
}

//获取用户分页end
// 删除单个用户start（用户管理）
let deleteAdmin = (id) => {
    return requests.post(`/deleteAdmin?id=${id}`)
}
// 删除单个用户end
// 新增用户start(用户管理)
let addAdmin = (params = {}) => {
    return requests.post(`/addAdmin`, params)
}
//新增用户end
//批量删除用户start（用户管理）
let deleteAdmins = (params = {}) => {
    return requests.post('/deleteAdmins', params)
}
//批量擅长用户end
// 更新状态start（用户管理）

// 更新状态end（用户管理）

let login = (params = {}) => {
    return requests.post('/login', params)
}

// 课程管理
// 登录start
let course = (currentPage = 1, size = 10) => {
    return requests.get(`/course/page?currentPage=${currentPage}&size=${size}`)
}
// 添加课程
let add = (params = {}) => {
    return requests.post('/course/add', params)
}
// 作业详情
let courseTaskPage = (currentPage = 1, size = 10) => {
    return requests.get(`/course/courseTaskPage?currentPage=${currentPage}&size=${size}`)
}
//
// 删除
let deletes = (params = {}) => {
    return requests.post('/course/delete', params)
}


// 登录end

export {
    captcha,
    notice,
    Transcript,
    page,
    login,
    deleteAdmin,
    addAdmin,
    deleteAdmins,
    adminInfo,
    addOrUpdate,
    delnotice,
    userInfo,
    course,
    add,
    courseTaskPage,
    deletes,
}


