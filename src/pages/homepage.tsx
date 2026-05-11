import { CommonHeader } from "../common/header";
import { Meta, MetaProperties } from "../common/meta";
import { useLocale } from "../locale";
import { Context } from "hono";

export function HomePage(c: Context): Response {
    const { locale, msg } = useLocale(c);

    const metaData = msg('meta.homePage') as MetaProperties;

    return c.jsx(
        <Meta
            title={metaData.title}
            content={metaData.content}
            locale={locale}
        >
            <CommonHeader />
            <h1>{metaData.title}</h1>
        </Meta>
    );
}