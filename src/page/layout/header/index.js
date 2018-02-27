require('./index.scss');

var _mm = require('util/mm.js');

// 通用页面头部
var header = {
  data: {},
  Dom: {
    input: $('#search-input'),
    btn: $('#search-btn')
  },
  init: function () {
    this.bindEvent();
  },
  onLoad: function () {
    // 参数填入搜索框
    var keyword = _mm.getUrlParam('keyword');
    if (keyword) {
      this.Dom.input.val(keyword)
    }
  },
  bindEvent: function () {
    // 点击搜索
    this.Dom.btn.click(function () {
      this.searchSubmit()
    }.bind(this))

    // 回车搜索
    this.Dom.input.keyup(function (e) {
      if (e.keyCode === 13) {
        this.searchSubmit()
      }
    }.bind(this))
  },
  // 搜索提交
  searchSubmit: function () {
    var keyword = $.trim(this.Dom.input.val());
    // 如果提交的时候有keyword，正常跳转list页搜索
    if (keyword) {
      window.location.href = './list.html?keyword=' + keyword;
    } else {
      _mm.goHome();
    }
  }
};

header.init();
