// import { post } from "jquery";
import {
    request,
    requestAuth,
    requestApi3,
    requestMonitor, // 监控的接口
    requestEdit
} from "./request";

// 获取列表信息
export function getMessageList_fromServer(formData) {
    return  request({
        url: `/getMessageList`,
        method: 'post',
        data:formData
    })
}