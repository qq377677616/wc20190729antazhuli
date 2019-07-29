//index.js
//获取应用实例
var gio = require("../../utils/gio-minp/index.js").default;
const app = getApp();
const https = require("../../utils/wxhttp.js");
const mta = require('../../utils/mta_analysis.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls:[
      "xxx兑换俩元话费",
      "ccc兑换俩元话费",
      "ddd兑换俩元话费",
      "qqq兑换俩元话费",
      "tttt兑换俩元话费",
      "yyy兑换俩元话费"
    ],
    rewordList:[
        
    ],
    w_width:0,
    w_height:0,
    times:0,
    isLogin:false,
    isShow:false,
    isdh:true,
    prizeList:'',
    isNew:false,
    openid:"",
    istong:true,
    gid:'',
    zf_gid:'',
    firends:0,
    s_type:4,
    score:0,
    groupList:'',
    useIphone3:'',
    useIphone4: '',
    useName2:'',
    useIphone2:'',
    useAdd2:'',
    useName: '',
    useIphone: '',
    useAdd: '',
    useSize:'',
    jkcode:'',
    zkcode:'',
    isactive:true,
    isEnd:false,
    op_id1:'',
    swiperList: [
      'https://game.flyh5.cn/resources/game/wechat/file/anta/page3_3.png',
      'https://game.flyh5.cn/resources/game/wechat/file/anta/page3_4.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imgList:[
      'https://game.flyh5.cn/resources/game/wechat/file/anta/page1_001.png',
      'https://game.flyh5.cn/resources/game/wechat/file/anta/page1_002.png',
      'https://game.flyh5.cn/resources/game/wechat/file/anta/page1_003.png',
      'https://game.flyh5.cn/resources/game/wechat/file/anta/page1_004.png',
      'https://game.flyh5.cn/resources/game/wechat/file/anta/page1_005.png',
      'https://game.flyh5.cn/resources/game/wechat/file/anta/page1_006.png',
      'https://game.flyh5.cn/resources/game/wechat/file/anta/page1_007.png',
      'https://game.flyh5.cn/resources/game/wechat/file/anta/page1_008.png',
      'https://game.flyh5.cn/resources/game/wechat/file/anta/page1_009.png',
      'https://game.flyh5.cn/resources/game/wechat/file/anta/page1_010.png',
      'https://game.flyh5.cn/resources/game/wechat/file/anta/page1_011.png',
      'https://game.flyh5.cn/resources/game/wechat/file/anta/page1_012.png',
      'https://game.flyh5.cn/resources/game/wechat/file/anta/page1_013.png',
      'https://game.flyh5.cn/resources/game/wechat/file/anta/page1_014.png',
      'https://game.flyh5.cn/resources/game/wechat/file/anta/page1_015.png'
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow(){
    this.getGroup();
  },
  onLoad: function (options) {
    mta.Page.init()
    if (options.code) {
      if (options.code == 1) {
        mta.Event.stat("code_1", {})
      } else if (options.code == 2) {
        mta.Event.stat("code_2", {})
      } else if (options.code ==3) {
        mta.Event.stat("code_3", {})
      }
    }
    // console.log(999988888,options);
    this.getActive();
    let that = this;
    if (options.gid){
      this.setData({ zf_gid: options.gid, op_id:options.op_id})
    }

    let data1 = wx.getStorageSync('openid');

    if (data1) {
      this.init();
        }else{
          that.setData({ isShow: false })
        }
    let data2 = wx.getStorageSync('gid');
    if (data2 && data2 != '') {
      that.setData({ gid: data2 })
    }
    wx.getSystemInfo({
         success(res){
             that.setData({
               w_width: res.screenWidth,
               w_height: res.screenHeight
             })
           console.log(that.data.w_width, that.data.w_height);
         }
       
    }) 
   this.getTimes();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
           gio('setVisitor', res.userInfo);
          gio('setUserId', YOUR_USER_ID); 
        }
      })
    }
     this.getTprs();
  },
  init() {
    let that = this
    let data1 = wx.getStorageSync('openid')
    console.log("本地openid--->" + data1);
    console.log("朋友openid--->" + that.data.op_id);
    that.setData({ isShow: true, openid: data1 })
    console.log('判断是否相等',that.data.op_id != data1)
    console.log('判断是否是undefined',that.data.op_id != undefined) 
    if (that.data.op_id != undefined && that.data.op_id != data1) {
      that.setData({ istong: false })
      console.log('不是同一个人');
    } else {
      that.setData({ istong: true })
      console.log('同一个人');
    }
    console.log('是否调接口1')
    that.getisCoupons();
    that.getGroup();
    that.getzlVal();
    console.log('是否调接口2')
  },
  getUserInfo: function(e) {
    let that = this;
    let  dat = {
      a:'login',
      code:'',
      iv:e.detail.iv,
      nickname: e.detail.userInfo.nickName,
      head_img: e.detail.userInfo.avatarUrl
    }
    console.log(e)
    wx.login({
      success(res) {
        dat.code = res.code;
        https.Post('anta_zl/api.php', dat, 'post').then((res) => {
          console.log('cun', res.data.data.openid)
               wx.setStorageSync('openid', res.data.data.openid);
               that.setData({ openid: res.data.data.openid})
               gio('identify', res.data.data.openid, res.data.data.openid); 
              that.init();
               that.createTeam();
              that.getisCoupons();
              that.getGroup();
              that.getzlVal();
        })
      }
    })
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      isShow:true
    })
  },
  invit(){
        
  },
  getTimes(){
      let that = this;
      let i = 0;
      let time = setInterval(()=>{
        if(i<100){
              i++;
              that.setData({
                times: i
              })
        }else{
           clearInterval(time);
            this.setData({
              isLogin:true
            })
        }
         
      },50)
  },
  onShareAppMessage: function (res) {//分享
    var that = this;
    console.log('zhuanfa', wx.getStorageSync('openid'),wx.getStorageSync('gid'));
    let op = wx.getStorageSync('openid');
    let gp = wx.getStorageSync('gid');
    console.log(op,gp)
    return {
      title: that.data.userInfo.nickName +'@你,“要疯”福利已备齐,就差你了!',
      path: '/pages/index/index?op_id=' + op + '&gid=' + gp,
      imageUrl: "https://game.flyh5.cn/resources/game/wechat/file/anta/shareImg.png",
      success: function (res) {
      console.log(4111)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  dhReword(e){
   let that = this;
    if(!this.data.isactive){
           this.setData({isEnd:true})
           return false;
    }
    console.log(e.currentTarget.dataset.type)
    let id = e.currentTarget.dataset.type;
    this.setData({
      s_type: id
    })
    if ( this.data.s_type == 10 || this.data.s_type == 11){
          let time = setTimeout(()=>{
            clearTimeout(time)
            that.getCoupons();
          },4000)
    } else if (this.data.s_type == 2 || this.data.s_type == 3){
            that.getCoupons();
    } else if (this.data.s_type == 4 ){
           that.getCoupons();
    }
    
    this.goLink(id);
  },
  addSize(){
    let that = this;
    let ipt1 =  this.data.useName;
    let ipt2 = this.data.useIphone;
    let ipt3 = this.data.useAdd;
    let ipt4 = this.data.useSize;
    let dat = {
      a:'getReward',
      id:this.data.s_type,
      name: ipt1,
      phone: ipt2,
      address: ipt3,
      size:ipt4,
      openid:this.data.openid
    }
    if (this.data.isactive) {
          console.log(11)
    }else{
          this.setData({
              isEnd:true
          })
          return false;
    }
    if (ipt1 != '' && ipt2!= '' && ipt3!='' && ipt4!='') {
      if (this.checkIphone(ipt2)){
        // this.getCoupons();
       this.getzlVal()
        https.Post('anta_zl/api.php', dat, 'post').then((res) => {
            wx.showToast({
              icon:'none',
              title: res.data.info,
            })
             that.setData({
                 s_type:16
             })
        })
      }
    }else{
           wx.showToast({
             icon:'none',
             title: '请把信息填写完整！',
           })
    }

  },
  addNosize(){
    let that = this;
    let ipt1 = this.data.useName2;
    let ipt2 = this.data.useIphone2;
    let ipt3 = this.data.useAdd2;
    let dat = {
      a: 'getReward',
      name: ipt1,
      phone: ipt2,
      address: ipt3,
      openid: this.data.openid,
      id: this.data.s_type,
    }
    if (ipt1 != '' && ipt2 != '' && ipt3 != '') {
      if (this.checkIphone(ipt2)) {
        // this.getCoupons();
        https.Post('anta_zl/api.php', dat, 'post').then((res) => {
          //  console.log(res.data)
          wx.showToast({
            icon: 'none',
            title: res.data.info,
          })
          this.getzlVal()
          that.setData({
            s_type: 16
          })
        })
      }
    } else {
      wx.showToast({
        icon: 'none',
        title: '请把信息填写完整！',
      })
    }
  },
  huafei(){
    let that = this;
    let ipt1 = this.data.useIphone3;
    let ipt2 = this.data.useIphone4;
    let dat = {
      a: 'getReward',
      phone: ipt1,
      openid: this.data.openid,
      id: this.data.s_type,
    }
    if (ipt1 != '' && ipt2 != '') {
      if (this.checkIphone(ipt1)) {
        if(ipt1==ipt2){
          // this.getCoupons();
          https.Post('anta_zl/api.php', dat, 'post').then((res) => {
            //  console.log(res.data)
            wx.showToast({
              icon: 'none',
              title: res.data.info,
            })
            this.getzlVal()
            that.setData({
              s_type: 16
            })
          })
        }else{
          wx.showToast({
            icon: 'none',
            title: '俩次手机号不一致！',
          })
        }
      }
    } else {
      wx.showToast({
        icon: 'none',
        title: '请把信息填写完整！',
      })
    }
  },
  closePop(){ //关闭弹窗
      this.setData({
        isdh:true,
        s_type:16
      })
  },
  getTprs(){//获取走马灯数据
  let dat = {
    a:'pmd'
  }
    https.Post('anta_zl/api.php',dat,'post').then((res)=>{
          this.setData({
              imgUrls:res.data.data
          })
    })
  },
  getPrize(score){//获取奖品列表
  let dat = {
    a:'getPrize',
    openid:this.data.openid
  }
    https.Post('anta_zl/api.php',dat,'post').then((res)=>{
          // console.log(res.data)
          for(let i=0;i<res.data.data.length;i++){
                res.data.data[i].img = this.data.imgList[i];
          }
      let _prizeList = res.data.data
      this.arrSort(_prizeList, 'reduceNum', 1);
      //let obj = _prizeList[_prizeList.length-1];
    let obj= _prizeList.splice(_prizeList.length -1,1)
      _prizeList.unshift(obj[0]);
      console.log("score",score);
      for (let i = 0; i < _prizeList.length; i++) {
        _prizeList[i].score = parseInt(score)
      }
      this.setData({ 
        prizeList: _prizeList,
        score: score
        })
      console.log(this.data.prizeList)
    })
  },
  closeNew(){
    this.setData({ isNew:false})
  },
  getisCoupons(){ //判断用户是否领取
  // console.log('panduan')
  // console.log(this.data.openid);
    let dat = {
      openid:this.data.openid,
      a: 'isFirstGet'
    }
    https.Post('anta_zl/api.php', dat, 'post').then((res) => {
      console.log('islingguo')
      console.log(res.data)
      if(res.data.info == '未领取'){
          this.setData({ isNew: true })
      }
    })  
  },
  getCoupons(){
    let dat = {
      a: 'getReward',
      id:this.data.s_type,
      openid:this.data.openid
    }
    if(this.data.isactive){
      https.Post('anta_zl/api.php', dat, 'post').then((res) => {
        if (this.data.s_type == 3 || this.data.s_type == 2) {
          this.getaqyCode()
        } else if (this.data.s_type == 4){
          this.setData({ isNew: false })
              wx.navigateToMiniProgram({
                appId: 'wx25b44eddc868c0f6',
                path: 'pages/index/index?envelope=true&promo_id=1450,1450,1451,1451,1452,1452,1453,1453,1454,1454,1455,1455,1456,1456&utm_source=YFZL',
                extraData: {},
                envVersion: '',
                success(res) {
                  console.log(11)
                }
              })
        }
          wx.showToast({
            icon: 'none',
            title: res.data.info
          })
          this.getzlVal();
      })  
    }else{
          this.setData({isEnd:true})
          return false;
    }
    
  },
   arrSort(arr, field, order) {
    arr.sort((x, y) => {
      if (order !== 1) {
        return x[field] - y[field]
      } else {
        return y[field] - x[field]
      }
    });
  },
  getGroup(){//获取队伍
  console.log('pngyou')
    console.log(this.data.op_id) 
    console.log()
    let list = [];
    let dat = {};
    if (!this.data.op_id || this.data.op_id==''){
        dat = {
          a: 'getGroup',
          openid: this.data.openid
        }
    }else{
       dat = {
        a: 'getGroup',
        openid: this.data.op_id
      }
    }
    
    https.Post('anta_zl/api.php',dat,'post').then((res)=>{
        // groupList
      let _data = [...res.data.data.list]
      if (_data.length >= 5) {
        _data = _data.slice(0, 6) 
      } else {
        let x = 5 - _data.length
        for (let i = 0; i < x; i++) {
          _data.push({ head_img: 'https://game.flyh5.cn/resources/game/wechat/file/anta/at2_3.png' }) 
        }
      }
      // for (let i = 0; i <res.data.data.list.length;i++){
      //         if(i<5){
      //               list.push(res.data.data.list[i])
      //         }
      // }
      // console.log(_data)
      wx.setStorageSync('gid',res.data.data.gid);
      this.setData({ firends:res.data.data.list.length,
        groupList: _data,
        gid: res.data.data.gid
             })
      console.log(this.data.firends);
    })
  },
  createTeam(){
    let dat = {
      a: 'createTeam',
      openid: this.data.openid
    }
    if(this.data.isactive){
        https.Post('anta_zl/api.php', dat, 'post').then((res) => {
           console.log('存gid')
          console.log(res.data.data.gid)
          wx.setStorageSync('gid', res.data.data.gid);
          this.setData({ gid: res.data.data.gid });
        })
    }else{
          this.setData({
              isEnd:true
          }) 
          return false;
    }
   
  },
  goZhuli(){//帮好友助力
  // console.log(8888888888)
  // console.log(this.data.zf_gid)
    console.log(wx.getStorageInfoSync('openid'))
        let dat = {
          a: 'joinTeam',
          gid: this.data.zf_gid,
          openid:wx.getStorageSync('openid')
        }
        console.log(dat);
        if(this.data.isactive){
            https.Post('anta_zl/api.php', dat, 'post').then((res) => {
              console.log("是否助力成功"+res.data);
              wx.showToast({
                icon:'none',
                title: '成功为好友助力'
              })
              this.getGroup();
            })
        }else{
              this.setData({isEnd:true})
              return false;
        }
        
  },
  selfPlay(){
     wx.navigateTo({
       url: '/pages/index/index',
     })
  },
  getzlVal(){//获取助力值
    let dat = {
      a: 'getUserInfo',
      openid: wx.getStorageSync('openid')
    }
    https.Post('anta_zl/api.php', dat, 'post').then((res) => {
      this.getPrize(res.data.data.score);
    })
  },
  check(e){
    let type = e.currentTarget.dataset.type;
      //  console.log(e.currentTarget.dataset.type);
    // console.log(e.detail.value)
       if(type=='name'){
           this.setData({useName:e.detail.value})
       } else if (type == 'phone'){
         this.setData({ useIphone: e.detail.value })
       } else if (type == 'add'){
         this.setData({ useAdd: e.detail.value })
       }else if(type == 'size'){
         this.setData({ useSize: e.detail.value })
       }else if(type=='name1'){
         this.setData({useName2:e.detail.value})     
       }else if(type == 'phone1'){
         this.setData({ useIphone2: e.detail.value })
       } else if (type == 'add1') {
         this.setData({ useAdd2: e.detail.value })
       }else if(type == 'phone3'){
         this.setData({useIphone3:e.detail.value})
       }else if(type == 'phone4'){
         this.setData({useIphone4:e.detail.value})
       }
    },
    checkIphone(phone){
          if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
            wx.showToast({
              icon: "none",
              title: "请正确输入手机号!"
            })
            return false;
          } else {
            console.log('成功');
            return true;
          } 
    },
  copy: function (e) {
    var that = this;
   if(that.data.s_type==3){
     wx.setClipboardData({
       data: that.data.jkcode,
       success: function (res) {
         wx.showToast({
           title: '复制成功!',
         })
       }
     });
   }else{
     wx.setClipboardData({
       data: that.data.zkcode,
       success: function (res) {
         wx.showToast({
           title: '复制成功!',
         })
       }
     });
   }
    this.setData({
        s_type:16
    })

  },
  getaqyCode(){
    let dat ={};
    if(this.data.s_type==2){
           dat = {
            a: 'getIqy',
            openid: this.data.openid,
            type:1
          }
    }else{
           dat = {
            a: 'getIqy',
            openid: this.data.openid,
            type: 2
          }
    }
  
    https.Post('anta_zl/api.php', dat, 'post').then((res) => {
        if(this.data.s_type==3){
            this.setData({
              jkcode: res.data.data.code
            })
        }else{
          this.setData({
            zkcode: res.data.data.code
          })
        }
        
    })
  },
  getActive(){
    let dat = {
      a: 'activeTime',
    }
    https.Post('anta_zl/api.php', dat, 'post').then((res) => {
      if(res.data.error==411){
        this.setData({ isactive: false })
      }
    }) 
  },
  closeEnd(){
    this.setData({ isEnd: false})
  },
  ydh(e){
    console.log(e.currentTarget.dataset.status);
    let arr = [5,6,7,8,9]
    if (arr.indexOf(parseInt(e.currentTarget.dataset.type)!=-1)){
      this.goLink(e.currentTarget.dataset.type);
    }
    if (e.currentTarget.dataset.status == 2 && e.currentTarget.dataset.type != 3 && e.currentTarget.dataset.type != 2){
      wx.showToast({
        icon: 'none',
        title: '该商品只能兑换一次！',
      })
    } else if (e.currentTarget.dataset.type == 3 || e.currentTarget.dataset.type == 2){
            this.setData({ s_type: e.currentTarget.dataset.type})
            this.getaqyCode();
    } else{
        this.setData({
           s_type:e.currentTarget.dataset.type
        }) 
    }
   
  },
  goLink(id){
        // if (id == 4) {
        //   wx.navigateToMiniProgram({
        //     appId: 'wx25b44eddc868c0f6',
        //     path: 'pages/index/index?envelope=true&promo_id=1450,1450,1451,1451,1452,1452,1453,1453,1454,1454,1455,1455,1456,1456&utm_source=YFZL',
        //     extraData: {},
        //     envVersion: '',
        //     success(res) {
        //       console.log(11)
        //     }
        //   })
        // } else
         if (id == 11) {
          // this.getCoupons();
          wx.navigateToMiniProgram({
            appId: 'wx25b44eddc868c0f6',
            path: 'pages/index/index?envelope=true&promo_id=1458&utm_source=YFZL',
            extraData: {},
            envVersion: '',
            success(res) {
              console.log(11)
            }
          })
        } else if (id == 10) {
          // this.getCoupons();
          wx.navigateToMiniProgram({
            appId: 'wx25b44eddc868c0f6',
            path: 'pages/index/index?envelope=true&promo_id=1457&utm_source=YFZL',
            extraData: {},
            envVersion: '',
            success(res) {
              console.log(11)
            }
          })
        } 
  },
  linkGame(e){
    // console.log(e);
   if(e.currentTarget.dataset.num==0){
      wx.navigateToMiniProgram({
        appId: 'wx52fbcb032896a674',
        path: '',
        extraData: {},
        envVersion: '',
        success(res) {
          console.log(11)
        }
      })
   }else{
        wx.navigateToMiniProgram({
          appId: 'wx25b44eddc868c0f6',
          path: 'pages/index/index?envelope=true&promo_id=1450,1450,1451,1451,1452,1452,1453,1453,1454,1454,1455,1455,1456,1456&utm_source=YFZL',
          extraData: {},
          envVersion: '',
          success(res) {
            console.log(11)
          }
        })
   }
    
  }
})
