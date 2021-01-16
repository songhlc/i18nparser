var globalData = {
  quote: null,
  ignoreDirectory: [],
  ignoreComment: false,
  resourceIdPrefix: "YC_FED_",
  useWindow: false,
  originData: {},
  getTextMapping: function () {
    var textMap = {}
    var originData =  globalData.originData
    Object.keys(originData).forEach(function (key) {
      textMap[originData[key]] = key
    })
    return textMap
  }
}
export default globalData