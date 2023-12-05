// 使用方法
// (new canvasIamge({
//     side: 2, // 必须传的参数 1 代表红方  2 代表蓝方
//     entryModel: '00158', // 必须传的参数 00058
//     upState: "测", //传的参数  是右上角的信息
//     entryName: "测蓝信息",
//     downState1: "看",
//     downState2: "有",
//     entryNum: 8,
//     blood: 3, // 0 代表 0% 4  代表100%
// })).canvas


export class canvasIamge {

    constructor(__option = {
        side: 1, // 必须传的参数 1 代表红方  2 代表蓝方
        entryModel: '00058', // 必须传的参数 00058
        upState: "", //传的参数  是右上角的信息
        entryName: "测试信息",
        downState1: "左",
        downState2: "右",
        entryNum: 0,
        blood: 1, // 0 代表 0% 4  代表100%
        maxBlood: 1,
        img: ""

    }) {
        this.canvas = document.createElement("canvas");

        const ratio = window.devicePixelRatio || 1;
        const w = 100, h = 100;
        this.canvas.width = w * ratio; // 实际渲染像素
        this.canvas.height = h * ratio; // 实际渲染像素
        this.canvas.style.width = `${w}px`; // 控制显示大小
        this.canvas.style.height = `${h}px`; // 控制显示大小
        // canvas 绘制   

        // this.canvas.width = 100;
        // this.canvas.height = 100;
        this.option = __option;
        this.context = this.canvas.getContext("2d");
        this.fillStyle_font = null;
        this.strokeStyle_font = null;

        this.fillStyle_up = null;
        this.fillStyle_down = null;

        this.text_up1_left = null;
        this.text_up1_right = null;
        this.text_up2 = null;
        this.text_down1_left = null;
        this.text_down1_center = null;
        this.text_down1_right = null;
        this.blood = '';
        this.max_blood = '';
        this.image = null

        this.initPram()
        this.init()
        this.context.scale(ratio, ratio);
        return this

    }
    initPram() {
        this.fillStyle_font = this.option.fontColor || "#ffffff";
        this.strokeStyle_font = this.option.fontColor || "#ffffff";

        this.fillStyle_up = this.option.side == 1 ? "#621f23" : "#1a3556";
        this.fillStyle_down = this.option.side == 1 ? "#621f23" : "#1a3556";

        this.text_up1_left = this.option.entryModel;
        this.text_up1_right = this.option.upState;
        this.text_up2 = this.option.entryName;
        this.text_down1_left = this.option.downState1;
        this.text_down1_center = this.option.entryNum;
        this.text_down1_right = this.option.downState2;
        this.blood = this.option.blood;
        this.max_blood = this.option.maxBlood;
        this.image = this.option.img
    }
    init() {
        this.drawRectUp() // 画上半部分矩形
        this.drawIcon()
        this.drawRectDown() // 画下半部分矩形
        this.drawTextDown1_left() // 画下半部分文字1
        this.text_down1_center >= 0 && this.drawTextDown1_center() // 
        this.drawTextDown1_right() // 画下半部分文字you
        this.deawTextDown2() // 画下半部分文字2

    }
    // 获取数据
    getValue(__pram) {
        return this.option[__pram]
    }
    // 更新数据
    updataDraw(__pram) {
        Object.assign(this.option, __pram);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.initPram();
        this.init();
    }
    // 画上半部分矩形
    drawRectUp() {
        this.context.beginPath(); //
        this.context.fillStyle = this.fillStyle_up;
        this.context.fillRect(0, 0, 100, 60);
    }
    // 画上半部分矩形的图标
    drawIcon() {
        this.context.save();
        this.context.beginPath(); //
        var cxt = this.context
        var img = window.my_config.imgEL[this.image]
        var iw = img?.width || 60;
        var ih = img?.height || 60;
        cxt.beginPath();
        cxt.rect(0, 0, 100, 60);
        cxt.clip();
        cxt.drawImage(img, (100 - iw) / 2, (60 - ih) / 2, iw, ih);
        this.context.restore();
    }
    // 画下半部分矩形
    drawRectDown() {
        this.context.save();
        this.context.fillStyle = this.fillStyle_down;
        this.context.fillRect(0, 60, 100, 100);
        this.context.restore();
    }
    // 画下半部分文字1
    drawTextDown1_left() {
        this.context.save();
        this.context.fillStyle = this.fillStyle_font;
        this.context.strokeStyle = this.fillStyle_font;
        this.context.font = " 18px bold sans-serif ";
        this.context.textAlign = "start";
        this.context.textBaseline = "top";
        this.context.fillText(this.text_down1_left, 6, 70);
        this.context.restore();

    }
    drawTextDown1_center() {
        this.context.save();
        this.context.fillStyle = this.fillStyle_font;
        this.context.strokeStyle = "00FF00";
        this.context.beginPath();
        this.context.arc(50, 75, 10, 0, 2 * Math.PI, true);
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
        this.context.restore();


        this.context.save();
        this.context.fillStyle = "#111112";
        this.context.strokeStyle = this.fillStyle_font;
        this.context.font = "18px bold sans-serif";
        this.context.textAlign = "start";
        this.context.textBaseline = "top";
        this.context.fillText(this.text_down1_center, 46, 70);
        this.context.restore();
    }
    // 画下半部分文字you
    drawTextDown1_right() {
        this.context.save();
        this.context.fillStyle = this.fillStyle_font;
        this.context.strokeStyle = this.fillStyle_font;
        this.context.font = " 18px bold sans-serif";
        this.context.textAlign = "start";
        this.context.textBaseline = "top";
        this.context.fillText(this.text_down1_right, 78, 70);
        this.context.restore();
    }
    // 画下半部分文字2
    deawTextDown2() {
        // this.context.save();
        // this.context.fillStyle = "#19a224";
        // for (let i = 0; i < 4; i++) {
        //     this.context.fillRect(6 + i * 20, 90, 16, 8);
        // }

        // this.context.restore();
        // this.context.save();
        // this.context.fillStyle = this.fillStyle_font;
        // this.per = this.per < 0 ? 0 : this.per;
        // for (let i = this.per; i < 4; i++) {
        //     this.context.fillRect(6 + i * 20, 90, 16, 8);
        // }

        this.context.restore();
        this.context.save();

        this.context.fillStyle = this.fillStyle_font;
        for (let i = 0; i < this.max_blood; i++) {
            this.context.fillRect(2 + i * (100 / this.max_blood), 90, 100 / this.max_blood - 4, 8);
        }


        this.context.restore();
        this.context.save()
        this.context.fillStyle = "#19a224";
        for (let i = 0; i < this.blood; i++) {
            this.context.fillRect(2 + i * (100 / this.max_blood), 90, 100 / this.max_blood - 4, 8);
        }
    }
}

export class aiCanvasIamge {

    constructor(__option = {
        side: 1, // 必须传的参数 1 代表红方  2 代表蓝方
        img: ""
    }) {
        this.canvas = document.createElement("canvas");

        const ratio = window.devicePixelRatio || 1;
        const w = 100, h = 100;
        this.canvas.width = w * ratio; // 实际渲染像素
        this.canvas.height = h * ratio; // 实际渲染像素
        this.canvas.style.width = `${w}px`; // 控制显示大小
        this.canvas.style.height = `${h}px`; // 控制显示大小
        // canvas 绘制   

        // this.canvas.width = 100;
        // this.canvas.height = 100;
        this.option = __option;
        this.context = this.canvas.getContext("2d");

        this.fillStyle_up = null;
        this.image = null

        this.initPram()
        this.init()
        this.context.scale(ratio, ratio);
        return this

    }
    initPram() {
        this.fillStyle_up = '#8a8a8a';
        this.fillStyle_border = this.option.side == 1 ? '#ff0' : this.option.side == 2 ? '#0f0' : this.option.side == 3 ? '#0ff' : '#f0f';
        this.image = this.option.img
    }
    init() {
        this.drawRectUp() // 画上半部分矩形
        this.drawIcon()
    }
    // 获取数据
    getValue(__pram) {
        return this.option[__pram]
    }
    // 更新数据
    updataDraw(__pram) {
        Object.assign(this.option, __pram);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.initPram();
        this.init();
    }
    // 画上半部分矩形
    drawRectUp() {
        this.context.beginPath(); //
        this.context.fillStyle = this.fillStyle_up;
        this.context.fillRect(0, 0, 100, 100);
        // 画border
        this.context.fillStyle = this.fillStyle_border;
        this.context.fillRect(0, 0, 100, 5);
        this.context.fillRect(0, 0, 5, 100);
        this.context.fillRect(95, 0, 5, 100);
        this.context.fillRect(0, 95, 95, 5);
    }
    // 画上半部分矩形的图标
    drawIcon() {
        this.context.save();
        this.context.beginPath(); //
        var cxt = this.context
        var img = window.my_config.imgEL[this.image]

        var iw = img?.width || 60;
        var ih = img?.height || 60;
        cxt.rect(0, 0, 100, 100);
        cxt.clip();
        cxt.drawImage(img, (100 - iw) / 2, (100 - ih) / 2, iw, ih);

        this.context.restore();
    }
}