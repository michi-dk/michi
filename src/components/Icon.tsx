import type { ComponentChildren } from 'preact';
import { h } from 'preact';

const Icon = ({ children }: { children: ComponentChildren }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="64px" height="64px">
        {children}
    </svg>
);

export default Icon;
