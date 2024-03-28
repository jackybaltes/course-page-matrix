import React, { FC } from 'react';
import styles from './chat_block.module.css';
import * as msdk from "matrix-js-sdk";

interface IChatBlockProps {
    messages: Array<msdk.MatrixEvent>;
    max_messages: number;
};

const ChatBlock: FC<IChatBlockProps> = ({messages, max_messages}) => {
    const msgList = new Array<{key:string,sender:string, text:string}>();

    console.log(`chatBlock messages ${messages}`);
    if(messages) {
        let lim = max_messages < messages.length ? max_messages : messages.length;

        for(let i = 0; i < lim; i++) {
            let e = messages[i];
            let content = e.getContent();
            let body = content.body;

            msgList.push( {key: "chat_" + e.getId()!, sender:e.sender!.name, text:body} ); 
        }
    }

    return (
        <div className={styles.chatBlock}>
            <h2 className={styles.h2}>Chat History</h2>
            <p>Join the matrix channel for access to the lecture material</p>

            <table className={styles.chatBlockTable}>
            <thead>
                <tr>
                <th>
                    Message
                </th>
                </tr>
            </thead>
            <tbody>
            {
                msgList.map( (item) => (
                    <tr key={item.key}>
                        <td><span className={styles.chatMsgSender}>{item.sender}</span>:{item.text}</td>
                    </tr>
                ))
            }
            </tbody>
            </table>
        </div>
    );
}

export default ChatBlock;

