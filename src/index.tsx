import { Hono } from 'hono'
import { Locale, locales } from './locale'
import { app } from './app'

export type Variables = {
    locale: Locale
}

const index = new Hono<{ Variables: Variables }>()

index.use('/:locale/*', async (c, next) => {
    const locale = c.req.param('locale');

    if (!(locale in locales)) {
        return c.notFound()
    }

    c.set('locale', locale as Locale);

    await next()
})

index.route('/:locale', app);

index.get('/', (c) => {
    const language = c.req.header('accept-language');

    if (language) {
        for (const key of Object.keys(locales) as Locale[]) {
            if (language.startsWith(key)) {
                return c.redirect(`/${key}`)
            }
        }
    }

    return c.redirect('/en')
})

export default index