// pages/responsive/responsive.js
var QRCode = require('../../utils/weapp-qrcode.js')
var qrcode;

const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;

// 300rpx 在6s上为 150px
const code_w = 300 / rate;

Page({
    data: {
        text: 'https://github.com/tomfriwel/weapp-qrcode',
        image: '',
        code_w: code_w
    },
    onLoad: function (options) {
        qrcode = new QRCode('canvas', {
            // usingIn: this,
            text: "https://github.com/tomfriwel/weapp-qrcode",
            image: '/images/bg.jpg',
            width: code_w,
            height: code_w,
            colorDark: "#1CA4FC",
            colorLight: "white",
            correctLevel: QRCode.CorrectLevel.H,
        });
    },
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
        // 传入字符串生成qrcode
        qrcode.makeCode(this.data.text)
    },
    // 长按保存
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
})