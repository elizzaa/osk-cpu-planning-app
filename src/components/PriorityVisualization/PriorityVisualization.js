import React, { Component } from 'react';
import Chart from 'chart.js';
import { STAGES } from '../../constants';
import { CHART_OPTIONS } from '../../config';

class PriorityVisualization extends Component {

  /**
   * Set provided process data based on Priority algorithm
   */
  initChartData = () => {
    const { processes } = this.props;

    // needed for chart
    let labels = [];
    let arrivalData = [];
    let waitingData = [];
    let runningData = [];
    let terminatedData = [];

    processes.forEach(process => {
      const label = `P${process.id}`;
      labels.push(label);

      arrivalData.push(process.arrivalTime);

      // TODO: process data for chart here
    });

    this.drawChart(labels, arrivalData, waitingData, runningData, terminatedData);
  };

  /**
   * Draw chart based on provided processes & used algorithm
   * @param labels
   * @param arrivalData
   * @param waitingData
   * @param runningData
   * @param terminatedData
   */
  drawChart = (labels, arrivalData, waitingData, runningData, terminatedData) => {
    const data = {
      labels: labels,
      datasets: [{
        label: STAGES.ARRIVED.label,
        backgroundColor: STAGES.ARRIVED.color,
        borderColor: STAGES.ARRIVED.color,
        data: arrivalData
      }, {
        label: STAGES.WAITING.label,
        backgroundColor: STAGES.WAITING.color,
        borderColor: STAGES.WAITING.color,
        data: waitingData
      }, {
        label: STAGES.RUNNING.label,
        backgroundColor: STAGES.RUNNING.color,
        borderColor: STAGES.RUNNING.color,
        data: runningData
      }, {
        label: STAGES.TERMINATED.label,
        backgroundColor: STAGES.TERMINATED.color,
        borderColor: STAGES.TERMINATED.color,
        data: terminatedData
      }]
    };

    const ctx = document.getElementById("priority-chart");
    const config = {
      type: 'horizontalBar',
      data: data,
      options: CHART_OPTIONS
    };

    new Chart(ctx, config);
  };

  render() {
    const { processes } = this.props;

    return (
      <div className="card algorithm vertical-space-md">
        <div className="card-header">
          <h5>Priority</h5>

          <button type="button" className={"btn btn-outline-primary float-right " + (processes.length === 0 && "disabled-submit")} onClick={this.initChartData}>
            Attēlot
          </button>
        </div>

        <div className="card-body chart">
          <canvas id="priority-chart" />
        </div>
      </div>
    );
  }
}

export default PriorityVisualization;