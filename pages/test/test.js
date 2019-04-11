// pages/test/test.js
const QRCode = require('./weapp-qrcode-test.js')
import rpx2px from '../../utils/rpx2px.js'
let qrcode;

// 300rpx 在6s上为 150px
const qrcodeWidth = rpx2px(600)
const quality = 1
// let src = '/images/test-w.png'
// let src = '/images/test1.png'
let src = '/images/bg.jpg'
// let src = '/images/test0.jpg'

Page({
    data: {
        text: 'https://github.com/tomfriwel/weapp-qrcode',
        image: '',
        // 用于设置wxml里canvas的width和height样式
        qrcodeWidth,
        imgsrc: '',
        quality
    },
    onLoad: function(options) {
    },
    onReady() {
        const z = this
        qrcode = new QRCode('canvas', {
            usingIn: this, // usingIn 如果放到组件里使用需要加这个参数
            // text: "https://github.com/tomfriwel/weapp-qrcode",
            backgroundImage: src,
            logoImage: '/images/bg.jpg',
            width: qrcodeWidth,
            height: qrcodeWidth,
            size: qrcodeWidth,
            colorDark: "lightblue",
            colorLight: "#ffffff",
            // autoColor:false,
            tempCanvasId: 'temp',
            margin:10,
            quality,
            correctLevel: QRCode.CorrectLevel.H,
            // backgroundDimming: 'rgba(0,0,0,0)',  // 背景图片遮罩
        });

        // 生成图片，绘制完成后调用回调
        qrcode.makeCode(z.data.text, () => {
            // 回调
            qrcode.exportImage(function(path) {
                z.setData({
                    imgsrc: path
                })
            })
        })
    },
    test() {
        const z = this
        qrcode.testMakeCode(z.data.text)
        // wx.chooseImage({
        //     count:1,
        //     sizeType: ['compressed'],
        //     success: function(res) {
        //         qrcode.testMakeCode(z.data.text, res.tempFilePaths[0])
        //     },
        // })
    },
    confirmHandler: function(e) {
        let {
            value
        } = e.detail
        this.renderCode(value)
    },
    renderCode(value) {
        const z = this
        console.log('make handler')
        qrcode.makeCode(value, () => {
            console.log('make')
            qrcode.exportImage(function(path) {
                console.log(path)
                z.setData({
                    imgsrc: path
                })
            })
        })
    },
    inputHandler: function(e) {
        var value = e.detail.value
        this.setData({
            text: value
        })
    },
    tapHandler: function() {
        this.renderCode(this.data.text)
    },
    // 长按保存
    save: function() {
        console.log('save')
        wx.showActionSheet({
            itemList: ['保存图片'],
            success: function(res) {
                console.log(res.tapIndex)
                if (res.tapIndex == 0) {
                    qrcode.exportImage(function(path) {
                        wx.saveImageToPhotosAlbum({
                            filePath: path,
                            complete:res=>{
                                console.log(res)
                            }
                        })
                    })
                }
            }
        })
    }
})