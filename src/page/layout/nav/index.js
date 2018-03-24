require('./index.scss')

// nav
var _mm = require('util/mm.js');
var _user = require('service/user-service');

var nav = {
  Dom: {
  },
  init() {
    this.loadUserInfo();
    this.bindEvent();
  },
  bindEvent() {
    // 登陆点击
    $('.js_login').on('click', function () {
      _mm.doLogin();
    });
    // 注册点击
    $('.js_register').on('click', function () {
      window.location.href = './user-register.html';
    });
    // 退出登陆
    $('.js_logout').on('click', function () {
      _user.logout(res => {
        window.location.reload();
      }, err => {
        _mm.errorTips(err)
      })
    })
  },
  // 加载用户信息
  loadUserInfo() {
    _user.checkLogin(res => {
      $('.user.not-login').hide().siblings('.user.login').show().find('.user-name').text(res.username);
    }, err => {
      console.log(err)
    });
  }
};

$(function () {
  nav.init()
});