import { expect } from '../test_helper';
import testData from '../data'
import chartReducer from '../../src/reducers/reducer_charts';
import { GET_USERCHARTS } from '../../src/actions/types';

describe('Chart Reducer', () => {
  it('handles action with unknown type', () => {
    expect(chartReducer(undefined, {})).to.eql([]);
  });

  it('handles action of type GET_USERCHARTS', () => {
    const charts = testData.userCharts
    const payload = { data: { charts } }
    const action = { type: GET_USERCHARTS, payload };
    expect(chartReducer([], action)).to.eql(payload.data.charts);
  });
});