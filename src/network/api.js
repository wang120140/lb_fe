// import { post } from "jquery";
import {
    request,
    requestAuth,
    requestApi3,
    requestMonitor, // 监控的接口
    requestEdit
} from "./request";

/**
 * 
 */
/**
 * 发请求，校验文件是否上传过，分三种情况：见：fileStatus
 * */

export const checkFileFn_fromServer = (fileMd5) => {
    return  request({
        url: `/bigfile/check?fileMd5=${fileMd5}`,
        method: 'post',
    })
}

/**
 * 分片上传请求接口
 * */
export function sliceFileUploadFn_fromServer(formData) {
    return  request({
        url: `/bigfile/upload`,
        method: 'post',
        data:formData
    })
}

/**
 * 告知后端要去合并前端上传的文件了
 * */
export function tellBackendMergeFn_fromServer(fileName, fileMd5,conf) {
    let tem = fileName.split('.');
    let suffix = tem[tem.length - 1];

    let fName = fileName.replace('.'+suffix,'')

    return  request({
        url:`/bigfile/merge?fileName=${fName}_${new Date().getTime()}.${suffix}&fileMd5=${fileMd5}`,
        method: 'post',
        data:{
            conf
        }
    })
}
/**
 * 下载日志文件
 * */
export function shellDown_fromServer(fileName, fileMd5) {
    return  request({
        url:`/shell/downLoadLog`,
        method: 'post',
    })
}

/**
 * 获取配置
 */
export function envGetConfig_fromServer() {
    return  request({
        url:`/env/getConfig`,
        method: 'get',
    })
}

/**
 * 更新配置
 */
export function envUpdateConfig_fromServer(data) {
    return  request({
        url:`/env/updateConfig`,
        method: 'post',
        data
    })
}

/**
 * 脚本上传
 */
export function shellUploadShell_fromServer(data) {
    return  request({
        url:`/shell/uploadShell`,
        method: 'post',
        data
    })
}


































////////////////一下是上个项目的api 可以删除处理不需要的接口/////////////////////

/**
 * 回放清单查询
 * get_Replay_Data_List
 */
export const getReplay_bq_DataListFromServer = data => request({
    url: '/get_bq_Replay_Data_List',
    method: 'post',
    data,
})

export const modelOutput = data => request({
    url: '/obs/showModelOutPut',
    method: 'post',
    data
})

export const findEntity = data => request({
    url: '/entity/findEntity',
    method: 'post',
    data
})

export const showHistyry = data => request({
    url: '/obs/showHistory',
    method: 'post',
    data
})

export const showMainTarget = data => request({
    url:'/monitoringManager/showEntityMonitoring',
    method:'post',
    data
})

/**
 * 监控统计目标出现频次
 * @param {
 *      endTime,
 *      startTime,
 *      threatLevel
 *      entityType
 *      position
 * } data 
 * @returns 
 */
export const targetFrequencyStatistics = data => request({
    url: '/obs/targetFrequencyStatistics',
    method: 'post',
    data
})

//获取码值

// type1 飞机 type2 舰艇 type3 区域 type4 等级 
export const getCode = data => request({
    url: '/code/get',
    method: 'post',
    data: {
        type: data
    }
})
/**
 * @param code:Number 
 * 
 * 通过码值获取对应区域坐标
 * 
 */
export const findPosition = code => request({
    url: '/monitoringRegion/find',
    method: 'post',
    data: `mType=${code}`
})

/**
 * 事件列表 GET/api/event/list?session=${UUID}&keywords=${KEYWORDS}
 */
export const eventList_fromSever = (_pram) => {
    if (_pram.keyWords) {
        return requestApi3({
            url: `/event/list?keywords=${_pram.keyWords}`,
            method: 'get',
        })

    } else {
        return requestApi3({
            url: '/event/list',
            method: 'get',
        })
    }

}

/**
 * 事件详情  GET/api/event/detail?session=${UUID}&id=${EVENT_ID}
 */
export const eventDetail_fromSever = (_pram) => {

    return requestApi3({
        url: `/event/detail?id=${_pram.event_id}`,
        method: 'get',
    })

}

/**
 * 任务列表 GET/api/task/list?session=${UUID}
 */
export const taskList_fromSever = (_pram) => {

    return requestApi3({
        url: `/task/list?event_id=${_pram.event_id}`,
        method: 'get',
    })
}

/**
 * 任务详情 GET/api/task/detail?session=${UUID}&id={$TASK_ID}
 */
export const taskDetail_fromSever = (_pram) => {

    return requestApi3({
        url: `/task/detail?id=${_pram.task_id}`,
        method: 'get',
    })

}

/**
 * 文章下载事件  http://172.18.116.197:8009/api/document/download?id=1
 */
export const documentDownload_fromSever = (_pram) => {

    return requestApi3({
        url: `/document/download?id=${_pram.doc_id}`,
        method: 'get',
    })

}
