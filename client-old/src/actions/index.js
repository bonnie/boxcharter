export const FETCH_CHARTS = 'fetch_charts';
export const DONE_LOADING = 'done_loading';
export const START_LOADING = 'start_loading';

export function startLoading() {
  return {
    type: START_LOADING,
    loading: true,
  };
}

export function fetchCharts(allCharts) {
  return {
    type: FETCH_CHARTS,
    payload: allCharts,
    loading: true,
  };
};

export function doneLoading() {
  return {
    type: DONE_LOADING,
    loading: false,
  };
}