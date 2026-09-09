import{j as e}from"./jsx-runtime-u17CrQMm.js";import{c}from"./compiler-runtime-BztlXLJS.js";import"./Button-CzNMfbNq.js";import{C as h}from"./ClientButton-CGu0sloq.js";import{T as t}from"./TextLink-Bnp40fj4.js";import{D as s,a as o,b as m,c as a,d as w}from"./Dropdown-Bypyt0dJ.js";import"./iframe-K_OwPEhI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CL1aUomK.js";import"./preventDefault-M1KdZT7V.js";import"./Icon-x1z4PGh0.js";import"./Popup-BCTiY446.js";import"./index-CQksqrAn.js";import"./index-DxRQN4t8.js";import"./useIsMounted-EdiWN4I5.js";import"./PopupContext-Bx01joXm.js";import"./keys-CVJCkmxv.js";import"./Select.module-Tq86kHSN.js";function x(d){const r=c.c(3);let n;r[0]===Symbol.for("react.memo_cache_sentinel")?(n={height:"200px",padding:"var(--betterplace-spacing-400)",containerType:"inline-size",display:"flex",justifyContent:"center",alignItems:"center",position:"relative"},r[0]=n):n=r[0];let i;return r[1]!==d?(i=e.jsx("div",{style:n,children:e.jsx(a,{...d})}),r[1]=d,r[2]=i):i=r[2],i}const l={dropdownTrigger:e.jsx(w,{children:"Whatever"}),anchor:e.jsx(t,{href:"#",children:"Anchor"}),div:e.jsx("div",{role:"note",children:"This is a note, should have a popup!"})},E={title:"Components/Dropdown",component:x,argTypes:{trigger:{description:"The actual component to which the popup should be attached.",options:Object.keys(l),mapping:l,control:{type:"radio",labels:{text:"text",icon:"icon",button:"button"}}},children:{description:"The tooltip content."}}},p={args:{children:e.jsxs(s,{children:[e.jsx(o,{children:e.jsx(t,{kind:"textColor",href:"#",children:"Link One"})}),e.jsx(o,{children:e.jsx(t,{kind:"textColor",href:"https://www.betterplace.org",target:"_blank",rel:"noreferrer",children:"Link Two"})}),e.jsx(m,{}),e.jsx(o,{children:e.jsx(t,{kind:"textColor",href:"#",children:"Link Three"})}),e.jsx(o,{children:e.jsx(a,{trigger:e.jsx(t,{kind:"textColor",href:"#",children:"Link One"}),children:e.jsxs(s,{children:[e.jsx(o,{children:e.jsx(t,{kind:"textColor",href:"https://www.betterplace.org",target:"_blank",rel:"noreferrer",children:"Link Two"})}),e.jsx(o,{children:e.jsx(t,{kind:"textColor",href:"https://www.betterplace.org",target:"_blank",rel:"noreferrer",children:"Link Two"})})]})})}),e.jsx(o,{children:e.jsx(h,{kind:"secondary",onClick:()=>alert("clicked"),children:"Click me!"})})]}),trigger:l.dropdownTrigger}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    children: <DropdownMenu>
        <DropdownMenuItem>
          <TextLink kind="textColor" href="#">
            Link One
          </TextLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TextLink kind="textColor" href="https://www.betterplace.org" target="_blank" rel="noreferrer">
            Link Two
          </TextLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <TextLink kind="textColor" href="#">
            Link Three
          </TextLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DropdownComponent trigger={<TextLink kind="textColor" href="#">
                Link One
              </TextLink>}>
            <DropdownMenu>
              <DropdownMenuItem>
                <TextLink kind="textColor" href="https://www.betterplace.org" target="_blank" rel="noreferrer">
                  Link Two
                </TextLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TextLink kind="textColor" href="https://www.betterplace.org" target="_blank" rel="noreferrer">
                  Link Two
                </TextLink>
              </DropdownMenuItem>
            </DropdownMenu>
          </DropdownComponent>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button kind="secondary" onClick={() => alert('clicked')}>
            Click me!
          </Button>
        </DropdownMenuItem>
      </DropdownMenu>,
    trigger: labelMapping.dropdownTrigger
  }
}`,...p.parameters?.docs?.source}}};const R=["Default"];export{p as Default,R as __namedExportsOrder,E as default};
