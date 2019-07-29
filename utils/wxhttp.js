function Post(url, param, method){
  let baseurl = 'https://game.flyh5.cn/game/wxa5e08871399cd731/';
  // console.log(mstr);
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseurl+url,
      data: param,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success: res => {
        resolve(res);
      },
      fail: res => {
        reject(res);
      }
    })
  })
}
const shareEvent = (option, obj) =>{
  let shareObj = {
    title: obj.title,
    path: obj.path,
    imgUrl: obj.imgUrl,
    success(res) {
      // 转发成功之后的回调
      if (res.errMsg == 'shareAppMessage:ok') { }
    },
    fail(res) {
      // 转发失败之后的回调
      if (res.errMsg == 'shareAppMessage:fail cancel'){
        // 用户取消转发
      } else if (res.errMsg == 'shareAppMessage:fail'){
        // 转发失败，其中 detail message 为详细失败信息
      　　　　}
    },
    complete() {
      // 转发结束之后的回调（转发成不成功都会执行）
    }
  };
  if (option.from === 'button') {
    // 来自页面内转发按钮
    console.log(option.target)
  }
  return shareObj;
}


module.exports ={
    Post : Post,
    shareEvent:shareEvent
}