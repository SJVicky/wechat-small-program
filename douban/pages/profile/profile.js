Page({
  data: {
    title: 'About Me',
    userInfo: {
      wechat: 'WEDN-NET',
      nickName: 'iceStone',
      avatarUrl: '../../images/wechat.jpeg'
    }
  },

  getUserInfo () {
    const that = this
    wx.getUserInfo({
      success (res) {
        console.log(res)
        that.setData({ userInfo: res.userInfo })
      }
    })
  },

  onLoad () {
    wx.login({
      success (res) {
        if (res.code) {
          console.log('登录成功！' + res.code)
        } else {
          console.error('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail () {},
      complete () {},
    })

    // wx.playBackgroundAudio({
    //   dataUrl: 'file:///D:/zce/Documents/Repositories/music-player/server/www/uploads/Rebecca%20Blaylock%20-%20I%20Will%20Be%20Your%20Shelter.mp3',
    //   title: 'Rebecca Blaylock - I Will Be Your Shelter',
    //   coverImgUrl: 'file:///D:/zce/Documents/Repositories/music-player/server/www/uploads/%E9%99%88%E7%99%BE%E7%A5%A5.jpg'
    // })
  }
})
