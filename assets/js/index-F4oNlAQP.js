const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Listenlist-xOAqFlUx.js","./antd-vendor-DA4fyLID.js","./rolldown-runtime-bYkK8ddJ.js","./react-vendor-Baezdnvl.js","./icons-vendor-C315n0uZ.js","./Home-BBsgImfv.js","./OperatingBarOfSongList-CRtMd6UG.js","./SongItemWithCover-DAiw-ZQD.js","../css/SongItemWithCover-M7Tj_JEU.css","./DataLoadingGuard-igFLMirr.js","./dataService-BqmViCu6.js","./Search-BsNVs_mB.js","./Playlists-Bkx5lAp7.js","./PlaylistView-C2socOay.js","./NewSongs-DlR9bTGS.js","./Artists-DaIxszmS.js","./ArtistView-D07jTX3f.js","./MVPage-DlG6jBZt.js","./Favorites-veeaTeCU.js"])))=>i.map(i=>d[i]);
import{i as e}from"./rolldown-runtime-bYkK8ddJ.js";import{C as t,S as n,_ as r,a as i,b as a,d as o,f as s,g as c,l,m as u,o as d,p as f,r as p,s as m,t as h,u as g,v as _,w as v,x as y,y as b}from"./antd-vendor-DA4fyLID.js";import{a as ee,c as te,i as x,l as S,n as C,o as w,r as T,s as E,t as D}from"./react-vendor-Baezdnvl.js";import{A as O,C as k,D as ne,E as re,N as ie,O as A,S as ae,T as j,_ as oe,b as se,d as ce,f as le,g as ue,i as de,j as fe,l as pe,n as M,o as N,p as me,r as P,t as F,v as I,w as L,x as he}from"./icons-vendor-C315n0uZ.js";import{d as ge,i as R,l as _e,r as ve,t as ye,u as z}from"./dataService-BqmViCu6.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var B=e(v()),be=t(),V=`https://api.injahow.cn/meting/`;function H(e){return U.apply(this,arguments)}function U(){return U=_(function*(e){try{let t=`${V}?${new URLSearchParams({server:`tencent`,type:`song`,pageSize:`20`}).toString()}&keyword=${encodeURIComponent(e)}`,n=yield fetch(t);if(!n.ok)throw Error(`HTTP ${n.status}`);let r=yield n.json();return!Array.isArray(r)||r.length===0?[]:r.map(e=>({newId:`qq_${e.id||e.songid}`,name:e.title||e.name||``,alias:``,artists:[{name:e.author||e.artist||``,id:0}],album:{name:``,cover:``},source:e.url||``,cover:e.pic||e.cover||``,provider:`qq`}))}catch(e){return[]}}),U.apply(this,arguments)}var xe=`https://api.injahow.cn/meting/`;function Se(e){return Ce.apply(this,arguments)}function Ce(){return Ce=_(function*(e){try{let t=`${xe}?${new URLSearchParams({server:`kuwo`,type:`song`,pageSize:`20`}).toString()}&keyword=${encodeURIComponent(e)}`,n=yield fetch(t);if(!n.ok)throw Error(`HTTP ${n.status}`);let r=yield n.json();return!Array.isArray(r)||r.length===0?[]:r.map(e=>({newId:`kw_${e.id||e.songid}`,name:e.title||e.name||``,alias:``,artists:[{name:e.author||e.artist||``,id:0}],album:{name:``,cover:``},source:e.url||``,cover:e.pic||e.cover||``,provider:`kuwo`}))}catch(e){return[]}}),Ce.apply(this,arguments)}var W=D(),we=(0,B.createContext)(),Te=()=>{let e=(0,B.useContext)(we);if(!e)throw Error(`useSearch must be used within a SearchProvider`);return e},Ee=()=>{let{searchStatus:e}=Te();return{searchStatus:e}},De=()=>{let{searchKeyword:e,updateSearchKeyword:t}=Te();return{searchKeyword:e,updateSearchKeyword:t}},Oe=()=>{let{searchResults:e}=Te();return{searchResults:e}},ke=({children:e})=>{let[t,n]=(0,B.useState)(``),[r,i]=(0,B.useState)(`not_searched_yet`),[a,o]=(0,B.useState)({}),[s,c]=(0,B.useState)([]),l=(0,B.useRef)(``),u=(0,B.useRef)(!1);(0,B.useEffect)(()=>{u.current||(u.current=!0,_e().then(e=>c(e)).catch(()=>{}))},[]),(0,B.useEffect)(()=>{t&&t!==l.current&&(l.current=t,d(t))},[t]);let d=function(){var e=_(function*(e){var t,n,r;o({}),i(`searching`);let a={},c=encodeURIComponent(e),[l,u,d,f,p,m]=yield Promise.allSettled([ve(`/api/ss?keyword=${c}`),ve(`/api/s/m/${c}`),ve(`/api/s/k/${c}`),ge(e),H(e),Se(e)]);if(l.status===`fulfilled`&&(t=l.value)!=null&&t.success&&Array.isArray(l.value.data)&&l.value.data.length>0&&(a.aggregated={searchSuccess:!0,data:{songs:l.value.data,totalCount:l.value.data.length}}),u.status===`fulfilled`&&(n=u.value)!=null&&n.success&&Array.isArray(u.value.songs)&&u.value.songs.length>0&&(a.migu={searchSuccess:!0,data:{songs:u.value.songs,totalCount:u.value.songs.length}}),d.status===`fulfilled`&&(r=d.value)!=null&&r.success&&Array.isArray(d.value.songs)&&d.value.songs.length>0&&(a.kugou={searchSuccess:!0,data:{songs:d.value.songs,totalCount:d.value.songs.length}}),f.status===`fulfilled`&&Array.isArray(f.value)&&f.value.length>0&&(a.netease={searchSuccess:!0,data:{songs:f.value,totalCount:f.value.length}}),p.status===`fulfilled`&&Array.isArray(p.value)&&p.value.length>0&&(a.qq={searchSuccess:!0,data:{songs:p.value,totalCount:p.value.length}}),m.status===`fulfilled`&&Array.isArray(m.value)&&m.value.length>0&&(a.kuwo={searchSuccess:!0,data:{songs:m.value,totalCount:m.value.length}}),s.length>0){let t=ye(s,e);if(t.length>0){let e=new Set;for(let t of Object.keys(a)){var h;!((h=a[t])==null||(h=h.data)==null)&&h.songs&&a[t].data.songs.forEach(t=>{t.newId&&e.add(t.newId)})}let n=t.filter(t=>!e.has(t.newId));n.length>0&&(a.local={searchSuccess:!0,data:{songs:n,totalCount:n.length}})}}Object.keys(a).length===0&&(a.local={searchSuccess:!1,data:{songs:[],totalCount:0}}),o(a),i(`done`)});return function(t){return e.apply(this,arguments)}}();return(0,W.jsx)(we.Provider,{value:{searchKeyword:t,searchStatus:r,searchResults:a,updateSearchKeyword:n,clearResults:()=>{o({}),i(`not_searched_yet`)}},children:e})},{Search:Ae}=g;function je(){let e=E(),{keyword:t}=te(),{searchKeyword:n,updateSearchKeyword:r}=De(),[i,a]=(0,B.useState)(``);return(0,B.useEffect)(()=>{t&&a(decodeURIComponent(t))},[t]),(0,W.jsx)(Ae,{value:i,onChange:e=>a(e.target.value),onSearch:t=>{t=t.trim(),t!==``&&(r(t),e(`/search/${encodeURIComponent(t)}`))},enterButton:!0,placeholder:`搜索歌曲、歌手...`,allowClear:!0,style:{width:`100%`}})}var Me=[{key:`/`,label:`首页`},{key:`/new-songs`,label:`新歌`},{key:`/artists`,label:`艺人`},{key:`/mv`,label:`MV`},{key:`/playlists`,label:`歌单`},{key:`/favorites`,label:`收藏`}];function Ne(){let e=w(),t=E(),n=e.pathname===`/`?`/`:`/${e.pathname.split(`/`)[1]}`;return(0,W.jsxs)(`header`,{style:{position:`fixed`,width:`100%`,zIndex:1040,top:0,background:`rgba(18, 18, 18, 0.9)`,backdropFilter:`blur(20px)`,WebkitBackdropFilter:`blur(20px)`,borderBottom:`1px solid rgba(255, 255, 255, 0.06)`},children:[(0,W.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:20,padding:`8px 24px`,maxWidth:1e3,margin:`0 auto`},children:[(0,W.jsxs)(T,{to:`/`,style:{flex:`0 0 auto`,textDecoration:`none`,display:`flex`,alignItems:`center`,gap:10},children:[(0,W.jsx)(`div`,{style:{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg, #FF6B35, #FFA500, #FFD700)`,display:`flex`,alignItems:`center`,justifyContent:`center`,boxShadow:`0 2px 12px rgba(255, 107, 53, 0.3)`},children:(0,W.jsx)(se,{size:19,color:`#fff`})}),(0,W.jsx)(`h1`,{style:{margin:0,fontSize:20,fontWeight:700,background:`linear-gradient(135deg, #FFA500, #FF6B35)`,WebkitBackgroundClip:`text`,WebkitTextFillColor:`transparent`,letterSpacing:`-0.5px`},children:`EchoBeats`})]}),(0,W.jsx)(`div`,{style:{flex:1,maxWidth:500},children:(0,W.jsx)(je,{})})]}),(0,W.jsx)(`div`,{style:{display:`flex`,gap:4,padding:`0 24px 4px`,maxWidth:1e3,margin:`0 auto`},children:Me.map(e=>{let r=n===e.key;return(0,W.jsx)(`button`,{onClick:()=>t(e.key),style:{padding:`8px 18px`,fontSize:14,fontWeight:r?600:400,color:r?`#FFA500`:`#8c8c8c`,background:r?`rgba(255,165,0,0.1)`:`transparent`,border:`none`,borderRadius:8,cursor:`pointer`,transition:`all 0.2s`},onMouseEnter:e=>{r||(e.currentTarget.style.color=`#d9d9d9`,e.currentTarget.style.background=`rgba(255,255,255,0.05)`)},onMouseLeave:e=>{r||(e.currentTarget.style.color=`#8c8c8c`,e.currentTarget.style.background=`transparent`)},children:e.label},e.key)})})]})}function Pe(){let[e,t]=d.useMessage();return[(0,B.useCallback)((t,n,r)=>{e[t]({content:n,style:{position:`fixed`,left:r.clientX,top:r.clientY}})},[e]),t]}var Fe=e=>{let t,n=new Set,r=(e,r)=>{let i=typeof e==`function`?e(t):e;if(!Object.is(i,t)){let e=t;t=(r==null?typeof i!=`object`||!i:r)?i:Object.assign({},t,i),n.forEach(n=>n(t,e))}},i=()=>t,a={setState:r,getState:i,getInitialState:()=>o,subscribe:e=>(n.add(e),()=>n.delete(e))},o=t=e(r,i,a);return a},Ie=(e=>e?Fe(e):Fe),Le=e=>e;function Re(e,t=Le){let n=B.useSyncExternalStore(e.subscribe,B.useCallback(()=>t(e.getState()),[e,t]),B.useCallback(()=>t(e.getInitialState()),[e,t]));return B.useDebugValue(n),n}var G=e=>{let t=Ie(e),n=e=>Re(t,e);return Object.assign(n,t),n},K=(e=>e?G(e):G),ze=K(e=>({isListenlistOpen:!1,setIsListenlistOpen:t=>e({isListenlistOpen:t})})),Be=`listenlist`;function Ve(){try{let e=localStorage.getItem(Be);return e?JSON.parse(e):[]}catch(e){return[]}}function q(e){localStorage.setItem(Be,JSON.stringify(e))}var J=K((e,t)=>({listenlist:Ve(),setListenlist:t=>{q(t),e({listenlist:t})},addSongToListenlist:n=>{let r=[...t().listenlist,n];q(r),e({listenlist:r})},addListToListenlist:n=>{let r=t().listenlist,i=n.filter(e=>r.every(t=>t.newId!==e.newId)),a=r.concat(i);q(a),e({listenlist:a})},clearListenlist:()=>{q([]),e({listenlist:[]})}})),He=`playMode`;function Ue(){try{return localStorage.getItem(He)||`order`}catch(e){return`order`}}function We(e){localStorage.setItem(He,e)}var Y=K(e=>({playMode:Ue(),setPlayMode:t=>{We(t),e({playMode:t})}}));function X(){return Y.getState().playMode}var Ge=`songInPlayer`;function Ke(){try{let e=localStorage.getItem(Ge);return e?JSON.parse(e):null}catch(e){return null}}function qe(e){localStorage.setItem(Ge,JSON.stringify(e))}var Z=K(e=>({songInPlayer:Ke(),setSongInPlayer:t=>{qe(t),e({songInPlayer:t})}})),Je=K(e=>({currentTime:0,setCurrentTime:t=>e({currentTime:t})})),Ye=K(e=>({isOpen:!1,isFloatingOpen:!1,song:null,lyrics:``,isLoading:!1,open:t=>e({isOpen:!0,song:t,lyrics:``,isLoading:!0}),close:()=>e({isOpen:!1,song:null,lyrics:``,isLoading:!1}),setLyrics:t=>e({lyrics:t,isLoading:!1}),toggleFloating:()=>e(e=>({isFloatingOpen:!e.isFloatingOpen})),openFloating:t=>e({isFloatingOpen:!0,song:t,lyrics:``,isLoading:!0}),closeFloating:()=>e({isFloatingOpen:!1})}));function Xe(e){return e<10?`0${e}`:`${e}`}function Ze(e){let t=Math.floor(e),n=Math.floor(t/60),r=t%60;return`${Xe(n)}:${Xe(r)}`}var Qe=`favorites`;function $e(){try{let e=localStorage.getItem(Qe);return e?JSON.parse(e):[]}catch(e){return[]}}function et(e){localStorage.setItem(Qe,JSON.stringify(e))}var Q=K((e,t)=>({favorites:$e(),isFavorite:e=>t().favorites.some(t=>t.newId===e),toggleFavorite:n=>{let r=t().favorites,i=r.findIndex(e=>e.newId===n.newId),a;return a=i>=0?[...r.slice(0,i),...r.slice(i+1)]:[n,...r],et(a),e({favorites:a}),i<0},removeFavorite:n=>{let r=t().favorites.filter(e=>e.newId!==n);et(r),e({favorites:r})}}));function tt({song:e}){let[t,n]=Pe(),r=Q(e=>e.favorites),i=Q(e=>e.toggleFavorite);if(!(e!=null&&e.newId))return(0,W.jsx)(A,{className:`icon`,style:{opacity:.3}});let a=r.some(t=>t.newId===e.newId),o=n=>{i(e)?t(`success`,`已收藏`,n):t(`info`,`已取消收藏`,n)};return(0,W.jsxs)(W.Fragment,{children:[n,a?(0,W.jsx)(A,{className:`icon`,onClick:o,style:{color:`rgb(254, 44, 85)`,fill:`rgb(254, 44, 85)`}}):(0,W.jsx)(A,{className:`icon`,onClick:o})]})}n();var nt=[`children`,`className`];function rt(e){let{children:t,className:n}=e,r=a(e,nt);return(0,W.jsx)(`span`,y(y({className:`cursor-pointer ${n||``}`},r),{},{children:(0,W.jsx)(`svg`,{viewBox:`64 64 896 896`,focusable:`false`,width:`1em`,height:`1em`,fill:`currentColor`,"aria-hidden":`true`,children:t})}))}n();var it=[`className`];function at(e){let{className:t}=e,n=a(e,it);return(0,W.jsx)(rt,y(y({className:t},n),{},{children:(0,W.jsx)(`path`,{d:`M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-80 600c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304zm224 0c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304z`})}))}n();var ot=[`className`];function st(e){let{className:t}=e,n=a(e,ot);return(0,W.jsx)(rt,y(y({className:t},n),{},{children:(0,W.jsx)(`path`,{d:`M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm144.1 454.9L437.7 677.8a8.02 8.02 0 01-12.7-6.5V353.7a8 8 0 0112.7-6.5L656.1 506a7.9 7.9 0 010 12.9z`})}))}function ct({artistName:e}){return(0,W.jsx)(T,{to:`/artist/${encodeURIComponent(e)}`,style:{color:`#bfbfbf`,fontSize:12,transition:`color 0.2s`},onMouseEnter:e=>e.target.style.color=`#FFA500`,onMouseLeave:e=>e.target.style.color=`#bfbfbf`,children:e})}var lt=`#FF6B6B.#FF4E50.#EB5757.#D41872.#FF0844.#FF1493.#FF00FF.#FF69B4.#FF6B9D.#FA709A.#FF9A9E.#FFB199.#FBC2EB.#FECFEF.#FAD0C4.#FF6EC7.#FFA07A.#F2994A.#FC913A.#F9D423.#F2C94C.#FEE140.#EDE574.#E1F5C4.#56AB2F.#A8E063.#38EF7D.#11998E.#C6EA8D.#92FE9D.#00FF87.#05FFA1.#69F0AE.#A8E6CF.#3EECAC.#4ECDC4.#98D8C8.#00C9FF.#30CFD0.#00F2FE.#00FFFF.#00CED1.#60EFFF.#0ED2F7.#B2FEFA.#45B7D1.#4FACFE.#667EEA.#764BA2.#A445B2.#F093FB.#330867.#A18CD1.#B967FF`.split(`.`);function ut(e){if(!e)return 0;let t=0;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t=(t<<5)-t+r,t&=t}return Math.abs(t)}function $(e=``){return lt[ut(e)%lt.length]}n();function dt(e,t){if(!t||!e)return e;let n=t.trim();if(!n)return e;let r=RegExp(`(${n.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)})`,`gi`);return e.split(r).map((e,t)=>r.test(e)?(0,W.jsx)(`mark`,{style:{color:`#FFA500`,background:`rgba(255,165,0,0.15)`,borderRadius:2,padding:`0 1px`},children:e},t):e)}function ft({song:e,highlight:t}){var n;let r=Ye(e=>e.open),i=e.cover?{backgroundImage:`url(${e.cover})`,backgroundSize:`cover`,backgroundPosition:`center`}:{backgroundColor:$(e.newId)},a=()=>{e!=null&&e.newId&&r(e)};return(0,W.jsxs)(`div`,{className:`flex items-center gap-2.5 min-w-0`,children:[(0,W.jsx)(`div`,{className:`w-[42px] h-[42px] rounded-lg flex-shrink-0`,style:y(y({},i),{},{boxShadow:`0 2px 8px rgba(0,0,0,0.3)`,cursor:`pointer`}),onClick:a,title:`查看歌词`}),(0,W.jsxs)(`div`,{className:`flex-1 min-w-0`,children:[(0,W.jsxs)(`div`,{className:`truncate`,style:{fontSize:14,fontWeight:500,lineHeight:1.3,cursor:`pointer`},onClick:a,title:`查看歌词`,children:[t?dt(e.name,t):e.name,e.alias&&(0,W.jsx)(`span`,{style:{fontSize:12,fontStyle:`italic`,marginLeft:6,color:`#8c8c8c`},children:t?dt(e.alias,t):e.alias})]}),(0,W.jsx)(`div`,{className:`flex gap-1.5 items-center`,style:{fontSize:12,lineHeight:1.3,marginTop:1},children:(n=e.artists)==null?void 0:n.map((n,r)=>(0,W.jsxs)(`span`,{children:[t?(0,W.jsx)(`span`,{style:{color:`#bfbfbf`},children:dt(n.name,t)}):(0,W.jsx)(ct,{artistName:n.name}),r<e.artists.length-1&&(0,W.jsx)(`span`,{style:{color:`#595959`,margin:`0 2px`},children:`,`})]},n.id||r))})]})]})}n();function pt(e,t){let n;try{n=e()}catch(e){return}return{getItem:e=>{var r;let i=e=>e===null?null:JSON.parse(e,t==null?void 0:t.reviver),a=(r=n.getItem(e))==null?null:r;return a instanceof Promise?a.then(i):i(a)},setItem:(e,r)=>n.setItem(e,JSON.stringify(r,t==null?void 0:t.replacer)),removeItem:e=>n.removeItem(e)}}var mt=e=>t=>{try{let n=e(t);return n instanceof Promise?n:{then(e){return mt(e)(n)},catch(e){return this}}}catch(e){return{then(e){return this},catch(t){return mt(t)(e)}}}},ht=(e,t)=>(n,r,i)=>{let a=y({storage:pt(()=>window.localStorage),partialize:e=>e,version:0,merge:(e,t)=>y(y({},t),e)},t),o=!1,s=0,c=new Set,l=new Set,u=a.storage;if(!u)return e((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`),n(...e)},r,i);let d=()=>{let e=a.partialize(y({},r()));return u.setItem(a.name,{state:e,version:a.version})},f=i.setState;i.setState=(e,t)=>(f(e,t),d());let p=e((...e)=>(n(...e),d()),r,i);i.getInitialState=()=>p;let m,h=()=>{var e,t;if(!u)return;let i=++s;o=!1,c.forEach(e=>{var t;return e((t=r())==null?p:t)});let f=((t=a.onRehydrateStorage)==null?void 0:t.call(a,(e=r())==null?p:e))||void 0;return mt(u.getItem.bind(u))(a.name).then(e=>{if(e)if(typeof e.version==`number`&&e.version!==a.version){if(a.migrate){let t=a.migrate(e.state,e.version);return t instanceof Promise?t.then(e=>[!0,e]):[!0,t]}console.error(`State loaded from storage couldn't be migrated since no migrate function was provided`)}else return[!1,e.state];return[!1,void 0]}).then(e=>{var t;if(i!==s)return;let[o,c]=e;if(m=a.merge(c,(t=r())==null?p:t),n(m,!0),o)return d()}).then(()=>{i===s&&(f==null||f(r(),void 0),m=r(),o=!0,l.forEach(e=>e(m)))}).catch(e=>{i===s&&(f==null||f(void 0,e))})};return i.persist={setOptions:e=>{a=y(y({},a),e),e.storage&&(u=e.storage)},clearStorage:()=>{u==null||u.removeItem(a.name)},getOptions:()=>a,rehydrate:()=>h(),hasHydrated:()=>o,onHydrate:e=>(c.add(e),()=>{c.delete(e)}),onFinishHydration:e=>(l.add(e),()=>{l.delete(e)})},a.skipHydration||h(),m||p};n();var gt=Date.now(),_t=K(ht((e,t)=>({playlists:[],createPlaylist:n=>{let r={id:String(gt++),name:n,songs:[],createdAt:Date.now()};return e({playlists:[...t().playlists,r]}),r},deletePlaylist:n=>{e({playlists:t().playlists.filter(e=>e.id!==n)})},addSongToPlaylist:(n,r)=>{e({playlists:t().playlists.map(e=>e.id!==n||e.songs.some(e=>e.newId===r.newId)?e:y(y({},e),{},{songs:[...e.songs,r]}))})},removeSongFromPlaylist:(n,r)=>{e({playlists:t().playlists.map(e=>e.id===n?y(y({},e),{},{songs:e.songs.filter(e=>e.newId!==r)}):e)})},renamePlaylist:(n,r)=>{e({playlists:t().playlists.map(e=>e.id===n?y(y({},e),{},{name:r}):e)})}}),{name:`echobeats-playlists`}));function vt({song:e}){let[t,n]=(0,B.useState)(!1),[r,a]=(0,B.useState)(``),{playlists:o,createPlaylist:s,addSongToPlaylist:l}=_t(),u=t=>{e&&(l(t,e),d.success(`已添加到歌单`),n(!1))};return(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(j,{className:`icon`,title:`添加到歌单`,onClick:()=>n(!0)}),(0,W.jsxs)(i,{title:`添加到歌单`,open:t,onCancel:()=>n(!1),footer:null,width:380,children:[(0,W.jsx)(`div`,{style:{marginBottom:16},children:(0,W.jsx)(g.Search,{placeholder:`新建歌单名称`,value:r,onChange:e=>a(e.target.value),onSearch:()=>{let t=r.trim();t&&(l(s(t).id,e),d.success(`已创建歌单「${t}」并添加歌曲`),a(``),n(!1))},enterButton:(0,W.jsx)(c,{type:`primary`,icon:(0,W.jsx)(I,{size:14}),children:`新建`})})}),o.length===0?(0,W.jsx)(`div`,{style:{textAlign:`center`,color:`#8c8c8c`,padding:`24px 0`,fontSize:14},children:`还没有歌单，创建一个吧`}):(0,W.jsx)(m,{dataSource:o,renderItem:e=>(0,W.jsx)(m.Item,{onClick:()=>u(e.id),style:{cursor:`pointer`,padding:`10px 12px`,borderRadius:8,transition:`background 0.15s`},onMouseEnter:e=>{e.currentTarget.style.background=`rgba(255,255,255,0.05)`},onMouseLeave:e=>{e.currentTarget.style.background=`transparent`},children:(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`div`,{style:{fontSize:14,color:`#f0f0f0`},children:e.name}),(0,W.jsxs)(`div`,{style:{fontSize:12,color:`#8c8c8c`,marginTop:2},children:[e.songs.length,` 首歌曲`]})]})})})]})]})}n();function yt(e,t,n,r,i,a){var o;let s=(e==null?void 0:e.cover)||``,c=e?$(e.newId):`#333`,l=((e==null?void 0:e.name)||`未在播放`).replace(/</g,`&lt;`).replace(/'/g,`\\'`),u=((e==null||(o=e.artists)==null?void 0:o.map(e=>e.name).join(`/`))||``).replace(/</g,`&lt;`),d=n?`true`:`false`,f=JSON.stringify(e).replace(/</g,`\\x3c`),p=JSON.stringify(i).replace(/</g,`\\x3c`),m={order:`顺序`,loop:`列表循环`,single:`单曲循环`,shuffle:`随机`}[r]||`顺序`;return`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${l} - EchoBeats</title><style>
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
<\/script></body></html>`}function bt({onRestore:e,onClose:t,onPopout:n}){var r;let i=Z(e=>e.songInPlayer);return i?(0,W.jsxs)(`div`,{style:{background:`rgba(18, 18, 18, 0.95)`,backdropFilter:`blur(16px)`,borderRadius:10,border:`1px solid rgba(255,165,0,0.3)`,padding:`8px 14px`,display:`flex`,alignItems:`center`,gap:10,boxShadow:`0 4px 20px rgba(0,0,0,0.5)`,maxWidth:380,width:`100%`,userSelect:`none`},children:[(0,W.jsx)(`div`,{style:y({width:42,height:42,borderRadius:8,flexShrink:0},i.cover?{backgroundImage:`url(${i.cover})`,backgroundSize:`cover`,backgroundPosition:`center`}:{backgroundColor:$(i.newId)})}),(0,W.jsxs)(`div`,{style:{minWidth:0,flex:1},children:[(0,W.jsx)(`div`,{style:{fontSize:13,fontWeight:600,color:`#f0f0f0`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},children:i.name}),(0,W.jsx)(`div`,{style:{fontSize:11,color:`#8c8c8c`,marginTop:1},children:((r=i.artists)==null?void 0:r.map(e=>e.name).join(`/`))||`未知`})]}),(0,W.jsxs)(`div`,{style:{display:`flex`,gap:4,flexShrink:0},children:[(0,W.jsxs)(`button`,{onClick:n,title:`弹到桌面独立窗口`,style:{background:`rgba(255,165,0,0.1)`,border:`1px solid rgba(255,165,0,0.2)`,borderRadius:6,color:`#FFA500`,cursor:`pointer`,padding:`4px 8px`,display:`flex`,alignItems:`center`,fontWeight:600,fontSize:11,gap:3},children:[(0,W.jsx)(O,{size:13}),` 桌面`]}),(0,W.jsx)(`button`,{onClick:e,title:`恢复播放器`,style:{background:`none`,border:`none`,color:`#FFA500`,cursor:`pointer`,padding:4,display:`flex`,alignItems:`center`},children:(0,W.jsx)(ae,{size:15})}),(0,W.jsx)(`button`,{onClick:t,title:`关闭`,style:{background:`none`,border:`none`,color:`#8c8c8c`,cursor:`pointer`,padding:4,display:`flex`,alignItems:`center`},children:(0,W.jsx)(P,{size:15})})]})]}):null}function xt({onRestore:e,onClose:t,onDesktopOpen:n}){let r=Z(e=>e.songInPlayer),i=Z(e=>e.setSongInPlayer),a=J(e=>e.listenlist),o=Q(e=>e.favorites),s=Q(e=>e.toggleFavorite),c=Y(e=>e.playMode),l=Y(e=>e.setPlayMode),u=(0,B.useRef)(null),d=(0,B.useRef)(null),f=(0,B.useRef)(c);f.current=c;let p=a.filter(e=>e!==null),m=(0,B.useCallback)(()=>p.map(e=>{var t;return{newId:e.newId,name:e.name,artist:((t=e.artists)==null?void 0:t.map(e=>e.name).join(`/`))||``}}),[p]),h=(0,B.useCallback)(_(function*(){if(!r)return;if(u.current){if(`documentPictureInPicture`in window&&u.current instanceof Window&&!u.current.closed){try{u.current.focus()}catch(e){}return}if(!(`documentPictureInPicture`in window)&&!u.current.closed){u.current.focus();return}}n==null||n();let e=d.current;if(!e)try{e=yield z(r.newId)}catch(e){}d.current=e;let t=o.some(e=>e.newId===r.newId),i=m(),a=p.findIndex(e=>e.newId===(r==null?void 0:r.newId)),s=yt(r,e,t,f.current,i,a),c=new Blob([s],{type:`text/html`}),l=URL.createObjectURL(c);if(`documentPictureInPicture`in window)try{let e=yield window.documentPictureInPicture.requestWindow({width:360,height:280});e.document.write(s),e.document.close(),u.current=e,e.addEventListener(`pagehide`,()=>{u.current=null,URL.revokeObjectURL(l)});return}catch(e){}let h=window.open(l,`EchoBeats_Desktop`,`width=360,height=280,left=${window.screen.width-400},top=${window.screen.height-320},resizable=yes,alwaysOnTop=yes,titlebar=no,location=no,toolbar=no,menubar=no,scrollbars=no`);if(!h){URL.revokeObjectURL(l);return}setTimeout(()=>URL.revokeObjectURL(l),3e3),u.current=h}),[r,o,p,m,n]),g=(0,B.useCallback)(()=>{if(!u.current||u.current.closed)return;let e=m(),t=p.findIndex(e=>e.newId===(r==null?void 0:r.newId));try{u.current.postMessage({type:`updatePlaylist`,playlist:e,currentIndex:t},`*`)}catch(e){}},[r,p,m]);return(0,B.useEffect)(()=>{let e=function(){var e=_(function*(e){if(!e.data||!e.data.type)return;let t=e.source;switch(e.data.type){case`prev`:{let e=a.filter(e=>e),n=X(),s=e.findIndex(e=>e.newId===(r==null?void 0:r.newId));if(s<0)break;let c;if(n===`order`||n===`loop`)s>0?c=e[s-1]:n===`loop`&&(c=e[e.length-1]);else if(n===`shuffle`&&e.length>1){let t;do t=Math.floor(Math.random()*e.length);while(t===s);c=e[t]}if(c){i(c);let n;try{n=yield z(c.newId)}catch(e){}let r=o.some(e=>e.newId===c.newId),a=e.findIndex(e=>e.newId===c.newId);t.postMessage({type:`updateSong`,song:c,source:n,playMode:X(),currentIndex:a},`*`);try{t.postMessage({type:`updateFav`,faved:r},`*`)}catch(e){}}break}case`next`:{let e=a.filter(e=>e),n=X(),s=e.findIndex(e=>e.newId===(r==null?void 0:r.newId));if(s<0)break;let c;if(n===`order`)s+1<e.length&&(c=e[s+1]);else if(n===`loop`)c=s+1<e.length?e[s+1]:e[0];else if(n===`shuffle`){if(e.length>1){let t;do t=Math.floor(Math.random()*e.length);while(t===s);c=e[t]}}else n===`single`&&(c=e[s]);if(c){i(c);let n;try{n=yield z(c.newId)}catch(e){}let r=o.some(e=>e.newId===c.newId),a=e.findIndex(e=>e.newId===c.newId);t.postMessage({type:`updateSong`,song:c,source:n,playMode:X(),currentIndex:a},`*`);try{t.postMessage({type:`updateFav`,faved:r},`*`)}catch(e){}}break}case`getSong`:if(r){let e;try{e=yield z(r.newId)}catch(e){}let n=a.filter(e=>e).findIndex(e=>e.newId===(r==null?void 0:r.newId));t.postMessage({type:`updateSong`,song:r,source:e,playMode:X(),currentIndex:n},`*`)}break;case`toggleLike`:{let n=a.find(t=>(t==null?void 0:t.newId)===e.data.newId)||r;if(n){let e=s(n);t.postMessage({type:`updateFav`,faved:e},`*`)}break}case`setPlayMode`:l(e.data.playMode);try{t.postMessage({type:`updatePlayMode`,playMode:e.data.playMode},`*`)}catch(e){}break;case`showPlaylist`:ze.getState().setIsListenlistOpen(!0);break;case`playAtIndex`:{let n=a.filter(e=>e),r=e.data.index;if(r>=0&&r<n.length){let e=n[r];i(e);let a;try{a=yield z(e.newId)}catch(e){}let s=o.some(t=>t.newId===e.newId);t.postMessage({type:`updateSong`,song:e,source:a,playMode:X(),currentIndex:r},`*`);try{t.postMessage({type:`updateFav`,faved:s},`*`)}catch(e){}}break}case`desktopClosed`:u.current=null;break}});return function(t){return e.apply(this,arguments)}}();return window.addEventListener(`message`,e),()=>window.removeEventListener(`message`,e)},[r,a,o,i,s,l]),(0,B.useEffect)(()=>{!u.current||u.current.closed||z(r==null?void 0:r.newId).then(e=>{if(u.current&&!u.current.closed){let t=a.filter(e=>e).findIndex(e=>e.newId===(r==null?void 0:r.newId));u.current.postMessage({type:`updateSong`,song:r,source:e,playMode:X(),currentIndex:t},`*`),u.current.postMessage({type:`updateFav`,faved:o.some(e=>e.newId===(r==null?void 0:r.newId))},`*`)}}).catch(()=>{})},[r==null?void 0:r.newId]),(0,B.useEffect)(()=>{g()},[a,g]),(0,B.useEffect)(()=>{if(!(!u.current||u.current.closed))try{u.current.postMessage({type:`updatePlayMode`,playMode:c},`*`)}catch(e){}},[c]),(0,B.useEffect)(()=>()=>{u.current&&!u.current.closed&&u.current.close()},[]),(0,W.jsxs)(`div`,{style:{position:`fixed`,bottom:74,right:20,zIndex:1100,animation:`slideUp 0.3s ease-out`},children:[(0,W.jsx)(bt,{onRestore:e,onClose:t,onPopout:()=>h()}),(0,W.jsx)(`style`,{children:`@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`})]})}function St(){let[e,t]=(0,B.useState)(!1);return{isMini:e,toggleMini:(0,B.useCallback)(()=>t(e=>!e),[])}}function Ct(){let e=Z(e=>e.songInPlayer),t=Z(e=>e.setSongInPlayer),n=J(e=>e.listenlist).filter(e=>e!==null),i=n.findIndex(t=>t.newId===(e==null?void 0:e.newId)),{isListenlistOpen:a,setIsListenlistOpen:c}=ze(),l=Je(e=>e.setCurrentTime),{isFloatingOpen:m,openFloating:h,closeFloating:g}=Ye(),{isMini:v,toggleMini:y}=St(),[ee,te]=Pe(),[x,S]=(0,B.useState)(!0),[C,w]=(0,B.useState)(!1),[T,E]=(0,B.useState)(``),D=Y(e=>e.playMode),O=Y(e=>e.setPlayMode),[A,ae]=(0,B.useState)(localStorage.getItem(`volume`)?Number(localStorage.getItem(`volume`)):.7),[j,M]=(0,B.useState)(``),[N,P]=(0,B.useState)(``),[F,I]=(0,B.useState)(null),[L,ge]=(0,B.useState)(0),[R,_e]=(0,B.useState)(0),[ve,ye]=(0,B.useState)(0),be=(0,B.useRef)(!1),V=(0,B.useRef)(null),H=(0,B.useRef)(null),U=(0,B.useRef)(!1),xe=(0,B.useRef)(new Map),Se=(0,B.useRef)(!1);(0,B.useEffect)(()=>{if(be.current){if(e!=null&&e.newId){let t=e.newId;V.current&&V.current.currentTime>3&&xe.current.set(t,V.current.currentTime),I(null),P(``),U.current=!1,ye(0),Se.current=!1,w(!0)}}else be.current=!0},[e==null?void 0:e.newId]),(0,B.useEffect)(()=>{F?C?V.current.play().catch(()=>{S(!0)}):V.current.pause():e!=null&&e.newId&&C&&(V.current.pause(),e.source?(I(e.source),M(`success`)):(M(`getting`),E(`Getting source...`),z(e.newId).then(e=>{I(e),M(`success`)}).catch(()=>{M(`failed`),E(`Failed to get source.`),d.info(`无法播放 <${e.name}>`)})))},[F,C,e==null?void 0:e.newId]),(0,B.useEffect)(()=>{V.current.volume=A},[A]);let Ce=(0,B.useCallback)(e=>{if(e.key===` `&&e.target.nodeName===`BODY`){if(e.preventDefault(),e.target.nodeName===`INPUT`)return;V.current.paused?w(!0):w(!1)}},[]);(0,B.useEffect)(()=>{window.addEventListener(`keydown`,Ce)});function we(){E(`Loading media...`)}function Te(){if(!U.current&&e!=null&&e.newId){U.current=!0,E(`Retrying source...`);function t(){return n.apply(this,arguments)}function n(){return n=_(function*(){try{let{success:t,data:n}=yield(yield fetch(`https://tonzhon.whamon.com/api/p/${e.newId}`)).json();if(t&&n){I(n),P(``);return}}catch(e){}try{let t=yield fetch(`/api/p/${e.newId}`);if(t.ok){let e=yield t.json();if(e.success&&e.data){I(e.data),P(``);return}}}catch(e){}try{let t=yield z(e.newId);if(t){I(t),P(``);return}}catch(e){}P(`error`),E(`Media Load Error`),U.current=!1}),n.apply(this,arguments)}t()}else P(`error`),E(`Media Load Error`)}(0,B.useEffect)(()=>{if(N===`error`&&U.current===!1&&D!==`single`){let e=setTimeout(()=>{G()},1500);return()=>clearTimeout(e)}},[N,D]);function Ee(){if(P(`success`),ge(V.current.duration),!Se.current&&e!=null&&e.newId){let t=xe.current.get(e.newId);t&&t<V.current.duration-3&&(V.current.currentTime=t,Se.current=!0)}}function De(){H.current&&clearInterval(H.current),H.current=setInterval(()=>{_e(V.current.currentTime)},1e3),S(!1)}function Oe(){let e=V.current.currentTime;ye(e),l(e)}function ke(){H.current&&clearInterval(H.current),S(!0)}function Ae(){clearInterval(H.current),D===`single`?K():G()}function je(){w(!0)}function Me(){w(!1)}function Ne(e){V.current.currentTime=e,_e(e)}function Fe(t){if(F){let t=document.createElement(`a`);t.href=F,t.download=e!=null&&e.name?`${e.name}.mp3`:`song.mp3`,t.target=`_blank`,t.rel=`noopener noreferrer`,document.body.appendChild(t),t.click(),document.body.removeChild(t)}else ee(`info`,`请先播放`,t)}function Ie(e){V.current.volume=e,ae(e),localStorage.setItem(`volume`,e)}function Le(){(D===`order`||D===`loop`)&&i>0&&t(n[i-1])}function Re(){G()}function G(){if(i>=0){let e=n.length;if(D===`order`)i+1<e&&t(n[i+1]);else if(D===`loop`)i+1<e?t(n[i+1]):t(n[0]);else if(D===`shuffle`&&e>1){let r;do r=Math.floor(Math.random()*e);while(r===i);t(n[r])}}}function K(){V.current.currentTime=0,V.current.play()}function Be(){c(!a)}let Ve=(0,W.jsx)(st,{className:`central-icon-in-player play-icon`,title:`空格键`,onClick:je}),q=(0,W.jsx)(k,{size:40,className:`central-icon-in-player animate-spin`});return(0,W.jsxs)(W.Fragment,{children:[te,(0,W.jsxs)(`div`,{id:`player`,className:`fixed`,children:[(0,W.jsx)(`audio`,{ref:V,src:F,onLoadStart:we,onError:Te,onLoadedData:Ee,onPlay:De,onTimeUpdate:Oe,onPause:ke,onEnded:Ae}),N===`success`&&(0,W.jsx)(b,{theme:{components:{Slider:{railSize:2,colorPrimaryBorder:`orange`,colorPrimaryBorderHover:`orange`,colorBgElevated:`orange`,handleSize:12,handleSizeHover:12,handleLineWidth:0,handleLineWidthHover:0,colorFillSecondary:`#8c8c8c`}}},children:(0,W.jsx)(f,{min:0,max:L?parseInt(L):0,value:R,tooltip:{open:!1},onChange:Ne,style:{margin:0,height:`auto`}})}),(0,W.jsx)(`div`,{id:`below-progress-slider`,children:(0,W.jsxs)(p,{id:`main-row`,align:`middle`,justify:`space-around`,style:{height:`44px`},children:[(0,W.jsx)(u,{span:7,children:e&&(0,W.jsx)(ft,{song:e})}),(0,W.jsx)(u,{span:3,children:(0,W.jsxs)(p,{justify:`space-between`,children:[(0,W.jsx)(u,{children:(0,W.jsx)(tt,{song:e})}),(0,W.jsx)(u,{children:(0,W.jsx)(vt,{song:e,disabled:!e})}),(0,W.jsx)(u,{children:(0,W.jsx)(fe,{className:`icon`,onClick:Fe})})]})}),(0,W.jsxs)(u,{span:4,style:{display:`flex`,alignItems:`center`,justifyContent:`center`},children:[(0,W.jsx)(le,{className:`icon`,onClick:Le}),j===``?Ve:j===`getting`?q:j===`success`?N===`error`?(0,W.jsx)(ie,{size:40,className:`central-icon-in-player error-icon-in-player`}):N===`success`?x?Ve:(0,W.jsx)(at,{className:`central-icon-in-player pause-icon`,title:`空格键`,onClick:Me}):q:(0,W.jsx)(pe,{size:40,className:`central-icon-in-player error-icon-in-player`}),(0,W.jsx)(ce,{className:`icon`,onClick:Re})]}),(0,W.jsx)(u,{span:10,children:(0,W.jsxs)(p,{justify:`space-between`,children:[(0,W.jsx)(u,{children:(0,W.jsx)(o,{menu:{items:[{key:`order`,icon:(0,W.jsx)(re,{style:{fontSize:20}}),label:`顺序`},{key:`loop`,icon:(0,W.jsx)(ue,{style:{fontSize:20}}),label:`列表循环`},{key:`single`,icon:(0,W.jsx)(oe,{style:{fontSize:20}}),label:`单曲重复`},{key:`shuffle`,icon:(0,W.jsx)(me,{style:{fontSize:20}}),label:`随机`}],onClick:({key:e})=>{O(e)}},placement:`top`,children:{order:(0,W.jsx)(re,{className:`unclickable-icon`}),loop:(0,W.jsx)(ue,{className:`unclickable-icon`}),single:(0,W.jsx)(oe,{className:`unclickable-icon`}),shuffle:(0,W.jsx)(me,{className:`unclickable-icon`})}[D]})}),(0,W.jsx)(u,{children:(0,W.jsxs)(s,{size:2,children:[(0,W.jsx)(de,{className:`unclickable-icon`}),(0,W.jsx)(b,{theme:{components:{Slider:{colorFillTertiary:`#d9d9d9`,colorFillSecondary:`#f5f5f5`}}},children:(0,W.jsx)(f,{min:0,max:1,step:.01,defaultValue:A,onChange:Ie,style:{width:100,margin:0}})})]})}),(0,W.jsx)(u,{children:(0,W.jsx)(he,{className:v?`icon is-on`:`icon`,title:`最小化`,onClick:y})}),(0,W.jsx)(u,{children:(0,W.jsx)(se,{className:m?`icon is-on`:`icon`,title:`浮动歌词`,onClick:()=>{m?g():h(e)}})}),(0,W.jsx)(u,{children:(0,W.jsx)(r,{count:`${i+1} / ${n.length}`,size:`small`,offset:[15,0],style:{backgroundColor:`orange`},children:(0,W.jsx)(ne,{className:a?`icon is-on`:`icon`,onClick:Be})})}),(0,W.jsx)(u,{id:`time-in-player`,children:N===`success`?(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`span`,{children:Ze(R)}),(0,W.jsxs)(`span`,{children:[` / `,Ze(L)]})]}):T})]})})]})})]}),v&&(0,W.jsx)(xt,{onRestore:y,onClose:y,onDesktopOpen:()=>w(!1)})]})}var wt={ui:(0,W.jsx)(L,{className:`animate-spin`,size:30,color:`#FFA500`}),data:(0,W.jsx)(k,{className:`animate-spin`,size:30,color:`#FFA500`})};function Tt({kind:e=`ui`}){return(0,W.jsx)(`div`,{className:`flex justify-center items-center`,style:{padding:`40px 0`},children:wt[e]})}var Et=(0,B.lazy)(()=>S(()=>import(`./Listenlist-xOAqFlUx.js`),__vite__mapDeps([0,1,2,3,4]),import.meta.url));function Dt(){let e=J(e=>e.listenlist),t=J(e=>e.clearListenlist),n=Z(e=>{var t;return(t=e.songInPlayer)==null?void 0:t.newId}),r=ze(e=>e.setIsListenlistOpen),i=(0,B.useRef)(),a=(0,B.useCallback)(()=>{let t=e.findIndex(e=>e.newId===n);t>4&&(i.current.scrollTop=(t-4)*36)},[e,n]);return(0,W.jsxs)(`div`,{className:`fixed w-80 right-[6vw] top-[90px] bg-[#1a1a1a] bottom-[68px] rounded-xl overflow-hidden z-[1050]`,style:{border:`1px solid rgba(255,255,255,0.1)`,boxShadow:`0 8px 40px rgba(0,0,0,0.5)`},children:[(0,W.jsxs)(`div`,{className:`flex items-center justify-between gap-2 px-4 py-3 w-full`,style:{borderBottom:`1px solid rgba(255,255,255,0.06)`},children:[(0,W.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,W.jsx)(`strong`,{style:{fontSize:15},children:`聆听列表`}),(0,W.jsx)(`span`,{style:{fontSize:12,color:`#8c8c8c`,background:`rgba(255,255,255,0.08)`,padding:`1px 8px`,borderRadius:10},children:e.filter(e=>e!==null).length})]}),(0,W.jsxs)(`div`,{className:`flex gap-2`,children:[(0,W.jsx)(c,{size:`small`,onClick:a,children:`定位当前`}),(0,W.jsx)(c,{size:`small`,onClick:t,children:`清空`}),(0,W.jsx)(c,{size:`small`,type:`text`,icon:(0,W.jsx)(P,{size:14}),onClick:()=>r(!1),style:{color:`#8c8c8c`}})]})]}),(0,W.jsx)(`div`,{className:`h-[calc(100%-52px)] overflow-auto w-full`,ref:i,children:(0,W.jsx)(B.Suspense,{fallback:(0,W.jsx)(Tt,{}),children:(0,W.jsx)(Et,{songs:e,newIdOfCurrentSong:n})})})]})}n();function Ot(){var e;let{isOpen:t,song:n,lyrics:r,isLoading:i,close:a,setLyrics:o}=Ye(),s=Z(e=>e.songInPlayer),c=(0,B.useRef)(null),l=(0,B.useRef)(null);(0,B.useEffect)(()=>{let e=t&&s?s:n;t&&e&&e.newId!==l.current&&(l.current=e.newId,R(e).then(e=>{o(e.plainLyrics||e.syncedLyrics||`暂无歌词`)}).catch(()=>{o(`暂无歌词`)}))},[t,n==null?void 0:n.newId,s==null?void 0:s.newId]),(0,B.useEffect)(()=>{if(!t)return;let e=e=>{e.key===`Escape`&&a()};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)},[t,a]);let u=t&&s?s:n;if(!t||!u)return null;let d=u.cover?{backgroundImage:`url(${u.cover})`}:{backgroundColor:$(u.newId)},f=((e=u.artists)==null?void 0:e.map(e=>e.name).join(` / `))||`未知艺人`,p=r.split(`
`).filter(e=>e.trim());return(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`div`,{onClick:a,style:{position:`fixed`,inset:0,zIndex:1050,background:`rgba(0, 0, 0, 0.5)`,backdropFilter:`blur(4px)`}}),(0,W.jsxs)(`div`,{ref:c,style:{position:`fixed`,top:0,right:0,width:420,maxWidth:`90vw`,height:`100vh`,zIndex:1060,background:`rgba(24, 24, 24, 0.95)`,backdropFilter:`blur(24px)`,borderLeft:`1px solid rgba(255, 255, 255, 0.08)`,display:`flex`,flexDirection:`column`,animation:`slideInRight 0.3s ease-out`},children:[(0,W.jsx)(`div`,{style:y(y({position:`absolute`,inset:0},d),{},{backgroundSize:`cover`,backgroundPosition:`center`,opacity:.08,filter:`blur(10px)`,zIndex:-1})}),(0,W.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,padding:`16px 20px`,borderBottom:`1px solid rgba(255, 255, 255, 0.06)`,flexShrink:0},children:[(0,W.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:10},children:[(0,W.jsx)(se,{size:18,color:`#FFA500`}),(0,W.jsx)(`span`,{style:{fontSize:15,fontWeight:600,color:`#f0f0f0`},children:`歌词`})]}),(0,W.jsx)(`button`,{onClick:a,style:{background:`none`,border:`none`,color:`#8c8c8c`,cursor:`pointer`,padding:4,borderRadius:6,display:`flex`,alignItems:`center`,justifyContent:`center`},onMouseEnter:e=>{e.currentTarget.style.color=`#fff`,e.currentTarget.style.background=`rgba(255,255,255,0.08)`},onMouseLeave:e=>{e.currentTarget.style.color=`#8c8c8c`,e.currentTarget.style.background=`transparent`},children:(0,W.jsx)(P,{size:20})})]}),(0,W.jsxs)(`div`,{style:{padding:`20px 20px 16px`,display:`flex`,alignItems:`center`,gap:14,flexShrink:0},children:[(0,W.jsx)(`div`,{style:y(y({width:64,height:64,borderRadius:12,flexShrink:0},d),{},{backgroundSize:`cover`,backgroundPosition:`center`,boxShadow:`0 4px 16px rgba(0,0,0,0.4)`})}),(0,W.jsxs)(`div`,{style:{minWidth:0},children:[(0,W.jsx)(`div`,{style:{fontSize:16,fontWeight:600,color:`#f0f0f0`,marginBottom:4,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},children:u.name}),(0,W.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:6},children:[(0,W.jsx)(N,{size:13,color:`#8c8c8c`}),(0,W.jsx)(`span`,{style:{fontSize:13,color:`#8c8c8c`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},children:f})]})]})]}),(0,W.jsx)(`div`,{style:{flex:1,overflowY:`auto`,padding:`0 20px 30px`},children:i?(0,W.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`center`,padding:40,gap:8,color:`#8c8c8c`},children:[(0,W.jsx)(L,{size:18,style:{animation:`spin 1s linear infinite`}}),(0,W.jsx)(`span`,{style:{fontSize:14},children:`加载歌词中...`})]}):p.length>0?(0,W.jsx)(`div`,{children:p.map((e,t)=>/^\[.*\]$/.test(e.trim())?null:(0,W.jsx)(`div`,{style:{padding:`10px 0`,fontSize:15,lineHeight:1.8,color:`#bfbfbf`,borderBottom:`1px solid rgba(255, 255, 255, 0.03)`,transition:`color 0.2s`},onMouseEnter:e=>{e.currentTarget.style.color=`#fff`},onMouseLeave:e=>{e.currentTarget.style.color=`#bfbfbf`},children:e},t))}):(0,W.jsx)(`div`,{style:{textAlign:`center`,padding:40,color:`#8c8c8c`,fontSize:14},children:`暂无歌词`})})]}),(0,W.jsx)(`style`,{children:`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `})]})}var kt=14,At=36,jt=22;function Mt(e){if(!e)return[];let t=e.split(`
`),n=[],r=/\[(\d{2}):(\d{2})\.(\d{2,3})\]/;for(let e of t){let t=e.match(r);if(t){let i=parseInt(t[1],10),a=parseInt(t[2],10),o=parseInt(t[3],10),s=i*60+a+o/(t[3].length===2?100:1e3),c=e.replace(r,``).trim();c&&n.push({time:s,text:c})}}return n.sort((e,t)=>e.time-t.time)}function Nt(){var e;let{isFloatingOpen:t,song:n,lyrics:r,setLyrics:i}=Ye(),a=Je(e=>e.currentTime),o=Z(e=>e.songInPlayer),[s,c]=(0,B.useState)([]),[l,u]=(0,B.useState)(-1),[d,f]=(0,B.useState)(()=>{let e=localStorage.getItem(`lyricsFontSize`);return e?Number(e):jt}),p=(0,B.useRef)(null),m=(0,B.useRef)(null),h=(0,B.useRef)(!1),g=(0,B.useRef)(0),_=(0,B.useRef)(jt),v=(0,B.useRef)(null);(0,B.useEffect)(()=>{let e=t&&o?o:n;t&&e&&e.newId!==v.current&&(v.current=e.newId,c([]),u(-1),R(e).then(e=>{let t=typeof e==`string`?e:e.plainLyrics,n=typeof e==`string`?``:e.syncedLyrics;n?(c(Mt(n)),i(n)):i(t||``)}).catch(()=>{i(``)}))},[t,n==null?void 0:n.newId,o==null?void 0:o.newId]),(0,B.useEffect)(()=>{if(!t||s.length===0)return;function e(){let t=-1;for(let e=s.length-1;e>=0;e--)if(a>=s[e].time){t=e;break}u(t),p.current=requestAnimationFrame(e)}return p.current=requestAnimationFrame(e),()=>{p.current&&cancelAnimationFrame(p.current)}},[t,s,a]);let y=(0,B.useCallback)(e=>{e.preventDefault(),h.current=!0,g.current=e.clientY,_.current=d,document.body.style.cursor=`ns-resize`,document.body.style.userSelect=`none`},[d]);(0,B.useEffect)(()=>{let e=e=>{if(!h.current)return;let t=g.current-e.clientY,n=Math.round(_.current+t/8),r=Math.min(At,Math.max(kt,n));f(r),localStorage.setItem(`lyricsFontSize`,r)},t=()=>{h.current&&(h.current=!1,document.body.style.cursor=``,document.body.style.userSelect=``)};return window.addEventListener(`mousemove`,e),window.addEventListener(`mouseup`,t),()=>{window.removeEventListener(`mousemove`,e),window.removeEventListener(`mouseup`,t)}},[]);let b=(0,B.useCallback)(e=>{e.touches.length===1&&(h.current=!0,g.current=e.touches[0].clientY,_.current=d)},[d]);(0,B.useEffect)(()=>{let e=e=>{if(!h.current)return;let t=g.current-e.touches[0].clientY,n=Math.round(_.current+t/8),r=Math.min(At,Math.max(kt,n));f(r),localStorage.setItem(`lyricsFontSize`,r)},t=()=>{h.current=!1};return window.addEventListener(`touchmove`,e,{passive:!0}),window.addEventListener(`touchend`,t),()=>{window.removeEventListener(`touchmove`,e),window.removeEventListener(`touchend`,t)}},[]);let ee=()=>{let e=Math.min(At,d+2);f(e),localStorage.setItem(`lyricsFontSize`,e)},te=()=>{let e=Math.max(kt,d-2);f(e),localStorage.setItem(`lyricsFontSize`,e)},x=t&&o?o:n;if(!t||!x)return null;let S=s.length>0,C=S&&l>0?s[l-1]:null,w=S&&l>=0?s[l]:null,T=S&&l<s.length-1?s[l+1]:null,E=!S&&r?r.split(`
`).filter(e=>e.trim()&&!/^\[.*\]$/.test(e.trim())):[],D=d,O=Math.round(d*.72),k=d/jt;return(0,W.jsx)(`div`,{style:{position:`fixed`,bottom:74,left:0,right:0,zIndex:1e3,display:`flex`,justifyContent:`center`,padding:`0 16px`},children:(0,W.jsxs)(`div`,{ref:m,style:{background:`rgba(0, 0, 0, 0.55)`,backdropFilter:`blur(16px)`,borderRadius:16,padding:`${Math.round(10*k)}px ${Math.round(20*k)}px`,maxWidth:Math.round(600*k),width:`100%`,textAlign:`center`,border:`1px solid rgba(255, 255, 255, 0.06)`,transition:`padding 0.2s, max-width 0.2s`},children:[(0,W.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`center`,gap:6,marginBottom:Math.round(6*k)},children:[(0,W.jsx)(se,{size:Math.round(11*k),color:`#FFA500`}),(0,W.jsxs)(`span`,{style:{fontSize:Math.round(10*k),color:`#8c8c8c`,fontWeight:500},children:[x.name,` - `,((e=x.artists)==null?void 0:e.map(e=>e.name).join(`/`))||`未知`]}),(0,W.jsxs)(`div`,{style:{display:`flex`,gap:2,marginLeft:8,pointerEvents:`auto`},children:[(0,W.jsx)(`button`,{onClick:te,style:{background:`rgba(255,255,255,0.08)`,border:`none`,borderRadius:4,cursor:`pointer`,display:`flex`,alignItems:`center`,padding:2,color:`#8c8c8c`},onMouseEnter:e=>{e.currentTarget.style.color=`#fff`,e.currentTarget.style.background=`rgba(255,255,255,0.15)`},onMouseLeave:e=>{e.currentTarget.style.color=`#8c8c8c`,e.currentTarget.style.background=`rgba(255,255,255,0.08)`},title:`缩小字体`,children:(0,W.jsx)(F,{size:Math.round(12*k)})}),(0,W.jsx)(`button`,{onClick:ee,style:{background:`rgba(255,255,255,0.08)`,border:`none`,borderRadius:4,cursor:`pointer`,display:`flex`,alignItems:`center`,padding:2,color:`#8c8c8c`},onMouseEnter:e=>{e.currentTarget.style.color=`#fff`,e.currentTarget.style.background=`rgba(255,255,255,0.15)`},onMouseLeave:e=>{e.currentTarget.style.color=`#8c8c8c`,e.currentTarget.style.background=`rgba(255,255,255,0.08)`},title:`放大字体`,children:(0,W.jsx)(M,{size:Math.round(12*k)})})]}),(0,W.jsx)(`span`,{style:{fontSize:10,color:`rgba(255,255,255,0.2)`,marginLeft:4},children:`拖动歌词区域缩放`})]}),(0,W.jsx)(`div`,{onMouseDown:y,onTouchStart:b,style:{cursor:`ns-resize`,minHeight:60},children:S?(0,W.jsxs)(`div`,{children:[C&&(0,W.jsx)(`div`,{style:{fontSize:O,color:`rgba(255,255,255,0.3)`,transition:`all 0.3s`,lineHeight:1.7,marginBottom:2},children:C.text}),w&&(0,W.jsx)(`div`,{style:{fontSize:D,fontWeight:700,color:`#FFA500`,transition:`all 0.3s`,textShadow:`0 0 12px rgba(255,165,0,0.4)`,lineHeight:1.5,padding:`2px 0`},children:w.text}),T&&(0,W.jsx)(`div`,{style:{fontSize:O,color:`rgba(255,255,255,0.3)`,transition:`all 0.3s`,lineHeight:1.7,marginTop:2},children:T.text}),!w&&!C&&T&&(0,W.jsx)(`div`,{style:{fontSize:O,color:`rgba(255,255,255,0.3)`,lineHeight:1.7},children:T.text})]}):E.length>0?(0,W.jsx)(`div`,{style:{maxHeight:120,overflow:`hidden`},children:E.slice(0,4).map((e,t)=>(0,W.jsx)(`div`,{style:{fontSize:O,color:`rgba(255,255,255,0.4)`,lineHeight:1.7},children:e},t))}):(0,W.jsx)(`div`,{style:{fontSize:O,color:`rgba(255,255,255,0.25)`,padding:`6px 0`},children:`暂无歌词`})})]})})}var Pt=class extends B.Component{constructor(e){super(e),this.state={hasError:!1}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,t){console.error(`ErrorBoundary caught an error:`,e,t)}render(){return this.state.hasError?(0,W.jsxs)(`div`,{style:{padding:`40px 20px`,textAlign:`center`,backgroundColor:`#f5f5f5`,borderRadius:`8px`,margin:`20px`},children:[(0,W.jsx)(`h3`,{style:{color:`#ff4d4f`,marginBottom:`16px`},children:`页面出现了错误`}),(0,W.jsx)(`p`,{style:{color:`#666`,marginBottom:`20px`},children:`抱歉，遇到了一些问题。请尝试刷新页面。`}),(0,W.jsx)(`button`,{onClick:()=>window.location.reload(),style:{padding:`8px 16px`,backgroundColor:`#1890ff`,color:`white`,border:`none`,borderRadius:`4px`,cursor:`pointer`},children:`刷新页面`})]}):this.props.children}},Ft=(0,B.lazy)(()=>S(()=>import(`./Home-BBsgImfv.js`),__vite__mapDeps([5,1,2,3,4,6,7,8,9,10]),import.meta.url)),It=(0,B.lazy)(()=>S(()=>import(`./Search-BsNVs_mB.js`),__vite__mapDeps([11,1,2,3,4,6,7,8]),import.meta.url)),Lt=(0,B.lazy)(()=>S(()=>import(`./Playlists-Bkx5lAp7.js`),__vite__mapDeps([12,1,2,3,4]),import.meta.url)),Rt=(0,B.lazy)(()=>S(()=>import(`./PlaylistView-C2socOay.js`),__vite__mapDeps([13,1,2,3,4,7,8]),import.meta.url)),zt=(0,B.lazy)(()=>S(()=>import(`./NewSongs-DlR9bTGS.js`),__vite__mapDeps([14,1,2,3,4,6,7,8,9,10]),import.meta.url)),Bt=(0,B.lazy)(()=>S(()=>import(`./Artists-DaIxszmS.js`),__vite__mapDeps([15,1,2,3,4,9,10]),import.meta.url)),Vt=(0,B.lazy)(()=>S(()=>import(`./ArtistView-D07jTX3f.js`),__vite__mapDeps([16,1,2,3,4,6,7,8,9,10]),import.meta.url)),Ht=(0,B.lazy)(()=>S(()=>import(`./MVPage-DlG6jBZt.js`),__vite__mapDeps([17,1,2,3,4]),import.meta.url)),Ut=(0,B.lazy)(()=>S(()=>import(`./Favorites-veeaTeCU.js`),__vite__mapDeps([18,1,2,3,4,6,7,8]),import.meta.url)),{Content:Wt}=l;function Gt(){let e=ze(e=>e.isListenlistOpen);return(0,W.jsx)(Pt,{children:(0,W.jsx)(C,{children:(0,W.jsx)(b,{theme:{algorithm:h.darkAlgorithm,token:{colorPrimary:`#FFA500`,colorLink:`#ffffff`,colorLinkHover:`orange`},components:{Menu:{itemPaddingInline:10}}},children:(0,W.jsxs)(l,{children:[(0,W.jsx)(Ne,{}),(0,W.jsx)(Wt,{className:`container`,style:{marginTop:90,marginBottom:74},children:(0,W.jsx)(B.Suspense,{fallback:(0,W.jsx)(Tt,{}),children:(0,W.jsxs)(ee,{children:[(0,W.jsx)(x,{path:`/`,element:(0,W.jsx)(Ft,{})}),(0,W.jsx)(x,{path:`search/:keyword`,element:(0,W.jsx)(It,{})}),(0,W.jsx)(x,{path:`playlists`,element:(0,W.jsx)(Lt,{})}),(0,W.jsx)(x,{path:`playlist/:id`,element:(0,W.jsx)(Rt,{})}),(0,W.jsx)(x,{path:`new-songs`,element:(0,W.jsx)(zt,{})}),(0,W.jsx)(x,{path:`artists`,element:(0,W.jsx)(Bt,{})}),(0,W.jsx)(x,{path:`artist/:name`,element:(0,W.jsx)(Vt,{})}),(0,W.jsx)(x,{path:`mv`,element:(0,W.jsx)(Ht,{})}),(0,W.jsx)(x,{path:`favorites`,element:(0,W.jsx)(Ut,{})})]})})}),(0,W.jsx)(Ct,{}),e&&(0,W.jsx)(Dt,{}),(0,W.jsx)(Ot,{}),(0,W.jsx)(Nt,{})]})})})})}var Kt={LISTENLIST:`listenlist`,PLAY_INDEX:`playIndex`,PLAY_MODE:`playMode`,VOLUME:`volume`},qt=(e,t=null)=>{try{let n=localStorage.getItem(e);if(n===null)return t;try{return JSON.parse(n)}catch(e){return n}}catch(n){return console.warn(`Failed to get item from localStorage: ${e}`,n),t}},Jt=(e,t)=>{try{let n=typeof t==`string`?t:JSON.stringify(t);return localStorage.setItem(e,n),!0}catch(t){return console.warn(`Failed to set item in localStorage: ${e}`,t),!1}},Yt=()=>qt(Kt.LISTENLIST,[]),Xt=e=>Jt(Kt.LISTENLIST,e),Zt=()=>{let e=qt(Kt.PLAY_INDEX,0);return typeof e==`number`?e:parseInt(e)||0},Qt=e=>Jt(Kt.PLAY_INDEX,e.toString()),$t=(0,B.createContext)(),en=({children:e})=>{let[t,n]=(0,B.useState)(()=>Yt()),[r,i]=(0,B.useState)(()=>Zt()),a=t[r],o=e=>{Xt(e)},s=e=>{Qt(e)},c=e=>{n(t=>{if(t.some(t=>t.newId===e.newId))return t;let n=[...t,e];return o(n),n})},l=e=>{n(t=>{let n=e.filter(e=>t.every(t=>t.newId!==e.newId)),r=t.concat(n);return o(r),r})},u=e=>{n(e),o(e)},d=e=>{n(t=>{let n=[...t];return n.splice(e,1),o(n),n})},f=()=>{n([]),o([])},p=e=>{i(e),s(e)},m=()=>{i(0),s(0)};(0,B.useEffect)(()=>{s(r)},[r]);let h={listenlist:t,playIndex:r,currentSong:a,addSongToListenlist:c,addSongsToListenlist:l,setNewListenlist:u,deleteSongInListenlist:d,clearListenlist:f,updatePlayIndex:p,clearPlayIndex:m};return(0,W.jsx)($t.Provider,{value:h,children:e})};((...e)=>e.reduce((e,t)=>({children:n})=>(0,W.jsx)(e,{children:(0,W.jsx)(t,{children:n})}),({children:e})=>(0,W.jsx)(W.Fragment,{children:e})))(en,ke),(0,be.createRoot)(document.getElementById(`root`)).render((0,W.jsx)(({children:e})=>(0,W.jsx)(en,{children:(0,W.jsx)(ke,{children:e})}),{children:(0,W.jsx)(Gt,{})}));export{$ as a,Z as c,De as d,Oe as f,ft as i,J as l,vt as n,tt as o,Ee as p,_t as r,Q as s,Tt as t,Pe as u};