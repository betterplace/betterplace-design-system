import { render } from '@testing-library/react'
import Icon from './icon'

describe('Icon', () => {
  it('should render the component', () => {
    const { getByTestId } = render(<Icon data-test-id="root" iconType="arrowRight" />)
    const root = getByTestId('root')
    expect(root).toBeTruthy()
  })
})
