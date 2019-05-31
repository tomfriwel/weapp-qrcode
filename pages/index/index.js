// pages/index/index.js
var QRCode = require('../../utils/weapp-qrcode.js')
import rpx2px from '../../utils/rpx2px.js'

var qrcode;

// 300rpx 在6s上为 150px
const qrcodeWidth = rpx2px(300)

Page({
  data: {
    text: 'https://github.com/tomfriwel/weapp-qrcode',
    qrcodeWidth: qrcodeWidth,
    image: '',
  },
  onLoad: function(options) {
  },
  onReady() {
    const z = this
    qrcode = new QRCode('canvas', {
      usingIn: this,
      // text: "https://github.com/tomfriwel/weapp-qrcode",
      image: '/images/bg.jpg',
      width: qrcodeWidth,
      height: qrcodeWidth,
      // width: 150,
      // height: 150,
      colorDark: "#1CA4FC",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });

    // 生成图片，绘制完成后调用回调
    qrcode.makeCode(z.data.text)
  },
  confirmHandler: function(e) {
    var value = e.detail.value
    qrcode.makeCode(value)
  },
  inputHandler: function(e) {
    var value = e.detail.value
    this.setData({
      text: value
    })
  },
  generateImage: function(e) {
    const z = this
    qrcode.exportImage(function (path) {
      z.setData({
        imgsrc: path
      })
    })
  },
  tapHandler: function() {
    // 传入字符串生成qrcode
    qrcode.makeCode(this.data.text)
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
            })
          })
        }
      }
    })
  }
})