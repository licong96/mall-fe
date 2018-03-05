require('./index.scss')
require('../common/common.js')

require('page/layout/nav-simple/index.js');
require('page/layout/footer/index.js');

// result 操作成功状态

var _mm = require('util/mm.js');

var result = {
  init: function () {
    this.onLoader();
  },
  onLoader: function () {
    // 根据type显示哪条提示信息
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');

    $element.show();
  }
}

result.init()