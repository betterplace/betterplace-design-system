/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import Rectangle from './rectangle'
import '@testing-library/jest-dom'

describe('Rectangle', () => {
  it('should render the component', () => {
    const { container } = render(<Rectangle />)
    const element = container.querySelector('.rectangleMain')
    expect(element).toBeTruthy()
  })
})
