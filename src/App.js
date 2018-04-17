import React, { Component } from 'react';
import ProcessItem from './components/ProcessItem';
import ProcessInputForm from './components/ProcessInputForm';
import FCFSVisualization from './components/FCFSVisualization';
import SJFVisualization from './components/SJFVisualization';
import RRVisualization from './components/RRVisualization';
import PriorityVisualization from './components/PriorityVisualization';
import { ALGORITHMS, MAX_PROCESS_COUNT, FORM_FIELDS } from './constants';
import { EXAMPLE } from './example';
import './App.css';

const REQUIRED_FIELDS = {
  [ALGORITHMS.FCFS]: [FORM_FIELDS.ARRIVAL_TIME, FORM_FIELDS.BURST_TIME],
  [ALGORITHMS.SJF]: [FORM_FIELDS.ARRIVAL_TIME, FORM_FIELDS.BURST_TIME],
  [ALGORITHMS.RR]: [FORM_FIELDS.ARRIVAL_TIME, FORM_FIELDS.BURST_TIME, FORM_FIELDS.QVALUE],
  [ALGORITHMS.PRIORITY]: [FORM_FIELDS.ARRIVAL_TIME, FORM_FIELDS.BURST_TIME, FORM_FIELDS.PRIORITY]
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      processes: {
        [ALGORITHMS.FCFS]: [],
        [ALGORITHMS.SJF]: [],
        [ALGORITHMS.RR]: [],
        [ALGORITHMS.PRIORITY]: [],
      },
      algorithm: ALGORITHMS.FCFS
    };
  }

  /**
   * Set selected algorithm
   * @param algorithm
   */
  setAlgorithm = (algorithm) => {
    this.setState({
      algorithm
    });
  };

  /**
   * Set example
   * @param type
   */
  useDefaultValues = (type = 'DEFAULT') => {
    const { algorithm } = this.state;

    this.setState({
      processes: {
        ...this.state.processes,
        [algorithm]: EXAMPLE[type]
      },
    });
  };

  /**
   * Add new process
   * @param process
   */
  addProcess = (process) => {
    const { algorithm } = this.state;
    let processes = this.state.processes[algorithm].slice();

    processes.push(process);

    this.setState({
      processes: {
        ...this.state.processes,
        [algorithm]: processes
      },
    });
  };

  /**
   * Delete existing process
   */
  deleteProcess = (processID) => {
    const { algorithm } = this.state;
    let processes = this.state.processes[algorithm].slice();

    const index = processes.map(process => process.id).indexOf(processID);
    processes.splice(index, 1);

    this.setState({
      processes: {
        ...this.state.processes,
        [algorithm]: processes
      },
    });
  };

  render() {
    const { processes, algorithm } = this.state;

    return (
      <div className="App">
        <div className="container-fluid">
          <div className="jumbotron custom-jumbo">
            <h1 className="display-4">CPU plānošanas algoritmu vizualizācija</h1>
          </div>

          {/*planing algorithms*/}
          <section className="sm-vertical-space">
            <h1 className="display-4 border-bottom">Algoritmi</h1>

            <ul className="nav nav-pills nav-justified nav-vertical-space" id="pills-tab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="pills-fcfs-tab" onClick={() => this.setAlgorithm(ALGORITHMS.FCFS)} data-toggle="pill" href="#pills-fcfs" role="tab" aria-controls="pills-fcfs" aria-selected="true">First Come, First Served</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="pills-sjf-tab" onClick={() => this.setAlgorithm(ALGORITHMS.SJF)} data-toggle="pill" href="#pills-sjf" role="tab" aria-controls="pills-sjf" aria-selected="false">Shortest Job First</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="pills-rr-tab" onClick={() => this.setAlgorithm(ALGORITHMS.RR)} data-toggle="pill" href="#pills-rr" role="tab" aria-controls="pills-rr" aria-selected="false">Round Robin</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="pills-p-tab" onClick={() => this.setAlgorithm(ALGORITHMS.PRIORITY)} data-toggle="pill" href="#pills-p" role="tab" aria-controls="pills-p" aria-selected="false">Priority</a>
              </li>
            </ul>

            <div className="tab-content vertical-space" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-fcfs" role="tabpanel" aria-labelledby="pills-fcfs-tab">
                <div className="border-bottom">
                  <h3 className="float-left">Procesi</h3>
                  <button type="button" className="btn btn-outline-secondary float-right" onClick={() => this.useDefaultValues()}>
                    Izmantot noklusētās procesu vērtības
                  </button>

                  <div className="clear" />
                </div>

                {
                  processes[ALGORITHMS.FCFS].map(process => (
                    <ProcessItem
                      key={process.id}
                      process={process}
                      delete={this.deleteProcess.bind(this)}
                    />
                  ))
                }

                {
                  (processes[ALGORITHMS.FCFS].length < MAX_PROCESS_COUNT) &&
                  <ProcessInputForm
                    processes={processes[ALGORITHMS.FCFS]}
                    algorithm={algorithm}
                    required={REQUIRED_FIELDS[ALGORITHMS.FCFS]}
                    addProcess={this.addProcess}
                  />
                }

                <h3 className="border-bottom">Vizualizācija</h3>
                <FCFSVisualization
                  processes={processes[ALGORITHMS.FCFS]}
                />
              </div>

              <div className="tab-pane fade" id="pills-sjf" role="tabpanel" aria-labelledby="pills-sjf-tab">
                <div className="border-bottom">
                  <h3 className="float-left">Procesi</h3>
                  <button type="button" className="btn btn-outline-secondary float-right" onClick={() => this.useDefaultValues()}>
                    Izmantot noklusētās procesu vērtības
                  </button>

                  <div className="clear" />
                </div>

                {
                  processes[ALGORITHMS.SJF].map(process => (
                    <ProcessItem
                      key={process.id}
                      process={process}
                      delete={this.deleteProcess.bind(this)}
                    />
                  ))
                }

                {
                  (processes[ALGORITHMS.SJF].length < MAX_PROCESS_COUNT) &&
                  <ProcessInputForm
                    processes={processes[ALGORITHMS.SJF]}
                    algorithm={algorithm}
                    required={REQUIRED_FIELDS[ALGORITHMS.SJF]}
                    addProcess={this.addProcess}
                  />
                }

                <h3 className="border-bottom">Vizualizācija</h3>
                <SJFVisualization
                  processes={processes[ALGORITHMS.SJF]}
                />
              </div>

              <div className="tab-pane fade" id="pills-rr" role="tabpanel" aria-labelledby="pills-rr-tab">
                <div className="border-bottom">
                  <h3 className="float-left">Procesi</h3>
                  <button type="button" className="btn btn-outline-secondary float-right" onClick={() => this.useDefaultValues()}>
                    Izmantot noklusētās procesu vērtības
                  </button>

                  <div className="clear" />
                </div>
                {
                  processes[ALGORITHMS.RR].map(process => (
                    <ProcessItem
                      key={process.id}
                      process={process}
                      delete={this.deleteProcess.bind(this)}
                    />
                  ))
                }

                {
                  (processes[ALGORITHMS.RR].length < MAX_PROCESS_COUNT) &&
                  <ProcessInputForm
                    processes={processes[ALGORITHMS.RR]}
                    algorithm={algorithm}
                    required={REQUIRED_FIELDS[ALGORITHMS.RR]}
                    addProcess={this.addProcess}
                  />
                }

                <h3 className="border-bottom">Vizualizācija</h3>
                <RRVisualization
                  processes={processes[ALGORITHMS.RR]}
                />
              </div>

              <div className="tab-pane fade" id="pills-p" role="tabpanel" aria-labelledby="pills-p-tab">
                <div className="border-bottom">
                  <h3 className="float-left">Procesi</h3>
                  <button type="button" className="btn btn-outline-secondary float-right" onClick={() => this.useDefaultValues()}>
                    Izmantot noklusētās procesu vērtības
                  </button>

                  <div className="clear" />
                </div>
                {
                  processes[ALGORITHMS.PRIORITY].map(process => (
                    <ProcessItem
                      key={process.id}
                      process={process}
                      delete={this.deleteProcess.bind(this)}
                    />
                  ))
                }

                {
                  (processes[ALGORITHMS.PRIORITY].length < MAX_PROCESS_COUNT) &&
                  <ProcessInputForm
                    processes={processes[ALGORITHMS.PRIORITY]}
                    algorithm={algorithm}
                    required={REQUIRED_FIELDS[ALGORITHMS.PRIORITY]}
                    addProcess={this.addProcess}
                  />
                }

                <h3 className="border-bottom">Vizualizācija</h3>
                <PriorityVisualization
                  processes={processes[ALGORITHMS.PRIORITY]}
                />
              </div>
            </div>
          </section>
          {/*end planing algorithms*/}
        </div>
      </div>
    );
  }
}

export default App;
