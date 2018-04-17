import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { STAGES } from '../../constants';
import { GOOGLE_CHART_COLUMNS } from '../../config';
import { sortByArrivalTimeAsc } from '../../utils/helpers';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class RRVisualization extends Component {
    /**
  * Parse value to integer
  * @param value
  */
  parseValueToInt = (value) => {
    const number = parseInt(value, 10);
    return isNaN(number) ? '' : number * 1000;
  };
  /**
   * Set provided process data based on Priority algorithm
   */
  initChartData = () => {
    const { processes } = this.props;
    const prcs = $.extend(true, [], processes);

    // needed for chart
    let result = [];
    let previousEndTime;
    let times = 0;

    

    prcs.forEach(process => {
      for (let p in process) {
        if (p !== 'id') {
          process[p] = this.parseValueToInt(process[p]);

        }
      }
    })
    let qValue;
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
        qValue = process.qValue;
      }
      if (qValue > 0){
        if (process.burstTime < qValue && process.burstTime > 0){
          endTime = startTime + process.burstTime;
        }
        else{
          endTime = startTime + qValue;}
        process.burstTime = process.burstTime - qValue;
        
      }
      else
        endTime = startTime + process.burstTime;
      //takes process who is first in the line
        if ( process.burstTime > 0 && qValue > 0 )
        {
          result.push([label, STAGES.RUNNING.label, startTime, endTime]);
          process.arrivalTime = endTime;
        }
        else if (process.waitingTime != null && process.waitingTime > 0) {
          result.push([label, STAGES.RUNNING.label, startTime, endTime]);
          result.push([label, STAGES.WAITING.label, endTime, endTime + process.waitingTime]);
          process.arrivalTime = endTime + process.waitingTime;
          process.burstTime = process.processLength;
          process.waitingTime = -1;}
        else {
          if (process.waitingTime != null && process.waitingTime > 0) {
            result.push([label, STAGES.RUNNING.label, startTime, endTime]);
            result.push([label, STAGES.WAITING.label, endTime, endTime + process.waitingTime]);
            process.arrivalTime = endTime + process.waitingTime;
            process.burstTime = process.processLength;
            process.waitingTime = -1;}
          else {
          result.push([label, STAGES.RUNNING.label, startTime, endTime]);
          result.push([label, STAGES.TERMINATED.label, endTime]);
          prcs.shift();}
        } 
        previousEndTime = endTime;
        prcs.sort(sortByArrivalTimeAsc);
      }
  
      result.forEach(r => {
        if (r[1] === STAGES.TERMINATED.label) {
          r.push(previousEndTime);
        }
      })
      
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
      graph_id="RRchart"
      width="100%"
      legend_toggle
    />;
    ReactDOM.render(element, document.getElementById('RR'));
  };

  render() {
    const { processes } = this.props;

    return (
      <div className="card algorithm vertical-space-md">
        <div className="card-header">
          <h5>Round Robin</h5>

          <button type="button" className={"btn btn-outline-primary float-right " + (processes.length === 0 && "disabled-submit")} onClick={this.initChartData}>
            Attēlot
          </button>
        </div>

        <div className="card-body chart">
          <div id="RR"></div>
        </div>
      </div>
    );
  }
}

export default RRVisualization;