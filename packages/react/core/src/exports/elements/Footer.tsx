import {FunctionComponent, PropsWithChildren} from 'react';

/**
 * A wrapper around a user-provided Footer.
 * When used, it will override the default NLUX Footer.
 */
export const Footer: FunctionComponent<PropsWithChildren> = (props) => {
    return <>{props.children}</>;
};
