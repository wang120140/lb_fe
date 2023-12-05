
module.exports = {
    outputDir: './lb_sg',
    publicPath: '/lb_sg/',
    devServer: {
        proxy: {

            '/lb_sg1': {
                // target: 'http://172.18.30.137:8090', // 服务器
                // target: 'http://10.1.18.132:8686', // 服务器
                target:'http://0.0.0.0:7999',

                pathRewrite: {
                    '^/lb_sg1': ''
                },
                changOrigin: true
            },
            // '/orbit_offine_map1': {
            //     target: 'http://172.18.30.54:8999/geoserver', // 服务器

            //     pathRewrite: {
            //         '^/orbit_offine_map1': ''
            //     },
            //     changOrigin: true
            // },
            '/orbit_offine_map1': {
                target: 'http://172.18.116.197:8012', // 服务器

                pathRewrite: {
                    '^/orbit_offine_map1': ''
                },
                changOrigin: true
            },
            
            '/fileLoad_api1': {
                // target: 'http://172.18.30.137:8090', // 服务器
                // target: 'http://10.1.18.132:8686', // 服务器
                target:'http://0.0.0.0:7999',

                pathRewrite: {
                    '^/fileLoad_api1': ''
                },
                changOrigin: true
            },
            
            // 这个是警告信息弹窗
            // '/aram_api2': {
            //     target: 'http://172.18.30.97:5000/api', // 郭工服务器

            //     pathRewrite: {
            //         '^/aram_api2': ''
            //     },
            //     changOrigin: true
            // },

            '/aram_api2': {
                target: 'https://172.18.116.197:8082/aram_api2', //其他组 服务器

                pathRewrite: {
                    '^/aram_api2': ''
                },
                changOrigin: true
            },


            // '/sjfc_api3': {
            //     target: 'http://172.18.30.107:9996',
            //     pathRewrite: {
            //         '^/sjfc_api3': ''
            //     },
            //     changOrigin: true
            // },
            // '/mapFromG': {
            //     target: 'http://172.18.30.54:8999',
            //     pathRewrite: {
            //         '^/mapFromG': ''
            //     },
            //     changOrigin: true
            // },
            // '/mapBqFromG': {
            //     target: 'http://172.18.30.107:8081/mapBqFromG', // 线上地图服务
            //     pathRewrite: {
            //         '^/mapBqFromG': ''
            //     },
            //     changOrigin: true
            // },

            // '/mapBqFromG_bq': {
            //     target: 'http://172.18.29.29:8080/geoserver/',
            //     pathRewrite: {
            //         '^/mapBqFromG_bq': ''
            //     },
            //     changOrigin: true
            // }
        }
    },
}