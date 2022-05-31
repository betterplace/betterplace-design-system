# Betterplace Design System

This is the repository for [betterplace](https://www.betterplace.org/)'s design system: https://betterplace.github.io/betterplace-design-system

The system uses [Storybook](https://storybook.js.org/) as a tool for developing a component library, guidelines and documentation, that work across all betterplace platforms.

## 🔧 Setup

1. `git clone git@github.com:betterplace/betterplace-design-system.git`
2. `cd betterplace-design-system`
3. `yarn install`
4. `yarn storybook`

## Dependencies

See [.tool-versions](.tool-versions)

## 💻 Development

### Scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `yarn storybook`       | Start and open storybook in the browser. |
| `yarn build-storybook` | Build static storybook output.           |
| `yarn build-tokens`    | Generate all CSS variables from tokens.  |

### Design Tokens

We use Design Tokens exported by [Figma Tokens](https://docs.tokens.studio/) and generate CSS variables from these tokens using [Style Dictionary](https://amzn.github.io/style-dictionary/#/).

The tokens input file is located in [config/tokens.json](config/tokens.json) (the exported file from Figma). The generated output is located in the [build](build) folder. Each theme is generated into its own file with variables, that would override each other. This is by design, because we only include one of these at a time. For example, theme org would include [build/css/themes/org.css](build/css/themes/org.css). Additionally, a [globals.css](build/css/globals.css) is generated, which includes only unique global tokens.

To re-generate tokens with style-dictionary, run the following command: `yarn build-tokens`

### 📦 Data model

### 🧪 Tests

## 🚢 Deployment

## 📒 Further documentation

## 📖 License

Copyright 2022, [gut.org gAG](https://gut.org)
