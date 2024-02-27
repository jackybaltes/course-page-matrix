"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect } from "react";
import * as sdk from "matrix-js-sdk";



async function getMessages( client:sdk.MatrixClient, roomId: string ) {
  let room = client.getRoom(roomId);
  console.log(`getMessages room ${room}`);
  if(!room) {
      console.log(`Room ${roomId} does not exist`);
      return;
  }
  let timelineWindow = new sdk.TimelineWindow(client, room.getUnfilteredTimelineSet());
  let eventId = undefined; // we can fetch events around a specified event or set to null to go from end of timeline
  let initialWindowSize = 20; // number of events to grab for initial load

  timelineWindow.load(eventId, initialWindowSize).then(
    () => {
      console.log(`timelineWindow.load resolved`);
      // now we can grab the events
      let events = timelineWindow.getEvents();
      
      console.log( `getMessages timelineWindow getEvents => ${JSON.stringify(events)}`);
      let count = 1;
      for(let e of events) {
        let content = e.getContent();
        if ((content.msgtype==sdk.MsgType.Text)||(content.msgtype==sdk.MsgType.Notice)) {
          console.log(`${count} retrived message from ${e.sender?.userId}:${content.body}`);
          count = count + 1;
        }
      }

      // now lets move the window backwards
      // moreMessages will be false if there are no more events in this direction
      let backwards = true;
      timelineWindow.paginate(backwards ? sdk.EventTimeline.BACKWARDS : sdk.EventTimeline.FORWARDS, 8).then(
        (moreMessages:boolean) => {
          console.log(`timelineWindow.paginate resolved ${moreMessages}`);
          if(moreMessages) {
              // there are more messages, lets remove the previous page's events
              let events = timelineWindow.getEvents();
      
              console.log( `getMessages timelineWindow getEvents => ${JSON.stringify(events)}`);
              let count = 1;
              for(let e of events) {
                let content = e.getContent();
                if ((content.msgtype==sdk.MsgType.Text)||(content.msgtype==sdk.MsgType.Notice)) {
                  console.log(`${count} retrived message from ${e.sender?.userId}:${content.body}`);
                  count = count + 1;
                }
              }
              timelineWindow.unpaginate(8, !backwards);
          }
        }
      );
  });
}

export default function Home() {

  useEffect( () => {
    console.log("Home.useEffect");

    const client = sdk.createClient( {
      baseUrl: "https://matrix.org",
      userId: "@ciolh007-bot-1:matrix.org",
      accessToken: "syt_Y2lvbGgwMDctYm90LTE_bOuqFPIMyVHVwKxPOGVI_34PpcQ"
    });

    client.startClient({ initialSyncLimit: 100 }).then( () => {

      console.log( `startClient resolved`);

      let roomId = "!AKUFkbbXmXnfsNPLJr:matrix.org";
      // client.roomInitialSync(roomId, 1000).then(
      //    (response) => {
      //     console.log(`roomInitialSync ${JSON.stringify(response)}`);
      //     let chunk = response.messages?.chunk!;
      //     let count = 1;
      //     for(let m of chunk) {
      //       let content = m.content;
      //       if (content.msgtype == "m.text" ) {
      //         console.log( `${count} message ${JSON.stringify(m)}`);
      //         count = count + 1;
      //       }
      //     }  
      //    }
      // );  

      client.once(sdk.ClientEvent.Sync, (event) => {
        console.log(`client sync resolved ${event}`);
        if (event==sdk.SyncState.Prepared) {
          getMessages(client, roomId ).then( () => {
            console.log("Retrieved messages")
          });
        }
      });
    });
  });

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Complex Motion Planning</h1>

      <h2 className={styles.h2}>Lectures</h2>
      <p>Link to <a href="https://colab.research.google.com/">Google collaboratory</a> notebooks used in the course.</p>

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
