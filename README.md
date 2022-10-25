# Betterplace Design System

This is the repository for [betterplace](https://www.betterplace.org/)'s design system: https://betterplace.github.io/betterplace-design-system

The system uses [Storybook](https://storybook.js.org/) as a tool for developing a component library, guidelines and documentation, that work across all betterplace platforms.

## 🔧 Setup

### Install prerequisites

Open a terminal and enter the following `commands` one by one in order to install the tools necessary for running the project:

1. Install [Homebrew](https://brew.sh): `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
2. Install [asdf](https://asdf-vm.com/guide/getting-started.html): `brew install asdf`
3. Install global dependencies (see [.tool-versions](.tool-versions)): `asdf install`

### Install the project

To run the project you first need to download all the files to your computer and install some dependencies:

1. Clone the Git repository: `git clone git@github.com:betterplace/betterplace-design-system.git`
2. Change to the directory where all the project files live: `cd betterplace-design-system`
3. Install project's dependencies: `yarn install`

### Run the project

1. If you aren't already there, change to the directory where all the project files live: `cd betterplace-design-system`
2. Start the server and run Storybook in your browser: `yarn storybook`
   - This might fail after updating the Git repository. In that case, run `yarn install` again.
3. The browser will open automatically once it's finished. If not, you can open it manually: http://localhost:6006/

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

### Customizing Storybook UI

- you can adjust theme options in `.storybook/betterplace-theme.js`
- if you need more control, write your CSS in `.storybook/manager-head.html`
- static assets (images, fonts, ...) are located in the `public` folder

### 📦 Data model

### 🧪 Tests

## 🚢 Deployment

## 📒 Further documentation

## 📖 License

Copyright 2022, [gut.org gAG](https://gut.org)
