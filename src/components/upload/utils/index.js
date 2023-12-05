// 引入包
import SparkMD5 from "spark-md5"
import axios from "axios";

// 文件分片函数
export function sliceFn(file, chunkSize) {
    const result = [];
    for (let i = 0; i < file.size; i = i + chunkSize) {
        result.push(file.slice(i, i + chunkSize));
    }
    console.log(result)
    console.log("结果信息内容......")
    return result;
}

/**
 * 计算文件的md5值的函数
 * */
export function calFileMd5Fn(chunks, progressCallbackFn) {
    return new Promise((resolve, reject) => {
        let currentChunk = 0
        let spark = new SparkMD5.ArrayBuffer()
        let fileReader = new FileReader()
        fileReader.onerror = reject
        fileReader.onload = (e) => {
            progressCallbackFn(Math.ceil(currentChunk / chunks.length * 100)) 
            spark.append(e.target.result) 
            currentChunk = currentChunk + 1 
            if (currentChunk < chunks.length) {
                fileReader.readAsArrayBuffer(chunks[currentChunk])
            } else {
                resolve(spark.end())
            }
        }
        fileReader.readAsArrayBuffer(chunks[currentChunk])
    })
}

/**
 * 发请求，校验文件是否上传过，分三种情况：见：fileStatus
 * */
export function checkFileFn(fileMd5) {
    return new Promise((resolve, reject) => {
        resolve(axios.post(`http://127.0.0.1:8686/bigfile/check?fileMd5=${fileMd5}`))
    })
}

/**
 * 分片上传请求接口
 * */
export function sliceFileUploadFn(formData) {
    return new Promise((resolve, reject) => {
        resolve(axios.post("http://127.0.0.1:8686/bigfile/upload", formData))
    })
}

/**
 * 告知后端要去合并前端上传的文件了
 * */
export function tellBackendMergeFn(fileName, fileMd5) {
    return new Promise((resolve, reject) => {
        resolve(axios.post(`http://127.0.0.1:8686/bigfile/merge?fileName=${fileName}&fileMd5=${fileMd5}`))
    })
}

