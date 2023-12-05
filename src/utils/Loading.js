import { Loading } from "element-ui";

let loading = null

const showLoading = (params) => {
    if (loading) {
        loading.close()
    }
    let options = {
        fullscreem: false,
        text: '数据加载中',
        background: 'rgba(255,255,255,0.6)'
    }
    Object.assign(options, params)

    loading = Loading.service(options)
}

const hideLoading = () => {
    if (loading) {
        loading.close()
    }

}

export {
    showLoading,
    hideLoading
}