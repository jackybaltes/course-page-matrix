import * as msdk from "matrix-js-sdk";

export type JBMatrixClient = {
  connect: () => void,
  sync: (roomId:string|msdk.Room, initialSyncLimit:number) => Promise<void>,
  getMessages: (roomId: string, handler?: (event: msdk.MatrixEvent) => void) => Promise<Array<msdk.MatrixEvent>>,
  disconnect: () => Promise<void>,
  once: (state: msdk.ClientEvent, handler: (state: msdk.SyncState, lastState: msdk.SyncState|null, data?: msdk.SyncStateData) => void) => void
  mxcUrlToHttp: (mxc: string) => string|null;
  getJoinedRooms: () => Promise<Array<string>>;
  getRoom: (roomId: string) => msdk.Room|null;
};

export function createJBMatrixClient(baseUrl: string, userId: string, accessToken: string) : JBMatrixClient {
  let client: msdk.MatrixClient | null = null;

  return {
    connect() {
      if (client == null) {
        client = msdk.createClient({
          baseUrl: baseUrl,
          userId: userId,
          accessToken: accessToken
        });
        // client.publicRooms((err, data) => {
        //   console.log("Public Rooms: %s %s", JSON.stringify(data), err);
        // });
      } else {
        console.log("Warning: client already connected");
      }
    },
    async sync( roomId:string|msdk.Room, initialSyncLimit:number) {
      if (client != null) {
        if (typeof(roomId) === typeof(msdk.Room)) {
          let room = (roomId as msdk.Room);
          roomId = room.roomId;
        }
        await _sync(client, (roomId as string), initialSyncLimit);
      } else {
        console.log("Warning: sync client is null");
      }
    },
    async getMessages(roomId: string, handler?: (event: msdk.MatrixEvent) => void) : Promise<Array<msdk.MatrixEvent>> {
      let messages = new Array<msdk.MatrixEvent>();

      if (client != null) {
        _getMessages(client, roomId, messages, handler);
      } else {
        console.log("Warning: getMessages client is null");
      }
      return messages;
    },
    async disconnect() {
      if (client != null) {
        console.log(`Disconnecting client`);
        client = null;
      } else {
        console.log("Client already disconnected");
      }
      
    },
    once(state: msdk.ClientEvent, handler: (state: msdk.SyncState, lastState: msdk.SyncState|null, data?: msdk.SyncStateData) => void) {
      if (client != null) {
        client.once( state, handler);
      } else {
        console.log("matrix_client once. client is null");
      }
    },
    mxcUrlToHttp( mxc: string) {
      let s : string | null = mxc;
      if (client != null) {
        s = client.mxcUrlToHttp(mxc);
      }
      return s;
    },
    async getJoinedRooms() {
      let rooms = new Array<string>();
      if (client != null) {
        let value = await client.getJoinedRooms(); 
        let room_ids = value.joined_rooms;
        for(let r of room_ids) {
          rooms.push(r);
        }
      }
      return rooms;
    },
    getRoom(roomId: string) {
      let room = null;
      if ( client != null) {
        room = client.getRoom(roomId);
      }
      return room;
    }
  }
}

async function _getMessages(client: msdk.MatrixClient, roomId: string, messages?: Array<msdk.MatrixEvent>, handler?: (event: msdk.MatrixEvent) => void) {
  let room = client.getRoom(roomId);
  console.log(`getMessages roomId ${roomId} room ${room}`);
  if (room == null) {
    console.log(`Room ${roomId} does not exist`);
    return;
  }
  let timelineWindow = new msdk.TimelineWindow(client, room.getUnfilteredTimelineSet());
  let eventId = undefined; // we can fetch events around a specified event or set to null to go from end of timeline
  let initialWindowSize = 20; // number of events to grab for initial load

  timelineWindow.load(eventId, initialWindowSize).then(
    () => {
      console.log(`timelineWindow.load resolved`);
      // // now we can grab the events
      // let events = timelineWindow.getEvents();

      // console.log(`getMessages timelineWindow getEvents => ${JSON.stringify(events)}`);
      // let count = 1;
      // for (let e of events) {
      //   let content = e.getContent();
      //   messages?.push(e);
      //   if ((content.msgtype == msdk.MsgType.Text) || (content.msgtype == msdk.MsgType.Notice)) {
      //     console.log(`${count} retrived message from ${e.sender?.userId}:${content.body}`);
      //     count = count + 1;
      //     console.log(`handler: ${handler}`);
      //   }
      // }

      // now lets move the window backwards
      // moreMessages will be false if there are no more events in this direction
      let backwards = true;
      timelineWindow.paginate(backwards ? msdk.EventTimeline.BACKWARDS : msdk.EventTimeline.FORWARDS, 8).then(
        (moreMessages: boolean) => {
          console.log(`timelineWindow.paginate resolved ${moreMessages}`);
          if (moreMessages) {
            // there are more messages, lets remove the previous page's events
            let events = timelineWindow.getEvents();

            console.log(`getMessages timelineWindow getEvents => ${JSON.stringify(events)}`);
            let count = 1;
            for (let e of events) {
              let content = e.getContent();
              if ((content.msgtype == msdk.MsgType.Text) || (content.msgtype == msdk.MsgType.Notice)) {
                console.log(`${count} retrived message from ${e.sender?.userId}:${content.body}`);
                count = count + 1;
                if (handler) {
                  console.log(`calling handler: ${handler}`);
                  handler(e);
                }  
              } else if (content.msgtype == msdk.MsgType.File) {
                //console.log(`received message file type ${JSON.stringify(e)}`);
                //let http_url = client.mxcUrlToHttp(content.url);
                //console.log(`mimetype ${content.info.mimetype} name ${content.body} http url ${http_url}`);
                if (handler) {
                  handler(e);
                }
              }
            }
            timelineWindow.unpaginate(8, !backwards);
          }
        }
      );
    });
}

async function _sync(client: msdk.MatrixClient, roomId: string, initialSyncLimit:number = 1000) {
  await client.startClient({});

  console.log(`startClient resolved`);

  client!.roomInitialSync(roomId, 1000).then(
      (response) => {
        console.log(`roomInitialSync ${JSON.stringify(response)}`);
        let chunk = response.messages?.chunk!;
        let count = 1;
        for (let m of chunk) {
          let content = m.content;
          if (content.msgtype == "m.text") {
            console.log(`${count} message ${JSON.stringify(m)}`);
            count = count + 1;
          }
        }
      }
  );
}
