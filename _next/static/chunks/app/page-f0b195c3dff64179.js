(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{91054:function(){},49897:function(e,t,l){Promise.resolve().then(l.bind(l,9798))},9798:function(e,t,l){"use strict";l.r(t),l.d(t,{default:function(){return A}});var o=l(19506),n=l(5657),s=l.n(n),c=l(22971),a=l(79705),r=l.n(a),i=l(44858),g=l.n(i),d=e=>{let{rkey:t,title:l,url:n,posted:s,video:c}=e,a="";if(c){console.log("Adding video embed ".concat(c));let e=RegExp("https?://www.(youtube.com)|(youtu.be)/(?<vid>[^/]+)$"),t=c.match(e);t&&t.groups&&(c="https://www.youtube.com/embed/"+t.groups.vid),a='<br><iframe width="400" height="230" src="'.concat(c,'" title="').concat(l,'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>')}return(console.log("lectureentryrow ".concat(l," ").concat(n," ").concat(c," ").concat(s," ").concat(a)),c)?(0,o.jsxs)("tr",{className:g().lectureRow,children:[(0,o.jsxs)("td",{className:g().lectureTitle,children:[(0,o.jsx)("a",{href:n,children:l}),(0,o.jsx)("iframe",{width:"320",height:"240",src:c,title:l,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0})]}),(0,o.jsx)("td",{className:g().lecturePosted,children:s})]},t):(0,o.jsxs)("tr",{className:g().lectureRow,children:[(0,o.jsx)("td",{className:g().lectureTitle,children:(0,o.jsx)("a",{href:n,children:l})}),(0,o.jsx)("td",{className:g().lecturePosted,children:s})]},t)},u=e=>{let{messages:t}=e,l=[],n=RegExp(" *Slides *: *(?<title>.*) - (?<url>.*)"),s=RegExp(" *Lecture *: *(?<title>.*) - (?<url>.*)");if(console.log("lecturesBlock messages ".concat(t)),t)for(let e of t){let t=e.getContent().body,o=t.match(n);if(console.log("Checking ".concat(t," for slides return match ").concat(o)),o){let t=o.groups.title,n=o.groups.url,s=new Date(e.localTimestamp).toLocaleDateString();console.log("lecture title=".concat(t," url=").concat(n," posted=").concat(s)),l.push({key:e.getId(),title:t,url:n,posted:s})}let c=t.match(s);if(console.log("Checking ".concat(t," for lecture return match ").concat(c)),c){let t=c.groups.title,o=c.groups.url,n=new Date(e.localTimestamp).toLocaleDateString(),s=c.groups.url;console.log("lecture title=".concat(t," url=").concat(o," posted=").concat(n," video=").concat(s)),l.push({key:e.getId(),title:t,url:o,posted:n,video:s})}}return(0,o.jsxs)("div",{className:r().lecturesBlock,children:[(0,o.jsx)("h2",{className:r().lecturesBlockH2,children:"Lectures"}),(0,o.jsxs)("p",{children:["Link to ",(0,o.jsx)("a",{href:"https://colab.research.google.com/",children:"Google collaboratory"})," notebooks used in the course."]}),(0,o.jsxs)("table",{className:r().lecturesBlockTable,children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:"Title"}),(0,o.jsx)("th",{children:"Posted"})]})}),(0,o.jsx)("tbody",{children:l.map(e=>(0,o.jsx)(d,{rkey:e.key,title:e.title,url:e.url,posted:e.posted,video:e.video},e.key))})]})]})},m=l(47232),h=l.n(m),p=e=>{let{messages:t,max_messages:l}=e,n=[];if(console.log("chatBlock messages ".concat(t)),t){let e=l<t.length?l:t.length;for(let l=0;l<e;l++){let e=t[l],o=e.getContent().body;n.push({key:"chat_"+e.getId(),sender:e.sender.name,text:o})}}return(0,o.jsxs)("div",{className:h().chatBlock,children:[(0,o.jsx)("h2",{className:h().chatBlockH2,children:"Chat History"}),(0,o.jsx)("p",{children:"Join the matrix channel for access to the lecture material"}),(0,o.jsxs)("table",{className:h().chatBlockTable,children:[(0,o.jsx)("thead",{children:(0,o.jsx)("tr",{children:(0,o.jsx)("th",{children:"Message"})})}),(0,o.jsx)("tbody",{children:n.map(e=>(0,o.jsx)("tr",{children:(0,o.jsxs)("td",{children:[(0,o.jsx)("span",{className:h().chatMsgSender,children:e.sender}),":",e.text]})},e.key))})]})]})},_=l(19548),f=l.n(_),x=l(95923),y=e=>{let{messages:t}=e,l=[],n=RegExp(" *[aA]ssignment *: *(.*) - *[dD]ue  *[dD]ate *: *(.*)$");if(console.log("assignmentBlock messages ".concat(t)),t){let e="";for(let o of t){let t=o.getContent(),s=t.body;if(t.msgtype==x.MsgType.Text||t.msgtype==x.MsgType.Notice){let t=s.match(n);if(console.log("AssignmentBlock: Checking ".concat(s," for assignment return match ").concat(t)),t){let n=t[1],s=t[2],c=new Date(o.localTimestamp).toLocaleDateString();console.log("assignment title=".concat(n," posted=").concat(c," url:").concat(e)),l.push({key:o.getId(),title:n,due:s,posted:c,url:e}),e=""}}else t.msgtype==x.MsgType.File&&(e=t.url,console.log("AssignmentBox: mimetype ".concat(t.info.mimetype," name ").concat(t.body," http url ").concat(t.urll)))}}return(0,o.jsxs)("div",{className:f().assignmentsBlock,children:[(0,o.jsx)("h2",{className:f().assignmentsH2,children:"Assignments"}),(0,o.jsx)("div",{className:f().assignmentsBlockTable,children:(0,o.jsxs)("table",{className:f().assignmentsBlockTable,children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{className:f().assignmentsBlockTh,children:"Title"}),(0,o.jsx)("th",{className:f().assignmentsBlockTh,children:"Due Date"})]})}),(0,o.jsx)("tbody",{children:l.map(e=>(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{className:f().assignmentsBlockTd,children:(0,o.jsx)("a",{href:e.url,children:e.title})}),(0,o.jsx)("td",{className:f().assignmentsBlockTdDue,children:e.due})]},1))})]})})]})},b=l(21843),j=l.n(b),k=e=>{let{rooms:t,setSelectedCourse:l}=e,[n,s]=(0,c.useState)(""),a=[];for(let e of(a.push("Select Course ..."),t))e.name.length>11&&(console.log("cn ".concat(e.name.substring(e.name.length-11)))," - Lectures"==e.name.substring(e.name.length-11)&&(console.log("Adding course name ".concat(e.name)),a.push(e.name)));return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("select",{className:j().courseSelectorSelect,value:"Select Course ...",onChange:e=>{s(e.target.value);let o=null;for(let l of t)if(l.name==e.target.value&&0>l.name.indexOf("Examination")){o=l;break}l(o)},children:a.map(e=>{let t=e;return" - Lectures"==e.substring(e.length-11)&&(t=e.substring(0,e.length-11)),(0,o.jsx)("option",{value:e,children:t},e)})})})},T=l(13507),N={src:"/course-page-matrix/_next/static/media/ntnu logo 1.177f1bdd.png",height:612,width:643,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAzklEQVR42mOAAvG0oo4VM+atej5h+tK7+p651QxIQLhn8qKbfVMX/8+r6Plf2zrtP4jd1jd3OgMITJuzcnZd2/T/9e0zfgJN+AfEf/Mre//2Tln0v7l7tjNDdcvUu0DG/+lzV/1bvGLzfxDumbzwT2vv3P9AazuBCqbdgShY+Q+o6P+cReugCub8Ty8GKgBaMRNo/H+gNT9nL1wLtGI13Iqm7tmODEAgCNRxHeSw3HKgI4HuAbGBVkxlQAKiqYXtS4EOfAL05i0tt5wKmAQASrKEJV7Ba8gAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8};function w(){return(0,o.jsx)("footer",{children:(0,o.jsx)("table",{children:(0,o.jsx)("tbody",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{className:"logoImage",children:(0,o.jsx)(T.default,{src:N,alt:"NTNU Logo",className:"logoImage",width:"75"})}),(0,o.jsx)("td",{children:"Educational Robotics Center, Dept. of Electrical Engineering, National Taiwan Normal University (NTNU), 10610 Taiwan"})]})})})})}async function v(e,t,l,o){let n=e.getRoom(t);if(console.log("getMessages roomId ".concat(t," room ").concat(n)),null==n){console.log("Room ".concat(t," does not exist"));return}let s=new x.TimelineWindow(e,n.getUnfilteredTimelineSet());s.load(void 0,20).then(()=>{console.log("timelineWindow.load resolved"),s.paginate(x.EventTimeline.BACKWARDS,8).then(e=>{if(console.log("timelineWindow.paginate resolved ".concat(e)),e){let e=s.getEvents();console.log("getMessages timelineWindow getEvents => ".concat(JSON.stringify(e)));let l=1;for(let n of e){let e=n.getContent();if(e.msgtype==x.MsgType.Text||e.msgtype==x.MsgType.Notice){var t;console.log("".concat(l," retrived message from ").concat(null===(t=n.sender)||void 0===t?void 0:t.userId,":").concat(e.body)),l+=1,o&&(console.log("calling handler: ".concat(o)),o(n))}else e.msgtype==x.MsgType.File&&o&&o(n)}s.unpaginate(8,!1)}})})}async function B(e,t){arguments.length>2&&void 0!==arguments[2]&&arguments[2],await e.startClient({}),console.log("startClient resolved"),e.roomInitialSync(t,1e3).then(e=>{var t;console.log("roomInitialSync ".concat(JSON.stringify(e)));let l=null===(t=e.messages)||void 0===t?void 0:t.chunk,o=1;for(let e of l)"m.text"==e.content.msgtype&&(console.log("".concat(o," message ").concat(JSON.stringify(e))),o+=1)})}function A(){console.log("Home.useEffect");let[e,t]=(0,c.useState)(),[l,n]=(0,c.useState)([]),[a,r]=(0,c.useState)([]),[i,g]=(0,c.useState)(null);return(0,c.useEffect)(()=>{let e;let l=(e=null,{connect(){null==e?e=x.createClient({baseUrl:"https://www.matrix.org",userId:"@ntnu-erc-reader-1a:matrix.org",accessToken:"syt_bnRudS1lcmMtcmVhZGVyLTFh_ExUCCTTEfPrGsfBTfmBa_2GXjQy"}):console.log("Warning: client already connected")},async sync(t,l){null!=e?(typeof t==typeof x.Room&&(t=t.roomId),await B(e,t,l)):console.log("Warning: sync client is null")},async getMessages(t,l){let o=[];return null!=e?v(e,t,o,l):console.log("Warning: getMessages client is null"),o},async disconnect(){null!=e?(console.log("Disconnecting client"),e=null):console.log("Client already disconnected")},once(t,l){null!=e?e.once(t,l):console.log("matrix_client once. client is null")},mxcUrlToHttp(t){let l=t;return null!=e&&(l=e.mxcUrlToHttp(t)),l},async getJoinedRooms(){let t=[];if(null!=e)for(let l of(await e.getJoinedRooms()).joined_rooms)t.push(l);return t},getRoom(t){let l=null;return null!=e&&(l=e.getRoom(t)),l}});return t(l),l.connect(),l.getJoinedRooms().then(e=>{for(let t of(console.log("Resolved getJoinedRooms ".concat(JSON.stringify(e))),e))console.log("Retrieved room ".concat(JSON.stringify(t))),l.sync(t,1e3),l.once(x.ClientEvent.Sync,e=>{console.log("client sync resolved ".concat(e));let o=l.getRoom(t);null!=o&&r(e=>[...e,o])})}),()=>{l.disconnect()}},[]),(0,c.useEffect)(()=>{e&&i&&(n([]),e.getMessages(i.roomId,t=>{if(console.log("Retrieved event ".concat(JSON.stringify(t))),t.getType()==x.EventType.RoomMessage){let l=t.getContent();if(l&&(l.msgtype==x.MsgType.Text||l.msgtype==x.MsgType.Notice||l.msgtype==x.MsgType.File)){if(l.msgtype==x.MsgType.File){let t=e.mxcUrlToHttp(l.url);null!==t&&(l.url=t)}n(e=>[...e,t])}}}))},[e,i]),(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("main",{className:s().main,children:[(0,o.jsx)("h1",{className:s().title,children:"NTNU ERC Course Information"}),(0,o.jsx)(k,{rooms:a,setSelectedCourse:g}),(0,o.jsx)(p,{messages:l,max_messages:5}),(0,o.jsx)(u,{messages:l}),(0,o.jsx)(y,{messages:l}),(0,o.jsx)(w,{})]})})}},5657:function(e){e.exports={main:"page_main__GlU4n",description:"page_description__86bsR",code:"page_code__9lUUd",grid:"page_grid__f5Kdy",card:"page_card__QV0Om",center:"page_center__5oHG7",logo:"page_logo__7fc9l",logoImage:"page_logoImage__eK2JD",content:"page_content__kDoxQ",vercelLogo:"page_vercelLogo__rOY_u",rotate:"page_rotate__durgN"}},19548:function(e){e.exports={assignmentsBlockTable:"assignments_block_assignmentsBlockTable__7RZo4",assignmentsBlockH2:"assignments_block_assignmentsBlockH2__wl_Ev",assignmentsBlockTh:"assignments_block_assignmentsBlockTh___yE54",assignmentsBlockTd:"assignments_block_assignmentsBlockTd__anRt0",assignmentsBlockTdDue:"assignments_block_assignmentsBlockTdDue__KylPS"}},47232:function(e){e.exports={chatBlockTable:"chat_block_chatBlockTable__nuD3t",chatBlockH2:"chat_block_chatBlockH2__zhmg3",chatMsgSender:"chat_block_chatMsgSender__N0oRS"}},21843:function(e){e.exports={courseSelectorSelect:"course_selector_courseSelectorSelect__5q43T"}},44858:function(e){e.exports={lectureRow:"lecture_entry_row_lectureRow__HG2L1",lectureTitle:"lecture_entry_row_lectureTitle__l4g_A",lecturePosted:"lecture_entry_row_lecturePosted__tgdaH"}},79705:function(e){e.exports={lecturesBlockTable:"lectures_block_lecturesBlockTable__ISQh3",lecturesBlockH2:"lectures_block_lecturesBlockH2__3Pt0e"}}},function(e){e.O(0,[197,53,764,362,714,100,512,184,744],function(){return e(e.s=49897)}),_N_E=e.O()}]);