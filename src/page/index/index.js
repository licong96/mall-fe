require('./index.scss')
require('../common/common.js')

require('page/layout/nav/index.js');
require('page/layout/header/index.js');
require('page/layout/footer/index.js');

var navSide = require('page/layout/nav-side/index.js');

navSide.init({
  name: 'user-center'
});

