import{j as n}from"./jsx-runtime-u17CrQMm.js";import{c as E}from"./compiler-runtime-BztlXLJS.js";import{r as a}from"./iframe-K_OwPEhI.js";import{c as h}from"./index-CL1aUomK.js";import{u as j}from"./useResizeObserver-CU-IOgSe.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C04bmJEi.js";import"./useValueRef-B-Du-JDN.js";const C="_content_1npjr_1",S="_container_1npjr_8",v="_open_1npjr_21",k="_outlineSpace_1npjr_31",d={content:C,container:S,open:v,outlineSpace:k},y=a.forwardRef(function({children:e,open:s,className:b,contentClassName:c,reserveOutlineSpace:i=!1},m){const t=a.useRef(null),[o,l]=a.useState(0),p=a.useCallback(()=>{if(!t.current)return;const _=t.current;l(_.scrollHeight)},[]);return a.useImperativeHandle(m,()=>({checkSize:p})),j({ref:t,onResize:p}),a.useEffect(()=>{if(s)return p(),window.addEventListener("resize",p),()=>{window.removeEventListener("resize",p)}},[p,s]),n.jsx("div",{className:h(d.container,b,{[d.open]:s,[d.outlineSpace]:i}),style:{"--height":`${o}px`},children:n.jsx("div",{className:h(d.content,c),ref:t,children:e})})}),W={title:"Components/Expandable",component:y,args:{open:!0,children:n.jsxs("div",{style:{padding:16},children:[n.jsxs("p",{children:["This is the content inside the ",n.jsx("b",{children:"Expandable"})," component. You can put any React node here."]}),n.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque."})]})},argTypes:{open:{control:"boolean"},className:{control:"text"},contentClassName:{control:"text"},ref:{control:!1,table:{summary:"{ checkSize: () => void }"}}}},u={args:{}},f={args:{open:!1}},g={args:{className:"storybook-expandable-custom",contentClassName:"storybook-expandable-content-custom"},parameters:{docs:{description:{story:"Expandable with custom class names for container and content."}}}};function w(r){const e=E.c(10),[s,b]=a.useState(r.open??!1);let c,i;e[0]===Symbol.for("react.memo_cache_sentinel")?(c={marginBottom:12,padding:"8px 16px",borderRadius:4,border:"1px solid #ccc",background:"#f9f9f9",cursor:"pointer"},i=()=>b(N),e[0]=c,e[1]=i):(c=e[0],i=e[1]);const m=s?"Collapse":"Expand";let t;e[2]!==m?(t=n.jsx("button",{type:"button",style:c,onClick:i,children:m}),e[2]=m,e[3]=t):t=e[3];let o;e[4]!==r||e[5]!==s?(o=n.jsx(y,{...r,open:s}),e[4]=r,e[5]=s,e[6]=o):o=e[6];let l;return e[7]!==t||e[8]!==o?(l=n.jsxs("div",{children:[t,o]}),e[7]=t,e[8]=o,e[9]=l):l=e[9],l}function N(r){return!r}const x={render:w,args:{open:!1},parameters:{docs:{description:{story:"Expandable with a button to toggle open/closed state."}}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...u.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    open: false
  }
}`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    className: 'storybook-expandable-custom',
    contentClassName: 'storybook-expandable-content-custom'
  },
  parameters: {
    docs: {
      description: {
        story: 'Expandable with custom class names for container and content.'
      }
    }
  }
}`,...g.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: ToggleableComponent,
  args: {
    open: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Expandable with a button to toggle open/closed state.'
      }
    }
  }
}`,...x.parameters?.docs?.source}}};const $=["Default","Closed","WithCustomClass","Toggleable"];export{f as Closed,u as Default,x as Toggleable,g as WithCustomClass,$ as __namedExportsOrder,W as default};
