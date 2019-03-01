// components/myComponent.js
const QRCode = require('../../utils/weapp-qrcode.js')
import rpx2px from '../../utils/rpx2px.js'
let qrcode;

// 300rpx 在6s上为 150px
const qrcodeWidth = rpx2px(300)

Component({
    properties: {

    },
    data: {
        text: 'https://github.com/tomfriwel/weapp-qrcode',
        image: '',
        qrcodeWidth
    },
    ready: function() {
        qrcode = new QRCode('canvas', {
            usingIn: this, // usingIn 如果放到组件里使用需要加这个参数
            text: "https://github.com/tomfriwel/weapp-qrcode",
            image: '/images/bg.jpg',
            width: qrcodeWidth,
            height: qrcodeWidth,
            colorDark: "#1CA4FC",
            colorLight: "white",
            correctLevel: QRCode.CorrectLevel.H,
        });
    },
    methods: {
        confirmHandler: function (e) {
            var value = e.detail.value
            qrcode.makeCode(value)
        },
        inputHandler: function (e) {
            var value = e.detail.value
            this.setData({
                text: value
            })
        },
        tapHandler: function () {
            console.log('tap')
            // 传入字符串生成qrcode
            qrcode.makeCode(this.data.text)
        },
        save: function () {
            console.log('save')
            wx.showActionSheet({
                itemList: ['保存图片'],
                success: function (res) {
                    console.log(res.tapIndex)
                    if (res.tapIndex == 0) {
                        qrcode.exportImage(function (path) {
                            wx.saveImageToPhotosAlbum({
                                filePath: path,
                            })
                        })
                    }
                }
            })
        }
    }
})
