import{j as s}from"./jsx-runtime-BlAj40OV.js";import{c as e}from"./index-Bl6ORisp.js";import{r}from"./index-Cs7sjTYM.js";const h="_toggle_1ly08_1",j="_toggleTrack_1ly08_7",x="_small_1ly08_17",N="_large_1ly08_22",k="_toggleIndicator_1ly08_32",L="_toggleInput_1ly08_56",v="_labelText_1ly08_90",w="_disabledLabel_1ly08_95",a={toggle:h,toggleTrack:j,small:x,large:N,toggleIndicator:k,toggleInput:L,labelText:v,disabledLabel:w},F=r.forwardRef(function({id:_,name:o,error:t=!1,classNames:l,"aria-disabled":b,"aria-required":q,children:n,required:c,checked:m,disabled_:g,disabled:p,size:T="small",...u},I){const f=r.useId(),i=_||o||f,d=b||p||g;return s.jsxs("label",{className:e(a.toggle,l==null?void 0:l.label,{[a.disabledLabel]:d}),htmlFor:i,children:[s.jsx("div",{className:e(a.labelText,l==null?void 0:l.labelText),children:n}),s.jsx("input",{tabIndex:0,...u,type:"checkbox",className:e(a.toggleInput,a[T]),id:i,ref:I,name:o,required:c,disabled:g,"aria-disabled":d,"aria-required":c,"aria-invalid":t,"aria-checked":m,"aria-describedby":t?`${o}-error`:void 0}),s.jsx("span",{className:a.toggleTrack,children:s.jsx("span",{className:a.toggleIndicator})})]})});export{F as T};
