import{j as n}from"./jsx-runtime-BlAj40OV.js";import{T as w}from"./TextInputWrapper-BKbvKmKQ.js";import{c as T}from"./index-Bl6ORisp.js";import{r as C}from"./index-Cs7sjTYM.js";const I="_input_1nrjw_1",L="_inputLarge_1nrjw_29",N="_inputContainer_1nrjw_43",S="_hasSuffix_1nrjw_52",s={input:I,"input--error":"_input--error_1nrjw_25",inputLarge:L,inputContainer:N,hasSuffix:S},$=C.forwardRef(({label:d,name:i,description:p,error:r,warning:u,id:o,required:e,className:c,children:a,invisibleLabel:l,inputSize:x="default",errorDisplay:_="all","aria-disabled":j,disabled:h,disabled_:f,...b},g)=>{const t=[];a&&t.push(`${i}-suffix`),r&&t.push(`${i}-error`),u&&t.push(`${i}-warning`),p&&t.push(`${i}-description`);const m=j||(f||h);return n.jsx(w,{label:d,name:i,description:p,error:r,warning:u,id:o||i,required:e,errorDisplay:_,invisibleLabel:l,children:n.jsxs("div",{className:s.inputContainer,children:[n.jsx("input",{...b,ref:g,id:o||i,name:i,"aria-describedby":t.length?t.join(" "):void 0,"aria-invalid":!!r,"aria-required":e,"aria-disabled":m,disabled:f,className:T(s.input,c,{[s["input--error"]]:!!r,[s.hasSuffix]:!!a,[s.inputLarge]:x==="large"})}),a]})})});$.displayName="TextInput";export{$ as T};
