import{j as e}from"./jsx-runtime-u17CrQMm.js";import{useMDXComponents as p}from"./index-DHOJhGSV.js";import{M as d}from"./blocks-qD1qt790.js";import{c as h}from"./compiler-runtime-BztlXLJS.js";import"./iframe-K_OwPEhI.js";import{B as m}from"./BoxShadowPreview-DjWy8Ow3.js";import{C as x}from"./ColorPreview-BTXQbwOB.js";import{D as c}from"./DimensionPreview-DCSoMnNS.js";import{F as j}from"./FluidityHint-CeAmasZn.js";import{T as i,g as o}from"./TokenTable-DpU8IjSx.js";import{O as f}from"./OpacityPreview-BBxrDjcb.js";import{T as g}from"./TypographyPreview-CcCLAFWl.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CQksqrAn.js";import"./index-DxRQN4t8.js";import"./semantic-CNF0AfQW.js";import"./index-CL1aUomK.js";const k=r=>{const t=h.c(2),{token:n}=r,a=`var(--${n.name})`;let s;return t[0]!==a?(s=e.jsx("div",{style:{fontSize:a,fontFamily:"var(--betterplace-font-families-fira-sans)",maxInlineSize:"30rem",lineHeight:"var(--betterplace-line-heights-base)",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),t[0]=a,t[1]=s):s=t[1],s},v=r=>{const t=h.c(2),{token:n}=r,a=`var(--${n.name}) 0 0 var(--betterplace-color-purple-400)`;let s;return t[0]!==a?(s=e.jsx("div",{style:{marginLeft:"13px",blockSize:"var(--betterplace-sizing-400)",boxShadow:a}}),t[0]=a,t[1]=s):s=t[1],s};function l(r){const t={h1:"h1",h2:"h2",h3:"h3",p:"p",...p(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Tokens/Core token reference"}),`
`,e.jsx(t.h1,{id:"core-token-reference",children:"Core token reference"}),`
`,e.jsx(t.p,{children:"This page lists all of our core tokens. Do not use them directly. They just form the basis to define our semantic tokens."}),`
`,e.jsx(j,{}),`
`,e.jsx(t.h2,{id:"color",children:"Color"}),`
`,e.jsx(i,{tokens:o("betterplace-color","core"),preview:n=>e.jsx(x,{token:n})}),`
`,e.jsx(t.h2,{id:"font-size",children:"Font size"}),`
`,e.jsx(t.p,{children:"Font sizes scale smoothly between a minimum and maximum value depending on the viewport width."}),`
`,e.jsx(i,{sorted:!0,tokens:o("betterplace-font-size","core"),preview:n=>e.jsx(k,{token:n})}),`
`,e.jsx(t.h2,{id:"font-family",children:"Font family"}),`
`,e.jsx(i,{tokens:o("betterplace-font-families","core")}),`
`,e.jsx(t.h2,{id:"font-weight",children:"Font weight"}),`
`,e.jsx(i,{tokens:o("betterplace-font-weights","core")}),`
`,e.jsx(t.h2,{id:"line-height",children:"Line height"}),`
`,e.jsx(i,{tokens:o("betterplace-line-heights","core")}),`
`,e.jsx(t.h2,{id:"letter-spacing",children:"Letter spacing"}),`
`,e.jsx(i,{tokens:o("betterplace-letter-spacing","core")}),`
`,e.jsx(t.h2,{id:"paragraph-spacing",children:"Paragraph spacing"}),`
`,e.jsx(i,{tokens:o("betterplace-paragraph-spacing","core"),preview:n=>e.jsx(c,{token:n})}),`
`,e.jsx(t.h2,{id:"text-case",children:"Text case"}),`
`,e.jsx(i,{tokens:o("betterplace-text-case","core")}),`
`,e.jsx(t.h2,{id:"text-decoration",children:"Text decoration"}),`
`,e.jsx(i,{tokens:o("betterplace-text-decoration","core")}),`
`,e.jsx(t.h2,{id:"typography-compound",children:"Typography (compound)"}),`
`,e.jsx(i,{sorted:!0,tokens:o("betterplace-typography","core"),preview:n=>e.jsx(g,{token:n})}),`
`,e.jsx(t.h2,{id:"measures",children:"Measures"}),`
`,e.jsx(i,{tokens:o("betterplace-measure","core"),preview:n=>e.jsx(c,{token:n})}),`
`,e.jsx(t.h2,{id:"dimension-generic",children:"Dimension (generic)"}),`
`,e.jsx(t.p,{children:"The dimension tokens define a generic amount of distance. They are multiples of the root font size. Because the font size grows and shrinks fluidly between a set min and max value, the dimension tokens will likewise vary in size. This way larger screens will have larger spacings, gaps, etc. and small screens smaller ones according to font size."}),`
`,e.jsx(t.p,{children:"The generic dimension tokens are referenced in other tokens."}),`
`,e.jsx(t.h3,{id:"positive",children:"Positive"}),`
`,e.jsx(i,{sorted:!0,tokens:o("betterplace-dimension","core","betterplace-dimension-[^negative].*"),preview:n=>e.jsx(c,{token:n})}),`
`,e.jsx(t.h3,{id:"negative",children:"Negative"}),`
`,e.jsx(i,{sorted:!0,tokens:o("betterplace-dimension","core","betterplace-dimension-negative.*"),preview:n=>e.jsx(v,{token:n})}),`
`,e.jsx(t.h2,{id:"shadow",children:"Shadow"}),`
`,e.jsx(i,{tokens:o("betterplace-shadow","core"),preview:n=>e.jsx(m,{token:n})}),`
`,e.jsx(t.h2,{id:"sizing-fixed",children:"Sizing (fixed)"}),`
`,e.jsx(i,{tokens:o("betterplace-sizing-fix","core"),preview:n=>e.jsx(c,{token:n})}),`
`,e.jsx(t.h2,{id:"opacities",children:"Opacities"}),`
`,e.jsx(i,{tokens:o("betterplace-opacity","core"),preview:n=>e.jsx(f,{token:n})})]})}function E(r={}){const{wrapper:t}={...p(),...r.components};return t?e.jsx(t,{...r,children:e.jsx(l,{...r})}):l(r)}export{E as default};
