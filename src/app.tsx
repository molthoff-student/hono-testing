import { Hono } from "hono";
import { JSX } from 'hono/jsx/jsx-runtime'
import { Variables } from ".";
import { renderToString } from "hono/jsx/dom/server";
import { HomePage } from "./pages/homepage";

declare module 'hono' {
    interface Context {
        jsx: (jsx: JSX.Element) => Response
    }
}

export const app = new Hono<{ Variables: Variables }>();

app.use('*', async (c, next) => {
    c.jsx = (jsx: JSX.Element) => {
        const pageData = renderToString(jsx);
        return c.html(`<!DOCTYPE html>\n${pageData}`)
    }

    await next()
})

app.get('/', HomePage);