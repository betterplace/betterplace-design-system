import{j as e}from"./jsx-runtime-BlAj40OV.js";import{useMDXComponents as s}from"./index-BI1Biiay.js";import{ae as r}from"./index-MGWx0JLu.js";import"./index-Cs7sjTYM.js";import"./_commonjsHelpers-BosuxZz1.js";import"./iframe-BvGR7V1Z.js";import"../sb-preview/runtime.js";import"./index-BU4L-DQy.js";import"./index-D-8MO0q_.js";import"./index-nrpnv_Jx.js";import"./index-DrFu-skq.js";function t(i){const n={h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Patterns/Overview"}),`
`,e.jsx(n.h1,{id:"patterns-overview",children:"Patterns overview"}),`
`,e.jsx(n.h2,{id:"messages",children:"Messages"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Use messages to communicate important information or show responses to user actions."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Messages are positioned before the content (in contrast to form field validations) and appear to be floating above the content without actually covering anything."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Messages cannot be dismissed."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"We have three different kinds of messages:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Warning/Attention"}),": Shares important information with the user."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Success"}),": Tells the user that an action like saving, sending, uploading was successful."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Danger/Error"}),": Tells the user that an action like saving, sending, uploading was not successfull."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"There may appear multiple warning/attention and/or error messages one after another."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Success messages should not be used when the interfaces has already made the success clear in other ways. ",e.jsx(n.strong,{children:"Example:"})," The post-donation page does not need an additional success message."]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{id:"additional-guidance",children:"Additional guidance"}),`
`,e.jsx(n.h3,{id:"tooltips",children:"Tooltips"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Use tooltips to communicate additional information that is not needed to fulfill core user goals."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use tooltips only when the information is necessary for a very niche user group."}),`
`,e.jsx(n.li,{children:"Tooltips are immediately next to the element they have the additional information on. Make sure to make them easy to discover for screenreader users."}),`
`]}),`
`,e.jsx(n.h3,{id:"helper-texts",children:"Helper texts"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Use helper text for critical information users have to see before they perform an action."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use helper text only if certain that there is no other way of conveying that information through the process or interface."}),`
`,e.jsx(n.li,{children:"Make sure it is of importance for the majority of users."}),`
`,e.jsx(n.li,{children:"Helper texts should be clearly visible before the respective call to action and span the whole content width (body text measure applied)."}),`
`,e.jsx(n.li,{children:"In the best case it is only shown on pages/before actions that are not regularly visited/performed."}),`
`,e.jsx(n.li,{children:"Helper texts are shown within a pale yellow box with an attention icon."}),`
`]}),`
`,e.jsx(n.h2,{id:"forms",children:"Forms"}),`
`,e.jsx(n.h3,{id:"form-field-errors",children:"Form field errors"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Form fields are validated as soon as the user leaves the focus."}),`
`,e.jsx(n.li,{children:"When the input is incorrect there is a red message (plus additional signifier, like a thick red border) stating what is wrong and what has to be done to correct it."}),`
`]}),`
`,e.jsx(n.h3,{id:"warnings",children:"Warnings"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`In case the user fills an input with data that is technically valid but questionable from context, a warning message (dark yellow, regular font) appears below the input on blur (unfocus).
`,e.jsx(n.strong,{children:"Example:"})," A project manager changes an organization IBAN that was already used in a different instance."]}),`
`]}),`
`,e.jsx(n.h3,{id:"hints",children:"Hints"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Hints should be right below the label of a component to make sure they are read/discovered by every user before interacting with a component (e.g. input field or radio button)."}),`
`]}),`
`,e.jsx(n.h3,{id:"input-fields",children:"Input fields"}),`
`,e.jsx(n.p,{children:"For now there can only be an icon right of a text/number input."}),`
`,e.jsx(n.p,{children:"The icon may be used to make the kind of requested input more clear and in exceptions provide an extra function"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Examples:"})," A lock for passwords, a euro sign for money …"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Extra function (example):"})," View/hide icon option for passwords"]}),`
`,e.jsx(n.h2,{id:"content-navigation",children:"Content navigation"}),`
`,e.jsx(n.h3,{id:"buttons-and-links",children:"Buttons and links"}),`
`,e.jsx(n.h4,{id:"hierarchy",children:"Hierarchy"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Primary button:"})," next action for user in a process"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Secondary button (on and off color):"})," when two next actions are possible"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Primary link:"})," when there is no clear next step and the user may perform a variety of actions"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Secondary link:"})," unnecessary but possibly interesting information / action"]}),`
`]}),`
`,e.jsx(n.h4,{id:"positioning",children:"Positioning"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"When there are multiple actions possible and there is a clear preferred next step, the primary action is on the very right in a horizontal right-aligned layout, on the very left in a left-aligned layout and at the bottom of a vertical layout."}),`
`,e.jsx(n.li,{children:"When there are multiple actions necessary and no clear next step, choose one type of CTA (the one most sensible and intuitive for the current page/section)."}),`
`,e.jsx(n.li,{children:"Destructive actions should usually be in a secondary position unless they are the next preferred step in the user journey."}),`
`]}),`
`,e.jsx(n.h3,{id:"tiles",children:"Tiles"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If a tile doesn’t have a button included, the whole tile is clickable."}),`
`,e.jsxs(n.li,{children:["If there are multiple CTAs on/actions triggered by the tile there are two options:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"There is a primary action that is triggered by clicking the whole tile (and not only a button/link)."}),`
`,e.jsx(n.li,{children:"The two or more actions are equally important and so the tile is not clickable itself entirely."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{id:"hover-states",children:"Hover states"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Use hover states only for interactive components."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Buttons and links (including icons) get a darker background on hover."}),`
`,e.jsx(n.li,{children:"Input fields, tiles, checkboxes and radio buttons get a lower shadow on hover."}),`
`]}),`
`,e.jsx(n.h2,{id:"loading-states",children:"Loading states"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Use loading states to communicate the need to wait for something to load."})}),`
`,e.jsx(n.h3,{id:"skeleton",children:"Skeleton"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"On entering, we use the skeleton loading pattern either for the entire page or just parts of it until the whole content has loaded."}),`
`,e.jsx(n.li,{children:"The animation will only start after 1 second, to avoid flickering effects."}),`
`]}),`
`,e.jsx(n.h3,{id:"spinner",children:"Spinner"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"We are using spinners in or below components. A button can have an integrated spinner, if the action triggered by pressing the button takes longer than a second."}),`
`,e.jsx(n.li,{children:"A spinner can also be integrated in a layout when loading a part of a page that takes longer than a second (loading more project teasers)."}),`
`]}),`
`,e.jsx(n.h2,{id:"elevation",children:"Elevation"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The higher an element the more important to the user."}),`
`,e.jsx(n.li,{children:"Hover may be used to “lift” something for further scrutiny, selecting should have the opposite effect and “press” the element down again."}),`
`]})]})}function m(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{m as default};
