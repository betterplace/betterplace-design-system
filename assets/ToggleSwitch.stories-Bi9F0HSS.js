import{j as e}from"./jsx-runtime-BlAj40OV.js";import{T as d}from"./ToggleSwitch-CM0fvFHr.js";import"./index-Cs7sjTYM.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-Bl6ORisp.js";function h(a){return e.jsx("div",{style:{width:"400px"},children:e.jsx(d,{...a})})}const x={title:"Components/ToggleSwitch",component:h,argTypes:{children:{control:{type:"text"},description:"Label text for the toggle switch.",table:{type:{summary:"ReactNode"}}},size:{control:{type:"radio"},options:["small","large"],description:"Controls the size of the component.",table:{type:{summary:"small | large"},defaultValue:{summary:"small"}}},error:{control:{type:"boolean"},description:'Sets `aria-invalid="true"` and attaches `aria-describedby=${name}-error`'},disabled:{control:{type:"boolean"},description:"Toggles aria-disabled. We use aria-disabled instead of disabled to keep focusability and with that the possibility to add a description that reasons the disabled state.",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},disabled_:{control:{type:"boolean"},description:"Actually disabled the input."},classNames:{description:"External styles for the container (`label`) and the `labelText` ",table:{type:{summary:"`{label?: string, labelText?: string}`"}}},rest:{control:{type:"none"},description:'Receives the same props as an HTML `input` with the`type="checkbox"`'}}},t={args:{children:"Checkbox label",id:"test-checkbox"}},r={render:a=>e.jsx(d,{id:"rich-text-label",children:a.children}),args:{children:e.jsxs(e.Fragment,{children:["This is a ",e.jsx("strong",{children:"rich text"})," label"]}),id:"test-checkbox"}};var s,o,i;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    children: 'Checkbox label',
    id: 'test-checkbox'
  }
}`,...(i=(o=t.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var l,c,n;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: (args: ToggleSwitchProps) => <ToggleSwitch id="rich-text-label">{args.children}</ToggleSwitch>,
  args: {
    children: <>
        This is a <strong>rich text</strong> label
      </>,
    id: 'test-checkbox'
  }
}`,...(n=(c=r.parameters)==null?void 0:c.docs)==null?void 0:n.source}}};const y=["Default","WithRichTextLabel"];export{t as Default,r as WithRichTextLabel,y as __namedExportsOrder,x as default};
