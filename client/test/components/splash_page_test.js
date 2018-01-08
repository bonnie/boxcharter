import { renderComponent, expect } from '../test_helper'
import SplashPage from '../../src/components/splash_page'
import testData from '../data'

describe('SplashPage', () => {
  let component
  beforeEach(() => {
    const props = { }
    component = renderComponent(SplashPage, null, props)
  })
  
  it('has the correct class', () => {
    expect(component).to.have.class('splash-page')
  })

})