Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
onStart:function(){
  /**
   * 页面跳转  最多5级
   * 该方法跳转会出现返回按钮（存在子父级关系）
   */
  wx.navigateTo({
    url: "../poster/poster"
  });

   /**
    * 页面跳转
    * 该方法跳转会出现返回按钮（不存在子父级关系）
    *redirectTo  tapBar不出现
    */
  // wx.redirectTo({
  //   url: '../poster/poster',
  // });
}
})