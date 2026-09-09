import{j as n}from"./jsx-runtime-u17CrQMm.js";import{c as C}from"./compiler-runtime-BztlXLJS.js";import{c as _}from"./index-CL1aUomK.js";import{F as k}from"./Fieldset-C3tcw8gn.js";import{r as N}from"./iframe-K_OwPEhI.js";import{I as j}from"./Icon-x1z4PGh0.js";import"./LayoutStack-qOFlLSRJ.js";import"./LayoutCluster-DC6NloDU.js";import"./preload-helper-PPVm8Dsz.js";const A="_hiddenInput_lv0d5_1",L="_button_lv0d5_7",z="_group_lv0d5_30",E="_stack_lv0d5_82",T="_cluster_lv0d5_88",V="_container_lv0d5_92",w="_shouldWrap_lv0d5_98",i={hiddenInput:A,button:L,group:z,stack:E,cluster:T,container:V,shouldWrap:w};function l({children:o,layout:t="horizontal",className:m,shouldWrap:e,containerClassName:s,...r}){return n.jsx(k,{...r,className:_(i.container,s),layout:t,layoutProps:{space:"100",...r.layoutProps,className:_(i.group,m,r.layoutProps?.className,{[i.stack]:t==="vertical",[i.cluster]:t==="horizontal",[i.shouldWrap]:e})},children:o})}const B=N.forwardRef(function(t,m){const e=C.c(19);let s,r,a,d,c;if(e[0]!==t){const{id:b,name:G,children:v,size:F,labelProps:W,...P}=t;r=b,d=G,s=v,a=W,c=P,e[0]=t,e[1]=s,e[2]=r,e[3]=a,e[4]=d,e[5]=c}else s=e[1],r=e[2],a=e[3],d=e[4],c=e[5];const I=a?.className;let p;e[6]!==I?(p=_(i.button,I),e[6]=I,e[7]=p):p=e[7];let u;e[8]!==r||e[9]!==d||e[10]!==c||e[11]!==m?(u=n.jsx("input",{...c,ref:m,type:"radio",id:r,name:d,className:i.hiddenInput}),e[8]=r,e[9]=d,e[10]=c,e[11]=m,e[12]=u):u=e[12];let g;return e[13]!==s||e[14]!==r||e[15]!==a||e[16]!==p||e[17]!==u?(g=n.jsxs("label",{...a,htmlFor:r,className:p,children:[u,s]}),e[13]=s,e[14]=r,e[15]=a,e[16]=p,e[17]=u,e[18]=g):g=e[18],g});l.Item=B;function f(o){const t=C.c(7);let m,e,s,r,a;t[0]===Symbol.for("react.memo_cache_sentinel")?(m=n.jsx(l.Item,{id:"1",name:"story",defaultChecked:!0,children:"Item 1"}),e=n.jsx(l.Item,{id:"2",name:"story",children:"Long Long Item 2"}),s=n.jsx(l.Item,{id:"3",name:"story",children:"Item 3"}),r=n.jsx(l.Item,{id:"4",name:"story",children:"Item 4"}),a=n.jsx(l.Item,{id:"5",name:"story",children:"Item 5"}),t[0]=m,t[1]=e,t[2]=s,t[3]=r,t[4]=a):(m=t[0],e=t[1],s=t[2],r=t[3],a=t[4]);let d;return t[5]!==o?(d=n.jsxs(l,{...o,children:[m,e,s,r,a]}),t[5]=o,t[6]=d):d=t[6],d}const Q={title:"Components/SegmentedControl",component:l,subcomponents:{SegmentedControlButton:l.Item}},h={render:o=>n.jsxs(l,{...o,legend:"Align this",children:[n.jsx(l.Item,{id:"1",name:"story",defaultChecked:!0,"aria-label":"left aligned",children:n.jsx(j,{name:"leftAlignedText"})}),n.jsx(l.Item,{id:"2",name:"story","aria-label":"right aligned",children:n.jsx(j,{name:"rightAlignedText"})})]})},S={render:o=>n.jsx(f,{...o,legend:"Long Story - non-wrapping",layout:"horizontal"})},x={render:o=>n.jsx(f,{...o,legend:"Wrapping Story",shouldWrap:!0})},y={render:o=>n.jsx(f,{...o,legend:"Vertical Story",layout:"vertical"})};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: (args: SegmentedControlProps) => {
    return <SegmentedControl {...args} legend="Align this">
        <SegmentedControl.Item id="1" name="story" defaultChecked aria-label="left aligned">
          <Icon name="leftAlignedText" />
        </SegmentedControl.Item>
        <SegmentedControl.Item id="2" name="story" aria-label="right aligned">
          <Icon name="rightAlignedText" />
        </SegmentedControl.Item>
      </SegmentedControl>;
  }
}`,...h.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: (args: SegmentedControlProps) => <SegmentedStoryGroup {...args} legend="Long Story - non-wrapping" layout="horizontal" />
}`,...S.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: (args: SegmentedControlProps) => {
    return <SegmentedStoryGroup {...args} legend="Wrapping Story" shouldWrap />;
  }
}`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: (args: SegmentedControlProps) => {
    return <SegmentedStoryGroup {...args} legend="Vertical Story" layout="vertical" />;
  }
}`,...y.parameters?.docs?.source}}};const U=["SmallGroup","LongGroup","WrappingGroup","VerticalGroup"];export{S as LongGroup,h as SmallGroup,y as VerticalGroup,x as WrappingGroup,U as __namedExportsOrder,Q as default};
