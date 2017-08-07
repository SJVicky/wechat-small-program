var utils=require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{},
    searchResult:{},
    containerShow:true,
    searchPanelShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters?start=0&&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon?start=0&&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250?start=0&&count=3";
    this.getMoveListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMoveListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMoveListData(top250Url,"top250","豆瓣Top250");
  },
  getMoveListData: function (url,settedKey,categoryTitle) {
    var _this = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: { 'Content-type': 'json' },
      success: function (res) {
        _this.processDoubanData(res.data, settedKey, categoryTitle);
      },
      fail: function (error) {
        // 请求超时
        console.log(error)
      }
    })
  },
  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    var movies = [], readyData ={};
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: utils.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId:subject.id
      };
      movies.push(temp);
    }
    readyData[settedKey] = {categoryTitle:categoryTitle,movies:movies};
    this.setData(readyData);
  },
  onMoreTap:function(event){
    var category=event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  },
  onBindFocus:function(event){

    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  onBindChange: function (event) {
    var text=event.detail.value;
    var searchUrl = app.globalData.doubanBase +"/v2/movie/search?q="+text;
    this.getMoveListData(searchUrl, "searchResult", "");
    
  },
  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false
    })
  },
})