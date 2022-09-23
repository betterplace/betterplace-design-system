/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import JSONPrettyPrint from './json_pretty_print'
import '@testing-library/jest-dom'

describe('JSON Pretty Print', () => {
  it('should correctly render the component', () => {
    const test = { a: 1, b: 2, c: [true, { e: 'var' }] }
    const { container } = render(<JSONPrettyPrint json={test} />)
    const element = container.querySelector('.JSONPrettyPrintMain')
    expect(element).toBeTruthy()
  })
})
