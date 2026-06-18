const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Listenlist-CybsT9QX.js","./antd-vendor-DA4fyLID.js","./rolldown-runtime-bYkK8ddJ.js","./react-vendor-Baezdnvl.js","./icons-vendor-D7zOg6_o.js","./Home-DIJVDQOS.js","./OperatingBarOfSongList-BE-6xUNd.js","./SongItemWithCover-DwTnG5Lv.js","../css/SongItemWithCover-M7Tj_JEU.css","./DataLoadingGuard-BqtvaMyZ.js","./dataService-BqmViCu6.js","./Search-MMNfvoaV.js","./Playlists-Bawc-TIV.js","./PlaylistView-DR39qwh_.js","./NewSongs-Cm-vw1k6.js","./Artists-B4aqGgel.js","./ArtistView-D8kX5oVm.js","./MVPage-B9ETCrCc.js","./Favorites-CoRzU2YG.js"])))=>i.map(i=>d[i]);
import{i as e}from"./rolldown-runtime-bYkK8ddJ.js";import{C as t,S as n,_ as r,a as i,b as a,d as o,f as s,g as c,l,m as u,o as d,p as f,r as p,s as m,t as h,u as g,v as _,w as v,x as y,y as ee}from"./antd-vendor-DA4fyLID.js";import{a as te,c as ne,i as b,l as x,n as S,o as C,r as w,s as T,t as E}from"./react-vendor-Baezdnvl.js";import{C as D,D as O,E as k,M as re,O as ie,P as ae,S as oe,T as se,_ as ce,d as le,f as ue,g as de,i as fe,j as A,k as j,l as pe,n as M,o as N,p as me,r as P,t as F,v as I,w as he,x as L}from"./icons-vendor-D7zOg6_o.js";import{d as ge,i as _e,l as ve,r as ye,t as be,u as R}from"./dataService-BqmViCu6.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var z=e(v()),xe=t(),B=`https://api.injahow.cn/meting/`;function V(e){return H.apply(this,arguments)}function H(){return H=_(function*(e){try{let t=`${B}?${new URLSearchParams({server:`tencent`,type:`song`,pageSize:`20`}).toString()}&keyword=${encodeURIComponent(e)}`,n=yield fetch(t);if(!n.ok)throw Error(`HTTP ${n.status}`);let r=yield n.json();return!Array.isArray(r)||r.length===0?[]:r.map(e=>({newId:`qq_${e.id||e.songid}`,name:e.title||e.name||``,alias:``,artists:[{name:e.author||e.artist||``,id:0}],album:{name:``,cover:``},source:e.url||``,cover:e.pic||e.cover||``,provider:`qq`}))}catch(e){return[]}}),H.apply(this,arguments)}var U=E(),W=(0,z.createContext)(),G=()=>{let e=(0,z.useContext)(W);if(!e)throw Error(`useSearch must be used within a SearchProvider`);return e},Se=()=>{let{searchStatus:e}=G();return{searchStatus:e}},Ce=()=>{let{searchKeyword:e,updateSearchKeyword:t}=G();return{searchKeyword:e,updateSearchKeyword:t}},we=()=>{let{searchResults:e}=G();return{searchResults:e}},Te=({children:e})=>{let[t,n]=(0,z.useState)(``),[r,i]=(0,z.useState)(`not_searched_yet`),[a,o]=(0,z.useState)({}),[s,c]=(0,z.useState)([]),l=(0,z.useRef)(``),u=(0,z.useRef)(!1);(0,z.useEffect)(()=>{u.current||(u.current=!0,ve().then(e=>c(e)).catch(()=>{}))},[]),(0,z.useEffect)(()=>{t&&t!==l.current&&(l.current=t,d(t))},[t]);let d=function(){var e=_(function*(e){var t,n,r;o({}),i(`searching`);let a={},c=encodeURIComponent(e),[l,u,d,f,p]=yield Promise.allSettled([ye(`/api/ss?keyword=${c}`),ye(`/api/s/m/${c}`),ye(`/api/s/k/${c}`),ge(e),V(e)]);if(l.status===`fulfilled`&&(t=l.value)!=null&&t.success&&Array.isArray(l.value.data)&&l.value.data.length>0&&(a.aggregated={searchSuccess:!0,data:{songs:l.value.data,totalCount:l.value.data.length}}),u.status===`fulfilled`&&(n=u.value)!=null&&n.success&&Array.isArray(u.value.songs)&&u.value.songs.length>0&&(a.migu={searchSuccess:!0,data:{songs:u.value.songs,totalCount:u.value.songs.length}}),d.status===`fulfilled`&&(r=d.value)!=null&&r.success&&Array.isArray(d.value.songs)&&d.value.songs.length>0&&(a.kugou={searchSuccess:!0,data:{songs:d.value.songs,totalCount:d.value.songs.length}}),f.status===`fulfilled`&&Array.isArray(f.value)&&f.value.length>0&&(a.netease={searchSuccess:!0,data:{songs:f.value,totalCount:f.value.length}}),p.status===`fulfilled`&&Array.isArray(p.value)&&p.value.length>0&&(a.qq={searchSuccess:!0,data:{songs:p.value,totalCount:p.value.length}}),s.length>0){let t=be(s,e);if(t.length>0){let e=new Set;for(let t of Object.keys(a)){var m;!((m=a[t])==null||(m=m.data)==null)&&m.songs&&a[t].data.songs.forEach(t=>{t.newId&&e.add(t.newId)})}let n=t.filter(t=>!e.has(t.newId));n.length>0&&(a.local={searchSuccess:!0,data:{songs:n,totalCount:n.length}})}}Object.keys(a).length===0&&(a.local={searchSuccess:!1,data:{songs:[],totalCount:0}}),o(a),i(`done`)});return function(t){return e.apply(this,arguments)}}();return(0,U.jsx)(W.Provider,{value:{searchKeyword:t,searchStatus:r,searchResults:a,updateSearchKeyword:n,clearResults:()=>{o({}),i(`not_searched_yet`)}},children:e})},{Search:Ee}=g;function De(){let e=T(),{keyword:t}=ne(),{searchKeyword:n,updateSearchKeyword:r}=Ce(),[i,a]=(0,z.useState)(``);return(0,z.useEffect)(()=>{t&&a(decodeURIComponent(t))},[t]),(0,U.jsx)(Ee,{value:i,onChange:e=>a(e.target.value),onSearch:t=>{t=t.trim(),t!==``&&(r(t),e(`/search/${encodeURIComponent(t)}`))},enterButton:!0,placeholder:`搜索歌曲、歌手...`,allowClear:!0,style:{width:`100%`}})}var Oe=[{key:`/`,label:`首页`},{key:`/new-songs`,label:`新歌`},{key:`/artists`,label:`艺人`},{key:`/mv`,label:`MV`},{key:`/playlists`,label:`歌单`},{key:`/favorites`,label:`收藏`}];function ke(){let e=C(),t=T(),n=e.pathname===`/`?`/`:`/${e.pathname.split(`/`)[1]}`;return(0,U.jsxs)(`header`,{style:{position:`fixed`,width:`100%`,zIndex:1040,top:0,background:`rgba(18, 18, 18, 0.9)`,backdropFilter:`blur(20px)`,WebkitBackdropFilter:`blur(20px)`,borderBottom:`1px solid rgba(255, 255, 255, 0.06)`},children:[(0,U.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:20,padding:`8px 24px`},children:[(0,U.jsxs)(w,{to:`/`,style:{flex:`0 0 auto`,textDecoration:`none`,display:`flex`,alignItems:`center`,gap:10},children:[(0,U.jsx)(`div`,{style:{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg, #FF6B35, #FFA500, #FFD700)`,display:`flex`,alignItems:`center`,justifyContent:`center`,boxShadow:`0 2px 12px rgba(255, 107, 53, 0.3)`},children:(0,U.jsx)(L,{size:19,color:`#fff`})}),(0,U.jsx)(`h1`,{style:{margin:0,fontSize:20,fontWeight:700,background:`linear-gradient(135deg, #FFA500, #FF6B35)`,WebkitBackgroundClip:`text`,WebkitTextFillColor:`transparent`,letterSpacing:`-0.5px`},children:`EchoBeats`})]}),(0,U.jsx)(`div`,{style:{flex:1,maxWidth:500},children:(0,U.jsx)(De,{})})]}),(0,U.jsx)(`div`,{style:{display:`flex`,gap:4,padding:`0 24px 4px`},children:Oe.map(e=>{let r=n===e.key;return(0,U.jsx)(`button`,{onClick:()=>t(e.key),style:{padding:`8px 18px`,fontSize:14,fontWeight:r?600:400,color:r?`#FFA500`:`#8c8c8c`,background:r?`rgba(255,165,0,0.1)`:`transparent`,border:`none`,borderRadius:8,cursor:`pointer`,transition:`all 0.2s`},onMouseEnter:e=>{r||(e.currentTarget.style.color=`#d9d9d9`,e.currentTarget.style.background=`rgba(255,255,255,0.05)`)},onMouseLeave:e=>{r||(e.currentTarget.style.color=`#8c8c8c`,e.currentTarget.style.background=`transparent`)},children:e.label},e.key)})})]})}function Ae(){let[e,t]=d.useMessage();return[(0,z.useCallback)((t,n,r)=>{e[t]({content:n,style:{position:`fixed`,left:r.clientX,top:r.clientY}})},[e]),t]}var je=e=>{let t,n=new Set,r=(e,r)=>{let i=typeof e==`function`?e(t):e;if(!Object.is(i,t)){let e=t;t=(r==null?typeof i!=`object`||!i:r)?i:Object.assign({},t,i),n.forEach(n=>n(t,e))}},i=()=>t,a={setState:r,getState:i,getInitialState:()=>o,subscribe:e=>(n.add(e),()=>n.delete(e))},o=t=e(r,i,a);return a},Me=(e=>e?je(e):je),Ne=e=>e;function Pe(e,t=Ne){let n=z.useSyncExternalStore(e.subscribe,z.useCallback(()=>t(e.getState()),[e,t]),z.useCallback(()=>t(e.getInitialState()),[e,t]));return z.useDebugValue(n),n}var Fe=e=>{let t=Me(e),n=e=>Pe(t,e);return Object.assign(n,t),n},K=(e=>e?Fe(e):Fe),Ie=K(e=>({isListenlistOpen:!1,setIsListenlistOpen:t=>e({isListenlistOpen:t})})),Le=`listenlist`;function Re(){try{let e=localStorage.getItem(Le);return e?JSON.parse(e):[]}catch(e){return[]}}function q(e){localStorage.setItem(Le,JSON.stringify(e))}var J=K((e,t)=>({listenlist:Re(),setListenlist:t=>{q(t),e({listenlist:t})},addSongToListenlist:n=>{let r=[...t().listenlist,n];q(r),e({listenlist:r})},addListToListenlist:n=>{let r=t().listenlist,i=n.filter(e=>r.every(t=>t.newId!==e.newId)),a=r.concat(i);q(a),e({listenlist:a})},clearListenlist:()=>{q([]),e({listenlist:[]})}})),ze=`playMode`;function Be(){try{return localStorage.getItem(ze)||`order`}catch(e){return`order`}}function Ve(e){localStorage.setItem(ze,e)}var Y=K(e=>({playMode:Be(),setPlayMode:t=>{Ve(t),e({playMode:t})}}));function X(){return Y.getState().playMode}var He=`songInPlayer`;function Ue(){try{let e=localStorage.getItem(He);return e?JSON.parse(e):null}catch(e){return null}}function We(e){localStorage.setItem(He,JSON.stringify(e))}var Z=K(e=>({songInPlayer:Ue(),setSongInPlayer:t=>{We(t),e({songInPlayer:t})}})),Ge=K(e=>({currentTime:0,setCurrentTime:t=>e({currentTime:t})})),Ke=K(e=>({isOpen:!1,isFloatingOpen:!1,song:null,lyrics:``,isLoading:!1,open:t=>e({isOpen:!0,song:t,lyrics:``,isLoading:!0}),close:()=>e({isOpen:!1,song:null,lyrics:``,isLoading:!1}),setLyrics:t=>e({lyrics:t,isLoading:!1}),toggleFloating:()=>e(e=>({isFloatingOpen:!e.isFloatingOpen})),openFloating:t=>e({isFloatingOpen:!0,song:t,lyrics:``,isLoading:!0}),closeFloating:()=>e({isFloatingOpen:!1})}));function qe(e){return e<10?`0${e}`:`${e}`}function Je(e){let t=Math.floor(e),n=Math.floor(t/60),r=t%60;return`${qe(n)}:${qe(r)}`}var Ye=`favorites`;function Xe(){try{let e=localStorage.getItem(Ye);return e?JSON.parse(e):[]}catch(e){return[]}}function Ze(e){localStorage.setItem(Ye,JSON.stringify(e))}var Q=K((e,t)=>({favorites:Xe(),isFavorite:e=>t().favorites.some(t=>t.newId===e),toggleFavorite:n=>{let r=t().favorites,i=r.findIndex(e=>e.newId===n.newId),a;return a=i>=0?[...r.slice(0,i),...r.slice(i+1)]:[n,...r],Ze(a),e({favorites:a}),i<0},removeFavorite:n=>{let r=t().favorites.filter(e=>e.newId!==n);Ze(r),e({favorites:r})}}));function Qe({song:e}){let[t,n]=Ae(),r=Q(e=>e.favorites),i=Q(e=>e.toggleFavorite);if(!(e!=null&&e.newId))return(0,U.jsx)(j,{className:`icon`,style:{opacity:.3}});let a=r.some(t=>t.newId===e.newId),o=n=>{i(e)?t(`success`,`已收藏`,n):t(`info`,`已取消收藏`,n)};return(0,U.jsxs)(U.Fragment,{children:[n,a?(0,U.jsx)(j,{className:`icon`,onClick:o,style:{color:`rgb(254, 44, 85)`,fill:`rgb(254, 44, 85)`}}):(0,U.jsx)(j,{className:`icon`,onClick:o})]})}n();var $e=[`children`,`className`];function et(e){let{children:t,className:n}=e,r=a(e,$e);return(0,U.jsx)(`span`,y(y({className:`cursor-pointer ${n||``}`},r),{},{children:(0,U.jsx)(`svg`,{viewBox:`64 64 896 896`,focusable:`false`,width:`1em`,height:`1em`,fill:`currentColor`,"aria-hidden":`true`,children:t})}))}n();var tt=[`className`];function nt(e){let{className:t}=e,n=a(e,tt);return(0,U.jsx)(et,y(y({className:t},n),{},{children:(0,U.jsx)(`path`,{d:`M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-80 600c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304zm224 0c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304z`})}))}n();var rt=[`className`];function it(e){let{className:t}=e,n=a(e,rt);return(0,U.jsx)(et,y(y({className:t},n),{},{children:(0,U.jsx)(`path`,{d:`M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm144.1 454.9L437.7 677.8a8.02 8.02 0 01-12.7-6.5V353.7a8 8 0 0112.7-6.5L656.1 506a7.9 7.9 0 010 12.9z`})}))}function at({artistName:e}){return(0,U.jsx)(w,{to:`/artist/${encodeURIComponent(e)}`,style:{color:`#bfbfbf`,fontSize:12,transition:`color 0.2s`},onMouseEnter:e=>e.target.style.color=`#FFA500`,onMouseLeave:e=>e.target.style.color=`#bfbfbf`,children:e})}var ot=`#FF6B6B.#FF4E50.#EB5757.#D41872.#FF0844.#FF1493.#FF00FF.#FF69B4.#FF6B9D.#FA709A.#FF9A9E.#FFB199.#FBC2EB.#FECFEF.#FAD0C4.#FF6EC7.#FFA07A.#F2994A.#FC913A.#F9D423.#F2C94C.#FEE140.#EDE574.#E1F5C4.#56AB2F.#A8E063.#38EF7D.#11998E.#C6EA8D.#92FE9D.#00FF87.#05FFA1.#69F0AE.#A8E6CF.#3EECAC.#4ECDC4.#98D8C8.#00C9FF.#30CFD0.#00F2FE.#00FFFF.#00CED1.#60EFFF.#0ED2F7.#B2FEFA.#45B7D1.#4FACFE.#667EEA.#764BA2.#A445B2.#F093FB.#330867.#A18CD1.#B967FF`.split(`.`);function st(e){if(!e)return 0;let t=0;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t=(t<<5)-t+r,t&=t}return Math.abs(t)}function $(e=``){return ot[st(e)%ot.length]}n();function ct(e,t){if(!t||!e)return e;let n=t.trim();if(!n)return e;let r=RegExp(`(${n.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)})`,`gi`);return e.split(r).map((e,t)=>r.test(e)?(0,U.jsx)(`mark`,{style:{color:`#FFA500`,background:`rgba(255,165,0,0.15)`,borderRadius:2,padding:`0 1px`},children:e},t):e)}function lt({song:e,highlight:t}){var n;let r=Ke(e=>e.open),i=e.cover?{backgroundImage:`url(${e.cover})`,backgroundSize:`cover`,backgroundPosition:`center`}:{backgroundColor:$(e.newId)},a=()=>{e!=null&&e.newId&&r(e)};return(0,U.jsxs)(`div`,{className:`flex items-center gap-2.5 min-w-0`,children:[(0,U.jsx)(`div`,{className:`w-[42px] h-[42px] rounded-lg flex-shrink-0`,style:y(y({},i),{},{boxShadow:`0 2px 8px rgba(0,0,0,0.3)`,cursor:`pointer`}),onClick:a,title:`查看歌词`}),(0,U.jsxs)(`div`,{className:`flex-1 min-w-0`,children:[(0,U.jsxs)(`div`,{className:`truncate`,style:{fontSize:14,fontWeight:500,lineHeight:1.3,cursor:`pointer`},onClick:a,title:`查看歌词`,children:[t?ct(e.name,t):e.name,e.alias&&(0,U.jsx)(`span`,{style:{fontSize:12,fontStyle:`italic`,marginLeft:6,color:`#8c8c8c`},children:t?ct(e.alias,t):e.alias})]}),(0,U.jsx)(`div`,{className:`flex gap-1.5 items-center`,style:{fontSize:12,lineHeight:1.3,marginTop:1},children:(n=e.artists)==null?void 0:n.map((n,r)=>(0,U.jsxs)(`span`,{children:[t?(0,U.jsx)(`span`,{style:{color:`#bfbfbf`},children:ct(n.name,t)}):(0,U.jsx)(at,{artistName:n.name}),r<e.artists.length-1&&(0,U.jsx)(`span`,{style:{color:`#595959`,margin:`0 2px`},children:`,`})]},n.id||r))})]})]})}n();function ut(e,t){let n;try{n=e()}catch(e){return}return{getItem:e=>{var r;let i=e=>e===null?null:JSON.parse(e,t==null?void 0:t.reviver),a=(r=n.getItem(e))==null?null:r;return a instanceof Promise?a.then(i):i(a)},setItem:(e,r)=>n.setItem(e,JSON.stringify(r,t==null?void 0:t.replacer)),removeItem:e=>n.removeItem(e)}}var dt=e=>t=>{try{let n=e(t);return n instanceof Promise?n:{then(e){return dt(e)(n)},catch(e){return this}}}catch(e){return{then(e){return this},catch(t){return dt(t)(e)}}}},ft=(e,t)=>(n,r,i)=>{let a=y({storage:ut(()=>window.localStorage),partialize:e=>e,version:0,merge:(e,t)=>y(y({},t),e)},t),o=!1,s=0,c=new Set,l=new Set,u=a.storage;if(!u)return e((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`),n(...e)},r,i);let d=()=>{let e=a.partialize(y({},r()));return u.setItem(a.name,{state:e,version:a.version})},f=i.setState;i.setState=(e,t)=>(f(e,t),d());let p=e((...e)=>(n(...e),d()),r,i);i.getInitialState=()=>p;let m,h=()=>{var e,t;if(!u)return;let i=++s;o=!1,c.forEach(e=>{var t;return e((t=r())==null?p:t)});let f=((t=a.onRehydrateStorage)==null?void 0:t.call(a,(e=r())==null?p:e))||void 0;return dt(u.getItem.bind(u))(a.name).then(e=>{if(e)if(typeof e.version==`number`&&e.version!==a.version){if(a.migrate){let t=a.migrate(e.state,e.version);return t instanceof Promise?t.then(e=>[!0,e]):[!0,t]}console.error(`State loaded from storage couldn't be migrated since no migrate function was provided`)}else return[!1,e.state];return[!1,void 0]}).then(e=>{var t;if(i!==s)return;let[o,c]=e;if(m=a.merge(c,(t=r())==null?p:t),n(m,!0),o)return d()}).then(()=>{i===s&&(f==null||f(r(),void 0),m=r(),o=!0,l.forEach(e=>e(m)))}).catch(e=>{i===s&&(f==null||f(void 0,e))})};return i.persist={setOptions:e=>{a=y(y({},a),e),e.storage&&(u=e.storage)},clearStorage:()=>{u==null||u.removeItem(a.name)},getOptions:()=>a,rehydrate:()=>h(),hasHydrated:()=>o,onHydrate:e=>(c.add(e),()=>{c.delete(e)}),onFinishHydration:e=>(l.add(e),()=>{l.delete(e)})},a.skipHydration||h(),m||p};n();var pt=Date.now(),mt=K(ft((e,t)=>({playlists:[],createPlaylist:n=>{let r={id:String(pt++),name:n,songs:[],createdAt:Date.now()};return e({playlists:[...t().playlists,r]}),r},deletePlaylist:n=>{e({playlists:t().playlists.filter(e=>e.id!==n)})},addSongToPlaylist:(n,r)=>{e({playlists:t().playlists.map(e=>e.id!==n||e.songs.some(e=>e.newId===r.newId)?e:y(y({},e),{},{songs:[...e.songs,r]}))})},removeSongFromPlaylist:(n,r)=>{e({playlists:t().playlists.map(e=>e.id===n?y(y({},e),{},{songs:e.songs.filter(e=>e.newId!==r)}):e)})},renamePlaylist:(n,r)=>{e({playlists:t().playlists.map(e=>e.id===n?y(y({},e),{},{name:r}):e)})}}),{name:`echobeats-playlists`}));function ht({song:e}){let[t,n]=(0,z.useState)(!1),[r,a]=(0,z.useState)(``),{playlists:o,createPlaylist:s,addSongToPlaylist:l}=mt(),u=t=>{e&&(l(t,e),d.success(`已添加到歌单`),n(!1))};return(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(k,{className:`icon`,title:`添加到歌单`,onClick:()=>n(!0)}),(0,U.jsxs)(i,{title:`添加到歌单`,open:t,onCancel:()=>n(!1),footer:null,width:380,children:[(0,U.jsx)(`div`,{style:{marginBottom:16},children:(0,U.jsx)(g.Search,{placeholder:`新建歌单名称`,value:r,onChange:e=>a(e.target.value),onSearch:()=>{let t=r.trim();t&&(l(s(t).id,e),d.success(`已创建歌单「${t}」并添加歌曲`),a(``),n(!1))},enterButton:(0,U.jsx)(c,{type:`primary`,icon:(0,U.jsx)(I,{size:14}),children:`新建`})})}),o.length===0?(0,U.jsx)(`div`,{style:{textAlign:`center`,color:`#8c8c8c`,padding:`24px 0`,fontSize:14},children:`还没有歌单，创建一个吧`}):(0,U.jsx)(m,{dataSource:o,renderItem:e=>(0,U.jsx)(m.Item,{onClick:()=>u(e.id),style:{cursor:`pointer`,padding:`10px 12px`,borderRadius:8,transition:`background 0.15s`},onMouseEnter:e=>{e.currentTarget.style.background=`rgba(255,255,255,0.05)`},onMouseLeave:e=>{e.currentTarget.style.background=`transparent`},children:(0,U.jsxs)(`div`,{children:[(0,U.jsx)(`div`,{style:{fontSize:14,color:`#f0f0f0`},children:e.name}),(0,U.jsxs)(`div`,{style:{fontSize:12,color:`#8c8c8c`,marginTop:2},children:[e.songs.length,` 首歌曲`]})]})})})]})]})}n();function gt(e,t,n,r,i,a){var o;let s=(e==null?void 0:e.cover)||``,c=e?$(e.newId):`#333`,l=((e==null?void 0:e.name)||`未在播放`).replace(/</g,`&lt;`).replace(/'/g,`\\'`),u=((e==null||(o=e.artists)==null?void 0:o.map(e=>e.name).join(`/`))||``).replace(/</g,`&lt;`),d=n?`true`:`false`,f=JSON.stringify(e).replace(/</g,`\\x3c`),p=JSON.stringify(i).replace(/</g,`\\x3c`),m={order:`顺序`,loop:`列表循环`,single:`单曲循环`,shuffle:`随机`}[r]||`顺序`;return`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${l} - EchoBeats</title><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#121212;color:#fff;font:14px -apple-system,sans-serif;overflow:hidden;user-select:none;-webkit-app-region:drag;}
#player,#lyrics,#playlist{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column}
#player{padding:14px 16px 10px}
#lyrics,#playlist{display:none;padding:12px 16px;overflow-y:auto}
#lyrics.show,#playlist.show{display:flex}
#player.hide{display:none}
.top{display:flex;align-items:center;gap:12px;margin-bottom:8px}
.cover{width:56px;height:56px;border-radius:10px;flex-shrink:0;${s?`background:url(${s}) center/cover;`:`background:${c};`}}
.info{flex:1;min-width:0}
.name{font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.artist{font-size:12px;color:#8c8c8c;margin-top:2px}
.time-row{display:flex;align-items:center;gap:10px;margin:6px 0 10px}
.time{font-size:11px;color:#8c8c8c;min-width:35px}
.progress-wrap{flex:1;height:20px;display:flex;align-items:center;cursor:pointer;-webkit-app-region:no-drag}
.progress-wrap input[type=range]{width:100%;accent-color:#FFA500;height:4px;cursor:pointer}
.controls{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:10px}
.controls button{-webkit-app-region:no-drag;width:36px;height:36px;border-radius:50%;border:none;cursor:pointer;
  display:flex;align-items:center;justify-content:center;transition:all 0.15s;font-size:16px}
.btn-main{background:#FFA500;color:#fff;width:44px!important;height:44px!important;font-size:20px!important}
.btn-icon{background:rgba(255,255,255,0.06);color:#bfbfbf}
.btn-icon:hover{background:rgba(255,255,255,0.12);color:#fff}
.btn-on{background:rgba(255,165,0,0.15);color:#FFA500}
.actions{display:flex;justify-content:center;gap:6px;flex-wrap:wrap}
.actions button{-webkit-app-region:no-drag;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);
  border-radius:16px;color:#bfbfbf;cursor:pointer;padding:5px 12px;font-size:11px;transition:all 0.15s;display:flex;align-items:center;gap:4px}
.actions button:hover{color:#fff;background:rgba(255,255,255,0.1)}
.actions button.active{color:#FFA500;background:rgba(255,165,0,0.1);border-color:rgba(255,165,0,0.3)}
.hint{font-size:10px;color:rgba(255,255,255,0.12);text-align:center;margin-top:auto;padding-top:6px}
/* Lyrics */
.lyric-line{font-size:14px;line-height:2.2;color:rgba(255,255,255,0.4);text-align:center;transition:color 0.3s}
.lyric-line.active{color:#FFA500;font-size:16px;font-weight:600}
#lyrics-header,#playlist-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-shrink:0}
#lyrics-header span,#playlist-header span{font-size:12px;color:#8c8c8c}
#lyrics-header button,#playlist-header button{-webkit-app-region:no-drag;background:rgba(255,255,255,0.06);border:none;color:#8c8c8c;cursor:pointer;
  padding:4px 10px;border-radius:14px;font-size:11px}
#lyrics-header button:hover,#playlist-header button:hover{color:#fff}
#lyrics-body,#playlist-body{flex:1;overflow-y:auto}
/* Playlist */
.playlist-item{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:#bfbfbf;-webkit-app-region:no-drag}
.playlist-item:hover{background:rgba(255,255,255,0.06)}
.playlist-item.active{color:#FFA500;background:rgba(255,165,0,0.08)}
.playlist-item .idx{width:24px;text-align:center;font-size:11px;color:rgba(255,255,255,0.3);flex-shrink:0}
.playlist-item.active .idx{color:#FFA500}
.playlist-item .song-info{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
</style></head><body>
<div id="player">
  <div class="top">
    <div class="cover"></div>
    <div class="info">
      <div class="name">${l}</div>
      <div class="artist">${u}</div>
    </div>
    <button class="btn-icon" onclick="closeWin()" style="width:28px;height:28px;-webkit-app-region:no-drag">✕</button>
  </div>
  <div class="time-row">
    <span class="time" id="cur">0:00</span>
    <div class="progress-wrap"><input type="range" id="prog" min="0" max="100" value="0"></div>
    <span class="time" id="dur" style="text-align:right">0:00</span>
  </div>
  <div class="controls">
    <button class="btn-icon" onclick="prev()">⏮</button>
    <button class="btn-main" id="playBtn" onclick="toggle()">▶</button>
    <button class="btn-icon" onclick="next()">⏭</button>
  </div>
  <div class="actions">
    <button id="likeBtn" class="${d===`true`?`active`:``}" onclick="like()">❤ 喜欢</button>
    <button id="downloadBtn" onclick="download()">⏬ 下载</button>
    <button id="modeBtn" onclick="cycleMode()">🔁 ${m}</button>
    <button id="playlistBtn" onclick="showPlaylist()">📋 歌单(${i.length})</button>
    <button id="lyricBtn" onclick="showLyrics()">🎤 歌词</button>
  </div>
  <div class="hint">EchoBeats 桌面播放 · 双击关闭</div>
</div>
<div id="lyrics">
  <div id="lyrics-header">
    <span>🎤 歌词</span>
    <button onclick="hideLyrics()">✕ 关闭歌词</button>
  </div>
  <div id="lyrics-body"><div class="lyric-line">加载中...</div></div>
</div>
<div id="playlist">
  <div id="playlist-header">
    <span>📋 歌单</span>
    <button onclick="hidePlaylist()">✕ 关闭歌单</button>
  </div>
  <div id="playlist-body"></div>
</div>
<audio id="audio" src="${t||``}" autoplay></audio>
<script>
var song = ${f};
var isFav = ${d};
var playMode = '${r}';
var playlist = ${p};
var currentIdx = ${a};
var MODES = ['order', 'loop', 'single', 'shuffle'];
var MODE_LABELS = { order: '顺序', loop: '列表循环', single: '单曲循环', shuffle: '随机' };

var audio = document.getElementById('audio');
var prog = document.getElementById('prog');
var playBtn = document.getElementById('playBtn');
var likeBtn = document.getElementById('likeBtn');
var modeBtn = document.getElementById('modeBtn');
var lyricBtn = document.getElementById('lyricBtn');
var playlistBtn = document.getElementById('playlistBtn');
var lyricsPane = document.getElementById('lyrics');
var playlistPane = document.getElementById('playlist');
var playerPane = document.getElementById('player');
var lyricsBody = document.getElementById('lyrics-body');
var playlistBody = document.getElementById('playlist-body');
var lyricsLines = [];
var currentLyricIdx = -1;
var showLyricsMode = false;
var showPlaylistMode = false;

function fmt(s){var m=Math.floor(s/60),sec=String(Math.floor(s%60)).padStart(2,'0');return m+':'+sec}

audio.ontimeupdate = function(){
  prog.value = audio.duration?(audio.currentTime/audio.duration)*100:0;
  document.getElementById('cur').textContent = fmt(audio.currentTime);
  document.getElementById('dur').textContent = fmt(audio.duration||0);
  updateLyricHighlight();
};
audio.onplay = function(){ playBtn.textContent = '⏸'; };
audio.onpause = function(){ playBtn.textContent = '▶'; };
audio.onended = function(){ next(); };
audio.onerror = function(){ next(); };
prog.oninput = function(){ audio.currentTime = (prog.value/100)*(audio.duration||0); };

function toggle(){ audio.paused ? audio.play() : audio.pause(); }
function closeWin(){ window.close(); }

function prev(){
  window.opener.postMessage({type:'prev'},'*');
}
function next(){
  window.opener.postMessage({type:'next'},'*');
}
function like(){
  isFav = !isFav;
  likeBtn.className = isFav ? 'active' : '';
  likeBtn.textContent = isFav ? '❤ 已喜欢' : '❤ 喜欢';
  window.opener.postMessage({type:'toggleLike',newId:song.newId},'*');
}
function download(){
  if(!audio.src || audio.src===window.location.href){
    var toast = document.createElement('div');
    toast.textContent = '暂无播放源';
    toast.style.cssText = 'position:fixed;bottom:40px;left:50%;transform:translateX(-50%);background:rgba(255,100,0,0.9);color:#fff;padding:6px 18px;border-radius:20px;font-size:12px;z-index:999;pointer-events:none;transition:opacity 0.3s';
    document.body.appendChild(toast);
    setTimeout(function(){ toast.style.opacity = '0'; setTimeout(function(){ document.body.removeChild(toast); },300); },1500);
    return;
  }
  var a = document.createElement('a');
  a.href = audio.src;
  a.download = (song.name || 'song') + '.mp3';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function cycleMode(){
  var idx = MODES.indexOf(playMode);
  playMode = MODES[(idx + 1) % MODES.length];
  modeBtn.textContent = '🔁 ' + MODE_LABELS[playMode];
  window.opener.postMessage({type:'setPlayMode', playMode: playMode}, '*');
}
function renderPlaylist(){
  playlistBody.innerHTML = playlist.map(function(s, i){
    var cls = i === currentIdx ? 'playlist-item active' : 'playlist-item';
    return '<div class="'+cls+'" onclick="playAt('+i+')"><span class="idx">'+(i+1)+'</span><span class="song-info">'+(s.name||'')+' - '+(s.artist||'')+'</span></div>';
  }).join('');
  // Auto-scroll to current song
  setTimeout(function(){
    var active = playlistBody.querySelector('.playlist-item.active');
    if(active) active.scrollIntoView({block:'center',behavior:'smooth'});
  }, 100);
}
function showPlaylist(){
  renderPlaylist();
  if(showLyricsMode){
    lyricsPane.className = '';
    showLyricsMode = false;
    lyricBtn.textContent = '🎤 歌词';
    lyricBtn.className = '';
  }
  showPlaylistMode = true;
  playerPane.className = 'hide';
  playlistPane.className = 'show';
  playlistBtn.className = 'active';
  window.resizeTo(360,420);
}
function hidePlaylist(){
  showPlaylistMode = false;
  playerPane.className = '';
  playlistPane.className = '';
  playlistBtn.className = '';
  window.resizeTo(360,240);
}
function playAt(idx){
  window.opener.postMessage({type:'playAtIndex', index: idx}, '*');
}
function showLyrics(){
  if(showPlaylistMode){
    playlistPane.className = '';
    showPlaylistMode = false;
    playlistBtn.className = '';
  }
  if(!lyricsLines.length){
    fetch('https://lrclib.net/api/search?q='+encodeURIComponent((song.artists||[{name:''}])[0].name+' '+song.name))
      .then(r=>r.json()).then(data=>{
        if(data&&data[0]&&data[0].syncedLyrics){
          parseLRC(data[0].syncedLyrics);
        }else if(data&&data[0]&&data[0].plainLyrics){
          lyricsLines = data[0].plainLyrics.split('\\n').filter(function(l){return l.trim()&&!/^\\[.*\\]$/.test(l.trim())}).map(function(t){return{text:t,time:0}});
          renderLyrics();
        }}).catch(function(){lyricsBody.innerHTML='<div class="lyric-line">暂无歌词</div>'});
  }
  showLyricsMode = true;
  playerPane.className = 'hide';
  lyricsPane.className = 'show';
  lyricBtn.textContent = '🎤 歌词(开)';
  lyricBtn.className = 'active';
  window.resizeTo(360,420);
}
function hideLyrics(){
  showLyricsMode = false;
  playerPane.className = '';
  lyricsPane.className = '';
  lyricBtn.textContent = '🎤 歌词';
  lyricBtn.className = '';
  window.resizeTo(360,240);
}
function parseLRC(lrc){
  var lines = lrc.split('\\n'), result=[];
  var re = /\\[(\\d{2}):(\\d{2})\\.(\\d{2,3})\\]/;
  lines.forEach(function(l){
    var m = l.match(re);
    if(m){
      var t = parseInt(m[1])*60+parseInt(m[2])+parseInt(m[3])/(m[3].length===2?100:1000);
      var text = l.replace(re,'').trim();
      if(text) result.push({time:t,text:text});
    }
  });
  lyricsLines = result.sort(function(a,b){return a.time-b.time});
  renderLyrics();
}
function renderLyrics(){
  lyricsBody.innerHTML = lyricsLines.map(function(l,i){return '<div class="lyric-line" data-idx="'+i+'">'+l.text+'</div>'}).join('');
}
function updateLyricHighlight(){
  if(!showLyricsMode||!lyricsLines.length) return;
  var t = audio.currentTime, idx=-1;
  for(var i=lyricsLines.length-1;i>=0;i--){if(t>=lyricsLines[i].time){idx=i;break}}
  if(idx!==currentLyricIdx){
    var prev = lyricsBody.querySelector('.active');
    if(prev) prev.className = 'lyric-line';
    var cur = lyricsBody.querySelector('[data-idx="'+idx+'"]');
    if(cur){ cur.className = 'lyric-line active'; cur.scrollIntoView({block:'center',behavior:'smooth'}); }
    currentLyricIdx = idx;
  }
}

// Listen for messages from parent
window.addEventListener('message',function(e){
  if(!e.data||!e.data.type) return;
  if(e.data.type === 'updateSong' && e.data.song){
    song = e.data.song;
    if(e.data.source){ audio.src = e.data.source; audio.play(); }
    document.querySelector('.name').textContent = song.name;
    document.querySelector('.artist').textContent = (song.artists||[]).map(function(a){return a.name}).join('/');
    document.title = song.name + ' - EchoBeats';
    if(song.cover) document.querySelector('.cover').style.backgroundImage = 'url('+song.cover+')';
    lyricsLines = [];
    if(showLyricsMode) showLyrics();
    if(e.data.playMode !== undefined){
      playMode = e.data.playMode;
      modeBtn.textContent = '🔁 ' + MODE_LABELS[playMode];
    }
    if(e.data.currentIndex !== undefined){
      currentIdx = e.data.currentIndex;
    }
  }
  if(e.data.type === 'updateFav'){ isFav = e.data.faved; likeBtn.className = isFav?'active':''; likeBtn.textContent = isFav?'❤ 已喜欢':'❤ 喜欢'; }
  if(e.data.type === 'updatePlayMode'){
    playMode = e.data.playMode;
    modeBtn.textContent = '🔁 ' + MODE_LABELS[playMode];
  }
  if(e.data.type === 'updatePlaylist'){
    playlist = e.data.playlist;
    currentIdx = e.data.currentIndex;
    playlistBtn.textContent = '📋 歌单('+playlist.length+')';
    if(showPlaylistMode) renderPlaylist();
  }
  if(e.data.type === 'toast' && e.data.msg){
    var toast = document.createElement('div');
    toast.textContent = e.data.msg;
    toast.style.cssText = 'position:fixed;bottom:40px;left:50%;transform:translateX(-50%);background:rgba(255,165,0,0.9);color:#fff;padding:6px 18px;border-radius:20px;font-size:12px;z-index:999;pointer-events:none;transition:opacity 0.3s';
    document.body.appendChild(toast);
    setTimeout(function(){ toast.style.opacity = '0'; setTimeout(function(){ document.body.removeChild(toast); },300); },1500);
  }
});

window.onbeforeunload = function(){ window.opener.postMessage({type:'desktopClosed'},'*'); };
window.ondblclick = function(){ closeWin(); };
<\/script></body></html>`}function _t({onRestore:e,onClose:t,onPopout:n}){var r;let i=Z(e=>e.songInPlayer);return i?(0,U.jsxs)(`div`,{style:{background:`rgba(18, 18, 18, 0.95)`,backdropFilter:`blur(16px)`,borderRadius:10,border:`1px solid rgba(255,165,0,0.3)`,padding:`8px 14px`,display:`flex`,alignItems:`center`,gap:10,boxShadow:`0 4px 20px rgba(0,0,0,0.5)`,maxWidth:380,width:`100%`,userSelect:`none`},children:[(0,U.jsx)(`div`,{style:y({width:42,height:42,borderRadius:8,flexShrink:0},i.cover?{backgroundImage:`url(${i.cover})`,backgroundSize:`cover`,backgroundPosition:`center`}:{backgroundColor:$(i.newId)})}),(0,U.jsxs)(`div`,{style:{minWidth:0,flex:1},children:[(0,U.jsx)(`div`,{style:{fontSize:13,fontWeight:600,color:`#f0f0f0`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},children:i.name}),(0,U.jsx)(`div`,{style:{fontSize:11,color:`#8c8c8c`,marginTop:1},children:((r=i.artists)==null?void 0:r.map(e=>e.name).join(`/`))||`未知`})]}),(0,U.jsxs)(`div`,{style:{display:`flex`,gap:4,flexShrink:0},children:[(0,U.jsxs)(`button`,{onClick:n,title:`弹到桌面独立窗口`,style:{background:`rgba(255,165,0,0.1)`,border:`1px solid rgba(255,165,0,0.2)`,borderRadius:6,color:`#FFA500`,cursor:`pointer`,padding:`4px 8px`,display:`flex`,alignItems:`center`,fontWeight:600,fontSize:11,gap:3},children:[(0,U.jsx)(A,{size:13}),` 桌面`]}),(0,U.jsx)(`button`,{onClick:e,title:`恢复播放器`,style:{background:`none`,border:`none`,color:`#FFA500`,cursor:`pointer`,padding:4,display:`flex`,alignItems:`center`},children:(0,U.jsx)(D,{size:15})}),(0,U.jsx)(`button`,{onClick:t,title:`关闭`,style:{background:`none`,border:`none`,color:`#8c8c8c`,cursor:`pointer`,padding:4,display:`flex`,alignItems:`center`},children:(0,U.jsx)(P,{size:15})})]})]}):null}function vt({onRestore:e,onClose:t,onDesktopOpen:n}){let r=Z(e=>e.songInPlayer),i=Z(e=>e.setSongInPlayer),a=J(e=>e.listenlist),o=Q(e=>e.favorites),s=Q(e=>e.toggleFavorite),c=Y(e=>e.playMode),l=Y(e=>e.setPlayMode),u=(0,z.useRef)(null),d=(0,z.useRef)(null),f=(0,z.useRef)(c);f.current=c;let p=a.filter(e=>e!==null),m=(0,z.useCallback)(()=>p.map(e=>{var t;return{newId:e.newId,name:e.name,artist:((t=e.artists)==null?void 0:t.map(e=>e.name).join(`/`))||``}}),[p]),h=(0,z.useCallback)(_(function*(){if(!r)return;if(u.current){if(`documentPictureInPicture`in window&&u.current instanceof Window&&!u.current.closed){try{u.current.focus()}catch(e){}return}if(!(`documentPictureInPicture`in window)&&!u.current.closed){u.current.focus();return}}n==null||n();let e=d.current;if(!e)try{e=yield R(r.newId)}catch(e){}d.current=e;let t=o.some(e=>e.newId===r.newId),i=m(),a=p.findIndex(e=>e.newId===(r==null?void 0:r.newId)),s=gt(r,e,t,f.current,i,a),c=new Blob([s],{type:`text/html`}),l=URL.createObjectURL(c);if(`documentPictureInPicture`in window)try{let e=yield window.documentPictureInPicture.requestWindow({width:360,height:280});e.document.write(s),e.document.close(),u.current=e,e.addEventListener(`pagehide`,()=>{u.current=null,URL.revokeObjectURL(l)});return}catch(e){}let h=window.open(l,`EchoBeats_Desktop`,`width=360,height=280,left=${window.screen.width-400},top=${window.screen.height-320},resizable=yes,alwaysOnTop=yes,titlebar=no,location=no,toolbar=no,menubar=no,scrollbars=no`);if(!h){URL.revokeObjectURL(l);return}setTimeout(()=>URL.revokeObjectURL(l),3e3),u.current=h}),[r,o,p,m,n]),g=(0,z.useCallback)(()=>{if(!u.current||u.current.closed)return;let e=m(),t=p.findIndex(e=>e.newId===(r==null?void 0:r.newId));try{u.current.postMessage({type:`updatePlaylist`,playlist:e,currentIndex:t},`*`)}catch(e){}},[r,p,m]);return(0,z.useEffect)(()=>{let e=function(){var e=_(function*(e){if(!e.data||!e.data.type)return;let t=e.source;switch(e.data.type){case`prev`:{let e=a.filter(e=>e),n=X(),s=e.findIndex(e=>e.newId===(r==null?void 0:r.newId));if(s<0)break;let c;if(n===`order`||n===`loop`)s>0?c=e[s-1]:n===`loop`&&(c=e[e.length-1]);else if(n===`shuffle`&&e.length>1){let t;do t=Math.floor(Math.random()*e.length);while(t===s);c=e[t]}if(c){i(c);let n;try{n=yield R(c.newId)}catch(e){}let r=o.some(e=>e.newId===c.newId),a=e.findIndex(e=>e.newId===c.newId);t.postMessage({type:`updateSong`,song:c,source:n,playMode:X(),currentIndex:a},`*`);try{t.postMessage({type:`updateFav`,faved:r},`*`)}catch(e){}}break}case`next`:{let e=a.filter(e=>e),n=X(),s=e.findIndex(e=>e.newId===(r==null?void 0:r.newId));if(s<0)break;let c;if(n===`order`)s+1<e.length&&(c=e[s+1]);else if(n===`loop`)c=s+1<e.length?e[s+1]:e[0];else if(n===`shuffle`){if(e.length>1){let t;do t=Math.floor(Math.random()*e.length);while(t===s);c=e[t]}}else n===`single`&&(c=e[s]);if(c){i(c);let n;try{n=yield R(c.newId)}catch(e){}let r=o.some(e=>e.newId===c.newId),a=e.findIndex(e=>e.newId===c.newId);t.postMessage({type:`updateSong`,song:c,source:n,playMode:X(),currentIndex:a},`*`);try{t.postMessage({type:`updateFav`,faved:r},`*`)}catch(e){}}break}case`getSong`:if(r){let e;try{e=yield R(r.newId)}catch(e){}let n=a.filter(e=>e).findIndex(e=>e.newId===(r==null?void 0:r.newId));t.postMessage({type:`updateSong`,song:r,source:e,playMode:X(),currentIndex:n},`*`)}break;case`toggleLike`:{let n=a.find(t=>(t==null?void 0:t.newId)===e.data.newId)||r;if(n){let e=s(n);t.postMessage({type:`updateFav`,faved:e},`*`)}break}case`setPlayMode`:l(e.data.playMode);try{t.postMessage({type:`updatePlayMode`,playMode:e.data.playMode},`*`)}catch(e){}break;case`showPlaylist`:Ie.getState().setIsListenlistOpen(!0);break;case`playAtIndex`:{let n=a.filter(e=>e),r=e.data.index;if(r>=0&&r<n.length){let e=n[r];i(e);let a;try{a=yield R(e.newId)}catch(e){}let s=o.some(t=>t.newId===e.newId);t.postMessage({type:`updateSong`,song:e,source:a,playMode:X(),currentIndex:r},`*`);try{t.postMessage({type:`updateFav`,faved:s},`*`)}catch(e){}}break}case`desktopClosed`:u.current=null;break}});return function(t){return e.apply(this,arguments)}}();return window.addEventListener(`message`,e),()=>window.removeEventListener(`message`,e)},[r,a,o,i,s,l]),(0,z.useEffect)(()=>{!u.current||u.current.closed||R(r==null?void 0:r.newId).then(e=>{if(u.current&&!u.current.closed){let t=a.filter(e=>e).findIndex(e=>e.newId===(r==null?void 0:r.newId));u.current.postMessage({type:`updateSong`,song:r,source:e,playMode:X(),currentIndex:t},`*`),u.current.postMessage({type:`updateFav`,faved:o.some(e=>e.newId===(r==null?void 0:r.newId))},`*`)}}).catch(()=>{})},[r==null?void 0:r.newId]),(0,z.useEffect)(()=>{g()},[a,g]),(0,z.useEffect)(()=>{if(!(!u.current||u.current.closed))try{u.current.postMessage({type:`updatePlayMode`,playMode:c},`*`)}catch(e){}},[c]),(0,z.useEffect)(()=>()=>{u.current&&!u.current.closed&&u.current.close()},[]),(0,U.jsxs)(`div`,{style:{position:`fixed`,bottom:74,right:20,zIndex:1100,animation:`slideUp 0.3s ease-out`},children:[(0,U.jsx)(_t,{onRestore:e,onClose:t,onPopout:()=>h()}),(0,U.jsx)(`style`,{children:`@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`})]})}function yt(){let[e,t]=(0,z.useState)(!1);return{isMini:e,toggleMini:(0,z.useCallback)(()=>t(e=>!e),[])}}function bt(){let e=Z(e=>e.songInPlayer),t=Z(e=>e.setSongInPlayer),n=J(e=>e.listenlist).filter(e=>e!==null),i=n.findIndex(t=>t.newId===(e==null?void 0:e.newId)),{isListenlistOpen:a,setIsListenlistOpen:c}=Ie(),l=Ge(e=>e.setCurrentTime),{isFloatingOpen:m,openFloating:h,closeFloating:g}=Ke(),{isMini:v,toggleMini:y}=yt(),[te,ne]=Ae(),[b,x]=(0,z.useState)(!0),[S,C]=(0,z.useState)(!1),[w,T]=(0,z.useState)(``),E=Y(e=>e.playMode),D=Y(e=>e.setPlayMode),[k,se]=(0,z.useState)(localStorage.getItem(`volume`)?Number(localStorage.getItem(`volume`)):.7),[A,j]=(0,z.useState)(``),[M,N]=(0,z.useState)(``),[P,F]=(0,z.useState)(null),[I,ge]=(0,z.useState)(0),[_e,ve]=(0,z.useState)(0),[ye,be]=(0,z.useState)(0),xe=(0,z.useRef)(!1),B=(0,z.useRef)(null),V=(0,z.useRef)(null),H=(0,z.useRef)(!1),W=(0,z.useRef)(new Map),G=(0,z.useRef)(!1);(0,z.useEffect)(()=>{if(xe.current){if(e!=null&&e.newId){let t=e.newId;B.current&&B.current.currentTime>3&&W.current.set(t,B.current.currentTime),F(null),N(``),H.current=!1,be(0),G.current=!1,C(!0)}}else xe.current=!0},[e==null?void 0:e.newId]),(0,z.useEffect)(()=>{P?S?B.current.play().catch(()=>{x(!0)}):B.current.pause():e!=null&&e.newId&&S&&(B.current.pause(),e.source?(F(e.source),j(`success`)):(j(`getting`),T(`Getting source...`),R(e.newId).then(e=>{F(e),j(`success`)}).catch(()=>{j(`failed`),T(`Failed to get source.`),d.info(`无法播放 <${e.name}>`)})))},[P,S,e==null?void 0:e.newId]),(0,z.useEffect)(()=>{B.current.volume=k},[k]);let Se=(0,z.useCallback)(e=>{if(e.key===` `&&e.target.nodeName===`BODY`){if(e.preventDefault(),e.target.nodeName===`INPUT`)return;B.current.paused?C(!0):C(!1)}},[]);(0,z.useEffect)(()=>{window.addEventListener(`keydown`,Se)});function Ce(){T(`Loading media...`)}function we(){if(!H.current&&e!=null&&e.newId){H.current=!0,T(`Retrying source...`);function t(){return n.apply(this,arguments)}function n(){return n=_(function*(){try{let{success:t,data:n}=yield(yield fetch(`https://tonzhon.whamon.com/api/p/${e.newId}`)).json();if(t&&n){F(n),N(``);return}}catch(e){}try{let t=yield fetch(`/api/p/${e.newId}`);if(t.ok){let e=yield t.json();if(e.success&&e.data){F(e.data),N(``);return}}}catch(e){}try{let t=yield R(e.newId);if(t){F(t),N(``);return}}catch(e){}N(`error`),T(`Media Load Error`),H.current=!1}),n.apply(this,arguments)}t()}else N(`error`),T(`Media Load Error`)}(0,z.useEffect)(()=>{if(M===`error`&&H.current===!1&&E!==`single`){let e=setTimeout(()=>{Re()},1500);return()=>clearTimeout(e)}},[M,E]);function Te(){if(N(`success`),ge(B.current.duration),!G.current&&e!=null&&e.newId){let t=W.current.get(e.newId);t&&t<B.current.duration-3&&(B.current.currentTime=t,G.current=!0)}}function Ee(){V.current&&clearInterval(V.current),V.current=setInterval(()=>{ve(B.current.currentTime)},1e3),x(!1)}function De(){let e=B.current.currentTime;be(e),l(e)}function Oe(){V.current&&clearInterval(V.current),x(!0)}function ke(){clearInterval(V.current),E===`single`?q():Re()}function je(){C(!0)}function Me(){C(!1)}function Ne(e){B.current.currentTime=e,ve(e)}function Pe(t){if(P){let t=document.createElement(`a`);t.href=P,t.download=e!=null&&e.name?`${e.name}.mp3`:`song.mp3`,t.target=`_blank`,t.rel=`noopener noreferrer`,document.body.appendChild(t),t.click(),document.body.removeChild(t)}else te(`info`,`请先播放`,t)}function Fe(e){B.current.volume=e,se(e),localStorage.setItem(`volume`,e)}function K(){(E===`order`||E===`loop`)&&i>0&&t(n[i-1])}function Le(){Re()}function Re(){if(i>=0){let e=n.length;if(E===`order`)i+1<e&&t(n[i+1]);else if(E===`loop`)i+1<e?t(n[i+1]):t(n[0]);else if(E===`shuffle`&&e>1){let r;do r=Math.floor(Math.random()*e);while(r===i);t(n[r])}}}function q(){B.current.currentTime=0,B.current.play()}function ze(){c(!a)}let Be=(0,U.jsx)(it,{className:`central-icon-in-player play-icon`,title:`空格键`,onClick:je}),Ve=(0,U.jsx)(he,{size:40,className:`central-icon-in-player animate-spin`});return(0,U.jsxs)(U.Fragment,{children:[ne,(0,U.jsxs)(`div`,{id:`player`,className:`fixed`,children:[(0,U.jsx)(`audio`,{ref:B,src:P,onLoadStart:Ce,onError:we,onLoadedData:Te,onPlay:Ee,onTimeUpdate:De,onPause:Oe,onEnded:ke}),M===`success`&&(0,U.jsx)(ee,{theme:{components:{Slider:{railSize:2,colorPrimaryBorder:`orange`,colorPrimaryBorderHover:`orange`,colorBgElevated:`orange`,handleSize:12,handleSizeHover:12,handleLineWidth:0,handleLineWidthHover:0,colorFillSecondary:`#8c8c8c`}}},children:(0,U.jsx)(f,{min:0,max:I?parseInt(I):0,value:_e,tooltip:{open:!1},onChange:Ne,style:{margin:0,height:`auto`}})}),(0,U.jsx)(`div`,{id:`below-progress-slider`,children:(0,U.jsxs)(p,{id:`main-row`,align:`middle`,justify:`space-around`,style:{height:`44px`},children:[(0,U.jsx)(u,{span:7,children:e&&(0,U.jsx)(lt,{song:e})}),(0,U.jsx)(u,{span:3,children:(0,U.jsxs)(p,{justify:`space-between`,children:[(0,U.jsx)(u,{children:(0,U.jsx)(Qe,{song:e})}),(0,U.jsx)(u,{children:(0,U.jsx)(ht,{song:e,disabled:!e})}),(0,U.jsx)(u,{children:(0,U.jsx)(re,{className:`icon`,onClick:Pe})})]})}),(0,U.jsxs)(u,{span:4,style:{display:`flex`,alignItems:`center`,justifyContent:`center`},children:[(0,U.jsx)(ue,{className:`icon`,onClick:K}),A===``?Be:A===`getting`?Ve:A===`success`?M===`error`?(0,U.jsx)(ae,{size:40,className:`central-icon-in-player error-icon-in-player`}):M===`success`?b?Be:(0,U.jsx)(nt,{className:`central-icon-in-player pause-icon`,title:`空格键`,onClick:Me}):Ve:(0,U.jsx)(pe,{size:40,className:`central-icon-in-player error-icon-in-player`}),(0,U.jsx)(le,{className:`icon`,onClick:Le})]}),(0,U.jsx)(u,{span:10,children:(0,U.jsxs)(p,{justify:`space-between`,children:[(0,U.jsx)(u,{children:(0,U.jsx)(o,{menu:{items:[{key:`order`,icon:(0,U.jsx)(O,{style:{fontSize:20}}),label:`顺序`},{key:`loop`,icon:(0,U.jsx)(de,{style:{fontSize:20}}),label:`列表循环`},{key:`single`,icon:(0,U.jsx)(ce,{style:{fontSize:20}}),label:`单曲重复`},{key:`shuffle`,icon:(0,U.jsx)(me,{style:{fontSize:20}}),label:`随机`}],onClick:({key:e})=>{D(e)}},placement:`top`,children:{order:(0,U.jsx)(O,{className:`unclickable-icon`}),loop:(0,U.jsx)(de,{className:`unclickable-icon`}),single:(0,U.jsx)(ce,{className:`unclickable-icon`}),shuffle:(0,U.jsx)(me,{className:`unclickable-icon`})}[E]})}),(0,U.jsx)(u,{children:(0,U.jsxs)(s,{size:2,children:[(0,U.jsx)(fe,{className:`unclickable-icon`}),(0,U.jsx)(ee,{theme:{components:{Slider:{colorFillTertiary:`#d9d9d9`,colorFillSecondary:`#f5f5f5`}}},children:(0,U.jsx)(f,{min:0,max:1,step:.01,defaultValue:k,onChange:Fe,style:{width:100,margin:0}})})]})}),(0,U.jsx)(u,{children:(0,U.jsx)(oe,{className:v?`icon is-on`:`icon`,title:`最小化`,onClick:y})}),(0,U.jsx)(u,{children:(0,U.jsx)(L,{className:m?`icon is-on`:`icon`,title:`浮动歌词`,onClick:()=>{m?g():h(e)}})}),(0,U.jsx)(u,{children:(0,U.jsx)(r,{count:`${i+1} / ${n.length}`,size:`small`,offset:[15,0],style:{backgroundColor:`orange`},children:(0,U.jsx)(ie,{className:a?`icon is-on`:`icon`,onClick:ze})})}),(0,U.jsx)(u,{id:`time-in-player`,children:M===`success`?(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(`span`,{children:Je(_e)}),(0,U.jsxs)(`span`,{children:[` / `,Je(I)]})]}):w})]})})]})})]}),v&&(0,U.jsx)(vt,{onRestore:y,onClose:y,onDesktopOpen:()=>C(!1)})]})}var xt={ui:(0,U.jsx)(se,{className:`animate-spin`,size:30,color:`#FFA500`}),data:(0,U.jsx)(he,{className:`animate-spin`,size:30,color:`#FFA500`})};function St({kind:e=`ui`}){return(0,U.jsx)(`div`,{className:`flex justify-center items-center`,style:{padding:`40px 0`},children:xt[e]})}var Ct=(0,z.lazy)(()=>x(()=>import(`./Listenlist-CybsT9QX.js`),__vite__mapDeps([0,1,2,3,4]),import.meta.url));function wt(){let e=J(e=>e.listenlist),t=J(e=>e.clearListenlist),n=Z(e=>{var t;return(t=e.songInPlayer)==null?void 0:t.newId}),r=Ie(e=>e.setIsListenlistOpen),i=(0,z.useRef)(),a=(0,z.useCallback)(()=>{let t=e.findIndex(e=>e.newId===n);t>4&&(i.current.scrollTop=(t-4)*36)},[e,n]);return(0,U.jsxs)(`div`,{className:`fixed w-80 right-[6vw] top-[90px] bg-[#1a1a1a] bottom-[68px] rounded-xl overflow-hidden z-[1050]`,style:{border:`1px solid rgba(255,255,255,0.1)`,boxShadow:`0 8px 40px rgba(0,0,0,0.5)`},children:[(0,U.jsxs)(`div`,{className:`flex items-center justify-between gap-2 px-4 py-3 w-full`,style:{borderBottom:`1px solid rgba(255,255,255,0.06)`},children:[(0,U.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,U.jsx)(`strong`,{style:{fontSize:15},children:`聆听列表`}),(0,U.jsx)(`span`,{style:{fontSize:12,color:`#8c8c8c`,background:`rgba(255,255,255,0.08)`,padding:`1px 8px`,borderRadius:10},children:e.filter(e=>e!==null).length})]}),(0,U.jsxs)(`div`,{className:`flex gap-2`,children:[(0,U.jsx)(c,{size:`small`,onClick:a,children:`定位当前`}),(0,U.jsx)(c,{size:`small`,onClick:t,children:`清空`}),(0,U.jsx)(c,{size:`small`,type:`text`,icon:(0,U.jsx)(P,{size:14}),onClick:()=>r(!1),style:{color:`#8c8c8c`}})]})]}),(0,U.jsx)(`div`,{className:`h-[calc(100%-52px)] overflow-auto w-full`,ref:i,children:(0,U.jsx)(z.Suspense,{fallback:(0,U.jsx)(St,{}),children:(0,U.jsx)(Ct,{songs:e,newIdOfCurrentSong:n})})})]})}n();function Tt(){var e;let{isOpen:t,song:n,lyrics:r,isLoading:i,close:a,setLyrics:o}=Ke(),s=Z(e=>e.songInPlayer),c=(0,z.useRef)(null),l=(0,z.useRef)(null);(0,z.useEffect)(()=>{let e=t&&s?s:n;t&&e&&e.newId!==l.current&&(l.current=e.newId,_e(e).then(e=>{o(e.plainLyrics||e.syncedLyrics||`暂无歌词`)}).catch(()=>{o(`暂无歌词`)}))},[t,n==null?void 0:n.newId,s==null?void 0:s.newId]),(0,z.useEffect)(()=>{if(!t)return;let e=e=>{e.key===`Escape`&&a()};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)},[t,a]);let u=t&&s?s:n;if(!t||!u)return null;let d=u.cover?{backgroundImage:`url(${u.cover})`}:{backgroundColor:$(u.newId)},f=((e=u.artists)==null?void 0:e.map(e=>e.name).join(` / `))||`未知艺人`,p=r.split(`
`).filter(e=>e.trim());return(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(`div`,{onClick:a,style:{position:`fixed`,inset:0,zIndex:1050,background:`rgba(0, 0, 0, 0.5)`,backdropFilter:`blur(4px)`}}),(0,U.jsxs)(`div`,{ref:c,style:{position:`fixed`,top:0,right:0,width:420,maxWidth:`90vw`,height:`100vh`,zIndex:1060,background:`rgba(24, 24, 24, 0.95)`,backdropFilter:`blur(24px)`,borderLeft:`1px solid rgba(255, 255, 255, 0.08)`,display:`flex`,flexDirection:`column`,animation:`slideInRight 0.3s ease-out`},children:[(0,U.jsx)(`div`,{style:y(y({position:`absolute`,inset:0},d),{},{backgroundSize:`cover`,backgroundPosition:`center`,opacity:.08,filter:`blur(10px)`,zIndex:-1})}),(0,U.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,padding:`16px 20px`,borderBottom:`1px solid rgba(255, 255, 255, 0.06)`,flexShrink:0},children:[(0,U.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:10},children:[(0,U.jsx)(L,{size:18,color:`#FFA500`}),(0,U.jsx)(`span`,{style:{fontSize:15,fontWeight:600,color:`#f0f0f0`},children:`歌词`})]}),(0,U.jsx)(`button`,{onClick:a,style:{background:`none`,border:`none`,color:`#8c8c8c`,cursor:`pointer`,padding:4,borderRadius:6,display:`flex`,alignItems:`center`,justifyContent:`center`},onMouseEnter:e=>{e.currentTarget.style.color=`#fff`,e.currentTarget.style.background=`rgba(255,255,255,0.08)`},onMouseLeave:e=>{e.currentTarget.style.color=`#8c8c8c`,e.currentTarget.style.background=`transparent`},children:(0,U.jsx)(P,{size:20})})]}),(0,U.jsxs)(`div`,{style:{padding:`20px 20px 16px`,display:`flex`,alignItems:`center`,gap:14,flexShrink:0},children:[(0,U.jsx)(`div`,{style:y(y({width:64,height:64,borderRadius:12,flexShrink:0},d),{},{backgroundSize:`cover`,backgroundPosition:`center`,boxShadow:`0 4px 16px rgba(0,0,0,0.4)`})}),(0,U.jsxs)(`div`,{style:{minWidth:0},children:[(0,U.jsx)(`div`,{style:{fontSize:16,fontWeight:600,color:`#f0f0f0`,marginBottom:4,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},children:u.name}),(0,U.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:6},children:[(0,U.jsx)(N,{size:13,color:`#8c8c8c`}),(0,U.jsx)(`span`,{style:{fontSize:13,color:`#8c8c8c`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},children:f})]})]})]}),(0,U.jsx)(`div`,{style:{flex:1,overflowY:`auto`,padding:`0 20px 30px`},children:i?(0,U.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`center`,padding:40,gap:8,color:`#8c8c8c`},children:[(0,U.jsx)(se,{size:18,style:{animation:`spin 1s linear infinite`}}),(0,U.jsx)(`span`,{style:{fontSize:14},children:`加载歌词中...`})]}):p.length>0?(0,U.jsx)(`div`,{children:p.map((e,t)=>/^\[.*\]$/.test(e.trim())?null:(0,U.jsx)(`div`,{style:{padding:`10px 0`,fontSize:15,lineHeight:1.8,color:`#bfbfbf`,borderBottom:`1px solid rgba(255, 255, 255, 0.03)`,transition:`color 0.2s`},onMouseEnter:e=>{e.currentTarget.style.color=`#fff`},onMouseLeave:e=>{e.currentTarget.style.color=`#bfbfbf`},children:e},t))}):(0,U.jsx)(`div`,{style:{textAlign:`center`,padding:40,color:`#8c8c8c`,fontSize:14},children:`暂无歌词`})})]}),(0,U.jsx)(`style`,{children:`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `})]})}var Et=14,Dt=36,Ot=22;function kt(e){if(!e)return[];let t=e.split(`
`),n=[],r=/\[(\d{2}):(\d{2})\.(\d{2,3})\]/;for(let e of t){let t=e.match(r);if(t){let i=parseInt(t[1],10),a=parseInt(t[2],10),o=parseInt(t[3],10),s=i*60+a+o/(t[3].length===2?100:1e3),c=e.replace(r,``).trim();c&&n.push({time:s,text:c})}}return n.sort((e,t)=>e.time-t.time)}function At(){var e;let{isFloatingOpen:t,song:n,lyrics:r,setLyrics:i}=Ke(),a=Ge(e=>e.currentTime),o=Z(e=>e.songInPlayer),[s,c]=(0,z.useState)([]),[l,u]=(0,z.useState)(-1),[d,f]=(0,z.useState)(()=>{let e=localStorage.getItem(`lyricsFontSize`);return e?Number(e):Ot}),p=(0,z.useRef)(null),m=(0,z.useRef)(null),h=(0,z.useRef)(!1),g=(0,z.useRef)(0),_=(0,z.useRef)(Ot),v=(0,z.useRef)(null);(0,z.useEffect)(()=>{let e=t&&o?o:n;t&&e&&e.newId!==v.current&&(v.current=e.newId,c([]),u(-1),_e(e).then(e=>{let t=typeof e==`string`?e:e.plainLyrics,n=typeof e==`string`?``:e.syncedLyrics;n?(c(kt(n)),i(n)):i(t||``)}).catch(()=>{i(``)}))},[t,n==null?void 0:n.newId,o==null?void 0:o.newId]),(0,z.useEffect)(()=>{if(!t||s.length===0)return;function e(){let t=-1;for(let e=s.length-1;e>=0;e--)if(a>=s[e].time){t=e;break}u(t),p.current=requestAnimationFrame(e)}return p.current=requestAnimationFrame(e),()=>{p.current&&cancelAnimationFrame(p.current)}},[t,s,a]);let y=(0,z.useCallback)(e=>{e.preventDefault(),h.current=!0,g.current=e.clientY,_.current=d,document.body.style.cursor=`ns-resize`,document.body.style.userSelect=`none`},[d]);(0,z.useEffect)(()=>{let e=e=>{if(!h.current)return;let t=g.current-e.clientY,n=Math.round(_.current+t/8),r=Math.min(Dt,Math.max(Et,n));f(r),localStorage.setItem(`lyricsFontSize`,r)},t=()=>{h.current&&(h.current=!1,document.body.style.cursor=``,document.body.style.userSelect=``)};return window.addEventListener(`mousemove`,e),window.addEventListener(`mouseup`,t),()=>{window.removeEventListener(`mousemove`,e),window.removeEventListener(`mouseup`,t)}},[]);let ee=(0,z.useCallback)(e=>{e.touches.length===1&&(h.current=!0,g.current=e.touches[0].clientY,_.current=d)},[d]);(0,z.useEffect)(()=>{let e=e=>{if(!h.current)return;let t=g.current-e.touches[0].clientY,n=Math.round(_.current+t/8),r=Math.min(Dt,Math.max(Et,n));f(r),localStorage.setItem(`lyricsFontSize`,r)},t=()=>{h.current=!1};return window.addEventListener(`touchmove`,e,{passive:!0}),window.addEventListener(`touchend`,t),()=>{window.removeEventListener(`touchmove`,e),window.removeEventListener(`touchend`,t)}},[]);let te=()=>{let e=Math.min(Dt,d+2);f(e),localStorage.setItem(`lyricsFontSize`,e)},ne=()=>{let e=Math.max(Et,d-2);f(e),localStorage.setItem(`lyricsFontSize`,e)},b=t&&o?o:n;if(!t||!b)return null;let x=s.length>0,S=x&&l>0?s[l-1]:null,C=x&&l>=0?s[l]:null,w=x&&l<s.length-1?s[l+1]:null,T=!x&&r?r.split(`
`).filter(e=>e.trim()&&!/^\[.*\]$/.test(e.trim())):[],E=d,D=Math.round(d*.72),O=d/Ot;return(0,U.jsx)(`div`,{style:{position:`fixed`,bottom:74,left:0,right:0,zIndex:1e3,display:`flex`,justifyContent:`center`,padding:`0 16px`},children:(0,U.jsxs)(`div`,{ref:m,style:{background:`rgba(0, 0, 0, 0.55)`,backdropFilter:`blur(16px)`,borderRadius:16,padding:`${Math.round(10*O)}px ${Math.round(20*O)}px`,maxWidth:Math.round(600*O),width:`100%`,textAlign:`center`,border:`1px solid rgba(255, 255, 255, 0.06)`,transition:`padding 0.2s, max-width 0.2s`},children:[(0,U.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`center`,gap:6,marginBottom:Math.round(6*O)},children:[(0,U.jsx)(L,{size:Math.round(11*O),color:`#FFA500`}),(0,U.jsxs)(`span`,{style:{fontSize:Math.round(10*O),color:`#8c8c8c`,fontWeight:500},children:[b.name,` - `,((e=b.artists)==null?void 0:e.map(e=>e.name).join(`/`))||`未知`]}),(0,U.jsxs)(`div`,{style:{display:`flex`,gap:2,marginLeft:8,pointerEvents:`auto`},children:[(0,U.jsx)(`button`,{onClick:ne,style:{background:`rgba(255,255,255,0.08)`,border:`none`,borderRadius:4,cursor:`pointer`,display:`flex`,alignItems:`center`,padding:2,color:`#8c8c8c`},onMouseEnter:e=>{e.currentTarget.style.color=`#fff`,e.currentTarget.style.background=`rgba(255,255,255,0.15)`},onMouseLeave:e=>{e.currentTarget.style.color=`#8c8c8c`,e.currentTarget.style.background=`rgba(255,255,255,0.08)`},title:`缩小字体`,children:(0,U.jsx)(F,{size:Math.round(12*O)})}),(0,U.jsx)(`button`,{onClick:te,style:{background:`rgba(255,255,255,0.08)`,border:`none`,borderRadius:4,cursor:`pointer`,display:`flex`,alignItems:`center`,padding:2,color:`#8c8c8c`},onMouseEnter:e=>{e.currentTarget.style.color=`#fff`,e.currentTarget.style.background=`rgba(255,255,255,0.15)`},onMouseLeave:e=>{e.currentTarget.style.color=`#8c8c8c`,e.currentTarget.style.background=`rgba(255,255,255,0.08)`},title:`放大字体`,children:(0,U.jsx)(M,{size:Math.round(12*O)})})]}),(0,U.jsx)(`span`,{style:{fontSize:10,color:`rgba(255,255,255,0.2)`,marginLeft:4},children:`拖动歌词区域缩放`})]}),(0,U.jsx)(`div`,{onMouseDown:y,onTouchStart:ee,style:{cursor:`ns-resize`,minHeight:60},children:x?(0,U.jsxs)(`div`,{children:[S&&(0,U.jsx)(`div`,{style:{fontSize:D,color:`rgba(255,255,255,0.3)`,transition:`all 0.3s`,lineHeight:1.7,marginBottom:2},children:S.text}),C&&(0,U.jsx)(`div`,{style:{fontSize:E,fontWeight:700,color:`#FFA500`,transition:`all 0.3s`,textShadow:`0 0 12px rgba(255,165,0,0.4)`,lineHeight:1.5,padding:`2px 0`},children:C.text}),w&&(0,U.jsx)(`div`,{style:{fontSize:D,color:`rgba(255,255,255,0.3)`,transition:`all 0.3s`,lineHeight:1.7,marginTop:2},children:w.text}),!C&&!S&&w&&(0,U.jsx)(`div`,{style:{fontSize:D,color:`rgba(255,255,255,0.3)`,lineHeight:1.7},children:w.text})]}):T.length>0?(0,U.jsx)(`div`,{style:{maxHeight:120,overflow:`hidden`},children:T.slice(0,4).map((e,t)=>(0,U.jsx)(`div`,{style:{fontSize:D,color:`rgba(255,255,255,0.4)`,lineHeight:1.7},children:e},t))}):(0,U.jsx)(`div`,{style:{fontSize:D,color:`rgba(255,255,255,0.25)`,padding:`6px 0`},children:`暂无歌词`})})]})})}var jt=class extends z.Component{constructor(e){super(e),this.state={hasError:!1}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,t){console.error(`ErrorBoundary caught an error:`,e,t)}render(){return this.state.hasError?(0,U.jsxs)(`div`,{style:{padding:`40px 20px`,textAlign:`center`,backgroundColor:`#f5f5f5`,borderRadius:`8px`,margin:`20px`},children:[(0,U.jsx)(`h3`,{style:{color:`#ff4d4f`,marginBottom:`16px`},children:`页面出现了错误`}),(0,U.jsx)(`p`,{style:{color:`#666`,marginBottom:`20px`},children:`抱歉，遇到了一些问题。请尝试刷新页面。`}),(0,U.jsx)(`button`,{onClick:()=>window.location.reload(),style:{padding:`8px 16px`,backgroundColor:`#1890ff`,color:`white`,border:`none`,borderRadius:`4px`,cursor:`pointer`},children:`刷新页面`})]}):this.props.children}},Mt=(0,z.lazy)(()=>x(()=>import(`./Home-DIJVDQOS.js`),__vite__mapDeps([5,1,2,3,4,6,7,8,9,10]),import.meta.url)),Nt=(0,z.lazy)(()=>x(()=>import(`./Search-MMNfvoaV.js`),__vite__mapDeps([11,1,2,3,4,6,7,8]),import.meta.url)),Pt=(0,z.lazy)(()=>x(()=>import(`./Playlists-Bawc-TIV.js`),__vite__mapDeps([12,1,2,3,4]),import.meta.url)),Ft=(0,z.lazy)(()=>x(()=>import(`./PlaylistView-DR39qwh_.js`),__vite__mapDeps([13,1,2,3,4,7,8]),import.meta.url)),It=(0,z.lazy)(()=>x(()=>import(`./NewSongs-Cm-vw1k6.js`),__vite__mapDeps([14,1,2,3,4,6,7,8,9,10]),import.meta.url)),Lt=(0,z.lazy)(()=>x(()=>import(`./Artists-B4aqGgel.js`),__vite__mapDeps([15,1,2,3,4,9,10]),import.meta.url)),Rt=(0,z.lazy)(()=>x(()=>import(`./ArtistView-D8kX5oVm.js`),__vite__mapDeps([16,1,2,3,4,6,7,8,9,10]),import.meta.url)),zt=(0,z.lazy)(()=>x(()=>import(`./MVPage-B9ETCrCc.js`),__vite__mapDeps([17,1,2,3,4]),import.meta.url)),Bt=(0,z.lazy)(()=>x(()=>import(`./Favorites-CoRzU2YG.js`),__vite__mapDeps([18,1,2,3,4,6,7,8]),import.meta.url)),{Content:Vt}=l;function Ht(){let e=Ie(e=>e.isListenlistOpen);return(0,U.jsx)(jt,{children:(0,U.jsx)(S,{children:(0,U.jsx)(ee,{theme:{algorithm:h.darkAlgorithm,token:{colorPrimary:`#FFA500`,colorLink:`#ffffff`,colorLinkHover:`orange`},components:{Menu:{itemPaddingInline:10}}},children:(0,U.jsxs)(l,{children:[(0,U.jsx)(ke,{}),(0,U.jsx)(Vt,{className:`container`,style:{marginTop:90,marginBottom:74},children:(0,U.jsx)(z.Suspense,{fallback:(0,U.jsx)(St,{}),children:(0,U.jsxs)(te,{children:[(0,U.jsx)(b,{path:`/`,element:(0,U.jsx)(Mt,{})}),(0,U.jsx)(b,{path:`search/:keyword`,element:(0,U.jsx)(Nt,{})}),(0,U.jsx)(b,{path:`playlists`,element:(0,U.jsx)(Pt,{})}),(0,U.jsx)(b,{path:`playlist/:id`,element:(0,U.jsx)(Ft,{})}),(0,U.jsx)(b,{path:`new-songs`,element:(0,U.jsx)(It,{})}),(0,U.jsx)(b,{path:`artists`,element:(0,U.jsx)(Lt,{})}),(0,U.jsx)(b,{path:`artist/:name`,element:(0,U.jsx)(Rt,{})}),(0,U.jsx)(b,{path:`mv`,element:(0,U.jsx)(zt,{})}),(0,U.jsx)(b,{path:`favorites`,element:(0,U.jsx)(Bt,{})})]})})}),(0,U.jsx)(bt,{}),e&&(0,U.jsx)(wt,{}),(0,U.jsx)(Tt,{}),(0,U.jsx)(At,{})]})})})})}var Ut={LISTENLIST:`listenlist`,PLAY_INDEX:`playIndex`,PLAY_MODE:`playMode`,VOLUME:`volume`},Wt=(e,t=null)=>{try{let n=localStorage.getItem(e);if(n===null)return t;try{return JSON.parse(n)}catch(e){return n}}catch(n){return console.warn(`Failed to get item from localStorage: ${e}`,n),t}},Gt=(e,t)=>{try{let n=typeof t==`string`?t:JSON.stringify(t);return localStorage.setItem(e,n),!0}catch(t){return console.warn(`Failed to set item in localStorage: ${e}`,t),!1}},Kt=()=>Wt(Ut.LISTENLIST,[]),qt=e=>Gt(Ut.LISTENLIST,e),Jt=()=>{let e=Wt(Ut.PLAY_INDEX,0);return typeof e==`number`?e:parseInt(e)||0},Yt=e=>Gt(Ut.PLAY_INDEX,e.toString()),Xt=(0,z.createContext)(),Zt=({children:e})=>{let[t,n]=(0,z.useState)(()=>Kt()),[r,i]=(0,z.useState)(()=>Jt()),a=t[r],o=e=>{qt(e)},s=e=>{Yt(e)},c=e=>{n(t=>{if(t.some(t=>t.newId===e.newId))return t;let n=[...t,e];return o(n),n})},l=e=>{n(t=>{let n=e.filter(e=>t.every(t=>t.newId!==e.newId)),r=t.concat(n);return o(r),r})},u=e=>{n(e),o(e)},d=e=>{n(t=>{let n=[...t];return n.splice(e,1),o(n),n})},f=()=>{n([]),o([])},p=e=>{i(e),s(e)},m=()=>{i(0),s(0)};(0,z.useEffect)(()=>{s(r)},[r]);let h={listenlist:t,playIndex:r,currentSong:a,addSongToListenlist:c,addSongsToListenlist:l,setNewListenlist:u,deleteSongInListenlist:d,clearListenlist:f,updatePlayIndex:p,clearPlayIndex:m};return(0,U.jsx)(Xt.Provider,{value:h,children:e})};((...e)=>e.reduce((e,t)=>({children:n})=>(0,U.jsx)(e,{children:(0,U.jsx)(t,{children:n})}),({children:e})=>(0,U.jsx)(U.Fragment,{children:e})))(Zt,Te),(0,xe.createRoot)(document.getElementById(`root`)).render((0,U.jsx)(({children:e})=>(0,U.jsx)(Zt,{children:(0,U.jsx)(Te,{children:e})}),{children:(0,U.jsx)(Ht,{})}));export{$ as a,Z as c,Ce as d,we as f,lt as i,J as l,ht as n,Qe as o,Se as p,mt as r,Q as s,St as t,Ae as u};