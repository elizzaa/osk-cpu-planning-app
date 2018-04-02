import React, { Component } from 'react';
import Chart from 'chart.js';
import { STAGES } from '../../constants';
import { CHART_OPTIONS } from '../../config';
import { sortByArrivalTime } from '../../utils/helpers';


class FCFSVisualization extends Component {

  /**
   * Set provided process data based on First Come, First Served algorithm
   */
  initChartData = () => {
    const { processes } = this.props;

    // needed for chart
    let labels = [];
    let arrivalData = [];
    let waitingData = [];
    let runningData = [];
    let terminatedData = [];

    let endTimes = [];

    processes.sort(sortByArrivalTime);

    let previousEndTime;
    let startTime;

    processes.forEach(process => {
      const arrivalTime = parseInt(process.arrivalTime, 10);
      const burstTime = parseInt(process.burstTime, 10);
      const label = `P${process.id}`;
      labels.push(label);

      arrivalData.push(arrivalTime);

      if (previousEndTime && previousEndTime >= arrivalTime) {
        startTime = previousEndTime;
      } else {
        startTime = arrivalTime;
      }

      previousEndTime = startTime + burstTime;
      const waitingTime = startTime - arrivalTime;
      waitingData.push(waitingTime);
      runningData.push(burstTime);
      endTimes.push(previousEndTime);
    });

    endTimes.forEach(value => {
      terminatedData.push(previousEndTime - value);
    })

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

    const ctx = document.getElementById("fcfs-chart");
    const config = {
      type: 'horizontalBar',
      data: data,
      options: CHART_OPTIONS
    };

    new Chart(ctx, config);
  };

  render() {
    return (
      <div className="card algorithm vertical-space-sm">
        <div className="card-header">
          <h5>First Come, First Served</h5>

          <button type="button" className="btn btn-outline-primary float-right" onClick={this.initChartData}>
            Animate
          </button>
        </div>

        <div className="card-body chart">
          <canvas id="fcfs-chart" />
        </div>
      </div>
    );
  }
}

export default FCFSVisualization;