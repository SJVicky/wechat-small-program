var postsData = require('../../../data/posts-data.js');//只能用相对路径，不能用绝对路径
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var globalData = app.globalData;
    var postId = options.id;
    _this.data.currentId = postId;
    // var postData=postsData.postList[postId];
    _this.setData({ posts_key: postsData.postList[postId] })
    // this.data.posts_key = postData;

    /**
     * 缓存数据
     * 因为在onLoad（）中，所以，在该页面加载后，此缓存才一直有效
     * 如果用户不去主动清除这个缓存，该缓存会一直存在
     * 
     * 修改缓存：
     * 依然调用此方法，键值命名必须相同
     */
    // wx.setStorageSync(key, "风暴");
    var postsCollected = wx.getStorageSync('posts_Collected');
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      _this.setData({
        collected: postCollected
      })
    }
    else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_Collected', postsCollected);
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId===postId){
      _this.setData({
        isPlayingMusic:true
      })
    }
    this.setAudioMonitor();
    // // 监听音乐播放
    //     wx.onBackgroundAudioPlay(function(){
    //       _this.setData({isPlayingMusic:true});
    //     });

    // // 监听音乐暂停
    //     wx.onBackgroundAudioPause(function () {
    //       _this.setData({isPlayingMusic:false});
    //     });
  },
  setAudioMonitor: function () {
    var _this = this;
    // 监听音乐播放
    wx.onBackgroundAudioPlay(function () {
      _this.setData({ isPlayingMusic: true });
      app.globalData.g_isPlayingMusic=true;
      app.globalData.g_currentMusicPostId = _this.data.currentId;
    });

    // 监听音乐暂停
    wx.onBackgroundAudioPause(function () {
      _this.setData({ isPlayingMusic: false });
      app.globalData.g_isPlayingMusic=false;
      app.globalData.g_currentMusicPostId =null;
    })
  },
  // // 获取缓存的方法
  // onCollectionTap:function(event){
  //   var obj=wx.getStorageSync('key');
  // },
  // //清除缓存的方法  缓存的最大上线不能超过10MB
  // onShareTap: function (event) {
  //   // var obj = wx.removeStorageSync('key');
  //   // 清除所有缓存
  //   wx.clearStorageSync();
  // },
  onCollectionTap: function (event) {
    this.getPostCollectionSync();
    // this.getPostCollectionAsy();
  },
  showModal: function (postsCollected, postCollected) {
    var _this = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? '收藏该文章?' : '取消收藏该文章?',
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmColor: "#405f86",
      confirmText: "确认",
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('posts_Collected', postsCollected);
          _this.setData({ collected: postCollected });
        } else if (res.cancel) {
          // wx.setStorageSync('posts_Collected', postsCollected);
          // _this.setData({ collected: postCollected });
        }
      }
    })
  },
  //异步
  getPostCollectionAsy: function () {
    var _this = this;
    wx.getStorage({
      key: 'posts_Collected',
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[_this.data.currentId];
        postCollected = !postCollected;
        postsCollected[_this.data.currentId] = postCollected;
        _this.showToast(postsCollected, postCollected);
      },
    })

  },
  // 同步
  getPostCollectionSync: function () {
    var postsCollected = wx.getStorageSync('posts_Collected');
    var postCollected = postsCollected[this.data.currentId];
    // 收藏变未收藏，未收藏变收藏
    postCollected = !postCollected;
    postsCollected[_this.data.currentId] = postCollected;
    //更新文章是否的缓存值
    // wx.setStorageSync('posts_Collected', postsCollected);
    // 更新数据绑定变量，从而实现切换图片
    // this.setData({ collected: postCollected });
    // this.showModal(postsCollected, postCollected);
    this.showToast(postsCollected, postCollected);
    // wx.showToast({
    //   title: postCollected ? '收藏成功' : '取消成功',
    //   duration: 1000,  //间隔时间
    //   // icon:'loading'  图标
    // })

    // wx.showModal({
    //   title:'收藏',
    //   content: '这是一个模态弹窗',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },
  showToast: function (postsCollected, postCollected) {
    wx.setStorageSync('posts_Collected', postsCollected);
    this.setData({ collected: postCollected });
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 1000
    });
  },
  onShareTap: function (event) {
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享给好友', '分享到微博', '分享到QQ'],
      itemColor: '#405f80',
      success: function (res) {
        // res.cancel  用户是否点了取消
        // res.tapIndex 数组元素的序号，从0开始
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  onMusicTap: function (event) {
    var currentId = this.data.currentId;
    var music = postsData.postList[currentId].music;
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({ isPlayingMusic: false });
    } else {
      wx.playBackgroundAudio({
        dataUrl: music.url,
        title: music.title,
        coverImgUrl: music.coverImg
      });
      this.setData({ isPlayingMusic: true });
    }

  }
})