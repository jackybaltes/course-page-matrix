(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{91054:function(){},49897:function(e,t,o){Promise.resolve().then(o.bind(o,65078))},65078:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return x}});var l=o(19506),n=o(53922),c=o(5657),s=o.n(c),r=o(22971),i=o(79705),a=o.n(i),d=o(44858),g=o.n(d),u=e=>{let{rkey:t,title:o,url:n,posted:c,video:s}=e,r="";return(s&&(console.log("Adding video embed ".concat(s)),r='<br><iframe width="400" height="230" src="'.concat(s,'" title="').concat(o,'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>')),console.log("lectureentryrow ".concat(o," ").concat(n," ").concat(s," ").concat(c," ").concat(r)),s)?(0,l.jsxs)("tr",{className:g().lectureRow,children:[(0,l.jsxs)("td",{className:g().lectureTitle,children:[(0,l.jsx)("a",{href:n,children:o}),(0,l.jsx)("iframe",{width:"320",height:"240",src:s,title:o,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0})]}),(0,l.jsx)("td",{className:g().lecturePosted,children:c})]},t):(0,l.jsxs)("tr",{className:g().lectureRow,children:[(0,l.jsx)("td",{className:g().lectureTitle,children:(0,l.jsx)("a",{href:n,children:o})}),(0,l.jsx)("td",{className:g().lecturePosted,children:c})]},t)},m=e=>{let{messages:t}=e,o=[],n=RegExp(" *Slides *: *(?<title>.*) - (?<url>.*)"),c=RegExp(" *Lecture *: *(?<title>.*) - (?<url>.*)");if(console.log("lectureBlock messages ".concat(t)),t)for(let e of t){let t=e.getContent().body,l=t.match(n);if(console.log("Checking ".concat(t," for slides return match ").concat(l)),l){let t=l.groups.title,n=l.groups.url,c=new Date(e.localTimestamp).toLocaleDateString();console.log("lecture title=".concat(t," url=").concat(n," posted=").concat(c)),o.push({key:e.getId(),title:t,url:n,posted:c})}let s=t.match(c);if(console.log("Checking ".concat(t," for lecture return match ").concat(s)),s){let t=s.groups.title,l=s.groups.url,n=new Date(e.localTimestamp).toLocaleDateString(),c=s.groups.url;console.log("lecture title=".concat(t," url=").concat(l," posted=").concat(n," video=").concat(c)),o.push({key:e.getId(),title:t,url:l,posted:n,video:c})}}return(0,l.jsxs)("div",{className:a().lecturesBlock,children:[(0,l.jsx)("h2",{className:a().h2,children:"Lectures"}),(0,l.jsxs)("p",{children:["Link to ",(0,l.jsx)("a",{href:"https://colab.research.google.com/",children:"Google collaboratory"})," notebooks used in the course."]}),(0,l.jsxs)("table",{className:a().lecturesBlockTable,children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:"Title"}),(0,l.jsx)("th",{children:"Posted"})]})}),(0,l.jsx)("tbody",{children:o.map(e=>(0,l.jsx)(u,{rkey:e.key,title:e.title,url:e.url,posted:e.posted,video:e.video},e.key))})]})]})},h=o(13507);function p(){return(0,l.jsx)("footer",{children:(0,l.jsx)("table",{children:(0,l.jsx)("tbody",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{className:"logoImage",children:(0,l.jsx)(h.default,{src:"/course-page-matrix/{logo}",alt:"NTNU Logo",className:"logoImage",width:"75",height:"75"})}),(0,l.jsx)("td",{children:"Educational Robotics Center, Dept. of Electrical Engineering, National Taiwan Normal University (NTNU), 10610 Taiwan"})]})})})})}var _=o(95923);async function f(e,t,o,l){let n=e.getRoom(t);if(console.log("getMessages roomId ".concat(t," room ").concat(n)),null==n){console.log("Room ".concat(t," does not exist"));return}let c=new _.TimelineWindow(e,n.getUnfilteredTimelineSet());c.load(void 0,20).then(()=>{console.log("timelineWindow.load resolved"),c.paginate(_.EventTimeline.BACKWARDS,8).then(e=>{if(console.log("timelineWindow.paginate resolved ".concat(e)),e){let e=c.getEvents();console.log("getMessages timelineWindow getEvents => ".concat(JSON.stringify(e)));let o=1;for(let n of e){let e=n.getContent();if(e.msgtype==_.MsgType.Text||e.msgtype==_.MsgType.Notice){var t;console.log("".concat(o," retrived message from ").concat(null===(t=n.sender)||void 0===t?void 0:t.userId,":").concat(e.body)),o+=1,l&&(console.log("calling handler: ".concat(l)),l(n))}}c.unpaginate(8,!1)}})})}async function y(e,t){arguments.length>2&&void 0!==arguments[2]&&arguments[2],await e.startClient({}),console.log("startClient resolved"),e.roomInitialSync(t,1e3).then(e=>{var t;console.log("roomInitialSync ".concat(JSON.stringify(e)));let o=null===(t=e.messages)||void 0===t?void 0:t.chunk,l=1;for(let e of o)"m.text"==e.content.msgtype&&(console.log("".concat(l," message ").concat(JSON.stringify(e))),l+=1)})}function x(){console.log("Home.useEffect");let[e,t]=(0,r.useState)([]);return(0,r.useEffect)(()=>{let e;let o=(e=null,{connect(){null===e?e=_.createClient({baseUrl:"https://www.matrix.org",userId:"@ntnu-erc-reader-1a:matrix.org",accessToken:"syt_bnRudS1lcmMtcmVhZGVyLTFh_ExUCCTTEfPrGsfBTfmBa_2GXjQy"}):console.log("Warning: client already connected")},async sync(t,o){null!==e?await y(e,t,o):console.log("Warning: sync client is null")},async getMessages(t,o){let l=[];return null!==e?f(e,t,l,o):console.log("Warning: getMessages client is null"),l},async disconnect(){null!==e?(console.log("Disconnecting client"),e=null):console.log("Client already disconnected")},once(t,o){null!==e?e.once(t,o):console.log("matrix_client once. client is null")}}),l="!jaUuTGEmyDnPdRrzwz:matrix.org";return o.connect(),o.sync(l,1e3),o.once(_.ClientEvent.Sync,e=>{console.log("client sync resolved ".concat(e)),e==_.SyncState.Prepared&&o.getMessages(l,e=>{if(console.log("Retrieved event ".concat(JSON.stringify(e))),e.getType()==_.EventType.RoomMessage){let o=e.getContent();o&&(o.msgtype==_.MsgType.Text||o.msgtype==_.MsgType.Notice)&&t(t=>[...t,e])}})}),()=>{o.disconnect()}},[]),(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("main",{className:s().main,children:[(0,l.jsx)("h1",{className:s().title,children:"Complex Motion Planning"}),(0,l.jsx)("ul",{children:e.map(e=>{var t,o;return(0,l.jsxs)("li",{children:[null===(t=e.sender)||void 0===t?void 0:t.name,":",null===(o=e.getContent())||void 0===o?void 0:o.body]},e.getId())})}),(0,l.jsx)(m,{messages:e}),(0,l.jsx)("h2",{className:s().h2,children:"Assignments"}),(0,l.jsx)("p",{children:"Assignments should be done individually."}),(0,l.jsx)("div",{className:s().assignment,children:(0,l.jsx)("ul",{children:(0,l.jsx)("li",{children:(0,l.jsx)(n.default,{className:"styles.alink",href:"assignments/rock-climbing-robots",children:"Rock Climbing Robot"})})})}),(0,l.jsx)(p,{})]})})}},5657:function(e){e.exports={main:"page_main__GlU4n",description:"page_description__86bsR",code:"page_code__9lUUd",grid:"page_grid__f5Kdy",card:"page_card__QV0Om",center:"page_center__5oHG7",logo:"page_logo__7fc9l",logoImage:"page_logoImage__eK2JD",content:"page_content__kDoxQ",vercelLogo:"page_vercelLogo__rOY_u",rotate:"page_rotate__durgN"}},44858:function(e){e.exports={lectureRow:"lecture_entry_row_lectureRow__HG2L1",lectureTitle:"lecture_entry_row_lectureTitle__l4g_A",lecturePosted:"lecture_entry_row_lecturePosted__tgdaH"}},79705:function(e){e.exports={lecturesBlockTable:"lectures_block_lecturesBlockTable__ISQh3"}}},function(e){e.O(0,[197,53,764,362,714,914,21,512,184,744],function(){return e(e.s=49897)}),_N_E=e.O()}]);