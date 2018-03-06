import fetch from 'util/fetch'

// 加载标签选项
export function InquiryTag() {
  const params = {
    todo: 'Reference',
    type: 'SelectByNameToJson',
    needpurview: true,
    valiurl: document.URL,
    RefName: 'InquiryTag'
  }

  var url = '/Handler/Handler.ashx'

  return fetch('get', url, params)
}