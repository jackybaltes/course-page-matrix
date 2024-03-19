import * as msdk from "matrix-js-sdk";

const client = msdk.createClient( {
    baseUrl: "https://matrix.org",
    userId: "@ntnu-erc-reader-1a:matrix.org",
    accessToken: "syt_bnRudS1lcmMtcmVhZGVyLTFh_HicJEMSbJMeVtwQbXGjA_4aVyyo"
  });

  client.startClient({ initialSyncLimit: 100 }).then( () => {

    console.log( `startClient resolved`);

    //let roomId = "!AKUFkbbXmXnfsNPLJr:matrix.org";
    let roomId = "!jaUuTGEmyDnPdRrzwz:matrix.org";

    client.roomInitialSync(roomId, 1000).then(
       (response) => {
        console.log(`roomInitialSync ${JSON.stringify(response)}`);
        let chunk = response.messages?.chunk!;
        let count = 1;
        for(let m of chunk) {
          let content = m.content;
          if (content.msgtype == "m.text" ) {
            console.log( `${count} message ${JSON.stringify(m)}`);
            count = count + 1;
          }
        }  
       }
    );  

    client.once(msdk.ClientEvent.Sync, (event) => {
      console.log(`client sync resolved ${event}`);
      if (event==msdk.SyncState.Prepared) {
        getMessages(client, roomId ).then( () => {
          console.log("Retrieved messages")
        });
      }
    });
  });

async function getMessages( client:msdk.MatrixClient, roomId: string ) {
    let room = client.getRoom(roomId);
    console.log(`getMessages room ${room}`);
    if(!room) {
        console.log(`Room ${roomId} does not exist`);
        return;
    }
    let timelineWindow = new msdk.TimelineWindow(client, room.getUnfilteredTimelineSet());
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
          if ((content.msgtype==msdk.MsgType.Text)||(content.msgtype==msdk.MsgType.Notice)) {
            console.log(`${count} retrived message from ${e.sender?.userId}:${content.body}`);
            count = count + 1;
          }
        }
  
        // now lets move the window backwards
        // moreMessages will be false if there are no more events in this direction
        let backwards = true;
        timelineWindow.paginate(backwards ? msdk.EventTimeline.BACKWARDS : msdk.EventTimeline.FORWARDS, 8).then(
          (moreMessages:boolean) => {
            console.log(`timelineWindow.paginate resolved ${moreMessages}`);
            if(moreMessages) {
                // there are more messages, lets remove the previous page's events
                let events = timelineWindow.getEvents();
        
                console.log( `getMessages timelineWindow getEvents => ${JSON.stringify(events)}`);
                let count = 1;
                for(let e of events) {
                  let content = e.getContent();
                  if ((content.msgtype==msdk.MsgType.Text)||(content.msgtype==msdk.MsgType.Notice)) {
                    console.log(`${count} retrived message from ${e.sender?.userId}:${content.body}`);
                    count = count + 1;
                  }
                }
                timelineWindow.unpaginate(8, !backwards);
            }
          }
        );
    });
  };

  export default getMessages;
