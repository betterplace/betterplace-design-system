import{j as e}from"./jsx-runtime-BlAj40OV.js";import{useMDXComponents as s}from"./index-BI1Biiay.js";import{ae as i}from"./index-MGWx0JLu.js";import"./index-Cs7sjTYM.js";import"./_commonjsHelpers-BosuxZz1.js";import"./iframe-BvGR7V1Z.js";import"../sb-preview/runtime.js";import"./index-BU4L-DQy.js";import"./index-D-8MO0q_.js";import"./index-nrpnv_Jx.js";import"./index-DrFu-skq.js";const r=""+new URL("namingTokens-BbyGk0Xs.png",import.meta.url).href;function o(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Tokens/How we use tokens"}),`
`,e.jsx(n.h1,{id:"how-we-use-tokens",children:"How we use tokens"}),`
`,e.jsx(n.p,{children:"Tokens are the variables that define the visual attributes of our design system. We use the tokens in Figma and as CSS variables in our code."}),`
`,e.jsx(n.h2,{id:"token-levels",children:"Token levels"}),`
`,e.jsx(n.p,{children:"We defined different token levels:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Core tokens"})," are the base. They are not used directly, but are the only tokens semantic tokens refer to."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Semantic tokens"})," mainly describe the general job and hierarchy of a token. Composition tokens refer to them."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Composition tokens"})," simplify the usage of multiple tokens at once. In Figma composition tokens can be applied like all other tokens. In code we have to translate compositions into classes."]}),`
`]}),`
`,e.jsxs(n.p,{children:["We have decided to use the terms “Core” and “Semantic” because several other teams use these terms, too, as mentioned in this ",e.jsx(n.a,{href:"https://uxdesign.cc/naming-design-tokens-9454818ed7cb",rel:"nofollow",children:"article"})," by Lukas Oppermann (Medium members only). Most importantly though the terms made most sense to us, the people working with them."]}),`
`,e.jsx(n.p,{children:"We decided not to have the additional level of component tokens for now, but stick to the more general yet clear semantic tokens."}),`
`,e.jsx(n.h2,{id:"naming-tokens",children:"Naming tokens"}),`
`,e.jsxs(n.p,{children:["We based the naming convention on an ",e.jsx(n.a,{href:"https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676",rel:"nofollow",children:"article on token naming"})," by Nathan Curtis."]}),`
`,e.jsx("img",{src:r,alt:"A diagram showing Nathan Curtis' token naming system. It consists of four main levels (Namespace, Object, Base, Modifier), each one listing the sub categories that it contains."}),`
`,e.jsx(n.p,{children:"Accordingly, a token may consist of one (or none or multiple):"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Namespace (System, Theme, Domain),"}),`
`,e.jsx(n.li,{children:"Object (Group, Component, Element),"}),`
`,e.jsx(n.li,{children:"Base (Category, Concept, Property) and"}),`
`,e.jsx(n.li,{children:"Modifier (Variant, State, Scale, Mode)."}),`
`]}),`
`,e.jsxs(n.p,{children:["In Figma a dot notation is used to group tokens based on the naming convention (e.g. ",e.jsx(n.code,{children:"color.green-600"}),"). For the CSS variables in the code we use kebab-case. We prepend the variable names with a prefix (e.g. ",e.jsx(n.code,{children:"--betterplace-color-green-600"}),")."]})]})}function j(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{j as default};
