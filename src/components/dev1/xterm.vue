<template>
  <div id="xterm" ref="terminal"></div>
</template>
<script>
import { Terminal } from "xterm"
import { FitAddon } from 'xterm-addon-fit'
import "xterm/css/xterm.css"
export default {
  data() {
    return {
      term: "", // 保存terminal实例
      rows: 40,
      cols: 100
    }
  },
  mounted() {
    this.initXterm()
  },
  methods: {
    initXterm() {
      function isJSON(str) {
        try {
          JSON.parse(str);
          return true;
        } catch (e) {
          return false;
        }
      }

      let _this = this;
      var commandKey = [];
      var term = new Terminal({
        rendererType: "canvas", //渲染类型
        rows: parseInt(24), //行数
        cols: parseInt(100), // 不指定行数，自动回车后光标从下一行开始
        convertEol: true, //启用时，光标将设置为下一行的开头
        scrollback: 10, //终端中的回滚量
        disableStdin: false, //是否应禁用输入
        cursorStyle: "underline", //光标样式
        cursorBlink: true, //光标闪烁
        theme: {
          foreground: "yellow", //字体
          background: "#060101", //背景色
          cursor: "help" //设置光标
        }
      });
      // const attachAddon = new AttachAddon(socket);
      // term.loadAddon(attachAddon);
      term.open(document.getElementById("xterm"));
      // 支持输入与粘贴方法
      term.onData(function (key) {
        // console.log("|"+key+"|");
        // commandKey.push(key);
        // console.log(commandKey);
        // term.write(key);
        // socket.send(key); //转换为字符串

        _this.$client.ws.send(key)
      });

      term.onLineFeed(function () {
        console.log("执行换行" + JSON.stringify(commandKey))
      });

      term.onTitleChange(function (key) {
        console.log("onTitleChange:" + key);
      });

      function closeA() {
        socket.close();
      }


      function runFakeTerminal() {
        if (term._initialized) {
          return;
        }
        term._initialized = true;
        term.prompt = () => {
          term.write('\r\n~$ ');
        };
        term.writeln('Welcome to xterm.js');
        prompt(term);
        term.onKey(e => {
          const printable = !e.domEvent.altKey && !e.domEvent.altGraphKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;
          if (e.domEvent.keyCode === 13) {
            prompt(term);
          } else if (e.domEvent.keyCode === 8) {
            // Do not delete the prompt
            if (term._core.buffer.x > 2) {
              // term.write('\b \b')
            }
          } else if (printable) {
            // term.write(e.key);
          }
          console.log(commandKey);
          console.log("key::" + e.domEvent.keyCode);
        });
      }
      function prompt(term) {
        // term.write('\r\n~$ ');
        // term.focus();
      }
      runFakeTerminal();

      this.$client.ws.addEventListener('message', (msg) => {
        try {
          if (isJSON(msg.data) && JSON.parse(msg.data).PING) {
            console.log("自检数据信息")
          } else {
            term.write(msg.data);//把接收的数据写到这个插件的屏幕上
            if (msg.data.indexOf('连接成功，sessionId=') != -1) {
              var sessionId = msg.data.slice(15);
              console.log(sessionId)
            } else {
              console.log("常规数据：" + msg.data);
            }
          }
        } catch (error) {
        }

      })
    },

  }
}
</script>
<style>
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