import Link from 'next/link';
import styles from "../../page.module.css";

export default function rockClimbingRobot() {
  return (
    <>
      <main className={styles.main}>
      <h1 className={styles.title}>Assignment: Rock Climbing Robots</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
      </main>
    </>
  );
}