import { render } from '@testing-library/react'
import SubIcon from './sub_icon'

describe('SubIcon', () => {
  it('should render the component', () => {
    const { getByTestId } = render(<SubIcon data-test-id="root" />)
    const root = getByTestId('root')
    expect(root).toBeTruthy()
  })
})
