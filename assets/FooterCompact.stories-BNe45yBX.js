import{d as l}from"./de-h_yTXPdl.js";import{j as i}from"./jsx-runtime-u17CrQMm.js";import{c as j}from"./compiler-runtime-BztlXLJS.js";import{c as p}from"./index-CL1aUomK.js";import{D as g,L as v}from"./shared-NThfFsP-.js";import"./iframe-K_OwPEhI.js";import"./preload-helper-PPVm8Dsz.js";import"./TextLink-Bnp40fj4.js";const I="_footer_f7tu9_1",b="_link_f7tu9_6",f={footer:I,link:b};function w(d){const e=j.c(9),{text:t,Link:m}=d,o=m===void 0?g:m;let n;e[0]===Symbol.for("react.memo_cache_sentinel")?(n=p("bp-shared",f.footer),e[0]=n):n=e[0];const x=t.providerInfo;let r;if(e[1]!==o||e[2]!==t.links){let a;e[4]!==o?(a=(k,u)=>{const{className:_,...h}=k;return i.jsx(i.Fragment,{children:i.jsx(v,{Link:o,...h,className:p(f.link,_)})},u)},e[4]=o,e[5]=a):a=e[5],r=t.links.map(a),e[1]=o,e[2]=t.links,e[3]=r}else r=e[3];let s;return e[6]!==r||e[7]!==t.providerInfo?(s=i.jsxs("footer",{className:n,children:[x,r]}),e[6]=r,e[7]=t.providerInfo,e[8]=s):s=e[8],s}const S={title:"Shared Layout Parts/FooterCompact",component:w},c={args:{text:{providerInfo:l.nextjs.footer.provider_info,links:[{href:"https://www.betterplace.org/c/kontakt",children:l.nextjs.footer.impressum_label,external:!0},{href:l.nextjs.external_links.transaction_cost.url,children:l.nextjs.external_links.transaction_cost.content,className:"larger-click-area",external:!0}]}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    text: {
      providerInfo: de.nextjs.footer.provider_info,
      links: [{
        href: 'https://www.betterplace.org/c/kontakt',
        children: de.nextjs.footer.impressum_label,
        external: true
      }, {
        href: de.nextjs.external_links.transaction_cost.url,
        children: de.nextjs.external_links.transaction_cost.content,
        className: 'larger-click-area',
        external: true
      }]
    }
  } as FooterCompactProps
}`,...c.parameters?.docs?.source}}};const R=["Default"];export{c as Default,R as __namedExportsOrder,S as default};
