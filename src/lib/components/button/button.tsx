import React from 'react'
import { ButtonProps } from './types'
import styles from './button.module.css'

function Button({}: ButtonProps) {
  return <div className={styles.buttonMain}>This is as Button stub</div>
}

export default Button
