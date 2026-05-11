import { JSX } from "hono/jsx";

export type LinkProperties = {
    link: string,
    class?: string,
    children?: any,
    style?: JSX.HTMLAttributes['style']
}

export function Link(
    {
        link,
        children,
        style
    }: LinkProperties
) {
    return  <a style={style} href={link}>{children}</a> ;
}