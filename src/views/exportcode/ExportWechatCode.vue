<template>
    <div>
        <el-button
            @click="printClickWeChat"
            icon="el-icon-download"
            style="width:120px;  background-color: rgb(48, 65, 86);color: white;"
            >打印微信码</el-button
        >
        <div id="wechatcodeabc" v-html="printWeChatHtml" style="margin:0 auto;display:none;"></div>
    </div>
</template>
<script>
import QRCode from 'qrcodejs2';
export default {
    props: {
        weChatCodeData: Array
    },
    data() {
        return {
            printWeChatHtml: '',
            // serverUrlStr:'http://192.168.1.101:8080/home?code=',//本地测试
            serverUrlStr: 'http://trace-source-h5.moacchina.info?code=' // 测试环境
            // serverUrlStr: 'http://trace_h5.moacchina.info?code='//正式环境
        };
    },

    methods: {
        getSubStr(params) {
            let subStr1 = params.substr(0, 8);
            let subStr2 = params.substr(params.length - 5, 10);
            return subStr1 + '..' + subStr2;
        },

        printClickWeChat() {
            if (!this.weChatCodeData.length) {
                this.$notify({
                    title: '注意',
                    message: '请选择需要打印的条码',
                    type: 'warning'
                });
            } else {
                let _self = this;
                let code = [];
                let weChatCodeData = [];
                for (let p = 0; p < this.weChatCodeData.length; p++) {
                    // console.log(this.codeData[p].check_code.lastIndexOf('-'));
                    let strIndex = this.weChatCodeData[p].check_code.lastIndexOf('-');
                    weChatCodeData.push(this.weChatCodeData[p].check_code);
                    code.push(this.weChatCodeData[p].check_code.substring(strIndex + 1));
                }

                // let head_str = '<html><head><title>溯源二维码打印</title></head><body>'; // 先生成头部
                let foot_str = '</body></html>'; // 生成尾部
                let printBeforeStr =
                    "<table style='border-collapse:collapse;width: 100%;'><tr style='padding:10px;'>";
                let printContent = '';

                for (let i = 0; i < code.length; i++) {
                    if (i !== 0 && i % 6 === 0 && i !== code.length) {
                        printContent += "</tr><tr style='padding:20px;'>";
                    }
                    printContent +=
                        "<td width='100px' height='150' style='padding-left: 18px;padding-top: 15px'><div style='width:100px' id='XQ" +
                        i +
                        "'></div><div style='text-align:center;width:70px'>" +
                        code[i] +
                        '</div></td>';
                }
                let printAfter = '</tr></table></em>';
                _self.printWeChatHtml = printBeforeStr + printContent + printAfter;

                document.getElementById('wechatcodeabc').innerHTML = _self.printWeChatHtml;

                let new_str = window.document.getElementById('wechatcodeabc').innerHTML; // 获取指定打印区域

                // 构建新网页(关键步骤,必须先构建新网页,在生成二维码,否则不能显示二维码)
                document.body.innerHTML = new_str + foot_str;

                for (let j = 0; j < weChatCodeData.length; j++) {
                    document.getElementById('XQ' + j).innerHTML = ''; // 置空

                    let contentStr = weChatCodeData[j]; // 二维码内容

                    // eslint-disable-next-line no-unused-vars
                    let qrcode = new QRCode(document.getElementById('XQ' + j), {
                        text: this.serverUrlStr + contentStr,
                        width: 70,
                        height: 70,
                        colorDark: '#000000',
                        colorLight: '#ffffff'
                    });
                }
                window.print(); // 打印刚才新建的网页
                window.location.reload();
                return false;
            }
        }
    }
};
</script>
