import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { STAGES } from '../../constants';
import { GOOGLE_CHART_COLUMNS } from '../../config';
import { sortByArrivalTimeAsc } from '../../utils/helpers';
import ReactDOM from 'react-dom';
import $ from 'jquery';


class FCFSVisualization extends Component {

  /**
* Parse value to integer
* @param value
*/
  parseValueToInt = (value) => {
    const number = parseInt(value, 10);
    return isNaN(number) ? '' : number * 1000;
  };

  /**
   * Set provided process data based on First Come, First Served algorithm
   */
  initChartData = () => {
    const { processes } = this.props;
    const prcs = $.extend(true, [], processes);

    // needed for chart
    const result = [];

    let previousEndTime;
    let times = 0;

    prcs.forEach(process => {
      for (let p in process) {
        if (p !== 'id') {
          process[p] = this.parseValueToInt(process[p]);
        }
      }
    })

    prcs.sort(sortByArrivalTimeAsc);

    while (prcs.length > 0 && times < 200) {
      const process = prcs[0];
      const label = `P${process.id}`;
      let startTime;
      let endTime;
      times++;

      if (previousEndTime != null && previousEndTime > process.arrivalTime) {
        startTime = previousEndTime;
        result.push([label, STAGES.READY.label, process.arrivalTime, startTime])
      } else {
        startTime = process.arrivalTime;
      }

      endTime = startTime + process.burstTime;
      //takes process who is first in the line
      if (process.waitingTime != null && process.waitingTime > 0) {
        result.push([label, STAGES.RUNNING.label, startTime, endTime]);
        result.push([label, STAGES.WAITING.label, endTime, endTime + process.waitingTime]);
        if (process.processLength != null && process.processLength > 0) {
          process.arrivalTime = endTime + process.waitingTime;
          process.burstTime = process.processLength;
          process.waitingTime = -1;
          process.processLength = -1;
        } else {
          result.push([label, STAGES.TERMINATED.label, endTime + process.waitingTime]);
          if (prcs.length === 1) {
            endTime += process.waitingTime;
          }
          prcs.shift();
        }
      } else {
        if (process.processLength != null && process.processLength > 0) {
          endTime += process.processLength;
        }
        result.push([label, STAGES.RUNNING.label, startTime, endTime]);
        result.push([label, STAGES.TERMINATED.label, endTime]);
        prcs.shift();
      }

      previousEndTime = endTime;
      prcs.sort(sortByArrivalTimeAsc);
    }

    result.forEach(r => {
      if (r[1] === STAGES.TERMINATED.label) {
        r.push(previousEndTime);
      }
    })
    console.log(result);
    this.drawChart(result);
  };

  /**
   * Draw chart based on provided processes & used algorithm
   * @param rows
   */
  drawChart = (rows) => {
    this.columns = GOOGLE_CHART_COLUMNS;
    this.rows = rows;

    const element = <Chart
      chartType="Timeline"
      rows={this.rows}
      columns={this.columns}
      graph_id="FCFSChart"
      width="100%"
      legend_toggle
    />;
    ReactDOM.render(element, document.getElementById('FCFS'));
  };

  render() {
    const { processes } = this.props;

    return (
      <div className="card algorithm vertical-space-md">
        <div className="card-header">
          <h5>First Come, First Served</h5>

          <button type="button" className={"btn btn-outline-primary float-right " + (processes.length === 0 && "disabled-submit")} onClick={this.initChartData}>
            Attēlot
          </button>
        </div>

        <div className="card-body chart">
          <div id="FCFS"></div>
        </div>
      </div>
    );
  }
}

export default FCFSVisualization;