import{j as c}from"./jsx-runtime-u17CrQMm.js";import{c as m}from"./compiler-runtime-BztlXLJS.js";import{s as p}from"./string-BB_dK8OU.js";import"./iframe-K_OwPEhI.js";import"./preload-helper-PPVm8Dsz.js";const f="_JSONPrettyPrintMain_3ykme_2",_="_string_3ykme_11",y="_number_3ykme_15",g="_boolean_3ykme_19",b="_key_3ykme_27",s={JSONPrettyPrintMain:f,string:_,number:y,boolean:g,null:"_null_3ykme_23",key:b};function d(r){return r=r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),r.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,e=>{let t=s.number;return/^"/.test(e)?/:$/.test(e)?t=s.key:t=s.string:/true|false/.test(e)?t=s.boolean:/null/.test(e)&&(t=s.null),t??="",`<span class='${t}'>${e}</span>`})}function P(r){const e=m.c(6),{json:t}=r;let n;e[0]!==t?(n=typeof t=="string"?t:p(t,2),e[0]=t,e[1]=n):n=e[1];const a=n;let o;e[2]!==a?(o=d(a),e[2]=a,e[3]=o):o=e[3];const u=o;let i;return e[4]!==u?(i=c.jsx("div",{className:s.JSONPrettyPrintMain,children:c.jsx("pre",{dangerouslySetInnerHTML:{__html:u}})}),e[4]=u,e[5]=i):i=e[5],i}const J={component:P,parameters:{vitest:{testFile:"JSONPrettyPrint.test.tsx"}}},l={args:{json:{bar:"Lorem ipsum sic dolor",baz:["it is a string",{foo:!1,sus:null}],bub:123}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const j=["Default"];export{l as Default,j as __namedExportsOrder,J as default};
