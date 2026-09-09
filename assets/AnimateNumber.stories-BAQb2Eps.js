import{j as h}from"./jsx-runtime-u17CrQMm.js";import{c as J}from"./compiler-runtime-BztlXLJS.js";import{r as O}from"./iframe-K_OwPEhI.js";import{d as Y}from"./delay-DOwChqBa.js";import{c as Z}from"./index-CL1aUomK.js";import"./preload-helper-PPVm8Dsz.js";const ee="_number_wp6za_7",re={number:ee};function Q(c){const e=typeof c=="number"?c.toString():c;let r="",o="";const t=[],l=[];let a="",s=!1;const u=n=>typeof n=="string"&&/[0-9]/.test(n);for(let n=0;n<=e.length;n++){const m=e[n],d=u(m);d&&!s&&(l.length?a&&t.push(a):r=a,a=""),!d&&s&&(l.push(a),a=""),!d&&!s&&(o=a),s=d,a+=m}return{prefix:r,suffix:o,separators:t,integers:l}}function se(c){const e=J.c(10),{num:r,separator:o}=c,t=parseInt(r,10);let l;e[0]!==t?(l=t.toString(),e[0]=t,e[1]=l):l=e[1];const a=l,s=Math.max(r.length-a.length,0);let u;e[2]!==s?(u="0".repeat(s),e[2]=s,e[3]=u):u=e[3];const n=o??"";let m;e[4]!==r?(m={"--number":r},e[4]=r,e[5]=m):m=e[5];const d=m;let g;return e[6]!==u||e[7]!==n||e[8]!==d?(g=h.jsx("span",{"data-zero-pad":u,"data-separator":n,style:d}),e[6]=u,e[7]=n,e[8]=d,e[9]=g):g=e[9],g}function ae(c){const e=J.c(30),{children:r,style:o,className:t,animationDurationInMs:l,maxNumberScale:a}=c,s=l===void 0?1e3:l,u=a===void 0?2:a,n=Array.isArray(r)?r[0]:r,m=O.useRef(null),[d,g]=O.useState(0);let j;e[0]!==n?(j=Q(n),e[0]=n,e[1]=j):j=e[1];const p=j,x=p.integers.length-1;let E;e[2]!==x||e[3]!==p.integers?(E=p.integers.slice(0,x).join(""),e[2]=x,e[3]=p.integers,e[4]=E):E=e[4];const f=parseFloat(E+(p.separators[x-1]?"."+p.integers[x]:p.integers[x]));let I,M;e[5]!==s||e[6]!==f?(I=()=>{(async function(){if(isNaN(f))return;const P=m.current??0;let V=f-P;m.current=f,m.current===null&&(V=0),g(V),await Y(s),g(0)})().then()},M=[s,f],e[5]=s,e[6]=f,e[7]=I,e[8]=M):(I=e[7],M=e[8]),O.useEffect(I,M);const U=Math.max(Math.max(u-1,0)*((Math.log10(d/100)+3)/4)+1,1);if(isNaN(f))return null;const{prefix:q,suffix:B,separators:y,integers:S}=p;let b;e[9]!==t?(b=Z(re.number,t),e[9]=t,e[10]=b):b=e[10];const G=`${s}ms`;let $;e[11]!==U||e[12]!==o||e[13]!==G?($={...o,"--number-scale":U,"--number-animation-duration":G},e[11]=U,e[12]=o,e[13]=G,e[14]=$):$=e[14];const H=$;let N;if(e[15]!==S||e[16]!==y){let v;e[18]!==S.length||e[19]!==y?(v=(K,P)=>{const V=y[P],X=S.length-1-P;return h.jsx(se,{num:K,separator:V},X)},e[18]=S.length,e[19]=y,e[20]=v):v=e[20],N=S.map(v),e[15]=S,e[16]=y,e[17]=N}else N=e[17];let D;e[21]!==n?(D=h.jsx("span",{className:"sr-only",children:n},"sr-only"),e[21]=n,e[22]=D):D=e[22];let _;return e[23]!==q||e[24]!==B||e[25]!==H||e[26]!==N||e[27]!==D||e[28]!==b?(_=h.jsxs("div",{className:b,"data-prefix":q,"data-suffix":B,style:H,children:[N,D]}),e[23]=q,e[24]=B,e[25]=H,e[26]=N,e[27]=D,e[28]=b,e[29]=_):_=e[29],_}function te(c){const e=J.c(7);let r,o;e[0]!==c?({children:r,...o}=c,e[0]=c,e[1]=r,e[2]=o):(r=e[1],o=e[2]);const[t,l]=O.useState(r);if(!t)return null;let a;e[3]===Symbol.for("react.memo_cache_sentinel")?(a=h.jsx("button",{onClick:()=>{l(ne)},children:"New Value"}),e[3]=a):a=e[3];let s;return e[4]!==o||e[5]!==t?(s=h.jsxs("div",{children:[a,h.jsx(ae,{...o,children:t})]}),e[4]=o,e[5]=t,e[6]=s):s=e[6],s}function ne(c){if(!c)return c;const e=Q(c),r=e.integers.length-1,t=parseFloat(e.integers.slice(0,r).join("")+(e.separators[r-1]?"."+e.integers[r]:e.integers[r]))+Math.round(Math.random()*1e4)/100;return`${e.prefix}${Intl.NumberFormat(e.separators[r-1]==="."?"en-US":"de-DE",{style:"decimal",minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}${e.suffix}`}const pe={title:"Components/AnimateNumber",component:te,parameters:{layout:"centered"},tags:["autodocs"]},i={args:{children:"12345",animationDurationInMs:1e3,maxNumberScale:2}},C={args:{...i.args,children:"1234.56"}},F={args:{...i.args,children:"€1234.56"}},w={args:{...i.args,children:"$9,876.54"}},A={args:{...i.args,children:"1,234.56€"}},z={args:{...i.args,children:"85.5%"}},L={args:{...i.args,children:"1,000,000.00"}},R={args:{...i.args,children:"0.42"}},W={args:{...i.args,children:"-123.45"}},k={args:{...i.args,children:"1.234,56"}},T={args:{...i.args,children:"1.234.567,89€"}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    children: '12345',
    animationDurationInMs: 1000,
    maxNumberScale: 2
  }
}`,...i.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    children: '1234.56'
  }
}`,...C.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    children: '€1234.56'
  }
}`,...F.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    children: '$9,876.54'
  }
}`,...w.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    children: '1,234.56€'
  }
}`,...A.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    children: '85.5%'
  }
}`,...z.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    children: '1,000,000.00'
  }
}`,...L.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    children: '0.42'
  }
}`,...R.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    children: '-123.45'
  }
}`,...W.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    children: '1.234,56'
  }
}`,...k.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    children: '1.234.567,89€'
  }
}`,...T.parameters?.docs?.source}}};const ge=["Default","DecimalNumber","EuroPrefixed","DollarPrefixed","EuroSuffixed","Percentage","LargeNumber","SmallDecimal","NegativeNumber","CommaSeparated","WithThousandsSeparator"];export{k as CommaSeparated,C as DecimalNumber,i as Default,w as DollarPrefixed,F as EuroPrefixed,A as EuroSuffixed,L as LargeNumber,W as NegativeNumber,z as Percentage,R as SmallDecimal,T as WithThousandsSeparator,ge as __namedExportsOrder,pe as default};
