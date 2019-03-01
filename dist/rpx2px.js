const rate = wx.getSystemInfoSync().windowWidth / 750
export default function(rpx) {
    return rate * rpx
}