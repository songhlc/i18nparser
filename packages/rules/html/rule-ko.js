import koAttr from './rule-ko-koattr'
import nativeAttr from './rule-ko-nativeattr'
import text from './rule-ko-text'
const rule = {
    koTagRule:[nativeAttr,koAttr],
    koTextRule:[text]
}
export default  rule