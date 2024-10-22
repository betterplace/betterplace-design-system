import{j as e}from"./jsx-runtime-BlAj40OV.js";import{c as k}from"./index-Bl6ORisp.js";import{H as Y}from"./Heading-CPc3BsJp.js";import"./IconButton-COfy-Ayz.js";import{r as W}from"./index-Cs7sjTYM.js";import{L as A}from"./LayoutStack-D48tTvLz.js";import{L as D}from"./LayoutCluster-D9Mo5iqk.js";import{C as d}from"./ClientCheckbox-DQeajEuX.js";import{R as p}from"./ClientRadioButton-CkU7Vt6e.js";import{T as m}from"./ToggleButton-f8Wq5fD6.js";import{T as F}from"./Tooltip-Db8iGNRE.js";import"./_commonjsHelpers-BosuxZz1.js";import"./Button-nc_sTf4_.js";import"./preventDefault-CIaEEaQs.js";import"./Icon-gEYVkC9x.js";import"./index-BU4L-DQy.js";const q="_fieldset_hid4k_1",U="_fieldContainer_hid4k_30",V="_groupLabel_hid4k_34",$="_labelLarge_hid4k_39",J="_groupHint_hid4k_43",K="_groupError_hid4k_48",Q="_errorMessage_hid4k_57",X="_disabledLabels_hid4k_64",t={fieldset:q,fieldContainer:U,groupLabel:V,labelLarge:$,groupHint:J,groupError:K,errorMessage:Q,disabledLabels:X};function Z({className:o,hint:r,required:s,children:a}){return e.jsxs("legend",{className:o,children:[e.jsxs("div",{className:t.groupLabel,children:[a,s&&e.jsx("span",{"aria-label":"(required)",children:"*"})]}),r?e.jsx("div",{className:t.groupHint,children:r}):null]})}function g({children:o,classNames:r,legend:s,hint:a,required:w,error:i,layout:O="horizontal",layoutProps:n={space:"none"},errorDisplay:b="all",...f}){const I=k(t.fieldContainer,n==null?void 0:n.className,{[t.groupError]:!!i&&b!=="text"}),B=O==="vertical"?A:D,M=W.useId(),x=f.id||M,y=i?`${x}-error`:void 0;return e.jsxs("fieldset",{id:x,className:k(t.fieldset,r==null?void 0:r.fieldset),"aria-describedby":y,...f,children:[s||a?e.jsx(Z,{required:w,hint:a,className:r==null?void 0:r.legend,children:s}):null,e.jsx(B,{className:I,...n,children:o}),i&&b!=="border"?e.jsx("p",{id:y,className:t.errorMessage,"aria-live":"polite",role:"alert",children:i}):null]})}const P=o=>e.jsxs(g,{...o,children:[e.jsx(d,{id:"checkbox-label",children:"First checkbox element"}),e.jsx(d,{id:"default-checked",defaultChecked:!0,children:"This one is checked"}),e.jsx(d,{id:"disabled",disabled:!0,children:"Look, a disabled checkbox"}),e.jsx(F,{content:"READ IT OUT LOUD",children:e.jsx(d,{id:"default-checked-disabled",defaultChecked:!0,disabled:!0,children:"This one is checked and disabled"})})]}),S=o=>e.jsxs(g,{...o,children:[e.jsx(p,{name:"radio",value:"radio-1",defaultChecked:!0,children:"One - You should choose this"}),e.jsx(p,{name:"radio",value:"radio-2",children:"Some other value"}),e.jsx(F,{content:"READ IT NOW!",children:e.jsx(p,{name:"radio",value:"radio-3",disabled:!0,children:"You can't touch this"})})]}),ee=o=>e.jsx("div",{style:{width:"fit-content"},children:e.jsxs(g,{...o,children:[e.jsx(m,{id:"1",name:"grp",value:"f1",type:"radio",size:"small",children:"Wisely"}),e.jsx(m,{id:"2",name:"grp",value:"f2",type:"radio",size:"small",children:"Other"}),e.jsx(m,{id:"3",name:"grp",value:"f3",type:"radio",size:"small",children:"Third"})]})}),fe={title:"Components/Fieldset",component:P,parameters:{docs:{description:{component:"This component groups either Checkboxes, Radio buttons or Toggle buttons."}}},argTypes:{children:{description:"The components that are grouped in the Fieldset.",table:{type:{summary:"RadioButton | Checkbox | ToggleButton"}}},layout:{control:{type:"radio"},options:["horizontal","vertical"],description:"Option to organize the `children` in either a vertical or a horizontal layout.",table:{defaultValue:{summary:"horizontal"},type:{summary:"horizontal | vertical"}}},legend:{control:{type:"text"},description:"The title of the fieldset.",table:{type:{summary:"ReactNode"}}},hint:{control:{type:"text"},description:"Hint text for the Fieldset. Hints can only be set, when there is a title as well.",table:{type:{summary:"string"}}},error:{control:{type:"text"},description:"Error message, that is going to be shown under the Fieldset. No error message is shown when undefined.",table:{type:{summary:"string"}}},errorDisplay:{control:{type:"radio"},options:["border","all","text"],table:{defaultValue:{summary:"all"}},description:"Controls the behaviour of how errors are displayed."},required:{control:{type:"boolean"},description:"Whether the fieldset group is required or not."}}},l={args:{legend:"This is a checkbox group",hint:"You need to click on the checkbox",layout:"vertical"}},c={render:o=>e.jsx(S,{...o}),args:{legend:"You can only choose one",hint:"And one is disabled",layout:"vertical"}},u={render:o=>e.jsx(ee,{...o}),args:{legend:"Choose wisely!",hint:"Or don't. I am not your Mom.",layout:"horizontal",layoutProps:{space:"200"}}},h={args:{legend:e.jsx(Y,{level:"h200",children:"This is an h2 heading"}),layout:"vertical"}};var j,_,v;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    legend: 'This is a checkbox group',
    hint: 'You need to click on the checkbox',
    layout: 'vertical'
  }
}`,...(v=(_=l.parameters)==null?void 0:_.docs)==null?void 0:v.source}}};var C,T,L;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: (args: FieldsetProps) => {
    return <RadioGroupComponent {...args} />;
  },
  args: {
    legend: 'You can only choose one',
    hint: 'And one is disabled',
    layout: 'vertical'
  }
}`,...(L=(T=c.parameters)==null?void 0:T.docs)==null?void 0:L.source}}};var G,H,N;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: (args: FieldsetProps) => {
    return <ToggleGroupComponent {...args} />;
  },
  args: {
    legend: 'Choose wisely!',
    hint: "Or don't. I am not your Mom.",
    layout: 'horizontal',
    layoutProps: {
      space: '200'
    }
  }
}`,...(N=(H=u.parameters)==null?void 0:H.docs)==null?void 0:N.source}}};var R,z,E;h.parameters={...h.parameters,docs:{...(R=h.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    legend: <Heading level="h200">This is an h2 heading</Heading>,
    layout: 'vertical'
  }
}`,...(E=(z=h.parameters)==null?void 0:z.docs)==null?void 0:E.source}}};const xe=["CheckboxGroup","RadioGroup","ToggleButtonGroup","GroupWithHeading"];export{l as CheckboxGroup,h as GroupWithHeading,c as RadioGroup,u as ToggleButtonGroup,xe as __namedExportsOrder,fe as default};
