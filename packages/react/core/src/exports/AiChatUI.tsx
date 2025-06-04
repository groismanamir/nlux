import {ReactElement} from 'react';
import {Greeting} from './elements/Greeting';
import {Loader} from './elements/Loader';
import {Footer} from "./elements/Footer";

export type AiChatUIOverrides = {
    Loader: ReactElement;
    Greeting?: ReactElement;
    Footer?: ReactElement;
}

/**
 * Wrapper for possible UI components that can be overridden in the default NLUX chat components.
 */
export const AiChatUI = {
    Loader,
    Greeting,
    Footer
};
