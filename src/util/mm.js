'use strict';

var Hogan = require('hogan.js');
var Swal = require('sweetalert');

var conf = {
  serverHost: ''      // webpack里面配置了 (/) ，所以这里不需要填写
};

var _mm = {
  // 网络请求
  request: function (param) {
    var _this = this;
    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data || {},
      success: function (res) {
        if (res.status === 0) {
          typeof param.success === 'function' && param.success(res.data, res.msg);
        }
        else if (res.status === 10) {   // 没有登录
          _this.doLogin()
        }
        else if (res.status === 1) {    // 数据错误
          typeof param.success === 'function' && param.error(res.msg);
        }
      },
      error: function (err) {
        typeof param.error === 'function' && param.error(err.status);
      }
    })
  },
  // 获取服务器地址
  getServerUrl: function (path) {
    return conf.serverHost + path
  },
  //获取url参数
  getUrlParam: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
  //渲染html模版
  renderHtml: function (htmlTemplate, data) {
    var template = Hogan.compile(htmlTemplate),
      result = template.render(data);
    return result;
  },
  // 成功提示
  successTips: function (msg, title) {
    Swal(title || '操作提示', msg || '成功', "success");
  },
  // 失败提示
  errorTips: function (msg, title) {
    Swal(title || '操作提示', msg || '失败', "error");
  },
  // 字段验证，支持非空、手机号、邮箱号
  validate: function (value, type) {
    var value = $.trim(value);
    // 非空验证
    if (type === 'require') {
      return !!value;
    }
    // 手机号验证
    if (type === 'phone') {
      return /^1\d{10}$/.test(value);
    }
    // 邮箱号验证
    if (type === 'email') {
      return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
    }
  },
  // 统一登录处理
  doLogin: function () {
    window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
  },
  // 跳首页
  goHome: function () {
    window.location.href = './index.html';
  }
};

module.exports = _mm;