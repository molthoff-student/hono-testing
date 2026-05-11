import { Context } from "hono"
import en from './locales/en.json'
import nl from './locales/nl.json'

export const locales = {
    en: en,
    nl: nl
}

export type Locale = keyof typeof locales;
export type LocaleKey = keyof typeof en;

export type LocaleData = {
    locale: Locale
    msg: (path: string) => any
}

export function useLocale(c: Context): LocaleData {
    const locale = c.get('locale') as Locale;

    if (!locale) {
        throw new Error('useLocale must be used inside a request')
    }

    const msg = (path: string) => {
        return path
            .split('.')
            .reduce<any>(
                (current, key) => current?.[key], 
                locales[locale]
            )
            ?? `${locale}_${path}`
    }
    
    return { locale, msg }
}