import{j as t}from"./jsx-runtime-u17CrQMm.js";import{c as g}from"./compiler-runtime-BztlXLJS.js";import{C as l}from"./ClientCheckbox-Djf8JYix.js";import{H as f}from"./Heading-vOzqMkJi.js";import{C as u}from"./ClientRadioButton-BMMfjHdU.js";import{T as p}from"./ToggleButton-4k9adleh.js";import{T as b}from"./Tooltip-CUH__sSv.js";import{F as y}from"./Fieldset-C3tcw8gn.js";import"./iframe-K_OwPEhI.js";import"./preload-helper-PPVm8Dsz.js";import"./preventDefault-M1KdZT7V.js";import"./index-CL1aUomK.js";import"./LayoutStack-qOFlLSRJ.js";import"./LayoutCluster-DC6NloDU.js";import"./Icon-x1z4PGh0.js";import"./Popup-BCTiY446.js";import"./index-CQksqrAn.js";import"./index-DxRQN4t8.js";import"./useIsMounted-EdiWN4I5.js";import"./PopupContext-Bx01joXm.js";import"./keys-CVJCkmxv.js";import"./PopupArrow-BtuZjME9.js";const x=o=>{const e=g.c(6);let r,i,s;e[0]===Symbol.for("react.memo_cache_sentinel")?(r=t.jsx(l,{id:"checkbox-label",children:"First checkbox element"}),i=t.jsx(l,{id:"default-checked",defaultChecked:!0,children:"This one is checked"}),s=t.jsx(l,{id:"disabled",disabled:!0,children:"Look, a disabled checkbox"}),e[0]=r,e[1]=i,e[2]=s):(r=e[0],i=e[1],s=e[2]);let n;e[3]===Symbol.for("react.memo_cache_sentinel")?(n=t.jsx(b,{content:"READ IT OUT LOUD",children:t.jsx(l,{id:"default-checked-disabled",defaultChecked:!0,disabled:!0,children:"This one is checked and disabled"})}),e[3]=n):n=e[3];let a;return e[4]!==o?(a=t.jsxs(y,{...o,children:[r,i,s,n]}),e[4]=o,e[5]=a):a=e[5],a},T=o=>{const e=g.c(5);let r,i;e[0]===Symbol.for("react.memo_cache_sentinel")?(r=t.jsx(u,{name:"radio",value:"radio-1",defaultChecked:!0,children:"One - You should choose this"}),i=t.jsx(u,{name:"radio",value:"radio-2",children:"Some other value"}),e[0]=r,e[1]=i):(r=e[0],i=e[1]);let s;e[2]===Symbol.for("react.memo_cache_sentinel")?(s=t.jsx(b,{content:"READ IT NOW!",children:t.jsx(u,{name:"radio",value:"radio-3",disabled:!0,children:"You can't touch this"})}),e[2]=s):s=e[2];let n;return e[3]!==o?(n=t.jsxs(y,{...o,children:[r,i,s]}),e[3]=o,e[4]=n):n=e[4],n},k=o=>{const e=g.c(6);let r;e[0]===Symbol.for("react.memo_cache_sentinel")?(r={width:"fit-content"},e[0]=r):r=e[0];let i,s,n;e[1]===Symbol.for("react.memo_cache_sentinel")?(i=t.jsx(p,{id:"1",name:"grp",value:"f1",type:"radio",size:"small",children:"Wisely"}),s=t.jsx(p,{id:"2",name:"grp",value:"f2",type:"radio",size:"small",children:"Other"}),n=t.jsx(p,{id:"3",name:"grp",value:"f3",type:"radio",size:"small",children:"Third"}),e[1]=i,e[2]=s,e[3]=n):(i=e[1],s=e[2],n=e[3]);let a;return e[4]!==o?(a=t.jsx("div",{style:r,children:t.jsxs(y,{...o,children:[i,s,n]})}),e[4]=o,e[5]=a):a=e[5],a},N={title:"Components/Fieldset",component:x,parameters:{docs:{description:{component:"This component groups either Checkboxes, Radio buttons or Toggle buttons."}}},argTypes:{children:{description:"The components that are grouped in the Fieldset.",table:{type:{summary:"RadioButton | Checkbox | ToggleButton"}}},layout:{control:{type:"radio"},options:["horizontal","vertical"],description:"Option to organize the `children` in either a vertical or a horizontal layout.",table:{defaultValue:{summary:"horizontal"},type:{summary:"horizontal | vertical"}}},legend:{control:{type:"text"},description:"The title of the fieldset.",table:{type:{summary:"ReactNode"}}},legendSize:{control:{type:"radio"},options:["small","medium"],description:"Size of the legend text",table:{defaultValue:{summary:"small"},type:{summary:"small | medium"}}},hint:{control:{type:"text"},description:"Hint text for the Fieldset. Hints can only be set, when there is a title as well.",table:{type:{summary:"string"}}},error:{control:{type:"text"},description:"Error message, that is going to be shown under the Fieldset. No error message is shown when undefined.",table:{type:{summary:"string"}}},errorDisplay:{control:{type:"radio"},options:["border","all","text"],table:{defaultValue:{summary:"all"}},description:"Controls the behaviour of how errors are displayed."},required:{control:{type:"boolean"},description:"Whether the fieldset group is required or not."},invisibleLegend:{control:{type:"boolean"},description:"Visually hides the legend, but screen readers can still associate it with the input fields."}}},d={args:{legend:"This is a checkbox group",legendSize:"small",hint:"You need to click on the checkbox",layout:"vertical"}},c={render:o=>t.jsx(T,{...o}),args:{legend:"You can only choose one",legendSize:"small",hint:"And one is disabled",layout:"vertical"}},m={render:o=>t.jsx(k,{...o}),args:{legend:"Choose wisely!",legendSize:"small",hint:"Or don't. I am not your Mom.",layout:"horizontal",layoutProps:{space:"200"}}},h={args:{legend:t.jsx(f,{level:"heading-xs",children:"This is an h2 heading"}),layout:"vertical"}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    legend: 'This is a checkbox group',
    legendSize: 'small',
    hint: 'You need to click on the checkbox',
    layout: 'vertical'
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: (args: FieldsetProps) => {
    return <RadioGroupComponent {...args} />;
  },
  args: {
    legend: 'You can only choose one',
    legendSize: 'small',
    hint: 'And one is disabled',
    layout: 'vertical'
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: (args: FieldsetProps) => {
    return <ToggleGroupComponent {...args} />;
  },
  args: {
    legend: 'Choose wisely!',
    legendSize: 'small',
    hint: "Or don't. I am not your Mom.",
    layout: 'horizontal',
    layoutProps: {
      space: '200'
    }
  }
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    legend: <Heading level="heading-xs">This is an h2 heading</Heading>,
    layout: 'vertical'
  }
}`,...h.parameters?.docs?.source}}};const $=["CheckboxGroup","RadioGroup","ToggleButtonGroup","GroupWithHeading"];export{d as CheckboxGroup,h as GroupWithHeading,c as RadioGroup,m as ToggleButtonGroup,$ as __namedExportsOrder,N as default};
