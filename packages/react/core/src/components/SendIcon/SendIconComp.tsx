import {className as compSendIconClassName} from '@shared/components/SendIcon/create';
import { IoSend } from "react-icons/io5";

export const SendIconComp = () => {
    return (
        <div className={compSendIconClassName}>
            <div className="nlux-comp-sendIcon-container">
                <IoSend size={20} color={'#616161'} className={'bg-none'} />
            </div>
        </div>
    );
};
