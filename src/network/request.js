import axios from "axios";

let BASE_URL = '';
let BASE_URL2 = '';
let BASE_URL3 = '';
let BASE_URL4 = '/sjfc_api4';
let BASE_URL5 = '';

if (process.env.NODE_ENV === 'development') {
    BASE_URL = '/lb_sg1'
    BASE_URL2 = '/aram_api2'
    BASE_URL3 = '/sjfc_api3'
    BASE_URL5 = '/blch_new'
} else if (process.env.NODE_ENV === 'production') {
    // BASE_URL = 'http://10.1.18.156:8081'
    BASE_URL = '/lb_sg1';
    BASE_URL2 = '/aram_api2';
    BASE_URL3 = '/api3';
    BASE_URL5 = '/blch_new'
} else {
    BASE_URL = '/lb_sg1'
    BASE_URL2 = '/aram_api2'
    BASE_URL3 = '/sjfc_api3'
    BASE_URL5 = '/blch_new'
}



export function request(config,type = 1) {
    // 1.创建axios实例
    const instance = axios.create({
        baseURL: type == 1?BASE_URL:type,
        timeout: 40000
    })
    // 2.1axios的拦截器（请求拦截）
    instance.interceptors.request.use(config => {
            // 1.拦截config中的一些不符合服务器的信息

            // 2.每次发送网络请求时添加请求图标（加载动画）

            // 3.某些网络请求（登录），必须携带一些特殊的信息（token）
            // console.log(config);
            // 返回config以继续
            return config
        },
        error => {
            console.log(error)
            Promise.reject(error)
        });
    // 2.2响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data
    }, error => {
        console.log('err' + error)
        let {
            message
        } = error;
        // if (message == "Network Error") {
        //     message = "后端接口连接异常";
        // } else if (message.includes("timeout")) {
        //     message = "系统接口请求超时";
        // } else if (message.includes("Request failed with status code")) {
        //     message = "系统接口" + message.substr(message.length - 3) + "异常";
        // }
        // Message({
        //     message: message,
        //     type: 'error',
        //     duration: 5 * 1000
        // })
        return Promise.reject(error)
    });



    //3. 发送真正的网络请求
    // instance()的返回值就是PROMISE
    return instance(config)
}

export function requestApi3(config,type = 1) {
    // 1.创建axios实例
    const instance = axios.create({
        baseURL: type == 1?BASE_URL2:type,
        timeout: 40000
    })
    // 2.1axios的拦截器（请求拦截）
    instance.interceptors.request.use(config => {
            // 1.拦截config中的一些不符合服务器的信息

            // 2.每次发送网络请求时添加请求图标（加载动画）

            // 3.某些网络请求（登录），必须携带一些特殊的信息（token）
            // console.log(config);
            // 返回config以继续
            return config
        },
        error => {
            console.log(error)
            Promise.reject(error)
        });
    // 2.2响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data
    }, error => {
        console.log('接口报错' + error)
        let {
            message
        } = error;
        // if (message == "Network Error") {
        //     message = "后端接口连接异常";
        // } else if (message.includes("timeout")) {
        //     message = "系统接口请求超时";
        // } else if (message.includes("Request failed with status code")) {
        //     message = "系统接口" + message.substr(message.length - 3) + "异常";
        // }
        // Message({
        //     message: message,
        //     type: 'error',
        //     duration: 5 * 1000
        // })
        return Promise.reject()
    });



    //3. 发送真正的网络请求
    // instance()的返回值就是PROMISE
    return instance(config)
}