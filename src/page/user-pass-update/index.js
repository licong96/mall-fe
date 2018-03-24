require('../common/common.js')
require('./index.scss')

// require('page/layout/nav/index.js');
require('page/layout/header/index.js');
require('page/layout/footer/index.js');

// user-pass-update 修改个人信息
var navSide = require('page/layout/nav-side/index')
var _mm = require('util/mm.js');
var _user = require('service/user-service');

var userPassUpdate = {
  Dom: {
  },
  init: function () {
    // 初始化左侧菜单
    navSide.init({
      name: 'user-pass-update'
    })
    this.bindEvent();
  },
  bindEvent: function () {
    // $(".btn_submit").on('click', () => {
    //   console.log(this)
    // })
    // 点击元素还没被创建，使用了事件委托
    $('.btn_submit').on('click', () => {
      var userInfo = {
        password: $.trim($('#password').val()),
        passwordNew: $.trim($('#password_new').val()),
        passwordConfirm: $.trim($('#password_confirm').val()),
      },
      validateResult = this.validateResult(userInfo);
      // 是否验证通过
      if (validateResult.status) {
        _user.updatePassword({
          passwordOld: userInfo.password,
          passwordNew: userInfo.passwordNew
        }, res => {
          _mm.successTips(res.msg)
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
    if (!_mm.validate(formData.password, 'require')) {
      result.msg = '原密码不能为空'
      return result
    }
    if (!_mm.validate(formData.passwordNew, 'require')) {
      result.msg = '新密码不能为空'
      return result
    }
    if (!formData.passwordNew || formData.passwordNew.length < 6) {
      result.msg = '新密码长度不能小于6位'
      return result
    }
    if (formData.passwordNew != formData.passwordConfirm) {
      result.msg = '两次密码不一致'
      return result
    }
    result.status = true;
    result.msg = '验证通过';

    return result
  }
};


$(function () {
  userPassUpdate.init()
});