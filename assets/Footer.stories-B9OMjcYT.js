import{j as t}from"./jsx-runtime-u17CrQMm.js";import{d as M}from"./de-h_yTXPdl.js";import{h as U,T as W}from"./TextLink-Bnp40fj4.js";import{c as y}from"./compiler-runtime-BztlXLJS.js";import{O as Y}from"./orga-logo-BQDA8B0I.js";import{c as K}from"./index-CL1aUomK.js";import{r as Z}from"./iframe-K_OwPEhI.js";import{I as E}from"./Icon-x1z4PGh0.js";import{a as Q,L as X}from"./LayoutAccordion-CRSR5tSK.js";import{L as ee}from"./LayoutCenter-DfZD0kZD.js";import{L as B}from"./LayoutCluster-DC6NloDU.js";import{L as w}from"./LayoutStack-qOFlLSRJ.js";import{g as J}from"./getSafeImageSource-Cxzf-dtT.js";import{D as v,L as O,a as ne}from"./shared-NThfFsP-.js";import{u as te}from"./useIsMounted-EdiWN4I5.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CQksqrAn.js";import"./index-DxRQN4t8.js";import"./PopupContext-Bx01joXm.js";const ie=""+new URL("itz-greyscale-DecCavdw.svg",import.meta.url).href;function le(){if(typeof window>"u")return"";const l=window.location.hostname;if(!l)return"";const e=l.split(".");return e.length<=2?l:e.slice(1).join(".")}const re="_footer_1npss_1",se="_grid_1npss_14",ae="_item_1npss_18",oe="_mobileOnly_1npss_26",ce="_wideOnly_1npss_34",fe="_accordionContent_1npss_42",he="_accordionLabel_1npss_46",de="_footerLink_1npss_50",pe="_cookieSettingsLink_1npss_56",ke="_transparentCivilSocietyLink_1npss_61",me="_logo_1npss_69",xe="_organizationInfo_1npss_78",ue="_organizationInfoDetails_1npss_86",ge="_socialLink_1npss_95",be="_socialLinks_1npss_104",Le="_footerContent_1npss_111",_e="_textContent_1npss_124",k={footer:re,grid:se,item:ae,mobileOnly:oe,wideOnly:ce,accordionContent:fe,accordionLabel:he,footerLink:de,cookieSettingsLink:pe,transparentCivilSocietyLink:ke,logo:me,organizationInfo:xe,organizationInfoDetails:ue,socialLink:ge,socialLinks:be,footerContent:Le,textContent:_e},Se="_taxReceiptHint_ukn1q_1",je="_content_ukn1q_24",ye="_learnMoreLink_ukn1q_30",q={taxReceiptHint:Se,content:je,learnMoreLink:ye};function we(){const l=new Date;return l.getMonth()>8||l.getMonth()<1}function ve(){const l=new Date;let e=l.getFullYear();return l.getMonth()<9&&(e-=1),e}function Ce(){const l=y.c(4),e=te();let n;l[0]===Symbol.for("react.memo_cache_sentinel")?(n=ve(),l[0]=n):n=l[0];const a=n;let s;l[1]===Symbol.for("react.memo_cache_sentinel")?(s=we(),l[1]=s):s=l[1];const i=s&&e;let r;return l[2]!==i?(r={showHint:i,year:a},l[2]=i,l[3]=r):r=l[3],r}function Ie(l){const e=y.c(19),{children:n,href:a,label:s,Link:o}=l,i=o===void 0?v:o,{className:r}=U({kind:"secondary"}),{showHint:f,year:c}=Ce();if(!f)return null;const h=w,d="none",p=q,x=q;let m;e[0]!==n||e[1]!==c?(m=n.replace("0000",c.toString()).replace("0001",(c+1).toString()),e[0]=n,e[1]=c,e[2]=m):m=e[2];const j=" ",b=O,_=K(r,q.learnMoreLink);let g;e[3]!==i||e[4]!==b||e[5]!==a||e[6]!==s||e[7]!==_?(g=t.jsx(b,{Link:i,href:a,className:_,"data-axe-expect":"color-contrast",children:s}),e[3]=i,e[4]=b,e[5]=a,e[6]=s,e[7]=_,e[8]=g):g=e[8];let u;e[9]!==m||e[10]!==g?(u=t.jsxs("p",{children:[m,j,g]}),e[9]=m,e[10]=g,e[11]=u):u=e[11];let L;e[12]!==x.content||e[13]!==u?(L=t.jsx("div",{className:x.content,children:u}),e[12]=x.content,e[13]=u,e[14]=L):L=e[14];let S;return e[15]!==h||e[16]!==L||e[17]!==p.taxReceiptHint?(S=t.jsx(h,{space:d,className:p.taxReceiptHint,children:L}),e[15]=h,e[16]=L,e[17]=p.taxReceiptHint,e[18]=S):S=e[18],S}const ze=J(Y),He=J(ie),De=()=>{const l=le(),e=new Date(2099,1,1).getTime();document.cookie=`betterplace-tracking-accepted=edit; path=/; max-age=${e}; domain=.${l}`};function Ne(l){if(!l.length)return[];const e=l.length>1?l.sort(({column:a},{column:s})=>a-s):l;let n=0;return e.map(a=>{n=a.column??n;const s={...a,column:a.column??n};return n++,s})}function Re(l){const e=l.reduce((n,a)=>(n[a.column]=[...n[a.column]??[],a],n),{});return Object.values(e)}function G(l){const e=y.c(6);let n,a;e[0]!==l?({...n}=l,a=U({kind:"secondary",size:"small",className:K(n.className,k.footerLink)}),e[0]=l,e[1]=n,e[2]=a):(n=e[1],a=e[2]);const{className:s}=a;let o;return e[3]!==s||e[4]!==n?(o=t.jsx(O,{...n,doNotOpenInNewTab:!0,className:s}),e[3]=s,e[4]=n,e[5]=o):o=e[5],o}function V(l){const e=y.c(3),{cookieSettingsLink:n,Link:a,section:s}=l,o=a===void 0?v:a;if(s.title!==n.section)return null;let i;return e[0]!==o||e[1]!==n.label?(i=t.jsx(G,{Link:o,onClick:De,className:k.cookieSettingsLink,children:n.label},"cookie"),e[0]=o,e[1]=n.label,e[2]=i):i=e[2],i}function Ae(l){const e=y.c(8),{children:n,Link:a,links:s,mobile:o}=l,i=a===void 0?v:a;if(o)return o;let r;if(e[0]!==i||e[1]!==s){let c;e[3]!==i?(c=(h,d)=>t.jsx(G,{Link:i,...h},d),e[3]=i,e[4]=c):c=e[4],r=s.map(c),e[0]=i,e[1]=s,e[2]=r}else r=e[2];let f;return e[5]!==n||e[6]!==r?(f=t.jsxs(w,{space:"200",className:k.accordionContent,children:[r,n]}),e[5]=n,e[6]=r,e[7]=f):f=e[7],f}function Te(l){const e=y.c(8),{links:n,Link:a,desktop:s,children:o}=l,i=a===void 0?v:a;if(s)return s;let r;if(e[0]!==i||e[1]!==n){let c;e[3]!==i?(c=(h,d)=>t.jsx(G,{Link:i,...h},d),e[3]=i,e[4]=c):c=e[4],r=n.map(c),e[0]=i,e[1]=n,e[2]=r}else r=e[2];let f;return e[5]!==o||e[6]!==r?(f=t.jsxs(t.Fragment,{children:[r,o]}),e[5]=o,e[6]=r,e[7]=f):f=e[7],f}function Oe(l){const e=y.c(25),{text:n,Link:a}=l,s=a===void 0?v:a;let o,i,r,f,c,h,d,p;if(e[0]!==s||e[1]!==n.cookieSettingsLink||e[2]!==n.sections){const j=Re(Ne(n.sections));p=k.wideOnly,o=B,i=k.grid,r=!0,f="300",c="space-between",h=!0;let b;e[11]!==s||e[12]!==n.cookieSettingsLink?(b=(_,g)=>t.jsx(w,{className:k.item,space:"300",children:_.map(u=>t.jsxs(w,{children:[t.jsx("p",{children:t.jsx("strong",{children:u.title})},"title"),t.jsx(Te,{links:u.links,desktop:u.desktop,Link:s,children:t.jsx(V,{cookieSettingsLink:n.cookieSettingsLink,section:u},"cookie")})]},u.title))},g),e[11]=s,e[12]=n.cookieSettingsLink,e[13]=b):b=e[13],d=j.map(b),e[0]=s,e[1]=n.cookieSettingsLink,e[2]=n.sections,e[3]=o,e[4]=i,e[5]=r,e[6]=f,e[7]=c,e[8]=h,e[9]=d,e[10]=p}else o=e[3],i=e[4],r=e[5],f=e[6],c=e[7],h=e[8],d=e[9],p=e[10];let x;e[14]!==o||e[15]!==i||e[16]!==r||e[17]!==f||e[18]!==c||e[19]!==h||e[20]!==d?(x=t.jsx(o,{className:i,flex:r,space:f,justify:c,wrap:h,children:d}),e[14]=o,e[15]=i,e[16]=r,e[17]=f,e[18]=c,e[19]=h,e[20]=d,e[21]=x):x=e[21];let m;return e[22]!==p||e[23]!==x?(m=t.jsx("nav",{className:p,children:x}),e[22]=p,e[23]=x,e[24]=m):m=e[24],m}function Pe(l){const e=y.c(10),{text:n,Link:a}=l,s=a===void 0?v:a,[o,i]=Z.useState("");let r;if(e[0]!==s||e[1]!==n.cookieSettingsLink||e[2]!==n.sections){let c;e[4]!==s||e[5]!==n.cookieSettingsLink?(c=h=>t.jsx(Q,{id:h.title,onClick:d=>i(p=>d===p?"":d),label:t.jsx("span",{className:k.accordionLabel,children:h.title}),children:t.jsx(Ae,{links:h.links,mobile:h.mobile,Link:s,children:t.jsx(V,{cookieSettingsLink:n.cookieSettingsLink,section:h},"cookie")})},h.title),e[4]=s,e[5]=n.cookieSettingsLink,e[6]=c):c=e[6],r=n.sections.map(c),e[0]=s,e[1]=n.cookieSettingsLink,e[2]=n.sections,e[3]=r}else r=e[3];let f;return e[7]!==o||e[8]!==r?(f=t.jsx("nav",{className:k.mobileOnly,children:t.jsx(X,{defaultKey:"",activeKey:o,scrollOnOpen:!1,space:"none",animationSpeedInMs:300,children:r})}),e[7]=o,e[8]=r,e[9]=f):f=e[9],f}function Fe(l){const e=y.c(71),{text:n,Link:a,Image:s,localeSwitchLink:o}=l,i=a===void 0?v:a,r=s===void 0?ne:s;let f;e[0]===Symbol.for("react.memo_cache_sentinel")?(f=K("bp-shared",k.footer),e[0]=f):f=e[0];let c;e[1]!==i||e[2]!==n.taxReceiptHint.children||e[3]!==n.taxReceiptHint.href||e[4]!==n.taxReceiptHint.label?(c=t.jsx(Ie,{label:n.taxReceiptHint.label,href:n.taxReceiptHint.href,Link:i,children:n.taxReceiptHint.children}),e[1]=i,e[2]=n.taxReceiptHint.children,e[3]=n.taxReceiptHint.href,e[4]=n.taxReceiptHint.label,e[5]=c):c=e[5];let h,d;e[6]!==i||e[7]!==n?(h=t.jsx(Oe,{text:n,Link:i}),d=t.jsx(Pe,{text:n,Link:i}),e[6]=i,e[7]=n,e[8]=h,e[9]=d):(h=e[8],d=e[9]);let p;e[10]!==r?(p=t.jsx(r,{src:ze,alt:"",width:190,className:k.logo}),e[10]=r,e[11]=p):p=e[11];let x;e[12]!==n.organizationInfo?(x=t.jsx("p",{children:t.jsx("strong",{children:n.organizationInfo})}),e[12]=n.organizationInfo,e[13]=x):x=e[13];let m;e[14]!==n.organizationInfoDetails?(m=t.jsx("p",{className:k.organizationInfoDetails,children:n.organizationInfoDetails}),e[14]=n.organizationInfoDetails,e[15]=m):m=e[15];let j;e[16]!==x||e[17]!==m?(j=t.jsxs(w,{className:k.organizationInfo,flex:!0,children:[x,m]}),e[16]=x,e[17]=m,e[18]=j):j=e[18];let b;e[19]===Symbol.for("react.memo_cache_sentinel")?(b=t.jsx(E,{name:"facebook",size:"400","aria-hidden":"true"}),e[19]=b):b=e[19];let _;e[20]!==n.facebookLink.label?(_=t.jsx("span",{className:"sr-only",children:n.facebookLink.label}),e[20]=n.facebookLink.label,e[21]=_):_=e[21];let g;e[22]!==i||e[23]!==_||e[24]!==n.facebookLink.href||e[25]!==n.facebookLink.label?(g=t.jsxs(O,{Link:i,href:n.facebookLink.href,title:n.facebookLink.label,external:!0,className:k.socialLink,children:[b,_]},"facebook"),e[22]=i,e[23]=_,e[24]=n.facebookLink.href,e[25]=n.facebookLink.label,e[26]=g):g=e[26];let u;e[27]===Symbol.for("react.memo_cache_sentinel")?(u=t.jsx(E,{name:"instagram",size:"400","aria-hidden":"true"}),e[27]=u):u=e[27];let L;e[28]!==n.instagramLink.label?(L=t.jsx("span",{className:"sr-only",children:n.instagramLink.label}),e[28]=n.instagramLink.label,e[29]=L):L=e[29];let S;e[30]!==i||e[31]!==L||e[32]!==n.instagramLink.href||e[33]!==n.instagramLink.label?(S=t.jsxs(O,{Link:i,href:n.instagramLink.href,title:n.instagramLink.label,external:!0,className:k.socialLink,children:[u,L]},"instagram"),e[30]=i,e[31]=L,e[32]=n.instagramLink.href,e[33]=n.instagramLink.label,e[34]=S):S=e[34];let P;e[35]===Symbol.for("react.memo_cache_sentinel")?(P=t.jsx(E,{name:"linkedin",size:"400","aria-hidden":"true"}),e[35]=P):P=e[35];let C;e[36]!==n.linkedinLink.label?(C=t.jsx("span",{className:"sr-only",children:n.linkedinLink.label}),e[36]=n.linkedinLink.label,e[37]=C):C=e[37];let I;e[38]!==i||e[39]!==C||e[40]!==n.linkedinLink.href||e[41]!==n.linkedinLink.label?(I=t.jsxs(O,{Link:i,href:n.linkedinLink.href,title:n.linkedinLink.label,external:!0,className:k.socialLink,children:[P,C]},"linkedin"),e[38]=i,e[39]=C,e[40]=n.linkedinLink.href,e[41]=n.linkedinLink.label,e[42]=I):I=e[42];let z;e[43]!==g||e[44]!==S||e[45]!==I?(z=t.jsxs(B,{space:"200",align:"center",children:[g,S,I]}),e[43]=g,e[44]=S,e[45]=I,e[46]=z):z=e[46];let H;e[47]!==o||e[48]!==z?(H=t.jsxs(B,{justify:"space-between",align:"center",children:[z,o]}),e[47]=o,e[48]=z,e[49]=H):H=e[49];let D;e[50]!==r||e[51]!==n.transparentCivilSocietyLink.label?(D=t.jsx(r,{src:He,alt:n.transparentCivilSocietyLink.label,width:240}),e[50]=r,e[51]=n.transparentCivilSocietyLink.label,e[52]=D):D=e[52];let N;e[53]!==i||e[54]!==D||e[55]!==n.transparentCivilSocietyLink.href?(N=t.jsx(O,{Link:i,href:n.transparentCivilSocietyLink.href,className:k.transparentCivilSocietyLink,children:D}),e[53]=i,e[54]=D,e[55]=n.transparentCivilSocietyLink.href,e[56]=N):N=e[56];let R;e[57]!==H||e[58]!==N?(R=t.jsxs(w,{className:k.socialLinks,children:[H,N]}),e[57]=H,e[58]=N,e[59]=R):R=e[59];let A;e[60]!==j||e[61]!==R?(A=t.jsxs(B,{alignment:"intrinsic",justify:"space-between",className:k.textContent,children:[j,R]}),e[60]=j,e[61]=R,e[62]=A):A=e[62];let T;e[63]!==A||e[64]!==h||e[65]!==d||e[66]!==p?(T=t.jsxs(w,{className:k.footerContent,flex:!0,children:[h,d,p,A]}),e[63]=A,e[64]=h,e[65]=d,e[66]=p,e[67]=T):T=e[67];let F;return e[68]!==T||e[69]!==c?(F=t.jsxs(ee,{as:"footer",className:f,centeredChildren:!0,children:[c,T]}),e[68]=T,e[69]=c,e[70]=F):F=e[70],F}const rn={title:"Shared Layout Parts/Footer",component:Fe},$={args:{localeSwitchLink:t.jsx(W,{href:"/en",children:"English"}),text:{accessibilityStatement:t.jsxs("div",{id:"accessibility",children:[t.jsx("p",{children:t.jsx("strong",{children:"Accessibility statement"})}),t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."})]}),organizationInfo:M.nextjs.core.provider_info,organizationInfoDetails:"betterplace.org ist eine gemeinnützige Spendenplattform aus Deutschland.",cookieSettingsLink:{label:"Cookie-Einstellungen",section:"Hilfe"},transparentCivilSocietyLink:{href:"https://www.transparente-zivilgesellschaft.de/",label:"Initiative Transparente Zivilgesellschaft"},facebookLink:{href:"https://www.facebook.com/betterplace.org",label:"Facebook"},instagramLink:{href:"https://www.instagram.com/betterplace.org",label:"Instagram"},linkedinLink:{href:"https://www.linkedin.com/company/betterplace.org",label:"LinkedIn"},sections:[{title:"Über uns",column:1,links:[{href:"/was-ist-betterplace",children:"Was ist betterplace.org?",external:!1},{href:"/blog",children:"Blog & Neuigkeiten",external:!1},{href:"/academy",children:"betterplace academy",external:!1},{href:"/team",children:"Das Team",external:!1},{href:"/jobs",children:"Jobs",external:!1},{href:"/presse",children:"Presse",external:!1},{href:"/kontakt",children:"Kontakt & Impressum",external:!1},{href:"https://support.betterplace.org/hc/de/articles/20867638062620",children:"Barrierefreiheitserklärung",external:!0},{href:"/api",children:"API",external:!1}]},{title:"Spenden sammeln",column:2,links:[{href:"/organisation",children:"Als gemeinnützige Organisation",external:!1},{href:"/spendenaktion",children:"Spendenaktion für Privatpersonen",external:!1},{href:"/spendenaufruf",children:"Spendenaufruf für Privatpersonen",external:!1},{href:"/unternehmen",children:"Als Unternehmen",external:!1},{href:"/streamer",children:"Als Streamer*in",external:!1},{href:"/creator",children:"Als Content Creator*in",external:!1}]},{title:"Selbst spenden",column:3,rowSpan:1,links:[{href:"/projektsuche",children:"Projektsuche",external:!1},{href:"/beliebte-projekte",children:"Beliebte Projekte",external:!1},{href:"/fuer-betterplace",children:"Für betterplace spenden",external:!1}]},{title:"Meine Spenden",column:3,rowSpan:1,links:[{href:"/spendenuebersicht",children:"Spendenübersicht",external:!1},{href:"/spendenbescheinigung",children:"Spendenbescheinigung",external:!1},{href:"/dauerspenden",children:"Dauerspenden",external:!1}]},{title:"Hilfe",column:4,links:[{href:"/hilfe-spender",children:"Hilfe für Spender*innen",external:!1},{href:"/hilfe-projekt",children:"Hilfe für Projektveranwortliche",external:!1},{href:"/hilfe-aktion",children:"Hilfe für Spendenaktionen",external:!1},{href:"/agb",children:"AGB und Datenschutzbestimmungen",external:!1},{href:"/transaktionskosten",children:"Hinweis zu Transaktionskosten",external:!1},{href:"/streams",children:"Charity-Streams - Dos and Don'ts",external:!1},{href:"/verschenken",children:"Verschenke eine Spende",external:!1}]}],taxReceiptHint:{label:M.nextjs.external_links.tax_receipt_hint.content,href:M.nextjs.external_links.tax_receipt_hint.url,children:M.nextjs.footer.tax_receipt_hint.replace("{tax_receipt_year}","0000").replace("{tax_receipt_processed_at_year}","0001")}}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    localeSwitchLink: <TextLink href="/en">English</TextLink>,
    text: {
      accessibilityStatement: <div id="accessibility">
          <p>
            <strong>Accessibility statement</strong>
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        </div>,
      organizationInfo: de.nextjs.core.provider_info,
      organizationInfoDetails: 'betterplace.org ist eine gemeinnützige Spendenplattform aus Deutschland.',
      cookieSettingsLink: {
        label: 'Cookie-Einstellungen',
        section: 'Hilfe'
      },
      transparentCivilSocietyLink: {
        href: 'https://www.transparente-zivilgesellschaft.de/',
        label: 'Initiative Transparente Zivilgesellschaft'
      },
      facebookLink: {
        href: 'https://www.facebook.com/betterplace.org',
        label: 'Facebook'
      },
      instagramLink: {
        href: 'https://www.instagram.com/betterplace.org',
        label: 'Instagram'
      },
      linkedinLink: {
        href: 'https://www.linkedin.com/company/betterplace.org',
        label: 'LinkedIn'
      },
      sections: [{
        title: 'Über uns',
        column: 1,
        links: [{
          href: '/was-ist-betterplace',
          children: 'Was ist betterplace.org?',
          external: false
        }, {
          href: '/blog',
          children: 'Blog & Neuigkeiten',
          external: false
        }, {
          href: '/academy',
          children: 'betterplace academy',
          external: false
        }, {
          href: '/team',
          children: 'Das Team',
          external: false
        }, {
          href: '/jobs',
          children: 'Jobs',
          external: false
        }, {
          href: '/presse',
          children: 'Presse',
          external: false
        }, {
          href: '/kontakt',
          children: 'Kontakt & Impressum',
          external: false
        }, {
          href: 'https://support.betterplace.org/hc/de/articles/20867638062620',
          children: 'Barrierefreiheitserklärung',
          external: true
        }, {
          href: '/api',
          children: 'API',
          external: false
        }]
      }, {
        title: 'Spenden sammeln',
        column: 2,
        links: [{
          href: '/organisation',
          children: 'Als gemeinnützige Organisation',
          external: false
        }, {
          href: '/spendenaktion',
          children: 'Spendenaktion für Privatpersonen',
          external: false
        }, {
          href: '/spendenaufruf',
          children: 'Spendenaufruf für Privatpersonen',
          external: false
        }, {
          href: '/unternehmen',
          children: 'Als Unternehmen',
          external: false
        }, {
          href: '/streamer',
          children: 'Als Streamer*in',
          external: false
        }, {
          href: '/creator',
          children: 'Als Content Creator*in',
          external: false
        }]
      }, {
        title: 'Selbst spenden',
        column: 3,
        rowSpan: 1,
        links: [{
          href: '/projektsuche',
          children: 'Projektsuche',
          external: false
        }, {
          href: '/beliebte-projekte',
          children: 'Beliebte Projekte',
          external: false
        }, {
          href: '/fuer-betterplace',
          children: 'Für betterplace spenden',
          external: false
        }]
      }, {
        title: 'Meine Spenden',
        column: 3,
        rowSpan: 1,
        links: [{
          href: '/spendenuebersicht',
          children: 'Spendenübersicht',
          external: false
        }, {
          href: '/spendenbescheinigung',
          children: 'Spendenbescheinigung',
          external: false
        }, {
          href: '/dauerspenden',
          children: 'Dauerspenden',
          external: false
        }]
      }, {
        title: 'Hilfe',
        column: 4,
        links: [{
          href: '/hilfe-spender',
          children: 'Hilfe für Spender*innen',
          external: false
        }, {
          href: '/hilfe-projekt',
          children: 'Hilfe für Projektveranwortliche',
          external: false
        }, {
          href: '/hilfe-aktion',
          children: 'Hilfe für Spendenaktionen',
          external: false
        }, {
          href: '/agb',
          children: 'AGB und Datenschutzbestimmungen',
          external: false
        }, {
          href: '/transaktionskosten',
          children: 'Hinweis zu Transaktionskosten',
          external: false
        }, {
          href: '/streams',
          children: "Charity-Streams - Dos and Don'ts",
          external: false
        }, {
          href: '/verschenken',
          children: 'Verschenke eine Spende',
          external: false
        }]
      }],
      taxReceiptHint: {
        label: de.nextjs.external_links.tax_receipt_hint.content,
        href: de.nextjs.external_links.tax_receipt_hint.url,
        children: de.nextjs.footer.tax_receipt_hint.replace('{tax_receipt_year}', '0000').replace('{tax_receipt_processed_at_year}', '0001')
      }
    }
  } as FooterProps
}`,...$.parameters?.docs?.source}}};const sn=["Default"];export{$ as Default,sn as __namedExportsOrder,rn as default};
