import type { ComponentChildren } from 'preact';
import { h } from 'preact';

const Card = ({
    isLoading,
    title,
    subTitle,
    children,
}: {
    isLoading: boolean;
    title: string;
    subTitle: string;
    children: ComponentChildren;
}) => (
    <div className={`card${!isLoading ? ' card--show' : ''}`}>
        <h1 className="card__title">{title}</h1>
        <h2 className="card__subtitle">{subTitle}</h2>
        {children}
    </div>
);

export default Card;
