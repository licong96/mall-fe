require('./index.scss');
require('../common/common.js')

require('page/layout/nav-simple/index.js');
require('page/layout/footer/index.js');

// login 登录
var _mm = require('util/mm.js');
var _user = require('service/user-service');

var userLogin = {
  Dom: {
    errorItem: $('.error-item'),
    errorMsg: $('.error-item .err-msg')
  },    
  // 表单里的错误提示
  formError: {      // 调用里面的方法记得绑定this
    show(errMsg) {
      this.Dom.errorItem.show()
      this.Dom.errorMsg.text(errMsg)
    },
    hide() {
      this.Dom.errorItem.hide()
      this.Dom.errorMsg.text('')
    }
  },
  init: function () {
    this.bindEvent();
  },
  bindEvent: function () {
    $('#submit').on('click', () => {    // 点击登陆提交
      this.submit()
    })
    $('.user-content').keyup((e) => {   // 回车提交
      if (e.keyCode === 13) {
        this.submit()
      }
    })
  },
  // 提交表单
  submit: function () {
    var formData = {
          username: $.trim($('#username').val()),
          password: $.trim($('#password').val())
        },
        // 表单验证结果
        validateResult = this.formValidate(formData);
    
    if (validateResult.status) {
      this.formError.hide.call(this)
      _user.login(formData, function (res) {
        _mm.setCookie('mmall_login_token', 'D6E784CC6FD1A0B2BDB2E4F436128570')   // 登陆验证出现问题，原因是Cookie
        window.location.href = _mm.getUrlParam('redirect') || './index.html';   // 跳回来的地址
      }, (errMsg) => {
        this.formError.show.call(this, errMsg)
      })
    } 
    // 验证失败
    else {
      this.formError.show.call(this, validateResult.msg)
    }
  },
  // 表单验证
  formValidate: function (formData) {
    var result = {
      status: false,
      msg: ''
    };
    if (!_mm.validate(formData.username, 'require')) {
      result.msg = '用户名不能为空'
      return result
    }
    if (!_mm.validate(formData.password, 'require')) {
      result.msg = '密码不能为空'
      return result
    }
    result.status = true;
    result.msg = '验证通过';

    return result
  }
};


$(function () {
  userLogin.init()
});