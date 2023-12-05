export const  Base = {
    data() {
        return {
            isCollapse: true,
            activeMenu: "1",
            isActive: '预警',
            allActive: [true, false, false],
            buttonConfig: [{
                name: '文件上传',
                className: 'warning',
                iconPath: require('@/assets/homeIcon/预警.png'),
                activeIconPath: require('@/assets/homeIcon/预警active.png'),
                check: false
            }, {
                name: '部署',
                className: 'keyTarget',
                iconPath: require('@/assets/homeIcon/重点目标.png'),
                activeIconPath: require('@/assets/homeIcon/重点目标active.png'),
                check: false
            }, {
                name: '训练',
                className: 'analysis',
                iconPath: require('@/assets/homeIcon/统计.png'),
                activeIconPath: require('@/assets/homeIcon/统计active.png'),
                check: false
            }],
            radio: '0',
            showOption: false,

        };
    },

    methods: {

        skip(pram) {
            this.allActive = this.allActive.map((item, index) => {
                if (index == pram) {
                    item = true
                } else {
                    item = false
                }
                return item
            })
            switch (pram) {
                case 0:
                    this.$router.replace({
                        path: '/index'
                    });
                    break;
                case 1:
                    this.$router.push({
                        name: "deploy",
                    });
                    break;
                case 2:
                    this.$router.push({
                        name: "dev1",
                    });
                    break;

            }
        },
        menuItemClick(key) {
            this.buttonConfig = this.buttonConfig.map((item) => {
                item.check = 0
                return item
            })
            switch (key) {
                case "文件上传":
                    this.buttonConfig[0].check = !0;
                    this.$router.push({
                        name: "upload",
                    });
                    break;
                case "部署":
                    this.buttonConfig[1].check = !0;
                    this.$router.push({
                        name: "dev1",
                    });

                    break;
                case "训练":
                    this.buttonConfig[2].check = !0;
                    this.$router.push({
                        name: "deploy",
                    });
                    break;
                default:
                    break;
            }
        },
        activeTevent() {
            switch (this.$route.name) {
                case 'deploy':
                    this.allActive = this.allActive.map((item, index) => {
                        if (index == 1) {
                            item = true
                        } else {
                            item = false
                        }
                        return item
                    })
                    break;
                case 'dev1':
                    this.allActive = this.allActive.map((item, index) => {
                        if (index == 2) {
                            item = true
                        } else {
                            item = false
                        }
                        return item
                    })
                    break;
                case 'index':
                    this.allActive = this.allActive.map((item, index) => {
                        if (index == 0) {
                            item = true
                        } else {
                            item = false
                        }
                        return item
                    })


            }
        }
    },
    mounted() {
        var that = this;
        console.log(this.$route)
        this.activeTevent()


    },
    watch: {
        radio: {
            handler: function (newValue) {
                this.showOption = false;
                this.$eventBus.$emit('filterType', newValue)
            }
        },
        $route(to, from) {
            this.activeTevent()

        },

    },

    computed: {

    },
    beforeDestroy() {

    }
}