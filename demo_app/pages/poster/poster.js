var postsData=require('../../data/posts-data.js');//只能用相对路径，不能用绝对路径

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPost:[
      {
        imgPath: '../../images/wx.png',
        post:3
      },
      {
        imgPath: '../../images/vr.png',
        post: 4
      },
      {
        imgPath: '../../images/iqiyi.png',
        post: 5
      }
    ]

    /**
     * 小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
     * 而这个动作A的执行，是在onLoad事件执行之后发生的
     */
  },

  onLoad:function(options){
    this.setData({posts_key: postsData.postList}) 
  },
  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
  },
  onSwiperItemTap: function (event) {
    // target和currentTarget
    // target指的是当前点击的组件和currentTarget指的是事件捕获的组件
    // target这里指的是image,而currentTarget指的是swiper组件
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  }
})