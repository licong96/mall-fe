require('./index.scss')
require('../common/common.js')

require('page/layout/nav/index.js');
require('page/layout/header/index.js');
require('page/layout/footer/index.js');

var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');

// 商品列表
var list = {
  data: {
    listParam: {
      keyword: _mm.getUrlParam('keyword') || '',
      categoryId: _mm.getUrlParam('categoryId') || '',
      orderBy: _mm.getUrlParam('orderBy') || 'default',
      pageNum: _mm.getUrlParam('pageNum') || 1,
      pageSize: _mm.getUrlParam('pageSize') || 20,
    }
  },
  Dom: {
  },
  init() {
    this.loadList();
    this.bindEvent();
  },
  onLoad() {

  },
  bindEvent() {

  },
  loadList() {      // 加载list数据
    let listHtml = '',
        listParam = this.data.listParam
    _product.getProductList(listParam, res => {
      listHtml = _mm.renderHtml(templateIndex, {
        list: res.list
      });
      if (!listHtml) {
        listHtml = '<span class="center">没有找到相关数据</span>'
      }
      $('.list-con').html(listHtml);
      this.loadPagination(res.pageNum, res.pages);
    },
    err => {
      _mm.errorTips(err)
    })
  },
  loadPagination(pageNum, pages) {

  }
};

$(function () {
  list.init();
});
