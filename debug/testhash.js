import hasha from 'hasha'
import stringHash from 'string-hash'
var text = "中文"
var hashresult = hasha(text)
var strhashresult = stringHash(text)
console.log(text + "test1:\n")
console.log(" hasha:" + hashresult + '\n')
console.log(" hasha:" + strhashresult + '\n')
text = "理解"
hashresult = hasha(text)
strhashresult = stringHash(text)
console.log(text + "test2:\n")
console.log(" hasha:" + hashresult + '\n')
console.log(" hasha:" + strhashresult + '\n')
text = "请填写物资名称及数量，详细的规格型号或其他补充说明（最多可输入400字），请填写物资名称及数量，详细的规格型号或其他补充说明（最多可输入400字）"
hashresult = hasha(text)
strhashresult = stringHash(text)
console.log(text + "test2:\n")
console.log(" hasha:" + hashresult + '\n')
console.log(" hasha:" + strhashresult + '\n')
