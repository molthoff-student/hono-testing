import { CommonHeader } from "../common/header";
import { Meta } from "../common/meta";
import locales from "../locale";
import { Context } from "hono";

export function HomePage(c: Context): Response {
    const { locale, msg } = locales.use();

    const homePage = 'meta.homePage.';

    const title = msg(homePage + 'title');
    const content = msg(homePage + 'content');

    return c.jsx(
        <Meta
            title={title}
            content={content}
            locale={locale}
        >
            <CommonHeader />
            <p>{content}</p>
        </Meta>
    );
}