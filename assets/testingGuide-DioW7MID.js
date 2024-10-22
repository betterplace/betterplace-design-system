import{j as e}from"./jsx-runtime-BlAj40OV.js";import{useMDXComponents as s}from"./index-BI1Biiay.js";import{ae as o}from"./index-MGWx0JLu.js";import"./index-Cs7sjTYM.js";import"./_commonjsHelpers-BosuxZz1.js";import"./iframe-BvGR7V1Z.js";import"../sb-preview/runtime.js";import"./index-BU4L-DQy.js";import"./index-D-8MO0q_.js";import"./index-nrpnv_Jx.js";import"./index-DrFu-skq.js";const t=""+new URL("colorVisionDeficienciesSettingsChrome-CMbozw2B.png",import.meta.url).href,l=""+new URL("colorVisionDeficienciesSettingsFirefox-CK_ulOtD.png",import.meta.url).href;function i(n){const r={a:"a",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Guides/Manual testing guide"}),`
`,e.jsx(r.h1,{id:"manual-testing-guide",children:"Manual testing guide"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:["Test with a ",e.jsx(r.strong,{children:"pointing device"})," (e.g. a computer mouse) and ",e.jsx(r.strong,{children:"touch device"})," to ensure interactive elements work."]}),`
`,e.jsxs(r.li,{children:["Test responsiveness on devices with ",e.jsx(r.strong,{children:"different screen sizes"}),"."]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Zoom"})," in and out (ctrl +/-) and ",e.jsx(r.strong,{children:"change the font size in your browser settings"})," to ensure content is accessible outside your standard view."]}),`
`,e.jsxs(r.li,{children:["Test with ",e.jsx(r.strong,{children:"only a keyboard"})," (learn how below) to ensure all content is accessible without using a pointing or touch device."]}),`
`,e.jsxs(r.li,{children:["Test with ",e.jsx(r.strong,{children:"screen readers"})," (learn how below) to ensure all content is accessible and coherent when read aloud."]}),`
`,e.jsxs(r.li,{children:["If content changed / has been added: Read through the ",e.jsx(r.strong,{children:"content"})," to ensure everything is understandable."]}),`
`,e.jsxs(r.li,{children:["If design changed / is new: Emulate ",e.jsx(r.strong,{children:"color vision deficiencies"})," and ",e.jsx(r.strong,{children:"forced colors"})," (learn how below) to ensure content is distinguishable."]}),`
`]}),`
`,e.jsx(r.h2,{id:"how-to-test-with-only-a-keyboard",children:"How to test with only a keyboard"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:["Browser keyboard navigation has to be enabled manually on MacOS: ",e.jsx(r.a,{href:"https://www.a11yproject.com/posts/macos-browser-keyboard-navigation/",rel:"nofollow",children:"https://www.a11yproject.com/posts/macos-browser-keyboard-navigation/"})]}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://webaim.org/techniques/keyboard/",rel:"nofollow",children:"Intro to keyboard testing"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://tetralogical.com/blog/2021/10/26/browsing-with-a-keyboard/",rel:"nofollow",children:"Browsing with a keyboard"})}),`
`]}),`
`,e.jsx(r.h2,{id:"how-to-test-with-screen-readers",children:"How to test with screen readers"}),`
`,e.jsx(r.h3,{id:"getting-started",children:"Getting started"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://tetralogical.com/blog/2021/09/29/browsing-with-a-desktop-screen-reader/",rel:"nofollow",children:"Browsing with a desktop screen reader"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://tetralogical.com/blog/2021/10/05/browsing-with-a-mobile-screen-reader/",rel:"nofollow",children:"Browsing with a mobile screen reader"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://www.accessibility-developer-guide.com/knowledge/screen-readers/",rel:"nofollow",children:"Introduction to screen reader usage"})}),`
`]}),`
`,e.jsx(r.h3,{id:"which-browser-and-screen-reader-pairings-to-test",children:"Which browser and screen reader pairings to test"}),`
`,e.jsxs(r.p,{children:["According to a ",e.jsx(r.a,{href:"https://webaim.org/projects/screenreadersurvey9/",rel:"nofollow",children:"survey"})," conducted by WebAIM, more than 90% of screen reader users reported using a desktop screen reader on Windows."]}),`
`,e.jsxs(r.p,{children:["The most popular ",e.jsx(r.strong,{children:"desktop screen readers"})," are"]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"JAWS"})," (Windows, can run in free demo mode for 40 minutes at a time)"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"NVDA"})," (Windows, free) and"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"VoiceOver"})," (MacOS, free)."]}),`
`]}),`
`,e.jsxs(r.p,{children:["The by far most popular ",e.jsx(r.strong,{children:"mobile screen reader"})," is ",e.jsx(r.strong,{children:"VoiceOver on iOS/iPadOS"}),"."]}),`
`,e.jsx(r.p,{children:"Testing with screen readers works best when they are paired with the browsers they are the most compatible with."}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:"JAWS works best with Chrome and Firefox. When testing, it should be paired with Chrome."}),`
`,e.jsx(r.li,{children:"NVDA works best with and should be paired with Firefox."}),`
`,e.jsx(r.li,{children:"VoiceOver (MacOS and iOS/iPadOS) works best with and should be paired with Safari."}),`
`]}),`
`,e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"At betterplace"})," we test with:"]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:"NVDA (Windows) (via BrowserStack)"}),`
`,e.jsx(r.li,{children:"VoiceOver (iOS/iPadOS) (directly in Safari or via BrowserStack)"}),`
`]}),`
`,e.jsx(r.h3,{id:"how-to-test-with-nvda-windows",children:"How to test with NVDA (Windows)"}),`
`,e.jsxs(r.p,{children:["As NVDA only runs on Windows, but we use Macs at betterplace, we have to either set up a ",e.jsx(r.a,{href:"https://dequeuniversity.com/mac/windows-screen-readers",rel:"nofollow",children:"virtual machine"})," or use a service similar to BrowserStack or ",e.jsx(r.a,{href:"https://assistivlabs.com/pricing",rel:"nofollow",children:"AssistivLabs"}),"."]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://www.nvaccess.org/files/nvda/documentation/userGuide.html?#BrowseMode",rel:"nofollow",children:"NVDA Browse Mode"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts",rel:"nofollow",children:"NVDA Keyboard Shortcuts"})}),`
`]}),`
`,e.jsx(r.h3,{id:"how-to-test-with-voiceover-iosipados",children:"How to test with VoiceOver (iOS/iPadOS)"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://support.apple.com/en-lb/guide/iphone/iph3e2e415f/ios",rel:"nofollow",children:"iPhone User Guide"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Mobile#ios_voiceover",rel:"nofollow",children:"Summary of screen reader testing on iOS"})}),`
`]}),`
`,e.jsx(r.h3,{id:"how-to-test-with-other-screen-readers-optional",children:"How to test with other screen readers (optional)"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts",rel:"nofollow",children:"JAWS Keyboard Shortcuts"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://support.apple.com/en-lb/guide/voiceover/welcome/10/mac",rel:"nofollow",children:"VoiceOver (MacOS) User Guide"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts",rel:"nofollow",children:"VoiceOver (MacOS) Keyboard Shortcuts"})}),`
`]}),`
`,e.jsx(r.h2,{id:"how-to-test-for-color-vision-deficiencies-firefox-chrome-and-forced-colors-only-chrome",children:"How to test for color vision deficiencies (Firefox, Chrome) and forced colors (only Chrome)"}),`
`,e.jsx(r.h3,{id:"in-firefox",children:"In Firefox"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:["Open ",e.jsx(r.em,{children:"Accessibility"})," panel."]}),`
`,e.jsxs(r.li,{children:["Choose from a selection of different color vision deficiencies in the ",e.jsx(r.em,{children:"Simulate"})," drop-down."]}),`
`]}),`
`,e.jsx("img",{src:l,alt:"Color vision deficiencies settings in Firefox",width:"50%"}),`
`,e.jsx(r.h3,{id:"in-chrome",children:"In Chrome"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:["Open the ",e.jsx(r.em,{children:"Rendering"})," panel (either use the command menu and type ",e.jsx(r.em,{children:"rendering"})," or use the three-dot menu in the top-right corner of the screen and go to ",e.jsx(r.em,{children:"More Tools"})," to find it)."]}),`
`,e.jsxs(r.li,{children:["Choose from a selection of different color vision deficiencies in the ",e.jsx(r.em,{children:"Emulate vision deficiencies"})," drop-down or ",e.jsx(r.em,{children:"forced-colors:active"})," in the ",e.jsx(r.em,{children:"Emulate CSS media feature forced-colors"})," drop-down."]}),`
`]}),`
`,e.jsx("img",{src:t,alt:"Color vision deficiencies settings in Chrome",width:"50%"})]})}function g(n={}){const{wrapper:r}={...s(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(i,{...n})}):i(n)}export{g as default};
