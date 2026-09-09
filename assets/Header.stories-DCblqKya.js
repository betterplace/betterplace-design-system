import{j as t}from"./jsx-runtime-u17CrQMm.js";import{d as s}from"./de-h_yTXPdl.js";import{c as w,s as m,U as E,d as v}from"./UserInfo-CYRxmeYv.js";import{c as C}from"./compiler-runtime-BztlXLJS.js";import{c as f}from"./index-CL1aUomK.js";import{I as O}from"./Icon-x1z4PGh0.js";import{D as I,a as R,L as B}from"./shared-NThfFsP-.js";import{L as y}from"./LoadingSkeleton-Bt8Cqyca.js";import{r as i}from"./iframe-K_OwPEhI.js";import{H as A}from"./HeaderCompact-D2bqZzvJ.js";import{C as S}from"./ClientIconButton-BBWZeyUb.js";import{K as b}from"./keys-CVJCkmxv.js";import{u as q}from"./useIsMounted-EdiWN4I5.js";import"./Dropdown-Bypyt0dJ.js";import"./Popup-BCTiY446.js";import"./index-CQksqrAn.js";import"./index-DxRQN4t8.js";import"./PopupContext-Bx01joXm.js";import"./Select.module-Tq86kHSN.js";import"./getSafeImageSource-Cxzf-dtT.js";import"./PopupArrow-BtuZjME9.js";import"./TextLink-Bnp40fj4.js";import"./preload-helper-PPVm8Dsz.js";import"./orga-logo-BQDA8B0I.js";import"./preventDefault-M1KdZT7V.js";import"./Button-CzNMfbNq.js";function D(a){const e=C.c(9),{text:n,Link:u}=a,l=u===void 0?I:u,o=n.loginUrl;let p;e[0]===Symbol.for("react.memo_cache_sentinel")?(p=f(w.navigationLink,m.trigger,m.loginLink),e[0]=p):p=e[0];let h;e[1]===Symbol.for("react.memo_cache_sentinel")?(h=t.jsx(O,{name:"user",color:"fg-content-primary",className:m.icon,size:"400"}),e[1]=h):h=e[1];let r;e[2]!==n.label?(r=t.jsx("span",{className:m.label,children:n.label}),e[2]=n.label,e[3]=r):r=e[3];let c;return e[4]!==l||e[5]!==r||e[6]!==n.label||e[7]!==n.loginUrl?(c=t.jsx("div",{className:m.login,children:t.jsxs(l,{href:o,className:p,title:n.label,"aria-label":n.label,prefetch:!1,children:[h,r]})}),e[4]=l,e[5]=r,e[6]=n.label,e[7]=n.loginUrl,e[8]=c):c=e[8],c}function K(){const a=C.c(1);let e;return a[0]===Symbol.for("react.memo_cache_sentinel")?(e=t.jsxs("div",{className:f(m.trigger,m.login,w.navigationLink),children:[t.jsx(y,{className:m.image,width:"40px",height:"40px",borderRadius:"100%"}),t.jsx(y,{className:m.label,height:"28px",width:"164px"})]}),a[0]=e):e=a[0],e}const M="_links_5flc4_1",H="_linkItem_5flc4_12",$="_search_5flc4_35",z="_searchOpen_5flc4_46",g={links:M,linkItem:H,search:$,searchOpen:z},T="_form_1i53q_1",F="_inputContainer_1i53q_7",G="_resetButton_1i53q_17",J="_open_1i53q_29",Q="_input_1i53q_7",V="_searchButton_1i53q_56",x={form:T,inputContainer:F,resetButton:G,open:J,input:Q,searchButton:V};function W({text:{url:a,label:e,placeholder:n},onShowSearch:u,onHideSearch:l,open:o,className:p}){const h=i.useRef(null),r=i.useRef(null),c=q();i.useEffect(()=>{!o||!r.current||r.current.focus()},[o]);const L=i.useCallback(d=>{if(d.key===b.Enter||d.key===b.Space||d.key===b.Space)return l?.()},[l]),P=i.useCallback(()=>{l?.()},[l]),U=i.useCallback(d=>{d.key===b.Escape&&l?.()},[l]),N=i.useCallback(d=>{c&&(o||(u?.(),d.preventDefault()),r.current?.value||d.preventDefault())},[c,u,o]);return t.jsxs("form",{action:a,method:"POST",ref:h,className:f(x.form,p),children:[t.jsxs("div",{className:f(x.inputContainer,{[x.open]:o}),children:[t.jsx("input",{onKeyUp:U,name:"query",placeholder:n,"aria-label":n,ref:r,id:"header-search-input",className:x.input,tabIndex:o?0:-1}),t.jsx(S,{type:"reset",iconName:"x",onClick:P,onKeyUp:L,className:x.resetButton,tabIndex:o?0:-1,kind:"plain","aria-label":"Reset"})]}),t.jsx(S,{size:"large",type:"submit",iconName:"search",disabled_:!c,onClick:N,className:x.searchButton,title:e,children:t.jsx("span",{className:"sr-only",children:e})})]})}function X({Link:a=I,Image:e=R,children:n,text:{links:u,searchLabel:l,searchPlaceholder:o,searchUrl:p,...h}}){const[r,c]=i.useState(!1),L=i.useCallback(()=>c(!0),[]),P=i.useCallback(()=>c(!1),[]);return t.jsxs(A,{Link:a,Image:e,text:h,hideClaim:r,className:f({[g.searchOpen]:r,[g.searchClosed]:!r}),children:[t.jsx("ul",{className:g.links,children:u.map((U,N)=>t.jsx("li",{className:g.linkItem,children:t.jsx(B,{Link:a,"data-axe-expect":"color-contrast",className:f(w.navigationLink,w.headerLink),...U})},N))}),n,t.jsx(W,{open:r,text:{placeholder:o,label:l,url:p},onShowSearch:L,onHideSearch:P,className:g.search})]})}const Pe={title:"Shared Layout Parts/Header",component:X},_={args:{text:{logoAlt:s.nextjs.header.betterplace_logo_alt_text,claim:s.nextjs.header.claim,homePageUrl:"https://www.betterplace.org",searchLabel:s.nextjs.core.search,searchPlaceholder:s.nextjs.header.search.placeholder,searchUrl:"https://www.betterplace.org",links:["Entdecken","Spenden sammeln","Über uns"].map(a=>({href:"#",children:a}))},children:t.jsx(E,{text:{myProfile:"Mein betterplace",avatar:v,links:["Profil","Meine Spenden","Neues Projekt anlegen","Neue Spendenaktion anlegen","separator","Abmelden"].map(a=>a!=="separator"?{href:"#",name:a}:a),name:"developers@betterplace.org"}})}},k={args:{text:{logoAlt:s.nextjs.header.betterplace_logo_alt_text,claim:s.nextjs.header.claim,homePageUrl:"https://www.betterplace.org",searchLabel:s.nextjs.core.search,searchPlaceholder:s.nextjs.header.search.placeholder,searchUrl:"https://www.betterplace.org",links:["Entdecken","Spenden sammeln","Über uns"].map(a=>({href:"#",children:a}))},children:t.jsx(D,{text:{loginUrl:"https://example.com",label:s.nextjs.login.log_in}})}},j={args:{text:{logoAlt:s.nextjs.header.betterplace_logo_alt_text,claim:s.nextjs.header.claim,homePageUrl:"https://www.betterplace.org",searchLabel:s.nextjs.core.search,searchPlaceholder:s.nextjs.header.search.placeholder,searchUrl:"https://www.betterplace.org",links:["Entdecken","Spenden sammeln","Über uns"].map(a=>({href:"#",children:a}))},children:t.jsx(K,{})}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    text: {
      logoAlt: de.nextjs.header.betterplace_logo_alt_text,
      claim: de.nextjs.header.claim,
      homePageUrl: 'https://www.betterplace.org',
      searchLabel: de.nextjs.core.search,
      searchPlaceholder: de.nextjs.header.search.placeholder,
      searchUrl: 'https://www.betterplace.org',
      links: ['Entdecken', 'Spenden sammeln', 'Über uns'].map(name => ({
        href: '#',
        children: name
      }))
    },
    children: <UserInfo text={{
      myProfile: 'Mein betterplace',
      avatar: defaultProfile,
      links: ['Profil', 'Meine Spenden', 'Neues Projekt anlegen', 'Neue Spendenaktion anlegen', 'separator', 'Abmelden'].map(link => link !== 'separator' ? {
        href: '#',
        name: link
      } : link),
      name: 'developers@betterplace.org'
    }} />
  } as HeaderProps
}`,..._.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    text: {
      logoAlt: de.nextjs.header.betterplace_logo_alt_text,
      claim: de.nextjs.header.claim,
      homePageUrl: 'https://www.betterplace.org',
      searchLabel: de.nextjs.core.search,
      searchPlaceholder: de.nextjs.header.search.placeholder,
      searchUrl: 'https://www.betterplace.org',
      links: ['Entdecken', 'Spenden sammeln', 'Über uns'].map(name => ({
        href: '#',
        children: name
      }))
    },
    children: <UserLoginLink text={{
      loginUrl: 'https://example.com',
      label: de.nextjs.login.log_in
    }} />
  } as HeaderProps
}`,...k.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    text: {
      logoAlt: de.nextjs.header.betterplace_logo_alt_text,
      claim: de.nextjs.header.claim,
      homePageUrl: 'https://www.betterplace.org',
      searchLabel: de.nextjs.core.search,
      searchPlaceholder: de.nextjs.header.search.placeholder,
      searchUrl: 'https://www.betterplace.org',
      links: ['Entdecken', 'Spenden sammeln', 'Über uns'].map(name => ({
        href: '#',
        children: name
      }))
    },
    children: <UserInfoLoading />
  } as HeaderProps
}`,...j.parameters?.docs?.source}}};const Ue=["Default","LoggedOut","Loading"];export{_ as Default,j as Loading,k as LoggedOut,Ue as __namedExportsOrder,Pe as default};
