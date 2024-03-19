"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect } from "react";
import LectureBlock from "../components/lectures_block";

export default function Home() {

  useEffect( () => {

    console.log("Home.useEffect");

  });

  let lectures: Array<{key: string, title: string, url: string, posted: string}> =[
    {key: "1", title: "Test1", url:"https:1.html", posted: "20-2-2024"},
    {key: "2", title: "Test2", url:"https:2.html", posted: "21-2-2024"}
  ];

  return (
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
    </main>
  );
}
