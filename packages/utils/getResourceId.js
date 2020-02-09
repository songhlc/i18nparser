
// 传入中文，输出resourceId
import stringHash from 'string-hash'
import wordMapping from './wordMapping'
export default function getResourceId (text) {
  var resouceId = 'YC_FED_' + stringHash(text)
  wordMapping[resouceId] = text.replace(/\n/g, '')
  return resouceId
}