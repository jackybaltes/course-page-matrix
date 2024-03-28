import React, { FC } from 'react';
import styles from './lecture_entry_row.module.css';

interface ILectureEntryRowProps {
    rkey: string;
    title: string;
    url: string;
    posted: string;
    video?:string;
};

const LectureEntryRow: FC<ILectureEntryRowProps> = ({rkey, title, url, posted, video}) => {
    let vs = "";
    if (video) {
        console.log(`Adding video embed ${video}`);
        const youtubeRE = new RegExp('https?://www.(youtube.com)|(youtu.be)/(?<vid>[^/]+)$');

        let m = video.match(youtubeRE);
        if (m) {
            video = "https://www.youtube.com/embed/" + m.groups['vid'];
        }
        vs = `<br><iframe width="400" height="230" src="${video}" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
        
    }

    console.log(`lectureentryrow ${title} ${url} ${video} ${posted} ${vs}`);

    if (video) {
        return (
            <tr key={rkey} className={styles.lectureRow}>
                <td className={styles.lectureTitle}>
                    <a href={url}>{title}</a>
                    <iframe width="320" height="240" src={video} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </td>
                <td className={styles.lecturePosted}>
                    {posted}
                </td>
            </tr>
        );
    } else {
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
  }
  
  export default LectureEntryRow;