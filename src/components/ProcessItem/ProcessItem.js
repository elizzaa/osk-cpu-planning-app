import React, { Component } from 'react';
import NumberInputField from '../NumberInputField';

class ProcessItem extends Component {

  /**
   * Delete process
   */
  deleteProcess = () => {
    const { process } = this.props;
    this.props.delete(process.id)
  };

  render() {
    const { process } = this.props;

    return (
      <div className="card vertical-space-sm">
        <div className="card-header">
          <span className="badge badge-primary process-id">P{process.id}</span>

          <button type="button" className="btn btn-outline-danger float-right" onClick={this.deleteProcess}>
            Dzēst
          </button>
        </div>

        <div className="card-body">
          <div className="row">

            {/*arrival time*/}
            <NumberInputField
              value={process.arrivalTime}
              elemID={'arrival-time'}
              label={'Ierašanās laiks'}
              disabled={true}
            />
            {/*end arrival time*/}

            {/*burst time*/}
            <NumberInputField
              value={process.burstTime}
              elemID={'burst-time'}
              label={'Spurta laiks'}
              disabled={true}
            />
            {/*end burst time*/}

            {/*waiting time*/}
            <NumberInputField
              value={process.waitingTime}
              elemID={'waiting-time'}
              label={'Gaidīšanas laiks'}
              disabled={true}
            />
            {/*end waiting time*/}

            {/*process length*/}
            <NumberInputField
              value={process.processLength}
              elemID={'process-length'}
              label={'Procesa garums'}
              disabled={true}
            />
            {/*end process length*/}

            {/*priority*/}
            <NumberInputField
              value={process.priority}
              elemID={'priority'}
              label={'Prioritāte'}
              disabled={true}
            />
            {/*end priority*/}

            {/*q value*/}
            <NumberInputField
              value={process.qValue}
              elemID={'q-value'}
              label={'q'}
              disabled={true}
            />
            {/*end q value*/}

          </div>
        </div>
      </div>
    );
  }
}

export default ProcessItem;