
// 传入中文，输出resourceId
import stringHash from 'string-hash'
import wordMapping from './wordMapping'
// TODO:要把资源id最后的数字转成10为顺序数字
export default function getResourceId (text) {
  var resouceId = 'YC_FED_' + stringHash(text)
  wordMapping[resouceId] = text.replace(/\n/g, '')
  // .replace(/\s+/g, '')  有些是html代码片段，不能去掉空格
  return resouceId
}