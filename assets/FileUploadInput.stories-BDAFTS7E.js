import{j as o}from"./jsx-runtime-u17CrQMm.js";import{c as L}from"./index-CL1aUomK.js";import{r as l}from"./iframe-K_OwPEhI.js";import"./compiler-runtime-BztlXLJS.js";import{u as Y}from"./useForwardedRef-B5991O7N.js";import{I as Z}from"./Icon-x1z4PGh0.js";import{C as ee}from"./ClientIconButton-BBWZeyUb.js";import{L as te}from"./LayoutStack-qOFlLSRJ.js";import{L as oe}from"./LayoutCluster-DC6NloDU.js";import{T as re}from"./TextInput-C_n-MKNi.js";import"./preload-helper-PPVm8Dsz.js";import"./preventDefault-M1KdZT7V.js";import"./Button-CzNMfbNq.js";import"./TextInputWrapper-C5oZAyEo.js";const ae="_input_12a7u_1",se="_hide_12a7u_5",le="_clearButton_12a7u_9",ne="_hiddenInput_12a7u_34",ie="_clusterLayout_12a7u_46",ce="_buttonContainer_12a7u_51",ue="_clusterLayoutButton_12a7u_57",t={input:ae,hide:se,clearButton:le,hiddenInput:ne,clusterLayout:ie,buttonContainer:ce,clusterLayoutButton:ue},N=e=>e instanceof File,k=e=>e?N(e)?1:e.length:0,pe=(e,r=0)=>e?N(e)?r===0?e.name:"":e[r]?.name||"":"",D=l.forwardRef(({label:e,name:r,description:w,error:U,warning:S,id:j,required:W,className:P,invisibleLabel:$,accept:E,multiple:R=!1,maxSize:n,fullWidth:v,placeholder:B="",buttonText:M="",onFileChange:i,disabled:s,readOnly:c,multipleFilesSelectedLabel:z,onChange:F,files:y,tabIndex:T,displayText:A,layout:h="stack",...O},V)=>{const X=l.useId(),x=j||r||X,g=Y(V),q=()=>{const a=k(y);return a===0?A??B:a===1?pe(y,0):`${a} ${z}`},G=l.useCallback(a=>{const u=a.target.files;if(n&&u)for(let C=0;C<u.length;C++){const _=u[C];if(_&&_.size>n){console.warn(`File ${_.name} exceeds maximum size of ${n} bytes`);return}}i?.(u),F?.(a)},[n,i,F]),H=l.useCallback(()=>{i?.(null)},[i]),J=l.useCallback(()=>{!s&&!c&&g.current?.click()},[s,g,c]),I=q(),K=k(y)>0||I!==B,Q=h==="stack"?te:oe;return o.jsxs(Q,{space:"50",className:P,children:[o.jsx(re,{label:e,name:`${r}-display`,description:w,error:U,warning:S,id:`${x}-display`,required:W,invisibleLabel:$,disabled_:!0,value:I,readOnly:!0,fullWidth:v,inputContainerClassName:t.input,wrapperClassName:t.clusterLayout,children:o.jsx("button",{type:"button",className:L(t.clearButton,{[t.hide]:!K||s||c}),onClick:H,"aria-label":"Clear selected file",tabIndex:T,children:o.jsx(Z,{size:"300",name:"x"})})}),o.jsx("input",{...O,ref:g,type:"file",id:x,name:r,accept:E,multiple:R,disabled:s,onChange:G,className:t.hiddenInput,"aria-describedby":w?`${x}-description`:void 0,tabIndex:-1}),o.jsx("div",{className:t.buttonContainer,children:o.jsx(ee,{type:"button",kind:"secondary",size:"input",disabled:s||c,onClick:J,className:L(t.browseButton,{[t.clusterLayoutButton]:h==="cluster"}),iconName:"upload",tabIndex:T,fullWidth:h==="stack",children:M})})]})});D.displayName="FileUploadInput";const Ie={title:"Components/FileUploadInput",component:D,parameters:{docs:{description:{component:"File upload input component with a display field showing selected file names and a browse button. Features a clear button (X) when files are selected, accepts file type restrictions, and supports both single and multiple file selection."}}},argTypes:{label:{control:{type:"text"},description:"Label text for the file input.",table:{type:{summary:"ReactNode"}}},placeholder:{control:{type:"text"},description:"Placeholder text when no file is selected (required).",table:{type:{summary:"string"}}},buttonText:{control:{type:"text"},description:"Text for the browse button (required).",table:{type:{summary:"string"}}},accept:{control:{type:"text"},description:'Accepted file types (e.g., "image/*", ".pdf", etc.)',table:{type:{summary:"string"}}},multiple:{control:{type:"boolean"},description:"Whether multiple files can be selected.",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},disabled:{control:{type:"boolean"},description:"Whether the input is disabled.",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},fullWidth:{control:{type:"radio"},options:[!0,void 0,"mobile-only"],description:"Take 100% of the available width.",table:{defaultValue:{summary:"undefined"}}},error:{control:{type:"text"},description:"Error message to display.",table:{type:{summary:"string"}}},description:{control:{type:"text"},description:"Description text below the input.",table:{type:{summary:"string"}}}}},p={args:{label:"Upload a file",name:"file-upload",id:"test-file-upload",placeholder:"Select a file...",buttonText:"Browse files",layout:"cluster"}},d={args:{label:"Profile picture",name:"profile-picture",placeholder:"Choose your profile picture...",buttonText:"Browse images",accept:"image/*"}},m={args:{label:"Upload documents",name:"documents",multiple:!0,placeholder:"No files selected...",buttonText:"Select files",accept:".pdf,.doc,.docx"}},f={args:{label:"Upload file",name:"file-with-error",placeholder:"Select a file...",buttonText:"Browse files",error:"File size must be less than 5MB",description:"Accepted formats: PDF, DOC, DOCX"}},b={args:{label:"Upload file",name:"disabled-upload",placeholder:"Select a file...",buttonText:"Browse files",disabled:!0}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Upload a file',
    name: 'file-upload',
    id: 'test-file-upload',
    placeholder: 'Select a file...',
    buttonText: 'Browse files',
    layout: 'cluster'
  }
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Profile picture',
    name: 'profile-picture',
    placeholder: 'Choose your profile picture...',
    buttonText: 'Browse images',
    accept: 'image/*'
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Upload documents',
    name: 'documents',
    multiple: true,
    placeholder: 'No files selected...',
    buttonText: 'Select files',
    accept: '.pdf,.doc,.docx'
  }
}`,...m.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Upload file',
    name: 'file-with-error',
    placeholder: 'Select a file...',
    buttonText: 'Browse files',
    error: 'File size must be less than 5MB',
    description: 'Accepted formats: PDF, DOC, DOCX'
  }
}`,...f.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Upload file',
    name: 'disabled-upload',
    placeholder: 'Select a file...',
    buttonText: 'Browse files',
    disabled: true
  }
}`,...b.parameters?.docs?.source}}};const Le=["Default","WithPlaceholder","MultipleFiles","WithError","Disabled"];export{p as Default,b as Disabled,m as MultipleFiles,f as WithError,d as WithPlaceholder,Le as __namedExportsOrder,Ie as default};
