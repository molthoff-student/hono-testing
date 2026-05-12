import { Context } from "hono";
import en from './locales/en.json';
import nl from './locales/nl.json';
import { Env, isDevEnv } from ".";

import { getContext} from 'hono/context-storage'


const isDev = isDevEnv();

type serializedLocale = { 
    name: string, 
    data: typeof en
}

type Locale = {
    locale: string,
    msg: (path: string) => string
}

// const DIRECTORY = './locales/';
// function serializeLocales(): serializedLocale[] {
//     if (isDev) {
//         console.log("Serializing development locales...");
//         return [
//             { name: 'en', data: en },
//             { name: 'nl', data: nl },
//         ]
//     }

//     console.log("Serializing production locales...");
//     const fileFilter = /^.{2}\.json$/i;
//     return fs.readdirSync(DIRECTORY, { withFileTypes: true })
//         .map((file) => {
//             if (!file.isFile()) return null;

//             const name = file.name;
//             if (!fileFilter.test(name)) return null;

//             const filePath = DIRECTORY + name;
//             const buff = fs.readFileSync(filePath, { encoding: 'utf8'});
//             return {
//                 name: name.toLowerCase(), 
//                 data: JSON.parse(buff)
//             };
//         })
//         .filter((file) => file !== null)
// }

function serializeLocales(): serializedLocale[] {
    if (isDev) {
        // console.log("Serializing development locales...");
        const locales = [
            { name: 'en', data: en },
            { name: 'nl', data: nl },
        ];
        return locales;
    } else {
        // console.log("Serializing production locales...");
        return [];
    }
}

function mapLocales(): Map<string, typeof en> {
    let localeMap = new Map<string, typeof en>();
    // console.log(`Created locale Map...`);
    const localeList = serializeLocales();
    localeList.forEach(({name, data}) => {
        // console.log(`Adding locale '${name}'...`);
        localeMap.set(name, data);
    });
    return localeMap;
}


class locale {
    readonly map = mapLocales();
    keys() {
        return this.map.keys;
    };
    has(key: string): boolean {
        return this.map.has(key);
    };
    use(): Locale {
        const context = getContext<Env>();
        const locale = context.var.locale;

        if (!locale) {
            throw new Error('useLocale must be used inside a request');
        }
        
        const localeData = this.map.get(locale);
        if (!localeData) {
            throw new Error(`missing locale: '${locale}'`);
        }

        const msg = (path: string): string => {
            return path
                .split('.')
                .reduce<any>(
                    (current, key) => current?.[key], 
                    localeData
                ) ?? `locales.${locale}.${path}`;
        }

        return { locale, msg }
    };
}

export default new locale;