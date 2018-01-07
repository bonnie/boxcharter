import { expect } from '../test_helper';
import chartReducer from '../../src/reducers/reducer_charts';
import { GET_USERCHARTS } from '../../src/actions/types';

describe('Chart Reducer', () => {
  it('handles action with unknown type', () => {
    expect(chartReducer(undefined, {})).to.eql([]);
  });

  it('handles action of type GET_USERCHARTS', () => {
    const charts = [{ chartId: 1, title: 'Blackbird', permissions: 0 }]
    const action = { type: GET_USERCHARTS, payload: charts };
    expect(chartReducer([], action)).to.eql(charts);
  });
});