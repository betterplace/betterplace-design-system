import React from 'react'
import { ButtonProps } from './types'
import styles from './button.module.css'

function Button({}: ButtonProps) {
  return <div className={styles.buttonMain}></div>
}

export default Button
