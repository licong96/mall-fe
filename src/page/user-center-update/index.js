require('../common/common.js')
require('./index.scss')

// require('page/layout/nav/index.js');
require('page/layout/header/index.js');
require('page/layout/footer/index.js');

// user-center-update 修改个人信息
var navSide = require('page/layout/nav-side/index')
var _mm = require('util/mm.js');
var _user = require('service/user-service');
var templateIndex = require('./index.string');

var userCenterUpdate = {
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
      $('.content .user-info').html(userHtml);
      // this.bindEvent();
    }, err => {
      _mm.errorTips(err)
    })
  },
  bindEvent: function () {
    // $(".btn_submit").on('click', () => {
    //   console.log(this)
    // })
    // 点击元素还没被创建，使用了事件委托
    $(document).on('click', '.btn_submit', () => {
      var userInfo = {
        phone: $.trim($('#phone').val()),
        email: $.trim($('#email').val()),
        question: $.trim($('#question').val()),
        answer: $.trim($('#answer').val()),
      },
      validateResult = this.validateResult(userInfo);
      // 是否验证通过
      if (validateResult.status) {
        _user.updateUserInfo(userInfo, res => {
          _mm.successTips(res)
          window.location.href = './user-center.html'
        }, err => {
          _mm.errorTips(err)
        })
      }
      else {
        _mm.errorTips(validateResult.msg);
      }
    })
  },
  // 输入验证
  validateResult(formData) {
    var result = {
      status: false,
      msg: ''
    };
    if (!_mm.validate(formData.phone, 'phone')) {
      result.msg = '手机号格式不正确'
      return result
    }
    if (!_mm.validate(formData.email, 'email')) {
      result.msg = '邮箱格式不正确'
      return result
    }
    if (!_mm.validate(formData.question, 'require')) {
      result.msg = '密码提示问题不能为空'
      return result
    }
    if (!_mm.validate(formData.answer, 'require')) {
      result.msg = '密码提示问题不能为空'
      return result
    };
    result.status = true;
    result.msg = '验证通过';

    return result
  }
};


$(function () {
  userCenterUpdate.init()
});