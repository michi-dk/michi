import { createElement, h } from 'preact';
import JSX = createElement.JSX;

interface SocialLink {
    title: string;
    url: string;
    icon: JSX.Element;
}
const SocialLink = ({ title, url, icon }: SocialLink) => (
    <a className="social-links__link" title={title} target="_blank" href={url} rel="noreferrer">
        {icon}
    </a>
);

export default SocialLink;
