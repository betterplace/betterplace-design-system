import{j as l}from"./jsx-runtime-BlAj40OV.js";import"./index-Cs7sjTYM.js";import"./_commonjsHelpers-BosuxZz1.js";const u="_JSONPrettyPrintMain_qmy6t_2",c="_string_qmy6t_6",f="_number_qmy6t_10",p="_boolean_qmy6t_14",y="_key_qmy6t_22",r={JSONPrettyPrintMain:u,string:c,number:f,boolean:p,null:"_null_qmy6t_18",key:y};function m(){const e=new WeakSet;return(n,t)=>{if(!(typeof Node=="function"&&t instanceof Node)){if(typeof t=="object"&&t!==null){if(e.has(t))return;e.add(t)}return t}}}function _(e,n=2){return JSON.stringify(e,m(),n)}function g(e){return e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),e.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,n=>{let t=r.number;return/^"/.test(n)?/:$/.test(n)?t=r.key:t=r.string:/true|false/.test(n)?t=r.boolean:/null/.test(n)&&(t=r.null),t??(t=""),`<span class='${t}'>${n}</span>`})}function b({json:e}){const n=typeof e=="string"?e:_(e,2),t=g(n);return l.jsx("pre",{className:r.JSONPrettyPrintMain,dangerouslySetInnerHTML:{__html:t}})}const N={component:b,parameters:{vitest:{testFile:"JSONPrettyPrint.test.tsx"}}},s={args:{json:{bar:"Lorem ipsum sic dolor",baz:["it is a string",{foo:!1,sus:null}],bub:123}}};var o,i,a;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    json: {
      bar: 'Lorem ipsum sic dolor',
      baz: ['it is a string', {
        foo: false,
        sus: null
      }],
      bub: 123
    }
  }
}`,...(a=(i=s.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const O=["Default"];export{s as Default,O as __namedExportsOrder,N as default};
