/*
 * This script fetches all color styles from a Figma document.
 *
 * Dependencies:
 *
 *  - node-fetch
 *
 *
 * For now, you need to input the page ID, as well as the file keys.
 * The page ID is visible in the JSON
 * payload when you call /files 🤷‍♂️
 */
// Inspect the /files JSON response, or the URL of the Figma page:
// https://www.figma.com/file/<file key>/Some-Name?node-id=<encoded page ID, like '183%3A0 = 183:0'>

require('dotenv').config()
// const PAGE_ID = '358:1842'
const PAGE_ID = '785:2884'
// Get this from the URL of a single file:
// https://www.figma.com/file/<file key>/Some-Name?node-id=182%3A0
const FILE_KEY = 'PJ7OUutWRrSHW6qgaPNW1l' // process.env.FILE_LEY

const fetch = require('node-fetch')
const fs = require('fs')
const { promisify } = require('util')
const path = require('path')

const writeFile = promisify(fs.writeFile)

const personalToken = '374246-5031aa80-3a2e-4f36-94dd-ee6f4f1c2b2d' // process.env.DEV_ACCESS_TOKEN

if (!personalToken) {
  console.error('Please pass FIGMA_PERSONAL_TOKEN to this script and re-run')
  process.exit(1)
}

const figmaBase = 'https://api.figma.com/'

function rgbToHex(r, g, b) {
  const color = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

  if (color.length > 7) {
    return color.slice(0, 7)
  }
  return color
}

const slugify = (str) => str.toLowerCase().replace(/\s+/, '-')

const doFetch = (url) =>
  fetch(`${figmaBase}v1${url}`, {
    headers: {
      'X-Figma-Token': personalToken,
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.log(`${figmaBase}v1${url}`)
        throw new Error(`Status: ${res.status}`)
      }

      return res.json()
    })
    .then((json) => {
      if (json.error || (json.status && json.status !== 200)) {
        throw new Error(json.error || `Status ${json.status}: ${json.err}`)
      }

      return json
    })

const fetchFile = async (key) => await doFetch(`/files/${key}`)

const fetchAllColorStyles = async () => {
  const file = await fetchFile(FILE_KEY)

  const styles = Object.entries(file.styles)
  console.log(Object.entries(styles))

  const canvas = file.document.children.find((page) => page.id === PAGE_ID)

  var colorList = []

  const runCanvas = (ca) => {
    ca.forEach((c) => {
      if (c.type === 'RECTANGLE' || c.type === 'ELLIPSE') {
        const color = c.fills[0].color
        if (!color) return
        const { r, g, b } = color
        const nodeId = c.styles?.fill
        if (!nodeId) return

        const foundStyles = styles.find(([node_id]) => node_id === nodeId)
        if (foundStyles)
          colorList.push({
            // Cross reference to the array of styles, since Figma doesn't
            // give us the HEX color codes in their /styles endpoint .. :(
            ...foundStyles[1],
            color: rgbToHex(r * 256, g * 256, b * 256),
          })
      }
      if (c.children !== undefined && Array.isArray(c.children)) {
        runCanvas(c.children)
      }
    })
  }
  if (canvas?.children) {
    runCanvas(canvas.children)
  }

  return colorList
  return (
    canvas &&
    canvas.children
      .filter((c) => c.type === 'INSTANCE')
      .map((c) => c.children.filter((c) => c.type === 'RECTANGLE')[0])
      .filter((c) => !!c.styles && !!c.styles.fill)
      .map((c) => {
        console.log(c.fills[0].color)
        const { r, g, b } = c.fills[0].color
        const nodeId = c.styles.fill

        return {
          // Cross reference to the array of styles, since Figma doesn't
          // give us the HEX color codes in their /styles endpoint .. :(
          ...styles.find((s) => s.node_id === nodeId),
          color: rgbToHex(r * 256, g * 256, b * 256),
        }
      })
      .filter((c) => !!c.name)
  )
}

/**
 * Calls Figma's API and saves to a `colors.js` file in the project root.
 */
const writeColorsFromFigma = async () => {
  const styles = await fetchAllColorStyles()
  console.log(styles)

  if (!styles) {
    throw new Error('No styles found')
  }

  const colors = styles
    .sort((a, b) => (a.sort_position < b.sort_position ? -1 : 1))
    .map((s) => (s.description ? `    /** ${s.description} */\n` : '') + `    '${slugify(s.name)}': '${s.color}',`)
    .join('\n')

  const fileContents = `/* eslint-disable */
/* Updated at ${new Date().toUTCString()}*/
module.exports = {
${colors}
}`

  await writeFile(path.resolve(__dirname + '/colors-export.js'), fileContents)

  console.log(`Wrote ${styles.length} colors to colors.js`)
}

writeColorsFromFigma().catch(console.error)
