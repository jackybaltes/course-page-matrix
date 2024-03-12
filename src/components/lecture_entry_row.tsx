import React, { FC } from 'react';
import styles from './lecture_entry_row.module.css';

interface iLectureEntryRowProps {
    rkey: string;
    title: string;
    url: string;
    posted?: string;
}

const LectureEntryRow: FC<iLectureEntryRowProps> = ({rkey, title, url, posted}) => {
    return (
        <tr key={rkey} className={styles.lectureRow}>
            <td className={styles.lectureTitle}>
                <a href={url}>{title}</a>
            </td>
            <td className={styles.lecturePosted}>
                {posted}
            </td>
        </tr>
    );
  }
  
  export default LectureEntryRow;