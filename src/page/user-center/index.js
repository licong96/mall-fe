require('../common/common.js')
require('./index.scss')

require('page/layout/nav/index.js');
require('page/layout/header/index.js');
require('page/layout/footer/index.js');

// user-center 用户中心
var navSide = require('page/layout/nav-side/index')
var _mm = require('util/mm.js');
var _user = require('service/user-service');

var userCenter = {
  Dom: {
  },
  init: function () {
    // 初始化左侧菜单
    navSide.init({
      name: 'user-center'
    })
    // 加载用户信息
    this.loadUserInfo();
    this.bindEvent();
  },
  loadUserInfo() {
    var userHtml = ''
    _user.getUserInfo(res => {
      userHtml = _mm.renderHtml(templateIndex, res);
      $('.user-info').html(userHtml)
    }, err => {
      _mm.errorTips(err)
    })
  },
  bindEvent: function () {
  }
};


$(function () {
  userCenter.init()
});