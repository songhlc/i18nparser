import koAttr from './rule-ko-koattr'
import nativeAttr from './rule-ko-nativeattr'
import ignoreTag from './rule-ko-ignore-tag'
import text from './rule-ko-text'
import nbsp from './rule-ko-nbsp'
const rule = {
    koTagRule: [ignoreTag, nativeAttr, koAttr],
    koTextRule: [nbsp, ignoreTag, text]
}
export default rule