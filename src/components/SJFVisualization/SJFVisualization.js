import React, { Component } from 'react';
import { Chart } from 'react-google-charts'
import { STAGES } from '../../constants';
import { GOOGLE_CHART_COLUMNS } from '../../config';
import { sortByArrivalTime } from '../../utils/helpers';
import { sortByBurstTime } from '../../utils/helpers';
import ReactDOM from 'react-dom';
import $ from 'jquery';
class SJFVisualization extends Component {

  /**
   * Set provided process data based on Shortest Job First algorithm
   */
  initChartData = () => {
    const { processes } = this.props;
    const prcs = $.extend(true, [], processes);

    let processed = [];
    let result =[];
  
    prcs.sort(sortByBurstTime);
    prcs.sort(sortByArrivalTime);

    let thisMoment=0;
    let length=0;

    prcs.forEach(process => {
      processed.push(false);
      length+=1;  
    })

    let procCount=0;
    let times=0;

    while(procCount<length && times < 100 ){
      let ids=0;
      times++;
      let inserted=false;
      prcs.forEach(process => {
        const arrivalTime = parseInt(process.arrivalTime, 10);
        const burstTime = parseInt(process.burstTime, 10);
        const label = `P${process.id}`;
        const waitingTimer=parseInt(process.waitingTime, 10);
        const processLength=parseInt(process.processLength, 10);
        if(processed[ids]===false){
           if(thisMoment===0){
            thisMoment=arrivalTime+burstTime;
            result.push([label, STAGES.RUNNING.label, arrivalTime*1000, thisMoment*1000]);
            processed[ids]=true;
            procCount++;
            inserted=true;
            if(waitingTimer>0 && processLength>0){
              process.arrivalTime=thisMoment+waitingTimer;
              process.burstTime=processLength;
              process.waitingTime=thisMoment;
              process.processLength=0;
              processed[ids]=false;
              result.push([label, STAGES.WAITING.label,  thisMoment*1000, (waitingTimer+thisMoment)*1000]);
              length++;
            }
            else{
              result.push([label, STAGES.TERMINATED.label, thisMoment*1000]);
            }
        }else{
             if(arrivalTime<=thisMoment){
                let ind=ids;
                let val=burstTime;
                let rdd=0;
                let lab=label;
                let arv=arrivalTime
                let weT=waitingTimer;
                let prevT=processLength;
                prcs.forEach(process => {
                  const arrivalT = parseInt(process.arrivalTime, 10);
                  const burstT = parseInt(process.burstTime, 10);
                  if(processed[rdd]===false && burstT < val && arrivalT <= thisMoment){
                    val=burstT;
                    ind=rdd;
                    lab = `P${process.id}`;
                    arv=arrivalT;
                    prevT=parseInt(process.processLength, 10);
                    weT=parseInt(process.waitingTime, 10);
                  }
                  rdd++;
                });
              if(thisMoment-arv!==0){
                result.push([lab, STAGES.READY.label, arv*1000, thisMoment*1000]);
              }  
              result.push([lab, STAGES.RUNNING.label, thisMoment*1000, (thisMoment+val)*1000]);
              procCount++;
              inserted=true;
              processed[ind]=true;
              thisMoment=thisMoment+val;

              if(weT>0 && prevT>0){
                result.push([lab, STAGES.WAITING.label,  thisMoment*1000, (thisMoment+weT)*1000]);
                rdd=0;
                prcs.forEach(process2 => {
                  if(rdd===ind){
                    process2.arrivalTime=thisMoment+weT;
                    process2.burstTime=prevT;
                    process2.waitingTime=thisMoment;
                    process2.processLength=0;
                    processed[ind]=false;
                    length++;
                  }
                  rdd++;
                });
              }
              else{
                result.push([lab, STAGES.TERMINATED.label, thisMoment*1000]);
              }
             }
           }
        }
        ids++;
      })
      if (inserted===false){
        thisMoment++;
      }
    }
     result.forEach(r=>{
       if(r[1]===STAGES.TERMINATED.label){
         r.push(thisMoment*1000);
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
      graph_id="SJFChart"
      width="100%"
      legend_toggle
    />;
    ReactDOM.render(element, document.getElementById('SJF')); 
  };
  render() {
    const { processes } = this.props;

    return (
      <div className="card algorithm vertical-space-md">
        <div className="card-header">
          <h5>Shortest Job First</h5>
          <button type="button" className={"btn btn-outline-primary float-right " + (processes.length === 0 && "disabled-submit")} onClick={this.initChartData}>
            Attēlot
          </button>
        </div>
        <div className="card-body chart">
          <div id="SJF"></div>
        </div>
      </div>
    );
  }
}

export default SJFVisualization;