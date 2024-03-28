import React, { FC } from 'react';
import styles from './assignments_block.module.css';
import * as msdk from "matrix-js-sdk";

interface IAssignmentBlock {
    messages: Array<msdk.MatrixEvent>;
};

const AssignmentBlock: FC<IAssignmentBlock> = ({messages}) => {
    const assignments = new Array<{key:string,title:string,posted:string, due:String, url:string}>();
    const assignmentRE = new RegExp(' *[aA]ssignment *: *(.*) - *[dD]ue  *[dD]ate *: *(.*)$');
    //const assignmentRE = new RegExp(' *[aA]ssignment *: *.*$');

    console.log(`assignmentBlock messages ${messages}`);
    if(messages) {
        let http_url : string;
        for(let e of messages) {
            let content = e.getContent();
            let body = content.body;

            if ((content.msgtype == msdk.MsgType.Text)||(content.msgtype == msdk.MsgType.Notice)) {
                let match = body.match(assignmentRE);
                console.log(`AssignmentBlock: Checking ${body} for assignment return match ${match}`);

                if (match) {
                    let title = match[1];
                    let due = match[2];
    
                    let t = new Date(e.localTimestamp);
                    let ts = t.toLocaleDateString();
                    console.log(`assignment title=${title} posted=${ts} url:${http_url}`);
                    
                    assignments.push({key:e.getId()!, title:title, due:due, posted:ts, url: http_url });
                    http_url = "";
                }    
            } else if (content.msgtype == msdk.MsgType.File) {
                http_url = content.url;
                console.log(`AssignmentBox: mimetype ${content.info.mimetype} name ${content.body} http url ${content.urll}`);
            } else {
                //http_url = "";
            }
        }
    }

    //console.log(`AssignmentBox: assignments ${JSON.stringify(assignments)}`);

    return (
        <div className={styles.assignmentBlock}>
            <h2 className={styles.assignmentH2}>Assignments</h2>
            
            <table className={styles.assignmentBlockTable}>
            <thead>
                <tr>
                <th>
                    Title
                </th>
                <th>
                    Due Date
                </th>
                </tr>
            </thead>
            <tbody>
            {
            assignments.map( (item) => (
                <tr key={1}>
                    <td><a href={item.url}>{item.title}</a></td><td>{item.due}</td>
                </tr>
            ))
            }
            </tbody>
            </table>
        </div>
    );
}

export default AssignmentBlock;

