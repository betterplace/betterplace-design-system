import{j as e}from"./jsx-runtime-u17CrQMm.js";import{useMDXComponents as s}from"./index-DHOJhGSV.js";import{M as o}from"./blocks-qD1qt790.js";import"./iframe-K_OwPEhI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CQksqrAn.js";import"./index-DxRQN4t8.js";const t=""+new URL("colorVisionDeficienciesSettingsChrome-CMbozw2B.png",import.meta.url).href,l=""+new URL("colorVisionDeficienciesSettingsFirefox-CK_ulOtD.png",import.meta.url).href;function i(r){const n={a:"a",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Guides/Manual testing guide"}),`
`,e.jsx(n.h1,{id:"manual-testing-guide",children:"Manual testing guide"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Test with a ",e.jsx(n.strong,{children:"pointing device"})," (e.g. a computer mouse) and ",e.jsx(n.strong,{children:"touch device"})," to ensure interactive elements work."]}),`
`,e.jsxs(n.li,{children:["Test responsiveness on devices with ",e.jsx(n.strong,{children:"different screen sizes"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Zoom"})," in and out (ctrl +/-) and ",e.jsx(n.strong,{children:"change the font size in your browser settings"})," to ensure content is accessible outside your standard view."]}),`
`,e.jsxs(n.li,{children:["Test with ",e.jsx(n.strong,{children:"only a keyboard"})," (learn how below) to ensure all content is accessible without using a pointing or touch device."]}),`
`,e.jsxs(n.li,{children:["Test with ",e.jsx(n.strong,{children:"screen readers"})," (learn how below) to ensure all content is accessible and coherent when read aloud."]}),`
`,e.jsxs(n.li,{children:["If content changed / has been added: Read through the ",e.jsx(n.strong,{children:"content"})," to ensure everything is understandable."]}),`
`,e.jsxs(n.li,{children:["If design changed / is new: Emulate ",e.jsx(n.strong,{children:"color vision deficiencies"})," and ",e.jsx(n.strong,{children:"forced colors"})," (learn how below) to ensure content is distinguishable."]}),`
`]}),`
`,e.jsx(n.h2,{id:"how-to-test-with-only-a-keyboard",children:"How to test with only a keyboard"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Browser keyboard navigation has to be enabled manually on MacOS: https://www.a11yproject.com/posts/macos-browser-keyboard-navigation/"}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://webaim.org/techniques/keyboard/",rel:"nofollow",children:"Intro to keyboard testing"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://tetralogical.com/blog/2021/10/26/browsing-with-a-keyboard/",rel:"nofollow",children:"Browsing with a keyboard"})}),`
`]}),`
`,e.jsx(n.h2,{id:"how-to-test-with-screen-readers",children:"How to test with screen readers"}),`
`,e.jsx(n.h3,{id:"getting-started",children:"Getting started"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://tetralogical.com/blog/2021/09/29/browsing-with-a-desktop-screen-reader/",rel:"nofollow",children:"Browsing with a desktop screen reader"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://tetralogical.com/blog/2021/10/05/browsing-with-a-mobile-screen-reader/",rel:"nofollow",children:"Browsing with a mobile screen reader"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.accessibility-developer-guide.com/knowledge/screen-readers/",rel:"nofollow",children:"Introduction to screen reader usage"})}),`
`]}),`
`,e.jsx(n.h3,{id:"which-browser-and-screen-reader-pairings-to-test",children:"Which browser and screen reader pairings to test"}),`
`,e.jsxs(n.p,{children:["According to a ",e.jsx(n.a,{href:"https://webaim.org/projects/screenreadersurvey9/",rel:"nofollow",children:"survey"})," conducted by WebAIM, more than 90% of screen reader users reported using a desktop screen reader on Windows."]}),`
`,e.jsxs(n.p,{children:["The most popular ",e.jsx(n.strong,{children:"desktop screen readers"})," are"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"JAWS"})," (Windows, can run in free demo mode for 40 minutes at a time)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"NVDA"})," (Windows, free) and"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"VoiceOver"})," (MacOS, free)."]}),`
`]}),`
`,e.jsxs(n.p,{children:["The by far most popular ",e.jsx(n.strong,{children:"mobile screen reader"})," is ",e.jsx(n.strong,{children:"VoiceOver on iOS/iPadOS"}),"."]}),`
`,e.jsx(n.p,{children:"Testing with screen readers works best when they are paired with the browsers they are the most compatible with."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"JAWS works best with Chrome and Firefox. When testing, it should be paired with Chrome."}),`
`,e.jsx(n.li,{children:"NVDA works best with and should be paired with Firefox."}),`
`,e.jsx(n.li,{children:"VoiceOver (MacOS and iOS/iPadOS) works best with and should be paired with Safari."}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"At betterplace"})," we test with:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"NVDA (Windows) (via BrowserStack)"}),`
`,e.jsx(n.li,{children:"VoiceOver (iOS/iPadOS) (directly in Safari or via BrowserStack)"}),`
`]}),`
`,e.jsx(n.h3,{id:"how-to-test-with-nvda-windows",children:"How to test with NVDA (Windows)"}),`
`,e.jsxs(n.p,{children:["As NVDA only runs on Windows, but we use Macs at betterplace, we have to either set up a ",e.jsx(n.a,{href:"https://dequeuniversity.com/mac/windows-screen-readers",rel:"nofollow",children:"virtual machine"})," or use a service similar to BrowserStack or ",e.jsx(n.a,{href:"https://assistivlabs.com/pricing",rel:"nofollow",children:"AssistivLabs"}),"."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.nvaccess.org/files/nvda/documentation/userGuide.html?#BrowseMode",rel:"nofollow",children:"NVDA Browse Mode"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts",rel:"nofollow",children:"NVDA Keyboard Shortcuts"})}),`
`]}),`
`,e.jsx(n.h3,{id:"how-to-test-with-voiceover-iosipados",children:"How to test with VoiceOver (iOS/iPadOS)"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://support.apple.com/en-lb/guide/iphone/iph3e2e415f/ios",rel:"nofollow",children:"iPhone User Guide"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Mobile#ios_voiceover",rel:"nofollow",children:"Summary of screen reader testing on iOS"})}),`
`]}),`
`,e.jsx(n.h3,{id:"how-to-test-with-other-screen-readers-optional",children:"How to test with other screen readers (optional)"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts",rel:"nofollow",children:"JAWS Keyboard Shortcuts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://support.apple.com/en-lb/guide/voiceover/welcome/10/mac",rel:"nofollow",children:"VoiceOver (MacOS) User Guide"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts",rel:"nofollow",children:"VoiceOver (MacOS) Keyboard Shortcuts"})}),`
`]}),`
`,e.jsx(n.h2,{id:"how-to-test-for-color-vision-deficiencies-firefox-chrome-and-forced-colors-only-chrome",children:"How to test for color vision deficiencies (Firefox, Chrome) and forced colors (only Chrome)"}),`
`,e.jsx(n.h3,{id:"in-firefox",children:"In Firefox"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Open ",e.jsx(n.em,{children:"Accessibility"})," panel."]}),`
`,e.jsxs(n.li,{children:["Choose from a selection of different color vision deficiencies in the ",e.jsx(n.em,{children:"Simulate"})," drop-down."]}),`
`]}),`
`,e.jsx("img",{src:l,alt:"Color vision deficiencies settings in Firefox",width:"50%"}),`
`,e.jsx(n.h3,{id:"in-chrome",children:"In Chrome"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Open the ",e.jsx(n.em,{children:"Rendering"})," panel (either use the command menu and type ",e.jsx(n.em,{children:"rendering"})," or use the three-dot menu in the top-right corner of the screen and go to ",e.jsx(n.em,{children:"More Tools"})," to find it)."]}),`
`,e.jsxs(n.li,{children:["Choose from a selection of different color vision deficiencies in the ",e.jsx(n.em,{children:"Emulate vision deficiencies"})," drop-down or ",e.jsx(n.em,{children:"forced-colors:active"})," in the ",e.jsx(n.em,{children:"Emulate CSS media feature forced-colors"})," drop-down."]}),`
`]}),`
`,e.jsx("img",{src:t,alt:"Color vision deficiencies settings in Chrome",width:"50%"})]})}function u(r={}){const{wrapper:n}={...s(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{u as default};
