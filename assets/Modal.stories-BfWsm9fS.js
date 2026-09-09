import{j as t}from"./jsx-runtime-u17CrQMm.js";import{c as C}from"./compiler-runtime-BztlXLJS.js";import{r as g}from"./iframe-K_OwPEhI.js";import"./Button-CzNMfbNq.js";import{C as x}from"./ClientButton-CGu0sloq.js";import{M as y}from"./Modal-DIqZp6ev.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CL1aUomK.js";import"./preventDefault-M1KdZT7V.js";import"./LayoutModal-DYsjVjuq.js";import"./useForwardedRef-B5991O7N.js";import"./useResizeObserver-CU-IOgSe.js";import"./index-C04bmJEi.js";import"./useValueRef-B-Du-JDN.js";import"./Heading-vOzqMkJi.js";import"./LayoutStack-qOFlLSRJ.js";import"./LayoutCluster-DC6NloDU.js";import"./ClientIconButton-BBWZeyUb.js";import"./Icon-x1z4PGh0.js";function b(o){const e=C.c(8),[a,i]=g.useState(!1),{title:d,closeText:c,fullWidth:m,children:r}=o;let s;e[0]===Symbol.for("react.memo_cache_sentinel")?(s=t.jsx(x,{onClick:()=>i(!0),children:"Open modal"}),e[0]=s):s=e[0];let n;e[1]===Symbol.for("react.memo_cache_sentinel")?(n=()=>i(!1),e[1]=n):n=e[1];let l;return e[2]!==r||e[3]!==c||e[4]!==m||e[5]!==a||e[6]!==d?(l=t.jsxs(t.Fragment,{children:[s,t.jsx(y,{onClose:n,isOpen:a,title:d,closeText:c,fullWidth:m,children:r})]}),e[2]=r,e[3]=c,e[4]=m,e[5]=a,e[6]=d,e[7]=l):l=e[7],l}function W(o){const e=C.c(8),[a,i]=g.useState(!1),d=g.useRef(null),{title:c,closeText:m}=o;let r;e[0]===Symbol.for("react.memo_cache_sentinel")?(r=t.jsx(x,{onClick:()=>i(!0),children:"Open modal"}),e[0]=r):r=e[0];let s;e[1]===Symbol.for("react.memo_cache_sentinel")?(s=()=>i(!1),e[1]=s):s=e[1];let n;e[2]===Symbol.for("react.memo_cache_sentinel")?(n=t.jsx(x,{onClick:()=>i(!1),kind:"secondary",children:"Cancel"}),e[2]=n):n=e[2];let l;e[3]===Symbol.for("react.memo_cache_sentinel")?(l=t.jsxs(t.Fragment,{children:[n,t.jsx(x,{onClick:()=>i(!1),ref:d,children:"Primary action"})]}),e[3]=l):l=e[3];let u;return e[4]!==m||e[5]!==a||e[6]!==c?(u=t.jsxs(t.Fragment,{children:[r,t.jsx(y,{onClose:s,isOpen:a,title:c,closeText:m,manualFocusRef:d,customActions:l,children:"Donation form styled modal with custom action buttons."})]}),e[4]=m,e[5]=a,e[6]=c,e[7]=u):u=e[7],u}const H={title:"Components/Modal",component:y,argTypes:{isOpen:{control:!1,description:"Modal state"},onClose:{control:!1,description:"Closing action"},title:{control:{type:"text"},description:"Title of the modal"},closeText:{control:{type:"text"},description:"Text content of the default close button and alternative text for the closing x"},fullWidth:{control:{type:"boolean"},description:"Use wide donation form modal layout"},customActions:{control:!1,description:"JSX element containing custom actions (buttons and/or links) that will be displayed in the modal"},manualFocusRef:{control:!1,description:"Reference to the HTML element inside of the modal that should receive focus. Per default the closing x is focussed."},children:{control:!1,description:"Content to be rendered in the modal"}},args:{title:"Donation form modal",closeText:"Close",children:"Donation form styled modal. It has a close button by default and supports custom actions."}},f={name:"Default",render:o=>t.jsx(b,{...o}),args:{title:"Donation form modal",closeText:"Close",children:"Donation form styled modal. It has a close button by default and supports custom actions."}},p={name:"Full width",render:o=>t.jsx(b,{...o}),args:{title:"Wide donation form modal",closeText:"Close",fullWidth:!0,children:"Use fullWidth for a wider modal layout, e.g. for donation forms with more content."}},h={name:"With custom actions",render:o=>t.jsx(W,{...o}),args:{title:"Modal with custom actions",closeText:"Cancel"}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Default',
  render: args => <ModalStory {...args} />,
  args: {
    title: 'Donation form modal',
    closeText: 'Close',
    children: 'Donation form styled modal. It has a close button by default and supports custom actions.'
  }
}`,...f.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Full width',
  render: args => <ModalStory {...args} />,
  args: {
    title: 'Wide donation form modal',
    closeText: 'Close',
    fullWidth: true,
    children: 'Use fullWidth for a wider modal layout, e.g. for donation forms with more content.'
  }
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'With custom actions',
  render: args => <ModalWithCustomActions {...args} />,
  args: {
    title: 'Modal with custom actions',
    closeText: 'Cancel'
  }
}`,...h.parameters?.docs?.source}}};const J=["Default","FullWidth","WithCustomActions"];export{f as Default,p as FullWidth,h as WithCustomActions,J as __namedExportsOrder,H as default};
