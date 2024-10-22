import{j as e}from"./jsx-runtime-BlAj40OV.js";import{useMDXComponents as s}from"./index-BI1Biiay.js";import{ae as r}from"./index-MGWx0JLu.js";import"./index-Cs7sjTYM.js";import"./_commonjsHelpers-BosuxZz1.js";import"./iframe-BvGR7V1Z.js";import"../sb-preview/runtime.js";import"./index-BU4L-DQy.js";import"./index-D-8MO0q_.js";import"./index-nrpnv_Jx.js";import"./index-DrFu-skq.js";function t(i){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Guides/Accessibility guide/Best practices"}),`
`,e.jsx(n.h1,{id:"accessibility-a11y-guide--best-practices",children:"Accessibility (a11y) guide — Best practices"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"General remark:"})," Always keep in mind that accessibility is not only about following rules, but about the best way to serve the needs of users. So use best practices thoughtfully."]}),`
`,e.jsx(n.h2,{id:"best-practices-for-ux-designers",children:"Best practices for UX designers"}),`
`,e.jsx(n.h3,{id:"color",children:"Color"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"All information-bearing elements must at least have a contrast of 4.5:1 (to background)"}),`
`,e.jsx(n.li,{children:"Exceptions are UI controls (e.g. check in checkbox) color fills, text bigger than 18px (bold). They only need 3:1."}),`
`,e.jsx(n.li,{children:"Disabled and decorative elements don't need to reach a contrast ratio: but even better if they do!"}),`
`,e.jsx(n.li,{children:"Design color independently. That means, an interface needs to be understood in gray scale as well."}),`
`]}),`
`,e.jsx(n.h3,{id:"interaction",children:"Interaction"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Elements that can be interacted with should be clearly identifiable by unique signifiers that are only used for that type of interaction."}),`
`,e.jsxs(n.li,{children:["Rules of thumb:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Text within a box is a button."}),`
`,e.jsx(n.li,{children:"Underlined, blue, underlined and blue text is a link."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Stick to one style for interactive elements throughout the platform to reduce interaction cost."}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.strong,{children:"touch target size"})," (area of and around an element that triggers an action) needs to be at least ",e.jsx(n.strong,{children:"44 x 44px"})," (Google says 48 x 48px)."]}),`
`,e.jsxs(n.li,{children:["Make sure to have designed for all the states you need: ",e.jsx(n.strong,{children:"Default, hover, focus, pressed, disabled, loading/processing"}),", checked (toggled), visited."]}),`
`,e.jsx(n.li,{children:"Everything that can be swiped or dragged, needs also being able to be clicked/tabbed."}),`
`]}),`
`,e.jsx(n.h3,{id:"content",children:"Content"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Each link that links to a unique url should have a unique and out of context understandable link text."}),`
`,e.jsx(n.li,{children:"All CTAs should include the main keyword and action verb within the first 1-3 words of the text/label (that's all our brain focuses on and reads before making a decision)."}),`
`,e.jsxs(n.li,{children:["Every link is a promise: make it precise and transparent where it'll lead. ",e.jsx(n.strong,{children:"Tip:"})," To avoid “show/read more links” link the headline of the content."]}),`
`,e.jsx(n.li,{children:`Show hints and error messages right after the label (otherwise the user won't know what to look out for before filling in the input).
Never show important text below a CTA for the same reason.`}),`
`,e.jsx(n.li,{children:"Make sure sighted and people with visual deficiency as well as cognitive disabilities (or tired and stressed people) can also skip through a page by using concise and comprehensive link/heading/button copy."}),`
`,e.jsx(n.li,{children:"Make sure all information-bearing icons, graphics and illustrations have an ALT text."}),`
`]}),`
`,e.jsx(n.h2,{id:"best-practices-for-engineers",children:"Best practices for engineers"}),`
`,e.jsx(n.h3,{id:"content-structure-and-order",children:"Content structure and order"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Make sure every page has a title. There should only be one ",e.jsx(n.code,{children:"h1"})," per page."]}),`
`,e.jsx(n.li,{children:"Make sure heading levels are in a logical order."}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/landmark_role",rel:"nofollow",children:"landmark roles"})," to help navigate quicker, the ARIA specification defines the following eight landmark roles:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"banner"}),`
`,e.jsx(n.li,{children:"navigation"}),`
`,e.jsx(n.li,{children:"search"}),`
`,e.jsx(n.li,{children:"main"}),`
`,e.jsx(n.li,{children:"region"}),`
`,e.jsx(n.li,{children:"complementary"}),`
`,e.jsx(n.li,{children:"form"}),`
`,e.jsx(n.li,{children:"contentinfo."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Don't move around items arbitrarily with CSS (be careful with ",e.jsx(n.code,{children:"order"}),", ",e.jsx(n.code,{children:"float"})," or ",e.jsx(n.code,{children:"grid"})," for example). It can result in a ",e.jsx(n.a,{href:"https://www.matuzo.at/blog/the-dark-side-of-the-grid-part-2/",rel:"nofollow",children:"confusing experience for keyboard users"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{id:"markup",children:"Markup"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element",rel:"nofollow",children:"native HTML elements"})," wherever it makes semantically sense. Most HTML elements convey a semantic meaning and provide additional functionality, that users can benefit from or even depend on."]}),`
`]}),`
`,e.jsx(n.h4,{id:"examples",children:"Examples"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["use a ",e.jsx(n.code,{children:"button"}),", when an interaction triggers some action on the page, e.g. opening a modal, submitting a form, loading data, swiping a slider, etc."]}),`
`,e.jsxs(n.li,{children:["use an ",e.jsx(n.code,{children:"a"})," tag with an ",e.jsx(n.code,{children:"href"})," attribute for links when the interaction navigates the user to a different page (or a different part of the page)."]}),`
`,e.jsxs(n.li,{children:["use a ",e.jsx(n.code,{children:"ul"})," or ",e.jsx(n.code,{children:"ol"}),', whenever you want to group some items together in a list and want the user to know how many items the list contains. This does not only apply to "regular" text items, but can be anything, e.g. a gallery of images, a list of teasers, navigation items, etc.']}),`
`,e.jsxs(n.li,{children:["use headline tags (",e.jsx(n.code,{children:"h1"}),", ",e.jsx(n.code,{children:"h2"}),", etc.) for headlines."]}),`
`]}),`
`,e.jsx(n.h3,{id:"interactive-components",children:"Interactive components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use an appropriate native HTML element if possible (see ",e.jsx(n.a,{href:"#Markup",children:"Markup"}),")."]}),`
`,e.jsxs(n.li,{children:["Use ARIA roles, properties and states if there is no native HTML element. Make sure that expected interactions work (e.g. it should always be possible to trigger a button's action by pressing the ",e.jsx(n.code,{children:"Enter"})," key)."]}),`
`,e.jsx(n.li,{children:"Make sure every interactive element has a name (e.g. every form element should have an associated label)."}),`
`,e.jsx(n.li,{children:"Make sure every interactive element can be reached by using only the keyboard and the tab order is logical."}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.a,{href:"https://react-spectrum.adobe.com/react-aria/",rel:"nofollow",children:"React Aria"})," for helper methods (hooks) and the ",e.jsx(n.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/",rel:"nofollow",children:"ARIA authoring practices guide"})," as a reference for common component patterns (be aware that not everything in this guide is ready to be used in production)."]}),`
`]}),`
`,e.jsx(n.h3,{id:"hiding-content",children:"Hiding content"}),`
`,e.jsxs(n.p,{children:["Depending on the use case there are several ",e.jsx(n.a,{href:"https://kittygiraudel.com/2021/02/17/hiding-content-responsibly/",rel:"nofollow",children:"ways to hide content"}),". Think about whether the content should be"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"visible"}),`
`,e.jsx(n.li,{children:"machine readable (announced by a screen reader)"}),`
`]}),`
`,e.jsx(n.p,{children:"and based on that decide which approach is most appropriate."}),`
`,e.jsx(n.h4,{id:"examples-1",children:"Examples"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Visible but not machine readable (example: decorative icons)"}),`
`,e.jsx(n.li,{children:"Invisible but machine readable (example: context for icon-only buttons)"}),`
`,e.jsx(n.li,{children:"Invisible and not machine readable (example: offscreen content such as a closed modal window)"}),`
`,e.jsx(n.li,{children:"Visible and machine readable (example: most stuff)"}),`
`]}),`
`,e.jsx(n.h3,{id:"changing-content",children:"Changing content"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use live regions to inform screen reader users about important changes on the page."}),`
`,e.jsx(n.li,{children:"Do not overuse live regions as they have the potential to distract screen reader users."}),`
`]}),`
`,e.jsx(n.h3,{id:"images",children:"Images"}),`
`,e.jsx(n.h4,{id:"alternative-text",children:"Alternative text"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Make sure ",e.jsx(n.em,{children:"every"})," image has an ",e.jsx(n.code,{children:"alt"})," attribute, either with"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["a descriptive text (learn more about how to ",e.jsx(n.a,{href:"https://webaim.org/techniques/alttext/",rel:"nofollow",children:"write good alt text"}),") or"]}),`
`,e.jsx(n.li,{children:"an empty string. This only applies to images that are purely decorative and don't contribute anything to the content."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"If it's an image uploaded by the user, decide whether"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:['we can define a general rule, e.g. "avatar of ',e.jsx(n.em,{children:"name of the user"}),'". (Keep in mind that this is usually less valuable of an information. You should also be careful not to create redundancy.) Or']}),`
`,e.jsx(n.li,{children:"we should give the user the possibility to enter their own alternative text."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h4,{id:"responsive-images",children:"Responsive images"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Make sure images are served only as big as necessary."}),`
`]}),`
`,e.jsx(n.h3,{id:"zooming-and-font-size",children:"Zooming and font size"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't use pixels values unless you explicitly want the value to stay consistent no matter the font size (which might be the case for borders and shadows for example)."}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"rem"})," for most of the things and ",e.jsx(n.code,{children:"em"})," when it makes sense (font sizes, line-height)."]}),`
`]}),`
`,e.jsx(n.h3,{id:"forced-colors-mode",children:"Forced colors mode"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Add a transparent border (or outline) to things that rely on background colors or box-shadows to be discernible."}),`
`,e.jsxs(n.li,{children:["Set ",e.jsx(n.code,{children:"text-decoration-color"})," to transparent for links that rely on box-shadows or gradients to be discernible."]}),`
`,e.jsxs(n.li,{children:["If you have an icon sitting next to a piece of text, use ",e.jsx(n.code,{children:"currentColor"})," to make sure the icon inherits the color of its surrounding text. This will ensure that it will always be discernible."]}),`
`]})]})}function m(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{m as default};
