<template>
    <div class="devContain">
        <div style="width: 50%; margin: 0 auto;">


            <div class="upload1">
                <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :http-request="uploadFile"
                    :auto-upload="false">
                    <el-button slot="trigger" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传到服务器</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>


                <div class="inputCmd">
                    输入命令：
                    <el-input class="inputDiv" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" placeholder="请输入内容"
                        v-model="textarea2" @keyup.enter.native="sendMesssage">
                    </el-input>
                    <div class="buttomD">
                        <div @click="sendMesssage">发送</div>
                        <div @click="clearMessage">清空</div>
                    </div>
                </div>
            </div>
            <div class="dispalyMsg">
                <div class="preDIV" v-html="text1" id="divId">
                    <!-- {{ text1 }} -->
                </div>

            </div>
            <!-- <xterm style="height: 600px; margin-left: 10px;"></xterm> -->
            <br>

        </div>


    </div>
</template>

<script>
import xterm from './xterm.vue'
export default {
    data() {
        return {
            fileList: [

                // {
                //     name: 'food2.jpeg',
                //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                // }
            ],
            textarea2: '',
            text1: ""
        }
    },
    props: {},
    watch: {
        text1() {
            var element = document.getElementById("divId");
            element.scrollTop = element.scrollHeight
        }
    },
    components: {
        xterm
    },
    created() { },
    mounted() {
        let _this = this

        _this.$client.ws.addEventListener('message', (msg) => {
            console.log(msg)
            console.log("==================")
            if (_this.isJSON(msg.data) && JSON.parse(msg.data).PING) {
                console.log("自检数据信息")
            } else {
                // _this.text1 = `${_this.text1}+${_this.text1}`
                _this.text1 = `${_this.text1}+${msg.data}+<br>`
            }
        })

        _this.$client2.ws.addEventListener('message', (msg) => {
            console.log(msg)
            console.log("==================")
            if (_this.isJSON(msg.data) && JSON.parse(msg.data).PING) {
                console.log("自检数据信息")
            } else {
                // _this.text1 = `${_this.text1}+${_this.text1}`
                _this.text1 = `${_this.text1}+${msg.data}+<br>`
            }
        })




    },

    methods: {
        isJSON(str) {
            try {
                JSON.parse(str);
                return true;
            } catch (e) {
                return false;
            }
        },
        uploadFile(file) {
            console.log(file)
            let _this = this;
            this.getBase64(file.file, (content) => {
                console.log(content)
                let _content1 = content.split("base64,")
                //  debugger
                let _pram1 = {
                    "shellFileName": file.file.name,
                    "context": _content1[1]
                }
                _this.$client.ws.send(JSON.stringify(_pram1))

                console.log("......")
            })
        },
        sendMesssage() {
            this.$client2.ws.send(this.textarea2)
            this.textarea2 = null
        },
        clearMessage() {
            this.textarea2 = null
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        // 获取图片base64格式
        getBase64(file, callback) {
            const reader = new FileReader();
            reader.addEventListener("load", () => callback(reader.result));
            reader.readAsDataURL(file);
        },
    },
    beforeDestroy() { }
}
</script>

<style lang="scss" scoped>
.devContain {
    width: 100%;
    height: 100%;
    // border: 1px solid red;
    padding: 20px;
    font-size: 18px;

    // background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
    div {
        margin-bottom: 16px;
    }

    .upload1 {}

    .inputCmd {
        ::v-deep(.el-textarea__inner) {
            background-color: rgb(0, 0, 0);
            color: rgb(253, 251, 251);
        }

        .inputDiv {
            margin: 10px;
        }

        .buttomD {
            display: flex;
            justify-content: center;

            div {
                margin-left: 20px;
                width: 100px;
                height: 40px;
                font-size: 18px;
                line-height: 40px;
                border: 1px solid #0e0d0d;
                text-align: center;
                border-radius: 6px;
                cursor: pointer;
            }
        }
    }

    ::v-deep(.el-upload__tip) {
        font-size: 16px;
    }

    .dispalyMsg {

        max-height: 180px;

        .preDIV {
            margin-left: 10px;
            background-color: rgb(2, 2, 2);
            color: rgb(253, 251, 251);
            height: 400px;
            overflow-y: auto;
            margin-bottom: 20px;
        }
    }

}

::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
}

::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    background-color: #7f7f7f;
    background-image: -webkit-linear-gradient(45deg,
            #7f7f7f,
            #7f7f7f,
            #7f7f7f,
            #7f7f7f 50%,
            #7f7f7f 75%,
            #7f7f7f 75%,
            #7f7f7f);
}

::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
    background: #0c213500;
    position: absolute;
}
</style>