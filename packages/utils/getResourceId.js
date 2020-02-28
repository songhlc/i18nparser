
// 传入中文，输出resourceId
import stringHash from 'string-hash'
import wordMapping from './wordMapping'
import getGlobalData from './getGlobalData'
// TODO:要把资源id最后的数字转成10为顺序数字
export default function getResourceId (text) {
  var resouceId = ""
  try {
    text = text.replace(/\n/g, '')
    text = text.trim()
    text = text.replace(/&nbsp;/g, '')
    resouceId = getGlobalData.resourceIdPrefix + stringHash(text)
    // html中存在&nbsp;这样的占位符，不能删掉，需要转换成空格
    wordMapping[resouceId] = text
  } catch (e) {
    wordMapping[resouceId] = text
    // TODO：正则表达式
  }
  // .replace(/\s+/g, '')  有些是html代码片段，不能去掉空格
  return resouceId
}