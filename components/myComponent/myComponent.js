// components/myComponent.js
var QRCode = require('../../utils/weapp-qrcode.js')

var qrcode;

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        text: 'https://github.com/tomfriwel/weapp-qrcode',
        image: ''
    },
    ready: function() {
        qrcode = new QRCode('canvas', {
            usingIn: this,
            text: "https://github.com/tomfriwel/weapp-qrcode",
            image: '/images/bg.jpg',
            width: 150,
            height: 150,
            colorDark: "#1CA4FC",
            colorLight: "white",
            correctLevel: QRCode.CorrectLevel.H,
        });
    },

    /**
     * 组件的方法列表
     */
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
