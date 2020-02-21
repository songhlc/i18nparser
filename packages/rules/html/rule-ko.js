import koAttr from './rule-ko-koattr'
import nativeAttr from './rule-ko-nativeattr'
import ignoreTag from './rule-ko-ignore-tag'
import text from './rule-ko-text'
const rule = {
    koTagRule: [ignoreTag, nativeAttr, koAttr],
    koTextRule: [ignoreTag, text]
}
export default rule