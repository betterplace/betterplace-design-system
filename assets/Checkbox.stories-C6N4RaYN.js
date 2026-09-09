import{j as o}from"./jsx-runtime-u17CrQMm.js";import{C as s}from"./ClientCheckbox-Djf8JYix.js";import"./compiler-runtime-BztlXLJS.js";import"./iframe-K_OwPEhI.js";import"./preload-helper-PPVm8Dsz.js";import"./preventDefault-M1KdZT7V.js";import"./index-CL1aUomK.js";const h={title:"Components/Checkbox",component:s,parameters:{docs:{description:{component:"Checkbox component with custom betterplace styling. Checkboxes should always be grouped within a `Fieldset` component. When you have only one checkbox, but want to have an error state, it is necessary to enclose it in a `Fieldset`"}}},argTypes:{children:{control:{type:"text"},description:"Label text for the checkbox.",table:{type:{summary:"ReactNode"}}},disabled:{control:{type:"boolean"},description:"Toggles aria-disabled. We use aria-disabled instead of disabled to keep focusability and with that the possibility to add a description that reasons the disabled state.",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},fullWidth:{control:{type:"radio"},options:[!0,void 0,"mobile-only"],description:"Take 100% of the space.",table:{defaultValue:{summary:"undefined"}}}}},e={args:{children:"Checkbox label",id:"test-checkbox"}},t={args:{children:o.jsxs(o.Fragment,{children:["This is a ",o.jsx("strong",{children:"rich text"})," label"]}),id:"test-checkbox"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Checkbox label',
    id: 'test-checkbox'
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: <>
        This is a <strong>rich text</strong> label
      </>,
    id: 'test-checkbox'
  }
}`,...t.parameters?.docs?.source}}};const p=["Default","WithRichTextLabel"];export{e as Default,t as WithRichTextLabel,p as __namedExportsOrder,h as default};
