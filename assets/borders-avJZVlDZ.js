import{j as r}from"./jsx-runtime-u17CrQMm.js";import{useMDXComponents as l}from"./index-DHOJhGSV.js";import{M as p}from"./blocks-qD1qt790.js";import{c}from"./compiler-runtime-BztlXLJS.js";import"./iframe-K_OwPEhI.js";import{F as m}from"./FluidityHint-CeAmasZn.js";import{T as s,g as d}from"./TokenTable-DpU8IjSx.js";import"./index-CL1aUomK.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CQksqrAn.js";import"./index-DxRQN4t8.js";import"./semantic-CNF0AfQW.js";const u=o=>{const e=c.c(2),{token:n}=o,i=`var(--${n.name})`;let t;return e[0]!==i?(t=r.jsx("div",{style:{backgroundColor:"var(--betterplace-color-purple-400)",borderRadius:i,blockSize:"var(--betterplace-sizing-600)",inlineSize:"var(--betterplace-sizing-600)"}}),e[0]=i,e[1]=t):t=e[1],t},b=o=>{const e=c.c(2),{token:n}=o,i=`var(--${n.name})`;let t;return e[0]!==i?(t=r.jsx("div",{style:{border:i,blockSize:"var(--betterplace-sizing-600)",inlineSize:"var(--betterplace-sizing-600)"}}),e[0]=i,e[1]=t):t=e[1],t},x=o=>{const e=c.c(2),{token:n}=o,i=`var(--${n.name})`;let t;return e[0]!==i?(t=r.jsx("hr",{style:{borderColor:"var(--betterplace-color-purple-400)",borderWidth:i}}),e[0]=i,e[1]=t):t=e[1],t};function a(o){const e={h1:"h1",h2:"h2",p:"p",...l(),...o.components};return r.jsxs(r.Fragment,{children:[r.jsx(p,{title:"Tokens/Borders"}),`
`,r.jsx(e.h1,{id:"borders",children:"Borders"}),`
`,r.jsx(m,{}),`
`,r.jsx(e.h2,{id:"border-width",children:"Border width"}),`
`,r.jsx(e.p,{children:"Border width tokens reference generic dimension tokens."}),`
`,r.jsx(s,{tokens:d("betterplace-border-width","semantic"),preview:n=>r.jsx(x,{token:n})}),`
`,r.jsx(e.h2,{id:"border-radius",children:"Border radius"}),`
`,r.jsx(e.p,{children:"Border radius tokens reference generic dimension tokens."}),`
`,r.jsx(s,{sorted:!0,tokens:d("betterplace-border-radius","semantic"),preview:n=>r.jsx(u,{token:n})}),`
`,r.jsx(e.h2,{id:"border-compound",children:"Border (compound)"}),`
`,r.jsx(s,{tokens:d("betterplace-border","semantic","betterplace-border-(?!.*(width|radius))"),preview:n=>r.jsx(b,{token:n})})]})}function C(o={}){const{wrapper:e}={...l(),...o.components};return e?r.jsx(e,{...o,children:r.jsx(a,{...o})}):a(o)}export{C as default};
