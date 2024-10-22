import{j as e}from"./jsx-runtime-BlAj40OV.js";import{useMDXComponents as t}from"./index-BI1Biiay.js";import{ae as l}from"./index-MGWx0JLu.js";import"./index-Cs7sjTYM.js";import"./_commonjsHelpers-BosuxZz1.js";import"./iframe-BvGR7V1Z.js";import"../sb-preview/runtime.js";import"./index-BU4L-DQy.js";import"./index-D-8MO0q_.js";import"./index-nrpnv_Jx.js";import"./index-DrFu-skq.js";const o=""+new URL("a11yWorkflow-DCWjW6t1.png",import.meta.url).href;function i(s){const n={a:"a",code:"code",em:"em",h1:"h1",h3:"h3",h4:"h4",li:"li",p:"p",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Guides/Accessibility guide/Workflow"}),`
`,e.jsx(n.h1,{id:"accessibility-a11y-guide--workflow",children:"Accessibility (a11y) guide — Workflow"}),`
`,e.jsx(n.p,{children:"Accessibility (a11y) is incorporated into different steps of our workflow."}),`
`,e.jsx("img",{src:o,alt:"Workflow sketch",width:"50%"}),`
`,e.jsx(n.h3,{id:"1-discovery",children:"1. Discovery"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"🚧 Use a11y metrics (score?, number of critical issues?)"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"In a later expansion stage"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Interview people with disabilities to get a better understanding of their problems and needs."}),`
`]}),`
`,e.jsx(n.h3,{id:"2-design",children:"2. Design"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.a,{href:"https://not-checklist.intopia.digital/",rel:"nofollow",children:"checklist"})," (filtered by job roles ",e.jsx(n.em,{children:"Visual Design"}),", ",e.jsx(n.em,{children:"Content Design"})," and ",e.jsx(n.em,{children:"UX Design"}),") to make sure the design is accessible. UX designers could as well start with the reduced checklist from the ",e.jsx(n.a,{href:"https://www.figma.com/file/PJ7OUutWRrSHW6qgaPNW1l/DS-betterplace-GENERAL?node-id=2264%3A3762",rel:"nofollow",children:"annotation example"})," and only after that use the mentioned full checklist to double-check."]}),`
`,e.jsxs(n.li,{children:["Make annotations to pass on structural and/or interactual a11y considerations to engineers (see ",e.jsx(n.a,{href:"https://www.figma.com/file/PJ7OUutWRrSHW6qgaPNW1l/DS-betterplace-GENERAL?node-id=2264%3A3762",rel:"nofollow",children:"annotation example"})," with reusable annotation elements)."]}),`
`,e.jsx(n.li,{children:"Use design system to reuse accessible styles and components."}),`
`]}),`
`,e.jsx(n.h3,{id:"3-refinement",children:"3. Refinement"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.a,{href:"https://not-checklist.intopia.digital/",rel:"nofollow",children:"checklist"})," to make sure the planned implementation considers a11y."]}),`
`,e.jsx(n.li,{children:"🚧 Define a11yAC's"}),`
`]}),`
`,e.jsx(n.h3,{id:"4-implementation",children:"4. Implementation"}),`
`,e.jsx(n.h4,{id:"41-development--automated-testing",children:"4.1 Development & Automated testing"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Read a11yAC's (and eventually have a look at the ",e.jsx(n.a,{href:"https://not-checklist.intopia.digital/",rel:"nofollow",children:"checklist"})," again) to know what to code and how to test."]}),`
`,e.jsx(n.li,{children:"Follow coding standards to avoid minor recurring a11y problems."}),`
`,e.jsxs(n.li,{children:["Use the browser's a11y development tools (e.g. from ",e.jsx(n.a,{href:"https://firefox-source-docs.mozilla.org/devtools-user/accessibility_inspector/",rel:"nofollow",children:"Firefox"})," or ",e.jsx(n.a,{href:"https://developer.chrome.com/docs/devtools/accessibility/reference/",rel:"nofollow",children:"Chrome"}),") to check code consequences or for debugging."]}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.a,{href:"https://www.npmjs.com/package/eslint-plugin-jsx-a11y",rel:"nofollow",children:"linter"})," and ",e.jsx(n.a,{href:"https://www.npmjs.com/package/@axe-core/react",rel:"nofollow",children:"logging to the browser's console"})," to catch and fix a11y issues early."]}),`
`,e.jsx(n.li,{children:"Use design system to reuse accessible styles and components. In Storybook, you can also check the accessibility tab for each component to see if any tests fail."}),`
`,e.jsx(n.li,{children:"Add automated tests considering keyboard and screen reader usage."}),`
`,e.jsxs(n.li,{children:["Add an automated accessibility scan to catch any automatically detectable issues. We use ",e.jsx(n.code,{children:"@axe-core/playwright"})," to automate these checks. You can find an example in ",e.jsx(n.a,{href:"../../../../../packages/test-playwright/tests/donationFlow/accessibilityCheck.spec.ts",children:"frontend/packages/test-playwright/tests/donationFlow/accessibilityCheck.spec.ts"}),"."]}),`
`]}),`
`,e.jsx(n.h4,{id:"42-manual-testing",children:"4.2 Manual testing"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Read a11yAC's to know what to test and how."}),`
`,e.jsxs(n.li,{children:["Follow ",e.jsx(n.a,{href:"?path=/docs/guides-manual-testing-guide--docs",children:"manual testing guidelines"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"5-measurement",children:"5. Measurement"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"🚧 Use a11y metrics (score?, number of critical issues?)"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"In a later expansion stage"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Perform UX Tests or other UX research methods with people with disabilities."}),`
`]}),`
`,e.jsx(n.h3,{id:"training",children:"Training"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Provide ",e.jsx(n.a,{href:"?path=/docs/guides-accessibility-guide-knowledge--docs",children:"a11y knowledge"})]}),`
`,e.jsxs(n.li,{children:["Share basic a11y knowledge in ",e.jsx(n.a,{href:"https://drive.google.com/drive/folders/1hXdFVOSdJxsaFI__fB66ADVV-5Hmk9FW?usp=drive_link",rel:"nofollow",children:"initial meetings / workshops"})]}),`
`,e.jsx(n.li,{children:"Regularly share a11y knowledge / discuss a11y topics in different meetings (Tech Talk, Sprint Review, …)"}),`
`]}),`
`,e.jsx(n.h3,{id:"documentation",children:"Documentation"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Keep documentation up to date"}),`
`,e.jsx(n.li,{children:"Build accessible design system"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"In a later expansion stage"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Derive a11yAC templates from a11yAC's."}),`
`]})]})}function g(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{g as default};
