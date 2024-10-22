import{j as e}from"./jsx-runtime-BlAj40OV.js";import{useMDXComponents as d}from"./index-BI1Biiay.js";import{ae as a}from"./index-MGWx0JLu.js";import"./index-Cs7sjTYM.js";import{F as c}from"./FluidityHint-CaQrXXn1.js";import{T as n,g as i}from"./TokenTable-D3vO-9ze.js";import"./index-Bl6ORisp.js";import"./iframe-BvGR7V1Z.js";import"../sb-preview/runtime.js";import"./index-BU4L-DQy.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-D-8MO0q_.js";import"./index-nrpnv_Jx.js";import"./index-DrFu-skq.js";import"./core-Drm9bBME.js";import"./semantic-BrXw8HCe.js";const p=({token:r})=>e.jsx("div",{style:{backgroundColor:"var(--betterplace-color-purple-400)",borderRadius:`var(--${r.name})`,blockSize:"var(--betterplace-sizing-600)",inlineSize:"var(--betterplace-sizing-600)"}}),m=({token:r})=>e.jsx("div",{style:{border:`var(--${r.name})`,blockSize:"var(--betterplace-sizing-600)",inlineSize:"var(--betterplace-sizing-600)"}}),l=({token:r})=>e.jsx("hr",{style:{borderColor:"var(--betterplace-color-purple-400)",borderWidth:`var(--${r.name})`}});function s(r){const t={h1:"h1",h2:"h2",p:"p",...d(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Tokens/Borders"}),`
`,e.jsx(t.h1,{id:"borders",children:"Borders"}),`
`,e.jsx(c,{}),`
`,e.jsx(t.h2,{id:"border-width",children:"Border width"}),`
`,e.jsx(t.p,{children:"Border width tokens reference generic dimension tokens."}),`
`,e.jsx(n,{tokens:i("betterplace-border-width","semantic"),preview:o=>e.jsx(l,{token:o})}),`
`,e.jsx(t.h2,{id:"border-radius",children:"Border radius"}),`
`,e.jsx(t.p,{children:"Border radius tokens reference generic dimension tokens."}),`
`,e.jsx(n,{sorted:!0,tokens:i("betterplace-border-radius","semantic"),preview:o=>e.jsx(p,{token:o})}),`
`,e.jsx(t.h2,{id:"border-compound",children:"Border (compound)"}),`
`,e.jsx(n,{tokens:i("betterplace-border","semantic","betterplace-border-(?!.*(width|radius))"),preview:o=>e.jsx(m,{token:o})})]})}function D(r={}){const{wrapper:t}={...d(),...r.components};return t?e.jsx(t,{...r,children:e.jsx(s,{...r})}):s(r)}export{D as default};
