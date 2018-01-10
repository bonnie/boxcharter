import { renderComponent, expect } from '../test_helper'
import FormattedDate from '../../src/components/formatted_date'
import testData from '../data'

describe('FormattedDate', () => {
  it('has the correct class', () => {
    const component = renderComponent(FormattedDate)
    expect(component).to.have.class('formatted-date')
  })

  it('renders the default date format without the year for the current year', () => {
    const currentYear = new Date().getFullYear().toString()
    const props = { date: new Date(`${currentYear}-01-07T21:14:00`) }
    const formattedDate = `Jan 7, `
    const component = renderComponent(FormattedDate, props)
    expect(component).to.contain(formattedDate)
  })

  it('renders the default date format with the year for a previous year', () => {
    const currentYear = (new Date().getFullYear() - 1).toString()
    const props = { date: new Date(`${currentYear}-01-07T21:14:00`) }
    const formattedDate = `Jan 7, ${currentYear}`
    const component = renderComponent(FormattedDate, props)
    expect(component).to.contain(formattedDate)
  })

  it('renders the default time format', () => {
    const formattedTime = '9:14 pm'
    const component = renderComponent(FormattedDate, { date: '2018-01-07T21:14:00' })
    expect(component).to.contain(formattedTime)
  })

  it('renders a different date format', () => {
    const formatProps = { date: '2018-01-07T21:14:00', format: 'YYYY-MM-DD'}
    const formattedDate = '2018-01-07'
    const component = renderComponent(FormattedDate, formatProps)
    expect(component).to.contain(formattedDate)
  })
})