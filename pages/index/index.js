// pages/index/index.js
var QRCode = require('../../utils/qrcode.js')

var qrcode;

Page({
    data: {
        text: 'http://jindo.dev.naver.com/collie'
    },
    onLoad: function (options) {
        qrcode = new QRCode('canvas', {
            text: "http://jindo.dev.naver.com/collie",
            width: 150,
            height: 150,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
        });
    },
    confirmHandler: function (e) {
        console.log(e)
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
        qrcode.makeCode(this.data.text)
    }
})