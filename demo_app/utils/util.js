function convertToStarsArray(stars) {
  var num = Number(stars.toString().substring(0, 1));
  var array = [];
  for (var i = 1; i <=5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}

function http(url,callback) {
  wx.request({
    url: url,
    data: {},
    method: 'GET',
    header: { 'Content-type': 'json' },
    success: function (res) {
      if (callback){
        callback(res.data);
      }
    },
    fail: function (error) {
      // 请求超时
      console.log(error)
    }
  })
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http:http
}