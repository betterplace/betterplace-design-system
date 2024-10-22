import{j as e}from"./jsx-runtime-BlAj40OV.js";import{useMDXComponents as c}from"./index-BI1Biiay.js";import{ae as l}from"./index-MGWx0JLu.js";import"./index-Cs7sjTYM.js";import{B as p}from"./BoxShadowPreview-Dn55OzGr.js";import{C as h}from"./ColorPreview-BwjA73zZ.js";import{D as s}from"./DimensionPreview-BC7yfB8E.js";import{F as d}from"./FluidityHint-CaQrXXn1.js";import{T as i,g as r}from"./TokenTable-D3vO-9ze.js";import{O as m}from"./OpacityPreview-BBpQ--rv.js";import{T as x}from"./TypographyPreview-D0gSZFwg.js";import"./iframe-BvGR7V1Z.js";import"../sb-preview/runtime.js";import"./index-BU4L-DQy.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-D-8MO0q_.js";import"./index-nrpnv_Jx.js";import"./index-DrFu-skq.js";import"./core-Drm9bBME.js";import"./semantic-BrXw8HCe.js";import"./index-Bl6ORisp.js";const j=({token:o})=>e.jsx("div",{style:{fontSize:`var(--${o.name})`,fontFamily:"var(--betterplace-font-families-fira-sans)",maxInlineSize:"30rem",lineHeight:"var(--betterplace-line-heights-base)",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),f=({token:o})=>e.jsx("div",{style:{marginLeft:"13px",blockSize:"var(--betterplace-sizing-400)",boxShadow:`var(--${o.name}) 0 0 var(--betterplace-color-purple-400)`}});function a(o){const n={h1:"h1",h2:"h2",h3:"h3",p:"p",...c(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Tokens/Core token reference"}),`
`,e.jsx(n.h1,{id:"core-token-reference",children:"Core token reference"}),`
`,e.jsx(n.p,{children:"This page lists all of our core tokens. Do not use them directly. They just form the basis to define our semantic tokens."}),`
`,e.jsx(d,{}),`
`,e.jsx(n.h2,{id:"color",children:"Color"}),`
`,e.jsx(i,{tokens:r("betterplace-color","core"),preview:t=>e.jsx(h,{token:t})}),`
`,e.jsx(n.h2,{id:"font-size",children:"Font size"}),`
`,e.jsx(n.p,{children:"Font sizes scale smoothly between a minimum and maximum value depending on the viewport width."}),`
`,e.jsx(i,{sorted:!0,tokens:r("betterplace-font-size","core"),preview:t=>e.jsx(j,{token:t})}),`
`,e.jsx(n.h2,{id:"font-family",children:"Font family"}),`
`,e.jsx(i,{tokens:r("betterplace-font-families","core")}),`
`,e.jsx(n.h2,{id:"font-weight",children:"Font weight"}),`
`,e.jsx(i,{tokens:r("betterplace-font-weights","core")}),`
`,e.jsx(n.h2,{id:"line-height",children:"Line height"}),`
`,e.jsx(i,{tokens:r("betterplace-line-heights","core")}),`
`,e.jsx(n.h2,{id:"letter-spacing",children:"Letter spacing"}),`
`,e.jsx(i,{tokens:r("betterplace-letter-spacing","core")}),`
`,e.jsx(n.h2,{id:"paragraph-spacing",children:"Paragraph spacing"}),`
`,e.jsx(i,{tokens:r("betterplace-paragraph-spacing","core"),preview:t=>e.jsx(s,{token:t})}),`
`,e.jsx(n.h2,{id:"text-case",children:"Text case"}),`
`,e.jsx(i,{tokens:r("betterplace-text-case","core")}),`
`,e.jsx(n.h2,{id:"text-decoration",children:"Text decoration"}),`
`,e.jsx(i,{tokens:r("betterplace-text-decoration","core")}),`
`,e.jsx(n.h2,{id:"typography-compound",children:"Typography (compound)"}),`
`,e.jsx(i,{sorted:!0,tokens:r("betterplace-typography","core"),preview:t=>e.jsx(x,{token:t})}),`
`,e.jsx(n.h2,{id:"measures",children:"Measures"}),`
`,e.jsx(i,{tokens:r("betterplace-measure","core"),preview:t=>e.jsx(s,{token:t})}),`
`,e.jsx(n.h2,{id:"dimension-generic",children:"Dimension (generic)"}),`
`,e.jsx(n.p,{children:"The dimension tokens define a generic amount of distance. They are multiples of the root font size. Because the font size grows and shrinks fluidly between a set min and max value, the dimension tokens will likewise vary in size. This way larger screens will have larger spacings, gaps, etc. and small screens smaller ones according to font size."}),`
`,e.jsx(n.p,{children:"The generic dimension tokens are referenced in other tokens."}),`
`,e.jsx(n.h3,{id:"positive",children:"Positive"}),`
`,e.jsx(i,{sorted:!0,tokens:r("betterplace-dimension","core","betterplace-dimension-[^negative].*"),preview:t=>e.jsx(s,{token:t})}),`
`,e.jsx(n.h3,{id:"negative",children:"Negative"}),`
`,e.jsx(i,{sorted:!0,tokens:r("betterplace-dimension","core","betterplace-dimension-negative.*"),preview:t=>e.jsx(f,{token:t})}),`
`,e.jsx(n.h2,{id:"shadow",children:"Shadow"}),`
`,e.jsx(i,{tokens:r("betterplace-shadow","core"),preview:t=>e.jsx(p,{token:t})}),`
`,e.jsx(n.h2,{id:"sizing-fixed",children:"Sizing (fixed)"}),`
`,e.jsx(i,{tokens:r("betterplace-sizing-fix","core"),preview:t=>e.jsx(s,{token:t})}),`
`,e.jsx(n.h2,{id:"opacities",children:"Opacities"}),`
`,e.jsx(i,{tokens:r("betterplace-opacity","core"),preview:t=>e.jsx(m,{token:t})})]})}function _(o={}){const{wrapper:n}={...c(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(a,{...o})}):a(o)}export{_ as default};
