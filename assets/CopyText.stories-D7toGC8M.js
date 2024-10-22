import{j as i}from"./jsx-runtime-BlAj40OV.js";import{C as s}from"./CopyText-C4H_TXAI.js";import{C as a}from"./Heading-CPc3BsJp.js";import"./index-Cs7sjTYM.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-Bl6ORisp.js";import"./IconButton-COfy-Ayz.js";import"./Button-nc_sTf4_.js";import"./Icon-gEYVkC9x.js";import"./LayoutCluster-D9Mo5iqk.js";import"./TextInput-CJQ35zCQ.js";import"./TextInputWrapper-BKbvKmKQ.js";import"./preventDefault-CIaEEaQs.js";import"./LayoutStack-D48tTvLz.js";const e={button:n=>i.jsx(a,{onClick:n,children:"Copy URL"})},T={title:"Components/CopyText",component:s,parameters:{docs:{description:{component:"CopyText component."}}},argTypes:{children:{description:"The actual component to be clicked in order to copy to the clipboard.",options:Object.keys(e),mapping:e,control:{type:"select",labels:{button:"button"}}},showPreview:{control:"boolean",description:"Whether or not there should be a readonly text input previewing the text to be copied"}}},o={args:{textToCopy:"https://streambot.example.com/livewidgets",children:e.button,showPreview:!0,previewLabel:"URL",onError:()=>console.log("copying failed")}};var t,r,p;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    textToCopy: 'https://streambot.example.com/livewidgets',
    children: labelMapping.button,
    showPreview: true,
    previewLabel: 'URL',
    onError: () => console.log('copying failed')
  }
}`,...(p=(r=o.parameters)==null?void 0:r.docs)==null?void 0:p.source}}};const L=["Default"];export{o as Default,L as __namedExportsOrder,T as default};
