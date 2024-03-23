import React, { FC } from 'react';
import styles from './lectures_block.module.css';
import LectureEntryRow from "../components/lecture_entry_row";
import * as msdk from "matrix-js-sdk";

interface ILecturesBlockProps {
    messages: Array<msdk.MatrixEvent>
};

const LecturesBlock: FC<ILecturesBlockProps> = ({messages}) => {
    const lectures = new Array<{key:string,title:string,url:string, posted?:string, video?:string}>();
    const slidesRE = new RegExp(' *Slides *: *(?<title>.*) - (?<url>.*)');
    const lectureRE = new RegExp(' *Lecture *: *(?<title>.*) - (?<url>.*)');

    console.log(`lectureBlock messages ${messages}`);
    if(messages) {
        for(let e of messages) {
            let content = e.getContent();
            let body = content.body;

            let match = body.match(slidesRE);

            console.log(`Checking ${body} for slides return match ${match}`);
            if (match) {
                let title = match.groups['title'];
                let url = match.groups['url'];
                let t = new Date(e.localTimestamp);
                let ts = t.toLocaleDateString();
                console.log(`lecture title=${title} url=${url} posted=${ts}`);

                lectures.push({key:e.getId()!, title:title, url:url, posted:ts });
            }

            let lmatch = body.match(lectureRE);

            console.log(`Checking ${body} for lecture return match ${lmatch}`);
            if (lmatch) {
                let title = lmatch.groups['title'];
                let url = lmatch.groups['url'];
                let t = new Date(e.localTimestamp);
                let ts = t.toLocaleDateString();
                let video = lmatch.groups['url'];

                console.log(`lecture title=${title} url=${url} posted=${ts} video=${video}`);

                lectures.push({key:e.getId()!, title:title, url:url, posted:ts, video: video });
            }
        }
    }

    return (
        <div className={styles.lecturesBlock}>
            <h2 className={styles.h2}>Lectures</h2>
            <p>Link to <a href="https://colab.research.google.com/">Google collaboratory</a> notebooks used in the course.</p>

            <table className={styles.lecturesBlockTable}>
            <thead>
                <tr>
                <th>
                    Title
                </th>
                <th>
                    Posted
                </th>
                </tr>
            </thead>
            <tbody>
            {
            lectures.map( (item) => (
                <LectureEntryRow key={item.key} rkey={item.key} title={item.title} url={item.url} posted={item.posted} video={item.video} />
            ))
            }
            </tbody>
            </table>
        </div>
    );
}

export default LecturesBlock;

