import{j as p}from"./jsx-runtime-u17CrQMm.js";import{c as B}from"./compiler-runtime-BztlXLJS.js";import{r as a}from"./iframe-K_OwPEhI.js";import{i as fe}from"./index-C04bmJEi.js";import{c as R}from"./index-CL1aUomK.js";import{L as pe}from"./LayoutStack-qOFlLSRJ.js";import{L as be}from"./LayoutCluster-DC6NloDU.js";import{K as k}from"./keys-CVJCkmxv.js";import"./preload-helper-PPVm8Dsz.js";const ge="_rangeSlider_iyvux_1",ve="_track_iyvux_10",ye="_filledTrack_iyvux_22",xe="_sliderContainer_iyvux_34",_e="_thumb_iyvux_41",he="_scale_iyvux_63",Ve="_scaleValue_iyvux_73",Se="_scaleValueFrom_iyvux_78",we="_scaleValueTo_iyvux_82",Re="_dragging_iyvux_86",y={rangeSlider:ge,track:ve,filledTrack:ye,sliderContainer:xe,thumb:_e,scale:he,scaleValue:Ve,scaleValueFrom:Se,scaleValueTo:we,dragging:Re};function G(o,e,r){return Math.min(Math.max(o,e),r)}function ke(o,e,r){return r===e?0:(o-e)/(r-e)*100}function h(o,e,r,d){if(d<=0)return o;const c=G(o,e,r);return Math.round((c-e)/d)*d+e}function Ce(o,e,r,d,c){switch(o){case k.Left:case k.Down:return h(e-r,d,c,r);case k.Right:case k.Up:return h(e+r,d,c,r);case k.Home:case k.End:return h(c,d,c,r);default:return null}}const W=a.forwardRef(({className:o,trackClassName:e,thumbClassName:r,trackFilledClassName:d,min:c=0,max:m=100,step:v=1,value:i,defaultValue:x,onChange:f,disabled:Q,"aria-label":Y,"aria-labelledby":Z,children:ee=()=>null,scaleFormat:X,...U},te)=>{const g=i!==void 0,[re,ne]=a.useState(!1),_=Q||!re,s=Number(c),u=Number(m),b=Number(v);a.useEffect(()=>{ne(!0)},[]);const ae=a.useCallback(()=>{let t;return typeof i=="number"?t=i:typeof x=="number"?t=x:typeof i=="string"?t=Number(i):typeof x=="string"?t=Number(x):t=s,h(t,s,u,b)},[i,x,s,u,b]),[se,S]=a.useState(ae());a.useEffect(()=>{if(!g||i===void 0||fe(i))return;const t=typeof i=="string"?Number(i):i;S(h(t,s,u,b))},[i,g,s,u,b]);const z=a.useRef(null),V=a.useRef(null),w=a.useCallback(()=>{const t=z.current;t&&($.current=t.getBoundingClientRect())},[]);a.useImperativeHandle(te,()=>({...V.current,set value(t){if(V.current){V.current.value=t;const n=h(Number(t),s,u,b);if(g||S(n),f){const l=new Event("change",{bubbles:!0});Object.defineProperty(l,"target",{writable:!1,value:V.current}),f(l)}}},get value(){return V.current?.value??""}})),a.useEffect(()=>{const t=V.current;if(!t)return;const n=new MutationObserver(()=>{const l=h(Number(t.value),s,u,b);g||S(l)});return n.observe(t,{attributes:!0,attributeFilter:["value"]}),()=>n.disconnect()},[g,s,u,b]);const C=h(se,s,u,b),[A,H]=a.useState(void 0),$=a.useRef(void 0),q=ke(C,s,u);a.useEffect(()=>{w()},[w]);const[E,K]=a.useState(!1),L=a.useCallback(t=>{const n=$.current;if(!n)return 0;let l=t-n.left;return l=G(l,0,n.width),l/n.width},[]),N=a.useCallback(t=>{const n=L(t),l=s+n*(u-s);return h(l,s,u,b)},[L,s,u,b]),le=A!==void 0?L(A)*100:void 0,oe=a.useCallback(t=>{if(_||!V.current)return;w(),K(!0);try{t.target.setPointerCapture?.(t.pointerId)}catch{}const n=t.clientX,l=N(n);if(V.current.value=l.toString(),g||S(l),f){const j={...t,target:{...t.target,value:l}};f(j)}},[_,N,g,f,w]),ie=a.useCallback(t=>{if(!E||_)return;const n=t.clientX;window.requestAnimationFrame(()=>{H(n);const l=N(n);if(g||S(l),!f)return;const j={...t,target:{...t.target,value:l}};f(j)})},[E,_,N,g,f]),ce=a.useCallback(()=>{K(!1),H(void 0)},[K]),ue=t=>{if(_)return;const n=Ce(t.key,C,b,s,u);if(n!==null&&(t.preventDefault(),g||S(n),f)){const l={...t,target:{...t.target,value:n}};f(l)}},de=a.useCallback(t=>{if(_)return;w();const n=$.current;if(!n)return;const j=(t.clientX-n.left)/n.width;let P=s+j*(u-s);if(P=h(P,s,u,b),g||S(P),f){const me={...t,target:{...t.target,value:P}};f(me)}},[_,w,s,u,b,g,f]),O=E?le??q:q;return p.jsxs(pe,{className:R(y.rangeSlider,o,{[y.dragging]:E}),"aria-disabled":_,tabIndex:-1,space:"100",children:[p.jsxs(be,{className:y.sliderContainer,children:[p.jsx("div",{ref:z,className:R(y.track,e),onClick:de,role:"presentation",children:p.jsx("div",{className:R(y.filledTrack,d),style:{inlineSize:`${O}%`}})}),p.jsx("div",{className:R(y.thumb,r),style:{insetInlineStart:`${O}%`},role:"slider",tabIndex:_?-1:0,"aria-valuenow":C,"aria-valuemin":s,"aria-valuemax":u,"aria-disabled":_,"aria-label":Y,"aria-labelledby":Z,onPointerDown:oe,onKeyDown:ue,onPointerUp:ce,onPointerMove:ie,...U,children:p.jsx(ee,{value:C,percent:O})})]}),typeof X=="function"?p.jsxs("dl",{className:y.scale,children:[p.jsx("dd",{className:R(y.scaleValue,y.scaleValueFrom),children:X(s)}),p.jsx("dd",{className:R(y.scaleValue,y.scaleValueTo),children:X(u)})]}):null,p.jsx("input",{type:"hidden",ref:V,value:C,readOnly:!0,tabIndex:-1,name:U.name})]})});W.displayName="RangeSlider";const $e={title:"Components/RangeSlider",component:W,tags:["autodocs"],argTypes:{min:{control:{type:"number"},defaultValue:0},max:{control:{type:"number"},defaultValue:100},step:{control:{type:"number"},defaultValue:1},value:{control:{type:"number"}},defaultValue:{control:{type:"number"}},disabled:{control:{type:"boolean"}},scaleFormat:{control:!1},children:{control:!1}}},J=o=>{const e=B.c(6),{percent:r,value:d}=o;let c;e[0]===Symbol.for("react.memo_cache_sentinel")?(c={background:"#eee",borderRadius:4,padding:"2px 6px",fontSize:12,position:"absolute",top:-28,left:"50%",transform:"translateX(-50%)",whiteSpace:"nowrap",pointerEvents:"none"},e[0]=c):c=e[0];let m;e[1]!==r?(m=Math.round(r),e[1]=r,e[2]=m):m=e[2];let v;return e[3]!==m||e[4]!==d?(v=p.jsxs("div",{style:c,children:[m,"% (",d,")"]}),e[3]=m,e[4]=d,e[5]=v):v=e[5],v},D={args:{min:0,max:100,step:1,defaultValue:50,"aria-label":"Range slider"}},T={args:{min:0,max:100,step:1,defaultValue:30,children:J,"aria-label":"Range slider with content"}};function je(o){const e=B.c(10),[r,d]=a.useState(Number(o.value??40));let c;e[0]===Symbol.for("react.memo_cache_sentinel")?(c=f=>d(Number(f.target.value)),e[0]=c):c=e[0];let m;e[1]!==o||e[2]!==r?(m=p.jsx(W,{...o,value:r,onChange:c,children:J}),e[1]=o,e[2]=r,e[3]=m):m=e[3];let v;e[4]===Symbol.for("react.memo_cache_sentinel")?(v={marginTop:12},e[4]=v):v=e[4];let i;e[5]!==r?(i=p.jsxs("div",{style:v,children:["Current value: ",r]}),e[5]=r,e[6]=i):i=e[6];let x;return e[7]!==m||e[8]!==i?(x=p.jsxs("div",{children:[m,i]}),e[7]=m,e[8]=i,e[9]=x):x=e[9],x}const F={render:je,args:{min:0,max:100,step:5,value:40,"aria-label":"Controlled range slider"}},I={args:{min:0,max:100,step:1,defaultValue:60,disabled:!0,"aria-label":"Disabled range slider"}},M={args:{min:0,max:1e3,step:50,defaultValue:500,scaleFormat:o=>`${o} €`,"aria-label":"Range slider with scale"}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    'min': 0,
    'max': 100,
    'step': 1,
    'defaultValue': 50,
    'aria-label': 'Range slider'
  }
}`,...D.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    'min': 0,
    'max': 100,
    'step': 1,
    'defaultValue': 30,
    'children': ExampleContent,
    'aria-label': 'Range slider with content'
  }
}`,...T.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: ControlledComponent,
  args: {
    'min': 0,
    'max': 100,
    'step': 5,
    'value': 40,
    'aria-label': 'Controlled range slider'
  }
}`,...F.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    'min': 0,
    'max': 100,
    'step': 1,
    'defaultValue': 60,
    'disabled': true,
    'aria-label': 'Disabled range slider'
  }
}`,...I.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    'min': 0,
    'max': 1000,
    'step': 50,
    'defaultValue': 500,
    'scaleFormat': (v: number) => \`\${v} €\`,
    'aria-label': 'Range slider with scale'
  }
}`,...M.parameters?.docs?.source}}};const Ke=["Default","WithCustomContent","Controlled","Disabled","WithScaleFormat"];export{F as Controlled,D as Default,I as Disabled,T as WithCustomContent,M as WithScaleFormat,Ke as __namedExportsOrder,$e as default};
