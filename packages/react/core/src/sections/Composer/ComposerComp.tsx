import {className as compComposerClassName} from '@shared/components/Composer/create';
import {ComposerStatus} from '@shared/components/Composer/props';
import {
    statusClassName as compComposerStatusClassName,
} from '@shared/components/Composer/utils/applyNewStatusClassName';
import {isSubmitShortcutKey} from '@shared/utils/isSubmitShortcutKey';
import {ChangeEvent, KeyboardEvent, useEffect, useMemo, useRef} from 'react';
import {ComposerProps} from './props';
import { IoSend } from "react-icons/io5";
import { FaRegCircleStop } from "react-icons/fa6";

const submittingPromptStatuses: Array<ComposerStatus> = [
    'submitting-prompt',
    'submitting-edit',
    'submitting-conversation-starter',
    'submitting-external-message',
];

export const ComposerComp = (props: ComposerProps) => {
    const compClassNameFromStats = compComposerStatusClassName[props.status] || '';
    const className = `${compComposerClassName} ${compClassNameFromStats}`;
    const {textareaCssClass} = props || {}
    const disableTextarea = submittingPromptStatuses.includes(props.status);
    const disableButton = !props.hasValidInput || props.status === 'waiting' || submittingPromptStatuses.includes(
        props.status);
    const hideCancelButton = props.hideStopButton === true;
    const showCancelButton = !hideCancelButton && (submittingPromptStatuses.includes(props.status) || props.status
        === 'waiting');

    const {Footer} = props || {};

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (props.status === 'typing' && props.autoFocus && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [props.status, props.autoFocus, textareaRef.current]);

    const handleChange = useMemo(() => (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onChange?.(e.target.value);
    }, [props.onChange]);

    const handleSubmit = useMemo(() => () => {
        props.onSubmit?.();
    }, [props.onSubmit]);

    const handleKeyDown = useMemo(() => (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (isSubmitShortcutKey(e, props.submitShortcut)) {
            e.preventDefault();
            handleSubmit();
        }
    }, [handleSubmit, props.submitShortcut]);

    useEffect(() => {
        if (!textareaRef.current) {
            return;
        }
        const adjustHeight = () => {
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.style.height = 'auto'; // Reset height
                textarea.style.height = `${textarea.scrollHeight}px`; // Set new height based on content
            }
        };
        textareaRef.current.addEventListener('input', adjustHeight);
        return () => {
            textareaRef.current?.removeEventListener('input', adjustHeight);
        };

    }, [textareaRef.current]);

    return (
        <div className={className}>
            <div className="flex flex-row pl-10">
                <div className={`flex w-full pl-2`}>
                    <textarea
                        className={textareaCssClass || ''}
                        tabIndex={0}
                        ref={textareaRef}
                        disabled={disableTextarea}
                        placeholder={props.placeholder}
                        value={props.prompt}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        aria-label={props.placeholder}
                    />
                </div>
                <div className={`flex flex-1 items-center px-2 `}>
                    {!showCancelButton && (
                        <button
                            title={'Send'}
                            style={{backgroundColor: 'transparent'}}
                            tabIndex={0}
                            disabled={disableButton}
                            onClick={() => props.onSubmit()}
                            aria-label="Send"
                        >
                            <IoSend style={disableButton ? {cursor: 'not-allowed'}: {cursor: 'pointer'}} aria-disabled={disableButton} color={disableButton ? 'grey' : 'black'} size={'20'}/>
                        </button>
                    )}
                    {showCancelButton && (
                        <button
                            style={{backgroundColor: 'transparent'}}
                            tabIndex={0}
                            onClick={props.onCancel}
                            aria-label="Cancel"
                        >

                            <FaRegCircleStop size={'20'} />
                        </button>
                    )}
                </div>
            </div>
            {Footer}
        </div>
    );
};
