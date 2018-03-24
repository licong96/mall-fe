require('./index.scss');

var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

// 侧边导航
var navSide = {
  option: {
    name: '',
    navList: [
      { name: 'user-center', desc: '个人中心', href: './user-center.html' },
      { name: 'order-list', desc: '我的订单', href: './order-list.html' },
      { name: 'user-pass-update', desc: '修改密码', href: './user-pass-update.html' },
      { name: 'about', desc: '关于MMall', href: './about.html' }
    ]
  },
  Dom: {
  },
  init: function (option) {
    $.extend(this.option, option);    // 合并参数
    this.renderNav();
  },
  // 渲染导航菜单
  renderNav: function () {
    var iLength = this.option.navList.length
    for (var i = 0; i < iLength; i++) {
      // 判断当前哪个选中，添加一个isActive属性
      if (this.option.navList[i].name === this.option.name) {
        this.option.navList[i].isActive = true
      }
    };

    // 渲染list数据
    var navHtml = _mm.renderHtml(templateIndex, {
      navList: this.option.navList
    });
    // 把html填充到容器
    $('.nav-side').html(navHtml)
  }
};

module.exports = navSide
