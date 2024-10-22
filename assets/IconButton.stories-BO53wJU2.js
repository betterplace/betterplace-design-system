import{j as s}from"./jsx-runtime-BlAj40OV.js";import{i as S}from"./Icon-gEYVkC9x.js";import{I as j}from"./IconButton-COfy-Ayz.js";import{r as L}from"./index-Cs7sjTYM.js";import{p as t}from"./preventDefault-CIaEEaQs.js";import"./index-Bl6ORisp.js";import"./_commonjsHelpers-BosuxZz1.js";import"./Button-nc_sTf4_.js";const W=L.forwardRef(function({onKeyDown:I,onKeyUp:B,onKeyDownCapture:x,onKeyUpCapture:w,onClick:D,...c},N){const{disabled:o}=c,P=o?t:I,K=o?t:B,z=o?t:x,T=o?t:w,v=o?t:D;return s.jsx(j,{...c,onClick:v,onChange:P,onKeyUp:K,onKeyDownCapture:z,onKeyUpCapture:T,ref:N})});function A(a){return s.jsx("div",{style:{padding:"var(--betterplace-spacing-100)",background:a.ghost?"var(--betterplace-color-bg-dark)":void 0,containerType:"inline-size"},children:s.jsx(W,{...a})})}const M={title:"Components/IconButton",component:A,argTypes:{children:{control:{type:"text"},description:"The (text) content of the button."},kind:{options:["primary","secondary","danger","plain"],control:{type:"radio"},description:"Applies specific design",table:{defaultValue:{summary:"primary"},type:{summary:"ButtonKind | undefined"}}},size:{options:["large","default","small"],control:{type:"radio"},description:"Size of the button",table:{defaultValue:{summary:"default"},type:{summary:"ButtonSize | undefined"}}},as:{options:["button","a"],control:"radio",description:"HTML tag"},disabled:{control:{type:"boolean"},description:"Toggles aria-disabled. We use aria-disabled instead of disabled to keep focusability and with that the possibility to add a description that reasons the disabled state.",table:{defaultValue:{summary:"false"}}},iconName:{description:"The name of the icon to be displayed in the button.",options:[...Object.keys(S),void 0],control:{type:"radio"},table:{type:{summary:"IconName"}}},iconPosition:{description:"Position of the selected icon in the button.",options:["left","right",void 0],control:{type:"radio"},table:{type:{summary:"left | right | undefined",defaultValue:"left"}}},ghost:{description:"Additional styling options for ghost style button, which includes transparent button background and light font color for darker backgrounds.",control:{type:"boolean"}},iconProps:{description:"All props of the Icon component, except the `name` are passed down to the selected icon.",table:{type:{summary:"IconProps"}}},props:{control:!1,description:"IconButton props extend the original Button component props. All other props (e.g. `href`, `onClick`) are passed on to the root JSX element"}}},e={args:{children:"Donate now",kind:"primary",as:"button",size:"default",ghost:!1,iconName:"checkCircle",iconPosition:"left"}},n={args:{children:"Turn around!",iconName:"arrowLeft",iconPosition:"left",kind:"plain",size:"small"}},r={args:{children:"Do not click!",iconName:"alertCircle",kind:"danger",iconPosition:"right"}},i={args:{iconName:"x",kind:"plain",title:"Close"}};var l,d,p;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    children: 'Donate now',
    kind: 'primary',
    as: 'button',
    size: 'default',
    ghost: false,
    iconName: 'checkCircle',
    iconPosition: 'left'
  }
}`,...(p=(d=e.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var u,m,f;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    children: 'Turn around!',
    iconName: 'arrowLeft',
    iconPosition: 'left',
    kind: 'plain',
    size: 'small'
  }
}`,...(f=(m=n.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};var h,y,g;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    children: 'Do not click!',
    iconName: 'alertCircle',
    kind: 'danger',
    iconPosition: 'right'
  }
}`,...(g=(y=r.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};var b,k,C;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    iconName: 'x',
    kind: 'plain',
    title: 'Close'
  }
}`,...(C=(k=i.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};const X=["Default","ButtonWithLeftIcon","ButtonWithRightIcon","OnlyIconButton"];export{n as ButtonWithLeftIcon,r as ButtonWithRightIcon,e as Default,i as OnlyIconButton,X as __namedExportsOrder,M as default};
