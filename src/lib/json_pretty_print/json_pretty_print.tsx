import React, { useMemo } from 'react'
import { JSONPrettyPrintProps, Printable } from './types'
import styles from './json_pretty_print.module.css'
function syntaxHighlight(json: string) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let cls = styles.number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = styles.key
        } else {
          cls = styles.string
        }
      } else if (/true|false/.test(match)) {
        cls = styles.boolean
      } else if (/null/.test(match)) {
        cls = styles.null
      }
      return `<span class='${cls}'>${match}</span>`
    }
  )
}
function JSONPrettyPrint<T extends Printable>({ json }: JSONPrettyPrintProps<T>) {
  const jsonStr = useMemo(() => (typeof json === 'string' ? json : JSON.stringify(json, null, 2)), [json])
  const output = syntaxHighlight(jsonStr)

  return <pre className={styles.JSONPrettyPrintMain} dangerouslySetInnerHTML={{ __html: output }}></pre>
}

export default JSONPrettyPrint
