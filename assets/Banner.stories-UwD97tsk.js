import{j as e}from"./jsx-runtime-u17CrQMm.js";import{B as n}from"./Banner-inP1eKCn.js";import"./compiler-runtime-BztlXLJS.js";import"./iframe-K_OwPEhI.js";import"./preload-helper-PPVm8Dsz.js";import"./Icon-x1z4PGh0.js";import"./index-CL1aUomK.js";const B={title:"Components/Banner",component:n,argTypes:{children:{control:"text",description:"Content rendered inside the banner."},color:{control:"text",description:'Semantic color token suffix (e.g. "accent-secondary"). Omit when using htmlColor.'},htmlColor:{control:"color",description:"Custom CSS color value. Use instead of color when not using a design token."},className:{control:!1},style:{control:!1}}},o={args:{color:"accent-secondary",children:"This is a neutral banner used to highlight information."}},t={render:r=>e.jsxs(n,{...r,children:[e.jsx(n.TitleBar,{children:"Matching donation event"}),e.jsx(n.Content,{children:e.jsx("p",{children:"All donations are doubled for a limited time."})})]}),args:{color:"accent-secondary"}},a={render:r=>e.jsxs(n,{...r,children:[e.jsx(n.TitleBar,{icon:"megaphone",children:"Matching donation event"}),e.jsx(n.Content,{children:e.jsx("p",{children:"All donations are doubled for a limited time."})})]}),args:{color:"accent-secondary"}},s={render:r=>e.jsx(n,{...r,children:e.jsxs(n.Row,{children:[e.jsx(n.Row.FirstSlot,{children:"Left slot"}),e.jsx(n.Row.SecondSlot,{children:"Right slot content"})]})}),args:{color:"accent-secondary"}},c={args:{htmlColor:"#ff8800",children:e.jsxs(e.Fragment,{children:[e.jsx(n.TitleBar,{children:"Custom colored banner with a lot and I mean a lot of text so that I force it to wrap at least in the mobile view."}),e.jsx(n.Content,{children:e.jsx("p",{children:"This banner uses a custom HTML color value."})})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'accent-secondary',
    children: 'This is a neutral banner used to highlight information.'
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <Banner {...args}>
      <Banner.TitleBar>Matching donation event</Banner.TitleBar>
      <Banner.Content>
        <p>All donations are doubled for a limited time.</p>
      </Banner.Content>
    </Banner>,
  args: {
    color: 'accent-secondary'
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => <Banner {...args}>
      <Banner.TitleBar icon="megaphone">Matching donation event</Banner.TitleBar>
      <Banner.Content>
        <p>All donations are doubled for a limited time.</p>
      </Banner.Content>
    </Banner>,
  args: {
    color: 'accent-secondary'
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <Banner {...args}>
      <Banner.Row>
        <Banner.Row.FirstSlot>Left slot</Banner.Row.FirstSlot>
        <Banner.Row.SecondSlot>Right slot content</Banner.Row.SecondSlot>
      </Banner.Row>
    </Banner>,
  args: {
    color: 'accent-secondary'
  }
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    htmlColor: '#ff8800',
    children: <>
        <Banner.TitleBar>
          Custom colored banner with a lot and I mean a lot of text so that I force it to wrap at least in the mobile
          view.
        </Banner.TitleBar>
        <Banner.Content>
          <p>This banner uses a custom HTML color value.</p>
        </Banner.Content>
      </>
  }
}`,...c.parameters?.docs?.source}}};const g=["Default","WithTitleBar","WithTitleBarCustomIcon","WithCustomRow","CustomHtmlColor"];export{c as CustomHtmlColor,o as Default,s as WithCustomRow,t as WithTitleBar,a as WithTitleBarCustomIcon,g as __namedExportsOrder,B as default};
