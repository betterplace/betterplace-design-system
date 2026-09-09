import{j as e}from"./jsx-runtime-u17CrQMm.js";import{c as W}from"./compiler-runtime-BztlXLJS.js";import{c}from"./index-CL1aUomK.js";import{r as T}from"./iframe-K_OwPEhI.js";import"./preload-helper-PPVm8Dsz.js";const R="_toggle_3tado_1",v="_toggleTrack_3tado_7",C="_toggleTrackWithLabel_3tado_8",E="_small_3tado_23",z="_toggleTrackNoLabel_3tado_36",P="_toggleIndicator_3tado_40",D="_onLabel_3tado_45",O="_offLabel_3tado_46",V="_large_3tado_62",q="_toggleInput_3tado_90",A="_labelText_3tado_142",H="_disabledLabel_3tado_147",a={toggle:R,toggleTrack:v,toggleTrackWithLabel:C,small:E,toggleTrackNoLabel:z,toggleIndicator:P,onLabel:D,offLabel:O,large:V,toggleInput:q,labelText:A,disabledLabel:H},m=T.forwardRef(function({id:l,name:s,error:o=!1,classNames:h,"aria-disabled":L,"aria-required":$,children:p,required:u,checked:y,disabled_:x,disabled:k,size:w="small",labelPosition:f="right",labelForOn:r,labelForOff:i,trackScale:j=1,...N},S){const I=T.useId(),_=l||s||I,b=L||k||x;return e.jsxs("label",{style:{"--track-scale":j},className:c(a.toggle,h?.label),htmlFor:_,children:[f==="left"?e.jsx("div",{className:c(a.labelText,h?.labelText,{[a.disabledLabel]:b}),children:p}):null,e.jsx("input",{tabIndex:0,...N,role:"switch",type:"checkbox",className:c(a.toggleInput,a[w]),id:_,ref:S,name:s,required:u,disabled:x,"aria-disabled":b,"aria-required":u,"aria-checked":y}),e.jsxs("span",{className:c(a.toggleTrack,{[a.toggleTrackNoLabel]:!(r&&i),[a.toggleTrackWithLabel]:r&&i}),children:[r&&i?e.jsx("span",{className:a.onLabel,"aria-hidden":!0,children:r}):null,e.jsx("span",{className:a.toggleIndicator}),r&&i?e.jsx("span",{className:a.offLabel,"aria-hidden":!0,children:i}):null]}),f==="right"?e.jsx("div",{className:c(a.labelText,h?.labelText,{[a.disabledLabel]:b}),children:p}):null]})});function M(t){const l=W.c(5);let s;l[0]!==t.children?(s=e.jsx("strong",{children:t.children}),l[0]=t.children,l[1]=s):s=l[1];let o;return l[2]!==t||l[3]!==s?(o=e.jsx(m,{...t,children:s}),l[2]=t,l[3]=s,l[4]=o):o=l[4],o}const U={title:"Components/ToggleSwitch",component:M,argTypes:{children:{control:{type:"text"},description:"Label text for the toggle switch.",table:{type:{summary:"ReactNode"}}},size:{control:{type:"radio"},options:["small","large"],description:"Controls the size of the component.",table:{type:{summary:"small | large"},defaultValue:{summary:"small"}}},labelPosition:{control:{type:"radio"},options:["left","right"],description:"Controls the position of the label relative to the toggle.",table:{type:{summary:"left | right"},defaultValue:{summary:"right"}}},disabled:{control:{type:"boolean"},description:"Toggles aria-disabled. We use aria-disabled instead of disabled to keep focusability and with that the possibility to add a description that reasons the disabled state.",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},disabled_:{control:{type:"boolean"},description:"Actually disabled the input."},classNames:{description:"External styles for the container (`label`) and the `labelText` ",table:{type:{summary:"`{label?: string, labelText?: string}`"}}},labelForOn:{description:"Label inside the switch when checked.",control:{type:"text"}},labelForOff:{description:"Label inside the switch when unchecked.",control:{type:"text"}},trackScale:{description:"When on/off labels are larger, this property can be used to scale the width of the track to fit the labels.",control:{type:"number"}},rest:{control:{type:"none"},description:'Receives the same props as an HTML `input` with the`type="checkbox"`'}}},n={args:{children:"Checkbox label",id:"test-checkbox",labelPosition:"right",size:"small"}},d={render:t=>e.jsx(m,{id:"rich-text-label",...t,children:t.children}),args:{children:e.jsxs("div",{children:["This is a ",e.jsx("strong",{children:"rich text"})," label"]}),id:"test-checkbox"}},g={render:t=>e.jsx(m,{...t,id:"rich-text-label",children:t.children}),args:{children:"Labels inside",labelForOn:"an",labelForOff:"aus",id:"test-checkbox"}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Checkbox label',
    id: 'test-checkbox',
    labelPosition: 'right',
    size: 'small'
  }
}`,...n.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: (args: ToggleSwitchProps) => <ToggleSwitch id="rich-text-label" {...args}>
      {args.children}
    </ToggleSwitch>,
  args: {
    children: <div>
        This is a <strong>rich text</strong> label
      </div>,
    id: 'test-checkbox'
  }
}`,...d.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: (args: ToggleSwitchProps) => <ToggleSwitch {...args} id="rich-text-label">
      {args.children}
    </ToggleSwitch>,
  args: {
    children: 'Labels inside',
    labelForOn: 'an',
    labelForOff: 'aus',
    id: 'test-checkbox'
  }
}`,...g.parameters?.docs?.source}}};const X=["Default","WithRichTextLabel","WithOnOffLabel"];export{n as Default,g as WithOnOffLabel,d as WithRichTextLabel,X as __namedExportsOrder,U as default};
