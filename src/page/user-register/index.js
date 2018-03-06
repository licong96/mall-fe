require('./index.scss');
require('../common/common.js')

require('page/layout/nav-simple/index.js');
require('page/layout/footer/index.js');

var _mm = require('util/mm.js');
var _user = require('service/user-service');

// user-register
var userRegister = {
  Dom: {
    errorItem: $('.error-item'),
    errorMsg: $('.error-item .err-msg'),
    username: $('#username')
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
    // 输入完成后，验证用户名
    this.Dom.username.on('blur', function() {
      var username = $.trim($(this).val());
      if (!username) {
        return;
      }
      _user.checkUsername(username, (res) => {
        alert('1')
        if (res.data.status !== 0) {
          this.formError.show.call(this,res.data.msg)
        }
        // this.formError.hide.call(this)
      }, (errMsg) => {
        this.formError.show.call(this)
      })
    })

    $('#submit').on('click', () => {    // 点击注册提交
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
          password: $.trim($('#password').val()),
          passwordConfirm: $.trim($('#password-confirm').val()),
          phone: $.trim($('#phone').val()),
          email: $.trim($('#email').val()),
          question: $.trim($('#question').val()),
          answer: $.trim($('#answer').val()),
        },
        // 表单验证结果
        validateResult = this.formValidate(formData);
    
    if (validateResult.status) {
      _user.register(formData, function (res) {
        window.location.href = './result.html?type=register'
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
    if (formData.password.length < 6) {
      result.msg = '密码长度不能少于6位'
      return result
    }
    if (formData.password !== formData.passwordConfirm) {
      result.msg = '两个次输入的密码不一致'
      return result
    }
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
    }

    result.status = true;
    result.msg = '验证通过';

    return result
  }
};


$(function () {
  userRegister.init()
});