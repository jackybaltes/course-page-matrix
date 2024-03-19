import React, { FC } from 'react';
import styles from './lectures_block.module.css';
import LectureEntryRow from "../components/lecture_entry_row";

interface iLecturesBlockProps {
    lectures: Array<{key: string, title: string, url: string, posted: string}>;
};

const LecturesBlock: FC<iLecturesBlockProps> = ({lectures}) => {
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
                <LectureEntryRow key={item.key} rkey={item.key} title={item.title} url={item.url} posted={item.posted} />
            ))
            }
            </tbody>
            </table>
        </div>
    );
}

export default LecturesBlock;

