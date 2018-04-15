import React, { Component } from 'react';
import NumberInputField from '../NumberInputField';
import { ALGORITHMS, FORM_FIELDS } from '../../constants';

class ProcessInputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrivalTime: '',
      burstTime: '',
      waitingTime: '',
      processLength: '',
      priority: '',
      qValue: '',
      error: true
    }
  }

  setArrivalTime = (time) => this.setState({ arrivalTime: time }, () => this.isValid());

  setBurstTime = (time) => this.setState({ burstTime: time }, () => this.isValid());

  setWaitingTime = (time) => this.setState({ waitingTime: time }, () => this.isValid());

  setProcessLength = (length) => this.setState({ processLength: length }, () => this.isValid());

  setPriority = (p) => this.setState({ priority: p }, () => this.isValid());

  setQValue = (q) => this.setState({ qValue: q }, () => this.isValid());

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
      qValue: '',
      error: true
    });

    this.props.addProcess(process);
  };

  /**
   * Required field not provided, set form error
   */
  setError = (isError) => this.setState({ error: isError });

  /**
   * Check if field is required
   */
  isRequired = (fieldName) => {
    const { required } = this.props;

    return required.indexOf(fieldName) > -1
  };

  /**
   * Check if all required values are provided
   */
  isValid = () => {
    const { required } = this.props;

    const isError = required.some(field => this.state[field].length === 0);
    this.setState({ error: isError });
  };


  render() {
    const { arrivalTime, burstTime, waitingTime, processLength, priority, qValue, error } = this.state;
    const { processes, algorithm } = this.props;

    return (
      <div className="card vertical-space-md">
        <div className="card-header">
          <span className="badge badge-primary process-id">P{processes.length + 1}</span>

          <button type="button" className={"btn btn-outline-primary float-right " + (error && "disabled-submit")} onClick={this.addProcess}>
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
              setFormError={this.setError}
              required={this.isRequired(FORM_FIELDS.ARRIVAL_TIME)}
            />
            {/*end arrival time*/}

            {/*burst time*/}
            <NumberInputField
              value={burstTime}
              elemID={'burst-time'}
              label={'Spurta laiks'}
              setValue={this.setBurstTime}
              setFormError={this.setError}
              required={this.isRequired(FORM_FIELDS.BURST_TIME)}
            />
            {/*end burst time*/}

            {/*waiting time*/}
            <NumberInputField
              value={waitingTime}
              elemID={'waiting-time'}
              label={'Gaidīšanas laiks'}
              setValue={this.setWaitingTime}
              setFormError={this.setError}
              required={this.isRequired(FORM_FIELDS.WAITING_TIME)}
            />
            {/*end waiting time*/}

            {/*process length*/}
            <NumberInputField
              value={processLength}
              elemID={'process-length'}
              label={'Procesa garums'}
              setValue={this.setProcessLength}
              setFormError={this.setError}
              required={this.isRequired(FORM_FIELDS.PROCESS_LENGTH)}
            />
            {/*end process length*/}

            {/*priority*/}
            <NumberInputField
              value={priority}
              elemID={'priority'}
              label={'Prioritāte'}
              disabled={algorithm !== ALGORITHMS.PRIORITY}
              setValue={this.setPriority}
              setFormError={this.setError}
              required={this.isRequired(FORM_FIELDS.PRIORITY)}
            />
            {/*end priority*/}

            {/*q value*/}
            <NumberInputField
              value={qValue}
              elemID={'q-value'}
              label={'q'}
              disabled={algorithm !== ALGORITHMS.RR}
              setValue={this.setQValue}
              setFormError={this.setError}
              required={this.isRequired(FORM_FIELDS.QVALUE)}
            />
            {/*end q value*/}

          </div>
        </div>
      </div>
    );
  }
}

export default ProcessInputForm;