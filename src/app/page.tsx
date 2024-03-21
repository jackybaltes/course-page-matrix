"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useRef, useEffect, useState } from "react";
import LectureBlock from "../components/lectures_block";
import Footer from "./footer";
import createMatrixClient from "./matrix_client";

export default function Home() {
  const [messages, setMessages ] = useState<Array<string>>();

  useEffect(() => {
    console.log("Home.useEffect");
    const client = createMatrixClient( 
      "https://www.matrix.org", 
      "@ntnu-erc-reader-1a:matrix.org",
      "syt_bnRudS1lcmMtcmVhZGVyLTFh_HicJEMSbJMeVtwQbXGjA_4aVyyo"
    );
    const roomId = "!AKUFkbbXmXnfsNPLJr:matrix.org";
    client.connect();

    client.sync(roomId, 1000).then( () => {
      console.log("Room synced");
    });

    client.getMessages(roomId).then( (messages) => {
      console.log(`useEffect:retrived messages ${JSON.stringify(messages)}`);
      setMessages(messages);
    });
    return () => {
      client.disconnect();
    }
  });

  let lectures: Array<{key: string, title: string, url: string, posted: string}> =[
    {key: "1", title: "Test1", url:"https:1.html", posted: "20-2-2024"},
    {key: "2", title: "Test2", url:"https:2.html", posted: "21-2-2024"}
  ];

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>Complex Motion Planning</h1>
              
        <LectureBlock lectures={lectures}/>
        <h2 className={styles.h2}>Assignments</h2>
        <p>Assignments should be done individually.</p>

        <div className={styles.assignment}>
          <ul>
            <li><Link className="styles.alink" href="assignments/rock-climbing-robots">Rock Climbing Robot</Link></li>
          </ul>
        </div>
        <Footer/>
      </main>
    </>
  );
}
