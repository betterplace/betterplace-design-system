import{j as a}from"./jsx-runtime-BlAj40OV.js";import{c as b}from"./index-Bl6ORisp.js";import{r as d}from"./index-Cs7sjTYM.js";import{p}from"./preventDefault-CIaEEaQs.js";const N="_checkmark_ciy57_1",v="_checkboxContainer_ciy57_23",L="_labelContent_ciy57_39",R="_checkboxWrapper_ciy57_79",W="_checkbox_ciy57_23",g="_disabledLabel_ciy57_89",o={checkmark:N,checkboxContainer:v,labelContent:L,checkboxWrapper:R,checkbox:W,disabledLabel:g},I=d.forwardRef(function({id:n,name:i,error:e=!1,classNames:c,"aria-disabled":s,"aria-required":k,children:r,required:h,checked:l,disabled_:t,disabled:C,...x},f){const u=d.useId(),m=n||i||u,j=s||C||t;return a.jsx("label",{htmlFor:m,className:b(o.checkboxContainer,c==null?void 0:c.label,{[o.disabledLabel]:C}),children:a.jsxs("div",{className:o.checkboxWrapper,children:[a.jsxs("div",{className:o.checkbox,children:[a.jsx("input",{tabIndex:0,...x,type:"checkbox",ref:f,id:m,name:i,required:h,disabled:t,"aria-disabled":j,"aria-required":h,"aria-invalid":e,"aria-checked":l,"aria-describedby":e?`${i}-error`:void 0}),a.jsx("span",{className:b(o.checkmark,c==null?void 0:c.checkmark)})]}),a.jsx("div",{className:b(o.labelContent,c==null?void 0:c.labelContent),children:r})]})})}),q=d.forwardRef(function({onChange:n,onClick:i,...e},c){const{disabled:s}=e,k=s?p:n,r=s?p:i;return a.jsx(I,{...e,onChange:k,onClick:r,ref:c})}),F=q;export{F as C};
