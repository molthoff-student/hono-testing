import { Hono } from 'hono'
import locales from './locale'
import { app } from './app'
import { contextStorage } from 'hono/context-storage';

export function isDevEnv(): boolean {
    return process.env.NODE_ENV !== 'production';
}
console.log(`Is development build: ${isDevEnv()}`);

export type Env = {
    Variables: {
        locale: string
    }
}

const index = new Hono<Env>()

index.use(contextStorage());

index.use('/:locale/*', async (c, next) => {
    const locale = c.req.param('locale');

    if (!(locales.has(locale))) {
        console.log(`invalid locale: ${locale}`);
        return c.notFound()
    }

    c.set('locale', locale);
    
    await next()
})

index.route('/:locale', app);

index.get('/', (c) => {
    const language = c.req.header('accept-language');

    if (language) {
        console.log(`comparing locale: '${language}'`);
        for (const key in locales.keys()) {
            console.log(`comparing against '${key}'`);
            if (language.startsWith(key)) {
                return c.redirect(`/${key}`)
            }
        }
    }

    return c.redirect('/en')
})

export default index