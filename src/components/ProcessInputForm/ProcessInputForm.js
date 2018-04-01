import React, { Component } from 'react';
import NumberInputField from '../NumberInputField';
import { ALGORITHMS } from '../../constants';

class ProcessInputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrivalTime: '',
      burstTime: '',
      waitingTime: '',
      processLength: '',
      priority: '',
      qValue: ''
    }
  }

  setArrivalTime = (time) => this.setState({ arrivalTime: time});

  setBurstTime = (time) => this.setState({ burstTime: time});

  setWaitingTime = (time) => this.setState({ waitingTime: time});

  setProcessLength = (length) => this.setState({ processLength: length});

  setPriority = (p) => this.setState({ priority: p});

  setQValue = (q) => this.setState({ qValue: q});

  /**
   * Add process & reset input fields
   */
  addProcess = () => {
    const { arrivalTime, burstTime, waitingTime, processLength, priority, qValue } = this.state;
    const { processes } = this.props;

    const process = {
      id: processes.length + 1,
      arrivalTime,
      burstTime,
      waitingTime,
      processLength,
      priority,
      qValue
    };

    this.setState({
      arrivalTime: '',
      burstTime: '',
      waitingTime: '',
      processLength: '',
      priority: '',
      qValue: ''
    });

    this.props.addProcess(process);
  };


  render() {
    const { arrivalTime, burstTime, waitingTime, processLength, priority, qValue } = this.state;
    const { processes, algorithm } = this.props;

    return (
      <div className="card vertical-space-md">
        <div className="card-header">
          <span className="badge badge-primary process-id">P{processes.length + 1}</span>

          <button type="button" className="btn btn-outline-primary float-right" onClick={this.addProcess}>
            Pievienot
          </button>
        </div>

        <div className="card-body">
          <div className="row">

            {/*arrival time*/}
            <NumberInputField
              value={arrivalTime}
              elemID={'arrival-time'}
              label={'Ierašanās laiks'}
              setValue={this.setArrivalTime}
            />
            {/*end arrival time*/}

            {/*burst time*/}
            <NumberInputField
              value={burstTime}
              elemID={'burst-time'}
              label={'Spurta laiks'}
              setValue={this.setBurstTime}
            />
            {/*end burst time*/}

            {/*waiting time*/}
            <NumberInputField
              value={waitingTime}
              elemID={'waiting-time'}
              label={'Gaidīšanas laiks'}
              setValue={this.setWaitingTime}
            />
            {/*end waiting time*/}

            {/*process length*/}
            <NumberInputField
              value={processLength}
              elemID={'process-length'}
              label={'Procesa garums'}
              setValue={this.setProcessLength}
            />
            {/*end process length*/}

            {/*priority*/}
            <NumberInputField
              value={priority}
              elemID={'priority'}
              label={'Prioritāte'}
              disabled={algorithm !== ALGORITHMS.PRIORITY}
              setValue={this.setPriority}
            />
            {/*end priority*/}

            {/*q value*/}
            <NumberInputField
              value={qValue}
              elemID={'q-value'}
              label={'q'}
              disabled={algorithm !== ALGORITHMS.RR}
              setValue={this.setQValue}
            />
            {/*end q value*/}

          </div>
        </div>
      </div>
    );
  }
}

export default ProcessInputForm;