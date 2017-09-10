import '../../extensions/string'
import { ISO_UTF_MAP } from './iso-utf-map'

export function mapIsoToUtf(str: string): string {
    let res = str
    ISO_UTF_MAP.forEach((utf: string, iso: string) => {
        res = res.replaceAll(iso, utf)
    })
    return res
}
