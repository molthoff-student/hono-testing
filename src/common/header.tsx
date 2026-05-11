import info from "../site-information.json";
import type { JSX } from 'hono/jsx';
import { Link } from "./link";

export const headerStyle: JSX.HTMLAttributes['style'] = {
    left: 0,
    top: 0,
    position: 'sticky',
    display: 'flex',
    height: 'fit-content',
    width: '100%',
}

export function CommonHeader() {
    
    return (
        <header style={headerStyle}>
            <Link class="title" link="/">
                <img class="title" src="/assets/placeholder.png" />
                <span>Test</span>
            </Link>
        </header>
    );
}