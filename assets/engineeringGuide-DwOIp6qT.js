import{j as e}from"./jsx-runtime-BlAj40OV.js";import{useMDXComponents as o}from"./index-BI1Biiay.js";import{ae as t}from"./index-MGWx0JLu.js";import"./index-Cs7sjTYM.js";import"./_commonjsHelpers-BosuxZz1.js";import"./iframe-BvGR7V1Z.js";import"../sb-preview/runtime.js";import"./index-BU4L-DQy.js";import"./index-D-8MO0q_.js";import"./index-nrpnv_Jx.js";import"./index-DrFu-skq.js";function r(i){const n={a:"a",blockquote:"blockquote",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Guides/Engineering guide"}),`
`,e.jsx(n.h1,{id:"engineering-guide",children:"Engineering guide"}),`
`,e.jsx(n.h2,{id:"high-level-categorization-itcss",children:"High-level categorization (ITCSS)"}),`
`,e.jsxs(n.p,{children:["For high-level categorization of things[^1] we borrow most of the wording from ",e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528",rel:"nofollow",children:"Inverted Triangle CSS"})})," as it is a really elaborate (while natural) and well-proven approach."]}),`
`,e.jsxs(n.p,{children:["The ITCSS approach suggests organizing styles in layers which build upon each other and reach from completely general to very specific scope. As ",e.jsx(n.a,{href:"https://csswizardry.com/2018/11/itcss-and-skillshare/",rel:"nofollow",children:"intended by its author"})," ",e.jsx(n.em,{children:"Harry Roberts"})," there is no official documentation. However, the general idea is pretty clear, as it's more or less just a very thorough naming scheme for the most natural and sound way to organize (styling or any other) rules: ",e.jsx(n.a,{href:"https://en.wikipedia.org/wiki/Hierarchy#Containment_hierarchy",rel:"nofollow",children:"From general to specific"}),"."]}),`
`,e.jsx(n.p,{children:"We structure our code following our slightly adapted version of the ITCSS model:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Tokens (originally Settings)"}),`
`,e.jsx(n.li,{children:"Mixins (originally Tools)"}),`
`,e.jsx(n.li,{children:"Generic"}),`
`,e.jsx(n.li,{children:"Elements"}),`
`,e.jsx(n.li,{children:"Components (originally Objects and Components where distinguished)"}),`
`,e.jsx(n.li,{children:"Utilities"}),`
`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Mixins"}),", ",e.jsx(n.em,{children:"Generic"})," und ",e.jsx(n.em,{children:"Utilities"})," are mostly relevant for frontend engineers. ",e.jsx(n.em,{children:"Tokens"}),", ",e.jsx(n.em,{children:"Elements"})," and ",e.jsx(n.em,{children:"Components"})," are the parts where UX design and frontend engineering work most overlaps."]}),`
`]}),`
`,e.jsxs(n.p,{children:["For more details see our ",e.jsx(n.a,{href:"https://github.com/betterplace/all_you_need_to_know/blob/main/conventions/frontend_coding_conventions.md#css-architecture-itcss",rel:"nofollow",children:"internal CSS architecture documentation"}),"."]}),`
`,e.jsxs(n.p,{children:[`[^1]:
Here a “thing” is any`,e.jsx(n.em,{children:"thing"})," that has ",e.jsx(n.em,{children:"some meaning"})," and needs ",e.jsx(n.em,{children:"some consideration"}),` in the context of a design
system. The main reason for talking of “things” rather than any less general term referring to a wide range of
entities is that most common terms are already commonly used with specific meaning in the context of design systems,
especially by stylesheet management methodologies, such as BEM, OOCSS or ITCSS.`]})]})}function u(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{u as default};
