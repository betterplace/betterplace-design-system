import{j as t}from"./jsx-runtime-BlAj40OV.js";import{c as i}from"./index-Bl6ORisp.js";import{C as _}from"./Callout-C9Zts6EG.js";import{I as u}from"./Icon-gEYVkC9x.js";import"./index-Cs7sjTYM.js";import"./_commonjsHelpers-BosuxZz1.js";const d={id:"3720:3055",url:"https://www.figma.com/file/PJ7OUutWRrSHW6qgaPNW1l/DS-betterplace-GENERAL?node-id=3720%3A3055",themes:[]},g="_alert_1iits_1",f="_icon_1iits_5",O="_iconContainer_1iits_10",s={alert:g,icon:f,iconContainer:O,"icon-success":"_icon-success_1iits_15","icon-warning":"_icon-warning_1iits_19","icon-error":"_icon-error_1iits_23"},A={warning:"alertTriangle",error:"alertCircle",success:"checkCircle"};function C({kind:e,className:a,style:l,children:m}){const p=e==="error"?"alert":"status";return t.jsxs(_,{kind:e,role:p,className:i(s.alert,a),style:l,children:[t.jsx("div",{className:i(s[`icon-${e}`],s.iconContainer),children:t.jsx(u,{name:A[e],className:s.icon,title:e})}),t.jsx("div",{children:m})]})}var S={BASE_URL:"./",DEV:!1,MODE:"production",PROD:!0,SSR:!1,STORYBOOK:"true",STORYBOOK_BASE_URL:"/betterplace-design-system/"};const N={title:"Components/Alert",component:C,argTypes:{kind:{control:{type:"radio"},options:["success","warning","error"],description:"Applies specific design",table:{type:{summary:"AlertKind"}}},children:{control:{type:"text"}}},parameters:{design:{type:"figspec",accessToken:S.STORYBOOK_FIGMA_ACCESS_TOKEN,url:d.url},vitest:{testFile:"Alert.test.tsx"}}},r={args:{kind:"success",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}};var o,n,c;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    kind: 'success',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
}`,...(c=(n=r.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};const T=["Default"];export{r as Default,T as __namedExportsOrder,N as default};
