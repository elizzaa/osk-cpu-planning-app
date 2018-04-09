export const CHART_OPTIONS = {
  scales: {
    xAxes: [{
      stacked: true
    }],
    yAxes: [{
      stacked: true
    }]
  },
  responsive: true,
  elements: {
    rectangle: {
      borderWidth: 2,
    }
  },
  legend: {
    position: 'right',
  }
};

export const GOOGLE_CHART_COLUMNS = [
  { type: 'string', id: 'Process' },
  { type: 'string', id: 'Stāvoklis' },
  { type: 'number', id: 'Sākums' },
  { type: 'number', id: 'Beigas' }
];

