require('./index.scss');
require('../common/common.js')

require('page/layout/nav-simple/index.js');
require('page/layout/footer/index.js');

// user-pass-reset 找回密码
var _mm = require('util/mm.js');
var _user = require('service/user-service');

var userPassRest = {
  data: {
    username: '',
    question: '',
    answer: '',
    token: '',
  },
  Dom: {
    errorItem: $('.error-item'),
    errorMsg: $('.error-item .err-msg')
  },    
  init: function () {
    this.onLoad()
    this.bindEvent();
  },
  onLoad() {
    this.loadStepUsername()
  },
  bindEvent: function () {
    // 用户名下一步点击
    $('#submit-username').on('click', (res) => {
      var username = $.trim($('#username').val());
      if (username) {
        _user.getQuestion(username, res => {
          this.formError.hide.call(this)
          this.data.username = username;    // 保存用户
          this.data.question = res.data;
          this.loadStepQuestion(res.data);
        }, err => {
          this.formError.show.call(this, err)
        })
      } 
      else {
        this.formError.show.call(this, '请输入用户名')
      }
    });
    // 密码提示下一步点击
    $('#submit-answer').on('click', (res) => {
      var answer = $.trim($('#answer').val());
      if (answer) {
        _user.checkAnswer({
          username: this.data.username,
          question: this.data.question,
          answer: answer
        }, res => {
          this.formError.hide.call(this)
          this.data.answer = answer;
          this.data.token = res.data;
          this.loadStepPassword();
        }, err => {
          this.formError.show.call(this, err)
        })
      }
      else {
        this.formError.show.call(this, '请密码提示问题答案')
      }
    });
    // 输入新密码
    $('#submit-password').on('click', (res) => {
      var password = $.trim($('#password').val());
      if (password && password.length >= 6 && password.length <= 24) {
        _user.resetPassword({
          username: this.data.username,
          passwordNew: password,
          forgetToken: this.data.token
        }, res => {
          this.formError.hide.call(this)
          window.location.href = './result.html?type=pass-reset';
        }, err => {
          this.formError.show.call(this, err)
        })
      }
      else {
        this.formError.show.call(this, '请输入新密码，不小于6位，不大于24位')
      }
    });
  },
  loadStepUsername() {      // 加载输入用户名的一步
    $('.step_username').show()
  },
  loadStepQuestion(text) {      // 第二步
    $('.step_username').hide().siblings('.step_question').show().find('.question_title').text(text)
  },
  loadStepPassword(text) {      // 第三步
    $('.step_question').hide().siblings('.step_password').show()
  },
  // 提交表单
  submit: function () {
  },
  // 表单验证
  formValidate: function (formData) {
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
};


$(function () {
  userPassRest.init()
});