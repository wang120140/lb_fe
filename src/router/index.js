import Vue from 'vue'
import VueRouter from 'vue-router'

const originReplace = VueRouter.prototype.replace

VueRouter.prototype.replace = function (location, onComplete, onAbort) {
    if (onComplete === undefined && onAbort === undefined) {
        return originReplace.call(this, location, onComplete, onAbort).catch(() => { })
    } else {
        originReplace.call(this, location, onComplete, onAbort)
    }
}
// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err)
}



Vue.use(VueRouter)

const routes = [
    {
        path: '',
        meta: {
            title: "登录"
        },
        redirect: '/index/dataAssemble',
    },
    { // 当没有匹配到正确路由的时候，匹配notOpen组件
        path: '*',
        component: () => import('@/App.vue'),
        meta: {
            title: "首页"
        },
        redirect: '/HomePage/resEdit'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login.vue')
    },
    {
        path: '/main',
        name: 'Main',
        component: () => import('@/views/main/Main.vue'),
        children: [{
            path: '/main/upload',
            name: 'upload',
            component: () => import('@/components/upload/index.vue')
        }, {
            path: '/main/dev1',
            name: 'dev1',
            component: () => import('@/components/dev1/index.vue')
        }, {
            path: '/main/deploy',
            name: 'deploy',
            component: () => import('@/components/deploy/index.vue')
        },{
            path:'/main/deploy/steps',
            name:'deploySteps',
            component: () => import('@/views/modelDeploy/parts/steps.vue')
        }
        ]
    },
    {
        path: "/index",
        name: "index",
        component: () => import('@/views/index/index.vue'),
        redirect: '/index/dataAssemble',
        children: [{
            path: '/index/dataMsg',
            name: 'dataMsg',
            component: () => import('@/views/index/dataMsg/index.vue')
        },
        //数据集相关路由
        {
            path: '/index/dataAssemble',
            name: 'dataAssemble',
            component: () => import('@/views/index/dataAssemble/index.vue'),
        }, {
            path: '/index/dataAssemble/add',
            name: 'dataAssembleAdd',
            component: () => import('@/views/index/dataAssemble/parts/add.vue')
        }, {
            path: '/index/dataAssemble/desc',
            name: 'dataAssembleDesc',
            component: () => import('@/views/index/dataAssemble/parts/desc.vue')
        },
        //模型管理相关路由
        {
            path: '/index/modelManage',
            name: 'modelManage',
            component: () => import('@/views/index/modelManage/index.vue')
        },
        {   path:'/index/modelManage/add',
            name:'modelManageAdd',
            component:()=> import('@/views/index/modelManage/parts/add.vue')
        },
        //在线服务相关
        {   path:'/index/onlineService',
            name:'onlineService',
            component:()=> import('@/views/index/onlineService/index.vue')
        },
        {
            path:'/index/onlineService/add',
            name:'onlineServiceeAdd',
            component:()=> import('@/views/index/onlineService/parts/add.vue')
        },
        {
            path:'/index/onlineService/desc',
            name:'onlineServiceeDesc',
            component:()=> import('@/views/index/onlineService/parts/desc.vue')
        }
        ]
    }
]

const router = new VueRouter({
    routes,
    mode: 'hash',
    base: '/bq/'
})
router.beforeEach((to, from, next) => {
    if (to.name == 'deductionHk') {
        document.title = '陕钢练兵'
    } else {
        document.title = 'sg管理系统'
    }

    next()
})

export default router