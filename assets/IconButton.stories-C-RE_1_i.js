import{j as p}from"./jsx-runtime-u17CrQMm.js";import{c as u}from"./compiler-runtime-BztlXLJS.js";import{o as m}from"./Icon-x1z4PGh0.js";import{C as h}from"./ClientIconButton-BBWZeyUb.js";import"./iframe-K_OwPEhI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CL1aUomK.js";import"./preventDefault-M1KdZT7V.js";import"./Button-CzNMfbNq.js";function f(d){const t=u.c(7),c=d.ghost?"var(--betterplace-color-bg-dark)":void 0;let e;t[0]!==c?(e={padding:"var(--betterplace-spacing-100)",background:c,containerType:"inline-size"},t[0]=c,t[1]=e):e=t[1];const l=d;let o;t[2]!==l?(o=p.jsx(h,{...l}),t[2]=l,t[3]=o):o=t[3];let n;return t[4]!==e||t[5]!==o?(n=p.jsx("div",{style:e,children:o}),t[4]=e,t[5]=o,t[6]=n):n=t[6],n}const P={title:"Components/IconButton",component:f,argTypes:{children:{control:{type:"text"},description:"The (text) content of the button."},kind:{options:["primary","secondary","danger","plain","secondary-danger","plain-danger"],control:{type:"radio"},description:"Applies specific design",table:{defaultValue:{summary:"primary"},type:{summary:"ButtonKind | undefined"}}},size:{options:["large","default","small","input"],control:{type:"radio"},description:"Size of the button",table:{defaultValue:{summary:"default"},type:{summary:"ButtonSize | undefined"}}},as:{options:["button","a"],control:"radio",description:"HTML tag"},disabled:{control:{type:"boolean"},description:"Toggles aria-disabled. We use aria-disabled instead of disabled to keep focusability and with that the possibility to add a description that reasons the disabled state.",table:{defaultValue:{summary:"false"}}},iconName:{description:"The name of the icon to be displayed in the button.",options:[...Object.keys(m),void 0],control:{type:"radio"},table:{type:{summary:"IconName"}}},iconPosition:{description:"Position of the selected icon in the button.",options:["left","right",void 0],control:{type:"radio"},table:{type:{summary:"left | right | undefined",defaultValue:"left"}}},ghost:{description:"Additional styling options for ghost style button, which includes transparent button background and light font color for darker backgrounds.",control:{type:"boolean"}},iconProps:{description:"All props of the Icon component, except the `name` are passed down to the selected icon.",table:{type:{summary:"IconProps"}}},props:{control:!1,description:"IconButton props extend the original Button component props. All other props (e.g. `href`, `onClick`) are passed on to the root JSX element"}}},i={args:{children:"Donate now",kind:"primary",as:"button",size:"default",ghost:!1,iconName:"checkCircle",iconPosition:"left"}},r={args:{children:"Turn around!",iconName:"chevronLeft",iconPosition:"left",kind:"plain",size:"small"}},a={args:{children:"Do not click!",iconName:"alertCircle",kind:"danger",iconPosition:"right"}},s={args:{iconName:"x",kind:"plain",title:"Close"}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Donate now',
    kind: 'primary',
    as: 'button',
    size: 'default',
    ghost: false,
    iconName: 'checkCircle',
    iconPosition: 'left'
  }
}`,...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Turn around!',
    iconName: 'chevronLeft',
    iconPosition: 'left',
    kind: 'plain',
    size: 'small'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Do not click!',
    iconName: 'alertCircle',
    kind: 'danger',
    iconPosition: 'right'
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    iconName: 'x',
    kind: 'plain',
    title: 'Close'
  }
}`,...s.parameters?.docs?.source}}};const v=["Default","ButtonWithLeftIcon","ButtonWithRightIcon","OnlyIconButton"];export{r as ButtonWithLeftIcon,a as ButtonWithRightIcon,i as Default,s as OnlyIconButton,v as __namedExportsOrder,P as default};
