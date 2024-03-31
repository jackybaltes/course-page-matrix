"use client";

import styles from "./page.module.css";
import { useRef, useEffect, useState } from "react";
import LecturesBlock from "../components/lectures_block";
import ChatBlock from "../components/chat_block";
import AssignmentBlock from '../components/assignments_block';
import Footer from "./footer";
import * as msdk from "matrix-js-sdk";
import { JBMatrixClient, createJBMatrixClient } from "./jb_matrix_client";

export default function Home() {
  console.log("Home.useEffect");

  const [messages, setMessages] = useState<Array<msdk.MatrixEvent>>([]);
  const [agentRooms, setAgentRooms] = useState<Array<{room_id: string, room_name: string}>>([]);

  useEffect(() => {
    let JBclient: JBMatrixClient = createJBMatrixClient(
      "https://www.matrix.org",
      "@ntnu-erc-reader-1a:matrix.org",
      "syt_bnRudS1lcmMtcmVhZGVyLTFh_ExUCCTTEfPrGsfBTfmBa_2GXjQy"
    );
    //const roomId = "!jaUuTGEmyDnPdRrzwz:matrix.org";
    JBclient.connect();

    JBclient.getJoinedRooms().then((rooms) => {
      //rooms.push('"!jaUuTGEmyDnPdRrzwz:matrix.org"');
      console.log(`Resolved getJoinedRooms ${JSON.stringify(rooms)}`);
      
      for (let roomId of rooms) {
        console.log(`Retrieved room ${JSON.stringify(roomId)}`);

        JBclient.sync(roomId, 1000);

        JBclient!.once(msdk.ClientEvent.Sync, (state: msdk.SyncState) => {
          console.log(`client sync resolved ${state}`);
          if (state == msdk.SyncState.Prepared) {
            JBclient.getMessages(roomId, (event: msdk.MatrixEvent) => {
              console.log(`Retrieved event ${JSON.stringify(event)}`);
              if (event.getType() == msdk.EventType.RoomMessage) {
                let content = event.getContent();
                if (content) {
                  if ((content.msgtype == msdk.MsgType.Text) || (content.msgtype == msdk.MsgType.Notice) || (content.msgtype == msdk.MsgType.File)) {
                    if (content.msgtype == msdk.MsgType.File) {
                      let url = JBclient.mxcUrlToHttp(content.url);
                      if (url !== null) {
                        content.url = url;
                      }
                    }
                    setMessages((prevMessages) => {
                      return [
                        ...prevMessages!,
                        event
                      ]
                    });
                  }
                }
              }
            });

            let gRoom = JBclient.getRoom(roomId);
            if (gRoom != null) {
              setAgentRooms( (prevRooms) => {
                return [
                  ...prevRooms!,
                  { room_id: roomId, room_name: gRoom.name}
                ]
              });  
            }
            console.log(`Home useEffect room list ${JSON.stringify(agentRooms)}`);
          }
        });
      }
    });

    return () => {
      JBclient.disconnect();
    }
  }, []);

  // let lectures: Array<{ key: string, title: string, url: string, posted: string }> = [
  //   { key: "1", title: "Test1", url: "https:1.html", posted: "20-2-2024" },
  //   { key: "2", title: "Test2", url: "https:2.html", posted: "21-2-2024" }
  // ];

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>Complex Motion Planning</h1>
        <ChatBlock messages={messages} max_messages={5} />
        <LecturesBlock messages={messages} />
        <AssignmentBlock messages={messages} />
        <Footer />
      </main>
    </>
  );
}
