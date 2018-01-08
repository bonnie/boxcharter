import { renderComponent, expect } from '../test_helper'
import FormattedDate from '../../src/components/formatted_date'
import testData from '../data'

describe('FormattedDate', () => {
  const props = { date: new Date('2018-01-07T21:14:00') }
  it('has the correct class', () => {
    const component = renderComponent(FormattedDate)
    expect(component).to.have.class('formatted-date')
  })

  it('renders the default date format', () => {
    const formattedDate = 'Jan 7, 2018'
    const component = renderComponent(FormattedDate, props)
    expect(component).to.contain(formattedDate)
  })

  it('renders the default time format', () => {
    const formattedTime = '9:14 pm'
    const component = renderComponent(FormattedDate, props)
    expect(component).to.contain(formattedTime)
  })

  it('renders a different date format', () => {
    const formatProps = {...props, format: 'YYYY-MM-DD'}
    const formattedDate = '2018-01-07'
    const component = renderComponent(FormattedDate, formatProps)
    expect(component).to.contain(formattedDate)
  })
})