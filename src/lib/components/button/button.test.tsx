import { render } from '@testing-library/react'
import Button from './button'

describe('Button', () => {
  it('should render the component', () => {
    const { getByTestId } = render(<Button data-test-id="root" />)
    const root = getByTestId('root')
    expect(root).toBeTruthy()
  })
})
